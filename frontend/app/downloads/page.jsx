import Downloads from '@/sections/Downloads';

export const metadata = {
  title: { absolute: 'Technical Datasheets & Downloads | Shanker Agencies' },
  description: 'Download technical datasheets, installation guides and heat-up schedules for high alumina bricks, LCC castables and ceramic fiber.',
  alternates: { canonical: '/downloads' },
  openGraph: {
    title: 'Technical Datasheets & Downloads | Shanker Agencies',
    description: 'Download technical datasheets, installation guides and heat-up schedules for high alumina bricks, LCC castables and ceramic fiber.',
    url: 'https://www.shankeragencies.com/downloads',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Technical Downloads' }],
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
