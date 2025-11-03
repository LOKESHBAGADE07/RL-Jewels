-- ================================================
-- FIX STORAGE BUCKET POLICIES FOR COLLECTIONS & HERO BANNERS
-- ================================================
-- This fixes the upload error by allowing authenticated users
-- to upload images to the 'collections' and 'hero-banners' buckets
-- ================================================

-- Step 1: Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;

-- ================================================
-- COLLECTIONS BUCKET POLICIES
-- ================================================

-- Allow authenticated users to upload to collections bucket
CREATE POLICY "Authenticated users can upload to collections"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'collections');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update collections"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'collections')
WITH CHECK (bucket_id = 'collections');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete from collections"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'collections');

-- Allow everyone to view/download images (public bucket)
CREATE POLICY "Public can view collections images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'collections');

-- ================================================
-- HERO BANNERS BUCKET POLICIES
-- ================================================

-- Allow authenticated users to upload to hero-banners bucket
CREATE POLICY "Authenticated users can upload to hero-banners"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hero-banners');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update hero-banners"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'hero-banners')
WITH CHECK (bucket_id = 'hero-banners');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete from hero-banners"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'hero-banners');

-- Allow everyone to view/download images (public bucket)
CREATE POLICY "Public can view hero-banners images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'hero-banners');

-- ================================================
-- VERIFICATION
-- ================================================
-- After running this, you should see 8 policies total:
-- - 4 for collections bucket
-- - 4 for hero-banners bucket
-- ================================================
