import { siteUrl } from '../lib/seo';
import { pageImages } from '../lib/site-images';
import { listPortfolioImages } from '../lib/portfolio-images';

export const dynamic = 'force-dynamic';

function escapeXml(value) {
  return value.replace(/[<>&"']/g, character => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]);
}

export async function GET() {
  const portfolioImages = await listPortfolioImages();
  const routes = ['/', '/about', '/products', '/portfolio', '/contact'];
  const entries = routes.map(route => {
    const images = route === '/portfolio' ? portfolioImages : (pageImages[route] || []);
    const imageTags = images.map(image =>
      `<image:image><image:loc>${escapeXml(siteUrl(image))}</image:loc></image:image>`
    ).join('');
    return `<url><loc>${escapeXml(siteUrl(route))}</loc>${imageTags}</url>`;
  });
  // Next.js 14의 기본 sitemap 생성기는 이미지 확장을 지원하지 않아 XML을 직접 응답합니다.
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
