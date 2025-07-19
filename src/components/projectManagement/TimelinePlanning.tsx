import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProjectTimeline, Task, Milestone } from '@/types/projectManagement';
import { Calendar, Clock, Users, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

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

export function TimelinePlanning() {
  const [timeline] = useState<ProjectTimeline>(mockTimeline);

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Project Timeline</h3>
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