# BBH ADMIN COMMAND CENTER - ARCHITECTURE

**Document ID:** BBH-ADMIN-ARCHITECTURE
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11

---

## 1. Relationship To Root ARCHITECTURE.md

The root `ARCHITECTURE.md` is the system architecture lock for Bright Box Homes and
remains authoritative for the monorepo, hosting topology, the configurator package,
the image pipeline, and the marketing application. This document extends it for the
Command Center only. It does not restate, revise, or supersede any root section.

Where this document and root `ARCHITECTURE.md` conflict, root wins and the conflict is a
defect here. Locked decisions in root Section 18 may not be reversed by anything written
here (CONTRACT-002).

---

## 2. Stack

Fixed by `CLAUDE.md` Section 0. No agent may substitute any row.

| Layer | Technology | Version posture |
|---|---|---|
| Framework | Next.js 14, App Router only | Pinned minor; no Pages Router anywhere |
| Language | TypeScript, `strict: true` | No `any`, no `@ts-ignore`, no non-null assertion on external data |
| Database | Supabase Postgres | Migrations versioned and ordered |
| Auth | Supabase Auth | Sessions mirrored into the `sessions` table for revocation |
| Hosting | Vercel | Production deploy target |
| Package manager | pnpm | Lockfile is law |

### 2.1 Additions specific to the Command Center

| Concern | Choice | Rationale | Alternative rejected |
|---|---|---|---|
| Internal API | tRPC v11 | End-to-end types across 34 modules; the router is the contract, so a schema change breaks the build rather than production (ADR-A02) | REST route handlers for every procedure: hand-maintained types drift |
| Validation | Zod | One schema per input, reused by tRPC, forms, and tests | Hand-rolled guards; ad-hoc runtime checks |
| Server state | TanStack Query, via the tRPC client | Already the tRPC default; cache invalidation is explicit | SWR (no tRPC binding), bare fetch (no cache discipline) |
| Forms | React Hook Form + Zod resolver | Shares the Zod schema with the procedure | Uncontrolled forms with manual validation |
| Tables | TanStack Table (headless) | Sorting, cursor pagination, column visibility without owning markup | A component library grid: styling lock-in |
| Styling | Tailwind + the existing `bb-*` tokens | Already the design system of record (DESIGN_LANGUAGE.md) | A second admin-only design system |
| Testing | Vitest (unit and integration), Playwright (E2E) | Matches the existing gate chain | Jest: second runner for no benefit |
| Dates | `date-fns` with explicit UTC handling | Tree-shakeable; no global prototype mutation | Moment: unmaintained, mutable |

No state management library is introduced. Server state lives in TanStack Query; UI state
lives in component state or the URL. Redux, Zustand, and Jotai are all out of scope.

---

## 3. Application Topology

The Command Center is a route group inside `apps/web`, not a separate application
(ADR-A01). It shares the Supabase client, the design tokens, the middleware, and the
deploy pipeline with the marketing site.

```
apps/web
  app/
    (marketing)/          existing public site - untouched by this work
    (admin)/              NEW - the Command Center
      layout.tsx          shell: nav, principal context, error boundary
      admin/
        page.tsx          ACC-003 dashboard
        login/            authentication entry
        users/            ACC-001
        roles/            ACC-001
        catalog/          ACC-002
        audit/            ACC-004
    portal/               existing customer portal (PRD.md PORTAL-*)
    api/
      trpc/[trpc]/route.ts    single tRPC HTTP entry
      admin/health/route.ts   REST: uptime probe
      admin/webhooks/stripe/  REST: signed external callers
  middleware.ts           ONE file for the whole app (Iron Law 4)
```

### 3.1 Route group isolation

`(admin)` is a route group, so it contributes no URL segment; `app/(admin)/admin/users`
serves `/admin/users`. The group exists to give the Command Center its own `layout.tsx`,
`error.tsx`, and `not-found.tsx` without inheriting marketing chrome.

### 3.2 Rendering strategy

| Surface | Strategy | Reason |
|---|---|---|
| Every `/admin` page | Server Component, dynamic, `export const dynamic = 'force-dynamic'` | Authorization-dependent output must never be cached or statically generated |
| Initial data | Server Component fetch, passed as props | CONTRACT-011 - prevents the mount-fetch race |
| Refresh on interaction | tRPC client mutation or query | Explicit user action, no race |
| Marketing site | unchanged | Static and ISR as already specified in root ARCHITECTURE.md |

No `/admin` route is statically rendered, revalidated, or served from the edge cache. Any
`revalidate` export under `(admin)` is a defect.

---

## 4. Folder Structure

```
apps/web/
  app/(admin)/admin/<module>/
    page.tsx              Server Component: authorize, fetch, render
    <Feature>Client.tsx   Client Component: interactivity only
    loading.tsx           Skeleton
    error.tsx             Module error boundary
  components/admin/
    layout/               AdminShell, AdminNav, PrincipalMenu
    data/                 DataTable, CursorPager, FilterBar, EmptyState
    feedback/             ErrorPanel, ConfirmDialog, ThresholdNotice
    fields/               form primitives bound to Zod
  server/
    trpc/
      root.ts             appRouter composition
      trpc.ts             context, middleware tiers, error formatter
      routers/
        iam.ts            ACC-001
        masterdata.ts     ACC-002
        dashboard.ts      ACC-003
        audit.ts          ACC-004
    services/
      iam/                use cases, transaction boundaries
      masterdata/
      audit/audit-writer.ts   the ONLY audit insert path
    db/
      client.ts           service-role client, server-only
      types.ts            generated Supabase types
  lib/
    auth/check-permission.ts  canonical authorization (CONTRACT-003)
    auth/session.ts           session issue, refresh, revoke
    caps.ts                   operational caps (CONTRACT-009)
    errors/codes.ts           ErrorCode enum (CONTRACT-010)
    errors/app-error.ts       AppError class and tRPC mapping
    permissions/matrix.ts     the Section 4 matrix as data
  schemas/admin/
    iam.ts, masterdata.ts, dashboard.ts, common.ts   Zod inputs and outputs
supabase/migrations/        ordered SQL, pre-check and post-check (CONTRACT-012)
tests/
  unit/                   pure logic: permission resolution, thresholds, rounding
  integration/            procedures against real Supabase
  e2e/                    Playwright against the running app
```

### 4.1 Placement rules

1. A file under `server/` never imports from `app/`. Dependencies point inward.
2. A Client Component never imports from `server/`. It reaches the server through tRPC.
3. `lib/db/client.ts` carries `import 'server-only'` so a client import fails at build,
   not at runtime.
4. A Zod schema is defined once in `schemas/admin/` and imported by the procedure, the
   form, and the test. Three copies of a shape is a defect.
5. Business rules live in `server/services/`, not in procedures. A procedure validates,
   authorizes, calls a service, and maps errors - nothing else.

---

## 5. Database Strategy

### 5.1 Two clients, two purposes

| Client | Key | Used by | RLS |
|---|---|---|---|
| Anon client | publishable key | Marketing site, customer portal | Enforced |
| Server client | service role key | tRPC procedures and Server Components, server-only | Bypassed |

The service-role client bypasses RLS, which is exactly why every access through it passes
`checkPermission` first (CONTRACT-003). RLS remains enabled and correct as defence in
depth for any path that does not use the service role, and as the enforcement layer for
the portal and marketing surfaces.

### 5.2 Transaction boundaries

Every state machine transition and every cross-entity handoff
(BBH-ADMIN-BEHAVIORAL-CONTRACTS.md Section 10) runs in one transaction that includes its
audit write. Multi-statement work is expressed as a Postgres function invoked with
`rpc()`, not as a sequence of client calls, because the Supabase JS client offers no
multi-statement transaction.

```
tRPC procedure
  -> checkPermission
  -> service function
       -> supabase.rpc('fn_transition_x', { ...args, actor_user_id, request_id })
            BEGIN
              guards
              state change
              audit insert
            COMMIT
  -> map result or AppError
```

A service that performs two `rpc()` calls to complete one logical action is a defect: it
can half-apply.

### 5.3 Audit context propagation

`set_config('app.actor_user_id', ..., true)` and `app.actor_role` are set at the start of
every transaction that mutates. The `require_audit_context()` trigger fails the mutation
if they are absent, so an un-attributed write cannot reach disk (CONTRACT-004).

### 5.4 Migrations

| Rule | Detail |
|---|---|
| Location | `supabase/migrations/` |
| Naming | `YYYYMMDD_HHMM_<verb>_<subject>.sql` |
| Structure | Pre-check block, change block, post-check block (CONTRACT-012) |
| Reversibility | Every destructive step writes a backup table first |
| Ordering | Numeric prefix; the order in BBH-ADMIN-DATABASE-SCHEMA.md Section 13 is normative |
| Verification | `supabase db diff` must report empty after apply |

### 5.5 Types

Supabase type generation runs in CI, and the generated file is committed. A drift between
the committed types and the live schema fails the build. Hand-edited generated types are
a defect.

---

## 6. Auth Model

Specified in full in BBH-ADMIN-IAM-SPECIFICATION.md. Architectural summary:

```
Request
  |
  v
middleware.ts          session exists? user ACTIVE? session live?     -> 401 / redirect
  |
  v
tRPC context           load users row + active role_assignments       -> Principal
  |
  v
procedure middleware   authed | mfa | permissioned | threshold        -> 403
  |
  v
service                business guards                               -> 409
  |
  v
Postgres               RLS + constraints + triggers                   -> 409 / 500
```

Four layers, each of which can deny. No layer trusts a decision made by a layer above it.
Notably, the client's copy of the permission matrix (`iam.permission.matrix`) is used only
to decide what to render and is never accepted as an authorization decision.

### 6.1 middleware.ts

One file for the entire application (Iron Law 4: replaced whole, never patched). Its
matcher covers marketing needs already in place plus `/admin/:path*` and
`/api/trpc/:path*`. It performs the three checks in IAM Section 7.4 and nothing else. It
does not read the permission matrix, query business tables, or branch on role.

---

## 7. Error Handling

### 7.1 One error type

```ts
// lib/errors/app-error.ts
export class AppError extends Error {
  constructor(
    readonly code: ErrorCode,          // lib/errors/codes.ts (CONTRACT-010)
    message: string,                   // safe to display
    readonly details?: Record<string, unknown>,
    readonly cause?: unknown,          // never serialised to the client
  ) { super(message); }
}
```

Services throw `AppError`. The tRPC error formatter maps `code` to the HTTP status in
BBH-ADMIN-API-CONTRACTS.md Section 5 and emits the structured body. Nothing else is
thrown across a procedure boundary.

### 7.2 Mapping table

| Source | Becomes |
|---|---|
| Zod parse failure | `VALIDATION_FAILED` + `fieldErrors` |
| `checkPermission` denial | its own code: `PERMISSION_DENIED`, `THRESHOLD_EXCEEDED`, `CONSTITUTIONAL_CONSTRAINT`, `MFA_REQUIRED` |
| Postgres `23505` unique violation | `CONFLICT` with the constraint name in `details` |
| Postgres `23503` FK violation | `VALIDATION_FAILED` |
| Postgres `23514` check violation | `CONFLICT` (business invariants are expressed as checks) |
| Custom `RAISE` from a guard function | mapped by its `ERRCODE` and message prefix |
| Supabase connection failure | `DEPENDENCY_UNAVAILABLE` |
| Anything else | `INTERNAL_ERROR`, logged with the stack, never returned with it |

### 7.3 Client behaviour

No `catch` block sets a generic string (CONTRACT-010). Every handler displays
`error.message` from the structured response, and error boundaries show the request id so
a user can quote it in a support message.

```tsx
// forbidden
catch { setError('Something went wrong'); }
// required
catch (e) { setError(toAppError(e).message); }
```

### 7.4 Boundaries

| Boundary | File | Shows |
|---|---|---|
| Route group | `app/(admin)/error.tsx` | Recoverable message, request id, retry |
| Module | `app/(admin)/admin/<module>/error.tsx` | Module-scoped failure, nav intact |
| Global | `app/global-error.tsx` | Last resort, no app chrome |
| Not found | `app/(admin)/not-found.tsx` | Also used for permission-hidden resources |

---

## 8. Performance

| Budget | Target | Enforcement |
|---|---|---|
| Dashboard TTI | < 2s at P75 with production data | Playwright trace assertion in the E2E gate |
| List query | < 300ms server time at 100k rows | Every list has a covering index (SCHEMA Section 14) |
| Procedure payload | < 250KB | Cursor pagination caps page size at 100 |
| Client bundle for `/admin` | < 250KB gzipped, first load | `next build` output inspected in the build gate |

### 8.1 Rules

1. Every list query is cursor-paginated and index-backed. A sequential scan on a table
   over 10,000 rows is a defect.
2. Aggregate tiles read from views or materialised views, never from a client-side
   reduction over a fetched list.
3. No N+1: a list that needs related rows uses one join or one batched lookup.
4. Client Components are leaves. Interactivity is pushed as deep as it will go so the
   shell stays server-rendered.

---

## 9. Observability

### 9.1 Three distinct streams

| Stream | Purpose | Sink | Retention |
|---|---|---|---|
| **Audit** | Who changed what, legally significant | `audit_log` (CONTRACT-004) | Indefinite |
| **Application logs** | Diagnostics, errors, timings | Vercel logs, structured JSON | Provider default |
| **Metrics** | Rates, latencies, error ratios | Vercel Analytics + dashboard health tiles | Provider default |

Audit is not logging. An audit row is a business record; a log line is a diagnostic. Code
that writes one where the other is required is a defect, in either direction.

### 9.2 Structured log shape

```json
{ "level":"error", "requestId":"<uuid>", "userId":"<uuid|null>", "role":"SALES_REP",
  "module":"ACC-009", "procedure":"cpq.quote.issue", "durationMs":143,
  "code":"THRESHOLD_EXCEEDED", "message":"..." }
```

Never logged: passwords, session tokens, MFA secrets or recovery codes, full card data,
Stripe secrets, customer PII beyond an id, or `before_state`/`after_state` payloads.

### 9.3 Request correlation

`X-Request-Id` is generated in middleware when absent, flows through the tRPC context,
lands in `audit_log.request_id` and in every log line, and is returned on the response. A
single id therefore joins the HTTP response, the logs, and the audit rows for one action.

### 9.4 Alerting

| Condition | Severity | Route |
|---|---|---|
| Integrity assertion INT-01..INT-07 fails | P0 | ACC-005 to MASTER_ADMIN and FINANCE_CONTROLLER |
| `constraint.blocked` audit row | P1 | Daily digest to MASTER_ADMIN |
| Error rate above 2% over 5 minutes | P1 | ACC-005 to ADMIN |
| Stripe webhook failures above 3 consecutively | P0 | ACC-005 to FINANCE_CONTROLLER |
| Any `override.applied` | P2 | Weekly digest to MASTER_ADMIN |

---

## 10. Security

Additive to root `ARCHITECTURE.md` Section 15.

| Control | Implementation |
|---|---|
| Transport | HTTPS only; HSTS with preload |
| Headers | CSP with no `unsafe-inline` for scripts; `X-Frame-Options: DENY` on `/admin`; `Referrer-Policy: strict-origin-when-cross-origin` |
| Cache | `Cache-Control: private, no-store` on every admin response without exception |
| CSRF | tRPC mutations are POST with `Content-Type: application/json` and a `SameSite=Lax` cookie; the router rejects form-encoded bodies |
| Secrets | Environment variables only; the service-role key is never referenced in a client file (`server-only` import guard) |
| Input | Every input is Zod-parsed before reaching a service; no raw body reaches SQL |
| SQL | Parameterised queries and `rpc()` only; string concatenation into SQL is forbidden |
| PII minimisation | ACC-017 stores no SSN or bank credentials; that is a schema-level absence, not a policy |
| Rate limiting | Per-principal buckets from `lib/caps.ts`; per-IP for unauthenticated paths |
| Dependency risk | `pnpm audit` in CI; a high-severity advisory blocks deploy |

---

## 11. Testing Architecture

| Layer | Runner | Scope | Real dependencies |
|---|---|---|---|
| Unit | Vitest | Permission resolution, threshold maths, rounding, state-table legality | none needed - these are pure |
| Integration | Vitest | Procedures end to end: auth, guards, DB writes, audit rows | Real Supabase (Iron Law 5) |
| E2E | Playwright | Real browser against the built app: login, MFA, navigate, mutate, verify | Real Supabase, real routes |

### 11.1 No mocks for verification

Iron Law 5 is absolute for verification. A mocked Supabase client, a stubbed session, a
fake permission table, or an in-memory audit sink invalidates the result. Test doubles are
permitted only in unit tests of pure functions that have no dependency to mock in the
first place.

### 11.2 Matrix-driven test generation

Permission and state-machine tests are generated from
`lib/permissions/matrix.ts` and the transition tables, not hand-written per case
(CONTRACT-005). Adding a permission or a transition therefore adds its tests
automatically; a hardcoded case list would go stale silently.

### 11.3 Test data

Each test seeds and tears down its own fixtures in a transaction or a dedicated schema.
Tests never depend on data left by another test, and never assert against production-like
seed data whose content can drift.

---

## 12. Deployment

Follows `CLAUDE.md` Section 5 exactly. Command-Center-specific notes:

| Step | Note |
|---|---|
| Preflight | All four gates green on the final state |
| Migrations | Applied in the Section 13 order; pre-check and post-check output captured |
| Build | `pnpm run build` - also re-validates gate 2 against the deploy state |
| Deploy | Vercel production |
| Smoke | Playwright against the deployed URL, real stack, no mocks: sign in, MFA, dashboard renders, one permitted mutation, one denied mutation |
| Report | Commit SHA, migration set, URL, smoke result |

A red smoke run is a failed deploy. It is not rationalised into a pass.

### 12.1 Environment variables

| Variable | Surface | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client and server | public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client and server | public, RLS-bound |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | never in a client file |
| `STRIPE_SECRET_KEY` | server only | Phase 3 |
| `STRIPE_WEBHOOK_SECRET` | server only | signature verification |
| `RESEND_API_KEY` | server only | ACC-005 |
| `ADMIN_SESSION_IDLE_MINUTES` | server only | default 30 |
| `ADMIN_SESSION_ABSOLUTE_HOURS` | server only | default 12 |

A missing required variable fails at startup with a named error, not at first use with a
null dereference.

---

## 13. Architectural Decisions Locked

Append-only, per CONTRACT-002. Reversal requires an operator directive logged in
`STATE_OF_THE_BUILD.md`.

| ID | Decision | Status |
|---|---|---|
| ADR-B01 | Route group `(admin)` inside `apps/web`; no separate application. | LOCKED |
| ADR-B02 | tRPC for internal procedures; REST route handlers only for external callers. | LOCKED |
| ADR-B03 | Service-role client for admin paths, with `checkPermission` mandatory before every access. RLS retained as defence in depth. | LOCKED |
| ADR-B04 | Multi-statement business transactions execute as Postgres functions via `rpc()`, never as client-side call sequences. | LOCKED |
| ADR-B05 | The permission matrix is data (`lib/permissions/matrix.ts`); RLS policies and tests are derived from it. | LOCKED |
| ADR-B06 | All `/admin` routes are dynamic; none is cached, revalidated, or edge-served. | LOCKED |
| ADR-B07 | One `AppError` type and one ErrorCode enum across both API surfaces. | LOCKED |
| ADR-B08 | No client state management library; server state in TanStack Query, UI state local or in the URL. | LOCKED |
| ADR-B09 | Audit and application logging are separate streams with separate sinks and rules. | LOCKED |
| ADR-B10 | Tests are generated from the matrix and transition tables rather than hand-enumerated. | LOCKED |

---

## 14. Architectural Decisions Pending

| ID | Question | Needed by |
|---|---|---|
| ADR-P01 | Does `audit_log` partition by month, and at what row count is the switch made? | Phase 3 (RSK-05) |
| ADR-P02 | Read replica or materialised views for ACC-032 aggregates? | Phase 6 |
| ADR-P03 | Does the portal move to its own route group with a distinct middleware matcher? | Phase 3 |
| ADR-P04 | Background job runner: Vercel Cron, Supabase pg_cron, or a queue? Needed for expiry sweeps, dunning, and reconciliation. | Phase 2 |
| ADR-P05 | Document storage: Supabase Storage or a dedicated provider, given legal-hold requirements? | Phase 3 |

ADR-P04 is the nearest: the Quote expiry sweep (ACC-CONTRACT-004) is a Phase 2 dependency
and cannot ship without a decision. Halt and report rather than choosing silently.

---

**End of BBH-ADMIN-ARCHITECTURE.md**
