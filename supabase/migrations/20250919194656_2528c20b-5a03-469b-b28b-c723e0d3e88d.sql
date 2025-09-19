-- Create investor preferences table for questionnaire responses
CREATE TABLE IF NOT EXISTS public.investor_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  preferences JSONB NOT NULL DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investor_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for investor preferences
CREATE POLICY "Users can view their own preferences" 
ON public.investor_preferences 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own preferences" 
ON public.investor_preferences 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own preferences" 
ON public.investor_preferences 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all preferences" 
ON public.investor_preferences 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'administrator'
));

-- Add trigger for updated_at
CREATE TRIGGER update_investor_preferences_updated_at
BEFORE UPDATE ON public.investor_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();