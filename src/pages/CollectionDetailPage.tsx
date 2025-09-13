import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { newArrivals, bestSellers } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function CollectionDetailPage() {
  const { id } = useParams();
  const collection = collections.find(c => c.id === id);
  
  if (!collection) {
    return (
      <section className="section-padding">
        <div className="max-content text-center">
          <h1 className="text-2xl font-serif mb-4">Collection Not Found</h1>
          <Link to="/collections" className="text-brand-red hover:underline">
            ← Back to Collections
          </Link>
        </div>
      </section>
    );
  }

  useDocumentTitle(collection.title);
  const allProducts = [...newArrivals, ...bestSellers];
  const products = allProducts.filter(p => collection.products.includes(p.id));

  return (
    <section className="section-padding">
      <div className="max-content">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/collections" className="text-ink-500 hover:text-brand-red">Collections</Link>
          <span className="mx-2 text-ink-400">/</span>
          <span className="text-ink-900">{collection.title}</span>
        </nav>

        {/* Collection Header */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="aspect-[4/3] rounded-xl overflow-hidden">
            <img 
              src={collection.image} 
              alt={collection.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{collection.title}</h1>
            <p className="text-ink-700 mb-6 text-lg leading-relaxed">
              {collection.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-ink-600">
              <span>{products.length} Products</span>
              {collection.featured && (
                <span className="px-3 py-1 bg-accent-gold text-ink-900 rounded-full text-xs font-semibold">
                  Featured Collection
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <SectionTitle title="Products in this Collection" subtitle="" />
        
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-ink-600 mb-4">No products available in this collection yet.</p>
            <Link to="/catalog" className="text-brand-red hover:underline">
              Browse All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}