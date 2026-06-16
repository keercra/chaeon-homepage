export default function About() {
  return (
    <div className="container responsive-container">
      <div className="about-wrapper">
        
        <div className="about-intro-section">
          <div className="about-beforeafter-flex">
            <img 
              src="/images/시공전후1.png" 
              alt="시공 전" 
              className="about-beforeafter-image" 
            />
            <img 
              src="/images/시공전후2.png" 
              alt="시공 후" 
              className="about-beforeafter-image" 
            />
          </div>
          <p className="about-intro-title">
            <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>(주)채온</span>은 다년간의 축적된 노하우와 독자적인 특허 기술을 바탕으로<br className="pc-only" /> 광고물부착방지물을 전문적으로 제작하고 시공하는 기업입니다.
          </p>
        </div>

        <p className="about-description">
          <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>(주)채온</span>은
          우리가 생활하는 환경을 보다 안전하고 깨끗하게 보존하고 아름다운 도시 환경을 조성하기 위해 끊임없는 연구개발을 진행하고 있습니다.
          특히 채온만의 특수 표면 처리 기술과 더불어 독자적인 기술이 적용된 <strong>돌출형 제품</strong> 및 <strong>육각패턴시트</strong>는
          가혹한 외부 환경에서도 뛰어난 내구성과 테이프/스티커에 대한 강력한 효과를 자랑합니다.
        </p>

        {/* 특허 1 */}
        <div className="about-cert-flex">
          <div className="about-cert-img-wrap">
            <img 
              src="/images/실용신안등록증-편집.png" 
              alt="실용신안등록증" 
              className="about-cert-image" 
            />
          </div>
          <div className="about-cert-text">
            <span style={{ color: 'var(--accent-orange)' }}>채온</span>은 타사와는 차별화된 기술력을 보유하고 있습니다.
          </div>
        </div>

        {/* 특허 2 */}
        <div className="about-cert-flex">
          <div className="about-cert-img-wrap">
            <img 
              src="/images/디자인등록증-편집.png" 
              alt="디자인등록증" 
              className="about-cert-image" 
            />
          </div>
          <div className="about-cert-text">
            <span style={{ color: 'var(--accent-orange)' }}>채온</span>은 업계 유일의 <span style={{ color: 'red' }}>육각패턴시트</span>를 보유하고 있습니다.
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
