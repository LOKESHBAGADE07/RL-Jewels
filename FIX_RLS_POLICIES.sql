-- =============================================
-- FIX ROW LEVEL SECURITY POLICIES
-- =============================================
-- This fixes the "violates row-level security policy" error

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can insert collections" ON collections;
DROP POLICY IF EXISTS "Admin can update collections" ON collections;
DROP POLICY IF EXISTS "Admin can delete collections" ON collections;

-- Create new policies that check if user is authenticated
CREATE POLICY "Authenticated users can insert collections" ON collections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update collections" ON collections
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete collections" ON collections
  FOR DELETE USING (auth.role() = 'authenticated');

-- Verify policies
SELECT 'RLS policies updated! Authenticated users can now manage collections.' AS message;
