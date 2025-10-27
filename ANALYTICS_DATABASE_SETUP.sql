-- =============================================
-- ANALYTICS TRACKING TABLES SETUP FOR SUPABASE
-- =============================================
-- Copy and paste this into your Supabase SQL Editor
-- to create analytics tables with proper security

-- Create product_views table
CREATE TABLE IF NOT EXISTS product_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  session_id TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create search_queries table
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to track views (public tracking)
CREATE POLICY "Anyone can track product views" ON product_views
  FOR INSERT WITH CHECK (true);

-- Allow anyone to track searches (public tracking)
CREATE POLICY "Anyone can track searches" ON search_queries
  FOR INSERT WITH CHECK (true);

-- Admin can view all analytics
CREATE POLICY "Admin can view product views" ON product_views
  FOR SELECT USING (auth.email() = 'lbagade6@gmail.com');

CREATE POLICY "Admin can view search queries" ON search_queries
  FOR SELECT USING (auth.email() = 'lbagade6@gmail.com');

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON product_views(product_id, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_views_viewed_at ON product_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_queries_searched_at ON search_queries(searched_at DESC);

-- Add sample data (optional - remove after testing)
INSERT INTO product_views (product_id, product_name, session_id, viewed_at) VALUES
  ('sample-1', '22K Gold Necklace', 'session_sample_1', NOW() - INTERVAL '2 days'),
  ('sample-1', '22K Gold Necklace', 'session_sample_2', NOW() - INTERVAL '1 day'),
  ('sample-2', 'Diamond Ring', 'session_sample_3', NOW() - INTERVAL '1 day'),
  ('sample-3', 'Silver Bracelet', 'session_sample_4', NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;

INSERT INTO search_queries (query, results_count, searched_at) VALUES
  ('gold necklace', 15, NOW() - INTERVAL '1 day'),
  ('diamond ring', 8, NOW() - INTERVAL '2 hours'),
  ('bridal jewelry', 20, NOW() - INTERVAL '5 hours')
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Analytics tracking tables created successfully!' AS message;
