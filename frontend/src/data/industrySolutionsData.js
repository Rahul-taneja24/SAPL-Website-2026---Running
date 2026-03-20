// Industry Solutions Data with real product and industry-specific information

export const industrySolutions = [
  {
    id: "steel",
    name: "Steel Industry Solutions",
    slug: "steel",
    tagline: "Complete Refractory Solutions for Integrated & Secondary Steel Plants",
    heroImage: "https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=1200&q=80",
    description: "From blast furnace to continuous casting, we provide engineered refractory solutions for every step of steel production. Our products ensure maximum campaign life, reduced downtime, and optimized performance.",
    stats: [
      { value: "200+", label: "Steel Plants Served" },
      { value: "45+", label: "Years Experience" },
      { value: "99.5%", label: "On-Time Delivery" },
      { value: "15%", label: "Average Cost Savings" }
    ],
    applications: [
      {
        name: "Blast Furnace",
        description: "Hot blast stoves, trough & runners, tap holes",
        products: ["High Alumina Bricks (HA-60 to HA-90)", "Ramming Mass", "Gunning Materials"],
        image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80"
      },
      {
        name: "Steel Ladle",
        description: "Working lining, safety lining, slag zones",
        products: ["LCC/ULCC Castables", "MgO-C Bricks", "Slide Gate Plates"],
        image: "https://images.unsplash.com/photo-1684259499227-e9844ab79747?w=600&q=80"
      },
      {
        name: "Electric Arc Furnace (EAF)",
        description: "Sidewalls, roof, door jambs, tap holes",
        products: ["Basic Bricks", "Gunning Materials", "High Alumina Castables"],
        image: "https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=600&q=80"
      },
      {
        name: "Continuous Casting",
        description: "Tundish, SEN, shrouds, stopper systems",
        products: ["Flow Control Products", "Tundish Nozzles", "Ladle Shrouds"],
        image: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=600&q=80"
      },
      {
        name: "Induction Furnace",
        description: "Crucible lining, spout, cover",
        products: ["Silica Ramming Mass", "Alumina Ramming Mass", "Magnesia Ramming Mass"],
        image: "https://images.unsplash.com/photo-1678717167554-f1619f3400d5?w=600&q=80"
      }
    ],
    keyBenefits: [
      "Extended campaign life up to 30% longer",
      "Reduced refractory consumption per ton of steel",
      "Improved thermal efficiency and energy savings",
      "24/7 technical support and emergency response",
      "Comprehensive lining design and installation support"
    ],
    featuredProducts: [
      { name: "LCC-80 Castable", spec: "Al₂O₃: 78-82%, CCS: 100-120 MPa" },
      { name: "MgO-C Bricks", spec: "MgO: 75-85%, Carbon: 12-18%" },
      { name: "Slide Gate Plates", spec: "Al₂O₃-C Premium, 90-93% Al₂O₃" }
    ]
  },
  {
    id: "cement",
    name: "Cement Industry Solutions",
    slug: "cement",
    tagline: "High-Performance Refractories for Rotary Kilns & Preheaters",
    heroImage: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=1200&q=80",
    description: "Engineered refractory solutions for the demanding environment of cement production. Our products withstand extreme temperatures, chemical attack, and mechanical stress in rotary kilns and preheater systems.",
    stats: [
      { value: "150+", label: "Cement Plants" },
      { value: "1800°C", label: "Max Temperature" },
      { value: "18", label: "Months Avg Campaign" },
      { value: "Chrome-Free", label: "Eco-Friendly Options" }
    ],
    applications: [
      {
        name: "Burning Zone",
        description: "Hottest zone with maximum thermal and chemical stress",
        products: ["Magnesia Spinel Bricks", "Magnesia 95", "Basic Bricks"],
        image: "https://images.unsplash.com/photo-1603211770215-abb8b9583950?w=600&q=80"
      },
      {
        name: "Transition Zone",
        description: "Thermal cycling and coating adherence challenges",
        products: ["Magnesia-Chrome Bricks", "High Alumina Bricks (HA-70)"],
        image: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=600&q=80"
      },
      {
        name: "Preheater & Calciner",
        description: "Cyclones, risers, kiln inlet",
        products: ["Dense Castables", "Abrasion-Resistant Castables", "Anchor Systems"],
        image: "https://images.unsplash.com/photo-1712931235644-b2126e4c90ff?w=600&q=80"
      },
      {
        name: "Cooler",
        description: "Bull nose, grate plates, sidewalls",
        products: ["Silicon Carbide Bricks", "High Alumina Castables", "IFB"],
        image: "https://images.unsplash.com/photo-1640550216188-9ddd6dd63238?w=600&q=80"
      }
    ],
    keyBenefits: [
      "Chrome-free magnesia-spinel options for eco-compliance",
      "Optimized coating formation for extended life",
      "Resistance to alkali attack and thermal shock",
      "Reduced kiln shell temperature and heat loss",
      "Quick installation and minimal downtime"
    ],
    featuredProducts: [
      { name: "Mag-Spinel Bricks", spec: "MgO: 85-90%, Chrome-free" },
      { name: "Magnesia 95", spec: "MgO: 93-96%, Bulk Density: 2.95 g/cc" },
      { name: "Abrasion-Resistant Castable", spec: "SiC reinforced, Al₂O₃: 80%" }
    ]
  },
  {
    id: "aluminum",
    name: "Aluminum Industry Solutions",
    slug: "aluminum",
    tagline: "Specialized Refractories for Aluminum Smelting & Casting",
    heroImage: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=1200&q=80",
    description: "Non-wetting, thermal shock resistant refractories designed specifically for aluminum contact applications. Our solutions prevent metal penetration and extend equipment life in smelters and foundries.",
    stats: [
      { value: "75+", label: "Aluminum Plants" },
      { value: "Non-Wetting", label: "Technology" },
      { value: "800°C", label: "Operating Range" },
      { value: "50%", label: "Life Improvement" }
    ],
    applications: [
      {
        name: "Holding Furnace",
        description: "Metal contact zones, roof, sidewalls",
        products: ["Non-Wetting Castables", "Phosphate-Bonded Bricks", "Ceramic Fiber"],
        image: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=600&q=80"
      },
      {
        name: "Melting Furnace",
        description: "High temperature metal contact",
        products: ["Silicon Carbide Bricks", "High Alumina Non-Wetting", "Ramming Mass"],
        image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80"
      },
      {
        name: "Transfer Systems",
        description: "Launders, troughs, degassing units",
        products: ["Precast Shapes", "Insulating Castables", "Flow Control"],
        image: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=600&q=80"
      }
    ],
    keyBenefits: [
      "Non-wetting formulations prevent aluminum penetration",
      "Thermal shock resistance for rapid cycling",
      "Low iron content to prevent contamination",
      "Energy efficient insulation solutions",
      "Custom precast shapes for fast installation"
    ],
    featuredProducts: [
      { name: "Non-Wetting Castable", spec: "Al₂O₃: 85%, Anti-wetting technology" },
      { name: "SiC Bricks", spec: "SiC: 80-90%, Non-wetting" },
      { name: "Ceramic Fiber Modules", spec: "1260°C rated, Low thermal mass" }
    ]
  },
  {
    id: "glass",
    name: "Glass Industry Solutions",
    slug: "glass",
    tagline: "Premium Refractories for Glass Melting & Forming",
    heroImage: "https://images.unsplash.com/photo-1767725185080-5e8bffbfaee9?w=1200&q=80",
    description: "High-quality refractories for glass furnaces requiring exceptional corrosion resistance and thermal stability. Our fused cast and bonded products ensure glass quality and furnace longevity.",
    stats: [
      { value: "50+", label: "Glass Plants" },
      { value: "10+ Years", label: "Campaign Life" },
      { value: "1700°C", label: "Max Temperature" },
      { value: "Zero", label: "Defect Solutions" }
    ],
    applications: [
      {
        name: "Melting Tank",
        description: "Sidewalls, bottom, throat, electrodes",
        products: ["Fused Cast AZS", "Fused Cast Alumina", "Zircon Bricks"],
        image: "https://images.unsplash.com/photo-1767725185080-5e8bffbfaee9?w=600&q=80"
      },
      {
        name: "Regenerator",
        description: "Checker bricks, rider arches, crown",
        products: ["Magnesia Bricks", "Silica Bricks", "High Alumina"],
        image: "https://images.unsplash.com/photo-1678717167554-f1619f3400d5?w=600&q=80"
      },
      {
        name: "Superstructure",
        description: "Crown, breast walls, ports",
        products: ["Silica Bricks", "Mullite Bricks", "Fused Cast"],
        image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80"
      }
    ],
    keyBenefits: [
      "Superior corrosion resistance to molten glass",
      "Minimal stone and blister formation",
      "Extended campaign life reducing rebuild costs",
      "Consistent glass quality throughout campaign",
      "Expert technical support for furnace design"
    ],
    featuredProducts: [
      { name: "Fused Cast AZS", spec: "50-60% Al₂O₃, ZrO₂ content optimized" },
      { name: "Zircon Bricks", spec: "65% ZrSiO₄, Glass contact grade" },
      { name: "Silica Crown Bricks", spec: "96%+ SiO₂, Superduty" }
    ]
  },
  {
    id: "petrochemical",
    name: "Petrochemical Industry Solutions",
    slug: "petrochemical",
    tagline: "Reliable Refractories for Refineries & Chemical Plants",
    heroImage: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=1200&q=80",
    description: "Engineered solutions for the demanding conditions of petrochemical processing. From reformers to crackers, our products ensure safety, efficiency, and extended equipment life.",
    stats: [
      { value: "100+", label: "Petrochemical Units" },
      { value: "1100°C", label: "Max Temperature" },
      { value: "API", label: "Compliant" },
      { value: "Zero", label: "Hot Spots" }
    ],
    applications: [
      {
        name: "Steam Reformers",
        description: "Catalyst tubes, transfer lines, outlet headers",
        products: ["Ceramic Fiber Modules", "High Temp Castables", "Insulating Bricks"],
        image: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=600&q=80"
      },
      {
        name: "Ethylene Crackers",
        description: "Transfer line exchangers, quench systems",
        products: ["Dense Castables", "Erosion-Resistant Linings", "Anchors"],
        image: "https://images.unsplash.com/photo-1768128834332-7d3479c8d634?w=600&q=80"
      },
      {
        name: "Heaters & Furnaces",
        description: "Process heater linings, floor, walls",
        products: ["Ceramic Fiber Blankets", "IFB", "Calcium Silicate"],
        image: "https://images.unsplash.com/photo-1640550216188-9ddd6dd63238?w=600&q=80"
      }
    ],
    keyBenefits: [
      "Low thermal conductivity for energy savings",
      "Excellent thermal shock resistance",
      "API and industry standard compliance",
      "Quick turnaround installation services",
      "Comprehensive inspection and maintenance support"
    ],
    featuredProducts: [
      { name: "Ceramic Fiber Modules", spec: "1430°C rated, Fast installation" },
      { name: "IFB-28", spec: "1480°C, Bulk Density: 1.0 g/cc" },
      { name: "Microporous Insulation", spec: "Ultra-low conductivity: 0.022 W/mK" }
    ]
  },
  {
    id: "power",
    name: "Power Industry Solutions",
    slug: "power",
    tagline: "Durable Refractories for Boilers & Incinerators",
    heroImage: "https://images.unsplash.com/photo-1747345341772-7516f6b54958?w=1200&q=80",
    description: "Robust refractory solutions for thermal power plants, waste-to-energy facilities, and industrial boilers. Our products withstand high temperatures, erosion, and corrosive atmospheres.",
    stats: [
      { value: "80+", label: "Power Plants" },
      { value: "1500°C", label: "Max Temperature" },
      { value: "5+ Years", label: "Typical Life" },
      { value: "24/7", label: "Support" }
    ],
    applications: [
      {
        name: "Boiler Linings",
        description: "Furnace walls, floor, burner quarls",
        products: ["Dense Castables", "Plastic Refractories", "Anchoring Systems"],
        image: "https://images.unsplash.com/photo-1747345341772-7516f6b54958?w=600&q=80"
      },
      {
        name: "FBC Systems",
        description: "Cyclones, bed, freeboard",
        products: ["Abrasion-Resistant Castables", "SiC Tiles", "Gunning Materials"],
        image: "https://images.unsplash.com/photo-1640550216188-9ddd6dd63238?w=600&q=80"
      },
      {
        name: "Incinerators",
        description: "Combustion chamber, ash handling",
        products: ["High Alumina Bricks", "Dense Castables", "Acid-Resistant Linings"],
        image: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=600&q=80"
      }
    ],
    keyBenefits: [
      "High abrasion and erosion resistance",
      "Resistance to reducing and oxidizing atmospheres",
      "Thermal cycling capability",
      "Low maintenance requirements",
      "Quick repair solutions for minimal downtime"
    ],
    featuredProducts: [
      { name: "Abrasion-Resistant Castable", spec: "SiC-reinforced, Al₂O₃: 75%" },
      { name: "High Alumina Bricks", spec: "HA-60, CCS: 50-60 MPa" },
      { name: "Plastic Refractories", spec: "Al₂O₃: 60%, Ready-to-use" }
    ]
  }
];

export const getIndustrySolution = (slug) => {
  return industrySolutions.find(industry => industry.slug === slug);
};

export const getAllIndustrySolutions = () => {
  return industrySolutions;
};
