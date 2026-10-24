// Usage: npm run new -- "記事のタイトル" [slug] [--en]
// Creates src/content/posts/<slug>/index.md (Japanese) or index.en.md (English, with --en).
// Without a slug, today's date is used. Giving the slug of an existing post adds the
// other language's version to the same folder.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const en = args.includes('--en');
const [title = en ? 'Untitled note' : '無題のメモ', slugArg] = args.filter((a) => !a.startsWith('--'));

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const offset = -now.getTimezoneOffset();
const zone = `${offset >= 0 ? '+' : '-'}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;
const created = `${today}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${zone}`;

const baseSlug =
  (slugArg ?? today)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '') || today;

const fileName = en ? 'index.en.md' : 'index.md';
let slug = baseSlug;
for (let i = 2; existsSync(join('src/content/posts', slug, fileName)); i++) slug = `${baseSlug}-${i}`;

const dir = join('src/content/posts', slug);
mkdirSync(dir, { recursive: true });

const file = join(dir, fileName);
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ""
date: ${created}
tags: [${en ? 'notes' : 'メモ'}]
draft: false
---

${en ? 'Write here.' : 'ここに本文を書きます。'}
`,
);

console.log(`Created ${file}`);
