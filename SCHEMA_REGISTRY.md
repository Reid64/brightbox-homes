# SCHEMA REGISTRY — Bright Box Homes

Canonical reference for every database table in the Supabase Postgres instance. Single source of truth for data architecture. Per BEHAVIORAL_CONTRACTS.md CONTRACT-005, verification scripts that enumerate tables read this file dynamically.

## Cross-References
- System architecture: ARCHITECTURE.md Section 6 (Auth + AuthZ), Section 12 (Audit)
- Feature requirements: PRD.md
- Engineering contracts: BEHAVIORAL_CONTRACTS.md (especially CONTRACT-004 audit attribution, CONTRACT-011 server-component fetch)
- Methodology: GOVERNANCE_BRIEF.md

## Conventions
- Table names: snake_case, plural
- Primary keys: `id`, uuid type, default `gen_random_uuid()`
- Timestamps: `created_at` and `updated_at`, both `timestamptz NOT NULL default now()`
- Soft delete: `deleted_at timestamptz NULL` where applicable
- Foreign keys: ON DELETE behavior explicitly specified per relationship
- Indexes documented per query pattern
- RLS enabled on EVERY table — no exceptions without documented justification
- JSONB columns used for flexible/evolving structures (configurator state, audit before/after)

## RLS Policy Documentation
Every table specifies:
- SELECT policy (who can read which rows)
- INSERT policy (who can create)
- UPDATE policy (who can modify, which columns)
- DELETE policy (who can soft-delete or hard-delete)

## Per-Table Required Fields
1. Table name 2. Purpose 3. Phase (1A | 1B | 2 | 3) 4. Columns (type, nullable, default) 5. Primary key 6. Foreign keys (ON DELETE) 7. Indexes 8. RLS policies (SELECT, INSERT, UPDATE, DELETE) 9. Audit attribution requirement 10. Notes

## Phase Summary
- **Phase 1A active tables:** leads, admin_users, audit_log, international_waitlist, production_slots, products
- **Phase 1B deferred:** saved_builds, orders, payment_stage_history, customers, affiliates_attribution
- **Phase 2 dormant:** regional_pricing

---

## Table 1: leads

- **Purpose:** Store all lead submissions from public marketing-site forms.
- **Phase:** 1A

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| first_name | text | NO | — |
| last_name | text | NO | — |
| email | text | NO | — |
| phone | text | NO | — |
| zip | text | NO | — |
| intended_use | text | NO | — (enum: ADU, OFF_GRID, AIRBNB, PRIMARY, COMMERCIAL, OTHER) |
| timeline | text | NO | — (enum: ASAP, 1_3_MONTHS, 3_6_MONTHS, 6_12_MONTHS, RESEARCHING) |
| budget | text | NO | — (enum: 20K_40K, 40K_60K, 60K_80K, 80K_PLUS) |
| product_interest | text | YES | NULL (SKU or product-line slug; NULL if general) |
| configuration | jsonb | YES | NULL (populated Phase 1B when configurator launches) |
| message | text | YES | NULL |
| source | text | YES | utm_source or 'direct' |
| affiliate_id | text | YES | NULL (Rewardful affiliate) |
| status | text | NO | 'NEW' (enum: NEW, CONTACTED, QUALIFIED, QUOTED, DEPOSITED, WON, LOST) |
| notes | text | YES | NULL (admin notes) |
| deleted_at | timestamptz | YES | NULL (soft delete) |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** id
- **Foreign keys:** none
- **Indexes:** `created_at DESC`, `status`, `email`, `affiliate_id`
- **RLS:** SELECT admin-only · INSERT public (rate-limited by API) · UPDATE admin-only · DELETE admin-only (soft via deleted_at)
- **Audit:** Every status change writes to `audit_log` (CONTRACT-004).
- **Notes:** Primary Phase 1A capture surface. `configuration` reserved for Phase 1B carry-over.

---

## Table 2: saved_builds

- **Purpose:** Store "Email Me My Build" configurator saves.
- **Phase:** 1B (placeholder — detailed spec deferred to prevent later schema drift)
- **Columns (provisional):** id (uuid PK), email (text), configuration (jsonb), token (text unique), expires_at (timestamptz), created_at (timestamptz)
- **RLS (provisional):** SELECT by token/admin · INSERT public (rate-limited) · UPDATE forbidden · DELETE expiry sweep + admin
- **Notes:** Full spec authored at Phase 1B configurator launch.

---

## Table 3: orders

- **Purpose:** Store paid orders following Stripe checkout.
- **Phase:** 1B

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| lead_id | uuid | NO | — (FK → leads.id) |
| customer_id | uuid | YES | NULL (FK → customers.id) |
| product_sku | text | NO | — |
| configuration | jsonb | NO | — |
| total_price_cents | integer | NO | — |
| currency | text | NO | 'USD' |
| payment_stage | integer | NO | 1 (1–4 per 25/25/25/25) |
| stripe_customer_id | text | NO | — |
| stripe_session_id | text | NO | — (unique) |
| status | text | NO | 'STAGE_1_PAID' (enum: STAGE_1_PAID, IN_PRODUCTION, PRE_SHIP_APPROVED, SHIPPED, DELIVERED, COMPLETE, CANCELLED) |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** id
- **Foreign keys:** `lead_id` → leads.id ON DELETE RESTRICT · `customer_id` → customers.id ON DELETE RESTRICT
- **Indexes:** `created_at DESC`, `customer_id`, `status`, `payment_stage`
- **RLS:** SELECT customer-own + admin · INSERT admin-only (via webhook handler) · UPDATE admin-only · DELETE forbidden
- **Audit:** Mandatory on every `payment_stage` transition (see Table 4).
- **Notes:** Orders are never hard-deleted; cancellation is a status, not a row removal.

---

## Table 4: payment_stage_history

- **Purpose:** Forensic record of every payment-stage transition for orders.
- **Phase:** 1B

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| order_id | uuid | NO | — (FK → orders.id) |
| from_stage | integer | YES | NULL (null on initial) |
| to_stage | integer | NO | — |
| stripe_payment_intent_id | text | NO | — |
| amount_cents | integer | NO | — |
| triggered_by | uuid | YES | NULL (FK → admin_users.id; null if Stripe webhook) |
| triggered_at | timestamptz | NO | now() |

- **Primary key:** id
- **Foreign keys:** `order_id` → orders.id ON DELETE RESTRICT · `triggered_by` → admin_users.id ON DELETE SET NULL
- **Indexes:** `order_id`, `triggered_at DESC`
- **RLS:** SELECT admin + customer-own · INSERT system-only · UPDATE forbidden · DELETE forbidden
- **Audit:** This table IS the audit content for order payment transitions; not separately audited.
- **Notes:** Append-only ledger. `triggered_by` NULL distinguishes webhook-driven from admin-driven transitions.

---

## Table 5: customers

- **Purpose:** Customer accounts created on first deposit payment.
- **Phase:** 1B

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | — (matches auth.users.id) |
| email | text | NO | — (unique; synced with auth.users.email) |
| first_name | text | YES | NULL |
| last_name | text | YES | NULL |
| phone | text | YES | NULL |
| shipping_address | jsonb | NO | — (line1, line2, city, state, zip, country) |
| billing_address | jsonb | YES | NULL |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** id (1:1 with auth.users.id)
- **Foreign keys:** id → auth.users.id ON DELETE RESTRICT
- **Indexes:** `email` (unique)
- **RLS:** SELECT customer-own + admin · INSERT system-only (on first Stripe payment) · UPDATE customer-own (limited fields) + admin (all) · DELETE forbidden
- **Audit:** Profile updates audited.
- **Notes:** Created automatically on first successful deposit; never via public signup.

---

## Table 6: admin_users

- **Purpose:** Admin role allowlist with role hierarchy.
- **Phase:** 1A

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | — (matches auth.users.id) |
| email | text | NO | — (unique) |
| role | text | NO | — (enum: MASTER_ADMIN, ADMIN) |
| name | text | NO | — |
| is_active | boolean | NO | true |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** id (1:1 with auth.users.id)
- **Foreign keys:** id → auth.users.id ON DELETE RESTRICT
- **Indexes:** `email` (unique)
- **RLS:** SELECT admin-only · INSERT MASTER_ADMIN only · UPDATE MASTER_ADMIN only · DELETE forbidden (deactivate via is_active)
- **Audit:** Every role change and `is_active` toggle audited.
- **Constitutional constraint:** The last active MASTER_ADMIN cannot be deactivated or demoted (enforced at app + DB constraint level). See ARCHITECTURE.md Section 6.
- **Notes:** Authorization source of truth referenced by all admin RLS policies.

---

## Table 7: audit_log

- **Purpose:** Forensic trail of every state mutation per CONTRACT-004.
- **Phase:** 1A

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| timestamp | timestamptz | NO | now() |
| actor_user_id | uuid | YES | NULL (null for system actions like webhooks) |
| actor_role | text | NO | — |
| action | text | NO | — (verb-noun: 'lead.status_changed', 'order.stage_advanced') |
| resource_type | text | NO | — |
| resource_id | uuid | YES | NULL (null for global actions) |
| before_state | jsonb | YES | NULL |
| after_state | jsonb | NO | — |
| ip_address | inet | YES | NULL |
| user_agent | text | YES | NULL |

- **Primary key:** id
- **Foreign keys:** none (actor_user_id intentionally not FK-constrained — survives user deletion for forensic integrity)
- **Indexes:** `timestamp DESC`, `actor_user_id`, composite `(resource_type, resource_id)`
- **RLS:** SELECT admin-only · INSERT system-only (via trigger or canonical audit-logger lib) · UPDATE forbidden · DELETE forbidden
- **Audit:** Self — this table is the audit sink. Not self-referentially audited.
- **Retention:** Indefinite.
- **Notes:** See ARCHITECTURE.md Section 12. Append-only and immutable.

---

## Table 8: international_waitlist

- **Purpose:** Capture international visitor interest while Phase 1 is US-only.
- **Phase:** 1A

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| email | text | NO | — |
| country | text | NO | — |
| ip_country | text | YES | NULL (detected via Vercel Edge) |
| source | text | YES | NULL |
| created_at | timestamptz | NO | now() |

- **Primary key:** id
- **Foreign keys:** none
- **Indexes:** `country`, `created_at DESC`
- **RLS:** SELECT admin-only · INSERT public (rate-limited) · UPDATE forbidden · DELETE admin-only
- **Audit:** Not audited (low-sensitivity capture); admin deletions optional.
- **Notes:** Feeds Phase 2 international activation prioritization.

---

## Table 9: production_slots

- **Purpose:** Public-facing "next available delivery" calendar data.
- **Phase:** 1A (admin-managed)

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| slot_date | date | NO | — |
| capacity | integer | NO | 1 |
| reserved_count | integer | NO | 0 |
| is_available | boolean | NO | true |
| notes | text | YES | NULL |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** id
- **Foreign keys:** none
- **Indexes:** `slot_date`
- **RLS:** SELECT public · INSERT admin-only · UPDATE admin-only · DELETE admin-only
- **Audit:** Changes audited.
- **Notes:** `reserved_count`/`capacity` drive the public availability indicator.

---

## Table 10: products

- **Purpose:** Canonical product catalog.
- **Phase:** 1A

| Column | Type | Nullable | Default |
|---|---|---|---|
| sku | text | NO | — (PK; e.g. EXP-20X10, EXP-20X20, EXP-20X20-DUPLEX, APPLE-2711, SPACE-2711) |
| product_line | text | NO | — (enum: EXPANDABLE, APPLE_CABIN, SPACE_CAPSULE, ASSEMBLY, FOLDOUT) |
| name | text | NO | — |
| base_price_cents | integer | NO | — |
| short_description | text | NO | — |
| long_description | text | NO | — |
| standard_inclusions | jsonb | NO | — (array of included features) |
| dimensions | jsonb | NO | — (length_ft, width_ft, height_ft, sqft) |
| weight_lbs | integer | YES | NULL |
| lead_time_weeks_min | integer | NO | — |
| lead_time_weeks_max | integer | NO | — |
| is_active | boolean | NO | true |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

- **Primary key:** sku (natural key)
- **Foreign keys:** none
- **Indexes:** `product_line`, `is_active`
- **RLS:** SELECT public · INSERT MASTER_ADMIN · UPDATE admin-only · DELETE forbidden
- **Audit:** Price changes and `is_active` toggles audited.
- **Notes:** Read in server components per CONTRACT-011. Seeded with the 5 initial product lines.

---

## Table 11: regional_pricing

- **Purpose:** Per-country pricing multipliers for Phase 2 international activation.
- **Phase:** 2 (dormant — placeholder, detailed spec deferred)
- **Columns (provisional):** id (uuid PK), sku (text FK → products.sku), country_code (text), multiplier (numeric), currency (text), effective_date (date), expiry_date (date)
- **RLS (provisional):** SELECT public · INSERT/UPDATE/DELETE admin-only
- **Notes:** Inert until Phase 2. Documented now to prevent schema drift.

---

## Table 12: affiliates_attribution

- **Purpose:** Internal attribution links between Rewardful affiliates, leads, and orders for reporting.
- **Phase:** 1B (placeholder, detailed spec deferred)
- **Columns (provisional):** id (uuid PK), rewardful_affiliate_id (text), lead_id (uuid FK → leads.id), order_id (uuid FK → orders.id), attributed_at (timestamptz)
- **RLS (provisional):** SELECT admin-only · INSERT system-only · UPDATE forbidden · DELETE admin-only
- **Notes:** Rewardful captures most data externally; this table mirrors attribution for internal reporting only.

---

## Deferred Tables (Phase 1B or later)
Documented here so Phase 1B implementation does not introduce schema drift:
- **saved_builds** — Phase 1B (configurator launch)
- **orders, payment_stage_history, customers** — Phase 1B (Stripe deposit checkout)
- **affiliates_attribution** — Phase 1B (Rewardful integration)
- **regional_pricing** — Phase 2 (international)

## Initial Migration Order (Phase 1A)
Applied in this order:
1. `enable_rls.sql` — set default DENY on all tables
2. `create_admin_users.sql`
3. `create_audit_log.sql` + trigger function
4. `create_products.sql` + seed initial 5 product lines
5. `create_leads.sql`
6. `create_international_waitlist.sql`
7. `create_production_slots.sql`
8. `apply_rls_policies.sql` per table
