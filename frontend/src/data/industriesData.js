// Simple industry list
export const INDUSTRIES_LIST = [
  { id: "steel", name: "Iron & Steel", image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=1200&q=80", clients: "200+", temp: "1800°C" },
  { id: "cement", name: "Cement", image: "https://images.unsplash.com/photo-1667328931918-b6362ed95c1e?w=1200&q=80", clients: "100+", temp: "1450°C" },
  { id: "aluminum", name: "Aluminum", image: "https://images.unsplash.com/photo-1684259499227-e9844ab79747?w=1200&q=80", clients: "50+", temp: "1200°C" },
  { id: "petrochemical", name: "Petrochemical", image: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=1200&q=80", clients: "45+", temp: "1100°C" },
  { id: "glass", name: "Glass", image: "https://images.unsplash.com/photo-1767725185080-5e8bffbfaee9?w=1200&q=80", clients: "30+", temp: "1600°C" },
  { id: "power", name: "Power Generation", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80", clients: "60+", temp: "1400°C" }
];

// Taglines and descriptions
const taglines = {
  steel: "Complete Refractory Solutions for Steel Making",
  cement: "High Performance Refractories for Cement Kilns",
  aluminum: "Non-Wetting Solutions for Aluminum Industry",
  petrochemical: "Heat-Resistant Linings for Process Industries",
  glass: "Premium Refractories for Glass Melting",
  power: "Durable Solutions for Power Plants"
};

const descriptions = {
  steel: "From blast furnace to continuous casting, we provide engineered refractory solutions.",
  cement: "Engineered solutions for rotary kilns, preheaters, and coolers.",
  aluminum: "Specialized refractories with excellent non-wetting properties.",
  petrochemical: "Engineered refractory and insulation solutions for refineries.",
  glass: "AZS and fused cast refractories for glass melting tanks.",
  power: "Refractories and insulation for boilers and incinerators."
};

const heroImages = {
  steel: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=1920&q=80",
  cement: "https://images.unsplash.com/photo-1667328931918-b6362ed95c1e?w=1920&q=80",
  aluminum: "https://images.unsplash.com/photo-1684259499227-e9844ab79747?w=1920&q=80",
  petrochemical: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=1920&q=80",
  glass: "https://images.unsplash.com/photo-1767725185080-5e8bffbfaee9?w=1920&q=80",
  power: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80"
};

export function getIndustryData(id) {
  return {
    tagline: taglines[id] || "",
    description: descriptions[id] || "",
    heroImage: heroImages[id] || ""
  };
}

// Equipment areas - separate arrays to avoid deep nesting
const steelEquipment = [
  { name: "Blast Furnace", image: "https://images.unsplash.com/photo-1682317292230-c264e89e843f?w=600&q=80", desc: "Hearth, bosh, belly, and stack linings.", conditions: "Up to 1600°C", products: "Carbon Blocks, SiC Bricks, High Alumina" },
  { name: "Steel Ladle", image: "https://images.unsplash.com/photo-1697281679213-fcab27e10ad4?w=600&q=80", desc: "Working and permanent lining solutions.", conditions: "Up to 1750°C", products: "MgO-C Bricks, AL70/AL80, LC Castables" },
  { name: "BOF/EAF", image: "https://images.unsplash.com/photo-1615219023549-5c9abdb7df9a?w=600&q=80", desc: "Magnesia carbon solutions for converters.", conditions: "Up to 1800°C", products: "MgO-C Bricks, Dolomite, Gunning Mass" },
  { name: "Tundish", image: "https://images.pexels.com/photos/3361235/pexels-photo-3361235.jpeg?w=600", desc: "Spray masses and permanent linings.", conditions: "Up to 1650°C", products: "Tundish Boards, Spray Mass, Dry Vib" },
  { name: "Continuous Casting", image: "https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?w=600&q=80", desc: "Flow control refractories.", conditions: "Steel flow", products: "Slide Gates, Shrouds, SEN" }
];

const cementEquipment = [
  { name: "Burning Zone", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", desc: "Basic brick solutions for highest temp.", conditions: "1350-1450°C", products: "MgO Spinel, Dolomite" },
  { name: "Transition Zone", image: "https://images.unsplash.com/photo-1729517764961-97cce4c6fdc8?w=600&q=80", desc: "High alumina for chemical attack.", conditions: "1200-1350°C", products: "High Alumina, LC Castables" },
  { name: "Preheater", image: "https://images.unsplash.com/photo-1699221647092-c2ce96d2a675?w=600&q=80", desc: "Abrasion resistant castables.", conditions: "850-1100°C", products: "AR Castables, Anchors" },
  { name: "Cooler", image: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=600&q=80", desc: "Wear-resistant tiles and castables.", conditions: "Up to 1200°C", products: "SiC Tiles, AR Castables" }
];

const aluminumEquipment = [
  { name: "Melting Furnace", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "Non-wetting castables and bricks.", conditions: "Up to 1100°C", products: "Non-Wetting Castables, High Alumina" },
  { name: "Holding Furnace", image: "https://images.unsplash.com/photo-1682587627351-b40273a5d11b?w=600&q=80", desc: "Long-life solutions.", conditions: "700-850°C", products: "Non-Wetting Castables, Ceramic Fiber" },
  { name: "Casting", image: "https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?w=600&q=80", desc: "Launders and casting pit.", conditions: "Metal flow", products: "Fused Silica, Fiber Boards" }
];

const petrochemEquipment = [
  { name: "Fired Heaters", image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&q=80", desc: "Ceramic fiber modules and castables.", conditions: "Up to 1100°C", products: "CF Modules, CF Blankets" },
  { name: "FCCU", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", desc: "Abrasion resistant linings.", conditions: "High velocity", products: "AR Castables, Erosion Shields" },
  { name: "Reformers", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80", desc: "High temperature insulation.", conditions: "Up to 1000°C", products: "CF Modules, Microporous" }
];

const glassEquipment = [
  { name: "Melting Tank", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80", desc: "AZS fused cast blocks.", conditions: "Up to 1580°C", products: "AZS 33/41, High Zirconia" },
  { name: "Regenerators", image: "https://images.unsplash.com/photo-1568621422837-a343133e2bb9?w=600&q=80", desc: "Checker bricks for heat recovery.", conditions: "Thermal cycling", products: "MgO Bricks, Silica" },
  { name: "Forehearth", image: "https://images.unsplash.com/photo-1682587627351-b40273a5d11b?w=600&q=80", desc: "Temperature control refractories.", conditions: "Conditioning", products: "Fused Silica, AZS" }
];

const powerEquipment = [
  { name: "Boiler Furnace", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", desc: "Abrasion resistant linings.", conditions: "Ash erosion", products: "AR Castables, SiC Tiles" },
  { name: "FBC Boilers", image: "https://images.pexels.com/photos/3361235/pexels-photo-3361235.jpeg?w=600", desc: "Erosion-resistant solutions.", conditions: "Particle impact", products: "Erosion Castables, SiC" },
  { name: "Incinerators", image: "https://images.unsplash.com/photo-1682587627351-b40273a5d11b?w=600&q=80", desc: "Acid-resistant linings.", conditions: "Acid gases", products: "Acid Resistant, Castables" }
];

export function getEquipmentAreas(id) {
  const areas = { steel: steelEquipment, cement: cementEquipment, aluminum: aluminumEquipment, petrochemical: petrochemEquipment, glass: glassEquipment, power: powerEquipment };
  return areas[id] || [];
}

// Products - separate arrays
const steelProducts = [
  { name: "Hicast 70 LC", brand: "CUMI", use: "Steel ladles", temp: "1600°C" },
  { name: "AL80 Brick", brand: "CUMI", use: "Severe duty", temp: "1750°C" },
  { name: "MgO-C Brick", brand: "Tata", use: "BOF/EAF", temp: "1800°C" },
  { name: "Slide Gate", brand: "Tata", use: "Flow control", temp: "1650°C" },
  { name: "SEN", brand: "IFGL", use: "Casting", temp: "1650°C" }
];

const cementProducts = [
  { name: "MgO Spinel", brand: "CUMI", use: "Burning zone", temp: "1750°C" },
  { name: "AL70 Brick", brand: "CUMI", use: "Transition", temp: "1700°C" },
  { name: "Whytheat A", brand: "Calderys", use: "High temp", temp: "1700°C" },
  { name: "Gunning Mass", brand: "Mahakoshal", use: "Hot repairs", temp: "1550°C" }
];

const aluminumProducts = [
  { name: "Non-Wetting Castable", brand: "CUMI", use: "Melting", temp: "1200°C" },
  { name: "CF Module", brand: "Divine", use: "Backup", temp: "1260°C" }
];

const petrochemProducts = [
  { name: "CF Blanket 1260", brand: "Divine", use: "Insulation", temp: "1260°C" },
  { name: "CF Module", brand: "Divine", use: "Hot face", temp: "1260°C" }
];

const glassProducts = [
  { name: "AZS Fused Cast", brand: "Specialized", use: "Tank walls", temp: "1600°C" },
  { name: "High Zirconia", brand: "CUMI", use: "Glass contact", temp: "1650°C" }
];

const powerProducts = [
  { name: "SiC Brick", brand: "CUMI", use: "High abrasion", temp: "1650°C" },
  { name: "AR Castable", brand: "Calderys", use: "Boiler", temp: "1400°C" }
];

export function getRecommendedProducts(id) {
  const products = { steel: steelProducts, cement: cementProducts, aluminum: aluminumProducts, petrochemical: petrochemProducts, glass: glassProducts, power: powerProducts };
  return products[id] || [];
}

// Services
const serviceData = {
  steel: ["Refractory Engineering", "Installation", "Campaign Optimization", "Technical Audits"],
  cement: ["Kiln Audit", "Brick Selection", "Installation", "Management"],
  aluminum: ["Furnace Design", "Energy Audits", "Installation"],
  petrochemical: ["Energy Audit", "Insulation Engineering", "Turnaround Support"],
  glass: ["Tank Design", "Cold Repair", "Hot Repair"],
  power: ["Boiler Inspection", "Outage Planning", "Hot Repairs"]
};

export function getServices(id) {
  return serviceData[id] || [];
}
