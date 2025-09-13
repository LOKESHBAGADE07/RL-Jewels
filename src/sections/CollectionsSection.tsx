import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { collections } from '../data/collections';

export const CollectionsSection = () => {
  // Show only featured collections on homepage
  const featuredCollections = collections.filter(c => c.featured).slice(0, 4);

  return (
    <section id="collections" className="section-padding bg-white/5">
      <div className="max-content">
        <SectionTitle subtitle="Explore" title="Our Collections" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {featuredCollections.map(collection => (
            <Link 
              key={collection.id} 
              to={`/collection/${collection.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-accent-gold/20"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 flex items-center justify-center">
                <img 
                  src={collection.image} 
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
        <div className="text-center">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-semibold"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CollectionsSection;
