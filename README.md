# 読むコンサル 販売LP (Next.js + TypeScript + Tailwind CSS)

副業教材「副業で稼ぐ」を徹底理解。月50万狙う副業完全実践書《読むコンサル》向けの1ページLPです。

## セットアップ

```bash
npm install
npm run dev
```

- 開発サーバー: `http://localhost:3000`

## 本番ビルド

```bash
npm run build
npm run start
```

## 主な構成

- `app/page.tsx`: LP本体
- `app/layout.tsx`: SEO / OGP metadata
- `components/CTAButtons.tsx`: CTAボタン群
- `components/SectionTitle.tsx`: セクション見出し共通UI
- `lib/ctaLinks.ts`: CTAリンク定数（後から変更しやすい）
- `public/placeholders/`: 差し替え前提の仮画像

## 画像差し替えが必要なファイル

- `public/placeholders/ogp-cover.svg`（OGP画像）
- `public/placeholders/author-neko.svg`（著者画像）

## CTAリンク変更方法

`lib/ctaLinks.ts` の定数を書き換えるだけで、LP全体のCTAリンクが一括で更新されます。

## 恋愛運チューニング音源スクリプトの使い方

`generate_love_tuning_sound.py` でWAV音源を生成できます。

```bash
pip install numpy scipy
python3 generate_love_tuning_sound.py
```

オプション例:

```bash
python3 generate_love_tuning_sound.py --output outputs/love.wav --duration 120 --seed 42
```
