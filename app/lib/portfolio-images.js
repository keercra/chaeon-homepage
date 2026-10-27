import 'server-only';
import { list } from '@vercel/blob';

// 서버에서만 호출하며 브라우저로 저장소 인증 정보를 전달하지 않습니다.
export async function listPortfolioImages() {
  try {
    const { blobs } = await list();
    // 기존 갤러리와 동일한 필터와 표시 순서를 유지합니다.
    return blobs
      .filter(blob => /\.(jpg|jpeg|png|gif|webp)$/i.test(blob.pathname))
      .map(blob => blob.url)
      .reverse();
  } catch (error) {
    console.error('Vercel Blob List Error:', error);
    return [];
  }
}
