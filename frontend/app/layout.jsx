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
    default: "Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980",
    template: '%s | Shanker Agencies',
  },
  description:
    "Family-run refractory business based in Delhi since 1980. Authorised dealer of CUMI, Crown Ceramics, Divine Cerawool and Mahakoshal; supply partner for TRL Krosaki, IFGL and Calderys. We ship high alumina bricks, castables, ramming mass, ceramic fibre and flow control products to steel, cement, aluminium, glass, power and petrochemical plants across India and to 50+ countries.",
  keywords: [
    // Core brand + India identity
    'refractory supplier India', 'refractory dealer India', 'refractory distributor India',
    'refractory materials supplier', 'Shanker Agencies', 'SAPL refractory',
    // Delhi NCR city targeting (commercial intent)
    'refractory supplier Delhi', 'refractory dealer Delhi NCR',
    'refractory supplier Noida', 'refractory supplier Gurgaon', 'refractory supplier Faridabad',
    'refractory supplier Ghaziabad', 'refractory dealer Delhi', 'refractory manufacturer Delhi',
    'refractory stockist Delhi NCR', 'best refractory dealer Delhi NCR',
    // Brand + dealer intent
    'CUMI authorized dealer Delhi', 'CUMI refractory dealer India', 'CUMI super refractories dealer',
    'Crown Ceramics authorized dealer', 'Divine Cerawool authorized dealer',
    'Mahakoshal refractories dealer', 'Mahakoshal authorised distributor Delhi',
    'TRL Krosaki dealer India', 'IFGL refractories dealer', 'Calderys dealer India',
    // Product + city long tail
    'high alumina bricks supplier Delhi', 'high alumina bricks 70 percent',
    'castable refractory cement Delhi', 'low cement castable LCC supplier',
    'ramming mass supplier Delhi', 'silica ramming mass Delhi',
    'ceramic fiber blanket Delhi', 'ceramic fiber blanket Noida', 'ceramic fiber blanket Faridabad',
    'ceramic fiber blanket Gurgaon', 'ceramic fiber blanket Ghaziabad',
    'acid proof bricks Delhi', 'acid proof tiles Delhi',
    'slide gate plate supplier', 'tundish nozzle supplier', 'ladle shroud India',
    'magnesia carbon bricks supplier', 'silicon carbide bricks India',
    'insulating fire brick IFB 23', 'insulating fire brick IFB 26', 'IFB 28 insulating brick',
    'refractory mortar Delhi', 'refractory cement Delhi', 'refractory anchor supplier',
    'fire bricks manufacturer Delhi', 'fire bricks IS 8 standard', 'fire bricks size chart',
    'precast refractory shapes', 'kiln furniture supplier',
    // Application intent
    'steel plant refractories', 'cement kiln refractory', 'induction furnace lining',
    'boiler refractory castable', 'CFBC boiler refractory', 'reheating furnace lining',
    'refractory for glass furnace', 'refractory for aluminium smelter', 'refractory for copper smelter',
    'refractory for petrochemical reformer', 'refractory for power plant boiler',
    'ladle lining refractory', 'tundish refractory',
    // Service intent
    'refractory lining contractor', 'refractory relining service', 'refractory engineering consultant',
    'refractory installation service Delhi', 'refractory audit service',
    'refractory post-mortem analysis', 'refractory dry-out service',
    'furnace lining design service', 'on-site refractory engineering',
    // Export / international
    'refractory exporter India', 'refractory supplier GCC', 'refractory supplier Middle East',
    'refractory supplier UAE', 'refractory supplier Saudi Arabia', 'refractory supplier Qatar',
    'refractory supplier Oman', 'refractory supplier Singapore', 'refractory supplier Malaysia',
    // Competitive + comparison
    'best refractory supplier India', 'top refractory dealers Delhi NCR',
    'alternative to Refmon', 'alternative to Gupta Refractories', 'alternative to Lanexis',
    'alternative to BM Enterprises refractories', 'alternative to Inter Dominion Calderys',
    'alternative to Bharat Minerals refractories', 'CUMI vs Calderys', 'CUMI vs TRL Krosaki',
    'Mahakoshal vs CUMI castables', 'fire bricks vs refractory bricks',
    // Trust signals
    'ISO 9001 refractory supplier', 'ISO 14001 refractory dealer',
    'authorised refractory dealer India', 'since 1980 refractory supplier',
    'family owned refractory business Delhi', 'branded refractory supplier India',
    // GeM + PSU
    'GeM refractory supplier', 'PSU refractory vendor', 'BHEL approved refractory supplier',
    'NTPC refractory vendor', 'SAIL refractory supplier',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    title: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980',
    description: "Family-run refractory dealer in Delhi since 1980. Authorised for CUMI, Crown Ceramics, Divine Cerawool, Mahakoshal. Supply partner for TRL Krosaki, IFGL and Calderys. Serving steel, cement, aluminium, glass, power and petrochemical plants.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980',
    description: "Family-run refractory dealer in Delhi since 1980. CUMI, Crown, Mahakoshal, TRL Krosaki, IFGL and Calderys.",
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
    languages: {
      'en-IN': 'https://www.shankeragencies.com',
      'en-GB': 'https://www.shankeragencies.com',
      'en-US': 'https://www.shankeragencies.com',
      'en-AE': 'https://www.shankeragencies.com',
      'en-SG': 'https://www.shankeragencies.com',
      'x-default': 'https://www.shankeragencies.com',
    },
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
    other: {
      // Replace with the code you get from Bing Webmaster Tools → Ownership → HTML Meta Tag
      // Keeping placeholder so the meta tag renders — swap the value without a deploy.
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || 'REPLACE_WITH_BING_CODE',
      // Yandex Webmaster — optional, for international coverage
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'REPLACE_WITH_YANDEX_CODE',
    },
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
              founder: {
                '@type': 'Person',
                '@id': 'https://www.shankeragencies.com/about#mohan-taneja',
                name: 'Mohan Taneja',
                jobTitle: 'Founder & Managing Director',
              },
              employee: [
                {
                  '@type': 'Person',
                  '@id': 'https://www.shankeragencies.com/about#mohan-taneja',
                  name: 'Mohan Taneja',
                  jobTitle: 'Founder & Managing Director',
                },
                {
                  '@type': 'Person',
                  '@id': 'https://www.shankeragencies.com/about#rahul-taneja',
                  name: 'Rahul Taneja',
                  jobTitle: 'Director & Refractory Engineering Expert',
                  sameAs: ['https://www.linkedin.com/in/rahultaneja24/'],
                },
              ],
              brand: [
                { '@type': 'Brand', name: 'CUMI (Carborundum Universal)' },
                { '@type': 'Brand', name: 'Calderys India' },
                { '@type': 'Brand', name: 'TRL Krosaki Refractories' },
                { '@type': 'Brand', name: 'IFGL Refractories' },
                { '@type': 'Brand', name: 'Mahakoshal Refractories' },
                { '@type': 'Brand', name: 'Divine Cerawool' },
                { '@type': 'Brand', name: 'Crown Ceramics' },
              ],
              slogan: 'Refractory supply and plant-side engineering help since 1980',
              description: "Family-run refractory business based in Delhi since 1980, founded by Mohan Taneja. Authorised dealer of CUMI, Crown Ceramics, Divine Cerawool and Mahakoshal Refractories, and supply partner for TRL Krosaki, IFGL and Calderys. We stock and deliver high alumina bricks, castables, ramming mass, ceramic fibre, acid-proof bricks and flow control products to steel, cement, aluminium, glass, power and petrochemical plants across India and 50+ export markets.",
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
                latitude: '28.66720',
                longitude: '77.29810',
              },
              hasMap: 'https://maps.google.com/?q=28.66720,77.29810',
              additionalType: 'https://www.wikidata.org/wiki/Q11642428',
              telephone: ['+91-9899957888', '+91-9810205154', '+91-9811909394'],
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
                'https://www.crunchbase.com/organization/shanker-agencies-pvt-ltd',
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
              description: "Family-run refractory dealer in Delhi since 1980. Authorised dealer of CUMI, Crown Ceramics, Divine Cerawool and Mahakoshal; supply partner for TRL Krosaki, IFGL and Calderys. Serving steel, cement, aluminium, glass, power and petrochemical plants across India and 50+ countries.",
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
        {/* WebPage schema is added per-page to avoid incorrect homepage URL on all routes */}
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
