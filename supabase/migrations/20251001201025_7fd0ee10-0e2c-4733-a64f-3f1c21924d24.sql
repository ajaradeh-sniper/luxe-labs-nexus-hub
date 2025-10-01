-- Fix security issues from previous migration

-- 1. Fix function search_path
CREATE OR REPLACE FUNCTION public.get_current_investor_id()
RETURNS uuid
LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = public
AS
$$
  SELECT inv.id
  FROM public.investors inv
  WHERE inv.user_id = auth.uid()
  LIMIT 1;
$$;

-- 2. Recreate portfolio view without SECURITY DEFINER (use SECURITY INVOKER instead)
DROP VIEW IF EXISTS public.v_portfolio_positions;
CREATE VIEW public.v_portfolio_positions
WITH (security_invoker = true) AS
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