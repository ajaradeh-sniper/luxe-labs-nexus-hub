import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectTimeline, Task, Milestone } from '@/types/projectManagement';
import { Calendar, Clock, Users, CheckCircle, AlertTriangle, Zap, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockTimeline: ProjectTimeline = {
  id: '1',
  project_id: 'proj-1',
  phase: 'Construction',
  tasks: [
    {
      id: 't1',
      title: 'Foundation Work',
      description: 'Excavation and foundation laying',
      start_date: '2024-02-01',
      end_date: '2024-02-15',
      duration: 14,
      status: 'completed',
      priority: 'high',
      assigned_to: ['user-1', 'user-2'],
      progress: 100,
      estimated_hours: 160,
      actual_hours: 155,
      cost_estimate: 50000,
      actual_cost: 48000,
      dependencies: [],
      notes: 'Completed ahead of schedule'
    },
    {
      id: 't2',
      title: 'Structural Framework',
      description: 'Steel and concrete framework',
      start_date: '2024-02-16',
      end_date: '2024-03-10',
      duration: 23,
      status: 'in_progress',
      priority: 'high',
      assigned_to: ['user-1', 'user-3'],
      progress: 65,
      estimated_hours: 280,
      actual_hours: 180,
      cost_estimate: 85000,
      dependencies: ['t1'],
      notes: 'On track, weather permitting'
    },
    {
      id: 't3',
      title: 'Interior Design',
      description: 'Interior finishing and design',
      start_date: '2024-03-11',
      end_date: '2024-04-05',
      duration: 25,
      status: 'not_started',
      priority: 'medium',
      assigned_to: ['user-4'],
      progress: 0,
      estimated_hours: 200,
      cost_estimate: 75000,
      dependencies: ['t2'],
      notes: 'Waiting for structural completion'
    }
  ],
  milestones: [
    {
      id: 'm1',
      title: 'Foundation Complete',
      description: 'All foundation work finished and approved',
      due_date: '2024-02-15',
      completed_date: '2024-02-14',
      status: 'completed',
      critical: true,
      deliverables: ['Foundation inspection report', 'Concrete test results']
    },
    {
      id: 'm2',
      title: 'Structure Shell Complete',
      description: 'Building structure fully erected',
      due_date: '2024-03-10',
      status: 'pending',
      critical: true,
      deliverables: ['Structural engineer sign-off', 'Safety inspection']
    }
  ],
  dependencies: [],
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-02-20T15:30:00Z'
};

interface Project {
  id: string;
  name: string;
  status: string;
  description?: string;
}

interface TimelinePlanningProps {
  projectId?: string;
}

export function TimelinePlanning({ projectId: externalProjectId }: TimelinePlanningProps = {}) {
  const [timeline, setTimeline] = useState<ProjectTimeline>(mockTimeline);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Use external projectId if provided, otherwise use internal selection
  const effectiveProjectId = externalProjectId || selectedProjectId;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (effectiveProjectId) {
      fetchTimelineData(effectiveProjectId);
    } else {
      setTimeline(mockTimeline);
      setLoading(false);
    }
  }, [effectiveProjectId]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, status, description')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
      
      // Set default project if no external projectId and projects exist
      if (!externalProjectId && data && data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to mock data
      const mockProjects = [
        { id: 'proj-1', name: 'Luxury Villa Downtown', status: 'in_progress' },
        { id: 'proj-2', name: 'Marina Tower Development', status: 'planning' },
        { id: 'proj-3', name: 'Business Bay Renovation', status: 'completed' }
      ];
      setProjects(mockProjects);
      if (!externalProjectId) {
        setSelectedProjectId(mockProjects[0].id);
      }
    }
  };

  const fetchTimelineData = async (projectId: string) => {
    setLoading(true);
    try {
      // In a real implementation, fetch timeline from Supabase based on projectId
      // For now, use mock data with different content based on project
      const mockTimelines = {
        'proj-1': { ...mockTimeline, project_id: 'proj-1' },
        'proj-2': { 
          ...mockTimeline, 
          project_id: 'proj-2',
          phase: 'Planning',
          tasks: [{
            ...mockTimeline.tasks[0],
            title: 'Site Analysis',
            description: 'Comprehensive site analysis and planning',
            status: 'in_progress' as const
          }]
        },
        'proj-3': { 
          ...mockTimeline, 
          project_id: 'proj-3',
          phase: 'Completed',
          tasks: mockTimeline.tasks.map(task => ({ ...task, status: 'completed' as const }))
        }
      };
      
      setTimeline(mockTimelines[projectId as keyof typeof mockTimelines] || mockTimeline);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      toast({
        title: "Error",
        description: "Failed to load timeline data. Using sample data.",
        variant: "destructive",
      });
      setTimeline(mockTimeline);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'on_hold': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return <Zap className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Project Selection - only show if no external projectId provided */}
      {!externalProjectId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Select Project
            </CardTitle>
            <CardDescription>Choose a project to view its timeline and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select a project to view timeline" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div className="flex items-center gap-2">
                        <span>{project.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProjectId && (
                <div className="text-sm text-muted-foreground">
                  {projects.find(p => p.id === selectedProjectId)?.description || 'No description available'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Project Timeline
            {effectiveProjectId && (
              <span className="text-lg font-normal text-muted-foreground ml-2">
                - {projects.find(p => p.id === effectiveProjectId)?.name || 'Selected Project'}
              </span>
            )}
          </h3>
          <p className="text-muted-foreground">Track progress and manage project schedules</p>
        </div>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <div className="grid gap-4">
            {timeline.tasks.map((task, index) => (
              <Card key={task.id} className="animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPriorityIcon(task.priority)}
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(task.start_date).toLocaleDateString()} - {new Date(task.end_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{task.assigned_to.length} assigned</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrency(task.cost_estimate)}</div>
                      {task.actual_cost && (
                        <div className="text-xs text-muted-foreground">
                          Actual: {formatCurrency(task.actual_cost)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Estimated Hours:</span>
                      <span className="ml-2 font-medium">{task.estimated_hours}h</span>
                    </div>
                    {task.actual_hours && (
                      <div>
                        <span className="text-muted-foreground">Actual Hours:</span>
                        <span className="ml-2 font-medium">{task.actual_hours}h</span>
                      </div>
                    )}
                  </div>

                  {task.notes && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="mt-1">{task.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>Detailed task tracking and assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(task.priority)}
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getStatusColor(task.status)} variant="outline">
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Duration: {task.duration} days</span>
                        <span>Progress: {task.progress}%</span>
                        <span>Cost: {formatCurrency(task.cost_estimate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="w-20 h-2" />
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <div className="grid gap-4">
            {timeline.milestones.map((milestone) => (
              <Card key={milestone.id} className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-5 w-5 ${milestone.status === 'completed' ? 'text-green-500' : 'text-gray-400'}`} />
                      <div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        <CardDescription>{milestone.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {milestone.critical && (
                        <Badge variant="destructive">Critical</Badge>
                      )}
                      <Badge className={milestone.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {milestone.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="ml-2 font-medium">{new Date(milestone.due_date).toLocaleDateString()}</span>
                    </div>
                    {milestone.completed_date && (
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="ml-2 font-medium">{new Date(milestone.completed_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Deliverables:</h4>
                    <ul className="space-y-1">
                      {milestone.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-primary">•</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gantt Chart</CardTitle>
              <CardDescription>Visual project timeline and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Interactive Gantt chart coming soon...</p>
                <p className="text-sm">Will include task dependencies, resource allocation, and critical path analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}