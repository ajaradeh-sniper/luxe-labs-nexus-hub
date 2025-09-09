-- Fix critical security vulnerabilities in analytics and submissions

-- 1. Restrict analytics insertion to authenticated users only
DROP POLICY IF EXISTS "Allow analytics insertion" ON opportunity_share_analytics;
CREATE POLICY "Authenticated users can insert share analytics" 
ON opportunity_share_analytics 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 2. Restrict activity log insertion to system/admin only
DROP POLICY IF EXISTS "Allow activity log insertion" ON user_activity_log;
CREATE POLICY "System can insert activity logs" 
ON user_activity_log 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role = 'administrator'
));

-- 3. Add rate limiting for user submissions (max 5 per hour per IP)
CREATE TABLE IF NOT EXISTS public.submission_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address INET NOT NULL,
  submission_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow insertion for rate limit tracking
CREATE POLICY "Allow rate limit tracking" 
ON submission_rate_limits 
FOR INSERT 
WITH CHECK (true);

-- Allow reading for rate limit checking
CREATE POLICY "Allow rate limit reading" 
ON submission_rate_limits 
FOR SELECT 
USING (true);

-- Update submissions policy to include rate limiting check
DROP POLICY IF EXISTS "Allow anonymous submissions" ON user_submissions;
CREATE POLICY "Rate-limited anonymous submissions" 
ON user_submissions 
FOR INSERT 
WITH CHECK (
  -- Check if IP has exceeded rate limit (5 submissions per hour)
  (SELECT COUNT(*) 
   FROM submission_rate_limits 
   WHERE ip_address = inet_client_addr() 
   AND window_start > now() - INTERVAL '1 hour') < 5
);

-- Create function to clean old rate limit entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.submission_rate_limits 
  WHERE window_start < now() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;