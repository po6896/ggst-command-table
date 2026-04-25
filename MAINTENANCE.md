# 保守・新規作成ガイド (低 quota 運用)

GGST コマンド表の更新を最小限の AI quota で行うための手順書。
シナリオ別に手順とテンプレを置く。新キャラ DLC・パッチ・データ修正の度に開く。

---

## 1. quota コスト感 (相対値)

| 操作 | コスト | 備考 |
|------|--------|------|
| `Bash` (grep / cat / node) | 低 | 小出力なら実質ゼロ |
| `Grep` / `Glob` | 低 | 単発、結果が短い場合 |
| `Edit` (アンカー指定) | 低 | 周辺 5-10 行で済む |
| `Read` (小ファイル <200 行) | 低 | hero/footer 等 |
| `Read` (大ファイル 500+ 行) | **高** | キャラ JSON 全文・style.css は重い |
| `WebFetch` (wikiwiki) | 中 | 1 ページ ≒ Read 大ファイル相当 |
| `WebFetch` 同 URL 再取得 | 低 | **15 分キャッシュ**で安い |
| `Agent` 並列分散 | **高** | 同タスクなら主エージェントの方が安い |
| `Playwright` 起動 | 中 | Chrome プロファイル衝突に注意 |
| `node src/build.mjs` | ゼロ | ビルドは無料 |

**節約の三大原則**:
1. **Read を Edit のアンカー前提で省略** — `grep -n "anchor"` で行番号を取得 → Edit で直接書き換える (Read 不要)
2. **WebFetch は 1 タスク 1 回** — 同 URL を別プロンプトで再叩きしない
3. **build.mjs を直すと全キャラ自動反映** — 1 ファイル変更 + 1 ビルドで 33 ページ更新可能。個別 JSON 編集を避ける

---

## 2. シナリオ別手順

### A. 既存キャラの 1 行修正 (例: 効果文の typo)

**コスト**: ~3 ツール呼び出し

```bash
# 1. アンカー検索
grep -n "誤字" data/{slug}.json
```

```
2. Edit で誤→正に置換 (Read 不要、replace_all=false)
3. node src/build.mjs && git commit -m "fix: ..." && git push
```

注意: `Edit` の `old_string` は周辺 1-2 行を含めてユニーク化。同じ誤字が複数行にあるなら `replace_all: true`。

### B. 既存キャラの mechanicDetail を新規追加

**コスト**: ~5 ツール呼び出し (WebFetch 1 + Edit 1 + ビルド)

```bash
# 1. アンカー位置確認
grep -n "mechanic" data/{slug}.json
# → 例: 196:  "mechanic": {

# 2. wikiwiki から機構情報取得 (URL: section 5 のスラッグマッピング表参照)
```

```
3. WebFetch で /キャラ名/コマンド技 を取得、固有システム情報抽出
4. Edit で `}\n}` を `},\n  "mechanicDetail": { ... }\n}` に書き換え
5. node src/build.mjs
6. dist 確認: grep "固有システム詳細" {slug}.html
```

mechanicDetail テンプレートは section 4 参照。

### C. 既存 mechanicDetail の更新 (パッチで仕様変更)

**コスト**: ~2 ツール呼び出し

```bash
grep -n "更新したい技名" data/{slug}.json
# → Edit で該当 row を直す
```

複数キャラ横断 (例: Ver. 2.10 で全員のテンション値が変わった等) なら **build.mjs に変換ロジックを書く** か **seed スクリプトを書く** (`src/seed/fix-XXX.mjs`)。手動 Edit は避ける。

### D. schema 変更 (全キャラに影響する構造変更)

**コスト**: 1 ファイル変更で 33 キャラ自動反映 (低)

`mechanicDetail.sections[].newField` を増やす場合:
1. `src/build.mjs` の `renderMechanicDetail()` を編集して新フィールドを描画
2. CSS 必要なら `src/style.css` 末尾追記 (Read 必要だが 1 回だけ)
3. `node src/build.mjs` で全 33 ページ自動再生成

データ側 (JSON) は後方互換にすること。新フィールドは optional 扱い → 古いデータは無視されるだけ。

### E. 新キャラ追加 (DLC リリース時)

**コスト**: WebFetch 2-3 + Edit 数件

```bash
# 1. roster とビルド対象に追加
grep -n "slugs" src/build.mjs
# → 配列に新スラッグ追記

# 2. data/{newslug}.json をテンプレ (section 4) からコピーして埋める
# 3. assets/ にチビ画像とフルアートを配置 (slug 命名規則: {no}_chibi_{slug}.png / chara{no}_{slug}.png)
# 4. node src/build.mjs
# 5. ビジュアル確認 (Playwright or ブラウザ)
```

参照値の取得:
- 通常技・必殺技: WebFetch `https://wikiwiki.jp/ggst-memo/{name}/コマンド技`
- 統計値 (HP・防御・根性): wikiwiki キャラトップページ `/ggst-memo/{name}` の表
- 画像: 公式ファンキット (https://www.guiltygear.com/ggst/jp/fankit/) からダウンロード

### F. パッチ Ver. X.Y への追従

**コスト**: 中 (公式パッチノートと差分のみ更新)

1. `src/build.mjs` の META 定数を更新:
```js
const META = {
  patchVersion: 'Ver. 2.10',
  patchDate: '2026-MM-DD',
  updatedAt: '2026-MM-DD'
};
```
2. パッチノート (公式 / wikiwiki "更新履歴") から変更点リストを WebFetch
3. 該当キャラのみ Grep でアンカー検索 → Edit
4. ビルド + 確認 + push

**やらないこと**: 全 33 キャラ JSON を再 wikiwiki で再検証する (重い、不要)。差分があったキャラだけ。

---

## 3. アンチパターン

| やらない | なぜ | 代わりに |
|---------|------|---------|
| 全キャラ JSON を一気に Read | 33 × 200 行 = 6600 行で context 圧迫 | `Grep` で必要箇所だけ |
| 同 URL を別プロンプトで再 fetch | キャッシュ効くが冗長 | 1 回で必要情報を全部抽出するプロンプト |
| 並列 Agent で全キャラ分散処理 | エージェント spin up コスト + 同期不要 | 主エージェントで sequential |
| `Read` してから `Edit` | Read が無駄 | `Grep -n` で行番号確認のみ → Edit |
| ビルド済み HTML を直接編集 | 次のビルドで上書き | JSON か build.mjs を直す |
| 一気に schema 変更 + 全キャラ書き換え | quota 爆発 | schema 変更を後方互換にして段階移行 |
| `Read` の `limit` なし | 巨大ファイルで context 浪費 | `offset/limit` を使う or `Grep` で済ます |

---

## 4. テンプレート集

### 4-1. 新キャラ data/{slug}.json (最小)

```json
{
  "no": 34,
  "slug": "abc",
  "name": "Char Name",
  "nameJp": "キャラ名",
  "color": "#5fc874",
  "sdIcon": "34_chibi_abc.png",
  "fullArt": "chara34_abc.png",
  "archetype": "Trickster",
  "artPos": "14%",
  "stats": {
    "defense": 1.00,
    "defensePct": 50,
    "guts": 0,
    "gutsLevel": 0,
    "dash": "走り",
    "dashIcon": ">>>",
    "range": "近〜中",
    "rangeLevel": 2
  },
  "normals": { "stand": [], "crouch": [], "air": [] },
  "specials": [],
  "overdrives": [],
  "combos": [],
  "dataSource": "wikiwiki.jp/ggst-memo (verified)",
  "mechanic": { "name": "...", "desc": "..." }
}
```

### 4-2. mechanicDetail テンプレ (シンプル系・2 セクション)

```json
"mechanicDetail": {
  "intro": "1-2 文の概観。配牌された〇〇を 236 で発動、22HS で〇〇を切替...",
  "sections": [
    {
      "title": "ゲージ管理",
      "summary": "ゲージの最大値・消費・回復。",
      "table": {
        "headers": ["項目", "値"],
        "rows": [
          ["最大値", "100%"],
          ["消費", "..."],
          ["回復", "..."]
        ]
      }
    },
    {
      "title": "技別性能",
      "table": {
        "headers": ["技", "コマンド", "効果"],
        "rows": [
          ["技 A", "236P", "..."],
          ["技 B", "214K", "..."]
        ]
      }
    }
  ]
}
```

### 4-3. mechanicDetail テンプレ (複雑系・full-width + cards)

ask.json を参考。要素:
- `intro` 段落
- 4-6 セクション
- `width: "full"` で 2 列スパン (魔法カタログ等)
- 行カテゴリ色: `{ cat: "mana"|"bookmark"|"attack"|"special", cells: [...] }`
- 並列カード: `cards: [{ label, subtitle, cat, rows: [[k,v]] }]`
- カテゴリ追加時は `src/style.css` の `--cat-*` トークンに色追加

### 4-4. 一括修正 seed スクリプト (例)

```js
// src/seed/fix-XXXX-YYYY-MM-DD.mjs
import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', '..', 'data');

const patches = [
  ['slug1', 'oldName',  { icon: 'qcb', repeat: undefined }],
  ['slug2', 'oldName2', { name: 'newName' }],
];

const slugs = new Set(patches.map(p => p[0]));
let changedFiles = 0;

for (const slug of slugs) {
  const file = path.join(dataDir, `${slug}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let mutated = false;
  const myPatches = patches.filter(p => p[0] === slug);
  for (const [, oldName, patch] of myPatches) {
    // overdrives / specials / normals を順に検索
    for (const list of [j.overdrives ?? [], j.specials ?? []]) {
      for (const m of list) {
        if (m.name !== oldName) continue;
        for (const [k, v] of Object.entries(patch)) {
          if (v === undefined) {
            if (k in m) { delete m[k]; mutated = true; }
          } else if (m[k] !== v) {
            m[k] = v; mutated = true;
          }
        }
        break;
      }
    }
  }
  if (mutated) {
    fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
    console.log(`fixed: ${slug}.json`);
    changedFiles++;
  }
}
console.log(`\nUpdated ${changedFiles} files.`);
```

実行: `node src/seed/fix-XXXX-YYYY-MM-DD.mjs && node src/build.mjs`。

---

## 5. wikiwiki URL マッピング

wikiwiki は日本語 URL でキャラページを区別する。slug → wikiwiki name は不規則。判明分:

| slug | wikiwiki name | 備考 |
|------|---------------|------|
| sol | ソル | |
| ky | カイ | |
| may | メイ | |
| axl | アクセル | |
| chipp | チップ | |
| pot | ポチョムキン | |
| fau | ファウスト | |
| mll | ミリア | |
| zat | ザトー | |
| ram | ラムレザル | |
| leo | レオ | |
| nag | 名残雪 | |
| gio | ジオヴァーナ | |
| anj | 御津闇慈 | |
| ino | イノ | |
| gld | **ディキンソン** | フルネームじゃなく姓 |
| jko | **ジャック・オー** | 中点あり |
| cos | ハッピーケイオス | |
| bkn | 梅喧 | |
| tst | テスタメント | |
| bgt | ブリジット | |
| sin | シン | |
| bed | ベッドマン？ | 末尾の ？ 必須 |
| ask | 飛鳥 | R♯ なし |
| jhn | ジョニー | |
| elp | エルフェルト | サブページは `/必殺技` (`/コマンド技` ではない) |
| aba | A.B.A | |
| sly | スレイヤー | |
| dzy | **クイーン・ディズィー** | 肩書き付き |
| ven | ヴェノム | |
| uni | ユニカ | |
| luc | **ルーシー** (英語表記候補) / ルチア (日本語) | wikiwiki で要確認 |
| jam | **紗夢** | 蔵土縁紗夢ではなく |

URL: `https://wikiwiki.jp/ggst-memo/{name}/コマンド技` (URL エンコード必要)。
404 出たら hub `https://wikiwiki.jp/ggst-memo/` を fetch して正規 URL を確認。

---

## 6. 検証 (低コスト)

### ビルド成否
```bash
node src/build.mjs 2>&1 | tail -3
# "Built 33 character pages + index.html" が出れば OK
```

### セクション存在確認
```bash
for f in data/*.json; do
  slug=$(basename $f .json)
  has=$(grep -c "mechanicDetail" $f)
  echo "$slug: $has"
done
```

### ビジュアル確認 (任意)
```bash
# 別ターミナルで
cd E:/Util/ggst-command-table && python -m http.server 8781

# 主要キャラを Playwright で snapshot or 手動でブラウザ確認
# 全 33 キャラを確認するのは過剰。複雑系 5-6 キャラだけで十分
```

---

## 7. リリースフロー

新キャラ・パッチ反映時の標準手順:

1. **準備**: `git pull && git status` でクリーン確認
2. **データ追記/修正**: 上記 A-F のシナリオで作業
3. **build.mjs の META を更新** (パッチ Ver. と updatedAt)
4. **ビルド**: `node src/build.mjs`
5. **検証**: 主要キャラ 3-5 ブラウザ確認
6. **コミット**: `git add -A && git commit -m "..."`
7. **push**: `git push origin main`
8. **GitHub Pages**: 数分で反映 (自動)
9. **memory 更新** (任意): `~/.claude/projects/.../memory/project_ggst_command_table.md` の残 TODO 等を更新
10. **Discord 通知**: `F:/BrainServer/bridge/discord-notify "..."`

---

## 8. quota 浪費を防ぐ実例

### NG パターン
```
Agent("zat の mechanic 詳細を取得して書いてくれ") × 22 並列
```
→ 各エージェントが context 立ち上げ、wikiwiki fetch、Edit で各 5-10 ツール呼び出し → quota 大爆発。

### OK パターン
```
1. WebFetch zat → JSON Edit (主エージェントで 2 ツール)
2. WebFetch jhn → JSON Edit
3. ...sequential...
```
→ 主エージェントの context は使い回し、tool overhead 最小。

### NG パターン
```
Read data/zat.json (210 行)
Read data/jhn.json (200 行)
Read data/cos.json (210 行)
... × 22 = 4500 行 context 食う
Edit ...
```

### OK パターン
```
Grep -n "mechanic" data/zat.json data/jhn.json data/cos.json ...
→ 行番号取得 (1 ツール、出力 30 行)
Edit zat (Read 不要)
Edit jhn
...
```

---

## 9. 他ゲームへの派生 (Lv1: config 抽出方式)

`src/game-config.mjs` に GGST 固有の定数を切り出してある。
スト6・KOF・鉄拳など別ゲームのコマンド表を作る時は、**このリポを fork
してこのファイルを書き換えるだけ**で土台は流用できる。

### 派生時の手順

1. このリポを `git clone` または fork → 新リポ作成 (例: `sf6-command-table`)
2. **`src/game-config.mjs` を書き換え** — 主に以下:
   - `GAME.id` / `displayName` / `longName` / `defaultSlug` / `sourceUrl` / `sourceLabel` / `copyright`
   - `META.patchVersion` / `patchDate` / `updatedAt`
   - `OD_LABEL` (GGST = `Overdrive`、SF6 = `Super Art`、KOF = `超必殺技` など)
   - `BUTTONS` 配列 (SF6 は `['lp','mp','hp','lk','mk','hk']`、KOF は `['a','b','c','d']` 等)
   - `SYSTEM_COMMON` (ゲーム共通システム — ガード / バースト相当 / ドライブシステムなど **全面書き換え**)
   - `ARCHETYPE_JA` (アーキタイプの分類が変わるなら追加)
   - `ICON_LABEL` (1 回転やレバー溜めの表記、共通の motion icon 名前マップ)

3. **`src/style.css` のボタン色トークンを書き換え**:
```css
:root {
  --btn-p: ...;   /* SF6 なら --btn-lp / --btn-mp / --btn-hp / ... */
  --btn-k: ...;
  --btn-s: ...;
  --btn-h: ...;
  --btn-d: ...;
}
.key-p { color: var(--btn-p); }
/* ...同パターン... */
```
ボタン数が変わる場合は `style.css` 内の `.key-X` クラスも増減する。

4. **モーションアイコン (SVG) の調整**:
   - `src/build.mjs` 内の `SVG_DEFS` 定数に `<symbol id="m-XXX">` で定義
   - 既存の `qcf` / `qcb` / `dp` / `hcb-f` / `charge46` / `charge28` 等は格闘ゲー共通
   - ゲーム固有の入力 (例: SF6 のインパクト同時押し) があれば追加

5. **データ作成**: `data/{slug}.json` を新キャラ分作る (本ガイド section 4-1 のテンプレ参照)
   - キャラ画像は `assets/full/` `assets/sd/` `assets/logo/` に配置
   - logo ファイル名は `logo_{GAME.id}_pos.png` 命名規則

6. **アセット差替**: ロゴ・チビ・全身絵を新ゲームのものに

7. ビルド + push

### Lv1 の限界

- **ゲーム情報は一括ハードコード** — 1 リポ = 1 ゲーム
- **複数ゲームを 1 リポで管理したくなったら Lv2 へ** (games/{game}/data 構造、`node src/build.mjs ggst` のような引数指定)
- 今のところ Lv2 は YAGNI

### 派生する時に再利用できる部分 / 書き換える部分

| 部分 | 流用度 | 備考 |
|------|--------|------|
| `build.mjs` 本体 (テンプレ生成ロジック) | ✅ 100% | レンダリング部分はゲーム非依存 |
| `style.css` レイアウト系 (.move / .specials / .normals / .mech-*) | ✅ 95% | ボタン色トークンだけ差替 |
| motion icon SVG sprite | ✅ 90% | 共通入力は流用、ゲーム固有のみ追加 |
| `mechanicDetail` schema | ✅ 100% | 完全汎用 |
| `data/{slug}.json` キャラデータ | ❌ 0% | キャラごとに新規作成 |
| `assets/` (ロゴ・キャラ画像) | ❌ 0% | 新規調達 |
| `game-config.mjs` | ⚙️ 書き換え | この 1 ファイルでゲーム固有部分を集約 |
| `MAINTENANCE.md` の wikiwiki URL マッピング | ❌ 0% | 各ゲームの wiki/ソースに合わせて作り直し |

---

## 10. 既知の地雷

- **wikiwiki URL の日本語表記揺れ**: 同じキャラでもサブページが `/コマンド技` か `/必殺技` か違う。404 出たら hub から正規 URL を取り直す
- **Dustloop 403**: WebFetch 直接禁止。代替必要時はユーザーに手動で送ってもらう
- **Playwright Chrome プロファイル衝突**: `mcp-chrome-XXX` user-data-dir をすでに使ってる Chrome があると起動失敗。再起動するか別プロファイルで試す
- **CRLF 警告**: Windows 環境で git が LF→CRLF 変換警告を出すが無害。`git -c core.autocrlf=false` で抑制可
- **GGST Lv 1-8 表記の落とし穴**: gld の旧 desc は「Lv 1-8」だったが wikiwiki 確認で Lv 1-3 が正しい。古い情報を信用せず wiki で再確認
- **GGST 防御係数 / 根性は固定スペック**: HP は全員 420。違いは defense (0.75-1.18) + guts (0-5)。再検証不要
