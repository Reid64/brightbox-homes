# BBH ADMIN COMMAND CENTER - PHASE 1 BUILD MANIFEST

**Document ID:** BBH-ADMIN-PHASE1-BUILD-MANIFEST
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Delivers:** ACC-001 (IAM), ACC-002 (Master Data), ACC-003 (Core Dashboard), ACC-004 (Audit sink and read surface)

---

## 1. How To Use This Manifest

This is the executable half of the specification layer. Every file listed in Section 4
must exist on disk before gates 1-4 run; a missing declared file is an immediate fail
under the orchestrator's `file_exists` gate (`CLAUDE.md` Section 3). Every test in
Section 7 must pass against real infrastructure. Every acceptance criterion in Section 8
must be demonstrated with captured output.

**Nothing here may be started until the Phase 1 prerequisites in Section 2 hold.**

**Out of scope for Phase 1.** ACC-005 (P1, may slip), and every module in Phases 2-7.
Tables for later modules are created DORMANT by the migrations in Section 5 but receive no
route, no procedure, no component, and no policy. Building a dormant module's UI during
Phase 1 is scope drift and fails review.

---

## 2. Prerequisites

| # | Prerequisite | Verification |
|---|---|---|
| P1 | The six sibling specification documents are committed and unmodified. | `git log --oneline apps/web/docs/admin/` |
| P2 | ADR-P04 (background job runner) is NOT required for Phase 1 - no sweep exists yet. | This document |
| P3 | Supabase project reachable with service-role credentials in the build environment. | `pnpm exec supabase projects list` |
| P4 | `citext` and `pgcrypto` extensions available on the target instance. | Migration 01 pre-check |
| P5 | At least one existing `admin_users` row to migrate, or an explicit decision to seed a first MASTER_ADMIN. | Migration 08 pre-check |
| P6 | Current gates green on `main` before the first prompt. | Section 9 commands |

If P5 cannot be satisfied, HALT: a Phase 1 deployment with zero MASTER_ADMIN accounts is
unrecoverable through the application, because role administration is MASTER_ADMIN-only
(IAM Section 4.3) and CC-01 prevents bootstrapping from a lower role.

---

## 3. Build Order

Nine prompts, each independently gated. One prompt at a time, fully verified before the
next (`CLAUDE.md` Section 6). A prompt that fails three recovery attempts halts the run.

| # | Prompt | Delivers | Gate focus |
|---|---|---|---|
| 1 | Database foundation | Migrations 01-08, generated types | Migrations apply with pre/post-check output |
| 2 | Permission core | `matrix.ts`, `check-permission.ts`, `caps.ts`, `codes.ts`, `app-error.ts` | Unit tests; CONTRACT-003 scan |
| 3 | Session and middleware | `session.ts`, whole-file `middleware.ts` replacement | Integration tests; Iron Law 4 compliance |
| 4 | tRPC foundation | context, middleware tiers, error formatter, root router, HTTP handler | Integration: 401/403/422 shapes |
| 5 | Audit writer | `audit-writer.ts`, `audit` router | Integration: every write attributed |
| 6 | IAM module | `iam` router, services, `/admin/users`, `/admin/roles` | Matrix-driven permission tests |
| 7 | Master data module | Migrations 09-10, `masterdata` router, `/admin/catalog` | Threshold tests, price book activation |
| 8 | Dashboard | `dashboard` router, `/admin` page, tiles | CONTRACT-011 scan; permission filtering |
| 9 | Dormant schema + E2E | Migrations 11-28, Playwright suite, integrity assertions | Full gate chain; INT-01..INT-07 |

Migrations 11-28 land in prompt 9 deliberately: the dormant spine is created only after
the live modules are proven, so a failure in prompts 1-8 never leaves 20 unreachable
tables behind.

---

## 4. Files To Create

Paths are relative to `apps/web/` unless prefixed. A file not listed here is not part of
Phase 1.

### 4.1 Prompt 2 - Permission core

| Path | Purpose |
|---|---|
| `lib/permissions/matrix.ts` | The IAM Section 4 matrix as typed data. Single source for policies and tests. |
| `lib/permissions/types.ts` | `RoleKey`, `PermissionKey`, `Principal`, `PermissionDecision`. |
| `lib/auth/check-permission.ts` | The canonical authorization helper (CONTRACT-003). |
| `lib/auth/constitutional.ts` | CC-01..CC-12 evaluated before any override. |
| `lib/caps.ts` | Rate buckets and monetary thresholds (CONTRACT-009). |
| `lib/errors/codes.ts` | `ErrorCode` enum (CONTRACT-010). |
| `lib/errors/app-error.ts` | `AppError` plus `toAppError`. |
| `lib/errors/http-map.ts` | ErrorCode to HTTP status, per API Section 5. |

### 4.2 Prompt 3 - Session and middleware

| Path | Purpose |
|---|---|
| `lib/auth/session.ts` | Issue, verify, heartbeat, revoke; token hashing. |
| `lib/auth/principal.ts` | Load `users` + active roles into a `Principal`. |
| `middleware.ts` | WHOLE-FILE REPLACEMENT (Iron Law 4). Matcher, three checks, nothing else. |

### 4.3 Prompt 4 - tRPC foundation

| Path | Purpose |
|---|---|
| `server/trpc/trpc.ts` | Context, `authedProcedure`, `mfaProcedure`, `permissionedProcedure`, `thresholdProcedure`, error formatter. |
| `server/trpc/root.ts` | `appRouter` composition and `AppRouter` export. |
| `app/api/trpc/[trpc]/route.ts` | The single HTTP entry point. |
| `lib/trpc/client.ts` | Client-side tRPC + TanStack Query provider. |
| `lib/trpc/server.ts` | Server-side caller for Server Components (CONTRACT-011). |
| `server/db/client.ts` | Service-role client, `import 'server-only'`. |
| `server/db/types.ts` | Generated Supabase types (committed). |
| `app/api/admin/health/route.ts` | REST uptime probe. |

### 4.4 Prompt 5 - Audit

| Path | Purpose |
|---|---|
| `server/services/audit/audit-writer.ts` | The only audit insert path. |
| `server/services/audit/actions.ts` | The action catalogue with severities. |
| `server/services/audit/diff.ts` | Field-level before/after diff. |
| `server/trpc/routers/audit.ts` | `audit.list`, `audit.get`. |
| `app/(admin)/admin/audit/page.tsx` | Audit browser (Server Component). |
| `app/(admin)/admin/audit/AuditTableClient.tsx` | Filters and pagination. |

### 4.5 Prompt 6 - IAM

| Path | Purpose |
|---|---|
| `schemas/admin/iam.ts` | Zod inputs and outputs for all `iam.*` procedures. |
| `server/trpc/routers/iam.ts` | The nine procedures in API Section 8. |
| `server/services/iam/invite-user.ts` | Invite plus role grant, one transaction. |
| `server/services/iam/set-user-status.ts` | Status change plus synchronous session revocation. |
| `server/services/iam/manage-roles.ts` | Grant and revoke with CC-01, CC-02, CC-11. |
| `server/services/iam/reset-mfa.ts` | MFA reset with mandatory reason. |
| `server/services/iam/sessions.ts` | List and revoke. |
| `app/(admin)/layout.tsx` | Admin shell; loads the principal once. |
| `app/(admin)/error.tsx` | Route-group error boundary. |
| `app/(admin)/not-found.tsx` | Also serves permission-hidden resources. |
| `app/(admin)/admin/login/page.tsx` | Sign-in. |
| `app/(admin)/admin/login/LoginForm.tsx` | Credentials plus MFA challenge. |
| `app/(admin)/admin/users/page.tsx` | User list (Server Component fetch). |
| `app/(admin)/admin/users/UsersTableClient.tsx` | Table, filters, actions. |
| `app/(admin)/admin/users/[userId]/page.tsx` | User detail. |
| `app/(admin)/admin/users/[userId]/UserDetailClient.tsx` | Role, status, session, MFA actions. |
| `app/(admin)/admin/users/invite/InviteUserForm.tsx` | Invitation form. |
| `app/(admin)/admin/roles/page.tsx` | Role reference and matrix view. |
| `components/admin/layout/AdminShell.tsx` | Chrome. |
| `components/admin/layout/AdminNav.tsx` | Permission-filtered navigation. |
| `components/admin/layout/PrincipalMenu.tsx` | Identity, sessions, sign out. |
| `components/admin/data/DataTable.tsx` | Headless table wrapper. |
| `components/admin/data/CursorPager.tsx` | Cursor pagination. |
| `components/admin/data/FilterBar.tsx` | Filter controls. |
| `components/admin/data/EmptyState.tsx` | Empty and no-permission states. |
| `components/admin/feedback/ErrorPanel.tsx` | Renders `AppError` with the request id. |
| `components/admin/feedback/ConfirmDialog.tsx` | Destructive-action confirmation. |
| `components/admin/feedback/ThresholdNotice.tsx` | Explains a `THRESHOLD_EXCEEDED` denial. |

### 4.6 Prompt 7 - Master data

| Path | Purpose |
|---|---|
| `schemas/admin/masterdata.ts` | Zod shapes for `masterdata.*`. |
| `server/trpc/routers/masterdata.ts` | Product and price book procedures. |
| `server/services/masterdata/products.ts` | CRUD plus publish with threshold checks. |
| `server/services/masterdata/price-books.ts` | Create, add entries, activate with overlap detection. |
| `server/services/masterdata/export-csv.ts` | Capped CSV export. |
| `app/(admin)/admin/catalog/page.tsx` | Product list. |
| `app/(admin)/admin/catalog/ProductsTableClient.tsx` | Table and filters. |
| `app/(admin)/admin/catalog/[sku]/page.tsx` | Product detail. |
| `app/(admin)/admin/catalog/[sku]/ProductFormClient.tsx` | Edit with `expectedVersion`. |
| `app/(admin)/admin/catalog/price-books/page.tsx` | Price book list. |
| `app/(admin)/admin/catalog/price-books/PriceBookClient.tsx` | Entries and activation. |

### 4.7 Prompt 8 - Dashboard

| Path | Purpose |
|---|---|
| `schemas/admin/dashboard.ts` | Zod shapes for `dashboard.*`. |
| `server/trpc/routers/dashboard.ts` | `summary`, `activity`, `health`. |
| `server/services/dashboard/tiles.ts` | Tile definitions with their permission and query. |
| `server/services/dashboard/health.ts` | Integrity assertion runner. |
| `app/(admin)/admin/page.tsx` | The dashboard (Server Component fetch, CONTRACT-011). |
| `app/(admin)/admin/DashboardClient.tsx` | Tile grid and refresh. |
| `components/admin/data/StatTile.tsx` | One tile. |

### 4.8 Test files

| Path | Covers |
|---|---|
| `tests/unit/permissions/matrix.test.ts` | Matrix completeness and shape |
| `tests/unit/permissions/check-permission.test.ts` | Decision order, scopes, overrides |
| `tests/unit/permissions/constitutional.test.ts` | CC-01..CC-12 |
| `tests/unit/permissions/thresholds.test.ts` | Section 6 ceilings at and around the boundary |
| `tests/unit/errors/http-map.test.ts` | ErrorCode to status |
| `tests/integration/iam/*.test.ts` | All nine `iam.*` procedures |
| `tests/integration/masterdata/*.test.ts` | All `masterdata.*` procedures |
| `tests/integration/dashboard/*.test.ts` | Tile permission filtering |
| `tests/integration/audit/*.test.ts` | Attribution and immutability |
| `tests/integration/session/*.test.ts` | Timeouts, revocation, concurrency cap |
| `tests/integration/schema/integrity.test.ts` | INT-01..INT-07 |
| `tests/integration/schema/rls.test.ts` | Dormant tables deny all |
| `tests/e2e/admin-auth.spec.ts` | Login, MFA, logout, idle expiry |
| `tests/e2e/admin-iam.spec.ts` | Invite, grant, suspend, revoke sessions |
| `tests/e2e/admin-catalog.spec.ts` | Create, edit, publish, price book activation |
| `tests/e2e/admin-dashboard.spec.ts` | Role-scoped tiles |
| `tests/e2e/admin-permissions.spec.ts` | A low-privilege role is denied everywhere the matrix says so |

### 4.9 Verification scripts

| Path | Asserts |
|---|---|
| `scripts/verify-auth-centralized.ps1` | No authorization decision outside `check-permission.ts` (CONTRACT-003) |
| `scripts/verify-no-mount-fetch.ps1` | No initial-data `useEffect` fetch under `(admin)` (CONTRACT-011) |
| `scripts/verify-caps-single-source.ps1` | No numeric cap literals outside `lib/caps.ts` (CONTRACT-009) |
| `scripts/verify-error-shape.ps1` | No generic error strings in catch blocks (CONTRACT-010) |
| `scripts/verify-audit-coverage.ps1` | Every mutating service calls the audit writer (CONTRACT-004) |
| `scripts/verify-rls-enabled.ps1` | Every table has RLS on (INT-05) |
| `scripts/check-encoding.ps1` | No BOM, no mojibake (CONTRACT-007, CONTRACT-016) |

All scripts enumerate artifacts dynamically by filesystem scan or database introspection.
A hardcoded artifact list in any of them violates CONTRACT-005.

---

## 5. Migrations

Exactly as ordered in BBH-ADMIN-DATABASE-SCHEMA.md Section 13. Each file carries a
pre-check block, the change, and a post-check block (CONTRACT-012).

| Prompt | Migrations | Notes |
|---|---|---|
| 1 | 01-08 | Extensions, shared functions, roles seed, users, role_assignments, sessions, audit_log extension, `admin_users` data migration |
| 7 | 09-10 | Products extension, price books |
| 9 | 11-28 | Dormant spine, views, RLS enable, Phase 1 policies, integrity assertions |

### 5.1 Migration template

```sql
-- 20260911_0130_create_users.sql
BEGIN;

-- PRE-CHECK: assumptions must hold or the migration aborts.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'citext') THEN
    RAISE EXCEPTION 'PRECHECK_FAILED: citext extension absent';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_schema='public' AND table_name='users') THEN
    RAISE EXCEPTION 'PRECHECK_FAILED: users already exists';
  END IF;
END $$;

-- CHANGE
CREATE TABLE users ( ... );
CREATE INDEX users_status_idx ON users (status) WHERE status = 'ACTIVE';
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- POST-CHECK: the change took effect.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables
                 WHERE table_schema='public' AND table_name='users') THEN
    RAISE EXCEPTION 'POSTCHECK_FAILED: users not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes
                 WHERE tablename='users' AND indexname='users_status_idx') THEN
    RAISE EXCEPTION 'POSTCHECK_FAILED: users_status_idx missing';
  END IF;
END $$;

COMMIT;
```

### 5.2 The `admin_users` migration (08) - highest risk

| Step | Action |
|---|---|
| Pre-check | `admin_users` exists; at least one row with `is_active = true` and `role = 'MASTER_ADMIN'`; `users` is empty |
| Backup | `CREATE TABLE admin_users_migration_backup AS SELECT * FROM admin_users` |
| Insert | One `users` row per `admin_users` row: `status = 'ACTIVE'` where `is_active`, else `'DEACTIVATED'` |
| Insert | One `role_assignments` row per user mapping the old two-value role |
| Post-check | `count(users) = count(admin_users)`; at least one ACTIVE MASTER_ADMIN assignment exists (INT-07) |
| Retain | `admin_users` is NOT dropped. It is dropped in a later, separate migration after one release. |

Dropping `admin_users` in the same migration as the cutover is forbidden. If the post-check
fails, the transaction rolls back and the system still has a working authorization source.

---

## 6. Seed Data

| Seed | Content | Where |
|---|---|---|
| Roles | The ten rows from IAM Section 3, with `rank` and `requires_mfa = true` | Migration 03 |
| Permissions | None - the matrix is code (`lib/permissions/matrix.ts`), not data (ADR-B05) | - |
| First MASTER_ADMIN | Migrated from `admin_users`, or explicitly seeded if P5 required it | Migration 08 |
| Products | Existing rows retained; no new seed | - |
| Price book | One DRAFT book `US-RETAIL-INITIAL` populated from current `products.base_price_cents` | Migration 10 |

The initial price book is created as DRAFT, not ACTIVE. Activation is a deliberate
MASTER_ADMIN action so that no migration silently changes public pricing.

---

## 7. Tests Required

### 7.1 Unit (Vitest, no external dependency)

| # | Test | Asserts |
|---|---|---|
| U-01 | Matrix completeness | Every permission key appears for all ten roles with a legal value |
| U-02 | Matrix and namespace | Every key matches `<module>.<resource>.<action>` with a known verb |
| U-03 | Decision order | Constitutional denial beats a MASTER_ADMIN override |
| U-04 | Union of roles | Two roles yield the union of permissions |
| U-05 | Maximum of thresholds | Two roles yield the higher ceiling |
| U-06 | Self scope | `S` grants only when `targetUserId === principal.id` |
| U-07 | Owner scope | `O` grants only when `ownerUserId === principal.id` |
| U-08 | Threshold boundaries | At the ceiling allowed; one cent above denied |
| U-09 | Percentage vs absolute discount | Whichever binds first applies |
| U-10 | ErrorCode mapping | Every code maps to exactly one status |
| U-11 | Payment split rounding | Remainder lands on stage 4; four stages sum to the total |

### 7.2 Integration (Vitest against real Supabase - Iron Law 5)

| # | Test | Asserts |
|---|---|---|
| I-01 | Invite happy path | 201, `users` row, `role_assignments` row, `user.invited` audit row |
| I-02 | Invite duplicate | 409 `CONFLICT` with the existing `userId` |
| I-03 | ADMIN cannot grant MASTER_ADMIN | 403 `PERMISSION_DENIED` |
| I-04 | Last MASTER_ADMIN protection | 409 `CONSTITUTIONAL_CONSTRAINT` on revoke, suspend, and deactivate |
| I-05 | MASTER_ADMIN cannot bypass CC-01 | Same denial for the highest role |
| I-06 | Suspension revokes sessions | `revokedSessionCount > 0`; the revoked token is rejected on the next request |
| I-07 | MFA reset requires a reason | 422 without it; audit row contains it when present |
| I-08 | Self-targeting blocked | CC-02, CC-03, CC-04 each return 409 |
| I-09 | Version conflict | Stale `expectedVersion` returns 409 with both versions |
| I-10 | Idempotent replay | Same key and payload replays the original response; changed payload returns 409 |
| I-11 | Rate limit | Bucket exhaustion returns 429 with `Retry-After` |
| I-12 | Product create is inactive | New product has `is_active = false` |
| I-13 | Immutable product fields | Updating `sku` or `productLine` returns 422 |
| I-14 | Price change threshold | Above-ceiling delta returns 403 `THRESHOLD_EXCEEDED` with the required role |
| I-15 | Price book overlap | Activating an overlapping window returns 409 with the conflicting id |
| I-16 | Price book activation is MASTER_ADMIN only | ADMIN receives 403 |
| I-17 | Price book confirmation echo | Wrong `confirmEffectiveFrom` returns 422 |
| I-18 | Audit immutability | UPDATE and DELETE on `audit_log` fail for every role |
| I-19 | Audit context required | A mutation without actor context raises `AUDIT_CONTEXT_MISSING` |
| I-20 | Audit window cap | A range over 90 days returns 422 |
| I-21 | Dashboard filtering | A role lacking a tile's permission does not receive the tile key at all |
| I-22 | Dormant tables deny | Every dormant table returns zero rows and rejects writes for every role |
| I-23 | RLS parity | A direct query denied by RLS matches a `checkPermission` denial, per representative table |
| I-24 | Session idle expiry | A request after the idle window returns 401 `SESSION_EXPIRED` |
| I-25 | Session absolute expiry | A request after the absolute window returns 401 even with activity |
| I-26 | Concurrent session cap | A fourth session revokes the oldest |
| I-27 | Denial auditing | A denied request writes `permission.denied` |
| I-28 | Integrity assertions | INT-01..INT-07 all pass on a seeded database |
| I-29 | Cache headers | Every procedure response carries `private, no-store` |
| I-30 | Health endpoint | 200 when the database is up; 503 with the structured body when down |

### 7.3 E2E (Playwright against the running app - no mocks)

| # | Test | Asserts |
|---|---|---|
| E-01 | Sign-in and MFA | A user without MFA enrolment is routed to enrolment and cannot reach `/admin` |
| E-02 | Dashboard renders | Tiles appear for the signed-in role, with no client mount-fetch |
| E-03 | Invite flow | MASTER_ADMIN invites; the user appears as INVITED in the list |
| E-04 | Role grant flow | Granting a role updates the detail view and the audit page |
| E-05 | Suspend flow | Suspension shows the revoked session count and the user cannot sign in |
| E-06 | Catalog create and publish | Product created inactive, then published, visible in the list |
| E-07 | Price book activation | Confirmation step required; activation visible in the audit page |
| E-08 | Permission denial UX | SALES_REP sees no Users nav item and receives a not-found on direct navigation |
| E-09 | Error surface | An induced failure renders `ErrorPanel` with the request id, not a generic string |
| E-10 | Audit trail completeness | Every action taken in E-03..E-07 appears in the audit page with the right actor |

---

## 8. Acceptance Criteria

A module is accepted only when all of its criteria are demonstrated with captured output.
"It compiles" is not acceptance (`CLAUDE.md` Section 2).

### 8.1 ACC-001 Identity and Access Management

| # | Criterion | Evidence |
|---|---|---|
| AC-1.1 | Ten roles exist with the seeded ranks and `requires_mfa = true`. | `SELECT key, rank, requires_mfa FROM roles ORDER BY rank DESC` |
| AC-1.2 | A MASTER_ADMIN can invite a user who then signs in, enrols MFA, and reaches `/admin`. | E-01, E-03 |
| AC-1.3 | Every permission cell in IAM Section 4.3 is enforced. | Generated tests from `matrix.ts`, all green |
| AC-1.4 | CC-01..CC-12 each deny MASTER_ADMIN. | I-04, I-05, I-08 |
| AC-1.5 | Suspension revokes sessions synchronously. | I-06, E-05 |
| AC-1.6 | Idle and absolute timeouts both terminate a session. | I-24, I-25 |
| AC-1.7 | Every IAM action in IAM Section 9 produces its audit row with the right severity. | I-01, E-10, plus an `audit_log` query per action |
| AC-1.8 | Zero authorization decisions outside `check-permission.ts`. | `scripts/verify-auth-centralized.ps1` exit 0 |
| **Six Laws** | Schema: migrations 03-06. API: `iam` router. UI: `/admin/users`, `/admin/roles`. Data: real rows migrated from `admin_users`. Wiring: nav entry, middleware matcher, route registered. Verification: E-01, E-03, E-04, E-05 green. | |

### 8.2 ACC-002 Master Data

| # | Criterion | Evidence |
|---|---|---|
| AC-2.1 | Products are creatable, editable, and publishable by permitted roles only. | I-12, I-16, E-06 |
| AC-2.2 | `sku` and `productLine` are immutable after creation. | I-13 |
| AC-2.3 | Price changes above threshold are refused with the required role named. | I-14 |
| AC-2.4 | Price book activation is MASTER_ADMIN-only, confirmation-gated, and overlap-checked. | I-15, I-16, I-17, E-07 |
| AC-2.5 | Every price change and activation is audited at CRITICAL. | `audit_log` query |
| AC-2.6 | The public marketing site still reads the ACTIVE price book correctly. | E2E against a public product page |
| **Six Laws** | Schema: migrations 09-10. API: `masterdata` router. UI: `/admin/catalog`. Data: existing products plus a DRAFT price book. Wiring: nav, routes, marketing read path. Verification: E-06, E-07. | |

### 8.3 ACC-003 Core Dashboard

| # | Criterion | Evidence |
|---|---|---|
| AC-3.1 | All five Phase 1 tiles render with real values. | E-02 |
| AC-3.2 | A tile the role cannot read is absent from the response, not zeroed. | I-21 |
| AC-3.3 | Initial data is fetched in the Server Component. | `scripts/verify-no-mount-fetch.ps1` exit 0 |
| AC-3.4 | TTI under 2s at P75 with seeded production-scale data. | Playwright trace |
| AC-3.5 | The health surface reports INT-01..INT-07. | I-28 |
| **Six Laws** | Schema: none new. API: `dashboard` router. UI: `/admin`. Data: live aggregates. Wiring: default landing route after sign-in. Verification: E-02. | |

### 8.4 ACC-004 Audit

| # | Criterion | Evidence |
|---|---|---|
| AC-4.1 | Every mutation in Phase 1 writes exactly one audit row with actor, role, before, after, IP, and user agent. | `scripts/verify-audit-coverage.ps1` plus I-01 |
| AC-4.2 | `audit_log` rejects UPDATE and DELETE for every role including MASTER_ADMIN. | I-18 |
| AC-4.3 | A mutation attempted without audit context fails. | I-19 |
| AC-4.4 | The audit browser filters by actor, action, resource, module, severity, and window. | E-10 |
| AC-4.5 | Denials are audited, not only successes. | I-27 |
| **Six Laws** | Schema: migration 07. API: `audit` router. UI: `/admin/audit`. Data: rows from real actions. Wiring: nav, links from every detail page. Verification: E-10. | |

### 8.5 Phase gate

Phase 1 is complete only when AC-1.*, AC-2.*, AC-3.*, AC-4.* all pass **and** all four
quality gates are green on the final state **and** the seven verification scripts in
Section 4.9 exit 0.

---

## 9. Validation Commands

Run from `apps/web/` unless noted. Output is captured verbatim in the completion report;
paraphrased or reconstructed output is a CLAUDE.md Iron Law 3 violation.

### 9.1 Gate chain (after every prompt, in this order)

```
pnpm tsc --noEmit                 # gate 1 - compile
pnpm run build                    # gate 2 - production build
pnpm run lint                     # gate 3 - lint
pnpm exec playwright test         # gate 4 - E2E against the real stack
```

### 9.2 Test tiers

```
pnpm exec vitest run tests/unit
pnpm exec vitest run tests/integration        # requires real Supabase credentials
pnpm exec playwright test tests/e2e
```

### 9.3 Contract verification scripts

```
pwsh scripts/verify-auth-centralized.ps1
pwsh scripts/verify-no-mount-fetch.ps1
pwsh scripts/verify-caps-single-source.ps1
pwsh scripts/verify-error-shape.ps1
pwsh scripts/verify-audit-coverage.ps1
pwsh scripts/verify-rls-enabled.ps1
pwsh scripts/check-encoding.ps1
```

### 9.4 Database

```
pnpm exec supabase db push                    # apply migrations in order
pnpm exec supabase db diff                    # MUST report no differences
pnpm exec supabase gen types typescript --linked > server/db/types.ts
git diff --exit-code server/db/types.ts       # MUST be clean; drift fails the build
```

### 9.5 Integrity assertions

```sql
SELECT * FROM run_integrity_assertions();     -- INT-01..INT-07, all must return passed = true
```

---

## 10. Completion Evidence Template

Reproduced per prompt. Every field is required; an omitted field is an incomplete report
(GOVERNANCE_BRIEF.md Section 7, CONTRACT-015).

```
PROMPT: <n> - <name>
MODULE: ACC-00X

FILES CREATED (declared vs actual)
  declared: <count>   actual: <count>   missing: <list or NONE>

MIGRATIONS APPLIED
  <filename>: PRE-CHECK <output> | POST-CHECK <output>

GATES
  pnpm tsc --noEmit          exit <code>   <first 20 lines or PASS>
  pnpm run build             exit <code>   <summary>
  pnpm run lint              exit <code>   <summary>
  pnpm exec playwright test  exit <code>   <passed>/<total>

VERIFICATION SCRIPTS
  <script>: exit <code>

TESTS
  unit:        <passed>/<total>
  integration: <passed>/<total>
  e2e:         <passed>/<total>

PERMISSION EVIDENCE
  <role>: permitted <procedure> -> <status> | denied <procedure> -> <status>
  ... for all ten roles

AUDIT EVIDENCE
  <action>: SELECT id, actor_role, action, severity FROM audit_log WHERE ... -> <row>

SIX LAWS
  SCHEMA:       <artifact>
  API:          <artifact>
  UI:           <artifact>
  DATA:         <artifact>
  WIRING:       <artifact>
  VERIFICATION: <artifact>

DIFF EVIDENCE
  git diff --stat <prior>..<head>
  sha256 of each changed governance-adjacent document

OPEN ISSUES
  <list or NONE>
```

---

## 11. Halt Conditions

Stop and report rather than proceeding (`CLAUDE.md` Section 6). These are specific to
Phase 1 and are additional to the universal Iron Law halts.

| # | Condition |
|---|---|
| H-01 | Migration 08 post-check finds zero ACTIVE MASTER_ADMIN assignments. |
| H-02 | `supabase db diff` is non-empty after applying migrations. |
| H-03 | A verification script cannot be made to pass without weakening its check. |
| H-04 | An acceptance criterion requires a mock to demonstrate (Iron Law 5). |
| H-05 | The permission matrix and an RLS policy disagree and the correct answer is not in IAM Section 4. |
| H-06 | `middleware.ts` needs a change and the complete current specification is not available for a whole-file rewrite (Iron Law 4). |
| H-07 | Any gate is red after the third recovery attempt (Iron Law 6). |
| H-08 | The authoritative 34-module outline arrives and contradicts the derived index in a way that changes Phase 1 scope (OQ-01). |

---

**End of BBH-ADMIN-PHASE1-BUILD-MANIFEST.md**
