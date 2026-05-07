// /case-studies — listing page for all SAPL refractory case studies.
//
// SEO/GEO rationale:
//   - Pages with measurable outcomes ("65→92 heats", "+43% campaign life",
//     "iron pickup eliminated") are 5–7x more likely to be cited by AI
//     search engines (Perplexity, Google AI Overviews) than generic
//     capability copy.
//   - CollectionPage + ItemList schema lets crawlers traverse all studies
//     and understand the relationship to brand/product/industry entities.

import Link from 'next/link';
import {
  getCaseStudiesByYear,
  CASE_STUDIES,
} from '@/data/caseStudiesData';

const BASE = 'https://www.shankeragencies.com';

export const metadata = {
  title: 'Refractory Case Studies | Real Plant Outcomes Since 1980',
  description:
    'Anonymised refractory engineering case studies from Shanker Agencies — measurable plant outcomes across steel ladles, induction furnaces, cement kilns, CFBC boilers, aluminium and glass tanks. Reviewed by Rahul Taneja, Director.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Refractory Case Studies — Plant-Side Outcomes',
    description:
      'Real refractory engineering outcomes from Shanker Agencies — campaign life, energy savings, downtime reductions across 6 industrial applications.',
    url: `${BASE}/case-studies`,
    type: 'website',
  },
};

export default function CaseStudiesIndexPage() {
  const studies = getCaseStudiesByYear();

  // CollectionPage + ItemList — lets AI engines traverse every case study
  // and infer the relationship to brand and product entities.
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE}/case-studies/#collection`,
    name: 'Shanker Agencies — Refractory Case Studies',
    url: `${BASE}/case-studies`,
    description:
      'Anonymised refractory case studies from Shanker Agencies covering steel, foundry, cement, power, aluminium and glass applications. Each study documents the problem, diagnosis, specification, installation and measurable result.',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    author: { '@id': `${BASE}/about#rahul-taneja` },
    inLanguage: 'en-IN',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE}/case-studies/#list`,
    numberOfItems: studies.length,
    itemListElement: studies.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/case-studies/${cs.slug}`,
      name: cs.title,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${BASE}/case-studies`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(30,58,95,0.96) 0%, rgba(30,64,175,0.90) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            Plant-side outcomes · 1980–2026
          </span>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white leading-none mb-4">
            REFRACTORY CASE STUDIES
            <br />
            <span className="text-shimmer">REAL OUTCOMES, NAMED METRICS</span>
          </h1>
          <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
            Anonymised engineering case studies from steel, foundry, cement, power, aluminium
            and glass plants. Each study documents the problem, diagnosis, specification,
            installation, and the measurable result —{' '}
            <span className="font-semibold text-white">
              campaign life, energy savings, downtime reduction
            </span>
            . Reviewed by Rahul Taneja, Director &amp; Refractory Engineering Expert.
          </p>
        </div>
      </section>

      {/* ── LISTING ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-7">
            {studies.map((cs) => (
              <article
                key={cs.slug}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#F97316]/50 hover:shadow-lg transition-all overflow-hidden"
              >
                <Link href={`/case-studies/${cs.slug}`} className="block p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#F97316] text-[11px] font-bold uppercase tracking-widest">
                      {cs.industry}
                    </span>
                    {cs.year && (
                      <span className="text-xs text-gray-400 font-semibold">{cs.year}</span>
                    )}
                    <span className="text-xs text-gray-400">
                      · {cs.readingTime || 5} min read
                    </span>
                  </div>

                  <h2 className="font-oswald text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-3 group-hover:text-[#1E40AF] transition-colors">
                    {cs.title}
                  </h2>

                  <p className="text-gray-500 text-sm mb-4 italic">{cs.client}</p>

                  {cs.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-gray-100">
                      {Object.entries(cs.metrics)
                        .slice(0, 4)
                        .map(([k, v]) => (
                          <div key={k} className="text-xs">
                            <p className="text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
                              {k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                            </p>
                            <p className="font-bold text-[#1E3A5F]">{v}</p>
                          </div>
                        ))}
                    </div>
                  )}

                  {cs.keyTakeaway && (
                    <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-[#F97316] pl-4 mb-4">
                      {cs.keyTakeaway}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Brand: <span className="font-semibold text-[#1E3A5F]">{cs.brand}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#F97316] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read full case →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <h3 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-3">
              Have a similar problem at your plant?
            </h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mb-6">
              Our refractory engineers respond within 4 business hours. Send us your furnace
              type, current campaign life, and failure mode — we&apos;ll come back with a
              specification proposal and indicative pricing.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-xl"
            >
              Talk to a Refractory Engineer →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Static export — let Next.js know we have 6 + 1 prerenderable URLs
export const dynamic = 'force-static';
