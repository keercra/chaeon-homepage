/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 기존 아임웹 사이트의 옛날 제품 주소를 신규 제품안내 페이지로 301 영구 이동 (SEO 점수 보존)
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
