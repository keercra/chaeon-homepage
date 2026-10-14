import { siteUrl } from './lib/seo';

export default function sitemap() {
  // 공개 페이지만 포함합니다. 정확한 수정일을 관리하지 않아 lastModified는 생략합니다.
  return ['/', '/about', '/products', '/portfolio', '/contact'].map((route) => ({
    url: siteUrl(route),
  }));
}
