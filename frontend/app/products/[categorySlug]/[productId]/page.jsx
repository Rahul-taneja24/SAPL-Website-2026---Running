import Products from '@/sections/Products';
import { PRODUCT_SEO, getProductSeo } from '@/data/productsSeoData';

export async function generateStaticParams() {
  return PRODUCT_SEO.map(({ categorySlug, productId }) => ({
    categorySlug,
    productId,
  }));
}

export async function generateMetadata({ params }) {
  const seo = getProductSeo(params.categorySlug, params.productId);

  if (!seo) {
    // Fallback for any unlisted product
    const name = params.productId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${name} | Refractory Products | Shanker Agencies`,
      description: `${name} — premium refractory product from Shanker Agencies Pvt. Ltd. 45+ years of refractory engineering expertise. Supply across India, GCC & ASEAN.`,
      alternates: { canonical: `/products/${params.categorySlug}/${params.productId}` },
    };
  }

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: `/products/${params.categorySlug}/${params.productId}` },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: `https://www.shankeragencies.com/products/${params.categorySlug}/${params.productId}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
    },
    keywords: seo.name,
  };
}

export default function ProductDetailPage() {
  return <Products />;
}
