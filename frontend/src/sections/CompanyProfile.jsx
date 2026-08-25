'use client';
import { useState } from "react";
import { toast } from "sonner";

import { Download, Phone, Mail, MapPin, Award, Shield, Globe, Building2, CheckCircle, Factory, Flame, Users, Target, Loader2, MessageCircle, X } from "lucide-react";



const LOGO_URL = "/images/sapl-logo.png";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=1200&q=80",
  steel: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80",
  cement: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=600&q=80",
  industrial: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80",
};

async function loadPdfLibs() {
  if (window._jsPDF && window._html2canvas) {
    return { jsPDF: window._jsPDF, html2canvas: window._html2canvas };
  }
  await Promise.all([
    new Promise((res, rej) => {
      if (document.querySelector('script[data-lib="html2canvas"]')) return res();
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.setAttribute("data-lib", "html2canvas");
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    }),
    new Promise((res, rej) => {
      if (document.querySelector('script[data-lib="jspdf"]')) return res();
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.setAttribute("data-lib", "jspdf");
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    }),
  ]);
  window._html2canvas = window.html2canvas;
  window._jsPDF = window.jspdf?.jsPDF;
  return { jsPDF: window._jsPDF, html2canvas: window._html2canvas };
}

const WHATSAPP_URL =
  "https://wa.me/919899957888?text=Hi,%20I%20just%20downloaded%20the%20Shanker%20Agencies%20Company%20Profile%20PDF%20and%20would%20like%20more%20information.";

function CompanyProfile() {
  const [downloading, setDownloading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", company: "" });

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const captureLeadAndDownload = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. Capture lead via Web3Forms (same API key used in Contact form)
      const payload = {
        access_key: "d0154692-c512-4e1b-9b4c-31f715ca3bfd",
        subject: `Company Profile Download: ${leadForm.company || leadForm.name}`,
        from_name: leadForm.name,
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        company: leadForm.company || "Not provided",
        inquiry_type: "Company Profile Download",
        message: `${leadForm.name} downloaded the Company Profile PDF.`,
      };
      // Fire-and-forget, don't block download on slow form API
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("Lead capture error:", err));

      // 2. Close modal and trigger download + open WhatsApp in parallel
      setShowLeadModal(false);
      toast.success("Thanks! Your PDF is downloading and our team is notified.");

      // Open WhatsApp in a new tab (best-effort, browsers may block popups without user gesture)
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");

      // Start the PDF download
      await handleDownload();

      // Reset form for next use
      setLeadForm({ name: "", email: "", phone: "", company: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try the WhatsApp option or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { jsPDF, html2canvas } = await loadPdfLibs();
      const el = document.getElementById("company-profile-doc");
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentW = pageW - margin * 2;
      const totalImgH = contentW * (canvas.height / canvas.width);
      let yOffset = 0, pageNum = 0;
      while (yOffset < totalImgH) {
        if (pageNum > 0) pdf.addPage();
        const availH = pageH - margin * 2;
        const sliceH = Math.min(availH, totalImgH - yOffset);
        const srcY = (yOffset / totalImgH) * canvas.height;
        const srcH = (sliceH / totalImgH) * canvas.height;
        const sc = document.createElement("canvas");
        sc.width = canvas.width; sc.height = srcH;
        sc.getContext("2d").drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);
        pdf.addImage(sc.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, contentW, sliceH);
        yOffset += sliceH; pageNum++;
      }
      pdf.save("Shanker-Agencies-Company-Profile.pdf");
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please use browser Print → Save as PDF as a fallback.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white">

      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-50 gradient-dark py-3 sm:py-4 px-4 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Shanker Agencies logo" className="h-10 w-auto bg-white/95 rounded-lg p-1 shadow" />
            <div className="flex flex-col leading-tight">
              <span className="font-oswald text-white text-base sm:text-lg font-bold tracking-wide">
                Company Profile
              </span>
              <span className="text-blue-200 text-[11px] sm:text-xs">Shanker Agencies Pvt. Ltd. &middot; Since 1980</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowLeadModal(true)}
              disabled={downloading}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-70 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20"
              aria-label="Download Company Profile PDF"
            >
              {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {downloading ? "Preparing PDF..." : "Download PDF"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── LEAD CAPTURE MODAL ───────────────────────────── */}
      {showLeadModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => !submitting && setShowLeadModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !submitting && setShowLeadModal(false)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close dialog"
              disabled={submitting}
            >
              <X size={18} />
            </button>
            <div className="gradient-dark px-6 py-5 text-white">
              <h3 id="lead-modal-title" className="font-oswald text-xl font-bold">Download Company Profile</h3>
              <p className="text-blue-200 text-xs mt-1">A 3-page PDF will download immediately after submitting.</p>
            </div>
            <form onSubmit={captureLeadAndDownload} className="p-6 space-y-4">
              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold text-[#1E3A5F] mb-1">Full Name *</label>
                <input
                  id="lead-name"
                  type="text"
                  name="name"
                  value={leadForm.name}
                  onChange={handleLeadChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-[#1E3A5F] mb-1">Work Email *</label>
                  <input
                    id="lead-email"
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleLeadChange}
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold text-[#1E3A5F] mb-1">Phone *</label>
                  <input
                    id="lead-phone"
                    type="tel"
                    name="phone"
                    value={leadForm.phone}
                    onChange={handleLeadChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lead-company" className="block text-xs font-semibold text-[#1E3A5F] mb-1">Company</label>
                <input
                  id="lead-company"
                  type="text"
                  name="company"
                  value={leadForm.company}
                  onChange={handleLeadChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-70 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/25"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending...</>
                ) : (
                  <><Download size={16} /> Download PDF & Open WhatsApp</>
                )}
              </button>
              <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                By submitting, you agree to our <a href="/privacy" className="text-[#3B82F6] hover:underline">Privacy Policy</a>. We'll only contact you regarding refractory products.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Document, A4 on desktop & print; auto-height on mobile so there's no empty whitespace */}
      <div id="company-profile-doc" className="mx-auto bg-white shadow-xl my-0 sm:my-8 print:my-0 print:shadow-none" style={{ width: '210mm', maxWidth: '100%' }}>

        {/* PAGE 1 */}
        <section className="p-6 sm:p-10 print:p-10 sm:!min-h-[297mm] print:!min-h-[297mm]" style={{ boxSizing: 'border-box' }}>
          <header className="flex items-start justify-between border-b-4 border-[#F97316] pb-5 mb-6">
            <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="SAPL" className="h-14 sm:h-16" />
              <div>
                <p className="font-oswald text-xl sm:text-2xl font-bold text-[#1E3A5F] leading-tight">SHANKER AGENCIES PVT. LTD.</p>
                <p className="text-[#F97316] text-sm font-semibold">Engineering Refractory Solutions</p>
                <p className="text-gray-400 text-xs mt-0.5">Authorized Multi-Brand Refractory Dealer</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-oswald text-base font-bold text-[#1E3A5F]">COMPANY PROFILE</p>
              <p className="text-gray-400 text-xs">Est. 1980 · Delhi, India</p>
            </div>
          </header>

          <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden mb-6">
            <img src={IMAGES.hero} alt="Steel plant" className="w-full h-full object-cover animate-ken-burns" crossOrigin="anonymous" />
            <div className="absolute inset-0 flex items-center" style={{ background: "linear-gradient(90deg, rgba(30,58,95,0.92) 0%, rgba(30,58,95,0.5) 60%, transparent 100%)" }}>
              <div className="p-6 text-white">
                <h1 className="font-oswald leading-tight">
                  <span className="block text-base sm:text-xl font-bold mb-1">YOUR TRUSTED</span>
                  <span className="block text-2xl sm:text-4xl font-bold text-shimmer">REFRACTORY PARTNER</span>
                </h1>
                <p className="text-xs sm:text-sm mt-2 opacity-85">45+ Years · 500+ Clients · 50+ Countries</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Award, value: "45+", label: "Years", from: "#1E3A5F", to: "#3B82F6" },
              { icon: Building2, value: "500+", label: "Clients", from: "#F97316", to: "#FB923C" },
              { icon: Globe, value: "50+", label: "Countries", from: "#16a34a", to: "#22c55e" },
              { icon: Users, value: "7+", label: "Partners", from: "#7c3aed", to: "#a78bfa" },
            ].map(({ icon: Icon, value, label, from, to }) => (
              <div key={label} className="text-center p-3 sm:p-4 rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                <Icon className="mx-auto mb-1.5" size={18} />
                <p className="font-oswald text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-[9px] sm:text-xs opacity-90 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-3 mb-3">ABOUT US</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              <strong className="text-[#1E3A5F]">Shanker Agencies Pvt. Ltd. (SAPL)</strong> was started in New Delhi in 1980 by Mohan Taneja. For over 45 years we have supplied refractory products and on-site engineering help to steel, cement, aluminium, glass, petrochemical and power plants across India, and have shipped into 50+ countries.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              We deal in <strong>CUMI, Calderys, TRL Krosaki, Mahakoshal, Divine Cerawool and Crown Ceramics</strong>. Every order ships with original manufacturer test certificates and is backed by our own plant-side support team.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-3 mb-3">CORE COMPETENCIES</h2>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[
                { bg: "bg-blue-50 border-blue-100", c: "text-[#3B82F6]", t: "Complete Refractory Solutions", d: "Shaped, Unshaped, Flow Control, Insulation & Acid Proofing" },
                { bg: "bg-orange-50 border-orange-100", c: "text-[#F97316]", t: "On-site Engineering Help", d: "Application support, lining design and troubleshooting at your plant" },
                { bg: "bg-green-50 border-green-100", c: "text-green-600", t: "Genuine Branded Stock", d: "Original manufacturer test certificates with every dispatch" },
                { bg: "bg-purple-50 border-purple-100", c: "text-purple-600", t: "Pan-India and Export", d: "Delivery across India plus full export paperwork for 50+ countries" },
              ].map(({ bg, c, t, d }) => (
                <div key={t} className={`flex items-start gap-3 p-3 rounded-xl border ${bg}`}>
                  <CheckCircle className={`${c} flex-shrink-0 mt-0.5`} size={15} />
                  <div>
                    <p className="font-semibold text-[#1E3A5F] text-xs sm:text-sm">{t}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        <div className="print:break-before-page border-t-4 border-dashed border-gray-200 print:border-0 mx-8" />

        {/* PAGE 2 */}
        <section className="p-6 sm:p-10 print:p-10 sm:!min-h-[297mm] print:!min-h-[297mm]" style={{ boxSizing: 'border-box' }}>
          <div className="flex items-center justify-between border-b-2 border-[#F97316] pb-3 mb-6">
            <div className="flex items-center gap-2"><img src={LOGO_URL} alt="SAPL" className="h-7" /><span className="font-oswald text-sm font-bold text-[#1E3A5F]">SHANKER AGENCIES PVT. LTD.</span></div>
            <span className="text-xs text-gray-400">Product Portfolio · Page 2</span>
          </div>

          <div className="mb-6">
            <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-3 mb-4">PRODUCT PORTFOLIO</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              {[
                { hc: "bg-[#F97316]", title: "Shaped Refractories", Icon: Flame, items: ["High Alumina Bricks (AL45 to AL90)", "Fireclay & Semi-High Alumina Bricks", "Insulating Fire Bricks (IFB 23–32)", "Magnesia, MgO-C & Basic Bricks", "Silicon Carbide Bricks", "Custom Precast Shapes"] },
                { hc: "bg-[#3B82F6]", title: "Unshaped / Monolithics", Icon: Factory, items: ["LCC & ULCC Castables (premium brands)", "Conventional Castables & Gunning Mixes", "Ramming Masses (Silica, Alumina, Magnesia)", "Self-Flow & Shotcrete Castables", "Mortars, Cements & Coatings", "Plastic Refractories"] },
              ].map(({ hc, title, Icon, items }) => (
                <div key={title} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <div className={`${hc} text-white px-4 py-2 flex items-center gap-2`}><Icon size={14} /><h4 className="font-oswald font-bold text-sm">{title}</h4></div>
                  <ul className="p-3 space-y-1.5">{items.map(i => <li key={i} className="flex items-center gap-2 text-xs text-gray-700"><span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0" />{i}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Flow Control Products", items: ["Slide Gate Plates & Mechanisms", "Ladle & Tundish Shrouds", "Subentry Nozzles (SEN)", "Monoblock Stoppers", "Porous Plugs for Argon Stirring"] },
                { title: "Insulation & Specialty", items: ["Ceramic Fiber Blankets, Boards & Modules", "Microporous Insulation Panels", "Calcium Silicate Boards", "Acid-Proof Bricks & Tiles (IS:4860)", "Chemical-Resistant Mortars"] },
              ].map(({ title, items }) => (
                <div key={title} className="glass-card border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2"><h4 className="font-oswald font-bold text-xs text-[#1E3A5F]">{title}</h4></div>
                  <ul className="p-3 space-y-1">{items.map(i => <li key={i} className="flex items-center gap-2 text-xs text-gray-600"><span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-3 mb-3">INDUSTRIES SERVED</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[["Steel", "Integrated, EAF"], ["Cement", "Rotary Kilns"], ["Aluminum", "Smelters"], ["Glass", "Melting Tanks"], ["Petrochemical", "Reformers"], ["Power", "Boilers, FBC"]].map(([n, d]) => (
                <div key={n} className="text-center p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-oswald font-bold text-[#1E3A5F] text-xs">{n}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 hidden sm:block">{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 bg-gradient-to-br from-[#F97316]/5 to-[#3B82F6]/5 border border-[#F97316]/20 rounded-xl p-5">
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
              India's premier refractory engineering partner since 1980, serving steel, cement, aluminium, glass, power and petrochemical industries across India and 50+ countries. <strong className="text-[#1E3A5F]">Authorised dealer of CUMI, Crown Ceramics and Divine Cerawool; supply partner for Calderys, TRL Krosaki, Mahakoshal and Saint-Gobain.</strong>
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-oswald text-lg font-bold text-[#1E3A5F] border-l-4 border-[#F97316] pl-3 mb-3">BRANDS WE WORK WITH</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "CUMI (Carborundum Universal)", tag: "Authorised Dealer" },
                { name: "Crown Ceramics", tag: "Authorised Dealer" },
                { name: "Divine Cerawool", tag: "Authorised Dealer" },
                { name: "Mahakoshal Refractories", tag: "Supply Partner" },
                { name: "TRL Krosaki (Tata Group)", tag: "Supply Partner" },
                { name: "Calderys India", tag: "Supply Partner" },
                { name: "Saint-Gobain", tag: "Supply Partner" },
              ].map(({ name, tag }) => (
                <span
                  key={name}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${tag === 'Authorised Dealer' ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#1E3A5F]' : 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#1E3A5F]'}`}
                >
                  {name}
                  <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${tag === 'Authorised Dealer' ? 'bg-[#F97316] text-white' : 'bg-[#3B82F6] text-white'}`}>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#0B1628] p-5 rounded-xl">
            <h3 className="font-oswald text-base font-bold mb-3 flex items-center gap-2 text-white">
              <Globe size={16} className="text-[#F97316]" /> GLOBAL PRESENCE · 50+ COUNTRIES
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "UK", "Germany", "France", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Thailand"].map(c => (
                <span
                  key={c}
                  className="px-2.5 py-1 bg-white text-[#1E3A5F] rounded text-[11px] font-semibold border border-white/20"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5">
            <img src={IMAGES.steel} alt="Steel" className="h-20 w-full object-cover rounded-xl" crossOrigin="anonymous" loading="lazy" />
            <img src={IMAGES.cement} alt="Cement" className="h-20 w-full object-cover rounded-xl" crossOrigin="anonymous" loading="lazy" />
            <img src={IMAGES.industrial} alt="Industrial" className="h-20 w-full object-cover rounded-xl" crossOrigin="anonymous" loading="lazy" />
          </div>
        </section>

        <div className="print:break-before-page border-t-4 border-dashed border-gray-200 print:border-0 mx-8" />

        {/* PAGE 3 */}
        <section className="p-6 sm:p-10 print:p-10 sm:!min-h-[297mm] print:!min-h-[297mm]" style={{ boxSizing: 'border-box' }}>
          <div className="flex items-center justify-between border-b-2 border-[#F97316] pb-3 mb-6">
            <div className="flex items-center gap-2"><img src={LOGO_URL} alt="SAPL" className="h-7" /><span className="font-oswald text-sm font-bold text-[#1E3A5F]">SHANKER AGENCIES PVT. LTD.</span></div>
            <span className="text-xs text-gray-400">Contact & Partnership · Page 3</span>
          </div>

          <div className="gradient-orange p-6 rounded-xl text-white text-center mb-6">
            <Target className="mx-auto mb-2" size={28} />
            <h2 className="font-oswald text-2xl font-bold mb-1">LET'S BUILD TOGETHER</h2>
            <p className="text-sm opacity-90">Trusted refractory supply and on-site engineering help since 1980.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div className="glass-card p-5 border-2 border-[#1E3A5F] rounded-xl">
              <h3 className="font-oswald text-base font-bold text-[#1E3A5F] mb-4 flex items-center gap-2"><Building2 size={16} className="text-[#F97316]" /> CORPORATE HEADQUARTERS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><MapPin className="text-[#F97316] flex-shrink-0 mt-0.5" size={15} /><div><p className="font-semibold text-[#1E3A5F] text-sm">Shanker Agencies Pvt. Ltd.</p><p className="text-xs text-gray-600">553, Main G.T Road, Shahdara</p><p className="text-xs text-gray-600">Delhi 110032, India</p></div></div>
                <div className="flex items-center gap-3"><Phone className="text-[#3B82F6]" size={15} /><div><p className="text-xs font-semibold text-[#1E3A5F]">+91 98999 57888</p><p className="text-xs font-semibold text-[#1E3A5F]">+91 98102 05154</p></div></div>
                <div className="flex items-center gap-3"><Mail className="text-green-600" size={15} /><p className="text-xs font-semibold text-[#1E3A5F]">info@shankeragencies.com</p></div>
                <div className="flex items-center gap-3"><Globe className="text-purple-600" size={15} /><p className="text-xs font-semibold text-[#1E3A5F]">www.shankeragencies.com</p></div>
              </div>
            </div>
            <div className="glass-card p-5 bg-gray-50 rounded-xl">
              <h3 className="font-oswald text-base font-bold text-[#1E3A5F] mb-4 flex items-center gap-2"><Award size={16} className="text-[#F97316]" /> WHY CHOOSE SAPL?</h3>
              <ul className="space-y-2">
                {["45+ years of refractory industry experience", "Complete product range under one roof", "Authorised dealer and supply partner for 7 leading brands", "Original manufacturer test certificates (MTC)", "On-site application engineering support", "Competitive pricing with quality assurance", "4-hour quote response for standard products", "Export to 50+ countries with full documentation"].map(item => (
                  <li key={item} className="flex items-start gap-2"><CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={13} /><span className="text-xs text-gray-700">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <a href="tel:+919899957888" className="flex items-center justify-center gap-2 p-4 gradient-primary text-white rounded-xl font-oswald font-bold text-sm"><Phone size={16} /> Call Now</a>
            <a href="mailto:info@shankeragencies.com" className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-xl font-oswald font-bold text-sm"><Mail size={16} /> Email Us</a>
            <a href="https://wa.me/919899957888" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-4 text-white rounded-xl font-oswald font-bold text-sm" style={{ backgroundColor: "#25D366" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>

          <footer className="border-t-4 border-[#F97316] pt-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3"><img src={LOGO_URL} alt="SAPL" className="h-10" /><div><p className="font-oswald text-[#1E3A5F] font-bold text-sm">SHANKER AGENCIES PVT. LTD.</p><p className="text-[10px] text-gray-400">Engineering Refractory Solutions Since 1980</p></div></div>
              <div className="text-right"><p className="text-[10px] text-gray-400">© {new Date().getFullYear()} Shanker Agencies Pvt. Ltd.</p><p className="text-[10px] text-gray-400">www.shankeragencies.com</p></div>
            </div>
          </footer>
        </section>

      </div>
    </div>
  );
}

export default CompanyProfile;