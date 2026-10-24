import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from './src/plugins/rehype-figure.mjs';

// GitHub Actions sets GITHUB_REPOSITORY ("owner/repo"), so the public URL and
// base path are derived from it. SITE_URL / BASE_PATH override (e.g. custom domain).
const [owner = '', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase();

const site =
  process.env.SITE_URL ?? (owner ? `https://${owner.toLowerCase()}.github.io` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? (repo && !isUserSite ? `/${repo}` : '/');

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeFigure],
      remarkRehype: { footnoteLabel: '脚注', footnoteBackLabel: '本文へ戻る' },
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    },
  },
});
