import Products from '@/sections/Products';
export async function generateMetadata({ params }) {
  const title = params.productId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Shanker Agencies`,
    description: `${title} — premium refractory material from Shanker Agencies. Serving industrial buyers across India, GCC & ASEAN.`,
    alternates: { canonical: `/products/${params.categorySlug}/${params.productId}` },
  };
}
export default function ProductDetailPage() { return <Products />; }
