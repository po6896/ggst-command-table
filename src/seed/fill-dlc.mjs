// Wiki-verified data for the 18 DLC characters (no. 16-33).
// Source: https://wikiwiki.jp/ggst-memo/ per-character コマンド技 pages.
// Notes are my own brief one-liners; official move names retained as identifiers.

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
const PKS = `${P} / ${K} / ${S}`;
const ALL = `${P}/${K}/${S}/${HS}`;

const baseStats = (hp, weight, weightLevel, dash, dashIcon, range, rangeLevel) => ({
  hp, hpPct: Math.round(hp / 5),
  weight, weightLevel,
  dash, dashIcon,
  range, rangeLevel
});

const standardNormals = () => ({
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
});

const data = {
  gld: {
    archetype: 'Power',
    stats: baseStats(450, '重', 3, '走り', '>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('hcb-f', HS, 'ベヒーモスタイフーン',   '8方向対応 ／ 棺桶振り回し ／ 空中可'),
      sp('qcb',   S,  'サンダーバード',         '直進飛び道具 ／ レベル成長'),
      sp('qcf',   S,  'スカイフィッシュ',       '多段飛び道具 ／ レベル成長')
    ],
    overdrives: [
      od('hcb-f', P,  'ダウン・ウィズ・ザ・システム', '無敵打撃 ／ 回転で強化', 50),
      od('qcf',   K,  'バーン・イット・ダウン',       '追尾レーザー', 50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  jko: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  P,  'サーヴァントサモン',     '従者召喚 ／ 溜め可'),
      sp('qcf',  K,  'サーヴァントシュート',   '従者投擲'),
      sp('qcb',  P,  'リトリーブ',             '従者回収'),
      sp('qcb',  K,  'アタックコマンド',       '従者攻撃指示'),
      sp('qcb',  S,  'ディフェンスコマンド',   '従者防御指示'),
      sp('qcb',  HS, 'カウントダウン',         '従者強化指示')
    ],
    overdrives: [
      od('hcb-f', P,  'フォーエヴァー・エリュシオン・ドライバー', '突進乱舞', 50),
      od('qcf',   SH, 'エンカレッジ・サーヴァント',               '従者強化 ／ S無敵 / HS回復', 50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-p">P</span>' }
    ]
  },

  cos: {
    archetype: 'Resource',
    stats: baseStats(380, '中', 2, '走り', '>>>', '遠', 3),
    normals: standardNormals(),
    specials: [
      sp('button', HS, 'ガンスタンス',           '銃構え ／ 空中可'),
      sp('qcb',    S,  'カインドレイル',         '両手構え ／ 移動制限'),
      sp('button', P,  'リロード',               '弾丸補充'),
      sp('qcb',    P,  'フォーカス',             '集中ゲージ回復'),
      sp('qcb',    K,  'ロール',                 '前方ステップ ／ すり抜け'),
      sp('qcf',    K,  'スケープゴート',         '分身設置'),
      sp('qcf',    P,  'カース',                 'マーキング飛び道具')
    ],
    overdrives: [
      od('hcb-f', S,  'デウス・エクス・マキナ', '銃乱射 ／ 壁破壊',    50),
      od('qcf',   P,  'スーパーフォーカス',     '集中全回復 ／ バフ', 50, '×2')
    ],
    combos: [
      { tag: '銃使用', seqHtml: 'ガン構え &gt; 弾発射 &gt; リロード' }
    ]
  },

  bkn: {
    archetype: 'Counter',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  K,  '畳返し',                 '畳叩きつけ ／ 空中可'),
      sp('qcb',  SH, '蚊鉤 (かばり)',          'フック攻撃 ／ Sで紐繋ぎ'),
      sp('qcf',  S,  '妖斬扇',                  '空中専用中段', '空中'),
      sp('qcf',  P,  '柊 (ひいらぎ)',          '見切り反撃')
    ],
    overdrives: [
      od('qcf',   S,  '連ね三途渡し',             '無敵3段斬り', 50, '×2'),
      od('qcf',   P,  '拳銃',                       '大型飛び道具 ／ 空中可', 50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-s">S</span>' }
    ]
  },

  tst: {
    archetype: 'Resource',
    stats: baseStats(380, '中', 2, '走り', '>>>', '中〜遠', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  SH, 'グレイヴリーパー',       '鎌振り＋飛び道具 ／ 空中可 ／ 溜め可'),
      sp('qcb',  P,  'アンホーリーディヴァー', '飛び道具 ／ ステイン付与'),
      sp('qcb',  K,  'ポゼッション',           'サキュバスへ転移 ／ 空中可'),
      sp('qcb',  SH, 'アービターサイン',       '追尾攻撃')
    ],
    overdrives: [
      od('qcf',   P,  'ノストロマニア',           'サキュバス乱舞 ／ ステイン', 50, '×2'),
      od('qcf',   K,  'カラミティワン',           '無敵召喚 ／ 壁破壊',           50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  bgt: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜遠', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  SH, 'ストップ＆ダッシュ',     '熊投げ ／ 設置 ／ 236 or 214'),
      sp('qcb',  K,  'ローリング移動',         '前転 ／ 空中可'),
      sp('dp',   P,  'スターシップ',           '対空昇龍'),
      sp('qcf',  K,  'キックスタート マイ ハート', '構え ／ 派生'),
      sp('qcf',  K,  'ロジャーダイブ',          '空中専用突進', '空中'),
      sp('hcb-f', P, 'ロック ザ ベイビー',      'コマンド投げ ／ 空中可')
    ],
    overdrives: [
      od('hcb-f', S,  'ループ ザ ループ',         '突進乱舞', 50),
      od('hcb-f', HS, '帰ってきたキルマシーン',   '熊召喚 ／ 空中可', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  sin: {
    archetype: 'Resource',
    stats: baseStats(420, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  HS, 'ビークドライバー',       '長距離突き ／ HS派生'),
      sp('dp',   S,  'ホークベイカー',         '無敵対空 ／ 2段ヒット'),
      sp('qcb',  S,  'フーフスタンプ',         '中段ジャンプ蹴り'),
      sp('qcf',  K,  'エルクハント',           '低姿勢突進'),
      sp('qcb',  K,  'ガゼルステップ',         '高速移動 ／ スタミナ消費'),
      sp('hcb-f', P, '育ち盛りだからな',        '食事 ／ スタミナ回復')
    ],
    overdrives: [
      od('hcb-f', HS, 'R.T.L',                    '雷撃突き ／ 派生',     50),
      od('qcf',   P,  'タイラントバレル',          '爆発打撃 ／ 派生',     50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' }
    ]
  },

  bed: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '夢遊', '>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcb',  P,  'call 4BA',               '飛び道具 (Task)'),
      sp('qcb',  S,  'call 4B3',               '突進 (Task)'),
      sp('qcb',  HS, 'call 4B9',               '爆発打撃 (Task)'),
      sp('qcf',  P,  'call 0x$0.20',           'エラー誘発'),
      sp('qcf',  K,  'call 0x$1.00',           'エラー強化')
    ],
    overdrives: [
      od('qcf',   S,  'call 13C',                 'ダメージブースト ／ 6E強化', 50, '×2'),
      od('qcf',   HS, 'call 4CC',                 '広範囲衝撃波',                 50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-h">HS</span>' }
    ]
  },

  ask: {
    archetype: 'Trickster',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜遠', 3),
    normals: standardNormals(),
    specials: [
      sp('qcf',  P,  '詠唱',                   '魔法発動 ／ 空中可 ／ 全ボタン対応'),
      sp('qcb',  P,  'ブックマーク',           '魔法保存 ／ 空中可 ／ 全ボタン対応'),
      sp('button', P, '詠唱（シンセサイズ）',  '即時詠唱 ／ 22入力'),
      sp('button', S, 'マナ回復',              'マナチャージ ／ 22入力 ／ 溜め可'),
      sp('button', HS, 'テストケース変更',     'デッキ切替 ／ 22HS')
    ],
    overdrives: [
      od('hcb-f', P,  'サブミクロン粒子高圧縮球', '巨大爆発 ／ 空中可', 50),
      od('hcb-f', S,  'ブックマーク（フルオーダー）', '魔法多重保存', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 詠唱' }
    ]
  },

  jhn: {
    archetype: 'Trickster',
    stats: baseStats(380, '中', 2, '走り', '>>>', '中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcb',  P,  'ミストファイナー',       '抜刀斬 ／ 空中可 ／ 方向別'),
      sp('qcf',  P,  'ディール',                'カード設置 ／ 単体ノーダメ'),
      sp('qcf',  HS, 'エアディール',            '空中専用カード投擲', '空中'),
      sp('qcf',  HS, 'ヴォルト',                '前方跳躍 ／ 空中ディール派生'),
      sp('qcb',  HS, 'エンセンガ',              '対空中段ジャンプ斬')
    ],
    overdrives: [
      od('hcb-f', HS, 'ザッツ・マイ・ネーム',     '無敵対空乱舞', 50),
      od('qcf',   S,  'ジョーカートリック',        'カード ／ テレポート ／ 飛び道具貫通', 50, '×2')
    ],
    combos: [
      { tag: '基本',     seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-s">S</span>' },
      { tag: 'カード設置', seqHtml: '236<span class="key-p">P</span> &gt; 214<span class="key-s">S</span> (カード対応)' }
    ]
  },

  elp: {
    archetype: 'Rushdown',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近', 1),
    normals: standardNormals(),
    specials: [
      sp('qcf',  S,  'チェーン・ロリポップ',     '連係攻撃 ／ ガード困難'),
      sp('qcb',  K,  'ボンボン・ショコラ',       '機動 ／ 空中可'),
      sp('qcf',  P,  'Missシャルロット',         '飛び道具系統')
    ],
    overdrives: [
      od('hcb-f', S,  'ジュガン・ダ・パルフェオ', '無敵覚醒 ／ 発生13F', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  aba: {
    archetype: 'Resource',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcb',  HS, '結合と変性',             '鍵装着 ／ 空中可'),
      sp('qcb',  P,  '変転と感化',             '憤嫉モード移行'),
      sp('qcb',  K,  '牽引と随順',             '突進'),
      sp('dp',   K,  '戮力と傾動',             '対空'),
      sp('dp',   S,  '威喝と嗚咽',             '突進斬 ／ 派生有'),
      sp('qcb',  S,  '逆上と驚愕',             '通常モード専用'),
      sp('qcb',  HS, '断罪と情動',             '憤嫉モード専用 ／ 飛び道具')
    ],
    overdrives: [
      od('hcb-f', HS, '鍵の支配',                 '高威力打撃', 50),
      od('hcb-f', K,  '鍵の守護者',               '無敵反撃', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-h">HS</span>' }
    ]
  },

  sly: {
    archetype: 'Power',
    stats: baseStats(420, '中', 2, '走り', '>>>', '近', 1),
    normals: standardNormals(),
    specials: [
      sp('qcf',  P,  'マッパハンチ',           '前方突進パンチ'),
      sp('hcb-f', P, 'ダンディーステップ',     '高速移動 ／ 4種派生'),
      sp('hcb-f', HS, 'ブラッドサッキング・ユニバース', '吸血コマ投げ ／ UNIVERSE'),
      sp('button', S, 'ハンドオブドゥーム',     'バックステップ中 ／ 反撃')
    ],
    overdrives: [
      od('qcf',   S,  'スーパーマッパハンチ',     '無敵突進', 50, '×2'),
      od('qcf',   HS, 'ラストホライズン',          '一撃必殺風 ／ 100%消費', 100, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; ダンディステップ' }
    ]
  },

  dzy: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '走り', '>>>', '中〜遠', 3),
    normals: standardNormals(),
    specials: [
      sp('qcf',  SH, '魚を捕る時に使ってたんです', '氷柱召喚 ／ 凍結'),
      sp('qcf',  K,  '焼き栗が欲しい時に使ってたんです', '上方飛び道具'),
      sp('qcb',  PK, 'よく話し相手になってくれました', '追尾召喚物'),
      sp('qcb',  SH, 'ミカエルソード',         '雷剣払い'),
      sp('button', HS, '光の翼',               '追尾翼 ／ 22HS')
    ],
    overdrives: [
      od('hcb-f', S,  'インペリアルレイ',         '広範囲ビーム', 50),
      od('hcb-f', HS, 'ガンマレイ',               '強化ビーム ／ 100%', 100)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-s">S</span>' }
    ]
  },

  ven: {
    archetype: 'Setplay',
    stats: baseStats(380, '中', 2, '走り', '>>>', '中〜遠', 3),
    normals: standardNormals(),
    specials: [
      sp('qcb',  ALL, 'ボール生成',             '玉設置 ／ 全ボタン位置別'),
      sp('hcf',  K,   'マッシヴボール',         '玉一斉発射'),
      sp('dp',   ALL, 'QV',                     '突進斬 ／ 溜め可'),
      sp('qcf',  SH,  'スティンガーエイム',     '4溜め6 ／ 飛び道具'),
      sp('qcf',  SH,  'カーカススライド',       '2溜め8 ／ 上方飛び道具'),
      sp('qcf',  SH,  '空中カーカススライド',   '空中専用 ／ 急降下', '空中'),
      sp('hcb-f', K,  'トライアンバカ',          '突進斬 ／ 派生')
    ],
    overdrives: [
      od('hcb-f', S,  'ダークエンジェル',         '無敵突進', 50),
      od('hcb-f', HS, 'ナヴァラトナ・ラナウト',   '飛び道具乱舞', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 玉発射' }
    ]
  },

  uni: {
    archetype: 'Resource',
    stats: baseStats(380, '中', 2, '走り', '>>>', '中〜遠', 2),
    normals: standardNormals(),
    specials: [
      sp('qcf',  HS, 'A.M.T.G ストリーク',     'アーバレストモード時 6HS'),
      sp('qcf',  HS, 'A.A.T.G ブリッツ',       '空中専用 ／ アーバレスト時 6HS', '空中'),
      sp('qcf',  K,  'A.T.T.G ペネトレイト',   '貫通弾 ／ アーバレスト時 6K'),
      sp('qcb',  K,  'A.T.T.G トップアタック', '上方攻撃 ／ アーバレスト時 4K'),
      sp('dp',   S,  'A.C.T.G ブラストオフ',   '対空 ／ アーバレスト時 6S'),
      sp('qcb',  S,  'ブレイズ・ア・トレイル', 'チャージ ／ アーバレスト時 4S')
    ],
    overdrives: [
      od('hcb-f', S,  'メガデスバスター',         '通常覚醒', 50),
      od('qcb',   HS, 'ウェポンズ・フリー',       '体力30%以下 ／ 強化モード', 50, '×2')
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 236<span class="key-h">HS</span>' }
    ]
  },

  luc: {
    archetype: 'Rushdown',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近〜中', 2),
    normals: standardNormals(),
    specials: [
      sp('qcb',  HS, 'モノフィラメント',       '電線攻撃 ／ 溜め可'),
      sp('qcf',  S,  'ユニティ',               '突進 ／ 溜め可'),
      sp('qcb',  K,  'スプリントアタック',     '突進 ／ 派生有'),
      sp('button', S, 'スプリント・スイープ',   'スプリント中 S 下段派生'),
      sp('button', HS, 'スプリント・クロスアップ', 'スプリント中 HS 中段派生'),
      sp('dp',   HS, 'モノフィラメント・ブレイクアウト', '対空打撃')
    ],
    overdrives: [
      od('hcb-f', HS, 'ライブワイヤー',           '電撃乱舞 ／ ディープダイブ派生', 50),
      od('hcb-f', S,  'クイックハック',           '高速突進',                       50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 214<span class="key-k">K</span>' }
    ]
  },

  jam: {
    archetype: 'Rushdown',
    stats: baseStats(380, '中', 2, '走り', '>>>', '近', 1),
    normals: standardNormals(),
    specials: [
      sp('button', SH, '朝凪の呼吸',             '溜め可 ／ 22入力 ／ 必殺技強化'),
      sp('dp',   K,  '龍刃 (りゅうじん)',       '対空蹴り ／ 空中可'),
      sp('dp',   S,  '逆鱗 (げきりん)',         '突進斬 ／ 空中可'),
      sp('dp',   HS, '龍鎚 (りゅうつい)',       '上方飛び込み ／ 空中可'),
      sp('qcb',  S,  '爆蹴 (ばくしゅう)',       '突進蹴り ／ 派生'),
      sp('qcb',  K,  '跳迅 (ちょうじん)',       '高速突進'),
      sp('dp',   P,  '祓斧 (はらいおの)',       '見切り反撃 ／ 派生「剛焼」')
    ],
    overdrives: [
      od('hcb-f', HS, '兆脚黄龍門',               '無敵対空乱舞', 50),
      od('hcb-f', P,  '朝凪の呼吸・震気開天',     '全強化覚醒', 50)
    ],
    combos: [
      { tag: '基本', seqHtml: '近<span class="key-s">S</span> &gt; 5<span class="key-h">H</span> &gt; 623<span class="key-k">K</span>' }
    ]
  }
};

let filled = 0;
for (const [slug, fill] of Object.entries(data)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const existing = JSON.parse(fs.readFileSync(file, 'utf-8'));
  delete existing.stub;
  const merged = { ...existing, ...fill, dataSource: 'wikiwiki.jp/ggst-memo (verified)' };
  fs.writeFileSync(file, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  filled++;
}
console.log(`Filled DLC ${filled} characters`);
