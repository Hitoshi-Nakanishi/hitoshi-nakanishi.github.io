---
title: Formatting sample
description: How to write math, images, code, tables and footnotes
date: 2026-10-24
tags: [sample]
draft: true
---

This post has `draft: true`, so it is not published (it only shows up with `npm run dev`).

## Math

Inline math uses `$...$`: $e^{i\theta} = \cos\theta + i\sin\theta$.

Display math uses `$$...$$`:

$$
e^{i\pi} + 1 = 0
$$

Multiple lines:

$$
\begin{aligned}
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \\
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
\end{aligned}
$$

## Images

Put the image in the post's folder and reference it with `./`. The quoted text becomes the caption.

![Unit circle](./unit-circle.svg "Figure 1. The unit circle")

## Code

```python
import cmath
print(abs(cmath.exp(1j * cmath.pi) + 1))
```

## Tables

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
| --- | --- | --- |
| $0$ | $1$ | $0$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

## Quotes and footnotes

> A quote looks like this.

A footnote looks like this[^1].

[^1]: The footnote text.
