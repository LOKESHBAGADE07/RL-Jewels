export interface Inquiry {
  id: string;
  customer_name: string;
  phone_number: string;
  email?: string;
  inquiry_type: 'whatsapp' | 'phone' | 'form' | 'other';
  product_interest?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export type InquiryFormData = Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;

export const INQUIRY_STATUSES = [
  { value: 'new', label: 'New', color: 'blue' },
  { value: 'contacted', label: 'Contacted', color: 'yellow' },
  { value: 'resolved', label: 'Resolved', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;
