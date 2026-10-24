import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANG, LANGS, otherLang, type Lang } from './i18n';

export type Post = CollectionEntry<'posts'>;

const isVisible = (post: Post) => import.meta.env.DEV || !post.data.draft;

export function postLang(post: Post): Lang {
  return post.id.split('/')[0] as Lang;
}

export function postSlug(post: Post): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('posts', (post) => isVisible(post) && postLang(post) === lang);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostPaths(lang: Lang) {
  const posts = await getPosts(lang);
  const others = await getPosts(otherLang(lang));
  return posts.map((post, i) => ({
    params: { slug: postSlug(post) },
    props: {
      post,
      newer: posts[i - 1],
      older: posts[i + 1],
      translation: others.find((other) => postSlug(other) === postSlug(post)),
    },
  }));
}

export async function getTagPaths(lang: Lang) {
  const posts = await getPosts(lang);
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
  return tags.map((tag) => ({
    params: { tag: tagSlug(tag) },
    props: { tag, posts: posts.filter((post) => post.data.tags.includes(tag)) },
  }));
}

export function url(path = '/', lang: Lang = DEFAULT_LANG): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return `${base}${prefix}/${path.replace(/^\//, '')}`;
}

// The current page's path without the base path and language prefix, e.g. "/archive/".
export function pagePath(pathname: string): { lang: Lang; path: string } {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  const first = rest.split('/')[1];
  if (first !== DEFAULT_LANG && (LANGS as readonly string[]).includes(first)) {
    return { lang: first as Lang, path: rest.slice(first.length + 1) || '/' };
  }
  return { lang: DEFAULT_LANG, path: rest };
}

export function postUrl(post: Post): string {
  return url(`/posts/${postSlug(post)}/`, postLang(post));
}

function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function tagUrl(tag: string, lang: Lang): string {
  return url(`/tags/${tagSlug(tag)}/`, lang);
}

// Dates in frontmatter are calendar dates, so format in UTC to avoid shifting a day.
export function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function readingMinutes(body = '', lang: Lang): number {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const minutes =
    lang === 'ja' ? text.replace(/\s+/g, '').length / 500 : text.split(/\s+/).filter(Boolean).length / 220;
  return Math.max(1, Math.round(minutes));
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
