// Bright Box Homes — detailed shell, stepped base roof, and metal roof upgrade.
//
// buildShell.ts remains the numeric proportion contract the AC-07 test measures.
// This module adds the architectural detail that makes the render read as the
// product rather than as a carton.
//
// ── WHAT THE SOURCE MATERIAL ESTABLISHES ──────────────────────────────────────
// videos/metal-roof-truss.mp4 (manufacturer CAD animation, 30 s) is the single
// most informative asset in the library. Frames at 2 s / 10 s show the finished
// base home; 16 s through 28 s show the metal roof going on. It establishes:
//
//   1. THE BASE ROOF IS STEPPED, NOT FLAT. The core — the section that folds down
//      to shipping width — stands proud of the two wings, with an upstand where
//      each wing roof meets the core wall. Owner-stated step: about 6 inches.
//      This profile is visible in every base-configuration photograph once you
//      know to look for it, and it is what the metal roof upgrade conceals.
//
//   2. THE METAL ROOF IS AN UPSELL, NOT THE DEFAULT. Standard roofing is the
//      stepped panel deck. The truss-and-panel gable is a priced upgrade.
//
//   3. ASSEMBLY ORDER: truss members fly in and lock together first — posts,
//      rafters, purlins, ridge — and only then do the metal panels drop into the
//      bays. The configurator reproduces that order.
//
// model-20x30.png — heavy dark steel rails on EVERY box edge, panels recessed.
// model-20x40-b.jpg — deep gable overhang on posts; deck and railing beneath.
// upgrades/metal-roof-truss-standard.png — the truss is a square-tube space frame.
//
// ── DIMENSIONAL HONESTY ───────────────────────────────────────────────────────
// The box is exact (dimensions.ts). Everything in STEP, ROOF and PORCH below is
// SCHEMATIC — owner-stated or read off undimensioned renders. They are gathered
// here so one factory answer corrects all of them in a single edit.

import type { ModelDimensions, AssemblyGroup } from './types';

/** Height the core stands above the wing roofs. Owner-stated as "about 6 inches";
 *  not dimensioned on any drawing we hold. 6 in = 152.4 mm. */
export const STEP = {
  coreRiseMm: 152,
  /** Upstand / flashing where a wing roof abuts the core wall. */
  upstandMm: 90,
  /** Roof deck panel thickness on the base home. */
  deckPanelMm: 50,
} as const;

// ── SCHEMATIC METAL ROOF PARAMETERS — awaiting factory dimensions ─────────────
export const ROOF = {
  pitchDeg: 15,
  eaveOverhangMm: 450,
  gableOverhangMm: 300,
  fasciaMm: 180,
  panelMm: 60,
  memberMm: 80,
  springingMm: 120,
  /** Nominal width of one metal roof panel, measured along the depth. */
  panelRunMm: 1000,
} as const;

// ── SCHEMATIC PORCH PARAMETERS — awaiting factory dimensions ──────────────────
export const PORCH = {
  depthMm: 2100,
  deckDropMm: 60,
  deckThicknessMm: 90,
  railHeightMm: 1050,
  railPostMm: 50,
  balusterMm: 22,
  balusterSpacingMm: 115,
  postMm: 100,
} as const;

/** Heavy steel rail on every box edge — the most recognisable feature of the
 *  bare unit. Photographed on all twelve edges of every box. */
const FRAME_MM = 90;

export type DetailRole =
  | 'core' | 'wing' | 'roof' | 'chassis' | 'glazing' | 'trim'
  | 'frame' | 'panel' | 'mullion' | 'fascia' | 'post' | 'deck' | 'rail' | 'foot'
  | 'deckPanel' | 'upstand';

export interface DetailBox {
  id: string;
  role: DetailRole;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  xMm: number;
  yMm: number;
  zMm: number;
  /** Rotation about z, radians. Roof slopes only. */
  rotZ?: number;

  // ── Assembly animation ──────────────────────────────────────────────────────
  group?: AssemblyGroup;
  /** Window within the 0..1 assembly timeline during which this part arrives. */
  phaseStart?: number;
  phaseEnd?: number;
  /** Offset from its final position at the start of its window. */
  liftMm?: number;
  slideXMm?: number;
}

function box(
  id: string, role: DetailRole,
  w: number, h: number, d: number,
  x: number, y: number, z: number,
  extra: Partial<DetailBox> = {},
): DetailBox {
  return { id, role, widthMm: w, heightMm: h, depthMm: d, xMm: x, yMm: y, zMm: z, ...extra };
}

/** The twelve edge rails of one box, plus its four recessed panel faces. */
function framedBox(
  prefix: string, w: number, h: number, d: number,
  cx: number, cy: number, cz: number, out: DetailBox[],
) {
  const f = FRAME_MM;
  const hw = w / 2, hh = h / 2, hd = d / 2;

  for (const sx of [-1, 1] as const)
    for (const sz of [-1, 1] as const)
      out.push(box(`${prefix}-cnr-${sx}-${sz}`, 'frame', f, h, f,
        cx + sx * (hw - f / 2), cy, cz + sz * (hd - f / 2)));

  for (const sx of [-1, 1] as const)
    for (const sy of [-1, 1] as const)
      out.push(box(`${prefix}-rail-d-${sx}-${sy}`, 'frame', f, f, d,
        cx + sx * (hw - f / 2), cy + sy * (hh - f / 2), cz));

  for (const sz of [-1, 1] as const)
    for (const sy of [-1, 1] as const)
      out.push(box(`${prefix}-rail-w-${sz}-${sy}`, 'frame', w, f, f,
        cx, cy + sy * (hh - f / 2), cz + sz * (hd - f / 2)));

  const inset = f * 0.55;
  out.push(box(`${prefix}-p-front`, 'panel', w - f * 1.2, h - f * 1.2, f * 0.5, cx, cy, cz + hd - inset));
  out.push(box(`${prefix}-p-rear`,  'panel', w - f * 1.2, h - f * 1.2, f * 0.5, cx, cy, cz - hd + inset));
  out.push(box(`${prefix}-p-left`,  'panel', f * 0.5, h - f * 1.2, d - f * 1.2, cx - hw + inset, cy, cz));
  out.push(box(`${prefix}-p-right`, 'panel', f * 0.5, h - f * 1.2, d - f * 1.2, cx + hw - inset, cy, cz));
}

/** Recessed glass inside a proud frame, with a centre mullion. */
function window4(
  id: string, onSide: boolean, w: number, h: number,
  x: number, y: number, z: number, out: DetailBox[],
) {
  const fr = 70, t = 60;
  const W = onSide ? t : w;
  const D = onSide ? w : t;

  out.push(box(`${id}-glass`, 'glazing', W * 0.92, h * 0.92, D * 0.92, x, y, z));
  out.push(box(`${id}-top`, 'mullion', onSide ? t : w + fr, fr, onSide ? w + fr : t, x, y + h / 2, z));
  out.push(box(`${id}-bot`, 'mullion', onSide ? t : w + fr, fr, onSide ? w + fr : t, x, y - h / 2, z));
  if (onSide) {
    out.push(box(`${id}-a`, 'mullion', t, h, fr, x, y, z - w / 2));
    out.push(box(`${id}-b`, 'mullion', t, h, fr, x, y, z + w / 2));
    out.push(box(`${id}-m`, 'mullion', t * 1.05, h, fr * 0.6, x, y, z));
  } else {
    out.push(box(`${id}-a`, 'mullion', fr, h, t, x - w / 2, y, z));
    out.push(box(`${id}-b`, 'mullion', fr, h, t, x + w / 2, y, z));
    out.push(box(`${id}-m`, 'mullion', fr * 0.6, h, t * 1.05, x, y, z));
  }
}

export interface DetailOptions {
  expand: number;
  /** Metal truss and panel roof upgrade. When false the stepped base deck shows. */
  metalRoof: boolean;
  porch: boolean;
  /** 0 = nothing built, 1 = fully assembled. Only meaningful with metalRoof. */
  assembly?: number;
}

export function buildDetailed(m: ModelDimensions, opts: DetailOptions): DetailBox[] {
  const e = Math.min(1, Math.max(0, opts.expand));
  const out: DetailBox[] = [];

  const { coreWidthMm: cw, wingWidthMm: ww, depthMm: d, exteriorHeightMm: coreH } = m;
  const wingH = coreH - STEP.coreRiseMm;
  const travel = e * (cw / 2 + ww / 2);

  // ── Boxes. The core stands proud of the wings by STEP.coreRiseMm. ───────────
  framedBox('core', cw, coreH, d, 0, coreH / 2, 0, out);
  framedBox('wingL', ww, wingH, d, -travel, wingH / 2, 0, out);
  framedBox('wingR', ww, wingH, d, travel, wingH / 2, 0, out);

  // ── Base roof deck: raised band over the core, lower decks over the wings,
  //    and an upstand where each wing deck abuts the core wall. This is the
  //    standard roof, and the metal upgrade covers it. ─────────────────────────
  out.push(box('deck-core', 'deckPanel', cw + 40, STEP.deckPanelMm, d + 40,
    0, coreH + STEP.deckPanelMm / 2, 0));

  for (const sx of [-1, 1] as const) {
    out.push(box(`deck-wing-${sx}`, 'deckPanel', ww + 20, STEP.deckPanelMm, d + 40,
      sx * travel, wingH + STEP.deckPanelMm / 2, 0));

    if (e > 0.02) {
      out.push(box(`upstand-${sx}`, 'upstand', STEP.upstandMm, STEP.coreRiseMm + 40, d + 40,
        sx * (cw / 2 + STEP.upstandMm / 2), wingH + STEP.coreRiseMm / 2, 0));
    }
  }

  // ── Glazed door assembly in the core, front elevation ───────────────────────
  const doorW = 1880, doorH = Math.min(2220, m.interiorHeightMm);
  const dz = d / 2 + 30;
  out.push(box('door-glass', 'glazing', doorW, doorH, 50, 0, doorH / 2, dz));
  out.push(box('door-head', 'mullion', doorW + 140, 90, 70, 0, doorH + 45, dz));
  out.push(box('door-sill', 'mullion', doorW + 140, 70, 70, 0, 35, dz));
  for (const o of [-1, -0.333, 0.333, 1] as const)
    out.push(box(`door-mull-${o}`, 'mullion', 60, doorH, 70, (o * doorW) / 2, doorH / 2, dz));

  // ── Windows ─────────────────────────────────────────────────────────────────
  const winW = 920, winH = 920, wy = 1000 + 920 / 2;
  for (const sx of [-1, 1] as const) {
    const tag = sx < 0 ? 'L' : 'R';
    const px = sx * travel;
    if (e > 0.02) {
      const n = Math.max(1, Math.round(d / 3000));
      for (let i = 0; i < n; i++) {
        const z = n === 1 ? 0 : -d / 2 + (d * (i + 0.5)) / n;
        window4(`win-${tag}-side-${i}`, true, winW, winH, px + sx * (ww / 2 + 20), wy, z, out);
      }
    }
    window4(`win-${tag}-front`, false, winW, winH, px, wy, d / 2 + 25, out);
    if (d >= 5900) window4(`win-${tag}-rear`, false, winW, winH, px, wy, -(d / 2 + 25), out);
  }

  // ── Chassis and levelling feet ──────────────────────────────────────────────
  out.push(box('chassis', 'chassis', cw, 260, d, 0, -130, 0));
  for (const sx of [-1, 1] as const)
    for (const fz of [-0.34, 0.34] as const)
      out.push(box(`foot-${sx}-${fz}`, 'foot', 340, 70, 260, sx * (cw / 2 - 200), -295, fz * d));

  // ── METAL ROOF UPGRADE ──────────────────────────────────────────────────────
  // Timeline, matching the manufacturer animation:
  //   0.00 – 0.18  posts
  //   0.15 – 0.55  rafters, sweeping front to back
  //   0.34 – 0.64  purlins, then the ridge
  //   0.52 – 0.68  fascia
  //   0.68 – 1.00  metal panels dropping into the bays
  if (opts.metalRoof) {
    const spanHalf = m.expandedWidthMm / 2 + (opts.porch ? PORCH.depthMm : ROOF.eaveOverhangMm);
    const eaveY = coreH + STEP.deckPanelMm + ROOF.springingMm;
    const rise = spanHalf * Math.tan((ROOF.pitchDeg * Math.PI) / 180);
    const ridgeY = eaveY + rise;
    const roofD = d + ROOF.gableOverhangMm * 2;
    const slopeLen = Math.hypot(spanHalf, rise);
    const angle = Math.atan2(rise, spanHalf);

    if (spanHalf > m.expandedWidthMm / 2 + 200) {
      const postY = eaveY - ROOF.fasciaMm;
      let i = 0;
      for (const sx of [-1, 1] as const)
        for (const pz of [-0.42, 0, 0.42] as const) {
          out.push(box(`post-${sx}-${pz}`, 'post', PORCH.postMm, postY, PORCH.postMm,
            sx * (spanHalf - PORCH.postMm), postY / 2, pz * d, {
              group: 'truss', phaseStart: 0.0 + i * 0.02, phaseEnd: 0.18 + i * 0.02, liftMm: 2600,
            }));
          i++;
        }
    }

    const rafterCount = Math.max(3, Math.round(roofD / 1200));

    for (const sx of [-1, 1] as const) {
      const tag = sx < 0 ? 'L' : 'R';
      const cxSlope = sx * (spanHalf / 2);
      const cySlope = (eaveY + ridgeY) / 2;

      for (let i = 0; i <= rafterCount; i++) {
        const z = -roofD / 2 + (roofD * i) / rafterCount;
        const f = i / rafterCount;
        out.push(box(`rafter-${tag}-${i}`, 'trim', slopeLen, ROOF.memberMm * 0.8, ROOF.memberMm * 0.8,
          cxSlope, cySlope - ROOF.panelMm, z, {
            rotZ: -sx * angle,
            group: 'truss', phaseStart: 0.15 + f * 0.30, phaseEnd: 0.28 + f * 0.30,
            liftMm: 3200, slideXMm: sx * 1800,
          }));
      }

      for (let k = 1; k <= 3; k++) {
        const along = (k / 4) * spanHalf;
        out.push(box(`purlin-${tag}-${k}`, 'trim', ROOF.memberMm * 0.6, ROOF.memberMm * 0.6, roofD,
          sx * along, eaveY + (along / spanHalf) * rise - ROOF.panelMm * 1.6, 0, {
            group: 'truss', phaseStart: 0.34 + k * 0.03, phaseEnd: 0.50 + k * 0.03, liftMm: 2400,
          }));
      }

      out.push(box(`fascia-${tag}`, 'fascia', ROOF.memberMm, ROOF.fasciaMm, roofD,
        sx * spanHalf, eaveY - ROOF.fasciaMm / 2, 0, {
          group: 'truss', phaseStart: 0.52, phaseEnd: 0.68, liftMm: 1200,
        }));

      out.push(box(`soffit-${tag}`, 'fascia', slopeLen, ROOF.memberMm * 0.4, roofD,
        cxSlope, cySlope - ROOF.panelMm * 1.15, 0, {
          rotZ: -sx * angle, group: 'panel', phaseStart: 0.68, phaseEnd: 0.80, liftMm: 500,
        }));

      const panelCount = Math.max(3, Math.round(roofD / ROOF.panelRunMm));
      const panelD = roofD / panelCount;
      for (let i = 0; i < panelCount; i++) {
        const z = -roofD / 2 + panelD * (i + 0.5);
        const f = i / panelCount;
        out.push(box(`rpanel-${tag}-${i}`, 'roof', slopeLen, ROOF.panelMm, panelD * 0.995,
          cxSlope, cySlope, z, {
            rotZ: -sx * angle,
            group: 'panel', phaseStart: 0.70 + f * 0.22, phaseEnd: 0.78 + f * 0.22, liftMm: 2200,
          }));
      }
    }

    out.push(box('ridge', 'trim', ROOF.memberMm * 1.5, ROOF.memberMm * 1.5, roofD,
      0, ridgeY - ROOF.panelMm / 2, 0, {
        group: 'truss', phaseStart: 0.46, phaseEnd: 0.64, liftMm: 2800,
      }));
  }

  // ── Porch deck and railing, both long sides ─────────────────────────────────
  if (opts.porch) {
    const inner = m.expandedWidthMm / 2;
    const outer = inner + PORCH.depthMm;
    const deckY = -PORCH.deckDropMm - PORCH.deckThicknessMm / 2;
    const railY = PORCH.railHeightMm;

    for (const sx of [-1, 1] as const) {
      const cxDeck = (sx * (inner + outer)) / 2;
      const edgeX = sx * (outer - PORCH.railPostMm);

      out.push(box(`deck-${sx}`, 'deck', PORCH.depthMm, PORCH.deckThicknessMm, d, cxDeck, deckY, 0));
      out.push(box(`deck-skirt-${sx}`, 'chassis', 60, 210, d,
        sx * outer, deckY - PORCH.deckThicknessMm / 2 - 105, 0));

      const runs: [number, number, number, number][] = [
        [PORCH.railPostMm, d, edgeX, 0],
        [PORCH.depthMm, PORCH.railPostMm, cxDeck, d / 2],
        [PORCH.depthMm, PORCH.railPostMm, cxDeck, -d / 2],
      ];
      for (const [rw, rd, rx, rz] of runs) {
        out.push(box(`rail-t-${sx}-${rx}-${rz}`, 'rail', rw, PORCH.railPostMm, rd, rx, railY, rz));
        out.push(box(`rail-b-${sx}-${rx}-${rz}`, 'rail', rw, PORCH.railPostMm, rd, rx, 220, rz));
      }
      const count = Math.floor(d / PORCH.balusterSpacingMm);
      for (let i = 0; i <= count; i++) {
        const z = -d / 2 + (d * i) / count;
        out.push(box(`bal-${sx}-${i}`, 'rail', PORCH.balusterMm, railY - 220, PORCH.balusterMm,
          edgeX, (railY + 220) / 2, z));
      }
    }
  }

  return out;
}

/** Smoothstep easing, so parts settle rather than arrive at constant speed. */
function ease(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

/**
 * Where a part sits, and how visible it is, at a given point on the assembly
 * timeline. Parts with no group are always fully placed.
 */
export function assemblyState(b: DetailBox, assembly: number) {
  if (!b.group || b.group === 'base') return { dx: 0, dy: 0, opacity: 1, visible: true };

  const start = b.phaseStart ?? 0;
  const end = b.phaseEnd ?? 1;
  const raw = (assembly - start) / Math.max(1e-6, end - start);
  const t = ease(raw);

  return {
    dx: (1 - t) * (b.slideXMm ?? 0),
    dy: (1 - t) * (b.liftMm ?? 0),
    opacity: Math.min(1, Math.max(0, raw * 1.6)),
    visible: assembly > start,
  };
}
