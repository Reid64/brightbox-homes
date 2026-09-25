// Bright Box Homes — shell geometry.
//
// Produces a plain array of boxes in millimetres. No three.js import, no WebGL,
// no DOM. That is deliberate: proportions can then be unit-tested numerically on
// CI with no GPU, which is how AC-07 ("proportions match the plans within 1 inch")
// is actually proven rather than eyeballed.
//
// Coordinate system: origin at the centre of the core's floor.
//   +x right, +y up, +z toward the front elevation. Millimetres throughout.

import type { ModelDimensions, ShellBox } from './types';

/** Thickness of the flat sandwich roof panel. Parameter sheet. */
const ROOF_PANEL_MM = 50;
/** Chassis/skid below the floor line. Construction diagram. */
const CHASSIS_MM = 260;
/** How far glazing stands proud of its wall, so it reads at a distance. */
const GLAZING_PROUD_MM = 20;

/**
 * @param model  a verified record from dimensions.ts
 * @param expand 0 = folded for transport, 1 = fully deployed. Values between are
 *               the animation states; nothing else in the model changes.
 */
export function buildShell(model: ModelDimensions, expand: number): ShellBox[] {
  const e = Math.min(1, Math.max(0, expand));
  const boxes: ShellBox[] = [];

  const {
    coreWidthMm,
    wingWidthMm,
    depthMm,
    exteriorHeightMm,
    interiorHeightMm,
  } = model;

  // ── Core: fixed, never moves ────────────────────────────────────────────────
  boxes.push({
    id: 'core',
    role: 'core',
    widthMm: coreWidthMm,
    heightMm: exteriorHeightMm,
    depthMm,
    xMm: 0,
    yMm: exteriorHeightMm / 2,
    zMm: 0,
  });

  // ── Wings: translate outward from inside the core ───────────────────────────
  // At e=0 each wing sits concentric with the core (folded inside it); at e=1 it
  // sits flush outboard. Travel is therefore half the core plus half the wing.
  const travel = e * (coreWidthMm / 2 + wingWidthMm / 2);

  for (const side of [-1, 1] as const) {
    const tag = side === -1 ? 'leftWing' : 'rightWing';

    boxes.push({
      id: tag,
      role: 'wing',
      widthMm: wingWidthMm,
      heightMm: exteriorHeightMm,
      depthMm,
      xMm: side * travel,
      yMm: exteriorHeightMm / 2,
      zMm: 0,
    });
  }

  // ── Roof: spans whatever the wings currently cover ──────────────────────────
  const roofSpan = coreWidthMm + 2 * e * wingWidthMm;
  boxes.push({
    id: 'roof',
    role: 'roof',
    widthMm: roofSpan,
    heightMm: ROOF_PANEL_MM,
    depthMm,
    xMm: 0,
    yMm: exteriorHeightMm + ROOF_PANEL_MM / 2,
    zMm: 0,
  });

  // ── Chassis under the core only: the wings are carried by it ────────────────
  boxes.push({
    id: 'chassis',
    role: 'chassis',
    widthMm: coreWidthMm,
    heightMm: CHASSIS_MM,
    depthMm,
    xMm: 0,
    yMm: -CHASSIS_MM / 2,
    zMm: 0,
  });

  // ── Openings ────────────────────────────────────────────────────────────────
  for (const [i, o] of model.openings.entries()) {
    // A door cannot be taller than the wall that holds it. Where the source
    // documents disagree (the construction diagram's 2220 mm door against the
    // parameter sheet's 2200 mm interior height, two different suppliers), the
    // wall wins for rendering. The sourced figure is preserved in dimensions.ts.
    const heightMm = Math.min(o.heightMm, interiorHeightMm);
    const yMm = o.sillHeightMm + heightMm / 2;

    // Which part carries it, and where that part currently sits.
    const partX =
      o.onPart === 'core' ? 0 : o.onPart === 'leftWing' ? -travel : travel;
    const partWidth = o.onPart === 'core' ? coreWidthMm : wingWidthMm;

    // An opening on a wing's outer face rides with the wing and must stay hidden
    // while folded, otherwise glazing floats in mid-air during the animation.
    const hiddenWhileFolded =
      o.onPart !== 'core' && (o.face === 'left' || o.face === 'right') && e < 0.02;
    if (hiddenWhileFolded) continue;

    let xMm = partX;
    let zMm = 0;
    let widthMm = o.widthMm;
    let depthMmBox = GLAZING_PROUD_MM;

    switch (o.face) {
      case 'front':
        zMm = depthMm / 2 + GLAZING_PROUD_MM / 2;
        xMm = partX + o.offsetMm;
        break;
      case 'rear':
        zMm = -(depthMm / 2 + GLAZING_PROUD_MM / 2);
        xMm = partX + o.offsetMm;
        break;
      case 'left':
        xMm = partX - (partWidth / 2 + GLAZING_PROUD_MM / 2);
        zMm = o.offsetMm;
        widthMm = GLAZING_PROUD_MM;
        depthMmBox = o.widthMm;
        break;
      case 'right':
        xMm = partX + (partWidth / 2 + GLAZING_PROUD_MM / 2);
        zMm = o.offsetMm;
        widthMm = GLAZING_PROUD_MM;
        depthMmBox = o.widthMm;
        break;
    }

    boxes.push({
      id: `${o.kind}-${o.onPart}-${o.face}-${i}`,
      role: 'glazing',
      widthMm,
      heightMm,
      depthMm: depthMmBox,
      xMm,
      yMm,
      zMm,
    });
  }

  return boxes;
}

/** Overall bounding width of the assembled shell at a given expansion. Used by
 *  the proportion test and by the camera framing. */
export function shellWidthMm(model: ModelDimensions, expand: number): number {
  const e = Math.min(1, Math.max(0, expand));
  return model.coreWidthMm + 2 * e * model.wingWidthMm;
}
