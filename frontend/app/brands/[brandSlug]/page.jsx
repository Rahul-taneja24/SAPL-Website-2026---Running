import Brands from '@/pages/Brands';
export async function generateMetadata({ params }) {
  const brand = params.brandSlug.toUpperCase();
  return {
    title: `${brand} Refractory Products | Authorized Distributor India`,
    description: `Shanker Agencies is an authorized distributor of ${brand} refractory products in India. Get genuine ${brand} materials with expert technical support.`,
    alternates: { canonical: `/brands/${params.brandSlug}` },
  };
}
export default function BrandDetailPage() { return <Brands />; }
