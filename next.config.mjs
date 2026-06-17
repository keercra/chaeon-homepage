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
    ];
  },
};

export default nextConfig;
