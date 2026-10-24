import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from './consts';
import { ui, type Lang } from './i18n';
import { getPosts, postUrl, url } from './utils';

export async function feed(context: APIContext, lang: Lang) {
  const posts = await getPosts(lang);
  return rss({
    title: SITE.title,
    description: ui[lang].description,
    site: new URL(url('/', lang), context.site).href,
    customData: `<language>${lang}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: postUrl(post),
    })),
  });
}
