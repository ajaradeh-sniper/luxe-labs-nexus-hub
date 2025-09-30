-- Add preferences JSONB column to investor_settings table
ALTER TABLE public.investor_settings 
ADD COLUMN IF NOT EXISTS preferences JSONB;

-- Add completed_at column if it doesn't exist
ALTER TABLE public.investor_settings 
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;