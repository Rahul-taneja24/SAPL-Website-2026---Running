import Products from '@/sections/Products';
export async function generateMetadata({ params }) {
  const title = params.categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Refractory Products`,
    description: `Explore our range of ${title.toLowerCase()} refractory products. Authorized distributor across India, GCC & ASEAN.`,
    alternates: { canonical: `/products/${params.categorySlug}` },
  };
}
export default function ProductCategoryPage() { return <Products />; }
