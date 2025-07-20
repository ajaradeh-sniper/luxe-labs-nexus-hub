-- Add missing update triggers (skip existing ones)
CREATE TRIGGER update_financial_reports_updated_at
    BEFORE UPDATE ON public.financial_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at
    BEFORE UPDATE ON public.marketing_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
    BEFORE UPDATE ON public.notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
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

-- Add performance indexes
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

-- Add comprehensive sample data

-- Sample projects (if not already existing)
INSERT INTO public.projects (name, description, project_type, status, budget, start_date, end_date, created_by) 
SELECT * FROM (VALUES
('Downtown Luxury Tower', 'Premium residential development in the heart of downtown', 'development', 'active', 15000000, '2024-01-15', '2025-12-31', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Marina Bay Renovation', 'Complete renovation of existing commercial complex', 'renovation', 'planning', 8500000, '2024-03-01', '2024-11-30', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Green Valley Villas', 'Sustainable housing development project', 'development', 'active', 12000000, '2024-02-01', '2025-08-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1))
) AS v(name, description, project_type, status, budget, start_date, end_date, created_by)
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE projects.name = v.name);

-- Sample calendar events
INSERT INTO public.calendar_events (title, description, event_type, start_time, end_time, location, created_by) 
SELECT * FROM (VALUES
('Client Presentation - Downtown Tower', 'Presenting project progress to major investors', 'meeting', '2024-08-25 14:00:00+00', '2024-08-25 16:00:00+00', 'Conference Room A', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Site Inspection - Marina Bay', 'Monthly site inspection and progress review', 'inspection', '2024-08-22 09:00:00+00', '2024-08-22 12:00:00+00', 'Marina Bay Site', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Investor Meeting', 'Quarterly investor briefing and financial review', 'meeting', '2024-08-30 10:00:00+00', '2024-08-30 11:30:00+00', 'Executive Boardroom', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1))
) AS v(title, description, event_type, start_time, end_time, location, created_by)
WHERE NOT EXISTS (SELECT 1 FROM calendar_events WHERE calendar_events.title = v.title);

-- Sample marketing campaigns
INSERT INTO public.marketing_campaigns (name, campaign_type, status, target_audience, budget, start_date, end_date, created_by) 
SELECT * FROM (VALUES
('Luxury Living Campaign', 'digital', 'active', 'High-net-worth individuals aged 35-55', 150000, '2024-08-01', '2024-10-31', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Investment Opportunities Showcase', 'event', 'planning', 'Real estate investors and financial advisors', 75000, '2024-09-15', '2024-09-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Sustainable Development Series', 'content', 'active', 'Environmentally conscious buyers', 50000, '2024-08-15', '2024-12-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1))
) AS v(name, campaign_type, status, target_audience, budget, start_date, end_date, created_by)
WHERE NOT EXISTS (SELECT 1 FROM marketing_campaigns WHERE marketing_campaigns.name = v.name);

-- Sample financial reports
INSERT INTO public.financial_reports (title, report_type, period_start, period_end, status, data, created_by) 
SELECT * FROM (VALUES
('Q2 2024 Property Sales Report', 'sales', '2024-04-01', '2024-06-30', 'published', '{"total_sales": 45000000, "units_sold": 25, "average_price": 1800000, "top_performing_property": "Downtown Luxury Tower"}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Monthly Investment Analysis - July 2024', 'investment', '2024-07-01', '2024-07-31', 'published', '{"total_investments": 8500000, "roi_percentage": 12.5, "active_projects": 3, "projected_returns": 10625000}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Annual Financial Forecast 2024', 'forecast', '2024-01-01', '2024-12-31', 'draft', '{"projected_revenue": 75000000, "estimated_costs": 52000000, "expected_profit": 23000000, "growth_rate": 15}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1))
) AS v(title, report_type, period_start, period_end, status, data, created_by)
WHERE NOT EXISTS (SELECT 1 FROM financial_reports WHERE financial_reports.title = v.title);

-- Sample system analytics
INSERT INTO public.system_analytics (metric_name, metric_type, category, metric_value, metadata) 
SELECT * FROM (VALUES
('active_projects', 'count', 'projects', 3, '{"status": "active", "total_value": 35500000}'),
('monthly_revenue', 'currency', 'finance', 4250000, '{"month": "2024-08", "currency": "AED"}'),
('user_logins', 'count', 'users', 156, '{"period": "last_30_days", "unique_users": 45}'),
('property_views', 'count', 'properties', 892, '{"period": "last_week", "top_property": "Downtown Luxury Tower"}'),
('conversion_rate', 'percentage', 'sales', 12.5, '{"period": "Q2_2024", "leads_converted": 25, "total_leads": 200}')
) AS v(metric_name, metric_type, category, metric_value, metadata)
WHERE NOT EXISTS (SELECT 1 FROM system_analytics WHERE system_analytics.metric_name = v.metric_name AND system_analytics.category = v.category);

-- Enable realtime for key tables
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER TABLE public.calendar_events REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- Add tables to realtime publication (ignore if already exists)
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