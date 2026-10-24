import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getPosts, postUrl, url } from '../utils';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: postUrl(post),
    })),
  });
}
