'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, X, BookOpen, Newspaper, FlaskConical, FileText,
  Clock, ArrowRight, ChevronRight, Phone, MessageCircle,
} from 'lucide-react';
import { getHubItems, getHubCategories, HUB_TYPES } from '@/data/knowledgeHubIndex';

const TYPE_META = {
  guide: { icon: BookOpen, color: 'text-[#3B82F6]', bg: 'bg-blue-50', border: 'border-[#3B82F6]/20' },
  news: { icon: Newspaper, color: 'text-[#F97316]', bg: 'bg-orange-50', border: 'border-[#F97316]/20' },
  reference: { icon: FlaskConical, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  datasheet: { icon: FileText, color: 'text-stone-600', bg: 'bg-stone-50', border: 'border-stone-200' },
};

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function KnowledgeHub() {
  const allItems = useMemo(() => getHubItems(), []);
  const categories = useMemo(() => getHubCategories(allItems), [allItems]);

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeType !== 'all' && item.type !== activeType) return false;
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [item.title, item.excerpt, item.category, ...(item.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }).sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });
  }, [allItems, query, activeType, activeCategory]);

  const typeCounts = useMemo(() => {
    const counts = { all: allItems.length };
    for (const t of Object.keys(HUB_TYPES)) counts[t] = allItems.filter((i) => i.type === t).length;
    return counts;
  }, [allItems]);

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,70,0.97) 0%, rgba(30,58,138,0.92) 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/80">Knowledge Base</span>
          </nav>
          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            One Place for Every Technical Resource
          </h1>
          <p className="text-lg text-white/75 leading-relaxed max-w-3xl mb-8">
            {allItems.length}+ technical guides, industry news, engineering references and
            datasheets from 45+ years of refractory engineering. Search across everything, or
            browse by type.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides, news, references, datasheets… e.g. &quot;LCC castable&quot;, &quot;blast furnace&quot;"
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-white text-[#1E3A5F] placeholder:text-gray-400 text-sm md:text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              aria-label="Search knowledge base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FILTERS + RESULTS */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {/* Type filter tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveType('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeType === 'all' ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({typeCounts.all})
            </button>
            {Object.entries(HUB_TYPES).map(([type, meta]) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeType === type ? 'bg-[#1E3A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {meta.plural} ({typeCounts[type] || 0})
              </button>
            ))}
          </div>

          {/* Category filter chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === 'all' ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30' : 'text-gray-500 hover:text-gray-700 border border-transparent'
                }`}
              >
                All Topics
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30' : 'text-gray-500 hover:text-gray-700 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Result count */}
          <p className="text-sm text-gray-500 mb-6" aria-live="polite">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
            {query && <> matching &quot;{query}&quot;</>}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No resources match your search.</p>
              <button
                onClick={() => { setQuery(''); setActiveType('all'); setActiveCategory('all'); }}
                className="text-[#3B82F6] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => {
                const meta = TYPE_META[item.type];
                const Icon = meta.icon;
                return (
                  <Link
                    key={`${item.type}-${item.slug}`}
                    href={item.href}
                    className={`group flex flex-col rounded-2xl border ${meta.border} ${meta.bg} p-5 hover:shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${meta.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {HUB_TYPES[item.type].label}
                      </span>
                      {item.date && <span className="text-[11px] text-gray-400">{formatDate(item.date)}</span>}
                    </div>
                    <h3 className="font-oswald text-base font-bold text-[#1E3A5F] leading-snug mb-2 group-hover:text-[#F97316] transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-3 flex-1">{item.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      {item.readTime ? (
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />{item.readTime}
                        </span>
                      ) : <span />}
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${meta.color} group-hover:gap-2 transition-all`}>
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
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
