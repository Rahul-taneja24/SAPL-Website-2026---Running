// /case-studies/[slug] — Individual case study detail.
//
// Schema strategy:
//   1. Article — the case study itself (problem → result narrative)
//   2. mentions — every brand, product and industry the case study touches.
//      AI engines use `mentions` to crystallise the entity graph: this case
//      study mentions LCC, steel ladles, Calderys, etc. Multi-hop reasoning
//      ("which dealer has Calderys LCC case studies?") becomes possible.
//   3. author + reviewedBy — both reference Rahul Taneja's Person @id, so
//     E-E-A-T points at a single canonical identity site-wide.
//   4. Speakable — voice assistants get the headline + key takeaway.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CASE_STUDIES,
  getCaseStudy,
} from '@/data/caseStudiesData';

const BASE = 'https://www.shankeragencies.com';

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) {
    return {
      title: 'Case Study Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: cs.title,
    description: `${cs.keyTakeaway || cs.problem.slice(0, 150)} — ${cs.brand} on a ${cs.industry.toLowerCase()} application, supplied by Shanker Agencies.`,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: cs.title,
      description: cs.keyTakeaway,
      url: `${BASE}/case-studies/${slug}`,
      type: 'article',
      publishedTime: cs.year ? `${cs.year}-01-01T00:00:00.000Z` : undefined,
      authors: [`${BASE}/about#rahul-taneja`],
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.keyTakeaway,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const url = `${BASE}/case-studies/${slug}`;
  const datePublished = cs.year
    ? `${cs.year}-01-01T00:00:00.000Z`
    : new Date().toISOString();
  const dateModified = new Date('2026-04-01T00:00:00.000Z').toISOString();

  // ─── Article + mentions schema ──────────────────────────────────────────
  // Each product, brand and industry touched by this case study is wired
  // up as a `mentions` reference, so AI engines (and Google) can build the
  // multi-entity graph: this study mentions [LCC product] supplied by
  // [Calderys brand] for a [steel industry] customer.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: cs.title,
    name: cs.title,
    url,
    datePublished,
    dateModified,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    author: { '@id': `${BASE}/about#rahul-taneja` },
    reviewedBy: { '@id': `${BASE}/about#rahul-taneja` },
    description: cs.keyTakeaway || cs.problem.slice(0, 200),
    articleSection: cs.industry,
    keywords: [
      cs.industry,
      cs.brand,
      ...(cs.products || []).map((p) => p.name),
      'refractory case study',
      'plant outcome',
      'campaign life',
    ].join(', '),
    mentions: [
      // Industry mention
      {
        '@type': 'Thing',
        name: `${cs.industry} industry refractories`,
        url: `${BASE}/industries/${cs.industrySlug}`,
      },
      // Brand mention — references the Brand sub-page
      {
        '@type': 'Brand',
        name: cs.brand,
      },
      // Product mentions — each one as a Product reference
      ...(cs.products || []).map((p) => ({
        '@type': 'Product',
        name: p.name,
        url: p.productPath ? `${BASE}${p.productPath}` : undefined,
      })),
    ].filter(Boolean),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="true"]', 'h1', 'h2'],
    },
    about: [
      {
        '@type': 'Organization',
        '@id': `${BASE}/#organization`,
      },
    ],
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
      {
        '@type': 'ListItem',
        position: 3,
        name: cs.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(30,58,95,0.96) 0%, rgba(30,64,175,0.90) 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-blue-200">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            ›{' '}
            <Link href="/case-studies" className="hover:text-white">
              Case Studies
            </Link>{' '}
            › <span className="text-white/70">{cs.industry}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium tracking-widest uppercase mb-5">
            {cs.industry} · {cs.year} · {cs.readingTime || 5} min read
          </span>
          <h1
            className="font-oswald text-3xl md:text-5xl font-bold text-white leading-tight mb-5"
            data-speakable="true"
          >
            {cs.title}
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            <span className="font-semibold text-white">Client:</span> {cs.client}
          </p>
          <p className="text-blue-100 text-lg leading-relaxed">
            <span className="font-semibold text-white">Brand:</span> {cs.brand}
          </p>
        </div>
      </section>

      {/* ── HEADLINE METRICS BAND ───────────────────────────────────── */}
      {cs.metrics && (
        <section className="py-10 px-4 bg-[#F97316]" aria-label="Key outcome metrics">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Object.entries(cs.metrics).map(([k, v]) => (
                <div key={k} className="text-center">
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                  </p>
                  <p
                    className="font-oswald text-2xl md:text-3xl font-bold text-white leading-tight"
                    data-speakable="true"
                  >
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <article className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
          {/* Problem */}
          <section className="mb-10">
            <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4 border-l-4 border-[#F97316] pl-4">
              The Problem
            </h2>
            <p className="text-gray-700 leading-relaxed">{cs.problem}</p>
          </section>

          {/* Diagnosis */}
          {cs.diagnosis?.length > 0 && (
            <section className="mb-10">
              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4 border-l-4 border-[#3B82F6] pl-4">
                Diagnosis
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                {cs.diagnosis.map((d, i) => (
                  <li key={i} className="text-gray-700 leading-relaxed">
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Specification */}
          {cs.specification?.length > 0 && (
            <section className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl p-7">
              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4">
                Specification (As Supplied)
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                {cs.specification.map((s, i) => (
                  <li key={i} className="text-gray-800 leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Installation */}
          {cs.installation?.length > 0 && (
            <section className="mb-10">
              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4 border-l-4 border-amber-500 pl-4">
                Installation Notes
              </h2>
              <ol className="space-y-3 list-decimal pl-5">
                {cs.installation.map((step, i) => (
                  <li key={i} className="text-gray-700 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Result */}
          {cs.result?.length > 0 && (
            <section className="mb-10 bg-green-50 border border-green-100 rounded-2xl p-7">
              <h2 className="font-oswald text-2xl font-bold text-green-900 mb-4">
                Result
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                {cs.result.map((r, i) => (
                  <li
                    key={i}
                    className="text-gray-800 leading-relaxed font-medium"
                    data-speakable={i === 0 ? 'true' : undefined}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key Takeaway */}
          {cs.keyTakeaway && (
            <section className="mb-10 border-l-4 border-[#F97316] pl-6 py-2">
              <p
                className="text-xl text-[#1E3A5F] font-semibold leading-snug italic"
                data-speakable="true"
              >
                &ldquo;{cs.keyTakeaway}&rdquo;
              </p>
            </section>
          )}

          {/* Products mentioned */}
          {cs.products?.length > 0 && (
            <section className="mb-10">
              <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4">
                Products Used in This Case
              </h2>
              <div className="flex flex-wrap gap-3">
                {cs.products.map((p) => (
                  <Link
                    key={p.name}
                    href={p.productPath || '/products'}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 hover:border-[#F97316] rounded-xl text-sm font-bold text-[#1E3A5F] hover:text-[#F97316] transition-all"
                  >
                    {p.name} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Author byline + reviewed-by */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Reviewed by{' '}
              <Link
                href="/about#leadership"
                rel="author"
                className="font-semibold text-[#1E3A5F] underline decoration-[#F97316]/40 underline-offset-2 hover:decoration-[#F97316]"
              >
                Rahul Taneja, Director &amp; Refractory Engineering Expert
              </Link>{' '}
              · Last reviewed: April 2026
            </p>
            <p className="mt-2 text-xs italic">
              Client name anonymised on request. Financial figures (₹ and USD) shown are
              typical industry ranges drawn from May 2026 market data and comparable plant
              installations — your specific outcome will vary with operating conditions,
              fuel mix, alloy grade, market pricing and installation quality. USD
              equivalents calculated at ₹94.5 per USD (May 2026 rate). Contact our
              engineering team for a project-specific specification and indicative
              pricing.
            </p>
          </footer>
        </div>
      </article>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
            FACING A SIMILAR REFRACTORY PROBLEM?
          </h2>
          <p className="text-blue-100 mb-8 text-base leading-relaxed">
            Send us your furnace type, current campaign life, and failure mode. Our
            engineers will come back with a specification proposal and indicative
            pricing within 4 business hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold transition-colors shadow-xl"
            >
              Talk to a Refractory Engineer →
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-colors"
            >
              ← Back to All Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
