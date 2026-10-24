import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { DEFAULT_LANG, LANGS } from './i18n';

// "<slug>/index.md" is Japanese, "<slug>/index.en.md" is English. The id becomes "<lang>/<slug>".
function generateId({ entry }: { entry: string }): string {
  let path = entry.replace(/\\/g, '/').replace(/\.md$/, '');
  let lang: string = DEFAULT_LANG;
  const suffix = path.match(/\.([a-z]{2})$/);
  if (suffix && (LANGS as readonly string[]).includes(suffix[1])) {
    lang = suffix[1];
    path = path.slice(0, -suffix[0].length);
  }
  return `${lang}/${path.replace(/\/index$/, '')}`;
}

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts', generateId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
