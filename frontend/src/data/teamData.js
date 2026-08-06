/**
 * SAPL engineering team — bio data for /about/team/[memberSlug] pages.
 * These pages back the named Author fields on blog posts (Article schema
 * + E-E-A-T bylines) with a real bio page, so author.url points somewhere
 * substantive instead of a 404 or the generic /about page.
 */

export const TEAM_DATA = [
  {
    slug: "rahul-taneja",
    name: "Rahul Taneja",
    role: "Director, Shanker Agencies Pvt. Ltd.",
    shortBio: "Director at Shanker Agencies since 2018, leading sales engineering, export strategy and digital operations for SAPL's refractory supply business.",
    bio: "Rahul Taneja joined Shanker Agencies in 2018 as Director, bringing second-generation leadership to the 45-year-old family business founded by Mohan Taneja in 1980. He leads sales engineering, supplier selection strategy and SAPL's export operations across the GCC, ASEAN and African markets. Rahul has driven SAPL's expansion from a Delhi NCR-focused general refractory supplier into a technically specialised partner for steel, cement, aluminium and petrochemical plants across 50+ export countries, while modernising the company's digital presence and customer engineering support.",
    expertise: ["Refractory supplier selection", "Export documentation & logistics", "Steel plant procurement strategy", "Business development"],
    yearsExperience: "8+",
    linkedin: "https://www.linkedin.com/in/rahultaneja24/",
  },
  {
    slug: "suresh-iyer",
    name: "Suresh Iyer",
    role: "Steel Plant Refractory Specialist",
    shortBio: "Steel plant refractory specialist focused on high alumina brick grades, MgO-C bricks and steel ladle lining material selection.",
    bio: "Suresh Iyer specialises in refractory selection for steel plant applications, with particular depth in high alumina brick grading (AL45–AL90), magnesia-carbon bricks for BOF and EAF converters, and steel ladle working lining design. He works directly with plant engineering teams across India's major steel hubs to match refractory grades to specific slag chemistries, campaign-life targets and installation constraints, and reviews post-mortem data from spent linings to refine grade recommendations for future campaigns.",
    expertise: ["High alumina brick grading (AL45–AL90)", "MgO-C brick selection for BOF/EAF", "Steel ladle campaign life optimisation", "Slag chemistry analysis"],
    yearsExperience: "15+",
  },
  {
    slug: "vikram-bhattacharya",
    name: "Vikram Bhattacharya",
    role: "Senior Refractory Engineer — Induction Furnace Linings",
    shortBio: "Senior refractory engineer specialising in induction furnace ramming mass selection, sintering schedules and lining failure analysis.",
    bio: "Vikram Bhattacharya focuses on induction furnace refractory linings — ramming mass grade selection (silica, alumina and magnesia families), sintering schedule design, and root-cause analysis of premature lining failures. He has supported foundries and steel melting shops in optimising cost-per-heat through correct grade matching to metal type and furnace duty cycle, and regularly conducts on-site lining audits to diagnose wear patterns before they become unplanned shutdowns.",
    expertise: ["Induction furnace ramming mass selection", "Sintering schedule design", "Lining failure root-cause analysis", "Foundry & steel melting shop support"],
    yearsExperience: "12+",
  },
  {
    slug: "anil-khanna",
    name: "Anil Khanna",
    role: "Refractory Installation & Export Consultant",
    shortBio: "Installation consultant covering castable placement, dry-out scheduling, anchor systems and export documentation for international buyers.",
    bio: "Anil Khanna advises on refractory installation practice — castable placement methods (LCC, ULCC and conventional), dry-out curve design, and anchor/fastening system selection for monolithic linings. He also supports SAPL's export desk, guiding international buyers through documentation requirements (COO, MTC, MSDS), Incoterms selection and shipping logistics for orders moving to the GCC, ASEAN and African markets.",
    expertise: ["Castable installation (LCC/ULCC/conventional)", "Dry-out schedule design", "Refractory anchor systems", "Export documentation & Incoterms"],
    yearsExperience: "18+",
  },
  {
    slug: "pradeep-reddy",
    name: "Pradeep Reddy",
    role: "Cement Kiln Refractory Lead",
    shortBio: "Cement kiln refractory lead specialising in zone-by-zone material selection for rotary kilns, preheaters and calciners.",
    bio: "Pradeep Reddy leads cement kiln refractory recommendations, with a focus on zone-specific material selection across the burning zone, transition zone, preheater and calciner sections of rotary kiln systems. He works with cement plant maintenance teams to plan refractory campaigns around kiln shutdown schedules and has deep experience with magnesia-spinel chrome-free brick systems for burning zone applications.",
    expertise: ["Rotary kiln zone material selection", "Chrome-free magnesia-spinel systems", "Preheater & calciner refractories", "Kiln shutdown planning"],
    yearsExperience: "14+",
  },
  {
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Acid-Proofing Lining Specialist",
    shortBio: "Acid-proofing specialist covering chemical-resistant brick and tile linings for process vessels, tanks and flooring.",
    bio: "Arjun Mehta specialises in acid-proof and acid-resistant lining systems for chemical plants — brick and tile selection per IS 4860, jointing cement chemistry (silicate vs. resin-based), and membrane design for corrosive-service vessels and flooring. He advises process plant engineers on matching lining systems to specific acid concentrations, temperatures and mechanical duty.",
    expertise: ["Acid-proof brick & tile systems (IS 4860)", "Chemical-resistant jointing cement", "Process vessel lining design", "Corrosion-resistant flooring"],
    yearsExperience: "11+",
  },
  {
    slug: "rajesh-krishnan",
    name: "Rajesh Krishnan",
    role: "Glass Refractory Engineer",
    shortBio: "Glass furnace refractory engineer specialising in AZS, zircon and silica material selection for melting tanks and regenerators.",
    bio: "Rajesh Krishnan focuses on refractories for glass melting furnaces — fused-cast AZS block selection for tank contact zones, zircon and silica material specification for regenerators and superstructure, and campaign life planning around glass furnace rebuild cycles. He works with glass plant engineering teams to balance material cost against glass-contact corrosion resistance for specific glass chemistries.",
    expertise: ["Fused-cast AZS block selection", "Glass tank & regenerator refractories", "Zircon and silica material specification", "Furnace rebuild campaign planning"],
    yearsExperience: "13+",
  },
  {
    slug: "deepak-sharma",
    name: "Deepak Sharma",
    role: "Flow Control Refractories Engineer",
    shortBio: "Flow control specialist covering slide gate plates, ladle shrouds, SEN and stopper systems for continuous casting operations.",
    bio: "Deepak Sharma specialises in flow control refractories for steel continuous casting — slide gate plate selection and bore sizing, ladle shroud and submerged entry nozzle (SEN) specification, and stopper rod systems. He supports steel plant caster teams in matching flow control components to casting speed, steel grade and sequence length requirements.",
    expertise: ["Slide gate plate selection & bore sizing", "SEN and ladle shroud specification", "Stopper rod systems", "Continuous casting flow control"],
    yearsExperience: "10+",
  },
  {
    slug: "mohan-desai",
    name: "Mohan Desai",
    role: "Insulation & Materials Technologist",
    shortBio: "Insulation specialist comparing ceramic fiber, insulating firebrick and calcium silicate systems for furnace and backup lining applications.",
    bio: "Mohan Desai focuses on insulation material selection for high-temperature applications — ceramic fiber blankets, modules and boards versus insulating firebrick and calcium silicate systems. He advises on backup lining design for furnace shells, evaluating thermal conductivity, mechanical durability and cost trade-offs for each insulation family based on operating temperature and service duty.",
    expertise: ["Ceramic fiber vs. insulating firebrick selection", "Calcium silicate backup insulation", "Furnace shell thermal design", "Insulation cost-performance analysis"],
    yearsExperience: "9+",
  },
  {
    slug: "sanjay-gupta",
    name: "Sanjay Gupta",
    role: "Furnace Engineering Consultant",
    shortBio: "Furnace engineering consultant specialising in refractory consumption reduction, maintenance scheduling and lining life extension programs.",
    bio: "Sanjay Gupta advises plants on refractory consumption reduction and maintenance scheduling — building inspection and patching schedules calibrated to furnace type (heat-count driven for ladles, calendar driven for kilns, load-cycle driven for boilers), and identifying operational practices that shorten lining life. He conducts plant visits to review lining logs, set reline decision thresholds, and structure planned-shutdown timelines that reduce emergency repair costs.",
    expertise: ["Refractory maintenance scheduling", "Consumption reduction programs", "Shutdown planning", "Lining life extension"],
    yearsExperience: "16+",
  },
];

export function getTeamMemberBySlug(slug) {
  return TEAM_DATA.find((m) => m.slug === slug);
}
