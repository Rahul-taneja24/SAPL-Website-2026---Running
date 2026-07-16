import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, ChevronRight, Newspaper } from 'lucide-react';
import { NEWS_ARTICLES } from '@/data/newsData';

export const metadata = {
  title: { absolute: 'Industry News & Analysis | Shanker Agencies' },
  description:
    'Fresh, cited analysis of refractory, steel, cement and raw-material developments — and what they mean for industrial buyers, procurement and furnace linings.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'Industry News & Analysis | Shanker Agencies',
    description:
      'Refractory and raw-material news, analysed for plant managers and procurement teams.',
    url: 'https://www.shankeragencies.com/news',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function NewsIndexPage() {
  const articles = [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

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

      {/* HERO */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80">News</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full border border-[#F97316]/30 uppercase tracking-wide mb-5">
            <Newspaper className="w-3.5 h-3.5" /> Industry News &amp; Analysis
          </span>
          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Refractory &amp; Raw-Material News, Read Like an Engineer
          </h1>
          <p className="text-lg text-white/75 leading-relaxed max-w-3xl">
            What steel, cement, energy and raw-material developments actually mean for industrial
            plants, procurement teams and furnace linings — cited, concise, and free of hype.
          </p>
        </div>
      </section>

      {/* LIST */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {articles.length === 0 ? (
            <p className="text-gray-500">No news articles yet — check back soon.</p>
          ) : (
            <div className="space-y-6">
              {articles.map((a) => (
                <article key={a.slug} className="group rounded-2xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-sm bg-white transition-all p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#1E40AF] text-xs font-bold px-3 py-1 rounded-full border border-[#3B82F6]/20 uppercase tracking-wide">
                      {a.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(a.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />{a.readTime}
                    </span>
                  </div>
                  <h2 className="font-oswald text-xl md:text-2xl font-bold text-[#1E3A5F] leading-snug mb-2 group-hover:text-[#F97316] transition-colors">
                    <Link href={`/news/${a.slug}`}>{a.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {a.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                          <Tag className="w-3 h-3" />{tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/news/${a.slug}`} className="inline-flex items-center gap-1.5 text-[#3B82F6] text-sm font-medium hover:gap-2.5 transition-all">
                      Read analysis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
