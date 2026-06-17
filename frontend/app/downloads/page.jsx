import Downloads from '@/sections/Downloads';

export const metadata = {
  title: 'Technical Downloads & Datasheets | Refractory Products | Shanker Agencies',
  description: 'Download technical datasheets, installation guides, heat-up schedules, and company profile for refractory products, high alumina bricks, castables, ceramic fiber, ramming mass & more.',
  alternates: { canonical: '/downloads' },
  openGraph: {
    title: 'Refractory Technical Downloads | Shanker Agencies',
    description: 'Technical datasheets and installation guides for refractory materials, high alumina bricks, LCC castables, ceramic fiber, ramming mass, slide gate plates.',
    url: 'https://www.shankeragencies.com/downloads',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.shankeragencies.com/downloads/#webpage',
  name: 'Technical Downloads & Datasheets | Shanker Agencies',
  url: 'https://www.shankeragencies.com/downloads',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Download technical datasheets, installation guides, heat-up schedules, and company profile for refractory products from Shanker Agencies.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Downloads', item: 'https://www.shankeragencies.com/downloads' },
  ],
};

export default function DownloadsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Downloads />
    </>
  );
}
