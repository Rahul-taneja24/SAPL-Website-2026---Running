// caseStudiesData.js, 6 ENGINEERING REFERENCE SCENARIOS.
//
// These pages are deliberately framed as illustrative engineering scenarios
// for typical application classes, NOT records of specific SAPL project
// deliveries. Every page carries an unmissable banner stating this. The
// schema type is TechArticle (technical reference content) rather than
// Article (which implies an authored journalistic account).
//
// When real signed-off case studies are obtained, replace these scenarios
// with actual project records and switch the schema back to Article.
//
// EDITORIAL NOTE:
//   The financial figures below are TYPICAL INDUSTRY RANGES based on May 2026
//   market data (see below for sources). They illustrate the ECONOMIC
//   IMPACT POTENTIAL of correct refractory specification, they are not
//   claims of specific outcomes delivered by SAPL. Each USD equivalent uses
//   1 USD = ₹94.5 (May 2026 rate).
//
//   To replace with real data: change the metrics object + any specific
//   ₹/USD figures in the result and metrics blocks. The narrative itself
//   should hold up unchanged.
//
//   Sources used for illustrative figures:
//   - LCC castable: Hazira Refractory Works, IFGL Refractories India
//   - Steel ladle reline: industry benchmark $15–30k per ladle
//   - Silica ramming mass: ₹2,200–10,000/T (Raghav, Karnataka Silicates)
//   - Cement refractory: ₹20–40/T clinker (Indian Cement Review, Firebird)
//   - Captive vs grid power: ₹5/kWh vs ₹8/kWh (CEEW, Indian power policy)
//   - A356.2 ingot: $3,050–3,200/T FOB (Fastmarkets, ChemAnalyst)
//   - LM6 commercial: ₹155–235/kg India (IndiaMART, AlCircleBiz)
//   - Glass furnace rebuild: $5–30M benchmarks (O-I Glass, Beta Glass, Sivesa)
//   - USD/INR: ₹94.5 per USD (May 7, 2026, Federal Reserve H.10, Trading Economics)
//
// FIELDS:
//   slug         : URL slug, drives /case-studies/[slug]
//   title        : H1 / metaTitle base
//   client       : anonymised description (industry + region)
//   industry     : maps to /industries/[slug]
//   industrySlug : URL slug for the industry breadcrumb link
//   products     : array of { name, productPath }, wires the `mentions`
//                  schema to product/brand entities
//   brand        : main brand involved (CUMI / Calderys / TRL Krosaki / etc.)
//   year         : project year (helps content freshness)
//   readingTime  : minutes (rough)
//   problem      : 1-2 paragraph problem statement
//   specification: bullet list of grades / quantities / engineering inputs
//   installation : bullet list of steps / supervision notes
//   result       : bullet list of measurable outcomes, THIS IS THE GOLD
//   metrics      : { campaignLifeBefore, campaignLifeAfter, savingsINR,
//                    energySavingsPct, lossPreventedINR, etc. }, used in
//                  the headline result band + Article schema
//   keyTakeaway  : single-sentence pull quote
//   reviewedBy   : Rahul Taneja (default), drives author + reviewedBy
//                  schema for E-E-A-T

export const CASE_STUDIES = [
  {
    slug: 'steel-ladle-lcc-campaign-life-extension-eastern-india',
    title:
      'Steel Ladle Slag-Line: How LCC-80 Upgrade Can Extend Campaign Life by 30–45%',
    client: 'Application class: 160-tonne steel ladle, integrated steel plant (3 MTPA scale)',
    industry: 'Steel',
    industrySlug: 'steel',
    brand: 'Calderys India',
    year: 2025,
    readingTime: 6,
    products: [
      {
        name: 'Low Cement Castables (LCC-80)',
        productPath: '/products/unshaped-refractories/low-cement-castables',
      },
      {
        name: 'High Alumina Bricks (HA-70)',
        productPath: '/products/shaped-refractories/high-alumina-bricks',
      },
    ],
    problem:
      "A typical 160-tonne steel ladle running on a mid-grade LCC slag-line averages 60–70 heats per campaign, below the 85-heat target most steelmaking cells set. Slag-line erosion at the metal/slag interface is the primary failure mode in this application class, with secondary impact wear at the bottom impact pad. In 2026 Indian market terms, every early reline costs roughly ₹18–22 lakh (USD 19,000–23,000) in materials plus 36 hours of unplanned downtime per ladle per campaign cycle.",
    diagnosis: [
      'Post-mortem of retired ladles to identify primary wear mode',
      'Slag chemistry sampled across multiple heats, basicity (CaO/SiO₂) typically 2.8–3.4',
      'Baseline lining: mid-grade LCC-70 (70% Al₂O₃) at slag line',
      'Typical wear: 2.0–2.6 mm/heat in slag zone vs 1.0–1.3 mm/heat in barrel',
    ],
    specification: [
      'Slag-line ring: upgrade from LCC-70 to LCC-80 (80% Al₂O₃, microsilica-densified)',
      'Bottom impact pad: precast LCC-85 (85% Al₂O₃, ZrO₂ enrichment)',
      'Barrel and cone: retain LCC-70 (cost-effective, low wear zone)',
      'Backup safety lining: HA-70 high alumina bricks, 113mm thick',
      'Total castable: ~12.5 tonnes per ladle',
    ],
    installation: [
      'Castable poured at 4.8% water addition with 25mm needle vibrator',
      '24-hour ambient cure under polythene cover before form removal',
      'Dry-out: 20°C/hr to 110°C → hold 12h → 15°C/hr to 300°C → hold 8h → 30°C/hr to 1100°C',
      'SAPL refractory engineer on-site for first heat sintering observation',
      'Total downtime per reline: 4.5 days (vs 5.2 days previously, 0.7 day saved per cycle)',
    ],
    result: [
      'Expected campaign life: 60–70 heats → 85–95 heats range (30–45% improvement typical)',
      'Slag-line wear rate: ~2.4 mm/heat → ~1.6 mm/heat',
      'Total relines per year: typically 6 fewer reline campaigns annually',
      'Refractory cost per tonne of liquid steel: ~₹245/T → ~₹188/T (~USD 2.60 → USD 1.99/T, -23%)',
      'Estimated annual saving range: ~₹1.0–1.3 crore (USD 105,000–138,000) in refractory + downtime cost',
    ],
    metrics: {
      campaignLifeBefore: '65 heats',
      campaignLifeAfter: '92 heats',
      improvementPct: '+43%',
      annualSaving: '~₹1.2 crore (USD 127,000)',
      payback: '< 1 reline cycle',
    },
    keyTakeaway:
      'For this ladle class, targeting only the slag-line ring to LCC-80, while keeping cost-effective LCC-70 in low-wear zones, typically produces a 30–45% campaign life improvement at less than 18% material cost premium. The economics depend on slag chemistry, tap temperature and operating cycle.',
  },

  {
    slug: 'induction-furnace-silica-ramming-mass-northern-india',
    title:
      'Induction Furnace Linings: Why Premature Failure is Often a Sintering-Schedule Problem, Not a Material Problem',
    client: 'Application class: 5-tonne coreless induction furnace, grey iron foundry (typical Indian SME)',
    industry: 'Foundry',
    industrySlug: 'foundry',
    brand: 'Mahakoshal Refractories',
    year: 2025,
    readingTime: 5,
    products: [
      {
        name: 'Silica Ramming Mass',
        productPath: '/products/unshaped-refractories/ramming-masses',
      },
    ],
    problem:
      'A typical 5-tonne coreless induction furnace producing grey iron castings often runs at only 80–100 heats per lining campaign instead of the 150+ heats the material is rated for. Premature lining failure triggers unplanned re-rams every 2 weeks, dropping daily output by roughly ₹4–6 lakh (USD 4,200–6,300) per re-ram event. The visual signature is thermal-cycling cracks running radially from hot face to backup.',
    diagnosis: [
      'Typical charge mix: 70% return scrap + 30% fresh pig iron',
      'Tap temperature: 1480°C, within normal range',
      'Baseline lining: standard silica ramming mass, 75 mm hot face',
      'Failure mode: thermal shock cracking (not chemical attack)',
      'Common root cause in this class: shortened sintering schedule (4h vs 6h spec) to save energy',
    ],
    specification: [
      'Lining material: high-purity silica ramming mass (SiO₂ ≥ 98.5%)',
      'Hot face thickness: 90 mm (up from 75 mm)',
      'Backup ceramic fibre: 1260°C blanket, 25 mm thick',
      'Total ramming mass per lining: 1.6 tonnes',
      'Sintering programme: 6 hours minimum at full power, charge by charge',
    ],
    installation: [
      'Ramming pattern: spiral from bottom, 50–75 mm layers, density verified by tap test',
      'Top-locking ring fitted per OEM spec',
      'First heat (sintering): 6 hours at 75% power with cold scrap charge, no metal tapped',
      'Second and third heats: gradual ramp to full operating temperature',
      'SAPL technician supervised first sintering campaign on both furnaces',
    ],
    result: [
      'Expected lining life: 80–100 heats → 170–200 heats range (roughly doubled)',
      'Re-rams typically reduced from ~26/year to ~13/year per furnace',
      'Lost production from re-rams: ~₹130 lakh/year → ~₹65 lakh/year per furnace',
      'Crack-related rejects (skull formation): typically -65 to -75% by tonnage',
      'Expected total annual saving for 2-furnace plant: ~₹1.2–1.4 crore (USD 127,000–148,000)',
    ],
    metrics: {
      campaignLifeBefore: '90 heats',
      campaignLifeAfter: '185 heats',
      improvementPct: '+105%',
      annualSaving: '~₹1.3 crore (USD 137,000)',
      payback: 'First campaign',
    },
    keyTakeaway:
      'Lining failures often attributed to "ramming mass quality" are actually caused by a shortened sintering schedule. In this application class, the fix is usually a procedural change, restoring the 6-hour first-heat sintering, supported by a higher-purity ramming mass, not necessarily a more expensive product.',
  },

  {
    slug: 'cement-kiln-burning-zone-magnesia-spinel-rotary-kiln',
    title:
      'Cement Rotary Kiln Burning Zone: Why Magnesia-Spinel is Replacing Magnesia-Chrome (Plus the Economics)',
    client: 'Application class: 5,500 TPD precalciner rotary kiln, modern Indian cement plant',
    industry: 'Cement',
    industrySlug: 'cement',
    brand: 'TRL Krosaki',
    year: 2025,
    readingTime: 6,
    products: [
      {
        name: 'Basic Bricks (Magnesia-Spinel)',
        productPath: '/products/shaped-refractories/basic-bricks',
      },
      {
        name: 'High Alumina Bricks (HA-80)',
        productPath: '/products/shaped-refractories/high-alumina-bricks',
      },
    ],
    problem:
      "A typical 5,500 TPD precalciner kiln burning high-alkali raw mix (Cl + SO₃ + R₂O ≈ 4%+) on legacy magnesia-chrome lining tends to fail in the burning zone after only 7–9 months, well below the 14–18 month target for modern kilns. Beyond service life, chrome-bearing refractory creates environmental disposal concerns. In 2026 Indian terms, every unplanned shutdown for partial relining costs approximately ₹1.8–2.0 crore (USD 190,000–212,000) per day in clinker production loss.",
    diagnosis: [
      'Typical hot meal volatile circulation: Cl ~0.8%, SO₃ ~1.6%, alkali ~1.8%',
      'Burning zone gas temperature: 1450–1500°C',
      'Baseline lining: magnesia-chrome 90, 200 mm thick',
      'Common failure pattern: alkali bursting and brick spalling 7–9 m from outlet',
      'Industry driver: phasing out chrome-bearing refractories for environmental compliance',
    ],
    specification: [
      'Burning zone (10 m): magnesia-spinel bricks (Mag-Sp 90), 200 mm, chrome-free',
      'Transition zone (12 m): high alumina HA-80, 200 mm',
      'Calcining zone (8 m): HA-70, 180 mm',
      'Cooler nose ring: precast HA-80 shapes (250 kg each, 8 sections)',
      'Total refractory: ~480 tonnes for the full kiln cycle',
    ],
    installation: [
      'Brick laying: ring-by-ring with hot-face mortar (matching MgO content)',
      'Joint thickness: 1.5 mm at slag side, 3 mm at backup',
      'Anchoring: stainless steel anchors every 600 mm in basic zone',
      'Dry-out: 10°C/hr to 200°C → hold 24h → 15°C/hr to 600°C → hold 12h → fast to operating temp',
      'SAPL engineer present for the full 4-day relining shutdown',
    ],
    result: [
      'Expected refractory life: 7–9 months → 13–15 months range (~75% improvement typical)',
      'Expected reduction in production losses: ~₹3.5–4 crore/year (USD 370,000–425,000)',
      'Environmental: chrome content of new lining = 0% (vs ~12% Cr₂O₃ on legacy)',
      'Lining cost per tonne of clinker: ~₹38/T → ~₹26/T (~USD 0.40 → 0.28/T, -32%)',
      'Coating formation in burning zone: stable at 150–200 mm vs erratic on chrome-bearing brick',
    ],
    metrics: {
      campaignLifeBefore: '8 months',
      campaignLifeAfter: '14 months',
      improvementPct: '+75%',
      annualSaving: '~₹3.5–4 crore (USD 370,000–425,000)',
      payback: 'Single relining cycle',
    },
    keyTakeaway:
      'For high-alkali kilns in this class, chrome-free magnesia-spinel can match chrome-bearing performance when the spinel content is correctly specified for the volatile loop. The environmental compliance win is a useful bonus on top of the campaign-life economics.',
  },

  {
    slug: 'boiler-refractory-castable-cfbc-power-plant-southern-india',
    title:
      'CFBC Boiler Refractories: Why Conventional Castable Fails Where Erosion-Resistant LCC + SiC Lasts',
    client: 'Application class: 250 MW captive CFBC power plant, modern Indian industrial site',
    industry: 'Power',
    industrySlug: 'power',
    brand: 'Calderys India',
    year: 2025,
    readingTime: 5,
    products: [
      {
        name: 'Low Cement Castables (LCC-70)',
        productPath: '/products/unshaped-refractories/low-cement-castables',
      },
      {
        name: 'Insulating Fire Bricks (IFB-26)',
        productPath: '/products/shaped-refractories/insulating-fire-bricks',
      },
    ],
    problem:
      'A typical 250 MW CFBC (circulating fluidised bed combustion) boiler running on conventional castable in the cyclone, return-leg and burning zone tends to experience 8–11 forced outages per year from refractory failure, abrasive bed-ash erosion compounded by thermal cycling during start-stop cycles. Each outage costs a captive plant approximately ₹70–90 lakh per day (USD 74,000–95,000) in alternative grid power, calculated at the ~₹3/kWh differential between captive generation and industrial grid tariff.',
    diagnosis: [
      'Cyclone hot face: typical abrasion wear ~1.2 mm/1000 hours on conventional castable',
      'Return leg: thermal cycling cracks every 4–6 weeks',
      'Baseline refractory: conventional castable (~15% cement), designed for static furnaces, not CFBC',
      'Bed temperature: 850–900°C, but wall temperature spikes to ~1100°C during transients',
    ],
    specification: [
      'Cyclone hot face: erosion-resistant LCC-70 with SiC additive (15% SiC)',
      'Cyclone backup: IFB-26 insulating brick, 65 mm',
      'Return leg: LCC-70 standard, 100 mm hot face',
      'Burner walls: precast LCC-80 panels (replaceable in 4 hours)',
      'Total refractory replaced: 38 tonnes castable + 22 m³ insulation',
    ],
    installation: [
      'Plant shutdown window: 8 days for full burner-zone re-cast',
      'Castable poured in 200 mm lifts using forced-action mixer',
      'Anchors: SS-310 V-anchors at 250 mm centres',
      'Dry-out: per Calderys standard CFBC schedule (extended to 96 hours total)',
      'Pre-commissioning: hydrostatic test of all penetrations',
    ],
    result: [
      'Expected forced outages from refractory: 8–11/year → 2–3/year (~70% reduction typical)',
      'Expected grid power cost saved: ~₹4.5–5 crore/year (USD 475,000–530,000)',
      'Castable cost per tonne of fuel burnt: similar (premium castable costs offset by lower outage frequency)',
      'Plant load factor (PLF) improvement: typically +1.5 to +2.0 percentage points year-on-year',
      'Major refractory shutdown deferred from 18 months to 28–32 months',
    ],
    metrics: {
      outagesBefore: '8–11/year',
      outagesAfter: '2–3/year',
      improvementPct: '-70% forced outages',
      annualSaving: '~₹4.5–5 crore (USD 475–530k)',
      payback: '~9 months',
    },
    keyTakeaway:
      'CFBC boiler refractory is a different discipline from static furnace refractory. For this application class, erosion-resistant LCC with SiC additive in cyclone hot faces is essential, conventional castable engineered for static duty is not the right specification regardless of how it is rated thermally.',
  },

  {
    slug: 'aluminium-holding-furnace-non-wetting-castable-gcc-export',
    title:
      'Aluminium Holding Furnace: How Non-Wetting Castable Eliminates Iron Pickup in A356.2 / LM6 Alloy',
    client: 'Application class: 60-tonne reverberatory holding furnace, premium aluminium smelter (200–300 kt/yr)',
    industry: 'Aluminum',
    industrySlug: 'aluminum',
    brand: 'CUMI Super Refractories',
    year: 2025,
    readingTime: 5,
    products: [
      {
        name: 'Low Cement Castables (Non-Wetting)',
        productPath: '/products/unshaped-refractories/low-cement-castables',
      },
      {
        name: 'High Alumina Bricks (HA-70)',
        productPath: '/products/shaped-refractories/high-alumina-bricks',
      },
    ],
    problem:
      "A typical 60-tonne reverberatory holding furnace cycling A356.2 / LM6 series alloy on a standard alumina castable is prone to iron contamination from corundum and aluminium spinel growth on the hot face. When iron content creeps above 0.6%, premium A356.2 (~USD 3,100/tonne, ₹2.93 lakh/T) gets downgraded to commercial-grade LM6-equivalent (~USD 2,100/tonne, ₹1.98 lakh/T), a price differential of approximately USD 1,000 (₹94,500) per tonne. The hot-face lining chemistry, not the rated temperature, is the deciding factor in this application class.",
    diagnosis: [
      'Hot face spalling typically shows Al₂O₃·MgO·SiO₂ corundum growth',
      'Typical bath chemistry: 0.05% Mg, 0.15% Mn, sufficient for spinel formation',
      'Operating cycle: ~4 fills/day, bath temperature ~720°C',
      'Baseline castable: 70% Al₂O₃ standard LCC, typically wetted by molten aluminium over 4–6 months',
    ],
    specification: [
      'Hot face: non-wetting LCC with BaSO₄ + AlF₃ additives (15% combined)',
      'Bath line ring: precast non-wetting blocks for easy replacement',
      'Backup safety lining: HA-70 high alumina bricks, 113 mm',
      'Insulation backup: 50 mm calcium silicate board',
      'Total castable: 22 tonnes per furnace',
    ],
    installation: [
      'Existing lining stripped to shell after 4-day cool-down',
      'Castable poured at 4.5% water with double-vibration (form + needle)',
      '72-hour total dry-out per non-wetting castable spec',
      'Pre-conditioning bath: 50 kg of charge-bath aluminium melted slowly to passivate hot face',
      'SAPL engineer + CUMI specialist supervised first 2 weeks of operation',
    ],
    result: [
      'Expected iron pickup: 0.6%+ → consistent < 0.18% (within A356.2 spec)',
      'Expected A356.2 alloy yield: 78% → 96% (price-grade upgrade)',
      'Expected annual revenue impact: ~USD 4–6 million (₹38–57 crore) on the affected production line, commercial grade → premium grade',
      'Expected hot-face campaign life: 6 months → 14 months',
      'Energy: bath holding consumption typically -7 to -10% from improved insulation backup',
    ],
    metrics: {
      ironPickupBefore: '> 0.6%',
      ironPickupAfter: '< 0.18%',
      yieldImprovement: '78% → 96%',
      annualSaving: '~USD 4–6M (₹38–57 crore)',
      payback: '~3 months',
    },
    keyTakeaway:
      'Non-wetting castables are not a single product, the right additive blend depends on alloy chemistry, bath temperature and cycling pattern. For this application class, a non-wetting LCC matched to A356.2 chemistry typically eliminates iron pickup entirely; the engineering decision is the additive package, not the brand.',
  },

  {
    slug: 'glass-tank-fused-cast-azs-life-extension-western-india',
    title:
      'Glass Tank Sidewall Life: How AZS-36 Plus Tuned Cooling Air Extends Flux-Line by 30–40%',
    client: 'Application class: 350 TPD container glass tank, mid-size Indian plant',
    industry: 'Glass',
    industrySlug: 'glass',
    brand: 'Calderys India',
    year: 2025,
    readingTime: 5,
    products: [
      {
        name: 'Fused Cast AZS Blocks',
        productPath: '/products/shaped-refractories/silicon-carbide-bricks',
      },
      {
        name: 'High Alumina Bricks',
        productPath: '/products/shaped-refractories/high-alumina-bricks',
      },
    ],
    problem:
      'A typical 350 TPD container glass tank running flux line at 1485°C with ~14% Na₂O experiences sidewall erosion that forces re-line at 4 years rather than the design 6 years. Glass defects ("stones") from refractory exudation degrade container yield. Sodium attack is aggressive in this temperature/chemistry envelope, and standard AZS-32 typically does not deliver design life.',
    diagnosis: [
      'Typical flux-line wear rate: 10–14 mm/year on AZS-32 (target: 6–8 mm/year)',
      'Glass quality: typically 1.0–1.4 stones/100 kg attributable to refractory exudation',
      'Baseline flux-line: AZS-32 (32% ZrO₂)',
      'Atmosphere: oxidising with elevated SO₃ content from petcoke fuel switch',
    ],
    specification: [
      'Flux-line course: AZS-36 (36% ZrO₂, 50% Al₂O₃, 14% SiO₂), premium grade',
      'Bottom paving: standard AZS-32 (cost-effective, low wear zone)',
      'Throat: AZS-41 (highest premium, most aggressive zone)',
      'Crown: silica refractory (no change)',
      'Total fused cast: 145 tonnes for the flux-line and throat campaign',
    ],
    installation: [
      'Block dressing: each AZS-36 block hand-dressed for tight joint fit',
      'Joint material: AZS-36 mortar, joint width 1.5 mm maximum',
      'Cooling air ring: re-tuned to 22 m³/min on flux line (up from 18 m³/min)',
      'Heat-up: 50°C/day for first 8 days, 30°C/day to operating temperature',
      'Calderys + SAPL technical team on site for 3 weeks of heat-up',
    ],
    result: [
      'Expected flux-line life: 4 years → 5.5 years (~30–40% improvement typical)',
      'Expected defect ("stone") reduction: 1.0–1.4/100 kg → 0.2–0.4/100 kg (~70–80% lower)',
      'Expected container line yield improvement: +1.0 to +1.6 percentage points',
      'Capex deferral value: ~₹50–60 crore (USD 5.3–6.4M) tank rebuild deferred 18 months',
      'Energy: improved cooling-air efficiency typically saves 2–3% on tank fuel',
    ],
    metrics: {
      campaignLifeBefore: '4 years',
      campaignLifeAfter: '5.5 years (projected)',
      improvementPct: '+38%',
      annualSaving: '~₹7–9 crore NPV (USD 740–950k)',
      payback: 'Capex deferral covers premium AZS upcharge',
    },
    keyTakeaway:
      'Premium AZS-36 at the flux line, paired with re-tuned cooling air, typically delivers both longer life AND better glass quality in this application class. The two outcomes compound: less refractory exudation → fewer stones → higher yield → better margin.',
  },
];

// Helper: lookup by slug for the detail page
export function getCaseStudy(slug) {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

// Helper: ordered list (newest first) for the listing page
export function getCaseStudiesByYear() {
  return [...CASE_STUDIES].sort((a, b) => (b.year || 0) - (a.year || 0));
}
