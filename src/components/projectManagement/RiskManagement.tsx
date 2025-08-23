import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProjectRisk, MitigationAction } from '@/types/projectManagement';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Shield, Clock, User, Plus, Eye, Edit, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Mock data
const mockRisks: ProjectRisk[] = [
  {
    id: 'r1',
    project_id: 'proj-1',
    title: 'Weather Delays',
    description: 'Heavy rain season may delay construction activities',
    category: 'external',
    probability: 'high',
    impact: 'medium',
    risk_score: 15,
    status: 'assessed',
    owner: 'Project Manager',
    mitigation_strategy: 'Schedule buffer time and cover critical areas',
    contingency_plan: 'Indoor activities prioritized during bad weather',
    mitigation_actions: [
      {
        id: 'ma1',
        action: 'Install temporary roofing for critical areas',
        responsible_party: 'Construction Team',
        due_date: '2024-03-15',
        status: 'in_progress',
        effectiveness: 'medium'
      },
      {
        id: 'ma2',
        action: 'Adjust timeline with 2-week buffer',
        responsible_party: 'Project Manager',
        due_date: '2024-02-28',
        status: 'completed',
        effectiveness: 'high'
      }
    ],
    review_date: '2024-03-30',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-20T15:30:00Z'
  },
  {
    id: 'r2',
    project_id: 'proj-1',
    title: 'Material Cost Inflation',
    description: 'Rising steel and concrete prices affecting budget',
    category: 'financial',
    probability: 'medium',
    impact: 'high',
    risk_score: 20,
    status: 'mitigated',
    owner: 'Finance Lead',
    mitigation_strategy: 'Lock in material prices with suppliers',
    contingency_plan: 'Alternative materials or design modifications',
    mitigation_actions: [
      {
        id: 'ma3',
        action: 'Negotiate fixed-price contracts with suppliers',
        responsible_party: 'Procurement Team',
        due_date: '2024-02-15',
        status: 'completed',
        effectiveness: 'high'
      }
    ],
    review_date: '2024-04-15',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-02-15T14:20:00Z'
  },
  {
    id: 'r3',
    project_id: 'proj-1',
    title: 'Key Personnel Unavailability',
    description: 'Lead architect may be unavailable due to other commitments',
    category: 'resource',
    probability: 'low',
    impact: 'high',
    risk_score: 10,
    status: 'identified',
    owner: 'HR Manager',
    mitigation_strategy: 'Cross-train team members and have backup resources',
    contingency_plan: 'Engage external consultant if needed',
    mitigation_actions: [
      {
        id: 'ma4',
        action: 'Identify and train backup architect',
        responsible_party: 'Head of Design',
        due_date: '2024-03-10',
        status: 'not_started',
        effectiveness: 'medium'
      }
    ],
    review_date: '2024-03-20',
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z'
  }
];

interface Project {
  id: string;
  name: string;
  status: string;
  description?: string;
}

interface RiskManagementProps {
  projectId?: string;
}

export function RiskManagement({ projectId: externalProjectId }: RiskManagementProps = {}) {
  const [risks, setRisks] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<ProjectRisk | null>(null);
  const { toast } = useToast();

  // Use external projectId if provided, otherwise use internal selection
  const effectiveProjectId = externalProjectId || selectedProjectId;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (effectiveProjectId) {
      fetchProjectRisks(effectiveProjectId);
    } else {
      setRisks([mockRisks[0]]);
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

  const fetchProjectRisks = async (projectId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_risks')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;
      
      // Create project-specific mock data if no real data
      const mockRisksByProject = {
        'proj-1': [mockRisks[0]],
        'proj-2': [{ ...mockRisks[0], id: 'r2', title: 'Planning Delays', category: 'schedule' }],
        'proj-3': [{ ...mockRisks[0], id: 'r3', title: 'Final Inspection', status: 'resolved' }]
      };
      
      setRisks(data && data.length > 0 ? data : (mockRisksByProject[projectId as keyof typeof mockRisksByProject] || [mockRisks[0]]));
    } catch (error) {
      console.error('Error fetching project risks:', error);
      toast({
        title: "Error",
        description: "Failed to load project risks. Using sample data.",
        variant: "destructive",
      });
      setRisks([mockRisks[0]]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 20) return 'bg-red-500';
    if (score >= 15) return 'bg-orange-500';
    if (score >= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProbabilityLevel = (probability: ProjectRisk['probability']) => {
    const levels = {
      'very_low': 1,
      'low': 2,
      'medium': 3,
      'high': 4,
      'very_high': 5
    };
    return levels[probability];
  };

  const getImpactLevel = (impact: ProjectRisk['impact']) => {
    const levels = {
      'very_low': 1,
      'low': 2,
      'medium': 3,
      'high': 4,
      'very_high': 5
    };
    return levels[impact];
  };

  const getCategoryIcon = (category: ProjectRisk['category']) => {
    switch (category) {
      case 'technical': return '🔧';
      case 'financial': return '💰';
      case 'schedule': return '⏰';
      case 'resource': return '👥';
      case 'external': return '🌍';
      case 'quality': return '✅';
      default: return '❓';
    }
  };

  const getStatusColor = (status: ProjectRisk['status']) => {
    switch (status) {
      case 'identified': return 'bg-blue-500';
      case 'assessed': return 'bg-yellow-500';
      case 'mitigated': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      case 'occurred': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCreateRisk = () => {
    toast({
      title: "Risk Created",
      description: "New risk has been added to the register.",
    });
    setIsCreateDialogOpen(false);
  };

  const riskMatrix = () => {
    const matrix = [];
    for (let impact = 5; impact >= 1; impact--) {
      const row = [];
      for (let probability = 1; probability <= 5; probability++) {
        const score = probability * impact;
        const riskCount = risks.filter(risk => 
          getProbabilityLevel(risk.probability) === probability && 
          getImpactLevel(risk.impact) === impact
        ).length;
        
        row.push(
          <div key={`${probability}-${impact}`} className={`
            border p-2 text-center h-16 flex flex-col justify-center
            ${score >= 20 ? 'bg-red-100 border-red-300' : 
              score >= 15 ? 'bg-orange-100 border-orange-300' :
              score >= 10 ? 'bg-yellow-100 border-yellow-300' :
              'bg-green-100 border-green-300'}
          `}>
            <div className="text-xs font-medium">{score}</div>
            {riskCount > 0 && <div className="text-xs">{riskCount} risk{riskCount > 1 ? 's' : ''}</div>}
          </div>
        );
      }
      matrix.push(<div key={impact} className="grid grid-cols-5 gap-0">{row}</div>);
    }
    return matrix;
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
            <CardDescription>Choose a project to view its risk management and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select a project to view risks" />
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
            Risk Management
            {effectiveProjectId && (
              <span className="text-lg font-normal text-muted-foreground ml-2">
                - {projects.find(p => p.id === effectiveProjectId)?.name || 'Selected Project'}
              </span>
            )}
          </h3>
          <p className="text-muted-foreground">Identify, assess, and mitigate project risks</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Add Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Risk</DialogTitle>
              <DialogDescription>
                Add a new risk to the project risk register
              </DialogDescription>
            </DialogHeader>
            <CreateRiskForm onSubmit={handleCreateRisk} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Total Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {risks.filter(r => r.risk_score >= 15).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mitigated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {risks.filter(r => r.status === 'mitigated').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(risks.reduce((sum, r) => sum + r.risk_score, 0) / risks.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">Risk Register</TabsTrigger>
          <TabsTrigger value="matrix">Risk Matrix</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Actions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          <div className="grid gap-4">
            {risks.map((risk) => (
              <Card key={risk.id} className="hover-scale animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(risk.category)}</span>
                      <div>
                        <CardTitle className="text-lg">{risk.title}</CardTitle>
                        <CardDescription>{risk.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskScoreColor(risk.risk_score)}>
                        Score: {risk.risk_score}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Category</div>
                      <div className="font-medium capitalize">{risk.category}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Probability</div>
                      <div className="font-medium capitalize">{risk.probability.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Impact</div>
                      <div className="font-medium capitalize">{risk.impact.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Owner</div>
                      <div className="font-medium">{risk.owner}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Mitigation Strategy:</div>
                    <p className="text-sm text-muted-foreground">{risk.mitigation_strategy}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Review: {new Date(risk.review_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>{risk.mitigation_actions.length} action{risk.mitigation_actions.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRisk(risk)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>
                Visual representation of risk probability vs impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-0 max-w-2xl">
                  {/* Header row */}
                  <div className="border p-2 text-center font-medium bg-gray-50">Impact →</div>
                  <div className="border p-2 text-center text-xs bg-gray-50">Very Low</div>
                  <div className="border p-2 text-center text-xs bg-gray-50">Low</div>
                  <div className="border p-2 text-center text-xs bg-gray-50">Medium</div>
                  <div className="border p-2 text-center text-xs bg-gray-50">High</div>
                  <div className="border p-2 text-center text-xs bg-gray-50">Very High</div>

                  {/* Probability labels and matrix */}
                  {['Very High', 'High', 'Medium', 'Low', 'Very Low'].map((prob, idx) => (
                    <div key={prob} className="contents">
                      <div className="border p-2 text-center text-xs bg-gray-50 font-medium writing-mode-vertical">
                        {idx === 2 && <span className="rotate-90 inline-block">Probability ↓</span>}
                        <br />
                        {prob}
                      </div>
                      {[1, 2, 3, 4, 5].map(impact => {
                        const probability = 5 - idx;
                        const score = probability * impact;
                        const riskCount = risks.filter(risk => 
                          getProbabilityLevel(risk.probability) === probability && 
                          getImpactLevel(risk.impact) === impact
                        ).length;
                        
                        return (
                          <div key={`${probability}-${impact}`} className={`
                            border p-2 text-center h-16 flex flex-col justify-center text-xs
                            ${score >= 20 ? 'bg-red-100 border-red-300' : 
                              score >= 15 ? 'bg-orange-100 border-orange-300' :
                              score >= 10 ? 'bg-yellow-100 border-yellow-300' :
                              'bg-green-100 border-green-300'}
                          `}>
                            <div className="font-medium">{score}</div>
                            {riskCount > 0 && <div>{riskCount} risk{riskCount > 1 ? 's' : ''}</div>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-300"></div>
                    <span>Very High Risk (20-25)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-100 border border-orange-300"></div>
                    <span>High Risk (15-19)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300"></div>
                    <span>Medium Risk (10-14)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300"></div>
                    <span>Low Risk (1-9)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Actions</CardTitle>
              <CardDescription>Track progress on risk mitigation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {risks.flatMap(risk => 
                  risk.mitigation_actions.map(action => (
                    <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{action.action}</h4>
                          <Badge variant={action.status === 'completed' ? 'default' : 
                                         action.status === 'in_progress' ? 'secondary' : 'outline'}>
                            {action.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Risk: {risks.find(r => r.mitigation_actions.includes(action))?.title}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Responsible: {action.responsible_party}</span>
                          <span>Due: {new Date(action.due_date).toLocaleDateString()}</span>
                          <span>Effectiveness: {action.effectiveness}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {action.status === 'completed' ? (
                          <Shield className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    risks.reduce((acc, risk) => {
                      acc[risk.category] = (acc[risk.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{getCategoryIcon(category as ProjectRisk['category'])}</span>
                        <span className="capitalize">{category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={risks.length > 0 ? ((count as number) / risks.length) * 100 : 0} className="w-20 h-2" />
                        <span className="text-sm font-medium">{count as number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    risks.reduce((acc, risk) => {
                      acc[risk.status] = (acc[risk.status] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="capitalize">{status.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={risks.length > 0 ? ((count as number) / risks.length) * 100 : 0} className="w-20 h-2" />
                        <span className="text-sm font-medium">{count as number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Risk Detail Dialog */}
      {selectedRisk && (
        <RiskDetailDialog
          risk={selectedRisk}
          open={!!selectedRisk}
          onClose={() => setSelectedRisk(null)}
        />
      )}
    </div>
  );
}

function CreateRiskForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Risk Title</Label>
          <Input id="title" placeholder="Enter risk title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="schedule">Schedule</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
              <SelectItem value="external">External</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe the risk..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="probability">Probability</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select probability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very_low">Very Low</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="very_high">Very High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="impact">Impact</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very_low">Very Low</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="very_high">Very High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="owner">Risk Owner</Label>
        <Input id="owner" placeholder="Who is responsible for this risk?" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mitigation">Mitigation Strategy</Label>
        <Textarea id="mitigation" placeholder="How will this risk be mitigated?" />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onSubmit}>Create Risk</Button>
      </div>
    </div>
  );
}

function RiskDetailDialog({
  risk,
  open,
  onClose
}: {
  risk: ProjectRisk;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{risk.title}</DialogTitle>
          <DialogDescription>{risk.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium capitalize">{risk.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Probability:</span>
                  <span className="font-medium capitalize">{risk.probability.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impact:</span>
                  <span className="font-medium capitalize">{risk.impact.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Score:</span>
                  <span className="font-medium">{risk.risk_score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium capitalize">{risk.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner:</span>
                  <span className="font-medium">{risk.owner}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mitigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Strategy:</h4>
                  <p className="text-sm text-muted-foreground">{risk.mitigation_strategy}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contingency Plan:</h4>
                  <p className="text-sm text-muted-foreground">{risk.contingency_plan}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mitigation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {risk.mitigation_actions.map((action) => (
                  <div key={action.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{action.action}</h4>
                      <Badge variant={action.status === 'completed' ? 'default' : 'outline'}>
                        {action.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>Responsible: {action.responsible_party}</div>
                      <div>Due: {new Date(action.due_date).toLocaleDateString()}</div>
                      <div>Effectiveness: {action.effectiveness}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Risk</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}