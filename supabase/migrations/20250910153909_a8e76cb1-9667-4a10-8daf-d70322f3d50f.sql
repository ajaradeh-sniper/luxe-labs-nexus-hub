-- Add IP address tracking to user submissions
ALTER TABLE public.user_submissions 
ADD COLUMN IF NOT EXISTS ip_address INET;

-- Create security audit log table for tracking all security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  severity TEXT CHECK (severity IN ('info', 'warning', 'error', 'critical')) DEFAULT 'info',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only administrators can view security audit logs
CREATE POLICY "Admins can view security audit logs" 
ON security_audit_log 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role = 'administrator'
));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON security_audit_log 
FOR INSERT 
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_security_audit_log_event_type ON security_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_created_at ON security_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_severity ON security_audit_log(severity);

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_user_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT '{}',
  p_severity TEXT DEFAULT 'info'
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    ip_address,
    details,
    severity
  ) VALUES (
    p_event_type,
    p_user_id,
    inet_client_addr(),
    p_details,
    p_severity
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;