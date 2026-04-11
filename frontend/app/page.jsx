import Home from '@/sections/Home';

export const metadata = {
  title: "Shanker Agencies | Refractory Engineering Partner",
  description: "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics, TRL Krosaki & IFGL. Supply of high-performance refractories for steel, cement, aluminum & petrochemical industries.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Shanker Agencies | Refractory Engineering Partner",
    description: "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics, TRL Krosaki & IFGL. Supply of high-performance refractories for steel, cement, aluminum & petrochemical industries.",
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies | Refractory Engineering Partner' }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What refractory materials does Shanker Agencies distribute?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies distributes the full range of refractory materials: high alumina bricks (AL45–AL90), fireclay bricks, magnesia spinel and MgO-C bricks, low cement castables (LCC/ULCC), silica and alumina ramming mass, ceramic fiber blankets and modules, slide gate plates, ladle shrouds, subentry nozzles, acid proof bricks, and calcium silicate boards. Authorized dealers of CUMI, Crown Ceramics, and Divine Cerawool."
      }
    },
    {
      "@type": "Question",
      "name": "Which brands is Shanker Agencies authorized to distribute?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shanker Agencies is an authorized dealer of CUMI Super Refractories, Crown Ceramics (acid proof products), and Divine Cerawool (ceramic fiber insulation). We also supply from Calderys, TRL Krosaki, and IFGL Refractories as trusted supply partners."
      }
    },
    {
      "@type": "Question",
      "name": "Does Shanker Agencies export refractory materials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Shanker Agencies exports refractory materials to 50+ countries including UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Singapore, Malaysia, Bangladesh, Sri Lanka, Ghana, Kenya, South Africa, UK, and Germany. We provide complete export documentation: COO, material test reports, and MSDS."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a technical datasheet for a refractory product?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical datasheets for all refractory products are available on request. Contact via WhatsApp (+91-9899957888) or email (info@shankeragencies.com). Our team responds within 2 business hours. Visit shankeragencies.com/downloads for the full list."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Shanker Agencies supply refractory materials to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We supply refractory materials to steel plants (EAF, BOF, induction furnaces, continuous casting), cement kilns, aluminium smelters, glass melting furnaces, petrochemical refineries, fertilizer plants, power stations, and ceramic & foundry industries."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home />
    </>
  );
}
