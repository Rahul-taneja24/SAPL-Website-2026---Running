import Products from '@/sections/Products';

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const title = categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: { absolute: `${title} | Refractory Products | Shanker Agencies` },
    description: `Explore our range of ${title.toLowerCase()} refractory products. Authorized distributor across India, GCC & ASEAN.`,
    alternates: { canonical: `/products/${categorySlug}` },
    openGraph: {
      title: `${title} | Refractory Products | Shanker Agencies`,
      description: `Explore our range of ${title.toLowerCase()} refractory products. Authorized distributor across India, GCC & ASEAN.`,
      url: `https://www.shankeragencies.com/products/${categorySlug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${title} – Shanker Agencies` }],
    },
  };
}

export default function ProductCategoryPage() { return <Products />; }
