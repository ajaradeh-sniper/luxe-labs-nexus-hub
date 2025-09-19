-- Add opportunity_id to projects table to link approved opportunities to projects
ALTER TABLE projects ADD COLUMN opportunity_id uuid REFERENCES opportunities(id);

-- Add index for performance
CREATE INDEX idx_projects_opportunity_id ON projects(opportunity_id);

-- Add visual_assets column to projects for storing images, sketches, upgrades
ALTER TABLE projects ADD COLUMN visual_assets jsonb DEFAULT '{"images": [], "sketches": [], "upgrades": []}';

-- Add approval_status and approval_data for project approval workflow
ALTER TABLE projects ADD COLUMN approval_status text DEFAULT 'pending_approval';
ALTER TABLE projects ADD COLUMN approval_data jsonb DEFAULT '{}';
ALTER TABLE projects ADD COLUMN approved_by uuid;
ALTER TABLE projects ADD COLUMN approved_at timestamp with time zone;

-- Add comments for clarity
COMMENT ON COLUMN projects.opportunity_id IS 'Links project to the original investment opportunity';
COMMENT ON COLUMN projects.visual_assets IS 'Stores images, sketches, and potential upgrades for project approval';
COMMENT ON COLUMN projects.approval_status IS 'Project approval status: pending_approval, approved, rejected';
COMMENT ON COLUMN projects.approval_data IS 'Additional approval workflow data';

-- Update existing projects to have default approval status
UPDATE projects SET approval_status = 'approved' WHERE approval_status IS NULL;