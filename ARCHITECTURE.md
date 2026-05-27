# BRIGHT BOX HOMES â€” ARCHITECTURE

## 1. System Overview

High-level system topology showing data flow from browser to backend services:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   Browser   â”‚ (Customer/Admin/Public)
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”˜
       â”‚ HTTPS
       â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Vercel Edge Network                                       â”‚
â”‚  - Edge Middleware (auth check, rate limiting, geo)        â”‚
â”‚  - Edge Functions (geolocation header injection)           â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Next.js 14 App Router (Vercel hosting)                    â”‚
â”‚  - Server Components (data fetch + HTML render)            â”‚
â”‚  - Client Components (interactivity only)                  â”‚
â”‚  - Server Actions (form handlers, mutations)               â”‚
â”‚  - API Routes (/api/*)                                     â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Supabase Postgres (primary data store)
       â”‚       â”œâ”€ leads, orders, customers, admins
       â”‚       â”œâ”€ payment_stage_history, audit_log
       â”‚       â”œâ”€ regional_pricing, image_manifest
       â”‚       â””â”€ RLS policies enforce access control
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Supabase Auth (JWT session management)
       â”‚       â”œâ”€ admin role authentication
       â”‚       â””â”€ customer role authentication
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Supabase Storage (file uploads)
       â”‚       â”œâ”€ customer permit documents
       â”‚       â”œâ”€ factory photos (pre-ship approval)
       â”‚       â””â”€ admin-uploaded assets
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Resend (transactional email)
       â”‚       â”œâ”€ Lead confirmations
       â”‚       â”œâ”€ Order receipts
       â”‚       â”œâ”€ Payment reminders
       â”‚       â””â”€ Nurture sequences (Phase 1.5)
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Stripe (payments + webhook receiver)
       â”‚       â”œâ”€ Checkout Sessions (deposit payments)
       â”‚       â”œâ”€ Payment Intents (stage payments)
       â”‚       â”œâ”€ Connect (affiliate payouts via Rewardful)
       â”‚       â””â”€ Webhooks â†’ /api/webhooks/stripe
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Cal.com (consultation booking)
       â”‚       â””â”€ Embed iframe OR SDK integration
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Rewardful (affiliate tracking)
       â”‚       â”œâ”€ Client-side tracking script
       â”‚       â””â”€ Server-side commission API
       â”‚
       â”œâ”€â”€â”€â”€â”€â†’ Acorn Finance (buyer financing widget)
       â”‚       â””â”€ Iframe embed (partner ID pending)
       â”‚
       â””â”€â”€â”€â”€â”€â†’ Frankfurter.app (Phase 2 â€” exchange rates)
               â””â”€ Daily rate fetch, edge-cached
```

**Data Flow Direction:**
- Browser â†’ Vercel Edge: HTTPS requests
- Vercel Edge â†’ Next.js: Authenticated + rate-limited requests
- Next.js â†’ Supabase: SQL queries via connection pool
- Next.js â†’ External services: HTTPS API calls
- Stripe â†’ Next.js: Webhook POST to /api/webhooks/stripe
- Supabase Realtime â†’ Browser: WebSocket for live order updates

---

## 2. Hosting Topology

**Domain Registration:**
- Domain: `brightboxhomes.com`
- Registrar: GoDaddy
- DNS: Vercel-managed nameservers (configured during production deploy)

**Production Hosting:**
- Primary host: Vercel (Next.js App Router deployment)
- Deploy source: GitHub `main` branch (auto-deploy on push)
- Edge network: Vercel global edge (automatic)
- Server region: `us-east-1` (closest to Texas operations)

**Preview Deployments:**
- Vercel auto-deploys every PR branch
- Preview URL format: `<branch-name>-brightbox-homes.vercel.app`
- Preview environment uses separate Supabase project (dev/staging) â€” NOT production data

**Database Hosting:**
- Service: Supabase Cloud (managed Postgres 15+)
- Region: `us-east-1` (lowest latency to Texas, broad US East Coast coverage)
- Project: production project created in upcoming session
- Connection pooling: Supabase Pooler (6-hour timeout mode for serverless)
- Backup: automatic daily snapshots via Supabase

**External Service Hosting:**
- **Resend:** SaaS (transactional email delivery)
- **Stripe:** SaaS (payment processing, hosted checkout pages)
- **Cal.com:** Self-hosted free tier OR hosted Cal.com account â€” decision pending operator input
- **Rewardful:** SaaS (Stripe-native affiliate tracking, free under $7.5K MRR)
- **Acorn Finance:** SaaS (iframe widget embed, partner ID pending)

**Analytics & Monitoring:**
- Google Analytics 4 (GA4)
- Google Search Console
- Microsoft Clarity (session recording + heatmaps)
- Vercel Analytics (built-in Web Vitals)
- Meta Pixel (dormant â€” fires only if `NEXT_PUBLIC_META_PIXEL_ID` set)

**Exchange Rates (Phase 2):**
- Service: Frankfurter.app (free public API, no key required)
- Cache: Edge-cached daily rate fetch

**Geolocation:**
- Service: Vercel Edge geolocation headers (automatic, no config)
- Headers: `x-vercel-ip-country`, `x-vercel-ip-city`, `x-vercel-ip-timezone`

---

## 3. Application Architecture

**Framework:** Next.js 14 App Router

**Directory Structure:**
```
app/
  (marketing)/          # Public marketing pages
    page.tsx            # Homepage
    about/
    products/
    configure/
    blog/
    faith-foundation/
  admin/                # Protected admin dashboard
    layout.tsx          # Admin shell with auth check
    dashboard/
    leads/
    orders/
  portal/               # Protected customer portal
    layout.tsx          # Customer shell with auth check
    my-order/
    documents/
  api/                  # API routes
    leads/
    webhooks/
      stripe/
lib/                    # Shared utilities
  supabase/
  stripe/
  auth/
  logger.ts
components/             # React components
  marketing/
  admin/
  customer/
  ui/                   # Reusable UI primitives
```

**Rendering Strategy by Route Type:**

| Route Pattern | Rendering Strategy | Revalidation | Auth Required |
|---|---|---|---|
| `/`, `/about`, `/products/*` | Static + ISR | 1 hour | No |
| `/blog/*` | Static + ISR | 1 hour | No |
| `/configure/*` | Client Component | N/A (CSR) | No |
| `/admin/*` | Server Component | No cache | Yes (admin) |
| `/portal/*` | Server Component | No cache | Yes (customer) |
| `/api/leads` | Server Action | N/A | No (rate-limited) |
| `/api/webhooks/stripe` | API Route | N/A | No (webhook signature) |

**Client vs Server Component Rules:**
- **Server Components (default):** All routes start as Server Components. Data fetched server-side. HTML streamed to client.
- **Client Components (`"use client"`):** Used ONLY for:
  - Configurator state management (image swaps, real-time price updates)
  - Form inputs with local validation
  - Modals, dropdowns, interactive widgets
  - Scroll animations, parallax effects
- **NEVER use Client Components for initial data fetch on protected routes** (per BEHAVIORAL_CONTRACTS.md Contract: Server-Component Data Fetch). Server-side data fetch â†’ pass as props â†’ Client Component renders with initial data.

**TypeScript Configuration:**
- Strict mode: `"strict": true`
- No `any`: `"noImplicitAny": true`
- Explicit returns: `"noImplicitReturns": true`
- All functions typed, all API contracts typed via shared types in `lib/types.ts`

---

## 4. Authentication and Authorization Model

**Identity Provider:** Supabase Auth

**User Roles:**
Two distinct role enums with separate table storage:

1. **Admin Role** (`admins` table)
   - Access: `/admin/*` routes
   - Permissions: full CRUD on leads, orders, customers, content
   - Master admin override: operational constraints (quotas, limits) can be bypassed
   - Constitutional constraints: lockout prevention (cannot demote last admin), audit log integrity (cannot delete audit records)

2. **Customer Role** (`customers` table)
   - Access: `/portal/*` routes
   - Permissions: read own order, upload documents, view payment history, sign forms
   - No cross-customer visibility (enforced by RLS policies)

**Public Routes:**
- `/`, `/products/*`, `/about`, `/blog/*`, `/configure/*`, `/faith-foundation`, `/contact`
- No authentication required
- Rate-limited via Vercel Edge Middleware (10 req/min per IP for lead submission)

**Protected Route Enforcement:**
- Middleware checks JWT session cookie on `/admin/*` and `/portal/*` requests
- Redirect to `/login` if unauthenticated
- Middleware code in `middleware.ts`:
  ```typescript
  export async function middleware(req: NextRequest) {
    const { supabase, response } = createMiddlewareClient({ req })
    const { data: { session } } = await supabase.auth.getSession()

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session || session.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    if (req.nextUrl.pathname.startsWith('/portal')) {
      if (!session || session.user.role !== 'customer') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    return response
  }
  ```

**Row-Level Security (RLS):**
- Every Supabase table has explicit RLS policies â€” no exceptions
- Exceptions documented in `SCHEMA_REGISTRY.md` with justification
- Standard policies:
  - `admins` table: admin users can SELECT all rows; only master admin can INSERT/UPDATE/DELETE
  - `customers` table: customers can SELECT own row only
  - `orders` table: customers can SELECT own orders; admins can SELECT all
  - `leads` table: no client-side access (server-side only via service role key)
  - `audit_log` table: append-only for all; SELECT for admins only

**Permission Check Helper:**
Per BEHAVIORAL_CONTRACTS.md Contract: Authorization Pattern Uniformity, single canonical helper:
```typescript
// lib/auth/permissions.ts
export async function requirePermission(
  userId: string,
  action: 'read' | 'write' | 'delete',
  resourceType: string,
  resourceId?: string
): Promise<boolean>
```

All protected routes call this helper â€” no inline permission logic.

**Master Admin Override Semantics:**
Per GOVERNANCE_BRIEF.md Section 10:
- Operational constraints (quotas, radius limits, per-role caps) can be bypassed by master admin
- Constitutional constraints are absolute for ALL roles including master admin:
  - Lockout prevention (cannot demote last master admin)
  - Cannot revoke own role
  - Cannot delete audit log records
  - Cannot bypass anti-spam/anti-abuse protections
  - Cannot violate legal compliance gates (TCPA, GDPR, CAN-SPAM)

---

## 5. Data Flow Patterns

### Public Lead Capture Flow

```
Browser form submission
  â†“
Next.js Server Action (/app/api/leads/route.ts)
  â†“
Validate input (Zod schema)
  â†“
Insert into `leads` table (Supabase)
  â”œâ”€ configurator state JSON serialized to `configuration` JSONB column
  â”œâ”€ affiliate_id from Rewardful cookie (if present)
  â””â”€ lead_temperature scored (Hot/Warm/Cold) based on budget + timeline
  â†“
Trigger Resend email to info@brightboxhomes.com (admin notification)
  â†“
Trigger Resend auto-response to lead email (confirmation)
  â†“
Return success state to browser
  â†“
Optionally redirect to:
  - Cal.com booking embed (if user selected "Book Consultation")
  - Stripe Checkout (if user clicked "Reserve with Deposit")
```

### Configurator State Flow

```
User selection in client component (exterior color, roof, add-ons)
  â†“
Update local React state (useState hook)
  â†“
Image swap via pre-rendered asset lookup
  - Base body image (CSS z-index 0)
  - Roof overlay PNG (z-index 1)
  - Trim overlay PNG (z-index 2)
  - Add-on overlays (z-index 3+)
  â†“
Real-time price calculation (base_price + addon_prices)
  â†“
On form submit:
  - Serialize full configurator state to JSON
  - Include in lead record: { sku, exterior_color, roof_color, floor_plan, addons: [...], total_price }
  â†“
Admin dashboard renders configurator state replay
  - Reads `leads.configuration` JSONB column
  - Reconstructs image layers + price breakdown for sales context
```

### Deposit Payment Flow

```
User clicks "Reserve with Deposit" on configurator
  â†“
Next.js Server Action creates Stripe Checkout Session
  - line_items: [{ price_data: { unit_amount: total * 0.25 }, quantity: 1 }]
  - metadata: { lead_id, product_sku, configuration_json }
  - success_url: /portal/order-confirmed?session_id={CHECKOUT_SESSION_ID}
  - cancel_url: /configure/<product>
  â†“
Redirect browser to Stripe-hosted checkout page
  â†“
User completes payment (Stripe handles card processing)
  â†“
Stripe webhook fires POST to /api/webhooks/stripe
  â†“
Webhook handler validates signature (STRIPE_WEBHOOK_SECRET)
  â†“
On checkout.session.completed event:
  - Extract lead_id from session.metadata
  - Create `orders` row (status: payment_stage_1_complete)
  - Insert `payment_stage_history` row (stage: 1, amount: session.amount_total, stripe_payment_intent_id)
  - Update `leads.converted_to_order_id`
  â†“
Trigger Resend confirmation email to customer
  â†“
Trigger Resend admin notification to info@brightboxhomes.com
  â†“
Customer portal shows "Order Placed" milestone
```

### Order Lifecycle Flow

```
Admin advances order through payment stages via dashboard action
  â†“
Server Action validates stage transition (1â†’2â†’3â†’4 only, no skipping)
  â†“
Create Stripe Invoice for next stage payment
  - Stage 2 (25%): production start
  - Stage 3 (25%): pre-ship sign-off
  - Stage 4 (25%): pre-delivery (ACH/wire only, 2% discount available)
  â†“
Insert `payment_stage_history` row with timestamp + amount + stripe_invoice_id
  â†“
Update `orders.current_payment_stage`
  â†“
Trigger Resend payment reminder email to customer
  â†“
Customer portal notification (Supabase Realtime subscription updates UI)
  â†“
On payment received:
  - Stripe webhook fires (invoice.paid event)
  - Mark stage complete
  - If stage 4 complete: set order status to awaiting_delivery
```

### Affiliate Attribution Flow

```
Visitor arrives via Rewardful tracking link (e.g., ?via=affiliate123)
  â†“
Rewardful client-side script sets cookie (rw_affiliate_id=affiliate123)
  â†“
On lead submission:
  - Read rw_affiliate_id cookie
  - Insert into `leads.affiliate_id` column
  â†“
On Stripe Checkout Session creation:
  - Include affiliate_id in session.metadata
  â†“
On checkout.session.completed webhook:
  - Rewardful API confirms attribution via server-side call
  - POST https://api.getrewardful.com/v1/conversions
  - Body: { affiliate_id, amount, order_id }
  â†“
On order_completed status (stage 4 payment clears):
  - Rewardful initiates commission payout via Stripe Connect
  - Affiliate receives payout according to tier ($1K-$5K based on sale price)
```

---

## 6. External Service Integration Points

### Supabase (Database + Auth + Storage)

**Purpose:** Primary backend (Postgres database, JWT auth, file storage)

**Integration Method:**
- SDK: `@supabase/ssr` (Server Components + Server Actions)
- Client: `@supabase/supabase-js` (Client Components â€” limited to public reads only)

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` â€” Supabase project URL (public, safe in browser)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` â€” Anon key with RLS enforcement (public, safe in browser)
- `SUPABASE_SERVICE_ROLE_KEY` â€” Bypass RLS key (server-side only, NEVER exposed to client)

**Failure Mode Handling:**
- Transient errors (network timeout, connection pool exhausted): retry with exponential backoff (3 attempts max)
- Schema errors (missing column, constraint violation): structured error code `DATABASE_ERROR`, log to audit, return user-facing message
- RLS policy violation: structured error code `PERMISSION_DENIED`, log actor + resource, return 403

---

### Resend (Transactional Email)

**Purpose:** All transactional emails (lead confirmations, order receipts, payment reminders, nurture sequences)

**Integration Method:**
- SDK: `resend` npm package
- API: HTTPS POST to `https://api.resend.com/emails`

**Environment Variables:**
- `RESEND_API_KEY` â€” Resend API key (server-side only)

**Email Templates:**
- Stored as React Email components in `emails/` directory
- Compiled to HTML via `@react-email/render`

**Failure Mode Handling:**
- Rate limit exceeded (429): queue retry after 60 seconds, alert admin via fallback (direct Supabase insert to `admin_alerts` table)
- Invalid email address (400): log to audit, mark lead as `email_invalid`, do not retry
- Service outage (5xx): queue retry with exponential backoff, alert admin after 3 failed attempts

---

### Stripe (Payment Processing)

**Purpose:** Deposit payments, stage payments, affiliate payouts via Stripe Connect

**Integration Method:**
- SDK: `stripe` npm package
- Checkout: Redirect to Stripe-hosted checkout page (no custom payment form)
- Webhook: POST receiver at `/api/webhooks/stripe`

**Environment Variables:**
- `STRIPE_SECRET_KEY` â€” Stripe API secret key (server-side only)
- `STRIPE_WEBHOOK_SECRET` â€” Webhook signature verification secret (server-side only)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` â€” Publishable key (public, safe in browser)

**Webhook Events Handled:**
- `checkout.session.completed` â€” Deposit payment received, create order
- `invoice.paid` â€” Stage payment received, advance order
- `payment_intent.succeeded` â€” Payment confirmed, update payment_stage_history
- `charge.refunded` â€” Refund issued, log to audit, alert admin

**Failure Mode Handling:**
- Webhook signature verification failure: reject request with 400, log to audit (potential attack)
- Payment failed (card declined): return structured error code `PAYMENT_FAILED`, display Stripe error message to user
- Idempotency: all webhook handlers check `payment_stage_history.stripe_payment_intent_id` for duplicate processing prevention

---

### Cal.com (Consultation Booking)

**Purpose:** Embed calendar for consultation booking

**Integration Method:**
- Option A: Self-hosted free tier (Docker container on separate VPS)
- Option B: Hosted Cal.com account (paid tier)
- Embed: Iframe OR `@calcom/embed-react` SDK
- **Decision pending operator input**

**Environment Variables:**
- `NEXT_PUBLIC_CALCOM_USER` â€” Cal.com username
- `NEXT_PUBLIC_CALCOM_EVENT` â€” Event slug (e.g., `30min-consultation`)

**Failure Mode Handling:**
- Iframe load failure (network timeout): display fallback contact form with manual booking request
- No slots available: display message "All slots booked. Email info@brightboxhomes.com for availability."

---

### Rewardful (Affiliate Tracking)

**Purpose:** Track affiliate referrals, manage commission payouts via Stripe Connect

**Integration Method:**
- Client-side: Tracking script in `<head>` (automatic cookie setting)
- Server-side: API calls to confirm conversions and trigger payouts

**Environment Variables:**
- `REWARDFUL_API_KEY` â€” API key for server-side conversion tracking (server-side only)
- `NEXT_PUBLIC_REWARDFUL_KEY` â€” Public key for client-side tracking script (public, safe in browser)

**Failure Mode Handling:**
- Tracking script blocked by ad blocker: affiliate attribution fails silently, order proceeds without commission
- API failure on conversion confirmation: queue retry, alert admin if 3 attempts fail (affiliate misses commission)

---

### Acorn Finance (Buyer Financing Widget)

**Purpose:** Buyer pre-qualification for financing (zero-down loans)

**Integration Method:**
- Iframe embed on `/financing` page
- Partner ID pending operator acquisition

**Environment Variables:**
- `ACORN_PARTNER_ID` â€” Acorn partner ID (public, safe in browser)

**Failure Mode Handling:**
- Iframe load failure: display fallback message "Financing temporarily unavailable. Call 800-259-1745 for financing options."

---

### Google Analytics 4 (GA4)

**Purpose:** Page view tracking, conversion tracking

**Integration Method:**
- Google Tag via `next/script`

**Environment Variables:**
- `NEXT_PUBLIC_GA_ID` â€” GA4 measurement ID

---

### Microsoft Clarity

**Purpose:** Session recording, heatmaps, user behavior analytics

**Integration Method:**
- Clarity tag via `next/script`

**Environment Variables:**
- `NEXT_PUBLIC_CLARITY_ID` â€” Clarity project ID

---

### Meta Pixel (Dormant)

**Purpose:** Facebook/Instagram ad conversion tracking (dormant in Phase 1, activated when ads launch)

**Integration Method:**
- Pixel code via `next/script`, fires only if `NEXT_PUBLIC_META_PIXEL_ID` is set

**Environment Variables:**
- `NEXT_PUBLIC_META_PIXEL_ID` â€” Meta Pixel ID (optional, dormant by default)

---

### Vercel Analytics

**Purpose:** Web Vitals monitoring (LCP, FID, CLS, TTFB)

**Integration Method:**
- Built-in via `@vercel/analytics/react` (no config required)

---

### Frankfurter.app (Phase 2 â€” Exchange Rates)

**Purpose:** Daily exchange rate fetch for multi-currency pricing display

**Integration Method:**
- Public API: `https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,CAD,AUD,MXN,BRL`
- No API key required
- Edge-cached response (24-hour TTL)

**Failure Mode Handling:**
- API unavailable: fallback to last cached rate, display "(rates updated [date])" disclaimer

---

## 7. Image Pipeline Architecture

### Source Assets

**Location:** `product-assets/<product-line>/`
- Example: `product-assets/shipping-containers/20x40/`
- Format: Original PNG/JPG at full resolution (4000Ã—3000px or higher)
- Naming convention: `<sku>-<view>-<variant>.png`
  - Example: `20x40-exterior-front-tan-body.png`, `20x40-roof-brown.png`, `20x40-trim-white.png`

### Build-Time Processing

**Tool:** `sharp` npm library

**Script:** `scripts/process-images.js` (runs at build time via `package.json` prebuild hook)

**Processing Steps:**
1. Read all source images from `product-assets/`
2. For each source image, generate:
   - AVIF format (best compression, modern browser support)
   - WebP format (good compression, wide browser support)
   - JPG fallback (legacy browser support)
3. For each format, generate multiple resolutions:
   - Mobile: 640w, 768w
   - Tablet: 1024w, 1280w
   - Desktop: 1920w, 2560w
   - Retina: 3840w (2Ã— desktop)
4. Output to `public/images/<product>/<sku>-<view>-<size>.<format>`
   - Example: `public/images/shipping-containers/20x40-exterior-front-tan-body-1920w.avif`

### Image Manifest

**File:** `public/images/image-manifest.json`

**Structure:**
```json
{
  "shipping-containers": {
    "20x40": {
      "exterior-front": {
        "tan-body": {
          "avif": { "640w": "/images/...", "768w": "/images/...", ... },
          "webp": { "640w": "/images/...", "768w": "/images/...", ... },
          "jpg": { "640w": "/images/...", "768w": "/images/...", ... }
        },
        "roof-brown": { ... },
        "trim-white": { ... }
      }
    }
  }
}
```

**Generation:** Build script writes manifest after processing all images.

**Consumption:** TypeScript config object imports manifest:
```typescript
import imageManifest from '@/public/images/image-manifest.json'
export const getImageUrls = (product: string, sku: string, view: string, variant: string) => {
  return imageManifest[product][sku][view][variant]
}
```

### Configurator Rendering

**Layer Compositing Strategy:**
- Base body image: CSS `position: absolute; z-index: 0;`
- Roof overlay: `z-index: 1;` (transparent PNG with roof only)
- Trim overlay: `z-index: 2;` (transparent PNG with trim only)
- Add-on overlays: `z-index: 3+` (solar panels, extended porch, etc.)

**React Component:**
```tsx
<div className="relative">
  <img src={getImageUrls('shipping-containers', '20x40', 'exterior-front', 'tan-body').avif['1920w']}
       className="absolute z-0" />
  <img src={getImageUrls('shipping-containers', '20x40', 'exterior-front', 'roof-brown').avif['1920w']}
       className="absolute z-1" />
  <img src={getImageUrls('shipping-containers', '20x40', 'exterior-front', 'trim-white').avif['1920w']}
       className="absolute z-2" />
</div>
```

**Optimization:** 5 base colors Ã— 3 roof treatments Ã— 4 trim options = 12 layered images covering 60 logical combinations (appears infinite to buyer, minimal asset count).

### 360Â° Rotation

**Pre-Rendered Sequence:**
- 24-36 images per product variant per color
- Naming convention: `<sku>-<color>-rotation-<angle>.png` (angle: 0Â°, 15Â°, 30Â°, ..., 345Â°)
- Stored in `public/images/<product>/<sku>/rotation/`

**Interaction:**
- Mouse drag: calculate drag delta â†’ map to angle increment â†’ swap image
- Rotation control buttons: click left/right â†’ increment/decrement angle â†’ swap image

**React Component:**
```tsx
const [rotationAngle, setRotationAngle] = useState(0)
const imageSrc = `/images/shipping-containers/20x40/rotation/20x40-tan-${rotationAngle}.avif`
```

### Floor Plans

**Format:** SVG (scalable, interactive)

**Interactivity:**
- Each room is a `<g>` tag with `data-room-name` and `data-dimensions` attributes
- Hover highlights room boundary, displays dimensions tooltip
- Click drills down to room detail view (Phase 1.5)

**Swap on Config Change:**
- User selects 1BR vs 2BR floor plan â†’ swap SVG source
- React state: `floorPlan: '1br' | '2br'`
- Conditional render: `<FloorPlanSVG variant={floorPlan} />`

---

## 8. Internationalization Architecture (Phase 2 dormant in Phase 1)

**Framework:** `next-intl`

**Locale Routing:**
- `/en` (default, US English)
- `/es` (Spanish)
- `/pt-br` (Portuguese-BR)
- `/fr` (French)
- `/de` (German)

**Translation Storage:**
- Files: `messages/<locale>.json` (committed to repo)
- Example: `messages/en.json`, `messages/es.json`
- Structure:
  ```json
  {
    "HomePage": {
      "hero": {
        "title": "Prefab Homes Delivered",
        "subtitle": "...",
        "cta": "Design Your Home"
      }
    },
    "ProductPage": { ... }
  }
  ```

**Translation Pipeline:**
- Phase 1: Only `messages/en.json` populated
- Phase 2: Operator provides translated JSON via professional translator OR DeepL API batch translate
- All translations committed to repo (no runtime translation API calls)

**Geographic Detection:**
- Vercel Edge Geolocation headers: `x-vercel-ip-country`
- Middleware reads country code â†’ maps to locale:
  ```typescript
  const countryToLocale: Record<string, string> = {
    US: 'en', CA: 'en', GB: 'en',
    MX: 'es', ES: 'es', AR: 'es',
    BR: 'pt-br',
    FR: 'fr', BE: 'fr',
    DE: 'de', AT: 'de', CH: 'de'
  }
  ```
- Redirect to locale-prefixed route if not already on correct locale
- User can manually override via locale selector dropdown

**Currency Display:**
- Frankfurter.app daily rate fetch â†’ cached at edge â†’ applied to product prices for display only
- Example: $45,995 USD â†’ â‚¬42,350 EUR (display), but Stripe charges in EUR via Presentment Currencies
- Currency symbol rendered via Intl.NumberFormat:
  ```typescript
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
  ```

**Stripe Presentment Currencies:**
- Checkout Session `currency` parameter set based on visitor locale
- Stripe handles currency conversion at current rate
- Customer charged in local currency, Bright Box Homes receives USD settlement

**Regional Pricing Engine:**
- Database table: `regional_pricing` (country_code, price_multiplier)
- Example: US = 1.0, CA = 1.15 (tariffs + shipping), MX = 0.95 (competitive advantage)
- Lookup at SSR time: base price Ã— regional multiplier = displayed price

**Phase 1 State:**
- All internationalization framework built but dormant
- Only `messages/en.json` exists, other locale files are empty stubs
- `regional_pricing` table has single row: `{ country_code: 'US', price_multiplier: 1.0 }`
- No locale routing active (all routes render English)

**Phase 2 Activation:**
- Operator provides translated `messages/<locale>.json` files
- Populate `regional_pricing` table with non-US multipliers
- Enable locale routing in middleware
- Deploy tariff-advantage marketing banners for non-US visitors

---

## 9. Verification and Testing Architecture

### Unit Tests

**Framework:** Vitest

**Location:** Colocated with source files (`*.test.ts` adjacent to `*.ts`)

**Coverage Target:** 80% for business logic (lib/*, app/api/*)

**Test Environment:**
- `vi.stubEnv()` for environment variables (never real production secrets)
- Mock external services (Stripe, Resend, Supabase) via `vi.mock()`

**Example:**
```typescript
// lib/pricing.test.ts
import { describe, it, expect, vi } from 'vitest'
import { calculateOrderTotal } from './pricing'

describe('calculateOrderTotal', () => {
  it('calculates base price + addons', () => {
    const config = { sku: '20x40', addons: ['solar-5kw', 'upgraded-countertops'] }
    const total = calculateOrderTotal(config)
    expect(total).toBe(59995 + 8000 + 2500)
  })
})
```

### E2E Tests

**Framework:** Playwright

**Location:** `/tests/e2e/`

**Test Scenarios:**
1. Public lead capture flow (form submission â†’ email sent â†’ success page)
2. Configurator interaction (select options â†’ price updates â†’ save build)
3. Stripe checkout flow (deposit payment â†’ webhook â†’ order created)
4. Admin login â†’ lead list â†’ view lead details
5. Customer login â†’ view order â†’ upload document

**Test Environment:**
- Separate Supabase project (`supabase-staging`)
- Stripe test mode
- Real Resend sandbox environment

**CI Execution:**
- GitHub Actions runs Playwright in headless mode on every PR
- Screenshots + video recordings on failure

### Verification Chains

**verify:fast (pre-commit hook via Husky):**
1. TypeScript compilation: `tsc --noEmit`
2. Unit tests: `vitest run`
3. Linting: `eslint . --max-warnings 0`
4. Encoding check: `node scripts/check-encoding.js` (scans for BOM bytes, replacement characters)
5. Governance lint: `node scripts/governance-lint.js` (forbidden language patterns, time estimates)
6. Schema drift check: `node scripts/check-schema-drift.js` (compares local schema to Supabase production)
7. Contract enforcement: `node scripts/check-contracts.js` (authorization pattern uniformity, audit attribution)

**verify:full (CI via GitHub Actions):**
1. All steps from `verify:fast`
2. Playwright E2E tests: `playwright test`
3. CI parity simulation: `SKIP_ENV_LOCAL=1 vitest run` (tests run without .env.local, simulating CI environment)
4. Coverage threshold check: `vitest run --coverage --coverage.lines=80`
5. Bundle size check: `node scripts/check-bundle-size.js` (fail if >500KB main bundle)

### Pre-Commit Hook

**Tool:** Husky + lint-staged

**Configuration (.husky/pre-commit):**
```bash
#!/bin/sh
pnpm run verify:fast
```

**Staged Files Only:**
- lint-staged runs ESLint + Prettier only on `git add`-ed files
- Full verify:fast runs on all files

### CI Pipeline

**Tool:** GitHub Actions

**Workflow (.github/workflows/verify.yml):**
```yaml
name: Verify
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install --frozen-lockfile
      - run: pnpm run verify:full
```

**Deploy Gate:**
- Vercel deploys only if CI green (GitHub Actions status check required before merge to `main`)

---

## 10. Audit Logging Architecture

### Table Schema

**Table:** `audit_log`

**Columns:**
- `id` (UUID, primary key)
- `timestamp` (timestamptz, default `now()`)
- `actor_user_id` (UUID, references `admins.id` OR `customers.id`)
- `actor_role` (enum: `admin`, `customer`, `system`)
- `action` (text, e.g., `lead.created`, `order.stage_advanced`, `document.uploaded`)
- `resource_type` (text, e.g., `lead`, `order`, `payment`)
- `resource_id` (UUID, references primary resource table)
- `before_state` (JSONB, nullable â€” state before mutation)
- `after_state` (JSONB, nullable â€” state after mutation)
- `ip_address` (text)
- `user_agent` (text)

**RLS Policies:**
- INSERT: All authenticated users (admins + customers + system) can append
- SELECT: Admins only
- UPDATE/DELETE: None (append-only table, constitutional constraint)

### Logging Contract

Per BEHAVIORAL_CONTRACTS.md Contract: Audit Attribution Mandate:
- Every state mutation writes an audit row
- No silent mutations
- `before_state` and `after_state` capture full resource state as JSONB

**Example:**
```typescript
// lib/audit.ts
export async function logAudit(params: {
  actorUserId: string
  actorRole: 'admin' | 'customer' | 'system'
  action: string
  resourceType: string
  resourceId: string
  beforeState?: object
  afterState?: object
  ipAddress: string
  userAgent: string
}) {
  await supabase.from('audit_log').insert({
    actor_user_id: params.actorUserId,
    actor_role: params.actorRole,
    action: params.action,
    resource_type: params.resourceType,
    resource_id: params.resourceId,
    before_state: params.beforeState,
    after_state: params.afterState,
    ip_address: params.ipAddress,
    user_agent: params.userAgent
  })
}
```

**Usage in Server Actions:**
```typescript
export async function advanceOrderStage(orderId: string, newStage: number) {
  const order = await getOrder(orderId)
  await updateOrderStage(orderId, newStage)
  const updatedOrder = await getOrder(orderId)

  await logAudit({
    actorUserId: currentUser.id,
    actorRole: 'admin',
    action: 'order.stage_advanced',
    resourceType: 'order',
    resourceId: orderId,
    beforeState: order,
    afterState: updatedOrder,
    ipAddress: req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent']
  })
}
```

### Audit Log Retention

**Policy:** Indefinite retention for legal compliance

**Justification:**
- FTC regulations (country of origin disclosure disputes)
- State lemon laws (construction defect claims, 10-year statute in some states)
- Payment disputes (Stripe chargeback window + extended litigation)
- Tax audits (IRS 7-year retention requirement)

### Admin Dashboard Audit View

**Filters:**
- By actor (user ID or role)
- By resource (type + ID)
- By action (e.g., all `order.stage_advanced` events)
- By date range

**Display:**
- Table view: timestamp, actor, action, resource
- Drill-down: click row â†’ modal shows `before_state` and `after_state` diff

---

## 11. Error Handling Architecture

### Structured Error Code Taxonomy

Per BEHAVIORAL_CONTRACTS.md Contract: Structured Error Code Taxonomy:
- All API routes return structured error objects
- No generic "Failed" / "Unauthorized" fallback strings

**Standard Error Codes:**
- `AUTH_REQUIRED` â€” User not authenticated
- `PERMISSION_DENIED` â€” User lacks permission for action
- `VALIDATION_FAILED` â€” Input validation failed (Zod schema error)
- `RESOURCE_NOT_FOUND` â€” Requested resource does not exist
- `QUOTA_EXCEEDED` â€” Rate limit or per-role cap exceeded
- `EXTERNAL_SERVICE_FAILURE` â€” Stripe, Resend, or other external service failed
- `RATE_LIMITED` â€” Too many requests from IP
- `PAYMENT_FAILED` â€” Stripe payment declined
- `CONFIGURATION_INVALID` â€” Configurator state invalid (missing required selections)
- `STAGE_TRANSITION_INVALID` â€” Order stage transition not allowed (e.g., skip from 1â†’3)

**Error Response Format:**
```typescript
{
  error: {
    code: 'VALIDATION_FAILED',
    message: 'Email address is required',
    details?: {
      field: 'email',
      constraint: 'required'
    }
  }
}
```

### Frontend Error Display

**Client Component Catch Block:**
```typescript
try {
  await submitLead(formData)
} catch (error) {
  if (error instanceof Error) {
    setError(error.message)  // Display actual API error message
  } else {
    setError('Network error. Please try again.')
  }
}
```

**Forbidden Pattern:**
```typescript
// NEVER do this (generic fallback string)
catch (error) {
  setError('Unauthorized')  // Masks real error
}
```

### Server-Side Error Logging

**Structured Logger:**
```typescript
// lib/logger.ts
export function logError(params: {
  code: string
  message: string
  actor?: string
  resource?: string
  stack?: string
}) {
  console.error(JSON.stringify({
    level: 'error',
    timestamp: new Date().toISOString(),
    code: params.code,
    message: params.message,
    actor: params.actor,
    resource: params.resource,
    stack: params.stack
  }))
}
```

**Usage in API Routes:**
```typescript
export async function POST(req: Request) {
  try {
    // ... business logic
  } catch (error) {
    logError({
      code: 'EXTERNAL_SERVICE_FAILURE',
      message: error instanceof Error ? error.message : 'Unknown error',
      actor: currentUser?.id,
      resource: 'leads',
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json({
      error: {
        code: 'EXTERNAL_SERVICE_FAILURE',
        message: 'Unable to submit lead. Please try again.'
      }
    }, { status: 500 })
  }
}
```

---

## 12. Performance Architecture

### Target Metrics

**Lighthouse Scores (Production):**
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1
- TTFB (Time to First Byte): <600ms

### Image Optimization

**Strategy:** Pre-rendered responsive images (not `next/image` alone)

**Build Pipeline:**
- Source images â†’ sharp processing â†’ AVIF + WebP + JPG
- Multiple resolutions per format (640w, 768w, 1024w, 1280w, 1920w, 2560w, 3840w)
- Image manifest JSON with all URLs

**Delivery:**
- `<picture>` element with `<source>` tags for AVIF, WebP, JPG fallback
- `srcset` with multiple resolutions + `sizes` attribute
- Lazy loading via `loading="lazy"` (native browser support)

**Example:**
```tsx
<picture>
  <source type="image/avif" srcSet="..." sizes="..." />
  <source type="image/webp" srcSet="..." sizes="..." />
  <img src="..." alt="..." loading="lazy" />
</picture>
```

### Critical CSS

**Tool:** Tailwind CSS with JIT mode

**Purge:** Only used utility classes ship to production (automatic in Next.js build)

**Inline Critical CSS:** First paint styles inlined in `<head>`, rest loaded async

### JS Bundle Optimization

**Next.js App Router:**
- Automatic code splitting per route
- Server Components ship zero JS to client (HTML only)
- Client Components bundled separately, lazy-loaded on route navigation

**Bundle Size Target:**
- Main bundle: <500KB (gzipped)
- Route bundles: <100KB each (gzipped)

**Verification:**
- `node scripts/check-bundle-size.js` fails CI if exceeded

### Server Component Rendering

**Data Fetch:**
- All initial data fetched server-side in Server Components
- Supabase query executes on Vercel server â†’ HTML streamed to browser
- No client-side fetch on mount (avoids cookie propagation race conditions per Contract: Server-Component Data Fetch)

**Streaming:**
- React Suspense boundaries for progressive rendering
- Above-the-fold content renders first, below-the-fold streams in

### Caching Strategy

**Vercel Edge Cache:**
- Static pages: cached indefinitely, revalidated on deploy
- ISR pages: `revalidate: 3600` (1 hour TTL)
- Dynamic pages (`/admin/*`, `/portal/*`): no cache

**Supabase Query Cache:**
- Read-heavy queries (product catalog, blog posts): cached via Supabase Pooler connection cache
- Write operations invalidate cache via timestamp trigger

**Resend Rate Limit:**
- Max 10 emails/second (Resend limit)
- Queue emails via Vercel Edge Middleware if burst exceeds limit

### Database Query Optimization

**Indexes:**
- All foreign keys indexed (automatic in Postgres)
- Composite indexes on common query patterns documented in `SCHEMA_REGISTRY.md`
- Example: `CREATE INDEX idx_leads_created_temp ON leads(created_at, lead_temperature)`

**Query Patterns:**
- Avoid N+1 queries via batch fetch
- Use `SELECT` column list (not `SELECT *`)
- RLS policies use indexed columns for filter conditions

---

## 13. Security Architecture

### Transport Security

**HTTPS:**
- Enforced via Vercel automatic redirect (HTTP â†’ HTTPS)
- HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains`

**CSP (Content Security Policy):**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://js.stripe.com https://cdn.rewardful.com https://www.googletagmanager.com;
  frame-src https://checkout.stripe.com https://cal.com;
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline';
```

### CSRF Protection

**Next.js Server Actions:**
- Built-in CSRF token validation (automatic, no config required)
- Token embedded in form, verified on submission

### Webhook Security

**Stripe Webhook Signature Verification:**
```typescript
const sig = req.headers['stripe-signature']
const event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
// Proceed only if signature valid, otherwise reject with 400
```

**Mandatory:** Reject all webhooks without valid signature (prevents replay attacks, spoofed webhooks)

### Row-Level Security (RLS)

**Supabase RLS Policies:**
- Every table has explicit policies
- No table without RLS (exceptions documented in `SCHEMA_REGISTRY.md` with justification)

**Example Policies:**
```sql
-- admins table: admins can SELECT all, only master admin can INSERT/UPDATE/DELETE
CREATE POLICY admins_select_all ON admins FOR SELECT USING (auth.role() = 'admin');
CREATE POLICY admins_write_master_only ON admins FOR ALL USING (auth.uid() = master_admin_id);

-- orders table: customers can SELECT own orders, admins can SELECT all
CREATE POLICY orders_customer_own ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY orders_admin_all ON orders FOR SELECT USING (auth.role() = 'admin');

-- audit_log table: append-only for all, SELECT for admins only
CREATE POLICY audit_log_insert_all ON audit_log FOR INSERT WITH CHECK (true);
CREATE POLICY audit_log_select_admin ON audit_log FOR SELECT USING (auth.role() = 'admin');
```

### Service Role Key Protection

**SUPABASE_SERVICE_ROLE_KEY:**
- Bypasses RLS â€” extremely sensitive
- Used ONLY in server-side code (Server Actions, API Routes)
- NEVER exposed to client (not in `NEXT_PUBLIC_*` variables)
- Rotated before production launch per GOVERNANCE_BRIEF.md Section 10

### Rate Limiting

**Public Lead Submission:**
- Vercel Edge Middleware enforces 10 requests/minute per IP
- Implementation:
  ```typescript
  // middleware.ts
  import { Ratelimit } from '@upstash/ratelimit'
  const ratelimit = new Ratelimit({ /* config */ })

  if (req.nextUrl.pathname === '/api/leads') {
    const { success } = await ratelimit.limit(req.ip)
    if (!success) {
      return NextResponse.json({ error: { code: 'RATE_LIMITED', message: 'Too many requests' } }, { status: 429 })
    }
  }
  ```

### Honeypot Field

**Public Forms:**
- Hidden field `website_url` (display: none)
- Legitimate users never fill it (invisible)
- Bots auto-fill all fields â†’ reject submission silently

**Implementation:**
```tsx
<input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />
```

**Server-side validation:**
```typescript
if (formData.website_url) {
  // Honeypot triggered, reject silently
  return { success: true }  // Fake success to avoid bot detection
}
```

### Email Verification

**Customer Portal Sign-Up:**
- Supabase Auth email verification flow (automatic)
- User receives email with verification link
- Portal access granted only after email verified

---

## 14. Observability Architecture

### Structured Logging

**Logger:** `lib/logger.ts`

**Format:** JSON (Vercel log aggregation-friendly)

**Log Levels:**
- `info` â€” Normal operation events (route entry, external service calls)
- `warn` â€” Recoverable errors (retry succeeded, degraded service)
- `error` â€” Failures requiring attention (external service down, payment failed)

**Logger Implementation:**
```typescript
export function logInfo(message: string, context?: object) {
  console.log(JSON.stringify({ level: 'info', timestamp: new Date().toISOString(), message, ...context }))
}

export function logError(message: string, context?: object) {
  console.error(JSON.stringify({ level: 'error', timestamp: new Date().toISOString(), message, ...context }))
}
```

### API Route Logging

**Every API route logs entry + exit:**
```typescript
export async function POST(req: Request) {
  const start = Date.now()
  logInfo('API route entry', { route: '/api/leads', method: 'POST' })

  try {
    // ... business logic
    const duration = Date.now() - start
    logInfo('API route exit', { route: '/api/leads', method: 'POST', duration, status: 200 })
    return NextResponse.json({ success: true })
  } catch (error) {
    const duration = Date.now() - start
    logError('API route error', { route: '/api/leads', method: 'POST', duration, error: error.message })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Failed' } }, { status: 500 })
  }
}
```

### External Service Call Logging

**Every external service call logs request + response duration:**
```typescript
export async function sendEmail(params: EmailParams) {
  const start = Date.now()
  logInfo('Resend API call', { service: 'resend', action: 'send_email', to: params.to })

  try {
    const response = await resend.emails.send(params)
    const duration = Date.now() - start
    logInfo('Resend API success', { service: 'resend', action: 'send_email', duration, emailId: response.id })
    return response
  } catch (error) {
    const duration = Date.now() - start
    logError('Resend API failure', { service: 'resend', action: 'send_email', duration, error: error.message })
    throw error
  }
}
```

### Error Tracking (Deferred)

**Sentry:**
- Deferred until traffic warrants (Phase 1.5 or Phase 2)
- Vercel logs sufficient for Phase 1 (low traffic, manual log review)
- Integration via `@sentry/nextjs` when activated

### Uptime Monitoring (Deferred)

**Service:** TBD (options: UptimeRobot, Pingdom, Checkly)

**Deferred until:** Phase 1.5

**Justification:** Pre-launch traffic does not warrant uptime alerting; Vercel status page sufficient for Phase 1

---

## 15. Architectural Decisions Locked

Per BEHAVIORAL_CONTRACTS.md Contract: Architectural Decision Durability, the following decisions are locked and may not change without explicit operator directive:

1. **Next.js App Router (not Pages Router)**
   - Locked: 2026-05-27
   - Reason: Server Components required for server-side auth check without cookie race conditions

2. **Supabase as primary backend**
   - Locked: 2026-05-27
   - Reason: Postgres + Auth + Storage + Realtime in one service, no vendor lock-in (open-source Postgres)

3. **TypeScript strict mode**
   - Locked: 2026-05-27
   - Reason: Eliminate entire classes of runtime errors at compile time

4. **Tailwind CSS**
   - Locked: 2026-05-27
   - Reason: Utility-first, JIT purge ensures minimal CSS shipped to production

5. **pnpm package manager**
   - Locked: 2026-05-27
   - Reason: Faster installs, strict dependency resolution, disk-efficient

6. **25/25/25/25 payment structure**
   - Locked: 2026-05-27
   - Reason: Buyer-friendly staged payments differentiate from competitors (50/50 or 60/40), improve conversion

7. **Multi-language framework built but dormant in Phase 1**
   - Locked: 2026-05-27
   - Reason: Avoid mid-build redesign when Phase 2 launches; build once, activate later

8. **In-app admin CRM (no third-party SaaS)**
   - Locked: 2026-05-27
   - Reason: No monthly HubSpot/Salesforce fees, full data ownership, custom workflows

9. **Layered image-swap configurator (no 3D engine)**
   - Locked: 2026-05-27
   - Reason: 3D engine adds complexity, load time, and browser compatibility issues; layered images sufficient for product tier

10. **Rewardful for affiliate tracking**
    - Locked: 2026-05-27
    - Reason: Stripe-native integration, free under $7.5K MRR, no custom affiliate dashboard build required

---

## 16. Architectural Decisions Pending

The following decisions require operator input before Phase 1 build proceeds:

1. **Cal.com self-hosted vs hosted account**
   - Options: (A) Self-hosted free tier (Docker container on separate VPS), (B) Hosted Cal.com paid tier
   - Impact: Self-hosted = $0/month but requires VPS + maintenance; Hosted = ~$12/month, zero maintenance
   - Required by: Before consultation booking feature build
   - Operator input needed: Select option A or B

2. **Stripe Connect setup for Rewardful affiliate payouts**
   - Required: Stripe Connect account (allows platform to pay affiliates via Stripe)
   - Setup: Operator completes Stripe Connect onboarding (KYC, bank account)
   - Required by: Before affiliate program launch
   - Operator input needed: Complete Stripe Connect onboarding

3. **Acorn partner ID acquisition**
   - Required: Partner ID from Acorn Finance for widget embed
   - Setup: Operator applies to Acorn partner program
   - Required by: Before financing page build
   - Operator input needed: Apply and obtain partner ID

4. **Manufacturer marketing usage rights confirmation**
   - Issue: Product images provided by Chinese manufacturers may have usage restrictions
   - Required: Email confirmation from each manufacturer granting marketing usage rights
   - Impact: Cannot use manufacturer-provided images until rights confirmed
   - Pending: Operator email to manufacturers requesting written confirmation
   - Fallback: Operator-taken photos or commissioned photography if rights denied

5. **GitHub Actions runners**
   - Current default: `ubuntu-latest` (sufficient for Phase 1)
   - Decision: No action needed unless build time exceeds 10 minutes (then consider self-hosted runners)

---

END OF ARCHITECTURE.md