'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ChevronRight, Factory, ThermometerSun, FileText } from "lucide-react";
import apiService from "../services/api";
import { BlogListSkeleton } from "../components/LoadingSkeleton";

// Fallback data in case CMS is unavailable
const fallbackPlantsList = [
  { id: "steel", name: "Iron & Steel Plant", image: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=800&q=80", temp: "1800°C" },
  { id: "cement", name: "Cement Plant", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", temp: "1450°C" },
  { id: "aluminum", name: "Aluminum Smelter", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", temp: "1200°C" },
  { id: "petrochemical", name: "Petrochemical", image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80", temp: "1100°C" },
  { id: "glass", name: "Glass Plant", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80", temp: "1600°C" },
  { id: "power", name: "Power Plant", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", temp: "1400°C" }
];

const Solutions = () => {
  const { plantType } = useParams();
  const [selectedPlant, setSelectedPlant] = useState(plantType || null);
  const [plantsList, setPlantsList] = useState(fallbackPlantsList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const response = await apiService.getIndustries();

      if (response && response.length > 0) {
        // Transform CMS data to match expected format
        const transformedData = response.map(industry => ({
          id: industry.slug || industry.id,
          name: industry.name,
          image: industry.image_url || industry.image || fallbackPlantsList.find(p => p.id === industry.slug)?.image,
          temp: industry.max_temp || industry.tempRange || "Variable",
          description: industry.description || "",
          areas: industry.equipment_areas || [],
          products: industry.recommended_products || []
        }));
        setPlantsList(transformedData);
      } else {
        setPlantsList(fallbackPlantsList);
      }
    } catch (err) {
      console.warn('Failed to fetch industries from CMS, using fallback:', err);
      setPlantsList(fallbackPlantsList);
    } finally {
      setLoading(false);
    }
  };

  const getDescription = (id, plantData) => {
    if (plantData && plantData.description) return plantData.description;

    // Fallback descriptions
    if (id === "steel") return "Complete refractory solutions for blast furnaces, BOF/EAF, ladles, tundish, and continuous casting.";
    if (id === "cement") return "High-performance refractories for rotary kilns, preheaters, calciners, and coolers.";
    if (id === "aluminum") return "Non-wetting refractories for melting, holding, and casting operations.";
    if (id === "petrochemical") return "Heat-resistant linings for fired heaters, crackers, and reformers.";
    if (id === "glass") return "Premium AZS and fused cast refractories for glass melting tanks.";
    if (id === "power") return "Durable refractories for boilers, incinerators, and ash handling.";
    return "";
  };

  const getAreas = (id, plantData) => {
    if (plantData && plantData.areas && plantData.areas.length > 0) return plantData.areas;

    // Fallback areas
    if (id === "steel") return ["Blast Furnace", "Steel Ladle", "Tundish", "BOF/EAF Converter", "Reheating Furnace", "Continuous Casting"];
    if (id === "cement") return ["Burning Zone", "Transition Zone", "Safety Zone", "Preheater", "Calciner", "Cooler"];
    if (id === "aluminum") return ["Melting Furnace", "Holding Furnace", "Casting House", "Pot Linings"];
    if (id === "petrochemical") return ["Fired Heaters", "FCCU", "Reformers", "SRU", "Flare Stacks"];
    if (id === "glass") return ["Melting Tank", "Tank Bottom", "Forehearth", "Regenerator"];
    if (id === "power") return ["Boiler Furnace", "Ash Handling", "FBC Boilers", "Incinerators"];
    return [];
  };

  const getProducts = (id, plantData) => {
    if (plantData && plantData.products && plantData.products.length > 0) return plantData.products;

    // Fallback products
    if (id === "steel") return ["High Alumina Bricks AL70/AL80", "Magnesia Carbon Bricks", "LC Castables", "Slide Gate Systems", "SEN & Ladle Shroud"];
    if (id === "cement") return ["Magnesia Spinel Bricks", "High Alumina Bricks", "LC Castables", "Gunning Materials"];
    if (id === "aluminum") return ["Non-Wetting Castables", "High Alumina Bricks", "Ceramic Fiber Modules"];
    if (id === "petrochemical") return ["Ceramic Fiber Modules", "High Alumina Castables", "Anchor Systems"];
    if (id === "glass") return ["AZS Fused Cast Bricks", "High Zirconia Bricks", "Sillimanite Bricks"];
    if (id === "power") return ["Abrasion Resistant Castables", "SiC Tiles", "Fireclay Bricks", "Ceramic Fiber"];
    return [];
  };

  const plant = selectedPlant ? plantsList.find(p => p.id === selectedPlant) : null;

  return (
    <div>
      <section className="py-20 px-4 gradient-dark industrial-texture" data-testid="solutions-hero">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-4">PLANT-SPECIFIC SOLUTIONS</span>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">ENGINEERED FOR YOUR <span className="gradient-text">PLANT</span></h1>
          <p className="text-gray-400 max-w-2xl text-lg">Select your plant type to discover customized refractory solutions.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background" data-testid="plant-selection">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <BlogListSkeleton />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantsList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlant(selectedPlant === p.id ? null : p.id)}
                  className={`plant-card group relative h-56 img-zoom text-left animate-fade-in-up ${selectedPlant === p.id ? "ring-4 ring-[#3B82F6]" : ""}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  data-testid={`solution-plant-${p.id}`}
                >
                  <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <Factory size={28} className="text-[#3B82F6] mb-2" />
                    <h3 className="font-oswald text-xl font-bold text-white">{p.name}</h3>
                    <p className="text-gray-300 text-sm">Up to {p.temp}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {plant && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 animate-fade-in-up" data-testid="solution-detail">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 rounded-2xl mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h2 className="font-oswald text-3xl font-bold mb-2">{plant.name} Solutions</h2>
                  <p className="text-muted-foreground max-w-2xl">{getDescription(plant.id, plant)}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <ThermometerSun className="text-[#3B82F6] mx-auto mb-1" size={28} />
                    <p className="font-oswald text-2xl font-bold gradient-text">{plant.temp}</p>
                    <p className="text-xs text-muted-foreground">Max Temp</p>
                  </div>
                  <Link to="/contact" className="gradient-primary text-white px-6 py-3 rounded-full font-medium hover-lift flex items-center gap-2">
                    Get Quote <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-oswald text-xl font-semibold mb-4">Equipment Areas</h3>
                <div className="space-y-2">
                  {getAreas(plant.id, plant).map((area) => (
                    <div key={area} className="flex items-center gap-2 text-muted-foreground">
                      <ChevronRight size={16} className="text-[#3B82F6]" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-oswald text-xl font-semibold mb-4">Recommended Products</h3>
                <div className="flex flex-wrap gap-2">
                  {getProducts(plant.id, plant).map((product) => (
                    <span key={product} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] text-sm rounded-lg">
                      {product}
                    </span>
                  ))}
                </div>
                <Link to="/products" className="inline-flex items-center gap-1 text-[#3B82F6] text-sm font-medium mt-4 hover:underline">
                  View All Products <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 gradient-primary" data-testid="solutions-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-3xl font-bold text-white mb-4">CAN'T FIND YOUR PLANT TYPE?</h2>
          <p className="text-white/90 mb-6">We serve all high-temperature industries. Contact us for custom solutions.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-8 py-4 rounded-full font-semibold hover-lift">
            Contact Our Engineers <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
