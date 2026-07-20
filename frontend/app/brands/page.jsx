import Brands from '@/sections/Brands';

export const metadata = {
  title: 'Refractory Brands We Supply',
  description: "Shanker Agencies is an authorized dealer and supply partner for 7 leading refractory manufacturers in India. Genuine products, technical support since 1980.",
  alternates: { canonical: '/brands' },
  openGraph: {
    title: 'Refractory Brands We Supply in India | Shanker Agencies',
    description: "Authorized dealer and supply partner for CUMI, Calderys, TRL Krosaki, Saint-Gobain, Crown Ceramics, Divine Cerawool and Mahakoshal. Genuine products and technical support since 1980.",
    url: 'https://www.shankeragencies.com/brands',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Refractory Brands' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/brands/#webpage',
  name: 'Refractory Brands We Supply in India | Shanker Agencies',
  url: 'https://www.shankeragencies.com/brands',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Shanker Agencies is an authorized dealer and supply partner for CUMI, Calderys, TRL Krosaki, Saint-Gobain, Crown Ceramics, Divine Cerawool and Mahakoshal Refractories in India.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://www.shankeragencies.com/brands' },
  ],
};

const brandsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Refractory Brands Distributed by Shanker Agencies",
  "description": "Shanker Agencies distributes and supplies refractory products from India's leading manufacturers.",
  "url": "https://www.shankeragencies.com/brands",
  "numberOfItems": 7,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Brand",
        "name": "CUMI Super Refractories",
        "alternateName": "CUMI",
        "description": "India's leading refractory manufacturer, high alumina bricks, castables, ramming mass, insulating fire bricks, ceramic fiber.",
        "url": "https://www.shankeragencies.com/brands/cumi"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Brand",
        "name": "Divine Cerawool",
        "description": "Ceramic fiber blankets, modules, boards and calcium silicate insulation products for high-temperature furnace applications.",
        "url": "https://www.shankeragencies.com/brands/divine-cerawool"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Brand",
        "name": "Crown Ceramics",
        "description": "Acid proof bricks, acid resistant tiles and acid-resistant jointing materials for chemical plants and industrial flooring.",
        "url": "https://www.shankeragencies.com/brands/crown-ceramics"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Brand",
        "name": "Calderys",
        "description": "Monolithic refractories, castables, gunning mixes and specialty refractory solutions for steel, cement and glass industries.",
        "url": "https://www.shankeragencies.com/brands/calderys"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Brand",
        "name": "TRL Krosaki",
        "description": "MgO-C bricks, magnesia bricks, silicon carbide products and advanced refractories for iron and steelmaking.",
        "url": "https://www.shankeragencies.com/brands/trl-krosaki"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Brand",
        "name": "Mahakoshal Refractories",
        "description": "Refractory bricks and castable products for steel plant and industrial furnace applications.",
        "url": "https://www.shankeragencies.com/brands/mahakoshal"
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Brand",
        "name": "Saint-Gobain Performance Ceramics & Refractories",
        "alternateName": "Saint-Gobain HeatKing",
        "description": "HeatKing induction furnace linings and monolithic castables engineered for steel and foundry melting applications.",
        "url": "https://www.shankeragencies.com/brands/saint-gobain"
      }
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which refractory brands does Shanker Agencies supply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies is an authorized dealer and supply partner for 7 refractory manufacturers: CUMI Super Refractories, Calderys, TRL Krosaki, Saint-Gobain (HeatKing), Crown Ceramics, Divine Cerawool and Mahakoshal Refractories. Each brand specializes in different product categories, from shaped bricks and monolithic castables to ceramic fiber insulation and acid-proof ceramics.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Shanker Agencies an authorized dealer for these brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Shanker Agencies holds authorized dealer or supply partner status directly with each brand listed on this page. Every delivery ships with the original manufacturer's test certificate, so customers can verify authenticity and specification compliance.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I order products from multiple brands in a single order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Since Shanker Agencies stocks and supplies all 7 partner brands, customers can consolidate a single furnace or plant lining project, high alumina bricks, monolithic castables, ceramic fiber insulation and acid-proof products, into one order and one point of contact, rather than coordinating separately with each manufacturer.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I know which brand or grade is right for my application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Share your furnace or process type, operating temperature, and industry with our engineering team. We recommend the appropriate brand and grade based on your specific application requirements, not on any single brand relationship, since we carry genuine product lines across all 7 partners.",
      },
    },
    {
      "@type": "Question",
      "name": "Do these brands export to GCC, ASEAN and Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Shanker Agencies exports products from all 7 partner brands to 50+ countries including the GCC, ASEAN, Africa and Europe, with CIF and FOB pricing and full export documentation.",
      },
    },
  ],
};

export default function BrandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Brands />

      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
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
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
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
