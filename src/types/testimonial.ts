export interface Testimonial {
  id: string;
  customer_name: string;
  customer_location?: string;
  video_url: string;
  thumbnail_url?: string;
  testimonial_text: string;
  rating: number;
  is_approved: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TestimonialFormData = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
