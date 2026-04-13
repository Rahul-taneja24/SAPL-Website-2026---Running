import Products from '@/sections/Products';
import { PRODUCT_SEO, getProductSeo } from '@/data/productsSeoData';
import { PRODUCTS_DATA } from '@/data/productsData';

export async function generateStaticParams() {
  return PRODUCT_SEO.map(({ categorySlug, productId }) => ({
    categorySlug,
    productId,
  }));
}

export async function generateMetadata({ params }) {
  const { categorySlug, productId } = await params;
  const seo = getProductSeo(categorySlug, productId);

  if (!seo) {
    const name = productId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${name} | Refractory Products | Shanker Agencies`,
      description: `${name} — premium refractory product from Shanker Agencies Pvt. Ltd. 45+ years of refractory engineering expertise. Supply across India, GCC & ASEAN.`,
      alternates: { canonical: `/products/${categorySlug}/${productId}` },
    };
  }

  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    alternates: { canonical: `/products/${categorySlug}/${productId}` },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: `https://www.shankeragencies.com/products/${categorySlug}/${productId}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: seo.name }],
    },
    keywords: seo.name,
  };
}

export default async function ProductDetailPage({ params }) {
  const { categorySlug, productId } = await params;

  // Find matching product for structured data — match by subcategory slug or id pattern
  const product = PRODUCTS_DATA.find(
    (p) =>
      p.subcategory === productId ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === productId
  );

  // Build Product schema if we have data
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: `${product.name} — ${product.use}. Max temperature: ${product.temp}. Al₂O₃: ${product.al2o3}. Bulk density: ${product.density}. Features: ${product.features}.`,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        manufacturer: {
          '@type': 'Organization',
          name: product.brand,
        },
        category: product.type,
        offers: {
          '@type': 'Offer',
          seller: {
            '@type': 'Organization',
            name: 'Shanker Agencies Pvt. Ltd.',
            url: 'https://www.shankeragencies.com',
          },
          availability: 'https://schema.org/InStock',
          areaServed: ['IN', 'AE', 'SA', 'SG', 'MY'],
          url: `https://www.shankeragencies.com/products/${categorySlug}/${productId}`,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            description: 'Contact for pricing — varies by grade and quantity',
          },
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Maximum Service Temperature',
            value: product.temp,
          },
          product.al2o3 !== '-' && {
            '@type': 'PropertyValue',
            name: 'Al₂O₃ Content',
            value: product.al2o3,
          },
          product.density !== '-' && {
            '@type': 'PropertyValue',
            name: 'Bulk Density',
            value: product.density,
          },
        ].filter(Boolean),
      }
    : null;

  const categoryTitle = categorySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const productTitle = seo ? seo.name : productId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.shankeragencies.com/products' },
      { '@type': 'ListItem', position: 3, name: categoryTitle, item: `https://www.shankeragencies.com/products/${categorySlug}` },
      { '@type': 'ListItem', position: 4, name: productTitle, item: `https://www.shankeragencies.com/products/${categorySlug}/${productId}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <Products />
    </>
  );
}
