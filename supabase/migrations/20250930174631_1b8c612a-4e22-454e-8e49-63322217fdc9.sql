-- =============================================
-- STEP 1: MIGRATE EXISTING ROLES TO 3-ROLE SYSTEM
-- =============================================

-- First, let's see what roles we have and migrate them
UPDATE profiles 
SET role = CASE
  -- Map all admin-like roles to administrator
  WHEN role IN ('super_admin', 'ops', 'sys_admin', 'admin') THEN 'administrator'
  -- Map all agent/broker/PM roles to real_estate_agent  
  WHEN role IN ('agent', 'broker', 'pm', 'project_manager', 'real_estate_director', 'marketing_lead', 'finance_lead', 'partner') THEN 'real_estate_agent'
  -- Map client and everything else to investor
  WHEN role IN ('client', 'user') THEN 'investor'
  -- Default fallback to investor
  ELSE 'investor'
END
WHERE role NOT IN ('administrator', 'real_estate_agent', 'investor');

-- =============================================
-- STEP 2: NOW APPLY CONSTRAINTS AND CREATE SCHEMA
-- =============================================

-- Ensure profiles table has correct structure
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add constraint to lock down to 3 roles only (now safe)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_role_check'
  ) THEN
    ALTER TABLE profiles 
      ADD CONSTRAINT profiles_role_check 
      CHECK (role IN ('administrator', 'real_estate_agent', 'investor'));
  END IF;
END $$;

-- Create investors extension table
CREATE TABLE IF NOT EXISTS public.investors (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  kyc_status TEXT CHECK (kyc_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  preferred_communication TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "investors_read_policy" ON public.investors
  FOR SELECT USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role IN ('administrator','real_estate_agent'))
    OR id = auth.uid()
  );

CREATE POLICY "investors_admin_write" ON public.investors
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'administrator')
  );

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('buyer', 'seller', 'investor')) NOT NULL,
  source TEXT,
  contact JSONB,
  status TEXT CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost')) DEFAULT 'new',
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_admin_agent_access" ON public.leads
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role IN ('administrator','real_estate_agent'))
  );

-- Create project_updates table
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  visibility TEXT CHECK (visibility IN ('internal', 'investors', 'public')) DEFAULT 'investors',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "project_updates_admin_write" ON public.project_updates
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role IN ('administrator','real_estate_agent'))
  );

CREATE POLICY "project_updates_investors_read" ON public.project_updates
  FOR SELECT USING (
    visibility IN ('investors', 'public')
    OR EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role IN ('administrator','real_estate_agent'))
  );

-- Create payments table  
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id),
  project_id UUID REFERENCES projects(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'AED',
  type TEXT CHECK (type IN ('inflow', 'outflow')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'settled', 'failed', 'refunded')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payments_admin_full" ON public.payments
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'administrator')
  );

CREATE POLICY "payments_investor_own" ON public.payments
  FOR SELECT USING (
    investor_id = auth.uid()
  );

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('project', 'property', 'investor', 'opportunity')),
  entity_id UUID,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  visibility TEXT CHECK (visibility IN ('internal', 'investors', 'public')) DEFAULT 'internal',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents_admin_full" ON public.documents
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'administrator')
  );

CREATE POLICY "documents_owner_read" ON public.documents
  FOR SELECT USING (
    owner_id = auth.uid()
    OR visibility = 'public'
    OR (visibility = 'investors' AND EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'investor'))
  );

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT CHECK (type IN ('submission', 'payment', 'system', 'project', 'opportunity')) NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_own_read" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notifications_own_update" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "notifications_system_insert" ON public.notifications
  FOR INSERT WITH CHECK (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'administrator')
  );

-- Create audit_log table (append-only, tamper-proof)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  actor UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity TEXT,
  entity_id TEXT,
  diff JSONB DEFAULT '{}'::jsonb,
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_admin_read" ON public.audit_log
  FOR SELECT USING (
    EXISTS(SELECT 1 FROM profiles me WHERE me.id = auth.uid() AND me.role = 'administrator')
  );

CREATE POLICY "audit_system_insert" ON public.audit_log
  FOR INSERT WITH CHECK (true);

-- Revoke dangerous operations
REVOKE UPDATE, DELETE ON public.audit_log FROM PUBLIC;

-- Add missing columns to projects for inline editing
ALTER TABLE projects 
  ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'scoping',
  ADD COLUMN IF NOT EXISTS percent_complete INT DEFAULT 0;

-- Add constraints separately (can't be done with ADD COLUMN IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_stage_check') THEN
    ALTER TABLE projects ADD CONSTRAINT projects_stage_check 
      CHECK (stage IN ('scoping', 'design', 'execution', 'furnishing', 'handover', 'complete', 'blocked'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_percent_check') THEN
    ALTER TABLE projects ADD CONSTRAINT projects_percent_check 
      CHECK (percent_complete >= 0 AND percent_complete <= 100);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON public.audit_log(actor);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON public.audit_log(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, read_at);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_updates_project ON public.project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_payments_investor ON public.payments(investor_id);
CREATE INDEX IF NOT EXISTS idx_payments_project ON public.payments(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON public.documents(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_leads_owner ON public.leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_investors_updated_at ON public.investors;
CREATE TRIGGER update_investors_updated_at
  BEFORE UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();