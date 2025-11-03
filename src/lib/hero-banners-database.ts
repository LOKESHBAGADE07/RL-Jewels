import { supabase } from './supabase';

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  button_text: string;
  button_link: string | null;
  image_url: string | null;
  video_url: string | null;
  media_type: 'image' | 'video' | null;
  is_active: boolean;
  display_order: number;
  duration_seconds: number;
  created_at?: string;
  updated_at?: string;
}

export interface HeroBannerFormData {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  is_active: boolean;
  display_order: number;
  duration_seconds: number;
}

// Fetch all hero banners (for admin)
export async function getAllHeroBanners(): Promise<HeroBanner[]> {
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero banners:', error);
    throw new Error(`Failed to fetch hero banners: ${error.message}`);
  }

  return data || [];
}

// Fetch active hero banners (for public display)
export async function getActiveHeroBanners(): Promise<HeroBanner[]> {
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active hero banners:', error);
    throw new Error(`Failed to fetch active hero banners: ${error.message}`);
  }

  return data || [];
}

// Fetch single banner
export async function getHeroBanner(id: string): Promise<HeroBanner | null> {
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching hero banner:', error);
    return null;
  }

  return data;
}

// Create banner
export async function createHeroBanner(banner: Omit<HeroBannerFormData, 'id'> | HeroBannerFormData): Promise<HeroBanner | null> {
  // Let database generate UUID if not provided
  const insertData: any = {
    title: banner.title,
    subtitle: banner.subtitle,
    button_text: banner.button_text,
    button_link: banner.button_link,
    is_active: banner.is_active,
    display_order: banner.display_order,
    duration_seconds: banner.duration_seconds || 5,
  };

  // Only include id if it's a valid UUID
  if ('id' in banner && banner.id && banner.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    insertData.id = banner.id;
  }

  const { data, error } = await supabase
    .from('hero_banners')
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.error('Error creating hero banner:', error);
    throw new Error(`Failed to create hero banner: ${error.message}`);
  }

  return data;
}

// Update banner
export async function updateHeroBanner(id: string, updates: Partial<HeroBannerFormData>): Promise<HeroBanner | null> {
  const { data, error } = await supabase
    .from('hero_banners')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating hero banner:', error);
    throw new Error(`Failed to update hero banner: ${error.message}`);
  }

  return data;
}

// Delete banner
export async function deleteHeroBanner(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('hero_banners')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting hero banner:', error);
    throw new Error(`Failed to delete hero banner: ${error.message}`);
  }

  return true;
}

// Upload banner media (image or video)
export async function uploadHeroBannerMedia(
  bannerId: string,
  file: File
): Promise<{ url: string; type: 'image' | 'video' }> {
  try {
    // Determine media type
    const isVideo = file.type.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${bannerId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('hero-banners')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('hero-banners')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // Update banner with new media URL and type
    const updateData: any = {
      media_type: mediaType,
      updated_at: new Date().toISOString()
    };

    if (isVideo) {
      updateData.video_url = publicUrl;
      updateData.image_url = null;
    } else {
      updateData.image_url = publicUrl;
      updateData.video_url = null;
    }

    await supabase
      .from('hero_banners')
      .update(updateData)
      .eq('id', bannerId);

    return { url: publicUrl, type: mediaType };
  } catch (error: any) {
    console.error('Error uploading hero banner media:', error);
    throw new Error(`Failed to upload media: ${error.message}`);
  }
}

// Legacy function - kept for backward compatibility
export async function uploadHeroBannerImage(
  bannerId: string,
  file: File
): Promise<string> {
  const result = await uploadHeroBannerMedia(bannerId, file);
  return result.url;
}

// Delete banner media (image or video)
export async function deleteHeroBannerMedia(mediaUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = mediaUrl.split('/hero-banners/');
    if (urlParts.length < 2) return false;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('hero-banners')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting media:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
}

// Legacy function - kept for backward compatibility
export async function deleteHeroBannerImage(imageUrl: string): Promise<boolean> {
  return deleteHeroBannerMedia(imageUrl);
}
