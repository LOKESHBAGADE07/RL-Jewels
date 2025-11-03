-- ========================================
-- FIX: Add duration_seconds to existing hero_banners table
-- Run this AFTER the table already exists
-- ========================================

-- Add duration_seconds column to existing table
ALTER TABLE hero_banners 
ADD COLUMN IF NOT EXISTS duration_seconds INTEGER DEFAULT 5;

-- Add constraint to ensure valid duration range
ALTER TABLE hero_banners 
ADD CONSTRAINT check_duration_range CHECK (duration_seconds >= 1 AND duration_seconds <= 60);

-- Update existing banners to have default duration
UPDATE hero_banners 
SET duration_seconds = 5 
WHERE duration_seconds IS NULL;

-- Add comment
COMMENT ON COLUMN hero_banners.duration_seconds IS 'Display duration in seconds (1-60). How long this banner shows before auto-advancing.';

-- Verify the change
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'hero_banners' 
ORDER BY ordinal_position;

-- Success message
SELECT 'Duration column added successfully! All existing banners set to 5 seconds. ✅' AS status;
