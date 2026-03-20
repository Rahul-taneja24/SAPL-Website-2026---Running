// Centralized image URLs for the entire website
// All images sourced from Unsplash for commercial use

export const IMAGES = {
  // Company Logo
  logo: null,

  // Hero Backgrounds
  heroes: {
    home: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&fm=webp", // Steel furnace / rolling mill
    about: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=1920&q=80&fm=webp", // Industrial warehouse
    products: "https://images.unsplash.com/photo-1590725140246-1271f2868ff1?w=1920&q=80&fm=webp", // Stacked Bricks
    contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fm=webp", // Modern office
    blog: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&fm=webp", // Factory
  },

  // Industry-Specific Hero Images
  industries: {
    steel: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=1920&q=80&fm=webp",
    cement: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=1920&q=80&fm=webp",
    aluminum: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=1920&q=80&fm=webp",
    petrochemical: "https://images.unsplash.com/photo-1768128834332-7d3479c8d634?w=1920&q=80&fm=webp",
    glass: "https://images.unsplash.com/photo-1625765362026-654dd71d07c5?w=1920&q=80&fm=webp",
    power: "https://images.unsplash.com/photo-1747345341772-7516f6b54958?w=1920&q=80&fm=webp",
  },

  // Product Category Images
  categories: {
    shaped: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fm=webp", // Industrial kiln / bricks
    unshaped: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80&fm=webp", // Powder/castable
    flowControl: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=800&q=80&fm=webp", // Steel casting
    insulation: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=800&q=80&fm=webp", // Ceramic fiber
    acidProofing: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp", // Chemical resistant
    specialGrades: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fm=webp", // Special applications
  },

  // Product Images
  products: {
    fireclay: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fm=webp",
    highAlumina: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fm=webp",
    ifb: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=600&q=80&fm=webp",
    basicBricks: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fm=webp",
    sicBricks: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fm=webp",
    lcc: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&fm=webp",
    ulcc: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&fm=webp",
    ramming: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&fm=webp",
    gunning: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&fm=webp",
    slideGate: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80&fm=webp",
    shrouds: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80&fm=webp",
    ceramicFiber: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=600&q=80&fm=webp",
    acidProof: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fm=webp",
  },

  // Blog/Article Images
  blog: {
    technical: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fm=webp",
    howTo: "https://images.unsplash.com/photo-1611078713171-460e408ec92a?w=600&q=80&fm=webp",
    comparison: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=600&q=80&fm=webp",
    guide: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=600&q=80&fm=webp",
  }
};

// Standard Hero gradient overlay
export const HERO_GRADIENT = "linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(59, 130, 246, 0.85) 50%, rgba(30, 58, 138, 0.90) 100%)";

// Company Statistics (Corrected - established 1980)
export const COMPANY_STATS = [
  { value: "40+", label: "Years of Excellence", subtext: "Since 1980" },
  { value: "500+", label: "Industrial Clients", subtext: "Worldwide" },
  { value: "50+", label: "Countries Served", subtext: "Global Reach" },
  { value: "24/7", label: "Technical Support", subtext: "Always Available" }
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: "shaped",
    name: "Shaped Refractories",
    slug: "shaped-refractories",
    shortDesc: "Fired and chemically bonded refractory bricks for working, safety, and backup linings",
    productCount: 5,
    image: IMAGES.categories.shaped,
    path: "/products/shaped-refractories"
  },
  {
    id: "unshaped",
    name: "Unshaped Refractories",
    slug: "unshaped-refractories",
    shortDesc: "Monolithic refractories including castables, ramming masses, and gunning materials",
    productCount: 6,
    image: IMAGES.categories.unshaped,
    path: "/products/unshaped-refractories"
  },
  {
    id: "flow-control",
    name: "Flow Control",
    slug: "flow-control",
    shortDesc: "Precision-engineered refractories for controlling molten steel flow",
    productCount: 5,
    image: IMAGES.categories.flowControl,
    path: "/products/flow-control"
  },
  {
    id: "insulation",
    name: "Insulation",
    slug: "insulation",
    shortDesc: "Lightweight thermal insulation materials for energy efficiency",
    productCount: 3,
    image: IMAGES.categories.insulation,
    path: "/products/insulation"
  },
  {
    id: "acid-proofing",
    name: "Acid Proofing",
    slug: "acid-proofing",
    shortDesc: "Chemical-resistant ceramics for corrosive environments",
    productCount: 3,
    image: IMAGES.categories.acidProofing,
    path: "/products/acid-proofing"
  },
  {
    id: "special-grades",
    name: "Special Grades",
    slug: "special-grades",
    shortDesc: "Custom and specialized refractory solutions",
    productCount: "Variable",
    image: IMAGES.categories.specialGrades,
    path: "/products/special-grades"
  }
];

export default IMAGES;
