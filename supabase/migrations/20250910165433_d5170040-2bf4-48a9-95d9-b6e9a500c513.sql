-- Enhanced security for referrals table
-- Drop existing policies to replace with more secure ones
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Users can create referrals" ON public.referrals;
DROP POLICY IF EXISTS "Users can view their own referrals" ON public.referrals;

-- Create more granular and secure policies
-- 1. Strict referrer-only read access
CREATE POLICY "Referrers can view only their own referrals"
ON public.referrals
FOR SELECT
TO authenticated
USING (
  referrer_id = auth.uid()
);

-- 2. Strict referrer-only insert access with additional validation
CREATE POLICY "Users can create referrals for themselves only"
ON public.referrals
FOR INSERT
TO authenticated
WITH CHECK (
  referrer_id = auth.uid() 
  AND auth.uid() IS NOT NULL
);

-- 3. Referrers can update only their own referrals (status, notes)
CREATE POLICY "Referrers can update their own referrals"
ON public.referrals
FOR UPDATE
TO authenticated
USING (referrer_id = auth.uid())
WITH CHECK (referrer_id = auth.uid());

-- 4. Administrator access with enhanced security function
CREATE OR REPLACE FUNCTION public.is_verified_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid 
    AND role = 'administrator'
    AND user_uuid IS NOT NULL
  );
$$;

-- 5. Admin policies using the security function
CREATE POLICY "Verified administrators can manage all referrals"
ON public.referrals
FOR ALL
TO authenticated
USING (public.is_verified_admin());

-- 6. Add audit logging trigger for referral access
CREATE OR REPLACE FUNCTION public.audit_referral_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log referral data access for security monitoring
  IF TG_OP = 'SELECT' AND OLD.referrer_id != auth.uid() THEN
    PERFORM public.log_security_event(
      'referral_data_accessed',
      auth.uid(),
      jsonb_build_object(
        'referral_id', OLD.id,
        'accessed_referrer_id', OLD.referrer_id,
        'operation', TG_OP
      ),
      'info'
    );
  END IF;
  
  IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Note: Triggers on SELECT are not directly supported in PostgreSQL
-- Instead, we'll rely on the RLS policies and application-level logging

-- 7. Add index for performance on security-related queries
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_security 
ON public.referrals(referrer_id, created_at);

-- 8. Add data masking function for referral display (for future use)
CREATE OR REPLACE FUNCTION public.mask_referral_data(
  referral_data jsonb,
  user_role text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If user is admin, return full data
  IF user_role = 'administrator' THEN
    RETURN referral_data;
  END IF;
  
  -- For non-admins, mask sensitive information
  RETURN jsonb_build_object(
    'id', referral_data->>'id',
    'referral_type', referral_data->>'referral_type',
    'status', referral_data->>'status',
    'referred_name', 
      CASE 
        WHEN length(referral_data->>'referred_name') > 0 
        THEN substring(referral_data->>'referred_name' from 1 for 1) || '***'
        ELSE '***'
      END,
    'referred_email', 
      CASE 
        WHEN referral_data->>'referred_email' LIKE '%@%' 
        THEN substring(referral_data->>'referred_email' from 1 for 2) || '***@' || 
             split_part(referral_data->>'referred_email', '@', 2)
        ELSE '***@***.com'
      END,
    'created_at', referral_data->>'created_at',
    'reward_status', referral_data->>'reward_status'
  );
END;
$$;