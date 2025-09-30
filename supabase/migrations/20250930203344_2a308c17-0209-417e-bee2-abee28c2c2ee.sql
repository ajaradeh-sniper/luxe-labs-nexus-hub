-- Drop existing tables if they exist (cascade to remove dependencies)
DROP TABLE IF EXISTS public.opportunity_analytics CASCADE;
DROP TABLE IF EXISTS public.opportunity_interests CASCADE;
DROP TABLE IF EXISTS public.opportunities CASCADE;

-- Create opportunities table
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_address TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'villa', 'townhouse', 'commercial', 'land')),
  current_value NUMERIC NOT NULL DEFAULT 0,
  estimated_renovation_cost NUMERIC NOT NULL DEFAULT 0,
  estimated_after_value NUMERIC NOT NULL DEFAULT 0,
  potential_roi NUMERIC NOT NULL DEFAULT 0,
  sourced_by UUID REFERENCES auth.users(id),
  sourced_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'converted_to_project')),
  location JSONB DEFAULT '{}',
  property_details JSONB DEFAULT '{}',
  financial_details JSONB DEFAULT '{}',
  timeline JSONB DEFAULT '{}',
  documents JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunity_interests table
CREATE TABLE public.opportunity_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES auth.users(id),
  investment_amount NUMERIC,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'qualified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunity_analytics table
CREATE TABLE public.opportunity_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL CHECK (action_type IN ('view', 'express_interest', 'share', 'download')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for opportunities
CREATE POLICY "Admins and agents can manage all opportunities"
  ON public.opportunities
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('administrator', 'real_estate_director', 'real_estate_agent')
    )
  );

CREATE POLICY "Investors can view approved opportunities"
  ON public.opportunities
  FOR SELECT
  USING (
    status = 'approved' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'investor'
    )
  );

-- RLS Policies for opportunity_interests
CREATE POLICY "Admins can manage all interests"
  ON public.opportunity_interests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('administrator', 'real_estate_director', 'real_estate_agent')
    )
  );

CREATE POLICY "Investors can create their own interests"
  ON public.opportunity_interests
  FOR INSERT
  WITH CHECK (investor_id = auth.uid());

CREATE POLICY "Investors can view their own interests"
  ON public.opportunity_interests
  FOR SELECT
  USING (investor_id = auth.uid());

-- RLS Policies for opportunity_analytics
CREATE POLICY "Anyone can insert analytics"
  ON public.opportunity_analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all analytics"
  ON public.opportunity_analytics
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('administrator', 'real_estate_director', 'real_estate_agent')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_opportunities_status ON public.opportunities(status);
CREATE INDEX idx_opportunities_sourced_by ON public.opportunities(sourced_by);
CREATE INDEX idx_opportunity_interests_opportunity_id ON public.opportunity_interests(opportunity_id);
CREATE INDEX idx_opportunity_interests_investor_id ON public.opportunity_interests(investor_id);
CREATE INDEX idx_opportunity_analytics_opportunity_id ON public.opportunity_analytics(opportunity_id);
CREATE INDEX idx_opportunity_analytics_action_type ON public.opportunity_analytics(action_type);