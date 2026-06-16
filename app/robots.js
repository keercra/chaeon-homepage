export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chae-on.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/admin/login'], // 관리자 및 API 영역은 수집 금지
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
