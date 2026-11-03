import { SITE_NAME, pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: `회사소개 - 광고물부착방지 전문 기업 ${SITE_NAME}`,
  description: `다년간의 노하우와 특허를 보유한 광고물부착방지물 제작/시공 전문 기업 ${SITE_NAME}의 소개, 오시는 길 및 연락처를 안내합니다.`,
  path: '/about',
});

export default function About() {
  return (
    <div className="container responsive-container">
      <h1 className="section-title">광고물부착방지 전문 기업 <span>채온 소개</span></h1>
      <div className="about-wrapper">
        
        <div className="about-intro-section">
          <div className="about-beforeafter-flex">
            <img 
              src="/images/시공전후1.png" 
              alt="가로등 전신주 광고물부착방지물 시공 전 불법 전단지 부착 상태" 
              className="about-beforeafter-image" 
            />
            <img 
              src="/images/시공전후2.png" 
              alt="(주)채온 광고물부착방지물 시공 후 깨끗해진 전신주 모습" 
              className="about-beforeafter-image" 
            />
          </div>
          <p className="about-intro-title">
            <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>{SITE_NAME}</span>은 다년간의 축적된 노하우와 독자적인 특허 기술을 바탕으로<br className="pc-only" /> 광고물부착방지물을 전문적으로 제작하고 시공하는 기업입니다.
          </p>
        </div>

        <p className="about-description">
          <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>(주)채온</span>은
          우리가 생활하는 환경을 보다 안전하고 깨끗하게 보존하고 아름다운 도시 환경을 조성하기 위해 끊임없는 연구개발을 진행하고 있습니다.
          특히 채온만의 특수 표면 처리 기술과 더불어 독자적인 기술이 적용된 <strong>돌출형 제품</strong> 및 <strong>육각패턴시트</strong>는
          가혹한 외부 환경에서도 뛰어난 내구성과 테이프/스티커에 대한 강력한 효과를 자랑합니다.
        </p>

        <h2 id="product-registrations" className="registration-heading">제품 관련 공개 등록자료</h2>
        <p className="registration-intro">아래 명칭·번호·등록일은 채온 홈페이지에 공개한 등록증에 기재된 정보입니다.</p>

        {/* 실용신안 등록자료 */}
        <div id="utility-model" className="about-cert-flex registration-record">
          <div className="about-cert-img-wrap">
            <img 
              src="/images/실용신안등록증-편집.png" 
              alt="광고물 부착 방지용 시트 실용신안등록증, 제20-0495941호"
              className="about-cert-image" 
            />
          </div>
          <div className="about-cert-text">
            <h3>실용신안등록 제20-0495941호</h3>
            <p>고안의 명칭: 광고물 부착 방지용 시트</p>
            <p>등록일: 2022년 9월 22일</p>
            <a href="/images/실용신안등록증-편집.png" target="_blank" rel="noopener noreferrer">공개 실용신안등록증 원본 보기 →</a>
          </div>
        </div>

        {/* 디자인 등록자료 */}
        <div id="sheet-design" className="about-cert-flex registration-record">
          <div className="about-cert-img-wrap">
            <img 
              src="/images/디자인등록증-편집.png" 
              alt="전주용 광고물부착방지시트 디자인등록증, 제30-1155643호"
              className="about-cert-image" 
            />
          </div>
          <div className="about-cert-text">
            <h3>디자인등록 제30-1155643호</h3>
            <p>디자인의 대상이 되는 물품: 전주용 광고물부착방지시트</p>
            <p>등록일: 2022년 3월 15일</p>
            <a href="/images/디자인등록증-편집.png" target="_blank" rel="noopener noreferrer">공개 디자인등록증 원본 보기 →</a>
          </div>
        </div>

        {/* 오시는 길 */}
        <div className="about-location-card">
          <h3 className="location-title">오시는 길 & 연락처</h3>
          <ul className="location-info-list">
            <li><strong>📍 주소:</strong> 경기도 양평군 강상면 학곡길 82</li>
            <li><strong>📞 대표전화:</strong> <a href="tel:02-851-1502">02-851-1502</a></li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
