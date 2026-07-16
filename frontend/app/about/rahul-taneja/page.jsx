import Link from 'next/link';
import { Award, Factory, Globe2, Handshake, Mail, Phone } from 'lucide-react';
import { BLOG_POSTS_DATA } from '@/data/blogPostsData';

export const metadata = {
  title: 'Rahul Taneja | Director, Shanker Agencies Pvt. Ltd.',
  description: "Rahul Taneja is Director at Shanker Agencies, a second-generation refractory engineering business supplying steel, cement, aluminium and glass plants across India and 50+ export markets since 2018.",
  alternates: { canonical: '/about/rahul-taneja' },
  openGraph: {
    title: 'Rahul Taneja | Director, Shanker Agencies Pvt. Ltd.',
    description: "Second-generation refractory engineering director. Steel, cement, aluminium & glass sector supply since 2018.",
    url: 'https://www.shankeragencies.com/about/rahul-taneja',
    type: 'profile',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Rahul Taneja | Shanker Agencies' }],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rahul Taneja',
  jobTitle: 'Director',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://www.shankeragencies.com/#organization',
    name: 'Shanker Agencies Private Limited',
  },
  url: 'https://www.shankeragencies.com/about/rahul-taneja',
  description: "Director at Shanker Agencies, a refractory engineering supplier founded in 1980. Joined in 2018, leading sales engineering, digital systems and technical supply for steel, cement, aluminium, glass and power plant clients across India and 50+ export markets.",
  knowsAbout: [
    'Refractory Engineering',
    'Steel Ladle Refractories',
    'Cement Kiln Refractories',
    'Monolithic Castables',
    'Electric Arc Furnace Refractories',
  ],
  sameAs: [
    'https://www.shankeragencies.com/about',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.shankeragencies.com/about' },
    { '@type': 'ListItem', position: 3, name: 'Rahul Taneja', item: 'https://www.shankeragencies.com/about/rahul-taneja' },
  ],
};

export default function RahulTanejaBioPage() {
  const authoredPosts = BLOG_POSTS_DATA.filter((p) => p.author?.name === 'Rahul Taneja');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-[#1E3A5F] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-[#F97316]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-[#F97316]">About</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Rahul Taneja</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#F97316] flex items-center justify-center flex-shrink-0">
              <span className="text-[#1E3A5F] text-2xl font-bold font-oswald">RT</span>
            </div>
            <div>
              <h1 className="font-oswald text-3xl md:text-4xl font-bold text-white">Rahul Taneja</h1>
              <p className="text-[#F97316] font-semibold tracking-wide">Director, Shanker Agencies Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">
            Rahul Taneja is Director at Shanker Agencies Pvt. Ltd. (SAPL), a refractory engineering
            supplier founded by his father, Mohan Taneja, in 1980. He joined the business in 2018 as
            the second generation to lead it, bringing sales engineering, digital systems and a sharper
            technical focus to the company's supply relationships across steel, cement, aluminium, glass
            and power plant customers.
          </p>
          <p>
            Since 2018, SAPL has expanded into flow control refractories, ceramic fibre insulation, and
            new brand partnerships including Divine Cerawool, Crown Ceramics and Mahakoshal Refractories,
            while extending export supply into ASEAN markets alongside the company's existing GCC business.
            SAPL today supplies refractory materials to 500+ industrial clients across 50+ countries, with
            authorized dealer and supply-partner status for CUMI, Calderys, TRL Krosaki, Mahakoshal, Divine
            Cerawool and Crown Ceramics.
          </p>
          <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mt-8 mb-3">Focus Areas</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><Factory size={18} className="text-[#F97316] mt-1 flex-shrink-0" /><span>Steel ladle, EAF and BOF refractory specification &mdash; MgO-C bricks, monolithic castables, flow control systems</span></li>
            <li className="flex items-start gap-2"><Award size={18} className="text-[#F97316] mt-1 flex-shrink-0" /><span>Cement kiln refractory selection for alternative-fuel and high-TSR operations</span></li>
            <li className="flex items-start gap-2"><Globe2 size={18} className="text-[#F97316] mt-1 flex-shrink-0" /><span>Export supply engineering for GCC, ASEAN and African steel, cement and aluminium plants</span></li>
            <li className="flex items-start gap-2"><Handshake size={18} className="text-[#F97316] mt-1 flex-shrink-0" /><span>Brand partner relationships and technical supply coordination with CUMI, Calderys, TRL Krosaki and Mahakoshal</span></li>
          </ul>

          {authoredPosts.length > 0 && (
            <>
              <h2 className="font-oswald text-xl font-bold text-[#1E3A5F] mt-10 mb-3">Articles by Rahul Taneja</h2>
              <ul className="space-y-2 not-prose">
                {authoredPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="text-[#1E3A5F] font-semibold hover:text-[#F97316] transition-colors">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-6 not-prose">
            <a href="mailto:info@shankeragencies.com" className="flex items-center gap-2 text-gray-700 hover:text-[#F97316]">
              <Mail size={18} /> info@shankeragencies.com
            </a>
            <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-[#F97316]">
              <Phone size={18} /> Contact SAPL
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
