// Proportion and integrity verification for the configurator geometry.
// Runs with no GPU and no browser. This is the AC-07 proof.

import { MODELS, validateModel } from './dimensions';
import { buildShell, shellWidthMm } from './buildShell';

const MM_PER_INCH = 25.4;
let failures = 0;

function check(name: string, ok: boolean, detail: string) {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

console.log('=== DIMENSION INTEGRITY ===');
const allConflicts = new Set<string>();
for (const m of Object.values(MODELS)) {
  const { problems, conflicts } = validateModel(m);
  check(`${m.id} integrity`, problems.length === 0, problems.join('; '));
  conflicts.forEach((c) => allConflicts.add(c.replace(/^\S+: /, '')));
}
if (allConflicts.size > 0) {
  console.log('\n--- DOCUMENTED SOURCE CONFLICTS (not failures, awaiting the factory) ---');
  allConflicts.forEach((c) => console.log('  • ' + c));
}

console.log('\n=== AC-07: PROPORTIONS WITHIN 1 INCH OF PLAN ===');
const PLAN = {
  '20x10': { widthMm: 6300, depthMm: 2946, areaSqFt: 200 },
  '20x20': { widthMm: 6300, depthMm: 5900, areaSqFt: 400 },
  '20x30': { widthMm: 6300, depthMm: 9000, areaSqFt: 610 },
  '20x40': { widthMm: 6300, depthMm: 11800, areaSqFt: 800 },
} as const;

for (const [id, plan] of Object.entries(PLAN)) {
  const m = MODELS[id];
  const deployed = shellWidthMm(m, 1);
  const dW = Math.abs(deployed - plan.widthMm) / MM_PER_INCH;
  check(`${id} deployed width`, dW <= 1, `${deployed} mm vs plan ${plan.widthMm} mm (${dW.toFixed(3)} in)`);

  const dD = Math.abs(m.depthMm - plan.depthMm) / MM_PER_INCH;
  check(`${id} depth`, dD <= 1, `${m.depthMm} mm vs plan ${plan.depthMm} mm (${dD.toFixed(3)} in)`);

  // Footprint sanity against the advertised square footage.
  const sqFt = (deployed / 1000) * (m.depthMm / 1000) * 10.7639;
  const pct = Math.abs(sqFt - plan.areaSqFt) / plan.areaSqFt * 100;
  check(`${id} footprint vs advertised`, pct <= 6, `computed ${sqFt.toFixed(0)} sq ft vs advertised ${plan.areaSqFt} (${pct.toFixed(1)}%)`);
}

console.log('\n=== FOLD BEHAVIOUR ===');
for (const m of Object.values(MODELS)) {
  const folded = shellWidthMm(m, 0);
  check(`${m.id} folds to the core`, folded === m.collapsedWidthMm, `${folded} mm`);
  check(
    `${m.id} folded width fits a road trailer`,
    folded / MM_PER_INCH / 12 <= 8.5,
    `${(folded / MM_PER_INCH / 12).toFixed(2)} ft`,
  );
}

console.log('\n=== GEOMETRY SANITY ===');
for (const m of Object.values(MODELS)) {
  const open = buildShell(m, 1);
  const shut = buildShell(m, 0);

  check(`${m.id} core never moves`,
    open.find((b) => b.id === 'core')!.xMm === 0 && shut.find((b) => b.id === 'core')!.xMm === 0, '');

  const lw = open.find((b) => b.id === 'leftWing')!;
  const rw = open.find((b) => b.id === 'rightWing')!;
  check(`${m.id} wings symmetric`, lw.xMm === -rw.xMm, `${lw.xMm} / ${rw.xMm}`);

  // Deployed: outer edge of each wing must land exactly on the overall width.
  const outer = rw.xMm + m.wingWidthMm / 2;
  check(`${m.id} wing lands flush`, Math.abs(outer - m.expandedWidthMm / 2) < 0.5,
    `outer edge ${outer} mm vs half-width ${m.expandedWidthMm / 2} mm`);

  // Nothing may sit below the chassis.
  const lowest = Math.min(...open.map((b) => b.yMm - b.heightMm / 2));
  check(`${m.id} nothing below chassis`, lowest >= -261, `lowest ${lowest} mm`);

  check(`${m.id} no glazing floats when folded`,
    shut.filter((b) => b.role === 'glazing').every((b) => Math.abs(b.xMm) <= m.coreWidthMm / 2 + 30), '');
}

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
