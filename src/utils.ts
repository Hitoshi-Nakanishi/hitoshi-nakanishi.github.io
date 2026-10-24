import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function postUrl(post: Post): string {
  return url(`/posts/${post.id}/`);
}

export function tagUrl(tag: string): string {
  return url(`/tags/${tag}/`);
}

// Dates in frontmatter are calendar dates, so format in UTC to avoid shifting a day.
export function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function readingMinutes(body = ''): number {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\s+/g, '');
  return Math.max(1, Math.round(text.length / 500));
}

export function toRoman(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [value, numeral] of table) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}
