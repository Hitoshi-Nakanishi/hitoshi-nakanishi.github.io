---
title: Euler’s Identity and the Unit Circle
description: A look at the most beautiful equation, doubling as a sample of how to write math and figures here.
date: 2026-10-20
tags: [math, notes]
---

**Euler’s formula** ties the exponential function to the trigonometric ones. Inline, it reads $e^{i\theta} = \cos\theta + i\sin\theta$.

Set $\theta = \pi$ and the famous identity appears:

$$
e^{i\pi} + 1 = 0
$$

Euler’s number $e$, the imaginary unit $i$, $\pi$, and then $0$ and $1$ — five constants on a single line.

## Seeing it on the unit circle

On the complex plane, $e^{i\theta}$ is the point reached by turning $\theta$ radians around the circle of radius $1$.

![The point e to the i theta on the unit circle](./unit-circle.svg "Figure 1. The point reached by turning θ around the unit circle. Its horizontal part is cos θ and its vertical part is sin θ.")

As $\theta$ goes from $0$ to $\pi$, the point starts at $1$, travels half way round, and lands exactly on $-1$. Hence $e^{i\pi} = -1$.

## From the Taylor series

To check it algebraically, line up the series:

$$
\begin{aligned}
e^{x} &= \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots \\[4pt]
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \\[4pt]
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
\end{aligned}
$$

Substitute $x = i\theta$, use $i^2 = -1$, and split into real and imaginary parts: the formula falls out[^1].

## Checking numerically

```python
import cmath

z = cmath.exp(1j * cmath.pi) + 1
print(abs(z))  # 1.2246467991473532e-16 — only floating-point error remains
```

| $\theta$ | $\cos\theta$ | $\sin\theta$ | $e^{i\theta}$ |
| --- | --- | --- | --- |
| $0$ | $1$ | $0$ | $1$ |
| $\pi/2$ | $0$ | $1$ | $i$ |
| $\pi$ | $-1$ | $0$ | $-1$ |

> A mathematician is a machine for turning coffee into theorems.
>
> — attributed to Alfréd Rényi

[^1]: Strictly, rearranging the terms is allowed because the series converge absolutely.
