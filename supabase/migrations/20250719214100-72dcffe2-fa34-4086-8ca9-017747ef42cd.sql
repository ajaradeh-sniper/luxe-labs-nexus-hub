-- Create core business tables for real data integration

-- Properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial', 'mixed_use', 'villa', 'apartment', 'office')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending', 'off_market')),
  location TEXT NOT NULL,
  address TEXT,
  price DECIMAL(15,2) NOT NULL,
  area_sqft INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  features JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  project_type TEXT NOT NULL CHECK (project_type IN ('renovation', 'development', 'investment', 'flip')),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  actual_cost DECIMAL(15,2) DEFAULT 0,
  roi_percentage DECIMAL(5,2),
  manager_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project costs table
CREATE TABLE public.project_costs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('materials', 'labor', 'permits', 'equipment', 'utilities', 'other')),
  description TEXT NOT NULL,
  estimated_cost DECIMAL(15,2) NOT NULL,
  actual_cost DECIMAL(15,2) DEFAULT 0,
  vendor TEXT,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'approved', 'in_progress', 'completed', 'cancelled')),
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project risks table
CREATE TABLE public.project_risks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  category TEXT NOT NULL CHECK (category IN ('financial', 'technical', 'regulatory', 'market', 'operational')),
  probability DECIMAL(3,2) CHECK (probability >= 0 AND probability <= 1),
  impact_score INTEGER CHECK (impact_score >= 1 AND impact_score <= 10),
  mitigation_plan TEXT,
  status TEXT NOT NULL DEFAULT 'identified' CHECK (status IN ('identified', 'mitigated', 'resolved', 'occurred')),
  assigned_to UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Opportunities table
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  opportunity_type TEXT NOT NULL CHECK (opportunity_type IN ('acquisition', 'partnership', 'development', 'investment')),
  investment_required DECIMAL(15,2),
  expected_roi DECIMAL(5,2),
  risk_rating TEXT CHECK (risk_rating IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'evaluation' CHECK (status IN ('evaluation', 'approved', 'rejected', 'in_progress', 'completed')),
  deadline DATE,
  contact_info JSONB,
  documents JSONB DEFAULT '[]',
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- System analytics table
CREATE TABLE public.system_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('count', 'percentage', 'currency', 'duration')),
  category TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Properties policies
CREATE POLICY "Users can view properties based on role" ON public.properties
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'real_estate_director', 'real_estate_agent', 'investor', 'client')
  )
);

CREATE POLICY "Real estate users can insert properties" ON public.properties
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'real_estate_director', 'real_estate_agent')
  )
);

-- Projects policies
CREATE POLICY "Users can view projects based on role" ON public.projects
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'project_manager', 'real_estate_director', 'investor', 'client')
  )
);

CREATE POLICY "Project managers can insert projects" ON public.projects
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'project_manager', 'real_estate_director')
  )
);

-- Project costs policies  
CREATE POLICY "Users can view project costs" ON public.project_costs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'project_manager', 'finance_lead')
  )
);

-- Project risks policies
CREATE POLICY "Users can view project risks" ON public.project_risks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'project_manager', 'real_estate_director')
  )
);

-- Opportunities policies
CREATE POLICY "Users can view opportunities" ON public.opportunities
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('administrator', 'real_estate_director', 'real_estate_agent', 'investor')
  )
);

-- System analytics policies (admin only)
CREATE POLICY "Only admins can view system analytics" ON public.system_analytics
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'administrator'
  )
);

-- Add update triggers for all tables
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_costs_updated_at
BEFORE UPDATE ON public.project_costs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_risks_updated_at
BEFORE UPDATE ON public.project_risks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();