import PortfolioGallery from './PortfolioGallery';
import { listPortfolioImages } from '../lib/portfolio-images';

// 업로드·삭제된 사진이 다음 페이지 요청에 반영되도록 정적 빌드에 고정하지 않습니다.
export const dynamic = 'force-dynamic';

export default async function Portfolio() {
  const images = await listPortfolioImages();
  return <PortfolioGallery initialImages={images} />;
}
