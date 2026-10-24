// Usage: npm run new -- "記事のタイトル" [slug]
// Creates src/content/posts/<slug>/index.md. Without a slug, today's date is used.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [title = '無題のメモ', slugArg] = process.argv.slice(2);

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

const baseSlug = (slugArg ?? today)
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, '-')
  .replace(/^-+|-+$/g, '') || today;

let slug = baseSlug;
for (let i = 2; existsSync(join('src/content/posts', slug)); i++) slug = `${baseSlug}-${i}`;

const dir = join('src/content/posts', slug);
mkdirSync(dir, { recursive: true });

const file = join(dir, 'index.md');
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ""
date: ${today}
tags: [メモ]
draft: false
---

ここに本文を書きます。
`,
);

console.log(`Created ${file}`);
