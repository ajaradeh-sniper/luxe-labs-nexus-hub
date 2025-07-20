-- Add missing update triggers for tables that don't have them
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

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

CREATE TRIGGER update_opportunities_updated_at
    BEFORE UPDATE ON public.opportunities
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

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add performance indexes
CREATE INDEX idx_contacts_created_by ON public.contacts(created_by);
CREATE INDEX idx_contacts_contact_type ON public.contacts(contact_type);
CREATE INDEX idx_opportunities_status ON public.opportunities(status);
CREATE INDEX idx_opportunities_created_by ON public.opportunities(created_by);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_manager_id ON public.projects(manager_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_property_type ON public.properties(property_type);
CREATE INDEX idx_calendar_events_created_by ON public.calendar_events(created_by);
CREATE INDEX idx_calendar_events_start_time ON public.calendar_events(start_time);
CREATE INDEX idx_messages_sender_recipient ON public.messages(sender_id, recipient_id);
CREATE INDEX idx_financial_reports_period ON public.financial_reports(period_start, period_end);

-- Add comprehensive sample data for all tables

-- Sample projects
INSERT INTO public.projects (name, description, project_type, status, budget, start_date, end_date, created_by) VALUES
('Downtown Luxury Tower', 'Premium residential development in the heart of downtown', 'development', 'active', 15000000, '2024-01-15', '2025-12-31', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Marina Bay Renovation', 'Complete renovation of existing commercial complex', 'renovation', 'planning', 8500000, '2024-03-01', '2024-11-30', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Green Valley Villas', 'Sustainable housing development project', 'development', 'active', 12000000, '2024-02-01', '2025-08-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample project costs
INSERT INTO public.project_costs (project_id, category, description, estimated_cost, actual_cost, vendor, status, created_by) VALUES
((SELECT id FROM projects WHERE name = 'Downtown Luxury Tower' LIMIT 1), 'construction', 'Foundation and structural work', 5000000, 4800000, 'Elite Construction Co.', 'completed', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
((SELECT id FROM projects WHERE name = 'Downtown Luxury Tower' LIMIT 1), 'materials', 'Premium finishing materials', 3000000, 0, 'Luxury Materials Inc.', 'planned', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
((SELECT id FROM projects WHERE name = 'Marina Bay Renovation' LIMIT 1), 'design', 'Architectural design and planning', 500000, 450000, 'Modern Design Studio', 'completed', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample project risks
INSERT INTO public.project_risks (project_id, title, description, risk_level, category, probability, impact_score, status, mitigation_plan, created_by) VALUES
((SELECT id FROM projects WHERE name = 'Downtown Luxury Tower' LIMIT 1), 'Weather Delays', 'Potential construction delays due to severe weather conditions', 'medium', 'environmental', 0.3, 6, 'monitored', 'Implement flexible scheduling and weather-resistant construction methods', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
((SELECT id FROM projects WHERE name = 'Marina Bay Renovation' LIMIT 1), 'Budget Overrun', 'Risk of exceeding allocated budget due to unforeseen structural issues', 'high', 'financial', 0.4, 8, 'active', 'Conduct thorough structural assessment and maintain 15% contingency budget', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample calendar events
INSERT INTO public.calendar_events (title, description, event_type, start_time, end_time, location, created_by) VALUES
('Client Presentation - Downtown Tower', 'Presenting project progress to major investors', 'meeting', '2024-08-25 14:00:00+00', '2024-08-25 16:00:00+00', 'Conference Room A', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Site Inspection - Marina Bay', 'Monthly site inspection and progress review', 'inspection', '2024-08-22 09:00:00+00', '2024-08-22 12:00:00+00', 'Marina Bay Site', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Investor Meeting', 'Quarterly investor briefing and financial review', 'meeting', '2024-08-30 10:00:00+00', '2024-08-30 11:30:00+00', 'Executive Boardroom', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample marketing campaigns
INSERT INTO public.marketing_campaigns (name, campaign_type, status, target_audience, budget, start_date, end_date, created_by) VALUES
('Luxury Living Campaign', 'digital', 'active', 'High-net-worth individuals aged 35-55', 150000, '2024-08-01', '2024-10-31', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Investment Opportunities Showcase', 'event', 'planning', 'Real estate investors and financial advisors', 75000, '2024-09-15', '2024-09-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Sustainable Development Series', 'content', 'active', 'Environmentally conscious buyers', 50000, '2024-08-15', '2024-12-15', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample financial reports
INSERT INTO public.financial_reports (title, report_type, period_start, period_end, status, data, created_by) VALUES
('Q2 2024 Property Sales Report', 'sales', '2024-04-01', '2024-06-30', 'published', '{"total_sales": 45000000, "units_sold": 25, "average_price": 1800000, "top_performing_property": "Downtown Luxury Tower"}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Monthly Investment Analysis - July 2024', 'investment', '2024-07-01', '2024-07-31', 'published', '{"total_investments": 8500000, "roi_percentage": 12.5, "active_projects": 3, "projected_returns": 10625000}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
('Annual Financial Forecast 2024', 'forecast', '2024-01-01', '2024-12-31', 'draft', '{"projected_revenue": 75000000, "estimated_costs": 52000000, "expected_profit": 23000000, "growth_rate": 15}', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample contact interactions
INSERT INTO public.contact_interactions (contact_id, interaction_type, subject, description, scheduled_at, completed_at, created_by) VALUES
((SELECT id FROM contacts WHERE name = 'Ahmed Al-Rashid' LIMIT 1), 'call', 'Investment Opportunity Discussion', 'Discussed potential investment in Downtown Luxury Tower project', '2024-08-20 14:00:00+00', '2024-08-20 14:45:00+00', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
((SELECT id FROM contacts WHERE name = 'Sarah Mitchell' LIMIT 1), 'email', 'Property Viewing Arrangement', 'Scheduled property viewing for Marina Bay Renovation project', '2024-08-18 10:00:00+00', '2024-08-18 10:15:00+00', (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)),
((SELECT id FROM contacts WHERE name = 'Construction Plus LLC' LIMIT 1), 'meeting', 'Contract Negotiation', 'Finalizing terms for Green Valley Villas construction contract', '2024-08-25 16:00:00+00', NULL, (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1));

-- Sample system analytics
INSERT INTO public.system_analytics (metric_name, metric_type, category, metric_value, metadata) VALUES
('active_projects', 'count', 'projects', 3, '{"status": "active", "total_value": 35500000}'),
('monthly_revenue', 'currency', 'finance', 4250000, '{"month": "2024-08", "currency": "AED"}'),
('user_logins', 'count', 'users', 156, '{"period": "last_30_days", "unique_users": 45}'),
('property_views', 'count', 'properties', 892, '{"period": "last_week", "top_property": "Downtown Luxury Tower"}'),
('conversion_rate', 'percentage', 'sales', 12.5, '{"period": "Q2_2024", "leads_converted": 25, "total_leads": 200}');

-- Enable realtime for key tables
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER TABLE public.calendar_events REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;