import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://127.0.0.1:3100';
const canonicalOrigin = 'https://www.chae-on.com';
const sheetUrl = canonicalOrigin + '/images/Product_Surface_pattern_seat.jpg';

async function get(path, options = {}) {
  const response = await fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(20000),
    redirect: 'manual',
    ...options,
  });
  assert.equal(response.status, 200, `${path}: 로그인·리다이렉트 없이 접근할 수 있어야 합니다.`);
  return { response, text: await response.text() };
}

const decodeXml = value => value.replace(/&(?:amp|lt|gt|quot|apos);/g, entity => ({
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
})[entity]);

const { response: sitemapResponse, text: sitemap } = await get('/sitemap.xml');
assert.match(sitemapResponse.headers.get('content-type'), /application\/xml/);
assert.ok(sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
  page: decodeXml(entry.match(/<loc>(.*?)<\/loc>/)[1]),
  images: [...entry.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(([, image]) => decodeXml(image)),
}));
assert.equal(entries.length, 5);
assert.ok(entries.find(entry => entry.page === canonicalOrigin + '/').images.includes(sheetUrl));
assert.ok(entries.find(entry => entry.page === canonicalOrigin + '/products').images.includes(sheetUrl));

const { text: galleryApi } = await get('/api/upload');
const { images: currentImages } = JSON.parse(galleryApi);
assert.ok(currentImages.length > 0, '이 통합 검사는 사진이 등록된 저장소에 연결해 실행해야 합니다.');
assert.deepEqual(entries.find(entry => entry.page === canonicalOrigin + '/portfolio').images, currentImages);
console.log(`PASS 이미지 사이트맵: 기존 5개 페이지·부착방지시트·시공사진 ${currentImages.length}장`);

for (const entry of entries) {
  const { text: html } = await get(new URL(entry.page).pathname);
  // hydration 데이터가 아니라 최초 HTML의 실제 img 요소를 확인합니다.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const imageSources = [...markup.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)]
    .map(([, src]) => new URL(decodeXml(src), canonicalOrigin).href);
  for (const image of entry.images) assert.ok(imageSources.includes(image), `${entry.page}: ${image}가 최초 HTML에 있어야 합니다.`);
  if (entry.page.endsWith('/portfolio')) {
    assert.deepEqual(imageSources.filter(src => currentImages.includes(src)), currentImages);
  }
  if (entry.page.endsWith('/products')) {
    assert.ok(markup.includes(`property="og:image" content="${sheetUrl}"`));
    const structuredData = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map(([, content]) => JSON.parse(content));
    const page = structuredData.find(data => data['@type'] === 'WebPage');
    assert.equal(page.primaryImageOfPage.contentUrl, sheetUrl);
    assert.equal(page.url, entry.page);
  }
}
console.log('PASS 최초 HTML: 제품·시공사진과 사이트맵 일치, 대표 이미지 일치');

const allImages = [...new Set(entries.flatMap(entry => entry.images))];
for (let offset = 0; offset < allImages.length; offset += 4) {
  await Promise.all(allImages.slice(offset, offset + 4).map(async image => {
    const url = new URL(image);
    const target = url.origin === canonicalOrigin ? url.pathname : image;
    const { response } = await get(target, { method: 'HEAD', headers: { 'User-Agent': 'Googlebot-Image/1.0' } });
    assert.match(response.headers.get('content-type') || '', /^image\//, `${image}: 이미지 형식이어야 합니다.`);
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex|noimageindex|none\b/i);
  }));
}
console.log(`PASS 원본 이미지 ${allImages.length}개: 이미지 크롤러 요청 200, 이미지 형식·색인 허용`);

const { text: robots } = await get('/robots.txt');
assert.doesNotMatch(robots, /^Disallow: \/(?:images|portfolio|sitemap\.xml)/m);
assert.ok(robots.includes('Disallow: /admin'));
assert.ok(robots.includes('Disallow: /api/'));
console.log('PASS 기존 관리자·API 차단 유지, 공개 이미지 수집 허용');
