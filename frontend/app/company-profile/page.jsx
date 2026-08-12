import CompanyProfile from '@/sections/CompanyProfile';
export const metadata = {
  title: 'Company Profile: 45+ Years in Refractories',
  description: 'Refractory engineering and procurement partner since 1980, helping industrial buyers source materials and technical solutions for demanding high-temperature applications.',
  alternates: { canonical: '/company-profile' },
  openGraph: {
    title: 'Company Profile: 45+ Years in Refractories | Shanker Agencies',
    description: 'Refractory engineering and procurement partner since 1980, helping industrial buyers source materials and technical solutions for demanding high-temperature applications.',
    url: 'https://www.shankeragencies.com/company-profile',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Shanker Agencies Company Profile' }],
  },
};
export default function CompanyProfilePage() { return <CompanyProfile />; }
