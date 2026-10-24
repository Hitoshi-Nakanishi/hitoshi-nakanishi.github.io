---
title: Starting to keep notes here
description: Notes on how this site handles Japanese and English, how it is built, and how to write posts
date: 2026-10-24
tags: [this site]
---

I am going to record what I think about here. This post is a note on how the site works and how to write for it.

## Japanese and English

Each post keeps its Japanese and English versions in the same folder.

```
src/content/posts/starting-notes/
  index.md         Japanese
  index.en.md      English
  unit-circle.svg  image (shared by both)
```

- Japanese pages live under `/`, English pages under `/en/`
- JA / EN in the top right switches language. If a post has no translation, the switch goes to the other language's home page
- Each language's post list shows only the posts written in that language, so writing in just one language is fine

New posts are created with a command:

```bash
npm run new -- "タイトル" my-slug        # Japanese
npm run new -- "Title" my-slug --en      # English version of the same post
```

## How it is built

- **Posts are Markdown files**: no database or CMS. Files are written by hand and kept in Git
- **Static site**: [Astro](https://astro.build) generates HTML, hosted on GitHub Pages. Pushing to `main` makes GitHub Actions build and publish it
- **Math is rendered at build time**: KaTeX turns it into HTML, so no JavaScript has to lay out equations in the browser
- **Images sit next to the post**: they are optimized at build time
- **Look**: body text in a Mincho serif (Noto Serif JP) and EB Garamond, with light and dark modes
- **Nothing extra**: no analytics, ads or comments. RSS feeds are `/rss.xml` (Japanese) and `/en/rss.xml` (English)

## How to write

### Math

Inline uses `$...$`: $e^{i\theta} = \cos\theta + i\sin\theta$

Display uses `$$...$$`:

$$
e^{i\pi} + 1 = 0
$$

Multiple lines use `aligned`:

$$
\begin{aligned}
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \\
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
\end{aligned}
$$

### Images

```md
![Unit circle](./unit-circle.svg "Figure 1. The unit circle")
```

The quoted text becomes the caption.

![Unit circle](./unit-circle.svg "Figure 1. The unit circle")

### Code

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

### Tables

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
| --- | --- | --- |
| $0$ | $1$ | $0$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

### Quotes and footnotes

> Start a line with `>` for a quote.

Write `[^1]` for a footnote, and put its text at the end as `[^1]: ...`[^1].

### Drafts

Add `draft: true` to the frontmatter to keep a post unpublished. It still shows up with `npm run dev`.

[^1]: This is the footnote.
