# BEHAVIORAL CONTRACTS — Bright Box Homes

**APPEND-ONLY DOCUMENT.** Numbered, immutable engineering rules per GOVERNANCE_BRIEF.md Section 5. Once a contract is LOCKED, it can only be modified by explicit operator directive logged here as a new appended entry (never silent revision). Deprecated contracts remain in this file marked DEPRECATED — numbers are never reused.

**Contract numbering:** Sequential integers starting at 1. Never reused.

**Per-contract fields:**
- Contract number (CONTRACT-NNN format)
- Name (descriptive title)
- Statement (the binding rule)
- Enforcement mechanism (how violations are detected)
- Purpose (what failure mode this prevents — references GOVERNANCE_BRIEF.md Section 8 Failure Mode numbers where applicable)
- Status (LOCKED | PROPOSED | DEPRECATED)
- Date locked

Contracts CONTRACT-001 through CONTRACT-013 are extracted from GOVERNANCE_BRIEF.md Section 5. CONTRACT-014 through CONTRACT-016 are NEW, added in response to the ARCHITECTURE.md rewrite incident on 2026-05-27.

---

## CONTRACT-001: Governance Document Append-Only

**Statement:** STATE_OF_THE_BUILD.md and other designated historical-record documents (BEHAVIORAL_CONTRACTS.md, AUDITS/) may not be rewritten, only appended. Existing entries are never modified or removed. Corrections appear as new appended entries with explicit reference to what is being corrected.

**Enforcement mechanism:** Pre-commit verification script that compares line count of designated append-only files against the prior commit. Fails on line-count reduction >10% OR removal of any line containing an existing entry header pattern. Override marker required: file must contain `<!-- APPEND-ONLY OVERRIDE: <operator-signed-reason> -->` to permit a destructive edit, and the override marker itself must be authored by the operator (executor cannot self-authorize).

**Purpose:** Prevents Failure Mode 6 (Destructive Document Rewrites) from GOVERNANCE_BRIEF.md Section 8. Preserves forensic trail of decisions and events.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-002: Architectural Decision Durability

**Statement:** Once an architectural decision is recorded as LOCKED in ARCHITECTURE.md Section 18 (or equivalent), mid-build redesign is prohibited without explicit operator directive logged in STATE_OF_THE_BUILD.md as a new entry referencing the decision being revised.

**Enforcement mechanism:** Code review gate. Any pull request modifying ARCHITECTURE.md Section 18 entries requires linked STATE_OF_THE_BUILD entry citing operator approval.

**Purpose:** Prevents architectural thrashing. Forces explicit cost-benefit analysis before reversing locked decisions.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-003: Authorization Pattern Uniformity

**Statement:** Every protected route (/admin/*, /portal/*, /api/admin/*, /api/portal/*) checks permission via the single canonical helper function exported from lib/auth/check-permission.ts. Inline authorization logic in route handlers, Server Actions, or components is forbidden.

**Enforcement mechanism:** Pattern-scanning verification script that fails on any auth-check code outside the canonical helper. Runs in verify:fast.

**Purpose:** Prevents drift in authorization logic. Centralized check ensures audit-logging, role override semantics, and constitutional constraints are applied uniformly. Prevents Failure Mode where one route has bug fixed but five others retain the bug.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-004: Audit Attribution Mandate

**Statement:** Every action that mutates state (database insert, update, delete; payment stage transition; role assignment; configuration change) writes a row to the audit_log table including: actor user_id, actor role, action type, resource type, resource id, before state JSONB, after state JSONB, IP address, user agent, timestamp. Silent state mutations are forbidden.

**Enforcement mechanism:** Database trigger on protected tables that requires presence of audit context. Verification script scans for mutation operations missing audit attribution.

**Purpose:** Forensic trail for legal compliance (FTC, state lemon laws, payment disputes, security incidents). Required for the 25/25/25/25 payment structure where stage transitions are legally significant.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-005: Verification Script Staleness Prevention

**Statement:** Verification scripts that enumerate artifacts (tables, migrations, routes, components) must read the artifact list dynamically via filesystem scan, database introspection, or framework API. Hardcoded artifact lists in verification scripts are forbidden.

**Enforcement mechanism:** Meta-verification script that scans verification scripts for hardcoded artifact arrays. Pattern detection on string literals matching artifact naming conventions.

**Purpose:** Prevents Failure Mode 7 (Hardcoded Artifact Lists That Drift). Ensures verification scripts catch new artifacts automatically rather than going stale.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-006: CI Parity

**Statement:** Test suites must pass in an environment that simulates CI conditions: no .env.local mounted, no developer secrets available, fresh node_modules. Tests use vi.stubEnv() for environment variables. Real production secrets in tests are forbidden.

**Enforcement mechanism:** verify:full chain includes a CI parity simulation step that runs tests with .env.local renamed temporarily and with VERCEL_ENV=production environment set.

**Purpose:** Prevents Failure Mode 3 (Local-Passes-CI-Fails). Catches environment dependencies before push.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-007: UTF-8 No BOM Mandate

**Statement:** All text file writes must produce UTF-8 encoded files without Byte Order Mark. PowerShell file writes must use [System.IO.File]::WriteAllText with UTF8Encoding($false) constructor. Set-Content and Add-Content without explicit -Encoding utf8NoBOM are forbidden. Out-File without explicit encoding is forbidden.

**Enforcement mechanism:** Pre-commit verification script scans staged text files for BOM bytes (0xEF 0xBB 0xBF) and Unicode replacement characters (0xEF 0xBF 0xBD). Fails commit on detection.

**Purpose:** Prevents Failure Mode 5 (Encoding Corruption). The original ARCHITECTURE.md commit (66ac4fb) shipped with mojibake — this contract prevents recurrence.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-008: Privileged Role Override Principle

**Statement:** Master/root admin roles imply override semantics for operational constraints (rate limits, quotas, caps, radius restrictions). Constitutional constraints remain absolute for all roles including master admin: last master admin cannot be demoted, cannot revoke own role, cannot violate legal compliance gates (TCPA, GDPR, CAN-SPAM, COPPA, FTC), cannot bypass anti-spam/anti-abuse/safety protections, cannot override audit logging.

**Enforcement mechanism:** Permission check helper enforces operational override capability per role, AND enforces constitutional constraints as absolute regardless of role. Constitutional constraints have priority over operational overrides in the helper's decision tree.

**Purpose:** Allows operational efficiency for trusted operators without sacrificing structural safety. Prevents lockout scenarios.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-009: Single Source of Truth for Operational Caps

**Statement:** Per-role operational caps (lead form rate limits, configurator-save email frequency, admin bulk action quotas, customer portal API rate limits) are defined in lib/caps.ts as a single exported object. Inline cap definitions in routes, Server Actions, or components are forbidden.

**Enforcement mechanism:** Pattern-scanning verification script flags numeric literals adjacent to rate-limiting keywords (rateLimit, quota, maxPerHour, etc.) outside lib/caps.ts.

**Purpose:** Prevents cap drift across surfaces. When operational caps change, single edit point ensures consistency.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-010: Structured Error Code Taxonomy

**Statement:** All API responses on error paths return a structured error object: { error: { code: string, message: string, details?: object } } where code is a value from the ErrorCode enum defined in lib/errors/codes.ts. Generic fallback error strings in catch blocks (e.g., setError('Unauthorized'), setError('Failed'), setError('Error')) are forbidden — handlers must display error.message from the structured response.

**Enforcement mechanism:** ESLint custom rule flags generic error string literals in client catch blocks. Pattern-scanning verification script flags API route responses missing the structured shape.

**Purpose:** Prevents Failure Mode 10 (Generic Error String Masking). Surfaces real root causes to operators and customers.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-011: Server-Component Data Fetch for Protected Routes

**Statement:** Initial data for protected dashboard surfaces (/admin/*, /portal/*) is fetched via Server Components and passed to Client Components as props. Client-side useEffect fetches for initial data load on protected routes are forbidden. Refetch on user interaction (button click, form submit) is permitted via Server Actions.

**Enforcement mechanism:** Verification script scans /admin and /portal client component files for useEffect with fetch-like patterns. Fails on detection.

**Purpose:** Prevents Failure Mode 4 (Mount-Fetch Race Condition). Cookie propagation race conditions on mount cause sporadic 401s in protected routes.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-012: Migration Pre-Check Post-Check

**Statement:** Every database migration includes a pre-execution verification block that asserts expected state (existing tables, row counts, schema version) before applying changes. Post-execution verification block confirms the change took effect. Migrations abort with rollback on pre-check assumption violation.

**Enforcement mechanism:** Migration template enforces structure. Linter on migration files requires presence of both BEGIN/PRE-CHECK and POST-CHECK/COMMIT blocks.

**Purpose:** Prevents partial migration application. Asserts environmental assumptions before destructive operations.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-013: Forward Feature Freeze on Stability Breach

**Statement:** When open P0 or P1 bug count exceeds 5, all forward feature work is frozen. Only stability remediation proceeds until queue clears below threshold. Freeze and resumption are logged as STATE_OF_THE_BUILD entries.

**Enforcement mechanism:** Operator directive logged in STATE_OF_THE_BUILD. CI/deploy pipeline can optionally check open bug labels via GitHub API and warn on PR merges to main during freeze.

**Purpose:** Prevents Failure Mode 8 (Forward Movement on Broken Foundation). Compounding bug surface is harder to remediate than focused stability sprints.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-014: Governance Document Immutability Post-Commit (NEW — 2026-05-27)

**Statement:** Once a governance file (any file ending in .md at repo root: GOVERNANCE_BRIEF.md, BLUEPRINT.md, ARCHITECTURE.md, PRD.md, BEHAVIORAL_CONTRACTS.md, COMPONENTS.md, SCHEMA_REGISTRY.md, MASTER_BUILD_SPEC.md, DESIGN_LANGUAGE.md, STATE_OF_THE_BUILD.md) is committed, the executor cannot modify it in a subsequent commit without an explicit operator-authored directive in the commit message format: `governance: <filename> revision authorized by operator — <reason>`. Executor-initiated "cleanup," "improvement," or "fix" commits to governance files are forbidden.

**Enforcement mechanism:** Pre-commit hook checks if any staged file is in the governance file list AND was modified (not newly created). If yes, requires the operator-authored directive token in the commit message. Verification script during verify:fast.

**Purpose:** Prevents the ARCHITECTURE.md rewrite incident from recurring. The original commit 66ac4fb shipped with encoding corruption; the subsequent commit c7f9e88 silently rewrote 935 lines without operator approval. This contract makes such rewrites impossible without explicit operator authorization.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-015: Diff-Based Verification Mandate (NEW — 2026-05-27)

**Statement:** Every governance file commit verification report from the executor must include: (a) git diff statistics (lines added, lines deleted) against the immediately prior commit affecting the file, (b) SHA-256 hash of the file contents, (c) explicit confirmation whether this is a new file creation or a modification of an existing committed file. Metadata-only verification (line count, section count) is insufficient for accepting a governance file commit.

**Enforcement mechanism:** Verification report template in prompts requires these fields. Lead AI verification step rejects reports missing these fields.

**Purpose:** Prevents the verification gap that allowed the ARCHITECTURE.md silent rewrite. The metadata-only verification (line count, section presence) confirmed the surviving file was clean, but did not detect that 935 lines had been changed from the prior version. Diff stats and content hashes make rewrites visible.

**Status:** LOCKED
**Date locked:** 2026-05-27

---

## CONTRACT-016: Encoding Diagnostic Pre-Commit (NEW — 2026-05-27)

**Statement:** Before any text file commit, the executor must run a mojibake scan checking for forbidden byte sequences in actual file content (not in documentation of the sequences themselves). The scan looks for: UTF-8 BOM (0xEF 0xBB 0xBF), Unicode replacement character (0xEF 0xBF 0xBD), and common mojibake corruption patterns. Detection of any of these byte sequences in staged text file content fails the commit. The scan must be a separate explicit step in the verification chain, not assumed to be covered by other checks.

**Enforcement mechanism:** Pre-commit hook script (scripts/check-encoding.ps1 or scripts/check-encoding.sh) that scans all staged text files for the forbidden byte sequences. Runs in verify:fast.

**Purpose:** Prevents Failure Mode 5 (Encoding Corruption) at the commit boundary. The original ARCHITECTURE.md commit 66ac4fb passed initial verification but shipped with mojibake. Mandatory pre-commit scan would have caught it.

**Status:** LOCKED
**Date locked:** 2026-05-27

---