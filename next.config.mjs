/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. 제품 상세 및 레거시 제품 링크 우회
      {
        source: '/Product_patternseat',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/Product_embossing',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/Product_box',
        destination: '/products',
        permanent: true,
      },
      // 2. 회사 소개 레거시 링크 우회
      {
        source: '/Company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      // 3. 문의하기 레거시 링크 우회
      {
        source: '/Contact',
        destination: '/contact',
        permanent: true,
      },
      // 4. 시공사례 레거시 링크 우회
      {
        source: '/Portfolio',
        destination: '/portfolio',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
