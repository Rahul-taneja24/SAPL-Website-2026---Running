import Products from '@/sections/Products';

export const metadata = {
  title: 'Refractory Products & Materials',
  description: 'Browse our complete range of refractory products: high alumina bricks, low cement castables, mullite, mortars and monolithics from leading brands.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Refractory Products & Materials | Shanker Agencies',
    description: 'Browse our complete range of refractory products: high alumina bricks, low cement castables, mullite, mortars and monolithics.',
    url: 'https://www.shankeragencies.com/products',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Refractory Products' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/products/#webpage',
  name: 'Refractory Products | Shanker Agencies',
  url: 'https://www.shankeragencies.com/products',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Complete refractory product catalog, high alumina bricks, castables, ceramic fiber, flow control, acid proof bricks. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Products />
    </>
  );
}
