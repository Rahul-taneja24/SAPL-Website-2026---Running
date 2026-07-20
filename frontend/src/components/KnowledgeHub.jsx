'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, X, BookOpen, Newspaper, FlaskConical, FileText,
  Clock, ArrowRight, ChevronRight, ChevronLeft, Phone, MessageCircle,
} from 'lucide-react';
import { getHubItems, HUB_TYPES } from '@/data/knowledgeHubIndex';

const TYPE_META = {
  guide: {
    icon: BookOpen, color: 'text-[#3B82F6]', badge: 'bg-blue-50 text-blue-700 border-blue-200',
    tile: 'from-[#1E3A5F] to-[#3B82F6]', desc: 'How-to guides on material selection, installation and troubleshooting.',
  },
  news: {
    icon: Newspaper, color: 'text-[#F97316]', badge: 'bg-orange-50 text-[#F97316] border-orange-200',
    tile: 'from-[#F97316] to-[#EA580C]', desc: 'What is happening in steel, cement and raw materials, and what it means for you.',
  },
  reference: {
    icon: FlaskConical, color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tile: 'from-emerald-600 to-emerald-800', desc: 'Worked engineering scenarios with real numbers, savings and campaign life.',
  },
  datasheet: {
    icon: FileText, color: 'text-stone-600', badge: 'bg-stone-100 text-stone-600 border-stone-200',
    tile: 'from-stone-500 to-stone-700', desc: 'Chemical analysis, physical properties and IS/ASTM test methods by product.',
  },
};

const POPULAR_SEARCHES = ['ramming mass', 'LCC castable', 'ceramic fiber', 'blast furnace', 'MgO-C bricks'];

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ItemCard({ item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  return (
    <Link href={item.href} className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="relative h-32 w-full overflow-hidden flex-shrink-0">
        {item.coverImage ? (
          <img src={item.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${meta.tile} flex items-center justify-center`}>
            <Icon className="w-9 h-9 text-white/40" />
          </div>
        )}
        <span className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full border ${meta.badge} bg-white/95 backdrop-blur-sm`}>
          <Icon className="w-3 h-3" />
          {HUB_TYPES[item.type].label}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-oswald text-sm font-bold text-[#1E3A5F] leading-snug mb-1.5 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">{item.excerpt}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            {item.date && <span>{formatDate(item.date)}</span>}
            {item.date && item.readTime && <span>&middot;</span>}
            {item.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.readTime}</span>}
          </div>
          <ArrowRight className={`w-3.5 h-3.5 ${meta.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
        </div>
      </div>
    </Link>
  );
}

// Big picker tile shown on first load, no content preview, just "what is this
// and how much of it is there". The user picks a door instead of scanning
// four stacked sections of cards.
function CategoryTile({ type, count, onClick }) {
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className={`h-1.5 bg-gradient-to-r ${meta.tile}`} />
      <div className="p-6">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.tile} flex items-center justify-center mb-4`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-oswald text-lg font-bold text-[#1E3A5F] mb-1.5 group-hover:text-[#F97316] transition-colors">
          {HUB_TYPES[type].plural}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{meta.desc}</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-[#F97316] transition-colors">
          {count} resources <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}

export default function KnowledgeHub() {
  const allItems = useMemo(() => getHubItems(), []);

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState(null); // null = picker screen

  const isPicking = !query.trim() && !activeType;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeType && item.type !== activeType) return false;
      if (!q) return true;
      const haystack = [item.title, item.excerpt, item.category, ...(item.tags || [])]
        .filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(q);
    }).sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });
  }, [allItems, query, activeType]);

  const typeCounts = useMemo(() => {
    const counts = {};
    for (const t of Object.keys(HUB_TYPES)) counts[t] = allItems.filter((i) => i.type === t).length;
    return counts;
  }, [allItems]);

  function reset() {
    setQuery('');
    setActiveType(null);
  }

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-14 md:py-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-white/50 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80">Knowledge Base</span>
          </nav>
          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            What Are You Looking For?
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-7 max-w-xl mx-auto">
            Search across {allItems.length}+ guides, news, references and datasheets.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveType(null); }}
              placeholder='Try "ramming mass" or "blast furnace"…'
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white text-[#1E3A5F] placeholder:text-gray-400 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              aria-label="Search knowledge base"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isPicking && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/40 text-xs">Popular:</span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {isPicking ? (
            // First-load state: four big doors, nothing else. The user picks
            // a category (or searches above) instead of scrolling past a
            // wall of previews to find what they need.
            <>
              <h2 className="font-oswald text-sm font-bold text-gray-400 tracking-widest uppercase text-center mb-6">
                Or Browse by Type
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
                {Object.keys(HUB_TYPES).map((type) => (
                  <CategoryTile key={type} type={type} count={typeCounts[type]} onClick={() => setActiveType(type)} />
                ))}
              </div>

              {/* Real crawlable <a href> links to every item, visually hidden
                  behind the picker tiles. The interactive filtered list below
                  only mounts after a click, so without this, search engines
                  see 4 category tiles and no real link to the other 73 pages
                  on first load (the JSON-LD ItemList carries the URLs for
                  schema purposes, but that's not a dofollow link a crawler's
                  link graph counts). This block is identical content to what
                  "View all" reveals, not a separate/cloaked page. */}
              <nav aria-hidden="true" className="sr-only">
                {allItems.map((item) => (
                  <a key={`${item.type}-${item.slug}`} href={item.href}>{item.title}</a>
                ))}
              </nav>
            </>
          ) : (
            // Results state: one flat, clearly-labelled list. Always a way
            // back to the picker so the user never feels stuck in a filter.
            <>
              <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#F97316] mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to categories
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="text-sm text-gray-500" aria-live="polite">
                  {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
                  {query && <> matching &quot;{query}&quot;</>}
                  {activeType && !query && <> in {HUB_TYPES[activeType].plural}</>}
                </p>
                {activeType && (
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(HUB_TYPES).map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveType(t)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          activeType === t ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {HUB_TYPES[t].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">No resources match your search.</p>
                  <button onClick={reset} className="text-[#3B82F6] font-medium hover:underline">
                    Back to categories
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((item) => <ItemCard key={`${item.type}-${item.slug}`} item={item} />)}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-[#F97316]/20 shadow-sm">
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1E40AF] p-6 text-white">
              <h3 className="font-oswald text-xl font-bold mb-1">Can&apos;t Find What You Need?</h3>
              <p className="text-white/80 text-sm">Our refractory engineers answer technical questions directly, no obligation.</p>
            </div>
            <div className="bg-white p-6 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                <Phone className="w-4 h-4" /> Speak to an Engineer
              </Link>
              <a href="https://wa.me/919899957888" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <Link href="/downloads" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-[#3B82F6] text-gray-600 hover:text-[#3B82F6] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                All Downloads &amp; TDS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
