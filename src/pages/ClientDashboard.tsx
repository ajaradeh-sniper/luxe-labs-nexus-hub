import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Eye, Download, MessageSquare, Calendar, Star } from "lucide-react"

export default function ClientDashboard() {
  const myProjects = [
    {
      id: 1,
      name: "Downtown Apartment Renovation",
      status: "In Progress",
      progress: 65,
      nextMilestone: "Kitchen Installation",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      name: "Business Bay Office Design", 
      status: "Design Phase",
      progress: 30,
      nextMilestone: "Design Approval",
      dueDate: "2024-01-25"
    }
  ]

  const recentUpdates = [
    { project: "Downtown Apartment", update: "Plumbing work completed", date: "Jan 18" },
    { project: "Business Bay Office", update: "Initial designs submitted", date: "Jan 16" },
    { project: "Downtown Apartment", update: "Electrical installation started", date: "Jan 14" }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                My Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <Progress value={project.progress} className="mb-2" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Next: {project.nextMilestone}</p>
                    <p>Due: {project.dueDate}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Team
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUpdates.map((update, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="font-medium text-sm">{update.project}</p>
                  <p className="text-sm text-muted-foreground">{update.update}</p>
                  <p className="text-xs text-muted-foreground">{update.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="flex flex-col h-auto p-4 gap-2">
                <Download className="h-5 w-5" />
                <span className="text-sm">Download Reports</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto p-4 gap-2">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm">Contact Support</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto p-4 gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Schedule Visit</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto p-4 gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">Leave Feedback</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}