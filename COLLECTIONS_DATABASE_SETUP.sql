-- =============================================
-- COLLECTIONS TABLE & STORAGE SETUP FOR SUPABASE
-- =============================================
-- Run this in Supabase SQL Editor to enable collection image uploads

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Public can view collections
CREATE POLICY "Anyone can view collections" ON collections
  FOR SELECT USING (true);

-- Admin can manage collections
CREATE POLICY "Admin can insert collections" ON collections
  FOR INSERT WITH CHECK (auth.email() = 'lbagade6@gmail.com');

CREATE POLICY "Admin can update collections" ON collections
  FOR UPDATE USING (auth.email() = 'lbagade6@gmail.com');

CREATE POLICY "Admin can delete collections" ON collections
  FOR DELETE USING (auth.email() = 'lbagade6@gmail.com');

-- Insert default collections (with existing data)
INSERT INTO collections (id, title, description, image_url, featured, sort_order) VALUES
  ('gold-jewelry', 'Gold Jewelry', 'Timeless elegance in pure gold. From delicate chains to statement necklaces.', '/assets/products/necklace.svg', true, 1),
  ('silver-jewelry', 'Silver Jewelry', 'Contemporary designs in sterling silver. Perfect for modern lifestyles.', '/assets/products/earrings.svg', true, 2),
  ('diamond-jewelry', 'Diamond Jewelry', 'Sparkling diamonds set in precious metals. Luxury redefined.', '/assets/products/ring.svg', true, 3),
  ('bridal-collection', 'Bridal Collection', 'Exquisite pieces for your special day. Traditional meets contemporary.', '/assets/products/necklace.jpg', true, 4),
  ('daily-wear', 'Daily Wear & Gifting', 'Subtle elegance for everyday. Perfect pieces for gifting too.', '/assets/products/pendant.svg', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Create storage bucket for collection images (run this separately if needed)
-- Go to Supabase Dashboard > Storage > Create a new bucket called 'collections'
-- Set it to PUBLIC so images can be viewed
-- Or run: INSERT INTO storage.buckets (id, name, public) VALUES ('collections', 'collections', true);

-- Success message
SELECT 'Collections table created successfully! Now create storage bucket "collections" in Supabase Storage.' AS message;
