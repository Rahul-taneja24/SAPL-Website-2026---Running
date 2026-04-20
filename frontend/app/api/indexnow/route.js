/**
 * IndexNow submission endpoint — submits URLs to Bing/Yandex for instant indexing.
 *
 * GET  /api/indexnow          → submits all static site URLs (call from Vercel deploy hook)
 * POST /api/indexnow          → submits specific URLs
 *   Body: { urls: ['https://...'] }   (omit to submit all static URLs)
 *
 * Vercel deploy hook setup:
 *   In Vercel project → Settings → Git → Deploy Hooks, create a hook that calls:
 *   https://www.shankeragencies.com/api/indexnow (GET)
 */

import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';
import { LOCATIONS_DATA } from '@/data/locationsData';

const INDEX_NOW_KEY = '68c9e978104b40548276dada2151c101';
const HOST = 'www.shankeragencies.com';
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${INDEX_NOW_KEY}.txt`;

function buildAllUrls() {
  const static_pages = [
    '/', '/about', '/contact', '/products', '/blog', '/brands',
    '/industries', '/solutions', '/knowledge', '/downloads',
    '/company-profile', '/refractory-supplier-in',
  ];

  const categories = [
    'shaped-refractories', 'unshaped-refractories', 'flow-control',
    'insulation', 'acid-proofing',
  ];

  const industries = ['steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic'];

  const blogUrls = BLOG_POSTS_DATA.map((p) => `/blog/${p.slug}`);
  const productUrls = PRODUCT_SEO.map((p) => `/products/${p.categorySlug}/${p.productId}`);
  const categoryUrls = categories.map((c) => `/products/${c}`);
  const industryUrls = industries.map((i) => `/industries/${i}`);
  const solutionUrls = industries.map((i) => `/solutions/${i}`);
  const locationUrls = LOCATIONS_DATA.map((l) => `/refractory-supplier-in/${l.slug}`);

  return [
    ...static_pages,
    ...categoryUrls,
    ...productUrls,
    ...industryUrls,
    ...solutionUrls,
    ...locationUrls,
    ...blogUrls,
  ].map((path) => `${BASE}${path}`);
}

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: INDEX_NOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000), // IndexNow max per request
  };

  const [bingRes, indexNowRes] = await Promise.allSettled([
    fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    }),
    fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    }),
  ]);

  return {
    urls_submitted: urls.length,
    bing_status: bingRes.status === 'fulfilled' ? bingRes.value.status : 'error',
    indexnow_status: indexNowRes.status === 'fulfilled' ? indexNowRes.value.status : 'error',
  };
}

// GET — full-site submission (call from Vercel deploy hook or manually)
export async function GET() {
  try {
    const urls = buildAllUrls();
    const result = await submitToIndexNow(urls);
    return Response.json({ success: true, ...result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST — submit specific URLs (or all if body is empty)
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urls = body.urls?.length ? body.urls : buildAllUrls();
    const result = await submitToIndexNow(urls);
    return Response.json({ success: true, ...result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
