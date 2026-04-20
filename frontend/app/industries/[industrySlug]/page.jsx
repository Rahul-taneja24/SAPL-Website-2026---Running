import Industries from '@/sections/Industries';

const INDUSTRY_META = {
  steel: {
    title: 'Steel Plant Refractory Solutions | Blast Furnace to Ladle',
    description: 'Complete refractory solutions for iron & steel plants: blast furnace, BOF, EAF, steel ladle, tundish, and continuous casting. Authorized CUMI & TRL Krosaki dealer.',
  },
  cement: {
    title: 'Cement Kiln Refractory Solutions | Burning Zone to Preheater',
    description: 'High-performance refractories for cement rotary kilns: burning zone, transition zones, preheater, and cooler. Magnesia spinel, high alumina, and castables.',
  },
  aluminum: {
    title: 'Aluminum Furnace Refractory Solutions | Non-Wetting Linings',
    description: 'Specialized refractory solutions for aluminum melting and holding furnaces. Non-wetting castables, silicon carbide bricks, and ceramic fiber insulation.',
  },
  glass: {
    title: 'Glass Melting Furnace Refractories | AZS, Zircon & Silica',
    description: 'Premium refractories for glass melting tanks: fused cast AZS for glass contact, silica for crown, zircon bricks, and ceramic fiber modules for insulation.',
  },
  petrochemical: {
    title: 'Petrochemical Plant Refractory & Insulation Solutions',
    description: 'Refractory and insulation solutions for refineries, crackers, and process heaters. Acid proof bricks, ceramic fiber, calcium silicate, and microporous insulation.',
  },
  power: {
    title: 'Power Plant Refractory Solutions | Boiler & Incinerator Linings',
    description: 'Durable refractory and insulation solutions for power plant boilers, incinerators, and ash handling. Castables, insulating bricks, ceramic fiber modules.',
  },
  foundry: {
    title: 'Foundry Refractory Solutions | Cupola & Induction Furnace',
    description: 'Refractory solutions for foundries: induction furnace ramming mass, cupola linings, ladle linings, and ceramic fiber insulation. Expert technical support.',
  },
  ceramic: {
    title: 'Ceramic Industry Refractory Solutions | Kiln & Furnace Linings',
    description: 'Refractory solutions for ceramic kilns and tunnel kilns. Insulating firebricks, castables, ceramic fiber products, and kiln furniture refractories.',
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRY_META).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const meta = INDUSTRY_META[industrySlug];
  const industry = industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = meta?.title || `Refractory Solutions for ${industry} Industry`;
  const description = meta?.description || `Specialized refractory materials for the ${industry.toLowerCase()} industry. Shanker Agencies — trusted supplier since 1980.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/industries/${industrySlug}` },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/industries/${industrySlug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${industry} Refractory Solutions – Shanker Agencies` }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function IndustryDetailPage({ params }) {
  const { industrySlug } = await params;
  const industry = industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.shankeragencies.com/industries' },
      { '@type': 'ListItem', position: 3, name: industry, item: `https://www.shankeragencies.com/industries/${industrySlug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Industries />
    </>
  );
}
