import Script from 'next/script';
import { Toaster } from 'sonner';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ScrollRevealManager, ScrollProgressBar } from '@/components/ScrollAnimations';
import './globals.css';

// Google Analytics 4 measurement ID. Doubles as the Google Tag.
// Configured in Google Tag Manager (account 6037325274, container 82833404)
// — but installed directly via gtag.js since SAPL doesn't need a full GTM
// container for one site.
const GA_MEASUREMENT_ID = 'G-TJJH0RD6ZC';

export const metadata = {
  metadataBase: new URL('https://www.shankeragencies.com'),
  title: {
    default: "Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980",
    template: '%s | Shanker Agencies',
  },
  // 158 chars — under Google's 160-char limit so AI snippets don't truncate
  description:
    "India's premier refractory engineering partner since 1980. Authorised dealer of CUMI, Crown, Divine, Mahakoshal — supplying steel, cement, glass plants.",
  // Trimmed from 109 terms (audit M5: read as keyword stuffing) to 12 high-intent
  // commercial phrases. Google ignores this tag, but some AI crawlers use it as
  // a quality signal — long lists are downgraded as low-quality content.
  keywords: [
    'refractory supplier India',
    'refractory dealer Delhi NCR',
    'CUMI authorized dealer Delhi',
    'high alumina bricks supplier',
    'castable refractory cement',
    'ramming mass supplier Delhi',
    'ceramic fiber blanket Delhi',
    'steel plant refractories',
    'cement kiln refractory',
    'induction furnace lining',
    'refractory exporter India',
    'Shanker Agencies SAPL',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    title: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980',
    description: "India's premier refractory engineering partner since 1980. Authorised for CUMI, Crown Ceramics, Divine Cerawool, Mahakoshal. Strategic supply partner for TRL Krosaki, IFGL and Calderys. Serving steel, cement, aluminium, glass, power and petrochemical plants.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanker Agencies | Refractory Dealer in Delhi NCR Since 1980',
    description: "India's premier refractory engineering partner since 1980. CUMI, Crown, Mahakoshal, TRL Krosaki, IFGL and Calderys.",
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
  // Verification tags only render when the matching env var is actually set.
  // No more `REPLACE_WITH_BING_CODE` placeholder leaking into production HTML.
  // Set NEXT_PUBLIC_BING_SITE_VERIFICATION + NEXT_PUBLIC_YANDEX_VERIFICATION in
  // Vercel env to enable these once codes are obtained from each webmaster tool.
  verification: {
    google: 'UP4jk4O4_EhbCZmxhLCah3pTBbUuI9Utg1KkhDzIC0I',
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
        ? { 'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
        : {}),
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* IndexNow key for instant Bing/Yandex indexing */}
        <meta name="indexnow-key" content="68c9e978104b40548276dada2151c101" />
        {/* Preload the logo for LCP — fetchpriority high so the browser
            requests it before parsing the rest of the document. */}
        <link
          rel="preload"
          as="image"
          href="/images/sapl-logo.png"
          fetchPriority="high"
          type="image/png"
        />
        {/* AI/LLM discoverability hints */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        {/* @graph — Organization + LocalBusiness + WebSite (Gemini Knowledge Graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.shankeragencies.com/#organization',
                  name: 'Shanker Agencies Private Limited',
                  alternateName: ['SAPL', 'Shanker Agencies'],
                  url: 'https://www.shankeragencies.com',
                  email: 'info@shankeragencies.com',
                  image: 'https://www.shankeragencies.com/opengraph-image',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.shankeragencies.com/images/sapl-logo.png',
                    width: 200,
                    height: 60,
                  },
                  foundingDate: '1980',
                  identifier: [
                    { '@type': 'PropertyValue', name: 'CIN', value: 'U51909DL2012PTC232825' },
                    { '@type': 'PropertyValue', name: 'GST', value: '07AARCS1944B1ZC' },
                  ],
                  hasCredential: {
                    '@type': 'EducationalOccupationalCredential',
                    credentialCategory: 'certification',
                    name: 'ISO 9001 Quality Management System',
                  },
                  description: "India's premier refractory engineering partner and exporter since 1980. Authorized dealer of CUMI Super Refractories, Crown Ceramics and Divine Cerawool. Supplier of high alumina bricks, LCC/ULCC castables, gunning materials, ceramic fiber insulation, porous plugs, slide gates and acid proof products to steel, cement, aluminum and petrochemical industries across GCC, ASEAN, Africa and Europe.",
                  slogan: "India's premier refractory engineering partner since 1980",
                  priceRange: '₹₹',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '553, Main, Grand Trunk Rd, East Ram Nagar, Ram Nagar',
                    addressLocality: 'Shahdara',
                    addressRegion: 'Delhi',
                    postalCode: '110032',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 28.676098255212455,
                    longitude: 77.29598125527387,
                  },
                  hasMap: 'https://share.google/Cz2EJCPRFsQtAvvOE',
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
                      telephone: '+91-98999-57888',
                      contactType: 'sales',
                      email: 'info@shankeragencies.com',
                      availableLanguage: ['English', 'Hindi'],
                      areaServed: ['IN', 'BH', 'AE', 'SA', 'KW', 'OM', 'QA', 'LK', 'PH', 'TH', 'ID', 'MY', 'NG', 'ZA', 'GB'],
                    },
                    {
                      '@type': 'ContactPoint',
                      email: 'info@shankeragencies.com',
                      contactType: 'export enquiries',
                    },
                  ],
                  areaServed: [
                    { '@type': 'Country', name: 'India' },
                    { '@type': 'Country', name: 'Bahrain' },
                    { '@type': 'Country', name: 'United Arab Emirates' },
                    { '@type': 'Country', name: 'Saudi Arabia' },
                    { '@type': 'Country', name: 'Kuwait' },
                    { '@type': 'Country', name: 'Oman' },
                    { '@type': 'Country', name: 'Qatar' },
                    { '@type': 'Country', name: 'Sri Lanka' },
                    { '@type': 'Country', name: 'Philippines' },
                    { '@type': 'Country', name: 'Thailand' },
                    { '@type': 'Country', name: 'Indonesia' },
                    { '@type': 'Country', name: 'Malaysia' },
                    { '@type': 'Country', name: 'Nigeria' },
                    { '@type': 'Country', name: 'South Africa' },
                    { '@type': 'Country', name: 'United Kingdom' },
                  ],
                  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 11, maxValue: 50 },
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
                      jobTitle: 'Director, Refractory Engineering',
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
                  knowsAbout: [
                    'Refractory Engineering',
                    'High Alumina Bricks',
                    'Low Cement Castable',
                    'Ultra Low Cement Castable',
                    'Gunning Castable',
                    'Ceramic Fiber Insulation',
                    'Porous Plugs',
                    'Slide Gate Systems',
                    'Ramming Mass',
                    'Acid Proof Bricks',
                    'MgO-C Bricks',
                    'Ladle Shrouds',
                    'Steel Plant Refractories',
                    'Cement Kiln Refractories',
                    'Refractory Export India',
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Refractory Products for Export',
                    url: 'https://www.shankeragencies.com/products',
                  },
                  sameAs: [
                    'https://share.google/Cz2EJCPRFsQtAvvOE',
                    'https://www.bing.com/maps?ss=ypid.YN4070x7110777838778892043',
                    'https://maps.apple/p/0~tnc_7sCut830',
                    'https://www.linkedin.com/company/shanker-agencies-private-limited/',
                    'https://www.facebook.com/shankeragencies',
                    'https://twitter.com/shankeragencies',
                    'https://www.instagram.com/shankeragencies',
                    'https://www.youtube.com/@shankeragencies',
                    'https://www.crunchbase.com/organization/shanker-agencies-pvt-ltd',
                    'https://www.indiamart.com/shankeragencies/',
                    'https://www.tradeindia.com/shanker-agencies-pvt-ltd-2386358/',
                    'https://www.exportersindia.com/shanker-agencies-private-limited/',
                    'https://www.justdial.com/Delhi/Shanker-Agencies-Pvt-Ltd-Near-East-Delhi-Medical-Hospital-Shahdara/011PK010076_BZDET',
                    'https://www.globallinker.com/seller/shanker-agencies-private-limited',
                  ],
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://www.shankeragencies.com/#localbusiness',
                  name: 'Shanker Agencies Private Limited',
                  url: 'https://www.shankeragencies.com',
                  telephone: '+91-98999-57888',
                  email: 'info@shankeragencies.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '553, Main, Grand Trunk Rd, East Ram Nagar, Ram Nagar',
                    addressLocality: 'Shahdara',
                    addressRegion: 'Delhi',
                    postalCode: '110032',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 28.676098255212455,
                    longitude: 77.29598125527387,
                  },
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    opens: '09:00',
                    closes: '18:00',
                  },
                  priceRange: '$$',
                  description: 'Refractory exporter and engineering partner in Shahdara, Delhi NCR. Authorized dealer of CUMI, Crown Ceramics and Divine Cerawool. Exporting high performance refractories to GCC, ASEAN, Africa and Europe since 1980.',
                  parentOrganization: { '@id': 'https://www.shankeragencies.com/#organization' },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.shankeragencies.com/#website',
                  url: 'https://www.shankeragencies.com',
                  name: 'Shanker Agencies — Refractory Exporter India',
                  alternateName: ['SAPL', 'Shanker Agencies Pvt. Ltd.'],
                  description: "India's premier refractory engineering partner and exporter since 1980",
                  inLanguage: 'en-IN',
                  publisher: { '@id': 'https://www.shankeragencies.com/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.shankeragencies.com/blog?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
        {/* WebPage schema is added per-page to avoid incorrect homepage URL on all routes */}
      </head>
      <body>
        {/* Google Tag (gtag.js) — load after page is interactive so it
            doesn't block LCP. Captures organic traffic, AI-engine referrals
            (ChatGPT, Perplexity, Bing Copilot user-agents) and form
            conversion events. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `}
        </Script>

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
