// Product Families Data - Using functions to avoid babel plugin issues

// Main product families
function getProductFamilies() {
  return [
    { id: "shaped", name: "Shaped Refractories", metaLine: "Major Product Family", description: "Fired and chemically bonded refractory bricks for working, safety, and backup linings across high-temperature industrial equipment.", idealFor: "Steel, cement, non-ferrous, glass, and petrochemical plants requiring durable, dimensionally stable linings.", image: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/High-Alumina-Refractories-2.jpg" },
    { id: "unshaped", name: "Unshaped Refractories", metaLine: "Major Product Family", description: "Monolithic refractories including castables, ramming masses, and gunning materials for complex geometries and rapid installation.", idealFor: "Ladle linings, tundish, torpedo cars, and furnace repairs where seamless, joint-free linings are required.", image: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumihicast-1.jpg" },
    { id: "flow-control", name: "Flow Control", metaLine: "Major Product Family", description: "Precision-engineered refractories for controlling molten steel flow from ladle to mold in continuous casting operations.", idealFor: "Steel plants with continuous casting, requiring precise flow control, stream protection, and anti-clogging performance.", image: "https://images.unsplash.com/photo-1769491188458-2728c8d44628?w=800&q=80" },
    { id: "insulation", name: "Insulation", metaLine: "Major Product Family", description: "Lightweight thermal insulation materials for energy efficiency, heat containment, and personnel protection.", idealFor: "Furnace walls, roofs, expansion joints, and backup insulation where energy savings and low thermal mass are priorities.", image: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/Insulation-Refractories-2.jpg" },
    { id: "acid-proof", name: "Acid Proofing", metaLine: "Major Product Family", description: "Chemical-resistant ceramics for protection against acids, alkalis, and corrosive environments in chemical processing.", idealFor: "Chemical plants, fertilizer industries, pharmaceutical facilities, and any application with corrosive chemical exposure.", image: "https://images.unsplash.com/photo-1682891328125-c527a70dc69a?w=800&q=80" }
  ];
}

// Sub-families by parent ID
function getSubFamilies(parentId) {
  if (parentId === "shaped") {
    return [
      { id: "fireclay", name: "Fireclay Bricks", maxTemp: "1400°C", description: "Economic aluminosilicate bricks for general furnace linings, backup linings, and low-to-medium temperature zones.", keyRanges: "Al₂O₃: 30-45% | Bulk Density: 2.0-2.5 g/cc | CCS: 20-35 MPa", idealFor: "Boiler furnaces, ductwork, backup linings, chimney stacks, general industrial furnaces", applications: "Backup linings, Low-temp zones, Chimneys, Ductwork", popular: false, badge: "", hasGradeTable: true },
      { id: "high-alumina", name: "High Alumina Bricks", maxTemp: "1750°C", description: "Dense alumina bricks for high-temperature, high-wear zones in steel, cement, and non-ferrous applications. Available in grades from 45% to 90% Al₂O₃.", keyRanges: "Al₂O₃: 45-90% | Bulk Density: 2.3-3.0 g/cc | CCS: 50-120 MPa", idealFor: "Steel ladles, tundishes, rotary kilns, furnace roofs, blast furnace stoves, EAF", applications: "Steel ladles, Cement kilns, Hot blast stoves, EAF roofs", popular: true, badge: "Most popular for steel plants", hasGradeTable: true },
      { id: "ifb", name: "Insulating Fire Bricks (IFB)", maxTemp: "1500°C", description: "Lightweight, low-thermal-mass bricks for energy-efficient backup and hot-face linings at moderate loads. Excellent thermal insulation properties.", keyRanges: "Al₂O₃: 30-45% | Bulk Density: 0.6-1.3 g/cc | Thermal Cond: 0.15-0.35 W/mK", idealFor: "Furnace walls and roofs, kiln car linings, backup insulation, heat treatment furnaces", applications: "Furnace backup, Kiln cars, Heat treatment, Annealing", popular: false, badge: "Best for energy savings", hasGradeTable: true },
      { id: "basic", name: "Basic Bricks (Magnesia/MgO-C)", maxTemp: "1800°C", description: "Basic refractory bricks for slag-resistant linings in steelmaking and cement applications. Includes magnesia, magnesia-chrome, magnesia-spinel, and MgO-C grades.", keyRanges: "MgO: 60-98% | Bulk Density: 2.8-3.2 g/cc | Carbon: 5-20% (MgO-C)", idealFor: "Basic oxygen furnaces, EAF sidewalls, cement kiln burning zones, steel converters, AOD vessels", applications: "BOF/Converters, EAF, Cement burning zone, AOD", popular: true, badge: "Ideal for cement rotary kilns", hasGradeTable: true },
      { id: "special", name: "Special Shaped Bricks", maxTemp: "1700°C", description: "Specialized shaped refractories including mullite, andalusite, zircon, silicon carbide, and fused cast products for demanding applications.", keyRanges: "Various compositions | Application-specific properties | Custom shapes available", idealFor: "Glass tanks, slag lines, superstructures, aluminum furnaces, incinerators", applications: "Glass melting, Aluminum, Incinerators, Special furnaces", popular: false, badge: "", hasGradeTable: true }
    ];
  }
  if (parentId === "unshaped") {
    return [
      { id: "lcc", name: "Low Cement Castables (LCC)", maxTemp: "1650°C", description: "High-performance monolithics with reduced cement content (3-8%) for superior hot strength, low porosity, and excellent slag resistance.", keyRanges: "Al₂O₃: 60-90% | Bulk Density: 2.7-3.0 g/cc | Cement: 3-8%", idealFor: "Steel ladles, tundish working linings, torpedo car linings, blast furnace runners", applications: "Ladle working lining, Tundish, Torpedo cars, BF runners", popular: true, badge: "Most specified for steel ladles", hasGradeTable: true },
      { id: "ulcc", name: "Ultra Low Cement Castables (ULCC)", maxTemp: "1700°C", description: "Premium castables with minimal cement content (<3%) for maximum hot strength in critical high-wear applications. Superior density and slag resistance.", keyRanges: "Al₂O₃: 70-95% | Bulk Density: 2.8-3.1 g/cc | Cement: <3%", idealFor: "Critical ladle areas, high-wear zones, slag lines, demanding metallurgical applications", applications: "Ladle impact zones, Slag lines, High-wear areas", popular: false, badge: "Premium performance", hasGradeTable: true },
      { id: "conventional", name: "Conventional Castables", maxTemp: "1500°C", description: "Standard refractory castables with 15-25% cement content for general applications. Good workability and cost-effectiveness.", keyRanges: "Al₂O₃: 40-70% | Bulk Density: 2.2-2.6 g/cc | Cement: 15-25%", idealFor: "General furnace linings, backup applications, moderate-temperature zones, repairs", applications: "General linings, Backup, Repairs, Moderate temp", popular: false, badge: "", hasGradeTable: true },
      { id: "ramming", name: "Ramming Mass", maxTemp: "1700°C", description: "Dry or semi-dry monolithics for pneumatic or manual ramming. Develops strength through sintering at operating temperature.", keyRanges: "Al₂O₃: 70-95% (alumina) | Silica/Magnesia grades available | Sintered density: 2.8-3.2 g/cc", idealFor: "Induction furnace linings, steel ladle bottoms, torpedo cars, tap holes, runners", applications: "Induction furnaces, Ladle bottoms, Tap holes, Runners", popular: true, badge: "Essential for induction furnaces", hasGradeTable: true },
      { id: "gunning", name: "Gunning Materials", maxTemp: "1600°C", description: "Sprayable refractories for hot and cold repairs, maintenance, and new installation. Quick application with good adhesion.", keyRanges: "Al₂O₃: 60-85% | Bulk Density: 2.4-2.8 g/cc | Wet/Dry gunning grades", idealFor: "Hot repairs, lining maintenance, rapid turnaround applications, emergency repairs", applications: "Hot repairs, Maintenance, Patch work, Emergency", popular: false, badge: "", hasGradeTable: true },
      { id: "plastic", name: "Plastic Refractories", maxTemp: "1500°C", description: "Ready-to-use plastic masses for ramming or pressing into complex shapes. Excellent workability and good hot strength.", keyRanges: "Al₂O₃: 50-70% | Bulk Density: 2.3-2.6 g/cc | Pre-mixed plastic form", idealFor: "Door jambs, burner blocks, patching, complex geometries, small repairs", applications: "Burner blocks, Door repairs, Patching, Complex shapes", popular: false, badge: "", hasGradeTable: false },
      { id: "mortars", name: "Refractory Mortars", maxTemp: "1750°C", description: "Fine-grained bonding pastes used to lay refractory bricks, fill expansion joints, and finish cast surfaces. Available in fireclay, high alumina, basic, insulating and acid-proof chemistries to match the brick course.", keyRanges: "Al₂O₃: 30-95% | Bulk Density: 1.85-2.70 g/cc | Joint thickness: 1-4 mm", idealFor: "Brick jointing, surface finishing, hot-face patching, expansion joint fill, anchor pockets", applications: "Brick laying, Joint filling, Hot-face patches, Anchor potting", popular: true, badge: "Match the brick chemistry", hasGradeTable: true },
      { id: "fireclay-castables", name: "Conventional Castables (Fireclay)", maxTemp: "1500°C", description: "Cost-effective fireclay-based castables with 15-25% cement, the workhorse for backup linings and general industrial duty. Roughly half the cost of an equivalent LCC and faster to install, the right specification where premium hot-strength is not required.", keyRanges: "Al₂O₃: 38-72% | Bulk Density: 2.2-2.55 g/cc | Cement: 15-25% | Water: 8-12%", idealFor: "Backup linings, boiler walls, foundry trough, repair work, soaking pit backup", applications: "Backup, Boilers, Foundry, Repairs, Heat treatment", popular: false, badge: "Cost-effective", hasGradeTable: true }
    ];
  }
  if (parentId === "flow-control") {
    return [
      { id: "slide-gate", name: "Slide Gate Plates", maxTemp: "1650°C", description: "High-precision alumina-carbon plates for controlled steel flow in ladle slide gate systems. Critical for clean steel production.", keyRanges: "Al₂O₃: 85-95% | Carbon: 5-12% | Bulk Density: 3.0-3.4 g/cc", idealFor: "Steel ladle flow control, BOF/EAF casting operations, long sequence casting", applications: "Ladle slide gates, Tundish gates, Flow control", popular: true, badge: "Critical for steel casting", hasGradeTable: true },
      { id: "shroud", name: "Ladle Shrouds", maxTemp: "1600°C", description: "Protective tubes preventing steel stream reoxidation during ladle-to-tundish transfer. Essential for clean steel production.", keyRanges: "Al₂O₃: 70-85% | Anti-clogging designs | Bulk Density: 2.8-3.2 g/cc", idealFor: "Continuous casting, clean steel production, reoxidation prevention, quality steel grades", applications: "Ladle-to-tundish transfer, Clean steel casting", popular: false, badge: "", hasGradeTable: true },
      { id: "sen", name: "Subentry Nozzles (SEN)", maxTemp: "1600°C", description: "Immersion nozzles for controlled steel flow from tundish to mold with optimized port design for uniform flow distribution.", keyRanges: "Al₂O₃: 75-90% | Various port configurations | Anti-clogging technology", idealFor: "Continuous casting molds, slab/billet/bloom casting, high-speed casting", applications: "Slab casting, Billet casting, Bloom casting", popular: false, badge: "", hasGradeTable: true },
      { id: "stopper", name: "Monoblock Stoppers", maxTemp: "1650°C", description: "One-piece stopper rods for ladle flow control with integrated nose design. Long campaign life and excellent sealing.", keyRanges: "Al₂O₃: 80-95% | Integrated design | Bulk Density: 3.0-3.4 g/cc", idealFor: "Ladle flow control, stopper-nozzle systems, precise flow regulation", applications: "Ladle stoppers, Flow regulation", popular: false, badge: "", hasGradeTable: true },
      { id: "tundish", name: "Tundish Nozzles & Well Blocks", maxTemp: "1600°C", description: "Nozzles and seating blocks for tundish-to-mold steel transfer in continuous casting. Erosion resistant with consistent bore.", keyRanges: "Al₂O₃: 70-90% | Erosion resistant | Consistent bore design", idealFor: "Continuous casting tundish, multi-strand operations, high-throughput casting", applications: "Tundish bottom, Nozzle seating, Multi-strand", popular: false, badge: "", hasGradeTable: true }
    ];
  }
  if (parentId === "insulation") {
    return [
      { id: "ceramic-fiber", name: "Ceramic Fiber Products", maxTemp: "1430°C", description: "Lightweight alumino-silicate fiber insulation available as blankets, modules, boards, and paper. Excellent thermal insulation with low thermal mass.", keyRanges: "Temperature grades: 1260°C, 1400°C, 1430°C | Density: 64-350 kg/m³ | Thermal Cond: 0.08-0.15 W/mK", idealFor: "Furnace hot face, expansion joints, backup insulation, kiln car tops, heat shields", applications: "Furnace linings, Expansion joints, Backup, Heat shields", popular: true, badge: "Best for energy savings", hasGradeTable: true },
      { id: "calcium-silicate", name: "Calcium Silicate Boards", maxTemp: "1000°C", description: "Rigid structural insulation boards for backup linings and moderate temperature applications. Good compressive strength and moisture resistance.", keyRanges: "Temperature: Up to 1000°C | Density: 200-300 kg/m³ | Good compressive strength", idealFor: "Backup insulation, petrochemical, power plants, industrial ovens, pipe insulation", applications: "Backup layers, Pipe insulation, Equipment insulation", popular: false, badge: "", hasGradeTable: true },
      { id: "microporous", name: "Microporous Insulation", maxTemp: "1000°C", description: "Ultra-high performance insulation with the lowest thermal conductivity for space-constrained applications. Thin profile, maximum efficiency.", keyRanges: "Thermal conductivity: 0.020-0.025 W/mK | Density: 200-350 kg/m³ | Thin profile", idealFor: "Ladle covers, tundish lids, space-limited areas requiring maximum insulation", applications: "Ladle covers, Tundish lids, Space-limited areas", popular: false, badge: "Ultra-high performance", hasGradeTable: false }
    ];
  }
  if (parentId === "acid-proof") {
    return [
      { id: "acid-brick", name: "Acid Proof Bricks", maxTemp: "1000°C", description: "Dense, vitrified ceramic bricks with excellent resistance to acids and chemicals. Low porosity and high compressive strength.", keyRanges: "Acid resistance: >98% | Water absorption: <4% | High compressive strength", idealFor: "Chemical plant floors, acid tanks, reaction vessels, scrubbers, pickling tanks", applications: "Chemical tanks, Flooring, Reaction vessels, Pickling", popular: true, badge: "Industry standard", hasGradeTable: true },
      { id: "acid-tile", name: "Acid Resistant Tiles", maxTemp: "800°C", description: "Thin-format acid-resistant ceramics for flooring, wall linings, and drainage channels. Easy installation and maintenance.", keyRanges: "Acid resistance: >97% | Thickness: 10-30mm | Easy installation", idealFor: "Chemical plant flooring, drainage channels, wall protection, walkways", applications: "Flooring, Wall linings, Drainage, Walkways", popular: false, badge: "", hasGradeTable: false },
      { id: "carbon-brick", name: "Carbon Bricks", maxTemp: "500°C", description: "Carbon-based bricks for extreme chemical resistance in phosphoric acid and similar applications. Excellent thermal conductivity.", keyRanges: "Carbon content: >98% | Excellent thermal conductivity | Self-lubricating", idealFor: "Phosphoric acid plants, chemical reactors, extreme corrosive environments", applications: "Phosphoric acid, Chemical reactors, Extreme corrosion", popular: false, badge: "", hasGradeTable: false }
    ];
  }
  return [];
}

// Grade tables for each sub-family
function getGradeTable(subFamilyId) {
  if (subFamilyId === "high-alumina") {
    return {
      title: "High Alumina Brick Grades",
      columns: ["Grade", "Al₂O₃ %", "Bulk Density", "Porosity %", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["HA-45", "45-50", "2.30 g/cc", "22-24", "35-40", "1500", "General high-temp linings, backup"],
        ["HA-55", "53-58", "2.35 g/cc", "20-22", "45-50", "1550", "Blast furnace stoves, hot blast"],
        ["HA-60", "58-62", "2.40 g/cc", "18-20", "50-60", "1600", "Ladle backup, cement kilns"],
        ["HA-70", "68-72", "2.55 g/cc", "16-18", "60-70", "1650", "Steel ladles, EAF, tundish"],
        ["HA-80", "78-82", "2.70 g/cc", "14-16", "70-85", "1700", "Premium ladle lining, critical areas"],
        ["HA-85", "83-87", "2.80 g/cc", "13-15", "80-100", "1720", "High-wear zones, slag lines"],
        ["HA-90", "88-92", "2.90 g/cc", "12-14", "90-120", "1750", "Critical high-wear, extreme conditions"]
      ]
    };
  }
  if (subFamilyId === "fireclay") {
    return {
      title: "Fireclay Brick Grades",
      columns: ["Grade", "Al₂O₃ %", "Bulk Density", "Porosity %", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["FC-28", "26-30", "1.95 g/cc", "24-28", "12-18", "1250", "Low-duty backup, insulation"],
        ["FC-32", "30-34", "2.00 g/cc", "22-26", "15-20", "1300", "General backup linings"],
        ["FC-36", "34-38", "2.05 g/cc", "20-24", "18-25", "1350", "Boilers, general furnaces"],
        ["FC-40", "38-42", "2.10 g/cc", "18-22", "22-28", "1400", "Higher duty, chimneys"],
        ["FC-45", "43-47", "2.15 g/cc", "16-20", "28-35", "1450", "Maximum fireclay performance"]
      ]
    };
  }
  if (subFamilyId === "ifb") {
    return {
      title: "Insulating Fire Brick (IFB) Grades",
      columns: ["Grade", "Max Temp °C", "Bulk Density", "Thermal Cond.", "CCS (MPa)", "Typical Applications"],
      rows: [
        ["IFB-20", "1100", "0.50 g/cc", "0.12 W/mK", "0.6", "Low-temp backup insulation"],
        ["IFB-23", "1260", "0.60 g/cc", "0.15 W/mK", "1.0", "General backup insulation"],
        ["IFB-26", "1400", "0.80 g/cc", "0.20 W/mK", "1.5", "Furnace backup, kiln cars"],
        ["IFB-28", "1480", "1.00 g/cc", "0.28 W/mK", "2.5", "Hot face insulation"],
        ["IFB-30", "1540", "1.20 g/cc", "0.32 W/mK", "3.5", "High duty insulation"],
        ["IFB-32", "1600", "1.30 g/cc", "0.35 W/mK", "4.0", "Maximum temperature IFB"]
      ]
    };
  }
  if (subFamilyId === "basic") {
    return {
      title: "Basic Brick Grades (Magnesia & MgO-C)",
      columns: ["Type", "MgO %", "Carbon %", "Bulk Density", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["Magnesia 90", "88-92", "-", "2.90 g/cc", "45-55", "1800", "Cement kilns, converters"],
        ["Magnesia 95", "93-96", "-", "2.95 g/cc", "50-60", "1820", "Premium cement burning zone"],
        ["Mag-Chrome", "55-65", "-", "3.10 g/cc", "35-45", "1750", "Cement transition zones"],
        ["Mag-Spinel", "85-90", "-", "2.95 g/cc", "45-55", "1780", "Chrome-free cement kilns"],
        ["MgO-C 10%", "75-85", "8-12", "2.85 g/cc", "25-35", "1700", "BOF, EAF slag lines"],
        ["MgO-C 14%", "70-80", "12-16", "2.80 g/cc", "22-30", "1680", "Ladle slag zones"],
        ["MgO-C 18%", "65-75", "16-20", "2.75 g/cc", "20-28", "1650", "High thermal shock areas"]
      ]
    };
  }
  if (subFamilyId === "special") {
    return {
      title: "Special Shaped Brick Grades",
      columns: ["Type", "Key Chemistry", "Bulk Density", "Max Temp °C", "Typical Applications"],
      rows: [
        ["Mullite", "60-75% Al₂O₃", "2.40 g/cc", "1700", "Hot blast stoves, ceramic kilns"],
        ["Andalusite", "55-62% Al₂O₃", "2.50 g/cc", "1650", "Rotary kilns, incinerators"],
        ["Zircon", "65% ZrSiO₄", "3.60 g/cc", "1650", "Glass contact, slag lines"],
        ["Silicon Carbide", "80-90% SiC", "2.60 g/cc", "1650", "Aluminum, zinc, incinerators"],
        ["Fused Cast AZS", "50-60% Al₂O₃", "3.80 g/cc", "1700", "Glass melting tanks"]
      ]
    };
  }
  if (subFamilyId === "lcc") {
    return {
      title: "Low Cement Castable (LCC) Grades",
      columns: ["Grade", "Al₂O₃ %", "Bulk Density", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["LCC-50", "48-52", "2.55 g/cc", "60-70", "1500", "General steel applications"],
        ["LCC-60", "58-62", "2.65 g/cc", "75-85", "1550", "Ladle backup, tundish"],
        ["LCC-70", "68-72", "2.75 g/cc", "85-100", "1600", "Ladle working lining"],
        ["LCC-80", "78-82", "2.85 g/cc", "100-120", "1650", "Premium ladle, critical areas"],
        ["LCC-85", "83-87", "2.90 g/cc", "110-130", "1680", "High-wear zones"],
        ["LCC-90", "88-92", "2.95 g/cc", "120-140", "1700", "Extreme conditions"]
      ]
    };
  }
  if (subFamilyId === "ulcc") {
    return {
      title: "Ultra Low Cement Castable (ULCC) Grades",
      columns: ["Grade", "Al₂O₃ %", "Bulk Density", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["ULCC-70", "68-72", "2.80 g/cc", "100-120", "1650", "High performance ladles"],
        ["ULCC-80", "78-82", "2.90 g/cc", "120-140", "1700", "Slag line applications"],
        ["ULCC-85", "83-87", "2.95 g/cc", "130-150", "1730", "Premium critical areas"],
        ["ULCC-90", "88-92", "3.00 g/cc", "140-160", "1750", "Extreme conditions"],
        ["ULCC-95", "93-96", "3.05 g/cc", "150-180", "1780", "Maximum performance"]
      ]
    };
  }
  if (subFamilyId === "conventional") {
    return {
      title: "Conventional Castable Grades",
      columns: ["Grade", "Al₂O₃ %", "Bulk Density", "CCS (MPa)", "Max Temp °C", "Typical Applications"],
      rows: [
        ["CC-40", "38-42", "2.20 g/cc", "30-40", "1350", "Low-duty backup"],
        ["CC-50", "48-52", "2.30 g/cc", "40-50", "1400", "General applications"],
        ["CC-60", "58-62", "2.40 g/cc", "50-60", "1450", "Medium-duty linings"],
        ["CC-70", "68-72", "2.50 g/cc", "55-70", "1500", "Higher performance"]
      ]
    };
  }
  if (subFamilyId === "ramming") {
    return {
      title: "Ramming Mass Grades",
      columns: ["Type", "Key Chemistry", "Sintered Density", "Max Temp °C", "Typical Applications"],
      rows: [
        ["Silica Ramming", "95%+ SiO₂", "1.85 g/cc", "1650", "Acidic melts, cast iron"],
        ["Alumina Ramming", "85-95% Al₂O₃", "3.00 g/cc", "1750", "Steel, non-ferrous"],
        ["Magnesia Ramming", "90%+ MgO", "2.90 g/cc", "1800", "Basic melts, alloy steel"],
        ["Spinel Ramming", "70% Al₂O₃/MgO", "2.95 g/cc", "1750", "Clean steel, special alloys"]
      ]
    };
  }
  if (subFamilyId === "gunning") {
    return {
      title: "Gunning Material Grades",
      columns: ["Type", "Al₂O₃ %", "Application", "Max Temp °C", "Typical Uses"],
      rows: [
        ["Wet Gunning 60", "58-62", "Wet gun", "1500", "General repairs"],
        ["Wet Gunning 70", "68-72", "Wet gun", "1600", "Ladle repairs"],
        ["Dry Gunning 70", "68-72", "Dry gun", "1600", "Hot repairs"],
        ["Shotcrete 80", "78-82", "Shotcrete", "1650", "New construction"]
      ]
    };
  }
  if (subFamilyId === "slide-gate") {
    return {
      title: "Slide Gate Plate Grades",
      columns: ["Type", "Al₂O₃ %", "Carbon %", "Bulk Density", "Typical Applications"],
      rows: [
        ["Al₂O₃-C Standard", "85-88", "5-8", "3.10 g/cc", "Standard steel grades"],
        ["Al₂O₃-C Premium", "90-93", "5-8", "3.20 g/cc", "Clean steel, long sequence"],
        ["Al₂O₃-ZrO₂-C", "70-75 + ZrO₂", "8-12", "3.30 g/cc", "Calcium treated steel"],
        ["MgO-C", "MgO 75-85", "12-18", "2.90 g/cc", "High slag conditions"]
      ]
    };
  }
  if (subFamilyId === "shroud") {
    return {
      title: "Ladle Shroud Grades",
      columns: ["Type", "Al₂O₃ %", "Features", "Typical Applications"],
      rows: [
        ["Standard", "70-75", "Basic protection", "General casting"],
        ["Anti-Clog", "75-80", "Anti-clogging design", "Ca-treated steel"],
        ["Isopress", "80-85", "Isostatically pressed", "Clean steel, long life"],
        ["ZrO₂ Insert", "70-75 + ZrO₂", "Zirconia wear insert", "High throughput"]
      ]
    };
  }
  if (subFamilyId === "sen") {
    return {
      title: "Subentry Nozzle (SEN) Grades",
      columns: ["Type", "Al₂O₃ %", "Port Design", "Typical Applications"],
      rows: [
        ["Straight Bore", "75-80", "No ports", "Billet casting"],
        ["2-Port", "80-85", "2 side ports", "Slab casting"],
        ["4-Port", "80-85", "4 side ports", "Wide slab"],
        ["Anti-Clog", "75-80 + ZrO₂", "Special design", "Ca-treated steel"]
      ]
    };
  }
  if (subFamilyId === "stopper") {
    return {
      title: "Monoblock Stopper Grades",
      columns: ["Type", "Al₂O₃ %", "Features", "Typical Applications"],
      rows: [
        ["Standard", "80-85", "Basic design", "General use"],
        ["Premium", "88-92", "Enhanced life", "Long campaigns"],
        ["MgO-C Nose", "Al₂O₃ body + MgO-C", "Composite", "Slag contact"]
      ]
    };
  }
  if (subFamilyId === "tundish") {
    return {
      title: "Tundish Nozzle & Well Block Grades",
      columns: ["Type", "Al₂O₃ %", "Features", "Typical Applications"],
      rows: [
        ["Standard Nozzle", "70-75", "Basic", "General casting"],
        ["Metering Nozzle", "80-85", "Precision bore", "Controlled flow"],
        ["Well Block", "85-90", "High erosion resistance", "Nozzle seating"],
        ["Composite", "ZrO₂ insert", "Extended life", "High throughput"]
      ]
    };
  }
  if (subFamilyId === "ceramic-fiber") {
    return {
      title: "Ceramic Fiber Product Grades",
      columns: ["Type", "Max Temp °C", "Density", "Thermal Cond.", "Form", "Applications"],
      rows: [
        ["Standard Blanket", "1260", "96-128 kg/m³", "0.08 W/mK", "Blanket", "General insulation"],
        ["HP Blanket", "1400", "96-128 kg/m³", "0.10 W/mK", "Blanket", "Higher temperature"],
        ["HZ Blanket", "1430", "96-128 kg/m³", "0.12 W/mK", "Blanket", "Maximum temperature"],
        ["Module", "1260-1430", "160-220 kg/m³", "Variable", "Module", "Fast installation"],
        ["Board", "1260-1430", "280-350 kg/m³", "0.12-0.15", "Board", "Rigid insulation"],
        ["Paper", "1260", "180-220 kg/m³", "0.08 W/mK", "Paper/Felt", "Gaskets, wrapping"]
      ]
    };
  }
  if (subFamilyId === "calcium-silicate") {
    return {
      title: "Calcium Silicate Board Grades",
      columns: ["Type", "Max Temp °C", "Density", "Thermal Cond.", "Applications"],
      rows: [
        ["CS-650", "650", "220 kg/m³", "0.07 W/mK", "Low-temp backup"],
        ["CS-850", "850", "250 kg/m³", "0.09 W/mK", "Medium-temp"],
        ["CS-1000", "1000", "280 kg/m³", "0.11 W/mK", "High-temp backup"]
      ]
    };
  }
  if (subFamilyId === "acid-brick") {
    return {
      title: "Acid Proof Brick Grades",
      columns: ["Type", "Acid Resistance", "Water Absorption", "Applications"],
      rows: [
        ["Standard AP", ">97%", "<5%", "General acid tanks"],
        ["Premium AP", ">98%", "<3%", "Concentrated acids"],
        ["Carbon Filled", ">98%", "<2%", "HF acid, extreme"]
      ]
    };
  }
  return null;
}

// Temperature filter options  
function getTempFilters() {
  return [
    { id: "all", label: "All Temperatures" },
    { id: "1400", label: "Up to 1400°C" },
    { id: "1600", label: "1400-1600°C" },
    { id: "1750", label: "1600-1750°C" },
    { id: "1800", label: "1750°C+" }
  ];
}

export { getProductFamilies, getSubFamilies, getGradeTable, getTempFilters };
