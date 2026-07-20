import CompanyProfile from '@/sections/CompanyProfile';
export const metadata = {
  title: 'Company Profile | Shanker Agencies Pvt. Ltd.',
  description: 'Complete company profile of Shanker Agencies Pvt. Ltd.: 45 years of refractory engineering, export markets, brands and certifications.',
  alternates: { canonical: '/company-profile' },
  openGraph: {
    title: 'Company Profile | Shanker Agencies Pvt. Ltd.',
    description: 'Complete company profile of Shanker Agencies Pvt. Ltd.: 45 years of refractory engineering, export markets, brands and certifications.',
    url: 'https://www.shankeragencies.com/company-profile',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Company Profile' }],
  },
};
export default function CompanyProfilePage() { return <CompanyProfile />; }
