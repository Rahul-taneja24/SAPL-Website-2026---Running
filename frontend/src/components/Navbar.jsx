'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { trackEvent } from '@/lib/analytics';
import { useApp } from '@/context/AppContext';
import { Menu, X, ChevronDown, Globe, Phone, Mail, Zap, Languages, ArrowRight, Flame, Layers, Wrench, Package, FileText } from "lucide-react";


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
          { name: "Ramming Mass", path: "/products/unshaped-refractories/ramming-masses" },
          { name: "Slide Gate Plates", path: "/products/flow-control/slide-gate-plates" },
          { name: "Ceramic Fiber Products", path: "/products/insulation/ceramic-fiber-products" },
        ],
      },
    ],
    cta: { label: "Full Catalog →", path: "/products" },
  },
  { name: "Brands", path: "/brands", icon: Package },
  { name: "Knowledge", path: "/knowledge", icon: Wrench },
  { name: "Downloads", path: "/downloads", icon: FileText },
  { name: "Contact", path: "/contact" },
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const GCC_AR_SLUGS = ['dubai', 'abu-dhabi', 'riyadh', 'jeddah', 'doha', 'muscat', 'kuwait-city', 'manama'];
const AR_PRODUCT_CATEGORIES = ['shaped-refractories', 'unshaped-refractories', 'flow-control', 'insulation', 'acid-proofing'];

// Maps a live English path to its hand-built Arabic counterpart, falling
// back to the /ar homepage when there's no dedicated Arabic page for it.
function toArabicPath(pathname) {
  if (pathname === '/') return '/ar';
  if (pathname === '/rfq') return '/ar/rfq';
  const locMatch = pathname.match(/^\/refractory-supplier-in\/([^/]+)$/);
  if (locMatch && GCC_AR_SLUGS.includes(locMatch[1])) return `/ar/refractory-supplier-in/${locMatch[1]}`;
  const prodMatch = pathname.match(/^\/products\/([^/]+)$/);
  if (prodMatch && AR_PRODUCT_CATEGORIES.includes(prodMatch[1])) return `/ar/products/${prodMatch[1]}`;
  return '/ar';
}

// Reverse of toArabicPath, used when switching back to English from an /ar page.
function toEnglishPath(pathname) {
  if (pathname === '/ar') return '/';
  return pathname.replace(/^\/ar/, '') || '/';
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { region, handleRegionChange, geoBanner, dismissGeoBanner, setShowQuoteModal } = useApp();
  const onRegionChange = handleRegionChange;
  const onQuoteClick = () => setShowQuoteModal(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => (pathname.startsWith("/ar") ? "ar" : "en"));
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef(null);

  // Arabic visitors get the mirror-image of the region notice: a prompt to
  // switch to English. Kept separate from the geo notice (own dismiss flag)
  // and only one strip is ever shown at a time, see the render below.
  const isArabic = pathname.startsWith('/ar');
  const [langNotice, setLangNotice] = useState(false);

  useEffect(() => {
    if (!isArabic) {
      setLangNotice(false);
      return;
    }
    try {
      if (localStorage.getItem('shanker_lang_notice_dismissed')) return;
    } catch (e) {}
    setLangNotice(true);
  }, [isArabic]);

  useEffect(() => {
    if (!langNotice) return;
    const timer = setTimeout(() => {
      setLangNotice(false);
      try { localStorage.setItem('shanker_lang_notice_dismissed', '1'); } catch (e) {}
    }, 30000);
    return () => clearTimeout(timer);
  }, [langNotice]);

  const dismissLangNotice = () => {
    setLangNotice(false);
    try { localStorage.setItem('shanker_lang_notice_dismissed', '1'); } catch (e) {}
  };
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll and suppress the floating WhatsApp button while the
  // mobile drawer is open — the drawer carries its own WhatsApp CTA.
  useEffect(() => {
    document.body.classList.toggle("nav-drawer-open", mobileMenuOpen);
    return () => document.body.classList.remove("nav-drawer-open");
  }, [mobileMenuOpen]);

  // Let the floating WhatsApp button sit above the fixed bottom notice strip.
  useEffect(() => {
    const showing = langNotice || (geoBanner && !isArabic);
    document.body.classList.toggle("has-bottom-toast", !!showing);
    return () => document.body.classList.remove("has-bottom-toast");
  }, [langNotice, geoBanner, isArabic]);

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
    setShowLangMenu(false);
    if (langCode === "ar") {
      // Route to the real hand-built Arabic site instead of running it
      // through the generic Google Translate cookie hack.
      setCurrentLang(langCode);
      router.push(toArabicPath(pathname));
      return;
    }
    setCurrentLang(langCode);
    if (langCode === "en" && pathname.startsWith("/ar")) {
      router.push(toEnglishPath(pathname));
      return;
    }
    if (langCode !== "en") {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      window.location.reload();
    }
  };

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header ref={megaRef} className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* ── GOOGLE TRANSLATE (hidden) ── */}
      <div id="google_translate_element" className="hidden" />

      {/* ── TOP BAR ─────────────────────────────────────
          Secondary utility strip. On mobile it collapses away once the user
          starts scrolling so it stops permanently consuming viewport height;
          scrolling back to the top restores it. Always visible on desktop. */}
      <div
        className={`bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] text-white px-4 text-xs overflow-hidden transition-all duration-300 lg:max-h-none lg:py-2 lg:opacity-100 ${
          scrolled ? "max-h-0 py-0 opacity-0" : "max-h-16 py-1 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
          {/* Left — contact */}
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-4 min-w-0">
              <a
                href="tel:+919899957888"
                className="flex items-center gap-1.5 py-3.5 hover:text-blue-200 transition-colors"
                aria-label="Call primary number"
                onClick={() => trackEvent('phone_click', { cta_type: 'navbar_topbar' })}
              >
                <Phone size={11} className="flex-shrink-0" />
                {/* nowrap keeps the number on one line at 320px, where it
                    previously broke across two lines and grew the header. */}
                <span className="font-medium whitespace-nowrap">+91 98999 57888</span>
              </a>
            </div>
            <a
              href="mailto:info@shankeragencies.com"
              className="hidden md:flex items-center gap-1.5 hover:text-blue-200 transition-colors"
              aria-label="Email us"
              onClick={() => trackEvent('email_click', { cta_type: 'navbar_topbar' })}
            >
              <Mail size={12} />
              info@shankeragencies.com
            </a>
          </div>

          {/* Right — lang + region */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu((p) => !p)}
                className="flex items-center gap-1.5 px-2 py-4 -mx-1 hover:text-blue-200 transition-colors"
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
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-2 sm:pl-4">
              <Globe size={12} className="flex-shrink-0" />
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="bg-transparent border-none text-xs cursor-pointer focus:outline-none py-3.5"
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

      {/* ── REGION / LANGUAGE NOTICE STRIP ─────────────────
          Full-width liquid-glass strip pinned to the bottom of the viewport.
          Fixed-position, so it can never shift layout or push the header
          down, and it auto-hides after 30s if ignored. Arabic pages show the
          language prompt instead of the region one, never both at once. */}
      {(langNotice || (geoBanner && !isArabic)) && (
        <div
          role="status"
          aria-live="polite"
          className="geo-toast fixed inset-x-0 bottom-0 z-[60]"
        >
          <div className="border-t border-white/40 bg-gradient-to-b from-white/70 to-white/55 shadow-[0_-8px_32px_rgba(0,0,0,0.10)] backdrop-blur-2xl backdrop-saturate-150">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
              {langNotice ? (
                <>
                  <span className="text-base leading-none" aria-hidden="true">🌐</span>
                  <p dir="rtl" lang="ar" className="min-w-0 flex-1 text-[13px] leading-snug text-gray-700">
                    أنت تتصفح النسخة العربية من الموقع.{" "}
                    <button
                      onClick={() => router.push(toEnglishPath(pathname))}
                      className="font-semibold text-[#F97316] underline underline-offset-2 transition-colors hover:text-[#ea580c]"
                    >
                      التبديل إلى الإنجليزية
                    </button>
                  </p>
                  <button
                    onClick={dismissLangNotice}
                    aria-label="إغلاق"
                    className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <span className="text-base leading-none" aria-hidden="true">
                    {geoBanner === "india" ? "🇮🇳" : "🌍"}
                  </span>
                  <p className="min-w-0 flex-1 text-[13px] leading-snug text-gray-700">
                    You&rsquo;re on our{" "}
                    <span className="font-semibold text-[#1E3A5F]">
                      {geoBanner === "india" ? "India" : "International"}
                    </span>{" "}
                    website.{" "}
                    <button
                      onClick={() => handleRegionChange(geoBanner === "india" ? "international" : "india")}
                      className="font-semibold text-[#F97316] underline underline-offset-2 transition-colors hover:text-[#ea580c]"
                    >
                      Switch to {geoBanner === "india" ? "International" : "India"}
                    </button>
                  </p>
                  <button
                    onClick={dismissGeoBanner}
                    aria-label="Dismiss region notice"
                    className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
              href="/"
              /* Three-zone header: this brand zone may shrink (min-w-0), the
                 CTA and menu zone below never does. pr-2 reserves a real gap
                 between the end of the brand lockup and the CTA — without it
                 the text stack's box grows until it touches the button at
                 320px (measured 0px), which is what made the tagline read as
                 if it were running into the CTA. Desktop keeps its original
                 content-width behaviour (lg:pr-0).
                 overflow-hidden is a defensive clip: the tagline wraps rather
                 than forcing a fixed nowrap width, so this should never
                 actually trigger, but it keeps any edge case (translated
                 text, unusual font metrics) from spilling into the CTA. */
              className="flex items-center gap-3 min-w-0 overflow-hidden pr-2 lg:pr-0"
              data-testid="logo-link"
              aria-label="Shanker Agencies Home"
            >
              <Image
                src="/images/sapl-logo.png"
                alt="SAPL Logo"
                width={160}
                height={40}
                priority={true}
                className="h-9 sm:h-10 w-auto flex-shrink-0"
              />
              <div className="flex flex-col justify-center leading-none min-w-0">
                {/* Desktop: single line */}
                <span className="hidden sm:block font-oswald text-sm font-bold tracking-wide text-[#1E3A5F]">
                  SHANKER AGENCIES PRIVATE LIMITED
                </span>
                {/* Mobile: two lines, PRIVATE LIMITED matches width of first line */}
                <span className="sm:hidden font-oswald text-xs font-bold tracking-wide text-[#1E3A5F] leading-tight">
                  SHANKER AGENCIES
                </span>
                <span className="sm:hidden font-oswald text-[9px] font-bold text-[#1E3A5F] tracking-[0.28em] uppercase leading-tight">
                  PRIVATE LIMITED
                </span>
                {/* Mobile tagline: tracking tightened from 0.09em, which made
                    the tagline render 147px wide against a 102px company name
                    — the line that visually broke the lockup and the reason it
                    reached the CTA. At 0.02em it sits within the name block's
                    width like the brand artwork, and stays on one line from
                    360px up. Font size is unchanged; wrapping (not clipping)
                    remains the fallback at 320px. */}
                <span className="sm:hidden text-[6.5px] text-[#F97316] font-semibold tracking-[0.02em] uppercase leading-tight mt-0.5">
                  Refractory Engineering Solutions
                </span>
                <span className="hidden sm:block text-[9px] text-[#F97316] font-semibold tracking-[0.2em] uppercase mt-0.5">
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
                    href={link.path}
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
                                  href={sub.path}
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
                            href={link.cta.path}
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
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onQuoteClick}
                /* px-4 on mobile (icon-only) instead of px-5: reclaims the
                   width the enlarged hamburger below now needs, so the two
                   controls together take the same footprint as before. */
                className="gradient-orange text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold hover-lift flex items-center gap-2 shadow-lg shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400"
                data-testid="quick-quote-btn"
                aria-label="Get a quick quote"
              >
                <Zap size={15} />
                <span className="hidden sm:inline">Quick Quote</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                /* p-3: brings the tappable area to ~44px+ (was p-2, ~38px) */
                className="lg:hidden p-3 -m-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
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
              <p className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider">Director's Direct Lines</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+919899957888" className="flex items-center gap-3 text-[#F97316] font-semibold text-sm" onClick={() => trackEvent('phone_click', { cta_type: 'mobile_menu' })}>
                  <Phone size={16} /> +91 98999 57888
                </a>
                <a href="tel:+919810205154" className="flex items-center gap-3 text-[#F97316] font-semibold text-sm" onClick={() => trackEvent('phone_click', { cta_type: 'mobile_menu' })}>
                  <Phone size={16} /> +91 98102 05154
                </a>
              </div>
            </div>

            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.path}
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
                          href={sub.path}
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
                href="https://wa.me/919899957888"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
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
