---
title: Opening the Notebook
description: How this blog works, and what I want to do with it.
date: 2026-10-24
tags: [notes, this blog]
cover: ./cover.svg
coverAlt: Illustration of a pen on a ruled notebook page
---

Write down what I think, when I think it. That is what this notebook is for.

Nothing here needs to be a finished essay. A few lines are fine, and they can grow later. What matters is getting the thought out of my head.

## How to write

Every post is a Markdown file. To start a new English post:

```bash
npm run new -- "Post title" my-slug --en
```

This creates `src/content/posts/my-slug/index.en.md`. The Japanese version of the same post lives next to it as `index.md`, and the two share any images in the folder.

Images are referenced relative to the post:

```md
![Alt text](./photo.jpg "This text becomes the caption")
```

Math uses `$...$` inline and `$$...$$` for display, like $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$.

---

First, keep going.
