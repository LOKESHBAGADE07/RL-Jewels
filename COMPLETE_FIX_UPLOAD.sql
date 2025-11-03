-- ================================================
-- COMPLETE FIX FOR COLLECTIONS IMAGE UPLOAD
-- ================================================
-- Run this entire file to fix the upload error
-- ================================================

-- ================================================
-- PART 1: FIX COLLECTIONS TABLE RLS POLICIES
-- ================================================

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Admin can insert collections" ON public.collections;
DROP POLICY IF EXISTS "Admin can update collections" ON public.collections;
DROP POLICY IF EXISTS "Admin can delete collections" ON public.collections;

-- Create new policies that allow any authenticated user
CREATE POLICY "Authenticated users can insert collections"
ON public.collections
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update collections"
ON public.collections
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete collections"
ON public.collections
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- ================================================
-- PART 2: FIX STORAGE BUCKET POLICIES
-- ================================================

-- Drop existing storage policies (if any)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to collections" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update collections" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete from collections" ON storage.objects;
DROP POLICY IF EXISTS "Public can view collections images" ON storage.objects;

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
-- VERIFICATION
-- ================================================
-- Check that policies were created successfully:
-- 
-- 1. Table Policies (public.collections):
--    - Authenticated users can insert collections ✅
--    - Authenticated users can update collections ✅
--    - Authenticated users can delete collections ✅
--
-- 2. Storage Policies (storage.objects):
--    - Authenticated users can upload to collections ✅
--    - Authenticated users can update collections ✅
--    - Authenticated users can delete from collections ✅
--    - Public can view collections images ✅
-- ================================================
