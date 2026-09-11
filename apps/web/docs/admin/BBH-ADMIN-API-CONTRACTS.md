# BBH ADMIN COMMAND CENTER - API CONTRACTS

**Document ID:** BBH-ADMIN-API-CONTRACTS
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Scope:** Phase 1 modules only - ACC-001 (IAM), ACC-002 (Master Data), ACC-003 (Core Dashboard), plus the ACC-004 audit read surface

---

## 1. Scope

This document is the contract of record for every callable surface shipped in Phase 1.
A procedure that is not in this document does not exist; a procedure in this document
whose implementation differs in name, input, output, status code, or permission is a
defect, not an interpretation.

Later-phase procedures are out of scope and must not be implemented ahead of their
module (BBH-ADMIN-MASTER-SPEC.md Section 7).

---

## 2. Transport

### 2.1 Two surfaces, one authorization path

Per ADR-A02:

| Surface | Used by | Location | Shape |
|---|---|---|---|
| tRPC | the Command Center UI and any first-party caller | `app/api/trpc/[trpc]/route.ts` | Typed procedures |
| REST route handlers | external callers that cannot speak tRPC (Stripe, integrations) | `app/api/admin/webhooks/*` | JSON over HTTP |

Both surfaces authorise through the same helper, `lib/auth/check-permission.ts`
(CONTRACT-003). There is no second authorization path.

### 2.2 tRPC HTTP mapping

Every tRPC procedure is reachable over HTTP; the mapping is mechanical and is stated here
so that the contract is testable with a plain HTTP client.

| Procedure kind | HTTP method | Path | Input location |
|---|---|---|---|
| `query` | GET | `/api/trpc/<router>.<procedure>` | `?input=<url-encoded JSON>` |
| `mutation` | POST | `/api/trpc/<router>.<procedure>` | JSON request body |
| batched call | POST | `/api/trpc/<a>,<b>?batch=1` | JSON array body |

A successful tRPC response is `200` with `{ "result": { "data": <Output> } }`. A failed
one is a non-2xx status per Section 5 with the structured error body in Section 4.
Throughout this document, "Returns" describes `result.data`.

### 2.3 Required request headers

| Header | Required | Notes |
|---|---|---|
| `Cookie: sb-access-token` | yes, for all `/api/trpc/*` | Supabase session cookie; set by the auth flow |
| `Content-Type: application/json` | on mutations | |
| `X-Request-Id` | optional | UUID; echoed on the response and written to `audit_log.request_id`. Generated server-side when absent. |
| `X-Idempotency-Key` | yes, on mutations marked Idempotent | UUID; see Section 6 |

### 2.4 Standard response headers

| Header | Always | Meaning |
|---|---|---|
| `X-Request-Id` | yes | Correlation id, also in audit rows |
| `RateLimit-Limit` | yes | Ceiling for the applied bucket |
| `RateLimit-Remaining` | yes | Remaining in the window |
| `RateLimit-Reset` | yes | Unix seconds until the window resets |
| `Retry-After` | on 429 and 503 | Seconds |
| `Cache-Control` | yes | `private, no-store` on every admin response, without exception |

---

## 3. Authentication And Authorization

### 3.1 Principal resolution order

1. `middleware.ts` verifies a Supabase session exists for the `/admin` and `/api/trpc`
   matcher. No session results in a redirect (browser) or `401` (API).
2. The tRPC context loads the `users` row and its active `role_assignments`.
3. `checkPermission(principal, permission, resource?)` resolves the decision.
4. Postgres RLS re-applies the constraint at the row level. Both must pass.

### 3.2 Procedure middleware tiers

| Tier | Guarantees |
|---|---|
| `publicProcedure` | No auth. Not used in Phase 1; present only for the health check. |
| `authedProcedure` | Valid session; `users.status = 'ACTIVE'`; session not revoked or expired. |
| `mfaProcedure` | `authedProcedure` plus `sessions.mfa_satisfied_at` within the MFA window. |
| `permissionedProcedure(permission)` | `authedProcedure` plus an explicit permission grant. |
| `thresholdProcedure(permission, amountSelector)` | The above plus a value-threshold check. |

Every procedure below names its tier. Any procedure that mutates state must additionally
emit its named audit event; a mutation with no audit event is a CONTRACT-004 violation.

### 3.3 Permission naming

`<module>.<resource>.<action>`, lowercase. Examples: `iam.user.invite`,
`masterdata.product.update`, `dashboard.finance.read`. The full permission list is in
BBH-ADMIN-IAM-SPECIFICATION.md Section 4.

---

## 4. Error Contract

Every error response body, on both surfaces, is exactly:

```json
{
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Role SALES_REP may not invite users.",
    "details": { "required": "iam.user.invite", "held": ["sales.lead.read"] }
  }
}
```

`code` is a member of the `ErrorCode` enum in `lib/errors/codes.ts` (CONTRACT-010).
`message` is human-readable, safe to display, and never contains a stack trace, SQL, or
another user's PII. `details` is optional and structured.

### 4.1 ErrorCode enum (Phase 1)

| Code | HTTP | Meaning | Retryable |
|---|---|---|---|
| `UNAUTHENTICATED` | 401 | No valid session | after re-auth |
| `SESSION_EXPIRED` | 401 | Session past idle or absolute expiry | after re-auth |
| `MFA_REQUIRED` | 403 | Step-up authentication needed | after MFA |
| `PERMISSION_DENIED` | 403 | Authenticated but not permitted | no |
| `THRESHOLD_EXCEEDED` | 403 | Value above the role's approval ceiling | no, needs approval |
| `CONSTITUTIONAL_CONSTRAINT` | 409 | Blocked by an absolute rule (CONTRACT-008) | no |
| `NOT_FOUND` | 404 | Resource absent or not visible to this principal | no |
| `VALIDATION_FAILED` | 422 | Input failed schema validation | after correction |
| `CONFLICT` | 409 | Optimistic concurrency or uniqueness violation | after refetch |
| `IDEMPOTENCY_KEY_REUSED` | 409 | Same key, different payload | no |
| `RATE_LIMITED` | 429 | Cap exceeded | after `Retry-After` |
| `DEPENDENCY_UNAVAILABLE` | 503 | Supabase, Stripe, or Resend unreachable | yes, backoff |
| `INTERNAL_ERROR` | 500 | Unhandled server fault | yes, backoff |

`NOT_FOUND` is deliberately returned in place of `PERMISSION_DENIED` when revealing
existence would itself leak information (for example, reading a user record outside the
caller's visibility). Which behaviour applies is stated per procedure.

### 4.2 Validation error details

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Request failed validation.",
    "details": {
      "fieldErrors": {
        "email": ["Must be a valid email address"],
        "roleKeys": ["Must contain at least one role"]
      }
    }
  }
}
```

---

## 5. Status Codes

| Status | Used when |
|---|---|
| 200 | Query succeeded; mutation succeeded and returns a body |
| 201 | Mutation created a resource; `Location` header carries its canonical path |
| 204 | Mutation succeeded with no body (revocations, acknowledgements) |
| 400 | Malformed request envelope (unparseable JSON, missing batch marker) |
| 401 | `UNAUTHENTICATED`, `SESSION_EXPIRED` |
| 403 | `MFA_REQUIRED`, `PERMISSION_DENIED`, `THRESHOLD_EXCEEDED` |
| 404 | `NOT_FOUND` |
| 409 | `CONFLICT`, `CONSTITUTIONAL_CONSTRAINT`, `IDEMPOTENCY_KEY_REUSED` |
| 422 | `VALIDATION_FAILED` |
| 429 | `RATE_LIMITED` |
| 500 | `INTERNAL_ERROR` |
| 503 | `DEPENDENCY_UNAVAILABLE` |

No other status codes are emitted. 301, 302, and 307 never appear on `/api/trpc/*`.

---

## 6. Idempotency, Concurrency, Pagination

### 6.1 Idempotency

Mutations marked **Idempotent** require `X-Idempotency-Key`. The server stores
`(key, principal_id, request_hash, response)` for 24 hours.

- Same key, same payload hash: the stored response is replayed with the original status.
- Same key, different payload hash: `409 IDEMPOTENCY_KEY_REUSED`.
- Missing key on a procedure that requires it: `422 VALIDATION_FAILED`.

### 6.2 Optimistic concurrency

Any procedure that updates a row carrying `version` accepts `expectedVersion`. A mismatch
returns `409 CONFLICT` with `details: { currentVersion, expectedVersion }`. The client
refetches and retries; the server never merges silently.

### 6.3 Pagination

Cursor-based on every list procedure (BBH-ADMIN-MASTER-SPEC.md Section 8 rule 11).

```ts
// input
{ limit?: number /* 1..100, default 25 */, cursor?: string }
// output
{ items: T[], nextCursor: string | null, totalCount?: number }
```

`totalCount` is returned only where the count is cheap and bounded; it is never returned
for `audit.list`.

---

## 7. Rate Limits

Buckets are defined in `lib/caps.ts` and nowhere else (CONTRACT-009). Limits are per
principal per window unless stated. MASTER_ADMIN receives the operational override
described in CONTRACT-008: caps are lifted, but constitutional constraints still apply
and every override is audited with severity WARNING.

| Bucket | Limit | Window | Applies to |
|---|---|---|---|
| `admin.read` | 600 | 1 min | all query procedures |
| `admin.write` | 120 | 1 min | all mutation procedures |
| `iam.invite` | 20 | 1 hour | `iam.user.invite` |
| `iam.roleChange` | 30 | 1 hour | `iam.role.grant`, `iam.role.revoke` |
| `iam.mfaReset` | 5 | 1 hour | `iam.user.resetMfa` |
| `auth.login` | 5 | 15 min per IP | sign-in attempts (existing PRD.md ADMIN-001 rule) |
| `masterdata.priceActivate` | 10 | 1 day | `masterdata.priceBook.activate` |
| `dashboard.read` | 120 | 1 min | `dashboard.*` |
| `export.csv` | 10 | 1 hour | any procedure returning a CSV payload |

Exceeding a bucket returns `429 RATE_LIMITED` with `Retry-After`. Rate-limit rejections
are logged but are not audit events.

---

## 8. Router: `iam` (ACC-001)

Base path `/api/trpc/iam.*`. All procedures are `mfaProcedure` or stricter: no IAM
surface is reachable without a satisfied MFA challenge.

### 8.1 `iam.user.list`

| Field | Value |
|---|---|
| Kind | query -> `GET /api/trpc/iam.user.list` |
| Tier | `permissionedProcedure('iam.user.read')` |
| Roles | MASTER_ADMIN, ADMIN |
| Bucket | `admin.read` |
| Audit | none (read) |

```ts
// Input
{
  status?: 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED',
  roleKey?: RoleKey,
  search?: string,        // matches email or full_name, case-insensitive, max 120 chars
  limit?: number,         // 1..100, default 25
  cursor?: string
}

// Output
{
  items: Array<{
    id: string,
    email: string,
    fullName: string,
    jobTitle: string | null,
    status: 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED',
    roles: RoleKey[],
    mfaEnrolled: boolean,
    lastLoginAt: string | null,   // ISO 8601 UTC
    createdAt: string
  }>,
  nextCursor: string | null,
  totalCount: number
}
```

**Errors:** 401 `UNAUTHENTICATED`; 403 `PERMISSION_DENIED`; 422 `VALIDATION_FAILED`
(limit out of range); 429 `RATE_LIMITED`.

### 8.2 `iam.user.get`

| Field | Value |
|---|---|
| Kind | query -> `GET /api/trpc/iam.user.get` |
| Tier | `permissionedProcedure('iam.user.read')` |
| Roles | MASTER_ADMIN, ADMIN; any user may read their own record |
| Bucket | `admin.read` |

```ts
// Input
{ userId: string /* uuid */ }

// Output
{
  id: string,
  email: string,
  fullName: string,
  jobTitle: string | null,
  phone: string | null,
  status: UserStatus,
  roles: Array<{ key: RoleKey, grantedAt: string, grantedBy: string | null }>,
  mfa: { enrolled: boolean, method: 'TOTP' | 'WEBAUTHN' | null, enrolledAt: string | null },
  sessions: { activeCount: number, lastSeenAt: string | null },
  lastLoginAt: string | null,
  version: number,
  createdAt: string,
  updatedAt: string
}
```

**Errors:** 404 `NOT_FOUND` when the user does not exist OR the caller may not see it
(existence is not disclosed); 401; 403; 429.

### 8.3 `iam.user.invite`

| Field | Value |
|---|---|
| Kind | mutation -> `POST /api/trpc/iam.user.invite` |
| Tier | `permissionedProcedure('iam.user.invite')` |
| Roles | MASTER_ADMIN, ADMIN |
| Bucket | `iam.invite` |
| Idempotent | yes |
| Audit | `user.invited` (severity CRITICAL) |

```ts
// Input
{
  email: string,          // RFC 5322, max 254, lowercased server-side
  fullName: string,       // 1..120
  jobTitle?: string,      // max 120
  roleKeys: RoleKey[]     // 1..3 entries; ADMIN may not grant MASTER_ADMIN
}

// Output (201)
{ id: string, email: string, status: 'INVITED', roles: RoleKey[], invitedAt: string }
```

**Behaviour:** creates the `users` row with `status='INVITED'`, creates one
`role_assignments` row per role, sends the invitation email through Resend. Email send
failure does NOT roll back the invitation; the user appears as INVITED with a resend
action available.

**Errors:**
- 409 `CONFLICT` - an active user already holds this email. `details: { userId }`.
- 403 `PERMISSION_DENIED` - caller is ADMIN and `roleKeys` contains `MASTER_ADMIN`.
- 422 `VALIDATION_FAILED` - malformed email, empty `roleKeys`, more than 3 roles.
- 429 `RATE_LIMITED` - more than 20 invitations in an hour.
- 503 `DEPENDENCY_UNAVAILABLE` - Supabase unreachable. The email provider being
  unreachable does not produce this error.

### 8.4 `iam.user.updateProfile`

| Field | Value |
|---|---|
| Kind | mutation -> `POST /api/trpc/iam.user.updateProfile` |
| Tier | `authedProcedure` (self) or `permissionedProcedure('iam.user.update')` (others) |
| Bucket | `admin.write` |
| Audit | `user.profile_updated` |

```ts
// Input
{ userId: string, fullName?: string, jobTitle?: string, phone?: string, expectedVersion: number }
// Output
{ id: string, fullName: string, jobTitle: string | null, phone: string | null, version: number }
```

**Errors:** 409 `CONFLICT` on version mismatch; 403 when editing another user without
`iam.user.update`; 404; 422; 429.

### 8.5 `iam.user.setStatus`

| Field | Value |
|---|---|
| Kind | mutation -> `POST /api/trpc/iam.user.setStatus` |
| Tier | `permissionedProcedure('iam.user.suspend')` |
| Roles | MASTER_ADMIN, ADMIN |
| Bucket | `admin.write` |
| Idempotent | yes |
| Audit | `user.suspended` / `user.reactivated` / `user.deactivated` (CRITICAL) |

```ts
// Input
{ userId: string, status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED', reason: string /* 3..500 */, expectedVersion: number }
// Output
{ id: string, status: UserStatus, revokedSessionCount: number, version: number }
```

**Behaviour:** suspension and deactivation revoke every active session for that user
synchronously, before the response is returned. The response states how many were
revoked.

**Errors:**
- 409 `CONSTITUTIONAL_CONSTRAINT` - the target is the last active MASTER_ADMIN, or the
  caller is the target (no self-suspension). `details: { rule: 'LAST_MASTER_ADMIN' | 'NO_SELF_SUSPEND' }`.
- 403 `PERMISSION_DENIED` - ADMIN attempting to act on a MASTER_ADMIN.
- 404, 409 `CONFLICT`, 422, 429 as standard.

### 8.6 `iam.role.grant` and `iam.role.revoke`

| Field | Value |
|---|---|
| Kind | mutation -> `POST /api/trpc/iam.role.grant` \| `.revoke` |
| Tier | `permissionedProcedure('iam.role.manage')` |
| Roles | MASTER_ADMIN only |
| Bucket | `iam.roleChange` |
| Idempotent | yes |
| Audit | `role.granted` / `role.revoked` (CRITICAL) |

```ts
// grant Input
{ userId: string, roleKey: RoleKey }
// revoke Input
{ userId: string, roleKey: RoleKey, reason: string /* 3..500 */ }
// Output (both)
{ userId: string, roles: RoleKey[] }
```

**Errors:**
- 409 `CONSTITUTIONAL_CONSTRAINT` - revoking the last active MASTER_ADMIN, or the caller
  revoking their own MASTER_ADMIN role.
- 409 `CONFLICT` - grant of a role the user already holds (idempotent replay returns 200
  instead when the idempotency key matches).
- 403, 404, 422, 429 as standard.

### 8.7 `iam.user.resetMfa`

| Field | Value |
|---|---|
| Kind | mutation -> `POST /api/trpc/iam.user.resetMfa` |
| Tier | `permissionedProcedure('iam.user.reset_mfa')` |
| Roles | MASTER_ADMIN only |
| Bucket | `iam.mfaReset` |
| Audit | `user.mfa_reset` (CRITICAL) |

```ts
// Input  { userId: string, reason: string /* 10..500 */ }
// Output { userId: string, mfaEnrolled: false, revokedSessionCount: number }
```

**Behaviour:** clears enrolment, revokes all sessions for that user, and emails the user.
`reason` is mandatory and stored in the audit row - an MFA reset is the highest-risk IAM
operation and must never be attributable to "no reason given".

**Errors:** 403 when the caller is not MASTER_ADMIN; 404; 429; 409
`CONSTITUTIONAL_CONSTRAINT` if the caller targets themselves (self-reset must go through
the account recovery flow, not an admin action).

### 8.8 `iam.session.list` and `iam.session.revoke`

| Field | Value |
|---|---|
| Kind | query / mutation |
| Tier | `permissionedProcedure('iam.session.read')` / `('iam.session.revoke')` |
| Roles | MASTER_ADMIN, ADMIN; any user may list and revoke their own |
| Bucket | `admin.read` / `admin.write` |
| Audit | `session.revoked` on revoke |

```ts
// list Input   { userId?: string, activeOnly?: boolean, limit?: number, cursor?: string }
// list Output  { items: Array<{ id, userId, issuedAt, lastSeenAt, ipAddress, userAgent, idleExpiresAt, absoluteExpiresAt }>, nextCursor }
// revoke Input { sessionId: string }
// revoke Output (204, no body)
```

### 8.9 `iam.permission.matrix`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `authedProcedure` |
| Roles | all staff |
| Bucket | `admin.read` |

Returns the effective permission set for the calling principal. The UI uses it to decide
what to render; it is never the authorization decision itself - every procedure
re-checks server-side.

```ts
// Input  {}
// Output { roles: RoleKey[], permissions: string[], thresholds: Record<string, number>, mfaSatisfied: boolean }
```

---

## 9. Router: `masterdata` (ACC-002)

Base path `/api/trpc/masterdata.*`.

### 9.1 `masterdata.product.list`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `permissionedProcedure('masterdata.product.read')` |
| Roles | all staff |
| Bucket | `admin.read` |

```ts
// Input
{ productLine?: string, category?: 'UNIT'|'OPTION'|'SERVICE'|'FREIGHT'|'FEE',
  isActive?: boolean, search?: string, limit?: number, cursor?: string }

// Output
{ items: Array<{
    sku: string, name: string, productLine: string, category: string,
    basePriceCents: number, currency: string, isActive: boolean,
    leadTimeWeeksMin: number, leadTimeWeeksMax: number, updatedAt: string
  }>, nextCursor: string | null, totalCount: number }
```

### 9.2 `masterdata.product.get`

```ts
// Input  { sku: string }
// Output {
//   sku, name, productLine, category, basePriceCents, currency,
//   shortDescription, longDescription, standardInclusions: string[],
//   dimensions: { lengthFt: number, widthFt: number, heightFt: number, sqft: number },
//   weightLbs: number | null, leadTimeWeeksMin, leadTimeWeeksMax,
//   isConfigurable: boolean, htsCode: string | null, isActive: boolean,
//   version: number, createdAt, updatedAt
// }
```

**Errors:** 404 `NOT_FOUND`; 401; 403; 429.

### 9.3 `masterdata.product.create`

| Field | Value |
|---|---|
| Kind | mutation |
| Tier | `permissionedProcedure('masterdata.product.create')` |
| Roles | MASTER_ADMIN, ADMIN |
| Bucket | `admin.write` |
| Idempotent | yes |
| Audit | `product.created` |

```ts
// Input
{ sku: string,               // ^[A-Z0-9][A-Z0-9-]{2,31}$
  name: string,              // 1..160
  productLine: 'EXPANDABLE'|'APPLE_CABIN'|'SPACE_CAPSULE'|'ASSEMBLY'|'FOLDOUT',
  category: 'UNIT'|'OPTION'|'SERVICE'|'FREIGHT'|'FEE',
  basePriceCents: number,    // integer >= 0
  currency?: string,         // ISO 4217, default 'USD'
  shortDescription: string,  // 1..300
  longDescription: string,
  standardInclusions: string[],
  dimensions: { lengthFt: number, widthFt: number, heightFt: number, sqft: number },
  weightLbs?: number,
  leadTimeWeeksMin: number,
  leadTimeWeeksMax: number,
  isConfigurable?: boolean,
  htsCode?: string }

// Output (201) { sku: string, isActive: false, version: 1, createdAt: string }
```

**Behaviour:** a created product is `is_active = false`. Activation is a separate,
separately-permissioned call, so that creating a catalogue entry can never accidentally
expose it on the public site.

**Errors:** 409 `CONFLICT` on duplicate SKU; 422 on SKU pattern violation,
`leadTimeWeeksMax < leadTimeWeeksMin`, or negative price; 403; 429.

### 9.4 `masterdata.product.update`

| Field | Value |
|---|---|
| Kind | mutation |
| Tier | `thresholdProcedure('masterdata.product.update', input => input.basePriceCents)` |
| Roles | ADMIN and above; price changes above the role threshold require approval |
| Bucket | `admin.write` |
| Audit | `product.updated`, plus `product.price_changed` (CRITICAL) when price moves |

```ts
// Input  { sku: string, ...mutableFields, expectedVersion: number }
// Output { sku: string, version: number, updatedAt: string, priceChanged: boolean }
```

**Errors:**
- 403 `THRESHOLD_EXCEEDED` - the price delta exceeds the caller's authority.
  `details: { deltaCents, ceilingCents, requiredRole }`.
- 409 `CONFLICT` on version mismatch.
- 404, 422, 429 as standard.

**Immutable fields:** `sku` and `productLine` are never updatable. Attempting either is
`422 VALIDATION_FAILED` with `details.fieldErrors.sku = ["Field is immutable"]`.

### 9.5 `masterdata.product.setActive`

| Field | Value |
|---|---|
| Kind | mutation |
| Tier | `permissionedProcedure('masterdata.product.publish')` |
| Roles | MASTER_ADMIN, ADMIN |
| Audit | `product.activated` / `product.deactivated` (CRITICAL - changes public exposure) |

```ts
// Input  { sku: string, isActive: boolean, expectedVersion: number }
// Output { sku: string, isActive: boolean, version: number }
```

**Errors:** 409 `CONFLICT` if deactivating a SKU referenced by an open Quote or Order
(Phase 3 onward). `details: { blockingQuoteIds, blockingOrderIds }`. In Phase 1 this
condition cannot arise and the check is nevertheless implemented.

### 9.6 `masterdata.priceBook.list` / `.get` / `.create` / `.addEntries` / `.activate`

| Procedure | Tier | Roles | Audit |
|---|---|---|---|
| `.list` | `permissionedProcedure('masterdata.pricebook.read')` | all staff | none |
| `.get` | `permissionedProcedure('masterdata.pricebook.read')` | all staff | none |
| `.create` | `permissionedProcedure('masterdata.pricebook.create')` | ADMIN+ | `price_book.created` |
| `.addEntries` | `permissionedProcedure('masterdata.pricebook.create')` | ADMIN+ | `price_book.entries_added` |
| `.activate` | `permissionedProcedure('masterdata.pricebook.activate')` | MASTER_ADMIN only | `price_book.activated` (CRITICAL) |

```ts
// create Input
{ code: string, name: string, currency?: string, effectiveFrom: string /* ISO date */, effectiveTo?: string }
// create Output (201) { id: string, code: string, status: 'DRAFT' }

// addEntries Input
{ priceBookId: string, entries: Array<{ sku: string, unitPriceCents: number, minQuantity?: number }> }  // 1..500 entries
// addEntries Output { priceBookId: string, added: number, skipped: Array<{ sku: string, reason: string }> }

// activate Input  { priceBookId: string, confirmEffectiveFrom: string }
// activate Output { priceBookId: string, status: 'ACTIVE', activatedAt: string, supersededPriceBookId: string | null }
```

**activate behaviour and errors:**
- The caller must echo `confirmEffectiveFrom` matching the stored value, or
  `422 VALIDATION_FAILED`. This is a deliberate confirmation step on an action that
  changes public pricing.
- `409 CONFLICT` if another ACTIVE price book overlaps the effective window.
  `details: { conflictingPriceBookId, overlapFrom, overlapTo }`.
- `403 PERMISSION_DENIED` for any role other than MASTER_ADMIN.
- Rate limited by `masterdata.priceActivate` (10/day).

### 9.7 `masterdata.product.export`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `permissionedProcedure('masterdata.product.export')` |
| Bucket | `export.csv` |
| Audit | `product.exported` (NOTICE) - exports of catalogue data are audited |

Returns `{ filename: string, contentType: 'text/csv', rowCount: number, csv: string }`.
The payload is capped at 10,000 rows; beyond that the call returns
`422 VALIDATION_FAILED` with `details.maxRows`.

---

## 10. Router: `dashboard` (ACC-003)

Base path `/api/trpc/dashboard.*`. Every procedure is a query; the dashboard never
mutates. Initial page data is fetched in the Server Component (CONTRACT-011); these
procedures serve refresh-on-interaction only.

### 10.1 `dashboard.summary`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `authedProcedure` |
| Roles | all staff; the response is filtered by permission |
| Bucket | `dashboard.read` |

```ts
// Input  { asOf?: string /* ISO datetime, default now */ }
// Output
{
  asOf: string,
  tiles: Array<{
    key: string,                  // 'leads.untouched', 'invoices.overdue', ...
    label: string,
    value: number,
    unit: 'COUNT' | 'CENTS' | 'DAYS' | 'PERCENT',
    currency?: string,
    severity: 'INFO' | 'WARNING' | 'CRITICAL',
    href: string | null,          // deep link into the owning module
    module: string                // 'ACC-007'
  }>
}
```

**Permission filtering:** a tile whose backing permission the caller lacks is ABSENT from
`tiles`. It is never returned with a null or zeroed value, because a zero is itself
information. This is a security requirement, not a presentation choice.

**Phase 1 tile set.** Only tiles whose module has shipped return data. In Phase 1 that is:

| Tile key | Permission | Source | Severity rule |
|---|---|---|---|
| `users.pendingInvites` | `iam.user.read` | `users` where status = INVITED | WARNING if older than 7 days |
| `users.withoutMfa` | `iam.user.read` | ACTIVE users with `mfa_enrolled_at IS NULL` | CRITICAL if > 0 |
| `catalog.inactiveProducts` | `masterdata.product.read` | `products` where not active | INFO |
| `catalog.priceBookExpiring` | `masterdata.pricebook.read` | ACTIVE book with `effective_to` within 30 days | WARNING |
| `audit.criticalLast24h` | `audit.read` | `audit_log` where severity = CRITICAL | WARNING if > 0 |

### 10.2 `dashboard.activity`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `permissionedProcedure('audit.read')` |
| Roles | MASTER_ADMIN, ADMIN |
| Bucket | `dashboard.read` |

```ts
// Input  { limit?: number /* 1..50, default 20 */, cursor?: string }
// Output { items: Array<{ id, timestamp, actorName, actorRole, action, resourceType, resourceId, severity, module }>, nextCursor }
```

### 10.3 `dashboard.health`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `permissionedProcedure('system.health.read')` |
| Roles | MASTER_ADMIN, ADMIN |

```ts
// Output
{ database: 'UP'|'DEGRADED'|'DOWN',
  integrityAssertions: Array<{ id: string, passed: boolean, lastRunAt: string, detail: string | null }>,
  lastMigration: { name: string, appliedAt: string } }
```

`integrityAssertions` carries INT-01..INT-07 from BBH-ADMIN-DATABASE-SCHEMA.md
Section 10.2. A failing assertion is surfaced here and alerted through ACC-005.

---

## 11. Router: `audit` (ACC-004 read surface)

### 11.1 `audit.list`

| Field | Value |
|---|---|
| Kind | query |
| Tier | `permissionedProcedure('audit.read')` |
| Roles | MASTER_ADMIN, ADMIN (all); FINANCE_CONTROLLER (finance modules only) |
| Bucket | `admin.read` |

```ts
// Input
{ actorUserId?: string, action?: string, resourceType?: string, resourceId?: string,
  module?: string, severity?: 'INFO'|'NOTICE'|'WARNING'|'CRITICAL',
  from?: string, to?: string,      // ISO datetimes; window max 90 days
  limit?: number, cursor?: string }

// Output
{ items: Array<{
    id, timestamp, actorUserId, actorName, actorRole, action,
    resourceType, resourceId, severity, module, requestId,
    ipAddress: string | null, userAgent: string | null }>,
  nextCursor: string | null }
```

`totalCount` is never returned - counting an unbounded audit range is a performance
hazard. A window wider than 90 days returns `422 VALIDATION_FAILED`.

### 11.2 `audit.get`

```ts
// Input  { auditId: string }
// Output { ...listFields, beforeState: object | null, afterState: object,
//          diff: Array<{ field: string, before: unknown, after: unknown }> }
```

`diff` is computed server-side so every client renders the same field-level change set.

**There is no `audit.create`, `audit.update`, or `audit.delete` procedure on any router.**
Audit rows are written only by the canonical writer inside a transaction with the
mutation they describe (CONTRACT-004, CON-16).

---

## 12. REST Surface

Phase 1 exposes exactly two REST endpoints. Neither is reachable with a session cookie;
both authenticate by signature or shared secret.

### 12.1 `GET /api/admin/health`

| Field | Value |
|---|---|
| Auth | none |
| Purpose | Uptime probe for Vercel and external monitoring |
| Rate limit | 60/min per IP |

```
200 { "status": "ok", "version": "<git sha>", "timestamp": "<ISO>" }
503 { "error": { "code": "DEPENDENCY_UNAVAILABLE", "message": "Database unreachable." } }
```

The health endpoint performs one `SELECT 1` against Postgres. It never discloses
migration state, table names, or environment configuration.

### 12.2 `POST /api/admin/webhooks/stripe`

| Field | Value |
|---|---|
| Auth | `Stripe-Signature` header verified against `STRIPE_WEBHOOK_SECRET` |
| Purpose | Payment events. Present in Phase 1 only to reserve the path and prove signature verification; event handling ships with ACC-016 in Phase 3. |
| Idempotency | `stripe_event_id` unique constraint (BBH-ADMIN-DATABASE-SCHEMA.md Section 9.2) |
| Rate limit | none (Stripe controls delivery rate) |

| Status | Condition |
|---|---|
| 200 | Event accepted, or already processed (idempotent replay) |
| 400 | Body is not valid JSON or the signature header is absent |
| 401 | Signature verification failed |
| 422 | Event type is recognised but the payload fails schema validation |
| 503 | Database unreachable - Stripe will retry |

A 5xx is the only response that causes Stripe to retry; the handler therefore returns 200
for events it deliberately ignores, and 503 only for genuinely transient faults.

---

## 13. Contract Test Requirements

Every procedure in this document requires the following tests before its module may be
declared complete. These are the API-layer subset of the acceptance criteria in
BBH-ADMIN-PHASE1-BUILD-MANIFEST.md Section 7.

| # | Test | Applies to |
|---|---|---|
| T1 | Happy path returns the documented output shape, validated against the response schema | every procedure |
| T2 | Unauthenticated call returns 401 `UNAUTHENTICATED` | every procedure |
| T3 | Authenticated but unpermitted role returns 403 `PERMISSION_DENIED` or 404 where documented | every permissioned procedure |
| T4 | Invalid input returns 422 with `fieldErrors` naming the offending field | every procedure with input |
| T5 | Version mismatch returns 409 `CONFLICT` | every procedure accepting `expectedVersion` |
| T6 | Replayed idempotency key returns the original response; changed payload returns 409 | every Idempotent mutation |
| T7 | Exceeding the bucket returns 429 with `Retry-After` | one procedure per bucket |
| T8 | The documented audit event exists in `audit_log` with correct actor, action, and severity | every mutation |
| T9 | Constitutional constraint returns 409 `CONSTITUTIONAL_CONSTRAINT` | `iam.user.setStatus`, `iam.role.revoke`, `iam.user.resetMfa` |
| T10 | Response carries `Cache-Control: private, no-store` | every procedure |

Tests run against a real Supabase instance with real routes (CLAUDE.md Iron Law 5). A
mocked Supabase client, a stubbed session, or an in-memory permission table invalidates
the result.

---

**End of BBH-ADMIN-API-CONTRACTS.md**
