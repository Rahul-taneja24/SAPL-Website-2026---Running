import Products from '@/sections/Products';
import { PRODUCT_SEO, getProductSeo } from '@/data/productsSeoData';
import { PRODUCTS_DATA } from '@/data/productsData';
import { getProductFaqData } from '@/data/productFaqData';

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
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
    keywords: seo.name,
  };
}

export default async function ProductDetailPage({ params }) {
  const { categorySlug, productId } = await params;
  const seo = getProductSeo(categorySlug, productId);
  const faqData = getProductFaqData(categorySlug, productId);

  const product = PRODUCTS_DATA.find(
    (p) =>
      p.subcategory === productId ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === productId
  );

  const additionalProperty = faqData?.properties
    ? faqData.properties.map((p) => ({
        '@type': 'PropertyValue',
        name: p.name,
        value: p.value,
      }))
    : product
    ? [
        { '@type': 'PropertyValue', name: 'Maximum Service Temperature', value: product.temp },
        product.al2o3 !== '-' && { '@type': 'PropertyValue', name: 'Al₂O₃ Content', value: product.al2o3 },
        product.density !== '-' && { '@type': 'PropertyValue', name: 'Bulk Density', value: product.density },
      ].filter(Boolean)
    : [];

  const productName = seo?.name || product?.name || productId;
  const productDescription = faqData?.summary
    || (product
      ? `${product.name} — ${product.use}. Max temperature: ${product.temp}. Al₂O₃: ${product.al2o3}. Bulk density: ${product.density}. Features: ${product.features}.`
      : seo?.metaDescription);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: productDescription,
    brand: product?.brand
      ? { '@type': 'Brand', name: product.brand }
      : { '@type': 'Brand', name: 'Shanker Agencies' },
    manufacturer: { '@type': 'Organization', name: product?.brand || 'Shanker Agencies Pvt. Ltd.' },
    category: product?.type || seo?.name,
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
    additionalProperty,
  };

  const faqSchema = faqData?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const categoryTitle = categorySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const productTitle = seo
    ? seo.name
    : productId
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Products />
      {faqData && (
        <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6">
              Frequently Asked Questions
            </h2>
            {faqData.summary && (
              <div className="mb-8 p-5 bg-white border-l-4 border-[#F97316] rounded">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">
                  Quick Summary
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{faqData.summary}</p>
              </div>
            )}
            <div className="space-y-4">
              {faqData.faqs.map((f, i) => (
                <details
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-5 group"
                  open={i === 0}
                >
                  <summary className="font-semibold text-[#1E3A5F] cursor-pointer text-base list-none flex justify-between items-start gap-4">
                    <span>{f.q}</span>
                    <span className="text-[#F97316] text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-sm text-gray-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            {faqData.properties?.length > 0 && (
              <div className="mt-10">
                <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-4">
                  Technical Specifications
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {faqData.properties.map((p, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="px-5 py-3 font-medium text-gray-700 border-b border-gray-100 w-1/2">
                            {p.name}
                          </td>
                          <td className="px-5 py-3 text-[#1E3A5F] font-semibold border-b border-gray-100">
                            {p.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-400 italic">
                  * Typical values per IS / ASTM / EN test conditions. Exact data sheets available on request.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
