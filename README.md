# GGST Command Table

GUILTY GEAR -STRIVE- のコマンド表を1画面に収めるシンプルな静的HTML。
SFV CFNコラム風のレイアウト（通常技グリッド + 必殺技帯 + 凡例）。

## 公開ページ

https://po6896.github.io/ggst-command-table/

## 構成

- `index.html` — Sol Badguy 1キャラ分（最小版）
- `DESIGN.md` — UI トークン（Linear 系。VoltAgent / awesome-design-md より）
- `assets/sd/` — 全33キャラ SDチビ PNG（256px、ヘッダー＋ロスター用）
- `assets/full/` — 全33キャラ立ち絵 PNG（1600px、特集ページ用予備）
- `assets/logo/` — ロゴ

依存なし。HTMLを開くだけで動く（Inter Variable は rsms.me から CDN 読込）。

## 素材ライセンス

キャラクターイラスト・ロゴ・SDチビは [GUILTY GEAR -STRIVE- 公式ファンキット](https://www.guiltygear.com/ggst/jp/fankit/) から取得。
ファンキット利用規約に従い、**個人サイトでのゲーム紹介・攻略・レビュー目的の非営利利用**で公開しています。

- © ARC SYSTEM WORKS
- 改変は許諾範囲内のリサイズ（1200px → 256px）のみ
- 商用利用・素材単体の再配布はしません

本リポジトリの **画像ファイル**（`assets/` 配下）は ARC SYSTEM WORKS の権利物であり、Apache/MIT 等の OSS ライセンスは適用されません。HTML/CSS/Markdown 部分のみ自由に参考にしてください。

## 拡張予定

- 全33キャラ展開（データJSON分離 + テンプレ化）
- フレーム数の正確化
- RC派生・ガトリング表記
