'use client';
import { useApp } from '@/context/AppContext';
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Factory, Award, Globe, ChevronRight,
  Zap, Shield, Package, CheckCircle,
  TrendingUp, Flame, Thermometer, GitBranch, Phone,
  ChevronDown, Star, Search
} from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import { HeroParticles } from "../components/ScrollAnimations";
import { IMAGES, PRODUCT_CATEGORIES } from "../data/imagesData";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const industries = [
  { name: "Steel Plants", image: IMAGES.industries.steel, slug: "steel", desc: "Blast Furnaces · BOF · EAF · Ladles · Tundish", accent: "#E85D00" },
  { name: "Cement Plants", image: IMAGES.industries.cement, slug: "cement", desc: "Rotary Kilns · Preheaters · Coolers", accent: "#C9963A" },
  { name: "Aluminum Smelters", image: IMAGES.industries.aluminum, slug: "aluminum", desc: "Melting · Holding · Casting Furnaces", accent: "#3B82F6" },
  { name: "Petrochemical", image: IMAGES.industries.petrochemical, slug: "petrochemical", desc: "Fired Heaters · Reformers · Crackers", accent: "#8B5CF6" },
  { name: "Glass Manufacturing", image: IMAGES.industries.glass, slug: "glass", desc: "Melting Tanks · Forehearths · Lehrs", accent: "#10B981" },
  { name: "Power Generation", image: IMAGES.industries.power, slug: "power", desc: "Boilers · Incinerators · FBC Units", accent: "#F59E0B" },
];

const featuredSolutions = [
  { title: "Steel Ladle Packages", icon: Factory, desc: "Complete solutions for ladle working linings, safety linings, and flow control systems.", products: "LCC/ULCC Castables · High Alumina Bricks · Slide Gate Systems", metric: "30% longer campaign life" },
  { title: "Cement Kiln Linings", icon: Flame, desc: "Engineered for rotary kilns, preheaters, and coolers resisting alkali attack.", products: "Basic Bricks · High Alumina · Castables", metric: "Operating at 1450°C+" },
  { title: "Aluminum Furnace Solutions", icon: Thermometer, desc: "Non-wetting, thermal shock resistant linings preventing iron contamination.", products: "Silicon Carbide · High Alumina Castables", metric: "Zero-iron contamination" },
  { title: "Ceramic Fiber & Insulation", icon: Zap, desc: "Energy-saving insulation systems that cut heat loss by up to 40%.", products: "Ceramic Fiber Blankets · Modules · Boards", metric: "Up to 40% energy savings" },
  { title: "Flow Control Systems", icon: GitBranch, desc: "Complete flow control packages for continuous casting — ladle to mould.", products: "Slide Gates · Shrouds · SEN", metric: "Precision to 0.1 t/min" },
  { title: "Chemical & Acid Proofing", icon: Shield, desc: "Corrosion-resistant linings for fertilizer, pharma, and chemical processing plants.", products: "Acid Proof Bricks · Tiles · Carbon Bricks", metric: "Resists pH 0–14" },
];

const brands = [
  { name: "Calderys", fullName: "Calderys India", logo: "/images/brands/calderys.png", specialty: "Monolithics" },
  { name: "Crown", fullName: "Crown Ceramics", logo: "/images/brands/crown.png", specialty: "Specialty" },
  { name: "CUMI", fullName: "CUMI Super Refractories", logo: "/images/brands/cumi.png", specialty: "Shaped & Unshaped" },
  { name: "Divine", fullName: "Divine Cerawool", logo: "/images/brands/divine.png", specialty: "Ceramic Fiber" },
  { name: "IFGL", fullName: "IFGL Refractories", logo: "/images/brands/ifgl.png", specialty: "Flow Control" },
  { name: "Mahakoshal", fullName: "Mahakoshal Refractories", logo: "/images/brands/mahakoshal.png", specialty: "Regional" },
  { name: "TRL Krosaki", fullName: "Tata Refractories", logo: "/images/brands/trl.png", specialty: "Steel Industry" },
];

const whyUs = [
  { icon: Shield, title: "Engineering & Manufacturing", desc: "We don't just supply — we engineer solutions. From furnace lining design and material selection to manufacturing custom refractory shapes and installation supervision.", highlight: "Full lifecycle" },
  { icon: Globe, title: "Exporting to 50+ Countries", desc: "Serving steel plants, cement factories & foundries across GCC, ASEAN, Africa, UK & Europe. Export documentation, international logistics, and dedicated account management.", highlight: "Global reach" },
  { icon: Package, title: "Authorized & Premium Brands", desc: "Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Strategic supply partner for TRL Krosaki, IFGL, Calderys & more.", highlight: "Single source" },
  { icon: TrendingUp, title: "Total Cost Optimized", desc: "Our engineers recommend the right refractory — not the most expensive. We optimize for campaign life, energy efficiency & reduced downtime, cutting your TCO by 15-30%.", highlight: "Cost optimized" },
];

const testimonials = [
  { quote: "Shanker Agencies has been our trusted refractory partner for over 12 years. Their technical knowledge and prompt delivery have been critical to our plant uptime.", name: "Plant Manager", company: "Integrated Steel Plant, India", stars: 5 },
  { quote: "The LCC castable packages they recommended for our ladles delivered a 25% improvement in campaign life. Exceptional technical support team.", name: "Refractory Engineer", company: "Cement Group, Middle East", stars: 5 },
  { quote: "Single-source procurement for all our refractory needs, with competitive pricing and genuinely expert advice. Highly recommend SAPL.", name: "Procurement Head", company: "Aluminium Smelter, GCC", stars: 5 },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Home = () => {
  const { region, setShowQuoteModal } = useApp();
  const onQuoteClick = () => setShowQuoteModal(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestimonial, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
  };

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shanker Agencies - Refractory Engineering Partner & Manufacturer Since 1980",
    "url": "https://www.shankeragencies.com",
    "description": "India's premier refractory engineering partner & manufacturer. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. Engineering, manufacturing & supplying refractories to 50+ countries.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Shanker Agencies Private Limited",
      "alternateName": "SAPL",
      "foundingDate": "1980",
      "areaServed": "Global",
      "telephone": "+919810205154",
      "email": "info@shankeragencies.com",
      "knowsAbout": ["Refractory Engineering", "Refractory Manufacturing", "Furnace Lining Design", "Refractory Installation", "Thermal Analysis", "High Alumina Bricks", "Castable Refractories", "Ceramic Fiber Insulation", "Flow Control Refractories", "Acid Proof Linings"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "553, Main G.T Road, Shahdara",
        "addressLocality": "Delhi",
        "postalCode": "110032",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white">

      {/* ══════════════════════════════════════════════
          HERO
          ─────────────────────────────────────────────
          Gradient: IDENTICAL to About.jsx hero —
            rgba(30, 58, 95, 0.95) → rgba(30, 64, 175, 0.85)
          Height: fills viewport below navbar
          Includes: Ken Burns bg, particles, grid pattern
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col"
        style={{ minHeight: "calc(100vh - 180px)" }}
        data-testid="hero-section"
        aria-label="Hero"
      >
        {/* Ken Burns background image */}
        <div
          className="absolute inset-0 hero-bg-zoom"
          style={{
            backgroundImage: `url('${IMAGES.heroes.home}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay — SAME as About.jsx */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(30, 64, 175, 0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle orange grid — industrial character */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Floating ember particles */}
        <HeroParticles />

        <div className="relative z-10 flex flex-col flex-1 w-full">

          {/* ── Main content — grows to fill space ── */}
          <div className="flex-1 flex items-center lg:items-center pb-6 pt-2 lg:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-8 items-center">

                {/* LEFT — text */}
                <div>
                  {/* Trust badge */}
                  <div className="hero-reveal hero-d0 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-white text-sm font-medium tracking-wide">
                      {region === "india"
                        ? "Trusted Since 1980 · ISO 9001 · Pan-India Delivery"
                        : "Trusted Since 1980 · ISO 9001 · 50+ Countries"}
                    </span>
                  </div>

                  {/* H1 — Simplified for SEO */}
                  <h1
                    className="hero-reveal hero-d1 font-oswald font-bold text-white leading-tight mb-4"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.02em" }}
                  >
                    INDIA'S PREMIER <span className="text-shimmer">REFRACTORY</span> ENGINEERING PARTNER &amp; MANUFACTURER
                  </h1>

                  {/* Subheadline */}
                  <p className="hero-reveal hero-d2 text-gray-200 text-lg mb-6 leading-relaxed max-w-lg">
                    {region === "india"
                      ? "India's premier refractory engineering partner & manufacturer. Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool. End-to-end engineering solutions — from furnace lining design to installation supervision for steel, cement, aluminum & petrochemical plants."
                      : "Your trusted refractory engineering partner from India. We engineer, manufacture & supply premium refractories — delivered to GCC, ASEAN, Africa, UK & Europe with full technical support and installation guidance."}
                  </p>

                  {/* Trust pills — Sleek, horizontal, smaller font */}
                  <div className="hero-reveal hero-d3 flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                    {["Trusted Partner for Industrial Clients", "Dedicated Technical & Customer Support", "Tailored Refractory Solutions Across Sectors"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle size={10} className="text-[#F97316] opacity-80" aria-hidden="true" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/70 uppercase">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="hero-reveal hero-d4 flex flex-wrap gap-4">
                    <button
                      onClick={onQuoteClick}
                      className="btn-pulse bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 transition-all shadow-xl shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      data-testid="hero-get-quote"
                    >
                      <Zap size={20} aria-hidden="true" />
                      Get Instant Quote
                    </button>
                    <Link
                      href="/solutions"
                      className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 hover:bg-white/20 transition-all"
                      data-testid="hero-find-solution"
                    >
                      Explore Solutions
                      <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* RIGHT — stat cards, desktop only */}
                <div className="hero-reveal hero-d5 hidden lg:grid grid-cols-2 gap-3">
                  {[
                    { value: "45", suffix: "+", label: "Years of Excellence", sub: "Since 1980", icon: Award, orange: true },
                    { value: "500", suffix: "+", label: "Industrial Clients", sub: "Worldwide", icon: Globe, orange: false },
                    { value: "50", suffix: "+", label: "Countries Served", sub: "Global Reach", icon: Globe, orange: false },
                    { value: "7", suffix: "+", label: "Brand Partners", sub: "Premium Brands", icon: Package, orange: false },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center hover:bg-white/20 transition-all ${stat.orange ? "bg-[#F97316]/80" : "bg-white/10"
                        }`}
                    >
                      <stat.icon className="mx-auto mb-3 text-white/80" size={28} aria-hidden="true" />
                      <p className="font-oswald text-4xl font-bold text-white leading-none">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-white/90 font-medium text-sm mt-1">{stat.label}</p>
                      <p className="text-white/50 text-xs mt-0.5">{stat.sub}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center text-white/30 animate-bounce" aria-hidden="true">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MOBILE STATS (hidden on lg — already in hero cards)
      ══════════════════════════════════════════════ */}
      <section
        className="lg:hidden py-10 px-4"
        style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)" }}
        aria-label="Statistics"
      >
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {[
            { value: "45", suffix: "+", label: "Years Excellence" },
            { value: "500", suffix: "+", label: "Industrial Clients" },
            { value: "50", suffix: "+", label: "Countries Served" },
            { value: "7", suffix: "+", label: "Brand Partners" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center py-5 rounded-xl bg-white/10 border border-white/15">
              <p className="font-oswald text-3xl font-bold text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/60 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCROLLING MARQUEE — product name ticker
      ══════════════════════════════════════════════ */}
      <div className="bg-gray-900 border-y border-gray-800 py-4 overflow-hidden" aria-hidden="true">
        <div className="flex" style={{ animation: "marquee 30s linear infinite" }}>
          {[...Array(2)].map((_, loop) => (
            <div key={loop} className="flex gap-10 flex-shrink-0 pr-10">
              {[
                "Fire Bricks · SK30–SK40", "High Alumina Bricks · 45–90% Al₂O₃",
                "Low Cement Castables", "Ultra LCC",
                "Ceramic Fiber Modules", "Slide Gate Plates",
                "Magnesia Chrome Bricks", "Ramming Mass",
                "Acid Proof Bricks", "Insulating Fire Bricks",
              ].map((item) => (
                <span key={item} className="text-gray-400 text-sm font-medium whitespace-nowrap flex items-center gap-3">
                  <span className="w-1 h-1 bg-[#F97316] rounded-full inline-block" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ══════════════════════════════════════════════
          PRODUCT FINDER
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-gray-50 border-b border-gray-100 reveal reveal-up" data-testid="product-finder">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
              Find Your Solution
            </span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
              SEARCH THE REFRACTORY CATALOG
            </h2>
            <p className="text-gray-500 text-sm">By product name, grade, temperature, or application</p>
          </div>
          <form onSubmit={handleSearch} role="search">
            <div className="relative shadow-lg">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search: High Alumina, LCC Castable, Steel Ladle, 1750°C…"
                className="w-full pl-14 pr-36 py-5 rounded-2xl border-2 border-gray-200 focus:border-[#3B82F6] focus:outline-none text-base bg-white transition-colors"
                data-testid="product-search"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
                Search
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { label: "Steel Plants", slug: "steel" },
              { label: "Cement Plants", slug: "cement" },
              { label: "Aluminum", slug: "aluminum" },
              { label: "Petrochemical", slug: "petrochemical" },
              { label: "Glass", slug: "glass" },
              { label: "Power", slug: "power" },
            ].map(({ label, slug }) => (
              <Link key={slug} href={`/solutions/${slug}`} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F97316] hover:text-[#F97316] hover:shadow-sm transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRODUCT CATEGORIES
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white reveal reveal-up" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
              Comprehensive Portfolio
            </span>
            <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4 uppercase tracking-tight">
              Refractory Engineering &amp; Manufacturing Since 1980
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mb-10">
              As India's premier refractory engineering partner, we engineer, manufacture, and supply the full spectrum of refractory solutions. From high alumina bricks and castables to ceramic fiber insulation and flow control systems — our 45+ years of expertise covers blast furnaces, steel ladles, rotary kilns, induction furnaces, and chemical plants. We are authorized dealers of CUMI, Crown Ceramics &amp; Divine Cerawool, and strategic supply partners of TRL Krosaki, IFGL &amp; Calderys. Our refractory engineers focus on thermal shock resistance, slag corrosion protection, and energy efficiency to extend your campaign life by 25-40% and reduce plant downtime.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gray-200" />
              <h3 className="font-oswald text-2xl md:text-3xl font-bold text-[#F97316] uppercase tracking-wider">
                PRODUCT CATEGORIES
              </h3>
              <div className="h-px w-12 bg-gray-200" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 stagger-children">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#1E3A5F] shadow-sm">
                    {category.productCount} Families
                  </div>
                  <h3 className="absolute bottom-3 left-4 font-oswald text-lg font-bold text-white leading-tight drop-shadow">
                    {category.name}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{category.shortDesc}</p>
                  <div className="flex items-center gap-2 text-[#F97316] font-semibold text-sm group-hover:gap-3 transition-all">
                    View Catalog <ArrowRight size={15} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 reveal reveal-up"
        style={{ background: "linear-gradient(180deg,#f8faff 0%,#edf2ff 100%)" }}
        data-testid="industries-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
                Industry Solutions
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A5F] heading-accent">
                SOLUTIONS FOR<br className="hidden sm:block" /> EVERY INDUSTRY
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
              Specialized refractory engineering for your specific equipment, process temperatures, and chemical environments.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {industries.map((industry, idx) => (
              <Link
                key={idx}
                href={`/solutions/${industry.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                data-testid={`industry-${industry.slug}`}
              >
                <img src={industry.image} alt={industry.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${industry.accent}, transparent 65%)` }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-oswald text-xl font-bold text-white mb-1 group-hover:text-[#F97316] transition-colors">{industry.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 tracking-wide">{industry.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#F97316] font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Solutions <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED SOLUTIONS
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gray-50 reveal reveal-up" data-testid="featured-solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              Engineering Packages
            </span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              ENGINEERED FOR PERFORMANCE
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Complete refractory packages designed around your specific equipment and processes — not generic product lists
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {featuredSolutions.map((solution, idx) => (
              <article key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#3B82F6]/30 transition-all duration-300 overflow-hidden group">
                <div className="h-1 w-full bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                <div className="p-7">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#1E40AF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <solution.icon className="text-white" size={26} />
                  </div>
                  <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-2">{solution.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{solution.desc}</p>
                  <p className="text-sm text-gray-400 border-t border-gray-100 pt-4 mb-4">
                    <span className="font-semibold text-[#3B82F6]">Products: </span>
                    {solution.products}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold">
                    <TrendingUp size={11} aria-hidden="true" />
                    {solution.metric}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-10 py-4 rounded-full font-semibold transition-colors shadow-lg">
              View Full Product Catalog <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRANDS
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white border-y border-gray-100 reveal reveal-up" data-testid="brands-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold tracking-widest uppercase mb-3">
              Strategic Supply Partner
            </span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] heading-accent">
              7+ PREMIUM BRAND PARTNERS
            </h2>
            <p className="text-gray-400 text-sm mt-5 max-w-md mx-auto">
              One expert contact for your entire refractory range — from India's most trusted manufacturers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 stagger-children">
            {brands.map((brand, idx) => (
              <div key={idx} className="text-center group reveal reveal-scale">
                <div className="w-32 h-20 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center group-hover:border-[#3B82F6] group-hover:shadow-md transition-all duration-300 overflow-hidden px-3">
                  {brand.logo
                    ? <img src={brand.logo} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                    : <span className="font-oswald text-lg font-bold text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors">{brand.name}</span>
                  }
                </div>
                <p className="text-xs text-gray-400 mt-2 font-medium">{brand.fullName}</p>
                <p className="text-sm text-[#F97316] mt-0.5">{brand.specialty}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/brands" className="text-[#3B82F6] hover:text-[#1E40AF] font-medium text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
              View All Brand Partners &amp; Capabilities <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY CHOOSE US
          Uses gradient-dark + industrial-texture —
          SAME as About.jsx stats section
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 gradient-dark industrial-texture reveal reveal-up" data-testid="why-choose-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-3">
              Why Partner With Us
            </span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
              YOUR ENGINEERING PARTNER,
              <br />
              <span className="text-[#F97316]">NOT JUST A SUPPLIER</span>
            </h2>
            <p className="text-white/60 max-w-lg mx-auto text-sm">
              The difference between a refractory vendor and a refractory partner is measurable — in campaign life, energy costs, and plant uptime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {whyUs.map((item, idx) => (
              <article key={idx} className="text-center p-7 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300 card-shimmer">
                <div className="w-16 h-16 rounded-2xl bg-[#F97316]/20 border border-[#F97316]/30 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
                  <item.icon className="text-[#F97316]" size={28} />
                </div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#F97316]/15 text-[#F97316] text-xs font-semibold mb-3">{item.highlight}</span>
                <h3 className="font-oswald text-lg font-bold text-white mb-3 leading-tight">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
          {/* ISO certifications — same style as About.jsx */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-sm font-medium">
                <CheckCircle size={15} className="text-green-400" aria-hidden="true" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gray-50 reveal reveal-up">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              Client Testimonials
            </span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              TRUSTED BY INDUSTRY LEADERS
            </h2>
          </div>
          <div className="relative min-h-[260px] sm:min-h-[230px]">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${idx === activeTestimonial ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}
                aria-hidden={idx !== activeTestimonial}
              >
                <blockquote className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array(t.stars).fill(0).map((_, i) => (
                      <Star key={i} size={18} className="fill-[#F97316] text-[#F97316]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto italic">"{t.quote}"</p>
                  <p className="font-semibold text-[#1E3A5F]">{t.name}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{t.company}</p>
                </blockquote>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8" role="tablist">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#F97316] ${idx === activeTestimonial ? "bg-[#F97316] w-8" : "bg-gray-300 w-2"}`}
                role="tab"
                aria-selected={idx === activeTestimonial}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — gradient-orange, same as About.jsx CTA
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 gradient-orange reveal reveal-up" data-testid="cta-section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-oswald text-3xl md:text-5xl font-bold text-white mb-4">
            READY TO DISCUSS
            <br />
            YOUR REQUIREMENTS?
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Our refractory engineers respond within 4 business hours. Expert recommendations and competitive quotes — no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onQuoteClick}
              className="bg-white text-[#F97316] px-10 py-4 rounded-full font-bold text-base flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-xl hover-lift focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Zap size={20} aria-hidden="true" />
              Request a Quote
            </button>
            <a
              href="tel:+919810205154"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base flex items-center gap-2 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Phone size={20} aria-hidden="true" />
              Call +91 98102 05154
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/70 text-sm">
            {["4-hour response guarantee", "No minimum order quantity", "Free technical consultation"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-white/60" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home; 