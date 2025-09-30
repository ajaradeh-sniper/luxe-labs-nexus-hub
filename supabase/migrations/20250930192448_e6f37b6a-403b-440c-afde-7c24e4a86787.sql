-- ============================================================================
-- FIX: Rename investor_preferences to investor_settings to avoid conflict
-- ============================================================================

-- 1. Drop the new investor_preferences table we just created
DROP TABLE IF EXISTS public.investor_preferences CASCADE;

-- 2. Create investor_settings with the structure we need
CREATE TABLE public.investor_settings (
  user_id UUID PRIMARY KEY,
  min_investment NUMERIC,
  locations TEXT[],
  asset_types TEXT[],
  risk_profile TEXT,
  notifications JSONB DEFAULT '{}'::jsonb,
  email_digest TEXT DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.investor_settings ENABLE ROW LEVEL SECURITY;

-- 3. Add RLS policies for investor_settings
CREATE POLICY investor_settings_manage ON public.investor_settings
FOR ALL USING (investor_settings.user_id = auth.uid() OR is_admin());

-- 4. Add RLS policies for other tables (with correct table qualifiers)
-- project_investors
CREATE POLICY project_investors_select ON public.project_investors
FOR SELECT USING (project_investors.investor_id = auth.uid() OR is_admin());

CREATE POLICY project_investors_admin ON public.project_investors
FOR ALL USING (is_admin());

-- project_costs
CREATE POLICY project_costs_select ON public.project_costs
FOR SELECT USING (
  EXISTS(SELECT 1 FROM project_investors pi WHERE pi.project_id = project_costs.project_id AND pi.investor_id = auth.uid())
  OR is_admin()
);

CREATE POLICY project_costs_admin ON public.project_costs
FOR ALL USING (is_admin());

-- monthly_reports
CREATE POLICY monthly_reports_select ON public.monthly_reports
FOR SELECT USING (
  monthly_reports.visibility = 'public'
  OR EXISTS(SELECT 1 FROM project_investors pi WHERE pi.project_id = monthly_reports.project_id AND pi.investor_id = auth.uid())
  OR is_admin()
);

CREATE POLICY monthly_reports_admin ON public.monthly_reports
FOR ALL USING (is_admin());

-- investment_payments
CREATE POLICY investment_payments_select ON public.investment_payments
FOR SELECT USING (investment_payments.investor_id = auth.uid() OR is_admin());

CREATE POLICY investment_payments_admin ON public.investment_payments
FOR ALL USING (is_admin());

-- investor_messages
CREATE POLICY investor_messages_select ON public.investor_messages
FOR SELECT USING (
  investor_messages.sender = auth.uid()
  OR (investor_messages.thread_type = 'project' AND EXISTS(
    SELECT 1 FROM project_investors pi 
    WHERE pi.project_id = investor_messages.thread_id AND pi.investor_id = auth.uid()
  ))
  OR is_admin()
);

CREATE POLICY investor_messages_insert ON public.investor_messages
FOR INSERT WITH CHECK (investor_messages.sender = auth.uid());

CREATE POLICY investor_messages_admin ON public.investor_messages
FOR ALL USING (is_admin());

-- cap_table_snapshots
CREATE POLICY cap_table_select ON public.cap_table_snapshots
FOR SELECT USING (
  EXISTS(SELECT 1 FROM project_investors pi WHERE pi.project_id = cap_table_snapshots.project_id AND pi.investor_id = auth.uid())
  OR is_admin()
);

CREATE POLICY cap_table_admin ON public.cap_table_snapshots
FOR ALL USING (is_admin());

-- 5. Add trigger for investor_settings
CREATE TRIGGER update_investor_settings_updated_at BEFORE UPDATE ON public.investor_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Success
SELECT 'Investor dashboard database complete!' as status;