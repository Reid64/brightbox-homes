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