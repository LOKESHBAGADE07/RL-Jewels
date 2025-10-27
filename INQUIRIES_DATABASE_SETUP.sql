-- =============================================
-- CUSTOMER INQUIRIES TABLE SETUP FOR SUPABASE
-- =============================================
-- Copy and paste this into your Supabase SQL Editor
-- to create the inquiries table with proper security

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  inquiry_type TEXT DEFAULT 'form' CHECK (inquiry_type IN ('whatsapp', 'phone', 'form', 'other')),
  product_interest TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create inquiries (public form submissions)
CREATE POLICY "Anyone can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Admin can view and manage all inquiries
CREATE POLICY "Admin can view all inquiries" ON inquiries
  FOR SELECT USING (auth.email() = 'lbagade6@gmail.com');

CREATE POLICY "Admin can update inquiries" ON inquiries
  FOR UPDATE USING (auth.email() = 'lbagade6@gmail.com');

CREATE POLICY "Admin can delete inquiries" ON inquiries
  FOR DELETE USING (auth.email() = 'lbagade6@gmail.com');

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_type ON inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

-- Add sample inquiry (optional - remove after testing)
INSERT INTO inquiries (
  customer_name,
  phone_number,
  email,
  inquiry_type,
  product_interest,
  message,
  status
) VALUES (
  'Priya Sharma',
  '+91 98765 43210',
  'priya.sharma@example.com',
  'form',
  '22K Gold Necklace',
  'I am interested in the 22K Gold Necklace. Please share pricing and availability.',
  'new'
) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Customer inquiries table created successfully!' AS message;
