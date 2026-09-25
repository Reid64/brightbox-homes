// Bright Box Homes — configurator geometry contracts
//
// UNIT OF RECORD: millimetres, stored as integers.
//
// This is a deliberate deviation from CONFIGURATOR_SPEC.md §5.2, which specified
// integer inches. The manufacturer's parameter sheet and plan set are metric, and
// the family's bay widths do not survive the round-trip: the imperial plan rounds
// the bays to 6'8" / 7'2" / 6'8" = 246 in, while the same bays in metric are
// 2050 + 2200 + 2050 = 6300 mm = 248.03 in. Storing inches would bake a 2-inch
// error into every model's width. Millimetres are exact against the source PDFs.
// Imperial is derived for display only, never stored.

export type ModelId = '20x10' | '20x20' | '20x30' | '20x40';

export type OpeningKind = 'door' | 'window';
export type Face = 'front' | 'rear' | 'left' | 'right';
export type Part = 'core' | 'leftWing' | 'rightWing';

/**
 * How much a figure can be trusted.
 *
 *  'plan'      — read directly off a manufacturer drawing or the parameter sheet.
 *                Safe to quote to a customer.
 *  'schematic' — the SIZE comes from a drawing, but the POSITION is representative.
 *                The render is proportionally honest; the exact placement is not
 *                dimensioned in any document we hold. Never quote to a customer.
 */
export type Provenance = 'plan' | 'schematic';

export interface Opening {
  kind: OpeningKind;
  face: Face;
  onPart: Part;
  /** Centre of the opening, offset from the centre of its own part, along that face. */
  offsetMm: number;
  /** Height of the opening's bottom edge above finished floor. */
  sillHeightMm: number;
  widthMm: number;
  heightMm: number;
  provenance: Provenance;
}

export interface ModelDimensions {
  id: ModelId;
  /** Must match the order label produced in DesignJourneyContent.tsx exactly. */
  label: string;

  /** Overall width with both wings deployed. */
  expandedWidthMm: number;
  /** Overall width folded for transport. Equals the core: the wings retract inside it. */
  collapsedWidthMm: number;
  /** Fixed centre section. Carries the structure and does not move. */
  coreWidthMm: number;
  /** One wing. Two wings + core = expanded width. */
  wingWidthMm: number;

  depthMm: number;
  interiorDepthMm: number;
  /** Overall exterior height, ground to top of the flat roof deck. */
  exteriorHeightMm: number;
  interiorHeightMm: number;
  wallThicknessMm: number;

  wings: 0 | 1 | 2;
  storeys: 1 | 2;
  areaSqFt: number;

  openings: Opening[];
  /** Every document this record's numbers were read from. */
  sources: string[];
}

/** Which assembly stage a part belongs to, for the roof build-up animation. */
export type AssemblyGroup = 'base' | 'truss' | 'panel';

/** A single rectangular solid in the assembled model. Millimetres, origin at the
 *  centre of the floor of the core. +x right, +y up, +z toward the front elevation. */
export interface ShellBox {
  id: string;
  role: 'core' | 'wing' | 'roof' | 'chassis' | 'glazing' | 'trim';
  widthMm: number;
  heightMm: number;
  depthMm: number;
  xMm: number;
  yMm: number;
  zMm: number;
}
