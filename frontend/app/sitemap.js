// app/sitemap.js — Comprehensive sitemap for Shanker Agencies
import { LOCATIONS_DATA } from '@/data/locationsData';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';

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
    { url: `${BASE}/downloads`,                 priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy`,                   priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`,                     priority: 0.3, changeFrequency: 'yearly' },
  ];

  const categoryPages = [
    'shaped-refractories', 'unshaped-refractories', 'flow-control',
    'insulation', 'acid-proofing', 'special-grades',
  ].map((slug) => ({ url: `${BASE}/products/${slug}`, priority: 0.8, changeFrequency: 'weekly' }));

  const productPages = PRODUCT_SEO.map(({ categorySlug, productId }) => ({
    url: `${BASE}/products/${categorySlug}/${productId}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

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
