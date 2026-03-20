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
  "Strategic supply partner for 7+ India-leading brands — single-source procurement",
  "Brand-agnostic — we recommend the best product for you, not the one with highest margin",
  "Technical consultation included with every significant order",
  "Emergency supply capability for unplanned shutdowns",
  "Export expertise: GCC, ASEAN, UK & Europe documentation handled",
  "Dedicated account managers for consistent support",
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const About = () => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Shanker Agencies Private Limited",
      alternateName: "SAPL",
      foundingDate: "1980",
      foundingLocation: "Delhi, India",
      description:
        "India's premier refractory engineering partner since 1980. Strategic supply partner of CUMI, Calderys, TRL Krosaki, IFGL refractories. Serving 500+ clients across 50+ countries.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "553, Main G.T Road, Shahdara",
        addressLocality: "Delhi",
        postalCode: "110032",
        addressCountry: "IN",
      },
      telephone: "+919810205154",
      email: "info@shankeragencies.com",
      sameAs: ["https://linkedin.com/company/shankeragencies"],
    },
  };

  return (
    <div className="bg-white overflow-hidden">
      

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
              40+ YEARS OF
              <br />
              <span className="text-shimmer">REFRACTORY</span>
              <br />
              EXCELLENCE
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              What began as a small trading company in Delhi has grown into one of India's most trusted refractory engineering partners — built one client relationship at a time, over four decades.
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
            { value: "40", suffix: "+", label: "Years of Excellence", sub: "Since 1980", icon: Award },
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
                Our Story
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
                  Today, we are the strategic supply partner for 7+ of India's leading refractory brands — CUMI, Calderys, TRL Krosaki, IFGL, Mahakoshal, Divine Cerawool, and Crown Ceramics. Our portfolio covers every refractory need: shaped bricks, castables, flow control, insulation, and acid proofing.
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
              44 YEARS OF MILESTONES
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
                <a href="tel:+919810205154" className="text-[#3B82F6] text-sm hover:underline">+91 98102 05154</a>
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
            40+ years of expertise, 7+ premium brands, and an engineering-first approach. Let's discuss your application.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#F97316] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl"
              data-testid="about-cta-button"
            >
              Get in Touch <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link
              to="/products"
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
