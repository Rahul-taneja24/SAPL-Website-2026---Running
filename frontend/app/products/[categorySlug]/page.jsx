import { notFound } from 'next/navigation';
import Products from '@/sections/Products';
import SpecPropertyTable from '@/components/SpecPropertyTable';
import { PRODUCTS_DATA } from '@/data/productsData';
import { PRODUCT_SEO, getCategorySeo } from '@/data/productsSeoData';
import { getSubFamilies } from '@/data/productFamiliesData';
import {
  parseKeyRanges,
  toAdditionalProperty,
} from '@/lib/parseKeyRanges';

const CATEGORY_NAMES = {
  'shaped-refractories': 'Shaped Refractories',
  'unshaped-refractories': 'Unshaped Refractories',
  'flow-control': 'Flow Control Refractories',
  'insulation': 'Insulation Products',
  'acid-proofing': 'Acid Proofing Products',
};

// Map URL category slug → parentId used inside productFamiliesData.js
const SLUG_TO_FAMILY_ID = {
  'shaped-refractories': 'shaped',
  'unshaped-refractories': 'unshaped',
  'flow-control': 'flow-control',
  'insulation': 'insulation',
  'acid-proofing': 'acid-proof',
};

// Only the five known categories are valid, any other slug returns a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CATEGORY_NAMES).map((categorySlug) => ({ categorySlug }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const seo = getCategorySeo(categorySlug);
  // Fall back to the slug-derived title for any category without curated SEO,
  // so a new category never ships with an empty <title>.
  const derived = categorySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const title = seo?.metaTitle || `${derived} | Refractory Products | Shanker Agencies`;
  const description =
    seo?.metaDescription ||
    `Explore our range of ${derived.toLowerCase()} refractory products. Authorized distributor across India, GCC & ASEAN.`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/products/${categorySlug}`,
      languages: {
        en: `https://www.shankeragencies.com/products/${categorySlug}`,
        ar: `https://www.shankeragencies.com/ar/products/${categorySlug}`,
        'x-default': `https://www.shankeragencies.com/products/${categorySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/products/${categorySlug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: `${derived} – Shanker Agencies` }],
    },
  };
}

export default async function ProductCategoryPage({ params }) {
  const { categorySlug } = await params;
  if (!CATEGORY_NAMES[categorySlug]) notFound();
  const categoryTitle = CATEGORY_NAMES[categorySlug];

  // Products that have dedicated detail pages in this category
  const seoProducts = PRODUCT_SEO.filter((s) => s.categorySlug === categorySlug);

  // Sub-family rows from productFamiliesData.js, use these for the
  // property comparison block + enrich the ItemList schema's per-item
  // additionalProperty arrays so AI engines can read the same specs
  // from both the visible HTML <table> and the embedded JSON-LD.
  const familyId = SLUG_TO_FAMILY_ID[categorySlug];
  const subFamilies = familyId ? getSubFamilies(familyId) || [] : [];

  // Build the visible comparison table rows. We expose the most
  // commercially relevant axes: max temp + the parsed keyRanges row.
  const compareRows = subFamilies.map((sf) => {
    const parsed = parseKeyRanges(sf.keyRanges);
    return {
      name: sf.name,
      properties: [
        ...(sf.maxTemp ? [{ label: 'Max Temp', value: sf.maxTemp }] : []),
        ...parsed,
      ],
    };
  });

  // Build a lookup so we can attach parsed properties to the matching
  // schema item. Sub-family `id` mostly aligns with the SEO `productId`,
  // but a couple of mappings need explicit hints (e.g. "lcc" → "low-cement-castable").
  const SUBFAMILY_ID_TO_SEO_PRODUCT = {
    'lcc': ['lcc', 'low-cement-castable', 'low-cement-castables'],
    'ulcc': ['ulcc', 'ultra-low-cement-castable', 'ultra-low-cement'],
    'high-alumina': ['high-alumina-bricks', 'high-alumina'],
    'fireclay': ['fireclay-bricks', 'fireclay'],
    'ifb': ['insulating-fire-bricks', 'ifb'],
    'basic': ['magnesia-bricks', 'magnesia-carbon-bricks', 'basic'],
    'ramming': ['ramming-mass', 'silica-ramming-mass', 'ramming-masses'],
    'gunning': ['gunning-materials', 'gunning-mass'],
    'ceramic-fiber': ['ceramic-fiber-blanket', 'ceramic-fiber-modules', 'ceramic-fiber', 'ceramic-fiber-products'],
    'mortars': ['refractory-mortars', 'mortars'],
    'fireclay-castables': ['conventional-castables', 'fireclay-castables', 'conventional-castable'],
    'conventional': ['conventional-castables', 'conventional-castable'],
  };

  function findFamilyForProduct(productId) {
    return subFamilies.find((sf) => {
      if (sf.id === productId) return true;
      const aliases = SUBFAMILY_ID_TO_SEO_PRODUCT[sf.id] || [sf.id];
      return aliases.some((a) => productId === a || productId.startsWith(a));
    });
  }

  const itemListSchema =
    seoProducts.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${categoryTitle}, Shanker Agencies`,
          description: `Complete range of ${categoryTitle.toLowerCase()} from Shanker Agencies Pvt. Ltd., authorized dealer of CUMI, TRL Krosaki, Divine Cerawool & Crown Ceramics.`,
          url: `https://www.shankeragencies.com/products/${categorySlug}`,
          numberOfItems: seoProducts.length,
          itemListElement: seoProducts.map((seo, index) => {
            const product = PRODUCTS_DATA.find(
              (p) =>
                p.subcategory === seo.productId ||
                p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === seo.productId ||
                seo.name.toLowerCase().includes(p.name.toLowerCase().split(' ')[0].toLowerCase())
            );

            // Attempt to bind the SEO product to a sub-family so we can
            // enrich `additionalProperty` with parsed keyRanges values.
            const family = findFamilyForProduct(seo.productId);
            const familyProps = family
              ? toAdditionalProperty(parseKeyRanges(family.keyRanges))
              : [];
            const familyMaxTemp =
              family?.maxTemp && !product?.temp
                ? [{ '@type': 'PropertyValue', name: 'Maximum Service Temperature', value: family.maxTemp }]
                : [];

            const baseProps = product
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'Maximum Service Temperature',
                    value: product.temp,
                  },
                  ...(product.al2o3 !== '-'
                    ? [{ '@type': 'PropertyValue', name: 'Al₂O₃ Content', value: product.al2o3 }]
                    : []),
                ]
              : [];

            // De-duplicate by property name (prefer richer product data
            // over family ranges where both exist).
            const seenNames = new Set();
            const additionalProperty = [...baseProps, ...familyMaxTemp, ...familyProps].filter(
              (p) => {
                if (seenNames.has(p.name)) return false;
                seenNames.add(p.name);
                return true;
              }
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
                image: product?.image || 'https://www.shankeragencies.com/opengraph-image.jpg',
                ...(product
                  ? {
                      brand: { '@type': 'Brand', name: product.brand },
                    }
                  : {}),
                ...(additionalProperty.length ? { additionalProperty } : {}),
                offers: {
                  '@type': 'Offer',
                  seller: {
                    '@type': 'Organization',
                    name: 'Shanker Agencies Pvt. Ltd.',
                    '@id': 'https://www.shankeragencies.com/#organization',
                  },
                  price: 0,
                  priceCurrency: 'INR',
                  priceValidUntil: '2027-12-31',
                  description: 'Quoted on enquiry, varies by grade and order quantity.',
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

  // Category-specific FAQ content, only populated where we have a genuinely
  // distinct question for that category (avoids generic filler FAQs).
  const CATEGORY_FAQS = {
    insulation: [
      {
        q: 'Can you help improve the energy efficiency of our industrial furnaces?',
        a: 'Yes. We provide specialized thermal insulation solutions, including ceramic fiber modules, blankets and calcium silicate boards, engineered to minimize heat loss and maximize energy savings in high-temperature environments. Correct insulation selection directly reduces fuel consumption and shell temperatures.',
      },
    ],
  };
  const categoryFaqs = CATEGORY_FAQS[categorySlug] || [];
  const faqSchema = categoryFaqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: categoryFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Products />

      {/* ──────────────────────────────────────────────────────────────
          PROPERTY COMPARISON TABLE, visible HTML <table> backed by
          parsed keyRanges from productFamiliesData.js. Renders one
          row per sub-family with columns derived from the property
          set, so AI engines (and Google rich results) can read each
          spec value directly without parsing a free-text string.
      ────────────────────────────────────────────────────────────── */}
      {compareRows.length > 0 && (
        <section
          className="py-16 px-4 bg-white border-t border-gray-100"
          aria-labelledby={`compare-${categorySlug}-heading`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
                Property Reference
              </span>
              <h2
                id={`compare-${categorySlug}-heading`}
                className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F]"
              >
                {categoryTitle.toUpperCase()}, KEY PROPERTIES AT A GLANCE
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                Indicative property ranges across our {categoryTitle.toLowerCase()} portfolio.
                Use this table to shortlist a sub-family before reviewing the full per-grade
                data sheet on the product page.
              </p>
            </div>

            <SpecPropertyTable
              variant="compare"
              rows={compareRows}
              footnote="Values are typical ranges across stocked grades. Exact data sheets per grade and brand are available on request."
            />

            <p className="mt-6 text-center text-xs text-gray-500">
              Need help choosing the right sub-family for your equipment?{' '}
              <a
                href="/contact"
                className="text-[#F97316] font-semibold underline decoration-[#F97316]/40 underline-offset-2 hover:decoration-[#F97316]"
              >
                Talk to a refractory engineer →
              </a>
            </p>
          </div>
        </section>
      )}

      {categoryFaqs.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
                Common Questions
              </span>
              <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {categoryFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#F97316] font-bold text-lg leading-none">›</span>
                    <h3 className="font-oswald text-base md:text-lg font-semibold text-[#1E3A5F] pr-4">
                      {faq.q}
                    </h3>
                  </summary>
                  <div className="px-5 pb-5 ml-8">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
