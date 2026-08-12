'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, MessageCircle, ChevronRight, BookOpen, Package, Layers, Zap, Shield, FlaskConical, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const DATASHEET_CATEGORIES = [
  {
    id: 'shaped',
    icon: Layers,
    title: 'Shaped Refractories',
    color: 'orange',
    accent: '#F97316',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    items: [
      { name: 'High Alumina Bricks (HA-45 to HA-90)', desc: 'Al₂O₃ content, bulk density, CCS, PCE, apparent porosity by grade', waMsg: 'Hi, I need the High Alumina Bricks (HA-45 to HA-90) technical datasheet. Please share.' },
      { name: 'Fireclay Bricks', desc: 'STD-30, STD-40, HFK series specifications, IS 2042 conforming', waMsg: 'Hi, I need the Fireclay Bricks technical datasheet. Please share.' },
      { name: 'Insulating Fire Bricks (IFB)', desc: 'K-23, K-26, K-28, K-30 grades, density, thermal conductivity, service temp', waMsg: 'Hi, I need the Insulating Fire Bricks (IFB) datasheet. Please share.' },
      { name: 'Magnesia Spinel Bricks', desc: 'MgO content, spinel phase, thermal shock cycles, cement kiln grade', waMsg: 'Hi, I need the Magnesia Spinel Bricks datasheet for cement kiln. Please share.' },
      { name: 'MgO-C Bricks', desc: 'MgO % + carbon %, antioxidant grade, BOF/EAF/ladle grades', waMsg: 'Hi, I need the MgO-C Bricks datasheet (BOF/EAF/ladle grades). Please share.' },
      { name: 'Silicon Carbide Bricks', desc: 'SiC content, thermal conductivity, application-specific grades', waMsg: 'Hi, I need the Silicon Carbide Bricks datasheet. Please share.' },
    ],
  },
  {
    id: 'unshaped',
    icon: Package,
    title: 'Unshaped Refractories & Castables',
    color: 'blue',
    accent: '#3B82F6',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    items: [
      { name: 'Low Cement Castable (LCC)', desc: 'Water addition, CCS after drying/firing, AP%, BD, steel ladle grade', waMsg: 'Hi, I need the Low Cement Castable (LCC) datasheet for steel ladle application. Please share.' },
      { name: 'Ultra Low Cement Castable (ULCC)', desc: 'ULCC specification sheet, 70–80% Al₂O₃ grades, installation guide', waMsg: 'Hi, I need the ULCC (Ultra Low Cement Castable) datasheet. Please share.' },
      { name: 'Conventional Castable', desc: '40–70% Al₂O₃ grades, general service and backup lining spec', waMsg: 'Hi, I need the Conventional Castable datasheet. Please share.' },
      { name: 'Silica Ramming Mass', desc: 'SiO₂ purity, boric acid %, grain size distribution, sintering guide', waMsg: 'Hi, I need the Silica Ramming Mass datasheet and sintering guide. Please share.' },
      { name: 'Alumina Ramming Mass', desc: 'Al₂O₃ content, GSD, sintering schedule for alumina grade', waMsg: 'Hi, I need the Alumina Ramming Mass datasheet. Please share.' },
      { name: 'Gunning Mass', desc: 'Hot gunning grade, CCS after gunning, bond type, rebound data', waMsg: 'Hi, I need the Gunning Mass datasheet. Please share.' },
      { name: 'LCC Installation & Heat-Up Guide', desc: 'Step-by-step installation manual with heat-up curve (PDF)', waMsg: 'Hi, I need the LCC Installation and Heat-Up schedule guide. Please share.' },
    ],
  },
  {
    id: 'flow',
    icon: Zap,
    title: 'Flow Control Refractories',
    color: 'red',
    accent: '#DC2626',
    bg: 'bg-red-50',
    border: 'border-red-200',
    items: [
      { name: 'Slide Gate Plates, Al₂O₃-C Grade', desc: 'Plate dimensions, Al₂O₃ content, erosion resistance data, heats per set', waMsg: 'Hi, I need the Al₂O₃-C Slide Gate Plate datasheet. Please share.' },
      { name: 'Slide Gate Plates, Al₂O₃-ZrO₂-C Grade', desc: 'Premium plate spec, ZrO₂ content, anti-clogging properties', waMsg: 'Hi, I need the Al₂O₃-ZrO₂-C Slide Gate Plate datasheet. Please share.' },
      { name: 'Ladle Shrouds', desc: 'Bore diameter options, argon slot configuration, Al₂O₃-C specification', waMsg: 'Hi, I need the Ladle Shroud datasheet. Please share.' },
      { name: 'Subentry Nozzles (SEN)', desc: 'Bore profiles for slab/bloom/billet, anti-clogging features, ZrO₂ insert', waMsg: 'Hi, I need the Subentry Nozzle (SEN) datasheet. Please share.' },
    ],
  },
  {
    id: 'insulation',
    icon: Shield,
    title: 'Insulation Products',
    color: 'emerald',
    accent: '#10B981',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    items: [
      { name: 'Ceramic Fiber Blanket, 1260°C Grade', desc: 'Density options (64–128 kg/m³), thermal conductivity, shot content, dimensions', waMsg: 'Hi, I need the Ceramic Fiber Blanket 1260°C grade datasheet. Please share.' },
      { name: 'Ceramic Fiber Blanket, 1430°C Grade', desc: 'High-temperature grade, Al₂O₃/SiO₂/ZrO₂ composition, max use temp', waMsg: 'Hi, I need the Ceramic Fiber Blanket 1430°C grade datasheet. Please share.' },
      { name: 'Ceramic Fiber Module', desc: 'Module density, anchor system, installation drawing, blanket fold spec', waMsg: 'Hi, I need the Ceramic Fiber Module datasheet and installation drawing. Please share.' },
      { name: 'Ceramic Fiber Board', desc: 'Rigid board specification, density, flexural strength, thermal data', waMsg: 'Hi, I need the Ceramic Fiber Board datasheet. Please share.' },
      { name: 'Calcium Silicate Board', desc: 'Density, thermal conductivity, max service temp, compressive strength', waMsg: 'Hi, I need the Calcium Silicate Board datasheet. Please share.' },
      { name: 'Microporous Insulation Panel', desc: 'Ultra-low thermal conductivity data, service temperature, panel sizes', waMsg: 'Hi, I need the Microporous Insulation Panel datasheet. Please share.' },
    ],
  },
  {
    id: 'acid',
    icon: FlaskConical,
    title: 'Acid Proofing Products',
    color: 'violet',
    accent: '#7C3AED',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    items: [
      { name: 'Acid Proof Bricks', desc: 'Porosity (<3%), acid resistance (99%+), compressive strength, size options', waMsg: 'Hi, I need the Acid Proof Bricks datasheet. Please share.' },
      { name: 'Acid Resistant Floor Tiles', desc: 'Absorption, acid resistance, dimensions, anti-skid variants', waMsg: 'Hi, I need the Acid Resistant Floor Tiles datasheet. Please share.' },
      { name: 'Acid Proof Cement / Jointing Mortar', desc: 'Pot life, setting time, chemical resistance by acid type', waMsg: 'Hi, I need the Acid Proof Cement/Jointing Mortar datasheet. Please share.' },
    ],
  },
];

const WA_BASE = 'https://wa.me/919899957888?text=';
const COMPANY_PROFILE_MSG = 'Hi, I would like to receive the SAPL Company Profile PDF. Please share.';

function LeadModal({ item, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Submit lead to Web3Forms (same key as Contact page)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'd0154692-c512-4e1b-9b4c-31f715ca3bfd',
          subject: `Datasheet Request: ${item.name}`,
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          company: form.company,
          datasheet_requested: item.name,
          inquiry_type: 'Datasheet Download',
        }),
      });
    } catch (_) {
      // silently continue even if submission fails
    }

    setSubmitting(false);
    setDone(true);

    trackEvent('datasheet_request', {
      cta_type: 'downloads_page',
      product_family: item.category,
      product: item.name,
    });

    // Open WhatsApp with name pre-filled in message
    const msg = `Hi, I'm ${form.name} from ${form.company}. ${item.waMsg.replace('Hi, ', '')}`;
    window.open(`${WA_BASE}${encodeURIComponent(msg)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} className="text-green-600" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-[#1E3A5F] mb-2">WhatsApp Opening...</h3>
            <p className="text-gray-500 text-sm mb-4">
              Complete the chat on WhatsApp and our team will send the PDF within 2 hours.
            </p>
            <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 underline">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <p className="text-xs font-bold text-[#F97316] uppercase tracking-wide mb-1">Request Datasheet</p>
              <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] leading-tight">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98xxx xxxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. XYZ Steel Ltd."
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] disabled:opacity-60 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors mt-2"
              >
                <MessageCircle size={16} />
                {submitting ? 'Sending...' : 'Get Datasheet on WhatsApp'}
              </button>
              <p className="text-center text-xs text-gray-400">PDF sent within 2 business hours. No spam.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen">

      {activeItem && <LeadModal item={activeItem} onClose={() => setActiveItem(null)} />}

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1428] via-[#1E3A5F] to-[#1E40AF] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={10} />
            <span className="text-[#F97316]">Technical Downloads</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-bold rounded-full mb-5">
            <FileText size={12} /> DATASHEETS & TECHNICAL RESOURCES
          </div>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            TECHNICAL DATA SHEETS &<br />
            <span className="text-[#F97316]">INSTALLATION GUIDES</span>
          </h1>
          <p className="text-blue-200 text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Download technical specifications, grade comparison charts, installation guides,
            and heat-up schedules for all refractory products. Datasheets available via WhatsApp
            for verified industrial buyers.
          </p>
          <button
            onClick={() => setActiveItem({ name: 'SAPL Company Profile', desc: '12-page company profile covering history, product range, brands & export markets.', waMsg: 'I would like to receive the SAPL Company Profile PDF. Please share.', category: 'company-profile' })}
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white px-7 py-3.5 rounded-full font-bold transition-colors text-sm"
          >
            <Download size={16} />
            Request Company Profile PDF
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { step: '1', title: 'Find Your Product', desc: 'Browse the categories below and click the datasheet you need.' },
              { step: '2', title: 'Enter Your Details', desc: 'Quick 3-field form, name, phone, company. Takes 15 seconds.' },
              { step: '3', title: 'Receive PDF', desc: 'Our team sends the PDF datasheet on WhatsApp within 2 business hours.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white font-bold text-lg flex items-center justify-center mb-3">
                  {step}
                </div>
                <h3 className="font-oswald font-bold text-[#1E3A5F] text-base mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasheet Categories */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          {DATASHEET_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`px-6 py-4 ${cat.bg} ${cat.border} border-b flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: cat.accent }}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h2 className="font-oswald text-xl font-bold text-[#1E3A5F]">{cat.title}</h2>
                </div>

                <div className="divide-y divide-gray-50">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText size={16} className="flex-shrink-0 mt-0.5" style={{ color: cat.accent }} />
                        <div>
                          <p className="text-sm font-semibold text-[#1E3A5F]">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveItem({ ...item, category: cat.id })}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-colors cursor-pointer"
                        style={{ color: cat.accent, borderColor: cat.accent + '40', background: cat.accent + '10' }}
                      >
                        <Download size={12} />
                        Request PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* General Resources */}
      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-6">GENERAL RESOURCES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'SAPL Company Profile',
                desc: '12-page company profile covering history, product range, brands, certifications & export markets.',
                waMsg: 'I would like to receive the SAPL Company Profile PDF. Please share.',
              },
              {
                title: 'Refractory Selection Guide',
                desc: 'Quick reference chart matching application (steel ladle, cement kiln, induction furnace) to recommended refractory grade.',
                waMsg: 'I would like the Refractory Selection Guide PDF. Please share.',
              },
              {
                title: 'Heat-Up Schedule Templates',
                desc: 'Standard heat-up curves for LCC castable, ULCC, and ramming mass in PDF format.',
                waMsg: 'I would like the heat-up schedule templates for LCC and ramming mass. Please share.',
              },
              {
                title: 'Refractory Cost Calculator Guide',
                desc: 'Worksheet template for calculating cost-per-heat and total cost of ownership for lining systems.',
                waMsg: 'I would like the refractory cost-per-heat calculator worksheet. Please share.',
              },
              {
                title: 'Export Documentation Sample',
                desc: 'Sample export invoice, packing list, COO, and test report format for international buyers.',
                waMsg: 'I am an international buyer and would like to see sample export documentation. Please share.',
              },
              {
                title: 'Product Range Catalogue',
                desc: 'Complete 35+ product catalogue with all categories, brands, grades, and specifications.',
                waMsg: 'I would like to receive the SAPL complete product catalogue PDF. Please share.',
              },
            ].map((res, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="text-[#1E3A5F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#1E3A5F]">{res.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{res.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveItem({ ...res, name: res.title, category: 'export-resources' })}
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  <MessageCircle size={12} />
                  Request via WhatsApp →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white mb-3">
            NEED A CUSTOM SPECIFICATION?
          </h2>
          <p className="text-blue-200 text-sm mb-6 leading-relaxed">
            Our technical team can prepare a custom datasheet or material comparison report
            tailored to your specific application, equipment type, and operating conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919899957888?text=Hi, I need a custom refractory specification for my application. Please help."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white px-7 py-3.5 rounded-full font-bold transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Talk to a Refractory Engineer
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-full font-bold transition-colors text-sm"
            >
              <BookOpen size={16} />
              Read Technical Articles
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
