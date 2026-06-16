import Link from 'next/link';
import Header from './components/Header';
import './globals.css';

export const metadata = {
  title: '(주)채온 - 광고물부착방지물(돌출형, 시트형) 전문 기업',
  description: '경기도 양평군에 위치한 광고물부착방지물(육각패턴시트, 돌출형, 시트형) 등 제품 시공 및 제작 전문 기업 채온 홈페이지입니다.',
  keywords: '채온, 광고물부착방지, 전봇대광고방지, 돌출형방지물, 시트형방지물, 불법광고물, 양평군, 시공사례',
  openGraph: {
    title: '(주)채온 - 광고물부착방지물 전문 기업',
    description: '채온의 특별한 기술력으로 깨끗한 거리를 만듭니다.',
    url: 'https://chae-on.com',
    siteName: '채온',
    images: [],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* 검색엔진 소유권 인증 메타태그 (Vercel 환경변수 연동) */}
        {process.env.NEXT_PUBLIC_NAVER_VERIFICATION && (
          <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}

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
