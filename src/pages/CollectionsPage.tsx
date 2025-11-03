import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../lib/collections-database';
import SectionTitle from '../components/SectionTitle';
import useDocumentTitle from '../lib/useDocumentTitle';
import { useProducts } from '../hooks/useProducts';

interface Collection {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
}

export default function CollectionsPage() {
  useDocumentTitle('Collections');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();

  useEffect(() => {
    async function loadCollections() {
      const data = await getCollections();
      if (data) {
        // Sort by sort_order
        setCollections(data.sort((a, b) => a.sort_order - b.sort_order));
      }
      setLoading(false);
    }
    loadCollections();
  }, []);

  // Count products in each collection based on tags
  function getProductCount(collectionId: string): number {
    const tagMap: { [key: string]: string[] } = {
      'gold-jewelry': ['gold', '22K', '24K'],
      'silver-jewelry': ['silver'],
      'diamond-jewelry': ['diamond'],
      'bridal-collection': ['bridal', 'wedding'],
      'daily-wear': ['daily', 'casual']
    };

    const tags = tagMap[collectionId] || [];
    return products.filter(product => 
      product.tags?.some(tag => tags.some(t => tag.toLowerCase().includes(t.toLowerCase())))
    ).length;
  }

  if (loading) {
    return (
      <section className="section-padding">
        <div className="max-content">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading collections...</p>
          </div>
        </div>
      </section>
    );
  }

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
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img 
                  src={collection.image_url || '/assets/products/necklace.svg'} 
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
                    {getProductCount(collection.id)} products
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