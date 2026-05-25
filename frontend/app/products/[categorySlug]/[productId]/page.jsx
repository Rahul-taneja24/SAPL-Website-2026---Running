import { notFound } from 'next/navigation';
import Products from '@/sections/Products';
import { PRODUCT_CATALOG } from '@/data/productCatalogData';
import { PRODUCT_SEO, getProductSeo } from '@/data/productsSeoData';
import { PRODUCTS_DATA } from '@/data/productsData';
import { getProductFaqs } from '@/data/productFaqsData';

// Return a real 404 for any product URL not in generateStaticParams,
// instead of rendering a thin 200 page (fixes Google Soft 404 / duplicate-canonical).
export const dynamicParams = false;

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
  const seo = getProductSeo(categorySlug, productId);

  // Catalog entry has the rich data: applications, specs, installation, etc.
  const catalogEntry = PRODUCT_CATALOG[categorySlug]?.products?.find(
    (p) => p.id === productId
  );

  // Lightweight DATA entry (chemistry / brand) — fallback when catalog missing
  const product = PRODUCTS_DATA.find(
    (p) =>
      p.subcategory === productId ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === productId
  );

  // No real data for this slug → genuine 404, never a thin 200 page.
  if (!catalogEntry && !getProductSeo(categorySlug, productId) && !product) {
    notFound();
  }

  const faqs = getProductFaqs(productId);
  const productUrl = `https://www.shankeragencies.com/products/${categorySlug}/${productId}`;
  const productName = catalogEntry?.name || seo?.name || product?.name;
  const productImage = catalogEntry?.images?.[0] || product?.image;

  // ─── Enriched Product schema ────────────────────────────────────────────
  // Pulls every per-grade spec row from the catalog into additionalProperty
  // so AI engines (and Google rich results) can read the full data sheet.
  const additionalProperty = [];
  if (catalogEntry?.tempMax) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Maximum Service Temperature',
      value: catalogEntry.tempMax,
    });
  } else if (product?.temp) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Maximum Service Temperature',
      value: product.temp,
    });
  }
  if (product?.al2o3 && product.al2o3 !== '-') {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Al₂O₃ Content',
      value: product.al2o3,
    });
  }
  if (product?.density && product.density !== '-') {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Bulk Density',
      value: product.density,
    });
  }
  if (catalogEntry?.specs?.length) {
    catalogEntry.specs.forEach((row) => {
      const grade = row.grade || row.type;
      if (!grade) return;
      Object.entries(row).forEach(([key, val]) => {
        if (key === 'grade' || key === 'type' || !val) return;
        additionalProperty.push({
          '@type': 'PropertyValue',
          name: `${grade} — ${key.toUpperCase()}`,
          value: String(val),
        });
      });
    });
  }
  if (catalogEntry?.grades?.length) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Available Grades',
      value: catalogEntry.grades.join(', '),
    });
  }

  const brandsList =
    catalogEntry?.brands ||
    (product?.brand ? [product.brand] : ['CUMI Super Refractories']);

  const productSchema = productName
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: productName,
        description:
          catalogEntry?.fullDesc ||
          (product
            ? `${product.name} — ${product.use}. Max temperature: ${product.temp}. Al₂O₃: ${product.al2o3}. Bulk density: ${product.density}. Features: ${product.features}.`
            : seo?.metaDescription),
        image: productImage ? [productImage] : undefined,
        url: productUrl,
        category: catalogEntry?.name || product?.type,
        brand: brandsList.map((b) => ({ '@type': 'Brand', name: b })),
        manufacturer: {
          '@type': 'Organization',
          name: brandsList[0],
        },
        offers: {
          '@type': 'Offer',
          seller: { '@id': 'https://www.shankeragencies.com/#organization' },
          availability: 'https://schema.org/InStock',
          areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'KW', 'BH', 'SG', 'MY', 'GB', 'DE'],
          url: productUrl,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            description: 'Quoted on enquiry — varies by grade, brand and order quantity.',
          },
        },
        additionalProperty: additionalProperty.length ? additionalProperty : undefined,
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Industrial Buyers — Steel, Cement, Aluminium, Glass, Power, Petrochemical',
        },
      }
    : null;

  // ─── HowTo schema (installation steps) ──────────────────────────────────
  const howToSchema =
    catalogEntry?.installation?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          '@id': `${productUrl}#howto-install`,
          name: `How to install ${productName}`,
          description: `Step-by-step refractory installation guidance for ${productName} from Shanker Agencies — authorised dealer with 45+ years of plant-side experience.`,
          totalTime: 'PT24H',
          tool: [
            { '@type': 'HowToTool', name: 'Refractory mortar / castable mixer' },
            { '@type': 'HowToTool', name: 'Trowel and joint-spacing gauge' },
            { '@type': 'HowToTool', name: 'Furnace dry-out burner / temperature recorder' },
          ],
          step: catalogEntry.installation.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: `Step ${i + 1}`,
            text,
          })),
          supply: catalogEntry.brands?.map((b) => ({
            '@type': 'HowToSupply',
            name: `${productName} supplied by ${b}`,
          })),
        }
      : null;

  // ─── FAQPage schema — buyer-intent Q&A for AI Overviews / Perplexity ────
  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${productUrl}#faq`,
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  // ─── BreadcrumbList ─────────────────────────────────────────────────────
  const categoryTitle = categorySlug
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
      { '@type': 'ListItem', position: 4, name: productName, item: productUrl },
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
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Products />
    </>
  );
}
