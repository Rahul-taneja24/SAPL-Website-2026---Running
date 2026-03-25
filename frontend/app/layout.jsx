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
    default: "Shanker Agencies | India's Leading Refractory Engineering Partner Since 1980",
    template: '%s | Shanker Agencies',
  },
  description:
    'India\'s leading refractory engineering partner & manufacturer since 1980. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Supplying high alumina bricks, castables, ceramic fiber, ramming mass, slide gate plates & acid proof bricks to steel, cement, aluminum & petrochemical industries across 50+ countries.',
  keywords: [
    'refractory engineering partner India', 'refractory manufacturer India', 'refractory supplier Delhi',
    'CUMI authorized dealer', 'Crown Ceramics dealer', 'Divine Cerawool dealer',
    'high alumina bricks supplier', 'castable refractory manufacturer', 'ramming mass supplier India',
    'ceramic fiber blanket supplier', 'slide gate plate supplier', 'acid proof bricks India',
    'refractory lining contractor', 'furnace lining material', 'refractory installation services',
    'steel plant refractories', 'cement kiln refractory', 'induction furnace lining',
    'refractory exporter India', 'refractory supplier GCC', 'refractory supplier Middle East',
    'thermocouple sheath supplier', 'refractory anchor supplier', 'insulation material supplier',
    'magnesia carbon bricks', 'silicon carbide bricks', 'fire bricks manufacturer',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.shankeragencies.com',
    siteName: 'Shanker Agencies',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.shankeragencies.com' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Shanker Agencies Pvt. Ltd.',
              alternateName: 'SAPL',
              url: 'https://www.shankeragencies.com',
              logo: 'https://www.shankeragencies.com/logo.png',
              foundingDate: '1980',
              description: 'India\'s premier refractory engineering partner & manufacturer since 1980. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Engineering, manufacturing & supplying refractory solutions to steel, cement, aluminum & petrochemical industries across 50+ countries.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '553, Main G.T Road, Shahdara',
                addressLocality: 'Delhi',
                addressRegion: 'Delhi',
                postalCode: '110032',
                addressCountry: 'IN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9810205154',
                  contactType: 'sales',
                  email: 'info@shankeragencies.com',
                  areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'KW', 'BH', 'SG', 'MY', 'ID', 'VN', 'TH', 'GB', 'DE', 'FR', 'NG', 'KE', 'ZA', 'EG'],
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
              sameAs: ['https://linkedin.com/company/shankeragencies'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Refractory Products & Engineering Services',
                itemListElement: [
                  { '@type': 'OfferCatalog', name: 'Shaped Refractories', description: 'High alumina bricks, fireclay bricks, magnesia bricks, silicon carbide bricks' },
                  { '@type': 'OfferCatalog', name: 'Unshaped Refractories', description: 'Castables, ramming mass, gunning mass, refractory mortar' },
                  { '@type': 'OfferCatalog', name: 'Flow Control Refractories', description: 'Slide gate plates, ladle shrouds, subentry nozzles, tundish nozzles' },
                  { '@type': 'OfferCatalog', name: 'Insulation Products', description: 'Ceramic fiber blankets, modules, boards, calcium silicate, microporous insulation' },
                  { '@type': 'OfferCatalog', name: 'Acid Proofing', description: 'Acid proof bricks, tiles, carbon bricks, acid proof cement' },
                  { '@type': 'OfferCatalog', name: 'Refractory Engineering Services', description: 'Furnace lining design, installation supervision, refractory audit, thermal analysis' },
                ],
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
