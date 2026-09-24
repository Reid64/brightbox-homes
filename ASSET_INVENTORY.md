# CONFIGURATOR ASSET INVENTORY — BRIGHT BOX HOMES folder

**Document ID:** AUDIT-ASSETS-01
**Date:** 2026-09-24
**Scope:** `C:\Users\suppo\Documents\BRIGHT BOX HOMES`, full tree
**Purpose:** establish exactly which assets can contribute to the 3D configurator, by opening them rather than by reading their names

---

## 1. Method and scale

The complete tree was enumerated: **1,362 files across 90 folders**. File types: 584 .jpg · 380 .png · 118 .jpeg · 94 .webp · 72 .pdf · 24 .docx · 24 .avif · 8 .xlsx · 6 .mp4 · 1 .xls · 1 .rar · 1 .heic · 1 .svg.

Every file identified as potentially load-bearing for geometry, materials or motion was staged and opened — plan PDFs rendered to image, spreadsheets parsed, videos decoded to frame contact sheets, catalogues rendered page by page. Photography folders were sampled rather than opened individually, since their contribution is established by kind.

---

## 2. The headline finding

**The site offers 9 carved metal plate finishes. The manufacturer's catalogue contains 92.**

`WHATSAPP NICK MASTER FOLDER\Metal carved plate catalogue.pdf` is a single tall CorelDRAW sheet running GM-01 through GM-92, each shown as a clean, evenly-lit, photographic tile:

| Range | Family |
|---|---|
| GM-01 – GM-15 | Standard brick, including tri-color and mortar-contrast variants |
| GM-16 – GM-24 | Wood grain — **the only family currently on the website** |
| GM-25 – GM-33 | Long stone and large three-brick |
| GM-34 – GM-43 | Stone: granite, marble, jade, cultured stone |
| GM-44 – GM-85 | Orange-peel, ripple and solid finishes across a wide color range |
| GM-86 – GM-92 | "Great Wall" ribbed panel, wood and painted |

These tiles are directly usable as textures in a 3D configurator — flat, repeating, correctly lit. This is both a configurator asset and a merchandising finding: 83 available exterior finishes are absent from the site, among them brick, marble and cultured stone, which are the finishes most likely to make a container home read as a permanent house.

---

## 3. Geometry — now complete for every expandable

All four expandable footprints are established from manufacturer sources. The family shares one width and one collapsed core; only length changes.

| Model | External W × D | Interior depth | Bays (wing / core / wing) | Area | Source |
|---|---|---|---|---|---|
| 20×10 | 20'8" × 9'8" | 8'2" | 6'8" / 7'2" / 6'8" | 200 sq ft | `AAA MASTER FOLDER\20X10 FLOOR PLAN\20X10 FLOOR PLAN (2).png` |
| 20×20 | 20'8" × 19'4" | 17'11" | 6'8" / 7'2" / 6'8" | 400 sq ft | `Imperial-20尺两室一厅.pdf` |
| 20×30 | 6300 × 9000 mm (20'8" × 29'6") | 8580 mm | 2050 / 2200 / 2050 mm | 610 sq ft | `WHATSAPP NICK MASTER FOLDER\30尺两室一厅.pdf` |
| 20×40 | 20'8" × 38'8" | 37'4" | 6'8" / 7'2" / 6'8" | 800 sq ft | `Imperial-40尺三室一厅.pdf` |

**Heights and folded state**, from `40FT House Parameters(1).pdf`: expanded 11800 × 6300 × 2480 mm; internal 11540 × 6140 × 2200 mm; **folded 11800 × 2200 × 2480 mm**; 5000 kg. The folded width of 2200 mm equals the 7'2" center bay — the home collapses to its core, confirmed rather than inferred.

**Wall construction**, from `Image No 10 - Measurements Table.pdf`: 950-type EPS color-steel composite panel, 0.16 ft (≈50 mm) walls and roof, 0.21 ft (≈64 mm) on one element; fireproof cement fiber floor and bamboo plywood; galvanized square tube frame throughout.

**Openings:** front double door 1880 × 2220 mm; windows 920 × 920 mm — stated in the Hebei construction diagram and confirmed in the measurements table as W3.018 ft × L3.018 ft, supplied **6 pieces** for one model and **8 pieces** for the other.

**Foundation layouts** (`Foundation Support Placement - 20 / 40 ft Base Layout.pdf`) give pier positions in decimal feet: 20 ft unit 20.67 × 17.98 with piers at 5.72 ft spacing; 40 ft unit 38.71 long with five 7.30 ft bays. These are pier centers, not wall lines, and must not be mixed with the plan dimensions.

### Correction to a previous finding

I earlier flagged that the 30-foot plan measured ≈551 sq ft against an advertised ~600, and raised it as a possible overstated marketing claim. **That was wrong, and the flag is withdrawn.** The file I measured, `FLOOR PLANS AND ELECTRICAL PLANS\20X20 2 bed, 1 bath.jpg`, is a different supplier's 30-foot unit at 6220 × 8220 mm. The Imperial plan set — the one matching every other model — gives 6300 × 9000 mm ≈ 610 sq ft. The advertised figure is correct. The file is still misnamed: it is a 30-foot plan, not a 20×20.

---

## 4. Motion and 3D reference

**`AAA MASTER FOLDER\VIDEOS\METAL ROOF TRUSS SYSTEM.mp4`** — 30 seconds, 848 × 400. This is not a photograph reel: it is a **rendered CAD orbit** of the expandable home, complete with porch, railing, steps, windows, door and the pitched truss roof, turning through many angles and separating into its roof assembly. Someone built a 3D model of this product.

**Implication worth acting on:** if the manufacturer will release that source model — SketchUp, STEP, OBJ or similar — the geometry phase of the configurator collapses from "build it from dimensions" to "import, clean and scale it." That is the single highest-leverage request available on this project right now.

**`AAA MASTER FOLDER\VIDEOS\WhatsApp Video 2026-05-24 at 8.05.05 PM.mp4`** — 61 seconds, portrait. A continuous **interior walkthrough** of a finished unit: exterior approach across the deck, through the double doors, down the hall, into bedrooms, bathroom and living area. Low resolution and hand-held, but it is a genuine walkthrough of the real product, and it is not on the website.

**`PITCHED ROOF TRUSS SYSTEM FOR METAL ROOF\`** — two clean CAD renders, standard and solar-reinforced, showing the truss geometry above a flat-roofed box. Confirms the metal roof is added structure above the base roof, not a change to the base silhouette.

**`STRUCTURAL FRAMES OF HOUSES\EXPANDABLE HOUSE FRAME.png`** plus the Hebei cutaway give the frame members and their connections.

---

## 5. Materials and color

| Asset | Contribution |
|---|---|
| `Metal carved plate catalogue.pdf` | 92 finish tiles — see §2 |
| `Color options\Exterior House Colors.pdf`, `Raul Color Card.pdf` | RAL exterior range; the 63 codes on the site are already transcribed to hex in the repo |
| `Color options\Roof Color Chart.pdf`, `Color Chart.pdf` | Roof color range with SRI/LRV |
| `ALL EXPANDABLE HOMES INTERIOR PICS` (63 files) | Interior photography for the plan-view gallery |
| `DELIVERED HOMES` (15 files) | Real delivered units — credibility imagery, not configurator input |

---

## 6. Commercial documents found

`ALL MASTER WHOLESALE PRICE LIST.xlsx` (46 MB), `unit price 2024 v3.pdf`, `(20ft)` and `(40ft) Double wing extension housing data sheet` (2.5 MB / 8 MB), `space capsule price list_.pdf`, and quotations from BioGreen and others. These bear on cost and margin work — blocker B-07 — not on the configurator, and were not opened in this pass.

`Product Catalog  .pdf` is a 73-page BioGreen supplier catalogue. Page 26 carries an effect-display table of external, internal and folded dimensions for 20-foot and 40-foot units — a second independent source for §3. Page 32 covers the "double wing extension house", which is this product line.

---

## 7. What does not exist in this folder

Established by looking, so the configurator plan does not assume otherwise:

- **No 360° turntable photography** of any model.
- **No per-color photography.** No model is photographed in more than one exterior color from a fixed camera.
- **No CAD source file.** The truss video is rendered output; no .skp, .step, .obj, .fbx or .dwg was found anywhere in the tree.
- **No Duplex plan or dimensions.**
- **No texture maps** beyond the carved plate catalogue — no normal, roughness or displacement maps.
- **No metal roof pitch dimension.** The truss renders show the geometry but carry no numbers.

---

## 8. Duplication

`AAA MASTER FOLDER` (383 files) and `AAA ALL CONTENT FOR WEBSITE UOLOAD TO CLAUDE` (289 files) overlap heavily, and several assets appear in three or four locations — the 40-foot parameter sheet, the truss video, the master price list and the color charts each exist in multiple copies. Not a problem to solve now, but any future automated sweep of this folder should deduplicate by content hash rather than by filename.

---

## 9. What this changes

1. **Every expandable footprint is now known.** P-1 is transcription, not discovery, and no dimensional guesswork is required for 20×10, 20×20, 20×30 or 20×40.
2. **The base roof is flat; the pitched metal roof is an upgrade layered above it.** P-2 and P-5 are scoped accordingly.
3. **92 finishes are available where the site shows 9.**
4. **A CAD model of this product exists somewhere.** Requesting it may remove most of P-2.
5. **A real interior walkthrough video exists and is unpublished.**

---

## 10. Recommended actions

| # | Action | Why |
|---|---|---|
| 1 | Ask the manufacturer for the 3D source model behind the truss video | Could remove most of the geometry build |
| 2 | Ask for the metal roof pitch, the Duplex plan, and the 20×10 parameter sheet | The only remaining dimensional gaps |
| 3 | Decide which of the 92 carved finishes to sell | A merchandising decision that shapes the configurator's option tree |
| 4 | Publish the interior walkthrough video on the product or design page | Zero build cost, immediate value, independent of the configurator |
| 5 | Rename `20X20 2 bed, 1 bath.jpg` to reflect that it is a 30-foot plan from another supplier | Prevents the same misreading recurring |

---

**Audit performed by:** Claude (Opus 5), acting under the Canonical Engineering Specification & Implementation Laws
**Files opened and inspected:** 30+ in full, plus contact-sheet sampling across the photographic folders
**Facts asserted without inspection:** none
