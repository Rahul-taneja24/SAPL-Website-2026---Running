import PrivacyPolicy from '@/sections/PrivacyPolicy';
export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Shanker Agencies Pvt. Ltd., how we collect, use and protect visitor and customer data on shankeragencies.com.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Shanker Agencies',
    description: 'Privacy policy for Shanker Agencies Pvt. Ltd., how we collect, use and protect visitor and customer data.',
    url: 'https://www.shankeragencies.com/privacy',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies' }],
  },
};
export default function PrivacyPage() { return <PrivacyPolicy />; }
