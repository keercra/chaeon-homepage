import Link from 'next/link';
import { SITE_NAME, pageMetadata, siteUrl } from '../lib/seo';

export const metadata = pageMetadata({
  title: `광고물부착방지물·부착방지시트·부착방지판 안내 | ${SITE_NAME}`,
  description: `전단지·스티커 등 광고물 부착방지를 위한 ${SITE_NAME}의 제품 안내입니다. 부착방지시트와 돌출형·함체형 광고물부착방지물의 특징, 부착방지판 검토 시 확인할 사항, 시공 전후 사진과 견적 문의를 확인하세요.`,
  path: '/products',
});

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: SITE_NAME, item: siteUrl() },
    { '@type': 'ListItem', position: 2, name: '광고물부착방지물 제품안내', item: siteUrl('/products') },
  ],
};

export default function Products() {
  return (
    <div className="container responsive-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
      <nav className="page-breadcrumb" aria-label="현재 위치">
        <Link href="/">{SITE_NAME}</Link><span aria-hidden="true">/</span><span aria-current="page">광고물부착방지물 제품안내</span>
      </nav>
      <h1 className="section-title product-page-title">광고물부착방지물 · 부착방지시트 <span>제품안내</span></h1>
      <p className="page-intro">
        광고물부착방지물은 전주, 가로등, 신호등 지주와 같은 시설물에 불법 전단지나 스티커,
        테이프가 붙는 것을 방지하는 제품입니다. 채온은 돌출형 제품과 육각패턴 부착방지시트,
        박스형 시설물을 위한 함체형 제품을 제작하고 시공합니다.
      </p>

      <nav className="product-section-links" aria-label="제품과 시공 안내 바로가기">
        <a href="#embossing">돌출형</a><a href="#sheet">부착방지시트</a><a href="#board-guide">부착방지판 선택 안내</a><a href="#box">함체형</a><a href="#installation">시공 전후</a><a href="#quotation">견적 안내</a>
      </nav>

      <section className="product-selection" aria-labelledby="selection-title">
        <h2 id="selection-title">시설물에 맞는 광고물부착방지물 선택</h2>
        <p>시설물의 형태와 설치 환경에 따라 적용 제품이 달라집니다. 기둥형 시설물과 박스형 시설물에 사용하는 제품을 비교해 보세요.</p>
        <div className="product-comparison-wrap" role="region" aria-label="제품 비교표" tabIndex={0}>
          <table className="product-comparison">
            <caption>시설물 형태에 따른 광고물부착방지 제품 비교</caption>
            <thead><tr><th scope="col">제품</th><th scope="col">적용 시설물</th><th scope="col">표면과 형태</th></tr></thead>
            <tbody>
              <tr><th scope="row"><a href="#embossing">돌출형</a></th><td>전주, 가로등, 신호등 지주 등 기둥형 시설물</td><td>표면에 형성된 미세한 육각형 돌기</td></tr>
              <tr><th scope="row"><a href="#sheet">부착방지시트</a></th><td>전주, 가로등, 신호등 지주 등 기둥형 시설물</td><td>육각패턴과 특수 표면 처리를 적용한 시트</td></tr>
              <tr><th scope="row"><a href="#box">함체형</a></th><td>개폐기, 변압기, 가압장 등 박스형·평면·곡면 시설물</td><td>시설물 표면에 맞춰 디자인을 적용하는 형태</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="product-details-list">
        
        {/* 01. 돌출형 */}
        <div id="embossing" className="product-detail-card bg-light">
          <h2 className="product-detail-title">01. 광고물부착방지물(돌출형)</h2>
          <div className="product-detail-flex">
            <img 
              src="/images/Product_Surface_Embossing.jpg" 
              alt="광고물부착방지물 돌출형 제품 표면의 육각형 돌기"
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
              alt="육각패턴 부착방지시트의 표면"
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
              alt="박스형 시설물에 디자인을 적용한 함체형 광고물부착방지물"
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

      <section id="board-guide" className="product-terminology" aria-labelledby="board-guide-title">
        <h2 id="board-guide-title">부착방지시트·부착방지판, 무엇을 확인해야 하나요?</h2>
        <p>
          전단지·벽보·스티커 등 광고물의 부착방지 제품을 찾고 계신가요?
          제품 이름과 함께 설치할 시설물의 형태, 표면 상태, 필요한 규격을 확인하면
          현장에 맞는 제품을 비교하기 쉽습니다.
        </p>
        <h3>부착방지시트: 표면 특징과 적용 시설물 확인</h3>
        <p>
          채온의 <a href="#sheet">육각패턴 부착방지시트</a>는 전주·가로등·신호등 지주 등
          기둥형 시설물에 적용하는 시트형 제품입니다. 육각패턴과 특수 표면 처리가 특징이며,
          설치할 구간의 크기와 기존 표면 상태를 확인해 시공을 상담합니다.
        </p>
        <h3>부착방지판: 필요한 형태와 규격 확인</h3>
        <p>
          부착방지판을 검토하고 있다면 단단한 판 형태가 필요한지, 기둥 외부를 감싸는 형태가
          필요한지 먼저 확인해 주세요. 판의 재질·두께·고정 방식 등 요구 규격을 알려주시면
          채온의 <a href="#embossing">돌출형 광고물부착방지물</a> 또는{' '}
          <a href="#box">함체형 제품</a>으로 적용 가능한지 상담합니다.
          시트형과 판형은 명칭만으로 같은 제품이라고 판단하기 어려우므로 요구 규격과 제품 사양을 함께 비교해야 합니다.
        </p>
        <h3>광고물 부착방지: 부착물과 현장 조건 확인</h3>
        <p>
          시설물에 반복해서 붙는 광고물이 종이 전단지인지, 접착식 스티커인지,
          테이프로 고정하는 부착물인지 확인해 주세요. 시설물 종류와 기존 부착물 상태,
          시공 범위를 함께 알려주시면 제품 선택과 시공 범위를 상담하는 데 도움이 됩니다.
        </p>
        <Link className="product-inline-link" href="/contact">시설물에 맞는 부착방지 제품 상담 →</Link>
      </section>

      <section id="installation" className="product-evidence" aria-labelledby="installation-title">
        <h2 id="installation-title">광고물부착방지물 시공 전후</h2>
        <p>기존 부착물이 남아 있는 시설물과 제품 적용 후의 외관을 비교해 보세요. 아래 사진은 채온 홈페이지에서 소개하고 있는 시공 전후 자료입니다.</p>
        <div className="installation-grid">
          <figure>
            <a href="/images/시공전후1.png" target="_blank" rel="noopener noreferrer" aria-label="첫 번째 시공 전후 사진 크게 보기">
              <img src="/images/시공전후1.png" width="878" height="752" loading="lazy" decoding="async" alt="기존 부착물이 남은 전주와 광고물부착방지물 적용 후 모습을 나란히 비교한 사진" />
            </a>
            <figcaption>기둥형 시설물의 시공 전후 비교 · <a href="/images/시공전후1.png" target="_blank" rel="noopener noreferrer">사진 크게 보기</a></figcaption>
          </figure>
          <figure>
            <a href="/images/시공전후2.png" target="_blank" rel="noopener noreferrer" aria-label="두 번째 시공 전후 사진 크게 보기">
              <img src="/images/시공전후2.png" width="878" height="752" loading="lazy" decoding="async" alt="전주 표면의 기존 전단지와 부착방지 제품 시공 후 외관을 비교한 사진" />
            </a>
            <figcaption>제품 적용 구간과 외관의 변화 · <a href="/images/시공전후2.png" target="_blank" rel="noopener noreferrer">사진 크게 보기</a></figcaption>
          </figure>
        </div>
        <Link className="product-inline-link" href="/portfolio">광고물부착방지물 시공사례 더 보기 →</Link>
      </section>

      <section id="quotation" className="product-quotation" aria-labelledby="quotation-title">
        <h2 id="quotation-title">제품 단가와 시공 견적 문의</h2>
        <p>적용 제품과 현장 조건을 확인할 수 있도록, 아래 내용을 온라인 문의에 함께 남겨주세요.</p>
        <dl className="quotation-grid">
          <div><dt>시설물 종류</dt><dd>전주·가로등·신호등 지주·개폐기·변압기 등 시공 대상</dd></div>
          <div><dt>크기와 수량</dt><dd>확인 가능한 시설물 규격과 시공을 원하는 수량</dd></div>
          <div><dt>시공 위치</dt><dd>현장이 있는 지역과 설치 환경</dd></div>
          <div><dt>희망 제품</dt><dd>돌출형·부착방지시트·함체형 중 검토하는 제품. 미정이면 상담 시 안내합니다.</dd></div>
        </dl>
        <Link className="product-contact-button" href="/contact">광고물부착방지물 견적 문의 →</Link>
      </section>

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
