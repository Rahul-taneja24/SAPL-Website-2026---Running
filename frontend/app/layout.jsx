import { Toaster } from 'sonner';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ScrollRevealManager, ScrollProgressBar } from '@/components/ScrollAnimations';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.shankeragencies.com'),
  title: {
    default: "Shanker Agencies | Refractory Engineering Partner",
    template: '%s | Shanker Agencies',
  },
  description:
    "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics, TRL Krosaki & IFGL. Supply of high-performance refractories for steel, cement, aluminum & petrochemical industries.",
  keywords: [
    'refractory engineering partner India', 'refractory supplier India', 'refractory distributor India',
    'refractory materials supplier', 'refractory manufacturer India', 'refractory supplier Delhi',
    'CUMI authorized dealer', 'Crown Ceramics dealer', 'Divine Cerawool dealer', 'Calderys India',
    'TRL Krosaki dealer', 'IFGL distributor',
    'high alumina bricks supplier', 'castable refractory manufacturer', 'ramming mass supplier India',
    'ceramic fiber blanket supplier', 'slide gate plate supplier', 'acid proof bricks India',
    'refractory lining contractor', 'furnace lining material', 'refractory installation services',
    'steel plant refractories', 'cement kiln refractory', 'induction furnace lining',
    'refractory exporter India', 'refractory supplier GCC', 'refractory supplier Middle East',
    'refractory anchor supplier', 'insulation material supplier',
    'magnesia carbon bricks', 'silicon carbide bricks', 'fire bricks manufacturer',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    title: 'Shanker Agencies | Refractory Engineering Partner',
    description: "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics, TRL Krosaki & IFGL. Supply of high-performance refractories for steel, cement, aluminum & petrochemical industries.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies | Refractory Engineering Partner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanker Agencies | Refractory Engineering Partner',
    description: "India's leading refractory engineering partner since 1980.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.shankeragencies.com',
    types: {
      'text/plain': 'https://www.shankeragencies.com/llms.txt',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'UP4jk4O4_EhbCZmxhLCah3pTBbUuI9Utg1KkhDzIC0I',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* IndexNow key for instant Bing/Yandex indexing */}
        <meta name="indexnow-key" content="68c9e978104b40548276dada2151c101" />
        {/* AI/LLM discoverability hints */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness'],
              '@id': 'https://www.shankeragencies.com/#organization',
              name: 'Shanker Agencies Pvt. Ltd.',
              alternateName: ['SAPL', 'Shanker Agencies'],
              url: 'https://www.shankeragencies.com',
              telephone: '+91-9899957888',
              email: 'info@shankeragencies.com',
              image: 'https://www.shankeragencies.com/opengraph-image',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.shankeragencies.com/images/sapl-logo.png',
                width: 200,
                height: 60,
              },
              foundingDate: '1980',
              description: "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supplying high alumina bricks, castables, ceramic fiber, ramming mass & flow control refractories to steel, cement, aluminium & petrochemical industries.",
              priceRange: '₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '553, Main G.T Road, Shahdara',
                addressLocality: 'Delhi',
                addressRegion: 'Delhi',
                postalCode: '110032',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '28.6693',
                longitude: '77.2986',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9899957888',
                  contactType: 'sales',
                  email: 'info@shankeragencies.com',
                  areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'KW', 'BH', 'SG', 'MY', 'ID', 'VN', 'TH', 'GB', 'DE', 'FR', 'NG', 'KE', 'ZA', 'EG', 'TR'],
                  availableLanguage: ['English', 'Hindi'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9899957888',
                  contactType: 'technical support',
                  email: 'info@shankeragencies.com',
                  areaServed: ['IN', 'AE', 'SA', 'SG', 'MY'],
                },
              ],
              areaServed: [
                { '@type': 'Country', name: 'India' },
                { '@type': 'Country', name: 'United Arab Emirates' },
                { '@type': 'Country', name: 'Saudi Arabia' },
                { '@type': 'Country', name: 'Qatar' },
                { '@type': 'Country', name: 'Singapore' },
                { '@type': 'Country', name: 'Malaysia' },
                { '@type': 'Country', name: 'United Kingdom' },
              ],
              numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 11, maxValue: 50 },
              sameAs: [
                'https://www.linkedin.com/company/shankeragencies',
                'https://www.facebook.com/shankeragencies',
                'https://twitter.com/shankeragencies',
                'https://www.instagram.com/shankeragencies',
                'https://www.youtube.com/@shankeragencies',
                'https://www.crunchbase.com/organization/shanker-agencies',
                'https://www.indiamart.com/shankeragencies/',
                'https://www.tradeindia.com/shanker-agencies-pvt-ltd-2386358/',
                'https://www.exportersindia.com/shanker-agencies-private-limited/',
                'https://www.justdial.com/Delhi/Shanker-Agencies-Pvt-Ltd-Shahdara/011PK010076_BZDET',
              ],
              knowsAbout: [
                'Refractory Materials', 'High Alumina Bricks', 'Low Cement Castables',
                'Ceramic Fiber Insulation', 'Ramming Mass', 'Slide Gate Plates',
                'Acid Proof Bricks', 'Steel Plant Refractories', 'Cement Kiln Refractories',
                'Induction Furnace Lining', 'Furnace Engineering',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Refractory Products & Engineering Services',
                itemListElement: [
                  { '@type': 'OfferCatalog', name: 'Shaped Refractories', description: 'High alumina bricks, fireclay bricks, magnesia bricks, silicon carbide bricks' },
                  { '@type': 'OfferCatalog', name: 'Unshaped Refractories', description: 'LCC castables, ramming mass, gunning mass, refractory mortar' },
                  { '@type': 'OfferCatalog', name: 'Flow Control Refractories', description: 'Slide gate plates, ladle shrouds, subentry nozzles, tundish nozzles' },
                  { '@type': 'OfferCatalog', name: 'Insulation Products', description: 'Ceramic fiber blankets, modules, boards, calcium silicate, microporous insulation' },
                  { '@type': 'OfferCatalog', name: 'Acid Proofing', description: 'Acid proof bricks, tiles, carbon bricks, acid proof cement' },
                ],
              },
            }),
          }}
        />
        {/* WebSite Schema — enables Google Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.shankeragencies.com/#website',
              name: 'Shanker Agencies',
              alternateName: ['SAPL', 'Shanker Agencies Pvt. Ltd.'],
              url: 'https://www.shankeragencies.com',
              description: "India's leading refractory engineering partner since 1980. Authorized dealer of CUMI, Crown Ceramics, Divine Cerawool. Supply of high-performance refractories for steel, cement, aluminum & petrochemical industries.",
              inLanguage: 'en-IN',
              publisher: {
                '@type': 'Organization',
                name: 'Shanker Agencies Pvt. Ltd.',
                logo: { '@type': 'ImageObject', url: 'https://www.shankeragencies.com/images/sapl-logo.png' },
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.shankeragencies.com/blog?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Speakable Schema — voice/AI assistant direct answers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://www.shankeragencies.com/#webpage',
              name: 'Shanker Agencies | Refractory Engineering Partner',
              url: 'https://www.shankeragencies.com',
              isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
              about: { '@id': 'https://www.shankeragencies.com/#organization' },
              inLanguage: 'en-IN',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', '.speakable', '[data-speakable="true"]'],
              },
            }),
          }}
        />
      </head>
      <body>
        <AppProvider>
          <ScrollProgressBar />
          <ScrollRevealManager />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-right" richColors />
        </AppProvider>
      </body>
    </html>
  );
}
