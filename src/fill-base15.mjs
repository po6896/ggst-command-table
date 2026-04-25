// One-off: fill movelist data for the original 15 base GGST roster.
// Move names are public game info; frame data values are rough
// approximations and SHOULD be verified against current patch.

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', 'data');

const baseStats = (hp, weight, weightLevel, dash, dashIcon, range, rangeLevel) => ({
  hp, hpPct: Math.round(hp / 5),
  weight, weightLevel,
  dash, dashIcon,
  range, rangeLevel
});

// Per-character data. Keys mirror sol.json structure.
const data = {
  ky: {
    archetype: 'Balance',
    stats: baseStats(420, '中', 2, '走り', '>>>', '中〜遠', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5 ／ 連打可' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7 ／ 主力' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 10 ／ 牽制' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11 ／ リーチ長' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: '崩し' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf',  btnHtml: '<span class="key-s">S</span> / <span class="key-h">HS</span>', name: 'スタンエッジ',         note: '飛び道具' },
      { icon: 'qcf',  btnHtml: '<span class="key-k">K</span>',                                  name: 'スタンディッパー',     note: '低姿勢突進' },
      { icon: 'dp',   btnHtml: '<span class="key-s">S</span> / <span class="key-h">HS</span>', name: 'ヴェイパースラスト',   note: '対空昇龍' },
      { icon: 'qcb',  btnHtml: '<span class="key-h">HS</span>',                                 name: 'フードゥエルアロー',   note: '空中飛び道具設置' },
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', prefix: '空中',                 name: 'グリードセヴァー',     note: '空中飛び道具' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-s">S</span>', repeat: '×2',                    name: 'リドエクスマキナ',       note: '飛び道具乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-h">HS</span>',                                  name: 'セイクリッドエッジ',     note: '対空乱舞',     tension: 50 }
    ],
    combos: [
      { tag: '基本',     seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' },
      { tag: '下段始動', seqHtml: '2<span class="key-k">K</span> &gt; 2<span class="key-d">D</span> &gt; 236<span class="key-h">HS</span>' },
      { tag: '対空',     seqHtml: '6<span class="key-p">P</span> &gt; 623<span class="key-s">S</span>' }
    ]
  },

  may: {
    archetype: 'Rushdown',
    stats: baseStats(440, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5 ／ 連打可' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7 ／ 主力' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 11 ／ アンカー' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11 ／ アンカー振り' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 5' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span> / <span class="key-h">HS</span>', name: '横イルカ',           note: '突進 ／ 距離可変' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span> / <span class="key-h">HS</span>', prefix: '溜め2', name: '縦イルカ', note: '対空ジャンプ攻撃' },
      { icon: 'qcf', btnHtml: '<span class="key-p">P</span>',                                  name: 'アプライドガールズ', note: '召喚飛び道具' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>',                                  name: 'おどおど',           note: '空中ダッシュ' }
    ],
    overdrives: [
      { icon: 'qcf2', btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'グレイトヤマダアタック', note: '空中専用 ／ 大ダメージ', tension: 50 },
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', name: 'ザ・ウォンダフルラッシュ', note: 'イルカ乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 6<span class="key-h">H</span> &gt; 214<span class="key-h">HS</span>' },
      { tag: '対空', seqHtml: 'j.<span class="key-k">K</span> &gt; j.<span class="key-s">S</span> &gt; 214<span class="key-h">HS</span>' }
    ]
  },

  axl: {
    archetype: 'Zoner',
    stats: baseStats(380, '中', 2, '走り', '>>>', '遠', 3),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 8' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 8' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 11 ／ 長リーチ' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 13 ／ 全画面リーチ' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '長リーチ振り' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '長リーチ足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力 ／ リーチ長' },
        { btn: 'h', mod: '空', tag: 'high', meta: '長リーチ' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-s">S</span>',  name: 'シエヌテイ・上',     note: '高位置牽制' },
      { icon: 'qcf', btnHtml: '<span class="key-h">HS</span>', name: 'シエヌテイ・下',     note: '低位置牽制' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>',  name: 'ランボウ・上',       note: '飛び道具' },
      { icon: 'qcb', btnHtml: '<span class="key-h">HS</span>', name: 'ランボウ・下',       note: '低姿勢飛び道具' },
      { icon: 'dp',  btnHtml: '<span class="key-h">HS</span>', name: 'アクセルボンバー',   note: 'コマンド投げ' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'ハイエロパティロウ', note: '画面端固定遠距離技', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-h">HS</span>',                name: '一瞬千撃',           note: '乱舞',                tension: 50 }
    ],
    combos: [
      { tag: '基本',     seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' },
      { tag: '遠距離牽制', seqHtml: '遠<span class="key-s">S</span> &gt; 214<span class="key-s">S</span>' }
    ]
  },

  chipp: {
    archetype: 'Speed',
    stats: baseStats(350, '軽', 1, '走り', '>>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 4 ／ 連打可' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 5 ／ 速い' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 10' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 4' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 5' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 7' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf',  btnHtml: '<span class="key-p">P</span>', name: '阿修羅閃空',         note: '飛び道具' },
      { icon: 'qcf',  btnHtml: '<span class="key-k">K</span>', name: '足刀突き',           note: '突進' },
      { icon: 'dp',   btnHtml: '<span class="key-s">S</span>', name: '弧月斬',             note: '対空昇龍' },
      { icon: 'qcb',  btnHtml: '<span class="key-h">HS</span>', name: '残像移動',           note: 'テレポート' },
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', prefix: '空中', name: '昇り疾駆',           note: '空中突進' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-s">S</span>',  repeat: '×2', name: '蜂酔閃刃',           note: '突進乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-h">HS</span>',                name: '禁忌奥義零式・忍法',  note: '一撃必殺風',  tension: 100 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-p">P</span> &gt; 5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 236<span class="key-k">K</span>' },
      { tag: '対空', seqHtml: '6<span class="key-p">P</span> &gt; 623<span class="key-s">S</span>' }
    ]
  },

  pot: {
    archetype: 'Grappler',
    stats: baseStats(500, '重', 3, 'ガード移動', '>', '近', 1),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 9' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 9' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 12 ／ 長リーチ' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 14 ／ 強判定' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 7' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 10 ／ 主力' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'dp',    btnHtml: '<span class="key-p">P</span>',                                  name: 'ポチョムキンバスター', note: 'コマンド投げ' },
      { icon: 'qcb',   btnHtml: '<span class="key-h">HS</span>',                                 name: 'ヒートエクステンション', note: '突進パンチ' },
      { icon: 'qcb',   btnHtml: '<span class="key-p">P</span>',                                  name: 'メガフィスト前',     note: '飛び込みパンチ' },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                                  name: 'スライドヘッド',     note: '地割れ ／ 全画面' },
      { icon: 'qcf',   btnHtml: '<span class="key-p">P</span>',                                  name: 'F.D.B.',            note: '反射ガード ／ 飛び道具相殺' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'ヘブンリィポチョムキンバスター', note: 'コマンド投げ',  tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-h">HS</span>',                name: 'ジャイアンティングサークル',     note: '対空乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本',         seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' },
      { tag: 'コマ投げ確定', seqHtml: '6<span class="key-h">H</span> &gt; 632146<span class="key-p">P</span>' }
    ]
  },

  fau: {
    archetype: 'Trickster',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜遠', 3),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 8' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 8' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 11 ／ 長リーチ' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 13' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '長リーチ足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: '崩し' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf',  btnHtml: '<span class="key-p">P</span>', name: 'なんでも投げてみるテスト', note: 'ランダムアイテム' },
      { icon: 'qcf',  btnHtml: '<span class="key-k">K</span>', name: '突き刺し',                 note: '対空 ／ 中段' },
      { icon: 'qcb',  btnHtml: '<span class="key-k">K</span>', name: '潜り込み',                 note: '低姿勢突進' },
      { icon: 'dp',   btnHtml: '<span class="key-s">S</span>', name: '突き戻し',                 note: '対空' },
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', name: '極性反転',                 note: 'カウンター' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'W．スリリング',         note: 'ランダム乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                  name: 'バリバリバリすぱあく',  note: '飛び道具',     tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span>' },
      { tag: '崩し', seqHtml: '236<span class="key-k">K</span>' }
    ]
  },

  mll: {
    archetype: 'Speed',
    stats: baseStats(350, '軽', 1, 'ホップ', '>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 4' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 6' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 10' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 5' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 7' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-s">S</span>',  name: 'タンデムトップ',     note: '飛び道具' },
      { icon: 'qcf', btnHtml: '<span class="key-h">HS</span>', name: 'ロングフォルテ',     note: '中距離' },
      { icon: 'qcb', btnHtml: '<span class="key-k">K</span>',  name: 'バッドムーン',       note: '空中突進中段' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>',  name: 'カピエル',           note: '対空' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>', prefix: '空中', name: 'シルヴァブレード', note: '空中飛び道具' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'ウィンガースカルム',     note: '突進乱舞',     tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                name: 'クロスチェンジ',         note: '空中専用',     tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-p">P</span> &gt; 5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 236<span class="key-h">HS</span>' },
      { tag: '崩し', seqHtml: '214<span class="key-k">K</span>' }
    ]
  },

  zat: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 8' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 10' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-p">P</span>', name: '召喚',               note: 'エディ召喚' },
      { icon: 'qcf', btnHtml: '<span class="key-k">K</span>', name: 'ピアス',             note: '飛び道具' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>', name: 'インヴァイト・ヘル', note: '中段移動' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>', name: 'ドランカー・シェイド', note: '反撃技' },
      { icon: 'qcf', btnHtml: '<span class="key-h">HS</span>', name: '影縛り',             note: 'エディ操作' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'アモルファス',           note: 'エディ強化',  tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                  name: 'サン・ヴワ・シ・ジュ・ヴェ',  note: '対空乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span>' },
      { tag: 'エディ起動', seqHtml: '236<span class="key-p">P</span>' }
    ]
  },

  ram: {
    archetype: 'Balance',
    stats: baseStats(420, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9 ／ 長リーチ' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11 ／ 主力' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-p">P</span>', name: 'モルテム・トランクト', note: '飛び道具設置' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>', name: 'シルヴァ・ブロー',   note: '突進' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>', name: 'ダウルガ',           note: '対空昇龍' },
      { icon: 'qcb', btnHtml: '<span class="key-h">HS</span>', name: 'バジャクス',         note: '中段' },
      { icon: 'qcf', btnHtml: '<span class="key-s">S</span>', prefix: '空中', name: 'サブロバトス', note: '空中急降下' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'モルテム・サンクトゥス', note: '広範囲乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                name: 'カラドゥラ・ヘイサジン',  note: '対空乱舞',  tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-p">P</span>' },
      { tag: '対空', seqHtml: '6<span class="key-p">P</span> &gt; 623<span class="key-s">S</span>' }
    ]
  },

  leo: {
    archetype: 'Power',
    stats: baseStats(420, '中', 2, '走り', '>>>', '近', 1),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 8 ／ 主力' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 10' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 12' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-s">S</span>',  name: 'グラオプフェルテ',    note: '飛び道具' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>', prefix: '裏', name: 'ハイルツィカム', note: '裏向きスタンス' },
      { icon: 'qcb', btnHtml: '<span class="key-h">HS</span>', prefix: '裏', name: 'ハイルゲシュッツ', note: 'コマンド投げ' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>',  name: 'グラオブリッツ',     note: '対空昇龍' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'シュトーレンエクスプロージョン', note: '突進乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                  name: 'ライトニンゲシュタペル',          note: '対空乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本',     seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' },
      { tag: '裏スタンス始動', seqHtml: '裏c.<span class="key-s">S</span> &gt; 裏214<span class="key-h">HS</span>' }
    ]
  },

  nag: {
    archetype: 'Resource',
    stats: baseStats(450, '重', 3, '走り', '>>>', '中〜遠', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 6' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 8' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 9' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 12 ／ 長リーチ' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 14' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 7' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 7' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 9' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '長リーチ足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: '崩し' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-p">P</span>',  name: '紅蓮',             note: '吸血ゲージ消費' },
      { icon: 'qcb', btnHtml: '<span class="key-s">S</span>',  name: '袈裟一刀',         note: '中段斬撃' },
      { icon: 'qcb', btnHtml: '<span class="key-h">HS</span>', name: '陣風白浪',         note: '突進斬撃' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>',  name: '震脚',             note: 'コマンド投げ' },
      { icon: 'qcf', btnHtml: '<span class="key-h">HS</span>', name: '居合一閃',         note: '溜め斬撃' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'カムリエ',           note: '吸血回復',     tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                name: 'ジン・ザン',          note: '吸血ゲージ消費突進', tension: 50 }
    ],
    combos: [
      { tag: '基本',  seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-h">HS</span>' },
      { tag: '吸血回復', seqHtml: '236<span class="key-p">P</span>' }
    ]
  },

  gio: {
    archetype: 'Rushdown',
    stats: baseStats(380, '中', 2, '走り', '>>>>', '近', 1),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 4' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 5' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 10' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 5' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 7' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf', btnHtml: '<span class="key-s">S</span>',  name: 'トロベイドル',       note: '突進' },
      { icon: 'qcf', btnHtml: '<span class="key-h">HS</span>', name: 'センプロ・サン',     note: '突進中段' },
      { icon: 'qcb', btnHtml: '<span class="key-k">K</span>',  name: 'チゼル',             note: '空中突進' },
      { icon: 'dp',  btnHtml: '<span class="key-s">S</span>',  name: 'サパテイア',         note: '対空昇龍' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'タンブィルゴリア',     note: '突進乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                name: 'ヴェントスニアロ',     note: '対空乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-p">P</span> &gt; 5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  anj: {
    archetype: 'Counter',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf',  btnHtml: '<span class="key-p">P</span>', name: '蜻蛉',                 note: '構え ／ 派生技' },
      { icon: 'qcb',  btnHtml: '<span class="key-h">HS</span>', name: '不香花',               note: '中段払い' },
      { icon: 'qcb',  btnHtml: '<span class="key-s">S</span>', name: '颶風',                 note: '反撃技' },
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', name: '撩乱',                 note: '飛び道具' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: '滅鬼螺旋脚',           note: '空中強襲',  tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                  name: '一悶蓮',                note: 'カウンター乱舞', tension: 50 }
    ],
    combos: [
      { tag: '基本',     seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-p">P</span>' },
      { tag: '蜻蛉派生', seqHtml: '236<span class="key-p">P</span> &gt; <span class="key-h">HS</span>' }
    ]
  },

  ino: {
    archetype: 'Rushdown',
    stats: baseStats(380, '中', 2, 'ホヴァー', '~~~', '近〜中', 2),
    normals: {
      stand: [
        { btn: 'p', cmd: '5', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '5', tag: 'mid', meta: '発生 7' },
        { stack: [
          { btn: 's', mod: '近', tag: 'mid', meta: '発生 7' },
          { btn: 's', mod: '遠', tag: 'mid', meta: '発生 9' }
        ]},
        { btn: 'h', cmd: '5', tag: 'mid', meta: '発生 11' },
        { btn: 'd', cmd: '5', tag: 'high', meta: 'ダスト' }
      ],
      crouch: [
        { btn: 'p', cmd: '2', tag: 'mid', meta: '発生 5' },
        { btn: 'k', cmd: '2', tag: 'low', meta: '発生 6' },
        { btn: 's', cmd: '2', tag: 'mid', meta: '発生 8' },
        { btn: 'h', cmd: '2', tag: 'mid', meta: '対空' },
        { btn: 'd', cmd: '2', tag: 'low', meta: '足払い' }
      ],
      air: [
        { btn: 'p', mod: '空', tag: 'high', meta: '刻み' },
        { btn: 'k', mod: '空', tag: 'high', meta: '空対空' },
        { btn: 's', mod: '空', tag: 'high', meta: '主力' },
        { btn: 'h', mod: '空', tag: 'high', meta: 'めくり' },
        { btn: 'd', mod: '空', tag: 'high', meta: '空中ダスト' }
      ]
    },
    specials: [
      { icon: 'qcf',  btnHtml: '<span class="key-h">HS</span>', name: '抗鬱音楽',           note: '飛び道具' },
      { icon: 'qcb',  btnHtml: '<span class="key-h">HS</span>', name: '反撃音響',           note: '反撃' },
      { icon: 'dp',   btnHtml: '<span class="key-h">HS</span>', name: '陣風メガロマニア',   note: '対空' },
      { icon: 'qcf',  btnHtml: '<span class="key-k">K</span>',  name: 'ストロークザビッグツリー', note: '中段' },
      { icon: 'qcb',  btnHtml: '<span class="key-s">S</span>',  name: 'チェイスホバー',     note: '高速ホバー移動' }
    ],
    overdrives: [
      { icon: 'qcf2',  btnHtml: '<span class="key-h">HS</span>', repeat: '×2', name: 'メガロマニア',         note: '飛び道具乱舞', tension: 50 },
      { icon: 'hcb-f', btnHtml: '<span class="key-s">S</span>',                name: 'ウルトラハッピーミサイル',  note: 'ホバー突進',  tension: 50 }
    ],
    combos: [
      { tag: '基本', seqHtml: '5<span class="key-k">K</span> &gt; 近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' }
    ]
  }
};

// Apply
let updated = 0;
for (const [slug, fill] of Object.entries(data)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const existing = JSON.parse(fs.readFileSync(file, 'utf-8'));
  // Strip stub flag and merge full data
  delete existing.stub;
  const merged = { ...existing, ...fill };
  fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  updated++;
}
console.log(`Filled movelist for ${updated} characters`);
