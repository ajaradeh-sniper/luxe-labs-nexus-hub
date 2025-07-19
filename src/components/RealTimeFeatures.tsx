import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Wifi, 
  Users, 
  MessageCircle, 
  Bell, 
  Activity, 
  Zap,
  Eye,
  Clock
} from "lucide-react"

interface RealTimeUpdate {
  id: string
  type: 'message' | 'activity' | 'notification' | 'system'
  title: string
  message: string
  timestamp: Date
  user?: string
  read: boolean
}

const RealTimeFeatures = () => {
  const [isConnected, setIsConnected] = useState(true)
  const [activeUsers, setActiveUsers] = useState(12)
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([
    {
      id: "1",
      type: "message",
      title: "New Team Message",
      message: "Elena Rodriguez posted in Marina Bay project channel",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      user: "Elena Rodriguez",
      read: false
    },
    {
      id: "2",
      type: "activity",
      title: "Project Update",
      message: "Marina Bay project progress updated to 67%",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      user: "System",
      read: false
    },
    {
      id: "3",
      type: "notification",
      title: "Document Approved",
      message: "Design blueprints approved by Michael Chen",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      user: "Michael Chen",
      read: true
    }
  ])

  const [onlineUsers] = useState([
    { name: "Elena Rodriguez", role: "Project Manager", status: "active" },
    { name: "Michael Chen", role: "Lead Designer", status: "active" },
    { name: "Sarah Johnson", role: "Operations Manager", status: "idle" },
    { name: "David Kim", role: "Financial Analyst", status: "active" },
    { name: "Fatima Al-Zahra", role: "Legal Advisor", status: "busy" }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updateTypes = ['message', 'activity', 'notification', 'system'] as const
      const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)]
      
      const newUpdate: RealTimeUpdate = {
        id: Date.now().toString(),
        type: randomType,
        title: getRandomTitle(randomType),
        message: getRandomMessage(randomType),
        timestamp: new Date(),
        user: getRandomUser(),
        read: false
      }

      setUpdates(prev => [newUpdate, ...prev.slice(0, 19)]) // Keep last 20 updates
      
      // Simulate connection status changes
      if (Math.random() > 0.95) {
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 2000)
      }

      // Simulate active user count changes
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const getRandomTitle = (type: RealTimeUpdate['type']) => {
    const titles = {
      message: ["New Team Message", "Direct Message", "Channel Update"],
      activity: ["Project Update", "Task Completed", "Milestone Reached"],
      notification: ["Document Approved", "Meeting Scheduled", "Deadline Reminder"],
      system: ["Backup Completed", "System Update", "Workflow Triggered"]
    }
    const typeTitle = titles[type]
    return typeTitle[Math.floor(Math.random() * typeTitle.length)]
  }

  const getRandomMessage = (type: RealTimeUpdate['type']) => {
    const messages = {
      message: ["New message in project channel", "Direct message received", "Team announcement posted"],
      activity: ["Project progress updated", "New task assigned", "Document uploaded"],
      notification: ["Approval request pending", "Meeting in 30 minutes", "Review deadline approaching"],
      system: ["Automated backup completed", "System maintenance scheduled", "New workflow executed"]
    }
    const typeMessages = messages[type]
    return typeMessages[Math.floor(Math.random() * typeMessages.length)]
  }

  const getRandomUser = () => {
    const users = ["Elena Rodriguez", "Michael Chen", "Sarah Johnson", "David Kim", "System"]
    return users[Math.floor(Math.random() * users.length)]
  }

  const getUpdateIcon = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'message': return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'activity': return <Activity className="h-4 w-4 text-primary" />
      case 'notification': return <Bell className="h-4 w-4 text-warning" />
      case 'system': return <Zap className="h-4 w-4 text-success" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success'
      case 'idle': return 'bg-warning' 
      case 'busy': return 'bg-destructive'
      default: return 'bg-muted-foreground'
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    return timestamp.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'} ${isConnected ? 'animate-pulse' : ''}`} />
              <span className="font-medium">
                {isConnected ? 'Connected' : 'Reconnecting...'}
              </span>
              <Badge variant="secondary">
                <Wifi className="mr-1 h-3 w-3" />
                Real-time
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{activeUsers} online</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{updates.filter(u => !u.read).length} unread</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-Time Updates Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Updates
              </CardTitle>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {updates.map((update) => (
                <div 
                  key={update.id} 
                  className={`p-3 border border-border rounded-lg transition-colors ${
                    !update.read ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium">{update.title}</h3>
                        {!update.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{update.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{update.user}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(update.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="relative">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last activity sync:</span>
                <span className="font-medium">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RealTimeFeatures