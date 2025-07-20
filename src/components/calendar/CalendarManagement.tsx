import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Plus, Clock, MapPin, Users, Eye, Home, Calendar as CalendarLucide } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  event_type: string
  start_time: string
  end_time: string
  location?: string
  attendees: string[]
  property_id?: string
  contact_id?: string
  created_at: string
}

export function CalendarManagement() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())
  const [view, setView] = useState<'month' | 'week'>('week')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    event_type: "",
    start_time: "",
    end_time: "",
    location: "",
    attendees: ""
  })
  const { toast } = useToast()

  const { execute: loadEvents } = useAsyncOperation(
    async () => {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start_time', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load calendar events",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: createEvent } = useAsyncOperation(
    async () => {
      if (!eventForm.title || !eventForm.event_type || !eventForm.start_time || !eventForm.end_time) {
        throw new Error("Please fill in all required fields")
      }

      const startTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${eventForm.start_time}`)
      const endTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${eventForm.end_time}`)

      if (endTime <= startTime) {
        throw new Error("End time must be after start time")
      }

      const { error } = await supabase
        .from('calendar_events')
        .insert({
          title: eventForm.title,
          description: eventForm.description || null,
          event_type: eventForm.event_type,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          location: eventForm.location || null,
          attendees: eventForm.attendees ? eventForm.attendees.split(',').map(a => a.trim()) : []
        })

      if (error) throw error

      setIsDialogOpen(false)
      setEventForm({
        title: "",
        description: "",
        event_type: "",
        start_time: "",
        end_time: "",
        location: "",
        attendees: ""
      })
      loadEvents()
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Event created successfully",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    }
  )

  useEffect(() => {
    loadEvents()
  }, [])

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek),
    end: endOfWeek(currentWeek)
  })

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.start_time), date)
    )
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'viewing': return 'bg-green-100 text-green-800 border-green-200'
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200'
      case 'inspection': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'viewing': return <Home className="h-4 w-4" />
      case 'meeting': return <Users className="h-4 w-4" />
      case 'deadline': return <Clock className="h-4 w-4" />
      default: return <CalendarLucide className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">Schedule meetings, viewings, and track deadlines</p>
        </div>
        <div className="flex gap-2">
          <Select value={view} onValueChange={(value: 'month' | 'week') => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Schedule a new event for {format(selectedDate, "MMMM dd, yyyy")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    placeholder="Property viewing with client"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event_type">Event Type *</Label>
                  <Select value={eventForm.event_type} onValueChange={(value) => setEventForm({ ...eventForm, event_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="viewing">Property Viewing</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start_time">Start Time *</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={eventForm.start_time}
                      onChange={(e) => setEventForm({ ...eventForm, start_time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end_time">End Time *</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={eventForm.end_time}
                      onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="123 Main St, Downtown"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input
                    id="attendees"
                    value={eventForm.attendees}
                    onChange={(e) => setEventForm({ ...eventForm, attendees: e.target.value })}
                    placeholder="john@example.com, jane@example.com"
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Additional notes about this event..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => createEvent()}>
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar Picker */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date)
                  setCurrentWeek(date)
                }
              }}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Calendar View */}
        <div className="lg:col-span-3">
          {view === 'week' ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Week of {format(startOfWeek(currentWeek), "MMMM dd, yyyy")}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day) => {
                    const dayEvents = getEventsForDate(day)
                    const isToday = isSameDay(day, new Date())
                    const isSelected = isSameDay(day, selectedDate)
                    
                    return (
                      <div 
                        key={day.toISOString()} 
                        className={cn(
                          "min-h-[120px] p-2 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors",
                          isToday && "bg-primary/10 border-primary",
                          isSelected && "bg-accent border-accent-foreground"
                        )}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="font-medium text-sm mb-2">
                          {format(day, "EEE dd")}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div 
                              key={event.id}
                              className={cn(
                                "text-xs p-1 rounded border text-center",
                                getEventTypeColor(event.event_type)
                              )}
                            >
                              <div className="flex items-center justify-center gap-1">
                                {getEventTypeIcon(event.event_type)}
                                <span className="truncate">{event.title}</span>
                              </div>
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Month View</CardTitle>
                <CardDescription>Coming soon - Full month calendar view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <CalendarLucide className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Today's Events */}
      <Card>
        <CardHeader>
          <CardTitle>Events for {format(selectedDate, "MMMM dd, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getEventsForDate(selectedDate).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={cn("p-2 rounded border", getEventTypeColor(event.event_type))}>
                  {getEventTypeIcon(event.event_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(parseISO(event.start_time), "HH:mm")} - {format(parseISO(event.end_time), "HH:mm")}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    )}
                    {event.attendees.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees.length} attendees
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                  )}
                </div>
                <Badge className={getEventTypeColor(event.event_type)}>
                  {event.event_type}
                </Badge>
              </div>
            ))}
            {getEventsForDate(selectedDate).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarLucide className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled for this date</p>
                <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                  Schedule Event
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}