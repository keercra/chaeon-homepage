import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: '온라인 견적 문의 | (주)채온',
  description: '전주 및 가로등 불법광고물 차단을 위한 부착방지물 시공 견적 의뢰, 단가 상담 등 온라인 간편 문의 양식을 작성해 주시면 신속하게 답변해 드립니다.',
  path: '/contact',
});

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
