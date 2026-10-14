import Link from 'next/link';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: '광고물부착방지물·부착방지시트 제품안내 | (주)채온',
  description: '전주·가로등용 돌출형 광고물부착방지물, 육각패턴 부착방지시트, 개폐기·변압기용 함체형 제품을 비교하세요. 적용 시설물, 표면 특징 및 시공 견적을 안내합니다.',
  path: '/products',
});

export default function Products() {
  return (
    <div className="container responsive-container">
      <h1 className="section-title">광고물부착방지물·부착방지시트 <span>제품안내</span></h1>
      <p className="page-intro">
        광고물부착방지물은 전주, 가로등, 신호등 지주와 같은 시설물에 불법 전단지나 스티커,
        테이프가 붙는 것을 방지하는 제품입니다. 채온은 돌출형 제품과 육각패턴 부착방지시트,
        박스형 시설물을 위한 함체형 제품을 제작하고 시공합니다.
      </p>

      <div className="product-details-list">
        
        {/* 01. 돌출형 */}
        <div id="embossing" className="product-detail-card bg-light">
          <h2 className="product-detail-title">01. 광고물부착방지물(돌출형)</h2>
          <div className="product-detail-flex">
            <img 
              src="/images/Product_Surface_Embossing.jpg" 
              alt="돌출형 표면" 
              className="product-detail-image" 
            />
            <p className="product-detail-text">
              ● 전주 및 가로등, 신호등 지주 등 기둥형 구조물에 적합한 제품입니다. <br />
              ● 육각형의 미세한 돌기가 표면에 형성되어 있어 불법 전단지, 스티커, 테이프 등이 부착되지 않도록 합니다.<br />
              ● 특수 표면 처리 기법을 적용하여 오염 및 탈색에 강하고, 반영구적으로 사용할 수 있습니다.<br /><br />
              <strong>특징:</strong> 돌출형, 외부 충격에 강함, 반영구적 수명
            </p>
          </div>
        </div>

        {/* 02. 시트형 */}
        <div id="sheet" className="product-detail-card border-card">
          <h2 className="product-detail-title">02. 부착방지시트(육각패턴시트)</h2>
          <div className="product-detail-flex">
            <img 
              src="/images/Product_Surface_pattern_seat.jpg" 
              alt="시트형 표면" 
              className="product-detail-image" 
            />
            <p className="product-detail-text">
              ● 전주 및 가로등, 신호등 지주 등 기둥형 구조물에 적합한 제품입니다. <br />
              ● 기존 FLEX 시트의 최대 단점이었던 얇은 두께로 인한 내구성을 보완한 육각패턴시트입니다.<br />
              ● 육각형 모양의 패턴을 적용하여 시트의 표면을 입체적으로 디자인하여 심미성을 더함과 동시에 스크래치 등에 강하도록 설계하였습니다.<br />
              ● 특수 표면 처리 기법을 적용하여 스티커, 테이프 등이 붙지 않고 오염 및 탈색에 강합니다.<br /><br />
              <strong>특징:</strong> 시트형, 육각모양패턴
            </p>
          </div>
        </div>

        {/* 03. 함체형 */}
        <div id="box" className="product-detail-card bg-light">
          <h2 className="product-detail-title">03. 광고물부착방지물(함체형)</h2>
          <div className="product-detail-flex">
            <img 
              src="/images/함체형.jpg" 
              alt="함체형" 
              className="product-detail-image" 
            />
            <p className="product-detail-text">
              ● 한전 개폐기/변압기 및 수자원공사 가압장 등 박스형, 평면 및 곡면 시설물에 시공 가능한 제품입니다. <br />
              ● 삭막하거나 자칫 흉물이 될 수 있는 박스형 지상기기에 아름다운 디자인을 더하여 도시 미관을 해치지 않으면서도 불법광고물 부착을 원천적으로 차단합니다.<br /><br />
              <strong>특징:</strong> 함체형, 육각모양패턴, 지자체 및 도심 환경 맞춤형 커스텀 디자인
            </p>
          </div>
        </div>
        
      </div>

      <section className="product-questions" aria-labelledby="product-questions-title">
        <h2 id="product-questions-title" className="product-detail-title">제품 선택과 시공 문의</h2>
        <h3>돌출형 광고물부착방지물과 부착방지시트는 어떻게 다른가요?</h3>
        <p>
          돌출형 제품은 표면의 미세한 육각형 돌기를 이용하고, 부착방지시트는 육각패턴과
          특수 표면 처리를 적용한 시트형 제품입니다. 두 제품 모두 전주·가로등·신호등 지주 등
          기둥형 시설물에 사용하며, 시설물의 형태와 시공 조건에 맞춰 선택합니다.
        </p>
        <h3>개폐기나 변압기에도 시공할 수 있나요?</h3>
        <p>
          박스형 시설물에는 함체형 광고물부착방지물을 적용할 수 있습니다.
          개폐기·변압기와 가압장 등 평면이나 곡면이 있는 시설물의 조건을 확인해 상담합니다.
        </p>
        <h3>제품 단가와 시공 견적은 어떻게 문의하나요?</h3>
        <p>
          시설물 종류, 크기, 수량과 시공 위치를 <Link href="/contact">온라인 견적 문의</Link>로
          알려주세요. 적용 제품과 현장 조건을 확인한 후 안내해 드립니다.
          실제 적용 모습은 <Link href="/portfolio">광고물부착방지물 시공사례</Link>에서 확인할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
