import { supabase } from './supabase';

export interface Collection {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CollectionFormData {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  sort_order: number;
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching collections:', error);
    throw new Error(`Failed to fetch collections: ${error.message}`);
  }

  return data || [];
}

// Fetch single collection
export async function getCollection(id: string): Promise<Collection | null> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching collection:', error);
    return null;
  }

  return data;
}

// Create collection
export async function createCollection(collection: CollectionFormData): Promise<Collection | null> {
  const { data, error } = await supabase
    .from('collections')
    .insert([{
      id: collection.id,
      title: collection.title,
      description: collection.description,
      featured: collection.featured,
      sort_order: collection.sort_order,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating collection:', error);
    throw new Error(`Failed to create collection: ${error.message}`);
  }

  return data;
}

// Update collection
export async function updateCollection(id: string, updates: Partial<CollectionFormData>): Promise<Collection | null> {
  const { data, error } = await supabase
    .from('collections')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating collection:', error);
    throw new Error(`Failed to update collection: ${error.message}`);
  }

  return data;
}

// Delete collection
export async function deleteCollection(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting collection:', error);
    throw new Error(`Failed to delete collection: ${error.message}`);
  }

  return true;
}

// Upload collection image
export async function uploadCollectionImage(
  collectionId: string,
  file: File
): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${collectionId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('collections')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('collections')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // Update collection with new image URL
    await supabase
      .from('collections')
      .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', collectionId);

    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading collection image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

// Delete collection image
export async function deleteCollectionImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/collections/');
    if (urlParts.length < 2) return false;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('collections')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}
