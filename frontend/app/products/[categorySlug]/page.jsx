import Products from '@/sections/Products';
import { PRODUCTS_DATA } from '@/data/productsData';
import { PRODUCT_SEO } from '@/data/productsSeoData';

const CATEGORY_NAMES = {
  'shaped-refractories': 'Shaped Refractories',
  'unshaped-refractories': 'Unshaped Refractories',
  'flow-control': 'Flow Control Refractories',
  'insulation': 'Insulation Products',
  'acid-proofing': 'Acid Proofing Products',
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_NAMES).map((categorySlug) => ({ categorySlug }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const title = categorySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

export default async function ProductCategoryPage({ params }) {
  const { categorySlug } = await params;
  const categoryTitle =
    CATEGORY_NAMES[categorySlug] ||
    categorySlug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

  // Products that have dedicated detail pages in this category
  const seoProducts = PRODUCT_SEO.filter((s) => s.categorySlug === categorySlug);

  const itemListSchema =
    seoProducts.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${categoryTitle} — Shanker Agencies`,
          description: `Complete range of ${categoryTitle.toLowerCase()} from Shanker Agencies Pvt. Ltd. — authorized dealer of CUMI, TRL Krosaki, IFGL, Divine Cerawool & Crown Ceramics.`,
          url: `https://www.shankeragencies.com/products/${categorySlug}`,
          numberOfItems: seoProducts.length,
          itemListElement: seoProducts.map((seo, index) => {
            const product = PRODUCTS_DATA.find(
              (p) =>
                p.subcategory === seo.productId ||
                p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === seo.productId ||
                seo.name.toLowerCase().includes(p.name.toLowerCase().split(' ')[0].toLowerCase())
            );
            return {
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                '@id': `https://www.shankeragencies.com/products/${categorySlug}/${seo.productId}`,
                name: seo.name,
                description: seo.metaDescription,
                url: `https://www.shankeragencies.com/products/${categorySlug}/${seo.productId}`,
                ...(product?.image ? { image: product.image } : {}),
                ...(product
                  ? {
                      brand: { '@type': 'Brand', name: product.brand },
                      additionalProperty: [
                        {
                          '@type': 'PropertyValue',
                          name: 'Maximum Service Temperature',
                          value: product.temp,
                        },
                        ...(product.al2o3 !== '-'
                          ? [{ '@type': 'PropertyValue', name: 'Al₂O₃ Content', value: product.al2o3 }]
                          : []),
                      ],
                    }
                  : {}),
                offers: {
                  '@type': 'Offer',
                  seller: {
                    '@type': 'Organization',
                    name: 'Shanker Agencies Pvt. Ltd.',
                    '@id': 'https://www.shankeragencies.com/#organization',
                  },
                  availability: 'https://schema.org/InStock',
                  areaServed: ['IN', 'AE', 'SA', 'SG', 'MY'],
                  url: `https://www.shankeragencies.com/products/${categorySlug}/${seo.productId}`,
                },
              },
            };
          }),
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.shankeragencies.com/products' },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryTitle,
        item: `https://www.shankeragencies.com/products/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Products />
    </>
  );
}
