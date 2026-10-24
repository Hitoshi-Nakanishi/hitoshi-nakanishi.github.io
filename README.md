# Notebook

考えたことを書きとめるための個人ブログ。[Astro](https://astro.build) で作り、GitHub Pages で公開します。

- Markdown で記事を書く
- 数式（KaTeX）: `$...$` と `$$...$$`
- 画像は記事と同じフォルダに置くだけで最適化される。`"タイトル"` を付けるとキャプションになる
- ライト／ダークモード、RSS、サイトマップ、タグ、アーカイブ

## 手元で動かす

```bash
npm install
npm run dev
```

http://localhost:4321 で確認できます。保存するたびに自動で反映されます。

## 記事を書く

```bash
npm run new -- "記事のタイトル"
```

`src/content/posts/<日付>/index.md` ができます。URL を英語にしたいときは 2 つめの引数で指定します。

```bash
npm run new -- "記事のタイトル" my-first-post
```

### フロントマター

```yaml
---
title: 記事のタイトル
description: 一覧に出る短い説明（省略可）
date: 2026-10-24
updated: 2026-10-25     # 省略可
tags: [メモ, 数学]
cover: ./cover.jpg      # 省略可。記事上部の大きな画像
coverAlt: 画像の説明
draft: true             # true のあいだは公開されない（npm run dev では見える）
---
```

### 数式

```md
文中の数式は $E = mc^2$ のように。

$$
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$
```

### 画像

記事フォルダに画像を置いて相対パスで参照します。

```md
![代替テキスト](./photo.jpg "図1　キャプション")
```

## 公開する（GitHub Pages）

1. GitHub で新しいリポジトリを作る
   - `ユーザー名.github.io` という名前にすると `https://ユーザー名.github.io/` で公開される
   - それ以外の名前（例: `notebook`）なら `https://ユーザー名.github.io/notebook/`
2. このフォルダを push する
   ```bash
   git remote add origin https://github.com/ユーザー名/リポジトリ名.git
   git push -u origin main
   ```
3. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にする

以後は `main` に push するたびに自動で公開されます。公開先の URL とパスはリポジトリ名から自動で決まるので、設定ファイルを書き換える必要はありません。独自ドメインを使う場合は、ワークフローに環境変数 `SITE_URL`（例: `https://example.com`）と `BASE_PATH`（`/`）を設定してください。

## カスタマイズ

| 変えたいもの | ファイル |
| --- | --- |
| サイト名・紹介文・著者名 | `src/consts.ts` |
| About ページ | `src/pages/about.md` |
| 色・フォント・余白 | `src/styles/global.css`（先頭の `:root` に色がまとまっている） |
| ファビコン | `public/favicon.svg` |
