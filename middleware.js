import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 레거시 대소문자 구분 주소 리다이렉트 처리 (무한루프 방지)
  if (pathname === '/Portfolio') {
    return NextResponse.redirect(new URL('/portfolio', request.url), 301);
  }
  if (pathname === '/Contact') {
    return NextResponse.redirect(new URL('/contact', request.url), 301);
  }
  if (pathname === '/Company' || pathname === '/company') {
    return NextResponse.redirect(new URL('/about', request.url), 301);
  }

  // 로그인 페이지 및 로그인 API는 검증 제외
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // 관리자 페이지 또는 관리자 API에 접근하는 경우
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/upload') || pathname.startsWith('/api/contact');

  if (isAdminPage || isAdminApi) {
    // /api/contact 의 POST 요청(고객이 문의를 접수하는 요청) 및 /api/upload 의 GET 요청(시공 사진 목록 조회)은 인증 없이 허용
    if (
      (pathname === '/api/contact' && request.method === 'POST') ||
      (pathname === '/api/upload' && request.method === 'GET')
    ) {
      return NextResponse.next();
    }

    // 쿠키에서 admin_session 확인
    const session = request.cookies.get('admin_session')?.value;

    if (session !== 'authenticated') {
      // API 요청인 경우 401 에러 반환
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized. Admin login required.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      // 일반 관리자 페이지 요청인 경우 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 미들웨어 매칭 경로 설정
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/upload/:path*',
    '/api/contact/:path*',
    '/Portfolio',
    '/Contact',
    '/Company',
    '/company',
  ],
};
