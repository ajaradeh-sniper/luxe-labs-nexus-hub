-- Add missing RLS policies for INSERT, UPDATE, DELETE operations

-- Properties: Add missing CRUD policies
CREATE POLICY "Real estate users can update properties" 
ON properties 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

CREATE POLICY "Real estate users can delete properties" 
ON properties 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'real_estate_director'])
));

-- Projects: Add missing CRUD policies
CREATE POLICY "Project managers can update projects" 
ON projects 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
));

CREATE POLICY "Project managers can delete projects" 
ON projects 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager'])
));

-- Opportunities: Add missing CRUD policies
CREATE POLICY "Real estate users can insert opportunities" 
ON opportunities 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

CREATE POLICY "Real estate users can update opportunities" 
ON opportunities 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'real_estate_director', 'real_estate_agent'])
));

CREATE POLICY "Real estate users can delete opportunities" 
ON opportunities 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'real_estate_director'])
));

-- Project costs: Add missing CRUD policies  
CREATE POLICY "Project managers can insert project costs" 
ON project_costs 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager', 'finance_lead'])
));

CREATE POLICY "Project managers can update project costs" 
ON project_costs 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager', 'finance_lead'])
));

CREATE POLICY "Project managers can delete project costs" 
ON project_costs 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager'])
));

-- Project risks: Add missing CRUD policies
CREATE POLICY "Project managers can insert project risks" 
ON project_risks 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
));

CREATE POLICY "Project managers can update project risks" 
ON project_risks 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
));

CREATE POLICY "Project managers can delete project risks" 
ON project_risks 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['administrator', 'project_manager'])
));