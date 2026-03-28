import { notFound } from 'next/navigation';
import Brands from '@/sections/Brands';

const VALID_BRANDS = [
  { slug: 'cumi', name: 'CUMI Super Refractories', desc: 'High alumina bricks, castables, ramming mass, insulating fire bricks and ceramic fiber products.' },
  { slug: 'calderys', name: 'Calderys', desc: 'Monolithic refractories, castables, gunning mixes and specialty refractory solutions for steel, cement and glass.' },
  { slug: 'trl-krosaki', name: 'TRL Krosaki', desc: 'MgO-C bricks, magnesia bricks, silicon carbide products and advanced refractories for iron and steel.' },
  { slug: 'ifgl', name: 'IFGL Refractories', desc: 'Slide gate plates, ladle shrouds, subentry nozzles, monoblock stoppers and continuous casting flow control refractories.' },
  { slug: 'divine-cerawool', name: 'Divine Cerawool', desc: 'Ceramic fiber blankets, modules, boards and calcium silicate insulation for high-temperature applications.' },
  { slug: 'crown-ceramics', name: 'Crown Ceramics', desc: 'Acid proof bricks, acid resistant tiles, carbon bricks and acid-resistant cement for chemical plants.' },
  { slug: 'mahakoshal', name: 'Mahakoshal Refractories', desc: 'Refractory bricks and castables for steel and industrial furnace applications.' },
];

export async function generateStaticParams() {
  return VALID_BRANDS.map(({ slug }) => ({ brandSlug: slug }));
}

export async function generateMetadata({ params }) {
  const brand = VALID_BRANDS.find((b) => b.slug === params.brandSlug);
  if (!brand) {
    return {
      title: 'Brand Not Found | Shanker Agencies',
      description: 'The requested brand page was not found.',
    };
  }
  return {
    title: `${brand.name} Refractory Products | Authorized Distributor India | Shanker Agencies`,
    description: `Shanker Agencies is an authorized distributor of ${brand.name} refractory products in India. ${brand.desc} Expert technical support since 1980.`,
    alternates: { canonical: `/brands/${params.brandSlug}` },
    openGraph: {
      title: `${brand.name} | Authorized Distributor | Shanker Agencies`,
      description: `${brand.name} refractory products from India's trusted distributor since 1980. ${brand.desc}`,
      url: `https://www.shankeragencies.com/brands/${params.brandSlug}`,
    },
  };
}

export default function BrandDetailPage({ params }) {
  const brand = VALID_BRANDS.find((b) => b.slug === params.brandSlug);
  if (!brand) notFound();
  return <Brands />;
}
