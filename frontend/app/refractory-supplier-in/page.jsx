import Link from 'next/link';
import {
  MapPin, Globe, ChevronRight, ArrowRight, Phone, MessageCircle,
  Building2, Factory, Package
} from 'lucide-react';
import { LOCATIONS_DATA, getAllRegions, getLocationsByRegion } from '@/data/locationsData';

export const metadata = {
  title: 'Refractory Supplier Locations | India & Global Supply Network - Shanker Agencies',
  description:
    'Shanker Agencies supplies refractory products across India and to 50+ countries. Find refractory bricks, castables, insulation & acid proof materials for steel, cement, aluminum & petrochemical plants in your city. Authorized CUMI, Crown Ceramics & Divine Cerawool dealer.',
  alternates: { canonical: '/refractory-supplier-in' },
  openGraph: {
    title: 'Refractory Supplier Locations | India & Global Supply Network',
    description:
      'Find Shanker Agencies refractory supply locations across India, GCC, ASEAN, Africa & Europe. 45+ years serving steel, cement & process industries worldwide.',
    url: 'https://www.shankeragencies.com/refractory-supplier-in',
    siteName: 'Shanker Agencies',
    locale: 'en_IN',
    type: 'website',
  },
};

const REGION_META = {
  India: {
    icon: Building2,
    tagline: 'Pan-India Refractory Supply from Delhi to Chennai',
    desc: 'Our domestic network covers every major industrial hub in India, from the steel belt of eastern India to the refinery corridor of western India. Same-week delivery to all locations.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  GCC: {
    icon: Globe,
    tagline: 'Refractory Exports to GCC & Middle East',
    desc: 'Competitive CIF pricing to UAE, Saudi Arabia, Qatar & Oman. Established trade relationships with steel, cement and petrochemical plants across the Gulf region.',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  ASEAN: {
    icon: Factory,
    tagline: 'Refractory Supply to Southeast Asia',
    desc: 'Serving the fast-growing steel and cement industries of Vietnam, Indonesia & Singapore with quality Indian-origin refractories at competitive pricing.',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  Africa: {
    icon: Package,
    tagline: 'Refractory Exports to Africa',
    desc: 'Supporting Africa\'s industrial growth with refractories for cement giants like Dangote, steel mills, and mineral processing plants across West, East & Southern Africa.',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  Europe: {
    icon: Globe,
    tagline: 'Refractory Supply to European Industries',
    desc: 'EN-certified refractory products for UK and European steel, cement and glass manufacturers. Competitive Indian-origin pricing with full compliance documentation.',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
};

const industryLabel = (id) =>
  ({ steel: 'Iron & Steel', cement: 'Cement', aluminum: 'Aluminum', petrochemical: 'Petrochemical', power: 'Power', glass: 'Glass' })[id] || id;

export default function LocationsIndexPage() {
  const regions = getAllRegions();

  // JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shankeragencies.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.shankeragencies.com/refractory-supplier-in' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.94) 0%, rgba(30,58,138,0.88) 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
              <Globe className="w-4 h-4 text-[#F97316]" />
              India &amp; 50+ Countries
            </span>
          </div>

          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            Refractory Supply Locations Across India &amp; the World
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            Shanker Agencies Pvt. Ltd. supplies high-performance refractory products to steel, cement,
            aluminum, petrochemical, and glass industries across India and 50+ countries. With 45+ years of
            expertise and authorized dealerships of CUMI, Crown Ceramics &amp; Divine Cerawool, we are
            your trusted refractory engineering partner wherever your plant operates.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" /> Request a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors"
            >
              <Package className="w-4 h-4" /> View Products
            </Link>
          </div>

          {/* Region quick links */}
          <div className="flex flex-wrap gap-2 mt-10">
            {regions.map((r) => (
              <a
                key={r}
                href={`#${r.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded-full border border-white/15 transition-colors"
              >
                {r}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#1E3A5F] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-[#1E3A5F] font-medium">Locations</li>
          </ol>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* OVERVIEW */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">
              Your Refractory Partner, Wherever You Operate
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
              <p>
                Since 1980, Shanker Agencies Pvt. Ltd. (SAPL) has been building India&apos;s most comprehensive
                refractory supply network. From our headquarters in Delhi, we serve every major industrial city
                in India and export to over 50 countries across the GCC, Southeast Asia, Africa, and Europe.
              </p>
              <p>
                Whether you operate a blast furnace in Jamshedpur, a cement kiln in Riyadh, or an aluminum
                smelter in Dubai, SAPL delivers the right refractory materials at competitive pricing with
                reliable technical support. Our authorized dealerships of CUMI, Crown Ceramics, and Divine
                Cerawool ensure you receive genuine products backed by manufacturer warranties.
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: `${LOCATIONS_DATA.length}+`, label: 'Supply Locations' },
              { value: '50+', label: 'Countries Served' },
              { value: '45+', label: 'Years Experience' },
              { value: '500+', label: 'Products Available' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-center">
                <div className="font-oswald text-3xl md:text-4xl font-bold text-[#F97316]">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LOCATIONS BY REGION */}
      {/* ------------------------------------------------------------------ */}
      {regions.map((regionName) => {
        const locations = getLocationsByRegion(regionName);
        const meta = REGION_META[regionName] || REGION_META.India;
        const RegionIcon = meta.icon;

        return (
          <section
            key={regionName}
            id={regionName.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 md:py-20 odd:bg-gray-50 even:bg-white scroll-mt-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Region header */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.color} border`}>
                  <RegionIcon className="w-5 h-5" />
                </div>
                <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
                  {meta.tagline}
                </h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-3xl ml-13">{meta.desc}</p>

              {/* Location cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/refractory-supplier-in/${loc.slug}`}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md p-5 transition-all"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <MapPin className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                      <h3 className="font-oswald text-lg font-semibold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">
                        {loc.city}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm mb-3">
                      {loc.isInternational ? loc.country : `${loc.state}, India`}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {loc.industries.slice(0, 3).map((ind) => (
                        <span key={ind} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {industryLabel(ind)}
                        </span>
                      ))}
                      {loc.industries.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          +{loc.industries.length - 3} more
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{loc.description}</p>

                    <span className="inline-flex items-center gap-1 text-[#F97316] text-sm font-medium">
                      View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ------------------------------------------------------------------ */}
      {/* CTA */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.96) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t See Your Location? We Still Supply There.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            SAPL supplies refractory products to industrial sites across India and 50+ countries.
            Contact us with your location and requirements for a customized quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <Phone className="w-5 h-5" /> Contact Us
            </Link>
            <a
              href="https://wa.me/919899957888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp: +91-9899957888
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/60 text-sm">
            <Link href="/products" className="hover:text-white underline transition-colors">Browse Products</Link>
            <Link href="/brands" className="hover:text-white underline transition-colors">Our Brands</Link>
            <Link href="/industries" className="hover:text-white underline transition-colors">Industries We Serve</Link>
            <Link href="/about" className="hover:text-white underline transition-colors">About SAPL</Link>
          </div>
        </div>
      </section>
    </>
  );
}
