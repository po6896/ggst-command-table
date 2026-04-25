# GGST Command Table

GUILTY GEAR -STRIVE- 全 33 キャラのコマンド表。1080p 一画面に全セクション収まる静的ページ。

## 公開ページ

https://po6896.github.io/ggst-command-table/

## アーキテクチャ

ビルド時に JSON → 静的 HTML を生成。各キャラが独立 URL を持つ。

```
data/
  sol.json         ← Sol のフルデータ
  ky.json, ...     ← 他 32 キャラの stub（hero + art のみ）
src/
  build.mjs        ← ビルダー (Node.js)
  style.css        ← 共通スタイル (テンプレに埋め込み)
  svg-defs.html    ← レバー軌跡 SVG defs
  gen-stubs.mjs    ← stub JSON 一括生成 (一回だけ実行)
assets/
  sd/              ← SD チビ (256px)
  full/            ← 立ち絵 (1600px)
  logo/            ← GGST 公式ロゴ
sol.html, ky.html, ...   ← ビルド出力
index.html               ← Sol ページのコピー (ルートランディング)
```

## ローカル開発

```bash
node src/build.mjs   # data/*.json から *.html を再生成
```

ブラウザで `index.html` をダブルクリック (file:// 動作可)。

## キャラを追加・更新

`data/{slug}.json` を編集して `node src/build.mjs` 実行。
GitHub に push すると Actions が自動でビルド & Pages にデプロイ。

## 構成

- 33 個の HTML ページ (1 キャラ 1 ページ)
- 各ページにロスター → 別キャラへナビゲート
- Sol だけフル movelist、他 32 は stub (movelist 準備中表示)
- データ追加は JSON 1 ファイル

## 素材ライセンス

キャラ画像・ロゴは [GUILTY GEAR -STRIVE- 公式ファンキット](https://www.guiltygear.com/ggst/jp/fankit/) から。

- © ARC SYSTEM WORKS
- 個人サイトでのゲーム紹介・攻略・レビュー目的の非営利利用
- 改変は許諾範囲内のリサイズ (1200px → 256px) のみ
- `assets/` 配下の画像は ASW の権利物。HTML/CSS/JS のみ自由に参照可

## 拡張予定

- 残り 32 キャラの movelist 入力
- フレーム表ホバーポップ
- 主力技マーカー (パッチ追従式)
