---
title: Starting to keep notes here
description: How this site is put together, and how to write posts for it
date: 2026-10-24
tags: [this site]
---

I've started a blog. I plan to write here about things I've been thinking about or looking into.

Since this is the first post, I'm writing down how the site is put together and how posts are written. Half of it is a note to myself.

## Japanese and English

Posts can be written in both Japanese and English. You can switch with "JA / EN" in the top right.

The Japanese and English versions of a post sit in the same folder, and they share images.

```
src/content/posts/starting-notes/
  index.md         Japanese
  index.en.md      English
  unit-circle.svg  image
```

Japanese pages are under `/` and English pages are under `/en/`. If a post has no English version, pressing EN takes you to the English home page. Each post list only shows posts written in that language, so it's fine to write a post in just one of them.

New posts are created with these commands:

```bash
npm run new -- "タイトル" my-slug        # Japanese
npm run new -- "Title" my-slug --en      # English version of the same post
```

## How the site is built

The site is a static site built with [Astro](https://astro.build) and hosted on GitHub Pages. Posts are Markdown files, and pushing to the `main` branch makes GitHub Actions build and publish the site. There is no CMS or database.

Math is rendered with KaTeX when the site is built. Images placed in a post's folder are resized and optimized at build time.

The body text uses Noto Serif JP and EB Garamond, and there's a light and a dark mode. There are no analytics, ads or comments. The RSS feeds are `/rss.xml` for Japanese and `/en/rss.xml` for English.

## Writing posts

### Math

Inline math goes between `$...$`, for example $e^{i\theta} = \cos\theta + i\sin\theta$.

For an equation on its own line, use `$$...$$`.

$$
e^{i\pi} + 1 = 0
$$

Multi-line equations can be aligned with `aligned`.

$$
\begin{aligned}
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \\
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
\end{aligned}
$$

### Images

Write an image like this. The text in quotes becomes the caption.

```md
![Unit circle](./unit-circle.svg "Figure 1. The unit circle")
```

![Unit circle](./unit-circle.svg "Figure 1. The unit circle")

### Code

Wrap code in three backticks and add the language name to get syntax highlighting.

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

Start a line with `>` for a quote.

> This is a quote.

For a footnote, write `[^1]` in the text and put its content at the end of the post as `[^1]: ...`[^1].

### Drafts

Put `draft: true` in the frontmatter and the post won't be published. It still shows up when you run `npm run dev`.

[^1]: Footnotes show up down here.
