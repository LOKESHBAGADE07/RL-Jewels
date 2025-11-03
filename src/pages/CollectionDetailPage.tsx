import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function CollectionDetailPage() {
  const { id } = useParams();
  const collection = collections.find(c => c.id === id);
  const { products: allProducts, loading, error } = useProducts();
  
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
  
  // Filter products based on collection type
  const products = useMemo(() => {
    return allProducts.filter(p => {
      const tags = (p.tags || []).map(t => t.toLowerCase());
      const title = p.title.toLowerCase();
      
      // Map collection IDs to categories/tags
      switch(id) {
        case 'gold-jewelry':
          return tags.includes('gold') || title.includes('gold') || p.purity === '22K' || p.purity === '24K';
        case 'silver-jewelry':
          return tags.includes('silver') || title.includes('silver');
        case 'diamond-jewelry':
          return tags.includes('diamond') || title.includes('diamond');
        case 'bridal-collection':
          return tags.includes('bridal') || tags.includes('wedding') || title.includes('bridal');
        case 'daily-wear':
          return tags.includes('daily') || tags.includes('casual') || title.includes('daily');
        default:
          return collection.products.includes(p.id);
      }
    });
  }, [allProducts, id, collection]);

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
        
        {!loading && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ink-600 mb-4">No products available in this collection yet.</p>
            <p className="text-sm text-ink-500 mb-4">
              Add products with tags like "{id?.replace(/-/g, ' ')}" in the admin panel.
            </p>
            <Link to="/catalog" className="text-brand-red hover:underline">
              Browse All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}