'use client';
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Search, TrendingUp, Flame, Layers, Wrench } from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    id: 1,
    slug: "al70-vs-al80-high-alumina-bricks",
    title: "AL70 vs AL80 High Alumina Bricks: Which Grade for Your Steel Ladle?",
    excerpt: "A practical guide to selecting the right high alumina brick grade. AL70 (68–72% Al₂O₃) offers an excellent balance of cost and performance for general ladle working linings, while AL80 (78–82% Al₂O₃) delivers superior hot strength for demanding slag lines and safety linings. We compare refractoriness, CCS, AP%, and real-world campaign life.",
    category: "Technical",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80",
    tags: ["High Alumina", "Steel Ladle", "Product Selection"],
    featured: true,
  },
  {
    id: 2,
    slug: "lcc-installation-best-practices",
    title: "Low Cement Castables: Best Practices for Installation & Heat-Up",
    excerpt: "Proper installation is critical for LCC performance. This guide covers optimal water addition (4–6%), mixing requirements, vibration casting vs. self-flow, curing procedures, and controlled heat-up schedules to prevent explosive spalling. Includes a downloadable heat-up curve template.",
    category: "How-To",
    date: "Jan 10, 2026",
    readTime: "7 min read",
    image: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumihicast-1.jpg",
    tags: ["LCC Castable", "Installation", "Steel Ladle"],
  },
  {
    id: 3,
    slug: "ceramic-fiber-vs-insulating-firebrick",
    title: "Ceramic Fiber vs Insulating Firebrick: Making the Right Choice",
    excerpt: "Ceramic fiber offers 30–40% energy savings with lower thermal mass, ideal for cyclic operations. IFB provides better abrasion resistance for permanent hot-face linings. We compare thermal conductivity, maximum service temperatures, installation costs, and 5-year total cost of ownership.",
    category: "Comparison",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=800&q=80",
    tags: ["Ceramic Fiber", "IFB", "Insulation", "Energy Savings"],
  },
  {
    id: 4,
    slug: "steel-ladle-refractory-selection-guide",
    title: "Steel Ladle Refractory Selection: Complete Guide to Working Lining Best Practices",
    excerpt: "Comprehensive guide covering working lining options (MgO-C, Al₂O₃-C, LCC/ULCC), safety lining specifications, bottom design considerations, purging plug selection, and achieving 100+ heat campaigns. Includes zone-specific recommendations based on ladle capacity.",
    category: "Technical",
    date: "Dec 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=800&q=80",
    tags: ["Steel Ladle", "Working Lining", "MgO-C", "LCC"],
  },
  {
    id: 5,
    slug: "cement-kiln-zone-refractory-selection",
    title: "Cement Kiln Refractory Zones: Material Selection Zone by Zone",
    excerpt: "Rotary kiln refractory selection varies dramatically by zone. The burning zone demands magnesia spinel or MgO-Chrome bricks; transition zones need high-alumina or andalusite; upper cyclone preheaters use castables. This guide maps thermal, chemical, and mechanical requirements to material solutions.",
    category: "Industry Guide",
    date: "Dec 20, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    tags: ["Cement Kiln", "Magnesia Spinel", "High Alumina", "Industry Guide"],
  },
  {
    id: 6,
    slug: "slide-gate-flow-control-explained",
    title: "Flow Control Refractories: Slide Gate Systems Fully Explained",
    excerpt: "Modern continuous casting demands precise flow control. This article covers slide gate plate materials (Al₂O₃-C, Al₂O₃-ZrO₂-C, MgO-C), nozzle selection criteria, anti-clogging strategies with argon purging, and practical tips for achieving longer sequence casting without interruption.",
    category: "Technical",
    date: "Dec 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?w=800&q=80",
    tags: ["Flow Control", "Slide Gate", "Continuous Casting"],
  },
  {
    id: 7,
    slug: "gunning-vs-casting-when-to-use",
    title: "Gunning vs Casting Refractories: When to Use Which Method",
    excerpt: "Gunning offers rapid installation and hot repair capability with minimal downtime, while casting provides denser, stronger linings for new construction. We compare application methods, rebound loss, material properties, and cost implications, with a decision framework for plant engineers.",
    category: "How-To",
    date: "Dec 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1600&q=80",
    tags: ["Gunning", "Casting", "Installation Methods"],
  },
  {
    id: 8,
    slug: "induction-furnace-ramming-mass-selection",
    title: "Induction Furnace Lining: Ramming Mass Selection & Installation Guide",
    excerpt: "Silica, alumina, and magnesia ramming masses each serve different metallurgical requirements. This guide covers material selection based on melt type (iron, steel, copper), lining life expectations, sintering schedules and temperatures, and troubleshooting the most common failure modes.",
    category: "Technical",
    date: "Dec 5, 2025",
    readTime: "7 min read",
    image: "https://www.cumi-murugappa.com/refractories/wp-content/uploads/2021/12/cumihicast-1.jpg",
    tags: ["Ramming Mass", "Induction Furnace", "Silica", "Alumina"],
  },
];

const categories = ["All", "Technical", "How-To", "Comparison", "Industry Guide"];

const categoryIcons = { Technical: Flame, "How-To": Wrench, Comparison: Layers, "Industry Guide": TrendingUp };

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

function Blog() {
  const { articleSlug } = useParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = blogPosts.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== (featured?.id ?? -1));

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Shanker Agencies Refractory Knowledge Hub",
    description: "Technical articles, how-to guides, and industry insights for refractory engineers and plant managers",
    publisher: {
      "@type": "Organization",
      name: "Shanker Agencies Private Limited",
      url: "https://shankeragencies.com",
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt.substring(0, 120),
      datePublished: p.date,
      url: `https://shankeragencies.com/blog/${p.slug}`,
    })),
  };

  const currentArticle = articleSlug ? blogPosts.find(p => p.slug === articleSlug) : null;
  const pageTitle = currentArticle 
    ? `${currentArticle.title} | Shanker Agencies Knowledge Hub`
    : "Refractory Technical Blog & Guides | Shanker Agencies Knowledge Hub";
  const pageDescription = currentArticle 
    ? currentArticle.excerpt
    : "Expert articles on refractory selection, LCC castable installation, ceramic fiber vs IFB, steel ladle lining, cement kiln zones. Practical guides from SAPL's engineering team.";

  return (
    <div className="bg-white">
      

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,30,70,0.94) 0%, rgba(30,58,138,0.88) 100%), url('https://images.unsplash.com/photo-1600683550547-2c38a96fb400?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="blog-hero"
        aria-labelledby="blog-heading"
      >
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <BookOpen size={14} aria-hidden="true" />
            Technical Knowledge Hub
          </span>
          <h1 id="blog-heading" className="font-oswald text-5xl md:text-7xl font-bold text-white mb-4 leading-none">
            REFRACTORY
            <br />
            <span className="text-shimmer">KNOWLEDGE</span>
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            Technical guides, product comparisons, and industry insights from SAPL's engineering team, designed for plant managers, procurement engineers, and refractory professionals.
          </p>

          {/* Inline search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic or product..."
                className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#F97316] backdrop-blur-sm text-sm"
                aria-label="Search blog articles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ─────────────────────────────── */}
      <section
        className="py-4 px-4 bg-white border-b border-gray-200 sticky top-[108px] z-30"
        aria-label="Category filter"
      >
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${activeCategory === cat
                    ? "bg-[#F97316] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                data-testid={`blog-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                aria-pressed={activeCategory === cat}
              >
                {Icon && <Icon size={13} aria-hidden="true" />}
                {cat}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-gray-400 self-center whitespace-nowrap pl-2">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── ARTICLES GRID ───────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50" data-testid="blog-grid" aria-label="Blog articles">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No articles match your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-[#F97316] font-semibold text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <div className="mb-10" data-testid="featured-post">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid md:grid-cols-5 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="md:col-span-3 h-72 md:h-auto overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                    </div>
                    <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-xs font-bold uppercase">
                          Featured
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Tag size={11} aria-hidden="true" />
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="font-oswald text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-4 leading-tight group-hover:text-[#1E40AF] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{featured.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{featured.readTime}</span>
                        </div>
                        <span className="font-semibold text-[#F97316] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {rest.map((post) => (
                  <article key={post.id} data-testid={`blog-post-${post.id}`}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#F97316]/30 transition-all block h-full"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-2 leading-tight line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-blue-50 text-[#3B82F6] text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" />{post.readTime}</span>
                          </div>
                          <span className="font-semibold text-[#F97316] flex items-center gap-1 group-hover:gap-2 transition-all text-xs">
                            Read <ArrowRight size={11} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}
        data-testid="newsletter"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-2xl mx-auto text-center">
          <BookOpen className="mx-auto mb-4 text-white/60" size={44} aria-hidden="true" />
          <h2 id="newsletter-heading" className="font-oswald text-3xl font-bold text-white mb-3">
            STAY AHEAD IN REFRACTORIES
          </h2>
          <p className="text-white/70 mb-8 text-sm leading-relaxed">
            Join 2,000+ refractory engineers and procurement heads who receive our monthly technical insights, new product alerts, and industry updates, no spam, unsubscribe anytime.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-white font-semibold">
              <span className="text-2xl" aria-hidden="true">✅</span> You're subscribed. Thank you!
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (emailInput) setSubscribed(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Newsletter subscription form"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your work email address"
                required
                className="flex-1 px-5 py-3.5 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                aria-label="Email address for newsletter"
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 whitespace-nowrap"
                data-testid="newsletter-submit"
              >
                Subscribe <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
