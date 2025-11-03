-- ================================================
-- UPDATE HERO BANNERS TABLE - ADD VIDEO SUPPORT
-- ================================================
-- Run this to add video support to existing hero_banners table
-- ================================================

-- Add new columns for video support
ALTER TABLE public.hero_banners 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS media_type TEXT CHECK (media_type IN ('image', 'video'));

-- Update existing records to set media_type
UPDATE public.hero_banners 
SET media_type = 'image' 
WHERE image_url IS NOT NULL AND media_type IS NULL;

-- ================================================
-- VERIFICATION
-- ================================================
-- Check the updated table structure:
-- SELECT id, title, media_type, image_url, video_url FROM public.hero_banners;
-- ================================================
