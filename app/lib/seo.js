// 운영 도메인의 기존 리다이렉트와 일치시키세요.
// 배포 주소나 오래된 NEXT_PUBLIC_SITE_URL 값이 검색용 주소를 바꾸지 않도록 고정합니다.
export const SITE_URL = 'https://www.chae-on.com';
export const SITE_NAME = '주식회사 채온';
export const SITE_ALTERNATE_NAMES = ['채온', '(주)채온', 'CHAE-ON'];

export function siteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: siteUrl(path) },
    openGraph: {
      title,
      description,
      url: siteUrl(path),
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'website',
      images: [{ url: siteUrl('/images/함체형.jpg'), alt: '채온 함체형 광고물부착방지물 시공사진' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteUrl('/images/함체형.jpg')],
    },
  };
}

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': siteUrl('/#organization'),
  name: SITE_NAME,
  legalName: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAMES,
  url: siteUrl(),
  logo: siteUrl('/images/logo.png'),
  description: '광고물부착방지물과 육각패턴 부착방지시트를 제작하고 시공하는 기업입니다.',
  telephone: '+82-2-851-1502',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '강상면 학곡길 82',
    addressLocality: '양평군',
    addressRegion: '경기도',
    addressCountry: 'KR',
  },
};

// 검색 결과의 사이트 이름은 홈페이지의 WebSite 데이터로 전달합니다.
export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': siteUrl('/#website'),
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAMES,
  url: siteUrl(),
  inLanguage: 'ko-KR',
  publisher: { '@id': organization['@id'] },
};
