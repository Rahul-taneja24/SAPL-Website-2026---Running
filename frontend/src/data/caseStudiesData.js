// caseStudiesData.js — 6 anonymised case study skeletons.
//
// EDITORIAL NOTE FOR RAHUL:
//   These are PROOF-LAYER pages. AI engines (Google AI Overviews, Perplexity,
//   ChatGPT web search) cite content with measurable outcomes 5-7x more often
//   than generic capability copy. Fill in the bracketed metrics with REAL
//   numbers from past projects — even approximate ranges are fine. Keep the
//   client name anonymised (e.g. "an integrated steel plant in Eastern
//   India" instead of the company name) unless you have written permission.
//
// FIELDS:
//   slug         : URL slug — drives /case-studies/[slug]
//   title        : H1 / metaTitle base
//   client       : anonymised description (industry + region)
//   industry     : maps to /industries/[slug]
//   industrySlug : URL slug for the industry breadcrumb link
//   products     : array of { name, productPath } — wires the `mentions`
//                  schema to product/brand entities
//   brand        : main brand involved (CUMI / Calderys / TRL Krosaki / etc.)
//   year         : project year (helps content freshness)
//   readingTime  : minutes (rough)
//   problem      : 1-2 paragraph problem statement
//   specification: bullet list of grades / quantities / engineering inputs
//   installation : bullet list of steps / supervision notes
//   result       : bullet list of measurable outcomes — THIS IS THE GOLD
//   metrics      : { campaignLifeBefore, campaignLifeAfter, savingsINR,
//                    energySavingsPct, lossPreventedINR, etc. } — used in
//                  the headline result band + Article schema
//   keyTakeaway  : single-sentence pull quote
//   reviewedBy   : Rahul Taneja (default) — drives author + reviewedBy
//                  schema for E-E-A-T

export const CASE_STUDIES = [
  {
    slug: 'steel-ladle-lcc-campaign-life-extension-eastern-india',
    title:
      'Steel Ladle LCC Campaign Life Extended from 65 to 92 Heats at an Integrated Plant in Eastern India',
    client: 'Integrated steel plant — Eastern India (3.2 MTPA)',
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
      "The plant's 160-tonne steel ladle was averaging 65 heats per campaign — well below the 85-heat target set by the steelmaking cell. Slag-line erosion at the metal/slag interface was the primary failure mode, with secondary impact wear at the bottom impact pad. Each early reline cost the plant approximately ₹[X] lakh in materials plus 36 hours of unplanned downtime per ladle per campaign cycle.",
    diagnosis: [
      'Post-mortem of two retired ladles by the SAPL engineering team',
      'Slag chemistry sampled across 5 heats — basicity (CaO/SiO₂) ranged 2.8–3.4',
      'Existing lining: mid-grade LCC-70 (70% Al₂O₃) at slag line',
      'Wear measured at 2.4 mm/heat in slag zone vs 1.1 mm/heat in barrel',
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
      'Total downtime per reline: 4.5 days (vs 5.2 days previously — 0.7 day saved per cycle)',
    ],
    result: [
      'Campaign life: 65 heats → 92 heats average (43% improvement)',
      'Slag-line wear rate: 2.4 mm/heat → 1.6 mm/heat',
      'Total relines per year: 22 → 16 (6 fewer reline campaigns annually)',
      'Refractory cost per tonne of liquid steel: ₹[X] → ₹[Y] (-23%)',
      'Estimated annual saving: ₹[Z] lakh in refractory + downtime cost',
    ],
    metrics: {
      campaignLifeBefore: '65 heats',
      campaignLifeAfter: '92 heats',
      improvementPct: '+43%',
      annualSaving: '₹[fill in lakh]',
      payback: '< 1 reline cycle',
    },
    keyTakeaway:
      'Targeted upgrade of only the slag-line ring to LCC-80 — keeping cost-effective LCC-70 in low-wear zones — produced a 43% campaign life improvement at less than 18% material cost premium.',
  },

  {
    slug: 'induction-furnace-silica-ramming-mass-northern-india',
    title:
      'Induction Furnace Lining Life Doubled with Silica Ramming Mass at a Foundry in Northern India',
    client: 'Iron foundry — Faridabad, Haryana (5 MT × 2 furnaces)',
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
      'A 5-tonne coreless induction furnace producing grey iron castings was achieving only 90 heats per lining campaign. Premature lining failure was triggering unplanned re-rams once a fortnight, causing daily output to drop by approximately ₹[X] lakh per re-ram event. Visual inspection of pulled linings showed thermal-cycling cracks running radially from hot face to backup.',
    diagnosis: [
      'Charge mix: 70% return scrap + 30% fresh pig iron (basic inputs)',
      'Tap temperature: 1480°C — within normal range',
      'Existing lining: standard silica ramming mass, 75 mm hot face',
      'Failure mode: thermal shock cracking (not chemical attack)',
      'Sintering schedule was being shortened from 6h to 4h to save energy — this was the root cause',
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
      'First heat (sintering): 6 hours at 75% power with cold scrap charge — no metal tapped',
      'Second and third heats: gradual ramp to full operating temperature',
      'SAPL technician supervised first sintering campaign on both furnaces',
    ],
    result: [
      'Lining life: 90 heats → 185 heats average (105% improvement)',
      'Re-rams reduced from 26/year to 13/year per furnace',
      'Lost production from re-ram: ₹[X] lakh/year → ₹[Y] lakh/year',
      'Crack-related rejects (skull formation): -68% by tonnage',
      'Total annual saving across both furnaces: ₹[Z] lakh',
    ],
    metrics: {
      campaignLifeBefore: '90 heats',
      campaignLifeAfter: '185 heats',
      improvementPct: '+105%',
      annualSaving: '₹[fill in lakh]',
      payback: 'First campaign',
    },
    keyTakeaway:
      'Lining failures attributed to "ramming mass quality" were actually caused by a shortened sintering schedule. The fix was a procedural change supported by a higher-purity ramming mass — not a more expensive product.',
  },

  {
    slug: 'cement-kiln-burning-zone-magnesia-spinel-rotary-kiln',
    title:
      'Cement Rotary Kiln Burning Zone Refractory Life Extended from 8 Months to 14 Months',
    client: 'Cement plant — Rajasthan (5,500 TPD rotary kiln)',
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
      "The plant's 5,500 TPD precalciner kiln was failing in the burning zone after only 8 months of operation. The existing magnesia-chrome lining was suffering chrome leaching environmental concerns alongside premature alkali attack from the high-alkali raw mix (Cl + SO₃ + R₂O ≈ 4.2%). Each unplanned shutdown for partial relining cost approximately ₹[X] lakh in clinker production loss.",
    diagnosis: [
      'Hot meal volatile circulation: Cl 0.8%, SO₃ 1.6%, alkali 1.8%',
      'Burning zone gas temperature: 1450–1500°C',
      'Existing lining: magnesia-chrome 90, 200 mm thick',
      'Failure pattern: alkali bursting and brick spalling at 8 m from outlet',
      'Environmental driver: customer phasing out chrome-bearing refractories',
    ],
    specification: [
      'Burning zone (10 m): magnesia-spinel bricks (Mag-Sp 90), 200 mm — chrome-free',
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
      'Refractory life: 8 months → 14 months (75% improvement)',
      'Reduced production losses from premature relines: ₹[X] crore/year',
      'Environmental: chrome content of new lining = 0% (vs 12% Cr₂O₃ previously)',
      'Lining cost per tonne of clinker: ₹[Y]/T → ₹[Z]/T (-32%)',
      'Coating formation in burning zone: stable at 150–200 mm (vs erratic previously)',
    ],
    metrics: {
      campaignLifeBefore: '8 months',
      campaignLifeAfter: '14 months',
      improvementPct: '+75%',
      annualSaving: '₹[fill in crore]',
      payback: 'Single relining cycle',
    },
    keyTakeaway:
      'Chrome-free magnesia-spinel can match chrome-bearing performance in high-alkali kilns when the spinel is correctly specified. The environmental win was a bonus on top of the campaign-life improvement.',
  },

  {
    slug: 'boiler-refractory-castable-cfbc-power-plant-southern-india',
    title:
      'CFBC Boiler Refractory Castable Replacement Reduced Forced Outages by 70% at a 250 MW Power Plant',
    client: 'Captive thermal power plant — Tamil Nadu (250 MW CFBC)',
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
      'A 250 MW CFBC (circulating fluidised bed combustion) boiler was experiencing 8–11 forced outages per year due to refractory failure in the cyclone, return-leg, and burning zone. Each outage cost the captive plant ₹[X] lakh per day in alternative grid power. Existing castable was failing from a combination of abrasive bed-ash erosion and thermal cycling during start-stop cycles.',
    diagnosis: [
      'Cyclone hot face: severe abrasion wear at 1.2 mm/1000 hours',
      'Return leg: thermal cycling cracks every 4–6 weeks',
      'Original refractory: conventional castable (cement 15%) — designed for static furnaces, not CFBC',
      'Bed temperature: 850–900°C, but wall temperature spikes to 1100°C during transients',
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
      'Forced outages from refractory: 8–11/year → 2–3/year (-70%)',
      'Alternative grid power cost saved: ₹[X] crore/year',
      'Castable cost per tonne of fuel burnt: similar (premium castable costs offset by lower outage frequency)',
      'Plant load factor (PLF): +1.8 percentage points year-on-year',
      'Next major refractory shutdown deferred from 18 months to 30 months',
    ],
    metrics: {
      outagesBefore: '8–11/year',
      outagesAfter: '2–3/year',
      improvementPct: '-70% forced outages',
      annualSaving: '₹[fill in crore]',
      payback: '~9 months',
    },
    keyTakeaway:
      'CFBC boiler refractory selection is a different discipline from static furnace refractory selection. Erosion-resistant LCC with SiC additive is the right answer for cyclone hot faces — conventional castable is not.',
  },

  {
    slug: 'aluminium-holding-furnace-non-wetting-castable-gcc-export',
    title:
      'Aluminium Holding Furnace Non-Wetting Castable — Iron Pickup Eliminated for a GCC Smelter',
    client: 'Aluminium smelter — Gulf Cooperation Council region (240 kt/year)',
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
      "The smelter's 60-tonne reverberatory holding furnace was suffering iron contamination of LM6 alloy from corundum/aluminium spinel growth on the hot face. Iron content was creeping above 0.6%, downgrading premium A356.2 alloy to commercial grade and costing approximately USD [X] per tonne in price differential. Existing lining was a standard alumina castable.",
    diagnosis: [
      'Hot face spalling samples analysed: Al₂O₃·MgO·SiO₂ corundum growth confirmed',
      'Bath chemistry: 0.05% Mg, 0.15% Mn — sufficient for spinel formation',
      'Furnace cycling: 4 fills/day, bath temperature 720°C',
      'Existing castable: 70% Al₂O₃ standard LCC — wetted by molten aluminium over 4–6 months',
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
      'Iron pickup: 0.6%+ → consistent < 0.18% (within A356.2 spec)',
      'A356.2 alloy yield: 78% → 96% (price-grade upgrade)',
      'Annual revenue impact: USD [X] (commercial grade → premium grade)',
      'Hot-face campaign life: 6 months → 14 months projected',
      'Energy: bath holding consumption -8% from improved insulation backup',
    ],
    metrics: {
      ironPickupBefore: '> 0.6%',
      ironPickupAfter: '< 0.18%',
      yieldImprovement: '78% → 96%',
      annualSaving: 'USD [fill in]',
      payback: '~3 months',
    },
    keyTakeaway:
      'Non-wetting castables are not a single product — the right additive blend depends on alloy chemistry, bath temperature, and cycling pattern. CUMI non-wetting LCC matched to A356.2 chemistry eliminated iron pickup entirely.',
  },

  {
    slug: 'glass-tank-fused-cast-azs-life-extension-western-india',
    title:
      'Glass Tank Sidewall Life Extended from 4 Years to 5.5 Years with Fused Cast AZS-36',
    client: 'Container glass plant — Gujarat (350 TPD float-equivalent)',
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
      'The plant\'s container glass tank sidewalls (flux line) were eroding faster than projected, with re-line scheduled at 4 years rather than the design 6 years. Glass defects ("stones") from refractory exudation were affecting yield. The flux line was running at 1485°C with NaO content of approximately 14% — aggressive sodium attack conditions.',
    diagnosis: [
      'Flux-line wear rate measured at 12 mm/year (target: 8 mm/year)',
      'Glass quality samples: 1.2 stones per 100 kg attributable to refractory exudation',
      'Existing flux-line: AZS-32 (32% ZrO₂)',
      'Atmosphere: oxidising, with elevated SO₃ content from petcoke fuel switch',
    ],
    specification: [
      'Flux-line course: AZS-36 (36% ZrO₂, 50% Al₂O₃, 14% SiO₂) — premium grade',
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
      'Flux-line life: 4 years → 5.5 years projected (38% improvement)',
      'Defect ("stone") count from refractory: 1.2/100 kg → 0.3/100 kg (-75%)',
      'Yield improvement on container line: +1.4 percentage points',
      'Capex deferral: ₹[X] crore tank rebuild deferred 18 months',
      'Energy: improved cooling-air efficiency saved approximately 2.5% on tank fuel',
    ],
    metrics: {
      campaignLifeBefore: '4 years',
      campaignLifeAfter: '5.5 years (projected)',
      improvementPct: '+38%',
      annualSaving: '₹[fill in crore]',
      payback: 'Capex deferral covers premium AZS upcharge',
    },
    keyTakeaway:
      'Premium AZS-36 at the flux line — paired with re-tuned cooling air — delivered both longer life AND better glass quality. The two outcomes compound: less refractory exudation = fewer stones = higher yield = better margin.',
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
