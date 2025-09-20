import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComprehensiveProfileSection } from "@/components/ComprehensiveProfileSection"
import { InvestorAssessmentModal } from "@/components/modals/InvestorAssessmentModal"
import { 
  User, 
  Mail,
  Shield,
  CreditCard,
  Database,
  FileEdit,
  Settings as SettingsIcon,
  Bell,
  Download,
  Lock,
  UserCheck
} from "lucide-react"

const Profile = () => {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)

  const handleEditAssessment = () => {
    setIsAssessmentModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Page Header - Distinctive for Profile */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-primary" />
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your profile information, investment preferences, and account settings
            </p>
          </div>
          <Button onClick={handleEditAssessment} className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            Update Assessment
          </Button>
        </div>

        {/* Profile Information & Investment Assessment */}
        <ComprehensiveProfileSection onEditAssessment={handleEditAssessment} />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Account Security */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Login History
              </Button>
            </CardContent>
          </Card>

          {/* Investment Management */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="h-5 w-5 text-green-600" />
                Investment Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleEditAssessment}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Retake Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Portfolio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </CardContent>
          </Card>

          {/* Communication & Data */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Communication & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Export My Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Investment Assessment Modal */}
        <InvestorAssessmentModal 
          open={isAssessmentModalOpen} 
          onOpenChange={setIsAssessmentModalOpen} 
        />
      </div>
    </DashboardLayout>
  )
}

export default Profile