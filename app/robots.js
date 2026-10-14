import { siteUrl } from './lib/seo';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // 관리자 및 API 영역은 수집 금지
    },
    sitemap: siteUrl('/sitemap.xml'),
  };
}
