import Industries from '@/sections/Industries';

const VALID_INDUSTRIES = new Set([
  'steel', 'cement', 'aluminum', 'glass', 'petrochemical', 'power', 'foundry', 'ceramic',
]);

export async function generateStaticParams() {
  return Array.from(VALID_INDUSTRIES).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const industry = industrySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = `Refractory Solutions for ${industry} Industry | Shanker Agencies`;
  const description = `Specialized refractory materials and engineering solutions for the ${industry.toLowerCase()} industry. Authorized dealer of CUMI, TRL Krosaki, IFGL, Calderys, Mahakoshal. Trusted since 1980.`;
  return {
    title,
    description,
    alternates: { canonical: `/industries/${industrySlug}` },
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

export default async function IndustryDetailPage({ params }) {
  // eslint-disable-next-line no-unused-vars
  const { industrySlug } = await params;
  return <Industries />;
}
