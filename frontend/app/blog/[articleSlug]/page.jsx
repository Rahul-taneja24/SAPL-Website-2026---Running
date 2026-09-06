import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar, Clock, Tag, ArrowRight, ChevronRight,
  Phone, MessageCircle, BookOpen, ArrowLeft
} from 'lucide-react';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';
import { isPublished, publishedOnly, REVALIDATE_SECONDS } from '@/lib/scheduling';

// Re-check scheduled posts hourly so one flips from hidden to live on its own
// once its publishDate arrives, without needing a fresh deploy.
export const revalidate = REVALIDATE_SECONDS;

// ─── Static params for SSG ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return publishedOnly(BLOG_POSTS_DATA).map((post) => ({ articleSlug: post.slug }));
}

// ─── Per-page metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { articleSlug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === articleSlug);
  if (!post || !isPublished(post.publishDate)) return { title: 'Article Not Found' };
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.shankeragencies.com/blog/${post.slug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified || post.publishDate,
      authors: [post.author?.name ? `${post.author.name}, Shanker Agencies` : 'Shanker Agencies Engineering Team'],
      tags: post.tags,
      images: [{ url: post.coverImage || '/opengraph-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
  };
}

function getRelatedPosts(post, limit = 3, sourcePosts = BLOG_POSTS_DATA) {
  const pool = sourcePosts.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  );
  if (pool.length <= limit) return pool;
  // Rotate the window by this post's own index rather than always taking the
  // first `limit` matches. A plain slice(0, limit) returns the same earliest
  // posts on every page (the pool is in id order, oldest first), so posts added
  // later never surface in any sidebar and receive no internal links at all.
  // Same failure mode that was fixed in getRelatedLocations().
  const start = BLOG_POSTS_DATA.findIndex((p) => p.slug === post.slug) % pool.length;
  return Array.from({ length: limit }, (_, i) => pool[(start + i) % pool.length]);
}

export default async function BlogArticlePage({ params }) {
  const { articleSlug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === articleSlug);
  if (!post || !isPublished(post.publishDate)) notFound();

  const livePosts = publishedOnly(BLOG_POSTS_DATA);
  const relatedPosts = getRelatedPosts(post, 3, livePosts);
  const fallbackPosts = livePosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const sidebarPosts = relatedPosts.length > 0 ? relatedPosts : fallbackPosts;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.lastModified || post.publishDate,
    image: post.coverImage || 'https://www.shankeragencies.com/opengraph-image.jpg',
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Shanker Agencies Engineering Team',
      jobTitle: 'Refractory Engineer',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.shankeragencies.com/#organization',
        name: 'Shanker Agencies Private Limited',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shanker Agencies Pvt. Ltd.',
      logo: { '@type': 'ImageObject', url: 'https://www.shankeragencies.com/images/sapl-logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.shankeragencies.com/blog/${post.slug}` },
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.shankeragencies.com/blog',
      name: 'SAPL Refractory Engineering Knowledge Base',
      url: 'https://www.shankeragencies.com/blog',
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    about: {
      '@type': 'Thing',
      name: 'Refractory Engineering',
      sameAs: 'https://en.wikipedia.org/wiki/Refractory',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: 'article h2, article h3, blockquote',
    },
    isAccessibleForFree: true,
    inLanguage: 'en-IN',
  };

  const faqSchema = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q || f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.a || f.answer },
        })),
      }
    : null;

  const howToSchema = post.howToSteps?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.metaDescription,
        step: post.howToSteps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.shankeragencies.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.shankeragencies.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}

      {/* HERO -- coverImage as a background photo behind the navy gradient,
          matching the hero treatment on /blog, /knowledge and /solutions
          (see src/sections/Blog.jsx, KnowledgeBase.jsx, IndustrySolutions.jsx).
          Falls back to the plain gradient if a post has no coverImage.
          Gradient stops are #1E3A5F -> #1E40AF -- the same navy pair as the
          site's actual top contact bar (src/components/Navbar.jsx,
          `from-[#1E3A5F] to-[#1E40AF]`) and heading/table-header color
          (#1E3A5F), not the older bespoke rgba(15,30,70)/rgba(30,58,138)
          values this section used to carry, which were a close but
          non-identical navy. */}
      <section
        className="relative py-16 md:py-24 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: post.coverImage
            ? `linear-gradient(135deg, rgba(30,58,95,0.94) 0%, rgba(30,64,175,0.88) 100%), url('${post.coverImage}')`
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full border border-[#F97316]/30 uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          {post.author?.name && (
            <p className="text-sm text-white/60 mb-6">
              By <span className="font-semibold text-white/80">{post.author.name}</span>, Shanker Agencies
            </p>
          )}
          {/* line-clamp-2 keeps hero height roughly consistent across posts --
              excerpts range from one short sentence to two long ones, and an
              unclamped excerpt made some heroes noticeably taller than others. */}
          <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-3xl line-clamp-2">{post.excerpt}</p>

          {/* Capped at 4 tags for the same reason -- posts carry 4 to 8 tags,
              and showing all of them let the pill row wrap to a second or
              third line on tag-heavy posts. Full tag list is still shown in
              the "Filed under" footer further down the page. */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full border border-white/15">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="inline-flex items-center bg-white/5 text-white/50 text-xs px-3 py-1 rounded-full border border-white/10">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

            {/* ARTICLE */}
            {/* min-w-0: grid items default to min-width:auto, which lets wide
                article content (data tables) stretch this track past the
                viewport and scroll the whole page sideways on mobile. */}
            <article className="lg:col-span-2 min-w-0">
              {/* coverImage now renders as the hero background above, so it
                  isn't repeated here as a second boxed copy. */}
              {post.keyTakeaways?.length > 0 && (
                <div className="mb-10 rounded-2xl bg-[#EFF6FF] border border-[#3B82F6]/20 p-6">
                  <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4 mt-0">Key Takeaways</h2>
                  <ul className="space-y-2 mb-0">
                    {post.keyTakeaways.map((point, i) => (
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
                  prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-[#1E3A5F] prose-strong:font-semibold
                  prose-ul:space-y-1 prose-li:text-gray-700
                  prose-table:text-sm prose-table:w-full prose-table:border-collapse
                  prose-th:bg-[#1E3A5F] prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:p-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
                  prose-tr:even:prose-td:bg-gray-50
                  prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#F97316] prose-blockquote:bg-orange-50 prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-code:bg-gray-100 prose-code:text-[#1E3A5F] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-[#F97316]/20 shadow-sm">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] p-6 text-white">
                  <h3 className="font-oswald text-xl font-bold mb-1">Need Expert Refractory Advice?</h3>
                  <p className="text-white/80 text-sm">45+ years of expertise · Authorized CUMI, Crown Ceramics &amp; Divine Cerawool dealer</p>
                </div>
                <div className="bg-white p-6">
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    Have questions about the topics in this article? Our refractory engineers review your specific application and recommend the right solution, no obligation.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                      <Phone className="w-4 h-4" /> Speak to an Engineer
                    </Link>
                    <a href="https://wa.me/919899957888" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Us
                    </a>
                    <Link href="/products" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-[#3B82F6] text-gray-600 hover:text-[#3B82F6] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                      Browse Products <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* FAQ section */}
              {post.faqs?.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-6 border-l-4 border-[#F97316] pl-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, i) => (
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

              {/* Tags footer */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-500">Filed under:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#1E40AF] font-medium text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 space-y-8">
              {/* About box */}
              <div className="bg-[#1E3A5F] rounded-2xl p-6 text-white sticky top-24">
                <h3 className="font-oswald text-lg font-bold mb-3">About Shanker Agencies</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  India&apos;s premier refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics &amp; Divine Cerawool. Exporting to 50+ countries.
                </p>
                <div className="space-y-2.5">
                  <Link href="/contact" className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors w-full justify-center">
                    <Phone className="w-4 h-4" /> Get a Quote
                  </Link>
                  <Link href="/products" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors w-full justify-center">
                    Browse Products
                  </Link>
                </div>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-5 border-l-4 border-[#F97316] pl-4">Related Articles</h3>
                <div className="space-y-4">
                  {sidebarPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}
                      className="group flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-sm bg-white transition-all">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center">
                        {related.coverImage
                          ? <img src={related.coverImage} alt={related.title} className="w-full h-full object-cover" loading="lazy" />
                          : <BookOpen className="w-6 h-6 text-white/70" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[#1E3A5F] font-semibold text-sm leading-snug group-hover:text-[#F97316] transition-colors line-clamp-2">{related.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{related.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#3B82F6] text-sm font-medium mt-5 hover:gap-2.5 transition-all">
                  View all articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick product links */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-oswald text-base font-bold text-[#1E3A5F] mb-4">Explore Products</h3>
                <div className="space-y-2">
                  {[
                    { label: 'High Alumina Bricks', href: '/products/shaped-refractories/high-alumina-bricks' },
                    { label: 'LCC / ULCC Castables', href: '/products/unshaped-refractories/low-cement-castables' },
                    { label: 'Ceramic Fiber Blankets', href: '/products/insulation/ceramic-fiber-products' },
                    { label: 'Ramming Mass', href: '/products/unshaped-refractories/ramming-masses' },
                    { label: 'Slide Gate Plates', href: '/products/flow-control/slide-gate-plates' },
                    { label: 'Acid Proof Bricks', href: '/products/acid-proofing/acid-proof-bricks' },
                    { label: 'MgO-C Bricks', href: '/products' },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href} className="flex items-center gap-2 text-gray-600 hover:text-[#F97316] text-sm py-1.5 transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />{label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
