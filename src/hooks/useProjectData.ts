import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  status: string;
  project_type: string;
  budget?: number;
  actual_cost?: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export function useProjectData(projectId?: string) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
      toast({
        title: "Error",
        description: "Failed to load projects from database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCurrentProject(data);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
      toast({
        title: "Error",
        description: "Failed to load project details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: { name: string; project_type: string; description?: string; [key: string]: any }) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Project created successfully.",
      });
      
      return { data, error: null };
    } catch (err) {
      console.error('Error creating project:', err);
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "destructive",
      });
      return { data: null, error: err as Error };
    }
  };

  const updateProject = async (id: string, updates: Partial<ProjectData>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      if (currentProject?.id === id) {
        setCurrentProject(data);
      }
      
      toast({
        title: "Success",
        description: "Project updated successfully.",
      });
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating project:', err);
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
      return { data: null, error: err as Error };
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    } else {
      fetchProjects();
    }
  }, [projectId]);

  return {
    projects,
    currentProject,
    loading,
    error,
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    refetch: projectId ? () => fetchProject(projectId) : fetchProjects
  };
}