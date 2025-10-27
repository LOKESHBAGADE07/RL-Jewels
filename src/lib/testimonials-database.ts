import { supabase } from './supabase';
import { Testimonial } from '../types/testimonial';

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error(`Failed to fetch testimonials: ${error.message}`);
  }
  
  return data || [];
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching approved testimonials:', error);
    throw new Error(`Failed to fetch approved testimonials: ${error.message}`);
  }
  
  return data || [];
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching testimonial:', error);
    throw new Error(`Failed to fetch testimonial: ${error.message}`);
  }
  
  return data;
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating testimonial:', error);
    throw new Error(`Failed to create testimonial: ${error.message}`);
  }
  
  return data;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating testimonial:', error);
    throw new Error(`Failed to update testimonial: ${error.message}`);
  }
  
  return data;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting testimonial:', error);
    throw new Error(`Failed to delete testimonial: ${error.message}`);
  }
  
  return true;
}

export async function approveTestimonial(id: string): Promise<Testimonial | null> {
  return updateTestimonial(id, { is_approved: true });
}

export async function unapproveTestimonial(id: string): Promise<Testimonial | null> {
  return updateTestimonial(id, { is_approved: false });
}
