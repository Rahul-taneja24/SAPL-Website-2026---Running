import { Link } from "react-router-dom";
import { ArrowRight, Factory, Award, Globe, ChevronRight, Search, Zap, Shield, Headphones, Package, CheckCircle, Users, TrendingUp, Building2, Flame, Thermometer, GitBranch, Clock, Phone } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import SEOHead from "../components/SEOHead";
import { IMAGES, HERO_GRADIENT, COMPANY_STATS, PRODUCT_CATEGORIES } from "../data/imagesData";

const industries = [
  { name: "Steel Plants", image: IMAGES.industries.steel, slug: "steel", desc: "Blast furnaces, BOF, EAF, Ladles, Tundish" },
  { name: "Cement Plants", image: IMAGES.industries.cement, slug: "cement", desc: "Rotary kilns, Preheaters, Coolers" },
  { name: "Aluminum Smelters", image: IMAGES.industries.aluminum, slug: "aluminum", desc: "Melting, Holding, Casting furnaces" },
  { name: "Petrochemical", image: IMAGES.industries.petrochemical, slug: "petrochemical", desc: "Fired heaters, Reformers, Crackers" },
  { name: "Glass Manufacturing", image: IMAGES.industries.glass, slug: "glass", desc: "Melting tanks, Forehearths, Lehrs" },
  { name: "Power Generation", image: IMAGES.industries.power, slug: "power", desc: "Boilers, Incinerators, FBC units" }
];

const featuredSolutions = [
  { id: "steel-ladle", title: "Steel Ladle Packages", iconName: "factory", desc: "Complete solutions for ladle working linings, safety linings, and flow control", products: "LCC/ULCC Castables, High Alumina Bricks, Slide Gate Systems" },
  { id: "cement-kiln", title: "Cement Kiln Linings", iconName: "flame", desc: "Engineered solutions for rotary kilns, preheaters, and coolers", products: "Basic Bricks, High Alumina, Castables" },
  { id: "aluminum", title: "Aluminum Furnace Solutions", iconName: "thermometer", desc: "Non-wetting, thermal shock resistant linings for melting furnaces", products: "Silicon Carbide, High Alumina Castables" },
  { id: "insulation", title: "Ceramic Fiber & Insulation", iconName: "zap", desc: "Energy-saving solutions reducing heat loss and improving efficiency", products: "Ceramic Fiber Blankets, Modules, Boards" },
  { id: "flow-control", title: "Flow Control Systems", iconName: "git-branch", desc: "Complete flow control for continuous casting operations", products: "Slide Gates, Shrouds, SEN" },
  { id: "acid-proof", title: "Chemical & Acid Proofing", iconName: "shield", desc: "Corrosion-resistant linings for chemical processing", products: "Acid Proof Bricks, Tiles, Carbon Bricks" }
];

function getIcon(name) {
  switch(name) {
    case "factory": return Factory;
    case "flame": return Flame;
    case "thermometer": return Thermometer;
    case "zap": return Zap;
    case "git-branch": return GitBranch;
    case "shield": return Shield;
    default: return Package;
  }
}

const brands = [
  { name: "CUMI", fullName: "CUMI Super Refractories" },
  { name: "Calderys", fullName: "Calderys India" },
  { name: "TRL Krosaki", fullName: "Tata Refractories" },
  { name: "IFGL", fullName: "IFGL Refractories" },
  { name: "Mahakoshal", fullName: "Mahakoshal Refractories" },
  { name: "Divine", fullName: "Divine Cerawool" },
  { name: "Crown", fullName: "Crown Ceramics" }
];

const Home = ({ region, onQuoteClick }) => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shanker Agencies - Refractory Engineering Solutions",
    "description": "India's premier refractory engineering partner since 1980.",
    "url": "https://shankeragencies.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "Shanker Agencies Private Limited",
      "foundingDate": "1980",
      "areaServed": "Global"
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      <SEOHead
        title="Shanker Agencies | India's Leading Refractory Engineering Partner Since 1980"
        description="Premium refractory solutions for steel, cement, aluminum & petrochemical industries. Strategic supply partner of CUMI, Calderys, TRL Krosaki, IFGL. Serving 50+ countries from India."
        keywords="refractory supplier India, firebricks manufacturer, castables supplier, CUMI refractories partner, Calderys supplier"
        canonical="/"
        structuredData={homeStructuredData}
      />

      {/* ==================== HERO SECTION ==================== */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '70vh', maxHeight: '700px' }}
        data-testid="hero-section"
      >
        {/* Ken Burns background */}
        <div
          className="absolute inset-0 hero-bg-zoom"
          style={{
            backgroundImage: `url('${IMAGES.heroes.home}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(30,64,175,0.75) 60%, rgba(30,58,95,0.65) 100%)' }}
        />

        {/* Floating ember particles */}
        <div className="hero-particles">
          <span className="spark spark-1" />
          <span className="spark spark-2" />
          <span className="spark spark-3" />
          <span className="spark spark-4" />
          <span className="spark spark-5" />
          <span className="spark spark-6" />
          <span className="spark spark-7" />
          <span className="spark spark-8" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-16 w-full">
            <div className="max-w-3xl">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 hero-reveal hero-d0">
                <span className="live-dot w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white text-sm font-medium">Trusted Since 1980 • ISO 9001 Certified • Global Supplier</span>
              </div>

              {/* Headline */}
              <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 hero-reveal hero-d1">
                YOUR REFRACTORY
                <span className="block text-shimmer">ENGINEERING</span>
                <span className="block">PARTNER</span>
              </h1>

              {/* Subheadline */}
              <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed hero-reveal hero-d2">
                {region === "india"
                  ? "India's premier refractory engineering partner. End-to-end solutions for steel, cement, aluminum & petrochemical industries."
                  : "Your global refractory engineering partner. Premium solutions for steel, cement, aluminum & petrochemical plants across GCC, ASEAN, UK & Europe."}
              </p>

              {/* Value props */}
              <div className="flex flex-wrap gap-6 mb-8 hero-reveal hero-d3">
                {["45+ Years Excellence", "500+ Clients", "50+ Countries"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <CheckCircle size={18} className="text-[#F97316]" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 hero-reveal hero-d4">
                <button
                  onClick={onQuoteClick}
                  className="btn-pulse bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all shadow-lg shadow-orange-500/30"
                  data-testid="hero-get-quote"
                >
                  <Zap size={20} />
                  Get Instant Quote
                </button>
                <Link
                  to="/solutions"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/20 transition-all"
                  data-testid="hero-find-solution"
                >
                  Explore Solutions
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }} data-testid="stats-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {[
              { value: "45", suffix: "+", label: "Years of Excellence", subtext: "Since 1980", icon: Award },
              { value: "500", suffix: "+", label: "Industrial Clients", subtext: "Worldwide", icon: Factory },
              { value: "50", suffix: "+", label: "Countries Served", subtext: "Global Reach", icon: Globe },
              { value: "24", suffix: "/7", label: "Technical Support", subtext: "Always Available", icon: Headphones }
            ].map((stat, idx) => (
              <div key={idx} className="reveal reveal-up text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover-lift">
                <stat.icon className="mx-auto mb-3 text-[#F97316]" size={32} />
                <p className="font-oswald text-4xl md:text-5xl font-bold text-white">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/90 font-medium mt-1">{stat.label}</p>
                <p className="text-white/60 text-sm">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT FINDER SEARCH ==================== */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200 animated-grid-bg" data-testid="product-finder">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 reveal reveal-up">
            <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-2 heading-accent">FIND REFRACTORY PRODUCTS</h2>
            <p className="text-gray-600">Search by product name, grade, or application</p>
          </div>
          <div className="relative reveal reveal-up">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search products... (e.g., High Alumina Bricks, LCC Castables, Ceramic Fiber)"
              className="w-full pl-14 pr-32 py-4 rounded-full border-2 border-gray-200 focus:border-[#3B82F6] focus:outline-none text-lg transition-all duration-300 focus:shadow-lg"
              data-testid="product-search"
            />
            <Link
              to="/products"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-full font-medium transition-colors"
            >
              Search
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4 reveal reveal-up stagger-children">
            {["Steel Plants", "Cement Plants", "Aluminum", "Petrochemical", "Glass", "Power"].map((tag) => (
              <Link
                key={tag}
                to={`/solutions/${tag.toLowerCase().replace(' plants', '').replace(' ', '-')}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all hover:-translate-y-0.5"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BROWSE BY INDUSTRY ==================== */}
      <section className="py-20 px-4 bg-white" data-testid="industries-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal reveal-up">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#3B82F6] text-sm font-semibold mb-4">INDUSTRY SOLUTIONS</span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4 heading-accent">SOLUTIONS FOR EVERY INDUSTRY</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Specialized refractory engineering for your specific industrial applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {industries.map((industry, idx) => (
              <Link
                key={idx}
                to={`/solutions/${industry.slug}`}
                className="reveal reveal-up group relative h-72 rounded-2xl overflow-hidden shadow-lg hover-lift card-shimmer"
                data-testid={`industry-${industry.slug}`}
              >
                <img src={industry.image} alt={industry.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-oswald text-xl font-bold text-white mb-1">{industry.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{industry.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#F97316] font-medium text-sm group-hover:gap-2 transition-all">
                    Explore Solutions <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED SOLUTIONS ==================== */}
      <section className="py-20 px-4 bg-gray-50" data-testid="featured-solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal reveal-up">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-50 text-[#F97316] text-sm font-semibold mb-4">FEATURED SOLUTIONS</span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4 heading-accent">ENGINEERED FOR PERFORMANCE</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Complete refractory packages designed for your specific equipment and processes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {featuredSolutions.map((solution, idx) => {
              const Icon = getIcon(solution.iconName);
              return (
                <div key={idx} className="reveal reveal-up bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover-lift group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.desc}</p>
                  <p className="text-xs text-gray-500 border-t border-gray-100 pt-4">
                    <span className="font-semibold text-[#3B82F6]">Products:</span> {solution.products}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 reveal reveal-up">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-8 py-4 rounded-full font-semibold transition-colors hover-lift">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PARTNER BRANDS ==================== */}
      <section className="py-16 px-4 bg-white border-y border-gray-200" data-testid="brands-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 reveal reveal-up">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-4">STRATEGIC SUPPLY PARTNER</span>
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] heading-accent">7+ PREMIUM BRANDS</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 stagger-children">
            {brands.map((brand, idx) => (
              <div key={idx} className="reveal reveal-scale text-center group cursor-default">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center mb-2 group-hover:border-[#F97316] group-hover:bg-orange-50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-100">
                  <span className="font-oswald text-lg font-bold text-[#1E3A5F] group-hover:text-[#F97316] transition-colors">{brand.name}</span>
                </div>
                <p className="text-xs text-gray-500 group-hover:text-[#F97316] transition-colors">{brand.fullName}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal reveal-up">
            <Link to="/brands" className="text-[#3B82F6] hover:text-[#1E40AF] font-medium inline-flex items-center gap-1 transition-all hover:gap-2">
              View All Brand Partners <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }} data-testid="why-choose-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal reveal-up">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-4">WHY PARTNER WITH US</span>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">YOUR ENGINEERING PARTNER, NOT JUST A SUPPLIER</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {[
              { icon: Shield, title: "Engineering Excellence", desc: "Complete refractory engineering from design to commissioning—not just supply" },
              { icon: Globe, title: "Global Reach", desc: "Serving GCC, ASEAN, UK, Europe with efficient logistics and dedicated support" },
              { icon: Package, title: "7+ Premium Brands", desc: "Strategic supply partner of India's and world's leading refractory manufacturers" },
              { icon: TrendingUp, title: "Cost Optimization", desc: "Expert guidance for product selection that maximizes performance and reduces TCO" }
            ].map((item, idx) => (
              <div key={idx} className="reveal reveal-up text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover-lift group">
                <item.icon className="mx-auto mb-4 text-[#F97316] transition-transform duration-300 group-hover:scale-110" size={40} />
                <h3 className="font-oswald text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 px-4 bg-[#F97316]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4 reveal reveal-up">READY TO DISCUSS YOUR REQUIREMENTS?</h2>
          <p className="text-white/90 text-lg mb-8 reveal reveal-up">Get expert recommendations and competitive quotes within 24 hours</p>
          <div className="flex flex-wrap justify-center gap-4 reveal reveal-up">
            <button
              onClick={onQuoteClick}
              className="bg-white text-[#F97316] px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg hover-lift"
            >
              <Zap size={20} />
              Request Quote
            </button>
            <a
              href="tel:+919810205154"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/10 transition-colors hover-lift"
            >
              <Phone size={20} />
              Call +91 9810205154
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
