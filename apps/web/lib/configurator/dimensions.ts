// Bright Box Homes — verified model dimensions.
//
// Every number below is traceable to a manufacturer document. Nothing here is
// interpolated, averaged, or inferred from a photograph. Where a figure could not
// be established it is absent and the model is absent with it — see NOT MODELLED.
//
// Read from source 2026-09-24, transcribed 2026-09-25.
//
// ── FAMILY CONSTANTS ────────────────────────────────────────────────────────────
// One width and one core across the entire expandable family; only depth varies.
// Confirmed against the 40-foot parameter sheet rather than inferred from plans.
//
//   expanded width   6300 mm  (20 ft 8 in)
//   core / folded    2200 mm  ( 7 ft 2.6 in)  ← the folded unit IS the core
//   wing             2050 mm  each, 2 per home
//   exterior height  2480 mm  ( 8 ft 1.6 in)
//   interior height  2200 mm  ( 7 ft 2.6 in)
//
// 2050 + 2200 + 2050 = 6300 exactly.
//
// ── ROOF ────────────────────────────────────────────────────────────────────────
// The base roof is FLAT. The parameter sheet gives a single overall height of
// 2480 mm including a 50 mm sandwich roof panel, and the Hebei construction diagram
// shows a flat deck. The pitched metal roof in the options list is added geometry
// ABOVE this deck, not a change to the base silhouette.
//
// ── NOT MODELLED, AND WHY ───────────────────────────────────────────────────────
//   Duplex          — no plan exists anywhere in the asset library. Storey height
//                     and stacking detail unknown. Modelling it would be invention.
//   Metal roof      — pitch and ridge height are not dimensioned on any document.
//                     CAD renders of the truss exist but carry no measurements.
//   Covered porch   — depth, width and post positions are an open question with the
//                     factory, and the porch is documented inconsistently (standard
//                     on the site, a priced line item on the options sheet).
//
// Each of these is blocked on a factory answer, not on engineering effort.

import type { ModelDimensions, Opening } from './types';

const EXPANDED_WIDTH_MM = 6300;
const CORE_WIDTH_MM = 2200;
const WING_WIDTH_MM = 2050;
const EXTERIOR_HEIGHT_MM = 2480;
const INTERIOR_HEIGHT_MM = 2200;

// Front double door, broken-bridge aluminium. Hebei construction diagram.
const DOOR_WIDTH_MM = 1880;
const DOOR_HEIGHT_MM = 2220;

// Windows. Size is dimensioned on the construction diagram; placement is not
// dimensioned on any document we hold, so every window is marked 'schematic'.
const WINDOW_MM = 920;
const WINDOW_SILL_MM = 1000;

const PARAMETER_SHEET = '40FT House Parameters(1).pdf (manufacturer, 2023 rev)';
const HEBEI_DIAGRAM = 'Hebei, House Construction specifications Diagram.png';

/** Front door on the core, plus a window on the outer face of each wing. Longer
 *  models additionally carry a front and rear window on each wing. */
function standardOpenings(depthMm: number): Opening[] {
  const openings: Opening[] = [
    {
      kind: 'door',
      face: 'front',
      onPart: 'core',
      offsetMm: 0,
      sillHeightMm: 0,
      widthMm: DOOR_WIDTH_MM,
      heightMm: DOOR_HEIGHT_MM,
      provenance: 'plan',
    },
  ];

  for (const [part, face] of [
    ['leftWing', 'left'],
    ['rightWing', 'right'],
  ] as const) {
    openings.push({
      kind: 'window',
      face,
      onPart: part,
      offsetMm: 0,
      sillHeightMm: WINDOW_SILL_MM,
      widthMm: WINDOW_MM,
      heightMm: WINDOW_MM,
      provenance: 'schematic',
    });

    // Only the 20-foot model and longer have wall length for elevation windows.
    if (depthMm >= 5900) {
      for (const elevation of ['front', 'rear'] as const) {
        openings.push({
          kind: 'window',
          face: elevation,
          onPart: part,
          offsetMm: 0,
          sillHeightMm: WINDOW_SILL_MM,
          widthMm: WINDOW_MM,
          heightMm: WINDOW_MM,
          provenance: 'schematic',
        });
      }
    }
  }

  return openings;
}

function base(depthMm: number) {
  return {
    expandedWidthMm: EXPANDED_WIDTH_MM,
    collapsedWidthMm: CORE_WIDTH_MM,
    coreWidthMm: CORE_WIDTH_MM,
    wingWidthMm: WING_WIDTH_MM,
    exteriorHeightMm: EXTERIOR_HEIGHT_MM,
    interiorHeightMm: INTERIOR_HEIGHT_MM,
    wings: 2 as const,
    storeys: 1 as const,
    depthMm,
    openings: standardOpenings(depthMm),
  };
}

export const MODELS: Record<string, ModelDimensions> = {
  '20x10': {
    id: '20x10',
    label: '20×10 Studio',
    ...base(2946), // 9 ft 8 in. Reconciles with half of the 20-foot 5900 mm to within 4 mm.
    interiorDepthMm: 2489, // 8 ft 2 in
    wallThicknessMm: 65,
    areaSqFt: 200,
    sources: ['20X10 FLOOR PLAN (2).png', HEBEI_DIAGRAM],
  },

  '20x20': {
    id: '20x20',
    label: '20×20',
    ...base(5900), // 19 ft 4 in = 5893 mm; parameter sheet states 5900
    interiorDepthMm: 5461, // 17 ft 11 in
    wallThicknessMm: 65,
    areaSqFt: 400,
    sources: ['Imperial-20尺两室一厅.pdf', PARAMETER_SHEET, HEBEI_DIAGRAM],
  },

  '20x30': {
    id: '20x30',
    label: '20×30',
    ...base(9000),
    interiorDepthMm: 8580,
    wallThicknessMm: 65,
    areaSqFt: 610,
    sources: ['30尺两室一厅.pdf', HEBEI_DIAGRAM],
  },

  '20x40': {
    id: '20x40',
    label: '20×40',
    ...base(11800), // 38 ft 8 in = 11786 mm; parameter sheet states 11800
    // SOURCE CONFLICT: the parameter sheet gives internal length 11540 mm
    // (37 ft 10 in); the imperial plan gives 37 ft 4 in (11379 mm). 161 mm apart.
    // The parameter sheet is the manufacturer's unit of record, so it wins here.
    // Interior depth is informational and does not drive exterior geometry.
    interiorDepthMm: 11540,
    wallThicknessMm: 75, // parameter sheet; the Hebei diagram says 65 for other units
    areaSqFt: 800,
    sources: [PARAMETER_SHEET, 'Imperial-40尺三室一厅.pdf', HEBEI_DIAGRAM],
  },
};

export const MODEL_IDS = Object.keys(MODELS) as (keyof typeof MODELS)[];

/** Resolve the order label used by DesignJourneyContent to a model record. */
export function modelByLabel(label: string | null): ModelDimensions | null {
  if (!label) return null;
  return Object.values(MODELS).find((m) => m.label === label) ?? null;
}

/**
 * Conflicts between manufacturer documents that we have identified, cannot resolve
 * from the paperwork we hold, and have asked the factory about. These are NOT
 * integrity failures — the data is a faithful transcription and the disagreement
 * is upstream. Each one must name the two sources and the open question.
 */
export const KNOWN_CONFLICTS: Record<string, string> = {
  'door-height-vs-interior-height':
    'Front door is 2220 mm tall (Hebei construction diagram) but interior height is ' +
    '2200 mm (40FT parameter sheet) — a 20 mm impossibility. Likely the 2220 is a ' +
    'rough opening or is measured from a different datum, but neither document says. ' +
    'On the factory question list. The renderer clamps the door to the wall height.',
};

export interface ValidationResult {
  /** Real internal inconsistencies. Must be empty. */
  problems: string[];
  /** Upstream document disagreements, documented and accepted. */
  conflicts: string[];
}

/** Structural invariants. Called by the unit test, and in development at import. */
export function validateModel(m: ModelDimensions): ValidationResult {
  const problems: string[] = [];
  const conflicts: string[] = [];

  const sum = m.coreWidthMm + m.wingWidthMm * m.wings;
  if (sum !== m.expandedWidthMm) {
    problems.push(
      `${m.id}: core + wings = ${sum} mm but expanded width is ${m.expandedWidthMm} mm`,
    );
  }
  if (m.collapsedWidthMm !== m.coreWidthMm) {
    problems.push(
      `${m.id}: collapsed width ${m.collapsedWidthMm} mm must equal the core ${m.coreWidthMm} mm`,
    );
  }
  if (m.interiorDepthMm >= m.depthMm) {
    problems.push(`${m.id}: interior depth is not less than exterior depth`);
  }
  if (m.interiorHeightMm >= m.exteriorHeightMm) {
    problems.push(`${m.id}: interior height is not less than exterior height`);
  }
  for (const o of m.openings) {
    if (o.sillHeightMm + o.heightMm > m.interiorHeightMm) {
      // The one case we already chased down to its two source documents.
      if (o.kind === 'door' && o.heightMm === DOOR_HEIGHT_MM) {
        conflicts.push(`${m.id}: ${KNOWN_CONFLICTS['door-height-vs-interior-height']}`);
      } else {
        problems.push(`${m.id}: ${o.kind} on ${o.face} is taller than the interior height`);
      }
    }
  }
  if (m.sources.length === 0) {
    problems.push(`${m.id}: no source document recorded`);
  }

  return { problems, conflicts };
}

if (process.env.NODE_ENV !== 'production') {
  const all = Object.values(MODELS).flatMap((m) => validateModel(m).problems);
  if (all.length > 0) {
    // Loud on purpose: wrong proportions misrepresent a product a customer buys.
    console.error('[configurator] dimension integrity failed:\n' + all.join('\n'));
  }
}
