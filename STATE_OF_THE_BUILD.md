# STATE OF THE BUILD — Bright Box Homes

**Document status:** CURRENT-STATE DOCUMENT. Rebuilt from the live repository on 2026-09-23.
**Authority:** Reid Whitesides, Owner.
**Governing standards:** CANONICAL ENGINEERING SPECIFICATION & IMPLEMENTATION LAWS; THE REID WHITESIDES ELITE ENGINEERING METHODOLOGY; CANONICAL_ENGINEERING_LAWS. These three documents govern all work on this project from 2026-09-23 forward.
**Project root:** `C:\Users\suppo\Documents\brightbox-homes`

---

## 0. Why this document was rewritten rather than appended

The prior version of this file declared itself APPEND-ONLY under BEHAVIORAL_CONTRACTS.md CONTRACT-001. It contained two entries, both dated 2026-05-27, and was last modified 2026-06-07. Between 2026-06-11 and 2026-09-12 the repository received 65 further commits that this file never recorded. A document three months behind the code it governs cannot serve as a source of truth, and under the Elite Engineering Methodology (Mechanism 1) the governance files — not conversation history — are what a fresh agent session reads at cold start.

On 2026-09-23 the Owner explicitly authorized suspending CONTRACT-001 for this one rewrite so the document could be brought to current reality. That authorization is recorded here as the reason the append-only chain was broken. **The append-only discipline resumes from Entry A below.** Prior Entries 1 and 2 are preserved verbatim in git history at commits `91ce894` and later; nothing was destroyed, only superseded.

### How the facts in this document were established

Every statement below was verified on 2026-09-23 by one of the following methods. Statements that could not be verified are labelled UNVERIFIED and must not be relied on.

- Direct read of files in `C:\Users\suppo\Documents\brightbox-homes`
- Directory enumeration of the repository tree
- Reconstruction of commit history from `.git/logs/HEAD` (65 entries)
- Live HTTP requests and real-browser rendering (Chromium via Playwright) against `https://brightboxhomes.com`
- Live query of the Supabase project `brightbox-homes-admin`

No fact in this document originates from prior conversation memory or from earlier governance documents.

---

## 1. Canonical facts

| Item | Value | Verification |
|---|---|---|
| Project root | `C:\Users\suppo\Documents\brightbox-homes` | Directory read |
| Git branch | `main` | `.git/HEAD` |
| Last commit | `e8759df` — "Add Phase 1 prompts (1-3)", 2026-09-12 | git reflog |
| Total commits on record | 65 reflog entries, 2026-06-11 → 2026-09-12 | git reflog |
| GitHub | `Reid64/brightbox-homes` (private) | Prior governance; UNVERIFIED this session |
| Hosting | Vercel, auto-deploy from `main` | Live site responds 200; deploy config not re-read |
| Framework | Next.js 15.1.6, React 19.0.0, TypeScript 5.7.3 | `apps/web/package.json` |
| Styling | Tailwind CSS 3.4.17 | `apps/web/package.json` |
| Package manager | pnpm 10.33.0, workspaces | root `package.json`, `pnpm-workspace.yaml` |
| Booking | Cal.com, link `reid-whitesides-bcg38n/30min` | `components/ui/BookConsultation.tsx` |
| Admin database | Supabase project `brightbox-homes-admin`, ref `ntzgyoycihvlpqsochcm`, us-east-2, ACTIVE_HEALTHY | Live Supabase query |
| Admin database contents | **Zero tables in `public` schema** | Live Supabase query |
| Repo migrations | **None.** `supabase/` contains only `.temp/` CLI cache | Directory read |

### Scripts that exist

Root `package.json`: `dev`, `build`, `lint`.
`apps/web/package.json`: `dev`, `build`, `start`, `lint`.

### Scripts and files that do NOT exist

- No `deploy.ps1` anywhere in the repository
- No `typecheck` script in either package.json
- No test framework installed — no Playwright, Vitest, or Jest dependency, and no test script
- No `governance/` content — the folder exists and is empty; governance markdown lives at the repo root

**Consequence:** the Owner's canonical deploy sequence (`pnpm tsc --noEmit` → `pnpm run build` → `vercel --prod` → `npx playwright test` → commit/push via `deploy.ps1`) **cannot execute in this repository as written.** Closing this gap is Next Action 3.

---

## 2. Current state of the marketing site

The site is live at `https://brightboxhomes.com` and returned HTTP 200 on every route tested on 2026-09-23.

### Routes that are built and substantive

| Route | File size | Notes |
|---|---|---|
| `/` | 26.6 KB | Homepage |
| `/design` | 2.0 KB + 50 KB of components | Six-step design journey; see §3 |
| `/delivery` | 18.7 KB | Site prep specs, zip-code delivery zone checker |
| `/faq` | 2.7 KB + 18 KB hero component | Interactive guide hero, five categories |
| `/5k-challenge` | 8.5 KB | Competitor rebate program |
| `/about` | 6.5 KB | |
| `/blog` and `/blog/[slug]` | 4.0 + 3.5 KB | Content in `content/blog-published` |
| `/find-land` | 7.0 KB | External listing sites plus buying guide |
| `/faith-foundation` | 7.9 KB | |
| `/upgrades` | 0.7 KB + 19 KB `UpgradesGrid` | |
| `/products/*` | 2.2–15.9 KB each | expandable-homes (20x10, 20x20, 20x30, 20x40), duplex, apple-cabins, space-capsules, assembly-homes, emergency-housing, vending-units, apartments-office-buildings |

### Routes that exist but are stubs

| Route | Actual content |
|---|---|
| `/international` | A single headline: "International - Coming Soon" |
| `/reserve` | Copy plus a Cal.com button. **No Stripe checkout. The $500 deposit cannot be taken on the site.** |
| `/financing` | 2.1 KB page; Acorn partner integration not present |
| `/legal/privacy` | `return <h1>Privacy Policy</h1>` — no policy text |
| `/legal/terms` | Same pattern — no terms text |
| `/legal/returns` | Same pattern — no returns text |
| `/legal/warranty` | Same pattern — no warranty text |

**Four legal pages are published shells containing only a heading.** For a business taking deposits on homes, this is a commercial and legal exposure item, not a cosmetic one. Recorded as Open Blocker B-01.

### Route groups reserved but empty

`app/admin`, `app/api`, `app/configure`, `app/portal` each contain only a `.gitkeep`. There are no API routes in this application.

---

## 3. Design Your Home — current state

`/design` renders `DesignJourney`, which composes four components:

- `DesignJourneySidebar.tsx` — horizontal six-step bar
- `DesignJourneyContent.tsx` (40 KB) — all step content and **all option data**
- `HomeConfigurator.tsx` — preview panel
- `OrderPanel.tsx` — running invoice

### Option and price data — this is the live source of truth

All of it is hard-coded in `DesignJourneyContent.tsx`:

- 63 RAL exterior colors, each with a hex value
- 9 carved metal plate finishes, sprite-mapped to `/images/colors/carved-metal-plate.png`
- 19 roof colors with SRI and LRV figures
- 12 interior wall panels, 7 floor colors
- 9 products with retail prices: 20×10 $35,995 · 20×20 $45,995 · 20×30 $49,995 · 20×40 $59,995 · Duplex $59,995 · Assembly Home $25,995 · Emergency Housing $2,000 · Apple Cabin and Space Capsule priced `null`
- 30+ upgrades with retail prices, images and spec text

Note two discrepancies against prior governance: the Duplex is priced $59,995 in code where Entry 1 recorded $64,995, and Apple Cabin and Space Capsule remain unpriced.

### What the configurator actually does

`HomeConfigurator` displays one photograph per model, chosen from a four-entry map, and fades whole-frame photographs of a roof, patio, deck and solar array over it as those upgrades are added. Selected exterior and roof colors are printed as **text only** — choosing a color changes nothing visible.

All 10 referenced image files exist in `apps/web/public/images/configurator/`. None are missing.

**Verified constraint on this approach:** the available product photography is of different physical units in different finishes, shot in different locations, lighting and camera angles. Photograph-swapping cannot represent one customer's configuration coherently. The configurator therefore cannot be finished along its current path. See §7, Decision D-01.

### `@brightbox/configurator` package

`packages/configurator/src/index.ts` contains two lines: a comment and `export const CONFIGURATOR_VERSION = '0.0.1'`. The package is an empty shell consumed as a workspace dependency by the web app.

---

## 4. Admin Command Center — current state

- **No code exists.** `app/admin` holds only a `.gitkeep`.
- **No database schema exists.** The Supabase project is healthy and empty — zero tables.
- **No migrations exist** in the repository.

### Specification documents present in `apps/web/docs/admin/`

Seven specifications, all written 2026-09-11: MASTER-SPEC (52 KB), DATABASE-SCHEMA (70 KB), API-CONTRACTS (31 KB), BEHAVIORAL-CONTRACTS (37 KB), IAM-SPECIFICATION (27 KB), ARCHITECTURE (22 KB), PHASE1-BUILD-MANIFEST (28 KB).

### Build prompts present

`PROMPT-1-DATABASE-FOUNDATION`, `PROMPT-2-PERMISSION-CORE`, `PROMPT-3-SESSION-AND-MIDDLEWARE` — each as both `.md` and `.docx`, written 2026-09-12.

**Prompts 4 through 9 do not exist in the repository.** Any record stating that nine Phase 1 prompts were authored and that Phase 1 was ready for an unattended Chain-It run is contradicted by the repository. Phase 1 of the admin build is roughly one third specified.

---

## 5. Defects observed in a real browser on 2026-09-23

Measured with Chromium at 390 × 844 (phone) and 1440 × 900 (desktop) against the live site.

| ID | Route | Defect | Evidence |
|---|---|---|---|
| D-01 | `/design` | Horizontal page overflow on phones — content 408px wide in a 390px viewport; step 6 cut off at the screen edge | `document.scrollWidth` 408 vs `clientWidth` 390 |
| D-02 | `/design` | Hero used `object-contain`, leaving dead bands above and below the image, with body copy running across the photograph; the legibility gradient ran left-to-right, which does nothing on a narrow screen | Screenshot |
| D-03 | `/design` | Step bar rendered step 1 in blue and steps 2–6 in red, against a design system whose primary accent is amber `#D4A853` with blue reserved for logo and links | Screenshot |
| D-04 | `/design` | Configurator and invoice stacked ~3,000px down the page on phones, effectively unreachable | Screenshot, `scrollHeight` 3,607 |
| D-05 | `/5k-challenge` | Headline wrapped to three lines on a 390px screen, orphaning "$5,000" on its own line | Screenshot |

### Corrected earlier claim

An earlier assessment in this session stated that three oversized PNG files (2.4 MB, 2.4 MB, 3.0 MB) were being served to phones. **That was wrong.** A live check of the Vercel image optimizer returned a 20,660-byte WebP at 384px width for `20x10-front.png`. The large files are source assets only and never reach a client through `next/image`. No image work was performed. Recorded here so the error does not propagate.

---

## 6. Work completed on 2026-09-23

Five files written to the repository, type-checked clean under `strict` mode against React 19.0.0 / TypeScript 5.7.3 in an isolated sandbox before writing:

| File | Change |
|---|---|
| `apps/web/components/design/DesignJourneySidebar.tsx` | Rewritten. Steps now live in a horizontal scroller (`overflow-x-auto`, `w-max`) so the page itself never scrolls sideways (D-01). Colors moved onto the amber system (D-03). Circles 40px on phones, 56px from `sm` up. Active step auto-scrolls into view within the scroller only. `aria-current` and per-step `aria-label` added. |
| `apps/web/app/(marketing)/design/page.tsx` | Hero switched to `object-cover` at all breakpoints; scrim now vertical below `md` and horizontal from `md` up; heading and body scaled for narrow screens; explicit min-heights (D-02). |
| `apps/web/components/design/MobileBuildSheet.tsx` | **New.** Floating "View Your Build" button showing item count and running total, opening a bottom sheet containing the configurator and invoice. Escape closes, background scroll locks, `role="dialog"` with `aria-modal` (D-04). Renders only below `lg` and only when the order is non-empty. |
| `apps/web/components/design/DesignJourney.tsx` | Right-hand column now `hidden lg:block`; mobile served by the sheet; shared `removeItem` handler; bottom clearance so the floating button never covers content. |
| `apps/web/app/(marketing)/5k-challenge/page.tsx` | Headline sized down at the narrowest widths and both halves made block-level so the break is deterministic (D-05). |

**Verification status: PARTIAL.** Type-check passed. Production build, deployment and browser confirmation of the fix had not been executed at the time of writing. These changes are NOT verified complete under Law 10 until a preview deployment has been inspected in a real browser at 390px and `scrollWidth` equals `clientWidth`.

---

## 7. Decisions recorded

**D-01 — Photo-swap configurator abandoned; parametric 3D adopted.** (2026-09-23, Owner-approved direction.)
The existing approach cannot succeed because the source photography is inconsistent across units, finishes, lighting and camera angle. The replacement is a parametric real-time 3D configurator: geometry generated in code from the manufacturer's dimensions (20'8" overall width; bays 6'8" / 7'2" / 6'8"; 19'4" depth, 17'11" interior, per the 20×20 floor plan PDFs), materials driven by the RAL hex values already present in `DesignJourneyContent.tsx`, rendered with three.js and React Three Fiber (both MIT-licensed, no cost). One generator serves every model. The expand-from-shipping-position animation is the differentiating feature. Interiors are served by a 2D plan view plus filtered real photography rather than modelled geometry. Full specification pending.

**D-02 — Governance rewrite authorized.** (2026-09-23.) See §0.

---

## 8. Open blockers

| ID | Blocker | Impact |
|---|---|---|
| B-01 | Four legal pages (`privacy`, `terms`, `returns`, `warranty`) contain only a heading | Commercial and legal exposure on a site selling homes |
| B-02 | No Stripe deposit checkout; `/reserve` cannot take the $500 | Revenue path incomplete |
| B-03 | Admin Phase 1 prompts 4–9 do not exist | Admin build cannot start; any unattended run would improvise |
| B-04 | No test framework, no `deploy.ps1`, no typecheck script | The Owner's verification standard cannot be executed in this repo |
| B-05 | Apple Cabin and Space Capsule have no prices (`null` in code) | Two product lines cannot be sold or configured |
| B-06 | Duplex price differs between code ($59,995) and Entry 1 ($64,995) | Unresolved pricing contradiction |
| B-07 | Option-level cost data absent from `OPTIONS & UPGRADES.xlsx` (price and dimension columns empty in all 56 rows) | Wholesale cost basis unavailable for margin work; `ALL MASTER WHOLESALE PRICE LIST.xlsx` in the BRIGHT BOX HOMES folder is the candidate source, not yet read |
| B-08 | Acorn financing partner ID outstanding | `/financing` cannot complete |

---

## 9. Next actions, in order

1. Deploy the 2026-09-23 fixes to a Vercel preview from branch `fix/design-mobile-2026-09-23`, confirm in a real browser at 390px that horizontal overflow is gone and the build sheet opens, then merge to `main`. Closes the verification gap in §6.
2. Specify and build the parametric 3D configurator per Decision D-01. Highest commercial value item on the project.
3. Close B-04: add a `typecheck` script, install Playwright, write a smoke suite covering the live routes, and create `deploy.ps1` implementing the Owner's canonical sequence.
4. Admin Command Center: author prompts 4–9 to the 95/100 gate before any build session starts (B-03).
5. Legal pages and Stripe deposit checkout (B-01, B-02).

---

## 10. Entry log

Append-only from here. Every future session appends one entry and never edits a previous one.

### Entry A — Governance reconstruction and mobile design-page repair

**Date:** 2026-09-23
**Commit:** pending — the fixes in §6 were written to the working tree on 2026-09-23 and had not been committed at the time this document was written
**Phase:** Marketing site hardening, ahead of configurator rebuild
**Scope:** Repository reconnaissance under the Canonical Laws; rewrite of this document from verified repository state; repair of five mobile defects on `/design` and `/5k-challenge`
**Outcome:** §§1–8 of this document established from primary sources. Five files changed, type-check clean. Decision D-01 recorded.
**Incidents:** CONTRACT-001 append-only discipline suspended by explicit Owner authorization (§0). One earlier claim by the assistant about image payloads was found wrong on live inspection and is corrected in §5.
**Blockers:** B-01 through B-08 (§8)
**Next action:** Next Action 1 (§9)
