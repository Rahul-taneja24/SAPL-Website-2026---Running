// app/sitemap.js — Comprehensive sitemap for Shanker Agencies
// Google ignores <priority> and <changefreq>, so we emit only <loc> and <lastmod>.
// We also compute a realistic lastmod per URL where possible (blog post publishDate,
// and a stable per-deploy timestamp for structural pages) rather than a single
// build-time timestamp across every URL, which is a known credibility red flag.
import { LOCATIONS_DATA } from '@/data/locationsData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';

const BASE = 'https://www.shankeragencies.com';
// Stable per-deploy timestamp for structural pages (refreshes on every build).
const DEPLOY_TS = new Date().toISOString();

// Structural pages — use the deploy timestamp. These genuinely change each deploy
// as data or copy is refreshed.
const STRUCTURAL_LASTMOD = DEPLOY_TS;

// Evergreen legal pages — very infrequent updates. Pin a fixed date so crawlers
// stop re-crawling every build.
const LEGAL_LASTMOD = '2026-01-01T00:00:00.000Z';

export default async function sitemap() {
  const mainPages = [
    { url: `${BASE}/`,                          lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/about`,                     lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/products`,                  lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/brands`,                    lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/industries`,                lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/solutions`,                 lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/knowledge`,                 lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/blog`,                      lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/contact`,                   lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/company-profile`,           lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/refractory-supplier-in`,    lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/downloads`,                 lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/privacy`,                   lastModified: LEGAL_LASTMOD },
    { url: `${BASE}/terms`,                     lastModified: LEGAL_LASTMOD },
  ];

  const categoryPages = [
    'shaped-refractories', 'unshaped-refractories', 'flow-control',
    'insulation', 'acid-proofing',
  ].map((slug) => ({ url: `${BASE}/products/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  const productPages = PRODUCT_SEO.map(({ categorySlug, productId }) => ({
    url: `${BASE}/products/${categorySlug}/${productId}`,
    lastModified: STRUCTURAL_LASTMOD,
  }));

  const industryPages = [
    'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
  ].map((slug) => ({ url: `${BASE}/industries/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  const solutionPages = [
    'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
  ].map((slug) => ({ url: `${BASE}/solutions/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  const brandPages = [
    'cumi', 'calderys', 'trl-krosaki', 'ifgl', 'mahakoshal', 'divine-cerawool', 'crown-ceramics',
  ].map((slug) => ({ url: `${BASE}/brands/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  // Geo location pages — all from static data
  const locationPages = LOCATIONS_DATA.map((loc) => ({
    url: `${BASE}/refractory-supplier-in/${loc.slug}`,
    lastModified: STRUCTURAL_LASTMOD,
  }));

  // Blog pages — use each post's own publishDate so lastmod is unique per URL
  const staticBlogPages = BLOG_POSTS_DATA.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.publishDate
      ? new Date(post.publishDate).toISOString()
      : STRUCTURAL_LASTMOD,
  }));

  // CMS-authored posts (optional — pulled from the backend if reachable)
  let apiBlogPages = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/posts?limit=500`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      const staticSlugs = new Set(BLOG_POSTS_DATA.map((p) => p.slug));
      apiBlogPages = (data.posts || [])
        .filter((p) => !staticSlugs.has(p.slug))
        .map((p) => ({
          url: `${BASE}/blog/${p.slug}`,
          lastModified: p.updatedAt
            ? new Date(p.updatedAt).toISOString()
            : STRUCTURAL_LASTMOD,
        }));
    }
  } catch (_) {}

  // Note: llms.txt / ai-roadmap.json intentionally NOT in sitemap — Google/Bing
  // won't index them and they waste crawl budget. They are served and referenced
  // in robots.js + layout metadata instead.

  return [
    ...mainPages,
    ...categoryPages,
    ...productPages,
    ...industryPages,
    ...solutionPages,
    ...brandPages,
    ...locationPages,
    ...staticBlogPages,
    ...apiBlogPages,
  ];
}
