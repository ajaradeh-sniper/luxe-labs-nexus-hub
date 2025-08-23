import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  BellOff,
  Settings,
  Archive,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  Calendar,
  DollarSign,
  Building2,
  Users
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'announcement'
  category: 'project' | 'financial' | 'team' | 'system' | 'client'
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionRequired: boolean
}

const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Project Milestone Completed',
      message: 'Marina Bay Tower renovation has reached 65% completion ahead of schedule.',
      type: 'success',
      category: 'project',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high',
      actionRequired: false
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $500K received from Ahmed Al-Mansouri for Downtown project.',
      type: 'success',
      category: 'financial',
      timestamp: '4 hours ago',
      read: false,
      priority: 'medium',
      actionRequired: false
    },
    {
      id: '3',
      title: 'Quality Inspection Required',
      message: 'Fire safety inspection is due for Business Bay Complex by December 15th.',
      type: 'warning',
      category: 'project',
      timestamp: '6 hours ago',
      read: true,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '4',
      title: 'New Team Member Added',
      message: 'Fatima Al-Zahra has joined the team as Legal Advisor.',
      type: 'info',
      category: 'team',
      timestamp: '1 day ago',
      read: true,
      priority: 'low',
      actionRequired: false
    },
    {
      id: '5',
      title: 'Client Meeting Scheduled',
      message: 'Meeting with Sarah Johnson scheduled for tomorrow at 2:00 PM.',
      type: 'info',
      category: 'client',
      timestamp: '1 day ago',
      read: false,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: '6',
      title: 'System Maintenance',
      message: 'Scheduled system maintenance will occur on Sunday from 2-4 AM.',
      type: 'announcement',
      category: 'system',
      timestamp: '2 days ago',
      read: true,
      priority: 'low',
      actionRequired: false
    },
    {
      id: '7',
      title: 'Budget Alert',
      message: 'Palm Villa project has exceeded 90% of allocated budget.',
      type: 'warning',
      category: 'financial',
      timestamp: '2 days ago',
      read: false,
      priority: 'high',
      actionRequired: true
    }
  ]

  const categories = [
    'All Categories',
    'Project',
    'Financial',
    'Team',
    'System',
    'Client'
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-success" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning" />
      case 'error': return <AlertTriangle className="h-5 w-5 text-destructive" />
      case 'announcement': return <Star className="h-5 w-5 text-primary" />
      default: return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return <Building2 className="h-4 w-4" />
      case 'financial': return <DollarSign className="h-4 w-4" />
      case 'team': return <Users className="h-4 w-4" />
      case 'client': return <Users className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground'
      case 'medium': return 'bg-warning text-warning-foreground'
      case 'low': return 'bg-success text-success-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'archived' && false) // archived would be a separate array
    const matchesCategory = selectedCategory === 'all' || 
                           notification.category === selectedCategory.toLowerCase()
    return matchesFilter && matchesCategory
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
                  <p className="text-sm text-muted-foreground">Total Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.filter(n => n.actionRequired).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notifications.filter(n => n.priority === 'high').length}
                  </p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? "luxury" : "outline"}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? "luxury" : "outline"}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === 'archived' ? "luxury" : "outline"}
              size="sm"
              onClick={() => setFilter('archived')}
            >
              Archived
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase().replace('all categories', 'all') ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.toLowerCase().replace('all categories', 'all'))}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-luxury transition-all duration-300 ${
                !notification.read ? 'border-primary/30 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="border-warning text-warning">
                            Action Required
                          </Badge>
                        )}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(notification.category)}
                          <span className="capitalize">{notification.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{notification.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Mark Read
                          </Button>
                        )}
                        {notification.actionRequired && (
                          <Button variant="luxury" size="sm">
                            Take Action
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Archive className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BellOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filter criteria."
                }
              </p>
              {filter !== 'all' && (
                <Button variant="luxury" onClick={() => setFilter('all')}>
                  View All Notifications
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Notifications