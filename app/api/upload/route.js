import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { listPortfolioImages } from '../../lib/portfolio-images';

export async function GET() {
  return NextResponse.json({ images: await listPortfolioImages() });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
    }

    // 파일 이름 고유화
    const ext = file.name.split('.').pop() || 'tmp';
    const filename = `photo_${Date.now()}.${ext}`;

    // Vercel Blob 스토리지에 업로드 진행
    const blob = await put(filename, file, {
      access: 'public', // 외부에서 URL 조회가 가능하도록 설정
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Vercel Blob Upload Error:', error);
    return NextResponse.json({ error: '클라우드 저장소 업로드 실패. 토큰 설정을 확인해 주세요.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });

    // Vercel Blob에서 해당 URL의 파일 영구 삭제
    await del(url);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vercel Blob Delete Error:', error);
    return NextResponse.json({ error: '클라우드 파일 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
