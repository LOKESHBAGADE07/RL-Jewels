-- ========================================
-- COMPLETE HERO BANNERS SETUP WITH VIDEO SUPPORT
-- Run this in Supabase SQL Editor
-- ========================================

-- Create hero_banners table with video support
CREATE TABLE IF NOT EXISTS hero_banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  video_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 5 CHECK (duration_seconds >= 1 AND duration_seconds <= 60),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add duration_seconds column if table already exists (for existing installations)
ALTER TABLE hero_banners 
ADD COLUMN IF NOT EXISTS duration_seconds INTEGER DEFAULT 5;

-- Add constraint for duration if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'hero_banners_duration_seconds_check'
  ) THEN
    ALTER TABLE hero_banners 
    ADD CONSTRAINT hero_banners_duration_seconds_check CHECK (duration_seconds >= 1 AND duration_seconds <= 60);
  END IF;
END $$;

-- Update existing records without duration
UPDATE hero_banners 
SET duration_seconds = 5 
WHERE duration_seconds IS NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hero_banners_order ON hero_banners(display_order);
CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(is_active);

-- Enable Row Level Security
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Drop existing RLS policies if they exist
DROP POLICY IF EXISTS "Public can view active hero banners" ON hero_banners;
DROP POLICY IF EXISTS "Authenticated users can manage hero banners" ON hero_banners;

-- Allow public to read active banners
CREATE POLICY "Public can view active hero banners"
ON hero_banners FOR SELECT
USING (is_active = true);

-- Allow authenticated users to do everything
CREATE POLICY "Authenticated users can manage hero banners"
ON hero_banners FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create storage bucket for hero banners
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-banners', 'hero-banners', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Public can view hero banner files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload hero banner files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update hero banner files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete hero banner files" ON storage.objects;

-- Storage policies for hero-banners bucket
CREATE POLICY "Public can view hero banner files"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-banners');

CREATE POLICY "Authenticated can upload hero banner files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hero-banners' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated can update hero banner files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'hero-banners' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated can delete hero banner files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'hero-banners' 
  AND auth.role() = 'authenticated'
);

-- Insert sample banner (optional)
INSERT INTO hero_banners (title, subtitle, button_text, button_link, display_order, duration_seconds, is_active)
VALUES 
  ('Welcome to RL Jewels', 'Discover exquisite handcrafted jewelry', 'Shop Now', '/collections', 1, 5, true)
ON CONFLICT DO NOTHING;

-- Add helpful comments
COMMENT ON TABLE hero_banners IS 'Hero carousel banners for homepage';
COMMENT ON COLUMN hero_banners.media_type IS 'Type of media: image or video';
COMMENT ON COLUMN hero_banners.video_url IS 'URL for video media';
COMMENT ON COLUMN hero_banners.image_url IS 'URL for image media';
COMMENT ON COLUMN hero_banners.duration_seconds IS 'Display duration in seconds (1-60). How long this banner shows before auto-advancing.';

-- Success message
SELECT 'Hero Banners table created successfully with video support! ✅' AS status;
