import IndustrySolutions from '@/pages/IndustrySolutions';
export async function generateMetadata({ params }) {
  const industry = params.industrySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${industry} Refractory Solutions | Shanker Agencies`,
    description: `Tailored refractory engineering solutions for the ${industry.toLowerCase()} sector. Expert support from Shanker Agencies since 1980.`,
    alternates: { canonical: `/solutions/${params.industrySlug}` },
  };
}
export default function SolutionDetailPage() { return <IndustrySolutions />; }
