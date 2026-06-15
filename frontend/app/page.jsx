import Home from '@/sections/Home';

export const metadata = {
  title: "Refractory Supplier & Exporter India — CUMI Dealer | Shanker Agencies",
  description: "Shanker Agencies — India's premier refractory exporter since 1980. Authorized CUMI dealer. High alumina bricks, LCC/ULCC castables, porous plugs, ceramic fiber. CIF to GCC, ASEAN, Africa.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Refractory Supplier & Exporter India — CUMI Dealer | Shanker Agencies",
    description: "Shanker Agencies — India's premier refractory exporter since 1980. Authorized CUMI dealer. High alumina bricks, LCC/ULCC castables, porous plugs, ceramic fiber. CIF to GCC, ASEAN, Africa.",
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies | Refractory Engineering Partner' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.shankeragencies.com/#webpage',
  name: 'Shanker Agencies | Refractory Engineering Partner',
  url: 'https://www.shankeragencies.com',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable', '[data-speakable="true"]'],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of refractories does Shanker Agencies supply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies supplies the full spectrum of refractory products including high alumina bricks (AL45–AL90), fireclay bricks (SK30–SK40), LCC and ULCC castables, gunning mixes, ramming mass, ceramic fiber blankets (Divine Cerawool), porous plugs, slide gate systems, ladle shrouds, acid proof bricks, MgO-C bricks, and calcium silicate insulation. We are authorized dealers of CUMI, Crown Ceramics and Divine Cerawool."
      }
    },
    {
      "@type": "Question",
      "name": "Which countries does Shanker Agencies export refractory to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies exports refractory products to 50+ countries including GCC (Bahrain, UAE, Saudi Arabia, Kuwait, Oman, Qatar), ASEAN (Sri Lanka, Philippines, Thailand, Indonesia, Malaysia), Africa (Nigeria, South Africa, Kenya), and Europe (United Kingdom). We provide CIF and FOB pricing with full export documentation including MTC, COO, packing list, and bill of lading. Typical transit times are 7–14 days to GCC and 10–21 days to ASEAN."
      }
    },
    {
      "@type": "Question",
      "name": "Which industries does Shanker Agencies serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies provides refractory engineering solutions for steel plants (blast furnaces, BOF, EAF, ladles, tundish), cement plants (rotary kilns, preheaters, coolers), aluminum smelters (melting and holding furnaces), petrochemical plants (fired heaters, reformers), glass manufacturing (melting tanks), power generation (boilers, FBC units), and foundries (induction furnaces, cupolas)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a CIF export quote from Shanker Agencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To get a CIF quote, email info@shankeragencies.com or call +91-98999-57888 with your product requirements, quantity, and destination port. Our engineers respond within 4 business hours with product recommendations, CIF pricing, and a complete documentation list. We also provide samples before bulk orders for export customers."
      }
    },
    {
      "@type": "Question",
      "name": "Is Shanker Agencies an authorized CUMI dealer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Shanker Agencies Private Limited is an authorized dealer of CUMI Super Refractories, one of India's largest refractory manufacturers. We are also authorized dealers of Crown Ceramics and Divine Cerawool, and strategic supply partners of TRL Krosaki, IFGL Refractories, Calderys India, and Mahakoshal Refractories."
      }
    }
  ]
};

const faqs = faqSchema.mainEntity;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home />

      {/* Visible FAQ section — required for Google FAQ rich result */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              Common Questions
            </span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#F97316] font-bold text-lg leading-none">›</span>
                  <h3 className="font-oswald text-base md:text-lg font-semibold text-[#1E3A5F] pr-4">
                    {faq.name}
                  </h3>
                </summary>
                <div className="px-5 pb-5 ml-8">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
