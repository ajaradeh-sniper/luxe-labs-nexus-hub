import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Types for our database entities
export interface Property {
  id: string;
  title: string;
  description?: string;
  property_type: 'residential' | 'commercial' | 'mixed_use' | 'villa' | 'apartment' | 'office';
  status: 'available' | 'sold' | 'pending' | 'off_market';
  location: string;
  address?: string;
  price: number;
  area_sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  images: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  property_id?: string;
  project_type: 'renovation' | 'development' | 'investment' | 'flip';
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
  start_date?: string;
  end_date?: string;
  budget?: number;
  actual_cost: number;
  roi_percentage?: number;
  manager_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCost {
  id: string;
  project_id: string;
  category: 'materials' | 'labor' | 'permits' | 'equipment' | 'utilities' | 'other';
  description: string;
  estimated_cost: number;
  actual_cost: number;
  vendor?: string;
  status: 'planned' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectRisk {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  category: 'financial' | 'technical' | 'regulatory' | 'market' | 'operational';
  probability?: number;
  impact_score?: number;
  mitigation_plan?: string;
  status: 'identified' | 'mitigated' | 'resolved' | 'occurred';
  assigned_to?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  location: string;
  opportunity_type: 'acquisition' | 'partnership' | 'development' | 'investment';
  investment_required?: number;
  expected_roi?: number;
  risk_rating?: 'low' | 'medium' | 'high';
  status: 'evaluation' | 'approved' | 'rejected' | 'in_progress' | 'completed';
  deadline?: string;
  contact_info?: any;
  documents: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

// Service class for handling Supabase operations
export class SupabaseService {
  private static handleError(error: any, context: string) {
    console.error(`${context} error:`, error);
    return {
      error: error.message || 'An unexpected error occurred',
      data: null
    };
  }

  // Properties
  static async getProperties() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Get properties');
    }
  }

  static async createProperty(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Create property');
    }
  }

  // Projects
  static async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Get projects');
    }
  }

  static async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Create project');
    }
  }

  // Project Costs
  static async getProjectCosts(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('project_costs')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Get project costs');
    }
  }

  static async createProjectCost(cost: Omit<ProjectCost, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('project_costs')
        .insert([cost])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Create project cost');
    }
  }

  // Project Risks
  static async getProjectRisks(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('project_risks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Get project risks');
    }
  }

  static async createProjectRisk(risk: Omit<ProjectRisk, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('project_risks')
        .insert([risk])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Create project risk');
    }
  }

  // Opportunities
  static async getOpportunities() {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Get opportunities');
    }
  }

  static async createOpportunity(opportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([opportunity])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return this.handleError(error, 'Create opportunity');
    }
  }

  // Dashboard Analytics
  static async getDashboardStats() {
    try {
      const [propertiesResult, projectsResult, opportunitiesResult] = await Promise.all([
        supabase.from('properties').select('id, status, price'),
        supabase.from('projects').select('id, status, budget, actual_cost, roi_percentage'),
        supabase.from('opportunities').select('id, status, investment_required, expected_roi')
      ]);

      if (propertiesResult.error) throw propertiesResult.error;
      if (projectsResult.error) throw projectsResult.error;
      if (opportunitiesResult.error) throw opportunitiesResult.error;

      const properties = propertiesResult.data || [];
      const projects = projectsResult.data || [];
      const opportunities = opportunitiesResult.data || [];

      const stats = {
        totalProperties: properties.length,
        activeProjects: projects.filter(p => p.status === 'in_progress').length,
        totalValue: properties.reduce((sum, p) => sum + (p.price || 0), 0),
        avgROI: projects.length > 0 
          ? projects.reduce((sum, p) => sum + (p.roi_percentage || 0), 0) / projects.length 
          : 0,
        propertiesBreakdown: {
          available: properties.filter(p => p.status === 'available').length,
          sold: properties.filter(p => p.status === 'sold').length,
          pending: properties.filter(p => p.status === 'pending').length
        },
        projectsBreakdown: {
          planning: projects.filter(p => p.status === 'planning').length,
          in_progress: projects.filter(p => p.status === 'in_progress').length,
          completed: projects.filter(p => p.status === 'completed').length
        }
      };

      return { data: stats, error: null };
    } catch (error) {
      return this.handleError(error, 'Get dashboard stats');
    }
  }
}