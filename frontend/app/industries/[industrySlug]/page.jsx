import Industries from '@/pages/Industries';
export async function generateMetadata({ params }) {
  const industry = params.industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `Refractory Solutions for ${industry} Industry`,
    description: `Specialized refractory materials for the ${industry.toLowerCase()} industry. Shanker Agencies — trusted supplier since 1980.`,
    alternates: { canonical: `/industries/${params.industrySlug}` },
  };
}
export default function IndustryDetailPage() { return <Industries />; }
