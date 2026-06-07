# COMPONENTS — Bright Box Homes — INDEX

This is the top-level index for component-level documentation. Detailed feature specifications live in PRD.md. Implementation specifications are documented inline in code via TypeScript types and JSDoc comments at the time each component is authored, rather than as standalone upfront governance documents.

## Why this is an index, not a monolithic spec

A prior attempt at this document specified 193 components across 8 categories with 11 required fields each. That scope was determined infeasible for a single-file deliverable, and reconsidered against the actual project type (marketing and lead-gen website, not multi-tenant SaaS). Feature-level requirements are exhaustively documented in PRD.md (75 features across 7 categories, each with user stories, functional requirements, non-functional requirements, success criteria, out-of-scope clarifications, and Six Laws Status). That is the canonical source for "what each feature does."

This index file points future sessions to the right document for each kind of question:

| Question | Where to look |
|---|---|
| What does this feature do? | PRD.md |
| How is the system wired? | ARCHITECTURE.md |
| What are the database tables? | SCHEMA_REGISTRY.md |
| What are the engineering rules? | BEHAVIORAL_CONTRACTS.md |
| What is the methodology? | GOVERNANCE_BRIEF.md |
| What's the visual language? | DESIGN_LANGUAGE.md (pending) |
| What got done this session? | STATE_OF_THE_BUILD.md |
| What does this component's code do? | JSDoc comments inline + TypeScript types in the source file itself |

## Feature ID Convention (referenced from PRD.md)

- BBH-XXX: Bright Box Homes web app features
- CFG-XXX: Configurator package features (Phase 1B)
- ADMIN-XXX: Admin dashboard features
- PORTAL-XXX: Customer portal features
- SEO-XXX: SEO and content infrastructure features
- LEGAL-XXX: Legal page features
- INFRA-XXX: Infrastructure and DevOps features

## Phase 1A Scope (marketing website launch)

The following PRD features are in scope for the initial supplier-inspectable launch:
- BBH-001 Homepage
- BBH-002 through BBH-007 Product line pages (all 5 lines, with static photo galleries — configurator deferred to Phase 1B)
- BBH-008 Lead capture wizard ("Book a Consultation" CTA)
- BBH-010 Cal.com consultation booking
- BBH-021 Blog infrastructure
- BBH-022 FAQ system
- BBH-023 About / Build Process page
- BBH-024 FAITH Foundation page
- BBH-025 $5K Challenge page
- BBH-026 International coming soon waitlist
- SEO-001 Core SEO infrastructure
- LEGAL-001 through LEGAL-006 All legal pages
- INFRA-001 Monorepo scaffold (Phase 1A: web app only; configurator package scaffolded but empty)
- INFRA-002 Supabase setup
- INFRA-003 Resend setup
- INFRA-009 Cal.com account
- INFRA-011 Analytics stack (GA4, Clarity, Vercel Analytics, dormant Meta Pixel)
- INFRA-012 Domain configuration

## Phase 1B Scope (post-launch additions)

Deferred from initial supplier inspection but in v1 final scope:
- All CFG-XXX configurator features
- BBH-009 Email-me-my-build save feature
- BBH-011 Stripe deposit checkout (25/25/25/25)
- BBH-012 through BBH-020 All premium tools (ROI calculator, delivery estimator, build slot calendar, comparison tool, permit lookup, financing pre-qualification, spec sheet PDF generator, live chat, virtual showroom)
- All ADMIN-XXX admin dashboard features
- All PORTAL-XXX customer portal features
- SEO-002 through SEO-006 (state landing pages, competitor comparisons, ADU regulation pages, financing calculator page, blog content seeding)
- INFRA-004 Stripe setup
- INFRA-008 Acorn integration (when partner ID obtained)
- INFRA-010 Rewardful integration

## Phase 2 Scope (deferred international and Phase 3)

Per BLUEPRINT.md Phase 2:
- International language activation (top 5 languages)
- Regional pricing activation
- Multi-currency via Stripe Presentment Currencies
- Tariff-free advantage banners
- Configurator extraction as standalone npm package for resale

## Status Definitions

Component status tracking will be maintained in STATE_OF_THE_BUILD.md entries as each component progresses through:
- PROPOSED: specified in PRD.md, not yet built
- SCAFFOLDED: file exists, no implementation
- IMPLEMENTED: functional code present
- VERIFIED: all Six Laws pass (per GOVERNANCE_BRIEF.md Section 3)
- DEPLOYED: live in production

## Component-Level Documentation Discipline

When a component is authored in code, the source file MUST include:
- A top-of-file JSDoc block describing: purpose, PRD feature ID it implements, dependencies, contracts enforced
- TypeScript interfaces for all public props or exports
- Inline comments for non-obvious logic
- A colocated `.test.ts` or `.test.tsx` file (Vitest unit tests)
- For routes: a corresponding Playwright spec in tests/e2e/

This in-source documentation is the implementation-level companion to PRD.md's feature-level documentation. Together they replace what a monolithic COMPONENTS.md would have provided, with lower drift risk and higher fidelity to actual code.

## History

- Initial commit at 055301c shipped a 3,585-byte stub due to scope mis-architecture (193-entry monolithic spec infeasible in single file). Replaced at the next commit with this index per operator directive — see STATE_OF_THE_BUILD.md Entry 2 Incident 3 for full account.
