import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Phone, Mail, Zap, Languages, ArrowRight, Flame, Layers, Wrench, Package } from "lucide-react";


// ─── NAV DATA ─────────────────────────────────────────────────────────────────

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Industries",
    path: "/solutions",
    mega: true,
    icon: Flame,
    cols: [
      {
        heading: "Core Industries",
        links: [
          { name: "Steel Industry", path: "/solutions/steel", desc: "Blast furnaces, BOF, ladles, tundish" },
          { name: "Cement Industry", path: "/solutions/cement", desc: "Rotary kilns, preheaters, coolers" },
          { name: "Aluminum Industry", path: "/solutions/aluminum", desc: "Melting, holding, casting furnaces" },
        ],
      },
      {
        heading: "Other Industries",
        links: [
          { name: "Glass Manufacturing", path: "/solutions/glass", desc: "Melting tanks, forehearths" },
          { name: "Petrochemical", path: "/solutions/petrochemical", desc: "Fired heaters, reformers" },
          { name: "Power Generation", path: "/solutions/power", desc: "Boilers, FBC, incinerators" },
        ],
      },
    ],
    cta: { label: "All Solutions →", path: "/solutions" },
  },
  {
    name: "Products",
    path: "/products",
    mega: true,
    icon: Layers,
    cols: [
      {
        heading: "Shaped Refractories",
        links: [
          { name: "High Alumina Bricks", path: "/products/shaped-refractories/high-alumina-bricks" },
          { name: "Fireclay Bricks", path: "/products/shaped-refractories/fireclay-bricks" },
          { name: "Basic & Magnesia Bricks", path: "/products/shaped-refractories/basic-bricks" },
          { name: "Silicon Carbide Bricks", path: "/products/shaped-refractories/silicon-carbide-bricks" },
        ],
      },
      {
        heading: "Monolithics & Flow Control",
        links: [
          { name: "Low Cement Castables", path: "/products/unshaped-refractories/low-cement-castables" },
          { name: "Ramming Masses", path: "/products/unshaped-refractories/ramming-masses" },
          { name: "Slide Gate Plates", path: "/products/flow-control/slide-gate-plates" },
          { name: "Ceramic Fiber Products", path: "/products/insulation/ceramic-fiber-products" },
        ],
      },
    ],
    cta: { label: "Full Catalog →", path: "/products" },
  },
  { name: "Brands", path: "/brands", icon: Package },
  { name: "Knowledge", path: "/knowledge", icon: Wrench },
  { name: "Contact", path: "/contact" },
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Navbar = ({ region, onRegionChange, onQuoteClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setActiveMega(null);
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const translatePage = (langCode) => {
    setCurrentLang(langCode);
    setShowLangMenu(false);
    if (langCode !== "en") {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      window.location.reload();
    }
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header ref={megaRef} className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* ── GOOGLE TRANSLATE (hidden) ── */}
      <div id="google_translate_element" className="hidden" />

      {/* ── TOP BAR ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Left — contact */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <a
                href="tel:+919899957888"
                className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                aria-label="Call primary number"
              >
                <Phone size={11} />
                <span className="font-medium">+91 98999 57888</span>
              </a>
              <span className="text-white/30 hidden sm:inline">|</span>
              <a
                href="tel:+919810205154"
                className="hidden sm:flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                aria-label="Call secondary number"
              >
                <Phone size={11} />
                <span className="font-medium">+91 98102 05154</span>
              </a>
            </div>
            <a
              href="mailto:info@shankeragencies.com"
              className="hidden md:flex items-center gap-1.5 hover:text-blue-200 transition-colors"
              aria-label="Email us"
            >
              <Mail size={12} />
              info@shankeragencies.com
            </a>
          </div>

          {/* Right — lang + region */}
          <div className="flex items-center gap-4">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu((p) => !p)}
                className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                aria-label="Select language"
                data-testid="language-selector"
              >
                <Languages size={13} />
                <span className="hidden sm:inline">
                  {languages.find((l) => l.code === currentLang)?.flag}
                </span>
                <ChevronDown
                  size={11}
                  className={`transition-transform ${showLangMenu ? "rotate-180" : ""}`}
                />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => translatePage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2.5 hover:bg-blue-50 transition-colors ${
                        currentLang === lang.code ? "text-[#3B82F6] bg-blue-50" : "text-gray-700"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Region */}
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
              <Globe size={12} />
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="bg-transparent border-none text-xs cursor-pointer focus:outline-none"
                aria-label="Select region"
                data-testid="region-selector"
              >
                <option value="india" className="text-gray-900">🇮🇳 India</option>
                <option value="international" className="text-gray-900">🌍 International</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ─────────────────────────────────── */}
      <nav
        className="bg-white border-b border-gray-200"
        style={{ boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none", transition: "box-shadow 0.3s" }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 flex-shrink-0"
              data-testid="logo-link"
              aria-label="Shanker Agencies Home"
            >
              <img
                src="/images/sapl-logo.png"
                alt="SAPL Logo"
                className="h-9 sm:h-10 w-auto flex-shrink-0"
              />
              <div className="flex flex-col justify-center leading-tight">
                <span className="font-oswald text-xs sm:text-sm font-bold tracking-wide">
                  <span className="text-[#1E3A5F]">SHANKER AGENCIES PRIVATE LIMITED</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#F97316] font-semibold tracking-[0.2em] uppercase">
                  Refractory Engineering Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.mega && setActiveMega(link.name)}
                  onMouseLeave={() => link.mega && setActiveMega(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-3.5 py-5 text-[13px] font-semibold transition-colors whitespace-nowrap border-b-2 ${
                      isActive(link.path)
                        ? "text-[#1E40AF] border-[#F97316]"
                        : "text-gray-600 hover:text-[#1E3A5F] border-transparent hover:border-gray-200"
                    }`}
                    data-testid={`nav-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.name}
                    {link.mega && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeMega === link.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {link.mega && activeMega === link.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
                      style={{ animation: "fadeUp 0.18s ease-out" }}
                      onMouseEnter={() => setActiveMega(link.name)}
                      onMouseLeave={() => setActiveMega(null)}
                    >
                      <div className="grid grid-cols-2 gap-6 mb-5">
                        {link.cols.map((col) => (
                          <div key={col.heading}>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                              {col.heading}
                            </p>
                            <div className="flex flex-col gap-1">
                              {col.links.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className="group flex flex-col px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <span className="text-sm font-semibold text-[#1E3A5F] group-hover:text-[#1E40AF]">
                                    {sub.name}
                                  </span>
                                  {sub.desc && (
                                    <span className="text-xs text-gray-400 mt-0.5">{sub.desc}</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {link.cta && (
                        <div className="border-t border-gray-100 pt-4">
                          <Link
                            to={link.cta.path}
                            className="flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:gap-3 transition-all"
                          >
                            <ArrowRight size={15} />
                            {link.cta.label}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={onQuoteClick}
                className="gradient-orange text-white px-5 py-2.5 rounded-full text-sm font-bold hover-lift flex items-center gap-2 shadow-lg shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400"
                data-testid="quick-quote-btn"
                aria-label="Get a quick quote"
              >
                <Zap size={15} />
                <span className="hidden sm:inline">Quick Quote</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ──────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4 max-h-[80vh] overflow-y-auto">
            {/* Phone prominent on mobile */}
            <div className="px-4 py-3 mb-2 bg-orange-50 rounded-xl space-y-2">
              <p className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider">Main Contact Numbers</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+919899957888" className="flex items-center gap-3 text-[#F97316] font-semibold text-sm">
                  <Phone size={16} /> +91 98999 57888
                </a>
                <a href="tel:+919810205154" className="flex items-center gap-3 text-[#F97316] font-semibold text-sm">
                  <Phone size={16} /> +91 98102 05154
                </a>
              </div>
            </div>

            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      onClick={() => !link.mega && setMobileMenuOpen(false)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive(link.path)
                          ? "text-[#1E40AF] bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.mega && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                        className="p-3 text-gray-500"
                        aria-label={`Expand ${link.name}`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === link.name ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {link.mega && mobileExpanded === link.name && (
                    <div className="ml-4 mb-2 space-y-0.5">
                      {link.cols.flatMap((col) => col.links).map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1E40AF] rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile bottom actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
              <a
                href="https://wa.me/919810205154"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1E3A5F] hover:bg-[#1E40AF] text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0)  translateX(-50%); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
