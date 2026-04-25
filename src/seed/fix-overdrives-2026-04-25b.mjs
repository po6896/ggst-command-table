// Second-pass fix: overdrive icons / repeat / names that survived the
// first wikiwiki cross-check. Confirmed against wikiwiki.jp/ggst-memo
// command-tech subpages.

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', '..', 'data');

// (slug, byName, patch) — patch is merged into the matching overdrive.
// Setting a key to undefined deletes it.
const patches = [
  // === Icon fixes (qcf misused for 63214+6+X moves) ===
  ['zat',   'アモルファス',                    { icon: 'hcb-f', repeat: undefined }],
  ['ino',   'メガロマニア',                    { icon: 'hcb-f', repeat: undefined }],
  ['ino',   '限界フォルテッシモ',              { icon: 'hcb-f' }],
  ['bed',   'call 13C',                        { icon: 'hcb-f', repeat: undefined }],
  ['bed',   'call 4CC',                        { icon: 'hcb-f', repeat: undefined }],
  ['sly',   'スーパーマッパハンチ',            { icon: 'hcb-f', repeat: undefined }],

  // === Icon fixes (qcf misused for 214214+X moves) ===
  ['cos',   '超フォーカス',                    { icon: 'qcb' }],
  ['bkn',   '拳銃',                            { icon: 'qcb' }],

  // === gio テンペスターヂ: 空中236236+HS ===
  ['gio',   'テンペスターヂ',                  { prefix: '空中', repeat: '×2' }],

  // === leo シュティールフォルバイル → シュタイルヴァービル (構え中63214+6+S) ===
  ['leo',   'シュティールフォルバイル',        { name: 'シュタイルヴァービル', icon: 'hcb-f', prefix: '構え中' }],

  // === Name corrections ===
  ['tst',   'ノストロマニア',                  { name: 'ノストロヴィア' }],
  ['tst',   'カラミティワン',                  { name: 'カラミティ・ワン' }],
  ['sin',   'タイラントバレル',                { name: 'タイランバレル' }],
  ['jhn',   'ザッツ・マイ・ネーム',            { name: 'それが俺の名だ' }],
  ['ram',   'カルバドス',                      { name: 'カルヴァドス' }],
  ['ram',   'モルトバルデ',                    { name: 'モルトバート' }],
  ['mll',   'セプテム・ヴォイセズ',            { name: 'セプテムヴォイシズ' }],
  ['uni',   'メガデスバスター',                { name: 'メガデス・バスター' }],
  ['uni',   'ウェポンズ・フリー',              { name: 'ウェポンズフリー' }],
  ['ven',   'ナヴァラトナ・ラナウト',          { name: 'ナヴァラートナランアウト' }],

  // === Normalize qcf2 (rare custom alias) → qcf ===
  ['elp',   'ボンボニエール',                  { icon: 'qcf' }],
];

const slugs = new Set(patches.map(p => p[0]));
let changedFiles = 0;

for (const slug of slugs) {
  const file = path.join(dataDir, `${slug}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let mutated = false;

  const myPatches = patches.filter(p => p[0] === slug);
  for (const [, oldName, patch] of myPatches) {
    const list = j.overdrives || [];
    for (const m of list) {
      if (m.name !== oldName) continue;
      for (const [k, v] of Object.entries(patch)) {
        if (v === undefined) {
          if (k in m) { delete m[k]; mutated = true; }
        } else if (m[k] !== v) {
          m[k] = v;
          mutated = true;
        }
      }
      break;
    }
  }

  if (mutated) {
    fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
    console.log(`fixed: ${slug}.json`);
    changedFiles++;
  }
}
console.log(`\nUpdated ${changedFiles} files.`);
