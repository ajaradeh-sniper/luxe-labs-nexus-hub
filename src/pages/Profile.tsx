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
  Lock
} from "lucide-react"

const Profile = () => {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)

  const handleEditAssessment = () => {
    setIsAssessmentModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile information and investment preferences
            </p>
          </div>
        </div>

        {/* Profile Information & Investment Assessment */}
        <ComprehensiveProfileSection onEditAssessment={handleEditAssessment} />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Investment Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="h-5 w-5" />
                Investment Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleEditAssessment}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Update Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </CardContent>
          </Card>

          {/* Settings & Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Settings & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Advanced Settings
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