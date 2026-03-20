import { Toaster } from 'sonner';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ScrollRevealManager, ScrollProgressBar } from '@/components/ScrollAnimations';
import '../src/App.css';
import '../src/index.css';

export const metadata = {
  metadataBase: new URL('https://www.shankeragencies.com'),
  title: {
    default: "Shanker Agencies | India's Leading Refractory Engineering Partner Since 1980",
    template: '%s | Shanker Agencies',
  },
  description:
    'Authorized distributor of CUMI, Calderys, TRL Krosaki & IFGL refractory products. Serving steel, aluminium, cement & glass industries across India, GCC & ASEAN since 1980.',
  keywords: [
    'refractory supplier India', 'CUMI refractory distributor', 'Calderys India',
    'TRL Krosaki distributor', 'IFGL refractories', 'refractory materials Delhi',
    'castable refractory', 'mullite bricks', 'high alumina bricks',
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
              url: 'https://www.shankeragencies.com',
              logo: 'https://www.shankeragencies.com/logo.png',
              foundingDate: '1980',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '553, Main G.T Road, Shahdara',
                addressLocality: 'Delhi',
                postalCode: '110032',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9899957888',
                contactType: 'sales',
                email: 'info@shankeragencies.com',
                areaServed: ['IN', 'AE', 'SA', 'SG', 'MY'],
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
