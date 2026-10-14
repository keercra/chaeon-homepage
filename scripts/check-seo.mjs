import assert from 'node:assert/strict';

// npm run check:seo -- https://www.chae-on.com 으로 배포 후에도 같은 검증을 실행할 수 있습니다.
const origin = process.argv[2] || 'http://127.0.0.1:3100';
const canonicalOrigin = 'https://www.chae-on.com';
const paths = ['/', '/about', '/products', '/portfolio', '/contact'];
const titles = new Set();

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

async function get(path, options = {}) {
  const response = await fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(15000),
    redirect: 'manual',
    ...options,
  });
  return { response, html: await response.text() };
}

for (const path of paths) {
  const { response, html } = await get(path);
  assert.equal(response.status, 200, `${path}: 페이지가 리다이렉트 없이 열려야 합니다.`);
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i, `${path}: 헤더가 색인을 차단합니다.`);
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || '';
  const tags = head.match(/<(?:meta|link)\b[^>]*>/g) || [];
  const canonical = tags.filter(tag => attribute(tag, 'rel') === 'canonical');
  assert.equal(canonical.length, 1, `${path}: head에 대표 주소가 하나 있어야 합니다.`);
  assert.equal(new URL(attribute(canonical[0], 'href')).href, canonicalOrigin + path, `${path}: 페이지별 대표 주소가 잘못되었습니다.`);
  const robots = tags.find(tag => attribute(tag, 'name') === 'robots');
  assert.doesNotMatch(robots ? attribute(robots, 'content') : '', /noindex/i, `${path}: 메타태그가 색인을 차단합니다.`);
  const title = head.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title, `${path}: 제목이 필요합니다.`);
  assert.ok(!titles.has(title), `${path}: 페이지 제목이 중복됩니다.`);
  titles.add(title);
  assert.ok(tags.some(tag => attribute(tag, 'name') === 'description' && attribute(tag, 'content')), `${path}: 설명이 필요합니다.`);
  assert.equal(new URL(attribute(tags.find(tag => attribute(tag, 'property') === 'og:url') || '', 'content')).href, canonicalOrigin + path);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: 페이지 주제 제목이 하나 있어야 합니다.`);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, `${path}: 회사 구조화 데이터가 필요합니다.`);
  const organization = JSON.parse(json);
  assert.equal(organization['@type'], 'Organization');
  assert.equal(organization.url, canonicalOrigin + '/');
  if (['/', '/products', '/portfolio'].includes(path)) {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
    assert.match(main, /광고물부착방지물/);
    assert.match(main, /부착방지시트/);
  }
  if (path === '/products') {
    for (const id of ['embossing', 'sheet', 'box']) assert.ok(html.includes(`id="${id}"`));
  }
  console.log(`PASS ${path}: 제목, 대표 주소, 수집 설정, 본문, 회사 정보`);
}

const { response: sitemapResponse, html: sitemap } = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(locations.sort(), paths.map(path => canonicalOrigin + path).sort());
console.log('PASS sitemap.xml: 공개 페이지의 대표 주소와 일치');

const { response: robotsResponse, html: robots } = await get('/robots.txt');
assert.equal(robotsResponse.status, 200);
assert.match(robots, /^Allow: \/$/m);
assert.doesNotMatch(robots, /^Disallow: \/(?:\*)?$/m);
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
console.log('PASS robots.txt: 공개 페이지 수집 허용, 사이트맵 주소 일치');

const { html: login, response: loginResponse } = await get('/admin/login');
assert.equal(loginResponse.status, 200);
assert.match(login, /<meta name="robots" content="[^"]*noindex/);
console.log('PASS 관리자 로그인: noindex');

for (const [oldPath, newPath] of [
  ['/Portfolio', '/portfolio'], ['/Contact', '/contact'], ['/Company', '/about'], ['/company', '/about'],
  ['/Product_patternseat', '/products'], ['/Product_embossing', '/products'], ['/Product_box', '/products'],
]) {
  const { response } = await get(oldPath);
  assert.ok([301, 308].includes(response.status), `${oldPath}: 영구 이동이어야 합니다.`);
  assert.equal(new URL(response.headers.get('location'), origin).pathname, newPath);
}
console.log('PASS 기존 주소: 공개 페이지로 영구 이동');

const { response: verificationResponse, html: verification } = await get('/google1f35d36d1d83a376.html');
assert.equal(verificationResponse.status, 200);
assert.match(verification, /google-site-verification:/);
console.log('PASS 기존 Google 소유권 확인 파일 유지');
