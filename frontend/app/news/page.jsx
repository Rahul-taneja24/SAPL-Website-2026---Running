import Link from 'next/link';
import { Clock, ArrowRight, ChevronRight, Newspaper, TrendingUp } from 'lucide-react';
import { NEWS_ARTICLES } from '@/data/newsData';

export const metadata = {
  title: { absolute: 'Industry News & Analysis | Shanker Agencies' },
  description:
    'Fresh, cited analysis of refractory, steel, cement and raw-material developments, and what they mean for industrial buyers, procurement and furnace linings.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'Industry News & Analysis | Shanker Agencies',
    description:
      'Refractory and raw-material news, analysed for plant managers and procurement teams.',
    url: 'https://www.shankeragencies.com/news',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Industry News' }],
  },
};

const CATEGORY_COLORS = {
  'Raw Materials': 'text-amber-600',
  Policy: 'text-purple-600',
  Steel: 'text-blue-700',
  Cement: 'text-stone-600',
  Energy: 'text-green-700',
  Technology: 'text-cyan-700',
  Markets: 'text-rose-600',
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsIndexPage() {
  const articles = [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );
  const [lead, ...rest] = articles;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.shankeragencies.com/news',
    name: 'Shanker Agencies Industry News & Analysis',
    description:
      'Cited analysis of refractory, steel, cement and raw-material developments for industrial buyers.',
    isPartOf: { '@type': 'WebSite', '@id': 'https://www.shankeragencies.com/#website' },
    hasPart: articles.map((a) => ({
      '@type': 'NewsArticle',
      headline: a.title,
      datePublished: a.publishDate,
      url: `https://www.shankeragencies.com/news/${a.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'News', item: 'https://www.shankeragencies.com/news' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── MASTHEAD ── */}
      <section className="bg-[#0B1628] border-b-4 border-[#F97316]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/70">News</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F97316]" />
                </span>
                <span className="text-[#F97316] text-xs font-bold tracking-[0.25em] uppercase">SAPL Newsroom</span>
              </div>
              <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight uppercase">
                Industry News <span className="text-[#F97316]">&amp;</span> Analysis
              </h1>
            </div>
            <p className="text-white/50 text-sm max-w-md leading-relaxed">
              Steel, cement, energy and raw-material developments, read the way a refractory
              engineer reads them. Cited, concise, updated as it happens.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {articles.length === 0 ? (
            <p className="text-gray-500">No news articles yet — check back soon.</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">

              {/* ── LEAD STORY ── */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-[#0B1628]">
                  <TrendingUp className="w-4 h-4 text-[#F97316]" />
                  <span className="font-oswald text-sm font-bold text-[#0B1628] tracking-widest uppercase">Top Story</span>
                </div>
                <article className="group">
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${CATEGORY_COLORS[lead.category] || 'text-[#F97316]'}`}>
                    {lead.category}
                  </p>
                  <h2 className="font-oswald text-2xl sm:text-3xl md:text-[2.6rem] font-bold text-[#0B1628] leading-[1.12] mb-4 group-hover:text-[#F97316] transition-colors">
                    <Link href={`/news/${lead.slug}`}>{lead.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-4 max-w-2xl">{lead.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-5">
                    <time dateTime={lead.publishDate} className="font-semibold text-gray-500">{formatDate(lead.publishDate)}</time>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{lead.readTime} read</span>
                    <span>By SAPL Engineering Desk</span>
                  </div>
                  <Link href={`/news/${lead.slug}`} className="inline-flex items-center gap-2 bg-[#0B1628] hover:bg-[#F97316] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                    Read the full analysis <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>

                {/* ── MORE HEADLINES (newspaper rows) ── */}
                {rest.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-[#0B1628]">
                      <Newspaper className="w-4 h-4 text-[#F97316]" />
                      <span className="font-oswald text-sm font-bold text-[#0B1628] tracking-widest uppercase">Latest Headlines</span>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {rest.map((a) => (
                        <article key={a.slug} className="group py-5">
                          <div className="flex items-baseline justify-between gap-4 mb-1.5">
                            <p className={`text-[11px] font-bold tracking-[0.2em] uppercase ${CATEGORY_COLORS[a.category] || 'text-[#F97316]'}`}>
                              {a.category}
                            </p>
                            <time dateTime={a.publishDate} className="text-xs text-gray-400 whitespace-nowrap">{formatDate(a.publishDate)}</time>
                          </div>
                          <h3 className="font-oswald text-lg md:text-xl font-bold text-[#0B1628] leading-snug mb-1.5 group-hover:text-[#F97316] transition-colors">
                            <Link href={`/news/${a.slug}`}>{a.title}</Link>
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 max-w-2xl">{a.excerpt}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── SIDEBAR ── */}
              <aside className="lg:col-span-1 space-y-8">
                <div className="border-t-2 border-[#0B1628] pt-4">
                  <h3 className="font-oswald text-sm font-bold text-[#0B1628] tracking-widest uppercase mb-4">In Brief</h3>
                  <div className="space-y-4">
                    {articles.slice(0, 4).map((a, i) => (
                      <Link key={a.slug} href={`/news/${a.slug}`} className="group flex gap-3 items-start">
                        <span className="font-oswald text-2xl font-bold text-gray-200 leading-none group-hover:text-[#F97316] transition-colors">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-sm font-semibold text-[#0B1628] leading-snug group-hover:text-[#F97316] transition-colors line-clamp-3">{a.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0B1628] rounded-xl p-6 text-white">
                  <h3 className="font-oswald text-lg font-bold mb-2">Why we publish this</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    SAPL has supplied refractories to Indian industry since 1980. This desk tracks
                    the news that changes what plants buy, when they reline, and what it costs.
                  </p>
                  <Link href="/rfq" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                    Request a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="border-t-2 border-[#0B1628] pt-4">
                  <h3 className="font-oswald text-sm font-bold text-[#0B1628] tracking-widest uppercase mb-3">Deep Dives</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    Evergreen engineering guides live in the Knowledge Base.
                  </p>
                  <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#3B82F6] text-sm font-medium hover:gap-2.5 transition-all">
                    Browse technical guides <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
