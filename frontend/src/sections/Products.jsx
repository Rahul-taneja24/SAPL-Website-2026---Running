'use client';
import { useApp } from '@/context/AppContext';
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight, Home, Search, ArrowRight, Thermometer, MessageCircle,
  Phone, Download, CheckCircle, X, Filter, Flame, Shield, Layers,
  Zap, Star, Package, Info, Award, Wrench, BookOpen, BarChart3
} from "lucide-react";

/* ─── CURATED IMAGE MAP ─────────────────────────────────────────────────── */
/* CUMI = official product images from cumi-murugappa.com (authorized dealer) */
const IMG = {
  /* ── category heroes — wide dramatic industrial shots ── */
  shapedHero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=90",
  unshapedHero: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&q=90",
  flowHero: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=1600&q=90",
  insulHero: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=1600&q=90",
  acidHero: "https://images.unsplash.com/photo-1565191999001-a2ae3190b9c0?w=1600&q=90",

  /* ── shaped refractory product images ── */
  highAlumina1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/High-Alumina-Refractories-2.jpg",
  highAlumina2: "https://images.unsplash.com/photo-1682891328125-c527a70dc69a?w=900&q=90",
  highAlumina3: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=900&q=90",
  fireclay1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumicrete-2.jpg",
  fireclay2: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=90",
  ifb1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/Insulation-Refractories-2.jpg",
  ifb2: "https://images.unsplash.com/photo-1609089792573-2ec8b9e263ec?w=900&q=90",
  basicBricks1: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=900&q=90",
  basicBricks2: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=900&q=90",
  sic1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/Zircon-and-Zirconia-Mullite-1.jpg",

  /* ── unshaped refractory product images ── */
  lcc1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumihicast-1.jpg",
  lcc2: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=90",
  ulcc1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumiflow-1.jpg",
  ramming1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumiplascast-1-1.jpg",
  gunning1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumigun.jpg",

  /* ── flow control product images ── */
  slideGate1: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=900&q=90",
  slideGate2: "https://images.unsplash.com/photo-1684259499227-e9844ab79747?w=900&q=90",
  shroud1: "https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=900&q=90",
  porous1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumira-1.jpg",

  /* ── insulation product images ── */
  ceramicFiber1: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=900&q=90",
  ceramicFiber2: "https://images.unsplash.com/photo-1609089792573-2ec8b9e263ec?w=900&q=90",
  calciumSil1: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/Insulation-Refractories-2.jpg",

  /* ── acid proofing product images ── */
  acidBrick1: "https://images.unsplash.com/photo-1565191999001-a2ae3190b9c0?w=900&q=90",
  acidBrick2: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumibond-1.jpg",
  acidTile1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90",
  acidTile2: "https://images.unsplash.com/photo-1565191999001-a2ae3190b9c0?w=900&q=90",

  /* ── industry reference images ── */
  steel: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=700&q=85",
  cement: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=700&q=85",
  aluminum: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=700&q=85",
  glass: "https://images.unsplash.com/photo-1625765362026-654dd71d07c5?w=700&q=85",
  petro: "https://images.unsplash.com/photo-1768128834332-7d3479c8d634?w=700&q=85",
  power: "https://images.unsplash.com/photo-1747345341772-7516f6b54958?w=700&q=85",
};

/* ─── CATEGORY META ─────────────────────────────────────────────────────── */
const CAT_META = {
  "shaped-refractories": { icon: Layers, accent: "#F97316", pill: "bg-orange-50 text-orange-700 border-orange-200" },
  "unshaped-refractories": { icon: Package, accent: "#3B82F6", pill: "bg-blue-50 text-blue-700 border-blue-200" },
  "flow-control": { icon: Zap, accent: "#DC2626", pill: "bg-red-50 text-red-700 border-red-200" },
  "insulation": { icon: Shield, accent: "#10B981", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "acid-proofing": { icon: Flame, accent: "#7C3AED", pill: "bg-violet-50 text-violet-700 border-violet-200" },
};

/* ─── PRODUCT DATA ──────────────────────────────────────────────────────── */
const DATA = {
  "shaped-refractories": {
    name: "Shaped Refractories",
    tagline: "Pre-formed bricks engineered for extreme thermal duty",
    desc: "Shaped refractories are pre-formed bricks manufactured by firing or chemical bonding, providing structural integrity and thermal resistance for working, safety, and backup linings in high-temperature industrial equipment.",
    image: IMG.shapedHero,
    tempRange: "1200–1850°C",
    industries: ["Steel", "Cement", "Glass", "Petrochemical", "Power"],
    products: [
      {
        id: "high-alumina-bricks",
        name: "High Alumina Bricks",
        shortDesc: "Superior thermal stability for steel ladles, cement kilns and glass furnaces up to 1850°C",
        fullDesc: "High alumina bricks are the workhorse of modern refractory engineering. Containing 45–99% Al₂O₃, they deliver exceptional refractoriness, corrosion resistance and load-bearing capacity at elevated temperatures. From steel ladles and cement rotary kilns to glass tank checkers and reheating furnaces, high alumina bricks are trusted wherever thermal performance cannot be compromised.",
        popular: true,
        tempMax: "1850°C",
        images: [IMG.highAlumina1, IMG.highAlumina2, IMG.highAlumina3],
        grades: ["HA-45", "HA-55", "HA-60", "HA-70", "HA-80", "HA-90"],
        applications: [
          "Steel ladles & torpedo cars",
          "Cement rotary kiln burning zone",
          "Glass tank regenerator chambers",
          "Blast furnace bosh & belly",
          "Reheating furnace roof & walls",
          "Petrochemical reformer furnaces",
          "EAF upper shell & roof",
          "Coke oven doors & jambs",
        ],
        brands: ["CUMI Super Refractories", "Calderys India", "TRL Krosaki", "IFGL Refractories"],
        keyProperties: [
          { label: "Al₂O₃ Range", value: "45 – 99%" },
          { label: "Refractoriness", value: "SK 33 – SK 40+" },
          { label: "Bulk Density", value: "2.2 – 3.1 g/cc" },
          { label: "Thermal Shock", value: "Good to Excellent" },
          { label: "Slag Resistance", value: "Moderate to High" },
          { label: "Bond Type", value: "Fired / Chemically bonded" },
        ],
        specs: [
          { grade: "HA-45", al2o3: "45-50%", fe2o3: "2.5%", ap: "22-26%", ccs: "40 MPa", pce: "SK 33", temp: "1550°C" },
          { grade: "HA-55", al2o3: "53-57%", fe2o3: "2.2%", ap: "21-25%", ccs: "45 MPa", pce: "SK 34", temp: "1610°C" },
          { grade: "HA-60", al2o3: "58-62%", fe2o3: "2.0%", ap: "20-24%", ccs: "50 MPa", pce: "SK 35", temp: "1650°C" },
          { grade: "HA-70", al2o3: "68-72%", fe2o3: "1.8%", ap: "18-22%", ccs: "55 MPa", pce: "SK 36", temp: "1750°C" },
          { grade: "HA-80", al2o3: "78-82%", fe2o3: "1.5%", ap: "16-20%", ccs: "60 MPa", pce: "SK 37", temp: "1800°C" },
          { grade: "HA-90", al2o3: "88-92%", fe2o3: "1.0%", ap: "14-18%", ccs: "70 MPa", pce: "SK 38", temp: "1850°C" },
        ],
        installation: [
          "Store in dry conditions — protect from moisture and contamination before use",
          "Use matching high alumina mortar (same Al₂O₃ % as brick) for jointing",
          "Maintain joint thickness 1.5–3 mm for optimal bond integrity",
          "Follow controlled dry-out schedule: 20°C/hr to 110°C, hold 12 hrs, then 30°C/hr to operating temp",
          "Apply expansion allowances: 6–8 mm per metre for silica-bonded grades, 8–10 mm for Al₂O₃ >70%",
        ],
        whyChoose: "With 45+ years of experience specifying refractories across India's steel and cement sectors, Shanker Agencies stocks all six HA grades ready-to-ship from Delhi. We supply CUMI, Calderys, TRL Krosaki and IFGL variants — matching the exact grade to your furnace design and budget.",
      },
      {
        id: "fireclay-bricks",
        name: "Fireclay Bricks",
        shortDesc: "Economical, thermally stable bricks for general-purpose furnace linings to 1400°C",
        fullDesc: "Fireclay bricks are manufactured from naturally occurring fire clays containing 25–45% Al₂O₃. They offer a reliable combination of thermal stability, thermal shock resistance and moderate slag resistance at an economical price point. Widely used for backup linings, boiler settings, and general industrial furnaces across India.",
        tempMax: "1400°C",
        images: [IMG.fireclay1, IMG.fireclay2],
        grades: ["STD-30", "STD-40", "HFK-28", "HFK-32", "HFK-36"],
        applications: [
          "Boiler back walls & settings",
          "General industrial furnace linings",
          "Kiln car superstructures",
          "Waste incinerator linings",
          "Backup linings behind working lining",
          "Soaking pit walls",
        ],
        brands: ["CUMI Super Refractories", "Calderys India", "TRL Krosaki"],
        keyProperties: [
          { label: "Al₂O₃ Range", value: "26 – 42%" },
          { label: "Max Service Temp", value: "Up to 1400°C" },
          { label: "Bulk Density", value: "1.8 – 2.1 g/cc" },
          { label: "Thermal Shock", value: "Good" },
          { label: "Cost", value: "Most economical" },
          { label: "Bond Type", value: "Fired ceramic bond" },
        ],
        specs: [
          { grade: "STD-30", al2o3: "28-30%", fe2o3: "2.5%", ap: "22-26%", ccs: "25 MPa", temp: "1300°C" },
          { grade: "STD-40", al2o3: "38-42%", fe2o3: "2.0%", ap: "20-24%", ccs: "35 MPa", temp: "1400°C" },
          { grade: "HFK-28", al2o3: "26-30%", fe2o3: "2.5%", ap: "24-28%", ccs: "20 MPa", temp: "1250°C" },
          { grade: "HFK-32", al2o3: "30-34%", fe2o3: "2.0%", ap: "22-26%", ccs: "28 MPa", temp: "1300°C" },
          { grade: "HFK-36", al2o3: "34-38%", fe2o3: "2.0%", ap: "20-24%", ccs: "32 MPa", temp: "1350°C" },
        ],
        installation: [
          "Use fireclay mortar of matching composition for jointing",
          "Keep joint width between 2–4 mm",
          "Dry-out at 25°C/hr up to 120°C, hold 8 hrs minimum before heating to operating temp",
          "Suitable for both straight and arch courses — wedge bricks available on request",
        ],
        whyChoose: "Shanker Agencies stocks fireclay bricks from CUMI and Calderys in standard IS sizes. Bulk discounts available. Same-day dispatch from Delhi warehouse for quantities up to 5 MT.",
      },
      {
        id: "insulating-fire-bricks",
        name: "Insulating Fire Bricks (IFB)",
        shortDesc: "Lightweight backup insulation reducing heat loss and energy bills",
        fullDesc: "Insulating fire bricks (IFBs) are manufactured from refractory aggregates with carefully controlled porosity. Their low bulk density and low thermal conductivity make them ideal for backup linings and furnace insulation where minimising heat storage and heat loss is critical to energy efficiency.",
        tempMax: "1600°C",
        images: [IMG.ifb1, IMG.ifb2],
        grades: ["IFB-23", "IFB-26", "IFB-28", "IFB-30", "IFB-32"],
        applications: [
          "Backup insulation behind dense working lining",
          "Heat treatment furnace linings",
          "Kiln car decks & superstructures",
          "Soaking pits backup lining",
          "Laboratory & test furnaces",
          "Energy-efficient furnace redesign projects",
        ],
        brands: ["CUMI Super Refractories", "Divine Cerawool"],
        keyProperties: [
          { label: "Bulk Density", value: "0.5 – 1.1 g/cc" },
          { label: "Thermal Conductivity", value: "0.15 – 0.35 W/mK" },
          { label: "Energy Saving", value: "30–50% vs dense brick" },
          { label: "Max Service Temp", value: "Up to 1650°C" },
          { label: "Weight Reduction", value: "50–75% vs standard brick" },
          { label: "Bond Type", value: "Fired / Organic-bonded" },
        ],
        specs: [
          { grade: "IFB-23", al2o3: "45%", density: "0.50 g/cc", tc: "0.15 W/mK", ccs: "1.0 MPa", temp: "1260°C" },
          { grade: "IFB-26", al2o3: "50%", density: "0.75 g/cc", tc: "0.20 W/mK", ccs: "2.0 MPa", temp: "1430°C" },
          { grade: "IFB-28", al2o3: "55%", density: "0.90 g/cc", tc: "0.25 W/mK", ccs: "3.0 MPa", temp: "1540°C" },
          { grade: "IFB-30", al2o3: "60%", density: "1.00 g/cc", tc: "0.30 W/mK", ccs: "4.0 MPa", temp: "1600°C" },
          { grade: "IFB-32", al2o3: "65%", density: "1.10 g/cc", tc: "0.35 W/mK", ccs: "5.0 MPa", temp: "1650°C" },
        ],
        installation: [
          "Handle with care — lower crushing strength than dense bricks",
          "Use lightweight insulating mortar or colloidal silica bonded mortar",
          "Never expose directly to liquid metal or slag — always use with working lining",
          "Dry-out schedule: ambient to 200°C at 10°C/hr, hold 4 hrs, then proceed slowly",
        ],
        whyChoose: "IFBs paired with a working lining can reduce furnace shell temperatures by 60–80°C and cut energy consumption by up to 30%. Shanker Agencies engineers can calculate the optimal lining thickness for your application.",
      },
      {
        id: "basic-bricks",
        name: "Basic Bricks",
        shortDesc: "Magnesia-based bricks resisting basic slags in BOF, EAF and cement kilns",
        fullDesc: "Basic bricks are manufactured from magnesia (MgO), dolomite or magnesia-chrome raw materials. They exhibit excellent resistance to basic slags and iron oxide, making them essential in steelmaking converters, electric arc furnaces, and cement kiln burning zones where acidic refractories would fail rapidly.",
        tempMax: "1800°C",
        images: [IMG.basicBricks1, IMG.basicBricks2],
        grades: ["Magnesia 90", "Magnesia 95", "Mag-Chrome", "Mag-Carbon", "Dolomite"],
        applications: [
          "BOF converter lining (barrel & cone)",
          "EAF upper & lower shell",
          "Cement kiln burning & transition zones",
          "Non-ferrous smelting furnaces",
          "Glass tank regenerator chequerwork",
          "Copper/nickel converter vessels",
        ],
        brands: ["CUMI Super Refractories", "Calderys India", "TRL Krosaki"],
        keyProperties: [
          { label: "MgO Range", value: "35 – 96%" },
          { label: "Slag Resistance", value: "Excellent (basic slags)" },
          { label: "Iron Oxide Resistance", value: "High" },
          { label: "Max Service Temp", value: "Up to 1800°C" },
          { label: "Thermal Conductivity", value: "High (for rapid heat transfer)" },
          { label: "Environmental Note", value: "Chrome-free grades available" },
        ],
        specs: [
          { grade: "Magnesia 90", mgo: "88-92%", sio2: "3%", density: "2.9 g/cc", ccs: "60 MPa", temp: "1700°C" },
          { grade: "Magnesia 95", mgo: "93-96%", sio2: "2%", density: "3.0 g/cc", ccs: "70 MPa", temp: "1750°C" },
          { grade: "Mag-Chrome", mgo: "55-65%", cr2o3: "15-20%", density: "3.2 g/cc", ccs: "50 MPa", temp: "1800°C" },
          { grade: "Mag-Carbon", mgo: "75-85%", carbon: "10-18%", density: "2.9 g/cc", ccs: "35 MPa", temp: "1700°C" },
          { grade: "Dolomite", mgo: "35-40%", cao: "55-60%", density: "2.8 g/cc", ccs: "45 MPa", temp: "1650°C" },
        ],
        installation: [
          "Use magnesite mortar or dry-gunning compound for basic brick joints",
          "Keep joint thickness to absolute minimum: 1–2 mm for highest density",
          "Mag-carbon bricks: handle in dry conditions only — avoid moisture contact",
          "Follow steel-plant dry-out curves: 15°C/hr to 200°C, hold 24 hrs",
          "Expansion allowances: 8–12 mm per metre of lining length",
        ],
        whyChoose: "For BOF and EAF applications we stock TRL Krosaki and CUMI mag-carbon grades with carbon contents from 10–18%. Chrome-free grades (Mag-Spinel) available for environmental compliance.",
      },
      {
        id: "silicon-carbide-bricks",
        name: "Silicon Carbide Bricks",
        shortDesc: "Outstanding abrasion and wear resistance with high thermal conductivity",
        fullDesc: "Silicon carbide (SiC) bricks offer a unique combination of very high thermal conductivity, excellent abrasion resistance, and strong chemical stability. Used wherever standard oxide refractories fail due to wear, erosion, or thermal cycling in aggressive environments.",
        tempMax: "1650°C",
        images: [IMG.sic1],
        grades: ["SiC-70", "SiC-80", "SiC-90", "Nitride-bonded SiC", "Oxide-bonded SiC"],
        applications: [
          "Kiln furniture (setters, bat plates, props)",
          "Waste incinerator grate bars & walls",
          "Aluminum smelting furnace lining",
          "Zinc distillation retorts",
          "Chemical process furnaces",
          "Blast furnace tuyere zone",
        ],
        brands: ["CUMI Super Refractories"],
        keyProperties: [
          { label: "SiC Content", value: "68 – 92%" },
          { label: "Thermal Conductivity", value: "10 – 15 W/mK" },
          { label: "Abrasion Resistance", value: "Excellent" },
          { label: "Oxidation Resistance", value: "Moderate (nitride bond: good)" },
          { label: "Acid Resistance", value: "Good" },
          { label: "Bond Types", value: "Oxide / Nitride / Self-bonded" },
        ],
        specs: [
          { grade: "SiC-70", sic: "68-72%", density: "2.5 g/cc", tc: "10 W/mK", ccs: "80 MPa", temp: "1500°C" },
          { grade: "SiC-80", sic: "78-82%", density: "2.6 g/cc", tc: "12 W/mK", ccs: "90 MPa", temp: "1550°C" },
          { grade: "SiC-90", sic: "88-92%", density: "2.7 g/cc", tc: "15 W/mK", ccs: "100 MPa", temp: "1600°C" },
          { grade: "NSiC", sic: "72-78%", density: "2.5 g/cc", tc: "14 W/mK", ccs: "120 MPa", temp: "1650°C" },
        ],
        installation: [
          "Silicon carbide has a high thermal expansion coefficient — allow 10 mm/m expansion",
          "Use SiC mortar or colloidal silica bonded cement for jointing",
          "Nitride-bonded grades: do not expose to reducing atmospheres above 1400°C",
          "Oxide-bonded grades: suitable for oxidising atmospheres up to 1500°C",
        ],
        whyChoose: "We supply CUMI SiC bricks in all bond types — specify your atmosphere (oxidising/reducing) and temperature for the correct grade recommendation.",
      },
    ],
  },

  "unshaped-refractories": {
    name: "Unshaped Refractories",
    tagline: "Monolithic solutions — faster installation, fewer joints, complex shapes",
    desc: "Unshaped or monolithic refractories are supplied in powder or granular form and formed in-situ during installation. They eliminate brick joints, reduce installation time, and allow lining of complex geometries impossible with shaped bricks.",
    image: IMG.unshapedHero,
    tempRange: "1200–1850°C",
    industries: ["Steel", "Cement", "Aluminum", "Petrochemical", "Foundry"],
    products: [
      {
        id: "low-cement-castables",
        name: "Low Cement Castables (LCC)",
        shortDesc: "High-strength castables with 3–5% cement — the industry standard for steel ladles",
        fullDesc: "Low cement castables (LCC) contain only 3–5% hydraulic cement binder, far less than conventional castables. This translates to dramatically higher hot strength, superior slag resistance, reduced porosity, and better thermal shock resistance. LCC is the dominant monolithic refractory in India's steel ladles, tundishes, and torpedo cars.",
        popular: true,
        tempMax: "1750°C",
        images: [IMG.lcc1, IMG.lcc2],
        grades: ["LCC-60", "LCC-70", "LCC-80", "LCC-85"],
        applications: [
          "Steel ladle barrel, cone, and bottom",
          "Tundish working lining",
          "Torpedo car barrel lining",
          "Reheating furnace hearth & skid pipes",
          "Hot metal mixer lining",
          "Blast furnace cast house runners",
        ],
        brands: ["Calderys India", "TRL Krosaki", "CUMI Super Refractories", "Mahakoshal"],
        keyProperties: [
          { label: "Cement Content", value: "3 – 5% (CA-80 grade)" },
          { label: "Max Grain Size", value: "6 – 10 mm (standard)" },
          { label: "Water Addition", value: "4.5 – 5.5% by weight" },
          { label: "Installation Method", value: "Vibro-cast, pump, trowel" },
          { label: "De-moulding Time", value: "16 – 24 hrs at ambient" },
          { label: "Dry-out Requirement", value: "Mandatory — see schedule" },
        ],
        specs: [
          { grade: "LCC-60", al2o3: "58-62%", cement: "4-5%", density: "2.60 g/cc", ccs110: "40 MPa", ccs1200: "80 MPa", temp: "1650°C" },
          { grade: "LCC-70", al2o3: "68-72%", cement: "3-4%", density: "2.70 g/cc", ccs110: "50 MPa", ccs1200: "100 MPa", temp: "1700°C" },
          { grade: "LCC-80", al2o3: "78-82%", cement: "3-4%", density: "2.90 g/cc", ccs110: "60 MPa", ccs1200: "120 MPa", temp: "1750°C" },
          { grade: "LCC-85", al2o3: "83-87%", cement: "2-3%", density: "3.00 g/cc", ccs110: "70 MPa", ccs1200: "140 MPa", temp: "1800°C" },
        ],
        installation: [
          "Pre-wet forms and ensure they are leak-proof before casting",
          "Mix with measured water (4.5–5.5%) in a pan mixer for 5–8 minutes to achieve flow",
          "Cast in layers no thicker than 300 mm and vibrate thoroughly to eliminate voids",
          "Cover with polythene sheet after casting to retain moisture during curing (24 hrs minimum)",
          "Critical dry-out: 25°C→110°C at 20°C/hr, hold 12 hrs; 110°C→300°C at 15°C/hr, hold 8 hrs; then 30°C/hr to operating temperature",
          "Never accelerate dry-out with open flame — steam explosion risk",
        ],
        whyChoose: "Shanker Agencies is the strategic supply partner for Calderys and TRL Krosaki LCC products in Delhi NCR. We provide on-site technical support, dry-out monitoring, and mixing/pumping equipment rental.",
      },
      {
        id: "ultra-low-cement-castables",
        name: "Ultra Low Cement Castables (ULCC)",
        shortDesc: "Premium monolithics with <1.5% cement for the most demanding high-wear zones",
        fullDesc: "Ultra low cement castables contain only 0.5–2% hydraulic cement, relying instead on reactive alumina and microsilica for densification. This produces the highest hot strength, lowest porosity, and best slag penetration resistance of any castable grade. Specified for the most critical lining zones in blast furnace troughs, EAF deltas, and continuous casting ladles.",
        tempMax: "1850°C",
        images: [IMG.ulcc1],
        grades: ["ULCC-70", "ULCC-80", "ULCC-85", "ULCC-90"],
        applications: [
          "Blast furnace main troughs & tilting runners",
          "EAF delta section & taphole area",
          "Ladle impact pad",
          "High-wear zones — torpedo car mouth",
          "Direct-reduced iron (DRI) vessels",
          "Aluminium holding furnace high-wear zones",
        ],
        brands: ["Calderys India", "TRL Krosaki"],
        keyProperties: [
          { label: "Cement Content", value: "0.5 – 2% (ultra-low)" },
          { label: "Microsilica Content", value: "3 – 6% for densification" },
          { label: "Open Porosity", value: "< 12% after 1200°C firing" },
          { label: "Hot MOR (1000°C)", value: "10 – 25 MPa" },
          { label: "Installation", value: "Vibro-cast or self-flow" },
          { label: "Slag Penetration", value: "Exceptional resistance" },
        ],
        specs: [
          { grade: "ULCC-70", al2o3: "68-72%", cement: "1.5-2%", density: "2.80 g/cc", ccs: "120 MPa", temp: "1750°C" },
          { grade: "ULCC-80", al2o3: "78-82%", cement: "1-1.5%", density: "3.00 g/cc", ccs: "150 MPa", temp: "1800°C" },
          { grade: "ULCC-85", al2o3: "83-87%", cement: "1-1.5%", density: "3.10 g/cc", ccs: "160 MPa", temp: "1820°C" },
          { grade: "ULCC-90", al2o3: "88-92%", cement: "0.5-1%", density: "3.20 g/cc", ccs: "180 MPa", temp: "1850°C" },
        ],
        installation: [
          "Strictly follow manufacturer water addition (typically 3.5–4.5%) — excess water destroys properties",
          "Use forced-action or planetary mixer — drum mixer not suitable for ULCC",
          "Vibration is critical: 30–45 seconds per layer using 25–40 mm needle vibrator",
          "Extended curing: minimum 48 hrs covered before dry-out begins",
          "Dry-out is slower than LCC: 10°C/hr to 110°C, hold 24 hrs; then 15°C/hr stages to operating temp",
        ],
        whyChoose: "ULCC is not a commodity product — grade selection, water content, and dry-out protocol must be matched to each application. Shanker Agencies provides full application engineering support with every ULCC order.",
      },
      {
        id: "ramming-masses",
        name: "Ramming Masses",
        shortDesc: "Dense dry/moist masses for jointless induction furnace linings",
        fullDesc: "Ramming masses are monolithic refractories applied by manual or mechanical ramming to form dense, jointless linings. They are the preferred lining for induction melting furnaces, where excellent chemical resistance to the melt is essential and periodic re-lining is required.",
        tempMax: "1700°C",
        images: [IMG.ramming1],
        grades: ["Silica Ramming", "Alumina Ramming", "Magnesia Ramming", "Acidic Ramming"],
        applications: [
          "Induction furnace crucible (iron, steel, brass)",
          "Coreless induction furnace lining",
          "Channel induction furnace",
          "Ladle & trough repairs",
          "EAF hearth bottom lining",
        ],
        brands: ["Calderys India", "Mahakoshal"],
        keyProperties: [
          { label: "Application Method", value: "Hand or mechanical ramming" },
          { label: "Sintering Required", value: "Yes — gradual heat-up of new lining" },
          { label: "Lining Life", value: "100–500 heats (grade-dependent)" },
          { label: "Re-lining Speed", value: "4–8 hrs for induction furnace" },
          { label: "Water Content", value: "Dry to semi-dry (0–3%)" },
          { label: "Key Advantage", value: "No joints — zero melt infiltration" },
        ],
        specs: [
          { grade: "Silica", sio2: "95-98%", density: "1.90 g/cc", application: "Cast iron induction furnace", temp: "1650°C" },
          { grade: "Alumina", al2o3: "85-92%", density: "2.70 g/cc", application: "Steel induction furnace", temp: "1700°C" },
          { grade: "Magnesia", mgo: "85-95%", density: "2.90 g/cc", application: "Basic/alloy steel furnaces", temp: "1750°C" },
          { grade: "Acidic", sio2: "88-92%", density: "1.85 g/cc", application: "Non-ferrous / cast iron", temp: "1600°C" },
        ],
        installation: [
          "Clean furnace shell and apply one coat of release agent before ramming",
          "Ram in 50–75 mm layers using the correct pattern (spiral from bottom up)",
          "Each layer must be uniformly compacted — check with density gauge if available",
          "For induction furnaces: sinter with a gradual heat-up using scrap metal charge",
          "First heat: fill with metal charge, heat slowly to operating temperature, do not tap",
          "Typical sintering cycle: 4–8 hrs at full power to form a glassy bonded shell",
        ],
        whyChoose: "Shanker Agencies supplies Calderys ramming masses for all furnace types. We provide installation guidance and sintering programmes specific to your furnace capacity and charge material.",
      },
      {
        id: "gunning-materials",
        name: "Gunning Materials",
        shortDesc: "Pneumatically applied repair mixes — minimise downtime with in-situ hot repairs",
        fullDesc: "Gunning materials are specially formulated to be applied by pneumatic gunning equipment, typically while the vessel is still hot. They are the fastest way to extend vessel campaign life by repairing eroded zones without a full re-lining shutdown, saving significant production time and cost.",
        tempMax: "1700°C",
        images: [IMG.gunning1],
        grades: ["LC Gun Mix", "HA Gun Mix", "Mag Gun Mix", "Silica Gun Mix"],
        applications: [
          "Ladle hot-face repair between campaigns",
          "Blast furnace stack & bosh repair",
          "EAF hot-spot and sidewall repair",
          "Kiln shell hot-spot patching",
          "Tundish maintenance gunning",
          "Runner & trough repair",
        ],
        brands: ["Calderys India", "TRL Krosaki"],
        keyProperties: [
          { label: "Application Method", value: "Wet/semi-wet pneumatic gun" },
          { label: "Application Temp", value: "Up to 1400°C substrate (hot repair)" },
          { label: "Rebound Loss", value: "15 – 25%" },
          { label: "Bond", value: "Hydraulic + thermal" },
          { label: "Repair Speed", value: "500–2000 kg/hr output" },
          { label: "Key Benefit", value: "No furnace shutdown required" },
        ],
        specs: [
          { grade: "LC Gun Mix", al2o3: "70-75%", rebound: "15-20%", density: "2.50 g/cc", temp: "1700°C" },
          { grade: "HA Gun Mix", al2o3: "80-85%", rebound: "18-22%", density: "2.70 g/cc", temp: "1750°C" },
          { grade: "Mag Gun Mix", mgo: "80-85%", rebound: "20-25%", density: "2.80 g/cc", temp: "1750°C" },
        ],
        installation: [
          "Ensure gunning machine is calibrated for correct air pressure (3–5 bar) and water addition",
          "Clean eroded surface — remove loose material and wash with air jet before gunning",
          "Apply in thin layers (25–50 mm per pass) to prevent slumping on vertical surfaces",
          "Allow each layer to set before applying the next",
          "Water ring position is critical — adjust to achieve optimal wet/dry gunning consistency",
          "Preheat repair area to 200–400°C before gunning on cold substrate",
        ],
        whyChoose: "We supply gunning equipment rental alongside material for complete turnkey repair contracts. Our technicians have supervised ladle and BF trough repair campaigns across 50+ steel plants in India.",
      },
    ],
  },

  "flow-control": {
    name: "Flow Control",
    tagline: "Precision refractories that control molten steel — directly impacting steel quality",
    desc: "Flow control refractories regulate the flow of molten steel during continuous casting. They must survive extreme thermal shock, erosion from high-velocity steel, and chemical attack from steel and slag — all while maintaining dimensional tolerances critical to casting quality.",
    image: IMG.flowHero,
    tempRange: "1500–1650°C",
    industries: ["Steel"],
    products: [
      {
        id: "slide-gate-plates",
        name: "Slide Gate Plates",
        shortDesc: "Sliding mechanism plates controlling molten steel flow from ladle to tundish",
        fullDesc: "Slide gate plates are the critical refractory components in the ladle and tundish slide gate systems that control, start, and stop the flow of molten steel. They slide against each other under hydraulic pressure, requiring extreme dimensional accuracy, high thermal shock resistance, and resistance to both steel erosion and slag attack. Service life is measured in heats — a premium grade lasting 20+ heats vs 8–10 for standard.",
        popular: true,
        tempMax: "1650°C",
        images: [IMG.slideGate1, IMG.slideGate2],
        grades: ["Al₂O₃-C Standard", "Al₂O₃-C Premium", "Al₂O₃-ZrO₂-C", "ZrO₂-C"],
        applications: [
          "Ladle slide gate bottom plate",
          "Ladle slide gate upper & collector nozzle",
          "Tundish slide gate system",
          "Billet/bloom/slab caster ladle",
          "Single-strand and multi-strand casters",
        ],
        brands: ["IFGL Refractories", "TRL Krosaki"],
        keyProperties: [
          { label: "Al₂O₃ Range", value: "85 – 93%" },
          { label: "Carbon Content", value: "6 – 12%" },
          { label: "Zirconia (premium)", value: "Up to 20% ZrO₂" },
          { label: "Service Life", value: "8 – 25+ heats" },
          { label: "Dimensional Tolerance", value: "±0.1 mm (flatness)" },
          { label: "Manufacturing", value: "Isostatic pressing" },
        ],
        specs: [
          { grade: "Al₂O₃-C Std", al2o3: "85-88%", carbon: "8-12%", life: "8-12 heats", temp: "1600°C" },
          { grade: "Al₂O₃-C Premium", al2o3: "90-93%", carbon: "6-10%", life: "12-18 heats", temp: "1650°C" },
          { grade: "Al₂O₃-ZrO₂-C", al2o3: "70-75%", zro2: "15-20%", life: "18-25 heats", temp: "1650°C" },
          { grade: "ZrO₂-C", zro2: "85-90%", carbon: "8-12%", life: "20-30 heats", temp: "1650°C" },
        ],
        installation: [
          "Inspect slide gate frame and cassette for squareness before fitting plates",
          "Ensure plate seating surface is clean and flat — any gap causes steel leakage",
          "Apply thin layer of refractory mortar or anti-oxidation paste to back of plate",
          "Preheat assembled slide gate to 100–150°C before first heat (electric pre-heater preferred)",
          "Check plate wear gauge after each heat — replace when bore erosion exceeds limit",
          "Store slide plates in dry conditions — moisture causes cracking during first heat",
        ],
        whyChoose: "Shanker Agencies is the strategic supply partner for IFGL Refractories (India's largest flow control manufacturer) in North India. We maintain stock of standard ladle plate sizes for same-day dispatch.",
      },
      {
        id: "ladle-shrouds",
        name: "Ladle Shrouds",
        shortDesc: "Shield the steel stream from oxidation during ladle-to-tundish transfer",
        fullDesc: "Ladle shrouds are tubular refractory components that form a sealed connection between the ladle bottom nozzle and the tundish, preventing atmospheric oxygen from contacting the steel stream. Without a ladle shroud, steel picks up oxygen and nitrogen causing inclusions that degrade finished steel quality.",
        tempMax: "1600°C",
        images: [IMG.shroud1],
        grades: ["Isostatically Pressed Al₂O₃-C", "Standard Pressed", "Fused Silica Shroud"],
        applications: [
          "Ladle to tundish transfer — slab/bloom/billet casters",
          "Sequence casting (multiple heats without replacing shroud)",
          "High-grade steel production requiring low inclusion counts",
        ],
        brands: ["IFGL Refractories", "TRL Krosaki"],
        keyProperties: [
          { label: "Material", value: "Al₂O₃-C or Fused Silica" },
          { label: "Manufacturing", value: "Isostatic pressing (premium)" },
          { label: "Thermal Shock Resistance", value: "Excellent" },
          { label: "Argon Purging", value: "Available — prevents clogging" },
          { label: "Service Life", value: "1 heat (standard) or sequence" },
          { label: "Connection System", value: "Bayonet / quick-change" },
        ],
        specs: [
          { grade: "Iso Al₂O₃-C", al2o3: "65-70%", carbon: "18-22%", application: "Sequence casting, quality steels", life: "1–3 heats" },
          { grade: "Std Pressed", al2o3: "60-65%", carbon: "20-25%", application: "Standard billets/blooms", life: "1 heat" },
          { grade: "Fused Silica", sio2: "96-99%", carbon: "—", application: "Stainless steel, no carbon pick-up", life: "1 heat" },
        ],
        installation: [
          "Always pre-heat shroud to 800–1000°C using lance pre-heater before first use",
          "Apply anti-oxidation paste to upper flange seating area",
          "Argon purging: connect purge line before opening ladle — purge at 10–15 Nl/min",
          "Check bayonet lock engagement before casting — loose connection causes steel splash",
        ],
        whyChoose: "We stock IFGL ladle shrouds in standard ISO sizes (200–250 mm OD, lengths 700–900 mm) with 48-hour availability for custom sizes.",
      },
      {
        id: "subentry-nozzles",
        name: "Subentry Nozzles (SEN)",
        shortDesc: "Direct steel from tundish to mould with precision flow control for surface quality",
        fullDesc: "Subentry nozzles (SEN) are immersed in the liquid steel pool inside the continuous casting mould, directing steel flow below the meniscus. The flow pattern created by the SEN geometry directly influences slab surface quality, solidification uniformity, and inclusion distribution. Premium SEN design reduces oscillation marks and improves yield.",
        tempMax: "1600°C",
        images: [IMG.slideGate2],
        grades: ["Al₂O₃-C (Slab SEN)", "Fused Silica SEN", "Zirconia Insert SEN", "Stopper Rod SEN"],
        applications: [
          "Slab continuous caster (single or multi-strand)",
          "Bloom and beam blank caster",
          "Billet caster with tundish nozzle",
          "High-speed casting with electromagnetic stirring",
        ],
        brands: ["IFGL Refractories", "TRL Krosaki"],
        keyProperties: [
          { label: "Port Design", value: "Single / Dual port — custom angles" },
          { label: "Anti-clogging", value: "Zirconia insert at steel-contact bore" },
          { label: "Immersion Depth", value: "Customer-specified" },
          { label: "Thermal Shock", value: "Extremely high resistance required" },
          { label: "Life", value: "1 sequence (4–12 heats typical)" },
          { label: "Material", value: "Al₂O₃-C with ZrO₂-C bore insert" },
        ],
        specs: [
          { grade: "Slab SEN Std", al2o3: "65%", carbon: "20%", zro2_insert: "90%", life: "1 sequence", temp: "1600°C" },
          { grade: "Slab SEN Prem", al2o3: "70%", carbon: "18%", zro2_insert: "95%", life: "2 sequences", temp: "1600°C" },
          { grade: "Fused Silica", sio2: "97%", carbon: "—", zro2_insert: "—", life: "1 sequence", temp: "1500°C" },
        ],
        installation: [
          "Pre-heat SEN to 1000–1100°C using dedicated SEN pre-heater (minimum 45 minutes)",
          "Never cold-insert SEN into liquid steel — thermal shock will crack it immediately",
          "Align SEN centrally in mould — offset causes asymmetric flow and quality problems",
          "Apply anti-oxidation paste to upper flange and tundish bottom nozzle interface",
        ],
        whyChoose: "IFGL (India's leading flow control refractory manufacturer) has developed SEN designs optimised for each major Indian caster configuration. Shanker Agencies supplies IFGL SEN with the full plant-specific documentation package.",
      },
      {
        id: "porous-plugs",
        name: "Porous Plugs & Ladle Bottom Nozzles",
        shortDesc: "Enable argon gas stirring for steel homogenisation and inclusion flotation",
        fullDesc: "Porous plugs are installed in the ladle bottom and connected to an argon gas supply. Bubbling argon through the steel bath stirs the melt, homogenises temperature and chemistry, promotes inclusion flotation, and reduces total oxygen content — directly improving finished steel cleanliness and mechanical properties.",
        tempMax: "1650°C",
        images: [IMG.porous1, IMG.slideGate1],
        applications: [
          "Ladle bottom stirring — all steel grades",
          "Secondary metallurgy (LF, VD, VOD)",
          "Desulphurisation station",
          "Rinsing and homogenisation before casting",
        ],
        brands: ["IFGL Refractories"],
        keyProperties: [
          { label: "Gas Permeability", value: "15 – 80 nPm (grade-dependent)" },
          { label: "Material", value: "Periclase (MgO) or Corundum (Al₂O₃)" },
          { label: "Argon Flow Rate", value: "10 – 200 Nl/min" },
          { label: "Service Life", value: "1 ladle campaign (10–20 heats)" },
          { label: "Failure Mode", value: "Plug replacement before each campaign" },
          { label: "Safety", value: "Blow-out prevention ring included" },
        ],
        specs: [
          { grade: "MgO Porous", mgo: "90-95%", permeability: "30-60 nPm", ccs: "45 MPa", temp: "1650°C" },
          { grade: "Al₂O₃ Porous", al2o3: "90-95%", permeability: "20-50 nPm", ccs: "50 MPa", temp: "1600°C" },
          { grade: "Slit Type", al2o3: "85%", permeability: "80-120 nPm", ccs: "40 MPa", temp: "1600°C" },
        ],
        installation: [
          "Ensure mortar completely seals the annular gap between porous plug and well block",
          "Connect argon line — test gas flow before tapping first heat",
          "After each campaign: inspect and measure plug erosion — replace if worn beyond safe limit",
          "Monitor gas pressure during heat — sudden pressure increase indicates plug clogging",
        ],
        whyChoose: "Shanker Agencies supplies IFGL porous plugs matched to your ladle well block dimensions. We also supply the steel sleeve assembly and mortar for complete replacement.",
      },
    ],
  },

  "insulation": {
    name: "Insulation",
    tagline: "Lightweight thermal barriers for energy savings and worker safety",
    desc: "Thermal insulation refractories minimise heat losses through furnace walls, reduce structural steel temperatures, and improve energy efficiency. Correct insulation selection can cut fuel consumption by 20–40% and significantly improve working conditions around hot equipment.",
    image: IMG.insulHero,
    tempRange: "600–1600°C",
    industries: ["Steel", "Petrochemical", "Cement", "Power", "Heat Treatment"],
    products: [
      {
        id: "ceramic-fiber-products",
        name: "Ceramic Fiber Products",
        shortDesc: "Ultra-lightweight blankets, modules and boards for energy-efficient furnace linings",
        fullDesc: "Ceramic fiber products are manufactured from aluminosilicate fibres produced by melting and fiberising a blend of Al₂O₃ and SiO₂. They offer extremely low thermal mass (enabling rapid furnace heat-up and cool-down), very low thermal conductivity, and good resistance to thermal shock. Available in blankets, modules, boards, papers, and loose wool — each suited to different installation requirements.",
        popular: true,
        tempMax: "1600°C",
        images: [IMG.ceramicFiber1, IMG.ceramicFiber2],
        grades: ["1260°C Blanket (STD)", "1400°C Blanket (HA)", "1600°C Module", "1260°C Board", "Vacuum-formed Board", "Ceramic Paper"],
        applications: [
          "Car-bottom and bogie hearth furnace lining",
          "Continuous annealing furnace roof & walls",
          "Heat treatment furnace complete lining",
          "Backup insulation in steel ladle covers",
          "Expansion joints in kiln linings",
          "Petrochemical reformer furnace casing insulation",
          "Torpedo car cover insulation",
          "Industrial boiler casing insulation",
        ],
        brands: ["Divine Cerawool", "Mahakoshal", "Crown Ceramics"],
        keyProperties: [
          { label: "Service Temperature", value: "1000°C – 1600°C (grade-dependent)" },
          { label: "Thermal Conductivity", value: "0.08 – 0.12 W/mK (at 500°C)" },
          { label: "Bulk Density", value: "64 – 200 kg/m³" },
          { label: "Heat Storage", value: "5–10% of equivalent dense refractory" },
          { label: "Thermal Shock", value: "Excellent — no cracking" },
          { label: "Chemical Resistance", value: "Good to most atmospheres" },
        ],
        specs: [
          { grade: "1260 Blanket", tempC: "1260°C", density: "96-128 kg/m³", tc_500: "0.08 W/mK", tensile: "30 kPa", form: "Roll (7.3m × 610mm)" },
          { grade: "1400 Blanket", tempC: "1400°C", density: "96-128 kg/m³", tc_500: "0.10 W/mK", tensile: "35 kPa", form: "Roll (7.3m × 610mm)" },
          { grade: "1600 Module", tempC: "1600°C", density: "160-200 kg/m³", tc_500: "0.12 W/mK", tensile: "—", form: "Module (300×300mm)" },
          { grade: "1260 Board", tempC: "1260°C", density: "300-350 kg/m³", tc_500: "0.12 W/mK", tensile: "200 kPa", form: "Sheet (1000×500mm)" },
          { grade: "Vacuum Formed", tempC: "1400°C", density: "350-400 kg/m³", tc_500: "0.14 W/mK", tensile: "300 kPa", form: "Custom shapes" },
          { grade: "Ceramic Paper", tempC: "1260°C", density: "160-200 kg/m³", tc_500: "0.10 W/mK", tensile: "—", form: "Roll (5m × 300mm)" },
        ],
        installation: [
          "Blanket: wrap around cylindrical vessels or layer on flat surfaces — overlap joints by 50 mm",
          "Modules: attach to shell plate using stud welding — butt joints, no gaps",
          "Boards: cut with hand saw or angle grinder — wear respiratory protection when cutting fibres",
          "Expansion gaps: ceramic fiber requires no expansion gaps (it compresses and expands freely)",
          "Anchoring: stainless steel stud anchors every 300–400 mm for overhead and vertical applications",
          "Vapour barrier: apply rigidiser or colloidal silica coating on hot face to prevent fibre erosion in high-velocity gas applications",
        ],
        whyChoose: "Shanker Agencies distributes Divine Cerawool and Mahakoshal ceramic fiber products. We can design the complete insulation system, calculate heat loss, and supply all materials including anchors, rigidiser, and installation tools.",
      },
      {
        id: "calcium-silicate",
        name: "Calcium Silicate Boards",
        shortDesc: "Rigid, load-bearing insulation boards for backup lining and structural insulation",
        fullDesc: "Calcium silicate boards are manufactured by autoclaving a slurry of silica, lime, and reinforcing fibres. They are rigid, dimensionally stable at temperature, and can bear significant compressive loads — unlike ceramic fiber which deflects under mechanical pressure. Essential for applications requiring a firm, flat substrate.",
        tempMax: "1000°C",
        images: [IMG.calciumSil1, IMG.ceramicFiber2],
        grades: ["CS-650 (650°C)", "CS-870 (870°C)", "CS-1000 (1000°C)"],
        applications: [
          "Backup insulation layer in multi-layer furnace linings",
          "Ladle furniture and covers",
          "Kiln car decks (under the refractory deck)",
          "Heat shields around vessel steel structures",
          "Pipe insulation — industrial process piping",
          "Flat-bed furnace hearth backup",
        ],
        brands: ["Mahakoshal"],
        keyProperties: [
          { label: "Max Service Temp", value: "650°C – 1000°C" },
          { label: "Thermal Conductivity", value: "0.15 – 0.25 W/mK" },
          { label: "Compressive Strength", value: "0.5 – 2.0 MPa" },
          { label: "Rigidity", value: "Excellent — load-bearing" },
          { label: "Cutting", value: "Easily cut with hand saw" },
          { label: "Moisture", value: "Can be re-dried after wetting" },
        ],
        specs: [
          { grade: "CS-650", maxTemp: "650°C", density: "220-260 g/cc", tc: "0.15 W/mK", ccs: "0.5 MPa", size: "1000×500×25-75mm" },
          { grade: "CS-870", maxTemp: "870°C", density: "250-280 g/cc", tc: "0.18 W/mK", ccs: "0.8 MPa", size: "1000×500×25-75mm" },
          { grade: "CS-1000", maxTemp: "1000°C", density: "280-320 g/cc", tc: "0.22 W/mK", ccs: "1.0 MPa", size: "1000×500×25-75mm" },
        ],
        installation: [
          "Cut to size using hand saw or jigsaw — no specialist tools required",
          "Attach with stainless steel screws or high-temp adhesive to steel substrate",
          "Butt joints — use ceramic fiber paper (1260°C) to seal joints if gas-tight seal required",
          "Pre-dry if boards were stored in damp conditions before installation (200°C, 4 hrs)",
        ],
        whyChoose: "Calcium silicate boards are a cost-effective way to add 50–100 mm of rigid backup insulation to any furnace. Shanker Agencies stocks standard board sizes (1000×500 mm) in 25, 50, and 75 mm thicknesses.",
      },
    ],
  },

  "acid-proofing": {
    name: "Acid Proofing",
    tagline: "Vitrified ceramic protection for chemical attack environments",
    desc: "Acid proofing ceramics protect concrete structures, steel vessels, floors, walls, and drainage systems from chemical attack by acids, alkalis, solvents, and corrosive process chemicals. They are the most cost-effective long-term protection system for chemical plants, effluent treatment works, and fertiliser plants.",
    image: IMG.acidHero,
    tempRange: "Ambient–900°C",
    industries: ["Chemical", "Fertilizer", "Effluent Treatment", "Pharmaceutical", "Food Processing"],
    products: [
      {
        id: "acid-proof-bricks",
        name: "Acid Proof Bricks",
        shortDesc: "Dense vitrified bricks with 97–99%+ acid resistance for chemical vessels and reactors",
        fullDesc: "Acid proof bricks are manufactured from selected clays fired to vitrification, producing a product with very low water absorption (0.1–6%), high density, and excellent chemical resistance to virtually all inorganic and organic acids except hydrofluoric acid (HF). They are bonded with acid-resistant cements (furan, phenolic, or potassium silicate based) to form acid-proof linings for chemical storage tanks, reaction vessels, absorption towers, and effluent channels.",
        popular: true,
        tempMax: "900°C",
        images: [IMG.acidBrick1, IMG.acidBrick2],
        grades: ["Class I (Standard)", "Class II (Premium)", "Class III (High-purity)", "Carbon-Filled", "Anti-static"],
        applications: [
          "Acid storage tank lining (H₂SO₄, HNO₃, HCl, H₃PO₄)",
          "Reaction vessel and reactor lining",
          "Absorption tower internal lining",
          "Chimney and flue gas duct lining",
          "Effluent treatment plant sumps and channels",
          "Fertiliser plant — sulphuric acid plant",
          "Pickling tank lining (steel processing)",
          "Battery room floors",
        ],
        brands: ["Crown Ceramics", "Mahakoshal"],
        keyProperties: [
          { label: "Water Absorption", value: "< 0.5% (Class II) / 3–6% (Class I)" },
          { label: "Acid Resistance", value: "97% min (Class I) / 99%+ (Class II)" },
          { label: "Alkali Resistance", value: "75% min (Class I) / 85% (Class II)" },
          { label: "Compressive Strength", value: "40 – 50 MPa" },
          { label: "Chemical Bond", value: "Furan resin / Phenolic / K-silicate" },
          { label: "Not Resistant To", value: "Hydrofluoric acid (HF), hot alkalis" },
        ],
        specs: [
          { grade: "Class I", absorption: "3-6%", acidRes: "97% min", alkRes: "75%", ccs: "40 MPa", size: "230×113×65mm std" },
          { grade: "Class II", absorption: "<2%", acidRes: "99% min", alkRes: "85%", ccs: "50 MPa", size: "230×113×65mm std" },
          { grade: "Class III", absorption: "<0.5%", acidRes: "99.5% min", alkRes: "90%", ccs: "55 MPa", size: "Custom" },
          { grade: "Carbon-Fill", absorption: "<1%", acidRes: "99.5% min", alkRes: "95%", ccs: "45 MPa", size: "Standard + custom" },
          { grade: "Anti-static", absorption: "<2%", acidRes: "99% min", alkRes: "85%", ccs: "45 MPa", size: "230×113×65mm std" },
        ],
        installation: [
          "Surface preparation: concrete or steel substrate must be clean, dry, and free of oil/grease",
          "Apply primer coat — epoxy primer for steel, concrete primer for concrete substrate",
          "Use appropriate acid-resistant cement: furan resin (best acid resistance), phenolic resin, or potassium silicate",
          "Bed mortar thickness: 3–6 mm, applied to both brick and substrate (buttered joint)",
          "Joint width: 3–6 mm, fully filled with acid-resistant mortar",
          "Curing: furan resin mortars — 24 hrs at 25°C before any chemical exposure; heat curing improves performance",
          "Test before commissioning: hydraulic leak test or chemical spot test",
        ],
        whyChoose: "Shanker Agencies supplies Crown Ceramics acid proof bricks (IS 4860 compliant) along with the complete range of Chemset acid-resistant mortars and cements. We provide lining design support for new constructions and repair specification for existing linings.",
      },
      {
        id: "acid-resistant-tiles",
        name: "Acid Resistant Tiles",
        shortDesc: "Floor, wall and channel tiles for chemical plant, laboratory and industrial areas",
        fullDesc: "Acid resistant tiles are thin-section vitrified ceramic tiles used to protect floors, walls, drainage channels, and work surfaces from chemical spillage. Unlike standard ceramic floor tiles, acid resistant tiles achieve near-zero porosity through high-temperature firing, and are installed with acid-resistant mortar and grout to form a fully impervious chemical-resistant surface.",
        tempMax: "400°C",
        images: [IMG.acidTile1, IMG.acidTile2],
        grades: ["Standard (150×150mm)", "Heavy Duty (200×200mm)", "Anti-Skid Surface", "Channel Invert Blocks", "Kerb Sections"],
        applications: [
          "Chemical plant floor areas",
          "Effluent treatment plant floor & walls",
          "Laboratory benches and floors",
          "Battery charging rooms",
          "Pickle line floor (steel plants)",
          "Pharma clean-room floors",
          "Drainage channel invert lining",
          "Loading bay floors (chemical spill protection)",
        ],
        brands: ["Crown Ceramics"],
        keyProperties: [
          { label: "Water Absorption", value: "< 0.5%" },
          { label: "Acid Resistance", value: "99% min (IS 4457)" },
          { label: "Abrasion Resistance", value: "Good to Excellent" },
          { label: "Slip Resistance", value: "R10 (std) / R12 (anti-skid)" },
          { label: "Available Sizes", value: "100×100 to 300×300mm" },
          { label: "Thickness", value: "8 – 30 mm" },
        ],
        specs: [
          { grade: "Standard 150mm", size: "150×150×10mm", absorption: "<0.5%", acidRes: "99%", finish: "Smooth", usecase: "General chemical floor" },
          { grade: "Heavy Duty 200mm", size: "200×200×20mm", absorption: "<0.5%", acidRes: "99%", finish: "Smooth", usecase: "High-traffic chemical floors" },
          { grade: "Anti-Skid", size: "150×150×10mm", absorption: "<0.5%", acidRes: "99%", finish: "Textured", usecase: "Wet areas, walkways" },
          { grade: "Channel Invert", size: "Custom", absorption: "<0.5%", acidRes: "99%", finish: "Smooth", usecase: "Effluent channel invert" },
        ],
        installation: [
          "Substrate: smooth, level concrete (± 3mm in 3m) — grind high spots, fill low spots with epoxy mortar",
          "Use only acid-resistant tile adhesive mortar (furan-based for strong acids, potassium silicate for milder duty)",
          "Lay tiles with minimum 3mm joint width — do not butt joint",
          "Grout all joints with acid-resistant grout immediately after tile adhesive has set (24–48 hrs)",
          "Seal around drains and wall junctions with acid-resistant flexible sealant",
          "Cure for 5–7 days before any chemical exposure",
          "Test: cover with dilute acid solution for 24 hours before commissioning",
        ],
        whyChoose: "Shanker Agencies supplies Crown Ceramics acid resistant floor tiles in all standard sizes. We also supply the complete installation system: acid-resistant tile adhesive mortar, grout, cove sections, and drain frames.",
      },
    ],
  },
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
            <button key={i} onClick={() => setActive(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${active === i ? "border-[#F97316]" : "border-gray-200 hover:border-gray-400"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
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

      {/* Image — taller, with gradient overlay */}
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

        {/* Temp badge — bottom left */}
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

/* ─── PRODUCT DETAIL PAGE ────────────────────────────────────────────── */
function ProductDetailPage({ product, category, categorySlug }) {
  const meta = CAT_META[categorySlug] || CAT_META["shaped-refractories"];
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
            {product.name.toUpperCase()}
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
                <p className="mt-3 text-xs text-gray-400 italic">* Test conditions: IS 1528 (India) / ASTM C-133 / EN 1402. Values are typical — exact data sheets available on request.</p>
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
                <p className="text-xs text-green-700">Standard grades in stock — Delhi warehouse. Pan-India delivery in 2–5 days. Same-day dispatch for urgent orders ≤ 2 MT.</p>
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
            {category.products.filter(p => p.id !== product.id).slice(0, 4).map(rel => (
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
      

      {/* ── Category Hero — full bleed with real background image ── */}
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
            ALL PRODUCTS — <span style={{ color: meta.accent }}>{category.name.toUpperCase()}</span>
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
              CUMI · Calderys · TRL Krosaki · IFGL · Mahakoshal · Divine Cerawool — complete grade tables and application guides.
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

                    {/* Full-width image top — portrait crop on mobile, wider on desktop */}
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

                      {/* Temp badge — top right */}
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                          style={{ background: `${cat.accent}cc`, backdropFilter: "blur(4px)" }}>
                          <Thermometer size={9} /> {cat.tempRange}
                        </span>
                      </div>

                      {/* Product count — bottom right */}
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
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Strategic Supply Partner For</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[{ n: "CUMI", c: "#1E3A5F" }, { n: "Calderys", c: "#1E40AF" }, { n: "TRL Krosaki", c: "#DC2626" }, { n: "IFGL", c: "#F97316" }, { n: "Mahakoshal", c: "#10B981" }, { n: "Crown", c: "#7C3AED" }].map(b => (
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
          {[{ icon: CheckCircle, title: "ISO 9001:2015 Certified", sub: "Quality management across all products and processes" }, { icon: Shield, title: "No Minimum Order", sub: "Trial quantities or bulk — we supply both" }, { icon: Zap, title: "Same-Day Response", sub: "Technical quotes within 4 business hours" }, { icon: Package, title: "Pan-India Delivery", sub: "Delhi warehouse — nationwide in 2–5 days" }].map(({ icon: I, title, sub }) => (
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
          <p className="text-gray-600 mb-8">We carry 200+ grades not all listed here. Call us — our engineers will match the right refractory to your process in minutes.</p>
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
  const category = categorySlug ? DATA[categorySlug] : null;

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