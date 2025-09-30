-- ============================================================================
-- INVESTOR DASHBOARD - TABLES ONLY (NO RLS YET)
-- ============================================================================

-- 1. PROJECT_INVESTORS
CREATE TABLE IF NOT EXISTS public.project_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  investor_id UUID NOT NULL,
  commitment NUMERIC NOT NULL,
  currency TEXT DEFAULT 'AED',
  ownership_pct NUMERIC,
  status TEXT DEFAULT 'reserved',
  signed_agreement BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROJECT_COSTS
CREATE TABLE IF NOT EXISTS public.project_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  estimated_cost NUMERIC DEFAULT 0,
  actual_cost NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. MONTHLY_REPORTS
CREATE TABLE IF NOT EXISTS public.monthly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  period DATE NOT NULL,
  kpis JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  pdf_url TEXT,
  visibility TEXT DEFAULT 'investors',
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. INVESTMENT_PAYMENTS
CREATE TABLE IF NOT EXISTS public.investment_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  investor_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'AED',
  ledger_type TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  scheduled_date DATE,
  paid_date DATE,
  reference TEXT,
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. INVESTOR_PREFERENCES
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

-- 6. INVESTOR_MESSAGES
CREATE TABLE IF NOT EXISTS public.investor_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_type TEXT NOT NULL,
  thread_id UUID,
  sender UUID NOT NULL,
  body TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. CAP_TABLE_SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.cap_table_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  as_of DATE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Success message
SELECT 'Investor dashboard tables created successfully' as status;