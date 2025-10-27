export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  media_url: string;
  media_type: 'image' | 'video';
  link_url?: string;
  link_text?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  banner_type: 'festival' | 'sale' | 'announcement';
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: 'text' | 'number' | 'boolean' | 'json';
  description?: string;
  updated_at: string;
}
