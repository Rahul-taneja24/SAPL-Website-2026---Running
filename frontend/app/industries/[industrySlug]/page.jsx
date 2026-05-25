import { notFound } from 'next/navigation';
import Industries from '@/sections/Industries';

const INDUSTRY_DATA = {
  steel: {
    name: 'Steel',
    applications: ['EAF / IF Lining', 'Blast Furnace', 'Ladles &amp; Tundishes', 'Reheating Furnaces'],
    products: ['MgO-C Bricks', 'High Alumina Castables', 'Slide Gate Plates', 'Ramming Mass', 'Precast Shapes'],
    brands: ['TRL Krosaki', 'IFGL', 'CUMI', 'Calderys'],
  },
  cement: {
    name: 'Cement',
    applications: ['Rotary Kiln', 'Pre-Heater &amp; Cyclone', 'Cooler', 'Calciner'],
    products: ['Magnesia-Spinel Bricks', 'High Alumina Bricks', 'LCC Castables', 'Abrasion Resistant Castables'],
    brands: ['Calderys', 'CUMI', 'TRL Krosaki'],
  },
  aluminum: {
    name: 'Aluminium',
    applications: ['Smelter Pot', 'Holding Furnace', 'Casting House'],
    products: ['Non-Wetting Castables', 'Silicon Carbide Bricks', 'Insulating Castables', 'Anode Baking Refractories'],
    brands: ['Calderys', 'CUMI'],
  },
  glass: {
    name: 'Glass',
    applications: ['Melting Tank', 'Regenerator', 'Forehearth', 'Float Bath'],
    products: ['AZS Blocks', 'Fused Cast Refractories', 'Silica Bricks', 'Insulating Fire Bricks'],
    brands: ['Calderys', 'CUMI'],
  },
  petrochemical: {
    name: 'Petrochemical',
    applications: ['Reformer', 'Cracker', 'FCCU', 'Sulphur Recovery Unit'],
    products: ['Insulating Castables', 'Acid-Resistant Linings', 'Ceramic Fibre Modules', 'Microporous Insulation'],
    brands: ['Calderys', 'Divine Cerawool', 'Crown Ceramics'],
  },
  power: {
    name: 'Power',
    applications: ['CFBC Boiler', 'AFBC Boiler', 'Coal Gasifier', 'Incinerator'],
    products: ['Abrasion Resistant Castables', 'Silicon Carbide Castables', 'Ceramic Fibre', 'Insulating Bricks'],
    brands: ['Calderys', 'CUMI', 'Divine Cerawool'],
  },
  foundry: {
    name: 'Foundry',
    applications: ['Induction Furnace', 'Cupola Furnace', 'Ladles', 'Core Making'],
    products: ['Silica Ramming Mass', 'Alumina Ramming Mass', 'Magnesia Ramming Mass', 'Fire Bricks'],
    brands: ['CUMI', 'Mahakoshal'],
  },
  ceramic: {
    name: 'Ceramic',
    applications: ['Tunnel Kiln', 'Shuttle Kiln', 'Drier', 'Kiln Car'],
    products: ['Kiln Furniture', 'Insulating Fire Bricks', 'Ceramic Fibre', 'Silicon Carbide Plates'],
    brands: ['CUMI', 'Divine Cerawool', 'Crown Ceramics'],
  },
};

// Only the eight known industries are valid — any other slug returns a real 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const data = INDUSTRY_DATA[industrySlug];
  const name = data?.name || industrySlug;
  const title = `Refractory Supplier for ${name} Plants in India | Shanker Agencies`;
  const description = `Refractory materials and on-site engineering help for ${name.toLowerCase()} plants across India. Authorised dealer for CUMI, TRL Krosaki, IFGL, Calderys and Mahakoshal. Working with the industry since 1980.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/industries/${industrySlug}`,
      languages: {
        'en-IN': `https://www.shankeragencies.com/industries/${industrySlug}`,
        'x-default': `https://www.shankeragencies.com/industries/${industrySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/industries/${industrySlug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function buildIndustryJsonLd(slug, data) {
  const url = `https://www.shankeragencies.com/industries/${slug}`;
  const name = data?.name || slug;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `Refractory supply &amp; engineering for ${name} plants`,
      description: `Refractory materials, precast shapes, castables, ramming mass and on-site engineering for ${name.toLowerCase()} plants across India and 50+ export markets.`,
      serviceType: 'Refractory Supply and Engineering',
      provider: {
        '@type': 'Organization',
        '@id': 'https://www.shankeragencies.com/#organization',
        name: 'Shanker Agencies Pvt. Ltd.',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Qatar' },
      ],
      hasOfferCatalog: data?.products
        ? {
            '@type': 'OfferCatalog',
            name: `Refractory products for ${name.toLowerCase()} plants`,
            itemListElement: data.products.map((p, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: { '@type': 'Product', name: p },
            })),
          }
        : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: `Which refractories do you supply for ${name.toLowerCase()} plants?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `For ${name.toLowerCase()} plants we commonly supply ${(data?.products || []).join(', ')}. We stock genuine brands including ${(data?.brands || []).join(', ')} and can indent special grades directly from the factory on 2 to 6 week lead times.`,
          },
        },
        {
          '@type': 'Question',
          name: `Which areas of a ${name.toLowerCase()} plant do you cover?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We have supplied and serviced linings in ${(data?.applications || []).join(', ')}. Our engineers can come on-site for lining design reviews, installation supervision and failure-mode analysis.`,
          },
        },
        {
          '@type': 'Question',
          name: `Do you supply to ${name.toLowerCase()} plants outside India?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. We export from Delhi to 50+ countries including UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Singapore, Malaysia, Indonesia, Vietnam, Thailand, the UK and Germany, with full export paperwork and Bureau-of-Certification documentation.`,
          },
        },
        {
          '@type': 'Question',
          name: `How quickly can you quote and ship?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Quotes for standard grades are issued within 4 working hours. Stock products typically ship same-day or next-day from Delhi/NCR. Engineered items or custom shapes take 2 to 6 weeks depending on the factory.`,
          },
        },
      ],
    },
  ];
}

export default async function IndustryDetailPage({ params }) {
  const { industrySlug } = await params;
  const data = INDUSTRY_DATA[industrySlug];
  if (!data) notFound();
  const jsonLd = buildIndustryJsonLd(industrySlug, data);
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Industries />
    </>
  );
}
