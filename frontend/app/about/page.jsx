import About from '@/sections/About';

export const metadata = {
  title: 'About Us | 45 Years of Refractory Excellence',
  description: 'Learn about Shanker Agencies, founded in 1980, serving India, GCC & ASEAN markets with premium refractory materials and engineering solutions.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | 45 Years of Refractory Excellence | Shanker Agencies',
    description: 'Shanker Agencies, founded in 1980, serving India, GCC & ASEAN markets with premium refractory materials.',
    url: 'https://www.shankeragencies.com/about',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies, 45 Years of Refractory Excellence' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.shankeragencies.com/about' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the primary focus of Shanker Agencies Private Limited?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Shanker Agencies is a refractory engineering partner, not just a materials supplier. Alongside supply of high-performance refractory products, we provide furnace lining design support, material selection guidance and technical consultation for high-temperature industrial equipment across steel, cement, aluminium, glass, petrochemical and power plants.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Shanker Agencies offer technical consulting for furnace lining?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Beyond supply, our engineers provide technical consulting on furnace lining design, material compatibility and slag corrosion protection, helping plants extend campaign life and reduce total cost of ownership rather than just the per-tonne material price.',
      },
    },
  ],
};

const faqs = faqSchema.mainEntity;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <About />

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
