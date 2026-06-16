import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // 쿠키 만료(삭제)
  response.cookies.set('admin_session', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0), // 만료일자를 과거로 설정
    maxAge: 0,
  });
  
  return response;
}
