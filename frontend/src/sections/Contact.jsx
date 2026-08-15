'use client';
import { useApp } from '@/context/AppContext';
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, Globe, Award, Users, Loader2, ChevronDown, Zap, Shield } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from '@/lib/analytics';



// ─── DATA ──────────────────────────────────────────────────────────────────────

const industries = ["Steel", "Cement", "Aluminum", "Petrochemical", "Glass", "Power", "Foundry", "Other"];

const productCategories = [
  "High Alumina Bricks", "Fireclay Bricks", "LCC/ULCC Castables",
  "Ramming Mass", "Slide Gate Plates", "Ceramic Fiber",
  "Insulating Bricks", "Other Products",
];

const faqs = [
  {
    q: "What is your typical response time for quote requests?",
    a: "We respond to all quote requests within 4 business hours. For urgent requirements, call us directly at +91 98999 57888, we're available Mon–Sat, 9AM–6PM IST.",
  },
  {
    q: "Do you supply internationally?",
    a: "Yes. We export to 50+ countries including GCC (UAE, Saudi Arabia, Qatar, Oman), UK, Germany, Singapore, Malaysia, and Indonesia. We handle all export documentation including certificates of origin, test certificates, and packing lists.",
  },
  {
    q: "Is there a minimum order quantity?",
    a: "There is no fixed MOQ for most products. We work with small trial orders for new clients and scale up based on your requirements. For some specialty grades, a minimum of 1 MT may apply, we'll confirm at enquiry stage.",
  },
  {
    q: "Can you provide material test certificates?",
    a: "Yes. All products come with manufacturer test certificates (MTC). We can also arrange third-party testing from accredited labs on request. ISO 9001 documentation is maintained for all transactions.",
  },
  {
    q: "Do you offer technical consultation before purchase?",
    a: "Absolutely, it's core to how we work. Our engineers review your furnace type, operating temperatures, and process conditions before recommending materials. This consultation is free of charge.",
  },
  {
    q: "What brands are you an official supply partner for?",
    a: "We are authorised dealers of CUMI (Carborundum Universal), Crown Ceramics, and Divine Cerawool, and supply partners for Calderys, TRL Krosaki (Tata Group), and Mahakoshal Refractories.",
  },
];

// ─── FAQ ACCORDION ──────────────────────────────────────────────────────────────

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F97316]"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#1E3A5F] text-sm pr-4">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[#F97316] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {faq.a}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

const Contact = () => {
  const { region } = useApp();
  const [formType, setFormType] = useState("simple");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    industry: "", inquiry_type: "general", message: "",
    products: [], quantity: "", application: "", delivery_location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductToggle = (product) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const subject = formType === "quote" 
        ? `Quote Request: ${formData.company || formData.name}`
        : `Contact Inquiry: ${formData.name}`;
      
      const payload = {
        access_key: "d0154692-c512-4e1b-9b4c-31f715ca3bfd",
        subject: subject,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || "Not provided",
        industry: formData.industry,
      };

      if (formType === "quote") {
        payload.inquiry_type = "Quote Request";
        payload.products = formData.products.join(", ");
        payload.quantity = formData.quantity || "Not provided";
        payload.application = formData.application || "Not provided";
        payload.delivery_location = formData.delivery_location || "Not provided";
        payload.message = formData.message;
      } else {
        payload.inquiry_type = formData.inquiry_type;
        payload.message = formData.message;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        toast.success("Inquiry sent successfully! We will contact you soon.");
        // 'contact_quote' is a genuine quotation request (collects products,
        // quantity, delivery location) and correctly uses rfq_submit. The
        // general enquiry path is not a quote request — it previously fired
        // rfq_submit too, which inflated RFQ counts with general questions.
        trackEvent(formType === 'quote' ? 'rfq_submit' : 'contact_submit', {
          form_variant: formType === 'quote' ? 'contact_quote' : 'contact_general',
          product_family: formType === 'quote' ? formData.products.join(', ') : undefined,
          application: formType === 'quote' ? formData.application : undefined,
          market: formType === 'quote' ? formData.delivery_location : undefined,
          intent: formType === 'quote' ? 'quote' : formData.inquiry_type,
          page_path: window.location.pathname,
        });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "", company: "", industry: "", inquiry_type: "general", message: "", products: [], quantity: "", application: "", delivery_location: "" });
  };

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact Shanker Agencies",
        description: "Get in touch with Shanker Agencies for refractory products and engineering solutions",
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.shankeragencies.com/#localbusiness",
        name: "Shanker Agencies Private Limited",
        alternateName: "SAPL",
        description: "India's premier refractory engineering partner since 1980. Authorised dealer of CUMI, Crown Ceramics & Divine Cerawool. Supply partner for Calderys, TRL Krosaki & Mahakoshal.",
        telephone: "+91-9899957888",
        email: "info@shankeragencies.com",
        url: "https://www.shankeragencies.com",
        foundingDate: "1980",
        geo: { "@type": "GeoCoordinates", latitude: 28.676098255212455, longitude: 77.29598125527387 },
        hasMap: "https://share.google/Cz2EJCPRFsQtAvvOE",
        address: {
          "@type": "PostalAddress",
          streetAddress: "553, Main Grand Trunk Road, East Ram Nagar",
          addressLocality: "Shahdara",
          postalCode: "110032",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
        ],
        sameAs: [
          "https://share.google/Cz2EJCPRFsQtAvvOE",
          "https://www.linkedin.com/company/shanker-agencies-private-limited/",
          "https://www.indiamart.com/shankeragencies/",
          "https://www.tradeindia.com/shanker-agencies-pvt-ltd-2386358/",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="bg-white">
      

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.96) 0%, rgba(30,58,138,0.90) 100%), url('https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="contact-hero"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            We respond within 4 hours
          </span>
          <h1 id="contact-heading" className="font-oswald text-5xl md:text-6xl font-bold text-white leading-none mb-4">
            LET'S DISCUSS<br />
            <span className="text-shimmer">YOUR REQUIREMENTS</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            Whether you need a quick price, technical guidance, or a full lining design, our team is ready. No obligation, no minimum order.
          </p>

          {/* Quick contact pills */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="tel:+919899957888"
              className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors text-sm font-medium"
            >
              <Phone size={16} aria-hidden="true" /> +91 98999 57888
            </a>
            <a
              href="https://wa.me/919899957888"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white transition-colors text-sm font-semibold"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp (Fastest Response)
            </a>
            <a
              href="mailto:info@shankeragencies.com"
              className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors text-sm font-medium"
            >
              <Mail size={16} aria-hidden="true" /> info@shankeragencies.com
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────── */}
      <section className="py-5 px-4 bg-gray-50 border-b border-gray-200" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { icon: Zap, label: "4-hour response time", color: "text-[#F97316]" },
            { icon: Globe, label: "Serving 50+ countries", color: "text-green-500" },
            { icon: Award, label: "ISO 9001 · 14001 · 45001", color: "text-[#3B82F6]" },
            { icon: Users, label: "500+ industrial clients", color: "text-purple-500" },
            { icon: Shield, label: "No MOQ requirement", color: "text-[#1E3A5F]" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2 text-gray-600">
              <Icon size={17} className={color} aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN SECTION ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-white" data-testid="contact-form-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── FORM ─────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Tab switcher */}
                <div className="flex border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setFormType("simple")}
                    className={`flex-1 py-4 text-sm font-bold transition-colors focus:outline-none ${formType === "simple"
                        ? "bg-[#1E3A5F] text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    Quick Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("quote")}
                    className={`flex-1 py-4 text-sm font-bold transition-colors focus:outline-none border-l border-gray-200 ${formType === "quote"
                        ? "bg-[#F97316] text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    Request Detailed Quote
                  </button>
                </div>

                <div className="p-8">
                  {submitted ? (
                    <div className="text-center py-14">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500" size={40} aria-hidden="true" />
                      </div>
                      <h3 className="font-oswald text-2xl font-bold mb-2 text-[#1E3A5F]">Inquiry Received!</h3>
                      <p className="text-gray-500 mb-2 text-sm">
                        Our team will contact you within 4 hours at{" "}
                        <strong className="text-[#1E3A5F]">{formData.email}</strong>
                      </p>
                      <p className="text-gray-400 text-xs mb-8">
                        For urgent requirements, call <a href="tel:+919899957888" className="text-[#F97316] font-semibold hover:underline">+91 98999 57888</a>
                      </p>
                      <button
                        onClick={resetForm}
                        className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3 rounded-full font-semibold transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                      {/* Row 1 */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="form-label">Full Name *</label>
                          <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Full Name" className="form-input" data-testid="input-name" aria-required="true" />
                        </div>
                        <div>
                          <label htmlFor="email" className="form-label">Work Email *</label>
                          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@company.com" className="form-input" data-testid="input-email" aria-required="true" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="form-label">Phone (with country code) *</label>
                          <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +91 98765 43210" className="form-input" data-testid="input-phone" aria-required="true" />
                        </div>
                        <div>
                          <label htmlFor="company" className="form-label">Company Name</label>
                          <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company Name" className="form-input" data-testid="input-company" />
                        </div>
                      </div>

                      {/* Industry */}
                      <div>
                        <label htmlFor="industry" className="form-label">Your Industry *</label>
                        <select id="industry" name="industry" value={formData.industry} onChange={handleChange} required className="form-input" data-testid="select-industry" aria-required="true">
                          <option value="">Select your industry</option>
                          {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>

                      {/* Quote-specific fields */}
                      {formType === "quote" && (
                        <>
                          <div>
                            <label className="form-label">Products Required</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {productCategories.map((product) => (
                                <label
                                  key={product}
                                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all text-xs font-medium ${formData.products.includes(product)
                                      ? "bg-blue-50 border-[#3B82F6] text-[#3B82F6]"
                                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                                    }`}
                                >
                                  <input type="checkbox" checked={formData.products.includes(product)} onChange={() => handleProductToggle(product)} className="sr-only" aria-label={product} />
                                  {product}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="quantity" className="form-label">Quantity / Volume</label>
                              <input id="quantity" type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g. 50 MT, 1000 pcs" className="form-input" />
                            </div>
                            <div>
                              <label htmlFor="delivery_location" className="form-label">Delivery Location</label>
                              <input id="delivery_location" type="text" name="delivery_location" value={formData.delivery_location} onChange={handleChange} placeholder="City, Country" className="form-input" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="application" className="form-label">Application / Equipment</label>
                            <input id="application" type="text" name="application" value={formData.application} onChange={handleChange} placeholder="e.g. Steel ladle working lining, Kiln burning zone" className="form-input" />
                          </div>
                        </>
                      )}

                      {/* Simple inquiry type */}
                      {formType === "simple" && (
                        <div>
                          <label htmlFor="inquiry_type" className="form-label">Inquiry Type</label>
                          <select id="inquiry_type" name="inquiry_type" value={formData.inquiry_type} onChange={handleChange} className="form-input">
                            <option value="general">General Inquiry</option>
                            <option value="quote">Request Quote</option>
                            <option value="technical">Technical Support</option>
                            <option value="partnership">Partnership / Supply Network</option>
                          </select>
                        </div>
                      )}

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="form-label">
                          {formType === "quote" ? "Additional Notes" : "Message"} {formType === "simple" ? "*" : ""}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required={formType === "simple"}
                          rows={4}
                          placeholder={formType === "quote" ? "Specific requirements, preferred brands, delivery timeline, or any other context..." : "How can we help you?"}
                          className="form-input resize-none"
                          data-testid="input-message"
                          aria-required={formType === "simple"}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-70 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        data-testid="submit-button"
                      >
                        {loading ? (
                          <><Loader2 size={20} className="animate-spin" aria-hidden="true" /> Submitting...</>
                        ) : (
                          <><Send size={20} aria-hidden="true" /> {formType === "quote" ? "Request Quote" : "Send Inquiry"}</>
                        )}
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        By submitting, you agree to our{" "}
                        <a href="/privacy" className="text-[#3B82F6] hover:underline">Privacy Policy</a>.
                        We never share your information with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ───────────────────── */}
            <aside className="space-y-5" aria-label="Contact information">

              {/* Primary contact */}
              <div
                className="p-7 rounded-2xl text-white"
                style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
              >
                <h3 className="font-oswald text-lg font-bold mb-5">CONTACT DIRECTLY</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 transition-opacity group">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                      <Phone size={18} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1 uppercase tracking-wider text-blue-200">Call Us</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <a href="tel:+919899957888" className="text-white hover:text-[#F97316] text-sm transition-colors">+91 98999 57888</a>
                        <a href="tel:+919810205154" className="text-white hover:text-[#F97316] text-sm transition-colors">+91 98102 05154</a>
                        <a href="tel:+919811909394" className="text-white hover:text-[#F97316] text-sm transition-colors">+91 98119 09394</a>
                        <a href="tel:+918800203083" className="text-white hover:text-[#F97316] text-sm transition-colors">+91 88002 03083</a>
                      </div>
                    </div>
                  </div>
                  <a href="mailto:info@shankeragencies.com" className="flex items-start gap-4 hover:opacity-85 transition-opacity group">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                      <Mail size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Email Us</p>
                      <p className="text-blue-200 text-sm">info@shankeragencies.com</p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp, most prominent CTA */}
                <a
                  href="https://wa.me/919899957888"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
                  aria-label="Chat on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp, Fastest Response
                </a>
              </div>

              {/* Address + map */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <h3 className="font-oswald text-base font-bold mb-4 text-[#1E3A5F]">VISIT US</h3>
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <MapPin size={16} className="text-[#F97316]" />
                  </div>
                  <address className="not-italic text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#1E3A5F] block">Shanker Agencies Pvt. Ltd.</strong>
                    553, Main Grand Trunk Road, East Ram Nagar, Shahdara<br />
                    Delhi 110032, India
                  </address>
                </div>
                {/*
                  ── GOOGLE MAPS, Shanker Agencies, 553 Main G.T Road, Shahdara, Delhi 110032
                  Pin aligned to the verified Google Business Profile
                  (share link: https://share.google/Cz2EJCPRFsQtAvvOE).
                  Coordinates: 28.67608°N, 77.29595°E
                */}
                <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: 220 }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Shanker+Agencies+Pvt+Ltd+553+Main+GT+Road+Shahdara+Delhi+110032&t=m&z=17&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Shanker Agencies Pvt. Ltd., 553 Main G.T Road, Shahdara, Delhi 110032"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Google Map showing Shanker Agencies office at 553 Main GT Road, Shahdara, Delhi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href="https://share.google/Cz2EJCPRFsQtAvvOE"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 border border-[#3B82F6] text-[#3B82F6] rounded-xl text-xs font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <MapPin size={13} aria-hidden="true" />
                    View on Maps
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=28.676098255212455,77.29598125527387&destination_place_id=Shanker+Agencies+Pvt+Ltd+553+Main+Grand+Trunk+Road+Shahdara+Delhi"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#3B82F6] text-white rounded-xl text-xs font-semibold hover:bg-[#2563EB] transition-colors"
                  >
                    <MapPin size={13} aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200" aria-label="Business hours">
                <h4 className="font-oswald text-base font-bold mb-4 text-[#1E3A5F] flex items-center gap-2">
                  <Clock size={16} className="text-[#F97316]" aria-hidden="true" />
                  BUSINESS HOURS
                </h4>
                <dl className="space-y-2 text-sm">
                  {[
                    ["Monday – Saturday", "9:00 AM – 6:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <dt className="text-gray-600 font-medium">{day}</dt>
                      <dd className="font-bold text-[#1E3A5F]">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-gray-400 mt-3 border-t border-gray-200 pt-3">
                  * Emergency support available for existing clients 24/7
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
              Before You Contact Us
            </span>
            <h2 id="faq-heading" className="font-oswald text-3xl font-bold text-[#1E3A5F]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div className="space-y-3" role="list">
            {faqs.map((faq, idx) => (
              <div key={idx} role="listitem">
                <FAQItem
                  faq={faq}
                  isOpen={openFAQ === idx}
                  onToggle={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#F97316]" aria-labelledby="contact-cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="contact-cta-heading" className="font-oswald text-3xl font-bold text-white mb-3">
            PREFER TO TALK DIRECTLY?
          </h2>
          <p className="text-white/85 mb-8 text-sm">Our technical team is ready to discuss your specific requirements</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919899957888"
              className="inline-flex items-center gap-2 bg-white text-[#F97316] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              <Phone size={20} aria-hidden="true" />
              Call +91 98999 57888
            </a>
            <a
              href="https://wa.me/919899957888"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-xl"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;