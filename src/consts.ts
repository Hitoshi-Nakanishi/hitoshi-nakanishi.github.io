// サイト全体の設定。紹介文などの言語ごとの文言は src/i18n.ts にあります。
export const SITE = {
  title: 'Hitoshi Nakanishi',
  author: 'Hitoshi Nakanishi',
  since: 2026,
  github: 'https://github.com/Hitoshi-Nakanishi',
  // 記事の日付はこのタイムゾーンの暦日で表示します。
  timeZone: 'Asia/Tokyo',
};

export const NAV = [
  { href: '/', label: 'Journal' },
  { href: '/archive/', label: 'Archive' },
  { href: '/tags/', label: 'Tags' },
  { href: '/about/', label: 'About' },
];
