import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelinePlanning } from '@/components/projectManagement/TimelinePlanning';
import { CostManagement } from '@/components/projectManagement/CostManagement';
import { RiskManagement } from '@/components/projectManagement/RiskManagement';
import { TenderManagement } from '@/components/projectManagement/TenderManagement';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, DollarSign, AlertTriangle, FileText, BarChart3 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
  description?: string;
}

export default function ProjectManagement() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Check if user has access to project management tools
  const hasAccess = user?.role === 'administrator' || user?.role === 'project_manager';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, status, description')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
      if (data && data.length > 0) {
        setSelectedProject(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to mock data
      const mockProjects = [
        { id: 'proj-1', name: 'Luxury Villa Downtown', status: 'in_progress', description: 'High-end residential project' },
        { id: 'proj-2', name: 'Marina Tower Development', status: 'planning', description: 'Commercial mixed-use development' },
        { id: 'proj-3', name: 'Business Bay Renovation', status: 'completed', description: 'Office space renovation' }
      ];
      setProjects(mockProjects);
      setSelectedProject(mockProjects[0].id);
    } finally {
      setLoading(false);
    }
  };

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-muted-foreground">
            You don't have permission to access project management tools.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">Manage timelines, costs, risks, and tenders</p>
          </div>
        </div>

        {/* Project Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select a project to manage" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div className="flex items-center gap-2">
                        <span>{project.name}</span>
                        <span className="text-xs text-muted-foreground">({project.status})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProjectData && (
                <div className="text-sm text-muted-foreground">
                  {selectedProjectData.description}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Costs
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risks
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tenders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <TimelinePlanning projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <CostManagement projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RiskManagement projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="tenders" className="space-y-6">
            <TenderManagement projectId={selectedProject} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {selectedProjectData && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Analytics - {selectedProjectData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Project Health Score</h3>
                      <div className="text-3xl font-bold">85%</div>
                      <p className="text-sm opacity-90">Based on timeline, budget, and risk factors</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Budget Performance</h3>
                      <div className="text-3xl font-bold">92%</div>
                      <p className="text-sm opacity-90">On track with projected spending</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Risk Exposure</h3>
                      <div className="text-3xl font-bold">Medium</div>
                      <p className="text-sm opacity-90">3 high-priority risks identified</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                    <p>Comprehensive project analytics, predictive insights, and performance dashboards for {selectedProjectData.name}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}