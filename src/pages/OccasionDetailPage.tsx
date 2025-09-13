import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { occasions } from '../data/occasions';
import { newArrivals, bestSellers } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function OccasionDetailPage() {
  const { id } = useParams();
  const occasion = occasions.find(o => o.id === id);
  
  if (!occasion) {
    return (
      <section className="section-padding">
        <div className="max-content text-center">
          <h1 className="text-2xl font-serif mb-4">Occasion Not Found</h1>
          <Link to="/occasions" className="text-brand-red hover:underline">
            ← Back to Occasions
          </Link>
        </div>
      </section>
    );
  }

  useDocumentTitle(`${occasion.title} Jewelry`);
  const allProducts = [...newArrivals, ...bestSellers];
  const products = allProducts.filter(p => occasion.products.includes(p.id));

  return (
    <section className="section-padding">
      <div className="max-content">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/occasions" className="text-ink-500 hover:text-brand-red">Occasions</Link>
          <span className="mx-2 text-ink-400">/</span>
          <span className="text-ink-900">{occasion.title}</span>
        </nav>

        {/* Occasion Header */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="aspect-[4/5] md:aspect-[4/3] rounded-xl overflow-hidden">
            <img 
              src={occasion.image} 
              alt={occasion.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{occasion.title} Jewelry</h1>
            <p className="text-ink-700 mb-6 text-lg leading-relaxed">
              {occasion.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {occasion.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-surface-200 text-ink-700 rounded-full text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-ink-600">
              <span>{products.length} Perfect Pieces</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <SectionTitle title={`Perfect for ${occasion.title}`} subtitle="" />
        
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-ink-600 mb-4">No products available for this occasion yet.</p>
            <Link to="/catalog" className="text-brand-red hover:underline">
              Browse All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}