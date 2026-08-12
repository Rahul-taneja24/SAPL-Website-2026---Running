'use client';
import { useApp } from '@/context/AppContext';
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight, Home, Search, ArrowRight, Thermometer, MessageCircle,
  Phone, Download, CheckCircle, X, Filter, Flame, Shield, Layers,
  Zap, Star, Package, Info, Award, Wrench, BookOpen, BarChart3,
  ChevronDown, HelpCircle
} from "lucide-react";
import { getProductFaqs } from '@/data/productFaqsData';
import { getProductDatasheet } from '@/data/productDatasheetData';
// IMG + PRODUCT_CATALOG now live in productCatalogData.js so server route
// handlers can import the catalog without crossing the 'use client'
// boundary (Next.js 15 RSC rule). Re-exported here for backwards-compat
// with imports that still point at @/sections/Products.
import { IMG, PRODUCT_CATALOG } from '@/data/productCatalogData';
export { PRODUCT_CATALOG };

/* ─── CATEGORY META ─────────────────────────────────────────────────────── */
const CAT_META = {
  "shaped-refractories": { icon: Layers, accent: "#F97316", pill: "bg-orange-50 text-orange-700 border-orange-200" },
  "unshaped-refractories": { icon: Package, accent: "#3B82F6", pill: "bg-blue-50 text-blue-700 border-blue-200" },
  "flow-control": { icon: Zap, accent: "#DC2626", pill: "bg-red-50 text-red-700 border-red-200" },
  "insulation": { icon: Shield, accent: "#10B981", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "acid-proofing": { icon: Flame, accent: "#7C3AED", pill: "bg-violet-50 text-violet-700 border-violet-200" },
};


/* ─── SPEC TABLE ──────────────────────────────────────────────────────── */
const LABEL = {
  al2o3: "Al₂O₃", fe2o3: "Fe₂O₃", mgo: "MgO", sio2: "SiO₂", cr2o3: "Cr₂O₃",
  sic: "SiC", carbon: "Carbon", zro2: "ZrO₂", cao: "CaO", ap: "Porosity",
  ccs: "CCS", ccs110: "CCS (110°C)", ccs1200: "CCS (1200°C)", pce: "PCE",
  temp: "Max Temp", tempC: "Max Temp", density: "Bulk Density",
  tc: "Thermal Cond.", tc_500: "TC @500°C",
  life: "Service Life", rebound: "Rebound", cement: "Cement",
  acidRes: "Acid Resist.", alkRes: "Alkali Resist.", absorption: "Absorption",
  application: "Application", permeability: "Permeability", form: "Form/Size",
  tensile: "Tensile Str.", usecase: "Typical Use", finish: "Finish",
  size: "Size", zro2_insert: "ZrO₂ Insert",
};

function SpecTable({ specs }) {
  if (!specs?.length) return null;
  const keys = Object.keys(specs[0]).filter(k => k !== "grade");
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr style={{ background: "linear-gradient(90deg,#1E3A5F,#3B82F6)" }} className="text-white">
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide whitespace-nowrap">Grade</th>
            {keys.map(k => (
              <th key={k} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide whitespace-nowrap">
                {LABEL[k] || k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((row, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
              <td className="px-4 py-3 font-bold text-[#F97316] font-mono text-[11px] whitespace-nowrap">{row.grade}</td>
              {keys.map(k => (
                <td key={k} className="px-4 py-3 text-gray-700 text-[12px]">{row[k] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── IMAGE GALLERY ──────────────────────────────────────────────────── */
function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  if (!images?.length) return null;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9] bg-gray-100">
        <img src={images[active]} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`View ${name} image ${i + 1}`}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${active === i ? "border-[#F97316]" : "border-gray-200 hover:border-gray-400"}`}>
              <img src={img} alt={`${name}, view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────────── */
function ProductCard({ product, categorySlug }) {
  const meta = CAT_META[categorySlug] || CAT_META["shaped-refractories"];
  return (
    <Link href={`/products/${categorySlug}/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

      {/* Image, taller, with gradient overlay */}
      <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={product.images?.[0]} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Popular badge */}
        {product.popular && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-[#F97316] text-white text-[10px] font-bold rounded-full shadow-lg">
            <Star size={9} fill="white" /> Popular
          </span>
        )}

        {/* Temp badge, bottom left */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
          style={{ background: `${meta.accent}cc`, backdropFilter: "blur(4px)" }}>
          <Thermometer size={10} /> {product.tempMax || "—"}
        </span>

        {/* Product name overlay at bottom */}
        <div className="absolute bottom-3 right-3 left-16">
          <h3 className="font-oswald text-sm font-bold text-white leading-tight line-clamp-1 text-right drop-shadow-lg">
            {product.name}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Full name above fold */}
        <h3 className="font-oswald text-[16px] font-bold text-[#1E3A5F] mb-1.5 group-hover:text-[#3B82F6] transition-colors leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4 line-clamp-2">{product.shortDesc}</p>

        {/* Grade pills */}
        {product.grades && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.grades.slice(0, 3).map(g => (
              <span key={g} className="px-2 py-0.5 text-[10px] font-semibold rounded-md border"
                style={{ background: `${meta.accent}12`, color: meta.accent, borderColor: `${meta.accent}30` }}>
                {g}
              </span>
            ))}
            {product.grades.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] rounded-md">
                +{product.grades.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold transition-all"
            style={{ color: meta.accent }}>
            View Specs <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </span>
          {product.brands && (
            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">
              {product.brands[0]?.replace(" Refractories", "").replace(" India", "")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── FAQ ACCORDION (per-product) ────────────────────────────────────── */
function ProductFAQ({ faqs, accent }) {
  const [open, setOpen] = useState(0);
  if (!faqs || faqs.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-7 rounded-full" style={{ background: accent }} />
        <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">FREQUENTLY ASKED QUESTIONS</h2>
      </div>
      <div className="space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F97316]"
                aria-expanded={isOpen}
              >
                <HelpCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: accent }} aria-hidden="true" />
                <span className="font-semibold text-[#1E3A5F] text-sm flex-1 pr-2">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 mt-0.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {/* Answer always in DOM so crawlers read all FAQ content; CSS hides it when collapsed */}
              <div
                className="px-5 pl-[52px] pt-1 overflow-hidden transition-all duration-200"
                style={isOpen ? { maxHeight: '500px', paddingBottom: '20px', opacity: 1 } : { maxHeight: '0', paddingBottom: '0', opacity: 0 }}
                aria-hidden={!isOpen}
              >
                <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── PRODUCT DETAIL PAGE ────────────────────────────────────────────── */
function ProductDetailPage({ product, category, categorySlug }) {
  const meta = CAT_META[categorySlug] || CAT_META["shaped-refractories"];
  const faqs = getProductFaqs(product.id);
  // Only products with a real PRODUCT_DATASHEETS entry have verified
  // test-standard sourcing. Gates the "Test conditions: IS.../ASTM.../EN..."
  // footnote below so it never appears next to unverified catalog specs.
  const hasVerifiedStandards = Boolean(getProductDatasheet(product.id));
  return (
    <div className="bg-white">
      

      {/* Hero */}
      <section className="relative py-16 px-4"
        style={{
          backgroundImage: `linear-gradient(135deg,rgba(10,20,60,0.97)0%,rgba(30,58,138,0.92)100%),url('${product.images?.[0]}')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home size={11} /> Home</Link>
            <ChevronRight size={9} />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight size={9} />
            <Link href={`/products/${categorySlug}`} className="hover:text-white">{category.name}</Link>
            <ChevronRight size={9} />
            <span className="text-[#F97316] font-semibold">{product.name}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.popular && (
              <span className="flex items-center gap-1 px-3 py-1 bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-bold rounded-full">
                <Star size={10} fill="currentColor" /> Popular Choice
              </span>
            )}
            <span className="px-3 py-1 bg-white/10 border border-white/15 text-white/75 text-xs rounded-full">
              {category.name}
            </span>
            {product.tempMax && (
              <span className="flex items-center gap-1 px-3 py-1 bg-white/10 border border-white/15 text-white/75 text-xs rounded-full">
                <Thermometer size={11} /> {product.tempMax}
              </span>
            )}
          </div>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            {(product.h1 || product.name).toUpperCase()}
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-2xl leading-relaxed">{product.shortDesc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">PRODUCT OVERVIEW</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-[15px]">{product.fullDesc}</p>
            </div>

            {/* Image Gallery */}
            <Gallery images={product.images} name={product.name} />

            {/* Key Properties */}
            {product.keyProperties?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">KEY PROPERTIES</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.keyProperties.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <BarChart3 size={16} className="flex-shrink-0 mt-0.5" style={{ color: meta.accent }} />
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">{p.label}</p>
                        <p className="text-sm font-semibold text-[#1E3A5F]">{p.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">APPLICATIONS</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.applications.map((app, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specs?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">TECHNICAL SPECIFICATIONS</h2>
                </div>
                <SpecTable specs={product.specs} />
                {hasVerifiedStandards ? (
                  <p className="mt-3 text-xs text-gray-400 italic">* Test conditions: IS 1528 (India) / ASTM C-133 / EN 1402. Values are typical, exact data sheets available on request.</p>
                ) : (
                  <p className="mt-3 text-xs text-gray-400 italic">* Typical catalog values. Not independently certified, request a technical datasheet to confirm figures for your application.</p>
                )}
              </div>
            )}

            {/* Grades */}
            {product.grades?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                  <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F]">AVAILABLE GRADES</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.grades.map((g, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-50 text-[#1E3A5F] text-sm font-semibold rounded-full border border-blue-100">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Installation Notes */}
            {product.installation?.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench size={20} className="text-amber-600 flex-shrink-0" />
                  <h2 className="font-oswald text-xl font-bold text-amber-800">INSTALLATION NOTES</h2>
                </div>
                <ol className="space-y-2">
                  {product.installation.map((note, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-amber-900 leading-relaxed">{note}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Why SAPL */}
            {product.whyChoose && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={20} className="text-[#1E3A5F] flex-shrink-0" />
                  <h2 className="font-oswald text-xl font-bold text-[#1E3A5F]">WHY BUY FROM SHANKER AGENCIES</h2>
                </div>
                <p className="text-sm text-blue-900 leading-relaxed">{product.whyChoose}</p>
              </div>
            )}

            {/* Partner Brands */}
            {product.brands?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 rounded-full" style={{ background: meta.accent }} />
                  <h2 className="font-oswald text-xl font-bold text-[#1E3A5F]">PARTNER BRANDS</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.brands.map((b, i) => (
                    <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#1E3A5F] shadow-sm">
                      <Award size={14} style={{ color: meta.accent }} /> {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs, buyer-intent Q&A for AI Overviews / Perplexity / Bing Copilot */}
            <ProductFAQ faqs={faqs} accent={meta.accent} />
          </div>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <div>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-24 space-y-6">
              <h3 className="font-oswald text-base font-bold text-[#1E3A5F]">QUICK INFORMATION</h3>

              <div className="space-y-4">
                {product.tempMax && (
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Max Temperature</p>
                    <p className="text-2xl font-bold flex items-center gap-2" style={{ color: meta.accent }}>
                      <Thermometer size={20} /> {product.tempMax}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Category</p>
                  <p className="font-semibold text-[#1E3A5F] text-sm">{category.name}</p>
                </div>
                {product.grades && (
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Grades Available</p>
                    <p className="font-semibold text-[#1E3A5F] text-sm">{product.grades.length} Standard Grades</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Industries Served</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.industries.map((ind, i) => (
                      <span key={i} className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border ${meta.pill}`}>{ind}</span>
                    ))}
                  </div>
                </div>
                {product.brands && (
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Brands We Supply</p>
                    <div className="space-y-1">
                      {product.brands.map((b, i) => (
                        <p key={i} className="text-xs font-semibold text-[#1E3A5F]">• {b}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Link href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-200">
                  <MessageCircle size={16} /> Request Quote
                </Link>
                <a href="tel:+919899957888"
                  className="w-full flex items-center justify-center gap-2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-colors">
                  <Phone size={16} /> +91 98999 57888
                </a>
                <a href="https://wa.me/919899957888?text=Hi, I need a quote for " target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-colors">
                  <MessageCircle size={16} /> WhatsApp Quote
                </a>
                <a href="https://wa.me/919899957888?text=Hi, I am interested in the technical datasheet for this product. Please share the PDF."
                  target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#3B82F6] text-[#3B82F6] px-4 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                  <MessageCircle size={16} /> Request Datasheet
                </a>
              </div>

              {/* Delivery note */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-xs text-green-800 font-semibold mb-1">📦 Quick Delivery</p>
                <p className="text-xs text-green-700">Standard grades in stock, Delhi warehouse. Pan-India delivery in 2–5 days. Same-day dispatch for urgent orders ≤ 2 MT.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-6">
            MORE IN <span style={{ color: meta.accent }}>{category.name.toUpperCase()}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.products.filter(p => p.id !== product.id).slice(0, categorySlug === 'flow-control' ? 6 : 4).map(rel => (
              <Link key={rel.id} href={`/products/${categorySlug}/${rel.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="h-28 overflow-hidden bg-gray-100">
                  <img src={rel.images?.[0]} alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-3">
                  <h4 className="font-oswald text-xs font-bold text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors leading-tight">{rel.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{rel.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4" style={{ background: "linear-gradient(135deg,#1E3A5F,#1E40AF)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-3xl font-bold text-white mb-3">READY TO ORDER OR NEED A SAMPLE?</h2>
          <p className="text-blue-200 text-sm mb-7 max-w-xl mx-auto">
            Our engineers can recommend the exact grade for your application. Sample kits available for trials. No minimum order on standard grades.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-4 rounded-full font-bold transition-colors">
              <MessageCircle size={17} /> Get a Quote
            </Link>
            <a href="tel:+919899957888" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white px-7 py-4 rounded-full font-bold transition-colors">
              <Phone size={17} /> Call +91 98999 57888
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CATEGORY PAGE ───────────────────────────────────────────────────── */
function CategoryPage({ category, categorySlug }) {
  const meta = CAT_META[categorySlug] || CAT_META["shaped-refractories"];
  const Icon = meta.icon;
  return (
    <div className="bg-white">
      

      {/* ── Category Hero, full bleed with real background image ── */}
      <section className="relative overflow-hidden"
        style={{ minHeight: "420px" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={category.image} alt={category.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(1.2)" }} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, rgba(10,20,60,0.92) 0%, ${meta.accent}22 100%)` }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,1))" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home size={11} /> Home</Link>
            <ChevronRight size={9} />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight size={9} />
            <span className="font-semibold" style={{ color: meta.accent }}>{category.name}</span>
          </nav>

          {/* Category icon badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 border"
            style={{ background: `${meta.accent}20`, borderColor: `${meta.accent}40` }}>
            <Icon size={15} style={{ color: meta.accent }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: meta.accent }}>
              {category.products.length} Products
            </span>
          </div>

          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-none">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-blue-200 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            {category.tagline}
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-semibold">
              <Thermometer size={14} style={{ color: meta.accent }} /> {category.tempRange}
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-semibold">
              <Package size={14} className="text-blue-300" /> {category.products.length} Product Types
            </span>
            {category.industries.slice(0, 3).map(ind => (
              <span key={ind} className="items-center hidden sm:flex gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-white/70 text-xs font-medium">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Description + Industry tags ── */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6 items-start">
          <p className="text-gray-600 leading-relaxed text-sm">{category.desc}</p>
          <a
                href="https://wa.me/919899957888?text=Hi, I would like to receive the Shanker Agencies Company Profile PDF."
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Company Profile (PDF)
              </a>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Industries Served</p>
            <div className="flex flex-wrap gap-2">
              {category.industries.map((ind, i) => (
                <span key={i} className={`px-3 py-1 text-xs font-semibold rounded-full border ${meta.pill}`}>{ind}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-8">
            ALL PRODUCTS, <span style={{ color: meta.accent }}>{category.name.toUpperCase()}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map(product => (
              <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-4" style={{ background: "linear-gradient(135deg,#1E3A5F,#1E40AF)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-2xl font-bold text-white mb-3">NEED A RECOMMENDATION?</h2>
          <p className="text-blue-200 text-sm mb-6">Our engineers specify the right grade for your operating conditions</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-bold transition-colors">
            <Phone size={17} /> Talk to an Engineer
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── OVERVIEW PAGE ───────────────────────────────────────────────────── */
const CATS_OVERVIEW = [
  { slug: "shaped-refractories", name: "Shaped Refractories", tagline: "Fired & bonded bricks for working linings", tempRange: "1200–1850°C", count: 5, image: IMG.shapedHero, accent: "#F97316", pill: "bg-orange-50 text-orange-700 border-orange-200", icon: Layers, keyProducts: ["High Alumina Bricks", "Fireclay Bricks", "IFB", "Basic Bricks", "SiC Bricks"], industries: ["Steel", "Cement", "Glass", "Power"] },
  { slug: "unshaped-refractories", name: "Unshaped Refractories", tagline: "Monolithic castables, masses & gunning mixes", tempRange: "1200–1850°C", count: 4, image: IMG.unshapedHero, accent: "#3B82F6", pill: "bg-blue-50 text-blue-700 border-blue-200", icon: Package, keyProducts: ["LCC Castables", "ULCC Castables", "Ramming Mass", "Gunning Mix"], industries: ["Steel", "Aluminum", "Foundry"] },
  { slug: "flow-control", name: "Flow Control", tagline: "Precision refractories for continuous casting", tempRange: "1500–1650°C", count: 4, image: IMG.flowHero, accent: "#DC2626", pill: "bg-red-50 text-red-700 border-red-200", icon: Zap, keyProducts: ["Slide Gate Plates", "Ladle Shrouds", "SEN Nozzles", "Porous Plugs"], industries: ["Steel"] },
  { slug: "insulation", name: "Insulation", tagline: "Lightweight thermal barriers for energy savings", tempRange: "600–1600°C", count: 2, image: IMG.insulHero, accent: "#10B981", pill: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: Shield, keyProducts: ["Ceramic Fiber Blanket", "Ceramic Fiber Module", "Calcium Silicate"], industries: ["All industries"] },
  { slug: "acid-proofing", name: "Acid Proofing", tagline: "Vitrified ceramics for chemical environments", tempRange: "Ambient–900°C", count: 2, image: IMG.acidHero, accent: "#7C3AED", pill: "bg-violet-50 text-violet-700 border-violet-200", icon: Flame, keyProducts: ["Acid Proof Bricks", "Acid Resistant Tiles"], industries: ["Chemical", "Pharma"] },
];

function OverviewPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const industries = ["all", "Steel", "Cement", "Aluminum", "Chemical", "Power"];
  const filtered = CATS_OVERVIEW.filter(c => {
    if (filter !== "all" && !c.industries.includes(filter)) return false;
    if (search) {
      const t = search.toLowerCase();
      return c.name.toLowerCase().includes(t) || c.tagline.toLowerCase().includes(t) ||
        c.keyProducts.some(p => p.toLowerCase().includes(t));
    }
    return true;
  });

  return (
    <div className="bg-white">
      

      {/* Hero */}
      <section className="relative overflow-hidden"
        style={{ minHeight: "70vh" }}>
        {/* Real background image */}
        <div className="absolute inset-0">
          <img src={IMG.shapedHero} alt="Refractory Products"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(1.4)" }} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(10,20,60,0.97) 0%, rgba(30,58,138,0.75) 55%, rgba(220,38,38,0.08) 100%)" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1)1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 w-full flex flex-col justify-center" style={{ minHeight: "70vh" }}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-6 uppercase tracking-widest">
              <Package size={11} /> 5 Categories · 17 Products · 80+ Grades
            </div>
            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4">
              REFRACTORY<br /><span className="text-[#F97316]">PRODUCT RANGE</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
              CUMI · Calderys · TRL Krosaki · Mahakoshal · Divine Cerawool, complete grade tables and application guides.
            </p>
            <div className="relative max-w-md">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" placeholder="Search products, grades, applications…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-4 bg-white text-gray-800 rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] shadow-2xl" />
              {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 sm:gap-10">
            {[{ v: "5", l: "Categories" }, { v: "17", l: "Product Types" }, { v: "80+", l: "Grades" }, { v: "1850°C", l: "Max Temp" }].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="font-oswald text-3xl sm:text-4xl font-bold text-[#F97316]">{v}</p>
                <p className="text-white/50 text-xs mt-0.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">
              <Filter size={11} /> Filter:
            </span>
            {industries.map(ind => (
              <button key={ind} onClick={() => setFilter(ind)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === ind ? "bg-[#1E3A5F] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {ind === "all" ? "All Industries" : ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No products found for "{search}"</p>
              <button onClick={() => { setSearch(""); setFilter("all"); }} className="text-[#3B82F6] text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-5 xl:gap-6">
              {filtered.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.slug} href={`/products/${cat.slug}`}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    {/* Full-width image top, portrait crop on mobile, wider on desktop */}
                    <div className="relative h-52 sm:h-44 overflow-hidden">
                      <img src={cat.image} alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ transform: "scale(1.02)" }}
                        loading={idx < 2 ? "eager" : "lazy"} />
                      {/* Gradient: dark on left for text legibility */}
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(135deg, rgba(10,20,60,0.88) 0%, rgba(10,20,60,0.4) 60%, transparent 100%)" }} />

                      {/* Category icon + name overlaid on image */}
                      <div className="absolute top-4 left-4 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                          style={{ background: cat.accent }}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-oswald text-xl font-bold text-white leading-tight">
                            {cat.name}
                          </h3>
                          <p className="text-white/60 text-[10px] font-medium leading-none mt-0.5">{cat.tagline}</p>
                        </div>
                      </div>

                      {/* Temp badge, top right */}
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                          style={{ background: `${cat.accent}cc`, backdropFilter: "blur(4px)" }}>
                          <Thermometer size={9} /> {cat.tempRange}
                        </span>
                      </div>

                      {/* Product count, bottom right */}
                      <div className="absolute bottom-3 right-4">
                        <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">
                          {cat.count} Products
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      {/* Key products pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cat.keyProducts.slice(0, 3).map(p => (
                          <span key={p} className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border ${cat.pill}`}>{p}</span>
                        ))}
                        {cat.keyProducts.length > 3 && (
                          <span className="px-2.5 py-1 text-[10px] text-gray-400 bg-gray-50 rounded-full border border-gray-200">
                            +{cat.keyProducts.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Industries + CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {cat.industries.slice(0, 2).map(ind => (
                            <span key={ind} className="text-[9px] text-gray-400 font-medium uppercase tracking-wide px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">
                              {ind}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all"
                          style={{ color: cat.accent }}>
                          Browse Products <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Brands strip */}
      <section className="py-10 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Our Supply Partners</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[{ n: "CUMI", c: "#1E3A5F" }, { n: "Calderys", c: "#1E40AF" }, { n: "TRL Krosaki", c: "#DC2626" }, { n: "Mahakoshal", c: "#10B981" }, { n: "Crown", c: "#7C3AED" }].map(b => (
              <div key={b.n} className="flex flex-col items-center justify-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <span className="font-oswald text-sm font-bold" style={{ color: b.c }}>{b.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-2">Industry Solutions</p>
            <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F]">FIND PRODUCTS BY INDUSTRY</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[{ name: "Steel Plants", slug: "steel", img: IMG.steel }, { name: "Cement Plants", slug: "cement", img: IMG.cement }, { name: "Aluminum", slug: "aluminum", img: IMG.aluminum }, { name: "Glass", slug: "glass", img: IMG.glass }, { name: "Petrochemical", slug: "petrochemical", img: IMG.petro }, { name: "Power", slug: "power", img: IMG.power }].map(ind => (
              <Link key={ind.slug} href={`/solutions/${ind.slug}`}
                className="group relative rounded-xl overflow-hidden h-24 sm:h-28 shadow-sm hover:shadow-lg transition-all">
                <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                <span className="absolute bottom-2.5 left-0 right-0 text-center text-[11px] font-bold text-white px-1 leading-tight">{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why SAPL */}
      <section className="py-12 px-4 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ icon: CheckCircle, title: "ISO 9001:2015 Certified", sub: "Quality management across all products and processes" }, { icon: Shield, title: "No Minimum Order", sub: "Trial quantities or bulk, we supply both" }, { icon: Zap, title: "Same-Day Response", sub: "Technical quotes within 4 business hours" }, { icon: Package, title: "Pan-India Delivery", sub: "Delhi warehouse, nationwide in 2–5 days" }].map(({ icon: I, title, sub }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <I size={18} className="text-[#F97316]" />
              </div>
              <div>
                <p className="font-oswald text-base font-bold text-white">{title}</p>
                <p className="text-blue-300 text-xs mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-oswald text-4xl font-bold text-[#1E3A5F] mb-4">CAN'T FIND WHAT YOU NEED?</h2>
          <p className="text-gray-600 mb-8">We carry 100+ documented grades across 30+ refractory products, not all listed here. Call us, our engineers will match the right refractory to your process in minutes.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-4 rounded-full font-bold transition-colors shadow-lg shadow-orange-200">
              <MessageCircle size={17} /> Talk to an Engineer
            </Link>
            <a href="https://wa.me/919899957888?text=Hi, I would like to receive the complete SAPL Product Catalog PDF."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white px-7 py-4 rounded-full font-bold transition-colors">
              <MessageCircle size={17} /> Get Product Catalog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── ROUTER ──────────────────────────────────────────────────────────── */
function Products() {
  const { region } = useApp();
  const { categorySlug, productId } = useParams();
  const category = categorySlug ? PRODUCT_CATALOG[categorySlug] : null;

  if (category && productId) {
    const product = category.products.find(p => p.id === productId);
    if (product) return <ProductDetailPage product={product} category={category} categorySlug={categorySlug} />;
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-4">Product Not Found</h1>
          <Link href={`/products/${categorySlug}`} className="text-[#3B82F6] hover:underline">Browse {category.name} →</Link>
        </div>
      </div>
    );
  }
  if (category) return <CategoryPage category={category} categorySlug={categorySlug} />;
  return <OverviewPage />;
}

export default Products;