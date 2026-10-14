import Header from './components/Header';
import { SITE_URL, organization } from './lib/seo';
import './globals.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: '(주)채온 | 광고물부착방지물·부착방지시트 제작 및 시공',
  description: '광고물부착방지물과 육각패턴 부착방지시트 전문 기업 채온입니다. 돌출형·시트형·함체형 제품, 시공사례와 견적 문의를 안내합니다.',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_NAVER_VERIFICATION
      ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
        />

        {/* 무단 우클릭 및 드래그 복사 방지 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', (e) => e.preventDefault());
              document.addEventListener('selectstart', (e) => e.preventDefault());
              document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
                  e.preventDefault();
                }
              });
            `
          }}
        />
      </head>
      <body>
        <Header />

        <main className="content-wrap">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container footer-container">
            <div className="footer-info">
              <h3>(주)채온</h3>
              <p>본사: 경기도 양평군 강상면 학곡길 82</p>
              <p>대표전화: <a href="tel:02-851-1502">02-851-1502</a></p>
            </div>
            <div className="footer-copy">
              <p>Copyright © {new Date().getFullYear()} CHAE-ON. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
