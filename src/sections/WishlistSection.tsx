import React, { useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { bestSellers, newArrivals, Product } from '../data/products';
import ProductCard from '../components/ProductCard';

export const WishlistSection: React.FC = () => {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);
  const allProducts = useMemo<Product[]>(() => [...newArrivals, ...bestSellers], []);
  const items = allProducts.filter(p => wishlist.includes(p.id));
  return (
    <section id="wishlist" className="section-padding bg-white">
      <div className="max-content">
        <SectionTitle title="Your Wishlist" subtitle="Saved" />
        {items.length === 0 ? (
          <div className="p-10 text-center rounded-xl border border-dashed border-primary-gold/30 bg-white/60">
            <p className="mb-4 text-sm text-neutral-600">You have not added any products yet.</p>
            <button onClick={() => setWishlist([])} className="text-xs font-semibold tracking-wide text-primary-gold hover:underline focus:outline-none focus-visible:ring focus-visible:ring-primary-gold/40">Browse Collections</button>
          </div>
        ) : (
          <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};
export default WishlistSection;
