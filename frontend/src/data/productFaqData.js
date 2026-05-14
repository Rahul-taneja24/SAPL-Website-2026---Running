/**
 * Product FAQ + structured spec data for server-side schema injection.
 * Keyed by `${categorySlug}/${productId}` — used by /products/[cat]/[id]/page.jsx
 * to emit FAQPage JSON-LD and enriched Product schema (additionalProperty list).
 *
 * FAQ answers are kept in the 40-60 word "featured snippet" range.
 */

export const PRODUCT_FAQ_DATA = {
  "shaped-refractories/high-alumina-bricks": {
    summary:
      "High alumina bricks (45–90% Al₂O₃) are fired refractory bricks for steel ladles, cement kilns, blast furnaces and glass tank checkers. Six standard grades — HA-45 to HA-90 — cover service temperatures from 1550°C to 1850°C. Authorised CUMI, Calderys, TRL Krosaki and IFGL supply from Shanker Agencies.",
    properties: [
      { name: "Al₂O₃ Content", value: "45–90%" },
      { name: "Maximum Service Temperature", value: "1850°C" },
      { name: "Bulk Density", value: "2.2–3.1 g/cc" },
      { name: "Cold Crushing Strength (CCS)", value: "40–70 MPa" },
      { name: "Apparent Porosity (AP)", value: "14–26%" },
      { name: "Refractoriness (PCE)", value: "SK 33 – SK 38" },
      { name: "Fe₂O₃ Content", value: "1.0–2.5%" },
      { name: "Standard", value: "IS 8 / ASTM C-27" },
    ],
    faqs: [
      {
        q: "What is the difference between HA-70 and HA-80 high alumina bricks?",
        a: "HA-70 contains 68–72% Al₂O₃ and is rated to 1750°C with 55 MPa CCS, while HA-80 contains 78–82% Al₂O₃ and is rated to 1800°C with 60 MPa CCS. HA-80 offers better slag resistance and higher hot strength, making it preferred for steel ladle working linings.",
      },
      {
        q: "Which high alumina grade is best for cement rotary kilns?",
        a: "HA-70 to HA-80 high alumina bricks are typically used in the cement kiln safety, transition and outlet zones. The burning zone itself uses magnesia spinel basic bricks. HA-70 is most common for upper transition zones because it balances thermal shock resistance with alkali attack resistance.",
      },
      {
        q: "Are high alumina bricks suitable for induction furnaces?",
        a: "No. Induction furnaces are lined with silica, alumina or magnesia ramming mass — not bricks — because the lining must sinter in situ. High alumina bricks are used for steel ladles, blast furnaces, and cement kilns where pre-formed shapes are required.",
      },
      {
        q: "What is the typical service life of high alumina bricks in steel ladles?",
        a: "Working life depends on grade, slag chemistry and operating temperature. HA-80 bricks in steel ladle barrel zones typically last 80–120 heats. HA-90 bricks in slag-line and metal-line zones last 60–90 heats. Lower grades (HA-45 to HA-60) are used as backup linings.",
      },
      {
        q: "What is the dry-out schedule for high alumina brick lining?",
        a: "Heat at 20°C/hr from ambient to 110°C and hold for 12 hours to remove free moisture. Then raise at 30°C/hr to 600°C and hold 8 hours. Finally raise at 50°C/hr to operating temperature. Always follow the OEM dry-out curve provided with the supply.",
      },
      {
        q: "Does Shanker Agencies supply high alumina bricks across India?",
        a: "Yes. Shanker Agencies Pvt. Ltd. supplies CUMI, Calderys, TRL Krosaki and IFGL high alumina bricks pan-India from Delhi warehouse, with export supply to GCC and ASEAN. Same-day dispatch is available for quantities up to 5 MT.",
      },
    ],
  },

  "shaped-refractories/fireclay-bricks": {
    summary:
      "Fireclay bricks (25–45% Al₂O₃) are economical refractory bricks for backup linings, boiler settings and general furnaces up to 1400°C. IS 8 compliant grades include STD-30, STD-40, HFK-28, HFK-32 and HFK-36. Supplied across India by Shanker Agencies — authorised CUMI and Calderys dealer.",
    properties: [
      { name: "Al₂O₃ Content", value: "25–45%" },
      { name: "Maximum Service Temperature", value: "1400°C" },
      { name: "Bulk Density", value: "1.8–2.1 g/cc" },
      { name: "Cold Crushing Strength (CCS)", value: "20–35 MPa" },
      { name: "Apparent Porosity (AP)", value: "20–28%" },
      { name: "Fe₂O₃ Content", value: "2.0–2.5%" },
      { name: "Standard", value: "IS 8" },
    ],
    faqs: [
      {
        q: "What is the maximum service temperature of fireclay bricks?",
        a: "Standard fireclay bricks have a maximum service temperature of 1400°C. STD-40 grade reaches 1400°C, while STD-30 is rated to 1300°C. Above 1400°C, high alumina or basic refractory bricks are recommended. Fireclay bricks are most commonly used between 800°C and 1300°C.",
      },
      {
        q: "What is the difference between fireclay bricks and high alumina bricks?",
        a: "Fireclay bricks contain 25–45% Al₂O₃ and are rated to 1400°C, while high alumina bricks contain 45–90% Al₂O₃ and are rated to 1850°C. Fireclay is more economical for backup linings and general furnaces; high alumina is required for steel ladle, cement kiln and blast furnace working linings.",
      },
      {
        q: "Are fireclay bricks IS 8 compliant?",
        a: "Yes. Shanker Agencies supplies fireclay bricks compliant with IS 8 (Bureau of Indian Standards specification for refractory fireclay bricks). Test reports cover Al₂O₃ content, apparent porosity, cold crushing strength, refractoriness and modulus of rupture at the requested grade.",
      },
      {
        q: "Can fireclay bricks be used in boiler furnaces?",
        a: "Yes. Fireclay bricks are widely used for boiler back walls, settings and refractory linings up to 1300°C. STD-40 grade is preferred for boiler furnaces in coal-fired power plants and industrial boilers because of its higher CCS (35 MPa) and better thermal shock resistance.",
      },
      {
        q: "What mortar should be used for laying fireclay bricks?",
        a: "Use fireclay mortar of matching Al₂O₃ composition. For STD-30 bricks use 30% Al₂O₃ mortar; for STD-40 bricks use 40% Al₂O₃ mortar. Joint thickness should be 2–4 mm. Heat-setting mortars require dry-out before service; air-setting mortars are ready after curing.",
      },
      {
        q: "What is the typical price range for fireclay bricks in India?",
        a: "Fireclay brick prices in India typically range from ₹18 to ₹35 per brick (230×114×76 mm standard size), depending on grade, brand and quantity. Bulk discounts apply above 5 MT. Contact Shanker Agencies on +91-11-23867575 for current pricing and same-day dispatch from Delhi.",
      },
    ],
  },

  "shaped-refractories/insulating-fire-bricks": {
    summary:
      "Insulating fire bricks (IFB) are lightweight refractory bricks with bulk density 0.5–1.1 g/cc and thermal conductivity 0.15–0.35 W/mK. Grades IFB-23 to IFB-32 serve as backup insulation behind dense working linings, cutting furnace shell temperature 60–80°C and energy use 30–50%.",
    properties: [
      { name: "Maximum Service Temperature", value: "1260–1650°C" },
      { name: "Bulk Density", value: "0.5–1.1 g/cc" },
      { name: "Thermal Conductivity", value: "0.15–0.35 W/mK" },
      { name: "Cold Crushing Strength (CCS)", value: "1.0–5.0 MPa" },
      { name: "Energy Saving vs Dense Brick", value: "30–50%" },
      { name: "Weight Reduction vs Dense Brick", value: "50–75%" },
      { name: "Standard", value: "ASTM C-155 Group 23–32" },
    ],
    faqs: [
      {
        q: "What is the difference between IFB-23, IFB-26 and IFB-30?",
        a: "The number indicates the classification temperature in hundreds of °F. IFB-23 is rated to 1260°C (2300°F) with 0.50 g/cc density; IFB-26 to 1430°C (2600°F) with 0.75 g/cc; IFB-30 to 1600°C (3000°F) with 1.00 g/cc. Higher grades offer higher service temperature and CCS.",
      },
      {
        q: "Can IFB bricks be used as a working lining?",
        a: "No. IFB bricks must always sit behind a dense working lining — never in direct contact with liquid metal, slag or flame impingement. Their low crushing strength (1–5 MPa) and high porosity make them unsuitable for direct exposure. They serve as backup insulation only.",
      },
      {
        q: "How much energy can IFB save in a furnace?",
        a: "Replacing a portion of dense backup brick with IFB typically cuts furnace energy consumption by 30–50% and reduces shell temperature by 60–80°C. The exact saving depends on furnace size, operating temperature and the IFB grade selected. Shanker Agencies engineers can calculate your specific saving.",
      },
      {
        q: "What is the standard size of IFB bricks?",
        a: "Standard IFB size is 230 × 114 × 76 mm (9 × 4.5 × 3 inch) — the same as dense brick. Custom sizes including arches, wedges, splits and tapered shapes are available on request. Machinable boards and panels are also available for irregular geometries.",
      },
      {
        q: "Which mortar is used for laying IFB bricks?",
        a: "Use lightweight insulating mortar or colloidal-silica-bonded mortar of matching service temperature. Standard dense fireclay mortar is unsuitable because it creates a high-conductivity bridge that defeats the insulation. Joint thickness should be 2–3 mm.",
      },
      {
        q: "Is Divine Cerawool authorised IFB supply available from SAPL?",
        a: "Yes. Shanker Agencies is an authorised Divine Cerawool dealer and supplies the full IFB range (Grade 23 to Grade 32). Bulk supply is available pan-India from Delhi warehouse with technical support for backup lining design and dry-out schedule.",
      },
    ],
  },

  "shaped-refractories/basic-bricks": {
    summary:
      "Basic refractory bricks — magnesite, MgO-chrome, magnesia spinel and MgO-C — resist basic slags in steel converters (BOF), electric arc furnaces (EAF), cement rotary kilns and copper smelters. Service temperatures reach 1800°C. TRL Krosaki authorised supply from Shanker Agencies.",
    properties: [
      { name: "MgO Content", value: "76–95%" },
      { name: "Maximum Service Temperature", value: "1800°C" },
      { name: "Bulk Density", value: "2.9–3.3 g/cc" },
      { name: "Cold Crushing Strength (CCS)", value: "40–80 MPa" },
      { name: "Apparent Porosity (AP)", value: "14–20%" },
      { name: "Slag Resistance", value: "Excellent (basic slags)" },
    ],
    faqs: [
      {
        q: "What are basic refractory bricks made of?",
        a: "Basic refractory bricks are made primarily of magnesium oxide (MgO) with additions of chrome ore (MgO-Cr), spinel (MgAl₂O₄) or graphite carbon (MgO-C). They resist basic slags rich in CaO and FeO — slags that would attack acid (silica) or neutral (alumina) refractories.",
      },
      {
        q: "Which basic brick is best for cement rotary kiln burning zone?",
        a: "Magnesia spinel bricks are preferred for the cement kiln burning zone today because they are chrome-free, form a stable kiln coating, and resist thermal shock from co-processed alternative fuels. MgO-Cr bricks remain in use for some clinkering zones but are being phased out due to Cr⁶⁺ environmental concerns.",
      },
      {
        q: "What is the difference between MgO-Chrome and Magnesia Spinel bricks?",
        a: "MgO-Chrome bricks contain chrome ore for slag resistance but release toxic hexavalent chromium when used at high temperature. Magnesia spinel bricks (MgO + MgAl₂O₄) deliver similar thermal performance, are chrome-free, and form stable cement coatings — making them the current industry standard for cement kilns.",
      },
      {
        q: "Where are MgO-C bricks used in steel making?",
        a: "MgO-C (magnesia carbon) bricks are used in BOF (basic oxygen furnace) and EAF (electric arc furnace) hot zones, steel ladle slag lines, and converter trunnions. The carbon content (5–20%) provides exceptional thermal shock resistance and non-wetting behaviour against basic steel slags.",
      },
      {
        q: "Are TRL Krosaki basic bricks available in India?",
        a: "Yes. Shanker Agencies is a TRL Krosaki supply partner and stocks the full basic brick range — magnesite, MgO-Chrome, magnesia spinel and MgO-C — for steel, cement and copper sector customers. Bulk supply with installation guidance is available pan-India.",
      },
    ],
  },

  "shaped-refractories/silicon-carbide-bricks": {
    summary:
      "Silicon carbide (SiC) refractory bricks combine high thermal conductivity (15–20 W/mK) with extreme hardness and erosion resistance. Used in zinc smelters, aluminium melters, waste incinerators and non-ferrous foundries up to 1650°C. TRL Krosaki authorised supply.",
    properties: [
      { name: "SiC Content", value: "75–95%" },
      { name: "Maximum Service Temperature", value: "1650°C" },
      { name: "Bulk Density", value: "2.5–2.8 g/cc" },
      { name: "Thermal Conductivity", value: "15–20 W/mK" },
      { name: "Cold Crushing Strength (CCS)", value: "80–150 MPa" },
      { name: "Apparent Porosity (AP)", value: "12–18%" },
    ],
    faqs: [
      {
        q: "Why are silicon carbide bricks used in zinc smelters?",
        a: "Silicon carbide bricks resist attack by molten zinc and zinc vapour, deliver high thermal conductivity for efficient heat transfer, and survive thermal cycling without spalling. They are standard in zinc retort condensers, ISP shaft furnaces and zinc melting holding pots where alumina and basic bricks fail rapidly.",
      },
      {
        q: "Are silicon carbide bricks suitable for incinerators?",
        a: "Yes. SiC bricks are widely used in waste incinerators, hazardous waste burners and biomass combustion furnaces because they resist chemical attack from chlorides, sulphates and alkali vapours. They also withstand the high abrasion of moving waste streams in rotary kiln incinerators.",
      },
      {
        q: "What is the thermal conductivity of silicon carbide bricks?",
        a: "SiC bricks have thermal conductivity of 15–20 W/mK — roughly 10x higher than dense alumina bricks. This makes them ideal where rapid heat transfer is required (kiln furniture, muffle linings, heat exchangers) but unsuitable where insulation is the primary requirement.",
      },
      {
        q: "Can silicon carbide bricks handle oxidising atmospheres?",
        a: "Standard SiC bricks oxidise above 1400°C in air, forming a passive SiO₂ layer. For sustained high-temperature oxidising service, oxide-bonded or self-bonded SiC grades are used. Nitride-bonded SiC is preferred for aluminium contact applications because it resists wetting.",
      },
      {
        q: "What aluminium applications use silicon carbide refractories?",
        a: "Nitride-bonded SiC bricks line aluminium holding furnaces, transfer ladles and melting furnace sidewalls. Their non-wetting behaviour prevents corundum (Al₂O₃) build-up on the lining face, extending campaign life and reducing dross formation in the molten aluminium pool.",
      },
    ],
  },

  "unshaped-refractories/low-cement-castables": {
    summary:
      "Low cement castable (LCC) with 60–90% Al₂O₃ and 4–8% CaO content is the workhorse monolithic refractory for steel ladle working linings, tundish covers and torpedo cars. CUMI authorised supply with installation guidance from Shanker Agencies.",
    properties: [
      { name: "Al₂O₃ Content", value: "60–90%" },
      { name: "CaO Content", value: "4–8%" },
      { name: "Maximum Service Temperature", value: "1600°C" },
      { name: "Bulk Density (after firing)", value: "2.7–3.0 g/cc" },
      { name: "Cold Crushing Strength (CCS) at 110°C", value: "60–90 MPa" },
      { name: "Hot Modulus of Rupture at 1400°C", value: "8–15 MPa" },
      { name: "Water Requirement", value: "5.5–7.5%" },
    ],
    faqs: [
      {
        q: "What is the difference between LCC, ULCC and conventional castable?",
        a: "Conventional castable has 15–30% CaO from high-alumina cement; LCC has 4–8% CaO; ULCC has under 1% CaO. Lower CaO means higher refractoriness, higher hot strength and lower porosity — but also longer dry-out time and higher cost. LCC is the practical balance for most steel applications.",
      },
      {
        q: "How much water is required for LCC mixing?",
        a: "LCC water requirement is typically 5.5–7.5% by weight, depending on aggregate, ambient temperature and installation method. Exceeding the OEM water limit lowers hot strength and increases porosity. Use clean potable water at 15–25°C and follow the supplier's mix design for vibration vs. self-flow grades.",
      },
      {
        q: "What is the dry-out schedule for low cement castable?",
        a: "Standard LCC dry-out: 25°C/hr from ambient to 110°C, hold 24 hours, then 25°C/hr to 350°C, hold 24 hours, then 50°C/hr to 600°C, hold 12 hours, finally 80°C/hr to operating temperature. Skipping the 110°C and 350°C holds risks explosive spalling from trapped water.",
      },
      {
        q: "Can LCC be used in steel ladle working lining?",
        a: "Yes. LCC with 80–90% Al₂O₃ is widely used as a steel ladle working lining material — particularly for barrel zones. Slag-line zones typically use higher-performance alumina-spinel or alumina-magnesia castables. Shanker Agencies stocks CUMI LCC grades matched to ladle service severity.",
      },
      {
        q: "What is the typical service life of LCC in a steel ladle?",
        a: "LCC barrel zones typically deliver 80–150 heats depending on grade, slag chemistry, ladle preheating practice and steel grade cast. CUMI Cumiflow series in 80–90% Al₂O₃ grade can reach 120+ heats with disciplined operating practice and proper installation.",
      },
      {
        q: "Is CUMI LCC the same as Calderys LCC?",
        a: "Both manufacturers produce LCC families but with different aggregate sources, bond systems and quality control. CUMI Cumiflow and Calderys Cast LCC have similar service profiles but differ in installation behaviour and hot strength curves. Shanker Agencies supplies both — selection depends on application.",
      },
    ],
  },

  "unshaped-refractories/ultra-low-cement-castables": {
    summary:
      "Ultra low cement castable (ULCC) contains under 1% CaO, delivering hot modulus of rupture up to 18 MPa at 1400°C and bulk density 2.8–3.1 g/cc. Used in extreme-wear zones of steel ladles, torpedo car impact pads and critical petrochemical heaters.",
    properties: [
      { name: "Al₂O₃ Content", value: "70–95%" },
      { name: "CaO Content", value: "Under 1%" },
      { name: "Maximum Service Temperature", value: "1700°C" },
      { name: "Bulk Density (after firing)", value: "2.8–3.1 g/cc" },
      { name: "Cold Crushing Strength (CCS) at 110°C", value: "70–100 MPa" },
      { name: "Hot Modulus of Rupture at 1400°C", value: "12–18 MPa" },
      { name: "Water Requirement", value: "4.5–5.5%" },
    ],
    faqs: [
      {
        q: "What is ultra low cement castable (ULCC)?",
        a: "Ultra low cement castable is a monolithic refractory with under 1% CaO content, replacing most of the calcium aluminate cement with microsilica or alumina sol binders. The low CaO content gives higher refractoriness, higher hot strength, and lower porosity than standard LCC.",
      },
      {
        q: "When should ULCC be used instead of LCC?",
        a: "Use ULCC for extreme service: torpedo car impact zones, steel ladle slag lines under aggressive ladle metallurgy, blast furnace tap-hole repair, and critical petrochemical heater linings. The 30% higher cost vs LCC is justified where service life or downtime cost dominates the lining decision.",
      },
      {
        q: "Why is ULCC dry-out longer than LCC?",
        a: "ULCC contains microsilica gel binders that release physically bound water above 200°C in addition to free water below 110°C. A conservative dry-out (25°C/hr with holds at 110°C, 250°C, 400°C and 600°C) is essential — rapid heating causes explosive spalling because the gel cannot vent water fast enough.",
      },
      {
        q: "What is the water requirement for ULCC?",
        a: "ULCC water requirement is 4.5–5.5% — lower than LCC because of optimised particle packing and microsilica binders. Exceeding the OEM water limit by even 0.5% can drop hot MOR by 30%. Use a calibrated batch mixer and graduated water measure, never visual estimation.",
      },
      {
        q: "Does Shanker Agencies supply CUMI ULCC across India?",
        a: "Yes. Shanker Agencies is an authorised CUMI dealer and supplies the Cumiflow ULCC range pan-India from Delhi. Technical support includes mix-water audit, dry-out schedule, and on-site installation guidance for steel ladle, torpedo car and critical petrochemical applications.",
      },
    ],
  },

  "unshaped-refractories/ramming-masses": {
    summary:
      "Ramming mass for induction furnace lining — silica (acidic), alumina (neutral) and magnesia (basic) grades — sinters in situ to form a monolithic lining. Selection depends on melt type: silica for iron/steel, alumina for steel/copper, magnesia for manganese steel. CUMI authorised supply.",
    properties: [
      { name: "Available Types", value: "Silica, Alumina, Magnesia" },
      { name: "SiO₂ Content (Silica grade)", value: "98.5%+ min" },
      { name: "Al₂O₃ Content (Alumina grade)", value: "85–95%" },
      { name: "MgO Content (Magnesia grade)", value: "90%+ min" },
      { name: "Maximum Service Temperature", value: "1650°C" },
      { name: "Bulk Density (after sintering)", value: "2.8–3.2 g/cc" },
      { name: "Boric Acid Binder (Silica grade)", value: "0.8–1.2%" },
    ],
    faqs: [
      {
        q: "Which ramming mass is best for iron melting in induction furnace?",
        a: "Silica ramming mass (98.5%+ SiO₂ with 0.8–1.2% boric acid binder) is the standard choice for cast iron and steel melting in coreless induction furnaces. It is economical, easy to install, and sinters cleanly under the first heat cycle to form a strong monolithic lining.",
      },
      {
        q: "When should alumina ramming mass be used?",
        a: "Alumina ramming mass (85–95% Al₂O₃) is used for steel grades that attack silica linings, copper melting, and applications where iron pickup from a silica lining is unacceptable. Alumina linings last longer but cost 2–3x more than silica ramming mass and require careful sintering.",
      },
      {
        q: "What is the sintering schedule for silica ramming mass?",
        a: "Standard silica ramming sintering: charge clean steel scrap, heat slowly to 800°C over 4 hours, hold 1 hour, then continue to 1450–1550°C and hold 2 hours. This forms the sintered hot face, transition zone and unsintered backup. Improper sintering causes early lining failure.",
      },
      {
        q: "How thick should an induction furnace ramming lining be?",
        a: "Lining thickness depends on furnace size: typically 75–100 mm for 250 kg–1 T furnaces, 100–150 mm for 1–5 T furnaces, and 150–200 mm for 5–15 T furnaces. The lining must include a sintered hot face (30–40% of thickness), transition zone and unsintered backup against the coil.",
      },
      {
        q: "Why does my induction furnace lining fail early?",
        a: "Common causes of early lining failure: wrong ramming mass type for the melt, poor compaction during installation, rushed sintering, mechanical erosion from oversized scrap, and slag chemistry attack. A lining audit by Shanker Agencies engineers can identify the specific failure mode.",
      },
      {
        q: "What is the difference between dry ramming mass and gunning mass?",
        a: "Dry ramming mass is installed at ambient temperature by mechanical compaction and sintered in service — used for new lining or full reline. Gunning mass is sprayed pneumatically with water onto a hot refractory surface — used for hot repairs and partial relining during normal operation.",
      },
    ],
  },

  "unshaped-refractories/gunning-materials": {
    summary:
      "Gunning mass (refractory gunning mix) is a fine-particle dry refractory sprayed pneumatically with water onto hot refractory surfaces for in-service hot repairs and lining maintenance. Grades include alumina, basic and silica-alumina. Authorised CUMI and Calderys supply.",
    properties: [
      { name: "Al₂O₃ Content (alumina grade)", value: "60–85%" },
      { name: "MgO Content (basic grade)", value: "85%+ min" },
      { name: "Maximum Service Temperature", value: "1600°C" },
      { name: "Bulk Density (after firing)", value: "2.4–2.8 g/cc" },
      { name: "Rebound Loss", value: "Under 15%" },
      { name: "Application", value: "Hot gunning at 200–800°C" },
    ],
    faqs: [
      {
        q: "What is gunning mass used for?",
        a: "Gunning mass is used for hot refractory repairs without taking the furnace out of service. Typical applications include EAF roof patching, ladle slag-line repair, BOF mouth ring repair, cement kiln coating repair, and rotary kiln lining maintenance during short shutdown windows.",
      },
      {
        q: "How is gunning mass applied?",
        a: "Gunning mass is conveyed pneumatically through a hose to a nozzle where water is added at the spray tip. The wet mix is sprayed onto the hot refractory surface (typically 200–800°C). Operator technique controls rebound loss and patch quality. Equipment is a rotary gunite machine.",
      },
      {
        q: "What is the rebound loss in refractory gunning?",
        a: "Rebound loss — material that bounces off the surface rather than sticking — typically ranges from 8–20%. Modern gunning masses with optimised particle distribution and bonding additives achieve under 15%. Skilled operators using correct nozzle distance and angle minimise rebound and improve patch density.",
      },
      {
        q: "Can gunning mass replace a full reline?",
        a: "No. Gunning is a maintenance technique that extends lining life — not a substitute for full reline. Hot gunning typically extends ladle, EAF and BOF campaigns by 10–30% between full relines. Heavy reliance on gunning indicates a lining design or operating practice problem that needs root-cause review.",
      },
      {
        q: "What is the difference between gunning mass and shotcrete?",
        a: "Gunning mass uses dry-shotcrete technique — water is added at the nozzle. Shotcrete (wet-process) is pre-mixed with water and pumped through a hose. Wet-process shotcrete delivers higher density and lower rebound but requires more equipment and shorter pot life. Gunning is preferred for narrow access hot repairs.",
      },
    ],
  },

  "flow-control/slide-gate-plates": {
    summary:
      "Slide gate plates control molten steel flow from ladle to tundish during continuous casting. Three main grades — Al₂O₃-C, Al₂O₃-ZrO₂-C and MgO-C — match steel chemistry and casting sequence length. IFGL authorised supply with anti-clogging design expertise.",
    properties: [
      { name: "Plate Materials", value: "Al₂O₃-C, Al₂O₃-ZrO₂-C, MgO-C" },
      { name: "Al₂O₃ Content", value: "85–95%" },
      { name: "Maximum Service Temperature", value: "1650°C" },
      { name: "Bulk Density", value: "3.0–3.4 g/cc" },
      { name: "Casting Sequence", value: "6–14 heats per plate" },
      { name: "Bore Diameter Range", value: "30–120 mm" },
    ],
    faqs: [
      {
        q: "How does a slide gate system control steel flow?",
        a: "A slide gate uses two or three refractory plates with aligned bores — fixed and moving — clamped under spring pressure. Hydraulic actuators slide the moving plate to open, throttle or close the bore, regulating steel flow from ladle to tundish without disrupting argon shrouding or temperature.",
      },
      {
        q: "What is the difference between Al₂O₃-C and Al₂O₃-ZrO₂-C slide gate plates?",
        a: "Al₂O₃-C plates use 85–90% Al₂O₃ with 5–10% carbon binder and are the workhorse for plain carbon and low-alloy steels. Al₂O₃-ZrO₂-C plates add 5–8% zirconia for improved erosion resistance — used for higher casting sequences, killed steel and aluminium-deoxidised heats prone to alumina build-up.",
      },
      {
        q: "When are MgO-C slide gate plates used?",
        a: "MgO-C slide gate plates are used for calcium-treated steels, high-manganese steels and stainless steel casting where calcium aluminates would attack Al₂O₃-C plates. MgO-C resists basic slag, calcium and manganese vapour attack but costs more and has lower thermal shock tolerance.",
      },
      {
        q: "How many heats can a slide gate plate handle?",
        a: "Sequence casting performance depends on plate grade, steel chemistry and operating practice. Plain Al₂O₃-C plates deliver 6–8 sequences. Al₂O₃-ZrO₂-C plates deliver 8–12 sequences with anti-clogging argon purging. Premium grades with integrated argon slots can exceed 14 sequences in clean-steel mills.",
      },
      {
        q: "What causes nozzle clogging in continuous casting?",
        a: "Nozzle clogging in aluminium-killed steels is caused by Al₂O₃ inclusions building up on the bore wall. Counter-measures include calcium treatment, argon purging through the plate, optimised plate refractory composition, and tundish flow modification. SAPL supplies anti-clogging IFGL plate designs.",
      },
    ],
  },

  "flow-control/ladle-shrouds": {
    summary:
      "Ladle shrouds protect the steel stream from atmospheric reoxidation during transfer from ladle to tundish. Manufactured from Al₂O₃-C with argon purging slots and gas-impermeable bore. IFGL authorised supply for continuous casting in steel plants.",
    properties: [
      { name: "Material", value: "Alumina Graphite (Al₂O₃-C)" },
      { name: "Al₂O₃ Content", value: "70–85%" },
      { name: "Maximum Service Temperature", value: "1600°C" },
      { name: "Bulk Density", value: "2.8–3.2 g/cc" },
      { name: "Length", value: "1.0–2.5 m custom" },
      { name: "Argon Purging", value: "Available with slot or porous ring" },
    ],
    faqs: [
      {
        q: "What is the purpose of a ladle shroud?",
        a: "The ladle shroud is a refractory tube that encloses the steel stream between the ladle collector nozzle and the tundish. It prevents atmospheric oxygen and nitrogen contact with the molten steel, eliminating reoxidation, inclusion pickup and nitrogen ingress that would degrade steel cleanliness in continuous casting.",
      },
      {
        q: "Why is argon purging used in ladle shrouds?",
        a: "Argon purging through a slot or porous ring at the shroud-collector joint provides a positive pressure gas seal. This prevents air aspiration even if the mechanical seal is imperfect. Argon also helps flotation of small inclusions and prevents shroud bore clogging from Al₂O₃ build-up.",
      },
      {
        q: "How long does a ladle shroud last?",
        a: "Ladle shroud campaign life depends on steel grade and casting sequence. Plain Al₂O₃-C shrouds deliver 4–8 heats. Advanced grades with anti-erosion coatings and gas-impermeable bores reach 10–14 heats. Shroud failure modes include thermal cracking, slag-line erosion and bore-end melting.",
      },
      {
        q: "What is the standard length of a ladle shroud?",
        a: "Standard ladle shroud lengths range from 1.0 m to 2.5 m depending on ladle-to-tundish geometry. Length is selected to keep the shroud bore tip 50–100 mm submerged in the tundish steel pool throughout casting — this prevents air entrainment from open-stream pour.",
      },
      {
        q: "Can ladle shrouds be reused?",
        a: "Reuse depends on plant practice. Many plants change shrouds every heat to ensure consistent steel cleanliness. High-performance shrouds with monitored argon purging may be reused for 4–8 heats. The decision balances refractory cost against cleanliness risk and inspection time.",
      },
    ],
  },

  "flow-control/subentry-nozzles": {
    summary:
      "Submerged entry nozzle (SEN) controls steel flow from tundish into the casting mould. Anti-clogging Al₂O₃-C and ZrO₂-C designs with argon purging and slag-line collars deliver consistent flow for slab, bloom and billet casting. IFGL authorised supply.",
    properties: [
      { name: "Main Material", value: "Alumina Graphite (Al₂O₃-C)" },
      { name: "Slag-Line Insert", value: "Zirconia Graphite (ZrO₂-C)" },
      { name: "Al₂O₃ Content", value: "75–90%" },
      { name: "Maximum Service Temperature", value: "1600°C" },
      { name: "Bulk Density", value: "2.9–3.3 g/cc" },
      { name: "Casting Sequence", value: "6–12 heats" },
    ],
    faqs: [
      {
        q: "What is the difference between an SEN and a ladle shroud?",
        a: "A ladle shroud connects ladle to tundish. An SEN (submerged entry nozzle) connects tundish to mould. Both prevent atmospheric exposure of the steel stream, but the SEN has additional duties: shaping mould flow, controlling meniscus turbulence, and resisting mould powder slag attack at the slag line.",
      },
      {
        q: "Why is a zirconia-graphite collar used at the SEN slag line?",
        a: "The mould slag (cast powder) is highly corrosive to alumina-graphite at the meniscus. A ZrO₂-C insert at the slag line resists chemical attack, extending SEN campaign life from 4–5 heats (without insert) to 8–12 heats. The collar is co-pressed and co-fired with the body.",
      },
      {
        q: "What is the bore profile of a typical slab caster SEN?",
        a: "Slab caster SENs typically have a closed-bottom design with two side ports — angled 15–25° downward — to direct flow toward the narrow-face mould walls. The port shape, angle and bore diameter are tuned to mould size, casting speed and electromagnetic stirring practice for each caster.",
      },
      {
        q: "How does SEN clogging affect casting quality?",
        a: "SEN clogging changes mould flow pattern, causes asymmetric meniscus level, increases mould powder entrainment, and can trigger sticker breakouts. Clogging is primarily caused by alumina build-up from aluminium-killed steels. Mitigation: calcium treatment, argon purging, optimised SEN refractory chemistry.",
      },
      {
        q: "Does Shanker Agencies supply custom SEN designs?",
        a: "Yes. As an IFGL authorised supplier, Shanker Agencies supplies custom SEN designs matched to specific caster geometry, casting speed and steel grade. CFD-validated port designs, anti-clogging compositions and slag-line collar options are available with technical support.",
      },
    ],
  },

  "flow-control/porous-plugs": {
    summary:
      "Porous purging plugs enable controlled argon injection into the steel ladle for stirring, inclusion flotation and temperature/composition homogenisation. Spinel and high-alumina grades available. Improves steel cleanliness and alloy yield.",
    properties: [
      { name: "Plug Materials", value: "Alumina Spinel, High Alumina" },
      { name: "Al₂O₃ Content", value: "85–95%" },
      { name: "Maximum Service Temperature", value: "1700°C" },
      { name: "Bulk Density", value: "2.9–3.3 g/cc" },
      { name: "Argon Flow Rate", value: "100–800 Nl/min" },
      { name: "Campaign Life", value: "40–80 heats" },
    ],
    faqs: [
      {
        q: "What is a porous purging plug used for?",
        a: "A porous purging plug is a permeable refractory installed in the steel ladle bottom that allows controlled argon gas injection into the molten steel. Gas stirring promotes inclusion flotation to the slag, homogenises steel temperature and composition, and improves alloy recovery during ladle metallurgy.",
      },
      {
        q: "What is the difference between slot plugs and porous plugs?",
        a: "Slot plugs have machined slots (typically 0.15–0.30 mm wide) for argon flow — more durable but less fine bubble distribution. True porous plugs use a fine-pore refractory matrix giving better bubble dispersion and stirring efficiency but lower mechanical robustness. Modern hybrid designs combine both.",
      },
      {
        q: "How long does a purging plug last?",
        a: "Plug campaign life depends on steel grade, stirring intensity, and slag chemistry. Typical service life is 40–80 heats. Failure modes include face erosion, joint failure with the well block, and infiltration by molten metal. Plug life should be monitored and the plug changed before metal breakthrough.",
      },
      {
        q: "How much argon flow is typical during ladle stirring?",
        a: "Argon flow rates depend on ladle size and stirring stage. Soft stirring for inclusion flotation: 50–150 Nl/min. Composition trim and alloy stirring: 150–400 Nl/min. Hard stirring for desulphurisation: 400–800 Nl/min. Excess flow causes slag eye exposure and reoxidation risk.",
      },
      {
        q: "Can a porous plug be replaced hot?",
        a: "Yes, with specialised tooling. Quick-change cassette designs allow plug replacement in under 30 minutes between heats. The well block (which houses the plug) is a longer-life component and is typically changed only during full ladle relining. Shanker Agencies supplies both cassette plugs and well blocks.",
      },
    ],
  },

  "insulation/ceramic-fiber-products": {
    summary:
      "Ceramic fiber blanket (64–128 kg/m³), module (160–220 kg/m³) and board (280–350 kg/m³) for furnace insulation. Service temperatures 1260°C–1430°C. Delivers 30–50% energy saving vs dense refractory linings. Divine Cerawool authorised supply.",
    properties: [
      { name: "Service Temperature Range", value: "1260°C, 1350°C, 1430°C grades" },
      { name: "Blanket Density", value: "64–128 kg/m³" },
      { name: "Module Density", value: "160–220 kg/m³" },
      { name: "Board Density", value: "280–350 kg/m³" },
      { name: "Thermal Conductivity at 800°C", value: "0.10–0.20 W/mK" },
      { name: "Al₂O₃-SiO₂ Composition", value: "45-50% Al₂O₃, 50-55% SiO₂" },
      { name: "Energy Saving vs Brick", value: "30–50%" },
    ],
    faqs: [
      {
        q: "What is the difference between ceramic fiber blanket, module and board?",
        a: "Blanket is flexible, low-density (64–128 kg/m³) — used for wrap insulation and back-up linings. Modules are pre-compressed blocks (160–220 kg/m³) — used for fast furnace wall and roof installation. Board is rigid (280–350 kg/m³) — used where insulation must be machined or self-supporting.",
      },
      {
        q: "What is the maximum service temperature of ceramic fiber?",
        a: "Three standard service-temperature grades: 1260°C (standard alumino-silicate), 1350°C (high-purity alumino-silicate) and 1430°C (zirconia-doped or polycrystalline). Continuous service should stay 50–100°C below the rated temperature to prevent crystallisation, shrinkage and embrittlement of the fibres.",
      },
      {
        q: "How much energy does ceramic fiber save vs brick lining?",
        a: "Replacing a dense refractory brick lining with ceramic fiber typically cuts heat loss by 30–50% because of fiber's lower thermal conductivity (0.10–0.20 W/mK at 800°C vs 1.0–1.5 W/mK for dense brick) and zero heat storage. Payback is typically 6–18 months for cyclic batch furnaces.",
      },
      {
        q: "Is ceramic fiber safe to handle?",
        a: "Ceramic fiber is classified as a potential respiratory irritant. Installers should wear NIOSH-approved respirators (P2/P3), safety glasses and long-sleeve clothing. After use at high temperature, fibers may crystallise to cristobalite — handle removed insulation as hazardous material per local rules.",
      },
      {
        q: "Can ceramic fiber be used in petrochemical heaters?",
        a: "Yes. Ceramic fiber blanket and module are widely used in ethylene crackers, steam reformers and primary reformers for cylindrical heater walls and roof linings. The low heat storage allows rapid start-up and shutdown. SAPL supplies Divine Cerawool grades engineered for petrochemical service.",
      },
      {
        q: "Does Shanker Agencies install ceramic fiber linings?",
        a: "Shanker Agencies is an authorised Divine Cerawool dealer and supplies the full ceramic fiber range with technical guidance for module sizing, anchor design and stagger pattern. Installation services are available through SAPL's network of certified refractory contractors across India.",
      },
    ],
  },

  "insulation/calcium-silicate": {
    summary:
      "Calcium silicate insulation board for petrochemical, power plant and industrial pipe insulation up to 1000°C. Non-combustible, moisture-resistant, high compressive strength. Standard thicknesses 25–100 mm. Divine Cerawool authorised supply.",
    properties: [
      { name: "Maximum Service Temperature", value: "1000°C" },
      { name: "Bulk Density", value: "200–300 kg/m³" },
      { name: "Thermal Conductivity at 200°C", value: "0.07 W/mK" },
      { name: "Compressive Strength", value: "0.4–1.0 MPa" },
      { name: "Flexural Strength", value: "0.3–0.6 MPa" },
      { name: "Standard Thickness", value: "25, 38, 50, 75, 100 mm" },
      { name: "Composition", value: "Hydrated calcium silicate + cellulose reinforcement" },
    ],
    faqs: [
      {
        q: "What is calcium silicate insulation used for?",
        a: "Calcium silicate insulation is used for high-temperature pipework, vessels and equipment in petrochemical refineries, power plants, fertiliser plants and oil & gas facilities. It is the standard insulation for steam piping (above 200°C), boiler casings, exhaust gas ducts and turbine casings.",
      },
      {
        q: "What is the maximum service temperature of calcium silicate?",
        a: "Standard calcium silicate insulation is rated to 650°C continuous service. High-temperature grades extend to 1000°C. Above 1000°C, ceramic fiber or other refractory insulation is required. Calcium silicate retains structural integrity through wet-dry cycles, unlike many fiber insulations.",
      },
      {
        q: "Is calcium silicate insulation asbestos-free?",
        a: "Yes. Modern calcium silicate insulation manufactured to ASTM C533 Type I (650°C) and Type II (815°C+) is fully asbestos-free, using cellulose fibre or polypropylene fibre reinforcement. SAPL supplies only asbestos-free grades. Older installations should be tested and removed under controlled abatement procedures.",
      },
      {
        q: "How does calcium silicate compare to mineral wool?",
        a: "Calcium silicate has higher compressive strength (0.4–1.0 MPa vs 0.05 MPa) and better moisture resistance than mineral wool, but is heavier and more expensive. For high-traffic industrial pipework where mechanical damage and moisture exposure are common, calcium silicate is preferred over mineral wool.",
      },
      {
        q: "What thickness of calcium silicate is required for a 350°C steam line?",
        a: "Insulation thickness depends on pipe diameter, ambient conditions and surface temperature target. Typical insulation thickness for a 350°C steam line ranges from 50 mm (small bore) to 100 mm (large bore) to keep surface temperature under 60°C. SAPL engineers can run a heat-loss calculation for your specific line.",
      },
    ],
  },

  "acid-proofing/acid-proof-bricks": {
    summary:
      "Acid proof bricks deliver 99%+ chemical resistance against sulphuric, hydrochloric, nitric and phosphoric acids. Low porosity (under 4%) and high compressive strength (above 80 MPa). Used in chemical plant flooring, acid storage tanks and pickling lines. Crown Ceramics authorised supply.",
    properties: [
      { name: "Acid Resistance", value: "99%+ to mineral acids" },
      { name: "Compressive Strength", value: "80–120 MPa" },
      { name: "Apparent Porosity", value: "Under 4%" },
      { name: "Water Absorption", value: "Under 1%" },
      { name: "Maximum Service Temperature", value: "1000°C" },
      { name: "Standard", value: "IS 4860 / ASTM C-279 Type I/II/III" },
    ],
    faqs: [
      {
        q: "Where are acid proof bricks used?",
        a: "Acid proof bricks are used in chemical plant flooring, acid storage tank linings, sulphuric acid plants, pickling lines, electroplating shops, fertiliser plants and laboratory drainage channels. Anywhere strong mineral acids, alkalies or organic solvents would attack standard concrete or refractory linings.",
      },
      {
        q: "What is the difference between acid proof brick and acid resistant tile?",
        a: "Acid proof bricks are 50–75 mm thick (standard brick size) — used for floor build-up, drainage channels and tank linings. Acid resistant tiles are 12–20 mm thick — used as the finished wear surface on top of a brick or concrete base. Both have similar chemistry and acid resistance.",
      },
      {
        q: "What mortar is used to lay acid proof bricks?",
        a: "Acid-resistant mortar is selected by exposure: potassium silicate mortar for sulphuric/hydrochloric acid; sulfur mortar for hydrofluoric acid; furan or epoxy resin mortar for organic solvents and mixed chemistry. Membrane liners (PVC, fibreglass) are installed beneath the brick to protect the concrete base.",
      },
      {
        q: "Are acid proof bricks IS 4860 compliant?",
        a: "Yes. Shanker Agencies supplies acid proof bricks compliant with IS 4860 (Indian Standard specification) and ASTM C-279 Type I, II and III. Test certificates cover acid absorption, water absorption, compressive strength and apparent porosity. Crown Ceramics grades are available in standard and custom sizes.",
      },
      {
        q: "Can acid proof bricks be used outdoors?",
        a: "Yes. Acid proof bricks resist freeze-thaw cycles, UV exposure and atmospheric weathering. They are used for outdoor chemical plant flooring, dyke walls, secondary containment and effluent treatment plants. Drainage and joint design are critical to long-term outdoor performance.",
      },
    ],
  },

  "acid-proofing/acid-resistant-tiles": {
    summary:
      "Acid resistant floor and wall tiles for chemical plant flooring, drainage channels and secondary containment. 12–20 mm thick, fully vitrified with under 0.5% water absorption. Complete installation system including membrane, mortar and grout from Crown Ceramics range.",
    properties: [
      { name: "Tile Thickness", value: "12, 15, 20, 25 mm" },
      { name: "Standard Size", value: "150×150, 200×200, 300×300 mm" },
      { name: "Water Absorption", value: "Under 0.5%" },
      { name: "Compressive Strength", value: "100–150 MPa" },
      { name: "Acid Resistance", value: "99%+ to mineral acids" },
      { name: "Standard", value: "IS 4457 / ASTM C-1027" },
    ],
    faqs: [
      {
        q: "What size acid resistant tiles are available?",
        a: "Standard acid resistant tile sizes are 150×150 mm, 200×200 mm and 300×300 mm with thicknesses of 12, 15, 20 and 25 mm. Custom sizes and special shapes (coves, bull-nose, drainage edges) are available on request. Anti-skid surface finish is supplied for wet process areas and walkways.",
      },
      {
        q: "What is the proper installation sequence for an acid-proof floor?",
        a: "Standard sequence: (1) prepare concrete base at correct fall, (2) install asphalt or PVC membrane liner, (3) lay acid proof bricks or tiles with acid-resistant mortar, (4) grout joints with matching acid-resistant grout, (5) cure mortar/grout per supplier schedule, (6) acid-wash and test the floor before service.",
      },
      {
        q: "Which mortar should I use under acid resistant tiles?",
        a: "Selection depends on exposure: potassium silicate mortar for sulphuric, nitric and hydrochloric acid; sulfur mortar for HF and concentrated acids; epoxy or furan mortar for organic chemistry and mixed exposures. SAPL engineers can match mortar chemistry to your plant's specific exposure profile.",
      },
      {
        q: "How long do acid resistant tile floors last?",
        a: "Properly designed and installed acid resistant tile floors deliver 15–25 years of service in moderate exposure (battery acid, pickling lines). In severe exposure (HF, concentrated H₂SO₄ above 200°C) life may be 5–10 years. Joint integrity and membrane condition determine long-term performance more than tile chemistry.",
      },
      {
        q: "Does Shanker Agencies supply a complete installation system?",
        a: "Yes. As Crown Ceramics authorised dealer, Shanker Agencies supplies the complete acid-proof floor system: membrane liner, acid-resistant mortar, tiles or bricks, grout, and joint sealants — all matched for chemical compatibility. Installation supervision is available through SAPL's certified contractor network.",
      },
    ],
  },
};

export function getProductFaqData(categorySlug, productId) {
  return PRODUCT_FAQ_DATA[`${categorySlug}/${productId}`];
}
