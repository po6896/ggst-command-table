# GGST Command Table

GUILTY GEAR -STRIVE- 全 33 キャラのコマンド表。1080p 一画面に全セクション収まる静的ページ。

## 公開ページ

https://po6896.github.io/ggst-command-table/

## アーキテクチャ

ビルド時に JSON → 静的 HTML を生成。各キャラが独立 URL を持つ。

```
ggst-command-table/
├── data/                  ← 33 キャラ JSON (movelist データ)
│   ├── sol.json
│   ├── ky.json
│   └── ...
├── src/
│   ├── build.mjs          ← ビルダー (Node.js, データ → HTML)
│   ├── style.css          ← 共通スタイル (テンプレに埋め込み)
│   ├── svg-defs.html      ← レバー軌跡 SVG defs
│   └── seed/              ← 初期データ投入 / wiki 照合の一回限りスクリプト
│       ├── gen-stubs.mjs  ← 32 キャラの stub JSON を生成
│       ├── set-artpos.mjs ← 体型に合わせた立ち絵 artPos を一括設定
│       ├── fix-base15.mjs ← 原作 15 キャラの wiki 照合データ
│       └── fill-dlc.mjs   ← DLC 18 キャラの wiki 照合データ
├── assets/
│   ├── sd/                ← SD チビ 256px (ロスター/アバター)
│   ├── full/              ← 立ち絵 1600px (ヒーローパネル)
│   └── logo/              ← GGST 公式ロゴ
├── .github/workflows/
│   └── build.yml          ← push 時の自動ビルド & Pages デプロイ
├── sol.html, ky.html, ... ← ビルド出力 (33 ページ)
├── index.html             ← Sol ページのコピー (ルートランディング)
├── README.md
└── DESIGN.md              ← UI トークン (Linear 系参考)
```

## ローカル開発

```bash
node src/build.mjs   # data/*.json から *.html を再生成
```

ブラウザで `index.html` をダブルクリック (file:// 動作可)。

## キャラを追加・更新

1. `data/{slug}.json` を編集
2. `node src/build.mjs` でローカル確認
3. push → GitHub Actions が自動ビルド & Pages デプロイ

## データソース

全キャラの movelist は [wikiwiki.jp/ggst-memo](https://wikiwiki.jp/ggst-memo/) のコマンド技ページを照合元として入力。各 JSON に `dataSource` フィールドあり。

技名・入力は事実情報、解説文は独自の短縮ノート。フレーム値は概算で、最新パッチでの再検証推奨。

## 素材ライセンス

キャラ画像・ロゴは [GUILTY GEAR -STRIVE- 公式ファンキット](https://www.guiltygear.com/ggst/jp/fankit/) から。

- © ARC SYSTEM WORKS
- 個人サイトでのゲーム紹介・攻略・レビュー目的の非営利利用
- 改変は許諾範囲内のリサイズ (1200px → 256px) のみ
- `assets/` 配下の画像は ASW の権利物。HTML/CSS/JS のみ自由に参照可

## 拡張予定

- フレーム表ホバーポップ
- 主力技マーカー (パッチ追従式)
- 印刷用 CSS (ラミネートカード想定)
- OGP メタ + サムネ
