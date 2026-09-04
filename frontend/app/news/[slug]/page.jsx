import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar, Clock, Tag, ArrowRight, ChevronRight,
  Phone, MessageCircle, Newspaper, ArrowLeft, ExternalLink,
} from 'lucide-react';
import { NEWS_ARTICLES } from '@/data/newsData';

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    keywords: article.tags,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.shankeragencies.com/news/${article.slug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.lastModified || article.publishDate,
      authors: ['Shanker Agencies Engineering Team'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

function getRelatedNews(article, limit = 3) {
  return NEWS_ARTICLES.filter(
    (a) => a.slug !== article.slug &&
      (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
  ).slice(0, limit);
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = getRelatedNews(article);
  const fallback = NEWS_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const sidebarNews = related.length > 0 ? related : fallback;

  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.lastModified || article.publishDate,
    // image is a required field for Google's Article/NewsArticle rich result;
    // fall back to the site OG image when an article has no coverImage yet
    // (all 3 seed articles currently don't), matching the pattern already
    // used on /engineering-references.
    image: article.coverImage || 'https://www.shankeragencies.com/opengraph-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Shanker Agencies Engineering Team',
      url: 'https://www.shankeragencies.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shanker Agencies Pvt. Ltd.',
      logo: { '@type': 'ImageObject', url: 'https://www.shankeragencies.com/images/sapl-logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.shankeragencies.com/news/${article.slug}` },
    articleSection: article.category,
    keywords: article.tags.join(', '),
    // CreativeWork.publisher must be an Organization/Person object, not a
    // plain string, same class of type-mismatch bug as Brand.parentOrganization
    // found earlier — s.publisher is a bare string in the sources data.
    ...(article.sources?.length
      ? { citation: article.sources.map((s) => ({
          '@type': 'CreativeWork',
          name: s.title,
          url: s.url,
          ...(s.publisher ? { publisher: { '@type': 'Organization', name: s.publisher } } : {}),
        })) }
      : {}),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: 'article h2, article h3' },
    isAccessibleForFree: true,
    inLanguage: 'en-IN',
  };

  const faqSchema = article.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q || f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.a || f.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'News', item: 'https://www.shankeragencies.com/news' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.shankeragencies.com/news/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* HERO -- same coverImage-as-background treatment as the blog article
          template (app/blog/[articleSlug]/page.jsx), for consistency across
          the two article-style templates. Falls back to the plain gradient
          when an article has no coverImage yet. */}
      <section
        className="relative py-16 md:py-24 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: article.coverImage
            ? `linear-gradient(135deg, rgba(30,58,95,0.94) 0%, rgba(30,64,175,0.88) 100%), url('${article.coverImage}')`
            : 'linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/news" className="hover:text-white transition-colors">News</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80 line-clamp-1">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full border border-[#F97316]/30 uppercase tracking-wide">
              <Newspaper className="w-3.5 h-3.5" />{article.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock className="w-4 h-4" />{article.readTime}
            </span>
          </div>

          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-sm text-white/60 mb-6">By the Shanker Agencies Engineering Team</p>
          <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-3xl line-clamp-2">{article.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full border border-white/15">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
            {article.tags.length > 4 && (
              <span className="inline-flex items-center bg-white/5 text-white/50 text-xs px-3 py-1 rounded-full border border-white/10">
                +{article.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

            {/* min-w-0: see the blog article template — keeps wide content
                (data tables) from widening this grid track on mobile. */}
            <article className="lg:col-span-2 min-w-0">
              {article.keyTakeaways?.length > 0 && (
                <div className="mb-10 rounded-2xl bg-[#EFF6FF] border border-[#3B82F6]/20 p-6">
                  <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4 mt-0">Key Takeaways</h2>
                  <ul className="space-y-2 mb-0">
                    {article.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#3B82F6] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-oswald prose-headings:text-[#1E3A5F] prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-[#F97316] prose-h2:pl-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-[#1E3A5F] prose-strong:font-semibold
                  prose-ul:space-y-1 prose-li:text-gray-700
                  prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Sources */}
              {article.sources?.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4 border-l-4 border-[#F97316] pl-4">Sources</h2>
                  <ul className="space-y-2">
                    {article.sources.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline">
                          {s.title}
                        </a>
                        {s.publisher && <span className="text-gray-400">— {s.publisher}{s.date ? `, ${s.date}` : ''}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-[#F97316]/20 shadow-sm">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] p-6 text-white">
                  <h3 className="font-oswald text-xl font-bold mb-1">Planning Around Raw-Material Swings?</h3>
                  <p className="text-white/80 text-sm">45+ years of refractory sourcing · Authorized CUMI, Crown Ceramics &amp; Divine Cerawool dealer</p>
                </div>
                <div className="bg-white p-6">
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    Our engineers can review how a development like this affects your specific furnace and lining plan, and recommend a sourcing approach — no obligation.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                      <Phone className="w-4 h-4" /> Speak to an Engineer
                    </Link>
                    <a href="https://wa.me/919899957888" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              {article.faqs?.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-6 border-l-4 border-[#F97316] pl-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, i) => (
                      <details key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden" {...(i === 0 ? { open: true } : {})}>
                        <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <ChevronRight className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                          <h3 className="font-oswald text-base font-semibold text-[#1E3A5F]">{faq.q || faq.question}</h3>
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="text-gray-600 text-sm leading-relaxed ml-8">{faq.a || faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-500">Filed under:</span>
                {article.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/news" className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#1E40AF] font-medium text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to all news
                </Link>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-[#1E3A5F] rounded-2xl p-6 text-white sticky top-24">
                <h3 className="font-oswald text-lg font-bold mb-3">About Shanker Agencies</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  India&apos;s premier refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics &amp; Divine Cerawool. Exporting to 50+ countries.
                </p>
                <div className="space-y-2.5">
                  <Link href="/rfq" className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors w-full justify-center">
                    <Phone className="w-4 h-4" /> Request a Quote
                  </Link>
                  <Link href="/products" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors w-full justify-center">
                    Browse Products
                  </Link>
                </div>
              </div>

              {article.relatedProducts?.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-oswald text-base font-bold text-[#1E3A5F] mb-4">Related Products</h3>
                  <div className="space-y-2">
                    {article.relatedProducts.map(({ label, href }) => (
                      <Link key={href} href={href} className="flex items-center gap-2 text-gray-600 hover:text-[#F97316] text-sm py-1.5 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />{label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {sidebarNews.length > 0 && (
                <div>
                  <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-5 border-l-4 border-[#F97316] pl-4">More News</h3>
                  <div className="space-y-4">
                    {sidebarNews.map((r) => (
                      <Link key={r.slug} href={`/news/${r.slug}`}
                        className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-sm bg-white transition-all">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center">
                          <Newspaper className="w-6 h-6 text-white/70" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[#1E3A5F] font-semibold text-sm leading-snug group-hover:text-[#F97316] transition-colors line-clamp-2">{r.title}</p>
                          <p className="text-gray-400 text-xs mt-1">{r.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/news" className="inline-flex items-center gap-1.5 text-[#3B82F6] text-sm font-medium mt-5 hover:gap-2.5 transition-all">
                    View all news <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
