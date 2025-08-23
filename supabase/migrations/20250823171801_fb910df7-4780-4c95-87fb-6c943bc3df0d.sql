-- Luxury Labs Operating Model - Essential Tables Only
-- Create core tables without conflicts

-- Create enums first
DO $$ 
BEGIN
    CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'townhouse', 'commercial', 'land');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
    CREATE TYPE project_status AS ENUM ('planning', 'design', 'procurement', 'execution', 'furnishing', 'listing', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
    CREATE TYPE project_tier AS ENUM ('lite', 'standard', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
    CREATE TYPE lead_status AS ENUM ('new', 'qualified', 'go_decision', 'no_go', 'converted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create tables only if they don't exist
CREATE TABLE IF NOT EXISTS ll_properties (
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

CREATE TABLE IF NOT EXISTS ll_spvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    jurisdiction TEXT NOT NULL,
    bank_account TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ll_projects (
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

CREATE TABLE IF NOT EXISTS ll_leads (
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

-- Enable RLS on core tables
DO $$
BEGIN
    ALTER TABLE ll_properties ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    ALTER TABLE ll_projects ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    ALTER TABLE ll_leads ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    ALTER TABLE ll_spvs ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

-- Create basic RLS policies
DO $$
BEGIN
    DROP POLICY IF EXISTS "Admins can access all properties" ON ll_properties;
    CREATE POLICY "Admins can access all properties" ON ll_properties FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Admins can access all leads" ON ll_leads;
    CREATE POLICY "Admins can access all leads" ON ll_leads FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Admins can access all projects" ON ll_projects;
    CREATE POLICY "Admins can access all projects" ON ll_projects FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Admins can access all SPVs" ON ll_spvs;
    CREATE POLICY "Admins can access all SPVs" ON ll_spvs FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'administrator'));
EXCEPTION
    WHEN others THEN null;
END $$;