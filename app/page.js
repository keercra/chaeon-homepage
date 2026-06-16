import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>깨끗한 거리, <br />안전한 환경을 만듭니다</h1>
          <p>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>(주)채온</span>은 불법광고물부착방지를 위한 최적의 솔루션을 제공합니다.<br />
            <span style={{ color: 'yellow', fontWeight: 'bold' }}>업계 유일</span>의 <span style={{ color: 'yellow', fontWeight: 'bold' }}>육각형 돌기가 적용된 돌출형 제품</span>과 <span style={{ color: 'yellow', fontWeight: 'bold' }}>육각패턴이 적용된 시트형 제품</span>까지 완벽한 방지 기술을 만나보세요.
          </p>
        </div>
      </section>

      <section className="products-preview container">
        <h2 className="section-title">주요 제품 <span>안내</span></h2>
        <div className="product-grid">
          <Link href="/products" className="product-card">
            <h3>광고물부착방지물(돌출형)</h3>
            <img src="/images/Product_Surface_Embossing.jpg" alt="돌출형 표면" style={{ width: '100%', borderRadius: '12px', marginTop: '1rem' }} />
            <p>한전 전주 및 가로등, 신호등 등의 시설물 외부를 감싸 불법광고물의 부착을 원천적으로 차단하는 입체형 제품입니다.</p>
          </Link>
          <Link href="/products" className="product-card">
            <h3>광고물부착방지물(시트형)</h3>
            <img src="/images/Product_Surface_pattern_seat.jpg" alt="시트형 표면" style={{ width: '100%', borderRadius: '12px', marginTop: '1rem' }} />
            <p>기존 FLEX 시트의 단점을 보완한 육각패턴시트입니다.
              특수 표면 처리된 시트를 사용하여 스티커나 테이프 등이 쉽게 떨어지도록 설계된 제품입니다.</p>
          </Link>
          <Link href="/products" className="product-card">
            <h3>광고물부착방지물(함체형)</h3>
            <img src="/images/함체형.jpg" alt="함체형 시공사진" style={{ width: '100%', borderRadius: '12px', marginTop: '1rem' }} />
            <p>한전 개폐기/변압기, 수자원공사 가압장 등 박스형, 평면 및 곡면 시설물에 시공 가능한 제품입니다.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
