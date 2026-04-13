import Products from '@/sections/Products';

export const metadata = {
  title: 'Refractory Products | Bricks, Castables, Mortars & More',
  description: 'Browse our complete range of refractory products including high alumina bricks, low cement castables, mullite products, mortars and monolithics from leading brands.',
  alternates: { canonical: '/products' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.shankeragencies.com/products' },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Products />
    </>
  );
}
