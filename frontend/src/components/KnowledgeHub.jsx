'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, X, BookOpen, Newspaper, FlaskConical, FileText,
  Clock, ArrowRight, ChevronRight, Phone, MessageCircle,
} from 'lucide-react';
import { getHubItems, HUB_TYPES } from '@/data/knowledgeHubIndex';

const TYPE_META = {
  guide: { icon: BookOpen, color: 'text-[#3B82F6]' },
  news: { icon: Newspaper, color: 'text-[#F97316]' },
  reference: { icon: FlaskConical, color: 'text-emerald-600' },
  datasheet: { icon: FileText, color: 'text-stone-500' },
};

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// One calm, text-forward row. No per-type background wash — just an icon,
// a label, and clean typography, matching the /news headline-list pattern.
function ResultRow({ item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  return (
    <Link href={item.href} className="group flex items-start gap-4 py-5 border-b border-gray-100 last:border-0">
      <Icon className={`w-4 h-4 mt-1 flex-shrink-0 ${meta.color}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${meta.color}`}>
            {HUB_TYPES[item.type].label}
          </span>
          {item.date && <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(item.date)}</span>}
        </div>
        <h3 className="font-oswald text-base md:text-lg font-bold text-[#1E3A5F] leading-snug group-hover:text-[#F97316] transition-colors">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-1 max-w-2xl">{item.excerpt}</p>
        )}
        {item.readTime && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-1.5">
            <Clock className="w-3 h-3" />{item.readTime}
          </span>
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
    </Link>
  );
}

// A compact preview section for the default (no search) browse view: a
// heading, up to `limit` rows, and a "View all" link that jumps into
// filtered mode instead of showing everything at once.
function PreviewSection({ type, items, onViewAll, limit = 4 }) {
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  const shown = items.slice(0, limit);
  if (shown.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-1 pb-3 border-b-2 border-[#0B1628]">
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
      <div>
        {shown.map((item) => <ResultRow key={`${item.type}-${item.slug}`} item={item} />)}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {/* Type tabs, the only filter control, always visible */}
          <div className="flex flex-wrap gap-2 mb-8">
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
            // Default browse: sectioned by type, a short preview of each with
            // a "View all" jump, so the page opens calm instead of a 73-item wall.
            <>
              <PreviewSection type="news" items={byType.news} onViewAll={() => setActiveType('news')} limit={3} />
              <PreviewSection type="guide" items={byType.guide} onViewAll={() => setActiveType('guide')} limit={5} />
              <PreviewSection type="reference" items={byType.reference} onViewAll={() => setActiveType('reference')} limit={3} />
              <PreviewSection type="datasheet" items={byType.datasheet} onViewAll={() => setActiveType('datasheet')} limit={4} />
            </>
          ) : (
            // Search or single-type mode: one clean filtered list.
            <>
              <p className="text-sm text-gray-500 mb-2" aria-live="polite">
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
                <div>
                  {filtered.map((item) => <ResultRow key={`${item.type}-${item.slug}`} item={item} />)}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-2xl overflow-hidden border border-[#F97316]/20 shadow-sm">
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
