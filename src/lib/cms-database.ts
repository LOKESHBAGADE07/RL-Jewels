import { supabase } from './supabase';
import { HeroSlide, Offer, SiteSetting } from '../types/cms';

// ===============================
// HERO SLIDES
// ===============================

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching hero slides:', error);
    throw new Error(`Failed to fetch hero slides: ${error.message}`);
  }
  
  return data || [];
}

export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching active hero slides:', error);
    throw new Error(`Failed to fetch active hero slides: ${error.message}`);
  }
  
  return data || [];
}

export async function createHeroSlide(slide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>): Promise<HeroSlide | null> {
  const { data, error } = await supabase
    .from('hero_slides')
    .insert([slide])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating hero slide:', error);
    throw new Error(`Failed to create hero slide: ${error.message}`);
  }
  
  return data;
}

export async function updateHeroSlide(id: string, updates: Partial<HeroSlide>): Promise<HeroSlide | null> {
  const { data, error} = await supabase
    .from('hero_slides')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating hero slide:', error);
    throw new Error(`Failed to update hero slide: ${error.message}`);
  }
  
  return data;
}

export async function deleteHeroSlide(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('hero_slides')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting hero slide:', error);
    throw new Error(`Failed to delete hero slide: ${error.message}`);
  }
  
  return true;
}

// ===============================
// OFFERS
// ===============================

export async function getAllOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching offers:', error);
    throw new Error(`Failed to fetch offers: ${error.message}`);
  }
  
  return data || [];
}

export async function getActiveOffers(): Promise<Offer[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching active offers:', error);
    throw new Error(`Failed to fetch active offers: ${error.message}`);
  }
  
  return data || [];
}

export async function createOffer(offer: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer | null> {
  const { data, error } = await supabase
    .from('offers')
    .insert([offer])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating offer:', error);
    throw new Error(`Failed to create offer: ${error.message}`);
  }
  
  return data;
}

export async function updateOffer(id: string, updates: Partial<Offer>): Promise<Offer | null> {
  const { data, error } = await supabase
    .from('offers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating offer:', error);
    throw new Error(`Failed to update offer: ${error.message}`);
  }
  
  return data;
}

export async function deleteOffer(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting offer:', error);
    throw new Error(`Failed to delete offer: ${error.message}`);
  }
  
  return true;
}

// ===============================
// SITE SETTINGS
// ===============================

export async function getAllSiteSettings(): Promise<SiteSetting[]> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('setting_key', { ascending: true });
  
  if (error) {
    console.error('Error fetching site settings:', error);
    throw new Error(`Failed to fetch site settings: ${error.message}`);
  }
  
  return data || [];
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('setting_value')
    .eq('setting_key', key)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching site setting:', error);
    throw new Error(`Failed to fetch site setting: ${error.message}`);
  }
  
  return data?.setting_value || null;
}

export async function updateSiteSetting(key: string, value: string): Promise<SiteSetting | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .update({ setting_value: value, updated_at: new Date().toISOString() })
    .eq('setting_key', key)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating site setting:', error);
    throw new Error(`Failed to update site setting: ${error.message}`);
  }
  
  return data;
}

export async function uploadHeroMedia(file: File, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`hero-slides/${path}`, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading hero media:', error);
    throw new Error(`Failed to upload media: ${error.message}`);
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(`hero-slides/${data.path}`);
  
  return publicUrl;
}
