// Add character-specific mechanic blurbs.
// Brief one-liners written in my own words; describes
// publicly known game systems for each character.

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', '..', 'data');

const mechanics = {
  nag: {
    name: '吸血ゲージ / ブラッドレイジ',
    desc: '必殺技や前歩きでゲージが上昇。MAX で「ブラッドレイジ」突入、技強化と引き換えに自動でダメージ。'
  },
  zat: {
    name: 'シャドウゲージ + エディ',
    desc: 'エディ召喚中もゲージ消費、空でクールダウン。ドリフトでエディの位置を操作する独自リソース管理。'
  },
  ram: {
    name: '剣の有無',
    desc: 'バヨネッタで剣を投げ、ダウロで取り戻す。所持本数で必殺技の性能と派生が変化。'
  },
  leo: {
    name: 'ブリュンヒルデスタンス',
    desc: '後方ガード姿勢に移行する裏スタンス。専用の必殺技と高判定通常技が解放される。'
  },
  anj: {
    name: '風神スタンス + 派生',
    desc: '236HS で構えに入り P / K / S / HS で 4 種に派生 (針一式 / 一足飛び / 凪刃 / 臨)。'
  },
  ino: {
    name: 'ホバー機動',
    desc: '空中に滞空して急降下や軌道変更。ダッシュも空中ホバー扱いで地上判定を避ける。'
  },
  gld: {
    name: 'セキュリティレベル',
    desc: '時間経過で 1〜8 まで自動上昇。レベルが高いほどサンダーバード / スカイフィッシュが多段化、必殺技で消費。'
  },
  jko: {
    name: 'サーヴァント (従者)',
    desc: '最大 3 体まで召喚し、攻撃 / 防御 / 命令で連携。設置型の追加攻撃源として機能する。'
  },
  cos: {
    name: '集中ゲージ + 弾数',
    desc: 'ガン構え中の射撃に集中ゲージと弾数 (最大 6) を消費。リロード (22P) と集中回復で維持。'
  },
  tst: {
    name: 'ステイン (烙印)',
    desc: '相手にマーキング状態を付与し、追撃で発動。Ver 2.00 で 2 スタックまで蓄積可能。'
  },
  bgt: {
    name: 'ロジャー (熊)',
    desc: '設置型の熊と連動。ストップ＆ダッシュで投擲、キックスタートで起動するセットプレイ型。'
  },
  sin: {
    name: 'スタミナゲージ',
    desc: 'ガゼルステップや派生技で消費し、減ると性能低下。「育ち盛りだからな」で食事して回復。'
  },
  bed: {
    name: 'error 6E (タスクシステム)',
    desc: '時間差で発動するカウンター技を「タスク」として配置。本体の攻撃と重ねた多重攻めが核。'
  },
  ask: {
    name: 'マナ + 詠唱書 + デッキ',
    desc: '236 / 214 で詠唱・ブックマーク。22S でマナ回復、22HS でデッキ切替。8 種の魔法を選択する独自システム。'
  },
  jhn: {
    name: 'ミストファイナー + Turn Up',
    desc: '抜刀状態で派生攻撃。ディール (236P) で設置したカードに技を当てると「Turn Up」発動で追加ダメージ。'
  },
  aba: {
    name: '嫉妬ゲージ + 憤嫉モード',
    desc: '攻撃で嫉妬ゲージが上昇、変転と感化で憤嫉モードへ。攻撃力大幅アップだが時間制限あり。'
  },
  dzy: {
    name: '召喚物のゲージ消費',
    desc: '光の翼や追尾召喚物の維持にテンションを継続消費する設置型キャラ。'
  },
  ven: {
    name: 'ボール (玉)',
    desc: '空間に玉を設置し、必殺技や通常技で殴って射出。位置と速度を制御するセットプレイの核。'
  },
  uni: {
    name: 'アーバレストモード',
    desc: '武器変形で必殺技がワンボタン入力に短縮。「ウェポンズ・フリー」で強化モード突入。'
  },
  luc: {
    name: '神経電化状態',
    desc: 'モノフィラメント (電線) 系の攻撃で相手に付与、被弾で追撃確定する独自スタン状態。'
  },
  jam: {
    name: '朝凪の呼吸 (技強化)',
    desc: '22K / S / HS で対応する必殺技強化アイコンが点灯、龍刃 / 逆鱗 / 龍鎚 が大幅強化。'
  },
  fau: {
    name: '何が出るかな？',
    desc: '236P でランダムアイテム召喚 (ハンマー / 栗 / 隕石 / 爆弾等)。引き運でラウンド展開が一変する。'
  },
  pot: {
    name: 'スライド / ブレイク',
    desc: '巨体ゆえ機動性が低い分、ハンマーフォール (4溜め6) でアーマー突進、Pで急停止して読み合い。'
  }
};

let updated = 0;
for (const [slug, mech] of Object.entries(mechanics)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.mechanic = mech;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  updated++;
}
console.log(`Added mechanic to ${updated} characters`);
