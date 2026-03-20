'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Home, CheckCircle, ArrowRight, Phone, MessageCircle, Factory, Flame, Shield, Clock, Award, Zap, Target, Globe, Download } from "lucide-react";
import { getIndustrySolution, getAllIndustrySolutions } from "../data/industrySolutionsData";

// ─── STAT CARD ─────────────────────────────────────────────────────────────────

function StatCard({ value, label, icon: Icon, color = "#F97316" }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
      {Icon && (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: color + "18" }}>
          <Icon size={20} style={{ color }} aria-hidden="true" />
        </div>
      )}
      <p className="font-oswald text-3xl font-bold text-[#1E3A5F]">{value}</p>
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  );
}

// ─── APPLICATION CARD ──────────────────────────────────────────────────────────

function ApplicationCard({ application, idx }) {
  const colors = ["#F97316", "#3B82F6", "#10B981", "#8B5CF6", "#EF4444"];
  const color = colors[idx % colors.length];

  return (
    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="h-44 overflow-hidden relative">
        <img
          src={application.image}
          alt={application.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <h4 className="font-oswald text-lg font-bold text-white leading-tight">{application.name}</h4>
          <span
            className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold flex-shrink-0 ml-2"
            style={{ backgroundColor: color }}
          >
            Zone {idx + 1}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{application.description}</p>
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">Recommended Products</p>
          <ul className="space-y-1.5">
            {application.products.map((product) => (
              <li key={product} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                {product}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// ─── INDUSTRY OVERVIEW CARD ────────────────────────────────────────────────────

function IndustryOverviewCard({ industry, idx }) {
  return (
    <Link
      href={`/solutions/${industry.slug}`}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#F97316]/30 transition-all"
      data-testid={`industry-card-${industry.slug}`}
      aria-label={`View ${industry.name} refractory solutions`}
    >
      <div className="h-52 overflow-hidden relative">
        <img
          src={industry.heroImage}
          alt={industry.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <h3 className="font-oswald text-xl font-bold text-white mb-1">
            {industry.name.replace(" Solutions", "")}
          </h3>
          <p className="text-gray-300 text-xs line-clamp-2">{industry.tagline}</p>
        </div>
      </div>

      <div className="p-5">
        {/* Stats mini row */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {industry.stats.slice(0, 2).map((stat) => (
            <span
              key={stat.label}
              className="px-3 py-1 bg-blue-50 text-[#3B82F6] text-xs font-semibold rounded-full"
            >
              {stat.value} {stat.label}
            </span>
          ))}
        </div>

        {/* Application count */}
        <p className="text-gray-500 text-xs mb-4">
          {industry.applications.length} key applications · {industry.featuredProducts.length} featured products
        </p>

        <div className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm group-hover:gap-2.5 transition-all">
          View Solutions <ArrowRight size={14} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

function IndustrySolutions() {
  const { industrySlug } = useParams();
  const allIndustries = getAllIndustrySolutions();
  const industry = industrySlug ? getIndustrySolution(industrySlug) : null;

  const iconCycle = [Factory, Flame, Clock, Shield, Zap, Globe];

  // ── Overview page ──
  if (!industry) {
    const overviewStructuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Industry Solutions — Shanker Agencies Refractories",
      description: "Specialized refractory solutions for Steel, Cement, Aluminum, Glass, Petrochemical, and Power industries.",
      itemListElement: allIndustries.map((ind, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: ind.name,
        url: `https://shankeragencies.com/solutions/${ind.slug}`,
      })),
    };

    return (
      <div className="bg-white">
        

        {/* Hero */}
        <section
          className="relative py-28 px-4 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.88) 100%), url('https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=1920&q=80')`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}
          aria-labelledby="solutions-heading"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6">
              <Factory size={12} aria-hidden="true" /> Industry Solutions
            </span>
            <h1 id="solutions-heading" className="font-oswald text-5xl md:text-7xl font-bold text-white leading-none mb-4">
              ENGINEERED FOR<br />
              <span className="text-shimmer">YOUR INDUSTRY</span>
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg leading-relaxed mb-8">
              Specialized refractory solutions tailored to the unique thermal, chemical, and mechanical demands of each industry. 40+ years of expertise, 600+ plants served.
            </p>

            {/* Industry quick links */}
            <div className="flex flex-wrap gap-2">
              {allIndustries.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/solutions/${ind.slug}`}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs font-semibold hover:bg-[#F97316] hover:border-[#F97316] transition-all"
                >
                  {ind.name.replace(" Solutions", "")}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#3B82F6] flex items-center gap-1">
              <Home size={13} aria-hidden="true" /> Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className="text-[#F97316] font-semibold">Industry Solutions</span>
          </div>
        </nav>

        {/* Industries grid */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">CHOOSE YOUR INDUSTRY</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Select your industry to explore tailored product recommendations, application guides, and engineering insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allIndustries.map((ind, idx) => (
                <IndustryOverviewCard key={ind.id} industry={ind} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Why choose section */}
        <section className="py-16 px-4 bg-gray-50 border-t border-gray-200" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="why-heading" className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">
                  WHY INDUSTRY-SPECIFIC MATTERS
                </h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Generic refractory selection is one of the most common causes of premature lining failure. Each industry imposes unique challenges — a steel ladle sees molten metal at 1650°C with aggressive slag attack; a cement kiln deals with alkali cycling at 1450°C; a glass furnace requires near-zero porosity to prevent glass contamination.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Our engineers have spent 40+ years understanding these nuances. When you consult us, you're not just getting a product catalogue — you're getting application-specific expertise that helps you avoid costly mistakes.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full font-bold text-sm transition-colors"
                >
                  Get Industry Consultation <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Flame, label: "Temperature Range", value: "Up to 1850°C", color: "#F97316" },
                  { icon: Factory, label: "Industries Covered", value: "6 Major Sectors", color: "#3B82F6" },
                  { icon: CheckCircle, label: "Plants Served", value: "600+ Globally", color: "#10B981" },
                  { icon: Clock, label: "Years of Experience", value: "40+ Years", color: "#8B5CF6" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: color + "18" }}>
                      <Icon size={20} style={{ color }} aria-hidden="true" />
                    </div>
                    <p className="font-oswald text-xl font-bold text-[#1E3A5F]">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 px-4"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
          aria-labelledby="solutions-cta-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="solutions-cta-heading" className="font-oswald text-3xl font-bold text-white mb-3">
              NEED A CUSTOM SOLUTION?
            </h2>
            <p className="text-white/75 text-sm mb-8 max-w-xl mx-auto">
              If your application isn't standard or you're dealing with an unusual combination of conditions, our engineers will design a custom recommendation — free of charge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Talk to an Expert
              </Link>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white hover:bg-white/25 px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                Technical Reference Guide <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ── Individual industry page ──
  const industryStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${industry.name} Refractory Solutions — Shanker Agencies`,
    description: industry.description,
    about: {
      "@type": "Thing",
      name: industry.name,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://shankeragencies.com/" },
        { "@type": "ListItem", position: 2, name: "Industry Solutions", item: "https://shankeragencies.com/solutions" },
        { "@type": "ListItem", position: 3, name: industry.name, item: `https://shankeragencies.com/solutions/${industry.slug}` },
      ],
    },
  };

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[520px]" aria-labelledby="industry-heading">
        <div className="absolute inset-0">
          <img
            src={industry.heroImage}
            alt={`${industry.name} operations`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/97 via-[#1e3a8a]/80 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-5">
              <Factory size={12} aria-hidden="true" /> Industry Solutions
            </span>
            <h1 id="industry-heading" className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-3">
              {industry.name.toUpperCase().replace(" SOLUTIONS", "")}
              <span className="block text-[#F97316]">SOLUTIONS</span>
            </h1>
            <p className="text-gray-200 text-lg mb-7 leading-relaxed">{industry.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={15} aria-hidden="true" /> Get Quote
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/25 text-white hover:bg-white/20 rounded-full font-bold text-sm transition-colors"
              >
                View Products <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="https://wa.me/919810205154"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-sm transition-colors"
                aria-label="WhatsApp enquiry"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#3B82F6] flex items-center gap-1">
            <Home size={13} aria-hidden="true" /> Home
          </Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link href="/solutions" className="hover:text-[#3B82F6]">Industry Solutions</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span className="text-[#F97316] font-semibold">{industry.name.replace(" Solutions", "")}</span>
        </div>
      </nav>

      {/* ── Stats ── */}
      <section className="py-12 px-4 bg-white" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industry.stats.map((stat, idx) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={iconCycle[idx % iconCycle.length]}
                color={["#F97316", "#3B82F6", "#10B981", "#8B5CF6"][idx % 4]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-14 px-4 bg-gray-50 border-y border-gray-200" aria-labelledby="overview-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="overview-heading" className="font-oswald text-2xl font-bold text-[#1E3A5F] text-center mb-4">
            OVERVIEW
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center">{industry.description}</p>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="py-16 px-4 bg-white" aria-labelledby="applications-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">
              Application Areas
            </span>
            <h2 id="applications-heading" className="font-oswald text-3xl font-bold text-[#1E3A5F]">
              KEY EQUIPMENT & ZONES
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.applications.map((app, idx) => (
              <ApplicationCard key={app.name} application={app} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits + Featured Products ── */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%)" }}
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <h2 id="benefits-heading" className="font-oswald text-3xl font-bold text-white mb-6">
                WHY CHOOSE US FOR {industry.name.replace(" Solutions", "").toUpperCase()}?
              </h2>
              <div className="space-y-3">
                {industry.keyBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 p-4 bg-white/8 rounded-xl border border-white/10">
                    <CheckCircle size={18} className="text-[#F97316] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-gray-200 text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured products */}
            <div>
              <h3 className="font-oswald text-xl font-bold text-white mb-5">FEATURED PRODUCTS</h3>
              <div className="space-y-3 mb-6">
                {industry.featuredProducts.map((product) => (
                  <div
                    key={product.name}
                    className="p-5 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/25"
                  >
                    <p className="font-bold text-[#F97316] text-sm mb-1">{product.name}</p>
                    <p className="text-xs text-gray-300 font-mono">{product.spec}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm hover:gap-3 transition-all"
              >
                View Full Product Range <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA card ── */}
      <section className="py-16 px-4 bg-white" aria-labelledby="industry-cta-heading">
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-[#F97316]/30 rounded-2xl p-10 text-center shadow-sm">
            <Award className="mx-auto text-[#F97316] mb-4" size={44} aria-hidden="true" />
            <h2 id="industry-cta-heading" className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-3">
              READY TO OPTIMIZE YOUR {industry.name.replace(" Solutions", "").toUpperCase()}?
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
              Our engineers are ready to analyze your specific furnace conditions and recommend the optimal lining strategy — at no charge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Request Free Consultation
              </Link>
              <a
                href="https://wa.me/919810205154"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
                aria-label="WhatsApp us about your requirements"
              >
                <Phone size={16} aria-hidden="true" />
                WhatsApp Us
              </a>
              <a
                href="https://wa.me/919899957888?text=Hi, I would like to receive the Shanker Agencies Company Profile PDF."
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Company Profile (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other industries ── */}
      <section className="py-14 px-4 bg-gray-50 border-t border-gray-200" aria-labelledby="other-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="other-heading" className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-7 text-center">
            EXPLORE OTHER INDUSTRIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allIndustries
              .filter((ind) => ind.id !== industry.id)
              .map((ind) => (
                <Link
                  key={ind.id}
                  href={`/solutions/${ind.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#F97316]/30 transition-all"
                  aria-label={`View ${ind.name} solutions`}
                >
                  <div className="h-28 overflow-hidden">
                    <img
                      src={ind.heroImage}
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-xs text-[#1E3A5F] group-hover:text-[#F97316] transition-colors leading-tight">
                      {ind.name.replace(" Solutions", "")}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndustrySolutions;
