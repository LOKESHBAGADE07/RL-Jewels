import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { getCollections } from '../lib/collections-database';

interface Collection {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
}

export const CollectionsSection = () => {
  const [featuredCollections, setFeaturedCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedCollections() {
      const data = await getCollections();
      if (data) {
        // Show only featured collections, sorted by sort_order, max 4
        const featured = data
          .filter(c => c.featured)
          .sort((a, b) => a.sort_order - b.sort_order)
          .slice(0, 4);
        setFeaturedCollections(featured);
      }
      setLoading(false);
    }
    loadFeaturedCollections();
  }, []);

  if (loading) {
    return (
      <section id="collections" className="section-padding bg-white/5">
        <div className="max-content">
          <SectionTitle subtitle="Explore" title="Our Collections" />
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading collections...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collections" className="section-padding bg-white/5">
      <div className="max-content">
        <SectionTitle subtitle="Explore" title="Our Collections" />
        {/* Mobile: Show only 4 items in 2x2 grid */}
        <div className="grid gap-6 grid-cols-2 md:hidden mb-6">
          {featuredCollections.slice(0, 4).map(collection => (
            <Link 
              key={collection.id} 
              to={`/collection/${collection.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-accent-gold/20"
            >
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 flex items-center justify-center">
                <img 
                  src={collection.image_url || '/assets/products/necklace.svg'} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-center p-4';
                      fallback.innerHTML = `<div class="text-3xl mb-2">💎</div><div class="font-semibold text-accent-gold">${collection.title}</div>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-xs mb-1 group-hover:text-brand-red transition-colors line-clamp-1">
                  {collection.title}
                </h3>
                <p className="text-[10px] text-ink-600 line-clamp-1 mb-1">
                  {collection.description}
                </p>
                <span className="text-brand-red text-[10px] font-semibold group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Show all in original layout */}
        <div className="hidden md:grid gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
          {featuredCollections.map(collection => (
            <Link 
              key={collection.id} 
              to={`/collection/${collection.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-accent-gold/20"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 flex items-center justify-center">
                <img 
                  src={collection.image_url || '/assets/products/necklace.svg'} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-center p-4';
                      fallback.innerHTML = `<div class="text-3xl mb-2">💎</div><div class="font-semibold text-accent-gold">${collection.title}</div>`;
                      parent.appendChild(fallback);
                    }
                  }}
                /></div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-1 group-hover:text-brand-red transition-colors">
                  {collection.title}
                </h3>
                <p className="text-xs text-ink-600 line-clamp-2 mb-2">
                  {collection.description}
                </p>
                <span className="text-brand-red text-xs font-semibold group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View More Button - Show on mobile, hide on desktop */}
        <div className="text-center">
          <Link 
            to="/collections" 
            className="md:hidden inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-semibold text-sm"
          >
            View More Collections
          </Link>
          <Link 
            to="/collections" 
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-semibold"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CollectionsSection;
