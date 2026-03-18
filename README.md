# Threads 恋愛スピ投稿抽出ツール

Threads の公開投稿から、恋愛系 + スピリチュアル系の話題を含みそうな投稿を Playwright で巡回し、**いいね数 2000 以上**の投稿だけを JSON / CSV で保存するローカル用ツールです。

## できること

- Node.js + Playwright で Threads の公開投稿ページを巡回
- 既定キーワードで検索
  - `恋愛`
  - `復縁`
  - `引き寄せ`
  - `潜在意識`
  - `波動`
  - `運命`
  - `ツインレイ`
- 出力項目
  - `account_name`
  - `handle`
  - `post_text`
  - `post_url`
  - `like_count`
  - `reply_count`
  - `repost_count`
  - `collected_at`
- `like_count >= 2000` の投稿のみ保存
- `love_score` / `spiritual_score` / `love_spi_score` / `is_priority_post` を付与
- `.env` から認証情報を読み込むログイン対応構成
- DOM 変化に備えて複数セレクタ候補で抽出
- 失敗時は `screenshots/` にスクリーンショットを保存
- 日本語 UI 想定で日本語ラベルも拾う設計

## 前提

- Node.js 20 以上を推奨
- 公開投稿の閲覧仕様や Threads 側 UI は変わることがあります
- ログインや追加認証、レート制限、国やアカウント状態による表示差分がある場合があります

## セットアップ

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

必要に応じて `.env` を編集してください。

```dotenv
THREADS_USERNAME=
THREADS_PASSWORD=
THREADS_HEADLESS=true
THREADS_MAX_POSTS_PER_KEYWORD=40
THREADS_SCROLL_ROUNDS=8
THREADS_SEARCH_WAIT_MS=2500
THREADS_MIN_LIKES=2000
```

### 環境変数

- `THREADS_USERNAME`: ログインが必要なときのユーザー名
- `THREADS_PASSWORD`: ログインが必要なときのパスワード
- `THREADS_HEADLESS`: `true` / `false`
- `THREADS_MAX_POSTS_PER_KEYWORD`: キーワードごとに確認する投稿 URL 数の上限
- `THREADS_SCROLL_ROUNDS`: 検索結果ページでのスクロール回数
- `THREADS_SEARCH_WAIT_MS`: スクロールごとの待機時間
- `THREADS_MIN_LIKES`: 保存対象の最低いいね数。既定値は `2000`

## 実行方法

既定キーワードで実行:

```bash
npm run collect:threads
```

キーワードを指定して実行:

```bash
npm run collect:threads -- 恋愛 復縁 ツインレイ
```

## 出力

実行成功後、以下が生成されます。

- `output/threads-love-spi-<timestamp>.json`
- `output/threads-love-spi-<timestamp>.csv`

各レコードの例:

```json
{
  "account_name": "Example Account",
  "handle": "example_handle",
  "post_text": "復縁したい時ほど、自分の波動を整えるのが大事…",
  "post_url": "https://www.threads.com/@example/post/ABC123",
  "like_count": 5230,
  "reply_count": 87,
  "repost_count": 310,
  "collected_at": "2026-03-18T12:00:00.000Z",
  "matched_keyword": "復縁",
  "love_score": 2,
  "spiritual_score": 2,
  "love_spi_score": 11,
  "is_priority_post": true
}
```

## 恋愛スピ判定の考え方

投稿本文に以下の語が含まれるかを簡易的に判定します。

- 恋愛キーワード: `恋愛`, `復縁`, `片思い`, `彼`, `彼女`, `結婚`
- スピキーワード: `引き寄せ`, `波動`, `宇宙`, `潜在意識`, `ツインレイ`, `エネルギー`

スコア仕様:

- `love_score`: 恋愛キーワード一致数
- `spiritual_score`: スピキーワード一致数
- `love_spi_score`: 上記の合算 + 両方が強い投稿へのボーナス
- `is_priority_post`: 恋愛系とスピ系の両方に 1 件以上一致した場合 `true`

並び順は次の優先順位です。

1. `is_priority_post = true`
2. `love_spi_score` が高い
3. `like_count` が高い

## 実装メモ

- 検索導線として Threads の検索 URL 候補を複数試します
- 投稿一覧や本文抽出、ログイン、統計値取得で複数セレクタ / 複数パターンを使用します
- 失敗した検索ページや投稿ページは `screenshots/` に保存されます
- UI 変更が大きい場合は `src/threadsCollector/lib/threads.js` のセレクタ候補追加で追従できます

## チェック

構文チェック:

```bash
npm run check
```

## 注意

- Threads の利用規約、robots、表示要件、アクセス頻度に注意して利用してください
- ログイン保護や 2 段階認証がある場合、自動化だけでは突破できないことがあります
- 取得件数や精度は Threads 側 UI / 表示内容 / 地域差 / アカウント差分の影響を受けます
