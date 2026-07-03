// Centralized image URLs for the entire website
// All images sourced from Unsplash for commercial use

export const IMAGES = {
  // Company Logo
  logo: null,

  // Hero Backgrounds
  heroes: {
    home: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&fm=webp", // Steel furnace / rolling mill
    about: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=1920&q=80&fm=webp", // Industrial warehouse
    products: "/images/products/refractory-brick-lining-installation.jpg", // Stacked Bricks
    contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fm=webp", // Modern office
    blog: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80", // Factory
  },

  // Industry-Specific Hero Images
  industries: {
    steel: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=1920&q=80&fm=webp",
    cement: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=1920&q=80&fm=webp",
    aluminum: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=1920&q=80&fm=webp",
    petrochemical: "https://images.unsplash.com/photo-1768128834332-7d3479c8d634?w=1920&q=80&fm=webp",
    glass: "https://images.unsplash.com/photo-1625765362026-654dd71d07c5?w=1920&q=80&fm=webp",
    power: "https://images.unsplash.com/photo-1712931235644-b2126e4c90ff?w=800&q=80",
  },

  // Product Category Images
  categories: {
    shaped: "/images/products/refractory-brick-lining-installation.jpg", // Industrial kiln / bricks
    unshaped: "https://ifglgroup.com/wp-content/uploads/2025/03/Neutral-Ramming-Mass-1.jpg", // Powder/castable
    flowControl: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=800&q=80&fm=webp", // Steel casting
    insulation: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=800&q=80&fm=webp", // Ceramic fiber
    acidProofing: "https://images.unsplash.com/photo-1682891328125-c527a70dc69a?w=800&q=80", // Chemical resistant
    specialGrades: "https://images.unsplash.com/photo-1625765362026-654dd71d07c5?w=900&q=80", // Special applications
  },

  // Product Images
  products: {
    fireclay: "https://images.unsplash.com/photo-1682891328125-c527a70dc69a?w=600&q=80",
    highAlumina: "/images/products/refractory-brick-lining-installation.jpg",
    ifb: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=600&q=80&fm=webp",
    basicBricks: "https://images.unsplash.com/photo-1697281679213-fcab27e10ad4?w=800&q=80",
    sicBricks: "https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?w=800&q=80",
    lcc: "https://ifglgroup.com/wp-content/uploads/2025/03/Neutral-Ramming-Mass-1.jpg",
    ulcc: "https://ifglgroup.com/wp-content/uploads/2025/03/Neutral-Ramming-Mass-1.jpg",
    ramming: "https://images.unsplash.com/photo-1682317292230-c264e89e843f?w=800&q=80",
    gunning: "https://ifglgroup.com/wp-content/uploads/2025/08/basic-gunning-mass-1.webp",
    slideGate: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80&fm=webp",
    shrouds: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=600&q=80&fm=webp",
    ceramicFiber: "https://images.unsplash.com/photo-1601241773118-9e67091e199e?w=600&q=80&fm=webp",
    acidProof: "https://images.unsplash.com/photo-1682891328125-c527a70dc69a?w=800&q=80",
  },

  // Blog/Article Images
  blog: {
    technical: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80",
    howTo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    comparison: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?w=600&q=80&fm=webp",
    guide: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=600&q=80&fm=webp",
  }
};

// Standard Hero gradient overlay
export const HERO_GRADIENT = "linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(59, 130, 246, 0.85) 50%, rgba(30, 58, 138, 0.90) 100%)";

// Company Statistics (Corrected - established 1980)
export const COMPANY_STATS = [
  { value: "45+", label: "Years of Excellence", subtext: "Since 1980" },
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
