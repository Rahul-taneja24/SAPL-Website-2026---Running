'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, X, BookOpen, Newspaper, FlaskConical, FileText,
  Clock, ArrowRight, ChevronRight, Phone, MessageCircle,
} from 'lucide-react';
import { getHubItems, HUB_TYPES } from '@/data/knowledgeHubIndex';

const TYPE_META = {
  guide: { icon: BookOpen, color: 'text-[#3B82F6]', badge: 'bg-blue-50 text-blue-700 border-blue-200', tile: 'from-[#1E3A5F] to-[#3B82F6]' },
  news: { icon: Newspaper, color: 'text-[#F97316]', badge: 'bg-orange-50 text-[#F97316] border-orange-200', tile: 'from-[#F97316] to-[#EA580C]' },
  reference: { icon: FlaskConical, color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', tile: 'from-emerald-600 to-emerald-800' },
  datasheet: { icon: FileText, color: 'text-stone-600', badge: 'bg-stone-100 text-stone-600 border-stone-200', tile: 'from-stone-500 to-stone-700' },
};

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Visual card: real cover image when we have one (most blog guides), else a
// colored icon-tile in the type's accent so the grid still reads as
// imagery, not text rows.
function ItemCard({ item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  return (
    <Link href={item.href} className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="relative h-36 w-full overflow-hidden flex-shrink-0">
        {item.coverImage ? (
          <img src={item.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${meta.tile} flex items-center justify-center`}>
            <Icon className="w-10 h-10 text-white/40" />
          </div>
        )}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border ${meta.badge} bg-white/95 backdrop-blur-sm`}>
          <Icon className="w-3 h-3" />
          {HUB_TYPES[item.type].label}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-oswald text-base font-bold text-[#1E3A5F] leading-snug mb-1.5 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">{item.excerpt}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            {item.date && <span>{formatDate(item.date)}</span>}
            {item.date && item.readTime && <span>&middot;</span>}
            {item.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.readTime}</span>}
          </div>
          <ArrowRight className={`w-4 h-4 ${meta.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
        </div>
      </div>
    </Link>
  );
}

function PreviewSection({ type, items, onViewAll, limit = 3 }) {
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  const shown = items.slice(0, limit);
  if (shown.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#0B1628]">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${meta.color}`} />
          <h2 className="font-oswald text-sm font-bold text-[#0B1628] tracking-widest uppercase">
            {HUB_TYPES[type].plural}
          </h2>
          <span className="text-xs text-gray-400">({items.length})</span>
        </div>
        {items.length > limit && (
          <button onClick={onViewAll} className="text-xs font-semibold text-[#3B82F6] hover:underline whitespace-nowrap">
            View all &rarr;
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((item) => <ItemCard key={`${item.type}-${item.slug}`} item={item} />)}
      </div>
    </div>
  );
}

export default function KnowledgeHub() {
  const allItems = useMemo(() => getHubItems(), []);

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');

  const isBrowsing = !query.trim() && activeType === 'all';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeType !== 'all' && item.type !== activeType) return false;
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

  const byType = useMemo(() => {
    const grouped = {};
    for (const t of Object.keys(HUB_TYPES)) grouped[t] = allItems.filter((i) => i.type === t);
    return grouped;
  }, [allItems]);

  const typeCounts = useMemo(() => {
    const counts = { all: allItems.length };
    for (const t of Object.keys(HUB_TYPES)) counts[t] = byType[t].length;
    return counts;
  }, [allItems, byType]);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80">Knowledge Base</span>
          </nav>
          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            One Place for Every Technical Resource
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-7 max-w-2xl">
            {allItems.length}+ guides, news, engineering references and datasheets. Search for
            what you need, or browse below.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search e.g. "LCC castable", "blast furnace"…'
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white text-[#1E3A5F] placeholder:text-gray-400 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              aria-label="Search knowledge base"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {/* Type tabs, the only filter control, always visible */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveType('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeType === 'all' ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({typeCounts.all})
            </button>
            {Object.entries(HUB_TYPES).map(([type, meta]) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? 'all' : type)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeType === type ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {meta.plural} ({typeCounts[type] || 0})
              </button>
            ))}
          </div>

          {isBrowsing ? (
            <>
              <PreviewSection type="news" items={byType.news} onViewAll={() => setActiveType('news')} limit={3} />
              <PreviewSection type="guide" items={byType.guide} onViewAll={() => setActiveType('guide')} limit={6} />
              <PreviewSection type="reference" items={byType.reference} onViewAll={() => setActiveType('reference')} limit={3} />
              <PreviewSection type="datasheet" items={byType.datasheet} onViewAll={() => setActiveType('datasheet')} limit={4} />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6" aria-live="polite">
                {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
                {query && <> matching &quot;{query}&quot;</>}
              </p>
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">No resources match your search.</p>
                  <button onClick={() => { setQuery(''); setActiveType('all'); }} className="text-[#3B82F6] font-medium hover:underline">
                    Clear filters
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
