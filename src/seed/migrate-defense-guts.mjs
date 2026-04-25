// One-off: migrate stats.hp/hpPct/weight/weightLevel
//   → stats.defense/defensePct/guts/gutsLevel
// using wikiwiki.jp/ggst-memo official defense coefficients & guts values.
// Run once: `node src/seed/migrate-defense-guts.mjs`

import fs from 'node:fs';
import path from 'node:path';

const DATA = {
  sol:   { defense: 0.93, guts: 2 },
  ky:    { defense: 0.95, guts: 2 },
  may:   { defense: 1.00, guts: 4 },
  axl:   { defense: 1.03, guts: 1 },
  chipp: { defense: 1.18, guts: 4 },
  pot:   { defense: 0.87, guts: 4 },
  fau:   { defense: 0.96, guts: 0 },
  mll:   { defense: 1.09, guts: 2 },
  zat:   { defense: 1.01, guts: 0 },
  ram:   { defense: 1.00, guts: 1 },
  leo:   { defense: 0.95, guts: 3 },
  nag:   { defense: 0.92, guts: 3, defenseNote: 'Blood Lv1基準 (Lv2:1.02 / Lv3:1.15)' },
  gio:   { defense: 0.98, guts: 1 },
  anj:   { defense: 1.00, guts: 5 },
  ino:   { defense: 1.01, guts: 1 },
  gld:   { defense: 0.89, guts: 3 },
  jko:   { defense: 1.06, guts: 2 },
  cos:   { defense: 1.01, guts: 0 },
  bkn:   { defense: 1.04, guts: 4 },
  tst:   { defense: 0.98, guts: 1 },
  bgt:   { defense: 1.07, guts: 2 },
  sin:   { defense: 0.96, guts: 3 },
  bed:   { defense: 0.82, guts: 0 },
  ask:   { defense: 0.75, guts: 0, defenseNote: 'バリアあり基準 (なし:1.50)' },
  jhn:   { defense: 0.93, guts: 3 },
  elp:   { defense: 1.04, guts: 2 },
  aba:   { defense: 0.90, guts: 2 },
  sly:   { defense: 0.92, guts: 1 },
  dzy:   { defense: 1.09, guts: 5 },
  ven:   { defense: 0.94, guts: 1 },
  uni:   { defense: 1.00, guts: 2 },
  luc:   { defense: 1.07, guts: 2 },
  jam:   { defense: 0.95, guts: 2 },
};

// Defense bar (堅さ表示): low value = long bar.
// Range across roster: 0.75 (Asuka, barrier) … 1.18 (Chipp).
const DEF_MIN = 0.75;
const DEF_MAX = 1.18;
function defensePct(defense) {
  return Math.round(((DEF_MAX - defense) / (DEF_MAX - DEF_MIN)) * 100);
}

const root = path.resolve(import.meta.dirname, '..', '..');
const dataDir = path.join(root, 'data');

let updated = 0;
for (const [slug, vals] of Object.entries(DATA)) {
  const file = path.join(dataDir, `${slug}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const oldStats = j.stats ?? {};
  // Preserve unrelated stats fields (dash, dashIcon, range, rangeLevel).
  const next = {
    defense: vals.defense,
    defensePct: defensePct(vals.defense),
    guts: vals.guts,
    gutsLevel: vals.guts, // 0..5, used for pips
    dash: oldStats.dash,
    dashIcon: oldStats.dashIcon,
    range: oldStats.range,
    rangeLevel: oldStats.rangeLevel,
  };
  if (vals.defenseNote) next.defenseNote = vals.defenseNote;
  j.stats = next;
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
  updated++;
  console.log(`${slug}: defense ${vals.defense} (${next.defensePct}%) / guts ${vals.guts}`);
}
console.log(`\nMigrated ${updated} character JSON files.`);
