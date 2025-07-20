-- Financial Reports Tables
CREATE TABLE public.financial_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL, -- 'portfolio', 'property', 'investment', 'roi'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'final', 'published'
  data JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Tables
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  contact_type TEXT NOT NULL, -- 'client', 'investor', 'vendor', 'partner'
  company TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'prospect'
  notes TEXT,
  tags JSONB DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.contact_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note'
  subject TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Calendar Tables
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL, -- 'meeting', 'viewing', 'deadline', 'inspection'
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  attendees JSONB DEFAULT '[]',
  property_id UUID REFERENCES public.properties(id),
  contact_id UUID REFERENCES public.contacts(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Marketing Tables
CREATE TABLE public.marketing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  campaign_type TEXT NOT NULL, -- 'email', 'social', 'listing', 'event'
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  target_audience TEXT,
  budget NUMERIC,
  start_date DATE,
  end_date DATE,
  metrics JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Messages Tables
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'direct', -- 'direct', 'group', 'announcement'
  sender_id UUID REFERENCES auth.users(id),
  recipient_id UUID REFERENCES auth.users(id),
  group_id UUID,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Notification Settings Tables
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  notification_types JSONB DEFAULT '{"projects": true, "properties": true, "messages": true, "calendar": true}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Financial Reports Policies
CREATE POLICY "Users can view financial reports based on role" ON public.financial_reports
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'finance_lead', 'project_manager', 'real_estate_director'])
));

CREATE POLICY "Finance users can insert financial reports" ON public.financial_reports
FOR INSERT WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'finance_lead'])
));

CREATE POLICY "Finance users can update financial reports" ON public.financial_reports
FOR UPDATE USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'finance_lead'])
));

-- CRM Policies
CREATE POLICY "Users can view contacts based on role" ON public.contacts
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent', 'project_manager'])
));

CREATE POLICY "Users can insert contacts" ON public.contacts
FOR INSERT WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

CREATE POLICY "Users can update contacts" ON public.contacts
FOR UPDATE USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

-- Contact Interactions Policies
CREATE POLICY "Users can view contact interactions" ON public.contact_interactions
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent', 'project_manager'])
));

CREATE POLICY "Users can insert contact interactions" ON public.contact_interactions
FOR INSERT WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

-- Calendar Policies
CREATE POLICY "Users can view calendar events" ON public.calendar_events
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent', 'project_manager', 'client', 'investor'])
));

CREATE POLICY "Users can insert calendar events" ON public.calendar_events
FOR INSERT WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent', 'project_manager'])
));

CREATE POLICY "Users can update calendar events" ON public.calendar_events
FOR UPDATE USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent', 'project_manager'])
));

-- Marketing Policies
CREATE POLICY "Users can view marketing campaigns" ON public.marketing_campaigns
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'real_estate_director', 'marketing_lead'])
));

CREATE POLICY "Marketing users can insert campaigns" ON public.marketing_campaigns
FOR INSERT WITH CHECK (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'marketing_lead'])
));

CREATE POLICY "Marketing users can update campaigns" ON public.marketing_campaigns
FOR UPDATE USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'marketing_lead'])
));

-- Messages Policies
CREATE POLICY "Users can view their messages" ON public.messages
FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their messages" ON public.messages
FOR UPDATE USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Notification Preferences Policies
CREATE POLICY "Users can view their notification preferences" ON public.notification_preferences
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their notification preferences" ON public.notification_preferences
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their notification preferences" ON public.notification_preferences
FOR UPDATE USING (user_id = auth.uid());

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('marketing', 'marketing', true);

-- Storage Policies
CREATE POLICY "Users can view their documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view reports" ON storage.objects
FOR SELECT USING (bucket_id = 'reports' AND EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'finance_lead', 'project_manager', 'real_estate_director'])
));

CREATE POLICY "Finance users can upload reports" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'reports' AND EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'finance_lead'])
));

CREATE POLICY "Marketing content is public" ON storage.objects
FOR SELECT USING (bucket_id = 'marketing');

CREATE POLICY "Marketing users can upload content" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'marketing' AND EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() 
  AND role = ANY(ARRAY['administrator', 'marketing_lead'])
));

-- Create triggers for updated_at
CREATE TRIGGER update_financial_reports_updated_at
BEFORE UPDATE ON public.financial_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
BEFORE UPDATE ON public.calendar_events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at
BEFORE UPDATE ON public.marketing_campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();