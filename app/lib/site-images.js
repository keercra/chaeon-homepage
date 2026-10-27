// 페이지에 실제로 표시하는 기존 이미지 주소를 그대로 사용합니다.
export const sheetImage = {
  url: '/images/Product_Surface_pattern_seat.jpg',
  alt: '육각패턴 부착방지시트의 표면',
};

export const pageImages = {
  '/': [
    '/images/Product_Surface_Embossing.jpg',
    sheetImage.url,
    '/images/함체형.jpg',
  ],
  '/about': ['/images/시공전후1.png', '/images/시공전후2.png'],
  '/products': [
    '/images/Product_Surface_Embossing.jpg',
    sheetImage.url,
    '/images/함체형.jpg',
    '/images/시공전후1.png',
    '/images/시공전후2.png',
  ],
};
