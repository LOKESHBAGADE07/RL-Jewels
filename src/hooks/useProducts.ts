import { useEffect, useState } from 'react';
import { getAllProducts, getProductById } from '../lib/database';
import { Product } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        const message = err instanceof Error ? err.message : 'Failed to load products. Please check your Supabase configuration.';
        setError(message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error loading product:', err);
        const message = err instanceof Error ? err.message : 'Failed to load product';
        setError(message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  return { product, loading, error };
}
