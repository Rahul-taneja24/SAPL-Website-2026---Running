import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';

export const metadata = {
  title: 'Refractory Engineering Blog | Shanker Agencies',
  description: 'Technical guides on refractory selection, installation and performance. High alumina bricks, castables, ramming mass, ceramic fiber, steel ladle and kiln linings.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Refractory Engineering Blog | Shanker Agencies',
    description: 'Technical guides on refractory selection, installation and performance. High alumina bricks, castables, ramming mass, ceramic fiber, steel ladle and kiln linings.',
    url: 'https://www.shankeragencies.com/blog',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies Refractory Blog' }],
  },
};

const CATEGORIES = ['All', 'Technical Guide', 'How-To Guide', 'Comparison Guide', 'Industry Guide', 'Buyer Guide'];

const categoryColor = (cat) => ({
  'Technical Guide':  'bg-blue-50 text-blue-700',
  'How-To Guide':     'bg-green-50 text-green-700',
  'Comparison Guide': 'bg-purple-50 text-purple-700',
  'Industry Guide':   'bg-orange-50 text-orange-700',
  'Buyer Guide':      'bg-teal-50 text-teal-700',
})[cat] || 'bg-gray-100 text-gray-600';

function PostCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group bg-white rounded-2xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-lg transition-all overflow-hidden flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      {/* Image */}
      <div className={`overflow-hidden bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex-shrink-0 ${
        featured ? 'md:w-96 h-56 md:h-auto' : 'h-48'
      }`}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category + time */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor(post.category)}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h2 className={`font-oswald font-bold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors leading-tight mb-3 ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-[#F97316] text-sm font-semibold group-hover:gap-2.5 transition-all">
          Read Article <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const featuredPost = BLOG_POSTS_DATA.find((p) => p.featured);
  const otherPosts = BLOG_POSTS_DATA.filter((p) => !p.featured);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.shankeragencies.com/blog/#webpage',
    name: 'Refractory Engineering Blog | Shanker Agencies',
    url: 'https://www.shankeragencies.com/blog',
    isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
    about: { '@id': 'https://www.shankeragencies.com/#organization' },
    inLanguage: 'en-IN',
    description: 'Technical guides and industry insights on refractory engineering from Shanker Agencies, 45+ years of expertise.',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.shankeragencies.com/blog' },
    ],
  };

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Shanker Agencies Refractory Engineering Blog',
    url: 'https://www.shankeragencies.com/blog',
    description: 'Technical guides and industry insights on refractory engineering from Shanker Agencies.',
    blogPost: BLOG_POSTS_DATA.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://www.shankeragencies.com/blog/${post.slug}`,
      datePublished: post.publishDate,
      description: post.excerpt,
      keywords: post.tags.join(', '),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      {/* HERO */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Blog</span>
          </nav>

          <span className="inline-flex items-center gap-2 bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-3 py-1.5 rounded-full border border-[#F97316]/30 uppercase tracking-wide mb-6">
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Centre
          </span>

          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            Refractory Engineering Knowledge Base
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed mb-8">
            Technical guides, comparison articles, and industry insights from SAPL&apos;s engineers
            45+ years of refractory expertise, shared freely. Transparent knowledge for better industrial decisions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: `${BLOG_POSTS_DATA.length}+`, label: 'Technical Articles' },
              { value: '45+', label: 'Years of Expertise' },
              { value: '6+', label: 'Industries Covered' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-oswald text-2xl font-bold text-[#F97316]">{value}</span>
                <span className="text-white/60 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#1E3A5F] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-[#1E3A5F] font-medium">Blog</li>
          </ol>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Featured post */}
          {featuredPost && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-[#F97316] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Featured Article
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <PostCard post={featuredPost} featured />
            </div>
          )}

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* All posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-16 rounded-2xl p-8 md:p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)' }}
          >
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-white mb-3">
              Have a Specific Refractory Question?
            </h2>
            <p className="text-white/75 text-base mb-8 max-w-2xl mx-auto">
              Our engineers answer application-specific questions directly. Get advice on material selection,
              lining design, installation best practices, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
              >
                Ask Our Engineers <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl border border-white/20 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
