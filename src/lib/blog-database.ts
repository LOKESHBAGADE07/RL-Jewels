import { supabase } from './supabase';
import { BlogPost } from '../types/blog';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
  
  return data || [];
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching published blog posts:', error);
    throw new Error(`Failed to fetch published blog posts: ${error.message}`);
  }
  
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching blog post:', error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }
  
  return data;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching blog post:', error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }
  
  return data;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts by category:', error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
  
  return data || [];
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating blog post:', error);
    throw new Error(`Failed to create blog post: ${error.message}`);
  }
  
  return data;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating blog post:', error);
    throw new Error(`Failed to update blog post: ${error.message}`);
  }
  
  return data;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting blog post:', error);
    throw new Error(`Failed to delete blog post: ${error.message}`);
  }
  
  return true;
}

export async function publishBlogPost(id: string): Promise<BlogPost | null> {
  return updateBlogPost(id, { 
    is_published: true, 
    published_at: new Date().toISOString() 
  });
}

export async function unpublishBlogPost(id: string): Promise<BlogPost | null> {
  return updateBlogPost(id, { is_published: false });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function uploadBlogImage(file: File, path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`blog/${path}`, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading blog image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(`blog/${data.path}`);
  
  return publicUrl;
}
