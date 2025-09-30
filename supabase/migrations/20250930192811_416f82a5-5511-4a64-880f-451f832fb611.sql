-- Ensure investor_settings has all required columns
-- This is idempotent and will not fail if columns already exist

DO $$ 
BEGIN
  -- Add preferences column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'investor_settings' AND column_name = 'preferences'
  ) THEN
    ALTER TABLE public.investor_settings ADD COLUMN preferences JSONB;
  END IF;

  -- Add completed_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'investor_settings' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE public.investor_settings ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Ensure the old investor_preferences table is completely removed
  DROP TABLE IF EXISTS public.investor_preferences CASCADE;
  
END $$;

-- Verify the table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'investor_settings' 
ORDER BY ordinal_position;