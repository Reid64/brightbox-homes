# BBH ADMIN COMMAND CENTER - IAM SPECIFICATION

**Document ID:** BBH-ADMIN-IAM-SPECIFICATION
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Module:** ACC-001

---

## 1. Scope

This document is the authority on who may do what in the Command Center. It specifies the
ten staff roles, the complete permission namespace, the role-to-permission matrix,
monetary approval thresholds, MFA requirements, session lifecycle, and the IAM audit
event set.

The permission matrix in Section 4 is the **source of truth**. RLS policies
(BBH-ADMIN-DATABASE-SCHEMA.md) and procedure guards (BBH-ADMIN-API-CONTRACTS.md) are
derived from it. Where any of the three disagree, the matrix is correct and the other two
carry the defect.

---

## 2. Principal Model

Three principal classes exist. Only the first holds a Role.

| Class | Authenticates as | May reach | Holds roles |
|---|---|---|---|
| **Staff User** | Supabase Auth session, `users` row | `/admin/*`, `/api/trpc/*` | Yes, one to three |
| **Customer** | Supabase Auth session, `customers.portal_user_id` | `/portal/*` only | No; fixed portal capability set |
| **Service Account** | API key (ACC-033, Phase 7) | `/api/admin/*` REST only | No; scoped key permissions |

A Staff User is never automatically a Customer, and a Customer never gains staff
permissions by any path. The two authorization contexts do not intersect.

### 2.1 Multiple roles

A user may hold up to three roles. Effective permissions are the **union** of the
permission sets of held roles. Effective thresholds are the **maximum** of the held
roles' thresholds. Roles never subtract; there is no deny-override.

Rationale: a small team needs one person to cover, say, FINANCE_CLERK and
SUPPORT_AGENT. Capping at three keeps the effective set legible in an audit review.
Segregation-of-duties rules (BBH-ADMIN-BEHAVIORAL-CONTRACTS.md Section 11.3) still apply
per action and are not satisfied by one user holding two roles.

---

## 3. The Ten Roles

| Rank | Key | Display name | Purpose | MFA |
|---|---|---|---|---|
| 100 | `MASTER_ADMIN` | Master Administrator | System owner. Operational override authority. | Mandatory |
| 90 | `ADMIN` | Administrator | System administration without financial or role authority. | Mandatory |
| 80 | `FINANCE_CONTROLLER` | Finance Controller | Owns invoicing, write-offs, refunds, reconciliation sign-off. | Mandatory |
| 70 | `SALES_MANAGER` | Sales Manager | Owns pipeline, discount approval, assignment, cancellation (sales half). | Mandatory |
| 60 | `PRODUCTION_MANAGER` | Production Manager | Owns capacity, build execution, QC, pre-ship approval. | Mandatory |
| 55 | `PROCUREMENT_OFFICER` | Procurement Officer | Owns suppliers and purchase orders. | Mandatory |
| 50 | `LOGISTICS_COORDINATOR` | Logistics Coordinator | Owns freight, shipment, delivery, site readiness. | Mandatory |
| 40 | `FINANCE_CLERK` | Finance Clerk | Records payments and allocations. No approval authority. | Mandatory |
| 30 | `SALES_REP` | Sales Representative | Works leads and opportunities, authors quotes. | Mandatory |
| 20 | `SUPPORT_AGENT` | Support Agent | Handles tickets and warranty claims. Read-only on commerce. | Mandatory |

**Rank semantics.** `rank` answers only "is A senior to B" for approval routing and for
the rule that a role may not administer a role of equal or higher rank. Rank does **not**
confer inheritance: a MASTER_ADMIN's permissions are enumerated explicitly in Section 4,
not inherited from lower ranks.

**MFA is mandatory for all ten roles.** There is no staff role that may reach `/admin`
without a satisfied MFA challenge. The `roles.requires_mfa` column exists for future
use and is `true` for every seeded row in Phase 1.

---

## 4. Permission Matrix

### 4.1 Namespace

`<module>.<resource>.<action>` - lowercase, dot-separated, singular resource.

Actions are drawn from a fixed verb set. A new verb requires a decision-log entry.

| Verb | Meaning |
|---|---|
| `read` | View a record or list |
| `create` | Bring a record into existence |
| `update` | Modify a mutable field |
| `delete` | Soft-delete (no permission grants hard delete) |
| `approve` | Authorise an action another user requested |
| `transition` | Move an entity along its state machine |
| `export` | Extract records in bulk |
| `manage` | Full administration of the resource, including its lifecycle |
| `override` | Bypass an operational constraint (CONTRACT-008) |

### 4.2 Legend

`Y` granted - `-` not granted - `S` granted for self only - `O` granted for owned records
only - `T` granted subject to the threshold in Section 6

Column order: MA = MASTER_ADMIN, AD = ADMIN, FC = FINANCE_CONTROLLER,
SM = SALES_MANAGER, PM = PRODUCTION_MANAGER, PO = PROCUREMENT_OFFICER,
LC = LOGISTICS_COORDINATOR, FCL = FINANCE_CLERK, SR = SALES_REP, SA = SUPPORT_AGENT

### 4.3 ACC-001 Identity and Access Management

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `iam.user.read` | Y | Y | S | S | S | S | S | S | S | S |
| `iam.user.invite` | Y | Y | - | - | - | - | - | - | - | - |
| `iam.user.update` | Y | Y | S | S | S | S | S | S | S | S |
| `iam.user.suspend` | Y | Y | - | - | - | - | - | - | - | - |
| `iam.user.reset_mfa` | Y | - | - | - | - | - | - | - | - | - |
| `iam.role.read` | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| `iam.role.manage` | Y | - | - | - | - | - | - | - | - | - |
| `iam.session.read` | Y | Y | S | S | S | S | S | S | S | S |
| `iam.session.revoke` | Y | Y | S | S | S | S | S | S | S | S |

**ADMIN limitation.** ADMIN may invite and suspend users but may not grant or revoke any
role, and may not act on a user who holds MASTER_ADMIN. Role administration is
MASTER_ADMIN-exclusive so that privilege escalation requires the highest role.

### 4.4 ACC-002 Master Data

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `masterdata.product.read` | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| `masterdata.product.create` | Y | Y | - | - | - | - | - | - | - | - |
| `masterdata.product.update` | Y | YT | - | - | - | - | - | - | - | - |
| `masterdata.product.publish` | Y | Y | - | - | - | - | - | - | - | - |
| `masterdata.product.export` | Y | Y | Y | Y | - | Y | - | - | - | - |
| `masterdata.pricebook.read` | Y | Y | Y | Y | - | Y | - | Y | Y | - |
| `masterdata.pricebook.create` | Y | Y | Y | - | - | - | - | - | - | - |
| `masterdata.pricebook.activate` | Y | - | - | - | - | - | - | - | - | - |

### 4.5 ACC-003 Dashboard and ACC-004 Audit

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `dashboard.read` | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| `dashboard.finance.read` | Y | Y | Y | Y | - | - | - | Y | - | - |
| `dashboard.production.read` | Y | Y | - | Y | Y | Y | Y | - | - | - |
| `dashboard.sales.read` | Y | Y | Y | Y | - | - | - | - | Y | - |
| `audit.read` | Y | Y | Y | - | - | - | - | - | - | - |
| `audit.export` | Y | Y | - | - | - | - | - | - | - | - |
| `system.health.read` | Y | Y | - | - | - | - | - | - | - | - |

FINANCE_CONTROLLER's `audit.read` is scoped to modules ACC-013 through ACC-018 and
ACC-024; the filter is applied server-side, not by hiding UI.

### 4.6 ACC-006, ACC-007, ACC-008 CRM (Phase 2)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `crm.contact.read` | Y | Y | Y | Y | - | - | Y | Y | Y | Y |
| `crm.contact.create` | Y | Y | - | Y | - | - | - | - | Y | Y |
| `crm.contact.update` | Y | Y | - | Y | - | - | - | - | O | O |
| `crm.contact.merge` | Y | Y | - | Y | - | - | - | - | - | - |
| `crm.contact.delete` | Y | Y | - | - | - | - | - | - | - | - |
| `crm.consent.read` | Y | Y | Y | Y | - | - | - | Y | Y | Y |
| `crm.consent.create` | Y | Y | - | Y | - | - | - | - | Y | Y |
| `crm.lead.read` | Y | Y | - | Y | - | - | - | - | O | - |
| `crm.lead.create` | Y | Y | - | Y | - | - | - | - | Y | Y |
| `crm.lead.update` | Y | Y | - | Y | - | - | - | - | O | - |
| `crm.lead.assign` | Y | Y | - | Y | - | - | - | - | - | - |
| `crm.lead.transition` | Y | - | - | Y | - | - | - | - | O | - |
| `crm.lead.export` | Y | Y | - | Y | - | - | - | - | - | - |
| `crm.opportunity.read` | Y | Y | Y | Y | - | - | - | Y | O | - |
| `crm.opportunity.create` | Y | - | - | Y | - | - | - | - | Y | - |
| `crm.opportunity.update` | Y | - | - | Y | - | - | - | - | O | - |
| `crm.opportunity.transition` | Y | - | - | Y | - | - | - | - | O | - |
| `crm.opportunity.reassign` | Y | Y | - | Y | - | - | - | - | - | - |

### 4.7 ACC-009, ACC-010 CPQ (Phase 2)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `cpq.configuration.read` | Y | Y | - | Y | Y | - | Y | - | Y | Y |
| `cpq.configuration.create` | Y | - | - | Y | - | - | - | - | Y | - |
| `cpq.quote.read` | Y | Y | Y | Y | - | - | - | Y | O | Y |
| `cpq.quote.create` | Y | - | - | Y | - | - | - | - | Y | - |
| `cpq.quote.update` | Y | - | - | Y | - | - | - | - | O | - |
| `cpq.quote.issue` | Y | - | - | YT | - | - | - | - | OT | - |
| `cpq.quote.approve` | Y | - | YT | YT | - | - | - | - | - | - |
| `cpq.quote.accept` | Y | - | - | Y | - | - | - | - | O | - |

### 4.8 ACC-013 through ACC-018 Order to Cash (Phase 3)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `otc.order.read` | Y | Y | Y | Y | Y | Y | Y | Y | O | Y |
| `otc.order.transition` | Y | - | Y | Y | Y | - | Y | - | - | - |
| `otc.order.hold` | Y | Y | Y | Y | Y | - | - | - | - | - |
| `otc.order.cancel` | Y | - | Y | Y | - | - | - | - | - | - |
| `otc.order.change_order` | Y | - | Y | Y | - | - | - | - | - | - |
| `otc.document.read` | Y | Y | Y | Y | Y | - | Y | Y | O | Y |
| `otc.document.send` | Y | Y | - | Y | - | - | - | - | O | - |
| `otc.document.countersign` | Y | Y | Y | Y | - | - | - | - | - | - |
| `otc.invoice.read` | Y | Y | Y | Y | - | - | - | Y | O | Y |
| `otc.invoice.issue` | Y | - | Y | - | - | - | - | Y | - | - |
| `otc.invoice.void` | Y | - | YT | - | - | - | - | - | - | - |
| `otc.invoice.write_off` | Y | - | YT | - | - | - | - | - | - | - |
| `otc.payment.read` | Y | Y | Y | Y | - | - | - | Y | - | - |
| `otc.payment.record` | Y | - | Y | - | - | - | - | Y | - | - |
| `otc.payment.allocate` | Y | - | Y | - | - | - | - | Y | - | - |
| `otc.payment.refund` | Y | - | YT | - | - | - | - | - | - | - |
| `otc.reconciliation.run` | Y | - | Y | - | - | - | - | Y | - | - |
| `otc.reconciliation.sign_off` | Y | - | Y | - | - | - | - | - | - | - |

### 4.9 ACC-019 through ACC-024 Supply and Production (Phase 4)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `supply.supplier.read` | Y | Y | Y | - | Y | Y | Y | Y | - | - |
| `supply.supplier.create` | Y | Y | - | - | - | Y | - | - | - | - |
| `supply.supplier.update` | Y | Y | - | - | - | Y | - | - | - | - |
| `supply.supplier.approve` | Y | Y | Y | - | - | - | - | - | - | - |
| `supply.po.read` | Y | Y | Y | - | Y | Y | - | Y | - | - |
| `supply.po.create` | Y | - | - | - | Y | Y | - | - | - | - |
| `supply.po.approve` | Y | - | YT | - | - | YT | - | - | - | - |
| `supply.po.issue` | Y | - | - | - | - | Y | - | - | - | - |
| `supply.po.receive` | Y | - | - | - | Y | Y | - | - | - | - |
| `prod.capacity.read` | Y | Y | - | Y | Y | Y | Y | - | Y | - |
| `prod.capacity.manage` | Y | - | - | - | Y | - | - | - | - | - |
| `prod.capacity.override` | Y | - | - | - | Y | - | - | - | - | - |
| `prod.record.read` | Y | Y | Y | Y | Y | Y | Y | - | O | Y |
| `prod.record.transition` | Y | - | - | - | Y | - | - | - | - | - |
| `prod.qc.record` | Y | - | - | - | Y | - | - | - | - | - |
| `prod.preship.approve` | Y | - | - | - | Y | - | - | - | - | - |
| `prod.record.scrap` | Y | - | Y | - | Y | - | - | - | - | - |
| `cost.landed.read` | Y | Y | Y | - | Y | Y | - | Y | - | - |
| `cost.landed.manage` | Y | - | Y | - | - | Y | - | - | - | - |

### 4.10 ACC-025 through ACC-028 Logistics (Phase 5)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `log.carrier.read` | Y | Y | Y | - | Y | Y | Y | - | - | - |
| `log.carrier.manage` | Y | Y | - | - | - | Y | Y | - | - | - |
| `log.shipment.read` | Y | Y | Y | Y | Y | - | Y | - | O | Y |
| `log.shipment.create` | Y | - | - | - | - | - | Y | - | - | - |
| `log.shipment.transition` | Y | - | - | - | - | - | Y | - | - | - |
| `log.property.read` | Y | Y | - | Y | Y | - | Y | - | O | Y |
| `log.property.update` | Y | Y | - | Y | - | - | Y | - | O | - |
| `log.property.confirm_readiness` | Y | - | - | - | - | - | Y | - | - | - |
| `log.delivery.schedule` | Y | - | - | - | - | - | Y | - | - | - |
| `log.delivery.capture_pod` | Y | - | - | - | - | - | Y | - | - | - |
| `log.workorder.manage` | Y | - | - | - | Y | - | Y | - | - | Y |

### 4.11 ACC-029 through ACC-034 Post-Sale and Platform (Phases 6-7)

| Permission | MA | AD | FC | SM | PM | PO | LC | FCL | SR | SA |
|---|---|---|---|---|---|---|---|---|---|---|
| `care.warranty.read` | Y | Y | Y | Y | Y | - | Y | - | O | Y |
| `care.claim.create` | Y | - | - | - | Y | - | Y | - | - | Y |
| `care.claim.decide` | Y | - | Y | - | Y | - | - | - | - | YT |
| `care.ticket.read` | Y | Y | - | Y | - | - | Y | - | O | Y |
| `care.ticket.manage` | Y | Y | - | Y | - | - | - | - | - | Y |
| `growth.attribution.read` | Y | Y | Y | Y | - | - | - | - | - | - |
| `growth.affiliate.manage` | Y | Y | - | Y | - | - | - | - | - | - |
| `growth.commission.approve` | Y | - | YT | YT | - | - | - | - | - | - |
| `analytics.report.read` | Y | Y | Y | Y | Y | Y | Y | Y | O | O |
| `analytics.report.manage` | Y | Y | - | Y | - | - | - | - | - | - |
| `platform.integration.manage` | Y | Y | - | - | - | - | - | - | - | - |
| `platform.apikey.manage` | Y | - | - | - | - | - | - | - | - | - |
| `platform.setting.read` | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| `platform.setting.manage` | Y | Y | - | - | - | - | - | - | - | - |
| `platform.featureflag.manage` | Y | Y | - | - | - | - | - | - | - | - |
| `platform.cap.override` | Y | - | - | - | - | - | - | - | - | - |

---

## 5. Constitutional Constraints

Absolute for every role including MASTER_ADMIN (CONTRACT-008). None is bypassable by any
permission, flag, or override.

| ID | Constraint | Enforcement |
|---|---|---|
| CC-01 | The last ACTIVE user holding MASTER_ADMIN cannot be suspended, deactivated, or have that role revoked. | DB trigger `protect_last_master_admin` + application check |
| CC-02 | No user may grant themselves a role they do not already hold. | Procedure guard: `targetUserId <> callerId` for `iam.role.grant` |
| CC-03 | No user may suspend or deactivate themselves. | Procedure guard |
| CC-04 | No user may reset their own MFA through the admin path. | Procedure guard; self-recovery uses the account recovery flow |
| CC-05 | No role may write, update, or delete `audit_log` rows. | No procedure exists; DB grants exclude UPDATE and DELETE |
| CC-06 | No role may disable audit logging for a session, request, or table. | No such flag exists in the schema or settings registry |
| CC-07 | Consent revocations cannot be reversed or deleted. | `consents` is append-only (`forbid_mutation`) |
| CC-08 | Pre-ship approval's three guards cannot be bypassed. | ACC-CONTRACT-007 |
| CC-09 | `orders.payment_stage` cannot decrease. | ACC-CONTRACT-005 |
| CC-10 | An expired Quote cannot be accepted. | ACC-CONTRACT-004 |
| CC-11 | A role may not administer a role of equal or higher rank. | Rank comparison in `iam.role.grant` / `.revoke` |
| CC-12 | Legal-compliance gates (TCPA, GDPR, CAN-SPAM, FTC) cannot be overridden. | Suppression checks run before every outbound send, with no bypass parameter |

### 5.1 What MASTER_ADMIN override does cover

Operational constraints only: rate limits and caps, list-size limits, capacity
overbooking (ACC-021), assignment rules, quiet hours. Every override writes an audit row
at severity WARNING with `details.override = true` and the bypassed rule named. An
override that leaves no audit row is itself a CC-06 violation.

---

## 6. Approval Thresholds

Thresholds are monetary ceilings on a single action, denominated in cents. A request
above a role's ceiling is not refused outright: it routes to a role whose ceiling covers
it. Thresholds are stored in `lib/caps.ts` (CONTRACT-009) and surfaced by
`iam.permission.matrix`.

### 6.1 Discount authority (ACC-009)

| Role | Max discount on a quote | Max absolute discount |
|---|---|---|
| SALES_REP | 3% | $2,000 |
| SALES_MANAGER | 10% | $10,000 |
| FINANCE_CONTROLLER | 15% | $25,000 |
| MASTER_ADMIN | 100% | unlimited |

Whichever limit binds first applies. A 4% discount on a $60,000 quote exceeds SALES_REP's
percentage ceiling and routes for approval even though the absolute amount is under
$2,000.

### 6.2 Purchase order authority (ACC-020)

| Role | Single PO ceiling | Monthly aggregate |
|---|---|---|
| PROCUREMENT_OFFICER | $25,000 | $150,000 |
| PRODUCTION_MANAGER | $10,000 | $40,000 |
| FINANCE_CONTROLLER | $100,000 | $500,000 |
| MASTER_ADMIN | unlimited | unlimited |

Aggregates are evaluated on a rolling 30-day window at approval time. Crossing the
aggregate routes to the next ceiling even when the single-PO value is within authority.

### 6.3 Credit authority (ACC-015, ACC-016)

| Action | FINANCE_CLERK | FINANCE_CONTROLLER | MASTER_ADMIN |
|---|---|---|---|
| Record a payment | unlimited | unlimited | unlimited |
| Allocate a payment | unlimited | unlimited | unlimited |
| Refund | - | $25,000 | unlimited |
| Void an invoice | - | $50,000 | unlimited |
| Write off | - | $5,000 | unlimited |
| Release a credit hold | - | Y | Y |

### 6.4 Other thresholds

| Action | Ceiling holder | Ceiling |
|---|---|---|
| Warranty claim approval (ACC-029) | SUPPORT_AGENT | $1,500 |
| Warranty claim approval | PRODUCTION_MANAGER / FINANCE_CONTROLLER | $15,000 |
| Commission payout batch (ACC-031) | SALES_MANAGER | $10,000 |
| Commission payout batch | FINANCE_CONTROLLER | $50,000 |

### 6.5 Threshold evaluation rules

1. Evaluated server-side, at execution time, against the stored amount - never against a
   client-supplied figure.
2. Splitting one economic action into several sub-threshold actions to avoid approval is
   detected by the aggregate windows in 6.2 and by a nightly report of same-day,
   same-counterparty actions within 10% of a ceiling.
3. A user holding multiple roles receives the maximum ceiling among them (Section 2.1).
4. Exceeding a ceiling returns `403 THRESHOLD_EXCEEDED` with
   `details: { amountCents, ceilingCents, requiredRole }`.

---

## 7. Authentication And Session Management

### 7.1 Authentication

| Property | Value |
|---|---|
| Provider | Supabase Auth, email plus password |
| Password minimum | 12 characters, checked against a breached-password list |
| Password rotation | Not forced on a schedule (rotation without cause reduces password quality) |
| Failed attempts | 5 per IP per 15 minutes (`auth.login` bucket), then `429` |
| Account lockout | 10 consecutive failures locks the account for 30 minutes; `users.locked_until` |
| Enumeration | Sign-in failures return one generic message; timing is equalised |

### 7.2 MFA

| Property | Value |
|---|---|
| Requirement | Mandatory for all ten roles |
| Methods | TOTP (RFC 6238) or WebAuthn |
| Enrolment deadline | First session after invitation acceptance; no admin surface is reachable before enrolment completes |
| Step-up window | 12 hours - after this, a fresh MFA challenge is required for any `mfaProcedure` |
| Sensitive re-challenge | Always, regardless of window: `iam.role.*`, `iam.user.reset_mfa`, `masterdata.pricebook.activate`, `otc.payment.refund`, `otc.invoice.write_off`, `otc.order.cancel`, `prod.preship.approve` |
| Recovery codes | 10 single-use codes issued at enrolment, shown once, stored hashed |
| Reset | MASTER_ADMIN only, with mandatory reason (Section 4.3, CC-04) |

### 7.3 Sessions

| Property | Value |
|---|---|
| Idle timeout | 30 minutes without a request |
| Absolute timeout | 12 hours from issue, regardless of activity |
| Concurrent sessions | Maximum 3 per user; a fourth revokes the oldest |
| Storage | `sessions` table; the raw token is never stored, only a SHA-256 hash |
| Cookie | `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/` |
| Revocation | Immediate and synchronous on suspend, deactivate, role revoke, MFA reset, and password change |
| Heartbeat | `last_seen_at` updated at most once per 60 seconds; not audited |
| IP change | Not a revocation trigger by itself; logged as `session.ip_changed` at severity NOTICE |

### 7.4 Middleware behaviour

`middleware.ts` matches `/admin/:path*` and `/api/trpc/:path*` and is replaced whole when
changed, never patched (CLAUDE.md Iron Law 4). It performs exactly three checks, in order:

1. A Supabase session cookie exists and verifies. Otherwise: redirect to `/admin/login`
   for document requests, `401 UNAUTHENTICATED` for API requests.
2. The corresponding `users` row exists with `status = 'ACTIVE'`. Otherwise: `403`
   and session revocation.
3. The `sessions` row is present, unrevoked, and within both expiry bounds. Otherwise:
   `401 SESSION_EXPIRED`.

Middleware performs **no** permission evaluation. Permissions are resolved in the tRPC
context and Server Components through `lib/auth/check-permission.ts` (CONTRACT-003).
Putting permission logic in middleware is forbidden: the matcher is a coarse gate, and a
permission check there would be a second authorization path.

---

## 8. Permission Resolution

### 8.1 Canonical helper

```ts
// lib/auth/check-permission.ts - the ONLY authorization decision point (CONTRACT-003)
export type PermissionDecision =
  | { allowed: true; via: 'ROLE' | 'SELF' | 'OWNER' | 'OVERRIDE' }
  | { allowed: false; code: 'PERMISSION_DENIED' | 'THRESHOLD_EXCEEDED' | 'CONSTITUTIONAL_CONSTRAINT' | 'MFA_REQUIRED'; detail: object };

export function checkPermission(
  principal: Principal,
  permission: PermissionKey,
  resource?: { ownerUserId?: string; targetUserId?: string; amountCents?: number },
): PermissionDecision;
```

### 8.2 Decision order

Order is normative. An earlier rule that denies stops evaluation.

1. **Constitutional constraints** (Section 5). Deny is final, for every role.
2. **MFA freshness** for `mfaProcedure` and the sensitive list in 7.2.
3. **Role grant** - is the permission present in the union of the principal's roles?
4. **Scope** - `S` requires `targetUserId === principal.id`; `O` requires
   `ownerUserId === principal.id` or a managing role.
5. **Threshold** (Section 6) where the permission is marked `T`.
6. **Operational override** - MASTER_ADMIN only, operational constraints only, always
   audited at WARNING.

Constitutional constraints are evaluated **before** the override step, which is why no
override can reach them.

### 8.3 RLS relationship

RLS policies enforce the same matrix at the row level, derived from it mechanically. They
are defence in depth, not the primary mechanism: a request that passes RLS but fails
`checkPermission` is denied, and vice versa. Neither is permitted to be more permissive
than the matrix.

---

## 9. IAM Audit Events

Every event below is mandatory (CONTRACT-004). IAM events are retained indefinitely and
are never subject to a retention sweep.

| Action | Severity | Required `after_state` keys |
|---|---|---|
| `user.invited` | CRITICAL | email, roles, invited_by |
| `user.activated` | NOTICE | activated_at |
| `user.profile_updated` | INFO | changed_fields |
| `user.suspended` | CRITICAL | reason, revoked_session_count |
| `user.reactivated` | CRITICAL | reason |
| `user.deactivated` | CRITICAL | reason, revoked_session_count |
| `role.granted` | CRITICAL | role_key, granted_by |
| `role.revoked` | CRITICAL | role_key, reason, revoked_by |
| `user.mfa_enrolled` | NOTICE | method |
| `user.mfa_reset` | CRITICAL | reason, reset_by, revoked_session_count |
| `user.mfa_challenge_failed` | WARNING | attempt_count |
| `session.created` | INFO | ip_address, user_agent |
| `session.revoked` | NOTICE | reason, revoked_by |
| `session.expired_idle` | INFO | last_seen_at |
| `session.expired_absolute` | INFO | issued_at |
| `session.ip_changed` | NOTICE | previous_ip, new_ip |
| `auth.login_succeeded` | INFO | ip_address |
| `auth.login_failed` | WARNING | ip_address, failure_reason |
| `auth.account_locked` | CRITICAL | locked_until, failed_count |
| `permission.denied` | WARNING | permission, held_roles |
| `threshold.exceeded` | WARNING | permission, amount_cents, ceiling_cents |
| `constraint.blocked` | CRITICAL | constraint_id, attempted_action |
| `override.applied` | WARNING | rule, justification |

### 9.1 Denial logging

`permission.denied`, `threshold.exceeded`, and `constraint.blocked` are written on the
failure path. A system that audits only successes cannot detect probing. These rows carry
the actor, the attempted permission, and the held roles - never the target record's
contents.

---

## 10. Role Assignment Workflow

| Step | Actor | Action | Audit |
|---|---|---|---|
| 1 | MASTER_ADMIN or ADMIN | Invite with an initial role set | `user.invited` |
| 2 | Invitee | Accept, set password | `user.activated` |
| 3 | Invitee | Enrol MFA (mandatory before any admin surface) | `user.mfa_enrolled` |
| 4 | MASTER_ADMIN | Grant or revoke additional roles | `role.granted` / `role.revoked` |
| 5 | MASTER_ADMIN or ADMIN | Suspend on leave; deactivate on departure | `user.suspended` / `user.deactivated` |

### 10.1 Quarterly access review

A `MASTER_ADMIN` runs a review each quarter: every ACTIVE user, their roles, their last
login, and every role granted in the period. The review is recorded as an
`access_review` row with the reviewer, the date, and the decisions. Users with no login
in 90 days are suspended by default unless explicitly retained, with the retention reason
audited.

---

## 11. Verification Requirements

| # | Requirement |
|---|---|
| A1 | For every cell in Section 4, a test asserts the granted roles succeed and at least one non-granted role receives `403`. Generated from the matrix, never hand-listed (CONTRACT-005). |
| A2 | Every constitutional constraint in Section 5 has a test asserting MASTER_ADMIN is also denied. |
| A3 | Every threshold in Section 6 has tests at ceiling, one cent below, and one cent above. |
| A4 | A test asserts no admin surface is reachable without MFA enrolment. |
| A5 | A test asserts idle and absolute timeouts each terminate a session. |
| A6 | A test asserts suspension revokes active sessions synchronously. |
| A7 | A test asserts a user holding two roles receives the union of permissions and the maximum threshold. |
| A8 | A test asserts denials produce `permission.denied` audit rows. |
| A9 | A pattern-scan verification script asserts zero authorization decisions outside `lib/auth/check-permission.ts` (CONTRACT-003). |
| A10 | A test asserts RLS denies a direct query that `checkPermission` would deny, for one representative table per module. |

---

**End of BBH-ADMIN-IAM-SPECIFICATION.md**
