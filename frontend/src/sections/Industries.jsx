'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ChevronRight, Factory, ThermometerSun, Users, Layers, Shield, Flame, Target, Zap, CheckCircle } from "lucide-react";
import { INDUSTRIES_LIST, getIndustryData, getEquipmentAreas, getRecommendedProducts, getServices } from "../data/industriesData";

const Industries = () => {
  const { industrySlug } = useParams();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [activeEquipment, setActiveEquipment] = useState(0);
  const detailSectionRef = useRef(null);
  const equipmentRefs = useRef({});

  useEffect(() => {
    if (industrySlug) {
      const industry = INDUSTRIES_LIST.find(i => i.id === industrySlug);
      if (industry) {
        setSelectedIndustry(industry);
        setTimeout(() => {
          detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [industrySlug]);

  const handleIndustryClick = (industry) => {
    if (selectedIndustry?.id === industry.id) {
      setSelectedIndustry(null);
    } else {
      setSelectedIndustry(industry);
      setActiveEquipment(0);
      setTimeout(() => {
        detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const scrollToEquipment = (index) => {
    setActiveEquipment(index);
    const ref = equipmentRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const industryData = selectedIndustry ? getIndustryData(selectedIndustry.id) : null;
  const equipmentAreas = selectedIndustry ? getEquipmentAreas(selectedIndustry.id) : [];
  const recommendedProducts = selectedIndustry ? getRecommendedProducts(selectedIndustry.id) : [];
  const services = selectedIndustry ? getServices(selectedIndustry.id) : [];

  const industriesStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Refractory Solutions by Industry",
    "description": "Industry-specific refractory solutions for Steel, Cement, Aluminum, Petrochemical, Glass, and Power Generation plants"
  };

  return (
    <div>
      

      {/* Hero Section */}
      <section
        className="relative py-24 px-4"
        style={{
          backgroundImage: industryData
            ? `url('${industryData.heroImage}')`
            : `url('https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="industries-hero"
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-4">
            INDUSTRIES & SOLUTIONS
          </span>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            REFRACTORY SOLUTIONS <span className="gradient-text-orange">BY INDUSTRY</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            {industryData?.tagline || "Select your industry to discover engineered refractory solutions designed for your specific applications."}
          </p>
        </div>
      </section>

      {/* Industry Selection Grid */}
      <section className="py-16 px-4 bg-background" data-testid="industries-grid">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-3xl font-bold mb-3">SELECT YOUR INDUSTRY</h2>
            <p className="text-muted-foreground">Click on an industry to explore tailored solutions and products</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_LIST.map((industry, idx) => (
              <button
                key={industry.id}
                onClick={() => handleIndustryClick(industry)}
                className={`plant-card group relative h-64 img-zoom text-left animate-fade-in-up transition-all duration-300 ${selectedIndustry?.id === industry.id
                  ? "ring-4 ring-[#F97316] scale-[1.02]"
                  : "hover:ring-2 hover:ring-[#3B82F6]/50"
                  }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
                data-testid={`industry-card-${industry.id}`}
              >
                <img src={industry.image} alt={`${industry.name} refractory and insulation applications`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <Factory size={28} className={`mb-2 transition-colors ${selectedIndustry?.id === industry.id ? 'text-[#F97316]' : 'text-[#3B82F6]'}`} />
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">{industry.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1"><Users size={14} /> {industry.clients} clients</span>
                    <span className="flex items-center gap-1"><ThermometerSun size={14} /> {industry.temp}</span>
                  </div>
                </div>
                {selectedIndustry?.id === industry.id && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#F97316] text-white px-3 py-1 rounded-full text-xs font-medium">Selected</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Detail Section */}
      {selectedIndustry && (
        <section ref={detailSectionRef} className="py-16 px-4 bg-gray-50 dark:bg-gray-900" data-testid="industry-detail">
          <div className="max-w-7xl mx-auto">
            {/* Industry Header */}
            <div className="glass-card p-8 rounded-2xl mb-12 gradient-border">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Factory className="text-[#F97316]" size={32} />
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">40+ Years of Experience</span>
                  </div>
                  <h2 className="font-oswald text-4xl font-bold mb-3">{selectedIndustry.name} Industry Solutions</h2>
                  <p className="text-muted-foreground max-w-2xl">{industryData?.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="glass-card p-4 rounded-xl text-center min-w-[120px]">
                    <p className="font-oswald text-2xl font-bold gradient-text">{selectedIndustry.clients}</p>
                    <p className="text-xs text-muted-foreground">Clients Served</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center min-w-[120px]">
                    <p className="font-oswald text-2xl font-bold text-[#F97316]">{selectedIndustry.temp}</p>
                    <p className="text-xs text-muted-foreground">Max Temp</p>
                  </div>
                  <Link href="/contact" className="gradient-primary text-white px-6 py-3 rounded-full font-medium hover-lift flex items-center gap-2" data-testid="industry-get-quote">
                    Get Quote <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Equipment Areas Navigation */}
            <div className="mb-8">
              <h3 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="text-[#F97316]" />
                Equipment Areas & Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {equipmentAreas.map((area, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToEquipment(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeEquipment === idx
                      ? 'gradient-orange text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#F97316]'
                      }`}
                    data-testid={`equipment-nav-${idx}`}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Areas Cards */}
            <div className="space-y-8">
              {equipmentAreas.map((area, idx) => (
                <div
                  key={idx}
                  ref={el => equipmentRefs.current[idx] = el}
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeEquipment === idx ? 'ring-2 ring-[#F97316]' : ''}`}
                  data-testid={`equipment-card-${idx}`}
                >
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="relative h-64 lg:h-auto img-zoom">
                      <img src={area.image} alt={`Refractory solution for ${area.name}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:bg-gradient-to-r"></div>
                      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <h4 className="font-oswald text-2xl font-bold text-white">{area.name}</h4>
                        <p className="text-sm text-gray-300 mt-1">{area.conditions}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 p-6 lg:p-8">
                      <p className="text-muted-foreground mb-6">{area.desc}</p>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-sm uppercase tracking-wider text-[#3B82F6] mb-3 flex items-center gap-2">
                            <Layers size={16} /> Recommended Products
                          </h5>
                          <div className="space-y-2">
                            {area.products.split(', ').map((product, pIdx) => (
                              <div key={pIdx} className="flex items-center gap-2 text-sm">
                                <ChevronRight size={14} className="text-[#F97316]" />
                                <span>{product}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm uppercase tracking-wider text-[#3B82F6] mb-3 flex items-center gap-2">
                            <Zap size={16} /> Quick Actions
                          </h5>
                          <div className="space-y-2">
                            <Link href="/products" className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#F97316] transition-colors">
                              <ArrowRight size={14} /> View Related Products
                            </Link>
                            <a href="https://wa.me/919899957888?text=Hi, I need the technical datasheet for solutions in this industry. Please share the PDF."
                              target="_blank" rel="noreferrer"
                              className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#F97316] transition-colors">
                              <ArrowRight size={14} /> Request Technical Datasheet (WhatsApp)
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Products */}
            <div className="mt-16">
              <h3 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                <Shield className="text-[#3B82F6]" />
                Recommended Products for {selectedIndustry.name}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-xl hover-lift" data-testid={`recommended-product-${idx}`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] text-xs font-medium">{product.brand}</span>
                      <span className="text-[#F97316] font-mono text-sm flex items-center gap-1"><Flame size={14} />{product.temp}</span>
                    </div>
                    <h4 className="font-oswald text-lg font-semibold mb-2">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{product.use}</p>
                    <Link href="/contact" className="w-full gradient-primary text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                      Enquire <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mt-16">
              <h3 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                Our Services for {selectedIndustry.name} Industry
              </h3>
              <div className="glass-card p-6 rounded-xl">
                <div className="flex flex-wrap gap-3">
                  {services.map((service, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">{service}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 gradient-primary" data-testid="industries-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-3xl font-bold text-white mb-4">
            {selectedIndustry ? `READY TO OPTIMIZE YOUR ${selectedIndustry.name.toUpperCase()} PLANT?` : "NEED CUSTOM SOLUTIONS FOR YOUR INDUSTRY?"}
          </h2>
          <p className="text-white/90 mb-6">Our technical experts can help you select the optimal refractory solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-[#1E40AF] px-8 py-4 rounded-full font-semibold hover-lift flex items-center gap-2" data-testid="industries-cta-button">
              Consult Our Experts <ArrowRight size={20} />
            </Link>
            <Link href="/products" className="glass text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
