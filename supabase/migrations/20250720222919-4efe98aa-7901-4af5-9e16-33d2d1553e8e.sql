-- Add performance indexes (only ones that don't exist)
CREATE INDEX IF NOT EXISTS idx_contacts_created_by ON public.contacts(created_by);
CREATE INDEX IF NOT EXISTS idx_contacts_contact_type ON public.contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_by ON public.opportunities(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_manager_id ON public.projects(manager_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_created_by ON public.calendar_events(created_by);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON public.calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_messages_sender_recipient ON public.messages(sender_id, recipient_id);
CREATE INDEX IF NOT EXISTS idx_financial_reports_period ON public.financial_reports(period_start, period_end);

-- Sample project costs with correct categories
INSERT INTO public.project_costs (project_id, category, description, estimated_cost, actual_cost, vendor, status, created_by) 
SELECT 
    (SELECT id FROM projects WHERE name = 'Downtown Luxury Tower' LIMIT 1), 
    'materials', 
    'Foundation and structural materials', 
    5000000, 
    4800000, 
    'Elite Construction Co.', 
    'completed', 
    (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM projects WHERE name = 'Downtown Luxury Tower')
AND NOT EXISTS (SELECT 1 FROM project_costs WHERE description = 'Foundation and structural materials');

INSERT INTO public.project_costs (project_id, category, description, estimated_cost, actual_cost, vendor, status, created_by) 
SELECT 
    (SELECT id FROM projects WHERE name = 'Downtown Luxury Tower' LIMIT 1), 
    'labor', 
    'Skilled construction workforce', 
    3000000, 
    0, 
    'Elite Construction Co.', 
    'planned', 
    (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM projects WHERE name = 'Downtown Luxury Tower')
AND NOT EXISTS (SELECT 1 FROM project_costs WHERE description = 'Skilled construction workforce');

-- Sample calendar events
INSERT INTO public.calendar_events (title, description, event_type, start_time, end_time, location, created_by) 
SELECT 'Client Presentation - Downtown Tower', 'Presenting project progress to major investors', 'meeting', '2024-08-25 14:00:00+00', '2024-08-25 16:00:00+00', 'Conference Room A', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM calendar_events WHERE title = 'Client Presentation - Downtown Tower');

INSERT INTO public.calendar_events (title, description, event_type, start_time, end_time, location, created_by) 
SELECT 'Site Inspection - Marina Bay', 'Monthly site inspection and progress review', 'inspection', '2024-08-22 09:00:00+00', '2024-08-22 12:00:00+00', 'Marina Bay Site', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM calendar_events WHERE title = 'Site Inspection - Marina Bay');

-- Sample marketing campaigns  
INSERT INTO public.marketing_campaigns (name, campaign_type, status, target_audience, budget, start_date, end_date, created_by) 
SELECT 'Luxury Living Campaign', 'digital', 'active', 'High-net-worth individuals aged 35-55', 150000, '2024-08-01', '2024-10-31', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM marketing_campaigns WHERE name = 'Luxury Living Campaign');

-- Sample financial reports
INSERT INTO public.financial_reports (title, report_type, period_start, period_end, status, data, created_by) 
SELECT 'Q2 2024 Property Sales Report', 'sales', '2024-04-01', '2024-06-30', 'published', '{"total_sales": 45000000, "units_sold": 25, "average_price": 1800000, "top_performing_property": "Downtown Luxury Tower"}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM financial_reports WHERE title = 'Q2 2024 Property Sales Report');

-- Sample contact interactions
INSERT INTO public.contact_interactions (contact_id, interaction_type, subject, description, scheduled_at, completed_at, created_by) 
SELECT 
    (SELECT id FROM contacts WHERE name = 'Ahmed Al-Rashid' LIMIT 1), 
    'call', 
    'Investment Opportunity Discussion', 
    'Discussed potential investment in Downtown Luxury Tower project', 
    '2024-08-20 14:00:00+00', 
    '2024-08-20 14:45:00+00', 
    (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM contacts WHERE name = 'Ahmed Al-Rashid')
AND NOT EXISTS (SELECT 1 FROM contact_interactions WHERE subject = 'Investment Opportunity Discussion');

-- Sample system analytics
INSERT INTO public.system_analytics (metric_name, metric_type, category, metric_value, metadata) 
SELECT 'active_projects', 'count', 'projects', 3, '{"status": "in_progress", "total_value": 35500000}'
WHERE NOT EXISTS (SELECT 1 FROM system_analytics WHERE metric_name = 'active_projects' AND category = 'projects');

INSERT INTO public.system_analytics (metric_name, metric_type, category, metric_value, metadata) 
SELECT 'monthly_revenue', 'currency', 'finance', 4250000, '{"month": "2024-08", "currency": "AED"}'
WHERE NOT EXISTS (SELECT 1 FROM system_analytics WHERE metric_name = 'monthly_revenue' AND category = 'finance');

-- Enable realtime for key tables
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER TABLE public.calendar_events REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- Add tables to realtime publication (safely handle existing)
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;