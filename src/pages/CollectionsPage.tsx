import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function CollectionsPage() {
  useDocumentTitle('Collections');

  return (
    <section className="section-padding">
      <div className="max-content">
        <SectionTitle title="Our Collections" subtitle="Explore" />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map(collection => (
            <Link 
              key={collection.id} 
              to={`/collection/${collection.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-accent-gold/20"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-brand-red transition-colors">
                  {collection.title}
                </h3>
                <p className="text-sm text-ink-600 line-clamp-2 mb-3">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-500">
                    {collection.products.length} products
                  </span>
                  <span className="text-brand-red text-sm font-semibold group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}