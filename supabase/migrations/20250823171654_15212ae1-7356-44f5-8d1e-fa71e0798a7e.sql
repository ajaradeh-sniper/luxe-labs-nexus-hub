-- Luxury Labs Operating Model - Core Data Schema (Part 2)
-- Create KPI calculation views and additional functions

-- Create comprehensive KPI calculation views
-- PIPE-01: Qualified Leads/Week
CREATE OR REPLACE VIEW v_qualified_leads_weekly AS
SELECT 
    DATE_TRUNC('week', created_at) as week_start,
    COUNT(*) as qualified_leads_count,
    COUNT(*) / 7.0 as leads_per_day
FROM ll_leads 
WHERE status IN ('qualified', 'go_decision', 'converted')
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week_start DESC;

-- PIPE-02: Lead→Deal %
CREATE OR REPLACE VIEW v_lead_conversion_rate AS
SELECT 
    COUNT(CASE WHEN status = 'converted' THEN 1 END) * 100.0 / 
    NULLIF(COUNT(CASE WHEN status IN ('qualified', 'go_decision', 'converted', 'no_go') THEN 1 END), 0) as conversion_rate,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as deals_count,
    COUNT(CASE WHEN status IN ('qualified', 'go_decision', 'converted', 'no_go') THEN 1 END) as qualified_leads_count
FROM ll_leads;

-- PIPE-03: Deal Cycle (days)
CREATE OR REPLACE VIEW v_deal_cycle_days AS
SELECT 
    l.id,
    l.created_at as first_contact,
    p.created_at as close_date,
    EXTRACT(DAYS FROM p.created_at - l.created_at) as cycle_days
FROM ll_leads l
JOIN ll_projects p ON l.id::text = p.code -- Assuming lead ID maps to project code
WHERE l.status = 'converted' AND p.created_at IS NOT NULL;

-- PROC-01: On-Time Delivery %
CREATE OR REPLACE VIEW v_on_time_delivery AS
SELECT 
    COUNT(CASE WHEN gr.delivery_date <= po.expected_delivery_date THEN 1 END) * 100.0 /
    NULLIF(COUNT(*), 0) as on_time_percentage,
    COUNT(CASE WHEN gr.delivery_date <= po.expected_delivery_date THEN 1 END) as on_time_count,
    COUNT(*) as total_deliveries
FROM ll_pos po
JOIN ll_goods_receipts gr ON po.id = gr.po_id
WHERE po.expected_delivery_date IS NOT NULL;

-- PROC-02: Cost Variance (Materials)
CREATE OR REPLACE VIEW v_cost_variance_materials AS
SELECT 
    bl.project_id,
    bl.package,
    bl.budget_amount,
    bl.actual_amount,
    CASE 
        WHEN bl.budget_amount > 0 THEN 
            ((bl.actual_amount - bl.budget_amount) / bl.budget_amount) * 100
        ELSE 0 
    END as variance_percentage
FROM ll_budget_lines bl
WHERE bl.category = 'Materials' AND bl.budget_amount > 0;

-- EXEC-01: CPI (Cost Performance Index)
CREATE OR REPLACE VIEW v_project_cpi AS
SELECT 
    p.id as project_id,
    p.code,
    p.name,
    SUM(bl.budget_amount) as total_budget,
    SUM(bl.actual_amount) as total_actual,
    CASE 
        WHEN SUM(bl.actual_amount) > 0 THEN 
            SUM(bl.budget_amount) / SUM(bl.actual_amount)
        ELSE 1 
    END as cpi
FROM ll_projects p
LEFT JOIN ll_budget_lines bl ON p.id = bl.project_id
GROUP BY p.id, p.code, p.name;

-- EXEC-02: Schedule Variance %
CREATE OR REPLACE VIEW v_schedule_variance AS
SELECT 
    p.id as project_id,
    p.code,
    p.planned_end_date,
    CURRENT_DATE as current_date,
    CASE 
        WHEN p.planned_end_date IS NOT NULL THEN
            EXTRACT(DAYS FROM CURRENT_DATE - p.planned_end_date) * 100.0 /
            NULLIF(EXTRACT(DAYS FROM p.planned_end_date - p.start_date), 0)
        ELSE 0
    END as schedule_variance_percent
FROM ll_projects p
WHERE p.status IN ('planning', 'design', 'procurement', 'execution', 'furnishing', 'listing');

-- QUAL-01: Snags at PC (per 1,000 m²)
CREATE OR REPLACE VIEW v_snags_at_pc AS
SELECT 
    s.project_id,
    COUNT(*) as snag_count,
    pr.size_sqm,
    CASE 
        WHEN pr.size_sqm > 0 THEN 
            COUNT(*) * 1000.0 / pr.size_sqm
        ELSE 0 
    END as snags_per_1000_sqm
FROM ll_snags s
JOIN ll_projects p ON s.project_id = p.id
JOIN ll_properties pr ON p.property_id = pr.id
WHERE s.opened_at IS NOT NULL
GROUP BY s.project_id, pr.size_sqm;

-- QUAL-02: Snag Closure SLA %
CREATE OR REPLACE VIEW v_snag_closure_sla AS
SELECT 
    project_id,
    COUNT(CASE WHEN closed_at IS NOT NULL AND 
        EXTRACT(DAYS FROM closed_at - opened_at) <= 7 THEN 1 END) * 100.0 /
    NULLIF(COUNT(CASE WHEN closed_at IS NOT NULL THEN 1 END), 0) as closure_sla_percentage,
    COUNT(CASE WHEN closed_at IS NOT NULL THEN 1 END) as closed_snags,
    COUNT(*) as total_snags
FROM ll_snags
GROUP BY project_id;

-- FIN-01: Gross Margin %
CREATE OR REPLACE VIEW v_gross_margin AS
SELECT 
    p.id as project_id,
    p.code,
    SUM(CASE WHEN bl.category IN ('Revenue', 'Sales') THEN bl.actual_amount ELSE 0 END) as revenue,
    SUM(CASE WHEN bl.category IN ('Materials', 'Labor', 'COGS') THEN bl.actual_amount ELSE 0 END) as cogs,
    CASE 
        WHEN SUM(CASE WHEN bl.category IN ('Revenue', 'Sales') THEN bl.actual_amount ELSE 0 END) > 0 THEN
            (SUM(CASE WHEN bl.category IN ('Revenue', 'Sales') THEN bl.actual_amount ELSE 0 END) - 
             SUM(CASE WHEN bl.category IN ('Materials', 'Labor', 'COGS') THEN bl.actual_amount ELSE 0 END)) * 100.0 /
             SUM(CASE WHEN bl.category IN ('Revenue', 'Sales') THEN bl.actual_amount ELSE 0 END)
        ELSE 0
    END as gross_margin_percent
FROM ll_projects p
LEFT JOIN ll_budget_lines bl ON p.id = bl.project_id
GROUP BY p.id, p.code;

-- MKT-01: Episode Time-to-Publish
CREATE OR REPLACE VIEW v_episode_time_to_publish AS
SELECT 
    c.id,
    c.project_id,
    c.title,
    c.shoot_date,
    c.publish_date,
    CASE 
        WHEN c.shoot_date IS NOT NULL AND c.publish_date IS NOT NULL THEN
            EXTRACT(DAYS FROM c.publish_date - c.shoot_date)
        ELSE NULL
    END as days_to_publish
FROM ll_content c
WHERE c.content_type = 'episode' AND c.status = 'published';

-- FIN-03: Investor IRR calculation (simplified)
CREATE OR REPLACE VIEW v_investor_irr AS
SELECT 
    p.id as project_id,
    p.code,
    SUM(cc.amount) as total_calls,
    SUM(d.amount) as total_distributions,
    CASE 
        WHEN SUM(cc.amount) > 0 THEN
            (SUM(d.amount) - SUM(cc.amount)) * 100.0 / SUM(cc.amount)
        ELSE 0
    END as simple_return_percent
FROM ll_projects p
LEFT JOIN ll_capital_calls cc ON p.id = cc.project_id
LEFT JOIN ll_distributions d ON p.id = d.project_id
GROUP BY p.id, p.code;

-- Create executive summary view for dashboard
CREATE OR REPLACE VIEW v_executive_summary AS
SELECT 
    (SELECT COUNT(*) FROM ll_projects WHERE status IN ('planning', 'design', 'procurement', 'execution', 'furnishing', 'listing')) as active_projects,
    (SELECT COALESCE(SUM(estimated_budget), 0) FROM ll_leads WHERE status IN ('qualified', 'go_decision')) as pipeline_value,
    (SELECT COALESCE(AVG(cpi), 1) FROM v_project_cpi) as avg_cpi,
    (SELECT COALESCE(AVG(schedule_variance_percent), 0) FROM v_schedule_variance) as avg_schedule_variance,
    (SELECT COALESCE(AVG(conversion_rate), 0) FROM v_lead_conversion_rate) as lead_conversion_rate;

-- Insert seed data for demonstration
INSERT INTO ll_spvs (name, jurisdiction, bank_account) VALUES
('LL Project Alpha SPV', 'ADGM', 'ADCB-001-Alpha'),
('LL Project Beta SPV', 'DIFC', 'ENBD-002-Beta'),
('LL Project Gamma SPV', 'ADGM', 'FAB-003-Gamma');

INSERT INTO ll_properties (address, building, area, property_type, size_sqm, view_rating, created_by) VALUES
('Apt 2501, Marina Tower', 'Marina Tower', 'Dubai Marina', 'apartment', 120.5, 8, auth.uid()),
('Villa 15, Palm Jumeirah', 'Frond M', 'Palm Jumeirah', 'villa', 450.0, 10, auth.uid()),
('Unit 1204, Downtown Heights', 'Downtown Heights', 'Downtown Dubai', 'apartment', 95.5, 7, auth.uid());

INSERT INTO ll_vendors (name, category, contact_email, rating, is_approved) VALUES
('Al Rashid Construction', 'construction', 'info@alrashid.ae', 4.5, true),
('Elite Interiors', 'design', 'design@eliteinteriors.ae', 4.8, true),
('Luxury Furniture Co', 'furniture', 'sales@luxuryfurniture.ae', 4.2, true),
('Tech Solutions LLC', 'equipment', 'info@techsolutions.ae', 4.0, true),
('Premium Materials', 'materials', 'orders@premiummaterials.ae', 4.3, true),
('Dubai Design Studio', 'design', 'studio@dubaidesign.ae', 4.6, true);

INSERT INTO ll_investors (name, email, allocation_amount, kyc_status) VALUES
('Ahmed Al Mansouri', 'ahmed@investor1.ae', 500000, 'completed'),
('Sarah Johnson', 'sarah@investor2.com', 750000, 'completed'),
('Michael Chen', 'michael@investor3.com', 300000, 'pending');

-- Sample leads
INSERT INTO ll_leads (source, area, property_type, estimated_budget, asking_price, size_sqm, status, qualification_notes, created_by) VALUES
('Website', 'Dubai Marina', 'apartment', 150000, 1200000, 110, 'qualified', 'Good renovation potential, motivated seller', auth.uid()),
('Agent Referral', 'Downtown Dubai', 'apartment', 200000, 1800000, 140, 'new', 'Premium location, needs full renovation', auth.uid()),
('Direct Contact', 'Palm Jumeirah', 'villa', 800000, 5500000, 400, 'go_decision', 'Excellent opportunity, prime location', auth.uid()),
('Social Media', 'Business Bay', 'apartment', 120000, 950000, 85, 'qualified', 'Compact unit, good for quick flip', auth.uid()),
('Partner Network', 'JVC', 'townhouse', 250000, 1400000, 180, 'new', 'Family area, good rental potential', auth.uid()),
('Website', 'Dubai Hills', 'villa', 600000, 4200000, 350, 'qualified', 'New community, high demand', auth.uid()),
('Agent Referral', 'Dubai Marina', 'apartment', 180000, 1500000, 125, 'converted', 'Successfully converted to Project Alpha', auth.uid()),
('Website', 'Downtown Dubai', 'apartment', 220000, 1900000, 145, 'no_go', 'Price too high, minimal profit margin', auth.uid());

-- Create sample projects
DO $$
DECLARE
    prop1_id UUID;
    prop2_id UUID;
    prop3_id UUID;
    spv1_id UUID;
    spv2_id UUID;
    spv3_id UUID;
    proj1_id UUID;
    proj2_id UUID;
    proj3_id UUID;
BEGIN
    -- Get property and SPV IDs
    SELECT id INTO prop1_id FROM ll_properties WHERE address LIKE '%Marina Tower%';
    SELECT id INTO prop2_id FROM ll_properties WHERE address LIKE '%Palm Jumeirah%';
    SELECT id INTO prop3_id FROM ll_properties WHERE address LIKE '%Downtown Heights%';
    
    SELECT id INTO spv1_id FROM ll_spvs WHERE name LIKE '%Alpha%';
    SELECT id INTO spv2_id FROM ll_spvs WHERE name LIKE '%Beta%';
    SELECT id INTO spv3_id FROM ll_spvs WHERE name LIKE '%Gamma%';
    
    -- Insert projects
    INSERT INTO ll_projects (code, property_id, spv_id, tier, name, description, status, start_date, planned_end_date, total_budget, created_by) VALUES
    ('LL-2024-001', prop1_id, spv1_id, 'premium', 'Marina Tower Renovation', 'Luxury apartment renovation with premium finishes', 'execution', '2024-01-15', '2024-04-15', 180000, auth.uid()),
    ('LL-2024-002', prop2_id, spv2_id, 'standard', 'Palm Villa Upgrade', 'Villa renovation for rental market', 'design', '2024-02-01', '2024-06-01', 650000, auth.uid()),
    ('LL-2024-003', prop3_id, spv3_id, 'lite', 'Downtown Quick Flip', 'Fast renovation for resale', 'completed', '2023-10-01', '2023-12-15', 95000, auth.uid())
    RETURNING id INTO proj1_id;
    
    SELECT id INTO proj1_id FROM ll_projects WHERE code = 'LL-2024-001';
    SELECT id INTO proj2_id FROM ll_projects WHERE code = 'LL-2024-002';
    SELECT id INTO proj3_id FROM ll_projects WHERE code = 'LL-2024-003';
    
    -- Insert budget lines
    INSERT INTO ll_budget_lines (project_id, package, category, budget_amount, forecast_amount, actual_amount) VALUES
    (proj1_id, 'Demolition', 'Labor', 15000, 15000, 14500),
    (proj1_id, 'Flooring', 'Materials', 25000, 27000, 26500),
    (proj1_id, 'Kitchen', 'Materials', 45000, 45000, 44200),
    (proj1_id, 'Bathrooms', 'Materials', 30000, 32000, 31800),
    (proj1_id, 'Painting', 'Labor', 12000, 12000, 11900),
    (proj2_id, 'Structural', 'Labor', 85000, 85000, 0),
    (proj2_id, 'MEP', 'Materials', 120000, 125000, 0),
    (proj2_id, 'Finishes', 'Materials', 200000, 200000, 0),
    (proj3_id, 'Complete Renovation', 'Mixed', 95000, 95000, 94500);
    
    -- Insert POs
    INSERT INTO ll_pos (project_id, vendor_id, package, description, amount, expected_delivery_date, status, created_by) VALUES
    (proj1_id, (SELECT id FROM ll_vendors WHERE name = 'Premium Materials'), 'Flooring', 'Premium marble flooring for living areas', 26500, '2024-02-15', 'delivered', auth.uid()),
    (proj1_id, (SELECT id FROM ll_vendors WHERE name = 'Elite Interiors'), 'Kitchen', 'Custom kitchen cabinetry and appliances', 44200, '2024-02-20', 'delivered', auth.uid()),
    (proj1_id, (SELECT id FROM ll_vendors WHERE name = 'Al Rashid Construction'), 'Bathrooms', 'Bathroom renovation and fixtures', 31800, '2024-02-25', 'invoiced', auth.uid()),
    (proj2_id, (SELECT id FROM ll_vendors WHERE name = 'Al Rashid Construction'), 'Structural', 'Structural modifications', 85000, '2024-03-15', 'confirmed', auth.uid()),
    (proj2_id, (SELECT id FROM ll_vendors WHERE name = 'Tech Solutions LLC'), 'MEP', 'Electrical and plumbing upgrades', 125000, '2024-04-01', 'sent', auth.uid());
    
    -- Insert sample snags
    INSERT INTO ll_snags (project_id, location, description, severity, status, opened_at, assigned_to, created_by) VALUES
    (proj1_id, 'Master Bathroom', 'Tile alignment issue near shower area', 'medium', 'open', NOW() - INTERVAL '3 days', auth.uid(), auth.uid()),
    (proj1_id, 'Living Room', 'Paint touch-up required on accent wall', 'low', 'closed', NOW() - INTERVAL '5 days', auth.uid(), auth.uid()),
    (proj3_id, 'Kitchen', 'Cabinet door adjustment needed', 'low', 'closed', NOW() - INTERVAL '30 days', auth.uid(), auth.uid());
    
    -- Update snag closure date
    UPDATE ll_snags SET closed_at = opened_at + INTERVAL '2 days' WHERE status = 'closed';
    
    -- Insert weekly updates
    INSERT INTO ll_updates (project_id, week_number, percent_complete, notes, risks, next_milestones, published, created_by) VALUES
    (proj1_id, 8, 75, 'Kitchen installation completed. Bathroom work in progress.', 'Tile delivery delayed by 2 days', 'Complete bathroom tiling, start painting', true, auth.uid()),
    (proj1_id, 9, 85, 'Bathroom tiling completed. Painting started.', 'No major risks', 'Complete painting, install fixtures', true, auth.uid()),
    (proj2_id, 4, 25, 'Structural work ongoing. MEP planning in progress.', 'Weather delays possible', 'Complete structural phase, start MEP', true, auth.uid());
    
    -- Insert content pipeline
    INSERT INTO ll_content (project_id, title, content_type, status, shoot_date, publish_date, published_url, utm_source, utm_campaign, views_count, leads_attributed, created_by) VALUES
    (proj1_id, 'Marina Tower Transformation Episode 1', 'episode', 'published', '2024-02-10', '2024-02-17', 'https://youtube.com/watch?v=example1', 'youtube', 'marina-tower-ep1', 15420, 3, auth.uid()),
    (proj1_id, 'Kitchen Reveal Reel', 'reel', 'published', '2024-02-20', '2024-02-21', 'https://instagram.com/reel/example1', 'instagram', 'kitchen-reveal', 8750, 2, auth.uid()),
    (proj2_id, 'Palm Villa Before & After', 'episode', 'editing', '2024-02-25', NULL, NULL, NULL, 'palm-villa-ep1', 0, 0, auth.uid());
    
    -- Insert capital calls and distributions
    INSERT INTO ll_capital_calls (project_id, call_number, amount, due_date, purpose, status) VALUES
    (proj1_id, 1, 90000, '2024-01-10', 'Initial capital for acquisition and renovation start', 'collected'),
    (proj1_id, 2, 90000, '2024-02-15', 'Second tranche for materials and labor', 'collected'),
    (proj2_id, 1, 200000, '2024-01-25', 'Acquisition and initial renovation capital', 'collected'),
    (proj2_id, 2, 225000, '2024-03-01', 'Main renovation phase funding', 'pending'),
    (proj3_id, 1, 95000, '2023-09-25', 'Full project funding', 'collected');
    
    INSERT INTO ll_distributions (project_id, amount, distribution_date, type, notes) VALUES
    (proj3_id, 120000, '2023-12-20', 'profit', 'Project completion and sale proceeds'),
    (proj3_id, 95000, '2023-12-20', 'return_of_capital', 'Return of initial investment');
    
END $$;