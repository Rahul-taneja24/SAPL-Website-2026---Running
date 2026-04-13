import KnowledgeBase from '@/sections/KnowledgeBase';

export const metadata = {
  title: 'Knowledge Base | Refractory Engineering Resources',
  description: 'Technical guides, installation tips, and engineering resources for refractory professionals. Learn about castables, bricks, mortars and lining systems.',
  alternates: { canonical: '/knowledge' },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/knowledge/#webpage',
  name: 'Refractory Engineering Knowledge Base | Shanker Agencies',
  url: 'https://www.shankeragencies.com/knowledge',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Technical guides, installation tips, and engineering resources for refractory professionals from Shanker Agencies — 45+ years of refractory expertise.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <KnowledgeBase />
    </>
  );
}
