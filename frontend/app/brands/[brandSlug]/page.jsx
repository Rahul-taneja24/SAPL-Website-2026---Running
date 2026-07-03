import { notFound } from 'next/navigation';
import Brands from '@/sections/Brands';

const VALID_BRANDS = [
  {
    slug: 'cumi',
    name: 'CUMI Super Refractories',
    shortName: 'CUMI',
    desc: 'High alumina bricks, castables, ramming mass, insulating fire bricks and ceramic fibre products.',
    products: ['High Alumina Bricks', 'Castables', 'Ramming Mass', 'Insulating Fire Bricks', 'Ceramic Fibre'],
    parent: 'Murugappa Group',
  },
  {
    slug: 'calderys',
    name: 'Calderys',
    shortName: 'Calderys',
    desc: 'Monolithic refractories, castables, gunning mixes and specialty refractory solutions for steel, cement and glass.',
    products: ['Monolithic Castables', 'Gunning Mixes', 'Low Cement Castables', 'Insulation Castables'],
    parent: 'Imerys Group',
    partnerOnly: true,
  },
  {
    slug: 'trl-krosaki',
    name: 'TRL Krosaki',
    shortName: 'TRL Krosaki',
    desc: 'MgO-C bricks, magnesia bricks, silicon carbide products and advanced refractories for iron and steel.',
    products: ['MgO-C Bricks', 'Magnesia Bricks', 'Silicon Carbide Products', 'Advanced Refractories'],
    parent: 'Tata Group &amp; Krosaki Harima',
  },
  {
    slug: 'divine-cerawool',
    name: 'Divine Cerawool',
    shortName: 'Divine Cerawool',
    desc: 'Ceramic fibre blankets, modules, boards and calcium silicate insulation for high-temperature applications.',
    products: ['Ceramic Fibre Blankets', 'Ceramic Fibre Modules', 'Ceramic Fibre Boards', 'Calcium Silicate Insulation'],
    parent: 'Divine Cera Wool India LLP',
  },
  {
    slug: 'crown-ceramics',
    name: 'Crown Ceramics',
    shortName: 'Crown Ceramics',
    desc: 'Acid proof bricks, acid resistant tiles, carbon bricks and acid-resistant cement for chemical plants.',
    products: ['Acid Proof Bricks', 'Acid Resistant Tiles', 'Carbon Bricks', 'Acid-Resistant Cement'],
    parent: 'Crown Ceramics',
  },
  {
    slug: 'mahakoshal',
    name: 'Mahakoshal Refractories',
    shortName: 'Mahakoshal',
    desc: 'Refractory bricks and castables for steel and industrial furnace applications.',
    products: ['Fire Bricks', 'High Alumina Bricks', 'Castables', 'Ramming Mass'],
    parent: 'Mahakoshal Refractories',
    partnerOnly: true,
  },
  {
    slug: 'saint-gobain',
    name: 'Saint-Gobain Performance Ceramics & Refractories',
    shortName: 'Saint-Gobain',
    desc: 'HeatKing induction furnace linings, monolithic castables and high-performance ceramic refractory solutions for steel, foundry and high-temperature industries.',
    products: ['HeatKing Induction Furnace Lining', 'HeatKing Monolithic Castables', 'High-Performance Ceramics', 'Refractory Solutions'],
    parent: 'Saint-Gobain Group',
    partnerOnly: true,
  },
];

export async function generateStaticParams() {
  return VALID_BRANDS.map(({ slug }) => ({ brandSlug: slug }));
}

export async function generateMetadata({ params }) {
  const { brandSlug } = await params;
  const brand = VALID_BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) {
    return {
      title: 'Brand Not Found | Shanker Agencies',
      description: 'The requested brand page was not found.',
    };
  }
  const relationship = brand.partnerOnly ? 'a supply partner' : 'an authorised dealer and supply partner';
  const title = `${brand.name} ${brand.partnerOnly ? 'Supplier' : 'Dealer'} in India | Shanker Agencies`;
  const description = `Shanker Agencies is ${relationship} for ${brand.name} in India. ${brand.desc} Plant-side support and Pan-India delivery since 1980.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/brands/${brandSlug}`,
      languages: {
        'en-IN': `https://www.shankeragencies.com/brands/${brandSlug}`,
        'x-default': `https://www.shankeragencies.com/brands/${brandSlug}`,
      },
    },
    openGraph: {
      title: `${brand.name} | Dealer &amp; Supply Partner | Shanker Agencies`,
      description: `${brand.name} refractory products from India's trusted dealer since 1980. ${brand.desc}`,
      url: `https://www.shankeragencies.com/brands/${brandSlug}`,
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: `${brand.name} | Shanker Agencies` }],
    },
  };
}

function buildBrandJsonLd(brand) {
  const url = `https://www.shankeragencies.com/brands/${brand.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      '@id': `${url}#brand`,
      name: brand.name,
      alternateName: brand.shortName,
      description: brand.desc,
      url,
      parentOrganization: brand.parent,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${brand.name} Refractory Distribution &amp; Support`,
      description: `Supply, stocking and plant-side support for ${brand.name} refractory products across India and 50+ export markets.`,
      serviceType: 'Refractory Distribution',
      provider: {
        '@type': 'Organization',
        '@id': 'https://www.shankeragencies.com/#organization',
        name: 'Shanker Agencies Pvt. Ltd.',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Singapore' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${brand.name} product range`,
        itemListElement: brand.products.map((p, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Product', name: `${brand.name} ${p}` },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: brand.partnerOnly
            ? `Can Shanker Agencies supply ${brand.name} products in India?`
            : `Is Shanker Agencies an authorised dealer for ${brand.name} in India?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: brand.partnerOnly
              ? `Yes. Shanker Agencies Pvt. Ltd. is a supply partner for ${brand.name} in India and can supply ${brand.shortName} products including ${brand.products[0]} on enquiry, with plant-side technical support. Contact us for ${brand.shortName} material requirements and quotations.`
              : `Yes. Shanker Agencies Pvt. Ltd. is an authorised dealer and supply partner for ${brand.name} in India, stocking and delivering from our Delhi base since 1980. Every dispatch ships with the original manufacturer's test certificate.`,
          },
        },
        {
          '@type': 'Question',
          name: `Which ${brand.shortName} refractory products does Shanker Agencies stock?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We stock and supply ${brand.products.join(', ')} from ${brand.name}. Custom grades and non-standard shapes can be indented directly from the plant with typical lead times of 2 to 6 weeks.`,
          },
        },
        {
          '@type': 'Question',
          name: `Where can ${brand.shortName} refractories be delivered?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Pan-India delivery from our Delhi warehouse plus export documentation for 50+ countries including UAE, Saudi Arabia, Qatar, Singapore, Malaysia, the UK and Germany. Standard products ship same-day or next-day from Delhi/NCR.`,
          },
        },
        {
          '@type': 'Question',
          name: `Does Shanker Agencies provide on-site engineering for ${brand.shortName} products?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. Our engineers visit plant sites across India to help with lining design, application and troubleshooting. We will work alongside your maintenance team through first-fire and the first few campaigns.`,
          },
        },
        {
          '@type': 'Question',
          name: `How do I get a price quote for ${brand.shortName} products?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Share your grade, quantity and delivery location by email (info@shankeragencies.com), phone (+91 98999 57888) or WhatsApp. Standard quotes for listed grades go out within 4 working hours; engineered or made-to-order items may take 1 to 2 days.`,
          },
        },
      ],
    },
  ];
}

export default async function BrandDetailPage({ params }) {
  const { brandSlug } = await params;
  const brand = VALID_BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) notFound();
  const jsonLd = buildBrandJsonLd(brand);
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Brands />
    </>
  );
}
