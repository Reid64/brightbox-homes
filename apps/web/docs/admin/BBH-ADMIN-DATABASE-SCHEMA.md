# BBH ADMIN COMMAND CENTER - DATABASE SCHEMA

**Document ID:** BBH-ADMIN-DATABASE-SCHEMA
**Status:** SPECIFICATION - NOT IMPLEMENTED
**Version:** 1.0.0
**Authored:** 2026-09-11
**Scope:** Phase 1 core entity spine (18 entities plus required child tables)

---

## 1. Scope And Authority

This document specifies the exact Postgres schema for the Phase 1 core entities:
Contact, Consent, Lead, Opportunity, Customer, Property, Product, Configuration, Quote,
Order, Supplier, PurchaseOrder, ProductionRecord, Shipment, Invoice, Payment, User, Role.

`SCHEMA_REGISTRY.md` at repository root remains the canonical registry of record for the
marketing site's Phase 1A/1B tables. Where this document changes a table that already
appears there, the change is enumerated in Section 12 (Reconciliation) and must be
reflected in `SCHEMA_REGISTRY.md` by the operator - agents may not edit root governance
files (CLAUDE.md Iron Law 1).

**Dormant tables.** Tables created in Phase 1 whose owning module ships in a later phase
are created with RLS enabled and NO permissive policy, i.e. default deny for every role
including MASTER_ADMIN, and no application write path. They are marked DORMANT below.
Activating a dormant table means adding its policies in the owning module's migration.

---

## 2. Conventions

Inherited verbatim from `SCHEMA_REGISTRY.md` Conventions, with additions from
BBH-ADMIN-MASTER-SPEC.md Section 8.

| Rule | Value |
|---|---|
| Table names | snake_case, plural |
| Primary key | `id uuid NOT NULL DEFAULT gen_random_uuid()` unless a natural key exists |
| Timestamps | `created_at`, `updated_at`: `timestamptz NOT NULL DEFAULT now()` |
| Soft delete | `deleted_at timestamptz NULL` where applicable |
| Money | `*_cents integer NOT NULL` plus `currency char(3) NOT NULL DEFAULT 'USD'` |
| Enumerations | `text` + `CHECK (col IN (...))`, values SCREAMING_SNAKE_CASE |
| Foreign keys | `<entity>_id`, ON DELETE behaviour always explicit |
| Booleans | `is_` / `has_` prefix, `NOT NULL` with a default |
| RLS | Enabled on every table, default deny |
| Audit | Per CONTRACT-004, through the canonical writer |
| Row versioning | `version integer NOT NULL DEFAULT 1` on tables with optimistic concurrency |

### 2.1 Shared triggers

Two triggers are installed once and attached to every table that declares them.

```sql
-- Maintains updated_at on any UPDATE.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Increments the optimistic-concurrency token on any UPDATE.
CREATE OR REPLACE FUNCTION bump_version() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$;

-- Refuses UPDATE and DELETE outright. Attached to append-only tables.
CREATE OR REPLACE FUNCTION forbid_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'APPEND_ONLY_VIOLATION: % is append-only', TG_TABLE_NAME
    USING ERRCODE = 'check_violation';
END;
$$;
```

### 2.2 Audit context

The canonical audit writer sets session-local context before any mutation; the audit
trigger reads it. A mutation attempted without audit context fails closed.

```sql
CREATE OR REPLACE FUNCTION require_audit_context() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF current_setting('app.actor_user_id', true) IS NULL THEN
    RAISE EXCEPTION 'AUDIT_CONTEXT_MISSING: % mutation without actor context', TG_TABLE_NAME
      USING ERRCODE = 'raise_exception';
  END IF;
  RETURN NEW;
END;
$$;
```

---

## 3. Entity Relationship Overview

```
                     roles <--- role_assignments ---> users
                                                        |
                                                   (owner_user_id on most tables)

contacts --1:N--> contact_channels
contacts --1:N--> consents
contacts --1:N--> leads --1:1--> opportunities --1:N--> quotes --1:N--> quote_lines
                                                            |
customers <--N:M-- customer_contact_links --> contacts      |
   |                                                        v
   +--1:N--> properties                                  orders --1:N--> order_lines
   |                                                        |
   |                                                        +--1:N--> invoices --1:N--> invoice_lines
   |                                                        |             ^
   |                                                        |             |
   |                                                        |      payment_allocations
   |                                                        |             |
   |                                                        |          payments
   |                                                        |
   |                                                        +--1:N--> production_records --1:N--> shipment_lines
   |                                                                                                  |
   +--------------------------------------------------------------------> shipments <----------------+

suppliers --1:N--> purchase_orders --1:N--> purchase_order_lines
products --1:N--> price_book_entries <--N:1-- price_books
products <--N:1-- configurations --1:N--> configuration_selections
```

---

## 4. Identity Tables (ACC-001)

### 4.1 users

**Purpose:** Staff principal record. One row per human who can sign into `/admin`.
**Module:** ACC-001 | **Phase:** 1 | **Status:** ACTIVE

```sql
CREATE TABLE users (
  id                    uuid PRIMARY KEY,               -- equals auth.users.id
  email                 citext NOT NULL UNIQUE,
  full_name             text NOT NULL,
  job_title             text NULL,
  phone                 text NULL,
  status                text NOT NULL DEFAULT 'INVITED'
                          CHECK (status IN ('INVITED','ACTIVE','SUSPENDED','DEACTIVATED')),
  mfa_enrolled_at       timestamptz NULL,
  mfa_method            text NULL CHECK (mfa_method IN ('TOTP','WEBAUTHN')),
  last_login_at         timestamptz NULL,
  failed_login_count    integer NOT NULL DEFAULT 0,
  locked_until          timestamptz NULL,
  invited_by_user_id    uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  invited_at            timestamptz NULL,
  deactivated_at        timestamptz NULL,
  version               integer NOT NULL DEFAULT 1,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_deactivated_consistency
    CHECK ((status = 'DEACTIVATED') = (deactivated_at IS NOT NULL))
);

CREATE INDEX users_status_idx ON users (status) WHERE status = 'ACTIVE';
CREATE INDEX users_email_idx  ON users (email);
```

- **FK:** `id` -> `auth.users.id` ON DELETE RESTRICT (enforced by migration, not declared
  cross-schema); `invited_by_user_id` -> `users.id` ON DELETE SET NULL.
- **RLS:** SELECT: any ACTIVE staff user. INSERT: MASTER_ADMIN, ADMIN. UPDATE: MASTER_ADMIN,
  ADMIN (self may update `full_name`, `phone`, `job_title` only). DELETE: forbidden at
  every role.
- **Audit:** every INSERT and UPDATE. `action` values `user.invited`, `user.activated`,
  `user.suspended`, `user.reactivated`, `user.deactivated`, `user.profile_updated`.
- **Constitutional constraint:** see Section 4.3 trigger - the last ACTIVE user holding
  MASTER_ADMIN cannot be suspended or deactivated (CONTRACT-008, CON-14).
- **Notes:** No hard delete path exists. `citext` requires the `citext` extension; email
  comparison is case-insensitive by type, not by application normalisation.

### 4.2 roles

**Purpose:** The ten staff roles. Seeded, not user-creatable in Phase 1.
**Module:** ACC-001 | **Phase:** 1 | **Status:** ACTIVE

```sql
CREATE TABLE roles (
  key               text PRIMARY KEY
                      CHECK (key IN (
                        'MASTER_ADMIN','ADMIN','SALES_MANAGER','SALES_REP',
                        'FINANCE_CONTROLLER','FINANCE_CLERK','PRODUCTION_MANAGER',
                        'PROCUREMENT_OFFICER','LOGISTICS_COORDINATOR','SUPPORT_AGENT')),
  display_name      text NOT NULL,
  description       text NOT NULL,
  rank              integer NOT NULL UNIQUE,     -- 100 = MASTER_ADMIN, descending
  requires_mfa      boolean NOT NULL DEFAULT true,
  is_assignable     boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
```

- **PK:** `key` (natural key; referenced by `role_assignments` and the permission matrix).
- **RLS:** SELECT: any ACTIVE staff user. INSERT/UPDATE/DELETE: forbidden in Phase 1
  (seeded by migration only).
- **Audit:** not applicable in Phase 1 (immutable seed data).
- **Notes:** `rank` exists solely to answer "is role A senior to role B" for approval
  routing. It does NOT imply permission inheritance - permissions are explicit per role
  in BBH-ADMIN-IAM-SPECIFICATION.md Section 4.

### 4.3 role_assignments

**Purpose:** Which user holds which role, with grant lineage.
**Module:** ACC-001 | **Phase:** 1 | **Status:** ACTIVE

```sql
CREATE TABLE role_assignments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  role_key          text NOT NULL REFERENCES roles(key) ON DELETE RESTRICT,
  granted_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  granted_at        timestamptz NOT NULL DEFAULT now(),
  revoked_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  revoked_at        timestamptz NULL,
  revoke_reason     text NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT role_assignments_revocation_consistency
    CHECK ((revoked_at IS NULL) = (revoked_by_user_id IS NULL))
);

-- A user holds a given role at most once concurrently.
CREATE UNIQUE INDEX role_assignments_active_unique
  ON role_assignments (user_id, role_key) WHERE revoked_at IS NULL;
CREATE INDEX role_assignments_user_idx ON role_assignments (user_id) WHERE revoked_at IS NULL;
```

- **RLS:** SELECT: any ACTIVE staff user. INSERT/UPDATE: MASTER_ADMIN only. DELETE:
  forbidden (revocation is an UPDATE setting `revoked_at`).
- **Audit:** mandatory. `role.granted`, `role.revoked`.
- **Constitutional constraint:**

```sql
CREATE OR REPLACE FUNCTION protect_last_master_admin() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE remaining integer;
BEGIN
  SELECT count(*) INTO remaining
  FROM role_assignments ra
  JOIN users u ON u.id = ra.user_id
  WHERE ra.role_key = 'MASTER_ADMIN'
    AND ra.revoked_at IS NULL
    AND u.status = 'ACTIVE'
    AND ra.id <> COALESCE(NEW.id, OLD.id);

  IF remaining = 0 THEN
    RAISE EXCEPTION 'LAST_MASTER_ADMIN_PROTECTED: cannot revoke the final active MASTER_ADMIN'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$;
```

  Attached BEFORE UPDATE on `role_assignments` when `revoked_at` transitions from NULL,
  and BEFORE UPDATE on `users` when `status` leaves 'ACTIVE'. Enforced at both the
  application layer and the database layer; the database is authoritative.

### 4.4 sessions

**Purpose:** Server-side session registry enabling forced revocation.
**Module:** ACC-001 | **Phase:** 1 | **Status:** ACTIVE

```sql
CREATE TABLE sessions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  token_hash        text NOT NULL UNIQUE,       -- SHA-256 of the session token, never the token
  issued_at         timestamptz NOT NULL DEFAULT now(),
  last_seen_at      timestamptz NOT NULL DEFAULT now(),
  idle_expires_at   timestamptz NOT NULL,
  absolute_expires_at timestamptz NOT NULL,
  revoked_at        timestamptz NULL,
  revoked_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  ip_address        inet NULL,
  user_agent        text NULL,
  mfa_satisfied_at  timestamptz NULL,
  CONSTRAINT sessions_expiry_order CHECK (absolute_expires_at > issued_at)
);

CREATE INDEX sessions_user_active_idx ON sessions (user_id) WHERE revoked_at IS NULL;
CREATE INDEX sessions_absolute_expiry_idx ON sessions (absolute_expires_at);
```

- **RLS:** SELECT: self, plus MASTER_ADMIN and ADMIN. INSERT: system only. UPDATE: system
  (heartbeat) and MASTER_ADMIN/ADMIN (revocation). DELETE: forbidden; expired rows are
  swept by a scheduled job after 90 days.
- **Audit:** `session.created`, `session.revoked`, `session.expired_idle`,
  `session.expired_absolute`. Heartbeat updates to `last_seen_at` are NOT audited (volume).
- **Notes:** Raw session tokens are never stored. Timeout values come from
  BBH-ADMIN-IAM-SPECIFICATION.md Section 7 and `lib/caps.ts`.

---

## 5. Party Tables (ACC-006, ACC-011, ACC-012)

### 5.1 contacts

**Purpose:** One row per human or organisation we hold identity for. No pipeline state.
**Module:** ACC-006 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT until Phase 2

```sql
CREATE TABLE contacts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_type      text NOT NULL DEFAULT 'PERSON'
                      CHECK (contact_type IN ('PERSON','ORGANIZATION')),
  first_name        text NULL,
  last_name         text NULL,
  organization_name text NULL,
  primary_email     citext NULL,
  primary_phone     text NULL,                 -- E.164, normalised on write
  mailing_address   jsonb NULL,                -- {line1,line2,city,state,postal_code,country}
  preferred_language char(2) NOT NULL DEFAULT 'en',
  source            text NULL,                 -- utm_source or 'MANUAL'
  owner_user_id     uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  merged_into_contact_id uuid NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  merged_at         timestamptz NULL,
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contacts_name_presence CHECK (
    (contact_type = 'PERSON'       AND (first_name IS NOT NULL OR last_name IS NOT NULL)) OR
    (contact_type = 'ORGANIZATION' AND organization_name IS NOT NULL)),
  CONSTRAINT contacts_reachability CHECK (primary_email IS NOT NULL OR primary_phone IS NOT NULL),
  CONSTRAINT contacts_merge_consistency CHECK ((merged_into_contact_id IS NULL) = (merged_at IS NULL)),
  CONSTRAINT contacts_no_self_merge CHECK (merged_into_contact_id <> id),
  CONSTRAINT contacts_phone_e164 CHECK (primary_phone IS NULL OR primary_phone ~ '^\+[1-9][0-9]{7,14}$')
);

CREATE UNIQUE INDEX contacts_primary_email_unique
  ON contacts (primary_email) WHERE deleted_at IS NULL AND merged_into_contact_id IS NULL;
CREATE UNIQUE INDEX contacts_primary_phone_unique
  ON contacts (primary_phone) WHERE deleted_at IS NULL AND merged_into_contact_id IS NULL;
CREATE INDEX contacts_owner_idx ON contacts (owner_user_id) WHERE deleted_at IS NULL;
CREATE INDEX contacts_created_idx ON contacts (created_at DESC);
```

- **RLS (Phase 2 activation):** SELECT: SALES_*, SUPPORT_AGENT, ADMIN, MASTER_ADMIN.
  INSERT: SALES_*, SUPPORT_AGENT, plus system (public form ingest). UPDATE: owner or
  SALES_MANAGER+. DELETE: forbidden; soft delete by ADMIN+.
- **Audit:** every mutation. `contact.created`, `contact.updated`, `contact.merged`,
  `contact.soft_deleted`.
- **Notes:** Dedupe is enforced by the two partial unique indexes, not by application
  logic alone. A merge sets `merged_into_contact_id` and leaves the row addressable so
  historical foreign keys stay valid (OBJ-01, ADR-A05).

### 5.2 contact_channels

**Purpose:** Additional emails and phones beyond the primary, each independently
consent-bearing.
**Module:** ACC-006 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE contact_channels (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id        uuid NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  channel_type      text NOT NULL CHECK (channel_type IN ('EMAIL','PHONE','SMS')),
  value             text NOT NULL,
  is_primary        boolean NOT NULL DEFAULT false,
  is_verified       boolean NOT NULL DEFAULT false,
  verified_at       timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_channels_verified_consistency
    CHECK (is_verified = (verified_at IS NOT NULL))
);

CREATE UNIQUE INDEX contact_channels_unique ON contact_channels (contact_id, channel_type, value);
CREATE UNIQUE INDEX contact_channels_one_primary
  ON contact_channels (contact_id, channel_type) WHERE is_primary;
```

- **RLS:** inherits the `contacts` policy set via `contact_id`.
- **Audit:** mutations audited; verification events audited.
- **Notes:** ON DELETE CASCADE is safe here because contacts are never hard-deleted;
  the cascade exists only for the test-fixture teardown path.

### 5.3 consents

**Purpose:** Append-only evidence of permission to contact, per channel and purpose.
**Module:** ACC-006 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE consents (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id        uuid NOT NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  channel_type      text NOT NULL CHECK (channel_type IN ('EMAIL','SMS','PHONE','POST')),
  purpose           text NOT NULL CHECK (purpose IN ('TRANSACTIONAL','MARKETING','PROFILING')),
  state             text NOT NULL CHECK (state IN ('GRANTED','REVOKED')),
  lawful_basis      text NOT NULL
                      CHECK (lawful_basis IN ('CONSENT','CONTRACT','LEGITIMATE_INTEREST')),
  source            text NOT NULL,             -- e.g. 'WEB_FORM:BBH-008', 'PHONE', 'IMPORT'
  evidence_text_version text NOT NULL,         -- version of the consent copy shown
  evidence_url      text NULL,
  ip_address        inet NULL,
  user_agent        text NULL,
  captured_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  effective_at      timestamptz NOT NULL DEFAULT now(),
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX consents_lookup_idx ON consents (contact_id, channel_type, purpose, effective_at DESC);
```

- **RLS:** SELECT: SALES_*, SUPPORT_AGENT, ADMIN, MASTER_ADMIN. INSERT: same plus system.
  UPDATE: forbidden at every role. DELETE: forbidden at every role.
- **Append-only:** `forbid_mutation()` trigger on UPDATE and DELETE.
- **Audit:** insert is itself the evidence; additionally audited as `consent.recorded`.
- **Notes:** Current consent is the most recent row per
  `(contact_id, channel_type, purpose)` by `effective_at`. Revocation is a new row with
  `state = 'REVOKED'`, never an update. A materialised view
  `contact_consent_current` is provided in Section 10 for read paths.

### 5.4 customers

**Purpose:** A paying account. Created only on first successful deposit.
**Module:** ACC-011 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE customers (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_number   text NOT NULL UNIQUE,       -- human reference, e.g. 'C-2026-000137'
  display_name      text NOT NULL,
  primary_contact_id uuid NOT NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  billing_address   jsonb NOT NULL,
  billing_email     citext NOT NULL,
  stripe_customer_id text NULL UNIQUE,
  portal_user_id    uuid NULL,                  -- auth.users.id for portal access
  status            text NOT NULL DEFAULT 'ACTIVE'
                      CHECK (status IN ('ACTIVE','ON_HOLD','CLOSED')),
  credit_hold_reason text NULL,
  owner_user_id     uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT customers_hold_reason CHECK ((status = 'ON_HOLD') = (credit_hold_reason IS NOT NULL))
);

CREATE INDEX customers_owner_idx ON customers (owner_user_id);
CREATE INDEX customers_status_idx ON customers (status);
```

- **RLS:** SELECT: all staff roles except none; portal principal sees own row only.
  INSERT: system only (on first payment). UPDATE: SALES_MANAGER+, FINANCE_* for billing
  fields. DELETE: forbidden.
- **Audit:** mandatory on every field change; `customer.created`, `customer.updated`,
  `customer.hold_placed`, `customer.hold_released`.
- **Notes:** Supersedes the existing `customers` table from `SCHEMA_REGISTRY.md` Table 5;
  see Section 12.

### 5.5 customer_contact_links

**Purpose:** Many-to-many between Customers and Contacts, with the role each plays.
**Module:** ACC-011 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE customer_contact_links (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  contact_id        uuid NOT NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  relationship      text NOT NULL
                      CHECK (relationship IN ('PRIMARY','SPOUSE','PARTNER','SIGNATORY','BILLING','OTHER')),
  can_sign          boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX customer_contact_links_unique ON customer_contact_links (customer_id, contact_id);
CREATE UNIQUE INDEX customer_contact_links_one_primary
  ON customer_contact_links (customer_id) WHERE relationship = 'PRIMARY';
```

### 5.6 properties

**Purpose:** The physical destination site for one or more ordered units.
**Module:** ACC-012 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE properties (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  label             text NOT NULL,             -- 'Hill County lot', customer-facing
  address_line1     text NOT NULL,
  address_line2     text NULL,
  city              text NOT NULL,
  state_code        char(2) NOT NULL,
  postal_code       text NOT NULL,
  country_code      char(2) NOT NULL DEFAULT 'US',
  latitude          numeric(9,6) NULL,
  longitude         numeric(9,6) NULL,
  parcel_number     text NULL,
  county            text NULL,
  -- access attributes drive freight feasibility (ACC-025)
  road_access       text NULL CHECK (road_access IN ('PAVED','GRAVEL','DIRT','NONE')),
  min_road_width_ft numeric(5,1) NULL,
  overhead_clearance_ft numeric(5,1) NULL,
  has_crane_standing_area boolean NULL,
  -- readiness
  foundation_status text NOT NULL DEFAULT 'NOT_STARTED'
                      CHECK (foundation_status IN ('NOT_STARTED','IN_PROGRESS','COMPLETE')),
  utilities_status  text NOT NULL DEFAULT 'NOT_STARTED'
                      CHECK (utilities_status IN ('NOT_STARTED','IN_PROGRESS','COMPLETE')),
  permit_status     text NOT NULL DEFAULT 'UNKNOWN'
                      CHECK (permit_status IN ('UNKNOWN','NOT_REQUIRED','APPLIED','APPROVED','DENIED')),
  is_flood_zone     boolean NULL,
  readiness_confirmed_at timestamptz NULL,
  readiness_confirmed_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  notes             text NULL,
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT properties_readiness_attribution
    CHECK ((readiness_confirmed_at IS NULL) = (readiness_confirmed_by_user_id IS NULL)),
  CONSTRAINT properties_geo_pair CHECK ((latitude IS NULL) = (longitude IS NULL))
);

CREATE INDEX properties_customer_idx ON properties (customer_id);
CREATE INDEX properties_geo_idx ON properties (state_code, postal_code);
```

- **RLS:** SELECT: all staff; portal principal sees own customer's properties. INSERT and
  UPDATE: LOGISTICS_COORDINATOR, SALES_*, ADMIN+. DELETE: forbidden.
- **Audit:** mandatory; `property.readiness_confirmed` is a distinct auditable action
  because it gates delivery scheduling (ACC-027).

---

## 6. Catalogue Tables (ACC-002, ACC-010)

### 6.1 products

**Purpose:** Canonical product catalogue. Extends the existing table.
**Module:** ACC-002 | **Phase:** 1 | **Status:** ACTIVE (extension of existing table)

The existing `products` table (`SCHEMA_REGISTRY.md` Table 10, PK `sku`) is retained. The
following columns are ADDED; no existing column is dropped or retyped.

```sql
ALTER TABLE products
  ADD COLUMN category          text NULL
      CHECK (category IN ('UNIT','OPTION','SERVICE','FREIGHT','FEE')),
  ADD COLUMN is_configurable   boolean NOT NULL DEFAULT true,
  ADD COLUMN default_supplier_id uuid NULL,   -- FK added after suppliers exists
  ADD COLUMN hts_code          text NULL,      -- customs classification (ACC-024)
  ADD COLUMN replaced_by_sku   text NULL REFERENCES products(sku) ON DELETE SET NULL,
  ADD COLUMN version           integer NOT NULL DEFAULT 1;

UPDATE products SET category = 'UNIT' WHERE category IS NULL;
ALTER TABLE products ALTER COLUMN category SET NOT NULL;

CREATE INDEX products_category_idx ON products (category) WHERE is_active;
```

- **RLS:** unchanged from the registry (SELECT public; INSERT MASTER_ADMIN; UPDATE admin;
  DELETE forbidden), re-expressed against the ten-role model: INSERT MASTER_ADMIN and
  ADMIN; UPDATE ADMIN+ with price fields additionally threshold-gated (Section 6.3).
- **Audit:** price changes and `is_active` toggles, as already required.

### 6.2 price_books / price_book_entries

**Purpose:** Effective-dated pricing so history is never mutated.
**Module:** ACC-002 | **Phase:** 1 | **Status:** ACTIVE

```sql
CREATE TABLE price_books (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code              text NOT NULL UNIQUE,      -- 'US-RETAIL-2026H2'
  name              text NOT NULL,
  currency          char(3) NOT NULL DEFAULT 'USD',
  effective_from    date NOT NULL,
  effective_to      date NULL,
  status            text NOT NULL DEFAULT 'DRAFT'
                      CHECK (status IN ('DRAFT','ACTIVE','ARCHIVED')),
  approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  approved_at       timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT price_books_date_order CHECK (effective_to IS NULL OR effective_to > effective_from),
  CONSTRAINT price_books_approval CHECK ((status = 'ACTIVE') <= (approved_at IS NOT NULL))
);

CREATE TABLE price_book_entries (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  price_book_id     uuid NOT NULL REFERENCES price_books(id) ON DELETE RESTRICT,
  sku               text NOT NULL REFERENCES products(sku) ON DELETE RESTRICT,
  unit_price_cents  integer NOT NULL CHECK (unit_price_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  min_quantity      integer NOT NULL DEFAULT 1 CHECK (min_quantity >= 1),
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX price_book_entries_unique
  ON price_book_entries (price_book_id, sku, min_quantity);
-- Only one ACTIVE price book may cover a given day.
CREATE INDEX price_books_effective_idx ON price_books (effective_from, effective_to)
  WHERE status = 'ACTIVE';
```

- **RLS:** SELECT: all staff, plus public for the ACTIVE book (the marketing site reads
  prices). INSERT/UPDATE: ADMIN+, with activation threshold-gated. DELETE: forbidden.
- **Append-only:** `price_book_entries` carries `forbid_mutation()` on UPDATE; a price
  change creates a new price book version (ADR-A08 reasoning applied to pricing).
- **Audit:** `price_book.created`, `price_book.activated`, `price_book.archived`.

### 6.3 configurations / configuration_selections

**Purpose:** The resolved option set emitted by the configurator, priced by a Quote.
**Module:** ACC-010 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE configurations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku               text NOT NULL REFERENCES products(sku) ON DELETE RESTRICT,
  schema_version    text NOT NULL,             -- configurator emission contract version
  state             jsonb NOT NULL,            -- verbatim configurator emission (CFG-007)
  computed_price_cents integer NOT NULL CHECK (computed_price_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  price_book_id     uuid NOT NULL REFERENCES price_books(id) ON DELETE RESTRICT,
  contact_id        uuid NULL REFERENCES contacts(id) ON DELETE SET NULL,
  created_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  is_locked         boolean NOT NULL DEFAULT false,
  locked_at         timestamptz NULL,
  forked_from_configuration_id uuid NULL REFERENCES configurations(id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT configurations_lock_consistency CHECK (is_locked = (locked_at IS NOT NULL))
);

CREATE TABLE configuration_selections (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  configuration_id  uuid NOT NULL REFERENCES configurations(id) ON DELETE CASCADE,
  option_group      text NOT NULL,             -- 'EXTERIOR_COLOR'
  option_value      text NOT NULL,             -- 'SLATE_GREY'
  sku               text NULL REFERENCES products(sku) ON DELETE RESTRICT,
  price_delta_cents integer NOT NULL DEFAULT 0,
  display_order     integer NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX configuration_selections_unique
  ON configuration_selections (configuration_id, option_group);
CREATE INDEX configurations_contact_idx ON configurations (contact_id);
```

- **Immutability:** once `is_locked`, `forbid_mutation()` applies. A change forks a new
  row recording `forked_from_configuration_id`.
- **Audit:** `configuration.created`, `configuration.locked`, `configuration.forked`.
- **Notes:** `state` is stored verbatim so a Quote can always be re-rendered exactly as
  the customer saw it, even if the configurator's internal model later changes (RSK-04).

---

## 7. Revenue Tables (ACC-007, ACC-008, ACC-009, ACC-013)

### 7.1 leads

**Purpose:** Unqualified inbound interest. Extends the existing table.
**Module:** ACC-007 | **Phase:** 1 extension | **Status:** ACTIVE

The existing `leads` table (`SCHEMA_REGISTRY.md` Table 1) is retained as the public
capture surface. Columns ADDED:

```sql
ALTER TABLE leads
  ADD COLUMN contact_id        uuid NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  ADD COLUMN owner_user_id     uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN assigned_at       timestamptz NULL,
  ADD COLUMN first_touch_at    timestamptz NULL,
  ADD COLUMN score             integer NULL CHECK (score BETWEEN 0 AND 100),
  ADD COLUMN disqualify_reason text NULL,
  ADD COLUMN recycle_at        timestamptz NULL,
  ADD COLUMN opportunity_id    uuid NULL,      -- FK added after opportunities exists
  ADD COLUMN version           integer NOT NULL DEFAULT 1;

CREATE INDEX leads_owner_idx ON leads (owner_user_id) WHERE deleted_at IS NULL;
CREATE INDEX leads_untouched_idx ON leads (created_at) WHERE first_touch_at IS NULL;
```

- **Status enum extension.** The existing enum
  (`NEW, CONTACTED, QUALIFIED, QUOTED, DEPOSITED, WON, LOST`) is replaced by the Lead state
  machine in BBH-ADMIN-BEHAVIORAL-CONTRACTS.md Section 3:
  `NEW, ASSIGNED, WORKING, QUALIFIED, DISQUALIFIED, RECYCLED`. `QUOTED`, `DEPOSITED`,
  `WON`, `LOST` migrate to the Opportunity state machine. The data migration is specified
  in Section 12.3.
- **Audit:** unchanged requirement - every status change writes to `audit_log`.

### 7.2 opportunities

**Purpose:** A qualified, forecastable pursuit.
**Module:** ACC-008 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE opportunities (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_number text NOT NULL UNIQUE,     -- 'O-2026-000412'
  contact_id        uuid NOT NULL REFERENCES contacts(id) ON DELETE RESTRICT,
  customer_id       uuid NULL REFERENCES customers(id) ON DELETE RESTRICT,
  lead_id           uuid NULL REFERENCES leads(id) ON DELETE SET NULL,
  property_id       uuid NULL REFERENCES properties(id) ON DELETE SET NULL,
  name              text NOT NULL,
  stage             text NOT NULL DEFAULT 'DISCOVERY'
                      CHECK (stage IN ('DISCOVERY','SOLUTION','QUOTED','NEGOTIATION','WON','LOST','ABANDONED')),
  amount_cents      integer NOT NULL DEFAULT 0 CHECK (amount_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  probability       integer NOT NULL DEFAULT 10 CHECK (probability BETWEEN 0 AND 100),
  expected_close_date date NULL,
  owner_user_id     uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  loss_reason       text NULL
                      CHECK (loss_reason IN ('PRICE','TIMING','COMPETITOR','FINANCING','LAND','NO_RESPONSE','OTHER')),
  loss_notes        text NULL,
  closed_at         timestamptz NULL,
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT opportunities_loss_reason_required
    CHECK ((stage IN ('LOST','ABANDONED')) <= (loss_reason IS NOT NULL)),
  CONSTRAINT opportunities_closed_consistency
    CHECK ((stage IN ('WON','LOST','ABANDONED')) = (closed_at IS NOT NULL))
);

CREATE INDEX opportunities_owner_stage_idx ON opportunities (owner_user_id, stage)
  WHERE deleted_at IS NULL;
CREATE INDEX opportunities_open_close_date_idx ON opportunities (expected_close_date)
  WHERE closed_at IS NULL AND deleted_at IS NULL;
```

- **RLS:** SELECT: SALES_* see own and team; SALES_MANAGER+ see all; FINANCE_* read-only.
  INSERT/UPDATE: owner and SALES_MANAGER+. DELETE: forbidden.
- **Audit:** `opportunity.created`, `opportunity.stage_changed` (with from and to),
  `opportunity.won`, `opportunity.lost`, `opportunity.reassigned`.

### 7.3 quotes / quote_lines

**Purpose:** A versioned, immutable, expiring priced offer.
**Module:** ACC-009 | **Phase:** 2 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE quotes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number      text NOT NULL,             -- 'Q-2026-000913', stable across versions
  version_number    integer NOT NULL DEFAULT 1 CHECK (version_number >= 1),
  opportunity_id    uuid NOT NULL REFERENCES opportunities(id) ON DELETE RESTRICT,
  configuration_id  uuid NULL REFERENCES configurations(id) ON DELETE RESTRICT,
  price_book_id     uuid NOT NULL REFERENCES price_books(id) ON DELETE RESTRICT,
  property_id       uuid NULL REFERENCES properties(id) ON DELETE SET NULL,
  status            text NOT NULL DEFAULT 'DRAFT'
                      CHECK (status IN ('DRAFT','PENDING_APPROVAL','ISSUED','ACCEPTED','DECLINED','EXPIRED','SUPERSEDED')),
  subtotal_cents    integer NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
  discount_cents    integer NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  freight_cents     integer NOT NULL DEFAULT 0 CHECK (freight_cents >= 0),
  tax_cents         integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents       integer NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  discount_percent  numeric(5,2) NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
  valid_until       date NOT NULL,
  issued_at         timestamptz NULL,
  issued_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  accepted_at       timestamptz NULL,
  accepted_by_contact_id uuid NULL REFERENCES contacts(id) ON DELETE SET NULL,
  approval_required boolean NOT NULL DEFAULT false,
  approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  approved_at       timestamptz NULL,
  pdf_document_id   uuid NULL,                 -- FK to documents, Phase 3
  superseded_by_quote_id uuid NULL REFERENCES quotes(id) ON DELETE SET NULL,
  owner_user_id     uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT quotes_total_arithmetic
    CHECK (total_cents = subtotal_cents - discount_cents + freight_cents + tax_cents),
  CONSTRAINT quotes_issued_attribution
    CHECK ((issued_at IS NULL) = (issued_by_user_id IS NULL)),
  CONSTRAINT quotes_approval_consistency
    CHECK (approval_required = false OR status = 'DRAFT' OR approved_at IS NOT NULL)
);

CREATE UNIQUE INDEX quotes_number_version_unique ON quotes (quote_number, version_number);
CREATE INDEX quotes_opportunity_idx ON quotes (opportunity_id);
CREATE INDEX quotes_expiring_idx ON quotes (valid_until) WHERE status = 'ISSUED';

CREATE TABLE quote_lines (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id          uuid NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  line_number       integer NOT NULL CHECK (line_number >= 1),
  line_type         text NOT NULL CHECK (line_type IN ('UNIT','OPTION','FREIGHT','SERVICE','FEE','DISCOUNT')),
  sku               text NULL REFERENCES products(sku) ON DELETE RESTRICT,
  description       text NOT NULL,
  quantity          integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price_cents  integer NOT NULL CHECK (unit_price_cents >= 0),
  extended_cents    integer NOT NULL CHECK (extended_cents >= 0),
  price_book_entry_id uuid NULL REFERENCES price_book_entries(id) ON DELETE RESTRICT,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT quote_lines_extension CHECK (extended_cents = unit_price_cents * quantity)
);

CREATE UNIQUE INDEX quote_lines_number_unique ON quote_lines (quote_id, line_number);
```

- **Immutability:** on transition to ISSUED, `forbid_mutation()` applies to
  `quote_lines`, and `quotes` accepts UPDATE only on the status, acceptance, and
  supersession columns (enforced by a column-level trigger listed in Section 11).
- **RLS:** SELECT: SALES_*, FINANCE_*, ADMIN+. INSERT/UPDATE: owner and SALES_MANAGER+.
  Approval columns writable only by a role whose threshold covers the discount
  (BBH-ADMIN-IAM-SPECIFICATION.md Section 6). DELETE: forbidden.
- **Audit:** `quote.created`, `quote.submitted_for_approval`, `quote.approved`,
  `quote.issued`, `quote.accepted`, `quote.declined`, `quote.expired`, `quote.superseded`.

### 7.4 orders / order_lines

**Purpose:** The commercial commitment. Supersedes the existing `orders` table.
**Module:** ACC-013 | **Phase:** 3 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      text NOT NULL UNIQUE,      -- 'BB-2026-000287'
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  quote_id          uuid NOT NULL REFERENCES quotes(id) ON DELETE RESTRICT,
  opportunity_id    uuid NULL REFERENCES opportunities(id) ON DELETE SET NULL,
  property_id       uuid NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  status            text NOT NULL DEFAULT 'PENDING_DEPOSIT'
                      CHECK (status IN ('PENDING_DEPOSIT','CONFIRMED','IN_PRODUCTION','READY_TO_SHIP',
                                        'SHIPPED','DELIVERED','COMPLETE','CANCELLED')),
  payment_stage     integer NOT NULL DEFAULT 0 CHECK (payment_stage BETWEEN 0 AND 4),
  subtotal_cents    integer NOT NULL CHECK (subtotal_cents >= 0),
  discount_cents    integer NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  freight_cents     integer NOT NULL DEFAULT 0 CHECK (freight_cents >= 0),
  tax_cents         integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents       integer NOT NULL CHECK (total_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  estimated_landed_cost_cents integer NULL CHECK (estimated_landed_cost_cents >= 0),
  promised_delivery_date date NULL,
  cancelled_at      timestamptz NULL,
  cancel_reason     text NULL,
  owner_user_id     uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  version           integer NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT orders_total_arithmetic
    CHECK (total_cents = subtotal_cents - discount_cents + freight_cents + tax_cents),
  CONSTRAINT orders_cancel_consistency
    CHECK ((status = 'CANCELLED') = (cancelled_at IS NOT NULL)),
  CONSTRAINT orders_cancel_reason CHECK ((cancelled_at IS NULL) OR (cancel_reason IS NOT NULL))
);

CREATE INDEX orders_customer_idx ON orders (customer_id);
CREATE INDEX orders_status_idx ON orders (status);
CREATE INDEX orders_stage_idx ON orders (payment_stage);
CREATE INDEX orders_created_idx ON orders (created_at DESC);

CREATE TABLE order_lines (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  quote_line_id     uuid NOT NULL REFERENCES quote_lines(id) ON DELETE RESTRICT,
  line_number       integer NOT NULL CHECK (line_number >= 1),
  line_type         text NOT NULL CHECK (line_type IN ('UNIT','OPTION','FREIGHT','SERVICE','FEE','DISCOUNT')),
  sku               text NULL REFERENCES products(sku) ON DELETE RESTRICT,
  configuration_id  uuid NULL REFERENCES configurations(id) ON DELETE RESTRICT,
  description       text NOT NULL,
  quantity          integer NOT NULL CHECK (quantity > 0),
  unit_price_cents  integer NOT NULL CHECK (unit_price_cents >= 0),
  extended_cents    integer NOT NULL CHECK (extended_cents >= 0),
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT order_lines_extension CHECK (extended_cents = unit_price_cents * quantity)
);

CREATE UNIQUE INDEX order_lines_number_unique ON order_lines (order_id, line_number);
CREATE INDEX order_lines_order_idx ON order_lines (order_id);
```

- **RLS:** SELECT: all staff; portal principal sees own customer's orders. INSERT: system
  only (on quote acceptance plus deposit). UPDATE: state-machine transitions only, by the
  role permitted for that transition. DELETE: forbidden at every role.
- **Audit:** mandatory on every status and payment_stage change
  (CONTRACT-004: stage transitions are legally significant).
- **Notes:** Totals are copied from the accepted Quote version and never recomputed
  (ADR-A08). A discrepancy between `orders.total_cents` and the accepted quote's
  `total_cents` is a P0 data defect and is asserted by the reconciliation job in
  Section 10.2.

---

## 8. Supply And Fulfilment Tables (ACC-019, ACC-020, ACC-022, ACC-026)

### 8.1 suppliers

**Module:** ACC-019 | **Phase:** 4 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE suppliers (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_code     text NOT NULL UNIQUE,
  legal_name        text NOT NULL,
  trading_name      text NULL,
  country_code      char(2) NOT NULL,
  address           jsonb NOT NULL,
  primary_email     citext NULL,
  primary_phone     text NULL,
  incoterms         text NULL
                      CHECK (incoterms IN ('EXW','FOB','CIF','DDP','DAP','FCA')),
  payment_terms_days integer NOT NULL DEFAULT 30 CHECK (payment_terms_days >= 0),
  default_currency  char(3) NOT NULL DEFAULT 'USD',
  lead_time_days_min integer NULL CHECK (lead_time_days_min >= 0),
  lead_time_days_max integer NULL CHECK (lead_time_days_max >= 0),
  approval_status   text NOT NULL DEFAULT 'PENDING'
                      CHECK (approval_status IN ('PENDING','APPROVED','SUSPENDED','BLOCKED')),
  approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  approved_at       timestamptz NULL,
  on_time_delivery_rate numeric(5,2) NULL CHECK (on_time_delivery_rate BETWEEN 0 AND 100),
  defect_rate       numeric(5,2) NULL CHECK (defect_rate BETWEEN 0 AND 100),
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT suppliers_lead_time_order
    CHECK (lead_time_days_max IS NULL OR lead_time_days_min IS NULL
           OR lead_time_days_max >= lead_time_days_min),
  CONSTRAINT suppliers_approval_attribution
    CHECK ((approval_status = 'APPROVED') <= (approved_at IS NOT NULL))
);

CREATE INDEX suppliers_approval_idx ON suppliers (approval_status) WHERE deleted_at IS NULL;
```

- **RLS:** SELECT: PROCUREMENT_OFFICER, PRODUCTION_MANAGER, FINANCE_*, ADMIN+.
  INSERT/UPDATE: PROCUREMENT_OFFICER, ADMIN+. Approval columns: ADMIN+ only.
  DELETE: forbidden.
- **Audit:** mandatory, notably `supplier.approved` and `supplier.blocked`.

### 8.2 purchase_orders / purchase_order_lines

**Module:** ACC-020 | **Phase:** 4 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE purchase_orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number         text NOT NULL UNIQUE,      -- 'PO-2026-000058'
  supplier_id       uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  order_id          uuid NULL REFERENCES orders(id) ON DELETE SET NULL,
  status            text NOT NULL DEFAULT 'DRAFT'
                      CHECK (status IN ('DRAFT','PENDING_APPROVAL','APPROVED','ISSUED',
                                        'ACKNOWLEDGED','PARTIALLY_RECEIVED','RECEIVED','CLOSED','CANCELLED')),
  currency          char(3) NOT NULL DEFAULT 'USD',
  subtotal_cents    integer NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
  total_cents       integer NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
  expected_ship_date date NULL,
  expected_arrival_date date NULL,
  requested_by_user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  approved_at       timestamptz NULL,
  issued_at         timestamptz NULL,
  closed_at         timestamptz NULL,
  cancel_reason     text NULL,
  version           integer NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT po_issue_requires_approval
    CHECK ((status IN ('ISSUED','ACKNOWLEDGED','PARTIALLY_RECEIVED','RECEIVED','CLOSED'))
           <= (approved_at IS NOT NULL)),
  CONSTRAINT po_date_order
    CHECK (expected_arrival_date IS NULL OR expected_ship_date IS NULL
           OR expected_arrival_date >= expected_ship_date)
);

CREATE INDEX purchase_orders_supplier_idx ON purchase_orders (supplier_id);
CREATE INDEX purchase_orders_status_idx ON purchase_orders (status);
CREATE INDEX purchase_orders_order_idx ON purchase_orders (order_id);

CREATE TABLE purchase_order_lines (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
  line_number       integer NOT NULL CHECK (line_number >= 1),
  sku               text NULL REFERENCES products(sku) ON DELETE RESTRICT,
  description       text NOT NULL,
  quantity_ordered  integer NOT NULL CHECK (quantity_ordered > 0),
  quantity_received integer NOT NULL DEFAULT 0 CHECK (quantity_received >= 0),
  unit_cost_cents   integer NOT NULL CHECK (unit_cost_cents >= 0),
  extended_cents    integer NOT NULL CHECK (extended_cents >= 0),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT po_lines_extension CHECK (extended_cents = unit_cost_cents * quantity_ordered),
  CONSTRAINT po_lines_no_over_receipt CHECK (quantity_received <= quantity_ordered)
);

CREATE UNIQUE INDEX po_lines_number_unique ON purchase_order_lines (purchase_order_id, line_number);
```

- **RLS:** SELECT: PROCUREMENT_OFFICER, FINANCE_*, PRODUCTION_MANAGER, ADMIN+.
  INSERT/UPDATE: PROCUREMENT_OFFICER for draft; approval columns restricted by value
  threshold (BBH-ADMIN-IAM-SPECIFICATION.md Section 6.2). DELETE: forbidden.
- **Audit:** `po.created`, `po.submitted`, `po.approved`, `po.issued`, `po.received`,
  `po.cancelled`. Approval rows record the threshold that applied.

### 8.3 production_records

**Module:** ACC-022 | **Phase:** 4 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE production_records (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number     text NOT NULL UNIQUE,      -- assigned at build start, immutable
  order_id          uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  order_line_id     uuid NOT NULL REFERENCES order_lines(id) ON DELETE RESTRICT,
  configuration_id  uuid NOT NULL REFERENCES configurations(id) ON DELETE RESTRICT,
  supplier_id       uuid NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
  production_slot_id uuid NULL REFERENCES production_slots(id) ON DELETE SET NULL,
  status            text NOT NULL DEFAULT 'SCHEDULED'
                      CHECK (status IN ('SCHEDULED','MATERIALS_STAGED','IN_BUILD','QC_PENDING',
                                        'QC_FAILED','PRE_SHIP_PENDING','PRE_SHIP_APPROVED','RELEASED','SCRAPPED')),
  build_started_at  timestamptz NULL,
  build_completed_at timestamptz NULL,
  qc_result         text NULL CHECK (qc_result IN ('PASS','CONDITIONAL_PASS','FAIL')),
  qc_inspected_at   timestamptz NULL,
  qc_inspected_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  pre_ship_approved_at timestamptz NULL,
  pre_ship_approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  scrap_reason      text NULL,
  version           integer NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT production_qc_attribution
    CHECK ((qc_result IS NULL) = (qc_inspected_at IS NULL)),
  CONSTRAINT production_pre_ship_requires_qc
    CHECK (pre_ship_approved_at IS NULL OR qc_result IN ('PASS','CONDITIONAL_PASS')),
  CONSTRAINT production_pre_ship_attribution
    CHECK ((pre_ship_approved_at IS NULL) = (pre_ship_approved_by_user_id IS NULL)),
  CONSTRAINT production_build_date_order
    CHECK (build_completed_at IS NULL OR build_started_at IS NULL
           OR build_completed_at >= build_started_at)
);

CREATE INDEX production_records_order_idx ON production_records (order_id);
CREATE INDEX production_records_status_idx ON production_records (status);
CREATE UNIQUE INDEX production_records_order_line_unique ON production_records (order_line_id);
```

- **RLS:** SELECT: PRODUCTION_MANAGER, LOGISTICS_COORDINATOR, SALES_MANAGER, ADMIN+;
  portal sees status only through a view. INSERT/UPDATE: PRODUCTION_MANAGER; pre-ship
  approval columns additionally require the ACC-014 signed document and stage-3 payment
  (guard in BBH-ADMIN-BEHAVIORAL-CONTRACTS.md Section 7). DELETE: forbidden.
- **Audit:** every status change; `production.qc_recorded` and
  `production.pre_ship_approved` are legally significant and must include the evidence
  document id in `after_state`.

### 8.4 shipments / shipment_lines

**Module:** ACC-026 | **Phase:** 5 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE shipments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_number   text NOT NULL UNIQUE,      -- 'S-2026-000174'
  order_id          uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  property_id       uuid NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  carrier_name      text NULL,
  carrier_reference text NULL,
  status            text NOT NULL DEFAULT 'PLANNED'
                      CHECK (status IN ('PLANNED','BOOKED','PICKED_UP','IN_TRANSIT','AT_PORT',
                                        'CUSTOMS_CLEARED','OUT_FOR_DELIVERY','DELIVERED','EXCEPTION','CANCELLED')),
  freight_cost_cents integer NULL CHECK (freight_cost_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  booked_at         timestamptz NULL,
  picked_up_at      timestamptz NULL,
  estimated_arrival_at timestamptz NULL,
  delivered_at      timestamptz NULL,
  proof_of_delivery_document_id uuid NULL,
  exception_reason  text NULL,
  version           integer NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shipments_delivered_requires_pod
    CHECK (status <> 'DELIVERED' OR proof_of_delivery_document_id IS NOT NULL),
  CONSTRAINT shipments_exception_reason
    CHECK ((status = 'EXCEPTION') = (exception_reason IS NOT NULL))
);

CREATE INDEX shipments_order_idx ON shipments (order_id);
CREATE INDEX shipments_status_idx ON shipments (status);
CREATE INDEX shipments_eta_idx ON shipments (estimated_arrival_at)
  WHERE status NOT IN ('DELIVERED','CANCELLED');

CREATE TABLE shipment_lines (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id       uuid NOT NULL REFERENCES shipments(id) ON DELETE RESTRICT,
  production_record_id uuid NOT NULL REFERENCES production_records(id) ON DELETE RESTRICT,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- A unit ships exactly once.
CREATE UNIQUE INDEX shipment_lines_production_unique ON shipment_lines (production_record_id);
```

- **Guard:** insertion into `shipment_lines` requires the referenced production record to
  be `PRE_SHIP_APPROVED` or `RELEASED`. Enforced by trigger, not by application code alone
  (OBJ-03).
- **RLS:** SELECT: LOGISTICS_COORDINATOR, PRODUCTION_MANAGER, SALES_*, SUPPORT_AGENT,
  ADMIN+; portal sees own order's shipment through a view. INSERT/UPDATE:
  LOGISTICS_COORDINATOR, ADMIN+. DELETE: forbidden.
- **Audit:** every status change, with `shipment.delivered` carrying the POD document id.

---

## 9. Financial Tables (ACC-015, ACC-016)

### 9.1 invoices / invoice_lines

**Module:** ACC-015 | **Phase:** 3 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE invoices (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number    text NOT NULL UNIQUE,      -- 'INV-2026-001902'
  order_id          uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  payment_stage     integer NOT NULL CHECK (payment_stage BETWEEN 1 AND 4),
  status            text NOT NULL DEFAULT 'DRAFT'
                      CHECK (status IN ('DRAFT','ISSUED','PARTIALLY_PAID','PAID','OVERDUE','VOID','WRITTEN_OFF')),
  subtotal_cents    integer NOT NULL CHECK (subtotal_cents >= 0),
  tax_cents         integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents       integer NOT NULL CHECK (total_cents >= 0),
  amount_paid_cents integer NOT NULL DEFAULT 0 CHECK (amount_paid_cents >= 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  tax_determination jsonb NULL,                -- immutable snapshot (ACC-018)
  issued_at         timestamptz NULL,
  due_at            timestamptz NULL,
  paid_at           timestamptz NULL,
  voided_at         timestamptz NULL,
  void_reason       text NULL,
  stripe_invoice_id text NULL UNIQUE,
  version           integer NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT invoices_total_arithmetic CHECK (total_cents = subtotal_cents + tax_cents),
  CONSTRAINT invoices_no_overpay CHECK (amount_paid_cents <= total_cents),
  CONSTRAINT invoices_paid_consistency
    CHECK ((status = 'PAID') = (amount_paid_cents = total_cents AND total_cents > 0)),
  CONSTRAINT invoices_void_reason CHECK ((voided_at IS NULL) = (void_reason IS NULL))
);

-- One invoice per order per payment stage, excluding voided ones.
CREATE UNIQUE INDEX invoices_order_stage_unique
  ON invoices (order_id, payment_stage) WHERE status <> 'VOID';
CREATE INDEX invoices_customer_idx ON invoices (customer_id);
CREATE INDEX invoices_overdue_idx ON invoices (due_at)
  WHERE status IN ('ISSUED','PARTIALLY_PAID','OVERDUE');

CREATE TABLE invoice_lines (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id        uuid NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
  line_number       integer NOT NULL CHECK (line_number >= 1),
  order_line_id     uuid NULL REFERENCES order_lines(id) ON DELETE RESTRICT,
  description       text NOT NULL,
  amount_cents      integer NOT NULL,
  tax_cents         integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX invoice_lines_number_unique ON invoice_lines (invoice_id, line_number);
```

- **RLS:** SELECT: FINANCE_*, SALES_MANAGER, ADMIN+; portal sees own customer's issued
  invoices. INSERT: system (stage-driven generation) and FINANCE_CONTROLLER. UPDATE:
  FINANCE_* for status transitions; void and write-off threshold-gated. DELETE: forbidden.
- **Append-only:** `invoice_lines` immutable once the parent invoice is ISSUED.
- **Audit:** `invoice.issued`, `invoice.paid`, `invoice.voided`, `invoice.written_off`.

### 9.2 payments / payment_allocations

**Module:** ACC-016 | **Phase:** 3 table, created Phase 1 | **Status:** DORMANT

```sql
CREATE TABLE payments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_number    text NOT NULL UNIQUE,
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  method            text NOT NULL
                      CHECK (method IN ('CARD','ACH','WIRE','CHECK','FINANCED','OTHER')),
  direction         text NOT NULL DEFAULT 'INBOUND'
                      CHECK (direction IN ('INBOUND','REFUND')),
  amount_cents      integer NOT NULL CHECK (amount_cents > 0),
  currency          char(3) NOT NULL DEFAULT 'USD',
  status            text NOT NULL DEFAULT 'PENDING'
                      CHECK (status IN ('PENDING','SUCCEEDED','FAILED','REFUNDED','DISPUTED')),
  received_at       timestamptz NOT NULL DEFAULT now(),
  stripe_payment_intent_id text NULL UNIQUE,
  stripe_event_id   text NULL UNIQUE,          -- idempotency key for webhook ingest
  external_reference text NULL,                -- check number, wire reference
  reconciled_at     timestamptz NULL,
  reconciliation_run_id uuid NULL,
  failure_reason    text NULL,
  refund_of_payment_id uuid NULL REFERENCES payments(id) ON DELETE RESTRICT,
  refund_reason     text NULL,
  approved_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  created_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT payments_refund_shape
    CHECK ((direction = 'REFUND') = (refund_of_payment_id IS NOT NULL)),
  CONSTRAINT payments_refund_reason
    CHECK (direction <> 'REFUND' OR refund_reason IS NOT NULL),
  CONSTRAINT payments_failure_reason
    CHECK ((status = 'FAILED') = (failure_reason IS NOT NULL))
);

CREATE INDEX payments_customer_idx ON payments (customer_id);
CREATE INDEX payments_unreconciled_idx ON payments (received_at)
  WHERE reconciled_at IS NULL AND status = 'SUCCEEDED';

CREATE TABLE payment_allocations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id        uuid NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
  invoice_id        uuid NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
  amount_cents      integer NOT NULL CHECK (amount_cents > 0),
  allocated_by_user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  allocated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX payment_allocations_payment_idx ON payment_allocations (payment_id);
CREATE INDEX payment_allocations_invoice_idx ON payment_allocations (invoice_id);
```

- **Append-only:** both tables carry `forbid_mutation()` on DELETE; `payments` permits
  UPDATE only on `status`, `reconciled_at`, `reconciliation_run_id`, `failure_reason`.
- **Invariant (trigger-enforced):** the sum of `payment_allocations.amount_cents` for a
  payment may never exceed `payments.amount_cents`; the sum for an invoice may never
  exceed `invoices.total_cents`.
- **RLS:** SELECT: FINANCE_*, ADMIN+; portal sees own payments through a view. INSERT:
  system (webhook) and FINANCE_CLERK. UPDATE: FINANCE_* only, columns as above. Refunds
  require `approved_by_user_id` from a role whose threshold covers the amount.
  DELETE: forbidden at every role.
- **Audit:** `payment.received`, `payment.allocated`, `payment.refunded`,
  `payment.reconciled`, `payment.disputed`.

### 9.3 payment_stage_history

Retained from `SCHEMA_REGISTRY.md` Table 4 with its append-only semantics, repointed to
the new `orders` and `users` tables. Columns unchanged except
`triggered_by uuid NULL REFERENCES users(id) ON DELETE SET NULL`.

---

## 10. Derived Objects

### 10.1 Views

| Object | Type | Purpose |
|---|---|---|
| `contact_consent_current` | MATERIALIZED VIEW | Latest consent row per (contact, channel, purpose). Refreshed on write via trigger. |
| `order_financial_summary` | VIEW | Per order: invoiced, paid, outstanding, stage. Used by ACC-003 tiles. |
| `production_pipeline` | VIEW | Per order: unit count by production status. |
| `portal_order_status` | VIEW | Security-barrier view exposing only portal-safe columns. |

All views are `SECURITY INVOKER` except `portal_order_status`, which is
`SECURITY BARRIER` and filtered by `customer_id`.

### 10.2 Scheduled integrity assertions

Run nightly; a failure raises a P0 alert through ACC-005. These are assertions, not
repairs - the system never silently rewrites financial data.

| ID | Assertion |
|---|---|
| INT-01 | For every non-cancelled order, `SUM(invoices.total_cents WHERE status<>'VOID') = orders.total_cents`. |
| INT-02 | For every invoice, `amount_paid_cents = SUM(payment_allocations.amount_cents)`. |
| INT-03 | Every `orders.total_cents` equals its accepted `quotes.total_cents`. |
| INT-04 | No `shipment_lines` row references a production record that is not pre-ship approved. |
| INT-05 | Every table has RLS enabled and at least one policy or an explicit DORMANT marker. |
| INT-06 | No user holds an active role assignment while `users.status <> 'ACTIVE'`. |
| INT-07 | At least one ACTIVE user holds MASTER_ADMIN. |

---

## 11. Audit Requirements

Per CONTRACT-004, every mutation on every table in this document writes an `audit_log`
row through the canonical writer. The existing `audit_log` schema
(`SCHEMA_REGISTRY.md` Table 7) is unchanged; the following columns are added:

```sql
ALTER TABLE audit_log
  ADD COLUMN request_id    uuid NULL,        -- correlates to the tRPC request
  ADD COLUMN module        text NULL,        -- 'ACC-013'
  ADD COLUMN severity      text NOT NULL DEFAULT 'INFO'
    CHECK (severity IN ('INFO','NOTICE','WARNING','CRITICAL'));

CREATE INDEX audit_log_module_idx ON audit_log (module, timestamp DESC);
CREATE INDEX audit_log_request_idx ON audit_log (request_id);
```

### 11.1 Action naming

`<entity>.<verb_past_tense>`, lowercase snake, entity singular. Examples:
`user.invited`, `role.granted`, `quote.issued`, `order.stage_advanced`,
`production.pre_ship_approved`, `payment.reconciled`.

### 11.2 Severity assignment

| Severity | Applies to |
|---|---|
| INFO | Ordinary record create and update |
| NOTICE | State machine transitions |
| WARNING | Threshold overrides, manual reconciliation, stage regression |
| CRITICAL | Role grants, MFA reset, price book activation, refund, write-off, pre-ship approval |

### 11.3 Tables exempt from the audit trigger

Only `audit_log` itself (self-referential) and `sessions` heartbeat updates. Every other
table in this document is audited. There are no other exemptions.

---

## 12. Reconciliation With SCHEMA_REGISTRY.md

### 12.1 Tables extended (no data loss, additive only)

| Table | Change |
|---|---|
| `products` | Columns added per Section 6.1. PK `sku` retained. |
| `leads` | Columns added per Section 7.1; status enum replaced (see 12.3). |
| `audit_log` | Columns added per Section 11. |
| `production_slots` | Retained as-is; `production_records.production_slot_id` references it. |
| `payment_stage_history` | FK repointed from `admin_users` to `users`. |

### 12.2 Tables superseded (data migrated, old table dropped only after verification)

| Old table | New table | Migration |
|---|---|---|
| `admin_users` | `users` + `roles` + `role_assignments` | Each row becomes a `users` row with `status='ACTIVE'` where `is_active`, plus a `role_assignments` row mapping `MASTER_ADMIN`->`MASTER_ADMIN` and `ADMIN`->`ADMIN`. |
| `customers` (registry Table 5) | `customers` (Section 5.4) | Column rename and addition; `id` no longer equals `auth.users.id`, moved to `portal_user_id`. |
| `orders` (registry Table 3) | `orders` (Section 7.4) | `product_sku` and `configuration` move to `order_lines` and `configurations`. |

`admin_users` is retained read-only for one release after cutover, then dropped in a
separate migration once INT-06 and INT-07 pass in production. Dropping it in the same
migration as the cutover is forbidden.

### 12.3 Enum migration for `leads.status`

| Old value | New value | Additional action |
|---|---|---|
| NEW | NEW | - |
| CONTACTED | WORKING | set `first_touch_at = updated_at` if null |
| QUALIFIED | QUALIFIED | create an Opportunity in DISCOVERY |
| QUOTED | QUALIFIED | create an Opportunity in QUOTED |
| DEPOSITED | QUALIFIED | create an Opportunity in WON |
| WON | QUALIFIED | create an Opportunity in WON, `closed_at = updated_at` |
| LOST | DISQUALIFIED | `disqualify_reason = 'MIGRATED_LOST'` |

The migration is reversible: it writes a `leads_status_migration_backup` table capturing
`(lead_id, old_status)` before the update, per CONTRACT-012.

---

## 13. Migration Order (Phase 1)

Applied in this exact order. Each file carries the pre-check and post-check blocks
required by CONTRACT-012. File naming follows the existing convention in
`SCHEMA_REGISTRY.md` "Initial Migration Order".

| # | File | Creates |
|---|---|---|
| 01 | `20260911_0100_extensions.sql` | `citext`, `pgcrypto` |
| 02 | `20260911_0110_shared_functions.sql` | `set_updated_at`, `bump_version`, `forbid_mutation`, `require_audit_context` |
| 03 | `20260911_0120_create_roles.sql` | `roles` + seed of the ten roles |
| 04 | `20260911_0130_create_users.sql` | `users` |
| 05 | `20260911_0140_create_role_assignments.sql` | `role_assignments` + `protect_last_master_admin` |
| 06 | `20260911_0150_create_sessions.sql` | `sessions` |
| 07 | `20260911_0160_extend_audit_log.sql` | `audit_log` columns + indexes |
| 08 | `20260911_0170_migrate_admin_users.sql` | data migration into `users` / `role_assignments` |
| 09 | `20260911_0180_extend_products.sql` | `products` columns |
| 10 | `20260911_0190_create_price_books.sql` | `price_books`, `price_book_entries` |
| 11 | `20260911_0200_create_contacts.sql` | `contacts`, `contact_channels`, `consents` |
| 12 | `20260911_0210_create_customers.sql` | `customers`, `customer_contact_links` |
| 13 | `20260911_0220_create_properties.sql` | `properties` |
| 14 | `20260911_0230_create_configurations.sql` | `configurations`, `configuration_selections` |
| 15 | `20260911_0240_extend_leads.sql` | `leads` columns + status migration + backup table |
| 16 | `20260911_0250_create_opportunities.sql` | `opportunities` |
| 17 | `20260911_0260_create_quotes.sql` | `quotes`, `quote_lines` |
| 18 | `20260911_0270_create_orders.sql` | `orders`, `order_lines` |
| 19 | `20260911_0280_create_suppliers.sql` | `suppliers` |
| 20 | `20260911_0290_create_purchase_orders.sql` | `purchase_orders`, `purchase_order_lines` |
| 21 | `20260911_0300_create_production_records.sql` | `production_records` |
| 22 | `20260911_0310_create_shipments.sql` | `shipments`, `shipment_lines` + pre-ship guard trigger |
| 23 | `20260911_0320_create_invoices.sql` | `invoices`, `invoice_lines` |
| 24 | `20260911_0330_create_payments.sql` | `payments`, `payment_allocations` + allocation invariant triggers |
| 25 | `20260911_0340_create_views.sql` | views in Section 10.1 |
| 26 | `20260911_0350_enable_rls.sql` | RLS ON for every table created above, no policies |
| 27 | `20260911_0360_policies_phase1.sql` | policies for `users`, `roles`, `role_assignments`, `sessions`, `products`, `price_books`, `price_book_entries`, `audit_log` ONLY |
| 28 | `20260911_0370_integrity_assertions.sql` | INT-01..INT-07 as SQL functions |

Migrations 26 and 27 together implement the DORMANT posture: every table has RLS on;
only Phase 1 module tables receive policies. A table with RLS enabled and no policy
denies all access to all roles, which is the intended state for dormant tables.

---

## 14. Index Rationale

Every index above exists for a named query. Indexes without a named consumer are not
created.

| Index | Query it serves | Module |
|---|---|---|
| `users_status_idx` | Active-user list and INT-06 | ACC-001 |
| `role_assignments_active_unique` | Permission resolution on every request | ACC-001 |
| `sessions_user_active_idx` | Forced revocation on suspend | ACC-001 |
| `contacts_primary_email_unique` | Dedupe on ingest | ACC-006 |
| `leads_untouched_idx` | First-touch SLA queue | ACC-007 |
| `opportunities_open_close_date_idx` | Forecast by close date | ACC-008 |
| `quotes_expiring_idx` | Nightly expiry sweep | ACC-009 |
| `orders_status_idx` | Dashboard exception tiles | ACC-003, ACC-013 |
| `invoices_overdue_idx` | Ageing and dunning | ACC-015 |
| `payments_unreconciled_idx` | Daily reconciliation run | ACC-016 |
| `shipments_eta_idx` | Late shipment alerting | ACC-026 |
| `production_records_order_line_unique` | One unit per order line | ACC-022 |
| `shipment_lines_production_unique` | A unit ships exactly once | ACC-026 |

---

**End of BBH-ADMIN-DATABASE-SCHEMA.md**
