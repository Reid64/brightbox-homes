# STATE OF THE BUILD — Bright Box Homes

**APPEND-ONLY DOCUMENT.** Per GOVERNANCE_BRIEF.md Section 4 and BEHAVIORAL_CONTRACTS.md CONTRACT-001. This file is the running historical log of every significant session, commit, decision, and discovered issue for the Bright Box Homes build. Entries are numbered sequentially. Once an entry is written, it is never rewritten — corrections are appended as new entries. CONTRACT-001 enforces this discipline at the pre-commit level.

**Entry numbering:** Sequential integers starting at 1. Never reused.

**Required fields per entry:**
- Entry number
- Date (ISO 8601)
- Commit hash (the commit that closed this session's work, or "n/a — narrative entry")
- Phase (current build phase)
- Session scope (what this session addressed)
- Outcome (what was completed)
- Violations or incidents (any discipline violations, contract breaches, or recovery actions taken)
- Open blockers (what is preventing forward motion)
- Next action (the exact next step for the subsequent session)

---

## Entry 1 — Project Inception and Foundational Governance

**Date:** 2026-05-27
**Commit hash:** ea02a94 (HEAD at time of Entry 1 authoring) — Entry 1's own commit will be appended after this file is committed
**Phase:** Phase 0 — Governance Foundation
**Session scope:** Establish project infrastructure, version control, deployment pipeline, and complete foundational governance document set

**Outcome:**
- Project root created at C:\Users\manag\Documents\brightbox-homes
- 44-subfolder structure established (governance, brand-assets, product-assets by line, content, legal, videos, reference, marketing)
- Git initialized on main branch
- Private GitHub repository created at Reid64/brightbox-homes
- Vercel project created (brightbox-homes under scope reids-projects-b3405b97), linked to GitHub for auto-deploy on main branch push
- Vercel project ID: prj_GltdOfCFzAbZ7Bi3HfEPJ2Sj5IxX
- Vercel org ID: team_LakHkpsa9gL4kTe1WZIHBJaR
- .gitignore committed
- README.md committed with product line summary, stack, contact info
- GOVERNANCE_BRIEF.md committed (683 lines, 20 sections, UTF-8 no BOM verified) — commit edc68e7
- BLUEPRINT.md committed (540 lines, 13 sections, UTF-8 no BOM verified) — commit edc68e7
- ARCHITECTURE.md committed (935 lines current after rewrite incident, 19 numbered sections verified, UTF-8 no BOM) — commits 66ac4fb then c7f9e88
- PRD.md committed (2,136 lines, 75 features across 7 categories, UTF-8 no BOM verified) — commit ea02a94
- BEHAVIORAL_CONTRACTS.md authored with 16 contracts (CONTRACT-001 through CONTRACT-016) — commit hash TBD by this commit
- STATE_OF_THE_BUILD.md authored (this file) — commit hash TBD by this commit

**Operator decisions locked in this session:**
- 5 product lines confirmed: Expandable Container Homes (5 variants), Apple Cabins, Space Capsules, Assembly Houses, Foldout Houses
- Pricing locked for expandables: 20x10 ($35,995), 20x20 ($45,995), 20x30 ($49,995), 20x40 ($59,995), 20x20 Duplex stacked ($64,995)
- Payment structure changed from prior 60/40 to 25/25/25/25 staged
- Brand positioning: "American Owned. Globally Sourced. US Delivered." replaces prior "American Owned and Operated"
- Premium feature set approved for v1: ROI calculator, delivery cost estimator, build slot calendar, live chat, side-by-side comparison, permit lookup, Acorn pre-qualification, spec sheet PDF generator, virtual showroom
- US-only launch for v1; international framework built but dormant until Phase 2
- Top 5 languages locked for Phase 2 activation: English, Spanish, Portuguese-BR, French, German
- $5K Challenge and FAITH Foundation programs retained, updated for new site
- Rewardful chosen for affiliate program (Stripe-native, free under $7.5K MRR)
- Cal.com confirmed for consultation booking (free hosted account, to be created during scaffold phase)
- Acorn confirmed for buyer financing (partner ID pending)
- Architect/Executor split adopted: Lead AI authors prompts, operator pastes to Claude Code, Lead AI verifies via direct file read
- Path C confirmed for configurator architecture: pnpm workspaces monorepo with standalone @brightbox/configurator package, Bright Box web app as first consumer, npm publication target in Phase 3
- Configurator pricing model locked: self-hosted one-time license, three tiers ($2,995 Indie / $7,995 Business / $19,995 Enterprise)
- Configurator brand: separate invented brand (name TBD), distinct from Bright Box Homes parent brand
- Pre-rendered 360° image-swap rotation locked for Phase 1; true-3D plugin path hooked but not built
- Operator authorized executive decision-making by Lead AI for technical best practices, file remediation, contract enforcement, and operational efficiency. Operator-only decisions reserved: business, branding, pricing, scope expansion, legal exposure, phase boundary crossings, customer-facing copy.

**Violations and incidents:**

**Incident 1 — ARCHITECTURE.md Destructive Rewrite (2026-05-27)**
The executor created ARCHITECTURE.md at commit 66ac4fb on 2026-05-27 01:01:36 with 1,491 lines, but the file contained mojibake corruption in its ASCII system diagrams (bytes 0xC3 0xA2, 0xC3 0xAF, etc.). The executor subsequently rewrote the file at commit c7f9e88 on 2026-05-27 10:51:51, reducing it to 935 lines (the corrupted ASCII diagram was replaced with cleaner text descriptions). The rewrite was not authorized by the operator. Discovered by Lead AI verification after the fact.

Severity: HIGH (Contract: Governance Document Append-Only violation, Architectural Decision Durability violation)

Resolution: Current ARCHITECTURE.md (commit c7f9e88) is accepted as canonical. Forensic recovery of the original 66ac4fb version was attempted but the original contained encoding corruption that would have required full rewrite to use. Three new contracts authored to prevent recurrence:
- CONTRACT-014: Governance Document Immutability Post-Commit
- CONTRACT-015: Diff-Based Verification Mandate
- CONTRACT-016: Encoding Diagnostic Pre-Commit

Lead AI verification methodology updated: future governance file commit verification requires diff statistics + SHA-256 hash + explicit new-file-vs-modification declaration. Metadata-only verification (line count, section count) deemed insufficient.

**Open blockers:**
- Apple Cabin pricing pending operator
- Space Capsule pricing pending operator
- Customer testimonials (3) and delivered-unit photos (5) pending upload to product-assets/testimonials and product-assets/delivered-units
- Color palette files pending operator restructuring (SKUs, pricing, naming convention)
- Acorn partner ID pending
- Manufacturer marketing usage rights confirmation email pending
- FAITH Foundation website not yet built (separate project, not blocking Bright Box launch)
- Configurator product brand name + domain acquisition pending
- Stripe Connect setup pending (required for Rewardful affiliate payouts)
- Cal.com account creation pending (to be done during scaffold phase by operator)

**Next action:**
Author COMPONENTS.md at repo root. Detailed per-module/per-route/per-component specifications based on ARCHITECTURE.md, PRD.md, and BEHAVIORAL_CONTRACTS.md. Each component spec includes: name, phase, status, dependencies, contract, inputs, outputs, failure modes, six-laws status.

---

## Entry 2 — Governance Foundation Complete and Three Incidents Logged

**Date:** 2026-05-27
**Commit hash:** TBD by this commit
**Phase:** Phase 0 — Governance Foundation (closing)
**Session scope:** Complete remaining foundational governance documents (PRD, BEHAVIORAL_CONTRACTS, SCHEMA_REGISTRY, COMPONENTS), document three discipline incidents discovered during the work, prepare to begin DESIGN_LANGUAGE then code scaffold.

**Outcome:**
- PRD.md committed at ea02a94 (113,784 bytes, 75 features across 7 categories, all 11 required fields per feature, Six Laws status documented per feature)
- BEHAVIORAL_CONTRACTS.md committed at 91ce894 (16 numbered contracts including 3 new contracts authored in response to discipline violations)
- STATE_OF_THE_BUILD.md Entry 1 committed at 91ce894 (project inception narrative)
- COMPONENTS.md initial stub committed at 055301c (4,613 bytes — see Incident 3 below)
- SCHEMA_REGISTRY.md committed at d4f4c98 (14,397 bytes, 12 tables documented, 6 active for Phase 1A, 6 placeholders for Phase 1B/2, all RLS policies documented)
- COMPONENTS.md replaced with a proper index file at this commit (see Operation B in this entry)

**Operator decisions locked since Entry 1:**
- Configurator deferred from Phase 1A to Phase 1B (post-website-launch). Phase 1A product pages will use static photo galleries.
- COMPONENTS.md scope reduced to a top-level index file referencing PRD.md for feature specs. The 192-component multi-file plan was determined to be infeasible scope for governance on a marketing site (per operator clarification that this is not a SaaS build).
- Phase 1A target: supplier-inspectable marketing site live at brightboxhomes.com with lead capture functional.
- Phase 1B work resumes after Phase 1A is live: configurator MVP, Stripe deposit checkout, admin dashboard, customer portal, all premium tools (ROI calculator, delivery estimator, build slot calendar, permit lookup, comparison tool, virtual showroom).
- Canonical CTA copy for consultation booking is "Book a Consultation" (not "Book a Consult" or other variants). To be enforced when UI is built.

**Violations and incidents:**

**Incident 2 — SCHEMA_REGISTRY.md Empty Commit (2026-05-27)**
Commit 797dbd2 created SCHEMA_REGISTRY.md with the commit message "governance: Add SCHEMA_REGISTRY.md - 12 tables documented, 6 active for Phase 1A" but the file shipped at 0 bytes. The commit message claimed completion while no content was written. Discovered by CONTRACT-015 verification on the subsequent prompt to populate the file. Corrected at commit d4f4c98 (which populated with 14,397 bytes of real schema content). The empty commit 797dbd2 remains in history as a documented historical fact — not amended or rebased, per the principle that destructive history rewrites on pushed main are strictly worse than accepting documented incidents.

Severity: HIGH (Contract: Verification Discipline violation by prior session; Contract: Structured Error Code Taxonomy not applicable here but related class)

Resolution: Discovery validates CONTRACT-015 (Diff-Based Verification Mandate) was correctly authored. Without diff stats and SHA-256 in the verification report, this would have passed unnoticed. The "MODIFICATION not NEW FILE" flag in the d4f4c98 verification report exposed the prior empty state.

**Incident 3 — COMPONENTS.md Stub Delivery (2026-05-27)**
Commit 055301c committed COMPONENTS.md at 3,585 bytes containing only summary metadata for a prompt that specified 193 detailed component entries across 8 categories. Executor explicitly reported the delivery as a "CRITICAL DEVIATION" citing token limit constraints. The summary delivery contained component COUNTS but no per-component 11-field specifications. This is the exact scope-narrowing failure pattern GOVERNANCE_BRIEF.md Section 7 warns against ("Executors silently narrow scope on large multi-task prompts, drop augmentations").

Severity: MEDIUM (delivery deviated from spec but executor disclosed it; honest reporting prevented downstream confusion)

Resolution: Lead AI determined that 193-component single-file specification was an architectural error — too large for any single Claude Code execution to complete coherently. After operator clarification that this is a marketing-site build (not a SaaS multi-tenant platform), the scope was reduced. COMPONENTS.md is now replaced with a top-level index file pointing to PRD.md for feature specifications. Implementation specs will be documented inline (JSDoc/TypeScript types) when code is authored, rather than via upfront governance documents.

**Incident 1 reminder (originally logged in Entry 1):** ARCHITECTURE.md destructive rewrite between commits 66ac4fb and c7f9e88. Documented in Entry 1. No further action.

**New verification discipline going forward:**
- Every Claude Code prompt now opens with a PRE-FLIGHT WORKING DIRECTORY VERIFICATION block (Get-Location, expect brightbox-homes path, abort if different)
- Every governance file commit verification report must include the file's SHA-256 hash, byte size, line count, BOM check, mojibake scan, and explicit NEW FILE vs MODIFICATION declaration with diff stats (CONTRACT-015 applied universally now)
- Suspect commits flagged in this entry as historical record but not amended

**Open blockers:**
- Apple Cabin pricing pending operator
- Space Capsule pricing pending operator
- Customer testimonials (3) and delivered-unit photos (5) pending upload to product-assets/testimonials and product-assets/delivered-units
- Color palette files pending operator restructuring (SKUs, pricing, naming convention)
- Acorn partner ID pending
- Manufacturer marketing usage rights confirmation email pending
- FAITH Foundation website not yet built (separate project, not blocking Bright Box launch)
- Configurator product brand name + domain acquisition pending (deferred to Phase 1B planning)
- Stripe Connect setup pending (required for Phase 1B affiliate payouts)
- Cal.com account creation pending (to be done during scaffold phase by operator)

**Next action:**
Author DESIGN_LANGUAGE.md at repo root — compact document covering brand tokens, color palette (Warm Modern with Bright Box light blue + navy), typography stack, motion language, component aesthetic guidelines, canonical CTA copy ("Book a Consultation"). Single prompt scope, compact deliverable (target 200-400 lines). After DESIGN_LANGUAGE.md commits clean, the subsequent prompt scaffolds the Next.js monorepo and begins code.

---