-- Create opportunity sharing tables
CREATE TABLE public.opportunity_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  shared_by UUID NOT NULL REFERENCES profiles(user_id),
  shared_with_email TEXT NOT NULL,
  shared_with_name TEXT,
  share_message TEXT,
  share_method TEXT NOT NULL DEFAULT 'email', -- email, link, direct
  status TEXT NOT NULL DEFAULT 'sent', -- sent, opened, viewed, interested, declined
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create opportunity share analytics table
CREATE TABLE public.opportunity_share_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_id UUID NOT NULL REFERENCES opportunity_shares(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- opened, viewed, downloaded, reshared, contacted
  action_data JSONB DEFAULT '{}',
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create opportunity investor process tracking
CREATE TABLE public.opportunity_investor_process (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  investor_email TEXT NOT NULL,
  investor_name TEXT,
  current_stage TEXT NOT NULL DEFAULT 'shared', -- shared, invited, accepted, contacted, agreed, signed, invested
  stage_history JSONB DEFAULT '[]',
  notes TEXT,
  assigned_to UUID REFERENCES profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(opportunity_id, investor_email)
);

-- Enable RLS
ALTER TABLE public.opportunity_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_share_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_investor_process ENABLE ROW LEVEL SECURITY;

-- RLS Policies for opportunity_shares
CREATE POLICY "Admins and real estate directors can manage opportunity shares"
ON public.opportunity_shares
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role IN ('administrator', 'real_estate_director', 'real_estate_agent')
));

-- RLS Policies for opportunity_share_analytics
CREATE POLICY "Admins can view share analytics"
ON public.opportunity_share_analytics
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role IN ('administrator', 'real_estate_director')
));

CREATE POLICY "Allow analytics insertion"
ON public.opportunity_share_analytics
FOR INSERT
WITH CHECK (true); -- Allow insertions from tracking links

-- RLS Policies for opportunity_investor_process
CREATE POLICY "Admins can manage investor process"
ON public.opportunity_investor_process
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role IN ('administrator', 'real_estate_director', 'real_estate_agent')
));

-- Add updated_at triggers
CREATE TRIGGER update_opportunity_shares_updated_at
  BEFORE UPDATE ON public.opportunity_shares
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opportunity_investor_process_updated_at
  BEFORE UPDATE ON public.opportunity_investor_process
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_opportunity_shares_opportunity_id ON public.opportunity_shares(opportunity_id);
CREATE INDEX idx_opportunity_shares_shared_with_email ON public.opportunity_shares(shared_with_email);
CREATE INDEX idx_opportunity_share_analytics_share_id ON public.opportunity_share_analytics(share_id);
CREATE INDEX idx_opportunity_share_analytics_action_type ON public.opportunity_share_analytics(action_type);
CREATE INDEX idx_opportunity_investor_process_opportunity_id ON public.opportunity_investor_process(opportunity_id);
CREATE INDEX idx_opportunity_investor_process_stage ON public.opportunity_investor_process(current_stage);