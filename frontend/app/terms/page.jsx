import TermsOfService from '@/sections/TermsOfService';
export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Shanker Agencies Pvt. Ltd. covering orders, pricing, delivery and use of shankeragencies.com.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Shanker Agencies',
    description: 'Terms of service for Shanker Agencies Pvt. Ltd. covering orders, pricing and delivery.',
    url: 'https://www.shankeragencies.com/terms',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies' }],
  },
};
export default function TermsPage() { return <TermsOfService />; }
