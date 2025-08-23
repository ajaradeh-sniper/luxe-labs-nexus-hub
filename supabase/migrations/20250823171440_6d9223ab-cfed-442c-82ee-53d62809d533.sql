-- Luxury Labs Operating Model - Core Data Schema
-- Based on Section 8: Data Model & Event Logging

-- Create enums for status and types
CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'townhouse', 'commercial', 'land');
CREATE TYPE project_status AS ENUM ('planning', 'design', 'procurement', 'execution', 'furnishing', 'listing', 'completed', 'cancelled');
CREATE TYPE project_tier AS ENUM ('lite', 'standard', 'premium');
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'completed', 'on_hold', 'cancelled');
CREATE TYPE po_status AS ENUM ('draft', 'sent', 'confirmed', 'delivered', 'invoiced', 'paid', 'cancelled');
CREATE TYPE lead_status AS ENUM ('new', 'qualified', 'go_decision', 'no_go', 'converted');
CREATE TYPE snag_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE vendor_category AS ENUM ('construction', 'design', 'furniture', 'equipment', 'services', 'materials');

-- Properties table
CREATE TABLE ll_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    building TEXT,
    area TEXT NOT NULL,
    property_type property_type NOT NULL,
    size_sqm NUMERIC,
    view_rating INTEGER CHECK (view_rating >= 1 AND view_rating <= 10),
    constraints_notes TEXT,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- SPVs (Special Purpose Vehicles)
CREATE TABLE ll_spvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    jurisdiction TEXT NOT NULL,
    bank_account TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE ll_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    property_id UUID REFERENCES ll_properties(id),
    spv_id UUID REFERENCES ll_spvs(id),
    tier project_tier NOT NULL DEFAULT 'standard',
    name TEXT NOT NULL,
    description TEXT,
    status project_status DEFAULT 'planning',
    start_date DATE,
    planned_end_date DATE,
    actual_end_date DATE,
    total_budget NUMERIC DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Phases table
CREATE TABLE ll_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tasks table
CREATE TABLE ll_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES ll_phases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    owner_id UUID,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    status task_status DEFAULT 'not_started',
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Budget lines table
CREATE TABLE ll_budget_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    package TEXT NOT NULL,
    category TEXT NOT NULL,
    budget_amount NUMERIC NOT NULL DEFAULT 0,
    forecast_amount NUMERIC DEFAULT 0,
    actual_amount NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vendors table
CREATE TABLE ll_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category vendor_category NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    rating NUMERIC CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Purchase Orders table
CREATE TABLE ll_pos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES ll_vendors(id),
    package TEXT NOT NULL,
    description TEXT,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'AED',
    expected_delivery_date DATE,
    status po_status DEFAULT 'draft',
    created_by UUID,
    approved_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Goods Receipts table
CREATE TABLE ll_goods_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id UUID REFERENCES ll_pos(id) ON DELETE CASCADE,
    quantity_received NUMERIC,
    delivery_date DATE NOT NULL,
    photos JSONB DEFAULT '[]',
    notes TEXT,
    received_by UUID,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Invoices table
CREATE TABLE ll_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id UUID REFERENCES ll_pos(id) ON DELETE CASCADE,
    invoice_number TEXT,
    amount NUMERIC NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Payments table
CREATE TABLE ll_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES ll_invoices(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    payment_date DATE NOT NULL,
    payment_method TEXT,
    reference TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Leads table
CREATE TABLE ll_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    area TEXT NOT NULL,
    property_type property_type NOT NULL,
    estimated_budget NUMERIC,
    asking_price NUMERIC,
    size_sqm NUMERIC,
    status lead_status DEFAULT 'new',
    qualification_notes TEXT,
    created_by UUID,
    assigned_to UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Clients table
CREATE TABLE ll_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    kyc_status TEXT DEFAULT 'pending',
    kyc_completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Investors table
CREATE TABLE ll_investors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    user_id UUID, -- Link to auth user
    allocation_amount NUMERIC DEFAULT 0,
    kyc_status TEXT DEFAULT 'pending',
    kyc_completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Project Updates table
CREATE TABLE ll_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    percent_complete INTEGER CHECK (percent_complete >= 0 AND percent_complete <= 100),
    notes TEXT,
    risks TEXT,
    next_milestones TEXT,
    photos JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT false,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Assets table (for media files)
CREATE TABLE ll_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    update_id UUID REFERENCES ll_updates(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    tags JSONB DEFAULT '[]',
    size_bytes INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Snags table
CREATE TABLE ll_snags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    severity snag_severity DEFAULT 'medium',
    status TEXT DEFAULT 'open',
    opened_at TIMESTAMPTZ DEFAULT now(),
    closed_at TIMESTAMPTZ,
    assigned_to UUID,
    created_by UUID
);

-- Event Log table (immutable audit trail)
CREATE TABLE ll_event_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT now(),
    actor_id UUID,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    action TEXT NOT NULL,
    payload JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT
);

-- Content Pipeline table
CREATE TABLE ll_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL, -- 'episode', 'reel', 'post'
    status TEXT DEFAULT 'planned', -- 'planned', 'shot', 'editing', 'review', 'published'
    shoot_date DATE,
    publish_date DATE,
    published_url TEXT,
    utm_source TEXT,
    utm_campaign TEXT,
    views_count INTEGER DEFAULT 0,
    leads_attributed INTEGER DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Capital Calls table
CREATE TABLE ll_capital_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    call_number INTEGER NOT NULL,
    amount NUMERIC NOT NULL,
    due_date DATE NOT NULL,
    purpose TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'collected', 'overdue'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Distributions table
CREATE TABLE ll_distributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ll_projects(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    distribution_date DATE NOT NULL,
    type TEXT NOT NULL, -- 'profit', 'return_of_capital'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_projects_status ON ll_projects(status);
CREATE INDEX idx_projects_created_at ON ll_projects(created_at);
CREATE INDEX idx_pos_project_id ON ll_pos(project_id);
CREATE INDEX idx_pos_status ON ll_pos(status);
CREATE INDEX idx_leads_status ON ll_leads(status);
CREATE INDEX idx_leads_created_at ON ll_leads(created_at);
CREATE INDEX idx_event_log_timestamp ON ll_event_log(timestamp);
CREATE INDEX idx_event_log_entity ON ll_event_log(entity_type, entity_id);
CREATE INDEX idx_snags_project_status ON ll_snags(project_id, status);
CREATE INDEX idx_updates_project_week ON ll_updates(project_id, week_number);

-- Enable RLS on all tables
ALTER TABLE ll_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_budget_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_pos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_goods_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_spvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_snags ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_event_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_capital_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE ll_distributions ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies
-- Admin access to all tables
CREATE POLICY "Admins can access all data" ON ll_properties FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all projects" ON ll_projects FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all phases" ON ll_phases FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all tasks" ON ll_tasks FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all budget lines" ON ll_budget_lines FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all vendors" ON ll_vendors FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all POs" ON ll_pos FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all goods receipts" ON ll_goods_receipts FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all invoices" ON ll_invoices FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all payments" ON ll_payments FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all leads" ON ll_leads FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all clients" ON ll_clients FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all investors" ON ll_investors FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all SPVs" ON ll_spvs FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all updates" ON ll_updates FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all assets" ON ll_assets FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all snags" ON ll_snags FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all event logs" ON ll_event_log FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all content" ON ll_content FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all capital calls" ON ll_capital_calls FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

CREATE POLICY "Admins can access all distributions" ON ll_distributions FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));

-- Project Manager access
CREATE POLICY "PMs can view projects" ON ll_projects FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

CREATE POLICY "PMs can update projects" ON ll_projects FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'project_manager'));

-- Investor read-only access to their projects
CREATE POLICY "Investors can view their projects" ON ll_projects FOR SELECT TO authenticated
USING (EXISTS (
    SELECT 1 FROM ll_investors i 
    WHERE i.user_id = auth.uid() 
    AND EXISTS (SELECT 1 FROM ll_capital_calls cc WHERE cc.project_id = ll_projects.id)
));

-- Event logging function
CREATE OR REPLACE FUNCTION log_event(
    p_entity_type TEXT,
    p_entity_id UUID,
    p_action TEXT,
    p_payload JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO ll_event_log (entity_type, entity_id, action, payload, actor_id)
    VALUES (p_entity_type, p_entity_id, p_action, p_payload, auth.uid())
    RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_ll()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_ll_projects_updated_at BEFORE UPDATE ON ll_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ll();

CREATE TRIGGER update_ll_budget_lines_updated_at BEFORE UPDATE ON ll_budget_lines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ll();

CREATE TRIGGER update_ll_pos_updated_at BEFORE UPDATE ON ll_pos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ll();

CREATE TRIGGER update_ll_leads_updated_at BEFORE UPDATE ON ll_leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ll();

CREATE TRIGGER update_ll_content_updated_at BEFORE UPDATE ON ll_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_ll();