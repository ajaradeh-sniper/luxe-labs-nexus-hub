import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Calendar as CalendarIcon, Clock, Users, MapPin, Plus } from "lucide-react"

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const events = [
    {
      id: 1,
      title: "Property Viewing - Marina Tower",
      time: "10:00 AM",
      duration: "1 hour",
      type: "viewing",
      attendees: 3,
      location: "Dubai Marina"
    },
    {
      id: 2,
      title: "Client Meeting - Investment Portfolio",
      time: "2:00 PM", 
      duration: "45 mins",
      type: "meeting",
      attendees: 2,
      location: "Office"
    },
    {
      id: 3,
      title: "Site Inspection - Business Bay",
      time: "4:30 PM",
      duration: "2 hours", 
      type: "inspection",
      attendees: 5,
      location: "Business Bay"
    }
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'viewing': return 'bg-primary/10 text-primary border-primary/20'
      case 'meeting': return 'bg-success/10 text-success border-success/20'
      case 'inspection': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">{selectedDate.getDate()}</div>
              <div className="text-lg">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <Button variant="outline" className="w-full">
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium mt-1">{event.time}</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Events Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">6h</p>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}