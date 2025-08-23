-- Add missing RLS policies for project_manager and other roles

-- Project Manager access to leads
CREATE POLICY "PMs can view leads" ON ll_leads FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can update leads" ON ll_leads FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to budget lines
CREATE POLICY "PMs can view budget lines" ON ll_budget_lines FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can update budget lines" ON ll_budget_lines FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to vendors
CREATE POLICY "PMs can view vendors" ON ll_vendors FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to POs
CREATE POLICY "PMs can view POs" ON ll_pos FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can create POs" ON ll_pos FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can update POs" ON ll_pos FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to goods receipts
CREATE POLICY "PMs can view goods receipts" ON ll_goods_receipts FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can create goods receipts" ON ll_goods_receipts FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to snags
CREATE POLICY "PMs can view snags" ON ll_snags FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can create snags" ON ll_snags FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can update snags" ON ll_snags FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Project Manager access to updates
CREATE POLICY "PMs can view updates" ON ll_updates FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can create updates" ON ll_updates FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Insert minimal seed data without complex queries
INSERT INTO ll_spvs (name, jurisdiction, bank_account) 
SELECT 'LL Project Alpha SPV', 'ADGM', 'ADCB-001-Alpha'
WHERE NOT EXISTS (SELECT 1 FROM ll_spvs WHERE name = 'LL Project Alpha SPV');

INSERT INTO ll_vendors (name, category, contact_email, rating, is_approved) 
SELECT 'Al Rashid Construction', 'construction', 'info@alrashid.ae', 4.5, true
WHERE NOT EXISTS (SELECT 1 FROM ll_vendors WHERE name = 'Al Rashid Construction');

INSERT INTO ll_leads (source, area, property_type, estimated_budget, asking_price, size_sqm, status, qualification_notes) 
SELECT 'Website', 'Dubai Marina', 'apartment', 150000, 1200000, 110, 'qualified', 'Good renovation potential'
WHERE NOT EXISTS (SELECT 1 FROM ll_leads WHERE source = 'Website' AND area = 'Dubai Marina');