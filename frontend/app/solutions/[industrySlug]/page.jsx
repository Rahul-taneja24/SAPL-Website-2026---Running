import IndustrySolutions from '@/sections/IndustrySolutions';

const SOLUTION_META = {
  steel: {
    title: 'Steel Plant Refractory Engineering Solutions | SAPL',
    description: 'Engineered refractory solutions for steel plants: ladle lining design, BOF/EAF optimization, tundish systems, and flow control. 45+ years of steel refractory expertise.',
  },
  cement: {
    title: 'Cement Plant Refractory Engineering Solutions | SAPL',
    description: 'Complete refractory engineering for cement plants: kiln lining design, preheater optimization, cooler refractories, and nose ring solutions. Authorized supplier.',
  },
  aluminum: {
    title: 'Aluminum Sector Refractory Engineering Solutions | SAPL',
    description: 'Refractory engineering solutions for aluminum smelters and foundries: non-wetting linings, pot cell insulation, and holding furnace design.',
  },
  glass: {
    title: 'Glass Industry Refractory Engineering Solutions | SAPL',
    description: 'Complete glass furnace refractory engineering: tank lining design, crown systems, regenerator refractories, and forehearth solutions.',
  },
  petrochemical: {
    title: 'Petrochemical Refractory & Insulation Solutions | SAPL',
    description: 'Refractory and insulation engineering for refineries and process plants: heater linings, FCC units, acid proofing, and pipe insulation systems.',
  },
  power: {
    title: 'Power Plant Refractory & Insulation Solutions | SAPL',
    description: 'Refractory and insulation solutions for power generation: boiler furnace linings, duct insulation, ESP hoppers, and ash handling systems.',
  },
  foundry: {
    title: 'Foundry Refractory Solutions | Cupola & Induction Furnace | SAPL',
    description: 'Complete refractory solutions for foundries: induction furnace lining design, cupola refractories, ladle systems, and technical support.',
  },
  ceramic: {
    title: 'Ceramic Industry Refractory Solutions | Kiln Lining Design | SAPL',
    description: 'Refractory solutions for ceramic tunnel kilns and periodic kilns: insulating bricks, castables, ceramic fiber products, and kiln furniture.',
  },
};

export async function generateStaticParams() {
  return Object.keys(SOLUTION_META).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const meta = SOLUTION_META[industrySlug];
  const industry = industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = meta?.title || `${industry} Refractory Solutions | Shanker Agencies`;
  const description = meta?.description || `Tailored refractory engineering solutions for the ${industry.toLowerCase()} sector. Expert support from Shanker Agencies since 1980.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/solutions/${industrySlug}` },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/solutions/${industrySlug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${industry} Refractory Solutions – Shanker Agencies` }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SolutionDetailPage({ params }) {
  const { industrySlug } = await params;
  const industry = industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.shankeragencies.com/solutions' },
      { '@type': 'ListItem', position: 3, name: industry, item: `https://www.shankeragencies.com/solutions/${industrySlug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IndustrySolutions />
    </>
  );
}
