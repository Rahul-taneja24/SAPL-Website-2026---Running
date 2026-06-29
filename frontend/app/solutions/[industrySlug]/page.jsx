import { notFound } from 'next/navigation';
import IndustrySolutions from '@/sections/IndustrySolutions';

const SOLUTION_DATA = {
  steel: {
    name: 'Steel',
    failureModes: ['slag attack on ladle lining', 'thermal shock cracking at the tundish', 'erosion at the EAF hot spot'],
    deliverables: ['lining design review', 'grade selection for hot spots', 'installation supervision', 'post-mortem and wear profile'],
  },
  cement: {
    name: 'Cement',
    failureModes: ['coating loss in the burning zone', 'thermo-mechanical spalling in the kiln', 'chemical attack from alkalis and sulphates'],
    deliverables: ['kiln mapping and grade zoning', 'pre-heater cyclone lining design', 'cooler basic brick selection', 'shut-down lining survey'],
  },
  aluminum: {
    name: 'Aluminium',
    failureModes: ['molten aluminium penetration', 'corundum growth', 'cryolite attack in the smelter pot'],
    deliverables: ['non-wetting castable selection', 'cast house lining layout', 'holding furnace refurbishment plan'],
  },
  glass: {
    name: 'Glass',
    failureModes: ['AZS upward drilling in the melting tank', 'superstructure condensation drip', 'regenerator checker attack'],
    deliverables: ['campaign-life modelling', 'AZS grade and position selection', 'regenerator rebuild scheduling'],
  },
  petrochemical: {
    name: 'Petrochemical',
    failureModes: ['insulation failure under cyclic loads', 'carburisation on reformer tubes', 'sulphur attack on SRU refractories'],
    deliverables: ['hot-face / cold-face lining design', 'dry-out curve planning', 'ceramic fibre module blanket layout'],
  },
  power: {
    name: 'Power',
    failureModes: ['abrasion on CFBC bed coils', 'thermal cycling cracks', 'ash chemistry attack on boiler linings'],
    deliverables: ['SiC castable grade matching', 'bed coil protection lining', 'annual outage lining audit'],
  },
  foundry: {
    name: 'Foundry',
    failureModes: ['sintering of induction furnace lining', 'hot spots at the slag line', 'mechanical wear during charging'],
    deliverables: ['ramming mass grade selection', 'push-out &amp; sintering procedure', 'ladle lining optimisation'],
  },
  ceramic: {
    name: 'Ceramic',
    failureModes: ['kiln car deck thermal fatigue', 'IFB spalling', 'hot face contamination'],
    deliverables: ['kiln car refractory layout', 'low-thermal-mass lining design', 'energy audit for fuel savings'],
  },
};

// Only the eight known solution slugs are valid, any other slug returns a real 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(SOLUTION_DATA).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({ params }) {
  const { industrySlug } = await params;
  const data = SOLUTION_DATA[industrySlug];
  const name = data?.name || industrySlug;
  const title = `${name} Refractory Solutions | Shanker Agencies`;
  const description = `Lining design, grade selection and installation support for ${name.toLowerCase()} plants. Plant-side engineering help from Shanker Agencies since 1980, partnered with CUMI, TRL Krosaki, IFGL, Calderys and Mahakoshal.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/solutions/${industrySlug}`,
      languages: {
        'en-IN': `https://www.shankeragencies.com/solutions/${industrySlug}`,
        'x-default': `https://www.shankeragencies.com/solutions/${industrySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.shankeragencies.com/solutions/${industrySlug}`,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function buildSolutionJsonLd(slug, data) {
  const url = `https://www.shankeragencies.com/solutions/${slug}`;
  const name = data?.name || slug;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${name} refractory engineering solutions`,
      description: `Lining design, grade selection, installation supervision and post-mortem for ${name.toLowerCase()} plants across India and 50+ export markets.`,
      serviceType: 'Refractory Engineering',
      provider: {
        '@type': 'Organization',
        '@id': 'https://www.shankeragencies.com/#organization',
        name: 'Shanker Agencies Pvt. Ltd.',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Singapore' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: `What kinds of refractory failures do you help solve in ${name.toLowerCase()} plants?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Common issues we address include ${(data?.failureModes || []).join('; ')}. Our engineers look at grade selection, installation practice and process conditions together, because most lining failures have more than one root cause.`,
          },
        },
        {
          '@type': 'Question',
          name: `What does a Shanker Agencies engineering engagement typically include?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `For a ${name.toLowerCase()} plant we typically provide: ${(data?.deliverables || []).join(', ')}. We can also train the site maintenance team on installation and dry-out practice.`,
          },
        },
        {
          '@type': 'Question',
          name: `Do you visit plant sites outside Delhi?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. Our engineers travel across India regularly and visit export customers in GCC, ASEAN and Europe for key shutdowns. Site visits are normally scheduled around planned maintenance windows.`,
          },
        },
        {
          '@type': 'Question',
          name: `Is the engineering support tied to a specific brand?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `No. We are an authorised dealer for CUMI, Crown Ceramics, Divine Cerawool and Mahakoshal and a supply partner for TRL Krosaki, IFGL and Calderys. The recommended grade is picked on engineering merit for your plant, not on brand lock-in.`,
          },
        },
      ],
    },
  ];
}

export default async function SolutionDetailPage({ params }) {
  const { industrySlug } = await params;
  const data = SOLUTION_DATA[industrySlug];
  if (!data) notFound();
  const jsonLd = buildSolutionJsonLd(industrySlug, data);
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <IndustrySolutions />
    </>
  );
}
