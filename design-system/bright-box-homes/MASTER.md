# Bright Box Homes — Design System (MASTER)

> Global source of truth for the approved visual direction.
> Approved by the client from the design proposal; applied sitewide.
> Page-specific overrides live in `pages/<page-name>.md` and beat this file.
>
> These values are the **client's approved direction**, not generated palette
> output. The `ui-ux-pro-max` skill was used to validate accessibility outcomes
> (focus appearance, target size, focus-not-obscured); its colour-domain search
> returned no match for this palette and nothing was substituted.

---

## 1. Colour tokens

| Token | Hex | Role |
|---|---|---|
| `bb-charcoal` | `#1C1C1E` | Dark band ground, header, footer, stat tiles |
| `bb-surface` | `#252527` | Charcoal lifted 4% — cards and panels on a charcoal band |
| `bb-cream` | `#F5F0E8` | Light band ground, feature cards |
| `bb-cream-line` | `#E4DCCD` | Hairlines and borders on cream |
| `bb-gold` | `#D4A853` | Accent — **charcoal surfaces only** |
| `bb-gold-press` | `#C1953C` | Primary button hover/press |
| `bb-link` | `#3461C7` | Hyperlinks on light surfaces |

Neutrals kept from the previous system: `#FFFFFF`, `#D1D5DB`, `#9CA3AF`,
`#4B5563`, `#374151`, `#111827`.
Semantic colours are untouched by this system: `#16A34A` success,
`#DC2626` / `#EF4444` error.

### The gold rule

**Gold is only ever used on charcoal.** On cream it measures 1.9:1 — below the
3:1 floor for large text and far below 4.5:1 for body. On light bands the
emphasis role belongs to charcoal (`text-black/60` for eyebrows, `#1C1C1E` for
figures and headings).

| Pair | Ratio | Verdict |
|---|---|---|
| Cream on charcoal | 15.0:1 | AAA |
| Charcoal on cream | 15.0:1 | AAA |
| Gold on charcoal | 7.7:1 | AAA |
| Charcoal on gold (button label) | 7.7:1 | AAA |
| Link blue on white | 5.7:1 | AA |
| Gold on cream | 1.9:1 | **Barred** |

### One blue is kept

Hyperlinks stay blue so a link still reads as a link. `bb-link` `#3461C7` on
light surfaces (5.7:1). The retired `#6B9BF7` measured 2.7:1 on white.

---

## 2. Typography

| Role | Family | Weights | Variable |
|---|---|---|---|
| Headings | Plus Jakarta Sans | 700, 800 | `--font-heading` |
| Body & UI | Inter | 400, 500, 600 | `--font-body` |
| Prices & specs | JetBrains Mono | 400, 500 | `--font-mono` |

All three are loaded in `app/layout.tsx` via `next/font/google`. Inter 600 is
required — primary buttons and emphasis use `font-semibold`, and without the
weight loaded the browser synthesises it. JetBrains Mono backs `font-mono`,
which prices and spec tables use.

Use the named scale (`text-hero`, `text-h1`–`text-h4`, `text-body`) rather than
raw Tailwind sizes, so a change to the scale reaches the site.
Eyebrow labels: 12px / 600 / `0.15em` uppercase — gold on charcoal,
`text-black/60` on cream.

---

## 3. Section rhythm

`components/layout/Section.tsx` owns the band system.

| Prop | Values | Effect |
|---|---|---|
| `tone` | `charcoal` \| `cream` | Ground, text and eyebrow colour as one set |
| `size` | `feature` \| `standard` \| `strip` | 128 / 96 / 40px vertical rhythm |
| `width` | `default` \| `wide` | 1280px shell, 24px gutters |

**Consecutive sections never share a tone.** The only exception is the badge
strip, deliberately charcoal-on-charcoal at reduced height so it reads as a
divider rather than a section.

Padding derives from the existing spacing tokens (`--space-16`, `--space-24`,
`--space-32`) — no new numbers.

---

## 4. Buttons

`components/ui/Button.tsx` is the single source of truth; `BookConsultation`
imports its class map rather than restating it.

| Tier | Treatment | Use |
|---|---|---|
| `primary` | Solid `bb-gold`, charcoal label, 10px radius, no shadow | One per band |
| `secondary` | 1.5px outline in the band's text colour | Paired with primary |
| `ghost` | Text only, gold on hover (underline on cream) | Tertiary |

`tone="dark" \| "light"` resolves the outline, hover wash and focus ring against
the correct ground. Minimum target 44px. Focus ring is 2px + 2px offset, gold on
charcoal and charcoal on cream (WCAG 2.2 Focus Appearance, ≥3:1).

**No gradients, no glow.** The retired blue primary duplicated its gradient and
glow in two files, which is how they drifted.

---

## 5. Cards

Two roles, in `components/ui/Card.tsx`. Radius is the 16px token (`rounded-lg`)
throughout; `rounded-xl` at 12px is off-scale and is not used.

| | `MediaCard` | `ContentCard` / `StatTile` |
|---|---|---|
| Role | Navigates somewhere | Static copy or a figure |
| Fill | White on cream | 4% white on charcoal / charcoal fill |
| Shadow | Soft, deepens on hover | none |
| Hover | Lift 4px, border to gold | none |
| Padding | 24px | 24px |

Border, fill, radius and shadow all say "separate, liftable object". Only cards
that actually navigate get them.

---

## 6. Out of scope for this system

- **Product swatch data** — the ~101 `hex:` values in
  `components/design/DesignJourneyContent.tsx` are real exterior paints, wood
  and countertop finishes with SRI/LRV figures (RAL codes, "Natural Rust",
  "Honey Maple"). They are product data, never restyled.
- **Admin palette** — `DESIGN_LANGUAGE.md` §2.4 governs the admin dashboard.
- **Semantic colours** — success/error are functional, not brand.

---

## 7. Accessibility rules carried by this system

- Focus indicator: 2px perimeter, 2px offset, ≥3:1 against its ground.
- `scroll-padding-top: 80px` on `html` so the 64px sticky header cannot obscure
  keyboard focus or anchor targets (WCAG 2.2 AA, Focus Not Obscured).
- Interactive targets ≥44px.
- Motion respects `prefers-reduced-motion`; card lift and image scale are
  disabled under it.
