-- Create storage bucket for project visual assets (images, sketches, upgrades)
INSERT INTO storage.buckets (id, name, public) VALUES ('project-assets', 'project-assets', true);

-- Create RLS policies for the project-assets bucket
CREATE POLICY "Project managers can upload project assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'project-assets' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
  )
);

CREATE POLICY "Project assets are publicly viewable" ON storage.objects
FOR SELECT USING (bucket_id = 'project-assets');

CREATE POLICY "Project managers can update project assets" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'project-assets' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
  )
);

CREATE POLICY "Project managers can delete project assets" ON storage.objects
FOR DELETE USING (
  bucket_id = 'project-assets' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'project_manager', 'real_estate_director'])
  )
);