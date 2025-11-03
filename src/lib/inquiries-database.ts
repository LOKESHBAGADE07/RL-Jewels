import { supabase } from './supabase';
import { Inquiry } from '../types/inquiry';

export async function getAllInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching inquiries:', error);
    throw new Error(`Failed to fetch inquiries: ${error.message}`);
  }
  
  return data || [];
}

export async function getInquiriesByStatus(status: string): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching inquiries by status:', error);
    throw new Error(`Failed to fetch inquiries: ${error.message}`);
  }
  
  return data || [];
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching inquiry:', error);
    throw new Error(`Failed to fetch inquiry: ${error.message}`);
  }
  
  return data;
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating inquiry:', error);
    throw new Error(`Failed to create inquiry: ${error.message}`);
  }
  
  return data;
}

export async function updateInquiry(id: string, updates: Partial<Inquiry>): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating inquiry:', error);
    throw new Error(`Failed to update inquiry: ${error.message}`);
  }
  
  return data;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting inquiry:', error);
    throw new Error(`Failed to delete inquiry: ${error.message}`);
  }
  
  return true;
}

export async function updateInquiryStatus(id: string, status: string): Promise<Inquiry | null> {
  return updateInquiry(id, { status: status as Inquiry['status'] });
}

export async function addInquiryNote(id: string, note: string): Promise<Inquiry | null> {
  return updateInquiry(id, { admin_notes: note });
}

export async function trackWhatsAppClick(productName?: string): Promise<void> {
  try {
    await createInquiry({
      customer_name: 'WhatsApp Inquiry',
      phone_number: 'Via WhatsApp',
      inquiry_type: 'whatsapp',
      product_interest: productName,
      message: `Customer clicked WhatsApp button${productName ? ` for product: ${productName}` : ''}`,
      status: 'new',
    });
  } catch (err) {
    console.error('Failed to track WhatsApp click:', err);
  }
}

export async function trackPhoneClick(): Promise<void> {
  try {
    await createInquiry({
      customer_name: 'Phone Call',
      phone_number: 'Via Phone',
      inquiry_type: 'phone',
      message: 'Customer clicked phone button',
      status: 'new',
    });
  } catch (err) {
    console.error('Failed to track phone click:', err);
  }
}
