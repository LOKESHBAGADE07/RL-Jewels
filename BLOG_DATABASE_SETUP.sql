-- =============================================
-- BLOG POSTS TABLE SETUP FOR SUPABASE
-- =============================================
-- Copy and paste this into your Supabase SQL Editor
-- to create the blog_posts table with proper security

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT DEFAULT 'RL Jewels Team',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can view published blog posts only
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Admin can manage all blog posts
CREATE POLICY "Admin can manage blog posts" ON blog_posts
  FOR ALL USING (auth.email() = 'lbagade6@gmail.com');

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at DESC);

-- Add sample blog post (optional - remove after testing)
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  author_name,
  is_published,
  published_at
) VALUES (
  'How to Clean and Maintain Your Gold Jewelry',
  'how-to-clean-maintain-gold-jewelry',
  'Gold jewelry requires proper care to maintain its shine and beauty. Learn the best practices for cleaning and storing your precious gold ornaments.',
  E'# How to Clean and Maintain Your Gold Jewelry\n\nGold jewelry is a precious investment that requires proper care and maintenance. Here are essential tips to keep your gold ornaments shining bright:\n\n## Daily Care Tips\n\n1. **Remove jewelry before washing hands** - Soap can cause buildup and dull the shine\n2. **Avoid harsh chemicals** - Remove jewelry when using cleaning products or chlorine\n3. **Store properly** - Keep gold jewelry in a soft cloth pouch or separate compartments\n\n## Cleaning Your Gold Jewelry\n\n### What You Need:\n- Warm water\n- Mild dish soap\n- Soft toothbrush\n- Soft cloth\n\n### Steps:\n1. Mix warm water with a few drops of mild dish soap\n2. Soak jewelry for 15-20 minutes\n3. Gently scrub with a soft toothbrush\n4. Rinse thoroughly with clean water\n5. Pat dry with a soft, lint-free cloth\n\n## Professional Cleaning\n\nVisit RL Jewels for professional cleaning and inspection every 6 months. Our experts can:\n- Deep clean intricate designs\n- Check for loose stones\n- Polish and restore original shine\n- Inspect clasps and settings\n\n## Storage Tips\n\n- Store in a cool, dry place\n- Keep pieces separate to avoid scratching\n- Use anti-tarnish strips\n- Avoid direct sunlight\n\n## What to Avoid\n\n❌ Wearing during physical activities\n❌ Contact with perfumes and lotions\n❌ Ultrasonic cleaners for delicate pieces\n❌ Abrasive cleaning materials\n\n**Visit RL Jewels in Jalgaon for expert jewelry care advice and professional cleaning services!**',
  'Jewelry Care',
  ARRAY['gold', 'maintenance', 'cleaning', 'care tips'],
  'RL Jewels Team',
  true,
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- Success message
SELECT 'Blog posts table created successfully!' AS message;
