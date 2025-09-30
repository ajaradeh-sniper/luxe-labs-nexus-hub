-- Rename conflicting table and create new one
ALTER TABLE IF EXISTS public.investor_preferences RENAME TO investor_assessment;

-- Create new investor_preferences with correct structure
CREATE TABLE IF NOT EXISTS public.investor_preferences (
  investor_id UUID PRIMARY KEY,
  min_investment NUMERIC,
  locations TEXT[],
  asset_types TEXT[],
  risk_profile TEXT,
  notifications JSONB DEFAULT '{}'::jsonb,
  email_digest TEXT DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.investor_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY investor_preferences_manage ON public.investor_preferences
FOR ALL USING (investor_preferences.investor_id = auth.uid() OR is_admin());

SELECT 'investor_preferences fixed' as status;