// Wiki-verified corrections for the base 15 characters.
// Source: https://wikiwiki.jp/ggst-memo/ (per-character コマンド技 pages, 2026-04 snapshot)
// Notes are my own brief one-liners, not copied from the wiki prose.

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', 'data');

const sp = (icon, btnHtml, name, note, prefix) => {
  const o = { icon, btnHtml, name, note };
  if (prefix) o.prefix = prefix;
  return o;
};
const od = (icon, btnHtml, name, note, tension = 50, repeat) => {
  const o = { icon, btnHtml, name, note, tension };
  if (repeat) o.repeat = repeat;
  return o;
};
const P  = '<span class="key-p">P</span>';
const K  = '<span class="key-k">K</span>';
const S  = '<span class="key-s">S</span>';
const HS = '<span class="key-h">HS</span>';
const D  = '<span class="key-d">D</span>';
const SH = `${S} / ${HS}`;
const PK = `${P} / ${K}`;

const fixes = {
  sol: {
    specials: [
      sp('qcf',  P,                                 'ガンフレイム',                 '地上飛び道具'),
      sp('qcb',  P,                                 'ガンフレイムフェイント',       'フェイント ／ ゲージ回収'),
      sp('dp',   SH,                                'ヴォルカニックヴァイパー',     '対空昇龍 ／ 空中可'),
      sp('qcf',  K,                                 'バンディットリヴォルヴァー',   '突進 ／ 空中可'),
      sp('qcb',  K,                                 'バンディットブリンガー',       '飛び込み中段 ／ 空中可'),
      sp('dp',   K,                                 'ぶっきらぼうに投げる',         'コマンド投げ'),
      sp('hcf',  HS,                                'ファフニール',                 '突進 ／ ガード有利'),
      sp('qcb',  S,                                 'ナイトレイドヴォルテックス',   '長押し可', '空中')
    ],
    overdrives: [
      od('hcb-f', HS, 'タイランレイブ',           '乱舞', 50),
      od('qcf',   HS, 'ヘヴィモブセメタリー',      '飛び道具', 100, '×2')
    ]
  },

  ky: {
    specials: [
      sp('qcf',  S,  'スタンエッジ',                 '飛び道具'),
      sp('qcf',  HS, 'スタンエッジ・チャージアタック', '溜め飛び道具'),
      sp('qcf',  SH, '空中スタンエッジ',             '空中飛び道具', '空中'),
      sp('qcf',  K,  'スタンディッパー',             '低姿勢突進'),
      sp('dp',   SH, 'ヴェイパースラスト',           '対空昇龍 ／ 空中可'),
      sp('qcb',  K,  'フードゥルアルク',             '雷球設置'),
      sp('qcb',  P,  'ライトニングストライク',       '飛び道具消費攻撃'),
      sp('qcb',  S,  'ダイアエクラ',                 '中距離牽制')
    ],
    overdrives: [
      od('hcb-f', HS, 'ライド・ザ・ライトニング',     '対空乱舞 ／ 空中可', 50),
      od('qcf',   P,  'セイクリッドエッジ',            '飛び道具乱舞', 50, '×2'),
      od('qcb',   HS, 'ドラゴンインストール',          'パワーアップ ／ 体力30%以下', 50)
    ]
  },

  may: {
    specials: [
      sp('qcb',  SH,  'イルカさん・横',         '4溜め6 ／ 突進'),
      sp('qcb',  SH,  'イルカさん・縦',         '2溜め8 ／ 対空'),
      sp('dp',   K,   'オーバーヘッド・キッス', '中段 ／ 投げ判定'),
      sp('qcb',  PK,  '有栖川スパークル',       '召喚飛び道具')
    ],
    overdrives: [
      od('qcf',   S,  'グレート山田アタック',         '巨大山田召喚', 50, '×2'),
      od('hcb-f', HS, 'ワンダフル五所川原ダイナミック', 'イルカ乱舞 ／ 空中可', 50)
    ]
  },

  axl: {
    specials: [
      sp('qcf',  S,  '鎌閃撃 (れんせんげき)',     '長距離鎖牽制'),
      sp('qcf',  HS, '冬蟷螂 (ふゆいもじり)',     '4溜め1236 ／ 突進'),
      sp('qcb',  HS, '蝸牛 (かたつむり)',         '対空鎖 ／ 空中可'),
      sp('qcb',  S,  '潦 (にわたずみ)',           '低姿勢牽制'),
      sp('qcb',  K,  '虎落笛 (もがりぶえ)',       '長押し可 ／ 中距離'),
      sp('qcf',  HS, 'アクセルボンバー',           '空中専用 ／ 対空', '空中')
    ],
    overdrives: [
      od('qcf',   HS, '百重鎌焼 (びゃくえれんしょう)', '広範囲乱舞', 50, '×2'),
      od('hcb-f', P,  'ワンヴィジョン',               '時止め ／ 空中可', 50)
    ]
  },

  chipp: {
    specials: [
      sp('qcf',  P,  'アルファブレード・横',         '突進 ／ 空中可'),
      sp('qcf',  K,  'アルファブレード・斜め',       '突進中段 ／ 空中可'),
      sp('dp',   S,  'ベータブレード',               '対空昇龍 ／ 空中可'),
      sp('qcf',  HS, 'ガンマブレード',               '飛び道具'),
      sp('qcf',  S,  '列衝',                          'コマ投げ風'),
      sp('hcb-f', S, '玄狼斬',                        '突進斬撃'),
      sp('qcb',  P,  '手裏剣',                        '空中専用 ／ 飛び道具', '空中'),
      sp('qcb',  HS, 'ロープテンション',             '壁張り付き')
    ],
    overdrives: [
      od('hcb-f', HS, '残星狼牙',                     '突進乱舞 ／ 空中可', 50),
      od('qcf',   P,  '万鬼滅砕',                     '一撃必殺風 ／ 大ダメージ', 50, '×2')
    ]
  },

  pot: {
    specials: [
      sp('dp',    P,  'ポチョムキンバスター',     '回転入力コマ投げ'),
      sp('qcb',   P,  'メガフィスト・前',         '飛び込みパンチ'),
      sp('qcb',   P,  'メガフィスト・後',         '後退パンチ'),
      sp('qcf',   S,  'スライドヘッド',           '全画面下段'),
      sp('hcf',   HS, 'ハンマーフォール',         '4溜め6 ／ アーマー突進'),
      sp('qcf',   P,  'ハンマーフォール・ブレーキ', 'HF中Pでキャンセル'),
      sp('dp',    HS, 'ヒートナックル',           '対空コマンド投げ'),
      sp('qcb',   K,  'F.D.B.',                   '反射ガード ／ 溜め可'),
      sp('qcb',   HS, 'ガルーダ・インパクト',     '近距離牽制'),
      sp('dp',    K,  'ヒートタックル',           'アーマー対空')
    ],
    overdrives: [
      od('hcb-f', S,  'ヘブンリィポチョムキンバスター', '無敵コマ投げ', 50),
      od('hcb-f', HS, 'ガイガンター・カイ',             '飛び道具壁', 50)
    ]
  },

  fau: {
    specials: [
      sp('qcf',  P,  '何が出るかな？',           'ランダムアイテム召喚'),
      sp('qcf',  HS, 'メッタ刈り',               '投げ ／ アフロ状態化'),
      sp('qcb',  P,  '久延毘古',                 'テレポート ／ 位置選択'),
      sp('qcf',  S,  '涅和混練',                 '多段突き ／ 空中可'),
      sp('hcf',  K,  '突きます。',               '長距離突き ／ 派生有り'),
      sp('qcb',  HS, 'ナイスショット。',         '飛び道具設置'),
      sp('qcf',  P,  '愛',                        '空中専用 ／ 落下飛び道具', '空中')
    ],
    overdrives: [
      od('hcb-f', HS, 'エキサイティング骨折',         'カウンター打撃', 50),
      od('qcf',   P,  'な・な・な・なにがでるかな？', '大量アイテム ／ 50% or 100%', 50, '×2')
    ]
  },

  mll: {
    specials: [
      sp('qcf',  P,  'バッドムーン',             '空中突進中段 ／ 空中専用', '空中'),
      sp('qcf',  K,  'ハイスピードフォール',     '急降下 ／ 空中専用', '空中'),
      sp('qcf',  HS, 'カピエル',                 '空中飛び道具', '空中'),
      sp('qcf',  SH, 'タンデムトップ',           '回転飛び道具'),
      sp('qcb',  P,  'アイアンセイバー',         '低姿勢スライド'),
      sp('qcb',  K,  'ミラージュ',               'すり抜け前進'),
      sp('qcb',  S,  'ラストシェイカー',         '多段中距離'),
      sp('qcb',  HS, 'アルテミス',               '後退攻撃')
    ],
    overdrives: [
      od('hcb-f', HS, 'ウィンガー',                 '突進乱舞', 50),
      od('qcf',   S,  'セプテム・ヴォイセズ',       '飛び道具乱舞', 50, '×2')
    ]
  },

  zat: {
    specials: [
      sp('qcb',  S,  '飛行',                     '空中ダッシュ持続'),
      sp('qcf',  K,  'インヴァイトヘル',         'ドリル設置'),
      sp('qcf',  P,  'エディ召喚',               'シャドウ操作開始'),
      sp('qcf',  S,  '突く',                      'エディ ／ 多段突き'),
      sp('qcf',  HS, '多い！',                    'エディ ／ 多段ドリル'),
      sp('qcb',  HS, '跳ねる',                    'エディ ／ 上方カバー'),
      sp('qcb',  K,  'ブレイク・ザ・ロウ',       '影テレポート'),
      sp('dp',   S,  'ドランカーシェイド',       '反射構え')
    ],
    overdrives: [
      od('qcf',   HS, 'アモルファス',                 '影乱舞', 50, '×2'),
      od('hcb-f', S,  'サンヴォイド',                 'エディ強化飛び道具', 50)
    ]
  },

  ram: {
    specials: [
      sp('qcf',  SH, 'バヨネッタ',               '剣投げ ／ 飛び道具'),
      sp('dp',   P,  'ダウロ',                   '対空打ち上げ'),
      sp('qcb',  K,  'シルド・デトルオ',         '空中中段 ／ 空中可'),
      sp('qcb',  HS, 'サブロバルト',             'オーバーヘッド斬'),
      sp('qcf',  K,  'オンド',                    '波動牽制'),
      sp('qcb',  S,  'アグレッサオルドノ',       '空中専用斬撃', '空中')
    ],
    overdrives: [
      od('hcb-f', HS, 'カルバドス',                 'ビーム ／ 剣2本必要', 50),
      od('qcf',   S,  'モルトバルデ',                '無敵地割れ', 50, '×2')
    ]
  },

  leo: {
    specials: [
      sp('qcf',  SH, 'グラヴィテート・フェルダムト', '多段飛び道具'),
      sp('dp',   SH, 'アイゼン・シュトゥルム',         '対空 ／ 始動無敵'),
      sp('qcb',  S,  'エルスト・カルトス・ゲシュトゥーバー', '突進 ／ ダウン'),
      sp('qcb',  HS, 'ツヴァイト・カルトス・ゲシュトゥーバー', 'すり抜け ／ 裏スタンス'),
      sp('qcf',  K,  'トゥールブレンツ',           '前進中段 ／ 派生'),
      sp('qcf',  HS, 'グラオブリッツ',              '裏スタンス専用突進', '裏')
    ],
    overdrives: [
      od('qcf',   HS, 'シュティールフォルバイル',     '裏スタンス専用 ／ 高速飛び道具', 50),
      od('hcb-f', S,  'ライデンシュラフト・デリゲント', '突進乱舞 ／ 始動無敵', 50)
    ]
  },

  nag: {
    specials: [
      sp('qcf',  S,  '粒雪 (ざらめゆき)',         '前進斬撃'),
      sp('qcb',  HS, '冠雪 (かむりゆき)',         '対空斬'),
      sp('dp',   HS, '垂雪 (しずりゆき)',         '突進斬 ／ HSで派生'),
      sp('dp',   P,  'Bloodsucking Universe',     '吸血 ／ ゲージ回復'),
      sp('qcf',  K,  '不香 (ふきょう)',           '中段斬り'),
      sp('qcb',  S,  '雪催 (ゆきもよい)',         '飛び道具')
    ],
    overdrives: [
      od('hcb-f', S,  '忘れ雪',                       '突進乱舞', 50),
      od('hcb-f', HS, '残雪 (ざんせつ)',              'ブラッドレイジ専用 ／ 一撃技', 50)
    ]
  },

  gio: {
    specials: [
      sp('qcb',  K,  'セプルトゥーラ',           '長リーチ蹴り'),
      sp('qcf',  K,  'トロヴァオン',             'ドロップキック ／ 飛び道具消し'),
      sp('dp',   S,  'ソウル・ナセンチ',         '対空回し蹴り'),
      sp('qcb',  S,  'ソウル・ポエンチ',         '空中蹴り ／ めくり'),
      sp('qcb',  HS, 'シャヴェ',                 'ステップ ／ キャンセル可')
    ],
    overdrives: [
      od('hcb-f', HS, 'ヴェンタニア',               '突進乱舞 ／ 始動無敵', 50),
      od('qcf',   HS, 'テンペスタージ',             '空中急降下 ／ 空中可', 50)
    ]
  },

  anj: {
    specials: [
      sp('qcf',  P,  '疾',                         '前進斬り'),
      sp('qcf',  K,  '水月のハコビ',               '見切り構え ／ 派生「乱」'),
      sp('qcb',  P,  '乱',                         '見切り成功時 ／ 反撃'),
      sp('qcf',  S,  '紅',                         '溜め可 ／ 飛び道具'),
      sp('qcf',  HS, '風神',                       '溜め可 ／ 派生4種')
    ],
    overdrives: [
      od('hcb-f', HS, '一誠奥義「彩」',               '突進乱舞', 50),
      od('hcb-f', S,  '花鳥風月 改',                  '広範囲飛び道具', 50)
    ]
  },

  ino: {
    specials: [
      sp('qcf',  P,  '抗鬱音階',                  '飛び道具 ／ 空中可'),
      sp('qcf',  K,  'ケミカル愛情',              '飛び道具 ／ 空中可'),
      sp('qcf',  SH, '大木をさする手',            '低姿勢突進'),
      sp('qcf',  S,  '狂愛アジタート',            'ジャンプ攻撃 ／ 派生'),
      sp('qcf',  K,  '狂言実行',                  '空中急降下 ／ 角度可変', '空中')
    ],
    overdrives: [
      od('qcf',   HS, 'メガロマニア',                 'コマンド投げ ／ 失敗時飛び道具', 50, '×2'),
      od('qcf',   S,  '限界フォルテッシモ',           'ホバー飛び道具 ／ 空中可', 50)
    ]
  }
};

let fixed = 0;
for (const [slug, fix] of Object.entries(fixes)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.specials = fix.specials;
  data.overdrives = fix.overdrives;
  data.dataSource = 'wikiwiki.jp/ggst-memo (verified)';
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  fixed++;
}
console.log(`Wiki-corrected ${fixed} characters`);
