/**
 * Runs as `postbuild`, fires once `next build` finishes.
 *
 * Only submits on Vercel's production builds (VERCEL_ENV === 'production'),
 * never on preview/branch deploys or local `npm run build`, so PRs and dev
 * builds don't spam search engines with in-progress content.
 *
 * Calls the live site's own /api/indexnow endpoint rather than duplicating
 * its URL-list logic here — that endpoint already builds the full list from
 * the site's data files (see frontend/app/api/indexnow/route.js).
 *
 * Never fails the build: indexing is best-effort, not a deploy gate. A
 * network hiccup here should not block a production release.
 */

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log(`[indexnow] Skipping (VERCEL_ENV=${process.env.VERCEL_ENV || 'unset'}, not production).`);
    return;
  }

  try {
    const res = await fetch('https://www.shankeragencies.com/api/indexnow');
    const body = await res.json();
    if (body.success) {
      console.log(`[indexnow] Submitted ${body.urls_submitted} URLs (bing=${body.bing_status}, indexnow=${body.indexnow_status}).`);
    } else {
      console.warn('[indexnow] Endpoint reported failure:', body.error || body);
    }
  } catch (err) {
    console.warn('[indexnow] Skipped due to error (non-fatal):', err.message);
  }
}

main();
