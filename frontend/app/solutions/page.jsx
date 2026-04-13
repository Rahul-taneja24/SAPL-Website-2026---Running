import IndustrySolutions from '@/sections/IndustrySolutions';

export const metadata = {
  title: 'Engineering Solutions | Lining Design & Technical Support',
  description: 'Complete refractory engineering solutions including lining design, installation support, and technical consultation for industrial furnaces and kilns.',
  alternates: { canonical: '/solutions' },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.shankeragencies.com/solutions/#webpage',
  name: 'Refractory Engineering Solutions | Shanker Agencies',
  url: 'https://www.shankeragencies.com/solutions',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Refractory lining design, installation supervision, heat loss studies, technical training and after-sales support from Shanker Agencies.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.shankeragencies.com/solutions' },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IndustrySolutions />
    </>
  );
}
