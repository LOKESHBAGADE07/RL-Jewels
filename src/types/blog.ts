export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  category: string;
  tags: string[];
  author_name: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export type BlogPostFormData = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

export const BLOG_CATEGORIES = [
  'Jewelry Care',
  'Gold Investment',
  'Gemstone Guide',
  'Wedding Jewelry',
  'Fashion Trends',
  'Buying Guide',
  'Traditional Jewelry',
  'Festival Special',
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
