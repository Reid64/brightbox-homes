# BBH ADMIN COMMAND CENTER - BEHAVIORAL CONTRACTS

**Document ID:** BBH-ADMIN-BEHAVIORAL-CONTRACTS
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Scope:** The end-to-end pipeline Lead -> Opportunity -> Quote -> Order -> Production -> Shipment -> Delivery

---

## 1. Scope And Numbering

This document specifies behaviour: which states exist, which transitions are legal, what
must be true for a transition to fire, who may fire it, what it writes, and what it
triggers.

**Numbering.** Contracts here are numbered `ACC-CONTRACT-NNN` and live in a namespace
separate from the root `BEHAVIORAL_CONTRACTS.md` (CONTRACT-001..016), whose numbers are
never reused and whose rules bind this document. Where a rule here restates a root
contract, the root contract is cited and remains authoritative.

**Append-only.** Like the root document, this file is append-only once committed
(CONTRACT-001). A contract is superseded by a new numbered entry, never edited in place.

### 1.1 Contract fields

Each contract states: Statement (the binding rule), Enforcement (how a violation is
detected), Purpose (the failure mode prevented), Status, Date.

### 1.2 Universal transition rules

These apply to every state machine in this document without restatement.

| # | Rule |
|---|---|
| U1 | A transition not listed in the machine's table is illegal and returns `409 CONFLICT`. There is no implicit transition. |
| U2 | Every transition writes exactly one audit row, in the same database transaction as the state change (CONTRACT-004). If the audit write fails, the transition fails. |
| U3 | Every transition is evaluated against guards in the order listed. The first failing guard short-circuits and names itself in the error `details`. |
| U4 | Terminal states accept no outbound transition except where a table explicitly lists one. |
| U5 | A transition performed under a MASTER_ADMIN operational override is audited at severity WARNING with `details.override = true` and the guard that was bypassed (CONTRACT-008). Constitutional guards are never bypassable. |
| U6 | Backward transitions (regressions) always require a `reason` of 3..500 characters. |
| U7 | State is stored on the entity row; history lives in `audit_log`. No entity carries a denormalised history column. |

---

## 2. Pipeline Overview

```
  Lead            Opportunity        Quote             Order            Production       Shipment        Delivery
  ----            -----------        -----             -----            ----------       --------        --------
  NEW ----------> DISCOVERY  ------> DRAFT ----------> PENDING_DEPOSIT  SCHEDULED  ----> PLANNED ------> appointment
  ASSIGNED        SOLUTION           PENDING_APPROVAL  CONFIRMED        MATERIALS_STAGED BOOKED          delivered
  WORKING         QUOTED             ISSUED            IN_PRODUCTION    IN_BUILD         PICKED_UP       POD stored
  QUALIFIED ----> NEGOTIATION        ACCEPTED -------> READY_TO_SHIP    QC_PENDING       IN_TRANSIT      COMPLETE
  DISQUALIFIED    WON                DECLINED          SHIPPED          PRE_SHIP_APPROVED AT_PORT
  RECYCLED        LOST               EXPIRED           DELIVERED        RELEASED         OUT_FOR_DELIVERY
                  ABANDONED          SUPERSEDED        COMPLETE                          DELIVERED
                                                       CANCELLED                         EXCEPTION
```

Handoff points, where one machine's transition creates or advances another entity, are
specified in Section 10.

---

## 3. Lead State Machine (ACC-007)

**Entity:** `leads.status`

### 3.1 States

| State | Meaning | Terminal |
|---|---|---|
| `NEW` | Captured, not yet assigned | no |
| `ASSIGNED` | Owner set, not yet contacted | no |
| `WORKING` | First touch recorded, in active pursuit | no |
| `QUALIFIED` | Converted to an Opportunity | yes |
| `DISQUALIFIED` | Rejected with a reason | yes |
| `RECYCLED` | Parked with a future revisit date | no |

### 3.2 Transitions

| From | To | Actor roles | Guards | Audit action | Side effects |
|---|---|---|---|---|---|
| (none) | `NEW` | system, SALES_* | G-L1 contact resolved or created | `lead.created` | Assignment rules evaluated |
| `NEW` | `ASSIGNED` | system, SALES_MANAGER | G-L2 target user ACTIVE and holds SALES_REP or SALES_MANAGER | `lead.assigned` | SLA timer starts; ACC-005 notification to owner |
| `ASSIGNED` | `WORKING` | owner, SALES_MANAGER | G-L3 `first_touch_at` set to now | `lead.first_touched` | SLA timer stops |
| `ASSIGNED` | `ASSIGNED` | SALES_MANAGER | G-L2 | `lead.reassigned` | SLA timer resets; both owners notified |
| `WORKING` | `QUALIFIED` | owner, SALES_MANAGER | G-L4 contact has name and at least one reachable channel; G-L5 no open Opportunity already links this lead | `lead.qualified` | Creates Opportunity in `DISCOVERY` (Section 10.1) |
| `NEW`, `ASSIGNED`, `WORKING` | `DISQUALIFIED` | owner, SALES_MANAGER | G-L6 `disqualify_reason` present | `lead.disqualified` | Suppression check: a DO_NOT_CONTACT reason writes a consent revocation |
| `WORKING` | `RECYCLED` | owner, SALES_MANAGER | G-L7 `recycle_at` is a future date within 24 months | `lead.recycled` | Scheduled job returns it to `ASSIGNED` on the date |
| `RECYCLED` | `ASSIGNED` | system, SALES_MANAGER | G-L2 | `lead.reactivated` | SLA timer restarts |
| `DISQUALIFIED` | `ASSIGNED` | SALES_MANAGER | G-L2, G-U6 reason required | `lead.reopened` | Audited at severity NOTICE |

### 3.3 Guards

| ID | Guard | Failure code |
|---|---|---|
| G-L1 | A `contacts` row exists or is created by the same transaction, satisfying the dedupe indexes | `CONFLICT` |
| G-L2 | Target owner is an ACTIVE user holding SALES_REP or SALES_MANAGER | `VALIDATION_FAILED` |
| G-L3 | `first_touch_at` is null before the transition | `CONFLICT` |
| G-L4 | Contact has a name and at least one of email or phone | `VALIDATION_FAILED` |
| G-L5 | No Opportunity already references this lead | `CONFLICT` |
| G-L6 | `disqualify_reason` is a member of the reason taxonomy | `VALIDATION_FAILED` |
| G-L7 | `recycle_at` is in the future and within 24 months | `VALIDATION_FAILED` |

### ACC-CONTRACT-001: Lead First-Touch SLA Is Measured, Not Estimated

**Statement:** `leads.first_touch_at` is written only by the `ASSIGNED -> WORKING`
transition, and only with the server clock. It is never client-supplied, never
backdated, and never inferred from an activity record.

**Enforcement:** Column is writable only by the transition procedure; a database trigger
rejects an UPDATE that sets `first_touch_at` to a value more than 5 seconds from `now()`.

**Purpose:** The 60-minute SLA (OBJ-06) is a business commitment. A backdatable timestamp
makes the metric decorative.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 4. Opportunity State Machine (ACC-008)

**Entity:** `opportunities.stage`

### 4.1 States

| State | Probability default | Meaning | Terminal |
|---|---|---|---|
| `DISCOVERY` | 10 | Qualified, requirements being gathered | no |
| `SOLUTION` | 30 | Product and site fit agreed | no |
| `QUOTED` | 50 | At least one Quote issued | no |
| `NEGOTIATION` | 70 | Terms under discussion | no |
| `WON` | 100 | Quote accepted and deposit taken | yes |
| `LOST` | 0 | Customer declined | yes |
| `ABANDONED` | 0 | No response after the defined cadence | yes |

### 4.2 Transitions

| From | To | Actor roles | Guards | Audit action |
|---|---|---|---|---|
| (none) | `DISCOVERY` | system (from lead qualification), SALES_* | G-O1 | `opportunity.created` |
| `DISCOVERY` | `SOLUTION` | owner, SALES_MANAGER | G-O2 property linked or explicitly deferred | `opportunity.stage_changed` |
| `SOLUTION` | `QUOTED` | system | G-O3 at least one Quote in `ISSUED` | `opportunity.stage_changed` |
| `QUOTED` | `NEGOTIATION` | owner, SALES_MANAGER | - | `opportunity.stage_changed` |
| `QUOTED`, `NEGOTIATION` | `WON` | system | G-O4 an accepted Quote exists; G-O5 an Order exists in `CONFIRMED` | `opportunity.won` |
| any non-terminal | `LOST` | owner, SALES_MANAGER | G-O6 `loss_reason` present | `opportunity.lost` |
| any non-terminal | `ABANDONED` | owner, SALES_MANAGER, system | G-O6; G-O7 no activity for 90 days when system-initiated | `opportunity.abandoned` |
| `SOLUTION`, `QUOTED`, `NEGOTIATION` | any earlier stage | SALES_MANAGER | G-U6 reason required | `opportunity.stage_regressed` (severity WARNING) |
| `LOST`, `ABANDONED` | `DISCOVERY` | SALES_MANAGER | G-U6 reason required | `opportunity.reopened` (severity WARNING) |

### 4.3 Guards

| ID | Guard | Failure code |
|---|---|---|
| G-O1 | Contact exists and is not merged away | `VALIDATION_FAILED` |
| G-O2 | A Property is linked, or `deferSiteConfirmation` is explicitly true | `VALIDATION_FAILED` |
| G-O3 | At least one child Quote has status `ISSUED` | `CONFLICT` |
| G-O4 | Exactly one child Quote has status `ACCEPTED` | `CONFLICT` |
| G-O5 | An Order exists referencing that Quote with status `CONFIRMED` | `CONFLICT` |
| G-O6 | `loss_reason` is in the taxonomy and `loss_notes` is present when reason is `OTHER` | `VALIDATION_FAILED` |
| G-O7 | Latest `lead_activities` or `audit_log` entry older than 90 days | `CONFLICT` |

### ACC-CONTRACT-002: Won Is Derived, Never Asserted

**Statement:** No human may set an Opportunity to `WON` directly. `WON` is written only
by the system, only as a consequence of an Order reaching `CONFIRMED` against an accepted
Quote belonging to that Opportunity.

**Enforcement:** The `WON` transition is absent from every permissioned procedure; it
exists only in the internal order-confirmation service. A pattern-scanning verification
script fails on any other write of `stage = 'WON'`.

**Purpose:** Forecast integrity. A manually-won opportunity with no order is the single
most common way a pipeline report stops matching revenue.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 5. Quote State Machine (ACC-009)

**Entity:** `quotes.status`

### 5.1 States

| State | Meaning | Mutable | Terminal |
|---|---|---|---|
| `DRAFT` | Being built | yes | no |
| `PENDING_APPROVAL` | Discount exceeds author authority | no | no |
| `ISSUED` | Sent to the customer, legally an offer | no | no |
| `ACCEPTED` | Customer accepted in writing | no | yes |
| `DECLINED` | Customer declined | no | yes |
| `EXPIRED` | Passed `valid_until` without acceptance | no | yes |
| `SUPERSEDED` | Replaced by a newer version | no | yes |

### 5.2 Transitions

| From | To | Actor roles | Guards | Audit action | Side effects |
|---|---|---|---|---|---|
| (none) | `DRAFT` | SALES_REP, SALES_MANAGER | G-Q1 | `quote.created` | Version 1, or N+1 on revision |
| `DRAFT` | `PENDING_APPROVAL` | owner | G-Q2 discount above author threshold | `quote.submitted_for_approval` | Approver notified (ACC-005) |
| `PENDING_APPROVAL` | `DRAFT` | approver | G-U6 reason required | `quote.approval_rejected` | Author notified |
| `PENDING_APPROVAL` | `ISSUED` | approver only | G-Q3, G-Q4, G-Q5 | `quote.approved` then `quote.issued` | Both events written; PDF generated |
| `DRAFT` | `ISSUED` | owner | G-Q3, G-Q4, G-Q5, and discount within author threshold | `quote.issued` | PDF generated and emailed; lines frozen |
| `ISSUED` | `ACCEPTED` | SALES_*, system (portal acceptance) | G-Q6 not expired; G-Q7 acceptance evidence recorded | `quote.accepted` (severity CRITICAL) | Creates Order in `PENDING_DEPOSIT` (Section 10.2) |
| `ISSUED` | `DECLINED` | SALES_*, system | G-U6 reason required | `quote.declined` | Opportunity stays open |
| `ISSUED` | `EXPIRED` | system only | G-Q8 `valid_until` passed | `quote.expired` | Nightly sweep; owner notified |
| `ISSUED`, `DRAFT` | `SUPERSEDED` | system | G-Q9 a newer version of the same `quote_number` reached `ISSUED` | `quote.superseded` | `superseded_by_quote_id` set |

### 5.3 Guards

| ID | Guard | Failure code |
|---|---|---|
| G-Q1 | Parent Opportunity is non-terminal | `CONFLICT` |
| G-Q2 | `discount_percent` exceeds the author's ceiling (IAM Section 6.1) | - (routing condition, not a failure) |
| G-Q3 | At least one line of `line_type = 'UNIT'` exists | `VALIDATION_FAILED` |
| G-Q4 | `total_cents` equals the arithmetic of its lines and adjustments | `CONFLICT` |
| G-Q5 | `price_book_id` references an ACTIVE price book covering today | `CONFLICT` |
| G-Q6 | `valid_until >= current_date` | `CONFLICT` with `details.expiredOn` |
| G-Q7 | Acceptance evidence exists: a signed document, or an authenticated portal action, or a staff attestation naming the channel | `VALIDATION_FAILED` |
| G-Q8 | `valid_until < current_date` | - |
| G-Q9 | Newer version exists and is `ISSUED` | `CONFLICT` |

### ACC-CONTRACT-003: An Issued Quote Is Immutable

**Statement:** Once a Quote reaches `ISSUED`, no column except `status`, `accepted_at`,
`accepted_by_contact_id`, and `superseded_by_quote_id` may change, and no `quote_lines`
row may be inserted, updated, or deleted. A change of substance requires a new version.

**Enforcement:** Database trigger on `quotes` rejecting updates to any other column when
`status <> 'DRAFT'`; `forbid_mutation()` on `quote_lines` for non-draft parents. Verified
by an integration test that attempts each forbidden mutation and asserts the rejection.

**Purpose:** An Order must trace to exactly one priced artifact (ADR-A08). An editable
issued quote makes a pricing dispute unresolvable and makes INT-03 meaningless.

**Status:** LOCKED | **Date:** 2026-09-11

### ACC-CONTRACT-004: Expiry Is A System Transition

**Statement:** `EXPIRED` is written only by the scheduled sweep, never by a user action,
and a Quote past `valid_until` cannot be accepted regardless of role, including
MASTER_ADMIN. To sell at an expired price, a new version is issued.

**Enforcement:** G-Q6 is a constitutional guard, excluded from the operational override
list in CONTRACT-008. Test: MASTER_ADMIN attempting acceptance of an expired quote
receives `409 CONFLICT`.

**Purpose:** Price integrity. Honouring an expired quote is a commercial decision that
must leave a new, priced, dated artifact behind, not an override buried in an audit row.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 6. Order State Machine (ACC-013)

**Entity:** `orders.status` and `orders.payment_stage`

### 6.1 States

| State | Payment stage on entry | Meaning | Terminal |
|---|---|---|---|
| `PENDING_DEPOSIT` | 0 | Created from an accepted Quote, awaiting stage-1 payment | no |
| `CONFIRMED` | 1 | Deposit cleared; capacity firmly reserved | no |
| `IN_PRODUCTION` | 2 | Build started; stage-2 invoice issued | no |
| `READY_TO_SHIP` | 3 | Pre-ship approved; stage-3 cleared | no |
| `SHIPPED` | 3 | Left origin | no |
| `DELIVERED` | 4 | Handover evidenced | no |
| `COMPLETE` | 4 | Stage-4 paid and punch list closed | yes |
| `CANCELLED` | any | Terminated with settlement | yes |

### 6.2 Transitions

| From | To | Actor roles | Guards | Audit action |
|---|---|---|---|---|
| (none) | `PENDING_DEPOSIT` | system | G-R1 accepted Quote; G-R2 Customer exists or is created; G-R3 Property linked | `order.created` |
| `PENDING_DEPOSIT` | `CONFIRMED` | system | G-R4 stage-1 payment SUCCEEDED and reconciled; G-R5 capacity reserved | `order.confirmed` (CRITICAL) |
| `CONFIRMED` | `IN_PRODUCTION` | PRODUCTION_MANAGER | G-R6 all units `IN_BUILD` or later; G-R7 stage-2 invoice issued | `order.stage_advanced` (CRITICAL) |
| `IN_PRODUCTION` | `READY_TO_SHIP` | PRODUCTION_MANAGER | G-R8 every unit `PRE_SHIP_APPROVED`; G-R9 stage-3 payment cleared | `order.stage_advanced` (CRITICAL) |
| `READY_TO_SHIP` | `SHIPPED` | LOGISTICS_COORDINATOR | G-R10 a Shipment covering every unit is `PICKED_UP` or later | `order.shipped` |
| `SHIPPED` | `DELIVERED` | LOGISTICS_COORDINATOR, system | G-R11 every Shipment `DELIVERED` with a POD | `order.delivered` (CRITICAL) |
| `DELIVERED` | `COMPLETE` | FINANCE_CONTROLLER | G-R12 stage-4 invoice PAID; G-R13 no open punch-list item | `order.completed` (CRITICAL) |
| any non-terminal | `CANCELLED` | SALES_MANAGER + FINANCE_CONTROLLER (dual) | G-R14 settlement recorded; G-R15 capacity released | `order.cancelled` (CRITICAL) |

### 6.3 Guards

| ID | Guard | Constitutional | Failure code |
|---|---|---|---|
| G-R1 | Source Quote status is `ACCEPTED` and unexpired at acceptance time | yes | `CONFLICT` |
| G-R2 | Customer row exists; created in the same transaction if first order | no | `VALIDATION_FAILED` |
| G-R3 | Property linked and belongs to the same Customer | no | `VALIDATION_FAILED` |
| G-R4 | A `payments` row with `status='SUCCEEDED'` allocated to the stage-1 invoice, and `reconciled_at IS NOT NULL` | yes | `CONFLICT` |
| G-R5 | A firm `SlotReservation` exists for every unit | no | `CONFLICT` |
| G-R6 | Every `production_records` row for the order is `IN_BUILD` or later | no | `CONFLICT` |
| G-R7 | Stage-2 invoice exists with status `ISSUED` or later | no | `CONFLICT` |
| G-R8 | Every unit is `PRE_SHIP_APPROVED` | yes | `CONFLICT` |
| G-R9 | Stage-3 invoice is `PAID` | yes | `CONFLICT` |
| G-R10 | Shipment lines cover every production record for the order | no | `CONFLICT` |
| G-R11 | Every shipment is `DELIVERED` with `proof_of_delivery_document_id` set | yes | `CONFLICT` |
| G-R12 | Stage-4 invoice is `PAID` | no | `CONFLICT` |
| G-R13 | No open work order of type `PUNCH_LIST` | no | `CONFLICT` |
| G-R14 | A settlement record exists: refund, retention, or zero, with an explicit amount | yes | `VALIDATION_FAILED` |
| G-R15 | Slot reservations released | no | `CONFLICT` |

### 6.4 Order holds

A hold does not change `orders.status`. It blocks outbound transitions while open.

| Hold type | Placed by | Blocks | Released by |
|---|---|---|---|
| `CREDIT` | FINANCE_CONTROLLER | every advance | FINANCE_CONTROLLER |
| `COMPLIANCE` | ADMIN, MASTER_ADMIN | every advance | ADMIN, MASTER_ADMIN |
| `CUSTOMER_REQUEST` | SALES_MANAGER | production and shipment advances | SALES_MANAGER |
| `QUALITY` | PRODUCTION_MANAGER | shipment advances | PRODUCTION_MANAGER |

An attempt to advance an order with an open hold returns `409 CONFLICT` with
`details: { holds: [{ type, placedAt, placedBy }] }`.

### ACC-CONTRACT-005: Payment Stage Advances Are Ratchets

**Statement:** `orders.payment_stage` is monotonically non-decreasing. No transition,
role, or override may reduce it. A refund does not reduce the stage; it is recorded as a
negative-direction Payment and, if commercially material, the Order moves to `CANCELLED`
with a settlement.

**Enforcement:** `CHECK` plus a BEFORE UPDATE trigger rejecting `NEW.payment_stage <
OLD.payment_stage`. Excluded from operational override. Test asserts MASTER_ADMIN cannot
decrement.

**Purpose:** The 25/25/25/25 structure is legally significant (CONTRACT-004). A reversible
stage counter destroys the evidentiary value of `payment_stage_history`.

**Status:** LOCKED | **Date:** 2026-09-11

### ACC-CONTRACT-006: Cancellation Requires Dual Authorization

**Statement:** Cancelling an Order past `CONFIRMED` requires two distinct approvals,
recorded separately: one from a holder of SALES_MANAGER or above, and one from
FINANCE_CONTROLLER or above. The two approvals may not come from the same user, even if
that user holds both roles.

**Enforcement:** The cancellation procedure writes an `order_cancellation_approvals`
record per approver and refuses to execute until two rows with distinct `user_id` exist.
Test: a user holding both roles cannot self-satisfy the requirement.

**Purpose:** Cancellation moves money and releases capacity. Single-actor cancellation of
a confirmed order is the highest-value unilateral action in the system.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 7. Production State Machine (ACC-022)

**Entity:** `production_records.status`

### 7.1 Transitions

| From | To | Actor roles | Guards | Audit action |
|---|---|---|---|---|
| (none) | `SCHEDULED` | system, PRODUCTION_MANAGER | G-P1 order `CONFIRMED`; G-P2 slot reserved | `production.scheduled` |
| `SCHEDULED` | `MATERIALS_STAGED` | PRODUCTION_MANAGER | G-P3 required POs `RECEIVED` or `PARTIALLY_RECEIVED` | `production.materials_staged` |
| `MATERIALS_STAGED` | `IN_BUILD` | PRODUCTION_MANAGER | G-P4 serial number assigned | `production.build_started` |
| `IN_BUILD` | `QC_PENDING` | PRODUCTION_MANAGER | G-P5 all milestones evidenced | `production.build_completed` |
| `QC_PENDING` | `PRE_SHIP_PENDING` | PRODUCTION_MANAGER | G-P6 QC result `PASS` or `CONDITIONAL_PASS` | `production.qc_recorded` (CRITICAL) |
| `QC_PENDING` | `QC_FAILED` | PRODUCTION_MANAGER | G-P7 at least one defect recorded | `production.qc_failed` (CRITICAL) |
| `QC_FAILED` | `IN_BUILD` | PRODUCTION_MANAGER | G-U6 rework reason | `production.rework_started` |
| `QC_FAILED` | `SCRAPPED` | PRODUCTION_MANAGER + FINANCE_CONTROLLER (dual) | G-P8 scrap reason and cost | `production.scrapped` (CRITICAL) |
| `PRE_SHIP_PENDING` | `PRE_SHIP_APPROVED` | PRODUCTION_MANAGER | G-P9, G-P10, G-P11 | `production.pre_ship_approved` (CRITICAL) |
| `PRE_SHIP_APPROVED` | `RELEASED` | LOGISTICS_COORDINATOR | G-P12 shipment line created | `production.released` |

### 7.2 Guards

| ID | Guard | Constitutional |
|---|---|---|
| G-P1 | Parent order is `CONFIRMED` or later and has no `QUALITY` hold | no |
| G-P2 | A firm slot reservation exists | no |
| G-P3 | Every PO flagged `blocks_production` is received | no |
| G-P4 | `serial_number` assigned and globally unique | yes |
| G-P5 | Every required milestone has at least one evidence artifact | no |
| G-P6 | `qc_result` recorded with inspector attribution | yes |
| G-P7 | At least one `defects` row | no |
| G-P8 | Scrap reason and cost recorded; dual approval present | yes |
| G-P9 | QC result is `PASS`, or `CONDITIONAL_PASS` with every conditional defect closed | yes |
| G-P10 | A countersigned pre-ship acceptance Document exists for the order (ACC-014) | yes |
| G-P11 | Stage-3 invoice is `PAID` | yes |
| G-P12 | A `shipment_lines` row references this record | no |

### ACC-CONTRACT-007: Pre-Ship Approval Is Triple-Gated And Not Overridable

**Statement:** `PRE_SHIP_APPROVED` requires all three of: a QC result of `PASS` or a
`CONDITIONAL_PASS` with zero open conditional defects; a stored, hashed, countersigned
pre-ship acceptance document; and a stage-3 invoice in `PAID`. No role, including
MASTER_ADMIN, may bypass any of the three.

**Enforcement:** All three are constitutional guards, excluded from the CONTRACT-008
operational override list. Database trigger re-checks each at write time. Integration test
asserts MASTER_ADMIN receives `409 CONSTITUTIONAL_CONSTRAINT` with each guard individually
unmet.

**Purpose:** OBJ-03. Shipping a unit that was not inspected, not accepted in writing, or
not paid for is simultaneously a quality failure, a legal exposure, and a cash loss. This
is the single most important gate in the pipeline.

**Status:** LOCKED | **Date:** 2026-09-11

### ACC-CONTRACT-008: Serial Numbers Are Immutable And Single-Use

**Statement:** Once assigned, `production_records.serial_number` never changes, and a
serial is bound to exactly one order line for the life of the system. A rebuild after
scrap receives a new serial; the scrapped serial is never reissued.

**Enforcement:** Column-level trigger rejecting UPDATE of `serial_number`; unique index;
`production_records_order_line_unique`. Test asserts both.

**Purpose:** Warranty coverage (ACC-029) computes from the serial. A reused serial makes
warranty liability unbounded and traceability false.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 8. Shipment State Machine (ACC-026)

**Entity:** `shipments.status`

### 8.1 Transitions

| From | To | Actor roles | Guards | Audit action |
|---|---|---|---|---|
| (none) | `PLANNED` | LOGISTICS_COORDINATOR | G-S1 every line pre-ship approved | `shipment.planned` |
| `PLANNED` | `BOOKED` | LOGISTICS_COORDINATOR | G-S2 carrier assigned; G-S3 freight quote unexpired | `shipment.booked` |
| `BOOKED` | `PICKED_UP` | LOGISTICS_COORDINATOR | G-S4 pickup timestamp and reference | `shipment.picked_up` |
| `PICKED_UP` | `IN_TRANSIT` | LOGISTICS_COORDINATOR, system | - | `shipment.in_transit` |
| `IN_TRANSIT` | `AT_PORT` | LOGISTICS_COORDINATOR, system | - | `shipment.at_port` |
| `AT_PORT` | `CUSTOMS_CLEARED` | LOGISTICS_COORDINATOR | G-S5 customs entry recorded | `shipment.customs_cleared` |
| `IN_TRANSIT`, `CUSTOMS_CLEARED` | `OUT_FOR_DELIVERY` | LOGISTICS_COORDINATOR | G-S6 appointment confirmed; G-S7 site readiness confirmed | `shipment.out_for_delivery` |
| `OUT_FOR_DELIVERY` | `DELIVERED` | LOGISTICS_COORDINATOR | G-S8 POD stored | `shipment.delivered` (CRITICAL) |
| any non-terminal | `EXCEPTION` | LOGISTICS_COORDINATOR, system | G-S9 reason recorded | `shipment.exception` (WARNING) |
| `EXCEPTION` | previous state | LOGISTICS_COORDINATOR | G-U6 resolution reason | `shipment.exception_resolved` |
| `PLANNED`, `BOOKED` | `CANCELLED` | LOGISTICS_COORDINATOR | G-S10 carrier cancellation confirmed | `shipment.cancelled` |

### 8.2 Guards

| ID | Guard | Constitutional |
|---|---|---|
| G-S1 | Every `shipment_lines` production record is `PRE_SHIP_APPROVED` or `RELEASED` | yes |
| G-S2 | Carrier is APPROVED with unexpired insurance | yes |
| G-S3 | Freight quote `valid_until >= today` | no |
| G-S4 | Pickup timestamp not in the future; carrier reference present | no |
| G-S5 | Customs entry with HTS lines recorded | no |
| G-S6 | Delivery appointment exists and is confirmed | no |
| G-S7 | `properties.readiness_confirmed_at` is not null | yes |
| G-S8 | POD document stored with signature, photos, and timestamp | yes |
| G-S9 | Exception reason from the taxonomy | no |
| G-S10 | Carrier cancellation reference recorded | no |

### ACC-CONTRACT-009: A Unit Ships Exactly Once

**Statement:** A production record may appear on at most one shipment line across the
entire system. Re-delivery after a refusal reuses the same Shipment through the
`EXCEPTION` path; it never creates a second shipment line for the same unit.

**Enforcement:** `shipment_lines_production_unique` unique index, plus INT-04.

**Purpose:** Double-shipped units corrupt inventory, landed cost, and warranty start
dates simultaneously.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 9. Delivery Workflow (ACC-027)

Delivery is a workflow over `shipments` and `orders` rather than a separate state column.

| Step | Actor | Precondition | Produces | Audit |
|---|---|---|---|---|
| D1 Schedule appointment | LOGISTICS_COORDINATOR | Site readiness confirmed; stage-4 invoice ISSUED | `DeliveryAppointment` | `delivery.scheduled` |
| D2 Confirm with customer | LOGISTICS_COORDINATOR, SUPPORT_AGENT | D1 | Customer confirmation record | `delivery.confirmed` |
| D3 Dispatch | LOGISTICS_COORDINATOR | D2; shipment `OUT_FOR_DELIVERY` | - | `shipment.out_for_delivery` |
| D4 Capture POD | LOGISTICS_COORDINATOR | On site | Signature, photos, geolocation, timestamp | `delivery.pod_captured` (CRITICAL) |
| D5 Record exceptions | LOGISTICS_COORDINATOR | D4 | Damage or shortage rows; feeds ACC-029 | `delivery.exception_recorded` (WARNING) |
| D6 Close delivery | LOGISTICS_COORDINATOR | D4 | Shipment `DELIVERED`; order `DELIVERED`; warranty starts | `order.delivered` (CRITICAL) |

### ACC-CONTRACT-010: Warranty Starts At Delivery, Not At Order

**Statement:** Warranty coverage is computed from the D6 timestamp of the unit's
delivery, per serial number. It is never computed from order date, ship date, or invoice
date.

**Enforcement:** `warranty_registrations.starts_at` is written only by D6 and is not
user-editable. Test asserts the value equals the delivery timestamp.

**Purpose:** Matches the published warranty terms (PRD.md LEGAL-004) and prevents coverage
being silently consumed by production and transit time.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 10. Cross-Entity Handoffs

Each handoff runs in a single database transaction. A partial handoff is impossible: if
any step fails, the whole transition rolls back and the source entity does not change
state.

### 10.1 Lead qualification -> Opportunity

1. Guard G-L4, G-L5 pass.
2. Insert `opportunities` in `DISCOVERY`, owner copied from the lead.
3. Update `leads.status = 'QUALIFIED'`, `leads.opportunity_id` set.
4. Audit `lead.qualified` and `opportunity.created`, sharing one `request_id`.

### 10.2 Quote acceptance -> Order

1. Guards G-Q6, G-Q7 pass.
2. Ensure a `customers` row exists for the accepting contact; create if absent.
3. Insert `orders` in `PENDING_DEPOSIT`, copying totals verbatim from the Quote version.
4. Insert `order_lines` from `quote_lines`, one-to-one.
5. Insert the stage-1 `invoices` row (25% of total, rounded per Section 11.2).
6. Update `quotes.status = 'ACCEPTED'`; supersede sibling versions.
7. Audit `quote.accepted`, `order.created`, `invoice.issued`, sharing one `request_id`.

### 10.3 Deposit payment -> Order confirmation

1. Stripe webhook ingested idempotently by `stripe_event_id`.
2. Insert `payments`; insert `payment_allocations` against the stage-1 invoice.
3. Reconciliation marks `reconciled_at`.
4. Guard G-R4, G-R5 pass; `orders.status = 'CONFIRMED'`, `payment_stage = 1`.
5. Insert `payment_stage_history` row.
6. Opportunity transitions to `WON` (ACC-CONTRACT-002).
7. Audit `payment.received`, `payment.allocated`, `order.confirmed`,
   `opportunity.won`.

### 10.4 Order confirmation -> Production records

1. For each `order_lines` row of `line_type = 'UNIT'`, insert one `production_records`
   row in `SCHEDULED`.
2. Convert the soft slot reservation to firm.
3. Audit `production.scheduled` per unit.

### 10.5 Pre-ship approval -> Shipment planning

1. Guard G-P9, G-P10, G-P11 pass per unit.
2. `production_records.status = 'PRE_SHIP_APPROVED'`.
3. When every unit on the order is approved, `orders.status = 'READY_TO_SHIP'` and the
   stage-4 invoice is generated.
4. Audit `production.pre_ship_approved` per unit and `order.stage_advanced`.

---

## 11. Financial Controls

### 11.1 Approval thresholds

Full matrix in BBH-ADMIN-IAM-SPECIFICATION.md Section 6. Behavioural rules here:

| Control | Rule |
|---|---|
| Discount | Above the author's ceiling routes the Quote to `PENDING_APPROVAL`; the approver must hold a ceiling at or above the requested discount. |
| Refund | Requires `approved_by_user_id` from a role whose ceiling covers the amount. A refund above the highest non-master ceiling requires MASTER_ADMIN. |
| Write-off | FINANCE_CONTROLLER up to the ceiling; above it, MASTER_ADMIN. Always severity CRITICAL. |
| Purchase order | Value-tiered; see IAM Section 6.2. |
| Price book activation | MASTER_ADMIN only, with an echoed confirmation value. |
| Order cancellation | Dual authorization (ACC-CONTRACT-006). |

### 11.2 Rounding

The 25/25/25/25 split is computed once, at order creation, as:

```
stage1 = floor(total_cents * 0.25)
stage2 = floor(total_cents * 0.25)
stage3 = floor(total_cents * 0.25)
stage4 = total_cents - stage1 - stage2 - stage3   // absorbs the remainder
```

The remainder always lands on the final stage. Recomputation of an already-issued stage
amount is forbidden; a change order creates a delta invoice instead.

### 11.3 Segregation of duties

| Rule | Statement |
|---|---|
| SOD-1 | The user who creates a Payment may not be the user who approves its refund. |
| SOD-2 | The user who raises a PO may not be the user who approves it, unless both are MASTER_ADMIN and the action is audited at WARNING. |
| SOD-3 | The user who records a QC pass may not be the user who countersigns the pre-ship acceptance document. |
| SOD-4 | The two Order cancellation approvals must come from distinct users (ACC-CONTRACT-006). |

### ACC-CONTRACT-011: Money Moves Only Against An Invoice

**Statement:** No Payment may exist without at least one `payment_allocations` row within
the same transaction, except an unapplied receipt explicitly flagged `ON_ACCOUNT`, which
must be allocated or refunded within 30 days. The sum of allocations never exceeds either
the payment amount or the invoice total.

**Enforcement:** Trigger-enforced invariants (BBH-ADMIN-DATABASE-SCHEMA.md Section 9.2)
plus INT-02. The 30-day ageing of `ON_ACCOUNT` receipts is a dashboard exception tile.

**Purpose:** OBJ-02. Unallocated cash is indistinguishable from missing cash at month
close.

**Status:** LOCKED | **Date:** 2026-09-11

---

## 12. Audit Event Catalogue

Every event below is written by the transition that names it. This table is the complete
Phase 1-5 pipeline event set; a transition emitting an action outside this list is a
defect.

| Action | Severity | Emitted by | Required `after_state` keys |
|---|---|---|---|
| `lead.created` | INFO | Section 3.2 | status, contact_id, source |
| `lead.assigned` | INFO | Section 3.2 | owner_user_id, assigned_at |
| `lead.first_touched` | INFO | Section 3.2 | first_touch_at |
| `lead.qualified` | NOTICE | Section 10.1 | opportunity_id |
| `lead.disqualified` | NOTICE | Section 3.2 | disqualify_reason |
| `lead.recycled` | INFO | Section 3.2 | recycle_at |
| `opportunity.created` | INFO | Section 10.1 | stage, amount_cents, owner_user_id |
| `opportunity.stage_changed` | NOTICE | Section 4.2 | from_stage, to_stage |
| `opportunity.stage_regressed` | WARNING | Section 4.2 | from_stage, to_stage, reason |
| `opportunity.won` | CRITICAL | Section 10.3 | order_id, amount_cents |
| `opportunity.lost` | NOTICE | Section 4.2 | loss_reason |
| `quote.created` | INFO | Section 5.2 | quote_number, version_number |
| `quote.submitted_for_approval` | NOTICE | Section 5.2 | discount_percent, approver_role |
| `quote.approved` | NOTICE | Section 5.2 | approved_by_user_id, discount_percent |
| `quote.issued` | NOTICE | Section 5.2 | total_cents, valid_until, price_book_id |
| `quote.accepted` | CRITICAL | Section 10.2 | total_cents, accepted_by_contact_id, evidence_ref |
| `quote.expired` | INFO | Section 5.2 | valid_until |
| `quote.superseded` | INFO | Section 5.2 | superseded_by_quote_id |
| `order.created` | CRITICAL | Section 10.2 | order_number, total_cents, quote_id |
| `order.confirmed` | CRITICAL | Section 10.3 | payment_stage, payment_id |
| `order.stage_advanced` | CRITICAL | Section 6.2 | from_stage, to_stage, invoice_id |
| `order.shipped` | NOTICE | Section 6.2 | shipment_ids |
| `order.delivered` | CRITICAL | Section 9 | delivered_at, pod_document_id |
| `order.completed` | CRITICAL | Section 6.2 | completed_at |
| `order.cancelled` | CRITICAL | Section 6.2 | cancel_reason, settlement_cents, approver_user_ids |
| `order.hold_placed` | WARNING | Section 6.4 | hold_type, reason |
| `order.hold_released` | NOTICE | Section 6.4 | hold_type |
| `production.scheduled` | INFO | Section 10.4 | order_id, slot_id |
| `production.build_started` | NOTICE | Section 7.1 | serial_number |
| `production.qc_recorded` | CRITICAL | Section 7.1 | qc_result, inspector_user_id |
| `production.qc_failed` | CRITICAL | Section 7.1 | defect_ids |
| `production.pre_ship_approved` | CRITICAL | Section 7.1 | qc_result, document_id, stage3_invoice_id |
| `production.scrapped` | CRITICAL | Section 7.1 | scrap_reason, cost_cents, approver_user_ids |
| `shipment.planned` | INFO | Section 8.1 | production_record_ids |
| `shipment.booked` | NOTICE | Section 8.1 | carrier_name, freight_quote_id |
| `shipment.delivered` | CRITICAL | Section 8.1 | delivered_at, pod_document_id |
| `shipment.exception` | WARNING | Section 8.1 | exception_reason |
| `delivery.scheduled` | INFO | Section 9 | appointment_at, property_id |
| `delivery.pod_captured` | CRITICAL | Section 9 | pod_document_id, captured_by |
| `payment.received` | CRITICAL | Section 10.3 | amount_cents, method, stripe_event_id |
| `payment.allocated` | NOTICE | Section 10.3 | invoice_id, amount_cents |
| `payment.refunded` | CRITICAL | Section 11.1 | amount_cents, reason, approver_user_id |
| `payment.reconciled` | INFO | ACC-016 | reconciliation_run_id |
| `invoice.issued` | NOTICE | Section 10.2 | payment_stage, total_cents, due_at |
| `invoice.paid` | NOTICE | ACC-016 | paid_at |
| `invoice.written_off` | CRITICAL | Section 11.1 | amount_cents, reason, approver_user_id |

---

## 13. Verification Requirements

Each state machine requires the following before its module is complete. These are
behavioural tests, distinct from the API contract tests in
BBH-ADMIN-API-CONTRACTS.md Section 13.

| # | Requirement |
|---|---|
| V1 | Every legal transition in the table has a passing test that performs it end to end against real Supabase. |
| V2 | Every illegal transition (the complement of the table) has a test asserting `409 CONFLICT`. Generated from the table, not hand-listed, per CONTRACT-005. |
| V3 | Every guard has a test that fails it deliberately and asserts the guard names itself in `details`. |
| V4 | Every constitutional guard has a test asserting MASTER_ADMIN also receives the rejection. |
| V5 | Every transition has a test asserting the audit row exists with the correct action, severity, and required `after_state` keys. |
| V6 | Every dual-authorization control has a test asserting a single user holding both roles cannot self-satisfy it. |
| V7 | Each handoff in Section 10 has a test asserting atomicity: an induced failure at any step leaves the source entity unchanged. |

---

**End of BBH-ADMIN-BEHAVIORAL-CONTRACTS.md**
