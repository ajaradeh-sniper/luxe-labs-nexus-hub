import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/DashboardLayout"
import { EnhancedClientOverview } from "@/components/client/EnhancedClientOverview"
import { ClientDocumentCenter } from "@/components/client/ClientDocumentCenter"
import { ClientFeedbackSystem } from "@/components/client/ClientFeedbackSystem"
import { ClientPaymentPortal } from "@/components/client/ClientPaymentPortal"
import { ClientCommunicationHub } from "@/components/client/ClientCommunicationHub"
import { useAuth } from "@/contexts/AuthContext"
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Star, 
  CreditCard, 
  BarChart3 
} from "lucide-react"

export default function EnhancedClientDashboard() {
  const { user } = useAuth()
  
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Client'}</h1>
          <p className="text-muted-foreground">
            Track your projects, communicate with your team, and manage your investments
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <EnhancedClientOverview />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <ClientDocumentCenter />
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <ClientCommunicationHub />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <ClientFeedbackSystem />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <ClientPaymentPortal />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              {/* Project Performance Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Analytics components would go here */}
                <div className="p-6 border rounded-lg">
                  <h3 className="font-semibold mb-4">Project Timeline Performance</h3>
                  <p className="text-muted-foreground">Visual timeline analytics and milestone tracking</p>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="font-semibold mb-4">Budget Utilization</h3>
                  <p className="text-muted-foreground">Spending patterns and budget forecasting</p>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="font-semibold mb-4">Quality Metrics</h3>
                  <p className="text-muted-foreground">Quality scores and satisfaction trends</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}