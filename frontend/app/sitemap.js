// app/sitemap.js — Comprehensive sitemap for Shanker Agencies
const BASE = 'https://www.shankeragencies.com';
const TODAY = new Date().toISOString();

export default async function sitemap() {

  const mainPages = [
    { url: `${BASE}/`,                priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/about`,           priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/products`,        priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/brands`,          priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/industries`,      priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/solutions`,       priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/knowledge`,       priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/blog`,            priority: 0.8, changeFrequency: 'daily' },
    { url: `${BASE}/contact`,         priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/company-profile`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy`,         priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`,           priority: 0.3, changeFrequency: 'yearly' },
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
    ['unshaped-refractories', 'low-cement-castable'],
    ['unshaped-refractories', 'ultra-low-cement-castable'],
    ['unshaped-refractories', 'ramming-mass'],
    ['unshaped-refractories', 'gunning-mix'],
    ['unshaped-refractories', 'refractory-mortar'],
    ['unshaped-refractories', 'plastic-refractory'],
    ['flow-control', 'slide-gate-plates'],
    ['flow-control', 'ladle-shrouds'],
    ['flow-control', 'subentry-nozzles'],
    ['flow-control', 'stopper-rods'],
    ['flow-control', 'tundish-nozzles'],
    ['insulation', 'ceramic-fibre-blanket'],
    ['insulation', 'ceramic-fibre-board'],
    ['insulation', 'insulating-castable'],
    ['insulation', 'microporous-insulation'],
    ['acid-proofing', 'acid-proof-bricks'],
    ['acid-proofing', 'carbon-bricks'],
    ['acid-proofing', 'acid-proof-cement'],
    ['special-grades', 'fused-cast-refractories'],
    ['special-grades', 'zircon-products'],
    ['special-grades', 'andalusite-bricks'],
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

  let blogPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blogPages = (data.posts || []).map((p) => ({ url: `${BASE}/blog/${p.slug}`, priority: 0.6, changeFrequency: 'monthly', lastModified: p.updatedAt || TODAY }));
    }
  } catch (e) {}

  const aiPages = [
    { url: `${BASE}/llms.txt`,        priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/ai-roadmap.json`, priority: 0.5, changeFrequency: 'monthly' },
  ];

  return [...mainPages, ...categoryPages, ...productPages, ...industryPages, ...solutionPages, ...brandPages, ...blogPages, ...aiPages]
    .map((p) => ({ ...p, lastModified: p.lastModified || TODAY }));
}
