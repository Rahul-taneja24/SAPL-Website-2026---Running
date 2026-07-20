import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AR_COMMON, AR_PRODUCTS, AR_LOCATIONS } from '@/data/arData';

export const dynamicParams = false;

export function generateStaticParams() {
  return AR_PRODUCTS.map((p) => ({ categorySlug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const cat = AR_PRODUCTS.find((p) => p.slug === categorySlug);
  if (!cat) return { title: 'الصفحة غير موجودة' };
  return {
    title: { absolute: `${cat.name} | شانكر أجنسيز` },
    description: cat.desc.slice(0, 158),
    alternates: {
      canonical: `/ar/products/${categorySlug}`,
      languages: {
        en: `https://www.shankeragencies.com/products/${categorySlug}`,
        ar: `https://www.shankeragencies.com/ar/products/${categorySlug}`,
        'x-default': `https://www.shankeragencies.com/products/${categorySlug}`,
      },
    },
    openGraph: {
      title: `${cat.name} | شانكر أجنسيز`,
      description: cat.desc.slice(0, 158),
      url: `https://www.shankeragencies.com/ar/products/${categorySlug}`,
      siteName: 'Shanker Agencies',
      locale: 'ar_AE',
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: cat.name }],
    },
  };
}

export default async function ArabicProductCategoryPage({ params }) {
  const { categorySlug } = await params;
  const cat = AR_PRODUCTS.find((p) => p.slug === categorySlug);
  if (!cat) notFound();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${cat.name} | شانكر أجنسيز`,
    url: `https://www.shankeragencies.com/ar/products/${categorySlug}`,
    isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
    about: { '@id': 'https://www.shankeragencies.com/#organization' },
    inLanguage: 'ar',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <section className="bg-[#1E3A5F] py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/ar" className="hover:text-[#F97316]">{AR_COMMON.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{AR_COMMON.products}</span>
          </nav>
          <h1 className="font-bold text-3xl md:text-4xl text-white leading-snug">{cat.name}</h1>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-gray-700 text-lg leading-loose">{cat.desc}</p>
          <p className="text-gray-700 leading-loose">
            نورّد هذه المنتجات من علاماتنا الشريكة المعتمدة — CUMI و Calderys و TRL Krosaki
            وغيرها — مع شهادات اختبار المصنع الأصلية لكل شحنة، وتسعير CIF أو FOB إلى جميع
            موانئ الخليج، ودعم هندسي لاختيار الدرجة المناسبة لتطبيقكم ودرجة حرارة التشغيل.
          </p>

          <div>
            <h2 className="font-bold text-xl text-[#1E3A5F] mb-4">{AR_COMMON.locations}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AR_LOCATIONS.map((l) => (
                <Link key={l.slug} href={`/ar/refractory-supplier-in/${l.slug}`} className="block bg-gray-50 rounded-xl border border-gray-100 p-4 text-center hover:border-[#F97316]/40 transition-colors">
                  <span className="font-bold text-sm text-[#1E3A5F]">{l.city}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="font-bold text-xl text-white mb-3">اطلب عرض سعر</h2>
            <p className="text-white/70 text-sm mb-5">حدّد الدرجة والكمية وميناء الوصول — ونرد عليك بعرض سعر كامل مع شهادات الاختبار.</p>
            <Link href="/ar/rfq" className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors">
              {AR_COMMON.ctaRfq}
            </Link>
          </div>

          <p className="text-sm text-gray-400 text-center">
            English version: <Link href={`/products/${cat.slug}`} className="underline hover:text-[#F97316]">{cat.slug}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
