import KnowledgeBase from '@/sections/KnowledgeBase';

export const metadata = {
  title: 'Knowledge Base | Refractory Engineering Resources',
  description: 'Technical guides, installation tips, and engineering resources for refractory professionals. Learn about castables, bricks, mortars and lining systems.',
  alternates: { canonical: '/knowledge' },
};

// E-E-A-T author entity — Rahul Taneja signs the Knowledge Base content.
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <KnowledgeBase />
    </>
  );
}
