import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from './consts';
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
  // Newest first by creation date only, so editing a post or setting `updated` never moves it.
  // The slug breaks ties so the order does not depend on the order files are loaded in.
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || postSlug(a).localeCompare(postSlug(b)),
  );
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

// A bare date in frontmatter is midnight UTC, which is still the same day in the site's time zone.
const ymd = new Intl.DateTimeFormat('en-CA', {
  timeZone: SITE.timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatDate(date: Date): string {
  return ymd.format(date).replaceAll('-', '.');
}

export function postYear(date: Date): number {
  return Number(formatDate(date).slice(0, 4));
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
