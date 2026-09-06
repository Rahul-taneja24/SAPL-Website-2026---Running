// app/sitemap.js, Comprehensive sitemap for Shanker Agencies
// Google ignores <priority> and <changefreq>, so we emit only <loc> and <lastmod>.
// We also compute a realistic lastmod per URL where possible (blog post publishDate,
// and a stable per-deploy timestamp for structural pages) rather than a single
// build-time timestamp across every URL, which is a known credibility red flag.
import { LOCATIONS_DATA } from '@/data/locationsData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { NEWS_ARTICLES } from '@/data/newsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';
import { PRODUCT_CATALOG } from '@/data/productCatalogData';
import { slugifyGrade, getGradeLabel } from '@/data/gradeAliasData';
import { CASE_STUDIES } from '@/data/caseStudiesData';
import { publishedOnly, REVALIDATE_SECONDS } from '@/lib/scheduling';

// Re-check hourly, a scheduled blog post/news article must disappear from the
// sitemap until its publishDate arrives (submitting an unpublished URL to
// Google/Bing before it's live just earns a 404 in Search Console), and it
// must appear on its own once due, without waiting on a fresh deploy.
export const revalidate = REVALIDATE_SECONDS;

const BASE = 'https://www.shankeragencies.com';
// Stable per-deploy timestamp for structural pages (refreshes on every build).
const DEPLOY_TS = new Date().toISOString();

// Structural pages, use the deploy timestamp. These genuinely change each deploy
// as data or copy is refreshed.
const STRUCTURAL_LASTMOD = DEPLOY_TS;

// Evergreen legal pages, very infrequent updates. Pin a fixed date so crawlers
// stop re-crawling every build.
const LEGAL_LASTMOD = '2026-01-01T00:00:00.000Z';

export default async function sitemap() {
  const mainPages = [
    // Homepage canonical is `https://www.shankeragencies.com` (no trailing slash),
    // so the sitemap entry must match exactly, mismatched URLs are a known
    // credibility issue with both Google and AI crawlers.
    { url: `${BASE}`,                           lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/about`,                     lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/products`,                  lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/brands`,                    lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/solutions`,                 lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/knowledge`,                 lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/blog`,                      lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/news`,                      lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/engineering-references`,    lastModified: STRUCTURAL_LASTMOD },
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

  // Per-grade product pages (HA-70, LCC-80, SK equivalents and so on).
  // Canonical slugs only: alias slugs such as /sk-36 or /al70 308 to these,
  // and redirect targets should never appear in a sitemap.
  const gradeSeen = new Set();
  const gradePages = [];
  Object.entries(PRODUCT_CATALOG).forEach(([categorySlug, category]) => {
    category.products?.forEach((product) => {
      product.specs?.forEach((row) => {
        const label = getGradeLabel(row);
        if (!label) return;
        const url = `${BASE}/products/${categorySlug}/${product.id}/${slugifyGrade(label)}`;
        if (gradeSeen.has(url)) return;
        gradeSeen.add(url);
        gradePages.push({ url, lastModified: STRUCTURAL_LASTMOD });
      });
    });
  });

  // /industries/* now 301s to /solutions/* (crawl-audit consolidation) — not in sitemap.

  const solutionPages = [
    'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
  ].map((slug) => ({ url: `${BASE}/solutions/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  const brandPages = [
    'cumi', 'calderys', 'trl-krosaki', 'mahakoshal', 'divine-cerawool', 'crown-ceramics', 'saint-gobain',
  ].map((slug) => ({ url: `${BASE}/brands/${slug}`, lastModified: STRUCTURAL_LASTMOD }));

  // Geo location pages, all from static data
  const locationPages = LOCATIONS_DATA.map((loc) => ({
    url: `${BASE}/refractory-supplier-in/${loc.slug}`,
    lastModified: STRUCTURAL_LASTMOD,
  }));

  // Engineering Reference Scenarios, fixed per-page lastmod tied to year so
  // the sitemap stays stable between deploys (instead of a single deploy-time
  // bump on every URL, which Google flags as low-credibility).
  const engineeringReferencePages = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/engineering-references/${cs.slug}`,
    lastModified: cs.year
      ? new Date(`${cs.year}-12-31T00:00:00.000Z`).toISOString()
      : STRUCTURAL_LASTMOD,
  }));

  // Blog pages, use each post's own publishDate so lastmod is unique per URL.
  // Scheduled (future-dated) posts are excluded until they're actually live.
  const staticBlogPages = publishedOnly(BLOG_POSTS_DATA).map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.publishDate
      ? new Date(post.publishDate).toISOString()
      : STRUCTURAL_LASTMOD,
  }));

  // CMS-authored posts (optional, pulled from the backend if reachable)
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

  // Note: llms.txt / ai-roadmap.json intentionally NOT in sitemap, Google/Bing
  // won't index them and they waste crawl budget. They are served and referenced
  // in robots.js + layout metadata instead.

  // RFQ page + Arabic (GCC) mini-site — Arabic pages are hand-written
  // counterparts hreflang-paired to their English versions.
  const GCC_AR_SLUGS = ['dubai', 'abu-dhabi', 'riyadh', 'jeddah', 'doha', 'muscat', 'kuwait-city', 'manama'];
  const rfqAndArabicPages = [
    { url: `${BASE}/rfq`,    lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/ar`,     lastModified: STRUCTURAL_LASTMOD },
    { url: `${BASE}/ar/rfq`, lastModified: STRUCTURAL_LASTMOD },
    ...GCC_AR_SLUGS.map((slug) => ({ url: `${BASE}/ar/refractory-supplier-in/${slug}`, lastModified: STRUCTURAL_LASTMOD })),
    ...['shaped-refractories', 'unshaped-refractories', 'flow-control', 'insulation', 'acid-proofing']
      .map((slug) => ({ url: `${BASE}/ar/products/${slug}`, lastModified: STRUCTURAL_LASTMOD })),
  ];

  // Scheduled (future-dated) news articles are excluded until they're actually live.
  const newsPages = publishedOnly(NEWS_ARTICLES).map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: a.lastModified || a.publishDate
      ? new Date(a.lastModified || a.publishDate).toISOString()
      : STRUCTURAL_LASTMOD,
  }));

  return [
    ...mainPages,
    ...categoryPages,
    ...productPages,
    ...gradePages,
    ...solutionPages,
    ...brandPages,
    ...locationPages,
    ...engineeringReferencePages,
    ...staticBlogPages,
    ...apiBlogPages,
    ...newsPages,
    ...rfqAndArabicPages,
  ];
}
