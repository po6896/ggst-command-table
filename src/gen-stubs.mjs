// One-off: generate stub JSON for characters other than Sol.
// Each stub has identity (name, color, art) but no movelist data.
// Build script will render a "movelist not yet documented" placeholder.

import fs from 'node:fs';
import path from 'node:path';

const stubs = [
  { no: 2,  slug: 'ky',    name: 'Ky Kiske',            nameJp: 'カイ＝キスク',        color: '#4d8eff', sdIcon: '02_chibi_ky.png',   fullArt: 'chara02_kyk.png'   },
  { no: 3,  slug: 'may',   name: 'May',                 nameJp: 'メイ',                color: '#ff7090', sdIcon: '03_chibi_may.png',  fullArt: 'chara03_may.png'   },
  { no: 4,  slug: 'axl',   name: 'Axl Low',             nameJp: 'アクセル＝ロウ',      color: '#c4894c', sdIcon: '04_chibi_axl.png',  fullArt: 'chara04_axl.png'   },
  { no: 5,  slug: 'chipp', name: 'Chipp Zanuff',        nameJp: 'チップ＝ザナフ',      color: '#4dbf6b', sdIcon: '05_chibi_chp.png',  fullArt: 'chara05_chipp.png' },
  { no: 6,  slug: 'pot',   name: 'Potemkin',            nameJp: 'ポチョムキン',        color: '#889ca8', sdIcon: '06_chibi_pot.png',  fullArt: 'chara06_pot.png'   },
  { no: 7,  slug: 'fau',   name: 'Faust',               nameJp: 'ファウスト',          color: '#b86eff', sdIcon: '07_chibi_fau.png',  fullArt: 'chara07_fau.png'   },
  { no: 8,  slug: 'mll',   name: 'Millia Rage',         nameJp: 'ミリア＝レイジ',      color: '#d4d4dc', sdIcon: '08_chibi_mll.png',  fullArt: 'chara08_mll.png'   },
  { no: 9,  slug: 'zat',   name: 'Zato-1',              nameJp: 'ザトー＝ONE',         color: '#6b3eb8', sdIcon: '09_chibi_zat.png',  fullArt: 'chara09_zat.png'   },
  { no: 10, slug: 'ram',   name: 'Ramlethal Valentine', nameJp: 'ラムレザル＝ヴァレンタイン', color: '#d8c878', sdIcon: '10_chibi_ram.png', fullArt: 'chara10_ram.png' },
  { no: 11, slug: 'leo',   name: 'Leo Whitefang',       nameJp: 'レオ＝ホワイトファング', color: '#d4a83a', sdIcon: '11_chibi_leo.png',  fullArt: 'chara11_leo.png' },
  { no: 12, slug: 'nag',   name: 'Nagoriyuki',          nameJp: '名残雪',              color: '#b8424b', sdIcon: '12_chibi_nag_a.png', fullArt: 'chara12_nag.png' },
  { no: 13, slug: 'gio',   name: 'Giovanna',            nameJp: 'ジオヴァーナ',        color: '#5cb874', sdIcon: '13_chibi_gio.png',  fullArt: 'chara13_gio.png'   },
  { no: 14, slug: 'anj',   name: 'Anji Mito',           nameJp: '御津闇慈',            color: '#d63d3d', sdIcon: '14_chibi_anj.png',  fullArt: 'chara14_anj.png'   },
  { no: 15, slug: 'ino',   name: 'I-No',                nameJp: 'イノ',                color: '#d63d8c', sdIcon: '15_chibi_ino.png',  fullArt: 'chara15_ino.png'   },
  { no: 16, slug: 'gld',   name: 'Goldlewis Dickinson', nameJp: 'ゴールドルイス＝ディキンソン', color: '#d6a83d', sdIcon: '16_chibi_gld.png', fullArt: 'chara16_gld.png' },
  { no: 17, slug: 'jko',   name: "Jack-O'",             nameJp: 'ジャック＝オー',      color: '#b0b0c8', sdIcon: '17_chibi_jko_a.png', fullArt: 'chara17_jko.png' },
  { no: 18, slug: 'cos',   name: 'Happy Chaos',         nameJp: 'ハッピーケイオス',    color: '#d4b888', sdIcon: '18_chibi_cos.png',  fullArt: 'chara18_cos.png'   },
  { no: 19, slug: 'bkn',   name: 'Baiken',              nameJp: '梅喧',                color: '#c8323c', sdIcon: '19_chibi_bkn.png',  fullArt: 'chara19_bkn.png'   },
  { no: 20, slug: 'tst',   name: 'Testament',           nameJp: 'テスタメント',        color: '#5f4f8a', sdIcon: '20_chibi_tst.png',  fullArt: 'chara20_tst.png'   },
  { no: 21, slug: 'bgt',   name: 'Bridget',             nameJp: 'ブリジット',          color: '#f5c842', sdIcon: '21_chibi_bgt.png',  fullArt: 'chara21_bgt.png'   },
  { no: 22, slug: 'sin',   name: 'Sin Kiske',           nameJp: 'シン＝キスク',        color: '#4cb8d4', sdIcon: '22_chibi_sin.png',  fullArt: 'chara22_sin.png'   },
  { no: 23, slug: 'bed',   name: 'Bedman?',             nameJp: 'ベッドマン？',        color: '#6e8cd4', sdIcon: '23_chibi_bed_a.png', fullArt: 'chara23_bed.png' },
  { no: 24, slug: 'ask',   name: 'Asuka R♯',            nameJp: '飛鳥R♯',              color: '#5fc874', sdIcon: '24_chibi_ask.png',  fullArt: 'chara24_ask.png'   },
  { no: 25, slug: 'jhn',   name: 'Johnny',              nameJp: 'ジョニー',            color: '#d4a45c', sdIcon: '25_chibi_jhn.png',  fullArt: 'chara25_jhn.png'   },
  { no: 26, slug: 'elp',   name: 'Elphelt Valentine',   nameJp: 'エルフェルト＝ヴァレンタイン', color: '#e8d8d8', sdIcon: '26_chibi_elp.png', fullArt: 'chara26_elp.png' },
  { no: 27, slug: 'aba',   name: 'A.B.A',               nameJp: 'A.B.A',               color: '#c8689c', sdIcon: '27_chibi_aba.png',  fullArt: 'chara27_aba.png'   },
  { no: 28, slug: 'sly',   name: 'Slayer',              nameJp: 'スレイヤー',          color: '#a83838', sdIcon: '28_chibi_sly.png',  fullArt: 'chara28_sly.png'   },
  { no: 29, slug: 'dzy',   name: 'Dizzy',               nameJp: 'ディズィー',          color: '#d8e8f0', sdIcon: '29_chibi_dzy.png',  fullArt: 'chara29_dzy.png'   },
  { no: 30, slug: 'ven',   name: 'Venom',               nameJp: 'ヴェノム',            color: '#4ca87a', sdIcon: '30_chibi_ven.png',  fullArt: 'chara30_ven.png'   },
  { no: 31, slug: 'uni',   name: 'Unika',               nameJp: 'ユニカ',              color: '#9c5cd4', sdIcon: '31_chibi_uni.png',  fullArt: 'chara31_uni.png'   },
  { no: 32, slug: 'luc',   name: 'Lucy',                nameJp: 'ルチア',              color: '#f08c4c', sdIcon: '32_chibi_luc.png',  fullArt: 'chara32_luc.png'   },
  { no: 33, slug: 'jam',   name: 'Jam Kuradoberi',      nameJp: 'ジャム＝クラドベリー', color: '#e85040', sdIcon: '33_chibi_jam.png',  fullArt: 'chara33_jam.png'   }
];

const dataDir = path.resolve(import.meta.dirname, '..', 'data');
let written = 0;
for (const c of stubs) {
  const outPath = path.join(dataDir, `${c.slug}.json`);
  if (fs.existsSync(outPath)) continue;  // don't overwrite filled chars
  fs.writeFileSync(outPath, JSON.stringify({ ...c, archetype: 'TBD', stub: true }, null, 2) + '\n', 'utf-8');
  written++;
}
console.log(`Wrote ${written} stub character JSONs to ${dataDir}`);
