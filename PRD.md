# PRODUCT REQUIREMENTS DOCUMENT — Bright Box Homes

## Purpose
This document specifies every product feature for Bright Box Homes and the standalone Configurator package. Each feature is uniquely identified, prioritized, scoped to a build phase, and bounded by measurable success criteria. PRD.md is the canonical reference for "what does this feature need to do" — when implementation questions arise, this is the source of truth before COMPONENTS.md or code.

## Cross-References
- Vision and strategy: BLUEPRINT.md
- System architecture: ARCHITECTURE.md
- Operational methodology: GOVERNANCE_BRIEF.md
- Six Laws gate (feature completion definition): GOVERNANCE_BRIEF.md Section 3

## Feature ID Convention
- BBH-XXX: Bright Box Homes web app features
- CFG-XXX: Configurator package features
- ADMIN-XXX: Admin dashboard features
- PORTAL-XXX: Customer portal features
- SEO-XXX: SEO and content infrastructure features
- LEGAL-XXX: Legal page features
- INFRA-XXX: Infrastructure and DevOps features

## Priority Tiers
- P0: Launch blocker — Bright Box cannot launch without this
- P1: Launch-shaping — significantly impacts conversion or trust
- P2: Post-launch enhancement — important but not blocking
- P3: Future consideration — Phase 2+ or beyond

---

## Feature Index

| Feature ID | Feature Name | Priority | Phase |
|------------|--------------|----------|-------|
| BBH-001 | Homepage | P0 | Phase 1 |
| BBH-002 | Product Line Page Template | P0 | Phase 1 |
| BBH-003 | Expandable Container Homes Product Page | P0 | Phase 1 |
| BBH-004 | Apple Cabin Homes Product Page | P0 | Phase 1 |
| BBH-005 | Space Capsule Homes Product Page | P0 | Phase 1 |
| BBH-006 | Assembly Homes Product Page | P0 | Phase 1 |
| BBH-007 | Foldout Homes Product Page | P0 | Phase 1 |
| BBH-008 | Multi-Step Lead Capture Wizard | P0 | Phase 1 |
| BBH-009 | Email-Me-My-Build Save Feature | P1 | Phase 1 |
| BBH-010 | Cal.com Consultation Booking | P0 | Phase 1 |
| BBH-011 | Stripe Deposit Payment (Stage 1) | P0 | Phase 1 |
| BBH-012 | ROI Calculator (Airbnb) | P1 | Phase 1 |
| BBH-013 | Delivery Cost Estimator | P1 | Phase 1 |
| BBH-014 | Build Slot Availability Calendar | P1 | Phase 1 |
| BBH-015 | Side-by-Side Product Comparison | P1 | Phase 1 |
| BBH-016 | Permit & Zoning Lookup Tool | P1 | Phase 1 |
| BBH-017 | Acorn Financing Widget | P1 | Phase 1 |
| BBH-018 | Spec Sheet PDF Auto-Generator | P1 | Phase 1 |
| BBH-019 | Live Chat | P2 | Phase 1 |
| BBH-020 | Virtual Showroom (360°) | P1 | Phase 1 |
| BBH-021 | Blog Infrastructure | P0 | Phase 1 |
| BBH-022 | FAQ System | P0 | Phase 1 |
| BBH-023 | About / Build Process Page | P0 | Phase 1 |
| BBH-024 | FAITH Foundation Landing Page | P1 | Phase 1 |
| BBH-025 | $5K Challenge Page | P1 | Phase 1 |
| BBH-026 | International Waitlist | P1 | Phase 1 |
| CFG-001 | Configurator Core Engine | P0 | Phase 1 |
| CFG-002 | 360° Pre-Rendered Rotation | P0 | Phase 1 |
| CFG-003 | Interior View Mode | P0 | Phase 1 |
| CFG-004 | Layered Option Compositing | P0 | Phase 1 |
| CFG-005 | Reactive Floor Plans (SVG) | P0 | Phase 1 |
| CFG-006 | Theme System (White-Label) | P0 | Phase 1 |
| CFG-007 | Configuration State Emission | P0 | Phase 1 |
| CFG-008 | Pricing Engine | P0 | Phase 1 |
| CFG-009 | Mobile Touch Optimization | P0 | Phase 1 |
| CFG-010 | Premium Loading Sequence | P1 | Phase 1 |
| ADMIN-001 | Admin Authentication | P0 | Phase 1 |
| ADMIN-002 | Leads Inbox | P0 | Phase 1 |
| ADMIN-003 | Order Management | P0 | Phase 1 |
| ADMIN-004 | Customer Database | P1 | Phase 1 |
| ADMIN-005 | Production Scheduling | P1 | Phase 1 |
| ADMIN-006 | Affiliates Management | P1 | Phase 1 |
| ADMIN-007 | Site Content Management | P2 | Phase 1.5 |
| ADMIN-008 | Settings and Team Management | P2 | Phase 1.5 |
| ADMIN-009 | Audit Log Viewer | P1 | Phase 1 |
| ADMIN-010 | Dashboard Home (Operational) | P0 | Phase 1 |
| PORTAL-001 | Customer Authentication | P0 | Phase 1 |
| PORTAL-002 | Order Status View | P0 | Phase 1 |
| PORTAL-003 | Document Signing (Pre-Ship) | P0 | Phase 1 |
| PORTAL-004 | Invoice and Payment History | P0 | Phase 1 |
| PORTAL-005 | Warranty Documentation Download | P1 | Phase 1 |
| SEO-001 | Core SEO Infrastructure | P0 | Phase 1 |
| SEO-002 | State Landing Pages | P1 | Phase 1 |
| SEO-003 | Competitor Comparison Pages | P1 | Phase 1 |
| SEO-004 | ADU Regulation Pages | P1 | Phase 1 |
| SEO-005 | Financing Calculator Page | P1 | Phase 1 |
| SEO-006 | Blog Content Seeding | P1 | Phase 1 |
| LEGAL-001 | Privacy Policy | P0 | Phase 1 |
| LEGAL-002 | Terms of Service | P0 | Phase 1 |
| LEGAL-003 | Custom Order / No Returns Policy | P0 | Phase 1 |
| LEGAL-004 | Warranty Terms | P0 | Phase 1 |
| LEGAL-005 | Country of Origin Disclosure | P0 | Phase 1 |
| LEGAL-006 | Building Code Exemption Disclosure | P0 | Phase 1 |
| INFRA-001 | Monorepo Scaffold | P0 | Phase 1 |
| INFRA-002 | Supabase Project Setup | P0 | Phase 1 |
| INFRA-003 | Resend Setup | P0 | Phase 1 |
| INFRA-004 | Stripe Setup | P0 | Phase 1 |
| INFRA-005 | GitHub Actions CI | P0 | Phase 1 |
| INFRA-006 | Husky + lint-staged Pre-commit | P0 | Phase 1 |
| INFRA-007 | Image Optimization Pipeline | P0 | Phase 1 |
| INFRA-008 | Acorn Integration | P1 | Phase 1 |
| INFRA-009 | Cal.com Account Setup | P0 | Phase 1 |
| INFRA-010 | Rewardful Integration | P1 | Phase 1 |
| INFRA-011 | Analytics Stack | P0 | Phase 1 |
| INFRA-012 | Domain Configuration | P0 | Phase 1 |

---

## Feature Specifications

### BBH-001: Homepage

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** None

**User Stories:**
- As an ADU buyer, I want to immediately understand what Bright Box offers and at what price range, so I can decide to explore further within 10 seconds
- As an off-grid lifestyle buyer, I want to see lifestyle imagery that matches my use case, so I feel the brand understands me
- As an investor/developer, I want to see ROI signals (price ladder, profitability angle) prominently
- As a returning visitor, I want fast loading and recognizable design so I can navigate efficiently

**Functional Requirements:**
1. Full-bleed hero section with primary lifestyle image, headline "Premium Prefab Homes from $35,995", and dual CTA buttons ("Design Your Home" → configurator, "Book Free Consultation" → Cal.com)
2. "How It Works" section with embedded auto-playing muted looping video (configurator screen-recording demo)
3. Product line grid displaying all 5 product lines (Expandable Containers, Apple Cabins, Space Capsules, Assembly Houses, Foldout Houses) with thumbnail, starting price, and "Explore" CTA
4. Trust strip with badges: BBB A-rating, "American Owned. Globally Sourced. US Delivered.", "Free TX Shipping", "12-Month Warranty", "Acorn Financing Available"
5. Real installations section featuring 5 delivered-unit photos with location/date captions (e.g., "Austin, TX — Delivered March 2026")
6. Testimonials section with 3 customer testimonials (name, location, product purchased, quote, star rating)
7. FAQ accordion with 10 general questions (expandable on click, schema.org FAQPage markup)
8. $5K Challenge program callout card linking to BBH-025
9. FAITH Foundation partnership callout card linking to BBH-024
10. Footer with full sitemap (Products, Resources, Company, Legal), social links (Facebook, Instagram, YouTube), contact (phone, email), legal links

**Non-Functional Requirements:**
- Lighthouse Performance score ≥95
- Lighthouse Accessibility score = 100
- Largest Contentful Paint (LCP) <2.5s on 4G connection
- Mobile-first responsive design (breakpoints: 640px, 768px, 1024px, 1280px)
- Auto dark mode based on `prefers-color-scheme` media query
- AVIF/WebP/JPG responsive images via picture element
- Lazy loading for below-fold images

**Success Criteria:**
- Bounce rate <50% (industry average ~60% for e-commerce)
- Average time on page >45 seconds
- Click-through rate to product page or configurator >25%
- Lead form view rate >15% (visitors who scroll to lead capture section)
- Core Web Vitals pass (LCP <2.5s, FID <100ms, CLS <0.1)

**Out-of-Scope:**
- Live chat widget (deferred to BBH-019)
- Language switcher (Phase 2 internationalization)
- Dynamic hero rotation (single static hero in Phase 1)
- Customer login link (added in PORTAL-001)

**Six Laws Status:**
- SCHEMA: N/A (static page, no database)
- API: N/A (static page, no backend calls)
- UI: Full spec provided, includes loading/empty/error states for embedded video
- DATA: N/A (static content)
- WIRING: Verified via CTA destination checks (configurator link, Cal.com embed)
- VERIFICATION: Playwright E2E test for homepage load + CTA clicks, Lighthouse CI automated check

---

### BBH-002: Product Line Page Template

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001 (Configurator package), BBH-001

**User Stories:**
- As a buyer researching a specific product line, I want to see all models, pricing, specs, and customization options in one place
- As a mobile user, I want to view 360° product images and configure options without performance lag
- As a comparison shopper, I want to see standard inclusions vs optional add-ons clearly separated

**Functional Requirements:**
1. Hero section with product line name, tagline, starting price, and primary CTA ("Configure Yours")
2. Model grid showing all available models within the product line (e.g., 20x10, 20x20, 20x30, 20x40, 20x20 Duplex for Expandable Containers)
3. Each model card displays: thumbnail, model name, square footage, starting price, floor plan count, "Customize" button
4. Standard inclusions section (bulleted list of all features included in base price)
5. Optional add-ons section (grid of add-on cards with thumbnail, name, price delta, "Learn More" expansion)
6. Specifications table (dimensions, weight, electrical, plumbing, HVAC, insulation R-value, warranty)
7. 360° product viewer embed (CFG-002 component) showing default configuration
8. Floor plan viewer (interactive SVG per CFG-005) with room dimensions on hover
9. "Why Choose This Model" section with 3-5 unique selling points
10. Related products carousel linking to other product lines
11. FAQ accordion specific to this product line (10-15 questions)
12. CTA section with "Start Configuring" and "Schedule Consultation" buttons

**Non-Functional Requirements:**
- Page load time <3s on 4G
- 360° viewer supports touch gestures on mobile
- All images optimized (AVIF/WebP/JPG, lazy-loaded below fold)
- Accessibility: keyboard navigation for all interactive elements, ARIA labels on controls
- Mobile responsive with stacked layout on <768px

**Success Criteria:**
- Configurator engagement rate >40% (users who click "Configure Yours")
- Average time on page >2 minutes
- Add-on expansion rate >30% (users who expand add-on details)
- Conversion to lead form >10%

**Out-of-Scope:**
- Real-time inventory display (admin manually updates availability via ADMIN-005)
- Volume discount calculator (manual quote via sales team)
- Financing calculator embed (separate page SEO-005)

**Six Laws Status:**
- SCHEMA: Requires `products` table (product_line, model, base_price, specs JSONB)
- API: `/api/products/[productLine]` route fetches product data
- UI: Full template spec provided
- DATA: Real product data from Supabase (no mocks)
- WIRING: Product data flows from Supabase → API route → Server Component → UI
- VERIFICATION: Unit test for API route, Playwright E2E for product page load + configurator CTA

---

### BBH-003: Expandable Container Homes Product Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As an ADU buyer, I want to compare the 5 container home models side-by-side to find the right size for my property
- As an off-grid buyer, I want to see solar and propane add-on options prominently

**Functional Requirements:**
1. Instance of BBH-002 template with product line = "Expandable Shipping Container Homes"
2. Model grid displays: 20x10 ($35,995), 20x20 ($45,995), 20x30 ($49,995), 20x40 ($59,995), 20x20 Duplex ($64,995)
3. Standard inclusions: induction stove, walk-in shower, tankless water heater, 24K BTU mini-split, pitched metal roof (19 colors), 60+ RAL exterior colors, 33× 110V outlets, covered porch, dual-pane windows, washer/dryer hookups, 125-amp panel
4. Optional add-ons: Solar packages (3kW, 5kW, 10kW), propane water heater swap, exterior stair placement (duplex), upgraded countertops (quartz/granite), smart home package, extended porch, additional windows
5. Specifications table includes: expandable mechanism details, steel frame gauge, insulation type/R-value
6. "Why Choose Container Homes" section: durability (steel frame), rapid deployment, eco-friendly (upcycled containers), customizable, code-compliant structure

**Non-Functional Requirements:**
- Same as BBH-002 template

**Success Criteria:**
- Container homes page accounts for >50% of total configurator traffic (highest-volume product line)
- Duplex model click-through rate >15% (unique differentiator)

**Out-of-Scope:**
- Custom container modifications (handled via sales team quote)

**Six Laws Status:**
- SCHEMA: Inherits from BBH-002, data seeded for 5 container models
- API: Same as BBH-002
- UI: Template applied with container-specific content
- DATA: Real product data for all 5 models
- WIRING: Verified
- VERIFICATION: Playwright test for container-specific model grid

---

### BBH-004: Apple Cabin Homes Product Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As a glamping site operator, I want to see the organic rounded aesthetic highlighted
- As a backyard studio buyer, I want to understand the aluminum panel construction benefits

**Functional Requirements:**
1. Instance of BBH-002 template with product line = "Apple Cabin Homes"
2. Model grid displays: 27'11" model (~302 sq ft, price TBD)
3. Standard inclusions: aluminum panel exterior (fluorocarbon coating), polyurethane insulation, double-pane glass, galvanized steel frame, microcrystalline stone flooring
4. Optional add-ons: Interior finish packages, deck extensions, smart glass windows
5. "Why Choose Apple Cabins" section: modern aesthetic, weather-resistant coating, energy-efficient insulation, glamping appeal

**Non-Functional Requirements:**
- Same as BBH-002 template

**Success Criteria:**
- Page engagement time >2.5 minutes (buyers attracted to design spend more time)
- Configurator engagement >35%

**Out-of-Scope:**
- Custom cabin shapes (standard model only)

**Six Laws Status:**
- SCHEMA: Inherits from BBH-002, data seeded for Apple Cabin models
- API: Same as BBH-002
- UI: Template applied
- DATA: Real product data
- WIRING: Verified
- VERIFICATION: Playwright test

---

### BBH-005: Space Capsule Homes Product Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As a futuristic design enthusiast, I want to see the pod aesthetic showcased
- As a meditation studio buyer, I want to understand the compact footprint benefits

**Functional Requirements:**
1. Instance of BBH-002 template with product line = "Space Capsule Homes"
2. Model grid displays: 27'11" model (~302 sq ft, price TBD), 37'9" model (price TBD)
3. Standard inclusions: Same construction as Apple Cabins (aluminum panel, fluorocarbon coating, polyurethane insulation, galvanized steel, microcrystalline stone)
4. "Why Choose Space Capsules" section: futuristic design, backyard office appeal, compact footprint, easy placement

**Non-Functional Requirements:**
- Same as BBH-002 template

**Success Criteria:**
- Page engagement >2 minutes
- Configurator engagement >30%

**Out-of-Scope:**
- Custom pod colors (standard finishes only)

**Six Laws Status:**
- SCHEMA: Inherits from BBH-002
- API: Same as BBH-002
- UI: Template applied
- DATA: Real product data
- WIRING: Verified
- VERIFICATION: Playwright test

---

### BBH-006: Assembly Homes Product Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As a developer planning workforce housing, I want to see multi-unit configurations
- As a budget-conscious buyer, I want to see the entry-level pricing ($19,995)

**Functional Requirements:**
1. Instance of BBH-002 template with product line = "Assembly Homes"
2. Model grid displays: Single-unit ($19,995), 2-unit config ($39,990), 3-unit config ($59,985)
3. Standard inclusions: Modular bathroom, kitchenette, pre-wired electrical, insulated walls/roof
4. "Why Choose Assembly Homes" section: modular scalability, lowest entry price, expandable over time, ideal for communities

**Non-Functional Requirements:**
- Same as BBH-002 template

**Success Criteria:**
- Multi-unit config click-through >25% (developer interest signal)

**Out-of-Scope:**
- Custom multi-unit layouts (pre-defined configs only)

**Six Laws Status:**
- SCHEMA: Inherits from BBH-002
- API: Same as BBH-002
- UI: Template applied
- DATA: Real product data
- WIRING: Verified
- VERIFICATION: Playwright test

---

### BBH-007: Foldout Homes Product Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As an emergency housing provider, I want to see deployment speed highlighted (hours)
- As a disaster relief buyer, I want to see modular add-on options (bathroom, kitchen, HVAC)

**Functional Requirements:**
1. Instance of BBH-002 template with product line = "Foldout Emergency Housing"
2. Model grid displays: Base structure ($2,000), +Bathroom module (+$TBD), +Kitchenette (+$TBD), +HVAC (+$TBD), +Solar (+$TBD)
3. Standard inclusions: Fire grade A materials, foldable frame, rapid deployment mechanism
4. "Why Choose Foldout Homes" section: emergency deployment, compact shipping, modular add-ons, fireproof construction

**Non-Functional Requirements:**
- Same as BBH-002 template

**Success Criteria:**
- Add-on module expansion rate >50% (buyers evaluating full configs)

**Out-of-Scope:**
- Volume disaster relief orders (handled via sales team)

**Six Laws Status:**
- SCHEMA: Inherits from BBH-002
- API: Same as BBH-002
- UI: Template applied
- DATA: Real product data
- WIRING: Verified
- VERIFICATION: Playwright test

---

### BBH-008: Multi-Step Lead Capture Wizard

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002, INFRA-002 (Supabase), INFRA-003 (Resend)

**User Stories:**
- As a buyer ready to get pricing, I want a clear form that collects my requirements without overwhelming me
- As a sales admin, I want leads automatically scored (Hot/Warm/Cold) so I can prioritize follow-ups
- As a configurator user, I want my selections saved with my lead so the sales team sees what I configured

**Functional Requirements:**
1. Multi-step wizard with 3 steps: (Step 1) Contact info, (Step 2) Project details, (Step 3) Configuration summary
2. Step 1 fields: First name (required), Last name (required), Email (required, validated), Phone (required, US format), Zip code (required, 5-digit)
3. Step 2 fields: Intended use (dropdown: ADU, Off-Grid, Airbnb, Primary Residence, Commercial, Other), Timeline (dropdown: ASAP, 1-3 months, 3-6 months, 6-12 months, 12+ months), Budget (dropdown: <$30K, $30-40K, $40-50K, $50-60K, $60K+), Message (optional, textarea)
4. Step 3: Display configurator state summary (selected product, model, options, total price), checkbox "I agree to Terms & Privacy Policy" (required)
5. Submit button triggers Server Action → inserts into `leads` table with fields: contact info, project details, configurator_state (JSONB), affiliate_id (from Rewardful cookie if present), lead_temperature (scored)
6. Lead scoring logic: Hot = (Budget ≥$40K AND Timeline ≤3 months), Warm = (Budget ≥$30K AND Timeline ≤6 months), Cold = all others
7. On submit success: Resend email to `info@brightboxhomes.com` (admin notification), Resend auto-response to lead email (confirmation + next steps)
8. Post-submit routing: Display thank-you message with options: "Book Free Consultation" (→ Cal.com), "Reserve with Deposit" (→ Stripe Checkout BBH-011)
9. Honeypot field (hidden input `website_url`) to filter bots
10. Rate limiting: 10 submissions per IP per hour (Vercel Edge Middleware)

**Non-Functional Requirements:**
- Form completion time <2 minutes average
- Mobile-friendly with large tap targets (48px minimum)
- Real-time validation on blur (email format, phone format, zip code format)
- Loading state during submission (button disabled, spinner shown)
- Error state displays specific field errors (not generic "Failed")
- Accessibility: keyboard navigation, ARIA labels, error announcements

**Success Criteria:**
- Form completion rate >60% (users who start Step 1 and complete Step 3)
- Lead scoring accuracy >80% (Hot leads convert to deposit at >30% rate)
- Email delivery success rate >99%
- Average submission time <90 seconds

**Out-of-Scope:**
- Multi-language form (Phase 2)
- Save-and-resume for incomplete forms (use BBH-009 for configurator state only)
- CRM integration (admin uses in-app dashboard ADMIN-002)

**Six Laws Status:**
- SCHEMA: Requires `leads` table (id, first_name, last_name, email, phone, zip, intended_use, timeline, budget, message, configurator_state JSONB, affiliate_id, lead_temperature, created_at, source)
- API: Server Action `/api/leads/create` handles form submission, Resend API calls
- UI: Multi-step wizard component with all 3 steps, loading/error/success states
- DATA: Real lead data written to Supabase, real emails sent via Resend
- WIRING: Form submit → Server Action → Supabase insert → Resend emails → thank-you page
- VERIFICATION: Unit test for lead scoring logic, Playwright E2E for full form flow, manual test for email receipt

---

### BBH-009: Email-Me-My-Build Save Feature

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** CFG-001, INFRA-003

**User Stories:**
- As a configurator user who isn't ready to submit a lead, I want to save my configuration and resume later
- As a mobile user who gets interrupted, I want to receive a link to my exact configuration

**Functional Requirements:**
1. "Email Me This Build" button visible in configurator UI (CFG-001 component)
2. On click, modal prompts for email address (single field, validated)
3. On submit, Server Action generates unique token (UUID), stores configurator state + email in `saved_configs` table, sends Resend email with resume link
4. Email contains: "Your Bright Box Configuration", thumbnail of configured product, summary (model, price, key selections), resume link (https://brightboxhomes.com/configure/[productLine]?token=[UUID])
5. Resume link loads configurator with pre-filled state from token lookup
6. Token expires after 90 days (configurable)
7. No account creation required (token-based access)

**Non-Functional Requirements:**
- Email delivery <10 seconds after submit
- Resume link loads configurator with state restored in <3 seconds
- Mobile-optimized email template (responsive)

**Success Criteria:**
- Save feature usage >15% of configurator sessions
- Resume link click-through rate >40%
- Conversion from resume to lead >25%

**Out-of-Scope:**
- Multiple saved configurations per user (single save per email overwrite)
- Account-based configuration library (Phase 1.5)

**Six Laws Status:**
- SCHEMA: Requires `saved_configs` table (id, token UUID, email, configurator_state JSONB, product_line, created_at, expires_at)
- API: Server Action `/api/configs/save` creates token, `/api/configs/[token]` retrieves state
- UI: "Email Me" button in configurator, modal with email input, success confirmation
- DATA: Real saved config data, real emails sent
- WIRING: Button → modal → Server Action → Supabase → Resend → resume link → configurator state restore
- VERIFICATION: Unit test for token generation, Playwright E2E for save + resume flow

---

### BBH-010: Cal.com Consultation Booking

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-001, INFRA-009 (Cal.com)

**User Stories:**
- As a buyer who wants to speak with sales before configuring, I want to book a time directly on the site
- As an admin, I want consultation bookings to appear in my calendar automatically

**Functional Requirements:**
1. Cal.com embed on `/book-consultation` page
2. Event type: "30-Minute Home Consultation" (operator's Cal.com account)
3. Pre-fill name and email if arriving from lead form (URL params `?name=X&email=Y`)
4. Embed loads Cal.com's hosted UI (iframe OR `@calcom/embed-react` SDK)
5. On booking confirmation, user receives Cal.com's auto-confirmation email
6. Operator receives booking notification in Cal.com dashboard + calendar invite

**Non-Functional Requirements:**
- Embed loads in <2 seconds
- Mobile-responsive (Cal.com handles this)
- Fallback if embed fails: display phone number (800-259-1745) and email (info@brightboxhomes.com)

**Success Criteria:**
- Booking completion rate >70% (users who load page and complete booking)
- No-show rate <20%

**Out-of-Scope:**
- Custom scheduling logic (Cal.com handles all scheduling)
- Multiple team member calendars (single operator calendar in Phase 1)

**Six Laws Status:**
- SCHEMA: N/A (Cal.com manages booking data)
- API: N/A (Cal.com API not required for embed)
- UI: Embed page with fallback contact info
- DATA: Booking data lives in Cal.com
- WIRING: Embed loads Cal.com iframe, pre-fill params passed via URL
- VERIFICATION: Manual test for embed load + booking completion

---

### BBH-011: Stripe Deposit Payment (Stage 1 of 25/25/25/25)

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-002, INFRA-004 (Stripe), INFRA-002

**User Stories:**
- As a buyer ready to place an order, I want to pay the 25% deposit securely via credit card
- As an admin, I want orders created automatically when deposit payments clear
- As a customer, I want immediate confirmation that my deposit was received

**Functional Requirements:**
1. "Reserve with Deposit" button on product pages and post-lead-form thank-you page
2. Button triggers Server Action → creates Stripe Checkout Session with: line_items (product name, 25% of configured price), metadata (lead_id, product_sku, configurator_state JSON, payment_stage: 1), success_url (`/portal/order-confirmed?session_id={CHECKOUT_SESSION_ID}`), cancel_url (return to configurator)
3. Redirect user to Stripe-hosted checkout page
4. User completes payment (Stripe handles card processing, 3D Secure, etc.)
5. Stripe webhook fires `checkout.session.completed` event to `/api/webhooks/stripe`
6. Webhook handler: Validates signature (mandatory), extracts session metadata, creates `orders` row (status: stage_1_paid, customer_id linked, configurator_state JSONB), inserts `payment_stage_history` row (stage: 1, amount, stripe_payment_intent_id, paid_at timestamp), creates customer account in Supabase Auth (email from session), triggers Resend confirmation email to customer + admin notification
7. Success page displays: "Order confirmed! Check your email for next steps. Your customer portal is ready at [link]"

**Non-Functional Requirements:**
- Stripe Checkout loads in <2 seconds
- Webhook processes event in <5 seconds
- Email delivery within 30 seconds of payment
- Idempotency: duplicate webhook events do not create duplicate orders (check stripe_payment_intent_id uniqueness)

**Success Criteria:**
- Checkout abandonment rate <30%
- Payment success rate >95% (Stripe-side)
- Webhook delivery success rate >99.9%
- Customer receives confirmation email within 1 minute

**Out-of-Scope:**
- Multi-currency checkout (USD only in Phase 1, Phase 2 for international)
- Installment payment plans within Stage 1 (full 25% due upfront)

**Six Laws Status:**
- SCHEMA: Requires `orders` table (id, customer_id, lead_id, product_sku, configurator_state JSONB, total_price, current_payment_stage, status, created_at) + `payment_stage_history` table (id, order_id, stage INT, amount, stripe_payment_intent_id, paid_at)
- API: Server Action creates Stripe session, webhook route `/api/webhooks/stripe` processes events
- UI: "Reserve with Deposit" button, success page
- DATA: Real orders in Supabase, real payment via Stripe
- WIRING: Button → Server Action → Stripe Checkout → payment → webhook → order creation → email → success page
- VERIFICATION: Unit test for webhook signature validation, Playwright E2E with Stripe test mode, manual test with test card

---

### BBH-012: ROI Calculator (Airbnb Investor Use Case)

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As an Airbnb operator, I want to calculate payback period based on my local market rates
- As an investor, I want to see annual revenue projections to justify the purchase

**Functional Requirements:**
1. Standalone page `/tools/roi-calculator` linked from homepage and product pages
2. Input fields: Nightly rate ($, default $150), Occupancy rate (%, default 65%), Product cost ($, default $45,995)
3. Calculations: Annual revenue = Nightly rate × 365 days × Occupancy rate, Payback period (months) = Product cost / (Annual revenue / 12)
4. Output display: Annual revenue (formatted $X,XXX), Monthly revenue (formatted $X,XXX), Payback period (formatted "X.X years")
5. "Assumptions" disclaimer: Excludes cleaning fees, utilities, property taxes, insurance (buyer should consult accountant)
6. CTA: "Ready to Start?" button → configurator

**Non-Functional Requirements:**
- Real-time calculation on input change (no submit button)
- Mobile-friendly number inputs
- Input validation (nightly rate >$0, occupancy 1-100%)

**Success Criteria:**
- Calculator usage >10% of site visitors
- Configurator click-through from calculator >30%

**Out-of-Scope:**
- Advanced financial modeling (mortgage, appreciation, tax deductions)
- Market data integration (Airbnb API for local rates)

**Six Laws Status:**
- SCHEMA: N/A (client-side calculation)
- API: N/A
- UI: Calculator form with inputs and live output
- DATA: N/A (no persistence)
- WIRING: Input change → calculation → display
- VERIFICATION: Unit test for calculation logic, Playwright test for UI interaction

---

### BBH-013: Delivery Cost Estimator

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-002

**User Stories:**
- As an out-of-state buyer, I want to estimate shipping cost before submitting a lead
- As a Texas buyer, I want confirmation that shipping is free

**Functional Requirements:**
1. Embedded widget on product pages below pricing section
2. Input field: Zip code (5-digit, validated)
3. On submit, calculates distance from nearest port (Houston, Los Angeles, Newark) to zip code
4. Pricing logic: Texas zip codes = $0 (free), Other states = $X per mile × distance (rate TBD by operator)
5. Output display: "Estimated delivery: $X,XXX" OR "Free delivery (Texas)" + disclaimer "Final cost confirmed at order placement"
6. "Get Exact Quote" CTA → lead form

**Non-Functional Requirements:**
- Calculation completes in <1 second
- Fallback if zip code invalid: "Enter valid 5-digit zip code"

**Success Criteria:**
- Widget usage >25% of product page visitors
- Lead form conversion from "Get Exact Quote" >15%

**Out-of-Scope:**
- Real-time shipping quotes from freight carriers
- Multiple delivery options (standard vs expedited)

**Six Laws Status:**
- SCHEMA: Requires `shipping_zones` table (zip_prefix, port, rate_per_mile) OR zip-to-port mapping in code
- API: Server Action `/api/shipping/estimate` calculates cost
- UI: Widget with zip input and output display
- DATA: Real zip-to-port distance calculation
- WIRING: Zip input → Server Action → calculation → display
- VERIFICATION: Unit test for distance/cost logic, manual test with TX and non-TX zips

---

### BBH-014: Build Slot Availability Calendar

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** ADMIN-005 (production scheduling)

**User Stories:**
- As a buyer evaluating urgency, I want to see when the next available delivery slot is
- As an admin, I want to manually set and update the next available slot to create urgency

**Functional Requirements:**
1. Public-facing display on homepage and product pages: "Next available delivery: [Month Year]" (e.g., "November 2026")
2. Admin sets slot date in ADMIN-005 dashboard
3. Display updates in real-time when admin changes slot
4. Warning banner if slot is <3 months out: "Limited slots remaining — reserve soon"

**Non-Functional Requirements:**
- Display updates without page reload (Supabase Realtime subscription)
- Fallback if slot not set: "Contact us for availability"

**Success Criteria:**
- Urgency banner shown when slot <3 months increases lead form conversion by >10% (A/B test)

**Out-of-Scope:**
- Per-product slot availability (single global slot in Phase 1)
- Calendar UI showing all future slots

**Six Laws Status:**
- SCHEMA: Requires `site_settings` table (key, value) with key = `next_available_slot`, value = date
- API: Public API route `/api/settings/next-slot` returns date
- UI: Display component on homepage/product pages
- DATA: Real slot date from database
- WIRING: Database → API → UI display
- VERIFICATION: Manual test for display update after admin change

---

### BBH-015: Side-by-Side Product Comparison

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-003 through BBH-007

**User Stories:**
- As a buyer evaluating multiple models, I want to compare specs side-by-side
- As a mobile user, I want to swipe between compared products

**Functional Requirements:**
1. Standalone page `/compare` with product selector (checkboxes for up to 3 products)
2. Comparison table displays: Product image, Model name, Price, Square footage, Standard inclusions (collapsed list), Optional add-ons (collapsed list), Specs (dimensions, weight, electrical, insulation)
3. "Configure This One" button for each product → configurator
4. "Reset Comparison" button clears selection

**Non-Functional Requirements:**
- Mobile: horizontal scroll or swipe between products
- Desktop: fixed table with 3 columns

**Success Criteria:**
- Comparison page usage >10% of product page visitors
- Configurator click-through from comparison >35%

**Out-of-Scope:**
- Custom attribute filtering (e.g., "Show only models with solar")
- Save comparison for later

**Six Laws Status:**
- SCHEMA: Uses existing `products` table
- API: `/api/products/compare?ids=X,Y,Z` returns product data
- UI: Comparison table with product selector
- DATA: Real product data
- WIRING: Product selection → API call → table display
- VERIFICATION: Playwright test for comparison flow

---

### BBH-016: Permit & Zoning Lookup Tool

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a buyer unsure about zoning rules, I want guidance on whether I need a permit
- As a rural land buyer, I want confirmation that unrestricted land is ideal

**Functional Requirements:**
1. Standalone page `/tools/permit-lookup`
2. Input: Zip code (5-digit)
3. Output: County name, link to local zoning authority website, general guidance ("Check with your local building department"), "We recommend purchasing unrestricted land" disclaimer
4. Database of county zoning authority links (seeded for top 50 US metros, fallback for others)
5. Building code exemption disclosure: "Bright Box Homes are classified as temporary buildings and may not require code compliance in many jurisdictions"

**Non-Functional Requirements:**
- Lookup completes in <2 seconds
- Links open in new tab

**Success Criteria:**
- Tool usage >10% of site visitors
- Unrestricted land disclaimer read rate >80%

**Out-of-Scope:**
- Real-time zoning regulation API (manual database of links)
- Permit application assistance

**Six Laws Status:**
- SCHEMA: Requires `zoning_authorities` table (county_name, state, zip_prefix, website_url)
- API: `/api/zoning/lookup?zip=XXXXX` returns county + link
- UI: Lookup form with output display
- DATA: Real county links (seeded)
- WIRING: Zip input → API → county/link display
- VERIFICATION: Unit test for zip-to-county logic, manual test for link validity

---

### BBH-017: Acorn Financing Pre-Qualification Widget

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** INFRA-008 (Acorn partner ID — pending)

**User Stories:**
- As a buyer without cash, I want to see if I pre-qualify for financing
- As a lead form user, I want the financing option presented before submitting

**Functional Requirements:**
1. Acorn partner widget embedded on `/financing` page
2. Inline widget option on product pages (collapsed by default, expands on "Check Financing Options" click)
3. Widget displays: Pre-qualification form (Acorn's UI), estimated monthly payment, approval odds
4. On pre-qualification, user receives Acorn email with next steps
5. Financing mutually exclusive with affiliate commission (per BLUEPRINT.md Section 5.4)

**Non-Functional Requirements:**
- Widget loads in <3 seconds
- Fallback if widget fails: Display phone number (800-259-1745) for manual financing inquiry

**Success Criteria:**
- Widget usage >10% of product page visitors
- Pre-qualification completion rate >50% of widget users
- Conversion from pre-qualified to lead >30%

**Out-of-Scope:**
- In-house financing (Acorn handles all underwriting)
- Multi-lender comparison (Acorn only in Phase 1)

**Six Laws Status:**
- SCHEMA: N/A (Acorn manages application data)
- API: N/A (widget embed only)
- UI: Embed page + inline widget on product pages
- DATA: Application data in Acorn's system
- WIRING: Widget embed loads Acorn's iframe
- VERIFICATION: Manual test for widget load + pre-qualification flow

---

### BBH-018: Spec Sheet PDF Auto-Generator

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer who configured a home, I want a downloadable PDF with all specs
- As a buyer sharing with a partner, I want a professional-looking spec sheet

**Functional Requirements:**
1. "Download Spec Sheet" button in configurator (CFG-001) after selections made
2. On click, Server Action generates PDF with: Bright Box Homes logo/header, product image (configured state thumbnail), model name, total price, all selections (exterior color, roof, floor plan, add-ons), standard inclusions list, specifications table (dimensions, weight, electrical, etc.), contact info footer
3. PDF delivered via direct download OR email (user chooses)
4. Email option: Prompts for email, sends PDF as attachment via Resend

**Non-Functional Requirements:**
- PDF generation completes in <10 seconds
- PDF file size <2MB
- PDF formatted for print (8.5x11", high-resolution images)

**Success Criteria:**
- Spec sheet download rate >20% of configurator completions
- Email delivery success rate >99%

**Out-of-Scope:**
- Multi-language spec sheets (Phase 2)
- Custom branding for affiliates

**Six Laws Status:**
- SCHEMA: N/A (no persistence, generated on-demand)
- API: Server Action `/api/spec-sheet/generate` creates PDF (library: `pdf-lib` or `puppeteer`)
- UI: "Download Spec Sheet" button in configurator
- DATA: Configurator state passed to PDF generator
- WIRING: Button → Server Action → PDF generation → download/email
- VERIFICATION: Manual test for PDF output quality + email delivery

---

### BBH-019: Live Chat

**Priority:** P2 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a buyer with a quick question, I want to chat with sales without calling
- As an admin, I want chat messages routed to my email if offline

**Functional Requirements:**
1. Live chat widget (Crisp.chat OR Tawk.to free tier) embedded on all pages
2. Widget displays: "Chat with us" button (bottom-right corner), chat window on click
3. Messages route to operator's email when offline
4. Auto-response: "Thanks for reaching out! We'll respond within 1 hour."

**Non-Functional Requirements:**
- Widget loads asynchronously (no blocking page load)
- Mobile-friendly chat window

**Success Criteria:**
- Chat usage >5% of site visitors
- Response time <15 minutes during business hours

**Out-of-Scope:**
- AI chatbot (human-only in Phase 1)
- Multi-agent routing

**Six Laws Status:**
- SCHEMA: N/A (chat provider manages messages)
- API: N/A (embed only)
- UI: Widget embed on all pages
- DATA: Chat transcripts in provider's system
- WIRING: Widget embed loads provider's script
- VERIFICATION: Manual test for chat send/receive

---

### BBH-020: Virtual Showroom (360° Walkthrough)

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** CFG-001, source 360° assets

**User Stories:**
- As a buyer who wants to see the interior, I want to walk through a fully configured unit
- As a mobile user, I want to navigate via touch gestures

**Functional Requirements:**
1. Embedded 360° viewer on product pages (below configurator)
2. Pre-rendered 360° interior walkthrough (3-5 rooms: living area, bedroom, bathroom, kitchen, porch)
3. Navigation: Click hotspots to move between rooms, drag to look around
4. Thumbnail map shows current location in floor plan

**Non-Functional Requirements:**
- Initial load <5 seconds
- Touch gestures: drag to look, tap hotspot to move
- High-resolution images (optimized via INFRA-007)

**Success Criteria:**
- Walkthrough usage >30% of product page visitors
- Average time in walkthrough >90 seconds

**Out-of-Scope:**
- VR headset support
- Real-time 3D rendering (pre-rendered only)

**Six Laws Status:**
- SCHEMA: N/A (static assets)
- API: N/A
- UI: 360° viewer component (library: `pannellum` or custom)
- DATA: Pre-rendered 360° image sequences
- WIRING: Viewer loads image assets
- VERIFICATION: Manual test for navigation + hotspots

---

### BBH-021: Blog Infrastructure

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** SEO-001

**User Stories:**
- As SEO content manager, I want to publish blog posts without code changes
- As a reader, I want fast-loading, readable articles

**Functional Requirements:**
1. Blog index page `/blog` listing all posts (paginated, 10 per page)
2. Blog post page `/blog/[slug]` rendering Markdown content
3. Frontmatter in Markdown files: title, date, author, excerpt, featured_image, seo_title, seo_description, keywords[]
4. Code syntax highlighting (library: `prismjs`)
5. Table of contents auto-generated from H2/H3 headers
6. Related posts section (3 posts, same category)
7. Social share buttons (Facebook, Twitter, LinkedIn)

**Non-Functional Requirements:**
- Blog post loads in <2 seconds
- Mobile-optimized reading view (no horizontal scroll)
- Images lazy-loaded

**Success Criteria:**
- Blog traffic >10% of total site traffic
- Average time on post >3 minutes
- Social share rate >5%

**Out-of-Scope:**
- Comments (Phase 1.5)
- Author profiles (single author in Phase 1)

**Six Laws Status:**
- SCHEMA: N/A (Markdown files in repo, no database)
- API: N/A (static site generation)
- UI: Blog index + post template
- DATA: Real blog posts (Markdown files)
- WIRING: Markdown → MDX parser → rendered HTML
- VERIFICATION: Playwright test for blog index + post load

---

### BBH-022: FAQ System

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a buyer with common questions, I want instant answers without contacting sales
- As a search engine crawler, I want structured FAQ markup for rich snippets

**Functional Requirements:**
1. FAQ page `/faq` with 25-40 questions (general + per product line)
2. Accordion UI (click to expand answer)
3. Search bar filters FAQs by keyword
4. Schema.org FAQPage markup for SEO
5. Questions categorized: General, Shipping, Financing, Installation, Warranty, Customization

**Non-Functional Requirements:**
- Search results appear in <1 second
- Accordion expand animation smooth (200ms)

**Success Criteria:**
- FAQ page views >15% of total site visitors
- Search usage >30% of FAQ visitors
- Reduced contact form submissions for answered questions

**Out-of-Scope:**
- AI-powered FAQ search (keyword match only)

**Six Laws Status:**
- SCHEMA: N/A (FAQ data in code or JSON file)
- API: N/A (client-side search)
- UI: FAQ page with accordion + search
- DATA: Real FAQ content
- WIRING: Search input → filter FAQs → display
- VERIFICATION: Playwright test for accordion + search

---

### BBH-023: About / Build Process Page

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a buyer concerned about origin, I want transparency about manufacturing
- As a legal compliance officer, I want FTC country-of-origin disclosure visible

**Functional Requirements:**
1. `/about` page with sections: Our Story, Build Process, Quality Standards, American Owned Badge
2. Build process timeline: Design → Manufacturing → QC → Shipping → Delivery (visual timeline)
3. Country-of-origin disclosure (per LEGAL-005): "Manufactured in China. Imported and distributed by Bright Box Homes LLC."
4. "American Owned. Globally Sourced. US Delivered." badge prominent
5. FAITH Foundation partnership mention + link to BBH-024

**Non-Functional Requirements:**
- Page loads in <2 seconds
- Mobile-optimized timeline (vertical on <768px)

**Success Criteria:**
- About page views >10% of site visitors
- Average time on page >90 seconds

**Out-of-Scope:**
- Factory tour videos (Phase 1.5)

**Six Laws Status:**
- SCHEMA: N/A (static content)
- API: N/A
- UI: About page with sections
- DATA: Static content
- WIRING: N/A
- VERIFICATION: Manual review for legal disclosure presence

---

### BBH-024: FAITH Foundation Landing Page

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a buyer interested in social impact, I want to understand the FAITH Foundation partnership
- As a donor, I want to see how my home purchase contributes

**Functional Requirements:**
1. `/faith-foundation` page explaining: Mission (pathways to homeownership for low-income families), $2,500 donation per home sold, 501(c)(3) status, how funds are used (financial literacy, credit building)
2. "Learn More" link to future FAITH Foundation website (placeholder in Phase 1)
3. Quote from operator on founding purpose

**Non-Functional Requirements:**
- Page loads in <2 seconds

**Success Criteria:**
- Page views >5% of site visitors
- Mentioned in >10% of customer testimonials (social impact appeal)

**Out-of-Scope:**
- FAITH Foundation's own website (separate project)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Landing page
- DATA: Static content
- WIRING: N/A
- VERIFICATION: Manual review

---

### BBH-025: $5K Challenge Page

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a comparison shopper, I want to know if there's a better deal
- As a buyer who found a competitor, I want to claim the $5K rebate

**Functional Requirements:**
1. `/5k-challenge` page explaining: Challenge terms, eligibility (Expandable Container Homes only, US-based competitor, equal/greater value), claim process (submit competitor URL + specs), rebate applied at checkout
2. Claim form: Name, email, competitor URL, competitor specs (textarea), your zip code
3. On submit, creates lead record flagged for manual review
4. Admin reviews claim in ADMIN-002 and approves/denies

**Non-Functional Requirements:**
- Form submission <2 seconds

**Success Criteria:**
- Challenge page views >5% of site visitors
- Claim submissions >1% of challenge page visitors (most won't find competitor)
- Approved claims <5% of submissions (validates value proposition)

**Out-of-Scope:**
- Automated competitor price scraping

**Six Laws Status:**
- SCHEMA: Uses `leads` table with `challenge_claim` boolean + `competitor_url` field
- API: Server Action submits claim
- UI: Challenge page + claim form
- DATA: Real claims in leads table
- WIRING: Form → Server Action → lead record → admin review
- VERIFICATION: Playwright test for form submission

---

### BBH-026: International Coming Soon Waitlist

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a non-US visitor, I want to join a waitlist for international availability
- As operator, I want to gauge international demand before Phase 2 launch

**Functional Requirements:**
1. Banner for non-US visitors (detected via Vercel geolocation headers): "International shipping coming soon. Join the waitlist."
2. Click banner → modal with waitlist form: Name, email, country (dropdown)
3. On submit, creates `international_waitlist` table entry
4. Confirmation message: "Thanks! We'll notify you when we launch in [country]."

**Non-Functional Requirements:**
- Banner auto-hides for US visitors
- Modal dismissible (localStorage flag prevents repeat)

**Success Criteria:**
- Waitlist signups >100 before Phase 2 launch
- Geographic distribution informs Phase 2 market prioritization

**Out-of-Scope:**
- Multi-language waitlist form (English only in Phase 1)

**Six Laws Status:**
- SCHEMA: Requires `international_waitlist` table (id, name, email, country, created_at)
- API: Server Action `/api/waitlist/international` inserts entry
- UI: Banner + modal + form
- DATA: Real waitlist entries
- WIRING: Geolocation detection → banner display → form submit → database insert
- VERIFICATION: Manual test with VPN (non-US IP)

---

## Configurator Package Features

### CFG-001: Configurator Core Engine

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** INFRA-001 (monorepo setup)

**User Stories:**
- As a Bright Box buyer, I want to visually configure my home and see real-time price updates
- As a future configurator package buyer, I want a white-label component I can theme and integrate into my site

**Functional Requirements:**
1. Standalone React component `<Configurator />` exported from `@brightbox/configurator`
2. Props: `config: ProductConfig` (product definition JSON), `theme?: Theme` (visual tokens), `initialSelections?: SelectionState`, `onSelectionChange: (state: SelectionState) => void`, `onSubmit: (state: SelectionState) => void`
3. Internal state management via `useReducer` (no external state library)
4. UI layout: Left panel (option groups), Center panel (product viewer), Right panel (price breakdown + CTA)
5. Option groups rendered dynamically from `config.optionGroups` (single-select radio, multi-select checkboxes)
6. Selection updates trigger: Image layer swap (CFG-004), price recalculation (CFG-008), state emission via `onSelectionChange`
7. "Submit" button triggers `onSubmit` callback with final state
8. Responsive: stacked layout on <768px (viewer top, options middle, price bottom)

**Non-Functional Requirements:**
- Component bundle size <80KB minified+gzipped
- Tree-shakeable ES module exports
- Zero external dependencies except React (peer dependency)
- No network calls inside component (consuming app handles API)
- TypeScript strict mode, all types exported

**Success Criteria:**
- Configurator session completion rate >40% (users who make ≥1 selection and reach submit)
- Average time in configurator 3-5 minutes
- Mobile usage >50% of sessions (responsive design validates)

**Out-of-Scope:**
- Backend integration (consuming app responsibility)
- Authentication (consuming app responsibility)
- Multi-language support inside component (consuming app passes translated config)

**Six Laws Status:**
- SCHEMA: N/A (package has no database)
- API: N/A (package has no backend)
- UI: Full component spec provided
- DATA: Mock config for package tests, real config passed by consuming app
- WIRING: Props → state management → callbacks → consuming app
- VERIFICATION: Vitest unit tests for state management, React Testing Library for UI, Storybook for visual regression

---

### CFG-002: 360° Pre-Rendered Rotation

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer, I want to rotate the product view to see all angles
- As a mobile user, I want to drag with my finger to rotate

**Functional Requirements:**
1. Viewer displays pre-rendered image sequence (24-36 frames covering 0-360°)
2. Mouse drag: calculates drag delta (pixels), maps to angle increment, swaps to frame at new angle
3. Touch drag: same logic for touch events
4. Rotation control buttons: "← Rotate Left" / "Rotate Right →" increment/decrement angle by 15° per click
5. Current angle stored in component state
6. Frame index calculation: `frameIndex = Math.floor((angle / 360) * totalFrames)`
7. Image preloading: loads all frames in background after first frame displays

**Non-Functional Requirements:**
- Drag responsiveness: frame swap <50ms after drag
- Touch gestures: supports swipe velocity for momentum rotation
- Image preloading: all frames loaded within 5 seconds

**Success Criteria:**
- Rotation usage >60% of configurator sessions
- Average rotations per session >5

**Out-of-Scope:**
- Real-time 3D rendering (pre-rendered only per ARCHITECTURE.md)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Viewer component with drag handlers
- DATA: Image URLs from config.rotations
- WIRING: Drag event → angle calculation → frame index → image swap
- VERIFICATION: React Testing Library test for drag simulation, manual test for touch

---

### CFG-003: Interior View Mode

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer, I want to see the interior layout before purchasing
- As a buyer configuring interior finishes, I want to see my selections reflected in the interior view

**Functional Requirements:**
1. View toggle: "Exterior" / "Interior" tabs above viewer
2. On "Interior" select, viewer switches to interior image sequence (separate rotation set from config.rotations where `viewId = 'interior'`)
3. Interior view supports same 360° rotation as exterior (CFG-002)
4. Floor plan overlay option: "Show Floor Plan" checkbox displays SVG floor plan (CFG-005) overlaid on interior view (semi-transparent)

**Non-Functional Requirements:**
- View switch animation: 300ms cross-fade
- Interior image quality matches exterior (high-res, optimized)

**Success Criteria:**
- Interior view usage >50% of configurator sessions
- Average time in interior view >60 seconds

**Out-of-Scope:**
- Room-by-room navigation (single interior view in Phase 1)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: View toggle + interior viewer
- DATA: Interior image URLs from config
- WIRING: Toggle → view state → image set swap
- VERIFICATION: React Testing Library test for toggle

---

### CFG-004: Layered Option Compositing

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer, I want to see add-ons (solar panels, extended porch) appear on the product image when I select them
- As a configurator package buyer (future), I want the layering system to support any product (not just homes)

**Functional Requirements:**
1. Each option in config has optional `layerIds: string[]` (references config.layers)
2. Layers defined in config: `{ id, viewId, imageUrl, zIndex, variantKey? }`
3. Base layer (z-index 0): body image for selected color
4. Overlay layers (z-index 1+): roof, trim, add-ons (transparent PNGs)
5. CSS compositing: `position: absolute`, stacked via z-index
6. Selection update: shows/hides layers based on `layerIds` in selected options
7. Cross-fade transition (200ms) when layers change

**Non-Functional Requirements:**
- Layer swap <100ms
- PNG transparency supported (no white halos)
- Mobile: layers load progressively (base first, overlays after)

**Success Criteria:**
- Add-on selection rate >40% (buyers engaging with customization)
- Layer rendering performance: 60fps during transitions

**Out-of-Scope:**
- Dynamic layer blending modes (multiply, overlay, etc.)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Layer renderer with CSS stacking
- DATA: Layer image URLs from config
- WIRING: Option selection → layer visibility update → CSS display
- VERIFICATION: React Testing Library test for layer rendering

---

### CFG-005: Reactive Floor Plans (Interactive SVG)

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer selecting a floor plan (1BR vs 2BR), I want to see the layout change
- As a buyer hovering over a room, I want to see dimensions

**Functional Requirements:**
1. Floor plan SVG embedded in configurator (separate panel below viewer OR overlay on interior view)
2. Each room in SVG is a `<g>` tag with `data-room-name` and `data-dimensions` attributes
3. Hover highlights room boundary (stroke color change), displays tooltip with room name + dimensions
4. Floor plan swaps based on selected floor plan option (e.g., "1BR" vs "2BR" option triggers different SVG)
5. Click room: zooms to room (optional enhancement, not required for Phase 1)

**Non-Functional Requirements:**
- SVG loads in <1 second
- Hover response <50ms
- Mobile: tap instead of hover

**Success Criteria:**
- Floor plan interaction rate >30% of configurator sessions
- Average hover/tap events per session >3

**Out-of-Scope:**
- Drag-and-drop furniture placement
- Room dimension editing

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: SVG floor plan with hover handlers
- DATA: Floor plan SVGs from config
- WIRING: Floor plan selection → SVG swap, hover → tooltip display
- VERIFICATION: React Testing Library test for SVG rendering + hover

---

### CFG-006: Theme System (White-Label)

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a future configurator package buyer, I want to apply my brand colors without editing component code
- As Bright Box Homes, I want to apply the Warm Modern theme defined in ARCHITECTURE.md

**Functional Requirements:**
1. Theme interface: `{ colors: { primary, secondary, background, text, border, accent }, typography: { fontFamily, fontSize: { small, medium, large } }, spacing: { small, medium, large }, borderRadius, motion: { transitionDuration, easing } }`
2. Default theme: neutral premium (clean grays, sans-serif font)
3. Theme prop overrides defaults: `<Configurator theme={customTheme} />`
4. CSS variables generated from theme: `--cfg-color-primary`, `--cfg-font-family`, etc.
5. All component styles reference CSS variables (not hardcoded colors)

**Non-Functional Requirements:**
- Theme prop updates component instantly (no reload)
- CSS variables scoped to configurator container (no global pollution)

**Success Criteria:**
- Bright Box theme applied successfully (Warm Modern palette)
- Future buyers can retheme in <15 minutes (Phase 3 validation)

**Out-of-Scope:**
- Theme editor UI (buyers edit JSON manually)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Theme system implementation
- DATA: Theme object passed as prop
- WIRING: Theme prop → CSS variables → component styling
- VERIFICATION: Storybook stories for default + custom themes

---

### CFG-007: Configuration State Emission

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As Bright Box web app, I want to capture configurator state to save in lead records
- As a future configurator buyer, I want to handle state changes (analytics, persistence)

**Functional Requirements:**
1. `onSelectionChange` callback fires on every option selection with full current state: `{ [optionGroupId]: selectedValue }`
2. `onSubmit` callback fires when user clicks submit button with final state
3. State shape: `{ "color": "white", "roof": "metal-brown", "size": "20x40", "addons": ["solar-5kw", "porch-extended"] }`
4. State is JSON-serializable (no functions, no DOM references)
5. Parent component receives state and can persist/display/send to API

**Non-Functional Requirements:**
- Callback fires within 50ms of user interaction
- State object size <10KB (reasonable selection count)

**Success Criteria:**
- 100% of configurator sessions emit state correctly (no callback failures)
- Bright Box web app successfully saves state to leads table

**Out-of-Scope:**
- Built-in state persistence (parent handles localStorage/database)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A (internal state management)
- DATA: State emitted via callback
- WIRING: User interaction → state update → callback fires → parent receives state
- VERIFICATION: Unit test for callback invocation, React Testing Library test for state updates

---

### CFG-008: Pricing Engine

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer, I want to see the total price update in real-time as I select options
- As a configurator package buyer (future), I want the pricing engine to support any currency

**Functional Requirements:**
1. Base price from `config.basePrice`
2. Option price adjustments from `config.pricing.optionAdjustments: { [optionId]: number }`
3. Calculation: `totalPrice = basePrice + sum(selected options' price adjustments)`
4. Price display updates on every selection change
5. Currency formatting via `Intl.NumberFormat` using `config.currency` (e.g., USD → $X,XXX.XX)
6. Price breakdown panel: Base price + each add-on with price delta + total

**Non-Functional Requirements:**
- Price calculation <10ms
- Display updates without flicker

**Success Criteria:**
- Price display accuracy 100% (no calculation bugs)
- Price breakdown viewed by >50% of users (transparency builds trust)

**Out-of-Scope:**
- Tax calculation (consuming app responsibility)
- Discount codes (consuming app responsibility)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Price display panel
- DATA: Pricing rules from config
- WIRING: Selection change → price calculation → display update
- VERIFICATION: Unit test for pricing logic (various option combinations)

---

### CFG-009: Mobile Touch Optimization

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** CFG-002

**User Stories:**
- As a mobile user, I want pinch-to-zoom on the product viewer
- As a mobile user, I want swipe gestures to rotate and navigate

**Functional Requirements:**
1. Pinch-to-zoom on viewer (two-finger pinch gesture)
2. Swipe to rotate (horizontal swipe maps to angle change)
3. Tap targets ≥48px for all buttons/options (accessibility guideline)
4. Option panel: vertical scroll (not horizontal overflow)
5. Price panel: sticky at bottom on mobile

**Non-Functional Requirements:**
- Touch response <50ms
- Zoom range: 1x to 3x (prevents over-zoom)
- Swipe velocity: momentum continues rotation after finger lift

**Success Criteria:**
- Mobile session completion rate matches desktop (±5%)
- Mobile gesture usage >60% of mobile sessions

**Out-of-Scope:**
- Multi-touch gestures beyond pinch and swipe

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Touch gesture handlers
- DATA: N/A
- WIRING: Touch events → gesture detection → zoom/rotate
- VERIFICATION: Manual test on mobile devices

---

### CFG-010: Premium Loading Sequence

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** CFG-001

**User Stories:**
- As a buyer, I want a polished loading experience (not blank screen)
- As a configurator package buyer (future), I want branded loading that matches my theme

**Functional Requirements:**
1. Loading skeleton displays before configurator mounts: Left panel (option group skeletons), Center panel (image placeholder with fade-in animation), Right panel (price skeleton)
2. Progressive image loading: Base image loads first (low-res placeholder), then high-res swap
3. Skeleton matches theme colors (theme.colors.background, theme.colors.border)
4. Loading state transitions to configurator in 300ms fade

**Non-Functional Requirements:**
- Skeleton displays within 100ms of page load
- First image frame visible within 2 seconds on 4G

**Success Criteria:**
- Perceived load time <2 seconds (skeleton reduces perceived wait)
- Bounce rate during load <10%

**Out-of-Scope:**
- Animated loading indicators (static skeleton only)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Loading skeleton component
- DATA: N/A
- WIRING: Component mount → skeleton displays → images load → fade to configurator
- VERIFICATION: Manual test for loading sequence

---

## Admin Dashboard Features

### ADMIN-001: Admin Authentication

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** INFRA-002

**User Stories:**
- As operator, I want secure access to the admin dashboard
- As operator, I want to prevent unauthorized access even if someone guesses the `/admin` URL

**Functional Requirements:**
1. Supabase Auth for admin login (email/password)
2. Approved admin email allowlist in `admins` table (id, email, role, created_at)
3. Middleware on `/admin/*` routes checks: Session exists, user email in `admins` table, redirect to `/login` if unauthorized
4. Login page: Email input, password input, "Sign In" button, error display for invalid credentials
5. Logout button in admin dashboard header → clears session → redirects to homepage

**Non-Functional Requirements:**
- Session JWT expires after 24 hours (Supabase default)
- Login attempts rate-limited: 5 attempts per IP per 15 minutes

**Success Criteria:**
- Zero unauthorized access attempts succeed (middleware enforced)
- Login success rate >95% (valid credentials)

**Out-of-Scope:**
- Multi-factor authentication (Phase 1.5)
- Role-based permissions beyond single admin role (Phase 1.5)

**Six Laws Status:**
- SCHEMA: Requires `admins` table (id, email, role, created_at)
- API: Supabase Auth API handles login, middleware checks session
- UI: Login page + logout button
- DATA: Admin email in database
- WIRING: Login form → Supabase Auth → session cookie → middleware check → dashboard access
- VERIFICATION: Manual test for login + unauthorized access attempt

---

### ADMIN-002: Leads Inbox

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001, BBH-008

**User Stories:**
- As operator, I want to see all incoming leads prioritized by temperature (Hot/Warm/Cold)
- As operator, I want to see the configurator state for each lead so I understand what they want

**Functional Requirements:**
1. `/admin/leads` page lists all leads in table: Name, Email, Phone, Intended Use, Timeline, Budget, Temperature (badge: Hot=red, Warm=yellow, Cold=gray), Created Date, Status (dropdown: New, Contacted, Qualified, Quoted, Deposited, Won, Lost)
2. Filters: Temperature (all/hot/warm/cold), Status (all/new/contacted/etc.), Date range, Search (name/email)
3. Click lead row → detail modal: Full contact info, configurator state preview (thumbnail + selections list), notes field (admin can add notes), status update dropdown, "Convert to Order" button (if status=Deposited, creates order record)
4. Configurator state preview: Shows product image with selected options, price breakdown
5. Export to CSV button (exports filtered leads)

**Non-Functional Requirements:**
- Page loads in <2 seconds (even with 1000+ leads)
- Real-time updates when new lead submits (Supabase Realtime subscription)

**Success Criteria:**
- Admin processes >90% of Hot leads within 1 hour
- Lead status update rate >80% (admin keeps statuses current)

**Out-of-Scope:**
- Email integration (Gmail, Outlook) — admin manually follows up
- Automated lead nurture (Phase 1.5)

**Six Laws Status:**
- SCHEMA: Uses `leads` table from BBH-008, adds `status` and `notes` columns
- API: `/api/admin/leads` fetches leads with filters
- UI: Leads table + detail modal + filters
- DATA: Real leads from database
- WIRING: Page load → API fetch → table display, row click → modal with lead details
- VERIFICATION: Playwright test for leads table + detail modal

---

### ADMIN-003: Order Management

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001, BBH-011

**User Stories:**
- As operator, I want to track orders through the 4 payment stages
- As operator, I want to trigger the next stage payment invoice for customers

**Functional Requirements:**
1. `/admin/orders` page lists all orders in table: Order ID, Customer Name, Product, Total Price, Current Stage (1/2/3/4), Stage 1 Paid Date, Stage 2 Paid Date, Stage 3 Paid Date, Stage 4 Paid Date, Status (dropdown: Active, Completed, Cancelled)
2. Click order row → detail page: Customer info, configurator state, payment history (table: Stage, Amount, Paid Date, Stripe Payment Intent ID), stage advancement controls
3. Stage advancement: "Advance to Stage X" button (only shows for next stage), on click: Validates prerequisites (e.g., Stage 2 requires Stage 1 paid), creates Stripe Invoice for Stage X amount, sends invoice to customer via Resend, inserts `payment_stage_history` row with status=pending
4. Upload production photos: File upload widget, photos saved to Supabase Storage, linked to order, visible in customer portal
5. Order notes field: Admin can add internal notes (not visible to customer)

**Non-Functional Requirements:**
- Order list loads in <2 seconds
- Stage advancement completes in <5 seconds (Stripe Invoice creation)

**Success Criteria:**
- Admin advances 100% of orders through stages on schedule
- Payment stage conversion rate: Stage 1→2 >95%, Stage 2→3 >90%, Stage 3→4 >85%

**Out-of-Scope:**
- Automated stage advancement (admin manually triggers)

**Six Laws Status:**
- SCHEMA: Uses `orders` and `payment_stage_history` tables from BBH-011
- API: `/api/admin/orders/[id]/advance-stage` Server Action
- UI: Orders table + detail page + advancement controls
- DATA: Real orders and payment history
- WIRING: Advance button → Server Action → Stripe Invoice → email → database update → customer portal notification
- VERIFICATION: Playwright test for order detail + stage advancement

---

### ADMIN-004: Customer Database

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want a searchable list of all customers with their order history
- As operator, I want to view communication log and documents per customer

**Functional Requirements:**
1. `/admin/customers` page lists all customers: Name, Email, Phone, Orders Count, Total Spend, Last Contact Date, Created Date
2. Search by name/email
3. Click customer row → detail page: Contact info, order history (table: Order ID, Product, Date, Total, Status), communication log (timeline: emails sent, admin notes), uploaded documents (list with download links)
4. "Add Note" button: Opens modal, admin types note, saves to communication log

**Non-Functional Requirements:**
- Page loads in <2 seconds (even with 500+ customers)

**Success Criteria:**
- Admin uses customer database for >50% of support inquiries
- Note addition rate >20% of customer detail views

**Out-of-Scope:**
- CRM automation (tags, segments, email campaigns)

**Six Laws Status:**
- SCHEMA: Uses `customers` table (id, name, email, phone, created_at) + `communication_log` table (id, customer_id, type, content, created_at, created_by_admin_id)
- API: `/api/admin/customers` fetches list, `/api/admin/customers/[id]` fetches detail
- UI: Customers table + detail page + note modal
- DATA: Real customer data
- WIRING: Page load → API fetch → table, row click → detail load
- VERIFICATION: Playwright test for customer list + detail

---

### ADMIN-005: Production Scheduling

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want to set the next available production slot to manage factory capacity
- As operator, I want the public-facing availability display (BBH-014) to update automatically

**Functional Requirements:**
1. `/admin/production` page with: Next available slot date picker, "Update Slot" button, current slot display
2. On update, writes to `site_settings` table (key: `next_available_slot`, value: date)
3. Homepage and product pages (BBH-014) read this value in real-time

**Non-Functional Requirements:**
- Slot update propagates to public pages within 10 seconds (Supabase Realtime)

**Success Criteria:**
- Operator updates slot weekly (capacity management)
- Public slot display matches admin-set value 100% of time

**Out-of-Scope:**
- Per-product slot tracking (single global slot)

**Six Laws Status:**
- SCHEMA: Uses `site_settings` table (key, value, updated_at)
- API: Server Action `/api/admin/settings/update` writes slot
- UI: Date picker + update button
- DATA: Real slot date
- WIRING: Date picker → update button → Server Action → database → Realtime broadcast → public pages update
- VERIFICATION: Manual test for slot update + public display

---

### ADMIN-006: Affiliates Management

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001, INFRA-010 (Rewardful)

**User Stories:**
- As operator, I want to see which affiliates drove sales and commissions owed
- As operator, I want to approve/deny affiliate applications

**Functional Requirements:**
1. `/admin/affiliates` page lists all affiliates: Name, Email, Sales Count, Total Sales $, Commissions Owed, Commissions Paid, Status (Active, Pending, Suspended)
2. Data synced from Rewardful API (no manual entry)
3. Click affiliate row → detail page: Referred leads (table: Lead Name, Order ID, Sale Amount, Commission $, Status), payout history
4. Commission payout triggered automatically by Rewardful when order reaches Stage 4 (operator monitors, does not manually trigger)

**Non-Functional Requirements:**
- Affiliate data syncs from Rewardful daily (cron job)

**Success Criteria:**
- Operator reviews affiliate performance weekly
- Commission payout accuracy 100% (Rewardful-managed)

**Out-of-Scope:**
- Custom commission tiers (Rewardful dashboard handles)

**Six Laws Status:**
- SCHEMA: Uses `affiliates` table (id, rewardful_id, name, email, sales_count, total_sales, commissions_owed, commissions_paid, status, created_at) synced from Rewardful
- API: Cron job fetches Rewardful data, `/api/admin/affiliates` fetches local table
- UI: Affiliates table + detail page
- DATA: Real affiliate data from Rewardful
- WIRING: Cron → Rewardful API → local database → admin UI
- VERIFICATION: Manual test with Rewardful test affiliate

---

### ADMIN-007: Site Content Management

**Priority:** P2 | **Phase:** Phase 1.5 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want to update product prices without code changes
- As operator, I want to swap product photos without developer help

**Functional Requirements:**
1. `/admin/content` page with sections: Products (edit price, description, swap images), Homepage (edit hero headline, featured testimonials), FAQ (add/edit/delete questions)
2. Product editor: Select product → edit fields → save → updates database → public site reflects changes immediately
3. Image upload: Drag-and-drop file upload → image stored in Supabase Storage → URL saved to product record

**Non-Functional Requirements:**
- Content updates propagate to public site within 30 seconds (ISR revalidation)

**Success Criteria:**
- Operator updates content independently >80% of time (no developer involvement)

**Out-of-Scope:**
- Full CMS (WordPress-level features)

**Six Laws Status:**
- SCHEMA: Uses `products` table + `site_settings` table
- API: Server Action `/api/admin/content/update`
- UI: Content editor forms
- DATA: Real product/content data
- WIRING: Form submit → Server Action → database update → ISR revalidate → public site updates
- VERIFICATION: Manual test for content edit + public site refresh

---

### ADMIN-008: Settings and Team Management

**Priority:** P2 | **Phase:** Phase 1.5 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want to invite team members to the admin dashboard
- As operator, I want to configure email templates and notification preferences

**Functional Requirements:**
1. `/admin/settings` page with tabs: Team, Email Templates, Notifications, Tax/Shipping
2. Team tab: List of admins, "Invite Admin" button (sends invite email with signup link)
3. Email Templates tab: Edit Resend templates for lead confirmation, order confirmation, stage reminders
4. Notifications tab: Toggle notifications (new lead, new order, payment received)

**Non-Functional Requirements:**
- Settings updates apply immediately

**Success Criteria:**
- Operator invites ≥1 team member in Phase 1.5
- Email template customization used for brand voice

**Out-of-Scope:**
- Granular role-based permissions (single admin role in Phase 1.5)

**Six Laws Status:**
- SCHEMA: Uses `admins` table, `email_templates` table
- API: Server Actions for invite/update
- UI: Settings page with tabs
- DATA: Real settings data
- WIRING: Form submit → Server Action → database update
- VERIFICATION: Manual test for invite + email template edit

---

### ADMIN-009: Audit Log Viewer

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want to see a forensic log of all admin actions for accountability
- As operator, I want to filter audit log by actor or resource

**Functional Requirements:**
1. `/admin/audit` page lists all audit log entries: Timestamp, Actor (admin name), Action (e.g., "ADVANCE_PAYMENT_STAGE"), Resource Type (e.g., "order"), Resource ID, Before/After State (expandable JSON diff)
2. Filters: Actor (dropdown of admins), Resource Type, Action, Date range
3. Export to CSV button (filtered entries)
4. Click entry row → modal with full before/after state diff (side-by-side JSON)

**Non-Functional Requirements:**
- Page loads in <3 seconds (even with 10K+ entries)
- Indefinite retention (per ARCHITECTURE.md Section 12)

**Success Criteria:**
- Operator reviews audit log monthly for accountability
- Zero unexplained state changes (all actions traceable)

**Out-of-Scope:**
- Automated anomaly detection

**Six Laws Status:**
- SCHEMA: Uses `audit_log` table from ARCHITECTURE.md Section 12
- API: `/api/admin/audit` fetches filtered entries
- UI: Audit log table + detail modal
- DATA: Real audit log entries
- WIRING: Page load → API fetch → table display
- VERIFICATION: Playwright test for audit log load + filter

---

### ADMIN-010: Dashboard Home (Operational)

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** ADMIN-001

**User Stories:**
- As operator, I want an at-a-glance view of today's activity and key metrics
- As operator, I want to spot issues immediately (e.g., unpaid Stage 2 invoices)

**Functional Requirements:**
1. `/admin` dashboard home with widgets: Today's Leads (count + list of Hot leads), Active Orders by Stage (4 cards: Stage 1, 2, 3, 4 with counts), Revenue This Month/Quarter/Year (3 metrics), Outstanding Payments (list of overdue invoices), Open Bookings (count + next 3 upcoming Cal.com bookings), Affiliate Performance (top 3 affiliates by sales)
2. Visual register per GOVERNANCE_BRIEF.md Section 12: Bloomberg/Palantir-style (charcoal background, electric cyan accents, dense info, glass panels)
3. Widgets clickable → deep link to detail pages (e.g., click "Stage 2" card → orders filtered to Stage 2)
4. Real-time updates for leads/orders (Supabase Realtime)

**Non-Functional Requirements:**
- Dashboard loads in <2 seconds
- Widgets update without page reload (Realtime subscriptions)

**Success Criteria:**
- Operator checks dashboard daily (session analytics)
- Operator identifies 100% of urgent issues (unpaid invoices, Hot leads uncontacted)

**Out-of-Scope:**
- Custom dashboard layouts (fixed layout in Phase 1)

**Six Laws Status:**
- SCHEMA: Aggregates data from `leads`, `orders`, `payment_stage_history`, `affiliates` tables
- API: `/api/admin/dashboard` fetches aggregated metrics
- UI: Dashboard home with widgets
- DATA: Real aggregated data
- WIRING: Page load → API fetch → widget display, Realtime → widget updates
- VERIFICATION: Playwright test for dashboard load + widget clicks

---

## Customer Portal Features

### PORTAL-001: Customer Authentication

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** INFRA-002

**User Stories:**
- As a customer, I want to log in to track my order
- As operator, I want customers created automatically when they pay deposit

**Functional Requirements:**
1. Customer account created automatically in Supabase Auth when BBH-011 deposit payment webhook processes (email from Stripe session, password reset link sent via Resend)
2. Login page `/portal/login`: Email input, password input (or "Forgot password?" link), "Sign In" button
3. Middleware on `/portal/*` routes checks: Session exists, user role = customer, redirect to `/portal/login` if unauthorized
4. Logout button in portal header → clears session → redirects to homepage

**Non-Functional Requirements:**
- Session JWT expires after 7 days (customers stay logged in longer than admins)
- Password reset flow: Supabase email with reset link → customer sets new password

**Success Criteria:**
- Customer account creation success rate 100% (automated)
- Login success rate >95%

**Out-of-Scope:**
- Social login (Google, Facebook) — email/password only

**Six Laws Status:**
- SCHEMA: Uses Supabase Auth users table, `customers` table (id, user_id, order_id, email, created_at)
- API: Supabase Auth API handles login, webhook creates account
- UI: Login page + logout button
- DATA: Customer accounts in database
- WIRING: Deposit webhook → create Auth user → send password reset email → customer logs in
- VERIFICATION: Manual test for account creation + login

---

### PORTAL-002: Order Status View

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** PORTAL-001, ADMIN-003

**User Stories:**
- As a customer, I want to see my order status and payment progress
- As a customer, I want to view production photos uploaded by admin

**Functional Requirements:**
1. `/portal/order` page displays: Order summary (product, configured options, total price), payment stage tracker (visual timeline: Stage 1 Paid → Stage 2 Paid → Stage 3 Paid → Stage 4 Paid, highlight current stage), next payment due (amount, due date), production photos gallery (images uploaded by admin in ADMIN-003)
2. Real-time updates when admin advances stage (Supabase Realtime)
3. "View Invoice" links for each paid stage → downloads Stripe invoice PDF

**Non-Functional Requirements:**
- Page loads in <2 seconds
- Photos load progressively (lazy load below fold)

**Success Criteria:**
- Customer checks portal ≥3 times per order lifecycle
- Production photos reduce support inquiries about build status by >30%

**Out-of-Scope:**
- Order modification (customers contact admin for changes)

**Six Laws Status:**
- SCHEMA: Uses `orders`, `payment_stage_history`, `order_photos` (id, order_id, photo_url, uploaded_at) tables
- API: `/api/portal/order` fetches customer's order data
- UI: Order status page with timeline + photo gallery
- DATA: Real order data + photos
- WIRING: Page load → API fetch → display, Realtime → stage update notification
- VERIFICATION: Playwright test for order page load + photo display

---

### PORTAL-003: Document Signing (Pre-Ship Acceptance)

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** PORTAL-001

**User Stories:**
- As a customer, I want to review pre-ship photos and approve shipment
- As operator, I want signed acceptance before releasing Stage 3 payment and shipping

**Functional Requirements:**
1. When admin marks order as "Ready for Pre-Ship Sign-Off" (ADMIN-003), customer receives email notification
2. Customer logs into portal → sees "Pre-Ship Acceptance Required" banner
3. Click banner → `/portal/order/acceptance` page: Pre-ship photos/video gallery, acceptance form ("I confirm this home meets my expectations and authorize shipment"), checkbox "I agree", signature canvas (draw signature with mouse/finger), "Submit" button
4. On submit, stores signature image in Supabase Storage, inserts `order_signatures` row (order_id, type: 'pre_ship_acceptance', signature_url, signed_at), triggers Stage 3 payment release (Stripe Invoice sent), sends confirmation email to customer and admin

**Non-Functional Requirements:**
- Signature canvas smooth on mobile (touch-optimized)
- Signature image <500KB

**Success Criteria:**
- Pre-ship acceptance completion rate >98% (required step)
- Average time from email to sign <24 hours

**Out-of-Scope:**
- Multi-party signatures (buyer + co-buyer)

**Six Laws Status:**
- SCHEMA: Requires `order_signatures` table (id, order_id, type, signature_url, signed_at)
- API: Server Action `/api/portal/order/sign` handles submission
- UI: Acceptance page with photo gallery + signature canvas
- DATA: Real photos + signature
- WIRING: Submit button → Server Action → signature save → Stage 3 invoice trigger → emails
- VERIFICATION: Manual test for signature + submission

---

### PORTAL-004: Invoice and Payment History

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** PORTAL-001

**User Stories:**
- As a customer, I want to see all my invoices and payment dates
- As a customer, I want to pay the next stage invoice directly from the portal

**Functional Requirements:**
1. `/portal/invoices` page lists all invoices: Stage, Amount, Due Date, Paid Date (if paid), Status (Paid, Pending, Overdue), "View Invoice" link (downloads Stripe invoice PDF), "Pay Now" button (if pending)
2. "Pay Now" button triggers Stripe Invoice payment (redirects to Stripe-hosted invoice page)
3. Payment confirmation email sent after payment (Stripe webhook → Resend)

**Non-Functional Requirements:**
- Invoice list loads in <2 seconds
- "Pay Now" redirects to Stripe in <1 second

**Success Criteria:**
- Customer self-service payment rate >80% (minimal admin intervention)
- Payment completion rate >95% for Stages 2-4 (after Stage 1)

**Out-of-Scope:**
- In-portal payment form (Stripe-hosted only)

**Six Laws Status:**
- SCHEMA: Uses `payment_stage_history` table
- API: `/api/portal/invoices` fetches invoices
- UI: Invoices table with pay buttons
- DATA: Real invoice data
- WIRING: "Pay Now" button → redirect to Stripe → payment → webhook → confirmation
- VERIFICATION: Manual test for invoice list + payment

---

### PORTAL-005: Warranty Documentation Download

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** PORTAL-001

**User Stories:**
- As a customer post-delivery, I want to download warranty documents
- As a customer, I want warranty terms readily available for future reference

**Functional Requirements:**
1. `/portal/warranty` page displays: Warranty summary (12-month manufacturer warranty + Bright Box backstop), "Download Warranty PDF" button (downloads pre-generated PDF from Supabase Storage), warranty claim instructions

**Non-Functional Requirements:**
- PDF download initiates immediately on button click

**Success Criteria:**
- Warranty download rate >50% of delivered customers
- Warranty claims submitted with correct documentation >90%

**Out-of-Scope:**
- Online warranty claim form (customers email/call)

**Six Laws Status:**
- SCHEMA: Warranty PDF stored in Supabase Storage (static file, not per-order)
- API: N/A (direct download link)
- UI: Warranty page with download button
- DATA: Pre-generated warranty PDF
- WIRING: Button click → download PDF
- VERIFICATION: Manual test for download

---

## SEO and Content Infrastructure Features

### SEO-001: Core SEO Infrastructure

**Priority:** P0 | **Phase:** Phase 1 | **Dependencies:** BBH-001

**User Stories:**
- As a search engine, I want structured metadata for indexing
- As a user sharing on social, I want rich preview cards

**Functional Requirements:**
1. Meta tags on all pages: `<title>`, `<meta name="description">`, canonical URL, Open Graph tags (og:title, og:description, og:image, og:url), Twitter Cards
2. `sitemap.xml` auto-generated from all public routes (updated on deploy)
3. `robots.txt` allows all crawlers, links to sitemap
4. Schema.org markup: LocalBusiness (homepage), Product (product pages), FAQPage (FAQ), Article (blog posts)
5. Structured data for products: name, description, price, image, availability

**Non-Functional Requirements:**
- Sitemap includes 100% of public pages
- Schema.org markup validates via Google Rich Results Test

**Success Criteria:**
- Google Search Console shows 100% indexing rate within 2 weeks of launch
- Rich snippets appear in search results for products/FAQs

**Out-of-Scope:**
- Multilingual sitemaps (Phase 2)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A (static generation)
- UI: Meta tags in <head> of all pages
- DATA: Static SEO data
- WIRING: Build process generates sitemap
- VERIFICATION: Manual validation via Google Rich Results Test + Search Console submission

---

### SEO-002: State Landing Pages

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** SEO-001

**User Stories:**
- As a buyer searching "container homes Texas", I want to find Bright Box Homes
- As a search engine, I want state-specific pages for geographic relevance

**Functional Requirements:**
1. Landing page template: `/products/[state]` (e.g., `/products/texas`)
2. Page content: H1 "Prefab Homes in [State]", state-specific intro (mentions state regulations, popular cities), product grid (all 5 lines), "Free shipping" callout for Texas, "Check shipping cost" for others
3. Generate pages for all 50 states + top 20 metros (e.g., `/products/austin-tx`)
4. State data file: state name, abbreviation, popular cities, regulation summary

**Non-Functional Requirements:**
- Pages generated at build time (static)
- Each page <50KB HTML

**Success Criteria:**
- State pages rank top 10 for "[state] container homes" within 6 months
- Organic traffic from state pages >20% of total

**Out-of-Scope:**
- Dynamic content per state (static template only)

**Six Laws Status:**
- SCHEMA: N/A (static pages)
- API: N/A
- UI: State landing page template
- DATA: Static state data (JSON file)
- WIRING: Build generates 50+ state pages from template
- VERIFICATION: Manual spot-check 5 state pages

---

### SEO-003: Competitor Comparison Pages

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** SEO-001

**User Stories:**
- As a buyer searching "Bright Box vs Boxabl", I want a comparison
- As operator, I want to control the comparison narrative

**Functional Requirements:**
1. Comparison page template: `/vs/[competitor]` (e.g., `/vs/boxabl`)
2. Page content: H1 "Bright Box Homes vs [Competitor]", comparison table (price, sq ft, customization, payment structure, warranty), "Why Choose Bright Box" section, CTA to configurator
3. Generate pages for: Boxabl, Amazon container homes, Alibaba, MODS, Backcountry Containers

**Non-Functional Requirements:**
- Comparison factually accurate (no false claims)
- Disclaimer: "Prices and features current as of [date], confirm with competitor"

**Success Criteria:**
- Comparison pages rank top 5 for "Bright Box vs [competitor]" within 3 months
- Conversion rate from comparison pages >15%

**Out-of-Scope:**
- Real-time competitor price scraping

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Comparison page template
- DATA: Static competitor data
- WIRING: Build generates comparison pages
- VERIFICATION: Manual review for accuracy

---

### SEO-004: ADU Regulation Pages Per State

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** SEO-001

**User Stories:**
- As ADU buyer, I want to understand my state's ADU regulations
- As search engine user searching "Texas ADU rules", I want Bright Box's guide

**Functional Requirements:**
1. ADU guide template: `/adu-regulations/[state]`
2. Page content: H1 "[State] ADU Regulations", summary (permits required?, setback rules, size limits), links to state/county building departments, "How Bright Box Homes Fit" section (temporary building classification), CTA to configurator
3. Generate pages for all 50 states

**Non-Functional Requirements:**
- Content updated annually (regulations change)

**Success Criteria:**
- ADU pages rank top 10 for "[state] ADU regulations" within 6 months
- ADU pages drive >10% of configurator traffic

**Out-of-Scope:**
- Real-time regulation updates (annual refresh only)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: ADU regulation template
- DATA: Static regulation summaries (JSON)
- WIRING: Build generates 50 ADU pages
- VERIFICATION: Manual spot-check 5 state pages

---

### SEO-005: Financing Calculator Page

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-017

**User Stories:**
- As buyer searching "prefab home financing calculator", I want a tool
- As operator, I want financing page to rank and funnel to Acorn widget

**Functional Requirements:**
1. `/tools/financing-calculator` page with: Loan amount input, interest rate input (default 7.5%), loan term dropdown (12/24/36/48/60 months), monthly payment output, total interest output
2. Calculation: Monthly payment via amortization formula
3. CTA: "Get Pre-Qualified" → Acorn widget (BBH-017)

**Non-Functional Requirements:**
- Real-time calculation (no submit button)

**Success Criteria:**
- Page ranks top 10 for "container home financing" within 6 months
- Acorn widget engagement >25% from calculator page

**Out-of-Scope:**
- Multi-lender comparison

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A (client-side calc)
- UI: Calculator form
- DATA: N/A
- WIRING: Input change → calculation → display
- VERIFICATION: Unit test for calculation

---

### SEO-006: Blog Content Seeding

**Priority:** P1 | **Phase:** Phase 1 | **Dependencies:** BBH-021

**User Stories:**
- As operator, I want evergreen blog content for SEO before launch
- As buyer, I want educational content on ADUs, off-grid living, financing

**Functional Requirements:**
1. Seed 40-50 blog posts (backdated 2x/week over 6 months)
2. Topics: ADU guides (zoning, permits, financing), Off-grid checklists (solar sizing, water systems), Airbnb investment (ROI case studies), Financing 101 (credit requirements, loan types), Unrestricted land guides (where to buy, how to find)
3. Each post: 1000-1500 words, images (product photos, infographics), internal links (product pages, configurator), CTA (configure/consult)

**Non-Functional Requirements:**
- Posts written by operator or outsourced (not AI-generated spam)
- Editing for accuracy and brand voice

**Success Criteria:**
- Blog traffic >15% of total organic traffic within 3 months of launch
- Blog posts rank for long-tail keywords (e.g., "how to buy unrestricted land in Texas")

**Out-of-Scope:**
- Video content (blog posts only)

**Six Laws Status:**
- SCHEMA: N/A (Markdown files)
- API: N/A
- UI: Uses BBH-021 infrastructure
- DATA: 40-50 Markdown blog posts
- WIRING: N/A
- VERIFICATION: Manual review of 10 posts for quality

---

## Legal Pages

### LEGAL-001: Privacy Policy

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As a visitor, I want to understand how my data is used
- As operator, I want GDPR/CCPA compliance

**Functional Requirements:**
1. `/privacy` page with sections: Data collected (contact info, configurator state, cookies), how data is used (order processing, marketing), third-party services (Stripe, Resend, Supabase, analytics), user rights (access, deletion, opt-out), contact for privacy requests
2. GDPR compliance: Right to access, right to deletion, data portability
3. CCPA compliance: Do Not Sell My Personal Information link
4. Cookie consent banner (first visit): "We use cookies for analytics. [Accept] [Decline]"

**Non-Functional Requirements:**
- Attorney review required before launch
- Last updated date displayed

**Success Criteria:**
- Zero privacy complaints
- Cookie consent rate >80%

**Out-of-Scope:**
- GDPR consent management platform (simple banner only)

**Six Laws Status:**
- SCHEMA: N/A (static page)
- API: N/A
- UI: Privacy policy page + cookie banner
- DATA: Static legal text
- WIRING: Cookie banner → localStorage flag
- VERIFICATION: Attorney review

---

### LEGAL-002: Terms of Service

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want clear terms to protect against disputes
- As customer, I want to understand my obligations

**Functional Requirements:**
1. `/terms` page with sections: Acceptance of terms, use of site, payment terms (25/25/25/25), delivery terms, warranties (limited), liability limitations, dispute resolution (arbitration clause), governing law (Texas)
2. Checkbox on lead form and checkout: "I agree to Terms of Service" (required, links to /terms)

**Non-Functional Requirements:**
- Attorney review required before launch

**Success Criteria:**
- Zero disputes over terms ambiguity
- 100% of orders have terms acceptance logged

**Out-of-Scope:**
- International terms variations (US-only Phase 1)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Terms page + checkbox on forms
- DATA: Static legal text
- WIRING: Checkbox required for form submission
- VERIFICATION: Attorney review

---

### LEGAL-003: Custom Order / No Returns Policy

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want customers to understand no returns on custom orders
- As customer, I want to know cancellation terms before ordering

**Functional Requirements:**
1. `/returns-policy` page with: "All homes are custom-configured and cannot be returned", cancellation terms (72-hour window after deposit, 25% cancellation fee), damage-at-delivery exception (full refund if damage documented within 7 days)
2. Link to policy on checkout page (required reading)

**Non-Functional Requirements:**
- Attorney review required

**Success Criteria:**
- <5% cancellation requests (clear terms upfront)
- Zero return disputes

**Out-of-Scope:**
- Partial refunds (all-or-nothing)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Returns policy page
- DATA: Static legal text
- WIRING: N/A
- VERIFICATION: Attorney review

---

### LEGAL-004: Warranty Terms

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As customer, I want to know what's covered under warranty
- As operator, I want clear warranty scope to avoid false expectations

**Functional Requirements:**
1. `/warranty` page with: 12-month manufacturer warranty (structural defects, appliance failures), Bright Box backstop (if manufacturer unreachable, Bright Box handles claim), exclusions (normal wear, customer modifications, improper installation), claim process (email info@brightboxhomes.com with photos, 30-day response)

**Non-Functional Requirements:**
- Attorney review required

**Success Criteria:**
- Warranty claims resolved within 30 days
- <2% warranty claim rate (quality control effective)

**Out-of-Scope:**
- Extended warranty purchase option (Phase 1.5)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Warranty page
- DATA: Static legal text
- WIRING: N/A
- VERIFICATION: Attorney review

---

### LEGAL-005: Country of Origin Disclosure

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As regulator (FTC), I require country-of-origin disclosure per 16 CFR § 323
- As buyer, I have a right to know where the product is manufactured

**Functional Requirements:**
1. Disclosure text on `/about` page and product pages footer: "Manufactured in China. Imported and distributed by Bright Box Homes LLC."
2. FTC-compliant placement (clear and conspicuous)

**Non-Functional Requirements:**
- Visible without scrolling on product pages (footer or banner)

**Success Criteria:**
- Zero FTC violations
- Disclosure visible on 100% of product pages

**Out-of-Scope:**
- Multiple origin countries (single source in Phase 1)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Disclosure text on pages
- DATA: Static text
- WIRING: N/A
- VERIFICATION: Manual review on all product pages

---

### LEGAL-006: Building Code Exemption Disclosure

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want to disclose temporary building classification to avoid code liability
- As buyer, I want to understand zoning implications

**Functional Requirements:**
1. Disclosure on product pages and `/faq`: "Bright Box Homes are classified as temporary buildings and may not require local building code compliance in many jurisdictions. We recommend purchasing unrestricted land. Consult your local building department for placement restrictions."
2. Disclosure on checkout page (checkbox: "I understand this is a temporary building and will check local zoning")

**Non-Functional Requirements:**
- Attorney review required

**Success Criteria:**
- Zero code compliance disputes
- 100% of customers acknowledge disclosure at checkout

**Out-of-Scope:**
- Permit application assistance

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: Disclosure text + checkbox
- DATA: Static text
- WIRING: Checkbox required for checkout
- VERIFICATION: Attorney review

---

## Infrastructure Features

### INFRA-001: Monorepo Scaffold

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As developer, I want a clean monorepo structure per ARCHITECTURE.md Section 2
- As operator, I want the configurator package ready for Phase 3 extraction

**Functional Requirements:**
1. pnpm workspaces configured: `pnpm-workspace.yaml` with `packages: ["apps/*", "packages/*"]`
2. Directory structure: `apps/web/` (Next.js app), `packages/configurator/` (standalone package)
3. Root `package.json` with workspace scripts: `dev`, `build`, `test`, `lint`
4. Shared `tsconfig.base.json` extended by workspace packages
5. `.gitignore` excludes `node_modules`, `.env.local`, `.next`, `dist`

**Non-Functional Requirements:**
- `pnpm install` completes in <60 seconds
- `pnpm dev` starts all workspaces in <10 seconds

**Success Criteria:**
- Monorepo structure matches ARCHITECTURE.md Section 2 exactly
- Configurator package imports in web app: `import { Configurator } from "@brightbox/configurator"`

**Out-of-Scope:**
- Turborepo (pnpm workspaces sufficient for Phase 1)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A
- DATA: N/A
- WIRING: Package imports work across workspaces
- VERIFICATION: `pnpm build` succeeds, configurator imports in web app

---

### INFRA-002: Supabase Project Setup

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As developer, I want a production-ready Supabase project
- As operator, I want RLS policies enforced for security

**Functional Requirements:**
1. Supabase project created: region `us-east-1`, project name "brightbox-homes-prod"
2. Database schema migrations: `leads`, `orders`, `payment_stage_history`, `customers`, `admins`, `audit_log`, `saved_configs`, `international_waitlist`, `site_settings`, `affiliates` tables
3. RLS policies on all tables (per ARCHITECTURE.md Section 6)
4. Service role key stored in Vercel env vars (server-side only)
5. Anon key and URL stored in Vercel env vars (public)

**Non-Functional Requirements:**
- Database connection pooler enabled (6-hour timeout mode)
- Daily backups enabled

**Success Criteria:**
- All migrations applied without error
- RLS policies pass verification script (no unprotected tables)

**Out-of-Scope:**
- Separate staging project (prod only in Phase 1)

**Six Laws Status:**
- SCHEMA: All tables created via migrations
- API: Supabase client connects
- UI: N/A
- DATA: Empty tables ready for data
- WIRING: Env vars configured in Vercel
- VERIFICATION: `supabase db push` succeeds, RLS script passes

---

### INFRA-003: Resend Setup

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want reliable transactional email delivery
- As customer, I want to receive order confirmations promptly

**Functional Requirements:**
1. Resend account created: domain `brightboxhomes.com` verified
2. Email templates created: Lead confirmation, Order confirmation, Stage payment reminders, Pre-ship acceptance notification
3. API key stored in Vercel env vars

**Non-Functional Requirements:**
- Domain SPF/DKIM records configured (email authentication)
- Email delivery success rate >99%

**Success Criteria:**
- Test email sent and received within 10 seconds
- No emails marked as spam (SPF/DKIM valid)

**Out-of-Scope:**
- Email marketing (transactional only)

**Six Laws Status:**
- SCHEMA: N/A (Resend managed)
- API: Resend API tested
- UI: N/A
- DATA: Test emails sent
- WIRING: API key in env, email send tested
- VERIFICATION: Test email received

---

### INFRA-004: Stripe Setup

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want to accept credit card payments securely
- As customer, I want a trusted payment experience

**Functional Requirements:**
1. Stripe account verified: business details submitted, bank account linked
2. Stripe Connect enabled (for Rewardful affiliate payouts)
3. Webhook endpoint `/api/webhooks/stripe` configured in Stripe dashboard
4. API keys stored in Vercel env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Test mode and live mode keys both configured

**Non-Functional Requirements:**
- Webhook signature validation mandatory (per ARCHITECTURE.md Section 8.3)
- PCI compliance (Stripe-hosted checkout, no card data touches Bright Box servers)

**Success Criteria:**
- Test payment with Stripe test card succeeds
- Webhook delivers event within 5 seconds

**Out-of-Scope:**
- Stripe Terminal (in-person payments)

**Six Laws Status:**
- SCHEMA: N/A (Stripe managed)
- API: Stripe API tested, webhook route created
- UI: N/A
- DATA: Test payment data
- WIRING: Env vars configured, webhook tested
- VERIFICATION: Test payment + webhook receipt

---

### INFRA-005: GitHub Actions CI

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As developer, I want CI to catch errors before merge
- As operator, I want confidence that main branch is always green

**Functional Requirements:**
1. `.github/workflows/verify.yml` workflow: Runs on PR and push to main
2. Jobs: Install deps (`pnpm install --frozen-lockfile`), Type check (`pnpm tsc --noEmit`), Lint (`pnpm lint`), Unit tests (`pnpm test`), Encoding check (BOM detection script), Schema drift check (compare local schema to Supabase), Contract enforcement (auth pattern, audit attribution scripts)
3. PR merge blocked if CI fails (branch protection rule)

**Non-Functional Requirements:**
- CI runs complete in <5 minutes

**Success Criteria:**
- CI passes on 100% of main branch commits
- CI catches >90% of errors before merge

**Out-of-Scope:**
- E2E tests in CI (run locally, too slow for every PR)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A
- DATA: N/A
- WIRING: GitHub Actions triggers on push/PR
- VERIFICATION: Push commit, verify CI runs and passes

---

### INFRA-006: Husky + lint-staged Pre-commit

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As developer, I want to catch errors before committing
- As operator, I want consistent code quality

**Functional Requirements:**
1. Husky installed: `.husky/pre-commit` hook runs `pnpm lint-staged`
2. lint-staged config: Runs `eslint --fix` on `*.ts`, `*.tsx`, runs `prettier --write` on `*.ts`, `*.tsx`, `*.md`
3. Commit blocked if lint errors remain after auto-fix

**Non-Functional Requirements:**
- Pre-commit hook runs in <10 seconds (staged files only)

**Success Criteria:**
- Zero linting errors reach CI (caught pre-commit)
- Developer experience smooth (auto-fix, not disruptive)

**Out-of-Scope:**
- Full verify:fast in pre-commit (too slow, run in CI)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A
- DATA: N/A
- WIRING: Git hook configured
- VERIFICATION: Make commit with lint error, verify blocked

---

### INFRA-007: Image Optimization Pipeline

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As developer, I want product images optimized automatically
- As user, I want fast image loading

**Functional Requirements:**
1. Build script `scripts/process-images.js`: Reads `product-assets/` directory, processes all images via `sharp` library, generates AVIF/WebP/JPG at resolutions 640w, 1024w, 1920w, 2560w, outputs to `public/images/`, writes `image-manifest.json` (mapping SKU+view → URLs)
2. Next.js `next.config.js` includes prebuild hook: `"prebuild": "node scripts/process-images.js"`

**Non-Functional Requirements:**
- Image processing completes in <2 minutes (for ~100 source images)
- Output images 70% smaller than source (compression)

**Success Criteria:**
- All product pages load images in <2 seconds on 4G
- Lighthouse Performance score ≥95 (images not bottleneck)

**Out-of-Scope:**
- Real-time image processing (build-time only)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A (images consumed by components)
- DATA: Processed images in `public/images/`
- WIRING: Build script generates images, manifest imported by components
- VERIFICATION: Run build, verify images generated + manifest correct

---

### INFRA-008: Acorn Integration

**Priority:** P1 | **Phase:** Phase 1

**User Stories:**
- As operator, I want financing options for buyers
- As buyer, I want to pre-qualify without leaving the site

**Functional Requirements:**
1. Operator obtains Acorn partner ID (external step, pending)
2. Acorn widget embed code added to `/financing` page and product pages
3. Partner ID stored in env var: `ACORN_PARTNER_ID`

**Non-Functional Requirements:**
- Widget loads in <3 seconds

**Success Criteria:**
- Widget loads successfully on financing page
- Pre-qualification submissions >10% of financing page visitors

**Out-of-Scope:**
- Acorn API integration (widget embed sufficient)

**Six Laws Status:**
- SCHEMA: N/A (Acorn managed)
- API: N/A (embed only)
- UI: Widget embed on pages
- DATA: Application data in Acorn's system
- WIRING: Env var configured, widget embedded
- VERIFICATION: Manual test for widget load

---

### INFRA-009: Cal.com Account Setup

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want a booking calendar for consultations
- As buyer, I want to book a time that fits my schedule

**Functional Requirements:**
1. Operator creates Cal.com hosted account (external step during scaffold)
2. Event type created: "30-Minute Home Consultation"
3. Embed username and event slug stored in env vars: `NEXT_PUBLIC_CALCOM_USER`, `NEXT_PUBLIC_CALCOM_EVENT`

**Non-Functional Requirements:**
- Account setup completes in <15 minutes

**Success Criteria:**
- Booking embed loads on `/book-consultation` page
- First test booking successfully added to operator's calendar

**Out-of-Scope:**
- Self-hosted Cal.com (hosted account sufficient)

**Six Laws Status:**
- SCHEMA: N/A (Cal.com managed)
- API: N/A (embed only)
- UI: Embed on booking page
- DATA: Booking data in Cal.com
- WIRING: Env vars configured, embed tested
- VERIFICATION: Manual test booking

---

### INFRA-010: Rewardful Integration

**Priority:** P1 | **Phase:** Phase 1

**User Stories:**
- As operator, I want to track affiliate referrals automatically
- As affiliate, I want my commissions paid via Stripe Connect

**Functional Requirements:**
1. Rewardful account created (free under $7.5K MRR)
2. Tracking script added to site `<head>` (client-side cookie setting)
3. Server-side API calls on order completion to confirm conversion
4. API key stored in env var: `REWARDFUL_API_KEY`

**Non-Functional Requirements:**
- Tracking cookie set within 1 second of page load

**Success Criteria:**
- Test affiliate referral tracked successfully
- Commission calculated correctly in Rewardful dashboard

**Out-of-Scope:**
- Custom affiliate dashboard (Rewardful provides)

**Six Laws Status:**
- SCHEMA: `leads.affiliate_id` column
- API: Rewardful API called on order completion
- UI: Tracking script in <head>
- DATA: Affiliate attribution data in Rewardful
- WIRING: Script loads, API calls tested
- VERIFICATION: Manual test with test affiliate link

---

### INFRA-011: Analytics Stack

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want to track site traffic and conversions
- As marketer, I want to understand user behavior

**Functional Requirements:**
1. Google Analytics 4: Tag installed in `<head>`, property ID stored in env var: `NEXT_PUBLIC_GA_ID`
2. Microsoft Clarity: Tag installed, project ID stored in env var: `NEXT_PUBLIC_CLARITY_ID`
3. Vercel Analytics: `@vercel/analytics` package installed, auto-configured
4. Meta Pixel: Tag installed (dormant), only fires if `NEXT_PUBLIC_META_PIXEL_ID` is set

**Non-Functional Requirements:**
- Analytics scripts load asynchronously (no blocking)

**Success Criteria:**
- GA4 shows traffic within 24 hours of launch
- Clarity records sessions within 24 hours

**Out-of-Scope:**
- Custom analytics events (Phase 1.5)

**Six Laws Status:**
- SCHEMA: N/A (analytics providers managed)
- API: N/A
- UI: Tags in <head>
- DATA: Analytics data in providers' dashboards
- WIRING: Env vars configured, tags tested
- VERIFICATION: Manual verification via GA4 real-time report

---

### INFRA-012: Domain Configuration

**Priority:** P0 | **Phase:** Phase 1

**User Stories:**
- As operator, I want brightboxhomes.com pointing to Vercel
- As user, I want a professional domain (not vercel.app)

**Functional Requirements:**
1. GoDaddy DNS updated: nameservers point to Vercel (ns1.vercel-dns.com, ns2.vercel-dns.com)
2. Vercel project configured: Custom domain `brightboxhomes.com` added, SSL certificate auto-provisioned
3. Redirects configured: `www.brightboxhomes.com` → `brightboxhomes.com`, `http://` → `https://`

**Non-Functional Requirements:**
- SSL certificate provisioned within 1 hour of DNS update
- DNS propagation within 24 hours

**Success Criteria:**
- brightboxhomes.com loads Vercel-hosted site
- SSL valid (no browser warnings)

**Out-of-Scope:**
- Subdomain configuration (e.g., blog.brightboxhomes.com)

**Six Laws Status:**
- SCHEMA: N/A
- API: N/A
- UI: N/A
- DATA: N/A
- WIRING: DNS configured, Vercel project settings updated
- VERIFICATION: Load brightboxhomes.com in browser, verify SSL

---

## Unrestricted Land Organization Features (Phase 2/3)

| Feature ID | Feature Name | Priority | Phase |
|---|---|---|---|
| LAND-001 | Unrestricted Land State/County Directory | P2 | Phase 2 |
| LAND-002 | County GIS/Assessor Link Database | P2 | Phase 2 |
| LAND-003 | Land Listing Affiliate Integration | P3 | Phase 3 |
| LAND-004 | "How to Verify Unrestricted Land" Guide | P2 | Phase 2 |

---

END OF PRD.md
