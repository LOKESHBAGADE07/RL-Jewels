import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Product type matching database schema
export interface Product {
  id: string;
  title: string;
  image: string;
  images?: string[];
  price: number;
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
