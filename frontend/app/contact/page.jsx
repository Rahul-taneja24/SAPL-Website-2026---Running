import Contact from '@/sections/Contact';

export const metadata = {
  title: 'Contact Us | Get a Quote',
  description: 'Contact Shanker Agencies for refractory product enquiries, quotes and technical support. Call +91-9899957888 or email info@shankeragencies.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Get a Quote | Shanker Agencies',
    description: 'Contact Shanker Agencies for refractory product enquiries, quotes and technical support.',
    url: 'https://www.shankeragencies.com/contact',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Contact' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.shankeragencies.com/contact/#webpage',
  name: 'Contact Shanker Agencies | Get a Quote',
  url: 'https://www.shankeragencies.com/contact',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description: 'Contact Shanker Agencies for refractory product enquiries, technical consultation and quotes. WhatsApp, email or phone, responds within 2 business hours.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.shankeragencies.com/contact' },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Contact />
    </>
  );
}
