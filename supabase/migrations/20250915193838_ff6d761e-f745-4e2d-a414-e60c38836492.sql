-- Create investor questionnaire responses table
CREATE TABLE public.investor_questionnaires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  investment_appetite NUMERIC,
  investment_range_min NUMERIC,
  investment_range_max NUMERIC,
  interested_in_luxury_flips BOOLEAN DEFAULT false,
  interested_in_luxury_funds BOOLEAN DEFAULT false,
  investment_timeline TEXT,
  risk_tolerance TEXT,
  preferred_locations TEXT[],
  investment_objectives TEXT,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investor_questionnaires ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage all questionnaires" 
ON public.investor_questionnaires 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() 
  AND role IN ('administrator', 'real_estate_director')
));

CREATE POLICY "Anonymous users can insert questionnaires" 
ON public.investor_questionnaires 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_investor_questionnaires_updated_at
BEFORE UPDATE ON public.investor_questionnaires
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();