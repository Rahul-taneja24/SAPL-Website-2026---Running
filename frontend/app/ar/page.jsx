import Link from 'next/link';
import { AR_COMMON, AR_PRODUCTS, AR_LOCATIONS } from '@/data/arData';

export const metadata = {
  title: { absolute: 'مورّد المواد الحرارية من الهند إلى الخليج | شانكر أجنسيز' },
  description:
    'شانكر أجنسيز، مورّد المواد الحرارية من الهند إلى دول الخليج منذ 1980. طوب حراري، خرسانات، ألياف سيراميكية وحراريات التحكم في التدفق.',
  alternates: {
    canonical: '/ar',
    languages: {
      en: 'https://www.shankeragencies.com',
      ar: 'https://www.shankeragencies.com/ar',
      'x-default': 'https://www.shankeragencies.com',
    },
  },
  openGraph: {
    title: 'مورّد المواد الحرارية من الهند إلى الخليج | شانكر أجنسيز',
    description: 'توريد المواد الحرارية من الهند إلى دول مجلس التعاون الخليجي منذ 1980.',
    url: 'https://www.shankeragencies.com/ar',
    locale: 'ar_AE',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'شانكر أجنسيز' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.shankeragencies.com/ar/#webpage',
  name: 'مورّد المواد الحرارية من الهند إلى الخليج | شانكر أجنسيز',
  url: 'https://www.shankeragencies.com/ar',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'ar',
};

export default function ArabicHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wide mb-5">
            موثوقون منذ عام 1980 · ISO 9001
          </span>
          <h1 className="font-bold text-3xl md:text-5xl text-white leading-snug mb-5">
            مورّد المواد الحرارية من الهند
            <br />
            <span className="text-[#F97316]">إلى دول الخليج العربي</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {AR_COMMON.brandFull} — {AR_COMMON.tagline}. نورّد الطوب الحراري والخرسانات
            والألياف السيراميكية وحراريات التحكم في التدفق لمصانع الصلب والألمنيوم والأسمنت
            والزجاج والبتروكيماويات، مع شهادات اختبار المصنع الأصلية وتسعير CIF إلى موانئ الخليج.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ar/rfq" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors">
              {AR_COMMON.ctaRfq}
            </Link>
            <a href="https://wa.me/919899957888" className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors">
              واتساب مباشر
            </a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-[#1E3A5F] mb-6 text-center">{AR_COMMON.whyUs}</h2>
          <ul className="space-y-3 max-w-2xl mx-auto">
            {AR_COMMON.whyUsPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <span className="text-[#F97316] font-bold mt-0.5">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-[#1E3A5F] mb-3 text-center">{AR_COMMON.products}</h2>
          <p className="text-gray-500 text-center mb-8">{AR_COMMON.productsIntro}</p>
          <div className="grid md:grid-cols-2 gap-5">
            {AR_PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/ar/products/${p.slug}`} className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#F97316]/40 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg text-[#1E3A5F] mb-2">{p.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-[#1E3A5F] mb-8 text-center">{AR_COMMON.locations}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AR_LOCATIONS.map((l) => (
              <Link key={l.slug} href={`/ar/refractory-supplier-in/${l.slug}`} className="block bg-gray-50 rounded-xl border border-gray-100 p-5 text-center hover:border-[#F97316]/40 transition-colors">
                <span className="font-bold text-[#1E3A5F]">{l.city}</span>
                <span className="block text-xs text-gray-500 mt-1">{l.country}</span>
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">{AR_COMMON.contactLine}</p>
        </div>
      </section>
    </>
  );
}
