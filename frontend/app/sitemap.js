const BASE_URL = 'https://www.shankeragencies.com';

export default async function sitemap() {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/brands`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/industries`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/solutions`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/knowledge`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'daily' },
    { url: `${BASE_URL}/contact`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/company-profile`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly' },
  ].map((p) => ({ ...p, lastModified: new Date().toISOString() }));

  let blogPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blogPages = (data.posts || []).map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (e) {}

  let productPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      productPages = (data.products || []).map((p) => ({
        url: `${BASE_URL}/products/${p.categorySlug}/${p.slug}`,
        lastModified: p.updatedAt || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (e) {}

  return [...staticPages, ...blogPages, ...productPages];
}
