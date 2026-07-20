import IndustrySolutions from '@/sections/IndustrySolutions';

export const metadata = {
  title: 'Engineering Solutions by Industry',
  description: 'Complete refractory engineering solutions including lining design, installation support, and technical consultation for industrial furnaces and kilns.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Engineering Solutions by Industry | Shanker Agencies',
    description: 'Refractory engineering solutions: lining design, installation support and technical consultation for industrial furnaces and kilns.',
    url: 'https://www.shankeragencies.com/solutions',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Engineering Solutions' }],
  },
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the benefit of an engineered refractory package versus buying materials off the shelf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "An engineered package is designed around your specific equipment and process temperatures rather than a generic spec sheet. By matching grade selection to your actual operating environment, we help reduce unplanned downtime and lower total cost of ownership, since the cheapest material per tonne is rarely the cheapest material per heat or per campaign.",
      },
    },
  ],
};

const faqs = faqSchema.mainEntity;

export default function SolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IndustrySolutions />

      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              Common Questions
            </span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#F97316] font-bold text-lg leading-none">›</span>
                  <h3 className="font-oswald text-base md:text-lg font-semibold text-[#1E3A5F] pr-4">
                    {faq.name}
                  </h3>
                </summary>
                <div className="px-5 pb-5 ml-8">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
