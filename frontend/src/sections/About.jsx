'use client';
import Link from "next/link";
import { Award, Users, Target, Globe, CheckCircle, ArrowRight, Handshake, TrendingUp, MapPin, Phone, Mail, Building, Shield, Zap, Factory, Settings, Layers, Trophy, Globe2, Microscope, Rocket } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";



// ─── DATA ──────────────────────────────────────────────────────────────────────

const milestones = [
  { year: "1980", event: "Founded in Shahdara, Delhi — began supplying refractory bricks to local foundries and small furnace operators.", icon: <Factory size={28} className="text-[#F97316]" /> },
  { year: "1990", event: "Grew to serve steel re-rolling mills and forging units across Delhi NCR. First long-term supply contracts signed.", icon: <Settings size={28} className="text-blue-400" /> },
  { year: "2000", event: "Expanded product range to include castables, mortars, and insulating bricks. Entered cement industry segment.", icon: <Layers size={28} className="text-orange-400" /> },
  { year: "2005", event: "Achieved ISO 9001 certification — formalizing quality systems that had been practiced for decades.", icon: <Trophy size={28} className="text-yellow-400" /> },
  { year: "2010", event: "Became strategic supply partner for CUMI Super Refractories — the most significant brand partnership in SAPL's history.", icon: <Handshake size={28} className="text-green-400" /> },
  { year: "2015", event: "International expansion begins. First exports to GCC region. Added Calderys and TRL Krosaki to the brand portfolio.", icon: <Globe2 size={28} className="text-blue-300" /> },
  { year: "2020", event: "Added IFGL flow control products and Divine Cerawool ceramic fiber to the portfolio. Began serving ASEAN markets.", icon: <Microscope size={28} className="text-purple-400" /> },
  { year: "2026", event: "Serving 500+ industrial clients across 50+ countries. 7+ strategic brand partnerships. Full engineering support capability.", icon: <Rocket size={28} className="text-red-400" /> },
];

const values = [
  {
    icon: Shield,
    title: "Engineering-First Approach",
    desc: "We don't just sell products — we study your furnace, process, and performance targets before recommending a single material. This engineering mindset has prevented costly specification errors for hundreds of clients.",
    color: "text-[#1E40AF]",
    bg: "bg-blue-50",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    desc: "Over 60% of our revenue comes from clients who have been with us for more than 10 years. We earn loyalty by being available, honest, and consistently delivering on promises — even when things get complicated.",
    color: "text-[#F97316]",
    bg: "bg-orange-50",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Depth",
    desc: "We have supplied refractories to 50+ countries but our strength is knowing India's industrial landscape intimately. This combination — global brands, local knowledge — is genuinely rare in the segment.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    title: "Total Cost Focus",
    desc: "The cheapest refractory that fails in 3 months is far more expensive than the right refractory that runs for 12. We optimize for total cost of ownership — campaign life, energy use, downtime risk — not just unit price.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const certifications = [
  { label: "ISO 9001:2015", desc: "Quality Management System", color: "border-blue-200 bg-blue-50 text-[#1E40AF]" },
  { label: "ISO 14001:2015", desc: "Environmental Management", color: "border-green-200 bg-green-50 text-green-700" },
  { label: "ISO 45001:2018", desc: "Occupational Health & Safety", color: "border-orange-200 bg-orange-50 text-[#F97316]" },
];

const differentiators = [
  "Refractory engineering partner — not just a supplier. We design, manufacture, and install.",
  "Authorized dealer of CUMI, Crown Ceramics & Divine Cerawool + supply partner for TRL Krosaki, IFGL & Calderys",
  "Manufacturing capability for custom refractory shapes, precast components & specialty products",
  "Brand-agnostic recommendations — we specify the best product for your application, not the highest margin",
  "In-house refractory engineers for furnace lining design, thermal analysis & installation supervision",
  "Export to 50+ countries: GCC, ASEAN, Africa, UK & Europe with full documentation handled",
  "Emergency supply capability for unplanned shutdowns — 48-hour dispatch for critical items",
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const About = () => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.shankeragencies.com/about/#webpage",
    url: "https://www.shankeragencies.com/about",
    name: "About Shanker Agencies | 45 Years of Refractory Excellence",
    isPartOf: { "@id": "https://www.shankeragencies.com/#website" },
    about: { "@id": "https://www.shankeragencies.com/#organization" },
    mainEntity: { "@id": "https://www.shankeragencies.com/#organization" },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.shankeragencies.com/about#rahul-taneja",
    name: "Rahul Taneja",
    jobTitle: "Director & Refractory Engineering Expert",
    description: "Director at Shanker Agencies Pvt. Ltd. with 25+ years of refractory engineering expertise. Specializes in furnace lining design, refractory material selection for steel ladles, cement kilns, and induction furnaces. Serves clients across India, GCC, and ASEAN markets.",
    worksFor: {
      "@type": "Organization",
      "@id": "https://www.shankeragencies.com/#organization",
      name: "Shanker Agencies Pvt. Ltd.",
      url: "https://www.shankeragencies.com",
    },
    url: "https://www.shankeragencies.com/about",
    knowsAbout: [
      "Refractory Engineering",
      "Furnace Lining Design",
      "High Alumina Bricks",
      "Castable Refractories",
      "Steel Plant Refractories",
      "Cement Kiln Refractories",
      "Induction Furnace Lining",
      "Ceramic Fiber Insulation",
      "Refractory Material Selection",
      "Campaign Life Optimization",
      "Thermal Analysis",
    ],
  };

  return (
    <div className="bg-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* ── HERO ───────────────────────────────────────── */}
      <section
        className="relative py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.94) 0%, rgba(30,58,138,0.88) 50%, rgba(15,30,70,0.94) 100%), url('https://images.unsplash.com/photo-1768128834332-7d3479c8d634?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="about-hero"
        aria-labelledby="about-hero-heading"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" aria-hidden="true" />
              Since 1980 · Shahdara, New Delhi
            </span>
            <h1 id="about-hero-heading" className="font-oswald text-5xl md:text-7xl font-bold text-white leading-none mb-6">
              45+ YEARS OF
              <br />
              <span className="text-shimmer">REFRACTORY</span>
              <br />
              EXCELLENCE
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              What began as a small trading company in Delhi has grown into one of India's most trusted refractory engineering partners — built one client relationship at a time, over 45 years.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section
        className="py-14 px-4"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
        aria-label="Company statistics"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "45", suffix: "+", label: "Years of Excellence", sub: "Since 1980", icon: Award },
            { value: "500", suffix: "+", label: "Industrial Clients", sub: "Worldwide", icon: Users },
            { value: "50", suffix: "+", label: "Countries Served", sub: "Global Reach", icon: Globe },
            { value: "7", suffix: "+", label: "Partner Brands", sub: "Strategic Supply Partner", icon: Building },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <stat.icon className="mx-auto mb-3 text-[#F97316]" size={30} aria-hidden="true" />
              <p className="font-oswald text-4xl font-bold text-white leading-none">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/90 font-semibold text-sm mt-1">{stat.label}</p>
              <p className="text-white/50 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-white reveal reveal-up" data-testid="company-overview" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-4">
                45+ Years of Trust
              </span>
              <h2 id="story-heading" className="font-oswald text-4xl md:text-5xl font-bold mb-8 text-[#1E3A5F] leading-tight">
                FROM HUMBLE
                <br />
                BEGINNINGS TO
                <br />
                <span className="text-[#F97316]">INDUSTRY LEADER</span>
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Shanker Agencies Private Limited (SAPL) was founded in 1980 in Shahdara — then, as now, one of Delhi's most industrially active commercial corridors. The company's founding vision was simple: provide India's growing industrial sector with quality refractory materials and honest service.
                </p>
                <p>
                  What made SAPL different from the beginning was a commitment to <strong className="text-[#1E3A5F]">understanding the customer's problem, not just selling them a product.</strong> Our founders spent time in plants, understanding furnace conditions, failure modes, and operational pressures before recommending materials. That practice became the culture of the company.
                </p>
                <p>
                  Today, we are an <strong className="text-[#1E3A5F]">authorized dealer of CUMI, Crown Ceramics, and Divine Cerawool</strong>, and a trusted supply partner for TRL Krosaki, IFGL, Calderys, and Mahakoshal refractories. We also manufacture custom refractory shapes, precast components, and specialty products — giving us the engineering depth and end-to-end capability that large steel plants, cement groups, and petrochemical companies expect from their refractory partner.
                </p>
              </div>

              {/* Differentiator list */}
              <ul className="mt-8 space-y-2.5" aria-label="Key differentiators">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#F97316] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — visual with accent cards */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-12 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col text-center">
                  <span className="font-oswald text-4xl md:text-5xl font-bold tracking-wider leading-none">
                    <span className="text-[#F97316]">SHANKER</span>
                    <br />
                    <span className="text-[#1E3A5F]">AGENCIES</span>
                  </span>
                  <span className="text-sm text-gray-500 font-medium tracking-[0.3em] uppercase mt-4">
                    Refractory Engineers
                  </span>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-[#F97316] text-white p-6 rounded-2xl shadow-xl">
                <p className="font-oswald text-4xl font-bold leading-none">1980</p>
                <p className="text-white/80 text-sm mt-1 font-medium">Year Founded · Delhi</p>
              </div>

              {/* Floating ISO card */}
              <div className="absolute -top-6 -right-6 bg-white border border-gray-100 p-5 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E3A5F] text-sm">ISO Certified</p>
                    <p className="text-gray-400 text-xs">9001 · 14001 · 45001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ───────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 reveal reveal-up" data-testid="vision-mission" aria-labelledby="vm-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              What Drives Us
            </span>
            <h2 id="vm-heading" className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F]">
              VISION &amp; MISSION
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6" aria-hidden="true">
                <Target className="text-[#1E40AF]" size={28} />
              </div>
              <h3 className="font-oswald text-2xl font-bold mb-4 text-[#1E3A5F]">OUR VISION</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted refractory engineering partner globally — known not just for the products we supply, but for the expertise, reliability, and long-term value we bring to every client relationship.
              </p>
            </article>
            <article className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6" aria-hidden="true">
                <Zap className="text-[#F97316]" size={28} />
              </div>
              <h3 className="font-oswald text-2xl font-bold mb-4 text-[#1E3A5F]">OUR MISSION</h3>
              <p className="text-gray-600 leading-relaxed">
                To optimize industrial furnace performance through expert material selection, engineering consultation, and reliable supply — delivering measurable improvements in campaign life, energy efficiency, and total cost of ownership for every client.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────── */}
      <section className="py-24 px-4 bg-white reveal reveal-up" data-testid="core-values" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
              Our Principles
            </span>
            <h2 id="values-heading" className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F]">
              CORE VALUES
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-4 text-sm">
              These aren't wall posters — they're the operating principles our team uses when making decisions for clients every day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {values.map((value, idx) => (
              <article
                key={idx}
                className={`${value.bg} p-8 rounded-2xl border border-white hover:shadow-md transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 shadow-sm`} aria-hidden="true">
                  <value.icon className={value.color} size={24} />
                </div>
                <h3 className="font-oswald text-lg font-bold mb-3 text-[#1E3A5F]">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ───────────────────────────────────── */}
      <section
        className="py-24 px-4 reveal reveal-up"
        style={{ background: "linear-gradient(135deg, #0f2456 0%, #1e3a8a 50%, #1e40af 100%)" }}
        data-testid="timeline"
        aria-labelledby="timeline-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-widest uppercase mb-3">
              Our Journey
            </span>
            <h2 id="timeline-heading" className="font-oswald text-3xl md:text-4xl font-bold text-white">
              45 YEARS OF MILESTONES
            </h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316] via-white/30 to-transparent hidden md:block" aria-hidden="true" />

            <div className="space-y-6">
              {milestones.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex gap-6 items-start reveal reveal-left"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 hidden md:flex">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl backdrop-blur-sm" aria-hidden="true">
                      {item.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                    <p className="font-oswald text-2xl font-bold text-[#F97316] mb-2">{item.year}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────── */}
      <section className="py-24 px-4 bg-white reveal reveal-up" data-testid="certifications" aria-labelledby="cert-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-widest uppercase mb-4">
                Quality Assurance
              </span>
              <h2 id="cert-heading" className="font-oswald text-3xl md:text-4xl font-bold mb-6 text-[#1E3A5F]">
                CERTIFIED TO
                <br />
                INTERNATIONAL STANDARDS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our certifications are renewed annually through independent audit — they reflect the quality management systems, environmental practices, and safety standards that govern every aspect of our operations.
              </p>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.label}
                    className={`flex items-center gap-4 p-5 rounded-xl border ${cert.color}`}
                  >
                    <CheckCircle size={22} className="flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-sm">{cert.label}</p>
                      <p className="text-xs opacity-75 mt-0.5">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="w-80 h-80 rounded-full flex items-center justify-center text-center shadow-2xl"
                style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #3B82F6 100%)" }}
              >
                <div>
                  <p className="font-oswald text-7xl font-bold text-white leading-none">ISO</p>
                  <p className="text-white/80 text-lg font-medium mt-2">Certified</p>
                  <p className="text-white/50 text-sm mt-1">9001 · 14001 · 45001</p>
                  <p className="text-[#F97316] font-bold text-sm mt-4">Renewed Annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-white reveal reveal-up" data-testid="leadership-team" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F97316] text-xs font-semibold tracking-widest uppercase mb-3">
              Our People
            </span>
            <h2 id="team-heading" className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F]">
              LEADERSHIP TEAM
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-4 text-sm">
              Four decades of refractory engineering expertise, built and led by practitioners who have spent their careers in steel plants, cement kilns and foundries across India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Rahul Taneja */}
            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] p-8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                  <span className="font-oswald text-3xl font-bold text-white">RT</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-oswald text-xl font-bold text-[#1E3A5F]">Rahul Taneja</h3>
                <p className="text-[#F97316] text-xs font-semibold uppercase tracking-wide mb-3">Director &amp; Refractory Engineering Expert</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  With over 25 years of hands-on refractory experience, Rahul leads SAPL's technical and commercial operations. He has personally advised on refractory specifications for steel ladles, cement kilns, and induction furnaces at 300+ industrial plants across India and the GCC.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Steel Ladle Engineering', 'Furnace Lining Design', 'Export Markets'].map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 bg-blue-50 text-[#1E3A5F] rounded-full font-semibold border border-blue-100">{s}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* SAPL Technical Team */}
            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                  <span className="font-oswald text-3xl font-bold text-white">ST</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-oswald text-xl font-bold text-[#1E3A5F]">SAPL Technical Team</h3>
                <p className="text-[#F97316] text-xs font-semibold uppercase tracking-wide mb-3">Refractory Engineers &amp; Application Specialists</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Our team of certified refractory engineers handles lining design, material selection, installation supervision, and post-campaign analysis. Collectively, they bring 100+ years of combined field experience across India's steel, cement, and aluminium industries.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ISO 9001 Trained', 'On-Site Support', 'Pan-India Coverage'].map(s => (
                    <span key={s} className="text-[10px] px-2.5 py-1 bg-orange-50 text-[#F97316] rounded-full font-semibold border border-orange-100">{s}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Company Promise */}
            <article className="bg-gradient-to-br from-[#1E3A5F] to-[#1E40AF] rounded-2xl shadow-sm overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                    <Award size={24} className="text-[#F97316]" />
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-3">Our Engineering Promise</h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Every refractory recommendation we make is backed by an engineer who has seen the application in person — not just a product brochure. We stake our 45-year reputation on every specification.
                  </p>
                </div>
                <div className="mt-8 space-y-2">
                  {['Site visits before specification', 'Post-installation performance tracking', 'Failure analysis at no charge', '48-hour emergency response'].map(p => (
                    <div key={p} className="flex items-center gap-2.5 text-white/80 text-xs">
                      <CheckCircle size={13} className="text-[#F97316] flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CONTACT PREVIEW ───────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50 reveal reveal-up" aria-labelledby="contact-preview-heading">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 id="contact-preview-heading" className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
            VISIT OR CONTACT US
          </h2>
          <p className="text-gray-500 text-sm">We welcome plant visits and technical discussions</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <MapPin size={18} className="text-[#F97316]" />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">Corporate Headquarters</p>
                <p className="text-gray-500 text-sm mt-0.5">553, Main G.T Road, Shahdara, Delhi 110032, India</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Phone size={18} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">Call Us</p>
                <a href="tel:+919899957888" className="text-[#3B82F6] text-sm hover:underline">+91 98999 57888</a>
                {" · "}
                <a href="tel:+919811909394" className="text-[#3B82F6] text-sm hover:underline">+91 98119 09394</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Mail size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">Email</p>
                <a href="mailto:info@shankeragencies.com" className="text-green-600 text-sm hover:underline">info@shankeragencies.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#F97316] reveal reveal-up" data-testid="about-cta" aria-labelledby="about-cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="about-cta-heading" className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
            PARTNER WITH SAPL FOR YOUR
            <br />
            REFRACTORY REQUIREMENTS
          </h2>
          <p className="text-white/85 mb-10 text-lg max-w-xl mx-auto">
            45+ years of expertise, 7+ premium brands, and an engineering-first approach. Let's discuss your application.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#F97316] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl"
              data-testid="about-cta-button"
            >
              Get in Touch <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              View Product Range
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
