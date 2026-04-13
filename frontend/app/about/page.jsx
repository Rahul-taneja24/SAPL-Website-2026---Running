import About from '@/sections/About';

export const metadata = {
  title: 'About Us | 45 Years of Refractory Excellence',
  description: 'Learn about Shanker Agencies — founded in 1980, serving India, GCC & ASEAN markets with premium refractory materials and engineering solutions.',
  alternates: { canonical: '/about' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.shankeragencies.com/about' },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <About />
    </>
  );
}
