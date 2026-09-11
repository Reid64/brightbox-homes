# BBH ADMIN COMMAND CENTER - MASTER SPECIFICATION

**Document ID:** BBH-ADMIN-MASTER-SPEC
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Supersedes:** nothing (new document set)

---

## 0. How To Read This Document

This is the root document of the Admin Command Center specification layer. It defines
WHAT the system is, WHICH modules exist, WHEN each is built, and WHY. It deliberately
contains no implementation detail: schema lives in BBH-ADMIN-DATABASE-SCHEMA.md,
transport in BBH-ADMIN-API-CONTRACTS.md, behaviour in BBH-ADMIN-BEHAVIORAL-CONTRACTS.md,
access control in BBH-ADMIN-IAM-SPECIFICATION.md, system design in
BBH-ADMIN-ARCHITECTURE.md, and the executable build order in
BBH-ADMIN-PHASE1-BUILD-MANIFEST.md.

A statement in this document is binding. A statement that conflicts with a root
governance file (CLAUDE.md, GOVERNANCE_BRIEF.md, BEHAVIORAL_CONTRACTS.md,
ARCHITECTURE.md, SCHEMA_REGISTRY.md, PRD.md) loses: the root governance file wins, and
the conflict is logged in Section 11 (Decision Log) as a defect in this document.

### Document set

| Document | Answers |
|---|---|
| BBH-ADMIN-MASTER-SPEC.md | What modules exist, in what order, and why |
| BBH-ADMIN-DATABASE-SCHEMA.md | Exact tables, columns, types, constraints, indexes, RLS |
| BBH-ADMIN-API-CONTRACTS.md | Exact procedures, payloads, status codes, errors, limits |
| BBH-ADMIN-BEHAVIORAL-CONTRACTS.md | Exact state machines, guards, approvals, audit events |
| BBH-ADMIN-IAM-SPECIFICATION.md | Exact roles, permissions, thresholds, MFA, sessions |
| BBH-ADMIN-ARCHITECTURE.md | Exact stack, folders, middleware, errors, observability |
| BBH-ADMIN-PHASE1-BUILD-MANIFEST.md | Exact files, migrations, tests, acceptance criteria |

### Cross-references (root governance)

- Operational methodology and the Six Laws gate: `GOVERNANCE_BRIEF.md` Sections 3, 5, 7
- Iron Laws, quality gates, recovery protocol: `CLAUDE.md`
- Locked engineering contracts CONTRACT-001..016: `BEHAVIORAL_CONTRACTS.md`
- Existing marketing-site architecture: `ARCHITECTURE.md`
- Existing table registry (Phase 1A/1B): `SCHEMA_REGISTRY.md`
- Existing marketing/admin/portal features: `PRD.md`

---

## 1. Provenance Of The Module Index

> **DERIVED INDEX - REPLACE IF AN AUTHORITATIVE OUTLINE EXISTS.**
> The 34-module outline referenced in the commissioning request was not present in the
> repository or in the commissioning conversation at authoring time. The index in
> Section 5 was reconstructed from: (a) the Phase 1 entity list supplied in the request
> (Contact, Consent, Lead, Opportunity, Customer, Property, Product, Configuration,
> Quote, Order, Supplier, PurchaseOrder, ProductionRecord, Shipment, Invoice, Payment,
> User, Role); (b) the supplied pipeline Lead -> Opportunity -> Quote -> Order ->
> Production -> Shipment -> Delivery; (c) the supplied ten-role IAM requirement;
> (d) the existing `PRD.md` ADMIN-001..ADMIN-010 and PORTAL-001..PORTAL-005 features;
> (e) `SCHEMA_REGISTRY.md` Phase 1A/1B tables.
>
> Every module ID below is stable and referenced by the other six documents. If the
> authoritative outline differs, reconcile by editing THIS section and Section 5 only,
> then re-point the affected references. Documents 2-7 are driven by the entity,
> pipeline, and role lists, not by the module index, and survive a renumbering.

---

## 2. Business Objectives

The Admin Command Center is the internal system of record for running Bright Box Homes
as an operating company, replacing spreadsheet-and-inbox coordination between sales,
finance, procurement, production, and logistics.

| ID | Objective | Measure | Target | Phase |
|---|---|---|---|---|
| OBJ-01 | One record of truth per customer relationship | Duplicate contact rate | < 1% of contacts | 2 |
| OBJ-02 | Every dollar traceable to an order and a payment stage | Unreconciled payment value | $0 at month close | 3 |
| OBJ-03 | No unit ships without recorded pre-ship approval | Shipments lacking approval record | 0 | 5 |
| OBJ-04 | Full forensic reconstruction of any order | Order events reconstructable from audit_log | 100% | 1 |
| OBJ-05 | Least-privilege access enforced by role | Permission checks outside canonical helper | 0 (CONTRACT-003) | 1 |
| OBJ-06 | Lead response inside one business hour | Median lead first-touch | < 60 min | 2 |
| OBJ-07 | Production capacity visible before quoting | Quotes issued against unavailable slots | 0 | 4 |
| OBJ-08 | Landed cost known before margin is promised | Orders with estimated landed cost at quote | 100% | 4 |

### Non-objectives

The Command Center is explicitly NOT: a general accounting ledger (books remain in the
external accounting system, fed by ACC-016), a CAD or engineering system, an HR or
payroll system, a public-facing storefront (that is the marketing site), or a
replacement for Stripe as the payment processor.

---

## 3. Definitions

Terms are binding across all seven documents. Where a term also appears in root
governance, the root definition governs.

| Term | Definition |
|---|---|
| **Command Center** | The authenticated internal application rooted at `/admin`. |
| **Module** | A bounded functional area with its own routes, permissions, and acceptance criteria. Identified `ACC-NNN`. |
| **Contact** | A natural person or organisation record. Identity only; carries no pipeline state. |
| **Consent** | A dated, sourced, revocable permission by a Contact for a specific channel and purpose. |
| **Lead** | An unqualified expression of interest attached to a Contact. |
| **Opportunity** | A qualified, forecastable pursuit with an amount, stage, and expected close date. |
| **Quote** | A versioned, priced, expiring offer for a Configuration. Immutable once issued. |
| **Configuration** | A resolved set of product option selections with a computed price, emitted by the configurator package. |
| **Order** | A customer-accepted Quote that has passed the deposit gate. The commercial commitment. |
| **Property** | The physical site a unit is destined for, with address, access, and site-readiness attributes. |
| **Production Record** | The manufacturing instance of one ordered unit, with a serial number and QC state. |
| **Shipment** | The movement of one or more Production Records from origin to a Property. |
| **Delivery** | Confirmed physical handover at a Property, evidenced by proof-of-delivery. |
| **Invoice** | A demand for payment for one payment stage of an Order. |
| **Payment** | An applied receipt against one or more Invoices. |
| **Payment stage** | One of the four 25% milestones of the 25/25/25/25 structure. Legally significant (CONTRACT-004). |
| **Principal** | Any authenticated actor: staff User, Customer, or Service Account. |
| **Role** | A named permission bundle assigned to a User. Ten staff roles, enumerated in BBH-ADMIN-IAM-SPECIFICATION.md. |
| **Threshold** | A monetary or quantitative ceiling above which an action requires a higher role's approval. |
| **Guard** | A precondition that must hold for a state transition to be permitted. |
| **Audit event** | An append-only row in `audit_log` per CONTRACT-004. |
| **Phase** | A numbered delivery tranche, 1 through 7. A module belongs to exactly one phase. |
| **Six Laws** | Schema, API, UI, Data, Wiring, Verification. A module is incomplete until all six hold (CLAUDE.md Section 2). |
| **Dormant table** | A table created ahead of its owning module, RLS default-deny, with no write path until that module ships. |

---

## 4. Assumptions And Constraints

### 4.1 Assumptions (invalidate the spec if false)

| ID | Assumption | If false |
|---|---|---|
| ASM-01 | Supabase Postgres remains the single primary datastore. | Re-author BBH-ADMIN-DATABASE-SCHEMA.md; the RLS model does not port. |
| ASM-02 | Stripe remains the processor for all customer payments. | ACC-016 reconciliation redesign. |
| ASM-03 | The 25/25/25/25 payment structure is fixed for Phase 1-5. | ACC-015 and the Order state machine change. |
| ASM-04 | Staff headcount stays under 50 for Phase 1-4. | Revisit role granularity; consider ABAC over RBAC. |
| ASM-05 | Manufacturing is performed by external factory partners, not in-house. | ACC-021/022 become MES-shaped rather than partner-coordination-shaped. |
| ASM-06 | Units are imported; customs and landed cost apply. | ACC-024 becomes optional. |
| ASM-07 | One Order contains one or more units destined for one Property. | Multi-property Orders require an order-line to property mapping. |
| ASM-08 | The configurator package remains the sole producer of Configurations. | ACC-010 gains a manual configuration authoring path. |
| ASM-09 | US-only operations through Phase 5. | Multi-currency, tax, and regional pricing move forward from Phase 7. |

### 4.2 Constraints (binding, not negotiable at build time)

| ID | Constraint | Source |
|---|---|---|
| CON-01 | Next.js 14 App Router, TypeScript strict, Supabase, Vercel, pnpm. No substitutions. | CLAUDE.md Section 0 |
| CON-02 | Governance files are read-only to all agents. | CLAUDE.md Iron Law 1 |
| CON-03 | Compile, build, lint, test gates run after every prompt; no gate may be skipped or weakened. | CLAUDE.md Iron Law 2, Section 3 |
| CON-04 | `middleware.ts` is replaced whole, never patched. | CLAUDE.md Iron Law 4 |
| CON-05 | No mocks, stubs, or fakes in verification. Real Supabase, real routes. | CLAUDE.md Iron Law 5 |
| CON-06 | Every state mutation writes an audit row with actor, role, before, after, IP, user agent. | CONTRACT-004 |
| CON-07 | Every protected route authorises through `lib/auth/check-permission.ts`. Inline auth is forbidden. | CONTRACT-003 |
| CON-08 | RLS enabled on every table, default deny. | SCHEMA_REGISTRY.md Conventions |
| CON-09 | Initial data for `/admin/*` is fetched in Server Components, never in a mount effect. | CONTRACT-011 |
| CON-10 | All error responses use the structured `{ error: { code, message, details? } }` shape. | CONTRACT-010 |
| CON-11 | Operational caps live only in `lib/caps.ts`. | CONTRACT-009 |
| CON-12 | Every migration carries a pre-check and a post-check block. | CONTRACT-012 |
| CON-13 | UTF-8 without BOM; no mojibake bytes in any committed text file. | CONTRACT-007, CONTRACT-016 |
| CON-14 | The last active MASTER_ADMIN cannot be demoted or deactivated. | CONTRACT-008, SCHEMA_REGISTRY.md Table 6 |
| CON-15 | Money is stored as integer minor units (cents). Floating point money is forbidden. | Section 8 of this document |
| CON-16 | Append-only tables (`audit_log`, ledgers) have no UPDATE or DELETE path at any role. | CONTRACT-004 |

---

## 5. Module Index (34 Modules)

Priority tiers follow `PRD.md`: P0 launch blocker, P1 launch shaping, P2 post-launch,
P3 future.

| ID | Module | Phase | Priority | Primary entities | Depends on |
|---|---|---|---|---|---|
| ACC-001 | Identity and Access Management | 1 | P0 | User, Role, Session | - |
| ACC-002 | Master Data Management | 1 | P0 | Product, Option, PriceBook | ACC-001 |
| ACC-003 | Core Dashboard | 1 | P0 | (read-only aggregate) | ACC-001, ACC-002 |
| ACC-004 | Audit and Forensics | 1 | P0 | AuditEvent | ACC-001 |
| ACC-005 | Notification and Alerting | 1 | P1 | Notification, Subscription | ACC-001 |
| ACC-006 | Contact and Consent | 2 | P0 | Contact, Consent | ACC-001 |
| ACC-007 | Lead Management | 2 | P0 | Lead | ACC-006 |
| ACC-008 | Opportunity and Pipeline | 2 | P0 | Opportunity | ACC-007 |
| ACC-009 | Quote and Pricing (CPQ) | 2 | P0 | Quote, QuoteLine | ACC-002, ACC-008, ACC-010 |
| ACC-010 | Configuration Management | 2 | P0 | Configuration | ACC-002 |
| ACC-011 | Customer Accounts | 2 | P0 | Customer | ACC-006 |
| ACC-012 | Property and Site Records | 2 | P1 | Property | ACC-011 |
| ACC-013 | Order Management | 3 | P0 | Order, OrderLine | ACC-009, ACC-011 |
| ACC-014 | Contract and Document Management | 3 | P0 | Document, Signature | ACC-013 |
| ACC-015 | Invoicing and Receivables | 3 | P0 | Invoice, InvoiceLine | ACC-013 |
| ACC-016 | Payments and Reconciliation | 3 | P0 | Payment, PaymentAllocation | ACC-015 |
| ACC-017 | Financing and Lender Integration | 3 | P1 | FinanceApplication | ACC-011 |
| ACC-018 | Tax, Fees and Compliance Charges | 3 | P1 | TaxRule, ChargeLine | ACC-015 |
| ACC-019 | Supplier and Vendor Management | 4 | P0 | Supplier, SupplierContact | ACC-001 |
| ACC-020 | Purchase Orders and Procurement | 4 | P0 | PurchaseOrder, POLine | ACC-019, ACC-013 |
| ACC-021 | Production Scheduling and Capacity | 4 | P0 | ProductionSlot, Capacity | ACC-013 |
| ACC-022 | Production Execution and QC | 4 | P0 | ProductionRecord, QCInspection | ACC-021, ACC-020 |
| ACC-023 | Inventory and Serialization | 4 | P1 | InventoryItem, SerialNumber | ACC-022 |
| ACC-024 | Landed Cost and Customs | 4 | P1 | LandedCostSheet, CustomsEntry | ACC-020 |
| ACC-025 | Freight and Carrier Management | 5 | P0 | Carrier, FreightQuote | ACC-019 |
| ACC-026 | Shipment Tracking | 5 | P0 | Shipment, ShipmentEvent | ACC-022, ACC-025 |
| ACC-027 | Delivery and Site Readiness | 5 | P0 | DeliveryEvent, SiteChecklist | ACC-012, ACC-026 |
| ACC-028 | Installation and Field Service | 5 | P1 | WorkOrder, FieldVisit | ACC-027 |
| ACC-029 | Warranty and Claims | 6 | P0 | WarrantyPolicy, Claim | ACC-027 |
| ACC-030 | Service Tickets and Support | 6 | P1 | Ticket, TicketMessage | ACC-011 |
| ACC-031 | Marketing Attribution and Affiliates | 6 | P1 | Attribution, Affiliate | ACC-007 |
| ACC-032 | Analytics and Reporting | 6 | P1 | Report, SavedView | ACC-003 |
| ACC-033 | Integration Hub and Webhooks | 7 | P1 | Integration, WebhookDelivery | ACC-001 |
| ACC-034 | System Administration and Configuration | 7 | P1 | Setting, FeatureFlag, Cap | ACC-001 |

---

## 6. Module Specifications

Each module carries: purpose, in-scope capabilities (numbered and testable), explicit
out-of-scope, owning role, primary entities, and success criteria. Capabilities are the
unit that BBH-ADMIN-PHASE1-BUILD-MANIFEST.md converts into acceptance criteria.

### Phase 1 - Foundation

#### ACC-001: Identity and Access Management

**Phase:** 1 | **Priority:** P0 | **Owner:** MASTER_ADMIN | **Depends on:** -
**Entities:** User, Role, RoleAssignment, Session, MfaEnrollment

**Purpose:** Establish who may act, as what, and with what evidence, before any other
module holds data.

**In scope:**
1. Staff user lifecycle: invite, activate, suspend, reactivate. No hard delete.
2. Ten-role model with a single canonical permission matrix (BBH-ADMIN-IAM-SPECIFICATION.md Section 4).
3. Permission evaluation through one exported helper (CONTRACT-003).
4. MFA enrolment and enforcement per role tier.
5. Session issue, refresh, idle timeout, absolute timeout, forced revocation.
6. Constitutional constraints: last MASTER_ADMIN protection, no self-role-escalation, no self-audit-suppression (CONTRACT-008).
7. Every IAM mutation emits an audit event.

**Out of scope:** SSO/SAML (Phase 7, ACC-033), customer portal authentication
(PRD.md PORTAL-001), HR records.

**Success criteria:** Zero authorization decisions outside the canonical helper; zero
active sessions surviving suspension; 100% of IAM mutations present in `audit_log`.

#### ACC-002: Master Data Management

**Phase:** 1 | **Priority:** P0 | **Owner:** ADMIN | **Depends on:** ACC-001
**Entities:** Product, ProductOption, OptionValue, PriceBook, PriceBookEntry

**Purpose:** Own the catalogue every Configuration, Quote, and Order references, so
pricing is never re-keyed.

**In scope:**
1. Product CRUD keyed on SKU, aligned to `SCHEMA_REGISTRY.md` Table 10.
2. Option groups and values with compatibility rules.
3. Effective-dated price books; a price change never mutates history.
4. Publish/unpublish without delete; `is_active` governs public exposure.
5. Price changes approval-gated above threshold (BBH-ADMIN-IAM-SPECIFICATION.md Section 6).

**Out of scope:** Configurator rendering assets, marketing copy (PRD.md BBH-002).

**Success criteria:** Every Quote line resolves to exactly one PriceBookEntry effective
at quote time; zero retroactive price mutations.

#### ACC-003: Core Dashboard

**Phase:** 1 | **Priority:** P0 | **Owner:** all staff roles | **Depends on:** ACC-001, ACC-002
**Entities:** none owned; reads aggregates

**Purpose:** One operational surface answering "what needs attention now" per role.

**In scope:**
1. Role-scoped tiles; a tile a role cannot read is not rendered, not greyed out.
2. Server-Component data fetch only (CONTRACT-011).
3. Exception queues: stalled pipeline, overdue invoice, blocked production, late shipment.
4. Time-to-interactive under 2s at P75 with production data volume.

**Out of scope:** Ad-hoc report building (ACC-032), export beyond CSV of a visible table.

**Success criteria:** Every tile traces to a permission and a bounded query; no client
mount-fetch on the route.

#### ACC-004: Audit and Forensics

**Phase:** 1 | **Priority:** P0 | **Owner:** MASTER_ADMIN | **Depends on:** ACC-001
**Entities:** AuditEvent

**Purpose:** Make any past state reconstructable, per CONTRACT-004 and the legal exposure
attached to payment stages.

**In scope:**
1. Append-only sink; no UPDATE or DELETE path at any role including MASTER_ADMIN.
2. Canonical writer library; direct inserts from feature code are forbidden.
3. Query surface by actor, resource, action, time window.
4. Before/after JSONB diffs rendered as field-level changes.
5. Retention indefinite; export for legal hold.

**Out of scope:** Application logs and traces (observability, BBH-ADMIN-ARCHITECTURE.md
Section 9), security incident response tooling.

**Success criteria:** For any Order, the full event sequence is reconstructable from
`audit_log` alone.

#### ACC-005: Notification and Alerting

**Phase:** 1 | **Priority:** P1 | **Owner:** ADMIN | **Depends on:** ACC-001
**Entities:** Notification, NotificationSubscription, NotificationDelivery

**Purpose:** Route state changes to the human who must act, without inventing a second
source of truth.

**In scope:**
1. Event subscriptions per role and per record ownership.
2. In-app inbox plus transactional email via the existing Resend integration (PRD.md INFRA-003).
3. Delivery attempt log with failure reason.
4. Digest batching and per-user quiet hours.

**Out of scope:** Marketing email, SMS (requires the TCPA consent path in ACC-006), push.

**Success criteria:** No notification reaches a principal lacking read permission on the
referenced record.

### Phase 2 - Revenue Capture

#### ACC-006: Contact and Consent

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_MANAGER | **Depends on:** ACC-001
**Entities:** Contact, ContactChannel, Consent

**Purpose:** One identity per human, with defensible evidence of what they agreed to.

**In scope:**
1. Contact CRUD with deterministic dedupe on normalised email and E.164 phone.
2. Merge with full lineage; merged records are tombstoned, never deleted.
3. Consent per channel (email, sms, phone) and purpose (transactional, marketing), each with source, timestamp, IP, and text version.
4. Revocation immediate and irreversible for the revoked grant; a new grant is a new row.
5. Suppression list honoured by ACC-005 and every outbound path.

**Out of scope:** Public-site form rendering (PRD.md BBH-008), CRM mailbox sync.

**Success criteria:** No outbound marketing send without a current unrevoked consent row;
duplicate contact rate below 1%.

#### ACC-007: Lead Management

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_REP | **Depends on:** ACC-006
**Entities:** Lead, LeadActivity

**Purpose:** Capture, score, route, and qualify inbound interest inside one business hour.

**In scope:**
1. Ingest from marketing-site forms (existing `leads` table, `SCHEMA_REGISTRY.md` Table 1) and manual entry.
2. Assignment by territory and round-robin, with manual override.
3. Scoring from timeline, budget, intended use, product interest.
4. Disposition: qualify (creates Opportunity), disqualify with reason, recycle with date.
5. First-touch SLA timer and breach alerting through ACC-005.

**Out of scope:** Automated nurture sequences (Phase 6), telephony.

**Success criteria:** Median first touch under 60 minutes; every terminal Lead state
carries a reason code.

#### ACC-008: Opportunity and Pipeline

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_MANAGER | **Depends on:** ACC-007
**Entities:** Opportunity, PipelineStage, ForecastSnapshot

**Purpose:** Make committed revenue forecastable and stage progression auditable.

**In scope:**
1. Stage model with entry and exit guards (BBH-ADMIN-BEHAVIORAL-CONTRACTS.md Section 4).
2. Amount, probability, expected close date, loss reason taxonomy.
3. Weekly forecast snapshots; snapshots are immutable.
4. Stage regression permitted with reason, never silent.

**Out of scope:** Commission calculation, quota management.

**Success criteria:** Every stage change has an actor, a timestamp, and on regression a
reason.

#### ACC-009: Quote and Pricing (CPQ)

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_REP | **Depends on:** ACC-002, ACC-008, ACC-010
**Entities:** Quote, QuoteLine, QuoteVersion, Discount

**Purpose:** Produce a priced, expiring, legally clean offer an Order can derive from
without re-pricing.

**In scope:**
1. Quote built from a Configuration plus freight, site, and fee lines.
2. Versioning: an issued Quote is immutable; revision creates a new version.
3. Discount authority by role and threshold, with approval routing above it.
4. Expiry with automatic transition; expired Quotes cannot be accepted.
5. PDF generation and delivery, with the sent artifact retained.

**Out of scope:** Signature capture (ACC-014), payment collection (ACC-016).

**Success criteria:** Zero Orders whose totals differ from their accepted Quote version;
zero above-threshold discounts without a recorded approval.

#### ACC-010: Configuration Management

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_REP | **Depends on:** ACC-002
**Entities:** Configuration, ConfigurationSelection

**Purpose:** Hold the resolved option set a Quote prices and Production builds, exactly as
emitted by the configurator package.

**In scope:**
1. Persist configurator state emissions (PRD.md CFG-007) with a schema version.
2. Validate selections against ACC-002 compatibility rules at save time.
3. Immutability once referenced by an issued Quote; changes fork a new Configuration.
4. Human-readable rendering of selections for production paperwork.

**Out of scope:** The configurator UI itself (`packages/configurator`), asset compositing.

**Success criteria:** Every Configuration referenced by an Order validates against the
price book effective at quote time.

#### ACC-011: Customer Accounts

**Phase:** 2 | **Priority:** P0 | **Owner:** SALES_MANAGER | **Depends on:** ACC-006
**Entities:** Customer, CustomerContactLink, BillingProfile

**Purpose:** Promote a Contact to a paying account without duplicating identity.

**In scope:**
1. Customer created only on first successful deposit (aligns `SCHEMA_REGISTRY.md` Table 5).
2. Many Contacts to one Customer (spouses, partners, company signatories) with roles.
3. Billing and shipping profiles; shipping resolves to a Property (ACC-012).
4. Portal access provisioning and revocation.

**Out of scope:** Portal UI (PRD.md PORTAL-001..005), credit scoring.

**Success criteria:** No Customer exists without at least one linked Contact and one Order.

#### ACC-012: Property and Site Records

**Phase:** 2 | **Priority:** P1 | **Owner:** LOGISTICS_COORDINATOR | **Depends on:** ACC-011
**Entities:** Property, SiteAttribute, SiteReadinessCheck

**Purpose:** Describe where the unit goes accurately enough to schedule freight and a
crane without a site-visit surprise.

**In scope:**
1. Normalised, geocoded address with parcel identifiers where available.
2. Access attributes: road width, turning radius, overhead clearance, crane standing area.
3. Utility and foundation status, permit status, flood-zone flag.
4. Readiness checklist gating delivery scheduling (ACC-027).

**Out of scope:** Permit application filing, survey ordering.

**Success criteria:** No delivery scheduled against a Property with an incomplete
readiness checklist.

### Phase 3 - Order To Cash

#### ACC-013: Order Management

**Phase:** 3 | **Priority:** P0 | **Owner:** SALES_MANAGER | **Depends on:** ACC-009, ACC-011
**Entities:** Order, OrderLine, OrderHold, ChangeOrder

**Purpose:** The commercial commitment, and the spine every downstream module hangs from.

**In scope:**
1. Order created only from an accepted, unexpired Quote version.
2. Line-level derivation from Quote lines; totals copied, never recomputed.
3. Holds (credit, compliance, customer request) that block downstream transitions.
4. Change orders with financial delta, re-approval, production impact assessment.
5. Cancellation as a state with reason and settlement, never a row deletion.

**Out of scope:** Invoice mechanics (ACC-015), production scheduling (ACC-021).

**Success criteria:** Every Order traces to exactly one accepted Quote version; zero
deleted Order rows.

#### ACC-014: Contract and Document Management

**Phase:** 3 | **Priority:** P0 | **Owner:** ADMIN | **Depends on:** ACC-013
**Entities:** Document, DocumentVersion, Signature, SignatureRequest

**Purpose:** Hold the executed paper that makes an Order and a pre-ship approval
enforceable.

**In scope:**
1. Template library with versioning; the version used is recorded on the Document.
2. Signature request lifecycle, including pre-ship acceptance (PRD.md PORTAL-003).
3. Immutable storage of executed artifacts with content hash.
4. Retention and legal hold.

**Out of scope:** Contract drafting, clause negotiation workflow.

**Success criteria:** Every shipped unit has a stored, hashed, countersigned pre-ship
acceptance document.

#### ACC-015: Invoicing and Receivables

**Phase:** 3 | **Priority:** P0 | **Owner:** FINANCE_CONTROLLER | **Depends on:** ACC-013
**Entities:** Invoice, InvoiceLine, DunningEvent

**Purpose:** Turn the four payment stages into issued, ageing, collectable demands.

**In scope:**
1. Stage-driven generation: 25% at order, 25% at production start, 25% at pre-ship, 25% at delivery.
2. Ageing buckets and dunning schedule through ACC-005.
3. Credit notes and write-offs, approval-gated by threshold.
4. Statement generation per Customer.

**Out of scope:** General ledger postings (external accounting), revenue recognition policy.

**Success criteria:** Sum of issued invoice amounts equals Order total for every
non-cancelled Order.

#### ACC-016: Payments and Reconciliation

**Phase:** 3 | **Priority:** P0 | **Owner:** FINANCE_CLERK | **Depends on:** ACC-015
**Entities:** Payment, PaymentAllocation, RefundRequest, ReconciliationRun

**Purpose:** Apply money to invoices and prove the system's cash matches the processor's.

**In scope:**
1. Stripe webhook ingestion, idempotent by event id.
2. Allocation of a Payment across one or many Invoices.
3. Refunds with approval above threshold and mandatory reason.
4. Daily reconciliation run producing an exception list; no stage advances on an unreconciled payment.
5. Payment stage transitions recorded in an append-only ledger (`SCHEMA_REGISTRY.md` Table 4 pattern).

**Out of scope:** Chargeback litigation, bank feed ingestion.

**Success criteria:** Zero unreconciled payments at month close; zero duplicate
applications of a Stripe event.

#### ACC-017: Financing and Lender Integration

**Phase:** 3 | **Priority:** P1 | **Owner:** FINANCE_CONTROLLER | **Depends on:** ACC-011
**Entities:** FinanceApplication, LenderDecision

**Purpose:** Track third-party financing without storing lender-grade PII we do not need.

**In scope:**
1. Referral to partner lenders (PRD.md INFRA-008 Acorn); status tracking only.
2. Decision record: approved amount, expiry, conditions.
3. Order gating when financing is the funding source.

**Out of scope:** Underwriting, credit bureau access, storage of full SSN or bank
credentials (explicitly forbidden).

**Success criteria:** No prohibited financial PII field exists in the schema; every
financed Order references a current approval.

#### ACC-018: Tax, Fees and Compliance Charges

**Phase:** 3 | **Priority:** P1 | **Owner:** FINANCE_CONTROLLER | **Depends on:** ACC-015
**Entities:** TaxRule, TaxDetermination, ChargeLine

**Purpose:** Compute and evidence non-product charges by jurisdiction.

**In scope:**
1. Destination-based determination keyed on Property address.
2. Rule effective dating and rate history.
3. Exemption certificates with expiry.
4. Determination snapshot stored on the Invoice; never recomputed retroactively.

**Out of scope:** Filing and remittance, nexus analysis.

**Success criteria:** Every Invoice carries a stored determination snapshot with rule
version.

### Phase 4 - Supply And Production

#### ACC-019: Supplier and Vendor Management

**Phase:** 4 | **Priority:** P0 | **Owner:** PROCUREMENT_OFFICER | **Depends on:** ACC-001
**Entities:** Supplier, SupplierContact, SupplierDocument, SupplierScorecard

**Purpose:** Know who we buy from, on what terms, with what compliance evidence.

**In scope:**
1. Onboarding with a required document set and expiry tracking.
2. Terms: incoterms, payment terms, lead times, currency.
3. Approval status gate; a PO cannot be issued to a non-approved Supplier.
4. Scorecard from on-time delivery and QC defect rate.

**Out of scope:** Supplier portal, RFQ bidding.

**Success criteria:** Zero POs to suppliers with expired required documents.

#### ACC-020: Purchase Orders and Procurement

**Phase:** 4 | **Priority:** P0 | **Owner:** PROCUREMENT_OFFICER | **Depends on:** ACC-019, ACC-013
**Entities:** PurchaseOrder, PurchaseOrderLine, GoodsReceipt

**Purpose:** Commit spend deliberately, match it to receipts, expose it to landed cost.

**In scope:**
1. Lifecycle draft -> approved -> issued -> acknowledged -> received -> closed.
2. Approval thresholds by value and role (BBH-ADMIN-IAM-SPECIFICATION.md Section 6).
3. Linkage to the Order(s) the spend serves, for margin attribution.
4. Three-way match: PO, goods receipt, supplier invoice.

**Out of scope:** Accounts payable disbursement, supplier invoice OCR.

**Success criteria:** No issued PO without a recorded approval at or above its value
threshold.

#### ACC-021: Production Scheduling and Capacity

**Phase:** 4 | **Priority:** P0 | **Owner:** PRODUCTION_MANAGER | **Depends on:** ACC-013
**Entities:** ProductionSlot, CapacityCalendar, SlotReservation

**Purpose:** Make the promise date real by reserving finite factory capacity.

**In scope:**
1. Capacity calendar per partner factory and product line.
2. Soft reservation at quote, firm reservation at order, release on cancellation.
3. Overbooking prevention with an explicit audited override for PRODUCTION_MANAGER.
4. Public availability feed reuses the existing `production_slots` concept (`SCHEMA_REGISTRY.md` Table 9).

**Out of scope:** Scheduling inside the partner plant, labour planning.

**Success criteria:** Reserved units never exceed capacity without an audited override.

#### ACC-022: Production Execution and QC

**Phase:** 4 | **Priority:** P0 | **Owner:** PRODUCTION_MANAGER | **Depends on:** ACC-021, ACC-020
**Entities:** ProductionRecord, ProductionMilestone, QCInspection, Defect

**Purpose:** Track each physical unit from build start to pre-ship approval, with evidence.

**In scope:**
1. One ProductionRecord per unit, serialised at build start.
2. Milestone progression with photo and document evidence at each gate.
3. QC inspection with pass, conditional pass, or fail; a fail blocks pre-ship.
4. Pre-ship approval requiring QC pass, the ACC-014 signed acceptance, and stage-3 payment cleared.

**Out of scope:** Factory MES integration (Phase 7), bill-of-materials explosion.

**Success criteria:** Zero units reaching Shipment without a QC pass and a recorded
pre-ship approval.

#### ACC-023: Inventory and Serialization

**Phase:** 4 | **Priority:** P1 | **Owner:** PRODUCTION_MANAGER | **Depends on:** ACC-022
**Entities:** InventoryItem, SerialNumber, StockMovement, Location

**Purpose:** Know where every serialised unit and long-lead component physically is.

**In scope:**
1. Serial registry with immutable serial-to-order binding once allocated.
2. Stock movements as an append-only ledger; balances derived, never stored.
3. Locations: factory, port, yard, in transit, delivered.

**Out of scope:** Consumables and fastener-level inventory, cycle counting.

**Success criteria:** Derived balance per location reconciles to the movement ledger at
all times.

#### ACC-024: Landed Cost and Customs

**Phase:** 4 | **Priority:** P1 | **Owner:** FINANCE_CONTROLLER | **Depends on:** ACC-020
**Entities:** LandedCostSheet, CostComponent, CustomsEntry, DutyLine

**Purpose:** Attribute freight, duty, brokerage, and handling to units so margin is true.

**In scope:**
1. Cost sheet per shipment or PO with allocation basis (value, weight, unit).
2. Customs entry with HTS classification and duty lines.
3. Estimated at quote, actualised at receipt, variance reported.

**Out of scope:** Broker filing, tariff engineering advice.

**Success criteria:** Every Order carries an estimated landed cost before quote issue and
an actual within 30 days of receipt.

### Phase 5 - Logistics And Delivery

#### ACC-025: Freight and Carrier Management

**Phase:** 5 | **Priority:** P0 | **Owner:** LOGISTICS_COORDINATOR | **Depends on:** ACC-019
**Entities:** Carrier, FreightQuote, FreightContract, Accessorial

**Purpose:** Buy transport deliberately and price it into the Quote accurately.

**In scope:**
1. Carrier registry with insurance and authority documents, expiry-tracked.
2. Rate requests and stored freight quotes with expiry.
3. Accessorial catalogue: crane, escort, permit, detention, redelivery.
4. Freight estimate feed into ACC-009 at quote time.

**Out of scope:** Load board integration, carrier payment.

**Success criteria:** Every Shipment references a freight quote whose expiry covered its
booking date.

#### ACC-026: Shipment Tracking

**Phase:** 5 | **Priority:** P0 | **Owner:** LOGISTICS_COORDINATOR | **Depends on:** ACC-022, ACC-025
**Entities:** Shipment, ShipmentLine, ShipmentEvent, TrackingSubscription

**Purpose:** Answer "where is my house" for staff and the portal, from one record.

**In scope:**
1. Shipment creation only from pre-ship-approved ProductionRecords.
2. Event timeline: booked, picked up, in transit, at port, customs cleared, out for delivery.
3. ETA with variance alerting through ACC-005.
4. Exceptions: damage in transit, refusal, reroute.

**Out of scope:** Customer-facing UI (PRD.md PORTAL-002), GPS telematics.

**Success criteria:** No Shipment exists whose lines are not all pre-ship approved.

#### ACC-027: Delivery and Site Readiness

**Phase:** 5 | **Priority:** P0 | **Owner:** LOGISTICS_COORDINATOR | **Depends on:** ACC-012, ACC-026
**Entities:** DeliveryAppointment, DeliveryEvent, ProofOfDelivery, SiteChecklist

**Purpose:** Convert arrival into an evidenced, financially closable handover.

**In scope:**
1. Appointment scheduling gated on site readiness (ACC-012) and stage-4 invoice issue.
2. Proof of delivery: signature, photos, timestamp, geolocation.
3. Damage and shortage recording at handover, feeding ACC-029.
4. Delivery confirmation triggers final payment stage and warranty start.

**Out of scope:** Crane subcontractor dispatch, foundation construction.

**Success criteria:** Every Delivery has a stored proof-of-delivery artifact before the
Order can reach COMPLETE.

#### ACC-028: Installation and Field Service

**Phase:** 5 | **Priority:** P1 | **Owner:** LOGISTICS_COORDINATOR | **Depends on:** ACC-027
**Entities:** WorkOrder, FieldVisit, TechnicianAssignment, PartsUsage

**Purpose:** Coordinate set, tie-in, and punch-list work after the unit lands.

**In scope:**
1. Work order creation from a delivery punch list or a warranty claim.
2. Technician or subcontractor assignment with scheduling.
3. Visit outcome with photos, parts used, customer sign-off.

**Out of scope:** Subcontractor payroll, route optimisation.

**Success criteria:** Every open punch-list item resolves to a closed work order or an
accepted waiver.

### Phase 6 - Post Sale And Growth

#### ACC-029: Warranty and Claims

**Phase:** 6 | **Priority:** P0 | **Owner:** SUPPORT_AGENT | **Depends on:** ACC-027
**Entities:** WarrantyPolicy, WarrantyRegistration, Claim, ClaimLine, Resolution

**Purpose:** Honour the published warranty (PRD.md LEGAL-004) with a defensible record.

**In scope:**
1. Policy versioning; registration bound to serial number and delivery date.
2. Claim intake, triage, coverage determination, resolution with cost capture.
3. Supplier recovery where a defect is attributable to a Supplier (ACC-019 scorecard feed).
4. Coverage expiry computed from delivery, not order.

**Out of scope:** Extended warranty sales, insurance claims.

**Success criteria:** Every claim decision records the policy version and the clause
relied upon.

#### ACC-030: Service Tickets and Support

**Phase:** 6 | **Priority:** P1 | **Owner:** SUPPORT_AGENT | **Depends on:** ACC-011
**Entities:** Ticket, TicketMessage, SlaPolicy, Escalation

**Purpose:** One queue for customer contact that is neither a claim nor a sale.

**In scope:**
1. Ticket lifecycle with SLA timers by priority.
2. Threaded messages with internal-note separation.
3. Escalation rules and reassignment.
4. Linkage to Order, Shipment, or Claim.

**Out of scope:** Live chat widget (PRD.md BBH-019), telephony, knowledge base authoring.

**Success criteria:** No ticket closed without a resolution code; SLA breach rate reported
weekly.

#### ACC-031: Marketing Attribution and Affiliates

**Phase:** 6 | **Priority:** P1 | **Owner:** SALES_MANAGER | **Depends on:** ACC-007
**Entities:** AttributionTouch, Affiliate, Commission, PayoutBatch

**Purpose:** Know which spend produced which Order, and pay partners correctly.

**In scope:**
1. Multi-touch attribution chain from first touch to closed Order.
2. Affiliate registry mirroring the external Rewardful integration (PRD.md INFRA-010).
3. Commission on realised revenue, not booked.
4. Payout batching with approval.

**Out of scope:** Ad platform bidding, creative management.

**Success criteria:** Commission total per period reconciles to the external affiliate
platform within tolerance.

#### ACC-032: Analytics and Reporting

**Phase:** 6 | **Priority:** P1 | **Owner:** ADMIN | **Depends on:** ACC-003
**Entities:** Report, SavedView, ScheduledExport, MetricDefinition

**Purpose:** Answer business questions without anyone querying production tables by hand.

**In scope:**
1. Metric definitions with a single formula per metric; no duplicate definitions.
2. Saved views with role-scoped sharing.
3. Scheduled exports with the same permission checks as interactive reads.
4. Read replica or materialised views for heavy aggregates.

**Out of scope:** Data warehouse, third-party BI licence, ML forecasting.

**Success criteria:** Every published metric has exactly one definition of record.

### Phase 7 - Platform And Extensibility

#### ACC-033: Integration Hub and Webhooks

**Phase:** 7 | **Priority:** P1 | **Owner:** ADMIN | **Depends on:** ACC-001
**Entities:** Integration, ApiKey, WebhookEndpoint, WebhookDelivery, InboundEvent

**Purpose:** One governed door for every external system instead of scattered ad-hoc calls.

**In scope:**
1. Outbound webhooks with signing, retry with backoff, delivery log.
2. Inbound ingestion with idempotency keys and replay protection.
3. Service-account API keys scoped to permissions, rotatable, revocable.
4. Per-integration rate limits sourced from `lib/caps.ts` (CONTRACT-009).

**Out of scope:** Public partner API programme, GraphQL gateway.

**Success criteria:** Zero external calls to the Command Center outside a registered
Integration.

#### ACC-034: System Administration and Configuration

**Phase:** 7 | **Priority:** P1 | **Owner:** MASTER_ADMIN | **Depends on:** ACC-001
**Entities:** Setting, FeatureFlag, OperationalCap, MaintenanceWindow

**Purpose:** Change system behaviour deliberately, visibly, and reversibly.

**In scope:**
1. Typed settings registry with validation and audit on change.
2. Feature flags with role and environment targeting.
3. Operational cap administration whose values remain sourced from `lib/caps.ts`
   (CONTRACT-009); the UI edits the backing store, it does not create a second definition.
4. Maintenance windows with a read-only mode.

**Out of scope:** Infrastructure provisioning, secret management (Vercel and Supabase own
this).

**Success criteria:** Every setting change is audited with before and after values.

---

## 7. Phase Roadmap

A phase is complete when every module in it satisfies the Six Laws and all four quality
gates are green on the phase's final state (CLAUDE.md Sections 2 and 3). Phases are
strictly ordered: no module may begin while an earlier phase has an incomplete P0 module.

| Phase | Name | Modules | Exit criteria |
|---|---|---|---|
| 1 | Foundation | ACC-001..005 | A MASTER_ADMIN can invite a user; that user signs in with MFA, sees a role-scoped dashboard, and every action is present in `audit_log`. Products are administrable. |
| 2 | Revenue Capture | ACC-006..012 | A Lead is captured, qualified into an Opportunity, configured, quoted, and the Quote accepted, with consent and dedupe enforced. |
| 3 | Order to Cash | ACC-013..018 | An accepted Quote becomes an Order, generates stage invoices, collects a Stripe deposit, reconciles it, and the pre-ship document can be executed. |
| 4 | Supply and Production | ACC-019..024 | An Order reserves capacity, raises POs, produces a serialised unit, passes QC, and carries an estimated landed cost. |
| 5 | Logistics and Delivery | ACC-025..028 | A pre-ship-approved unit is booked, tracked, delivered against a ready site, and evidenced by proof of delivery. |
| 6 | Post Sale and Growth | ACC-029..032 | A delivered unit is warranty-registered, claims and tickets are queued with SLAs, attribution reports reconcile. |
| 7 | Platform | ACC-033..034 | External systems integrate only through registered integrations; settings and flags are audited. |

### Phase 1 scope boundary (binding for BBH-ADMIN-PHASE1-BUILD-MANIFEST.md)

Phase 1 delivers ACC-001 (IAM), ACC-002 (Master Data), ACC-003 (Core Dashboard), plus the
ACC-004 audit sink as shared infrastructure. ACC-005 is P1 and may slip to Phase 2
without blocking the phase gate.

The Phase 1 migration set, specified in BBH-ADMIN-DATABASE-SCHEMA.md, additionally
creates tables for the full core entity list supplied in the commissioning request
(Contact, Consent, Lead, Opportunity, Customer, Property, Product, Configuration, Quote,
Order, Supplier, PurchaseOrder, ProductionRecord, Shipment, Invoice, Payment, User, Role)
so that later phases add behaviour rather than reshaping the spine (ADR-A06). Tables
created ahead of their owning module are DORMANT: RLS default-deny, no write path, no UI.
Creating a table is not shipping a module. Only ACC-001, ACC-002, ACC-003 and ACC-004 are
claimed as Phase 1 deliverables under the Six Laws.

---

## 8. System-Wide Rules

These apply to every module and are enforced in review and by the verification chain.

1. **Money.** Integer minor units, column suffix `_cents`, with a sibling `currency`
   char(3). Never `float`, never `numeric` for money, never a bare `amount`.
2. **Time.** `timestamptz` only, UTC, `now()` defaults. Calendar dates without a time
   component use `date`. Local time is a presentation concern.
3. **Identity.** `id uuid PRIMARY KEY DEFAULT gen_random_uuid()` unless a natural key is
   already established in `SCHEMA_REGISTRY.md` (Product uses `sku`).
4. **Deletion.** Business records are never hard-deleted. `deleted_at timestamptz NULL`
   for soft delete; terminal lifecycle is a status, not a row removal.
5. **Enumerations.** Stored as `text` with a CHECK constraint listing allowed values,
   matching the existing registry style. Values are SCREAMING_SNAKE_CASE.
6. **Naming.** Tables snake_case plural; columns snake_case; foreign keys `<entity>_id`;
   booleans `is_` or `has_` prefixed.
7. **Audit.** Every mutation goes through the canonical audit writer (CONTRACT-004).
8. **Authorization.** Every read and write passes `lib/auth/check-permission.ts`
   (CONTRACT-003) in addition to RLS. Defence in depth: RLS is the floor, not the plan.
9. **Errors.** `{ error: { code, message, details? } }` with a code from the ErrorCode
   enum (CONTRACT-010).
10. **Idempotency.** Every externally triggered mutation accepts an idempotency key and is
    safe to retry.
11. **Pagination.** Cursor-based. Offset pagination is forbidden on tables expected to
    exceed 10,000 rows.
12. **Immutability.** Issued Quotes, applied Payments, audit rows, forecast snapshots, and
    stock movements are append-only.

---

## 9. Dependencies

### 9.1 Internal (this repository)

| Dependency | Used by | Nature |
|---|---|---|
| `lib/auth/check-permission.ts` | every module | Canonical authorization helper (CONTRACT-003) |
| `lib/caps.ts` | ACC-005, ACC-033, ACC-034 | Single source of operational caps (CONTRACT-009) |
| `lib/errors/codes.ts` | every module | ErrorCode enum (CONTRACT-010) |
| `middleware.ts` | every `/admin` route | Session gate; whole-file replacement only (Iron Law 4) |
| `packages/configurator` | ACC-009, ACC-010 | Emits Configuration state (PRD.md CFG-007) |
| existing `leads` table | ACC-007 | Inbound capture surface, migrated forward |
| existing `audit_log` table | ACC-004 | Audit sink, extended not replaced |
| existing `admin_users` table | ACC-001 | Superseded by the ten-role model; migration path in BBH-ADMIN-DATABASE-SCHEMA.md Section 12 |

### 9.2 External services

| Service | Used by | Failure posture |
|---|---|---|
| Supabase (Postgres, Auth, Storage) | all | Hard dependency. Outage is a full outage. |
| Vercel | all | Hosting and edge middleware. |
| Stripe | ACC-015, ACC-016 | Payments. Webhook replay must be safe; payment surfaces degrade to read-only. |
| Resend | ACC-005 | Transactional email. Queue and retry; never block a state transition on send failure. |
| Cal.com | ACC-007 | Consultation booking (PRD.md INFRA-009). Read-only linkage. |
| Rewardful | ACC-031 | Affiliate attribution mirror (PRD.md INFRA-010). |
| Acorn | ACC-017 | Financing referral (PRD.md INFRA-008). Referral only, no PII storage. |

### 9.3 Related systems

- **Marketing site** (`apps/web` public routes): produces Leads and Configurations,
  consumes Product and availability data. Shares the database; does not share
  authorization context.
- **Customer portal** (`/portal`, PRD.md PORTAL-001..005): reads Order, Shipment, Invoice,
  Document. Read-plus-sign only; never writes operational state except signature capture.
- **Configurator package** (`packages/configurator`): white-label, and must remain
  independent of Command Center types (ARCHITECTURE.md Section 17).

---

## 10. Risks

| ID | Risk | Impact | Mitigation | Owner |
|---|---|---|---|---|
| RSK-01 | Schema created ahead of module leads to drift | Rework in Phase 3-5 | Dormant tables: default-deny RLS, no write path, marked DORMANT in the registry | ADMIN |
| RSK-02 | Ten roles over-fit a small team | Permission friction, shared accounts | Roles are additive bundles; MASTER_ADMIN override exists for operational constraints (CONTRACT-008) | MASTER_ADMIN |
| RSK-03 | Payment stage semantics change | Legal exposure, invoice rework | Stage transitions isolated behind one state machine and an append-only ledger | FINANCE_CONTROLLER |
| RSK-04 | Configurator schema version drift | Quotes that cannot be re-priced | Configuration rows store schema version; validation at save (ACC-010) | ADMIN |
| RSK-05 | Audit volume growth | Query latency, storage cost | Time-partitioned audit table from Phase 3; indefinite retention preserved | ADMIN |
| RSK-06 | RLS complexity outgrows policy readability | Silent over-permission | The permission matrix is the source of truth; RLS is generated from it and tested per role | ADMIN |

---

## 11. Decision Log

Decisions are append-only and numbered. Revising a decision requires a new entry
referencing the one superseded, per CONTRACT-002.

| ID | Date | Decision | Rationale | Status |
|---|---|---|---|---|
| ADR-A01 | 2026-09-11 | The Command Center is a module of `apps/web` under `/admin`, not a separate application. | Shares the Supabase client, auth, design system, and deploy pipeline; a second app doubles the gate surface for no benefit at current scale. | LOCKED |
| ADR-A02 | 2026-09-11 | tRPC is the internal API contract; REST route handlers exist only for external callers (Stripe webhooks, integrations). | End-to-end type safety across a 34-module surface; external callers cannot be asked to speak tRPC. Every procedure's HTTP mapping is in BBH-ADMIN-API-CONTRACTS.md Section 2. | LOCKED |
| ADR-A03 | 2026-09-11 | RBAC with thresholds, not ABAC. | Ten roles plus value-based approval ceilings cover the modelled cases; ABAC's policy surface is not justified below 50 staff (ASM-04). | LOCKED |
| ADR-A04 | 2026-09-11 | All money as integer cents plus explicit currency. | Eliminates float drift in a system whose core is a four-stage payment schedule. | LOCKED |
| ADR-A05 | 2026-09-11 | Business records are never hard-deleted. | Forensic reconstruction (OBJ-04) and legal exposure on payment stages. | LOCKED |
| ADR-A06 | 2026-09-11 | Phase 1 migrations create the full core entity spine, with dormant tables default-deny. | Prevents the Phase 1B schema drift `SCHEMA_REGISTRY.md` already warns about. | LOCKED |
| ADR-A07 | 2026-09-11 | `admin_users` is superseded by `users` + `roles` + `role_assignments` with a data migration, rather than extended in place. | A two-value role column cannot express ten roles with thresholds; extending it would leave two authorization sources. | LOCKED |
| ADR-A08 | 2026-09-11 | Quote immutability with versioning, rather than editable quotes. | An Order must trace to exactly one priced artifact; editable quotes make disputes unresolvable. | LOCKED |
| ADR-A09 | 2026-09-11 | Audit remains a single append-only table rather than per-entity history tables. | One query surface for forensics; matches CONTRACT-004 and the existing `audit_log`. Partitioning addresses volume (RSK-05). | LOCKED |
| ADR-A10 | 2026-09-11 | The module index in Section 5 is derived, not authoritative, until reconciled with the operator's outline. | The source outline was unavailable at authoring time; see Section 1. | PROVISIONAL |

---

## 12. Open Questions

Unresolved items that must be answered before the phase named. Halt and report rather
than guessing (CLAUDE.md Section 6).

| ID | Question | Blocks | Default if unanswered |
|---|---|---|---|
| OQ-01 | Does the authoritative 34-module outline differ from Section 5? | Nothing in Phase 1 | Proceed with the derived index |
| OQ-02 | Do factory partners get direct system access, or are they coordinated by email? | Phase 4 (ACC-019, ACC-022) | No external access; staff-mediated |
| OQ-03 | Which accounting system consumes the ACC-016 export? | Phase 3 close | CSV export, no direct integration |
| OQ-04 | Is sales commission in scope for ACC-031, or handled outside? | Phase 6 | Calculation in scope, payout outside |
| OQ-05 | Retention period for executed documents under ACC-014? | Phase 3 | Indefinite, matching audit |
| OQ-06 | Multi-currency for supplier POs in Phase 4? | Phase 4 | USD only, per ASM-09 |

---

## 13. Completion Evidence Requirements

No module may be declared complete without all of the following, per GOVERNANCE_BRIEF.md
Section 7 and CLAUDE.md Section 2.

1. **Six Laws statement.** Schema, API, UI, Data, Wiring, Verification each named with the
   artifact that satisfies it.
2. **Gate output.** Real terminal output from `pnpm tsc --noEmit`, `pnpm run build`,
   `pnpm run lint`, `pnpm exec playwright test`, with exit codes. Fabricated output is the
   most serious possible violation (CLAUDE.md Iron Law 3).
3. **Migration evidence.** Pre-check and post-check output from every migration applied
   (CONTRACT-012).
4. **Permission evidence.** For each role, a test demonstrating both the permitted and the
   denied path.
5. **Audit evidence.** A queried `audit_log` row for each mutating action the module
   introduces.
6. **Diff evidence.** `git diff --stat` against the prior commit and a content hash for any
   governance-adjacent document touched (CONTRACT-015).

---

**End of BBH-ADMIN-MASTER-SPEC.md**
