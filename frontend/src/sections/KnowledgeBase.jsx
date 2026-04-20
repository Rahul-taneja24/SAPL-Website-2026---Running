'use client';
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Layers, Thermometer, FlaskConical, Download, Phone, CheckCircle, ArrowRight, Flame, Zap, Info, MessageCircle } from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const firebrickGrades = [
  { grade: "AL40", name: "Fireclay Brick", al2o3: "38-42", tempNum: 1400, ap: "22-26%", ccs: "30-40 MPa", density: "2.0-2.2 g/cc", applications: "General purpose, backup linings, boilers, incinerators", cost: 1 },
  { grade: "AL50", name: "Semi-High Alumina", al2o3: "48-52", tempNum: 1550, ap: "20-24%", ccs: "40-50 MPa", density: "2.3-2.4 g/cc", applications: "Cement kilns upper zones, incinerators, reheating furnaces", cost: 2 },
  { grade: "AL60", name: "High Alumina 60", al2o3: "58-62", tempNum: 1650, ap: "18-22%", ccs: "50-60 MPa", density: "2.4-2.5 g/cc", applications: "Steel ladles, reheating furnaces, rotary kilns", cost: 3 },
  { grade: "AL70", name: "High Alumina 70", al2o3: "68-72", tempNum: 1700, ap: "16-20%", ccs: "55-65 MPa", density: "2.6-2.7 g/cc", applications: "Steel ladles (working lining), hot metal ladles, rotary kilns", cost: 4, popular: true },
  { grade: "AL70D", name: "High Alumina 70 Dense", al2o3: "68-72", tempNum: 1700, ap: "14-18%", ccs: "60-75 MPa", density: "2.7-2.8 g/cc", applications: "High wear areas, blast furnace, severe mechanical stress", cost: 4 },
  { grade: "AL80", name: "High Alumina 80", al2o3: "78-82", tempNum: 1750, ap: "14-18%", ccs: "60-70 MPa", density: "2.8-2.9 g/cc", applications: "Severe duty, EAF roofs, torpedo ladles, safety linings", cost: 5 },
  { grade: "AL90", name: "Super High Alumina", al2o3: "88-92", tempNum: 1850, ap: "12-16%", ccs: "70-80 MPa", density: "3.0-3.2 g/cc", applications: "Specialty applications, flow control, extreme temperature zones", cost: 6 },
];

const castableTypes = [
  { type: "Conventional Castable", cao: "15-25%", tempRange: "1400-1600°C", tempNum: 1500, strength: "Medium", water: "10-15%", applications: "Backup linings, general repair, boiler settings", note: null },
  { type: "Low Cement (LCC)", cao: "4-8%", tempRange: "1600-1750°C", tempNum: 1675, strength: "High", water: "5-7%", applications: "Steel ladles, tundish, reheating furnaces, torpedo cars", note: "Most widely used", popular: true },
  { type: "Ultra Low Cement (ULCC)", cao: "1-3%", tempRange: "1700-1800°C", tempNum: 1750, strength: "Very High", water: "4-5%", applications: "Critical ladle areas, blast furnace troughs, EAF delta sections", note: null },
  { type: "No Cement (NC)", cao: "<1%", tempRange: "1750-1850°C", tempNum: 1800, strength: "Excellent", water: "3-4%", applications: "Extreme duty, continuous casting, highest performance zones", note: "Premium cost" },
  { type: "Self-Flow Castable", cao: "Varies", tempRange: "1500-1700°C", tempNum: 1600, strength: "Medium-High", water: "6-8%", applications: "Complex geometries, no-access areas, rapid installation", note: null },
  { type: "Gunning Mix", cao: "Varies", tempRange: "1400-1650°C", tempNum: 1525, strength: "Medium", water: "8-12%", applications: "Hot repairs, maintenance without downtime, patching", note: null },
];

const insulationTypes = [
  { type: "Ceramic Fiber Blanket", temp: "1260-1425°C", tempNum: 1340, density: "64-160 kg/m³", k: "0.08-0.15 W/mK", applications: "Furnace backup lining, expansion joints, door seals", saving: "30-40%" },
  { type: "Ceramic Fiber Board", temp: "1260°C", tempNum: 1260, density: "200-350 kg/m³", k: "0.10-0.18 W/mK", applications: "Hot face linings, high-velocity gas areas, furnace walls", saving: "25-35%" },
  { type: "Ceramic Fiber Module", temp: "1260-1400°C", tempNum: 1330, density: "160-220 kg/m³", k: "0.10-0.15 W/mK", applications: "Full furnace linings, rapid installation, low heat storage", saving: "35-45%" },
  { type: "Insulating Firebrick (IFB)", temp: "1200-1600°C", tempNum: 1400, density: "400-1000 kg/m³", k: "0.15-0.35 W/mK", applications: "Permanent hot-face, abrasion-prone backup linings", saving: "20-30%" },
  { type: "Calcium Silicate Board", temp: "650-1000°C", tempNum: 825, density: "200-350 kg/m³", k: "0.05-0.10 W/mK", applications: "Pipe insulation, ladle covers, cold-face backup layers", saving: "20-25%" },
  { type: "Microporous Insulation", temp: "Up to 1000°C", tempNum: 1000, density: "200-300 kg/m³", k: "0.02-0.03 W/mK", applications: "Space-critical applications, ladle bottoms, maximum savings", saving: "50-60%" },
];

const applicationGuides = [
  { title: "Steel Ladle", zone: "Working Lining", products: ["AL70/AL80 High Alumina Bricks", "LCC-70/LCC-80 Castable", "MgO-C Bricks (slag zone)"], temp: "1650°C", tip: "Use AL70 for barrel, AL80 at slag lines. LCC-80 for bottom. MgO-C for high-wear slag impact zone.", link: "/solutions/steel" },
  { title: "Cement Rotary Kiln", zone: "Burning Zone", products: ["Magnesia Spinel Bricks", "Magnesia 95", "Chrome-free alternatives"], temp: "1450°C kiln gas", tip: "Chrome-free mag-spinel is now preferred for environmental compliance. Coating adherence critical — specify from CUMI or Calderys.", link: "/solutions/cement" },
  { title: "Induction Furnace", zone: "Crucible Lining", products: ["Silica Ramming Mass (iron/CI)", "Alumina Ramming Mass (steel)", "Magnesia Ramming Mass (basic)"], temp: "1650°C", tip: "Match ramming mass to metal chemistry. Silica for cast iron, alumina for steel, magnesia for high-Mn alloys. Sintering schedule is critical.", link: "/solutions/steel" },
  { title: "Aluminum Holding Furnace", zone: "Metal Contact", products: ["Non-Wetting Castables", "Phosphate-Bonded High Alumina", "Ceramic Fiber (backup)"], temp: "800-900°C", tip: "Low-Fe, non-wetting formulations prevent metal penetration. Use ceramic fiber backup for energy efficiency and fast cool-down.", link: "/solutions/aluminum" },
  { title: "Reheating Furnace", zone: "Roof & Walls", products: ["AL60/AL70 Bricks", "LC Castable", "Ceramic Fiber Modules (backup)"], temp: "1300-1350°C", tip: "Ceramic fiber backup behind brick reduces shell temperature and fuel consumption by 15-25%. Spec dense AL60 for high velocity zones.", link: "/solutions/steel" },
  { title: "Blast Furnace Trough", zone: "Runner & Trough", products: ["SiC-Al₂O₃ Castables", "Ramming Mass", "Gunning Materials"], temp: "1550°C+", tip: "High-density SiC-Al castable for trough lining. Al₂O₃-SiC-C for iron runners. Regular gunning maintenance extends primary lining life.", link: "/solutions/steel" },
];

const TABS = [
  { id: "firebricks", name: "Firebrick Grades", icon: Layers, desc: "AL40–AL90 comparison" },
  { id: "castables", name: "Castables", icon: FlaskConical, desc: "LCC, ULCC, gunning" },
  { id: "insulation", name: "Insulation", icon: Thermometer, desc: "CF, IFB, microporous" },
  { id: "applications", name: "Application Guides", icon: BookOpen, desc: "Equipment-specific" },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = "#F97316" }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1" aria-hidden="true">
      <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function TempBadge({ temp }) {
  const color = temp >= 1750 ? "#c2410c" : temp >= 1650 ? "#ea580c" : temp >= 1500 ? "#f97316" : "#fb923c";
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: color + "18", color }}>
      <Flame size={10} />
      {typeof temp === "number" ? `${temp}°C` : temp}
    </span>
  );
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState("firebricks");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);

  const knowledgeStructuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: "Refractory Technical Reference Guide — Shanker Agencies",
    description: "Comprehensive technical information about refractory grades (AL40–AL90), castable types (LCC, ULCC), ceramic fiber, and application guides for steel, cement, aluminum industries.",
    about: ["Firebricks", "High Alumina Bricks", "Castables", "Ceramic Fiber Insulation", "Steel Ladle Refractories", "Cement Kiln Refractories"],
    author: { "@type": "Organization", name: "Shanker Agencies Private Limited" },
  };

  const filteredBricks = firebrickGrades.filter(
    (g) => !searchTerm || g.grade.toLowerCase().includes(searchTerm.toLowerCase()) || g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.applications.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.96) 0%, rgba(30,58,138,0.90) 100%), url('https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1920&q=80')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
        data-testid="knowledge-hero"
        aria-labelledby="knowledge-heading"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <BookOpen size={14} aria-hidden="true" /> Technical Reference Guide
          </span>
          <h1 id="knowledge-heading" className="font-oswald text-5xl md:text-7xl font-bold text-white leading-none mb-4">
            REFRACTORY
            <br /><span className="text-shimmer">REFERENCE</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            Grade comparison tables, castable selection criteria, insulation specs and equipment-specific application guides. Everything a procurement engineer or plant manager needs in one place.
          </p>

          {/* Author byline — E-E-A-T signal */}
          <div className="mt-6 flex items-center gap-3 text-white/80 text-sm">
            <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center font-oswald font-bold text-white">
              RT
            </div>
            <div>
              <p className="font-semibold text-white">
                Curated by{' '}
                <a
                  href="/about#leadership"
                  className="underline decoration-[#F97316]/60 underline-offset-2 hover:decoration-[#F97316]"
                  rel="author"
                >
                  Rahul Taneja
                </a>
              </p>
              <p className="text-xs text-white/60">
                Director & Refractory Engineering Expert, Shanker Agencies Pvt. Ltd.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { value: "35+", label: "Products Covered" },
              { value: "7", label: "AL grades documented" },
              { value: "6", label: "Castable types" },
              { value: "6", label: "Application guides" },
            ].map((s) => (
              <div key={s.label} className="text-center px-5 py-3 rounded-xl bg-white/10 border border-white/15">
                <p className="font-oswald text-2xl font-bold text-[#F97316]">{s.value}</p>
                <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH ───────────────────────────────────────── */}
      <div className="py-4 px-4 bg-white border-b border-gray-200 sticky top-[108px] z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search grades, materials, applications..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
              data-testid="knowledge-search"
              aria-label="Search knowledge base"
            />
          </div>
          <div className="hidden sm:flex gap-2 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${activeTab === tab.id ? "bg-[#F97316] text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                data-testid={`category-${tab.id}`}
                aria-pressed={activeTab === tab.id}
              >
                <tab.icon size={12} aria-hidden="true" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CARDS (mobile) ────────────────────────────── */}
      <section className="py-6 px-4 bg-gray-50 sm:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl text-left transition-all ${activeTab === tab.id ? "bg-[#F97316] text-white shadow-md" : "bg-white border border-gray-200 text-gray-700"}`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? "text-white mb-2" : "text-[#F97316] mb-2"} />
              <p className="font-bold text-sm">{tab.name}</p>
              <p className={`text-xs mt-0.5 ${activeTab === tab.id ? "text-white/75" : "text-gray-400"}`}>{tab.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white" data-testid="knowledge-content">
        <div className="max-w-7xl mx-auto">

          {/* ── FIREBRICK GRADES ── */}
          {activeTab === "firebricks" && (
            <div>
              <div className="mb-8">
                <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">Firebrick Grade Comparison</h2>
                <p className="text-gray-500 text-sm max-w-2xl">AL grades indicate minimum alumina content. Higher alumina = higher temperature resistance, better mechanical strength, and higher cost. Select the grade that meets your operating conditions without over-specifying.</p>
              </div>

              {/* Tip card */}
              <div className="bg-blue-50 border-l-4 border-[#3B82F6] rounded-xl p-5 mb-8 flex gap-3">
                <Info size={18} className="text-[#3B82F6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#1E3A5F] text-sm mb-1">Selection Tip: AL70 vs AL80</p>
                  <p className="text-gray-600 text-sm">AL70 is the most widely used grade for steel ladle working linings — good balance of cost and performance. AL80 is specified for slag lines and safety linings where the higher CCS and refractoriness justify the additional cost. Don't over-specify — AL80 in a general barrel position adds cost without benefit.</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-6">
                <table className="w-full text-sm" aria-label="Firebrick grade specifications">
                  <thead>
                    <tr style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
                      {["Grade", "Name", "Al₂O₃ Content", "Max Temp", "CCS", "Density", "Applications"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left text-white text-xs font-bold uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBricks.map((g, idx) => (
                      <tr
                        key={g.grade}
                        className={`border-b border-gray-100 hover:bg-orange-50 transition-colors cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                        onClick={() => setSelectedGrade(selectedGrade?.grade === g.grade ? null : g)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#F97316] text-sm">{g.grade}</span>
                            {g.popular && <span className="px-1.5 py-0.5 bg-[#F97316] text-white text-[10px] font-bold rounded-full">Popular</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 font-medium text-[#1E3A5F] text-sm whitespace-nowrap">{g.name}</td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-sm text-gray-700">{g.al2o3}%</span>
                          <ProgressBar value={parseInt(g.al2o3)} max={95} />
                        </td>
                        <td className="px-4 py-3.5">
                          <TempBadge temp={g.tempNum} />
                        </td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-600">{g.ccs}</td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-500">{g.density}</td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs max-w-xs">{g.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expanded row detail */}
              {selectedGrade && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <p className="font-oswald text-xl font-bold text-[#1E3A5F] mb-1">{selectedGrade.grade} — {selectedGrade.name}</p>
                    <p className="text-gray-600 text-sm mb-4">{selectedGrade.applications}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        ["Al₂O₃", `${selectedGrade.al2o3}%`],
                        ["Max Temp", `${selectedGrade.tempNum}°C`],
                        ["Porosity", selectedGrade.ap],
                        ["Density", selectedGrade.density],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-white rounded-xl p-3 border border-orange-100">
                          <p className="text-xs text-gray-400 font-medium">{label}</p>
                          <p className="font-bold text-[#1E3A5F] text-sm mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/contact" className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                    Get Quote for {selectedGrade.grade} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              )}

              {filteredBricks.length === 0 && (
                <p className="text-center text-gray-400 py-10">No grades match "{searchTerm}"</p>
              )}
            </div>
          )}

          {/* ── CASTABLES ── */}
          {activeTab === "castables" && (
            <div>
              <div className="mb-8">
                <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">Castable Types Comparison</h2>
                <p className="text-gray-500 text-sm max-w-2xl">Castables are classified primarily by cement (CaO) content. Lower cement = higher temperature performance, better hot strength, but typically higher cost and more critical installation requirements.</p>
              </div>

              {/* Visual summary cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {castableTypes.map((c) => (
                  <article
                    key={c.type}
                    className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${c.popular ? "border-[#F97316]" : "border-gray-200"}`}
                  >
                    {c.popular && (
                      <span className="inline-block px-2.5 py-0.5 bg-[#F97316] text-white text-[10px] font-bold rounded-full mb-3">Most Used</span>
                    )}
                    <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-1">{c.type}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <TempBadge temp={c.tempNum} />
                      <span className="text-xs text-gray-400">CaO: <span className="font-mono text-gray-600">{c.cao}</span></span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{c.applications}</p>
                    <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
                      <span className="text-gray-400">Hot Strength: <span className="text-gray-700 font-semibold">{c.strength}</span></span>
                      <span className="text-gray-400">Water: <span className="font-mono text-gray-600">{c.water}</span></span>
                    </div>
                    {c.note && (
                      <p className="text-[#F97316] text-[10px] font-bold mt-2">{c.note}</p>
                    )}
                  </article>
                ))}
              </div>

              {/* Full table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm" aria-label="Castable type comparison">
                  <thead>
                    <tr style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
                      {["Type", "CaO Content", "Service Temp", "Hot Strength", "Water %", "Key Applications"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left text-white text-xs font-bold uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {castableTypes.map((c, idx) => (
                      <tr key={c.type} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3.5">
                          <span className={`font-semibold text-sm ${c.popular ? "text-[#F97316]" : "text-[#1E3A5F]"}`}>{c.type}</span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-700">{c.cao}</td>
                        <td className="px-4 py-3.5 font-mono text-sm text-orange-600">{c.tempRange}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-700">{c.strength}</td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-500">{c.water}</td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs">{c.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Installation tip */}
              <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-xl p-5 flex gap-3">
                <Zap size={18} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm mb-1">Critical Installation Reminder for LCC/ULCC</p>
                  <p className="text-amber-700 text-sm">Always follow the manufacturer's water addition limit exactly (±0.2%). Excess water is the single biggest cause of LCC failure. Use a controlled heat-up schedule: 20°C/hr to 110°C (hold 4hr), then 25°C/hr to 350°C (hold 2hr), then 50°C/hr to operating temp.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── INSULATION ── */}
          {activeTab === "insulation" && (
            <div>
              <div className="mb-8">
                <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">Insulation Materials Guide</h2>
                <p className="text-gray-500 text-sm max-w-2xl">Thermal insulation reduces heat loss, lowers shell temperatures, and cuts energy costs. Ceramic fiber options offer the lowest thermal mass for cyclic furnaces. IFB is preferred where mechanical strength is needed. Microporous achieves maximum savings in space-critical installations.</p>
              </div>

              {/* Energy savings highlight */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Ceramic Fiber Modules", saving: "35-45%", note: "vs brick lining", color: "#F97316" },
                  { label: "Microporous Insulation", saving: "50-60%", note: "space-critical", color: "#1E40AF" },
                  { label: "IFB Backup Lining", saving: "20-30%", note: "permanent install", color: "#16a34a" },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                    <p className="font-oswald text-4xl font-bold mb-1" style={{ color: s.color }}>{s.saving}</p>
                    <p className="font-semibold text-[#1E3A5F] text-sm">{s.label}</p>
                    <p className="text-gray-400 text-xs mt-1">Energy savings {s.note}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-6">
                <table className="w-full text-sm" aria-label="Insulation material specifications">
                  <thead>
                    <tr style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
                      {["Type", "Max Temp", "Density", "Thermal Conductivity", "Energy Saving", "Applications"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left text-white text-xs font-bold uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {insulationTypes.map((ins, idx) => (
                      <tr key={ins.type} className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3.5 font-semibold text-[#1E3A5F] text-sm">{ins.type}</td>
                        <td className="px-4 py-3.5"><TempBadge temp={ins.temp} /></td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-600">{ins.density}</td>
                        <td className="px-4 py-3.5 font-mono text-sm text-gray-600">{ins.k}</td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-green-600 text-sm">{ins.saving}</span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs">{ins.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-5 flex gap-3">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-green-800 text-sm mb-1">Ceramic Fiber vs IFB — When to Choose Which</p>
                  <p className="text-green-700 text-sm">Use ceramic fiber when the furnace cycles frequently (daily heat-up/cool-down) — its low thermal mass means fast heat-up and less wasted energy. Use IFB when the furnace runs continuously and you need abrasion resistance on the hot face. Combining both (CF backup + dense brick hot face) achieves the best overall performance.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── APPLICATION GUIDES ── */}
          {activeTab === "applications" && (
            <div>
              <div className="mb-8">
                <h2 className="font-oswald text-3xl font-bold text-[#1E3A5F] mb-2">Equipment Application Guides</h2>
                <p className="text-gray-500 text-sm max-w-2xl">Quick-reference guides for the most common refractory applications. Each guide covers recommended materials, operating temperatures, and engineering tips from our 45+ years of experience.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 stagger-children">
                {applicationGuides.map((app, idx) => (
                  <article key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#F97316]/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-oswald text-xl font-bold text-[#1E3A5F]">{app.title}</h3>
                        <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wide">{app.zone}</p>
                      </div>
                      <TempBadge temp={app.temp} />
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Recommended Products</p>
                      <ul className="space-y-1.5">
                        {app.products.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 mb-4 flex gap-2">
                      <Info size={14} className="text-[#3B82F6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-xs text-blue-800 leading-relaxed">{app.tip}</p>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href="/contact"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Get Expert Advice <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                      <Link
                        href={app.link}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 text-gray-600 hover:border-[#3B82F6] hover:text-[#3B82F6] rounded-xl text-xs font-semibold transition-colors"
                      >
                        Industry Page <ChevronRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── DOWNLOAD BANNER ─────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50 border-y border-gray-200" aria-labelledby="download-heading">
        <div className="max-w-4xl mx-auto text-center">
          <Download size={40} className="mx-auto mb-4 text-[#1E3A5F] opacity-50" aria-hidden="true" />
          <h2 id="download-heading" className="font-oswald text-2xl font-bold text-[#1E3A5F] mb-2">
            NEED A PRINTABLE VERSION?
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Get our complete product catalog with all grade tables, specifications, and application guides as a PDF for offline reference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919899957888?text=Hi, I would like to receive the complete SAPL Product Catalog PDF."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1E3A5F] px-8 py-4 rounded-full font-bold hover:bg-orange-50 transition-all shadow-xl"
            >
              <MessageCircle size={16} aria-hidden="true" /> Request Product Catalog (WhatsApp)
            </a>
            <a
              href="tel:+919899957888"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-gray-50 rounded-full font-bold text-sm transition-colors"
            >
              <Phone size={16} aria-hidden="true" /> Talk to a Technician
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
        data-testid="knowledge-cta"
        aria-labelledby="knowledge-cta-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="knowledge-cta-heading" className="font-oswald text-3xl font-bold text-white mb-3">
            CAN'T FIND WHAT YOU NEED?
          </h2>
          <p className="text-white/75 mb-8 text-sm max-w-xl mx-auto">
            Our engineers have 45+ years of hands-on refractory experience. If your application isn't covered here, we can provide a custom selection — free of charge.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-10 py-4 rounded-full font-bold transition-colors shadow-xl"
            data-testid="knowledge-cta-button"
          >
            Contact Technical Team <ChevronRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBase;
