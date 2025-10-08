-- Enable RLS on tables that have policies but RLS is disabled
-- This fixes the security vulnerability where policies exist but aren't being enforced

-- Enable RLS on project_investors table
ALTER TABLE public.project_investors ENABLE ROW LEVEL SECURITY;

-- Enable RLS on cap_table_snapshots table
ALTER TABLE public.cap_table_snapshots ENABLE ROW LEVEL SECURITY;

-- Enable RLS on monthly_reports table
ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;

-- Enable RLS on investment_payments table
ALTER TABLE public.investment_payments ENABLE ROW LEVEL SECURITY;

-- Enable RLS on investor_messages table
ALTER TABLE public.investor_messages ENABLE ROW LEVEL SECURITY;