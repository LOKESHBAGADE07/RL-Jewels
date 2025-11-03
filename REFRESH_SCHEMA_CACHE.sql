-- ========================================
-- REFRESH SUPABASE SCHEMA CACHE
-- Run this if you get "Could not find the 'active' column" error
-- ========================================

-- This forces Supabase to refresh its schema cache
-- by updating the table's metadata

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- Alternative: Update table comment to force schema refresh
COMMENT ON TABLE hero_banners IS 'Hero carousel banners for homepage - Updated schema';

-- Verify columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'hero_banners'
ORDER BY ordinal_position;

-- Success message
SELECT 'Schema cache refreshed! Please restart your dev server (Ctrl+C and npm run dev)' AS message;
