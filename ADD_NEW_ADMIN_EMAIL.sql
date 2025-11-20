-- ========================================
-- ADD NEW ADMIN EMAIL: instamine9@gmail.com
-- ========================================
-- Run this SQL in Supabase SQL Editor to grant admin access
-- URL: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql/new

-- ========================================
-- STEP 1: Update Products Table Policies
-- ========================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can insert products" ON products;
DROP POLICY IF EXISTS "Admin can update products" ON products;
DROP POLICY IF EXISTS "Admin can delete products" ON products;

-- Recreate policies with both admin emails
CREATE POLICY "Admin can insert products" ON products
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update products" ON products
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete products" ON products
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 2: Update Collections Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can insert collections" ON collections;
DROP POLICY IF EXISTS "Admin can update collections" ON collections;
DROP POLICY IF EXISTS "Admin can delete collections" ON collections;

CREATE POLICY "Admin can insert collections" ON collections
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update collections" ON collections
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete collections" ON collections
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 3: Update Hero Banners Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can insert hero_banners" ON hero_banners;
DROP POLICY IF EXISTS "Admin can update hero_banners" ON hero_banners;
DROP POLICY IF EXISTS "Admin can delete hero_banners" ON hero_banners;

CREATE POLICY "Admin can insert hero_banners" ON hero_banners
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update hero_banners" ON hero_banners
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete hero_banners" ON hero_banners
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 4: Update Blog Posts Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can insert blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can update blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can delete blog_posts" ON blog_posts;

CREATE POLICY "Admin can insert blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update blog_posts" ON blog_posts
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete blog_posts" ON blog_posts
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 5: Update Testimonials Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin can delete testimonials" ON testimonials;

CREATE POLICY "Admin can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update testimonials" ON testimonials
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete testimonials" ON testimonials
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 6: Update Inquiries Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can view all inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admin can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admin can delete inquiries" ON inquiries;

CREATE POLICY "Admin can view all inquiries" ON inquiries
  FOR SELECT USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can update inquiries" ON inquiries
  FOR UPDATE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete inquiries" ON inquiries
  FOR DELETE USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 7: Update Analytics Table Policies
-- ========================================

DROP POLICY IF EXISTS "Admin can view analytics" ON analytics;
DROP POLICY IF EXISTS "Admin can insert analytics" ON analytics;

CREATE POLICY "Admin can view analytics" ON analytics
  FOR SELECT USING (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can insert analytics" ON analytics
  FOR INSERT WITH CHECK (
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 8: Update Storage Policies
-- ========================================

-- Product Images Bucket
DROP POLICY IF EXISTS "Admin can upload to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete from product-images" ON storage.objects;

CREATE POLICY "Admin can upload to product-images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND 
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

CREATE POLICY "Admin can delete from product-images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images' AND 
    auth.email() IN ('lbagade6@gmail.com', 'instamine9@gmail.com')
  );

-- ========================================
-- STEP 9: Verify Changes
-- ========================================

-- Check all policies (optional)
SELECT 
  schemaname,
  tablename,
  policyname,
  definition
FROM pg_policies
WHERE tablename IN (
  'products', 
  'collections', 
  'hero_banners', 
  'blog_posts', 
  'testimonials', 
  'inquiries', 
  'analytics'
)
ORDER BY tablename, policyname;

-- ========================================
-- ✅ SETUP COMPLETE
-- ========================================
-- Both emails can now access admin panel:
-- 1. lbagade6@gmail.com
-- 2. instamine9@gmail.com
--
-- Test by logging in at: /admin/login
-- ========================================
