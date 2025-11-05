import { createClient } from '@supabase/supabase-js';
import { Product as LocalProduct } from '../data/products';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Product type matching database schema
export interface Product {
  id: string;
  title: string;
  image: string;
  images?: string[];
  price?: number;
  original_price?: number;
  badge?: string;
  tags: string[];
  purity?: string;
  gross_weight_grams?: number;
  net_weight_grams?: number;
  in_stock: boolean;
  created_at?: string;
  updated_at?: string;
}

// Convert Supabase product to local product format
export function toLocalProduct(product: Product): LocalProduct {
  return {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price || 0,
    originalPrice: product.original_price,
    tags: product.tags,
    badge: product.badge,
    purity: product.purity as '22K' | '24K' | '18K' | undefined,
    grossWeightGrams: product.gross_weight_grams,
    netWeightGrams: product.net_weight_grams,
    inStock: product.in_stock,
    images: product.images,
  };
}

// Additional Database Types for Admin System
export interface Collection {
  id: string;
  title: string;
  title_hi?: string;
  title_mr?: string;
  description?: string;
  description_hi?: string;
  description_mr?: string;
  thumbnail_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  title_hi?: string;
  title_mr?: string;
  subtitle?: string;
  subtitle_hi?: string;
  subtitle_mr?: string;
  media_url: string;
  media_type: 'image' | 'video';
  cta_text?: string;
  cta_text_hi?: string;
  cta_text_mr?: string;
  cta_link?: string;
  display_order: number;
  duration_seconds: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  title_hi?: string;
  title_mr?: string;
  slug: string;
  excerpt?: string;
  excerpt_hi?: string;
  excerpt_mr?: string;
  content: string;
  content_hi?: string;
  content_mr?: string;
  featured_image_url: string;
  author: string;
  category: string;
  tags?: string[];
  read_time_minutes: number;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_name_hi?: string;
  customer_name_mr?: string;
  customer_image_url?: string;
  rating: number;
  testimonial_text: string;
  testimonial_text_hi?: string;
  testimonial_text_mr?: string;
  location?: string;
  purchase_type?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  name: string;
  name_hi?: string;
  name_mr?: string;
  address: string;
  address_hi?: string;
  address_mr?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  map_embed_url: string;
  latitude?: number;
  longitude?: number;
  opening_hours?: Record<string, string>;
  store_image_url?: string;
  is_flagship: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiry_type: 'general' | 'product' | 'custom_order' | 'complaint';
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Helper functions for file uploads
export const uploadFile = async (
  bucket: string,
  file: File,
  path?: string
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    
    return { url: data.publicUrl, error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { url: null, error: error as Error };
  }
};

export const deleteFile = async (
  bucket: string,
  filePath: string
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    return { error };
  } catch (error) {
    console.error('Delete error:', error);
    return { error: error as Error };
  }
};

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const role = user.app_metadata?.role || user.user_metadata?.role;
    return role === 'admin';
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
};

export default supabase;
