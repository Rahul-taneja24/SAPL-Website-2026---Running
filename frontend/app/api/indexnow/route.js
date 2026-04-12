/**
 * IndexNow submission endpoint
 * POST /api/indexnow  — submits a list of URLs to Bing/Yandex for instant indexing
 *
 * Usage (from sitemap updates, CMS hooks, or manual trigger):
 *   fetch('/api/indexnow', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ urls: ['https://www.shankeragencies.com/blog/new-post'] })
 *   })
 */

const INDEX_NOW_KEY = '68c9e978104b40548276dada2151c101';
const HOST = 'www.shankeragencies.com';
const KEY_LOCATION = `https://${HOST}/${INDEX_NOW_KEY}.txt`;

// Submit all sitemap URLs — call this after any content deployment
const ALL_SITE_URLS = [
  'https://www.shankeragencies.com/',
  'https://www.shankeragencies.com/about',
  'https://www.shankeragencies.com/contact',
  'https://www.shankeragencies.com/products',
  'https://www.shankeragencies.com/blog',
  'https://www.shankeragencies.com/refractory-supplier-in/delhi',
  'https://www.shankeragencies.com/refractory-supplier-in/mumbai',
  'https://www.shankeragencies.com/refractory-supplier-in/pune',
  'https://www.shankeragencies.com/refractory-supplier-in/ahmedabad',
  'https://www.shankeragencies.com/refractory-supplier-in/chennai',
  'https://www.shankeragencies.com/refractory-supplier-in/hyderabad',
  'https://www.shankeragencies.com/refractory-supplier-in/kolkata',
  'https://www.shankeragencies.com/refractory-supplier-in/jamshedpur',
  'https://www.shankeragencies.com/refractory-supplier-in/raipur',
  'https://www.shankeragencies.com/refractory-supplier-in/surat',
];

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urls = body.urls || ALL_SITE_URLS;

    // Submit to Bing IndexNow
    const bingResponse = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEX_NOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    // Also submit to IndexNow API (shared across Yandex, Seznam, etc.)
    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEX_NOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    return Response.json({
      success: true,
      urls_submitted: urls.length,
      bing_status: bingResponse.status,
      indexnow_status: indexNowResponse.status,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET — trigger full-site submission (call from Vercel deployment hook or manually)
export async function GET() {
  const response = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEX_NOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: ALL_SITE_URLS,
    }),
  });

  return Response.json({
    success: true,
    urls_submitted: ALL_SITE_URLS.length,
    bing_status: response.status,
    message: `Submitted ${ALL_SITE_URLS.length} URLs to IndexNow`,
  });
}
