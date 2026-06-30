import Brands from '@/sections/Brands';

export const metadata = {
  title: 'Authorized Refractory Brands | Shanker Agencies',
  description: "Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supply partner for Calderys, TRL Krosaki & Mahakoshal. Genuine products and technical support since 1980.",
  alternates: { canonical: '/brands' },
  openGraph: {
    title: 'Authorized Refractory Brands | Shanker Agencies',
    description: "Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supply partner for Calderys, TRL Krosaki & Mahakoshal. Genuine products and technical support since 1980.",
    url: 'https://www.shankeragencies.com/brands',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies Refractory Brands' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/brands/#webpage',
  name: 'Authorized Refractory Brands | Shanker Agencies',
  url: 'https://www.shankeragencies.com/brands',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supply partner for TRL Krosaki, Calderys & Mahakoshal.',
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
    }
  ]
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
      <Brands />
    </>
  );
}
