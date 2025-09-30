import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Pencil,
  Save,
  X,
  DollarSign,
  Calendar,
  TrendingUp,
  MapPin,
  User,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  project_type: string;
  status: string;
  budget: number;
  actual_cost: number;
  start_date: string;
  end_date: string;
  roi_percentage: number;
}

interface EditableProject extends Project {
  isEditing?: boolean;
}

export function VisualProjectManagement() {
  const [projects, setProjects] = useState<EditableProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<EditableProject | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (project: Project) => {
    setEditingProject({ ...project, isEditing: true });
  };

  const handleEditCancel = () => {
    setEditingProject(null);
  };

  const handleEditSave = async () => {
    if (!editingProject) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          name: editingProject.name,
          description: editingProject.description,
          project_type: editingProject.project_type,
          status: editingProject.status,
          budget: editingProject.budget,
          actual_cost: editingProject.actual_cost,
          roi_percentage: editingProject.roi_percentage
        })
        .eq('id', editingProject.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project updated successfully"
      });

      fetchProjects();
      setEditingProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'on_hold': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'active': return <Clock className="h-4 w-4" />;
      case 'planning': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = (project: Project) => {
    if (project.status === 'completed') return 100;
    if (project.status === 'planning') return 10;
    if (project.status === 'active') {
      const budgetUsed = (project.actual_cost / project.budget) * 100;
      return Math.min(budgetUsed, 90);
    }
    return 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const isEditing = (projectId: string) => 
    editingProject?.id === projectId && editingProject.isEditing;

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2"
          >
            <div className={`h-2 ${
              project.status === 'completed' ? 'bg-green-500' :
              project.status === 'active' ? 'bg-blue-500' :
              project.status === 'planning' ? 'bg-yellow-500' :
              'bg-gray-400'
            }`} />
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                {isEditing(project.id) ? (
                  <Input
                    value={editingProject?.name || ''}
                    onChange={(e) => setEditingProject({ ...editingProject!, name: e.target.value })}
                    className="text-xl font-bold"
                  />
                ) : (
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                )}
                
                <div className="flex gap-2">
                  {isEditing(project.id) ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={handleEditSave}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleEditCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleEditStart(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <Badge className={`${getStatusColor(project.status)} w-fit flex items-center gap-1`}>
                {getStatusIcon(project.status)}
                {project.status.replace('_', ' ')}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              {isEditing(project.id) ? (
                <Textarea
                  value={editingProject?.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject!, description: e.target.value })}
                  rows={3}
                  className="text-sm"
                />
              ) : (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{getProgressPercentage(project)}%</span>
                </div>
                <Progress value={getProgressPercentage(project)} className="h-2" />
              </div>

              {/* Project Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    {isEditing(project.id) ? (
                      <Input
                        type="number"
                        value={editingProject?.budget || 0}
                        onChange={(e) => setEditingProject({ ...editingProject!, budget: Number(e.target.value) })}
                        className="h-6 text-sm font-semibold p-1"
                      />
                    ) : (
                      <p className="text-sm font-semibold">{formatCurrency(project.budget)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Spent</p>
                    {isEditing(project.id) ? (
                      <Input
                        type="number"
                        value={editingProject?.actual_cost || 0}
                        onChange={(e) => setEditingProject({ ...editingProject!, actual_cost: Number(e.target.value) })}
                        className="h-6 text-sm font-semibold p-1"
                      />
                    ) : (
                      <p className="text-sm font-semibold">{formatCurrency(project.actual_cost)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-semibold">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    {isEditing(project.id) ? (
                      <Input
                        type="number"
                        value={editingProject?.roi_percentage || 0}
                        onChange={(e) => setEditingProject({ ...editingProject!, roi_percentage: Number(e.target.value) })}
                        className="h-6 text-sm font-semibold p-1"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-green-600">+{project.roi_percentage}%</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Type Badge */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">
                  {project.project_type.replace('_', ' ')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No projects found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
