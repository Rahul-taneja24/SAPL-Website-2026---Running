import Downloads from '@/sections/Downloads';

export const metadata = {
  title: 'Technical Downloads & Datasheets | Refractory Products | Shanker Agencies',
  description: 'Download technical datasheets, installation guides, heat-up schedules, and company profile for refractory products — high alumina bricks, castables, ceramic fiber, ramming mass & more.',
  alternates: { canonical: '/downloads' },
  openGraph: {
    title: 'Refractory Technical Downloads | Shanker Agencies',
    description: 'Technical datasheets and installation guides for refractory materials — high alumina bricks, LCC castables, ceramic fiber, ramming mass, slide gate plates.',
    url: 'https://www.shankeragencies.com/downloads',
  },
};

export default function DownloadsPage() {
  return <Downloads />;
}
