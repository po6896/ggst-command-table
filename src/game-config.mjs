// Game-specific constants. Swap this single file (+ adjust the
// CSS button-color tokens in style.css and the motion icon symbols
// in src/build.mjs's SVG sprite) to retarget the build for another
// fighting game (SF6 / KOF / Tekken / etc.).
//
// Everything that is not in this file is intended to be game-agnostic
// rendering logic. See MAINTENANCE.md "他ゲーム派生" for the porting
// checklist.

// ---------- Identity / footer info ----------

export const GAME = {
  id: 'ggst',
  displayName: 'GGST',
  longName: 'GUILTY GEAR -STRIVE-',
  defaultSlug: 'sol',
  sourceUrl: 'https://wikiwiki.jp/ggst-memo/',
  sourceLabel: 'wikiwiki.jp/ggst-memo',
  copyright: 'キャラクター素材・ロゴ: GUILTY GEAR -STRIVE- 公式ファンキット ／ © ARC SYSTEM WORKS',
};

export const META = {
  patchVersion: 'Ver. 2.00',
  patchDate: '2026-04-08',
  updatedAt: '2026-04-25',
};

// ---------- Archetype labels ----------
// Stored data is in English (grep/sort friendly), localized at render.

export const ARCHETYPE_JA = {
  Power:     'パワー型',
  Balance:   'バランス型',
  Speed:     'スピード型',
  Rushdown:  'ラッシュ',
  Zoner:     'ゾナー',
  Grappler:  'グラップラー',
  Setplay:   'セットプレイ',
  Trickster: 'トリックスター',
  Counter:   'カウンター',
  Resource:  'リソース管理',
};

// ---------- Motion icon → command label ----------
// Most icons stay icon-only since their numeric notation (236/214/623)
// is familiar. Only ambiguous or non-trivial inputs get a text label.
// Keys here must match the m-XXX SVG symbols defined in build.mjs.

export const ICON_LABEL = {
  'charge46': '4溜め6',
  'charge28': '2溜め8',
  'down2':    '22',
  '360':      '1回転',
  '8way':     '半回転＋方向維持',
  'hcb-f':    '63214→6',
  'hcf':      '41236',
};

// ---------- Overdrive / Super label ----------
// GGST = "Overdrive". SF6 = "Super Art" / "SA1/SA2/SA3".
// KOF = "超必殺技" / "MAX". Tekken = "Heat Smash" / "Rage Art".

export const OD_LABEL = 'Overdrive';

// ---------- Button definitions ----------
// Used for generating CSS classes and stat-row labels.
// CSS color tokens (--btn-p / --btn-k / ...) live in style.css.
// When porting to another game, update both this list AND those tokens.

export const BUTTONS = ['p', 'k', 's', 'h', 'd'];

// ---------- System-common moves ----------
// Mechanics shared by every character (throws, dust, RC, FD, burst...).
// Rendered in the bottom "システム共通" section of each character page.
// Game-specific in entirety: SF6 would list parry / impact / drive rush
// instead.

export const SYSTEM_COMMON = [
  {
    icon: 'dir',
    btnHtml: '＋<span class="key-h">HS</span>',
    name: '投げ',
    note: '前/後ろ投げ ／ 近距離',
  },
  {
    icon: 'button',
    btnHtml: '<span class="key-d">D</span>',
    name: 'ダスト',
    note: '中段始動 ／ 全キャラ共通',
  },
  {
    icon: 'button',
    btnHtml: '<span class="key-p">P</span>＋<span class="key-k">K</span>',
    name: 'フォルトレスディフェンス',
    note: 'ガード中 ／ テンション消費',
  },
  {
    icon: 'button',
    btnHtml: '<span class="key-p">P</span>＋<span class="key-k">K</span>＋<span class="key-s">S</span>',
    name: 'ロマンキャンセル',
    note: '攻撃中 ／ テンション 50%',
  },
  {
    icon: 'button',
    btnHtml: '<span class="key-d">D</span> 系入力',
    name: 'サイクバースト',
    note: '被弾中 ／ 1ラウンド 1回',
  },
];
