import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Shield, 
  Building, 
  FileText, 
  TrendingUp,
  Settings,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { UserManagement } from '@/components/admin/UserManagement';
import { SubmissionReview } from '@/components/admin/SubmissionReview';
import { AdminApprovalSystem } from './AdminApprovalSystem';

interface WorkflowStats {
  total: number;
  pending: number;
  active: number;
  completed: number;
  blocked: number;
}

const workflowStats: Record<string, WorkflowStats> = {
  user_management: {
    total: 156,
    pending: 12,
    active: 144,
    completed: 89,
    blocked: 0
  },
  submissions: {
    total: 34,
    pending: 8,
    active: 26,
    completed: 22,
    blocked: 4
  },
  approvals: {
    total: 23,
    pending: 7,
    active: 16,
    completed: 19,
    blocked: 1
  },
  kyc_verification: {
    total: 45,
    pending: 15,
    active: 30,
    completed: 38,
    blocked: 2
  }
};

export function UnifiedWorkflowSystem() {
  const [activeWorkflow, setActiveWorkflow] = useState('user_management');

  const WorkflowStatsCard = ({ 
    title, 
    icon: Icon, 
    stats 
  }: { 
    title: string; 
    icon: any; 
    stats: WorkflowStats;
  }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Total: {stats.total}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-yellow-500" />
            <span>Pending: {stats.pending}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active: {stats.active}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            <span>Done: {stats.completed}</span>
          </div>
        </div>
        {stats.blocked > 0 && (
          <div className="mt-2 flex items-center gap-1 text-red-600">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-sm">Blocked: {stats.blocked}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WorkflowStatsCard 
          title="User Management"
          icon={Users}
          stats={workflowStats.user_management}
        />
        <WorkflowStatsCard 
          title="Submissions"
          icon={FileText}
          stats={workflowStats.submissions}
        />
        <WorkflowStatsCard 
          title="Approvals"
          icon={Shield}
          stats={workflowStats.approvals}
        />
        <WorkflowStatsCard 
          title="KYC Verification"
          icon={Building}
          stats={workflowStats.kyc_verification}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Workflow Management System
          </CardTitle>
          <CardDescription>
            Centralized control for all user management and approval workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeWorkflow} onValueChange={setActiveWorkflow} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user_management">User Management</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="user_management" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              <SubmissionReview />
            </TabsContent>

            <TabsContent value="approvals" className="mt-6">
              <AdminApprovalSystem />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Performance</CardTitle>
                    <CardDescription>Average processing times and completion rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">User Onboarding</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">KYC Processing</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                          <span className="text-sm">67%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Investment Approvals</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm">92%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Latest workflow actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">User approved: Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Investment request submitted</p>
                          <p className="text-xs text-muted-foreground">15 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">KYC document uploaded</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}