import CompanyProfile from '@/sections/CompanyProfile';
export const metadata = {
  title: 'Company Profile: 45+ Years, ISO Certified',
  description: 'ISO 9001, 14001 & 45001 certified refractory engineering partner since 1980. Authorised dealer for 7 leading brands, exporting to 50+ countries.',
  alternates: { canonical: '/company-profile' },
  openGraph: {
    title: 'Company Profile: 45+ Years, ISO Certified | Shanker Agencies',
    description: 'ISO 9001, 14001 & 45001 certified refractory engineering partner since 1980. Authorised dealer for 7 leading brands, exporting to 50+ countries.',
    url: 'https://www.shankeragencies.com/company-profile',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Company Profile' }],
  },
};
export default function CompanyProfilePage() { return <CompanyProfile />; }
