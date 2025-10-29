-- =============================================
-- TESTIMONIALS TABLE SETUP FOR SUPABASE
-- =============================================
-- Copy and paste this into your Supabase SQL Editor
-- to create the testimonials table with proper security

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid duplicate policy errors)
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin can manage testimonials" ON testimonials;

-- Public can view approved testimonials only
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Admin can manage all testimonials
CREATE POLICY "Admin can manage testimonials" ON testimonials
  FOR ALL USING (auth.email() = 'lbagade6@gmail.com');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC);

-- Add sample testimonial (optional - remove after testing)
INSERT INTO testimonials (
  customer_name, 
  customer_location, 
  video_url, 
  testimonial_text, 
  rating, 
  is_approved, 
  display_order
) VALUES (
  'Priya Sharma',
  'Mumbai, Maharashtra',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'Excellent service and beautiful jewelry! The staff at RL Jewels helped me find the perfect bridal set. Highly recommended!',
  5,
  true,
  1
) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Testimonials table created successfully!' AS message;
