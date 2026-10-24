export const LANGS = ['ja', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'ja';

export const LANG_SHORT: Record<Lang, string> = { ja: 'JA', en: 'EN' };

export const ui = {
  ja: {
    description: 'Hitoshi Nakanishi のブログ',
    skip: '本文へ移動',
    mainNav: 'メイン',
    themeToggle: 'ライト／ダーク切り替え',
    langSwitch: '言語',
    empty: 'まだ記事はありません。',
    minutes: (n: number) => `${n} 分で読めます`,
    updated: '更新',
    postNav: '前後の記事',
    older: '← 前の記事',
    newer: '次の記事 →',
    readIn: '日本語で読む',
    archiveTitle: 'すべての記事',
    archiveDesc: 'すべての記事の一覧',
    count: (n: number) => `${n} 本の記事`,
    tagsTitle: 'タグ',
    tagsDesc: 'タグの一覧',
    tagDesc: (tag: string) => `「${tag}」タグの記事`,
  },
  en: {
    description: 'Blog by Hitoshi Nakanishi',
    skip: 'Skip to content',
    mainNav: 'Main',
    themeToggle: 'Toggle light / dark',
    langSwitch: 'Language',
    empty: 'No posts yet.',
    minutes: (n: number) => `${n} min read`,
    updated: 'updated',
    postNav: 'More posts',
    older: '← Older',
    newer: 'Newer →',
    readIn: 'Read in English',
    archiveTitle: 'All posts',
    archiveDesc: 'Every post, by year',
    count: (n: number) => `${n} ${n === 1 ? 'post' : 'posts'}`,
    tagsTitle: 'Tags',
    tagsDesc: 'All tags',
    tagDesc: (tag: string) => `Posts tagged “${tag}”`,
  },
} satisfies Record<Lang, Record<string, unknown>>;

export function otherLang(lang: Lang): Lang {
  return lang === 'ja' ? 'en' : 'ja';
}
