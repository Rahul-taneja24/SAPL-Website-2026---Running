'use client';
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ExternalLink, ChevronRight, ChevronLeft, Package, Factory, Award, Globe, Shield, CheckCircle, Phone, MessageCircle, Flame, Layers, Thermometer, Zap, Home } from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const brandsData = [
  {
    id: "calderys",
    name: "Calderys",
    fullName: "Calderys India Refractories Ltd",
    tagline: "Global Heat Containment Leader",
    logo: "/images/brands/calderys.png",
    website: "https://www.calderys.com",
    color: "#7C3AED",
    accentColor: "#A78BFA",
    founded: "1875",
    headquarters: "Lyon, France",
    parent: "Imerys Group",
    desc: "A world leader in heat containment and flow control solutions operating in 35+ countries. As part of Imerys Group, Calderys combines global R&D expertise with local manufacturing in India. Known for premium monolithic refractories used in critical steel and petrochemical applications.",
    strengths: ["World-class R&D capability", "Premium monolithic expertise", "Global technical support", "35+ country presence"],
    products: ["Premium LCC/ULCC Castables", "Self-Flow Castables", "Shotcrete Materials", "Anchor Systems", "Specialty Gunning Mixes"],
    industries: ["Steel", "Petrochemical", "Cement", "Aluminum", "Non-ferrous"],
  },
  {
    id: "crown",
    name: "Crown Ceramics",
    fullName: "Crown Ceramics Pvt Ltd",
    tagline: "Acid Resistant & Chemical Solutions",
    logo: "/images/brands/crown.png",
    website: null,
    color: "#6B21A8",
    accentColor: "#C084FC",
    founded: "2000",
    headquarters: "Gujarat, India",
    parent: "Independent",
    desc: "Specializes in acid-resistant and chemical-resistant ceramic products for corrosive industrial environments. Crown Ceramics provides vitrified ceramic tiles, bricks, and packing materials for chemical plants, fertilizer units, and effluent treatment facilities. Their products conform to IS:4860 and BS:784 standards.",
    strengths: ["IS:4860 & BS:784 certified", "Full acid-proof range", "Chemical & pharma expertise", "Custom chemical resistance testing"],
    products: ["Acid Proof Bricks (Class A & B)", "Acid Resistant Tiles", "Chemical Resistant Mortars", "FRP/Epoxy Cements"],
    industries: ["Chemical", "Fertilizer", "Pharmaceutical", "Effluent Treatment"],
  },
  {
    id: "cumi",
    name: "CUMI",
    fullName: "Carborundum Universal Limited",
    tagline: "India's Largest Refractory Manufacturer",
    logo: "/images/brands/cumi.png",
    website: "https://www.cumi-murugappa.com",
    color: "#1E3A5F",
    accentColor: "#3B82F6",
    founded: "1954",
    headquarters: "Chennai, India",
    parent: "Murugappa Group",
    desc: "Part of the Murugappa Group, CUMI is India's largest and most diversified manufacturer of abrasives, ceramics, and refractories. With over 60 years of innovation, CUMI operates multiple manufacturing plants and is trusted by India's leading steel and cement companies.",
    strengths: ["Largest domestic refractory manufacturer", "Widest product range", "Extensive pan-India distribution", "ISO and BIS certified quality"],
    products: ["High Alumina Bricks (AL45–AL90)", "Fireclay Bricks", "Insulating Fire Bricks", "Castables & Gunning Mixes", "Ceramic Fiber Products"],
    industries: ["Steel", "Cement", "Aluminum", "Glass", "Foundry", "Power"],
  },
  {
    id: "divine",
    name: "Divine Cerawool",
    fullName: "Divine Cera Wool India LLP",
    tagline: "Ceramic Fiber Insulation Experts",
    logo: "/images/brands/divine.png",
    website: null,
    color: "#1D4ED8",
    accentColor: "#60A5FA",
    founded: "2005",
    headquarters: "Gujarat, India",
    parent: "Independent",
    desc: "A leading Indian manufacturer of ceramic fiber insulation products providing superior thermal insulation for high-temperature applications. Divine Cerawool's product range covers blankets, boards, modules, papers, and preformed shapes for furnaces up to 1600°C. Their products are used in automotive, petrochemical, and general industrial furnace applications.",
    strengths: ["Full ceramic fiber range", "1260–1600°C capability", "Cost-effective vs imports", "Custom cut-to-size available"],
    products: ["CF Blankets (1260°C & 1400°C)", "CF Boards", "Folded Modules", "CF Paper & Rope", "Backup Insulation Boards"],
    industries: ["Steel", "Petrochemical", "Cement", "Power", "Automotive"],
  },
  {
    id: "ifgl",
    name: "IFGL",
    fullName: "IFGL Refractories Ltd",
    tagline: "Flow Control Specialists",
    logo: "/images/brands/ifgl.png",
    website: "https://www.ifglref.com",
    color: "#065F46",
    accentColor: "#10B981",
    founded: "1989",
    headquarters: "Kolkata, India",
    parent: "Listed on NSE/BSE",
    desc: "India's leading manufacturer of flow control refractories for the steel industry with state-of-the-art manufacturing and dedicated R&D facilities. IFGL is a publicly listed company with exports to 25+ countries. Their flow control products — slide gates, tundish nozzles, and monoblock stoppers — are used by 100+ steel mills worldwide.",
    strengths: ["Flow control market leader", "25+ country exports", "Dedicated R&D centre", "100+ steel mill customers"],
    products: ["Slide Gate Systems", "Monoblock Stoppers", "Tundish Nozzles", "Ladle Shrouds", "Porous Plugs"],
    industries: ["Steel"],
  },
  {
    id: "mahakoshal",
    name: "Mahakoshal",
    fullName: "Mahakoshal Refractories Pvt Ltd",
    tagline: "Quality Shaped Refractories",
    logo: "/images/brands/mahakoshal.png",
    website: null,
    color: "#92400E",
    accentColor: "#F59E0B",
    founded: "1995",
    headquarters: "Madhya Pradesh, India",
    parent: "Independent",
    desc: "A trusted Indian manufacturer of high-quality shaped refractories specializing in high alumina and fireclay bricks. Mahakoshal serves the steel, cement, and foundry industries with consistent quality and competitive pricing. Their manufacturing facility is BIS certified and produces to both Indian and international standards.",
    strengths: ["Competitive pricing", "BIS certified manufacturing", "Reliable delivery", "Custom sizes available"],
    products: ["High Alumina Bricks (AL45–AL70)", "Fireclay Bricks", "Dense High Alumina Shapes", "Custom Precast Shapes"],
    industries: ["Steel", "Cement", "Foundry", "Power"],
  },
  {
    id: "trl-krosaki",
    name: "TRL Krosaki",
    fullName: "TRL Krosaki Refractories Ltd",
    tagline: "Tata Group · Japanese Technology",
    logo: "/images/brands/trl.png",
    website: "https://trlkrosaki.com",
    color: "#0F4C81",
    accentColor: "#F97316",
    founded: "1958",
    headquarters: "Odisha, India",
    parent: "Tata Group + Krosaki Harima Corporation",
    desc: "A joint venture between Tata Steel and Japan's Krosaki Harima Corporation — one of the world's top refractory companies. TRL Krosaki brings Japanese manufacturing precision and Tata quality standards to India. Particularly strong in flow control products for continuous casting and basic refractories for BOF/EAF.",
    strengths: ["Japanese technology partnership", "Tata Group quality standards", "Flow control excellence", "Strong basic refractory range"],
    products: ["Slide Gate Plates", "Ladle Shrouds", "Subentry Nozzles", "MgO-C Bricks", "Dolomite Bricks"],
    industries: ["Steel", "Foundry", "Cement"],
  },
  {
    id: "saint-gobain",
    name: "Saint-Gobain",
    fullName: "Saint-Gobain Performance Ceramics & Refractories",
    tagline: "HeatKing · Global Performance Ceramics",
    logo: null,
    website: "https://www.ceramicsrefractories.saint-gobain.com",
    color: "#0A4B8C",
    accentColor: "#E2231A",
    founded: "1665",
    headquarters: "France (global operations)",
    parent: "Saint-Gobain Group",
    desc: "A global leader in performance ceramics and refractories, part of the 350-year-old Saint-Gobain Group. Its HeatKing range covers induction furnace linings and monolithic castables engineered for steel and foundry melting applications. Shanker Agencies works with Saint-Gobain as a supply partner — customers can contact us for HeatKing induction furnace lining material and monolithic castables.",
    strengths: ["Global performance-ceramics leader", "HeatKing induction furnace linings", "Advanced monolithic castables", "Engineered melt-shop solutions"],
    products: ["HeatKing Induction Furnace Lining", "HeatKing Monolithic Castables", "High-Performance Ceramics", "Refractory Solutions"],
    industries: ["Steel", "Foundry", "Induction Melting"],
  },
];

// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

function CoverageDot({ active }) {
  return active ? (
    <CheckCircle size={16} className="text-green-500 mx-auto" aria-label="Available" />
  ) : (
    <span className="block w-4 h-4 rounded-full bg-gray-200 mx-auto" aria-label="Not available" />
  );
}

function BrandCard({ brand, onClick }) {
  return (
    <article
      onClick={onClick}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#F97316]/40 transition-all cursor-pointer"
      data-testid={`brand-card-${brand.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View ${brand.name} products and details`}
    >
      {/* Color accent bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${brand.color}, ${brand.accentColor})` }} />

      <div className="p-6">
        {/* Logo + name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-full object-contain p-2"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="font-oswald text-2xl font-bold" style="color: ${brand.color}">${brand.name.charAt(0)}</span>`;
                }}
              />
            ) : (
              <span className="font-oswald text-2xl font-bold" style={{ color: brand.color }}>{brand.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors">{brand.name}</h3>
            <p className="text-xs text-gray-400 truncate">{brand.fullName}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: brand.accentColor }}>{brand.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{brand.desc}</p>

        {/* Meta pills */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Est. {brand.founded}</span>
          <span className="px-2.5 py-1 bg-blue-50 text-[#3B82F6] text-xs rounded-full">{brand.industries.slice(0, 2).join(", ")}{brand.industries.length > 2 ? ` +${brand.industries.length - 2}` : ""}</span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-semibold text-[#F97316] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            View Details <ArrowRight size={14} aria-hidden="true" />
          </span>
          {brand.website && (
            <a
              href={brand.website}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#3B82F6] transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit ${brand.name} website`}
            >
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function BrandDetail({ brand, onBack }) {
  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1E40AF] mb-8 font-medium text-sm transition-colors group"
        aria-label="Back to all brands"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to All Brands
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Sidebar ── */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm sticky top-24">
            {/* Brand color bar */}
            <div className="h-2" style={{ background: `linear-gradient(90deg, ${brand.color}, ${brand.accentColor})` }} />

            <div className="p-6">
              {/* Logo */}
              <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {brand.logo ? (
                  <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain p-3" />
                ) : (
                  <span className="font-oswald text-4xl font-bold" style={{ color: brand.color }}>{brand.name.charAt(0)}</span>
                )}
              </div>

              <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] text-center mb-0.5">{brand.name}</h2>
              <p className="text-xs text-gray-400 text-center mb-1">{brand.fullName}</p>
              <p className="text-xs font-bold text-center mb-5" style={{ color: brand.accentColor }}>{brand.tagline}</p>

              {/* Meta info */}
              <dl className="space-y-2.5 mb-6 text-sm">
                {[
                  ["Founded", brand.founded],
                  ["Headquarters", brand.headquarters],
                  ["Parent", brand.parent],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-gray-400 font-medium flex-shrink-0">{label}</dt>
                    <dd className="text-[#1E3A5F] font-semibold text-right text-xs">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Actions */}
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-sm font-bold transition-colors"
                  aria-label={`Get quote for ${brand.name} products`}
                >
                  <Phone size={16} aria-hidden="true" />
                  Get {brand.name} Quote
                </Link>
                <a
                  href="https://wa.me/919899957888"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors"
                  aria-label="WhatsApp enquiry"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp Enquiry
                </a>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 text-gray-600 hover:border-[#3B82F6] hover:text-[#3B82F6] rounded-xl text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Visit Brand Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="lg:col-span-2 space-y-6">
          {/* About */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-4 mb-4">About {brand.name}</h3>
            <p className="text-gray-600 leading-relaxed">{brand.desc}</p>

            {/* Industries */}
            <div className="mt-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Industries Served</p>
              <div className="flex flex-wrap gap-2">
                {brand.industries.map((ind) => (
                  <span key={ind} className="px-3 py-1 bg-blue-50 text-[#3B82F6] text-xs font-semibold rounded-full">{ind}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Key Strengths */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-4 mb-4">Why {brand.name}?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {brand.strengths.map((s) => (
                <div key={s} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-gray-700 font-medium">{s}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Product Range */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-4 mb-4">Product Range Available via SAPL</h3>
            <ul className="space-y-2.5">
              {brand.products.map((p) => (
                <li key={p} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700">
                  <Package size={14} className="text-[#F97316] flex-shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
              <Award size={16} className="text-[#3B82F6] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p>All {brand.name} products supplied by SAPL come with original manufacturer test certificates (MTC), proper documentation, and full after-sales technical support.</p>
            </div>
          </section>

          {/* CTA banner */}
          <section
            className="rounded-2xl p-8 text-white text-center"
            style={{ background: `linear-gradient(135deg, ${brand.color}, ${brand.accentColor})` }}
          >
            <h3 className="font-oswald text-2xl font-bold mb-2">Need {brand.name} Products?</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
              Get competitive pricing, delivery estimates, and technical recommendations within 4 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-7 py-3 bg-white text-[#1E3A5F] rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Request Quote
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-7 py-3 bg-white/15 border border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/25 transition-colors"
              >
                Browse Products <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

function Brands() {
  const { brandSlug } = useParams();
  const [selectedBrand, setSelectedBrand] = useState(brandSlug || null);
  const [filterIndustry, setFilterIndustry] = useState("All");

  const brand = selectedBrand ? brandsData.find((b) => b.id === selectedBrand) : null;

  const allIndustries = ["All", ...Array.from(new Set(brandsData.flatMap((b) => b.industries)))];
  const filteredBrands = filterIndustry === "All"
    ? brandsData
    : brandsData.filter((b) => b.industries.includes(filterIndustry));

  const brandsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Partner Refractory Brands at Shanker Agencies",
    description: "Shanker Agencies is an authorised dealer of CUMI, Crown Ceramics and Divine Cerawool, and a strategic supply partner for Calderys, TRL Krosaki, Mahakoshal, IFGL and Saint-Gobain refractories in India.",
    itemListElement: brandsData.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b.fullName,
      url: `https://shankeragencies.com/brands/${b.id}`,
    })),
  };

  return (
    <div className="bg-white">
      

      {/* ── HERO ── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.88) 100%), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
        aria-labelledby="brands-heading"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6">
            <Shield size={12} aria-hidden="true" /> Authorised Dealer &amp; Supply Partner
          </span>
          <h1 id="brands-heading" className="font-oswald text-5xl md:text-7xl font-bold text-white leading-none mb-4">
            PARTNER<br />
            <span className="text-shimmer">REFRACTORY BRANDS</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed mb-8">
            We are an authorised dealer and supply partner for some of India&apos;s and the world&apos;s biggest refractory manufacturers. Every delivery ships with the original manufacturer&apos;s test certificate, so you always know exactly what you are getting, and our team is on call if anything needs support on the plant floor.
          </p>

          {/* Brand logo strip */}
          <div className="flex flex-wrap gap-3">
            {brandsData.filter((b) => b.logo).map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors overflow-hidden"
                aria-label={`View ${b.name}`}
              >
                <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-2" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="py-5 px-4 bg-gray-50 border-b border-gray-200" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { icon: Award, label: "7 Strategic Partnerships", color: "text-[#F97316]" },
            { icon: Package, label: "Genuine Products Only", color: "text-[#3B82F6]" },
            { icon: Globe, label: "Pan-India + Export Delivery", color: "text-green-500" },
            { icon: Factory, label: "Technical Support Included", color: "text-purple-500" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2 text-gray-600">
              <Icon size={17} className={color} aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {!selectedBrand ? (
            <>
              {/* Section header + filter */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F]">OUR <span className="text-[#F97316]">PARTNER BRANDS</span></h2>
                  <p className="text-gray-500 text-sm mt-1">Click on any brand to explore their range and strengths</p>
                </div>
                {/* Industry filter */}
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
                  {allIndustries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setFilterIndustry(ind)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${filterIndustry === ind
                          ? "bg-[#F97316] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      aria-pressed={filterIndustry === ind}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredBrands.map((b) => (
                  <BrandCard key={b.id} brand={b} onClick={() => setSelectedBrand(b.id)} />
                ))}
              </div>

              {filteredBrands.length === 0 && (
                <p className="text-center text-gray-400 py-16">No brands found for "{filterIndustry}" industry.</p>
              )}



              {/* CTA */}
              <div
                className="mt-14 rounded-2xl p-10 text-center"
                style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
              >
                <h3 className="font-oswald text-2xl font-bold text-white mb-2">Can't Decide Which Brand?</h3>
                <p className="text-white/75 text-sm mb-6 max-w-md mx-auto">Tell us your application, temperature range, and industry — our engineers will recommend the best brand and grade for your specific needs.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors"
                >
                  Get Brand Recommendation <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : brand ? (
            <BrandDetail brand={brand} onBack={() => setSelectedBrand(null)} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">Brand not found.</p>
              <button onClick={() => setSelectedBrand(null)} className="text-[#3B82F6] hover:underline text-sm font-semibold">
                ← Back to all brands
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Brands;
