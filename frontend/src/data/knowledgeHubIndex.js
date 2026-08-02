/**
 * Unified Knowledge Hub index. Normalizes blog guides, news articles, and
 * engineering reference case studies into one item shape so /knowledge can
 * search and filter across all of them. Each item still lives at its own
 * canonical URL — this is an index, not a content duplication.
 */
import { BLOG_POSTS_DATA } from './blogPostsData';
import { NEWS_ARTICLES } from './newsData';
import { CASE_STUDIES } from './caseStudiesData';
import { PRODUCT_DATASHEETS } from './productDatasheetData';
import { PRODUCT_SEO } from './productsSeoData';

// Derive datasheet labels/paths from the real product-route source of truth
// (productsSeoData.js) instead of a hand-maintained map, so links can't drift
// out of sync with actual category/product slugs.
const PRODUCT_LABELS = Object.fromEntries(
  PRODUCT_SEO.map((p) => [
    p.productId,
    { name: p.name, path: `/products/${p.categorySlug}/${p.productId}` },
  ])
);

// Canonical definition now lives in ./knowledgeHubTypes (no data imports), so
// client components can pull the labels without this module's dependency graph.
// Re-exported here so existing server-side importers keep working unchanged.
export { HUB_TYPES } from './knowledgeHubTypes';
import { HUB_TYPES } from './knowledgeHubTypes';

function fromBlog() {
  return BLOG_POSTS_DATA.map((p) => ({
    type: 'guide',
    slug: p.slug,
    href: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags || [],
    date: p.lastModified || p.publishDate,
    readTime: p.readTime,
    coverImage: p.coverImage,
  }));
}

function fromNews() {
  return NEWS_ARTICLES.map((a) => ({
    type: 'news',
    slug: a.slug,
    href: `/news/${a.slug}`,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    tags: a.tags || [],
    date: a.lastModified || a.publishDate,
    readTime: a.readTime,
    coverImage: a.coverImage,
  }));
}

function fromCaseStudies() {
  return CASE_STUDIES.map((c) => ({
    type: 'reference',
    slug: c.slug,
    href: `/engineering-references/${c.slug}`,
    title: c.title,
    excerpt: c.keyTakeaway || c.problem?.slice(0, 180),
    category: c.industry,
    tags: (c.products || []).map((p) => p.name),
    date: c.year ? `${c.year}-12-31` : undefined,
    readTime: c.readingTime ? `${c.readingTime} min` : undefined,
    coverImage: undefined,
  }));
}

function fromDatasheets() {
  return Object.entries(PRODUCT_DATASHEETS).map(([productId, sheet]) => {
    const label = PRODUCT_LABELS[productId];
    return {
      type: 'datasheet',
      slug: productId,
      href: label?.path ? `${label.path}#technical-datasheet` : '/downloads',
      title: `${label?.name || productId} — Technical Data Sheet`,
      excerpt: sheet.packaging || 'Chemical analysis, physical properties and IS/ASTM test methods.',
      category: 'Datasheet',
      tags: (sheet.chemicalAnalysis || []).map((r) => r.property),
      date: undefined,
      readTime: undefined,
      coverImage: undefined,
    };
  });
}

export function getHubItems() {
  return [...fromBlog(), ...fromNews(), ...fromCaseStudies(), ...fromDatasheets()];
}

export function getHubCategories(items) {
  return [...new Set(items.map((i) => i.category).filter(Boolean))].sort();
}
