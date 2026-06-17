/**
 * IndexNow submission endpoint, pings Bing + IndexNow on demand.
 *
 * Routes:
 *   POST /api/indexnow
 *     Body: { urls: string[] }  , submit a specific list of URLs
 *     Body: {}                  , submit ALL site URLs (sitemap)
 *   GET  /api/indexnow
 *     No body                   , submit ALL site URLs (manual trigger)
 *
 * Why call this:
 *   - Bing crawls slowly without IndexNow. ChatGPT, Copilot and Perplexity
 *     all rely on Bing's index for citations of www.shankeragencies.com.
 *   - With Bing Webmaster Tools verified (May 2026, via GSC import) the
 *     IndexNow pings are honoured immediately.
 *
 * After every production deploy, call:
 *   curl https://www.shankeragencies.com/api/indexnow
 *
 * Or wire as a Vercel deploy hook so it fires automatically.
 */

import { LOCATIONS_DATA } from '@/data/locationsData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';
import { CASE_STUDIES } from '@/data/caseStudiesData';

const INDEX_NOW_KEY = '68c9e978104b40548276dada2151c101';
const HOST = 'www.shankeragencies.com';
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${INDEX_NOW_KEY}.txt`;

// Build the same URL list the sitemap generates, single source of truth.
function buildAllUrls() {
  const urls = new Set();

  // Structural pages (no trailing slash to match canonical)
  [
    '',
    '/about',
    '/products',
    '/brands',
    '/industries',
    '/solutions',
    '/knowledge',
    '/blog',
    '/engineering-references',
    '/contact',
    '/company-profile',
    '/refractory-supplier-in',
    '/downloads',
  ].forEach((p) => urls.add(`${BASE}${p}`));

  // Product categories
  [
    'shaped-refractories',
    'unshaped-refractories',
    'flow-control',
    'insulation',
    'acid-proofing',
  ].forEach((slug) => urls.add(`${BASE}/products/${slug}`));

  // Product detail pages
  PRODUCT_SEO.forEach(({ categorySlug, productId }) => {
    urls.add(`${BASE}/products/${categorySlug}/${productId}`);
  });

  // Industries + Solutions
  ['steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic']
    .forEach((slug) => {
      urls.add(`${BASE}/industries/${slug}`);
      urls.add(`${BASE}/solutions/${slug}`);
    });

  // Brands
  ['cumi', 'calderys', 'trl-krosaki', 'ifgl', 'mahakoshal', 'divine-cerawool', 'crown-ceramics']
    .forEach((slug) => urls.add(`${BASE}/brands/${slug}`));

  // Geo locations (50+)
  LOCATIONS_DATA.forEach((loc) => {
    urls.add(`${BASE}/refractory-supplier-in/${loc.slug}`);
  });

  // Blog posts
  BLOG_POSTS_DATA.forEach((post) => {
    urls.add(`${BASE}/blog/${post.slug}`);
  });

  // Engineering reference scenarios
  CASE_STUDIES.forEach((cs) => {
    urls.add(`${BASE}/engineering-references/${cs.slug}`);
  });

  return Array.from(urls);
}

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: INDEX_NOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  // Submit to Bing IndexNow (primary, ChatGPT/Copilot/Perplexity build on
  // Bing's index for the Microsoft AI stack)
  const bingResponse = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  // Submit to neutral IndexNow API (forwards to Yandex, Seznam, Naver)
  const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    bing_status: bingResponse.status,
    indexnow_status: indexNowResponse.status,
  };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urls = body.urls || buildAllUrls();

    const { bing_status, indexnow_status } = await submitToIndexNow(urls);

    return Response.json({
      success: true,
      urls_submitted: urls.length,
      bing_status,
      indexnow_status,
      message: `Submitted ${urls.length} URLs to Bing + IndexNow`,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET, convenient manual trigger from a browser or curl.
export async function GET() {
  try {
    const urls = buildAllUrls();
    const { bing_status, indexnow_status } = await submitToIndexNow(urls);

    return Response.json({
      success: true,
      urls_submitted: urls.length,
      bing_status,
      indexnow_status,
      message: `Submitted ${urls.length} URLs to Bing + IndexNow`,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
