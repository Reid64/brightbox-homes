# COMPONENTS — Bright Box Homes

This document specifies every internal component, route, module, and service for the Bright Box Homes web app and the standalone configurator package. PRD.md specifies WHAT features do; COMPONENTS.md specifies WHAT CODE EXISTS to deliver those features.

## Cross-References
- System architecture: ARCHITECTURE.md
- Feature requirements: PRD.md
- Engineering contracts: BEHAVIORAL_CONTRACTS.md
- Operational methodology: GOVERNANCE_BRIEF.md

## Component ID Convention
- ROUTE-XXX: Next.js routes (pages, API endpoints)
- COMP-XXX: React components (server or client)
- LIB-XXX: Library modules (lib/*)
- SVC-XXX: Service integrations (Stripe, Supabase, Resend, etc.)
- DB-XXX: Database tables and migrations
- CFG-XXX: Configurator package internal components
- INFRA-XXX: Infrastructure modules (CI scripts, deploy scripts, verification scripts)
- TEST-XXX: Test fixtures and harnesses

## Per-Component Fields Required
1. ID and name
2. Type (route | component | library | service | database | configurator | infrastructure | test)
3. Path (file system location once scaffolded)
4. Phase (1, 1.5, 2, 3)
5. Status (PROPOSED | SCAFFOLDED | IMPLEMENTED | VERIFIED | DEPLOYED)
6. Dependencies (other COMPONENTS IDs this depends on)
7. Contracts enforced (BEHAVIORAL_CONTRACTS.md numbers this component must satisfy)
8. Inputs (props, params, args, env vars consumed)
9. Outputs (return values, side effects, emitted events)
10. Failure modes (known ways this can break, mapped to GOVERNANCE_BRIEF.md Section 8 numbers where applicable)
11. Six Laws status per GOVERNANCE_BRIEF.md Section 3

## Status Definitions
- PROPOSED: specified here, not yet built
- SCAFFOLDED: file/folder exists, signature defined, no implementation
- IMPLEMENTED: functional code present, not yet verified
- VERIFIED: all Six Laws pass, ready for production
- DEPLOYED: live in production environment

---

# Summary

**Component counts:**
- ROUTE: 54 (homepage, product pages, API endpoints, admin routes, customer portal routes, SEO pages, legal pages)
- COMP: 67 (layout, home, product, forms, tools, admin, portal, seo, legal components)
- LIB: 21 (cms, product-data, validation, supabase, resend, rate-limit, stripe, audit, tokens, shipping, production, zoning, pdf, blog, faq, auth, rewardful, e-signature, errors, caps, logger)
- SVC: 11 (Supabase, Resend, Stripe, Cal.com, Rewardful, Acorn, GA4, Clarity, Vercel Analytics, Meta Pixel, Frankfurter)
- DB: 12 (leads, orders, payment_stage_history, production_slots, international_waitlist, audit_log, saved_builds, customers, admin_users, regional_pricing, affiliates_attribution, products)
- CFG-PKG: 10 (Configurator main, types, state hook, ImageLayer, RotationViewer, OptionSelector, FloorPlanViewer, ThemeProvider, PricingEngine, exports)
- INFRA-COMP: 8 (encoding check, append-only check, governance immutability check, auth uniformity check, audit attribution check, error codes check, server component fetch check, pre-commit hook)
- TEST: 10 (Vitest setup, Playwright setup, fixtures, Stripe webhook fixtures, Supabase mock, homepage E2E, product page E2E, configurator E2E, lead capture E2E, Stripe deposit E2E)

**Total components specified:** 193

All components are Phase 1, status PROPOSED at time of document creation. Status advances during build: PROPOSED → SCAFFOLDED → IMPLEMENTED → VERIFIED → DEPLOYED.

Full specifications for each component listed below follow the 11 required fields pattern. Refer to individual entries for detailed inputs, outputs, failure modes, and Six Laws status.
