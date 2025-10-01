-- =========================
-- 20251001_luxury_labs_v1_2_clean.sql
-- Funds, EOI, Allocations, E-sign, Portfolio Views, RLS
-- =========================

-- First, add user_id link to investors table if not exists
ALTER TABLE public.investors
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Helper: get_current_investor_id() maps auth.uid() → investors.id
CREATE OR REPLACE FUNCTION public.get_current_investor_id()
RETURNS uuid
LANGUAGE sql STABLE AS
$$
  SELECT inv.id
  FROM public.investors inv
  WHERE inv.user_id = auth.uid()
  LIMIT 1;
$$;

-- ===== Projects enrichment (funds) =====
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS kind text CHECK (kind IN ('flip','fund')) DEFAULT 'flip',
  ADD COLUMN IF NOT EXISTS spv_name text,
  ADD COLUMN IF NOT EXISTS legal_entity_id text,
  ADD COLUMN IF NOT EXISTS units_total numeric,
  ADD COLUMN IF NOT EXISTS expected_exit_value numeric;

-- ===== Cap table =====
CREATE TABLE IF NOT EXISTS public.cap_table_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  investor_id uuid REFERENCES public.investors(id) ON DELETE CASCADE NOT NULL,
  class text DEFAULT 'Class A',
  units numeric NOT NULL DEFAULT 0,
  pct numeric,
  committed_amount numeric NOT NULL,
  funded_amount numeric NOT NULL DEFAULT 0,
  carry_pct numeric DEFAULT 0,
  pref_return numeric,
  created_at timestamptz DEFAULT now()
);

-- ===== EOI / Allocations =====
CREATE TABLE IF NOT EXISTS public.expressions_of_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  investor_id uuid REFERENCES public.investors(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  note text,
  status text CHECK (status IN ('new','reviewed','approved','rejected','converted')) NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  investor_id uuid REFERENCES public.investors(id) ON DELETE CASCADE NOT NULL,
  allocated_amount numeric NOT NULL,
  units numeric,
  unit_price numeric,
  status text CHECK (status IN ('pending_docs','docs_sent','signed','funded','cancelled')) NOT NULL DEFAULT 'pending_docs',
  created_at timestamptz DEFAULT now()
);

-- ===== E-sign =====
CREATE TABLE IF NOT EXISTS public.signature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  allocation_id uuid REFERENCES public.allocations(id) ON DELETE CASCADE NOT NULL,
  vendor text CHECK (vendor IN ('docusign','dropbox_sign','adobe')) NOT NULL,
  vendor_envelope_id text,
  doc_type text,
  signer_name text,
  signer_email text,
  status text CHECK (status IN ('created','sent','viewed','signed','declined','voided','completed')) NOT NULL DEFAULT 'created',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ===== Transactions (if not exists) =====
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  investor_id uuid REFERENCES public.investors(id) ON DELETE CASCADE NOT NULL,
  kind text CHECK (kind IN ('capital_in','distribution','fee','expense')) NOT NULL,
  amount numeric NOT NULL,
  tx_date date NOT NULL,
  memo text,
  created_at timestamptz DEFAULT now()
);

-- ===== Portfolio Views =====
CREATE OR REPLACE VIEW public.v_portfolio_positions AS
SELECT
  t.investor_id,
  p.id AS project_id,
  p.name,
  p.project_type AS kind,
  SUM(CASE WHEN t.kind='capital_in' THEN t.amount ELSE 0 END) AS capital_in,
  SUM(CASE WHEN t.kind='distribution' THEN t.amount ELSE 0 END) AS distributions,
  MAX(p.expected_exit_value) AS expected_exit_value
FROM public.transactions t
JOIN public.projects p ON p.id = t.project_id
GROUP BY t.investor_id, p.id, p.name, p.project_type;

-- ===== RLS enable =====
ALTER TABLE public.expressions_of_interest ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cap_table_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ===== RLS policies =====
-- EOI: insert/read only for current investor, admins full
DROP POLICY IF EXISTS eoi_insert_self ON public.expressions_of_interest;
CREATE POLICY eoi_insert_self ON public.expressions_of_interest
FOR INSERT WITH CHECK (
  investor_id = get_current_investor_id() OR is_admin()
);

DROP POLICY IF EXISTS eoi_read_self ON public.expressions_of_interest;
CREATE POLICY eoi_read_self ON public.expressions_of_interest
FOR SELECT USING (
  investor_id = get_current_investor_id() OR is_admin()
);

DROP POLICY IF EXISTS eoi_admin_all ON public.expressions_of_interest;
CREATE POLICY eoi_admin_all ON public.expressions_of_interest
FOR ALL USING (is_admin());

-- Allocations: readable by investor allocated or admins
DROP POLICY IF EXISTS allocations_read_self ON public.allocations;
CREATE POLICY allocations_read_self ON public.allocations
FOR SELECT USING (
  investor_id = get_current_investor_id() OR is_admin()
);

DROP POLICY IF EXISTS allocations_admin_all ON public.allocations;
CREATE POLICY allocations_admin_all ON public.allocations
FOR ALL USING (is_admin());

-- Cap table: readable by investor on that row or admins
DROP POLICY IF EXISTS cap_table_read_self ON public.cap_table_entries;
CREATE POLICY cap_table_read_self ON public.cap_table_entries
FOR SELECT USING (
  investor_id = get_current_investor_id() OR is_admin()
);

DROP POLICY IF EXISTS cap_table_admin_all ON public.cap_table_entries;
CREATE POLICY cap_table_admin_all ON public.cap_table_entries
FOR ALL USING (is_admin());

-- Transactions: readable by investor or admin
DROP POLICY IF EXISTS transactions_read_self ON public.transactions;
CREATE POLICY transactions_read_self ON public.transactions
FOR SELECT USING (
  investor_id = get_current_investor_id() OR is_admin()
);

DROP POLICY IF EXISTS transactions_admin_all ON public.transactions;
CREATE POLICY transactions_admin_all ON public.transactions
FOR ALL USING (is_admin());

-- Signatures: admin-only
DROP POLICY IF EXISTS signatures_read_admin ON public.signature_requests;
CREATE POLICY signatures_read_admin ON public.signature_requests
FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS signatures_write_admin ON public.signature_requests;
CREATE POLICY signatures_write_admin ON public.signature_requests
FOR ALL USING (is_admin())
WITH CHECK (is_admin());