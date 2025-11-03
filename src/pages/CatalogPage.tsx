import React, { useMemo, useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import useDocumentTitle from '../lib/useDocumentTitle';
import { trackSearch } from '../lib/analytics-database';

export default function CatalogPage() {
  useDocumentTitle('Catalog');
  const { products: all, loading, error } = useProducts();
  const [query, setQuery] = useState('');
  const [purity, setPurity] = useState<'all'|'22K'|'24K'|'18K'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<'popular'|'new'>('popular');
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const products = useMemo(() => {
    let list = all;
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || (p.tags || []).some(t => t.includes(q)));
    if (purity !== 'all') list = list.filter(p => p.purity === purity);
    if (inStockOnly) list = list.filter(p => p.inStock !== false);

    if (sort === 'new') list = [...list].sort((a,b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    // 'popular' fallback keeps original order
    return list;
  }, [all, query, purity, inStockOnly, sort]);

  // Track search queries with debounce
  useEffect(() => {
    const q = query.trim();
    if (!q || q.length < 2) return;

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout to track search after user stops typing
    searchTimeoutRef.current = setTimeout(() => {
      trackSearch(q, products.length).catch(err => 
        console.error('Failed to track search:', err)
      );
    }, 1000); // Wait 1 second after user stops typing

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, products.length]);

  return (
    <section className="section-padding">
      <div className="max-content">
        <SectionTitle title="All Products" subtitle="Catalog" />
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading products...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading products</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {!loading && <div className="mb-6 grid gap-4 md:grid-cols-4 items-end bg-white/70 p-4 rounded-lg border border-accent-gold/30">
          <div className="md:col-span-2">
            <label className="block text-xs text-ink-600 mb-1">Search</label>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="w-full border border-accent-gold/40 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs text-ink-600 mb-1">Purity</label>
            <select value={purity} onChange={e=>setPurity(e.target.value as any)} className="w-full border border-accent-gold/40 rounded px-3 py-2">
              <option value="all">All</option>
              <option value="24K">24K</option>
              <option value="22K">22K</option>
              <option value="18K">18K</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-ink-600 mb-1">Sort</label>
            <select value={sort} onChange={e=>setSort(e.target.value as any)} className="w-full border border-accent-gold/40 rounded px-3 py-2">
              <option value="popular">Popularity</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStockOnly} onChange={e=>setInStockOnly(e.target.checked)} />
            In Stock only
          </label>
        </div>}
        {!loading && <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
          {products.length === 0 && (
            <div className="col-span-full text-sm text-ink-600">No products match your filters.</div>
          )}
        </div>}
      </div>
    </section>
  );
}
