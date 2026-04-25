// Apply correct motion icons to moves that fell back to qcb/dp/hcf
// when their actual input is a charge / 360 / 8-way / multi-button.
// Also widens button lists to match wiki (Asuka 詠唱/ブックマーク 全ボタン).

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', '..', 'data');

const P  = '<span class="key-p">P</span>';
const K  = '<span class="key-k">K</span>';
const S  = '<span class="key-s">S</span>';
const HS = '<span class="key-h">HS</span>';

// patches: { slug: [{nameMatch, set: { icon?, btnHtml?, note?, prefix? }}] }
const patches = {
  pot: [
    { name: 'ポチョムキンバスター',     set: { icon: '360' } },
    { name: 'ハンマーフォール',         set: { icon: 'charge46' } },
    { name: 'ヘブンリィポチョムキンバスター', set: { icon: '360' } }
  ],
  may: [
    { name: 'イルカさん・横',           set: { icon: 'charge46' } },
    { name: 'イルカさん・縦',           set: { icon: 'charge28' } }
  ],
  ven: [
    { name: 'スティンガーエイム',       set: { icon: 'charge46' } },
    { name: 'カーカススライド',         set: { icon: 'charge28' } }
  ],
  axl: [
    { name: '冬蟷螂 (ふゆいもじり)',    set: { icon: 'charge46' } }
  ],
  sly: [
    { name: 'ブラッドサッキング・ユニバース', set: { icon: '360' } }
  ],
  gld: [
    { name: 'ベヒーモスタイフーン',     set: { icon: '8way' } }
  ],

  // Asuka R♯: widen 詠唱 / ブックマーク to show all four buttons,
  // シンセサイズ to P/K.
  ask: [
    { name: '詠唱',                     set: { btnHtml: `${P} / ${K} / ${S} / ${HS}` } },
    { name: 'ブックマーク',             set: { btnHtml: `${P} / ${K} / ${S} / ${HS}` } },
    { name: '詠唱（シンセサイズ）',     set: { btnHtml: `${P} / ${K}` } }
  ]
};

let touched = 0;
for (const [slug, items] of Object.entries(patches)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (const patch of items) {
    for (const list of [data.specials, data.overdrives]) {
      if (!list) continue;
      for (const move of list) {
        if (move.name === patch.name) {
          Object.assign(move, patch.set);
          touched++;
        }
      }
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}
console.log(`Patched ${touched} move entries across ${Object.keys(patches).length} characters`);
