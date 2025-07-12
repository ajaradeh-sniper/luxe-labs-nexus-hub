import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardStats } from "@/components/DashboardStats"
import { RecentActivities } from "@/components/RecentActivities"
import { PropertyOverview } from "@/components/PropertyOverview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Users, FileText } from "lucide-react"

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-luxury rounded-2xl p-8 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to Luxury Labs</h1>
              <p className="text-primary-foreground/90 text-lg">
                Transform luxury real estate investments with precision and elegance
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                  Dubai Property Market
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                  Investment Excellence
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-6xl">🏗️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities - spans 2 columns */}
          <RecentActivities />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="luxury" className="w-full justify-start" size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="elegant" className="w-full justify-start" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Manage Team
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Property Portfolio */}
        <PropertyOverview />
      </div>
    </DashboardLayout>
  );
};

export default Index;
