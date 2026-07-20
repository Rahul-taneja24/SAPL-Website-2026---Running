// /engineering-references, listing page for SAPL's Engineering Reference Scenarios.
//
// IMPORTANT EDITORIAL FRAMING:
//   These pages are NOT records of specific SAPL project deliveries. They are
//   illustrative engineering scenarios for typical application classes
//   designed to help buyers/engineers understand the economic and technical
//   logic of correct refractory specification. Every detail page carries an
//   unmissable banner stating this. Schema type is TechArticle (technical
//   reference content), not Article (which implies authored journalism).
//
//   When real signed-off case studies are obtained from past clients, these
//   pages should be replaced with actual project records.

import Link from 'next/link';
import {
  getCaseStudiesByYear,
  CASE_STUDIES,
} from '@/data/caseStudiesData';

const BASE = 'https://www.shankeragencies.com';

export const metadata = {
  title: { absolute: 'Engineering Reference Scenarios | Shanker Agencies' },
  description:
    'Illustrative refractory engineering scenarios for steel ladles, induction furnaces, cement kilns, CFBC boilers, aluminium and glass tanks. Typical specs and outcome ranges.',
  alternates: { canonical: '/engineering-references' },
  openGraph: {
    title: 'Engineering Reference Scenarios | Shanker Agencies',
    description:
      'Illustrative refractory engineering scenarios for steel ladles, induction furnaces, cement kilns, CFBC boilers, aluminium and glass tanks. Typical specs and outcome ranges.',
    url: `${BASE}/engineering-references`,
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Engineering References' }],
  },
};

export default function EngineeringReferencesIndexPage() {
  const scenarios = getCaseStudiesByYear();

  // CollectionPage + ItemList, but framed as a reference collection so AI
  // engines understand this is reference material, not authored journalism.
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE}/engineering-references/#collection`,
    name: 'Shanker Agencies, Refractory Engineering Reference Scenarios',
    url: `${BASE}/engineering-references`,
    description:
      'Illustrative engineering reference scenarios across 6 refractory application classes. Each scenario documents typical baseline conditions, common failure modes, recommended specification, and expected outcome ranges based on May 2026 Indian market data. These are NOT records of specific SAPL project deliveries.',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    inLanguage: 'en-IN',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE}/engineering-references/#list`,
    numberOfItems: scenarios.length,
    itemListElement: scenarios.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/engineering-references/${s.slug}`,
      name: s.title,
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
        name: 'Engineering References',
        item: `${BASE}/engineering-references`,
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
            Application notes · 2026 market economics
          </span>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white leading-none mb-4">
            ENGINEERING REFERENCE SCENARIOS
            <br />
            <span className="text-shimmer">REFRACTORY ECONOMICS BY APPLICATION CLASS</span>
          </h1>
          <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
            Six refractory application classes covering steel, foundry, cement, power,
            aluminium and glass. For each, this is the typical baseline, common failure
            modes, recommended specification, and the{' '}
            <span className="font-semibold text-white">
              expected outcome range with 2026 Indian-market pricing economics
            </span>
            . Use them to shortlist a specification before talking to our engineering team.
          </p>
        </div>
      </section>

      {/* ── DISCLAIMER BANNER ──────────────────────────────────────── */}
      <section className="bg-amber-50 border-y border-amber-200" aria-label="Editorial framing">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start gap-3">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            !
          </span>
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Note on framing:</strong> These are illustrative engineering reference
            scenarios for typical application classes, they are{' '}
            <strong>not records of specific SAPL project deliveries</strong>. The scenarios
            describe baseline conditions, common failure modes and expected outcome ranges
            drawn from May 2026 Indian market data and standard industry practice. Real
            customer case studies will be published separately as signed permissions are
            obtained. Contact our engineering team for project-specific specifications.
          </p>
        </div>
      </section>

      {/* ── LISTING ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-7">
            {scenarios.map((s) => (
              <article
                key={s.slug}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#F97316]/50 hover:shadow-lg transition-all overflow-hidden"
              >
                <Link href={`/engineering-references/${s.slug}`} className="block p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#F97316] text-[11px] font-bold uppercase tracking-widest">
                      {s.industry}
                    </span>
                    <span className="text-xs text-gray-400">
                      · {s.readingTime || 5} min read
                    </span>
                  </div>

                  <h2 className="font-oswald text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-3 group-hover:text-[#1E40AF] transition-colors">
                    {s.title}
                  </h2>

                  <p className="text-gray-500 text-sm mb-4 italic">{s.client}</p>

                  {s.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-gray-100">
                      {Object.entries(s.metrics)
                        .slice(0, 4)
                        .map(([k, v]) => (
                          <div key={k} className="text-xs">
                            <p className="text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
                              {k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}
                            </p>
                            <p className="font-bold text-[#1E3A5F]">{v}</p>
                          </div>
                        ))}
                    </div>
                  )}

                  {s.keyTakeaway && (
                    <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-[#F97316] pl-4 mb-4">
                      {s.keyTakeaway}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Recommended brand:{' '}
                      <span className="font-semibold text-[#1E3A5F]">{s.brand}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#F97316] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read full reference →
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
              type, current campaign life and failure mode, we&apos;ll come back with a
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

export const dynamic = 'force-static';
