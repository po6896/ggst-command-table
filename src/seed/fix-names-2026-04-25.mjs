// One-off fix pass after wikiwiki cross-check (2026-04-25).
// Categories: A 致命的誤字 / B 構造的誤り / C 表記揺れ
// Run once: `node src/seed/fix-names-2026-04-25.mjs`

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', '..', 'data');

// ---- Name renames ----
// (slug, oldName, newName) — applies to specials[].name and overdrives[].name
const renames = [
  // A: 致命的誤字
  ['chipp', '列衝',                          '冽掌'],
  ['chipp', '玄狼斬',                        '幻朧斬'],
  ['chipp', '残星狼牙',                      '斬星狼牙'],
  ['pot',   'ガイガンター・カイ',            'ガイガンター改'],

  // C: 表記揺れ — pot
  ['pot',   'ハンマーフォール',              'ハンマフォール'],
  ['pot',   'ハンマーフォール・ブレーキ',    'ハンマフォールブレーキ'],
  ['pot',   'ガルーダ・インパクト',          'ガルダインパクト'],

  // C: gld
  ['gld',   'ベヒーモスタイフーン',          'ベヒモスタイフーン'],

  // C: gio
  ['gio',   'セプルトゥーラ',                'セパルトゥラ'],
  ['gio',   'トロヴァオン',                  'トロヴァォン'],
  ['gio',   'ソウル・ナセンチ',              'ソウ・ナセンテ'],
  ['gio',   'ソウル・ポエンチ',              'ソウ・ポエンチ'],
  ['gio',   'シャヴェ',                      'シャーヴィ'],
  ['gio',   'テンペスタージ',                'テンペスターヂ'],

  // C: leo (リネームのみ — グラオブリッツ/シュティールフォルバイルは別途削除処理)
  ['leo',   'グラヴィテート・フェルダムト',  'グラヴィエットヴァーダ'],
  ['leo',   'アイゼン・シュトゥルム',        'アイゼンシュトルム'],
  ['leo',   'エルスト・カルトス・ゲシュトゥーバー',  'エアースト・カルタスゲシュトゥーバー'],
  ['leo',   'ツヴァイト・カルトス・ゲシュトゥーバー','ツヴァイト・カルタスゲシュトゥーバー'],
  ['leo',   'トゥールブレンツ',              'トゥルブレンツ'],
  ['leo',   'ライデンシュラフト・デリゲント','ライデンシャフトディリガント'],

  // C: jko
  ['jko',   'サーヴァントサモン',            'サーヴァント召喚'],
  ['jko',   'リトリーブ',                    '回収'],
  ['jko',   'アタックコマンド',              '攻撃指示'],
  ['jko',   'ディフェンスコマンド',          '防御指示'],
  ['jko',   'フォーエヴァー・エリュシオン・ドライバー', 'フォーエヴァーエリシオンドライバー'],
  ['jko',   'エンカレッジ・サーヴァント',    'サーヴァントを激励する'],

  // C: cos
  ['cos',   'ガンスタンス',                  '銃を構える'],
  ['cos',   'ロール',                        '前転'],
  ['cos',   'スーパーフォーカス',            '超フォーカス'],
];

// ---- Per-character structural fixes ----
const structural = {
  sol(j) {
    // ナイトレイドヴォルテックスは地上技 (prefix:"空中" は誤り)
    for (const m of j.specials) {
      if (m.name === 'ナイトレイドヴォルテックス' && m.prefix === '空中') {
        delete m.prefix;
      }
    }
    // ヘヴィモブセメタリーは 214 214 (qcb x2) であって qcf x2 ではない
    for (const m of j.overdrives) {
      if (m.name === 'ヘヴィモブセメタリー' && m.icon === 'qcf') m.icon = 'qcb';
    }
  },
  chipp(j) {
    // 手裏剣は空中214P (qcb)、JSON は qcf になっていた
    for (const m of j.specials) {
      if (m.name === '手裏剣' && m.icon === 'qcf') m.icon = 'qcb';
    }
  },
  axl(j) {
    // 冬蟷螂は 41236 HS (hcf)、charge46 ではない
    for (const m of j.specials) {
      if (m.name && m.name.startsWith('冬蟷螂') && m.icon === 'charge46') m.icon = 'hcf';
    }
  },
  fau(j) {
    // 久延毘古は 214 P/K/S。JSON は HS 単独で qcb となっていた
    for (const m of j.specials) {
      if (m.name === '久延毘古') {
        m.icon = 'qcb';
        m.btnHtml = '<span class="key-p">P</span> / <span class="key-k">K</span> / <span class="key-s">S</span>';
      }
    }
  },
  leo(j) {
    // wiki に存在しない グラオブリッツ / シュティールフォルバイル を必殺技から外す
    j.specials = j.specials.filter(m => !['グラオブリッツ', 'シュティールフォルバイル'].includes(m.name));
  },
};

// ---- Run ----
let changedFiles = 0;
const slugs = new Set([...renames.map(r => r[0]), ...Object.keys(structural)]);
for (const slug of slugs) {
  const file = path.join(dataDir, `${slug}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let mutated = false;

  // Renames
  const myRenames = renames.filter(r => r[0] === slug);
  for (const [, oldName, newName] of myRenames) {
    for (const list of [j.specials || [], j.overdrives || []]) {
      for (const m of list) {
        if (m.name === oldName) { m.name = newName; mutated = true; }
      }
    }
  }

  // Structural
  if (structural[slug]) {
    const before = JSON.stringify(j);
    structural[slug](j);
    if (JSON.stringify(j) !== before) mutated = true;
  }

  if (mutated) {
    fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
    console.log(`fixed: ${slug}.json`);
    changedFiles++;
  }
}
console.log(`\nUpdated ${changedFiles} files.`);
