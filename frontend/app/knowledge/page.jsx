import KnowledgeHub from '@/components/KnowledgeHub';
import { getHubItems } from '@/data/knowledgeHubIndex';

export const metadata = {
  title: 'Knowledge Base | Refractory Engineering Resources',
  description: 'Technical guides, industry news, engineering references and datasheets for refractory professionals, searchable in one place.',
  alternates: { canonical: '/knowledge' },
  openGraph: {
    title: 'Knowledge Base | Refractory Engineering Resources | Shanker Agencies',
    description: 'Technical guides, industry news, engineering references and datasheets for refractory professionals.',
    url: 'https://www.shankeragencies.com/knowledge',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Knowledge Base' }],
  },
};

// E-E-A-T author entity, Rahul Taneja signs the Knowledge Base content.
const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.shankeragencies.com/about#rahul-taneja',
  name: 'Rahul Taneja',
  jobTitle: 'Director & Refractory Engineering Expert',
  worksFor: { '@id': 'https://www.shankeragencies.com/#organization' },
  knowsAbout: [
    'Refractory Engineering',
    'Induction Furnace Lining',
    'High Alumina Bricks',
    'Castable Refractories',
    'Ceramic Fibre Insulation',
    'Steel Plant Refractories',
    'Cement Kiln Refractories',
  ],
  sameAs: ['https://www.linkedin.com/in/rahultaneja24/'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/knowledge/#webpage',
  name: 'Refractory Engineering Knowledge Base | Shanker Agencies',
  url: 'https://www.shankeragencies.com/knowledge',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  author: { '@id': 'https://www.shankeragencies.com/about#rahul-taneja' },
  reviewedBy: { '@id': 'https://www.shankeragencies.com/about#rahul-taneja' },
  inLanguage: 'en-IN',
  description: 'Technical guides, installation tips and engineering resources for refractory professionals from Shanker Agencies. Curated by Rahul Taneja, Director and Refractory Engineering Expert, with 45 plus years of combined plant experience.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Knowledge Base', item: 'https://www.shankeragencies.com/knowledge' },
  ],
};

export default function KnowledgePage() {
  // ItemList schema: surface the full indexed set (blog + news + references +
  // datasheets) as one machine-readable list, the GEO payoff of unifying them.
  const items = getHubItems();
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://www.shankeragencies.com/knowledge/#itemlist',
    name: 'SAPL Refractory Engineering Knowledge Base',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.shankeragencies.com${item.href}`,
      name: item.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <KnowledgeHub items={items} />
    </>
  );
}
