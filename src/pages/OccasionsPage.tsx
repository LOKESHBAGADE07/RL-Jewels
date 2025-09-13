import React from 'react';
import { Link } from 'react-router-dom';
import { occasions } from '../data/occasions';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function OccasionsPage() {
  useDocumentTitle('Shop by Occasion');

  return (
    <section className="section-padding">
      <div className="max-content">
        <SectionTitle title="Shop by Occasion" subtitle="Find Perfect Pieces" />
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {occasions.map(occasion => (
            <Link 
              key={occasion.id} 
              to={`/occasion/${occasion.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-accent-gold/15"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={occasion.image} 
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-1 group-hover:text-brand-red transition-colors">
                  {occasion.title}
                </h3>
                <p className="text-xs text-ink-600 line-clamp-2 mb-3">
                  {occasion.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-500">
                    {occasion.products.length} items
                  </span>
                  <span className="text-brand-red text-xs font-semibold group-hover:underline">
                    Explore
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