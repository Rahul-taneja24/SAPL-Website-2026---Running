import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AR_COMMON, AR_LOCATIONS, AR_PRODUCTS, getArLocation } from '@/data/arData';

export const dynamicParams = false;

export function generateStaticParams() {
  return AR_LOCATIONS.map((l) => ({ locationSlug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const loc = getArLocation(locationSlug);
  if (!loc) return { title: 'الصفحة غير موجودة' };
  return {
    title: { absolute: `${loc.title} | شانكر أجنسيز` },
    description: loc.intro.slice(0, 158),
    alternates: {
      canonical: `/ar/refractory-supplier-in/${locationSlug}`,
      languages: {
        // Must match the EN page's own self-referencing code (en-IN) exactly
        // for the hreflang pair to be reciprocal.
        'en-IN': `https://www.shankeragencies.com/refractory-supplier-in/${locationSlug}`,
        ar: `https://www.shankeragencies.com/ar/refractory-supplier-in/${locationSlug}`,
        'x-default': `https://www.shankeragencies.com/refractory-supplier-in/${locationSlug}`,
      },
    },
    openGraph: {
      title: `${loc.title} | شانكر أجنسيز`,
      description: loc.intro.slice(0, 158),
      url: `https://www.shankeragencies.com/ar/refractory-supplier-in/${locationSlug}`,
      siteName: 'Shanker Agencies',
      locale: 'ar_AE',
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: loc.title }],
    },
  };
}

export default async function ArabicLocationPage({ params }) {
  const { locationSlug } = await params;
  const loc = getArLocation(locationSlug);
  if (!loc) notFound();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${loc.title} | شانكر أجنسيز`,
    url: `https://www.shankeragencies.com/ar/refractory-supplier-in/${locationSlug}`,
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
            <span className="text-white">{loc.city}</span>
          </nav>
          <h1 className="font-bold text-3xl md:text-4xl text-white leading-snug mb-4">{loc.title}</h1>
          <p className="text-[#F97316] font-semibold">{loc.city}، {loc.country}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-gray-700 text-lg leading-loose">{loc.intro}</p>
          <p className="text-gray-700 leading-loose">{loc.industries}</p>

          <div>
            <h2 className="font-bold text-xl text-[#1E3A5F] mb-4">{AR_COMMON.products}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {AR_PRODUCTS.map((p) => (
                <Link key={p.slug} href={`/ar/products/${p.slug}`} className="block bg-gray-50 rounded-xl border border-gray-100 p-5 hover:border-[#F97316]/40 transition-colors">
                  <span className="font-bold text-[#1E3A5F]">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl text-[#1E3A5F] mb-4">{AR_COMMON.whyUs}</h2>
            <ul className="space-y-2.5">
              {AR_COMMON.whyUsPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <span className="text-[#F97316] font-bold mt-0.5">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="font-bold text-xl text-white mb-3">اطلب عرض سعر CIF إلى {loc.city}</h2>
            <p className="text-white/70 text-sm mb-5">أرسل لنا المنتج والكمية والميناء المطلوب — يراجع فريقنا الهندسي كل طلب ويرد بعرض سعر وشهادات الاختبار.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/ar/rfq" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3 rounded-full font-bold text-sm transition-colors">
                {AR_COMMON.ctaRfq}
              </Link>
              <a href="https://wa.me/919899957888" className="bg-white/10 border border-white/25 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-colors">
                واتساب
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center">
            English version: <Link href={`/refractory-supplier-in/${loc.slug}`} className="underline hover:text-[#F97316]">Refractory Supplier in {loc.slug}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
