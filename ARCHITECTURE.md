# ARCHITECTURE.md
## System Architecture Lock — Bright Box Homes

This document defines the complete technical architecture for Bright Box Homes. It is locked per Contract: Architectural Decision Durability and serves as the authoritative source for all architectural decisions. Any changes require explicit operator override.

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              BROWSER (Client)                            │
│  Next.js Client Components + Configurator Package + Interactive Forms    │
└─────────────────────────────────────────────────────────────────────────┘
                                     ↓ ↑ HTTPS
┌─────────────────────────────────────────────────────────────────────────┐
│                           VERCEL EDGE (CDN)                              │
│    Edge Functions + Middleware + Geolocation + Rate Limiting + ISR       │
└─────────────────────────────────────────────────────────────────────────┘
                                     ↓ ↑
┌─────────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APP ROUTER (Server)                        │
│  Server Components + API Routes + Server Actions + SSR + Static Gen     │
└─────────────────────────────────────────────────────────────────────────┘
        ↓ ↑                    ↓ ↑                     ↓ ↑
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐
│    SUPABASE      │  │  EXTERNAL SERVICES    │  │   CONFIGURATOR PKG  │
│  - Postgres DB   │  │  - Resend (email)     │  │  @brightbox/        │
│  - Auth          │  │  - Stripe (payments)  │  │   configurator      │
│  - Realtime      │  │  - Cal.com (booking)  │  │  (consumed via npm) │
│  - Storage       │  │  - Rewardful (aff)    │  └─────────────────────┘
│  - Row Security  │  │  - Acorn (financing)  │
└──────────────────┘  └──────────────────────┘

Data flow annotations:
→ : User request / data fetch
← : Server response / data return
⇄ : Real-time bidirectional (Supabase Realtime)
```

**Layer responsibilities:**
- **Browser:** Renders UI, handles user interaction, runs configurator client component
- **Vercel Edge:** CDN caching, middleware auth checks, rate limiting, geolocation detection
- **Next.js App Router:** Server-side rendering, API endpoints, business logic, data orchestration
- **Supabase:** Database storage, user authentication, real-time subscriptions, file storage
- **External Services:** Transactional email, payment processing, booking, affiliate tracking, financing
- **Configurator Package:** Standalone React component for product configuration (consumed as dependency)

---

## 2. Repository Structure — Monorepo

Locked architectural decision: **pnpm workspaces monorepo**. Bright Box Homes web app and the standalone configurator package coexist in a single repository. The configurator package is designed for npm publication in Phase 3 as an independent product line.

```
brightbox-homes/
├── apps/
│   └── web/                          # Bright Box Homes Next.js app
│       ├── app/                      # App Router (routes)
│       │   ├── (marketing)/          # Public marketing pages
│       │   ├── configure/            # Configurator pages
│       │   ├── admin/                # Admin dashboard (auth required)
│       │   ├── portal/               # Customer portal (auth required)
│       │   ├── api/                  # API routes
│       │   └── layout.tsx            # Root layout
│       ├── components/               # Shared React components
│       ├── lib/                      # Utilities, helpers, API clients
│       │   └── configurator-config/  # Bright Box-specific config for @brightbox/configurator
│       ├── public/                   # Static assets (images, fonts)
│       │   └── images/               # Product images (layered PNGs)
│       ├── styles/                   # Global CSS, Tailwind config
│       ├── middleware.ts             # Vercel Edge Middleware (auth, rate limiting)
│       ├── package.json              # Imports @brightbox/configurator as dependency
│       ├── tsconfig.json
│       └── next.config.js
├── packages/
│   └── configurator/                 # Standalone configurator package
│       ├── src/
│       │   ├── index.ts              # Public API exports
│       │   ├── Configurator.tsx      # Main component
│       │   ├── components/           # Internal subcomponents (Viewer, OptionPanel, PriceDisplay)
│       │   ├── hooks/                # Internal hooks (useConfiguratorState, useImageLoader)
│       │   ├── types.ts              # Exported TypeScript types (ProductConfig, Theme, SelectionState)
│       │   ├── theme.ts              # Default theming system + Theme interface
│       │   └── utils/                # Internal utilities (validation, layer compositing)
│       ├── package.json              # name: @brightbox/configurator, main: dist/index.js
│       ├── README.md                 # Documentation for npm publication
│       ├── LICENSE                   # License terms for package buyers
│       ├── tsconfig.json
│       └── rollup.config.js          # Bundle configuration (ES modules, tree-shakeable)
├── docs/                             # Documentation sites (built in later phases)
│   ├── brightbox/                    # Internal Bright Box Homes documentation
│   └── configurator/                 # Configurator product marketing + docs site (Phase 3)
├── pnpm-workspace.yaml               # Workspace configuration
├── package.json                      # Root workspace scripts
├── tsconfig.base.json                # Shared TypeScript config
├── .gitignore
├── .env.example
├── GOVERNANCE_BRIEF.md               # Governance file (at root)
├── BLUEPRINT.md                      # Product vision (at root)
├── ARCHITECTURE.md                   # This file (at root)
└── (other governance files)          # All governance files at root per spec
```

**Critical constraints:**
- `packages/configurator` MUST have zero hardcoded references to Bright Box Homes, prefab housing, container homes, or any domain-specific vertical
- All Bright Box-specific configuration lives in `apps/web/lib/configurator-config/`
- The configurator package accepts a fully generic JSON product config (agnostic to product vertical)
- The configurator package exposes a clean, TypeScript-typed public API
- Bright Box web app imports the configurator the same way any external customer would:  
  `import { Configurator } from "@brightbox/configurator"`

**Monorepo rationale:**
- Single repository simplifies version control for configurator changes used by Bright Box
- Internal dogfooding: Bright Box Homes is the first consumer of the configurator package
- Phase 3 npm publication extracts the package without requiring a separate repository split
- Shared TypeScript config and tooling reduces duplication

---

## 3. Configurator Package Architecture

This section defines the standalone configurator product. Must be readable by future operators evaluating it as a sellable asset.

### 3.1 Public API

The configurator exports exactly one main component plus typed helpers:

**Main export:**
```typescript
<Configurator 
  config={ProductConfig}        // Product definition (JSON schema)
  theme={Theme}                  // Visual theme (optional, defaults provided)
  onSelectionChange={callback}   // Callback fired on every selection change
  onSubmit={callback}            // Callback fired when user submits configuration
/>
```

**Helper exports:**
- **Types:** `ProductConfig`, `Theme`, `SelectionState`, `OptionGroup`, `Layer`, `View`, `RotationSet`, `PricingRules`, `FloorPlan`
- **Utilities:** `validateConfig(config: ProductConfig)`, `defaultTheme: Theme`, `calculatePrice(selections: SelectionState, pricing: PricingRules)`

**Type signature for callbacks:**
```typescript
onSelectionChange: (state: SelectionState) => void
onSubmit: (state: SelectionState) => void
```

**Integration pattern for consumers:**
```typescript
import { Configurator, ProductConfig, SelectionState } from "@brightbox/configurator"

const myProductConfig: ProductConfig = { /* ... */ }
const [selections, setSelections] = useState<SelectionState>({})

<Configurator 
  config={myProductConfig} 
  onSelectionChange={setSelections}
  onSubmit={(state) => handleFormSubmit(state)}
/>
```

### 3.2 Rendering Engine

**Locked architectural decision:** Pre-rendered 360° rotation via image sequence.

**Rationale (per operator decision):**
- Photorealistic visual quality exceeds real-time WebGL for premium products
- Better mobile performance and lower file sizes than 3D models
- Lower asset complexity for buyers of the configurator (their team can render images; few have 3D pipelines)
- Industry-proven pattern: Tesla, Apple, Rivian, Cover all use pre-rendered sequences

**Implementation details:**
- **Base body images:** One per primary configuration (e.g., per color/size variant)
- **Layered overlay PNGs:** Transparent backgrounds for roof, trim, add-ons (porch, solar, mini-split, etc.)
- **Compositing:** All layers composited via CSS `position: absolute` + `z-index` stacking
- **Rotation:** Pre-rendered sequence of 24-36 frames per variant, swapped on drag/click
- **Transitions:** Cross-fade transitions between selection changes (200ms duration)
- **Add-on overlays:** Fade in over base per operator UX spec

**Image asset structure (example):**
```
public/images/product-a/
├── base/
│   ├── color-white-angle-00.png
│   ├── color-white-angle-15.png
│   ├── ...
│   ├── color-white-angle-345.png
│   ├── color-black-angle-00.png
│   └── ...
├── overlays/
│   ├── roof-metal-brown.png
│   ├── roof-metal-red.png
│   ├── trim-white.png
│   ├── addon-porch-extended.png
│   ├── addon-solar-5kw.png
│   └── ...
```

**Rendering algorithm:**
1. User selects color → load base image sequence for that color
2. User selects roof → overlay roof PNG (z-index 1)
3. User selects add-on → overlay add-on PNG (z-index 2+)
4. User drags to rotate → swap base image frame based on drag delta
5. All overlays remain in sync with base rotation angle

### 3.3 True-3D Plugin Path (Hook only, not built)

Architecture leaves room for a future WebGL renderer plugin without breaking the public API.

**Design contract:**
- Rendering implementation is abstracted behind a `Renderer` interface
- **Default:** `PreRenderedImageRenderer` (Phase 1 ships this only)
- **Future plugin:** `WebGLRenderer` (Three.js or similar) — implements same interface, swapped via theme/config option
- Buyers in Phase 3+ could license a "True 3D" add-on for products specifically requiring it
- Phase 1 ships `PreRenderedImageRenderer` only; the interface contract enables future expansion without redesign

**Interface contract (not implemented in Phase 1, documented for future):**
```typescript
interface Renderer {
  render(state: SelectionState, viewAngle: number): RenderOutput
  preload(assets: Asset[]): Promise<void>
  dispose(): void
}
```

This hook ensures the configurator package can expand to real-time 3D without breaking existing integrations.

### 3.4 Product Config Schema (the JSON buyers provide)

TypeScript interface defining the product config structure. **Generic — supports any vertical** (prefab homes, RVs, furniture, automotive, apparel, etc.).

**High-level schema shape:**
```typescript
interface ProductConfig {
  productId: string                  // Unique product identifier
  productName: string                // Display name
  basePrice: number                  // Starting price (before options)
  currency: string                   // ISO 4217 currency code (USD, EUR, etc.)
  views: View[]                      // Exterior, interior, etc.
  rotations: RotationSet[]           // 360° image sequences per view
  optionGroups: OptionGroup[]        // Colors, sizes, roof types, add-ons
  layers: Layer[]                    // Image layer definitions (base + overlays)
  pricing: PricingRules              // Price calculation logic
  floorPlans?: FloorPlan[]           // Optional interactive SVG floor plans
}

interface View {
  id: string                         // "exterior", "interior", "roof", etc.
  name: string                       // Display name
  defaultAngle: number               // Default rotation angle (0-360)
}

interface RotationSet {
  viewId: string                     // References View.id
  variantKey: string                 // e.g., "color-white", "color-black"
  frames: string[]                   // Array of image URLs (24-36 frames covering 0-360°)
}

interface OptionGroup {
  id: string                         // "color", "roof", "size", "addons"
  name: string                       // Display name
  type: "single" | "multi"           // Single-select or multi-select
  required: boolean
  options: Option[]
}

interface Option {
  id: string
  name: string
  priceAdjustment: number            // +/- from base price
  layerIds?: string[]                // Layer IDs to show when selected
  dependencies?: Dependency[]        // Conditional display rules
}

interface Layer {
  id: string
  viewId: string                     // References View.id
  imageUrl: string                   // PNG with transparency
  zIndex: number                     // Stacking order
  variantKey?: string                // Optional: only show for specific variants
}

interface PricingRules {
  basePrice: number
  optionAdjustments: { [optionId: string]: number }
  discounts?: Discount[]
}

interface FloorPlan {
  id: string
  name: string
  svgUrl: string                     // Interactive SVG with data-room-name attributes
  applicableOptions: string[]        // Option IDs that trigger this floor plan
}
```

**Full schema documented in `packages/configurator/src/types.ts`** (created in subsequent build session).

### 3.5 Theming and White-Label

The configurator package is designed for white-label usage by future buyers. Visual customization is achieved via a `Theme` object.

**Theme interface:**
```typescript
interface Theme {
  colors: {
    primary: string                  // Brand primary color
    secondary: string
    background: string
    text: string
    border: string
    accent: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      small: string
      medium: string
      large: string
    }
  }
  spacing: {
    small: string
    medium: string
    large: string
  }
  borderRadius: string
  motion: {
    transitionDuration: string       // e.g., "200ms"
    easing: string                   // e.g., "ease-in-out"
  }
}
```

**Default theme:** Neutral premium aesthetic (clean enough to ship as-is for buyers who don't customize).

**Bright Box Homes theme:** Warm Modern palette (defined in `apps/web/lib/configurator-config/theme.ts`).

**CSS variables:** All visual tokens exposed as CSS variables for runtime theme overrides without recompilation.

**Implementation:**
- Theme prop accepts a `Theme` object that overrides defaults
- Tailwind utilities used internally, but theme CSS variables allow override without Tailwind dependency in consuming app
- Future buyers supply their own brand theme via the `theme` prop

### 3.6 State Management

Internal React state via `useReducer` for selection state. **No external state library dependency** (no Redux, Zustand, etc.).

**State structure:**
```typescript
interface SelectionState {
  [optionGroupId: string]: string | string[]  // Single-select: string, multi-select: string[]
}
```

**State emitted via `onSelectionChange` callback** so parent app can capture configuration for forms, analytics, persistence.

**Example state:**
```typescript
{
  "color": "white",
  "roof": "metal-brown",
  "size": "20x40",
  "addons": ["solar-5kw", "porch-extended"]
}
```

**State updates:**
- User selects option → reducer updates state → `onSelectionChange` callback fires → parent captures state
- Parent can initialize state via `initialSelections` prop (for "load saved configuration" flows)

### 3.7 No External Dependencies on Bright Box

**Zero coupling to Bright Box Homes infrastructure:**
- No Supabase client inside the package
- No Stripe references inside the package
- No Resend references inside the package
- Package is **pure React + TypeScript + Tailwind utilities** (Tailwind installed via the consuming app, not the package itself)
- All side effects (form submission, payment, data persistence) handled by the consuming app via callbacks

**Dependency list (minimal):**
- `react` (peer dependency)
- `react-dom` (peer dependency)
- Internal utilities only (no external libraries beyond React)

---

## 4. Hosting Topology

**Domain (Bright Box Homes):** brightboxhomes.com (GoDaddy registrar)

**Domain (Configurator product):** TBD — separate invented brand domain (decision pending Phase 3)

**DNS:** Vercel-managed nameservers (configured during deploy phase)

**Production hosting:**
- **Vercel:** Edge Functions, ISR (Incremental Static Regeneration), Server Components, deployed from `main` branch
- Automatic deployment on push to `main`
- Atomic deployments (zero-downtime)

**Preview deployments:**
- Vercel auto-deploys every PR branch
- Preview URL format: `brightbox-homes-<branch>-<hash>.vercel.app`

**Database:** Supabase Postgres (project to be created in upcoming session)

**Database region:** `us-east-1` (low latency for Texas operations and broad US coverage)

**Email service:** Resend (transactional email API)

**Booking:** Cal.com (free hosted account, created during scaffold phase)

**Payments:** Stripe (live + test modes, Stripe Connect for affiliate payouts)

**Affiliate tracking:** Rewardful (Stripe-native integration, free under $7.5K MRR)

**Financing widget:** Acorn (partner ID pending operator)

**Analytics:**
- Google Analytics 4 (GA4)
- Google Search Console
- Microsoft Clarity
- Vercel Analytics (built-in)
- Meta Pixel (dormant — fires only if `NEXT_PUBLIC_META_PIXEL_ID` is set)

**Exchange rates (Phase 2):** Frankfurter.app (free currency conversion API)

**Geolocation:** Vercel Edge geolocation headers (`x-vercel-ip-country`, `x-vercel-ip-timezone`)

---

## 5. Application Architecture (Bright Box Web App)

**Framework:** Next.js 14 App Router (`apps/web`)

**Routing model:** File-based, `app/` directory

**Rendering strategy by route type:**

| Route Type | Rendering Strategy | Revalidation | Auth Required |
|---|---|---|---|
| Marketing pages (`/`, `/products/*`, `/about`, `/faith-foundation`, `/blog/*`) | Static + ISR | Revalidate hourly | No |
| Configurator (`/configure/*`) | Client component wrapping `<Configurator />` from package | Dynamic (client-side) | No |
| Lead capture forms | Server Action submission to `/api/leads` | N/A | No |
| Stripe checkout | Server Action initiating Stripe Checkout Session, webhook receives completion | N/A | No |
| Admin dashboard (`/admin/*`) | Server Components with server-side data fetch | Dynamic (per request) | Yes (admin role) |
| Customer portal (`/portal/*`) | Server Components with server-side data fetch | Dynamic (per request) | Yes (customer role) |
| Public API routes (`/api/*`) | Rate-limited via Vercel Edge Middleware | Dynamic (per request) | Varies |

**Client components:** ONLY for interactivity (configurator wrapper, form inputs, modals, animations). NEVER for initial data fetch on protected routes per Contract: Server-Component Data Fetch.

**TypeScript:** Strict mode enabled, no `any`, no implicit returns.

**File structure (apps/web/app):**
```
app/
├── (marketing)/                  # Marketing pages (public, static + ISR)
│   ├── page.tsx                  # Homepage
│   ├── products/
│   │   ├── shipping-containers/
│   │   ├── apple-cabins/
│   │   ├── space-capsules/
│   │   ├── assembly-houses/
│   │   └── foldout-houses/
│   ├── about/
│   ├── faith-foundation/
│   ├── blog/
│   │   └── [slug]/
│   ├── faq/
│   └── contact/
├── configure/                    # Configurator pages (client components)
│   └── [productLine]/
│       └── page.tsx
├── admin/                        # Admin dashboard (auth required, server components)
│   ├── layout.tsx                # Admin-specific layout
│   ├── page.tsx                  # Dashboard home
│   ├── leads/
│   ├── orders/
│   └── settings/
├── portal/                       # Customer portal (auth required, server components)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── orders/
│   └── documents/
├── api/                          # API routes
│   ├── leads/
│   ├── webhooks/
│   │   └── stripe/
│   └── auth/
└── layout.tsx                    # Root layout
```

---

## 6. Authentication and Authorization Model

**Authentication provider:** Supabase Auth

**Two distinct user types with separate role enums:**
1. **`admin`** (operator + future team members) — accesses `/admin/*`
2. **`customer`** (buyers who placed deposits) — accesses `/portal/*`

**Public marketing site:** No auth required

**Middleware enforcement:**
- `/admin/*` routes protected by middleware checking for `admin` role
- `/portal/*` routes protected by middleware checking for `customer` role
- Middleware checks Supabase session cookie, validates JWT, redirects to `/login` if unauthorized

**Row-Level Security (RLS):**
- Every table has explicit RLS policies — no exceptions without documented justification in `SCHEMA_REGISTRY.md`
- Policies enforce role-based access (admin sees all, customer sees only their own data)

**Master admin override semantics (per GOVERNANCE_BRIEF.md Section 10):**
- Master admin role implies override for **operational constraints** (radius, quotas, caps, limits)
- **Constitutional constraints absolute for all roles** including master admin:
  - Last master admin cannot be demoted (lockout prevention)
  - Cannot revoke own role
  - Cannot violate legal compliance gates (FTC, GDPR, CAN-SPAM, COPPA, etc.)
  - Cannot bypass anti-spam / anti-abuse / safety protections
  - Cannot override audit logging

**Authorization pattern:**
- Single canonical helper function: `checkPermission(userId, resource, action)`
- All protected routes call this function — no inline auth logic
- Enforced by verification script per Contract: Authorization Pattern Uniformity

**User roles stored in:** `users.role` column (enum: `admin`, `customer`)

---

## 7. Data Flow Patterns

### 7.1 Public Lead Capture Flow

```
Browser form 
  → Next.js Server Action (validate input) 
  → Insert into `leads` table 
  → Resend email to info@brightboxhomes.com 
  → Resend auto-response to lead 
  → Return success 
  → Optionally route to Cal.com or Stripe checkout
```

**Data captured:**
- Name, email, phone, budget tier, timeline, configuration JSON (from configurator state)

**Lead scoring:**
- Hot/Warm/Cold based on budget, timeline, configuration complexity

### 7.2 Configurator State Flow

```
User selection in <Configurator /> client component 
  → Updates internal state via useReducer 
  → onSelectionChange callback fires 
  → Bright Box web app captures state in parent component 
  → On form submit, full state JSON serialized into `leads.configuration` column 
  → Admin dashboard renders configurator state replay for sales context
```

**State serialization example:**
```json
{
  "productLine": "shipping-containers",
  "model": "20x40",
  "color": "white",
  "roof": "metal-brown",
  "floorPlan": "1BR",
  "addons": ["solar-5kw", "porch-extended"],
  "totalPrice": 62450
}
```

### 7.3 Deposit Payment Flow

```
User clicks "Reserve with Deposit" 
  → Server Action creates Stripe Checkout Session with metadata (lead_id, product_sku, configuration_json) 
  → Redirect to Stripe-hosted checkout 
  → User completes payment 
  → Stripe webhook hits /api/webhooks/stripe 
  → Webhook handler validates signature 
  → Creates `order` record + advances `payment_stage` to 1 
  → Triggers Resend confirmation email 
  → Triggers admin notification email
```

**Stripe Checkout Session metadata:**
```json
{
  "lead_id": "uuid",
  "product_sku": "20x40-1BR",
  "configuration_json": "{ ... }",
  "payment_stage": 1
}
```

### 7.4 Order Lifecycle Flow

```
Admin advances order through payment stages (1→2→3→4) via dashboard action 
  → Server Action validates stage transition 
  → Inserts `payment_stage_history` row 
  → Triggers customer portal notification 
  → Optionally triggers Stripe Invoice for next stage payment
```

**Payment stages:**
1. Order Placement (25%)
2. Production Start (25%)
3. Pre-Ship Sign-Off (25%)
4. Pre-Delivery (25%)

**Stage transition rules:**
- Can only advance one stage at a time (no skipping)
- Each stage requires admin confirmation
- Customer receives email notification on each stage advance

### 7.5 Affiliate Attribution Flow

```
Visitor arrives via Rewardful tracking link 
  → Rewardful cookie set client-side 
  → On lead submission, Rewardful `affiliate_id` captured into `leads.affiliate_id` column 
  → On Stripe Checkout completion, Rewardful API confirms attribution 
  → On `order_completed` status, Rewardful initiates commission payout via Stripe Connect
```

**Commission payout conditions:**
- Order must reach `payment_stage = 4` (all payments complete)
- Affiliate must have valid Stripe Connect account
- Commission tiers defined in Rewardful dashboard (per BLUEPRINT.md Section 5.4)

---

## 8. External Service Integration Points

Each service: purpose, integration method, env vars, failure mode handling.

### 8.1 Supabase

**Purpose:** Database + Auth + Storage + Realtime

**SDK:** `@supabase/ssr` (Next.js App Router compatible)

**Environment variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to client)

**Failure mode handling:**
- Structured error codes returned from all queries
- Retry on transient failures (connection timeout, rate limit)
- All errors logged to audit log

### 8.2 Resend

**Purpose:** Transactional email (order confirmations, payment receipts, nurture sequences)

**SDK:** `resend` npm package

**Environment variables:**
- `RESEND_API_KEY`

**Failure mode handling:**
- Queue retry on transient failures (network error, rate limit)
- Alert admin via fallback channel (SMS, Slack) if email send fails after retries

### 8.3 Stripe

**Purpose:** Payments (deposits, staged payments, refunds), affiliate payouts via Stripe Connect

**SDK:** `stripe` npm package

**Environment variables:**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Webhook endpoint:** `/api/webhooks/stripe`

**Signature verification:** Mandatory before processing (prevents replay attacks)

**Failure mode handling:**
- Webhook signature verification failure → return 400, log to audit
- Payment failure → structured error code returned to frontend
- Idempotency keys used on all payment mutations

### 8.4 Cal.com

**Purpose:** Consultation booking (embeds on configurator and contact pages)

**Integration:** Embed via iframe or React SDK

**Environment variables:**
- `NEXT_PUBLIC_CALCOM_USER`
- `NEXT_PUBLIC_CALCOM_EVENT`

**Failure mode handling:**
- Iframe fails to load → fallback to phone/email CTA

### 8.5 Rewardful

**Purpose:** Affiliate tracking (cookie-based attribution, commission payouts)

**Integration:** 
- Client-side script in `<head>` for tracking
- Server-side API for commission confirmation

**Environment variables:**
- `REWARDFUL_API_KEY` (server-side)
- `NEXT_PUBLIC_REWARDFUL_KEY` (client-side)

**Failure mode handling:**
- Cookie fails to set → affiliate attribution lost (acceptable loss, no user impact)
- Commission payout failure → retry queue, alert admin

### 8.6 Acorn Finance

**Purpose:** Buyer financing (pre-qualification widget)

**Integration:** Iframe widget on financing page

**Environment variables:**
- `ACORN_PARTNER_ID` (pending operator)

**Failure mode handling:**
- Widget fails to load → display phone number for manual pre-qualification

### 8.7 Google Analytics 4 (GA4)

**Purpose:** Traffic analytics

**Integration:** Tag in `<head>`

**Environment variables:**
- `NEXT_PUBLIC_GA_ID`

**Failure mode handling:**
- Script blocked by ad blocker → analytics not captured (acceptable)

### 8.8 Microsoft Clarity

**Purpose:** Session replay and heatmaps

**Integration:** Tag in `<head>`

**Environment variables:**
- `NEXT_PUBLIC_CLARITY_ID`

**Failure mode handling:**
- Script blocked → session replay not captured (acceptable)

### 8.9 Meta Pixel

**Purpose:** Facebook/Instagram ad conversion tracking (dormant in Phase 1)

**Integration:** Tag in `<head>` (fires only if env var is set)

**Environment variables:**
- `NEXT_PUBLIC_META_PIXEL_ID` (optional, dormant until ads launch)

**Failure mode handling:**
- Env var not set → pixel does not fire (intentional for Phase 1)

### 8.10 Vercel Analytics

**Purpose:** Web vitals, performance monitoring

**Integration:** Built-in via `@vercel/analytics` package

**Environment variables:** None (auto-configured by Vercel)

**Failure mode handling:** None required (Vercel-managed)

---

## 9. Image Pipeline Architecture

**Source:** Rendering files in `product-assets/<product-line>/` — original PNG/JPG at full resolution

**Processing:** Build-time script using `sharp` library converts source images to AVIF, WebP, JPG fallbacks at multiple resolutions (mobile/tablet/desktop/retina)

**Output:** `apps/web/public/images/<product>/<sku>-<view>-<size>.<format>`

**Manifest:** `image-manifest.json` mapping SKU+view+state → all asset URLs

**Configurator consumption:**
- TypeScript config imports manifest
- Configurator package looks up correct layered image set per option combination

**Layer compositing:**
- Base body image (z-index 0)
- Roof overlay PNG (z-index 1, transparent background)
- Trim overlay (z-index 2, transparent background)
- Add-on overlays (z-index 3+, transparent backgrounds)

**360° rotation:**
- Pre-rendered sequence of 24-36 images per product variant per color
- Swapped on mouse drag or rotation control click
- Frame index calculated from drag delta: `frameIndex = Math.floor((angle / 360) * frameCount)`

**Floor plans:**
- SVG format, interactive room hover via `<g>` tags with `data-room-name` and dimensions
- Swap-on-config-change: different floor plan SVGs loaded based on selected configuration (e.g., 1BR vs 2BR)

**Build-time image processing script (example):**
```bash
node scripts/process-images.js
  → reads product-assets/
  → generates AVIF, WebP, JPG at 640w, 1024w, 1920w, 2560w
  → outputs to public/images/
  → writes image-manifest.json
```

---

## 10. Internationalization Architecture (Phase 2 dormant in Phase 1)

**Framework:** `next-intl` in `apps/web`

**Locale routing:** `/en` (default, US), `/es`, `/pt-br`, `/fr`, `/de`

**Translation storage:** `messages/<locale>.json` files committed to repo

**Phase 1:** Only `en` populated. Phase 2: Operator provides translated JSON via professional translator OR DeepL API

**Geographic detection:**
- Vercel Edge Geolocation headers → country code → mapped to locale + currency + pricing multiplier

**Currency display:**
- Frankfurter.app daily rate fetch → cached at edge → applied to product prices for display
- Stripe Presentment Currencies for actual checkout in local currency

**Regional pricing engine:**
- Database table `regional_pricing` stores per-country multipliers
- Lookup at SSR time: `basePrice * multiplier[country]`

**Configurator package locale-agnostic:**
- Accepts translated strings via theme/config prop
- No hardcoded English strings inside package

**Phase 2 activation checklist:**
1. Translate `messages/en.json` to `es.json`, `pt-br.json`, `fr.json`, `de.json`
2. Set regional pricing multipliers in `regional_pricing` table (currently all 1.0)
3. Enable locale routing in `next.config.js`
4. Deploy

---

## 11. Verification and Testing Architecture

**Unit tests:** Vitest, colocated with source (`*.test.ts` adjacent to `*.ts`)

**E2E tests:** Playwright, in `apps/web/tests/e2e`

**Configurator package tests:** Vitest + React Testing Library in `packages/configurator/src/__tests__`

**Test environment:**
- `vi.stubEnv()` for environment variables
- Never real production secrets in tests

**CI environment parity:**
- GitHub Actions runs tests without `.env.local` mounted
- Simulates production environment (no developer secrets)

**Verification chain (verify:fast):**
1. `tsc --noEmit` (TypeScript compilation check)
2. `vitest run` (unit tests)
3. `eslint` (linting)
4. Encoding check (UTF-8 no BOM)
5. Governance lint (forbidden language patterns, time estimates)
6. Schema drift check (database schema matches migrations)
7. Contract enforcement scripts (authorization pattern, audit attribution, etc.)

**Verification chain (verify:full):**
- Everything in `verify:fast`
- Playwright E2E tests
- CI parity simulation (tests run without `.env.local`)
- Coverage threshold check (80% minimum)
- Bundle size check (warn if bundle exceeds 500KB)

**Pre-commit hook:** Husky runs `verify:fast` on staged files

**CI on push:** GitHub Actions runs `verify:full`

**Deploy gate:** Vercel deploys only if CI green

---

## 12. Audit Logging Architecture

**Table:** `audit_log`

**Schema:**
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor_user_id UUID REFERENCES users(id),
  actor_role TEXT NOT NULL,                    -- 'admin', 'customer', 'system'
  action TEXT NOT NULL,                        -- 'CREATE_ORDER', 'UPDATE_LEAD', 'ADVANCE_PAYMENT_STAGE', etc.
  resource_type TEXT NOT NULL,                 -- 'order', 'lead', 'payment', etc.
  resource_id UUID,
  before_state JSONB,                          -- State before mutation
  after_state JSONB,                           -- State after mutation
  ip_address TEXT,
  user_agent TEXT
);
```

**Every state mutation writes an audit row** — no silent mutations per Contract: Audit Attribution Mandate.

**Audit log retention:** Indefinite for legal compliance (FTC, state lemon laws, payment disputes).

**Admin dashboard surfaces audit log:**
- Filtered by actor (see all actions by a specific user)
- Filtered by resource (see all changes to a specific order)
- Time-range filtering
- Export to CSV for compliance reporting

**Example audit log entry:**
```json
{
  "id": "uuid",
  "timestamp": "2026-05-27T12:34:56Z",
  "actor_user_id": "uuid",
  "actor_role": "admin",
  "action": "ADVANCE_PAYMENT_STAGE",
  "resource_type": "order",
  "resource_id": "uuid",
  "before_state": { "payment_stage": 1 },
  "after_state": { "payment_stage": 2 },
  "ip_address": "1.2.3.4",
  "user_agent": "Mozilla/5.0..."
}
```

---

## 13. Error Handling Architecture

**Structured error code taxonomy** per Contract: Structured Error Code Taxonomy.

**Standard codes:**
- `AUTH_REQUIRED` — User not authenticated
- `PERMISSION_DENIED` — User authenticated but lacks permission
- `VALIDATION_FAILED` — Input validation error
- `RESOURCE_NOT_FOUND` — Requested resource does not exist
- `QUOTA_EXCEEDED` — Rate limit or usage quota exceeded
- `EXTERNAL_SERVICE_FAILURE` — Third-party service (Stripe, Resend, etc.) failed
- `RATE_LIMITED` — Too many requests
- `PAYMENT_FAILED` — Stripe payment declined
- `CONFIGURATION_INVALID` — Configurator state invalid
- `STAGE_TRANSITION_INVALID` — Cannot advance payment stage (prerequisite not met)

**All API routes return structured error responses:**
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Email address is required",
    "details": {
      "field": "email",
      "constraint": "required"
    }
  }
}
```

**Frontend catch blocks display `error.message`** — never fallback to generic strings.

**All errors logged with:**
- Error code
- Actor (user ID + role)
- Resource context (resource type + ID)
- Timestamp
- IP address

**Example error log entry:**
```json
{
  "level": "error",
  "code": "PAYMENT_FAILED",
  "message": "Stripe payment declined",
  "actor_user_id": "uuid",
  "actor_role": "customer",
  "resource_type": "order",
  "resource_id": "uuid",
  "details": {
    "stripe_error_code": "card_declined",
    "decline_code": "insufficient_funds"
  },
  "timestamp": "2026-05-27T12:34:56Z",
  "ip_address": "1.2.3.4"
}
```

---

## 14. Performance Architecture

**Target Lighthouse scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

**Image optimization:**
- AVIF + WebP + JPG fallbacks via build pipeline (not `next/image` alone — explicit responsive variants)
- Lazy loading for below-fold images
- Preload for above-fold hero images

**Critical CSS:**
- Tailwind purge ensures only used utilities ship
- Inline critical CSS in `<head>` for first paint

**JS bundle:**
- Next.js App Router automatic code splitting per route
- Client components tree-shaken (unused components not included)

**Configurator package bundle:**
- Tree-shakeable ES modules
- Total package size target: under 80KB minified+gzipped

**Server Component rendering:**
- Data fetched server-side, HTML streamed
- Hydration only on interactive client components

**Caching:**
- Vercel Edge cache for static + ISR pages (1 hour TTL)
- Supabase query cache for repeated reads (15 minutes TTL)

**Database query optimization:**
- Indexes documented per query pattern in `SCHEMA_REGISTRY.md`
- Query plans analyzed with `EXPLAIN ANALYZE`
- No N+1 queries (use `JOIN` or batch fetch)

---

## 15. Security Architecture

**HTTPS enforced:** Vercel auto-redirect (HTTP → HTTPS)

**HSTS header:** `Strict-Transport-Security: max-age=31536000; includeSubDomains`

**CSP header (Content Security Policy):**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.vercel-insights.com https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  frame-src https://checkout.stripe.com https://cal.com;
  connect-src 'self' https://*.supabase.co;
```

**CSRF protection:**
- All forms protected against CSRF via Server Action token (Next.js built-in)

**Stripe webhook signature verification:**
- Mandatory before processing
- `stripe.webhooks.constructEvent(payload, signature, secret)`

**Row-Level Security (RLS):**
- Every Supabase table has explicit RLS policies
- No table accessible without policy (fail-closed)

**Service role key (`SUPABASE_SERVICE_ROLE_KEY`):**
- Used only in server-side code
- Never exposed to client

**Rate limiting:**
- `/api/leads`: 10 requests per minute per IP via Vercel Edge Middleware
- `/api/webhooks/*`: No rate limit (trusted sources with signature verification)

**Honeypot field on public forms:**
- Hidden field that bots fill, humans ignore
- Form submission rejected if honeypot filled

**Email verification flow:**
- Customer portal sign-up requires email verification before access granted

**Configurator package security:**
- Zero network calls
- Zero secret handling
- Pure UI component — security surface is consuming app's responsibility

---

## 16. Observability Architecture

**Structured logger:** `lib/logger.ts` — JSON output for Vercel log aggregation

**Every API route logs:**
- Entry: `{ level: "info", message: "Route entered", route: "/api/leads", method: "POST", userId: "uuid" }`
- Exit: `{ level: "info", message: "Route completed", route: "/api/leads", method: "POST", duration: 123 }`

**Every external service call logs:**
- Request: `{ level: "info", message: "External call started", service: "Stripe", method: "createCheckoutSession" }`
- Response: `{ level: "info", message: "External call completed", service: "Stripe", method: "createCheckoutSession", duration: 456, success: true }`

**Sentry:** Deferred until traffic warrants (Phase 1 sufficient with Vercel logs)

**Uptime monitoring:** Deferred to Phase 1.5 (Pingdom, UptimeRobot, or similar)

**Metrics tracked:**
- Lead conversion rate (lead → deposit payment)
- Payment stage conversion rate (Stage 1 → 2 → 3 → 4)
- Average time per payment stage
- Configurator engagement (selections made, time spent)
- Page load performance (Core Web Vitals)

---

## 17. Configurator Productization Architecture

This section captures the configurator-as-sellable-product strategy. Locked per operator decision 2026-05-27.

### 17.1 Productization Path

**Phase 1:** Configurator built as standalone package within Bright Box monorepo, consumed by Bright Box web app.

**Phase 1.5:** Configurator documentation site built (`docs/configurator/`), demo site with 3-5 example verticals (RV, furniture, automotive, etc.).

**Phase 3:** npm publish event — package goes public, marketing site launches, sales begin.

### 17.2 Business Model

**Self-hosted one-time license.** Three tiers:

| Tier | Price | License | Updates | Support |
|---|---|---|---|---|
| **Indie** | $2,995 | Single domain | 1 year | Community support (GitHub Discussions) |
| **Business** | $7,995 | Up to 5 domains | 3 years | Email support (48-hour response) |
| **Enterprise** | $19,995 | Unlimited domains | Lifetime | Priority support + custom theming session |

**SaaS subscription model** deferred to v2 of the configurator product (post-validation of self-hosted demand).

### 17.3 Branding

**Separate invented brand** for the configurator product (not "Bright Box Configurator"). Decision pending operator selection.

**Reasoning:** Avoids limiting buyers in non-home verticals to a brand they associate with prefab homes. Bright Box Homes positioned as the inaugural customer and live case study, not the parent brand.

### 17.4 Target Verticals (Marketing Surface)

Configurator marketed to:
- Prefab homes
- RVs
- Tiny homes
- Sheds and outdoor structures
- Furniture
- Kitchen and bath
- Automotive customization
- Boats
- Hot tubs
- Apparel
- Eyewear
- Watches
- Custom jewelry
- Tactical gear
- Modular office systems
- Solar arrays
- Garage doors
- Storage shelving

**Not marketed for:**
- Real-time 3D CAD design
- Infinite combination spaces
- Products under $500
- Anything requiring physics simulation

### 17.5 Bright Box as Marquee Case Study

Bright Box Homes itself serves as the live demonstration of the configurator. Configurator product marketing site embeds Bright Box configurator as the proof-of-concept demo. This is a defensible marketing position — buyers see the configurator working on a real production high-ticket commerce site, not a synthetic demo.

---

## 18. Architectural Decisions Locked

Decisions immutable per Contract: Architectural Decision Durability without explicit operator override:

1. **Next.js App Router** (not Pages Router) — locked 2026-05-27
2. **Supabase as primary backend** — locked 2026-05-27
3. **TypeScript strict mode** — locked 2026-05-27
4. **Tailwind CSS** — locked 2026-05-27
5. **pnpm package manager** — locked 2026-05-27
6. **25/25/25/25 payment structure** — locked 2026-05-27
7. **Multi-language framework built but dormant in Phase 1** — locked 2026-05-27
8. **In-app admin CRM (no third-party SaaS)** — locked 2026-05-27
9. **Pre-rendered image-swap configurator (no real-time 3D engine in Phase 1)** — locked 2026-05-27
10. **Rewardful for affiliate tracking** — locked 2026-05-27
11. **pnpm workspaces monorepo with standalone configurator package** — locked 2026-05-27
12. **Configurator as separately marketed product with self-hosted one-time license model** — locked 2026-05-27
13. **True-3D plugin path hooked but not built in Phase 1** — locked 2026-05-27

---

## 19. Architectural Decisions Pending

Decisions requiring operator input before respective Phase 1 work proceeds:

- **Configurator product brand name + domain acquisition** (blocks configurator marketing site)
- **Stripe Connect setup** (blocks Rewardful affiliate payouts)
- **Acorn partner ID acquisition** (blocks financing widget on production site)
- **Manufacturer marketing usage rights confirmation** (legal exposure — pending email reply)
- **Cal.com account creation** (will be created during scaffold phase by operator)

---

END OF ARCHITECTURE.md
