import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin, Factory, Package, ShieldCheck, Phone, Award, ChevronRight,
  Building2, Truck, Globe, ArrowRight, CheckCircle2, HelpCircle, Star,
  MessageCircle, Flame
} from 'lucide-react';
import {
  LOCATIONS_DATA,
  getLocationBySlug,
  getRelatedLocations,
} from '@/data/locationsData';

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return LOCATIONS_DATA.map((loc) => ({ locationSlug: loc.slug }));
}

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (!location) return {};

  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: {
      canonical: `/refractory-supplier-in/${location.slug}`,
      languages: {
        'en-IN': `https://www.shankeragencies.com/refractory-supplier-in/${location.slug}`,
        'x-default': `https://www.shankeragencies.com/refractory-supplier-in/${location.slug}`,
      },
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://www.shankeragencies.com/refractory-supplier-in/${location.slug}`,
      siteName: 'Shanker Agencies',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: `Refractory Supplier in ${location.city} | Shanker Agencies` }],
    },
  };
}

// ---------------------------------------------------------------------------
// Product cards data keyed by industry
// ---------------------------------------------------------------------------

const PRODUCTS_BY_INDUSTRY = {
  steel: [
    { name: 'High Alumina Bricks', desc: 'AL-45 to AL-90 grades for blast furnaces, ladles & kilns', icon: Flame },
    { name: 'Magnesia Carbon Bricks', desc: 'For BOF converters, EAF & steel ladle slag zones', icon: Flame },
    { name: 'Low Cement Castables', desc: 'LCC & ULCC for ladle, tundish & torpedo applications', icon: Package },
    { name: 'Slide Gate Plates', desc: 'Precision flow control for ladle & tundish operations', icon: ShieldCheck },
    { name: 'Ramming Mass', desc: 'For induction furnace & ladle bottom lining', icon: Package },
    { name: 'Ceramic Fiber Blankets', desc: 'Insulation for reheating furnaces & ladle covers', icon: ShieldCheck },
  ],
  cement: [
    { name: 'Magnesia Spinel Bricks', desc: 'Chrome-free solution for cement rotary kilns', icon: Flame },
    { name: 'High Alumina Bricks', desc: 'For preheater, calciner & cooler zone linings', icon: Flame },
    { name: 'Low Cement Castables', desc: 'For kiln nose rings, burner pipes & precast shapes', icon: Package },
    { name: 'Insulating Fire Bricks', desc: 'Backup insulation for kiln & preheater shells', icon: ShieldCheck },
    { name: 'Ceramic Fiber Modules', desc: 'High-temperature insulation for kiln hoods & ducts', icon: ShieldCheck },
    { name: 'Refractory Mortar', desc: 'For brick laying in rotary kilns & preheaters', icon: Package },
  ],
  aluminum: [
    { name: 'Non-Wetting Castables', desc: 'Specialized castables resistant to aluminum penetration', icon: Package },
    { name: 'High Alumina Bricks', desc: 'For melting & holding furnace linings', icon: Flame },
    { name: 'Insulating Fire Bricks', desc: 'Backup insulation for aluminum pot linings', icon: ShieldCheck },
    { name: 'Ceramic Fiber Blankets', desc: 'Insulation for launders, troughs & transfer systems', icon: ShieldCheck },
    { name: 'Silicon Carbide Bricks', desc: 'High conductivity linings for aluminum applications', icon: Flame },
    { name: 'Calcium Silicate Boards', desc: 'Rigid insulation for cathode & pot shell insulation', icon: Package },
  ],
  petrochemical: [
    { name: 'Acid Proof Bricks', desc: 'Chemical-resistant lining for acid tanks & towers', icon: Flame },
    { name: 'Acid Proof Tiles', desc: 'Floor and wall lining for chemical areas', icon: Flame },
    { name: 'Ceramic Fiber Blankets', desc: 'High-temperature insulation for process heaters', icon: ShieldCheck },
    { name: 'Calcium Silicate Boards', desc: 'Pipe & vessel insulation for process plants', icon: Package },
    { name: 'Microporous Insulation', desc: 'Ultra-thin insulation for space-constrained areas', icon: ShieldCheck },
    { name: 'Castable Refractories', desc: 'For reactor linings, FCC units & heater tubes', icon: Package },
  ],
  power: [
    { name: 'High Alumina Bricks', desc: 'For boiler furnace walls & superheater zones', icon: Flame },
    { name: 'Castable Refractories', desc: 'Lining for boilers, ducts & ash hoppers', icon: Package },
    { name: 'Ceramic Fiber Modules', desc: 'Fast-install insulation for boiler penthouse & ducts', icon: ShieldCheck },
    { name: 'Insulating Fire Bricks', desc: 'Backup insulation for furnace & boiler walls', icon: ShieldCheck },
    { name: 'Plastic Refractories', desc: 'For burner blocks, peep holes & patching', icon: Package },
    { name: 'Gunning Mass', desc: 'Hot repair of boiler furnace wall damage', icon: Package },
  ],
  glass: [
    { name: 'Fused Cast AZS Blocks', desc: 'For glass melting tank contact zones', icon: Flame },
    { name: 'Zircon Bricks', desc: 'For glass contact & critical wear areas', icon: Flame },
    { name: 'Mullite Bricks', desc: 'For regenerator, crown & superstructure', icon: Flame },
    { name: 'Ceramic Fiber Modules', desc: 'Crown insulation for glass melting furnaces', icon: ShieldCheck },
    { name: 'Insulating Fire Bricks', desc: 'Backup insulation for glass tank shells', icon: ShieldCheck },
    { name: 'Refractory Mortar', desc: 'Specialized jointing for glass furnace construction', icon: Package },
  ],
};

// ---------------------------------------------------------------------------
// Brand data
// ---------------------------------------------------------------------------

const BRANDS = [
  { name: 'CUMI', type: 'Authorized Dealer', desc: 'India\'s largest refractory manufacturer. Full range of shaped & unshaped refractories.' },
  { name: 'Crown Ceramics', type: 'Authorized Dealer', desc: 'Leading acid proof bricks, tiles & carbon brick manufacturer.' },
  { name: 'Divine Cerawool', type: 'Authorized Dealer', desc: 'Ceramic fiber blankets, modules, boards & insulation products.' },
  { name: 'TRL Krosaki', type: 'Supply Partner', desc: 'Magnesia carbon bricks, basic refractories & silicon carbide products.' },
  { name: 'Calderys', type: 'Supply Partner', desc: 'Monolithics, gunning mass, fused cast blocks & microporous insulation.' },
];

// ---------------------------------------------------------------------------
// FAQ generator
// ---------------------------------------------------------------------------

function generateFAQs(location) {
  const { city, state, country, isInternational, industries, majorPlants } = location;
  const loc = isInternational ? city : `${city}, ${state}`;
  const primaryIndustry = industries[0];
  const industryLabel = {
    steel: 'steel', cement: 'cement', aluminum: 'aluminum',
    petrochemical: 'petrochemical', power: 'power generation', glass: 'glass',
  }[primaryIndustry] || primaryIndustry;

  return [
    {
      q: `What refractory products does Shanker Agencies supply in ${city}?`,
      a: `Shanker Agencies supplies the complete range of refractory products in ${loc} including high alumina bricks, fireclay bricks, magnesia bricks, low cement castables, ramming mass, ceramic fiber blankets & modules, acid proof bricks & tiles, slide gate plates, ladle shrouds, and insulating fire bricks. We are authorized dealers of CUMI, Crown Ceramics & Divine Cerawool.`,
    },
    {
      q: `Which industries in ${city} does SAPL serve with refractories?`,
      a: `In ${loc}, SAPL serves ${industries.map(i => industryLabel === i ? `the ${i} industry` : i).join(', ')} sectors. Our major clients in the region include ${majorPlants.slice(0, 3).join(', ')} and other industrial plants requiring high-performance refractory linings and insulation.`,
    },
    {
      q: `How quickly can Shanker Agencies deliver refractory materials to ${city}?`,
      a: isInternational
        ? `For international orders to ${city}, ${country}, SAPL offers CIF and FOB pricing with typical transit times of 7-21 days depending on port and shipping route. We maintain ready stock of common products for faster dispatch. Emergency air-freight options are available for critical requirements.`
        : `SAPL maintains ready stock of commonly used refractory products at our Delhi warehouse. Standard delivery to ${city}, ${state} is 3-7 days via road transport. For urgent requirements, we arrange priority dispatch with express carriers to minimize furnace downtime.`,
    },
    {
      q: `Does Shanker Agencies provide technical support for refractory applications in ${city}?`,
      a: `Yes, SAPL provides comprehensive technical support to ${city} customers including refractory material selection, lining design consultation, installation supervision, refractory audits, post-mortem analysis of spent refractories, and consumption optimization programs. Our experienced refractory engineers ${isInternational ? 'are available for virtual consultations and can travel for on-site projects' : 'regularly visit industrial sites in the region'}.`,
    },
    {
      q: `Why choose Shanker Agencies over other refractory suppliers for ${city}?`,
      a: `Shanker Agencies offers ${city} customers a unique combination of advantages: 45+ years of refractory expertise since 1980, authorized dealerships of CUMI, Crown Ceramics & Divine Cerawool ensuring genuine products at factory-direct pricing, a team of experienced refractory engineers for technical support, proven supply track record to ${isInternational ? '50+ countries' : 'major plants across India'}, and competitive pricing backed by manufacturer partnerships.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LocationPage({ params }) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (!location) notFound();

  const {
    slug, city, state, country, countryCode, region, isInternational,
    industries, majorPlants, h1, content,
  } = location;

  const relatedLocations = getRelatedLocations(slug, 6);
  const faqs = generateFAQs(location);

  const transitTimeByRegion = {
    GCC: '7–14 days',
    ASEAN: '10–21 days',
    Africa: '14–28 days',
    Europe: '18–25 days',
    India: '2–5 days',
  };
  const transitTime = transitTimeByRegion[region] || '7–21 days';

  // Collect product cards for all local industries
  const productCards = [];
  const seen = new Set();
  industries.forEach((ind) => {
    (PRODUCTS_BY_INDUSTRY[ind] || []).forEach((p) => {
      if (!seen.has(p.name)) {
        seen.add(p.name);
        productCards.push(p);
      }
    });
  });

  // JSON-LD: LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Shanker Agencies Pvt. Ltd.',
    alternateName: 'SAPL',
    url: `https://www.shankeragencies.com/refractory-supplier-in/${slug}`,
    logo: 'https://www.shankeragencies.com/logo.png',
    image: 'https://www.shankeragencies.com/og-image.jpg',
    description: location.metaDescription,
    telephone: '+91-9899957888',
    email: 'info@shankeragencies.com',
    foundingDate: '1980',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '553, Main Grand Trunk Road, East Ram Nagar',
      addressLocality: 'Shahdara',
      addressRegion: 'Delhi',
      postalCode: '110032',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'Country',
        name: country,
      },
    },
    serviceArea: {
      '@type': 'GeoShape',
      description: `Refractory export supply to ${country} and surrounding region`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Refractory Products, CIF ${city}`,
      url: 'https://www.shankeragencies.com/products',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  // JSON-LD: FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.shankeragencies.com/refractory-supplier-in' },
      { '@type': 'ListItem', position: 3, name: city, item: `https://www.shankeragencies.com/refractory-supplier-in/${slug}` },
    ],
  };

  // JSON-LD: WebPage with Speakable, helps Google Assistant / voice AI read our answers
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://www.shankeragencies.com/refractory-supplier-in/${slug}#webpage`,
    url: `https://www.shankeragencies.com/refractory-supplier-in/${slug}`,
    name: location.metaTitle,
    description: location.metaDescription,
    inLanguage: 'en-IN',
    isPartOf: { '@id': 'https://www.shankeragencies.com/#website' },
    about: { '@id': 'https://www.shankeragencies.com/#organization' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: 'h1, h2, [data-speakable], .prose p',
    },
    ...(location.relatedBlogPosts?.length > 0 && {
      mentions: location.relatedBlogPosts.map((post) => ({
        '@type': 'Article',
        name: post.title,
        url: `https://www.shankeragencies.com${post.url}`,
      })),
    }),
  };

  // JSON-LD: Service, positions the listing as a genuine service, not just content
  const cityServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://www.shankeragencies.com/refractory-supplier-in/${slug}#service`,
    name: `Refractory supplier in ${city}`,
    description: `Supply of refractory bricks, castables, ramming mass, ceramic fibre, acid-proof bricks and flow control products to industrial plants in ${city}${isInternational ? `, ${country}` : `, ${state}`}.`,
    serviceType: 'Refractory Supply',
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'Country', name: country },
    },
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.shankeragencies.com/#organization',
      name: 'Shanker Agencies Pvt. Ltd.',
    },
  };

  const industryLabel = (id) =>
    ({ steel: 'Iron & Steel', cement: 'Cement', aluminum: 'Aluminum', petrochemical: 'Petrochemical', power: 'Power Generation', glass: 'Glass' })[id] || id;

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceSchema) }} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.94) 0%, rgba(30,58,138,0.88) 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Location badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-[#F97316]" />
              {isInternational ? `${city}, ${country}` : `${city}, ${state}, India`}
            </span>
            {isInternational && (
              <span className="inline-flex items-center gap-1.5 bg-[#F97316]/20 backdrop-blur-sm text-[#F97316] text-sm font-medium px-3 py-1.5 rounded-full border border-[#F97316]/30">
                <Globe className="w-3.5 h-3.5" /> Export
              </span>
            )}
          </div>

          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            {h1}
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            {content.intro.substring(0, 220)}...
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" /> Get a Quote
            </Link>
            <a
              href="https://wa.me/919899957888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Years Experience', value: '45+' },
              { label: 'Countries Served', value: '50+' },
              { label: 'Products Range', value: '500+' },
              { label: 'Authorized Brands', value: '3' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
                <div className="font-oswald text-2xl md:text-3xl font-bold text-[#F97316]">{stat.value}</div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BREADCRUMB */}
      {/* ------------------------------------------------------------------ */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <li><Link href="/" className="hover:text-[#1E3A5F] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li><Link href="/refractory-supplier-in" className="hover:text-[#1E3A5F] transition-colors">Locations</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-[#1E3A5F] font-medium">{city}</li>
          </ol>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* EXPORT CTA, international locations only                          */}
      {/* ------------------------------------------------------------------ */}
      {isInternational && (
        <section className="py-12 md:py-16 bg-blue-50 border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">
                  Get CIF Quote for {city}, {country}
                </h2>
                <p className="text-gray-700 mb-5 leading-relaxed">
                  Shanker Agencies exports refractory products directly to {country}. We provide CIF {city} pricing with full documentation, MTC, Certificate of Origin, Packing List, and Bill of Lading, and typical transit time of {transitTime} from Delhi NCR.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'CIF and FOB pricing available',
                    'Samples before bulk orders',
                    'Material Test Certificate (MTC) with every shipment',
                    'Certificate of Origin for customs clearance',
                    'Technical support from our refractory engineers',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/contact?enquiry=export&destination=${encodeURIComponent(city)}`}
                    className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Request CIF Quote for {city}
                  </Link>
                  <Link
                    href="/blog/importing-refractories-from-india-buyers-guide"
                    className="inline-flex items-center gap-2 border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    How export ordering works <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: `Transit time to ${city}`, value: transitTime },
                  { label: 'Incoterms offered', value: 'CIF · FOB · CFR' },
                  { label: 'Response time', value: '4 business hours' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
                    <p className="font-oswald text-xl font-bold text-[#1E3A5F]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* INTRO CONTENT */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">
              Refractory Solutions for {city}&apos;s Industries
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>{content.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LOCAL INDUSTRY SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Factory className="w-7 h-7 text-[#F97316]" />
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Industries We Serve in {city}
            </h2>
          </div>
          <p className="text-gray-600 mb-10 max-w-3xl">{content.industries}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {industries.map((ind) => (
              <Link
                key={ind}
                href={`/solutions/${ind}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#F97316]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#1E3A5F]" />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">
                    {industryLabel(ind)}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialized refractory solutions for {industryLabel(ind).toLowerCase()} applications in {city}.
                </p>
                <span className="inline-flex items-center gap-1 text-[#F97316] text-sm font-medium mt-3">
                  View Solutions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {/* Major plants */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="font-oswald text-xl font-semibold text-[#1E3A5F] mb-4">
              Major Industrial Plants in {city} Region
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {majorPlants.map((plant) => (
                <div key={plant} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{plant}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRODUCTS WE SUPPLY */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-7 h-7 text-[#F97316]" />
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Refractory Products We Supply in {city}
            </h2>
          </div>
          <p className="text-gray-600 mb-10 max-w-3xl">{content.products}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productCards.slice(0, 12).map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.name}
                  href="/products"
                  className="group bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md p-5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-[#F97316]" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-base font-semibold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{product.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHY CHOOSE SAPL */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-7 h-7 text-[#F97316]" />
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Why Choose Shanker Agencies for {city}
            </h2>
          </div>
          <p className="text-gray-600 mb-10 max-w-3xl">{content.whyUs}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: '45+ Years in the Trade',
                desc: `SAPL has been in the refractory business since 1980. The experience helps ${city} customers pick the right grade first time, which saves money and avoids unplanned downtime.`,
              },
              {
                icon: ShieldCheck,
                title: 'Authorised Dealer',
                desc: 'Authorised dealer of CUMI, Crown Ceramics and Divine Cerawool; supply partner for Calderys, TRL Krosaki, Mahakoshal and Saint-Gobain. Every dispatch ships with the original manufacturer test certificate.',
              },
              {
                icon: Factory,
                title: 'Precast &amp; Custom Shapes',
                desc: 'Beyond stock items, we have precast shapes and non-standard sizes made for unusual furnace geometries. Tell us the drawing, we indent it from the factory.',
              },
              {
                icon: Truck,
                title: `Reliable Delivery to ${city}`,
                desc: isInternational
                  ? `Established export logistics to ${country} with competitive CIF pricing, full documentation, and reliable transit schedules.`
                  : `Optimized logistics network ensures timely delivery to ${city} and surrounding industrial areas from our strategically located warehouse.`,
              },
              {
                icon: Building2,
                title: 'Technical Engineering Support',
                desc: 'Our refractory engineers provide lining design, material selection, installation supervision, audits, and consumption optimization programs.',
              },
              {
                icon: Globe,
                title: 'Pan-India & Global Reach',
                desc: 'Supplying to 50+ countries and all major Indian industrial hubs, SAPL brings global refractory knowledge to local applications.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1E3A5F]" />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold text-[#1E3A5F] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BRANDS AVAILABLE */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-7 h-7 text-[#F97316]" />
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Refractory Brands Available in {city}
            </h2>
          </div>
          <p className="text-gray-600 mb-10 max-w-3xl">
            We bring you genuine refractory products from India&apos;s top manufacturers. As authorized dealers and supply partners, every product comes with manufacturer warranty and full technical documentation.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href="/brands"
                className="group bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md p-6 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">
                    {brand.name}
                  </h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    brand.type === 'Authorized Dealer'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {brand.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{brand.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.96) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {isInternational
              ? `Get CIF Quote, Refractory Export to ${city}`
              : `Get a Quote for Refractory Supply in ${city}`}
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-2xl mx-auto">
            {isInternational
              ? `SAPL ships full containers and LCL shipments to ${city} with CIF pricing, MTC/COO documentation, and 7–21 day transit. All major branded grades in stock.`
              : `Whether you need a single pallet or full container loads, SAPL provides competitive pricing, genuine branded products, and expert technical support for ${city}'s industries.`}
          </p>
          {isInternational && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { label: 'CIF & FOB pricing available' },
                { label: 'MTC · COO · MSDS included' },
                { label: '7–21 day transit to most ports' },
              ].map(({ label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-white/10 rounded-full px-3 py-1.5 border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />{label}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/919899957888?text=${encodeURIComponent(`Hi, I need a CIF quote for refractory supply to ${city}. Please advise.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {isInternational ? `WhatsApp for CIF Quote` : `WhatsApp: +91-9899957888`}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              {isInternational ? `Send Enquiry` : `Contact Us for a Quote`}
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Call us: <a href="tel:+919899957888" className="text-white/80 hover:text-white underline">+91-9899957888</a> |
            Email: <a href="mailto:info@shankeragencies.com" className="text-white/80 hover:text-white underline">info@shankeragencies.com</a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-7 h-7 text-[#F97316]" />
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Frequently Asked Questions - Refractory Supply in {city}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                  <h3 className="font-oswald text-base md:text-lg font-semibold text-[#1E3A5F] pr-4">
                    {faq.q}
                  </h3>
                </summary>
                <div className="px-5 pb-5 pl-13">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base ml-8">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RELATED LOCATIONS */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-4">
            Other Locations We Supply Refractories
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Shanker Agencies supplies refractory products across India and to 50+ countries worldwide.
            Explore our presence in other industrial hubs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/refractory-supplier-in/${loc.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md p-5 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#F97316]" />
                  <h3 className="font-oswald text-lg font-semibold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">
                    {loc.city}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  {loc.isInternational ? loc.country : `${loc.state}, India`}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {loc.industries.slice(0, 3).map((ind) => (
                    <span key={ind} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {industryLabel(ind)}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/refractory-supplier-in"
              className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#F97316] font-semibold transition-colors"
            >
              View All Locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
