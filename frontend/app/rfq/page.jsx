import RfqForm from '@/sections/RfqForm';
import { Globe, FileCheck, Package } from 'lucide-react';

export const metadata = {
  title: 'Request a Quote (RFQ) | Bulk Refractory Supply & Export',
  description:
    'Submit a structured RFQ for refractory bricks, castables, ceramic fiber and flow control products. Bulk supply and CIF/FOB export to 50+ countries.',
  alternates: {
    canonical: '/rfq',
    languages: {
      en: 'https://www.shankeragencies.com/rfq',
      ar: 'https://www.shankeragencies.com/ar/rfq',
      'x-default': 'https://www.shankeragencies.com/rfq',
    },
  },
  openGraph: {
    title: 'Request a Refractory Quote (RFQ) | Shanker Agencies',
    description:
      'Structured RFQ for bulk refractory supply and export from India — product, grade, quantity, destination port and incoterm.',
    url: 'https://www.shankeragencies.com/rfq',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies RFQ' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
    { '@type': 'ListItem', position: 2, name: 'Request a Quote', item: 'https://www.shankeragencies.com/rfq' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.shankeragencies.com/rfq/#webpage',
  name: 'Request a Refractory Quote (RFQ) | Shanker Agencies',
  url: 'https://www.shankeragencies.com/rfq',
  isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
  about: { '@id': 'https://www.shankeragencies.com/#organization' },
  inLanguage: 'en-IN',
  description:
    'Structured request-for-quotation form for bulk refractory supply across India and CIF/FOB export to 50+ countries.',
};

export default function RfqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-widest uppercase mb-4">
            Request for Quotation
          </span>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
            GET A REFRACTORY <span className="text-[#F97316]">QUOTE</span>
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto leading-relaxed">
            Tell us what you need in the format your procurement team already works in —
            product, grade, quantity, destination and incoterm. Our engineers review every
            RFQ and reply with a quotation, test certificates and any grade recommendations.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="py-4 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8">
          {[
            { icon: Package, label: '7 partner brands, one RFQ' },
            { icon: FileCheck, label: 'Manufacturer test certificates' },
            { icon: Globe, label: 'CIF / FOB export to 50+ countries' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-600">
              <Icon size={16} className="text-[#F97316]" aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <RfqForm />
        </div>
      </section>
    </>
  );
}
