// /engineering-references/[slug], Individual Engineering Reference Scenario.
//
// EDITORIAL FRAMING, IMPORTANT:
//   These pages are illustrative reference scenarios for typical application
//   classes. They are NOT records of specific SAPL project deliveries. Schema
//   type is `TechArticle` to make this explicit to AI engines.
//
// Schema strategy:
//   1. TechArticle, technical reference content (NOT Article, which implies
//      authored journalism on a specific event).
//   2. mentions, every brand, product and industry the scenario touches, so
//      AI engines can build the multi-entity graph.
//   3. publisher = SAPL Organization (no individual author byline, these are
//      not signed-off project records).
//   4. Speakable, voice assistants get the headline + key takeaway.

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
      title: 'Engineering Reference Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: cs.title,
    description: `${cs.keyTakeaway || cs.problem.slice(0, 150)}, ${cs.industry} application reference scenario from Shanker Agencies. Illustrative, not a record of a specific SAPL project.`,
    alternates: { canonical: `/engineering-references/${slug}` },
    openGraph: {
      title: cs.title,
      description: cs.keyTakeaway,
      url: `${BASE}/engineering-references/${slug}`,
      type: 'article',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: cs.title }],
    },
  };
}

export default async function EngineeringReferencePage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const url = `${BASE}/engineering-references/${slug}`;
  const dateModified = new Date('2026-05-08T00:00:00.000Z').toISOString();

  // ─── TechArticle schema ──────────────────────────────────────────────
  // Using TechArticle (not Article), this is reference material describing a
  // typical application class, not authored journalism about a specific event
  // or project. The publisher is the SAPL Organization; no Person author
  // byline (these are not signed-off case studies).
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}#reference`,
    headline: cs.title,
    name: cs.title,
    url,
    dateModified,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    author: { '@id': `${BASE}/#organization` },
    description: cs.keyTakeaway || cs.problem.slice(0, 200),
    articleSection: `${cs.industry}, Refractory Application Reference`,
    proficiencyLevel: 'Expert',
    keywords: [
      cs.industry,
      cs.brand,
      ...(cs.products || []).map((p) => p.name),
      'refractory engineering reference',
      'application scenario',
      'expected outcome range',
    ].join(', '),
    mentions: [
      {
        '@type': 'Thing',
        name: `${cs.industry} industry refractories`,
        url: `${BASE}/industries/${cs.industrySlug}`,
      },
      { '@type': 'Brand', name: cs.brand },
      ...(cs.products || []).map((p) => ({
        '@type': 'Product',
        name: p.name,
        url: p.productPath ? `${BASE}${p.productPath}` : undefined,
      })),
    ].filter(Boolean),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: '[data-speakable="true"], h1, h2',
    },
    about: [{ '@type': 'Organization', '@id': `${BASE}/#organization` }],
    // Explicit disclosure inside the schema itself, so AI engines reading the
    // structured data understand the framing.
    disambiguatingDescription:
      'Illustrative reference scenario for a typical application class. Not a record of a specific SAPL project delivery. Outcome ranges based on May 2026 Indian market data and standard industry practice.',
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
      { '@type': 'ListItem', position: 3, name: cs.title, item: url },
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

      {/* ── DISCLAIMER BANNER (above the fold) ──────────────────────── */}
      <section
        className="bg-amber-50 border-b border-amber-200"
        aria-label="Editorial framing"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-start gap-3">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            !
          </span>
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Engineering reference scenario, not a project record.</strong> This
            page describes a typical application class and the expected outcome range
            from correctly specified refractory. It is{' '}
            <strong>not a record of a specific SAPL project delivery</strong>. Real
            customer case studies will be published separately as signed permissions are
            obtained. Contact our engineering team for project-specific specifications.
          </p>
        </div>
      </section>

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
            <Link href="/engineering-references" className="hover:text-white">
              Engineering References
            </Link>{' '}
            › <span className="text-white/70">{cs.industry}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium tracking-widest uppercase mb-5">
            {cs.industry} · Reference Scenario · {cs.readingTime || 5} min read
          </span>
          <h1
            className="font-oswald text-3xl md:text-5xl font-bold text-white leading-tight mb-5"
            data-speakable="true"
          >
            {cs.title}
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">{cs.client}</p>
          <p className="text-blue-100 text-base leading-relaxed mt-2">
            <span className="font-semibold text-white">Recommended brand class:</span>{' '}
            {cs.brand}
          </p>
        </div>
      </section>

      {/* ── HEADLINE METRICS BAND ───────────────────────────────────── */}
      {cs.metrics && (
        <section
          className="py-10 px-4 bg-[#F97316]"
          aria-label="Expected outcome ranges"
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-white/90 text-center text-xs font-bold uppercase tracking-widest mb-6">
              Expected outcome ranges (illustrative, not project results)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Object.entries(cs.metrics).map(([k, v]) => (
                <div key={k} className="text-center">
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}
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
              Typical Baseline
            </h2>
            <p className="text-gray-700 leading-relaxed">{cs.problem}</p>
          </section>

          {/* Diagnosis */}
          {cs.diagnosis?.length > 0 && (
            <section className="mb-10">
              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4 border-l-4 border-[#3B82F6] pl-4">
                Diagnostic Pattern
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
                Recommended Specification
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
                Installation Best-Practice
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

          {/* Result, reframed as Expected Outcome Range */}
          {cs.result?.length > 0 && (
            <section className="mb-10 bg-green-50 border border-green-100 rounded-2xl p-7">
              <h2 className="font-oswald text-2xl font-bold text-green-900 mb-2">
                Expected Outcome Range
              </h2>
              <p className="text-xs text-green-800 italic mb-4">
                Illustrative, not project results. Actual outcomes vary with operating
                conditions and installation quality.
              </p>
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
                Products Referenced in This Scenario
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

          {/* Disclaimer footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500 italic">
            <p>
              This page is an illustrative engineering reference scenario for a typical
              application class, not a record of a specific SAPL project delivery.
              Financial figures (₹ and USD) are typical industry ranges drawn from May
              2026 market data and standard industry practice. USD equivalents calculated
              at ₹94.5 per USD (May 2026 rate). Your specific outcome will vary with
              operating conditions, fuel mix, alloy grade, market pricing and installation
              quality. Contact our engineering team for a project-specific specification
              and indicative pricing.
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
            engineers will come back with a project-specific specification proposal and
            indicative pricing within 4 business hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold transition-colors shadow-xl"
            >
              Talk to a Refractory Engineer →
            </Link>
            <Link
              href="/engineering-references"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-colors"
            >
              ← Back to All References
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
