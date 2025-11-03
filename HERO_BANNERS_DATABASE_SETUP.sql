-- ================================================
-- HERO BANNERS DATABASE SETUP
-- ================================================
-- This creates the hero_banners table for managing
-- sliding offer banners on the homepage hero section
-- ================================================

-- Create hero_banners table
CREATE TABLE IF NOT EXISTS public.hero_banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  button_text TEXT DEFAULT 'Learn More',
  button_link TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for hero_banners
-- Everyone can view active banners
CREATE POLICY "Anyone can view active hero banners"
ON public.hero_banners
FOR SELECT
TO public
USING (active = true);

-- Authenticated users can view all banners (for admin)
CREATE POLICY "Authenticated users can view all hero banners"
ON public.hero_banners
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- Authenticated users can insert banners
CREATE POLICY "Authenticated users can insert hero banners"
ON public.hero_banners
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update banners
CREATE POLICY "Authenticated users can update hero banners"
ON public.hero_banners
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can delete banners
CREATE POLICY "Authenticated users can delete hero banners"
ON public.hero_banners
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- Insert default hero banners
INSERT INTO public.hero_banners (id, title, description, button_text, button_link, active, sort_order) VALUES
('banner-1', 'Welcome to RL Jewels', 'Discover exquisite jewelry crafted with precision and passion', 'Browse Collections', '#collections', true, 1),
('banner-2', 'Festive Offer', 'Flat 50% off on making charges this season', 'Shop Now', '#collections', true, 2),
('banner-3', 'New Bridal Collection', 'Elegant designs for your special day', 'Explore Collection', '/collections', true, 3),
('banner-4', 'Gold Savings Plan', 'Join our savings plan and get bonus benefits at maturity', 'Learn More', '#savings', true, 4);

-- ================================================
-- VERIFICATION
-- ================================================
-- Check that the table and policies were created:
-- SELECT * FROM public.hero_banners;
-- ================================================
