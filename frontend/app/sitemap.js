// app/sitemap.js — Comprehensive sitemap for Shanker Agencies
import { LOCATIONS_DATA } from '@/data/locationsData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';

const BASE = 'https://www.shankeragencies.com';
const TODAY = new Date().toISOString();

export default async function sitemap() {

  const mainPages = [
    { url: `${BASE}/`,                          priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/about`,                     priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/products`,                  priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/brands`,                    priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/industries`,                priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/solutions`,                 priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/knowledge`,                 priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/blog`,                      priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/contact`,                   priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/company-profile`,           priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/refractory-supplier-in`,    priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy`,                   priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`,                     priority: 0.3, changeFrequency: 'yearly' },
  ];

  const categoryPages = [
    'shaped-refractories', 'unshaped-refractories', 'flow-control',
    'insulation', 'acid-proofing', 'special-grades',
  ].map((slug) => ({ url: `${BASE}/products/${slug}`, priority: 0.8, changeFrequency: 'weekly' }));

  const productPages = [
    ['shaped-refractories', 'high-alumina-bricks'],
    ['shaped-refractories', 'fireclay-bricks'],
    ['shaped-refractories', 'insulating-fire-bricks'],
    ['shaped-refractories', 'basic-magnesia-bricks'],
    ['shaped-refractories', 'silicon-carbide-bricks'],
    ['shaped-refractories', 'mullite-bricks'],
    ['shaped-refractories', 'andalusite-bricks'],
    ['shaped-refractories', 'magnesia-spinel-bricks'],
    ['shaped-refractories', 'magnesia-carbon-bricks'],
    ['unshaped-refractories', 'low-cement-castable'],
    ['unshaped-refractories', 'ultra-low-cement-castable'],
    ['unshaped-refractories', 'conventional-castable'],
    ['unshaped-refractories', 'ramming-mass'],
    ['unshaped-refractories', 'gunning-mix'],
    ['unshaped-refractories', 'refractory-mortar'],
    ['unshaped-refractories', 'plastic-refractory'],
    ['flow-control', 'slide-gate-plates'],
    ['flow-control', 'ladle-shrouds'],
    ['flow-control', 'subentry-nozzles'],
    ['flow-control', 'stopper-rods'],
    ['flow-control', 'tundish-nozzles'],
    ['flow-control', 'well-blocks'],
    ['insulation', 'ceramic-fibre-blanket'],
    ['insulation', 'ceramic-fibre-module'],
    ['insulation', 'ceramic-fibre-board'],
    ['insulation', 'calcium-silicate-board'],
    ['insulation', 'microporous-insulation'],
    ['acid-proofing', 'acid-proof-bricks'],
    ['acid-proofing', 'acid-resistant-tiles'],
    ['acid-proofing', 'carbon-bricks'],
    ['acid-proofing', 'acid-proof-cement'],
    ['special-grades', 'fused-cast-refractories'],
    ['special-grades', 'zircon-products'],
  ].map(([cat, id]) => ({ url: `${BASE}/products/${cat}/${id}`, priority: 0.7, changeFrequency: 'monthly' }));

  const industryPages = [
    'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
  ].map((slug) => ({ url: `${BASE}/industries/${slug}`, priority: 0.8, changeFrequency: 'monthly' }));

  const solutionPages = [
    'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
  ].map((slug) => ({ url: `${BASE}/solutions/${slug}`, priority: 0.7, changeFrequency: 'monthly' }));

  const brandPages = [
    'cumi', 'calderys', 'trl-krosaki', 'ifgl', 'mahakoshal', 'divine-cerawool', 'crown-ceramics',
  ].map((slug) => ({ url: `${BASE}/brands/${slug}`, priority: 0.7, changeFrequency: 'monthly' }));

  // ── Geo location pages — all from static data ──
  const locationPages = LOCATIONS_DATA.map((loc) => ({
    url: `${BASE}/refractory-supplier-in/${loc.slug}`,
    priority: loc.isInternational ? 0.7 : 0.8,
    changeFrequency: 'monthly',
  }));

  // ── Blog pages — static data first, then API fallback ──
  const staticBlogPages = BLOG_POSTS_DATA.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: post.publishDate || TODAY,
  }));

  // Try to also pull any additional posts from the API (CMS-authored)
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
          priority: 0.7,
          changeFrequency: 'monthly',
          lastModified: p.updatedAt || TODAY,
        }));
    }
  } catch (_) {}

  const aiPages = [
    { url: `${BASE}/llms.txt`,        priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/ai-roadmap.json`, priority: 0.5, changeFrequency: 'monthly' },
  ];

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
    ...aiPages,
  ].map((p) => ({ ...p, lastModified: p.lastModified || TODAY }));
}
