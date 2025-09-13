import React, { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { newArrivals, bestSellers, type Product } from '../data/products';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function CatalogPage() {
  useDocumentTitle('Catalog');
  const all: Product[] = [...newArrivals, ...bestSellers];
  const [query, setQuery] = useState('');
  const [purity, setPurity] = useState<'all'|'22K'|'24K'|'18K'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sort, setSort] = useState<'popular'|'price-asc'|'price-desc'|'new'>('popular');

  const products = useMemo(() => {
    let list = all;
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || (p.tags || []).some(t => t.includes(q)));
    if (purity !== 'all') list = list.filter(p => p.purity === purity);
    if (inStockOnly) list = list.filter(p => p.inStock !== false);
    if (minPrice !== '') list = list.filter(p => p.price >= (minPrice as number));
    if (maxPrice !== '') list = list.filter(p => p.price <= (maxPrice as number));

    if (sort === 'price-asc') list = [...list].sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    else if (sort === 'new') list = [...list].sort((a,b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    // 'popular' fallback keeps original order
    return list;
  }, [all, query, purity, inStockOnly, minPrice, maxPrice, sort]);

  return (
    <section className="section-padding">
      <div className="max-content">
        <SectionTitle title="All Products" subtitle="Catalog" />
        <div className="mb-6 grid gap-4 md:grid-cols-4 lg:grid-cols-6 items-end bg-white/70 p-4 rounded-lg border border-accent-gold/30">
          <div className="md:col-span-2 lg:col-span-2">
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
            <label className="block text-xs text-ink-600 mb-1">Min Price</label>
            <input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value===''?'':Number(e.target.value))} className="w-full border border-accent-gold/40 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs text-ink-600 mb-1">Max Price</label>
            <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value===''?'':Number(e.target.value))} className="w-full border border-accent-gold/40 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs text-ink-600 mb-1">Sort</label>
            <select value={sort} onChange={e=>setSort(e.target.value as any)} className="w-full border border-accent-gold/40 rounded px-3 py-2">
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
          <label className="inline-flex items-center gap-2 text-sm md:col-span-2 lg:col-span-1">
            <input type="checkbox" checked={inStockOnly} onChange={e=>setInStockOnly(e.target.checked)} />
            In Stock only
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
          {products.length === 0 && (
            <div className="col-span-full text-sm text-ink-600">No products match your filters.</div>
          )}
        </div>
      </div>
    </section>
  );
}
