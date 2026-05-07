/**
 * Product-level FAQs — keyed by the productId used in the URL
 * (i.e. /products/[categorySlug]/[productId]).
 *
 * These FAQs are rendered both as visible HTML on each product detail page
 * and as schema.org FAQPage JSON-LD for Google rich results, AI Overviews,
 * Perplexity, ChatGPT web search, and voice assistants.
 *
 * Editorial rules:
 *   - Plain language, buyer-intent questions (what / how / when / which / price).
 *   - Answers are 40–90 words, factually grounded, no fluff.
 *   - Avoid superlative claims that can't be verified.
 *   - Avoid pricing in exact rupees (varies by grade / quantity).
 */

export const PRODUCT_FAQS = {
  // ─── SHAPED REFRACTORIES ────────────────────────────────────────────────
  'high-alumina-bricks': [
    {
      q: 'What is the difference between HA-45, HA-60, HA-70 and HA-90 high alumina bricks?',
      a: 'The number indicates the Al₂O₃ content. HA-45 has 45% alumina and is rated to about 1550°C — used for general-purpose linings. HA-60 and HA-70 (60% and 70% Al₂O₃) cover mid-range duty up to 1750°C. HA-80 and HA-90 are used for severe duty in steel ladles, blast furnace bosh and reformer hot zones up to 1850°C. As alumina content rises, refractoriness, slag resistance and price all rise.',
    },
    {
      q: 'What temperature can high alumina bricks withstand?',
      a: 'Service temperatures depend on grade. HA-45 is used up to about 1550°C, HA-60 up to 1650°C, HA-70 up to 1750°C, and HA-80/HA-90 up to 1800–1850°C. PCE (Pyrometric Cone Equivalent) values are SK 33 to SK 38+ depending on grade. Always specify by application — soaking pit, ladle slag line and blast furnace bosh each demand different chemistries.',
    },
    {
      q: 'Which industries use high alumina bricks the most?',
      a: 'Steel plants are the largest user — for ladles, torpedo cars, blast furnace bosh and belly, and reheating furnace roofs. Cement rotary kilns use HA-60 to HA-80 in the burning and transition zones. Glass tank regenerators, petrochemical reformers, EAF roof, and coke oven jambs are other regular applications.',
    },
    {
      q: 'What size and shape options are available?',
      a: 'Standard IS 6 / IS 8 brick sizes are 230×114×64 mm (straight) and 230×114×64/52 mm (arch). We supply wedge, key, side-arch, skew and special precast shapes drawn to your furnace ring drawings. Custom shapes are available from CUMI, Calderys and TRL Krosaki on request, typically 4–6 weeks lead time.',
    },
    {
      q: 'How is high alumina brick priced?',
      a: 'Pricing is per metric tonne (MT) and depends mainly on Al₂O₃ percentage, brand, shape complexity and order quantity. As a rough guide, HA-45 is the most economical grade and HA-90 is roughly two to three times the price per tonne. Special shapes and chemically bonded grades carry a premium. Send us a drawing and quantity for a firm quote.',
    },
    {
      q: 'Are you an authorised dealer for high alumina bricks?',
      a: 'Yes. Shanker Agencies is an authorised dealer for CUMI Super Refractories and supplies CUMI, Calderys, TRL Krosaki and IFGL grades from our Delhi warehouse. Every dispatch ships with an original manufacturer test certificate. We have been supplying high alumina bricks since 1980 with on-site engineering support across India and 50+ export markets.',
    },
  ],

  'fireclay-bricks': [
    {
      q: 'What is the difference between fireclay and high alumina bricks?',
      a: 'Fireclay bricks contain 25–45% Al₂O₃ and are rated to about 1400°C. High alumina bricks start at 45% Al₂O₃ and run up to 90%+, with service temperatures of 1550–1850°C. Fireclay is significantly cheaper and is the right choice for backup linings, boilers and general-duty furnaces. High alumina is needed for working linings exposed to slag, metal or temperatures above 1500°C.',
    },
    {
      q: 'What grades of fireclay brick are available?',
      a: 'Common grades are STD-30, STD-40, HFK-28, HFK-32 and HFK-36. The number broadly tracks Al₂O₃ percentage. STD-40 is the most-supplied grade for general industrial work. HFK grades are higher-quality fireclay with tighter tolerances. All comply with IS 8 (Indian Standard for fireclay refractories) and equivalents.',
    },
    {
      q: 'What is the IS 8 standard for fireclay bricks?',
      a: 'IS 8:2013 is the Indian Standard specifying fireclay refractory bricks by chemical composition, refractoriness, cold crushing strength, apparent porosity and dimensions. It defines four classes — Super Duty, High Duty, Medium Duty and Low Duty — based on Al₂O₃ content (40% down to 22%) and PCE (SK 35 down to SK 28). All Shanker Agencies fireclay supply complies with IS 8.',
    },
    {
      q: 'Where should fireclay bricks NOT be used?',
      a: 'Avoid fireclay in working linings exposed to basic slags (steel converters, EAF, cement burning zone) — they will react and fail rapidly. Also avoid them where temperatures consistently exceed 1400°C, in glass contact zones, or in atmospheres with high alkali content. For these, use high alumina, basic, magnesia spinel or fused-cast AZS depending on the duty.',
    },
    {
      q: 'How long do fireclay bricks last in a boiler back wall?',
      a: 'Properly installed fireclay back walls in coal-fired industrial boilers typically run 5–8 years between full relines, with hot-spot patching every 12–18 months. Life depends on coal quality (alkali and chlorine content), boiler load cycling and dry-out discipline at first commissioning. Cycling-heavy boilers will see faster joint deterioration.',
    },
    {
      q: 'Do you stock fireclay bricks in Delhi for immediate dispatch?',
      a: 'Yes — STD-40 and HFK-32 are stocked in standard sizes for same-day dispatch on quantities up to 5 MT from our Delhi warehouse. Larger orders, special shapes or higher Al₂O₃ grades typically dispatch in 2–7 working days. We deliver pan-India and handle full export documentation for GCC, ASEAN and African shipments.',
    },
  ],

  'insulating-fire-bricks': [
    {
      q: 'What is an insulating fire brick (IFB) and how is it different from a dense brick?',
      a: 'An IFB is a porous refractory brick — typically 40–80% porosity by volume — engineered for low thermal conductivity (0.15–0.35 W/mK) and low heat storage. A dense fireclay brick has 22–28% porosity and conducts heat 3–5 times faster. IFBs save energy and lower furnace shell temperatures, but cannot handle direct slag, metal or mechanical abuse like a dense brick can.',
    },
    {
      q: 'What do K-23, K-26 and K-30 mean in insulating fire brick nomenclature?',
      a: 'K-23, K-26, K-28, K-30 and K-32 are standard ASTM C-155 classifications based on maximum service temperature: K-23 = 1260°C (2300°F), K-26 = 1430°C (2600°F), K-28 = 1540°C, K-30 = 1650°C, K-32 = 1760°C. The "K" stands for kiln temperature class. Higher K-numbers mean higher service temperature but also higher thermal conductivity.',
    },
    {
      q: 'How much energy can an IFB lining save versus a dense brick lining?',
      a: 'A typical retrofit replacing 230 mm of dense fireclay back-up with an equivalent IFB layer reduces shell heat loss by 30–50% and cuts furnace energy consumption by 8–15% in continuous operation. Payback on the IFB upgrade is usually 12–24 months for furnaces running more than 5000 hours per year.',
    },
    {
      q: 'Can IFBs be used as a hot-face lining?',
      a: 'Only in low-duty service — heat treatment furnaces, ceramic kilns, laboratory furnaces and lehrs where there is no contact with liquid metal, slag, abrasive load or mechanical impact. For melting or steelmaking, IFBs must always sit behind a dense working lining. Direct flame impingement on IFBs is acceptable in radiant heating but reduces life.',
    },
    {
      q: 'Which brand of IFB do you recommend?',
      a: 'For 1260–1430°C duty (most heat treatment work) we recommend Divine Cerawool IFBs — we are an authorised dealer and stock them in Delhi. For 1540–1760°C duty and tighter tolerances, CUMI Super Refractories IFBs are the standard choice. Both come with full ASTM C-155 documentation. We can sample a single carton for trial before bulk supply.',
    },
    {
      q: 'How are IFBs handled and installed?',
      a: 'Handle gently — IFBs have low crushing strength (0.5–5 MPa) so impact damage is easy. Use lightweight insulating mortar or a colloidal silica binder. Saw-cut to size with a masonry blade. Maintain joint thickness 2–3 mm. Dry-out schedule: ambient to 200°C at 10°C/hr, hold 4 hours, then ramp normally. Never expose unbacked IFBs to flowing molten metal.',
    },
  ],

  'basic-bricks': [
    {
      q: 'What are basic refractory bricks and where are they used?',
      a: 'Basic bricks are made from magnesia (MgO), magnesia-chrome, magnesia-spinel, magnesia-carbon or dolomite raw materials. They resist basic slags rich in CaO and FeO that destroy alumina-silica refractories. They are the standard working lining for BOF and EAF steelmaking, cement rotary kiln burning zones, copper and nickel converters, and non-ferrous smelters.',
    },
    {
      q: 'What is the difference between magnesia-chrome and magnesia-spinel bricks?',
      a: 'Magnesia-chrome bricks contain 12–22% Cr₂O₃ and offer the best slag and thermal-shock resistance, but the chrome can leach into hexavalent Cr⁶⁺ during disposal — environmentally regulated. Magnesia-spinel bricks replace chrome with MgAl₂O₄ spinel, giving similar coating-formation behaviour and thermal shock with no Cr⁶⁺ liability. Most modern cement plants now specify magnesia-spinel for the burning zone.',
    },
    {
      q: 'What is an MgO-C (magnesia-carbon) brick used for?',
      a: 'MgO-C bricks are magnesia bricks containing 8–18% graphite plus antioxidants. The carbon prevents slag wetting and improves thermal shock dramatically. They are the dominant working lining for BOF converters, EAF slag lines, ladle slag bands and torpedo car impact zones. Typical service is 2–4 heats per cm of wear.',
    },
    {
      q: 'How long do basic bricks last in a BOF or EAF?',
      a: 'A modern BOF lined with MgO-C bricks typically runs 3000–5000 heats between full relines, with localised gunning every 50–100 heats. EAF working lining gives 600–1500 heats depending on power-on time, slag chemistry and gunning practice. Cement kiln burning zone basic bricks run 9–14 months between turnarounds.',
    },
    {
      q: 'Are chrome-free basic bricks available for cement kilns?',
      a: 'Yes — magnesia-spinel and magnesia-hercynite (MgO-FeAl₂O₄) grades are now the standard in environmentally-conscious cement plants. They eliminate Cr⁶⁺ disposal liability while delivering equivalent or better burning-zone life. We supply chrome-free grades from CUMI and TRL Krosaki, with full disposal-class certification.',
    },
    {
      q: 'How should basic bricks be stored and handled?',
      a: 'Critical — keep dry. MgO and MgO-C bricks hydrate in humid air, causing dimensional growth and surface spalling. Store in sealed plastic on pallets, preferably in a dehumidified shed. Use within 6 months of receipt. Open pallets only when ready to install. Mortar joints must be 1–2 mm. After installation, dry out within 24 hours to avoid moisture damage.',
    },
  ],

  'silicon-carbide-bricks': [
    {
      q: 'When should I specify silicon carbide refractory instead of high alumina?',
      a: 'Choose SiC where abrasion, erosion, thermal cycling or high heat-transfer rates dominate. Common cases: aluminium melting and holding furnaces (non-wetting), zinc smelter retorts, waste incinerator hearths, blast furnace bosh, kiln burner blocks, and recuperator tubes. SiC has 5–10× the thermal conductivity of high alumina — ideal where heat must move through the lining, problematic where insulation is needed.',
    },
    {
      q: 'What temperature can silicon carbide bricks handle?',
      a: 'Continuous service to 1650°C in oxidising atmospheres. In reducing or inert atmospheres, SiC tolerates 1700°C+. Above 1300°C in oxidising atmospheres SiC slowly forms a passivating SiO₂ layer that limits further oxidation but reduces thermal conductivity over time. For melting iron and steel direct contact, SiC is generally avoided due to dissolution into the melt.',
    },
    {
      q: 'How does SiC perform in aluminium furnaces?',
      a: 'Excellent. SiC is non-wetting to molten aluminium and resists corundum growth and metal penetration. It handles cycling between fill, hold and tap without spalling. The standard duty is the lower belly and ramps of melting furnaces; for the metal contact wall, Si₃N₄-bonded SiC is preferred over clay-bonded SiC for longer life.',
    },
    {
      q: 'What bond systems are used for SiC refractories?',
      a: 'Three common bonds: oxide-bonded (clay or alumina, lowest cost, used in non-critical zones), Si₃N₄-bonded (silicon nitride, premium aluminium duty), and direct-sintered or recrystallised SiC (highest performance, kiln furniture and special parts). The bond choice drives both price and service life — typically a 2–4× span across the range.',
    },
    {
      q: 'What is the minimum order quantity for SiC bricks?',
      a: 'Standard SiC shapes are stocked from 1 MT upwards. Special shapes, recrystallised SiC parts and Si₃N₄-bonded grades are usually made-to-order with a 4–8 week lead time and a minimum order of 1–2 MT depending on the supplier. We can quote both stocked grades from CUMI and made-to-order grades from TRL Krosaki and Calderys.',
    },
    {
      q: 'Are silicon carbide refractories more expensive than alumina?',
      a: 'Yes — typically 3–6× the price per tonne of HA-90, depending on bond and SiC content. The economic case is built on longer life, lower energy loss and higher productivity, not initial cost. For an aluminium melter the payback on Si₃N₄-bonded SiC over alumina-silicate is usually 9–18 months in extra metal yield and reduced relining frequency.',
    },
  ],

  // ─── UNSHAPED REFRACTORIES ─────────────────────────────────────────────
  'low-cement-castables': [
    {
      q: 'What is a low cement castable (LCC)?',
      a: 'A low cement castable is a monolithic refractory containing only 3–5% calcium aluminate cement binder, far less than the 15–30% in conventional castables. The reduced cement content gives much higher hot strength, lower porosity, better slag resistance and improved thermal shock performance. LCC is the dominant monolithic refractory in modern steel ladles, tundishes, torpedo cars and reheating furnaces.',
    },
    {
      q: 'What is the difference between LCC, ULCC and conventional castable?',
      a: 'Conventional castable: 15–30% cement, easy install, moderate hot strength, used in backup and non-critical zones. LCC: 3–5% cement, higher density and slag resistance, used in working linings of ladles and high-duty zones. ULCC (ultra-low cement): under 3% cement, highest density and hot strength, used in critical wear zones. The lower the cement, the longer the dry-out and the higher the price.',
    },
    {
      q: 'How long should an LCC lining be dried out?',
      a: 'A typical 200–300 mm thick LCC lining requires a controlled dry-out of 24–72 hours. Standard schedule: ambient to 110°C at 10–15°C/hr, hold 12 hours, then 30°C/hr to 350°C, hold 8 hours, then 50°C/hr to operating temperature. Skipping dry-out causes steam explosion (spalling) — the single most common failure of new castable linings.',
    },
    {
      q: 'How long does an LCC steel ladle working lining last?',
      a: 'Modern 70–80% Al₂O₃ LCC ladle working linings deliver 80–140 heats between relines depending on steel grade, holding time, slag chemistry and ladle furnace use. Slag-line areas wear faster and are usually patched with gunning at 30–50 heat intervals. Argon-purging and electrode arcing zones may need spot repair every 15–20 heats.',
    },
    {
      q: 'What grades of LCC do you supply?',
      a: 'We supply 60% Al₂O₃ LCC for tundish and general ladle backup, 70% Al₂O₃ LCC for standard ladle working linings, 80% Al₂O₃ LCC with spinel addition for premium ladle and steel-treatment work, and 90% Al₂O₃ self-flow LCC for complex shapes and nozzles. Authorised CUMI dealer; also Calderys and IFGL grades stocked.',
    },
    {
      q: 'Can LCC be installed by gunning or shotcreting?',
      a: 'Standard LCC is installed by vibration casting. For gunning and shotcreting, use a specifically-formulated LCC-gunning blend or a self-flow LCC — these have modified particle size distributions and additives. Mixing standard cast LCC with high water and gunning it gives poor density and short life. Always check the data sheet for the recommended placement method.',
    },
  ],

  'ultra-low-cement-castables': [
    {
      q: 'What is an ultra low cement castable (ULCC)?',
      a: 'A ULCC contains less than 3% calcium aluminate cement, with the rest of the matrix bonded by reactive alumina, microsilica and chemical dispersants. The result is a very dense, low-porosity (8–14%) castable with hot strength approaching that of bricks, excellent slag resistance and very low permeability. ULCC is used in the most-aggressive wear zones of steel and aluminium plants.',
    },
    {
      q: 'When should I specify ULCC over LCC?',
      a: 'Specify ULCC where lining life is the dominant cost driver — steel ladle slag bands, EAF tap holes, reheating furnace skid rails, copper anode furnace launders, aluminium melter ramps, and continuous casting tundish working linings. ULCC typically gives 1.4–2× the life of LCC in these zones, justifying the 30–80% price premium.',
    },
    {
      q: 'How is ULCC dry-out different from LCC?',
      a: 'Stricter. ULCC has even lower permeability than LCC, so trapped moisture is harder to vent. Dry-out is typically 48–96 hours: ambient to 110°C at 8°C/hr, hold 18 hours, then 20°C/hr to 350°C, hold 12 hours, then 35°C/hr to working temperature. Many ULCC mixes include organic fibres that burn out at 200–300°C to create venting channels.',
    },
    {
      q: 'What is the maximum service temperature of ULCC?',
      a: 'Up to 1700–1800°C depending on aggregate. Standard 80–90% Al₂O₃ ULCC handles 1700°C. Tabular alumina or fused alumina-spinel ULCC reaches 1800°C continuous. For higher service temperatures (1850°C+), no-cement (chemically bonded) castables or shaped refractories should be used.',
    },
    {
      q: 'Can ULCC be used for steel ladle working lining?',
      a: 'Yes — premium ladle linings increasingly use 90% Al₂O₃ ULCC with 6–10% spinel addition. Typical campaign life is 110–180 heats versus 80–140 for standard LCC. The cost premium is offset by reduced relining frequency and lower lost-production hours. Slag bands and impact zones may still be supplemented with MgO-C bricks.',
    },
    {
      q: 'Which brands of ULCC do you supply?',
      a: 'CUMI Super Refractories ULCC range — we are the authorised dealer. Also Calderys ACCMON, ULTRACASTING and KERAFLEX series, and IFGL ULCC for steel applications. Each manufacturer has 4–6 grades; we help you select the right grade based on your installation method, vessel size, slag chemistry and target campaign life.',
    },
  ],

  'ramming-masses': [
    {
      q: 'What is ramming mass and where is it used?',
      a: 'Ramming mass is a granular dry refractory mix that is rammed in place — typically by pneumatic vibrators — to form a monolithic lining. The most common use is induction furnace linings for melting iron, steel, copper and brass. It is also used for steel ladle bottoms, blast furnace troughs and EAF bottoms.',
    },
    {
      q: 'What is the difference between silica, alumina and magnesia ramming mass?',
      a: 'Silica ramming mass is the standard for iron and carbon steel induction furnaces — economical, good thermal shock, neutral with iron melts. Alumina-based mass is used for stainless steel and special alloys where silica pickup must be avoided. Magnesia-based mass is used for high-manganese steel and copper alloys where basic slags are present. Choosing the wrong chemistry causes rapid lining failure.',
    },
    {
      q: 'How long does an induction furnace lining last?',
      a: 'A 1–5 tonne capacity iron-melting induction furnace with silica ramming mass typically gives 100–250 heats per lining. Steel melting reduces life to 50–120 heats due to higher temperature. Lining life depends heavily on ramming density, sintering practice, charge cleanliness, holding time and operator discipline. Poor ramming can cut life by 50%.',
    },
    {
      q: 'What is the correct procedure for sintering a new ramming mass lining?',
      a: 'Standard sequence: install dry, ram to specified density, install template former, slowly heat to 600°C over 4–6 hours to remove free moisture, hold 2 hours, then ramp to 900°C and hold 3 hours to develop crystobalite (for silica). First melt should be at moderate power. Avoid full power and slag formation until at least 5 heats have run. Skipping sintering halves lining life.',
    },
    {
      q: 'Do you supply ramming mass for a 5-tonne induction furnace?',
      a: 'Yes — silica, alumina and magnesia ramming mass are supplied in 25 kg bags, with quantities calculated against your furnace cross-section. A typical 5-tonne iron-melting furnace requires 3–4 MT of silica ramming mass per lining. We supply CUMI authorised grades with technical guidance from our induction furnace specialists.',
    },
    {
      q: 'How is ramming mass priced?',
      a: 'Pricing is per metric tonne in 25 kg bags. Silica ramming mass is the most economical. Alumina ramming mass is roughly 2× silica price, and magnesia ramming mass is 3–4× silica price. Premium grades with higher purity (>99% SiO₂ for silica) carry an additional 20–30% premium. Send us your furnace size and steel grade and we will quote a complete lining package.',
    },
  ],

  'gunning-materials': [
    {
      q: 'What is gunning mass and when is it used?',
      a: 'Gunning mass is a refractory mix designed to be sprayed pneumatically onto a hot or cold lining. It is the standard tool for hot repairs of furnace working linings, allowing localised wear to be patched without taking the furnace fully out of service. Used routinely in steel ladles, EAF, BOF, cement kilns, induction furnaces and torpedo cars.',
    },
    {
      q: 'Is gunning a permanent repair or temporary?',
      a: 'Gunning is a maintenance repair, not a full reline. A well-applied gunning patch typically extends lining life by 5–30 additional heats or days of operation, depending on duty. After multiple gunning cycles, the original brick or castable lining still needs full replacement. Best practice is scheduled gunning every 50–150 heats in steel applications.',
    },
    {
      q: 'What is the difference between hot and cold gunning?',
      a: 'Hot gunning is applied at 600–1400°C — the hot face is still glowing. The mass develops a strong ceramic bond by reacting with the residual lining heat. Cold gunning is applied below 200°C and relies on a hydraulic or chemical bond, typically requiring a controlled re-heat before service. Hot gunning gives stronger bonds and faster turnaround.',
    },
    {
      q: 'What chemistries of gunning mass are available?',
      a: 'Silica-alumina gunning for general fireclay and high-alumina linings, basic gunning (magnesia-based) for steel ladle slag bands and EAF/BOF working linings, neutral gunning for transition zones, and specialty SiC-containing gunning for aluminium and incinerator duty. Choosing a chemistry matched to the original lining is essential — wrong chemistry causes rejection or rapid spalling.',
    },
    {
      q: 'What equipment is needed to apply gunning mass?',
      a: 'A gunning machine (rotor or pressure-vessel type), a 25–50 m feed hose, a water supply at 4–6 bar, and operator PPE. Output is typically 2–6 t/hr for cold gunning and 1.5–4 t/hr for hot gunning. We can help you specify the right machine for your duty cycle, and supply trained gunning operators on a campaign basis.',
    },
    {
      q: 'Do you supply gunning mass with on-site gunning service?',
      a: 'Yes. For large steel and cement plants we offer turnkey gunning campaigns — material supply, machine, trained crew, and refractory engineer supervision. For routine maintenance we supply Calderys, CUMI and IFGL gunning masses for application by your in-house team. Both options come with technical guidance on best-practice gunning thickness and frequency.',
    },
  ],

  // ─── FLOW CONTROL ──────────────────────────────────────────────────────
  'slide-gate-plates': [
    {
      q: 'What is a slide gate plate and how does it work?',
      a: 'A slide gate plate is a high-performance refractory plate that slides across a stationary plate to control molten steel flow from a ladle. Two or three plates with concentric bores form the gate; sliding alignment opens, throttles or closes the flow. They replace the older stopper-rod system in nearly all modern continuous-casting steel ladles.',
    },
    {
      q: 'What grades of slide gate plate are available?',
      a: 'Three primary grades: Alumina-Carbon (Al₂O₃-C) for standard carbon steel duty, Alumina-Zirconia-Carbon (Al₂O₃-ZrO₂-C) for higher sequence casting and special steels, and Magnesia-Carbon (MgO-C) for high-manganese and basic-slag duty. Plate thickness, bore diameter and corner geometry are matched to the ladle gate mechanism (typically RHI, IFGL or Vesuvius design).',
    },
    {
      q: 'How many heats does a slide gate plate last?',
      a: 'A standard alumina-carbon plate set typically delivers 4–8 heats in carbon steel duty. Premium Al₂O₃-ZrO₂-C plates extend this to 8–14 heats. Plate life is limited mainly by erosion at the bore from steel flow and by thermal cycling between heats. Sequence casting (multiple heats per ladle) accelerates wear; ladle preheat practice is the biggest single life lever.',
    },
    {
      q: 'Are slide gate plates a regulated or proprietary item?',
      a: 'They are proprietary — each major refractory manufacturer (IFGL, RHI, Vesuvius, Krosaki) makes plates dimensioned to their gate mechanism. A plate from one manufacturer will usually not fit another\'s gate without a frame change. We help match your existing gate mechanism to compatible plates from IFGL India and TRL Krosaki, our authorised supply partners.',
    },
    {
      q: 'What is the lead time for slide gate plates?',
      a: 'Standard alumina-carbon plates for the most-common gate sizes are stocked for 2–5 day delivery. Specialty Al₂O₃-ZrO₂-C plates and non-standard bore sizes are typically 4–6 weeks lead time, sometimes shorter under campaign agreements. For a critical mill running on safety stock, we can hold dedicated reserve inventory under a supply contract.',
    },
    {
      q: 'Do you supply complete slide gate refractory packages?',
      a: 'Yes — slide gate plates, ladle nozzles, well blocks, ladle shrouds, mortar and gaskets in coordinated grades to match your gate mechanism. Buying as a package ensures dimensional and chemical compatibility, simplifies inventory, and consolidates technical support. Send us your ladle drawing and we will build a quoted package.',
    },
  ],

  'ladle-shrouds': [
    {
      q: 'What is a ladle shroud and why is it used?',
      a: 'A ladle shroud is a long ceramic tube that connects the ladle slide-gate to the tundish, protecting the falling steel stream from atmospheric oxygen. Without a shroud, oxygen pickup creates non-metallic inclusions that damage downstream casting quality. Modern continuous casting cannot run safely without shrouds.',
    },
    {
      q: 'What is the shroud made of?',
      a: 'The body is typically alumina-graphite (Al₂O₃-C), with 25–35% graphite for thermal shock resistance and slag non-wetting. The slag line is reinforced with zirconia-graphite (ZrO₂-C) for higher slag corrosion resistance. The bore is sometimes lined with a denser, lower-carbon insert to resist erosion from steel flow.',
    },
    {
      q: 'How many heats does a ladle shroud last?',
      a: 'A standard Al₂O₃-C shroud handles 4–8 heats in carbon steel sequence casting. ZrO₂-C reinforced slag-line shrouds extend life to 8–14 heats. Life is limited by slag-line corrosion, thermal cycling fatigue, and erosion at the bore inlet. Argon-purging slots at the shroud-to-gate interface reduce reoxidation but introduce a wear point.',
    },
    {
      q: 'What is the difference between an open and submerged shroud?',
      a: 'An open shroud discharges into the open tundish bath surface. A submerged shroud (sometimes called a long stopper tube) extends below the tundish slag line, eliminating splashing and reoxidation. Submerged shrouds give better steel cleanness but require shroud manipulators and slag-control practice. Most premium long-product mills use submerged.',
    },
    {
      q: 'Can ladle shrouds be reused?',
      a: 'No — shrouds are single-campaign items. After a heat sequence, the shroud is discarded and a new one is fitted. Attempting to reuse a shroud risks cold-start cracking, slag spalling, and contaminated steel. The shroud-and-tundish-nozzle pair are matched assemblies designed for one continuous operating window.',
    },
    {
      q: 'What size shrouds do you supply?',
      a: 'We supply alumina-graphite ladle shrouds with bore diameters 60–110 mm and lengths 800–1800 mm to match standard caster geometries. Both straight and bell-mouth designs available. IFGL India is our primary supply partner with TRL Krosaki as alternate. Custom dimensions are made to drawing on 4–6 weeks lead time.',
    },
  ],

  'subentry-nozzles': [
    {
      q: 'What is a Submerged Entry Nozzle (SEN) and where is it used?',
      a: 'A SEN is a refractory nozzle that connects the tundish to the casting mould and discharges the steel stream below the mould slag line. The submerged discharge eliminates splashing, suppresses surface waves, and prevents reoxidation. SENs are mandatory for high-quality slab, bloom and beam-blank continuous casting.',
    },
    {
      q: 'What materials are SENs made of?',
      a: 'Body is alumina-graphite (Al₂O₃-C) with 25–30% graphite. The slag line and the discharge ports are typically reinforced with zirconia-graphite (ZrO₂-C) for slag corrosion resistance. The bore is often lined with a low-carbon, anti-clogging insert to reduce alumina build-up during aluminium-killed steel casting.',
    },
    {
      q: 'How does an SEN prevent clogging?',
      a: 'In aluminium-killed steel, alumina inclusions tend to deposit on the SEN bore wall, eventually shutting flow. Anti-clog SENs use calcium-treated bore liners, special carbon-free inserts, or argon-purging through the bore wall. Argon-purged designs reduce clogging rate but require gas piping and flow control. Bore liner selection is matched to the steel grade.',
    },
    {
      q: 'How long does an SEN last?',
      a: 'Standard alumina-graphite SENs handle 4–8 heats per submerged immersion. ZrO₂-C reinforced SENs reach 8–12 heats in carbon steel. Heat-by-heat changing is also common in special steels and stainless. Service life is limited by slag-line erosion, bore alumina build-up, thermal cycling, and operator handling at change-out.',
    },
    {
      q: 'What discharge port designs do you supply?',
      a: 'Common designs: bottom-only (most common), straight side ports (slab caster), angled side ports (5–35° down-angle for mould flow control), and slot-type for thin-slab casting. Port geometry is selected based on caster width, casting speed, and mould flow profile target. We supply IFGL India SENs in all standard port configurations.',
    },
    {
      q: 'How is an SEN priced?',
      a: 'Pricing is per piece, depending on length, bore diameter, port geometry, and reinforcement (carbon, zirconia-carbon, anti-clog liner). A standard alumina-graphite SEN for a billet caster is the most economical. Premium ZrO₂-C anti-clog SENs for slab casting are 3–5× the price. Volume contracts deliver 15–25% saving over spot pricing.',
    },
  ],

  'porous-plugs': [
    {
      q: 'What is a porous plug and why is it used?',
      a: 'A porous (purging) plug is a refractory block at the ladle bottom that diffuses argon gas into the molten steel. The argon bubbling homogenises temperature and chemistry, floats inclusions to the slag, and assists alloy dissolution. Porous plug stirring is standard in modern ladle metallurgy for clean-steel production.',
    },
    {
      q: 'What types of porous plug are available?',
      a: 'Two design families: directional (slot-type) plugs with engineered gas channels, and random-pore (open-porosity) plugs that rely on inherent permeability. Directional plugs give predictable flow and longer life but cost more. Random-pore plugs are cheaper but have higher variation. Choice depends on the ladle metallurgical practice and treatment time.',
    },
    {
      q: 'How long does a porous plug last?',
      a: 'A high-alumina or magnesia-alumina spinel plug typically lasts 30–80 heats depending on gas flow rate, treatment time per heat, slag chemistry and ladle preheat practice. Slag attack at the plug face is the dominant wear mechanism. Worn plugs are replaced through a bottom-purge well-block.',
    },
    {
      q: 'What argon flow rates do porous plugs handle?',
      a: 'Standard plug ratings: 0.1–0.5 Nm³/min for soft stirring (homogenisation), 0.5–2.0 Nm³/min for medium stirring (inclusion flotation), 2.0–6.0 Nm³/min for hard stirring (rinse / desulfurisation). Plug pore structure must be matched to the flow rate range; gross over-flow causes plug erosion and slag entrainment.',
    },
    {
      q: 'How are porous plugs installed?',
      a: 'Plugs are seated in a permanent ladle-bottom well block. The well block stays in place across multiple plugs; only the consumable plug is changed when worn. Plug changing requires the ladle to be drained, cooled to a working temperature, and the worn plug pushed out from above through the well block. Total plug change downtime is typically 30–60 minutes.',
    },
    {
      q: 'Do you supply complete plug + well block packages?',
      a: 'Yes — we supply matched porous plug and well block sets from IFGL Refractories, with full purge-line dimensions and pressure-test certification. We can also supply the surrounding ladle-bottom castable as a coordinated package. Send us your ladle bottom drawing and stirring practice and we will quote a complete bottom-purge solution.',
    },
  ],

  // ─── INSULATION ────────────────────────────────────────────────────────
  'ceramic-fiber-products': [
    {
      q: 'What is ceramic fibre and why use it?',
      a: 'Ceramic fibre is a man-made silicate-alumina fibre with very low thermal conductivity (0.06–0.12 W/mK) and very low heat storage. It is used as a flexible furnace lining for energy savings of 30–50% versus dense brick. Standard forms are blanket, module, board and bulk. Service temperature classes range from 1260°C to 1430°C.',
    },
    {
      q: 'What is the difference between blanket, module and board?',
      a: 'Blanket is a flexible roll (1, 2, 3 inch thicknesses, 96–128 kg/m³ density) — used for back-up insulation, expansion joints and pipe lagging. Modules are pre-compressed folded blanket attached to anchors, used as a one-shot hot-face lining for furnace walls and roofs. Boards are rigid, machinable panels (200–300 kg/m³) for high-velocity zones, ladle covers and burner blocks.',
    },
    {
      q: 'How is ceramic fibre service temperature classified?',
      a: 'Standard ASTM C-892 / EN 1094 classes: 1260°C (Class A — standard alumino-silicate), 1325°C (Class C — zirconia-doped), 1400°C (Class D — high-purity), and 1430°C (Class E — high-alumina polycrystalline). Continuous-use temperature is typically 100–150°C below the classification temperature for long life. Above 1300°C, devitrification reduces fibre flexibility over time.',
    },
    {
      q: 'Is ceramic fibre safe to handle and install?',
      a: 'Refractory ceramic fibre (RCF) requires controlled handling — dust generated during cutting and fitting can cause respiratory irritation. Use FFP3 dust masks, gloves, long-sleeved cotton overalls. Modern bio-soluble alkaline-earth-silicate (AES) fibre wools (rated to 1200°C) are exempt from carcinogen classification under EU regulation. We supply both RCF and AES grades — see the data sheet for the recommended PPE.',
    },
    {
      q: 'What energy saving will I get from a ceramic fibre furnace upgrade?',
      a: 'Replacing a 230 mm dense-brick lining with an equivalent ceramic-fibre module lining typically reduces shell heat loss by 50–70% and cuts furnace energy consumption by 20–35% for batch furnaces. Continuous furnaces see smaller savings (10–20%) but faster cycle times. Payback is usually 12–30 months depending on operating hours and fuel cost.',
    },
    {
      q: 'Are you an authorised dealer for ceramic fibre products?',
      a: 'Yes — Shanker Agencies is an authorised dealer for Divine Cerawool. We stock standard 1260°C and 1430°C blanket and modules in Delhi for same-day dispatch. Boards, paper, ropes and special shapes are also supplied. Full PPE recommendation and installation guidance comes with every order.',
    },
  ],

  'calcium-silicate': [
    {
      q: 'What is calcium silicate insulation and where is it used?',
      a: 'Calcium silicate is a rigid, machinable insulation board made by hydrothermal reaction of lime, silica and reinforcing fibre. It has low thermal conductivity (0.06–0.09 W/mK), good compressive strength (4–8 MPa), and is non-combustible. Used as block insulation in petrochemical pipework, power plant boilers, ducts, ladle covers, and back-up insulation behind dense refractory.',
    },
    {
      q: 'What temperature can calcium silicate handle?',
      a: 'Standard calcium silicate is rated for continuous service to 650°C, with peak excursions to 750°C. Above this, dehydration of the silicate matrix causes shrinkage and strength loss. For higher temperatures, switch to ceramic fibre (to 1430°C) or microporous insulation (to 1000°C). Selection depends on temperature, mechanical loading and humidity exposure.',
    },
    {
      q: 'Is calcium silicate moisture-resistant?',
      a: 'Calcium silicate is hygroscopic — it absorbs ambient moisture. Modern boards include water-repellent silicone treatment, but prolonged outdoor exposure or wet-bulb conditions still degrade the insulation. For outdoor pipe insulation use a properly sealed cladding (aluminium or stainless steel) with sealed seams and weather-jacketing on horizontal runs.',
    },
    {
      q: 'How does calcium silicate compare with rockwool or microporous?',
      a: 'Rockwool: lower cost, lower temperature limit (650°C), and lower compressive strength — used for general lagging. Calcium silicate: higher compressive strength, machinable, supports loads — used in ducts, boilers and below-grade pipe. Microporous: 30–40% lower thermal conductivity at high temperatures, much higher cost — used where space and weight are constrained (ladle covers, kilns, aerospace).',
    },
    {
      q: 'What thicknesses of calcium silicate boards are available?',
      a: 'Standard board thicknesses are 25, 38, 50, 65, 75 and 100 mm in 600×900 mm or 1000×500 mm sheets. Pipe sections are pre-formed for nominal pipe sizes 25 to 600 mm in 25 or 50 mm wall thickness. Custom thickness and density grades are made to order. We supply Divine Cerawool calcium silicate as our standard authorised line.',
    },
    {
      q: 'Can I cut calcium silicate boards on site?',
      a: 'Yes — calcium silicate is highly machinable. Use a hand saw, jigsaw or table saw with a wood blade. Drill, screw and rebate it like a soft hardwood. Always wear an FFP3 dust mask — the silica dust is hazardous. Off-cuts can be reused for filling small gaps. Mortar joints between boards use a calcium-silicate based jointing compound.',
    },
  ],

  // ─── ACID PROOFING ─────────────────────────────────────────────────────
  'acid-proof-bricks': [
    {
      q: 'What are acid-proof bricks and where are they used?',
      a: 'Acid-proof bricks are dense, vitrified ceramic bricks formulated to resist acidic chemical attack. They are used to line acid-storage tanks, process vessels, neutralisation pits, fertiliser plant floors, pickling tanks, electrolyte cells, and chemical-plant trenches and drains. They withstand most mineral and organic acids (except HF) at temperatures up to 800–1000°C.',
    },
    {
      q: 'Which acids do acid-proof bricks resist?',
      a: 'Acid-proof bricks resist sulphuric, hydrochloric, nitric, phosphoric, acetic, citric, lactic and most other mineral and organic acids at all concentrations. They do NOT resist hydrofluoric acid (HF), strong alkalis, or molten salts — for those, switch to carbon brick or fluoropolymer linings. Always specify the chemical environment when ordering.',
    },
    {
      q: 'What is the standard for acid-proof bricks in India?',
      a: 'IS 4860 specifies acid-resistant bricks by acid solubility (max 2% loss in boiling sulphuric acid for Class 1 bricks), apparent porosity (max 6%), water absorption (max 2%), and compressive strength (min 70 MPa for Class 1). Shanker Agencies supplies fully IS 4860 Class 1 compliant bricks from Crown Ceramics, our authorised dealership.',
    },
    {
      q: 'What jointing material is used with acid-proof bricks?',
      a: 'Three families: silicate-based cement (cheapest, used for sulphuric/HCl service), furan resin mortar (best chemical resistance, used for organic acid and alkali service), and polymer mortar (epoxy, vinyl-ester for severe duty). Joint material must be matched to the chemical environment; wrong jointing is the most common failure mode of acid-proof linings.',
    },
    {
      q: 'How are acid-proof bricks installed?',
      a: 'Surface preparation: clean concrete or steel substrate, primer coat. Membrane: bituminous or rubber sheet to seal the substrate. Bedding: chemical-resistant mortar at 6–10 mm thickness. Brick-laying: stretcher bond, joints 3–6 mm wide, fully filled. Cure: 24–72 hours before chemical exposure. Skilled installation is essential — bad workmanship will fail in months.',
    },
    {
      q: 'How long do acid-proof brick linings last?',
      a: 'Properly installed acid-proof brick linings in pickling tanks and acid storage typically last 8–15 years before requiring full relining, with localised joint repairs every 2–3 years. Life is limited by joint deterioration, mechanical impact, and thermal cycling. Linings exposed to dilute acid usually last longer than concentrated, due to slower joint attack.',
    },
  ],

  'acid-resistant-tiles': [
    {
      q: 'What are acid-resistant tiles and where are they used?',
      a: 'Acid-resistant tiles are dense vitrified ceramic tiles for chemical-plant flooring, drainage trenches, secondary containment areas, dairy and brewery wash-down floors, and laboratory benches. They have very low porosity (under 2%), very high compressive strength (70+ MPa), and resist most mineral and organic acids at room temperature.',
    },
    {
      q: 'What is the difference between acid-resistant tiles and standard ceramic floor tiles?',
      a: 'Standard ceramic tiles have 5–15% porosity and absorb chemicals over time, leading to staining, cracking and floor failure. Acid-resistant tiles are vitrified to under 2% porosity, formulated with acid-stable feldspathic glass, and tested per IS 4457 / DIN 51091 for chemical resistance. They cost 3–6× more per square metre but last 10–20× longer in chemical environments.',
    },
    {
      q: 'What standards do acid-resistant tiles comply with?',
      a: 'IS 4457 (Indian Standard) specifies acid-resistance, porosity, water absorption, modulus of rupture, and thermal-shock requirements. International equivalents are DIN 51091 (Germany), ASTM C-279 (USA), and EN 12808 (Europe). Crown Ceramics tiles supplied by Shanker Agencies comply with IS 4457 Class 1 — full test certificates with every dispatch.',
    },
    {
      q: 'What sizes and thicknesses are available?',
      a: 'Standard sizes: 150×150 mm, 200×200 mm, 230×115 mm, and 300×300 mm. Thicknesses: 20, 25, 30, 40 mm. Heavy-duty industrial floors specify 30–40 mm; lighter laboratory and dairy use specifies 20–25 mm. Anti-skid finishes (for wet areas) and conductive grades (for explosive atmospheres) are made to order.',
    },
    {
      q: 'What jointing is used with acid-resistant tiles?',
      a: 'For most chemical floors: silicate cement (sulphuric, HCl, dilute acids, low cost), furan resin (best general resistance including organic acids), or epoxy resin (mechanical impact areas, food and pharma). Joint width is typically 3–6 mm. The membrane below the tile (bituminous or rubber) is just as important as the joint material — both must be specified together.',
    },
    {
      q: 'Do you supply complete acid-proofing systems?',
      a: 'Yes — we supply full system packages: membrane, bedding mortar, acid-resistant tiles, jointing compound, and edge sealants. Buying the full system from one source ensures chemical compatibility, simplifies inventory, and consolidates warranty. Crown Ceramics tiles plus matching mortar from our regular supply partners. We can also recommend qualified installation contractors in your region.',
    },
  ],
};

export function getProductFaqs(productId) {
  return PRODUCT_FAQS[productId] || [];
}
