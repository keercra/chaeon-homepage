import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: '광고물부착방지물·부착방지시트 시공사례 | (주)채온',
  description: '깨끗해진 도심 환경! (주)채온의 광고물부착방지물 및 시트형 방지 제품의 전국 주요 시공 현장 사진 및 인스타그램 소식을 확인하세요.',
  path: '/portfolio',
});

export default function PortfolioLayout({ children }) {
  return <>{children}</>;
}
