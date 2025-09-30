-- Align opportunities table with app schema
ALTER TABLE public.opportunities
  ALTER COLUMN property_address DROP NOT NULL,
  ALTER COLUMN property_type DROP NOT NULL;

-- Replace JSONB location with text location expected by app
ALTER TABLE public.opportunities DROP COLUMN IF EXISTS location;
ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS location TEXT;

-- Add missing fields used across the app
ALTER TABLE public.opportunities
  ADD COLUMN IF NOT EXISTS opportunity_type TEXT,
  ADD COLUMN IF NOT EXISTS investment_required NUMERIC,
  ADD COLUMN IF NOT EXISTS expected_roi NUMERIC,
  ADD COLUMN IF NOT EXISTS deadline DATE,
  ADD COLUMN IF NOT EXISTS risk_rating TEXT,
  ADD COLUMN IF NOT EXISTS contact_info JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS created_by UUID;

-- Expand allowed statuses to include values used by the app
ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_status_check;
ALTER TABLE public.opportunities ADD CONSTRAINT opportunities_status_check
  CHECK (status IN ('pending','under_review','approved','rejected','converted_to_project','evaluation','in_progress','completed'));

-- Ensure documents column is JSONB array
ALTER TABLE public.opportunities ALTER COLUMN documents TYPE JSONB USING documents::jsonb;