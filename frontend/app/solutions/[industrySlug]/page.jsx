import IndustrySolutions from '@/sections/IndustrySolutions';

const VALID_INDUSTRIES = new Set([
  'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
]);

export async function generateStaticParams() {
  return Array.from(VALID_INDUSTRIES).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const industry = industrySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = `${industry} Refractory Solutions | Shanker Agencies`;
  const description = `Tailored refractory engineering solutions for the ${industry.toLowerCase()} sector. Lining design, installation supervision & post-mortem analysis. Expert support from Shanker Agencies since 1980.`;
  return {
    title,
    description,
    alternates: { canonical: `/solutions/${industrySlug}` },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/solutions/${industrySlug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SolutionDetailPage({ params }) {
  // eslint-disable-next-line no-unused-vars
  const { industrySlug } = await params;
  return <IndustrySolutions />;
}
