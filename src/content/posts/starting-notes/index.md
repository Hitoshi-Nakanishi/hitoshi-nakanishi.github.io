---
title: ノートで記録を始めている
description: このサイトの日英切り替え、設計方針、書き方のメモ
date: 2026-10-24
tags: [このサイト]
---

考えたことをここに記録していく。この記事は、サイトの仕組みと書き方のメモ。

## 日本語と英語

記事ごとに、同じフォルダに日本語版と英語版を置く。

```
src/content/posts/starting-notes/
  index.md         日本語
  index.en.md      英語
  unit-circle.svg  画像（両方で共有）
```

- 日本語のページは `/`、英語のページは `/en/` の下に出る
- 右上の JA / EN で切り替える。英語版がない記事では、英語のトップに移動する
- 記事一覧には、その言語で書いた記事だけが並ぶ。片方の言語だけで書いてもよい

新しい記事はコマンドで作る。

```bash
npm run new -- "タイトル" my-slug        # 日本語
npm run new -- "Title" my-slug --en      # 同じ記事の英語版
```

## 設計方針

- **記事は Markdown ファイル**：データベースや CMS は使わない。ファイルを書いて Git で管理する
- **静的サイト**：[Astro](https://astro.build) で HTML を生成し、GitHub Pages に置く。`main` に push すると GitHub Actions がビルドして公開する
- **数式はビルド時に描画**：KaTeX で HTML にしておくので、閲覧時に JavaScript で数式を組み立てない
- **画像は記事と同じフォルダ**：ビルド時に最適化される
- **見た目**：本文は明朝体（Noto Serif JP）と EB Garamond。ライト／ダークを切り替えられる
- **余計なものは入れない**：アクセス解析、広告、コメント欄はない。RSS は日本語 `/rss.xml`、英語 `/en/rss.xml`

## 書き方の見本

### 数式

文中は `$...$`：$e^{i\theta} = \cos\theta + i\sin\theta$

独立した行は `$$...$$`：

$$
e^{i\pi} + 1 = 0
$$

複数行は `aligned`：

$$
\begin{aligned}
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \\
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
\end{aligned}
$$

### 画像

```md
![単位円](./unit-circle.svg "図1　単位円")
```

`"..."` の部分がキャプションになる。

![単位円](./unit-circle.svg "図1　単位円")

### コード

````md
```python
import cmath
print(abs(cmath.exp(1j * cmath.pi) + 1))
```
````

```python
import cmath
print(abs(cmath.exp(1j * cmath.pi) + 1))
```

### 表

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
| --- | --- | --- |
| $0$ | $1$ | $0$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

### 引用と脚注

> 引用は行頭に `>` を付ける。

脚注は `[^1]` と書き、本文の最後に `[^1]: ...` で中身を書く[^1]。

### 下書き

フロントマターに `draft: true` を書くと公開されない。`npm run dev` のときだけ表示される。

[^1]: これが脚注。
