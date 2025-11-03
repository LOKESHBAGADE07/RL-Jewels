-- ========================================
-- ADD DURATION FIELD TO HERO BANNERS
-- Run this to add custom display duration for each banner
-- ========================================

-- Add duration_seconds column (default 5 seconds)
ALTER TABLE hero_banners 
ADD COLUMN IF NOT EXISTS duration_seconds INTEGER DEFAULT 5 CHECK (duration_seconds >= 1 AND duration_seconds <= 60);

-- Update existing banners to have default duration
UPDATE hero_banners 
SET duration_seconds = 5 
WHERE duration_seconds IS NULL;

-- Add comment
COMMENT ON COLUMN hero_banners.duration_seconds IS 'How long to display this banner (in seconds) before auto-advancing to next. Range: 1-60 seconds.';

-- Verify the change
SELECT id, title, duration_seconds 
FROM hero_banners 
ORDER BY display_order;

-- Success message
SELECT 'Duration field added successfully! Default is 5 seconds per banner. ✅' AS status;
