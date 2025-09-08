-- Create user submissions table for sign-up and contact form submissions
CREATE TABLE public.user_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_type TEXT NOT NULL CHECK (submission_type IN ('signup', 'contact', 'referral')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    requested_role TEXT DEFAULT 'client',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    submission_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for user submissions
CREATE POLICY "Admins can manage all submissions" 
ON public.user_submissions 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'administrator'
));

-- Allow anonymous submissions (for signup/contact forms)
CREATE POLICY "Allow anonymous submissions" 
ON public.user_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create user permissions table for granular access control
CREATE TABLE public.user_permissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resource TEXT NOT NULL,
    permissions TEXT[] NOT NULL DEFAULT '{}',
    granted_by UUID REFERENCES auth.users(id),
    granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, resource)
);

-- Enable RLS
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies for user permissions
CREATE POLICY "Admins can manage all permissions" 
ON public.user_permissions 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'administrator'
));

CREATE POLICY "Users can view their own permissions" 
ON public.user_permissions 
FOR SELECT 
USING (user_id = auth.uid());

-- Create user activity log table
CREATE TABLE public.user_activity_log (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    resource TEXT,
    resource_id UUID,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for activity log
CREATE POLICY "Admins can view all activity logs" 
ON public.user_activity_log 
FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'administrator'
));

CREATE POLICY "Users can view their own activity" 
ON public.user_activity_log 
FOR SELECT 
USING (user_id = auth.uid());

-- Allow system to insert activity logs
CREATE POLICY "Allow activity log insertion" 
ON public.user_activity_log 
FOR INSERT 
WITH CHECK (true);

-- Create referrals table
CREATE TABLE public.referrals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    referrer_id UUID NOT NULL REFERENCES auth.users(id),
    referred_name TEXT NOT NULL,
    referred_email TEXT NOT NULL,
    referred_phone TEXT,
    referral_type TEXT NOT NULL CHECK (referral_type IN ('investor', 'client', 'partner')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'declined')),
    reward_amount NUMERIC DEFAULT 0,
    reward_status TEXT NOT NULL DEFAULT 'pending' CHECK (reward_status IN ('pending', 'approved', 'paid')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Admins can manage all referrals" 
ON public.referrals 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'administrator'
));

CREATE POLICY "Users can view their own referrals" 
ON public.referrals 
FOR SELECT 
USING (referrer_id = auth.uid());

CREATE POLICY "Users can create referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (referrer_id = auth.uid());

-- Create triggers for updated_at
CREATE TRIGGER update_user_submissions_updated_at
    BEFORE UPDATE ON public.user_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_permissions_updated_at
    BEFORE UPDATE ON public.user_permissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at
    BEFORE UPDATE ON public.referrals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION public.check_user_permission(
    user_uuid UUID,
    resource_name TEXT,
    permission_type TEXT
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM user_permissions up
        WHERE up.user_id = user_uuid
        AND up.resource = resource_name
        AND permission_type = ANY(up.permissions)
        AND up.is_active = true
        AND (up.expires_at IS NULL OR up.expires_at > now())
    );
$$;