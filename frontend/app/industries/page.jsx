import Industries from '@/sections/Industries';

export const metadata = {
  title: 'Industries We Serve | Steel, Aluminium, Cement, Glass',
  description: 'Shanker Agencies supplies refractory solutions to steel, aluminium, cement, glass, petrochemical and power industries across India and export markets.',
  alternates: { canonical: '/industries' },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.shankeragencies.com/industries/#webpage',
  name: 'Industries We Serve | Shanker Agencies',
  url: 'https://www.shankeragencies.com/industries',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Refractory engineering solutions for steel, cement, aluminium, glass, petrochemical and power generation industries.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.shankeragencies.com/industries' },
  ],
};

export default function IndustriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Industries />
    </>
  );
}
