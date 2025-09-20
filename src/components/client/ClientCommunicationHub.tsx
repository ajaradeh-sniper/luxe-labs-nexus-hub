import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar, 
  Paperclip, 
  Send, 
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Settings,
  Archive,
  Pin
} from "lucide-react"

interface Message {
  id: number
  sender: {
    name: string
    role: string
    avatar: string
    isOnline: boolean
  }
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image' | 'urgent'
  attachments?: Array<{
    name: string
    type: string
    url: string
  }>
  isRead: boolean
  priority: 'normal' | 'high' | 'urgent'
}

interface Conversation {
  id: number
  project: string
  participants: Array<{
    name: string
    role: string
    avatar: string
    isOnline: boolean
  }>
  lastMessage: string
  timestamp: string
  unreadCount: number
  isPinned: boolean
  status: 'active' | 'archived'
}

export function ClientCommunicationHub() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations: Conversation[] = [
    {
      id: 1,
      project: "Downtown Apartment Renovation",
      participants: [
        { name: "Sarah Johnson", role: "Project Manager", avatar: "/avatars/sarah.jpg", isOnline: true },
        { name: "Mike Chen", role: "Head of Design", avatar: "/avatars/mike.jpg", isOnline: false },
        { name: "Ahmed Al-Rashid", role: "Finance Lead", avatar: "/avatars/ahmed.jpg", isOnline: true }
      ],
      lastMessage: "Kitchen installation photos are ready for your review",
      timestamp: "2 min ago",
      unreadCount: 2,
      isPinned: true,
      status: "active"
    },
    {
      id: 2,
      project: "Business Bay Office Design",
      participants: [
        { name: "Emma Wilson", role: "Design Director", avatar: "/avatars/emma.jpg", isOnline: true },
        { name: "David Park", role: "3D Visualization", avatar: "/avatars/david.jpg", isOnline: false }
      ],
      lastMessage: "Updated 3D renders with your requested changes",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isPinned: false,
      status: "active"
    }
  ]

  const messages: Message[] = [
    {
      id: 1,
      sender: { name: "Sarah Johnson", role: "Project Manager", avatar: "/avatars/sarah.jpg", isOnline: true },
      content: "Good morning! The kitchen installation team arrived early today and made excellent progress. All cabinet frames are now in place.",
      timestamp: "9:15 AM",
      type: "text",
      isRead: true,
      priority: "normal"
    },
    {
      id: 2,
      sender: { name: "You", role: "Client", avatar: "/avatars/client.jpg", isOnline: true },
      content: "That's great news! How are we tracking against the timeline?",
      timestamp: "9:20 AM",
      type: "text",
      isRead: true,
      priority: "normal"
    },
    {
      id: 3,
      sender: { name: "Sarah Johnson", role: "Project Manager", avatar: "/avatars/sarah.jpg", isOnline: true },
      content: "We're actually ahead of schedule! The countertop installation is planned for tomorrow instead of Friday. I've attached some progress photos for your review.",
      timestamp: "9:25 AM",
      type: "image",
      attachments: [
        { name: "kitchen_progress_1.jpg", type: "image", url: "/photos/kitchen1.jpg" },
        { name: "kitchen_progress_2.jpg", type: "image", url: "/photos/kitchen2.jpg" },
        { name: "kitchen_progress_3.jpg", type: "image", url: "/photos/kitchen3.jpg" }
      ],
      isRead: false,
      priority: "normal"
    },
    {
      id: 4,
      sender: { name: "Mike Chen", role: "Head of Design", avatar: "/avatars/mike.jpg", isOnline: false },
      content: "The backsplash tiles have arrived and they look stunning! Would you like to schedule a quick video call to see them before installation?",
      timestamp: "10:30 AM",
      type: "text",
      isRead: false,
      priority: "high"
    }
  ]

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message would go here
      console.log('Sending message:', newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500'
      case 'high': return 'border-l-amber-500'
      default: return 'border-l-blue-500'
    }
  }

  const formatTime = (timestamp: string) => {
    // Simple time formatting - in real app would use proper date library
    return timestamp
  }

  return (
    <div className="h-[800px] flex gap-6">
      {/* Conversations Sidebar */}
      <div className="w-1/3 space-y-4">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  All
                </Button>
                <Button variant="outline" size="sm">
                  <Pin className="h-4 w-4 mr-2" />
                  Pinned
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archived
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations List */}
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Card 
              key={conversation.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeConversation === conversation.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{conversation.project}</h3>
                        {conversation.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs mt-1">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {conversation.participants.slice(0, 3).map((participant, index) => (
                      <div key={index} className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="text-xs bg-gradient-luxury text-primary-foreground">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {participant.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-emerald-500 rounded-full border border-white" />
                        )}
                      </div>
                    ))}
                    {conversation.participants.length > 3 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{conversation.participants.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {conversations.find(c => c.id === activeConversation)?.participants.slice(0, 2).map((participant, index) => (
                        <Avatar key={index} className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="text-xs bg-gradient-luxury text-primary-foreground">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {conversations.find(c => c.id === activeConversation)?.project}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {conversations.find(c => c.id === activeConversation)?.participants.length} participants
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages Area */}
            <Card className="flex-1 flex flex-col">
              <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex gap-3 ${message.sender.name === 'You' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback className="text-xs bg-gradient-luxury text-primary-foreground">
                        {message.sender.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-[70%] ${message.sender.name === 'You' ? 'items-end' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{message.sender.name}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        {message.priority === 'high' && <Star className="h-3 w-3 text-amber-500" />}
                        {message.priority === 'urgent' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                      </div>
                      
                      <div 
                        className={`p-3 rounded-lg border-l-2 ${getPriorityColor(message.priority)} ${
                          message.sender.name === 'You' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-background/10 rounded border">
                                <Paperclip className="h-4 w-4" />
                                <span className="text-xs flex-1">{attachment.name}</span>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  View
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {!message.isRead && message.sender.name !== 'You' && (
                        <p className="text-xs text-blue-600 mt-1">New</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[40px] resize-none"
                      rows={1}
                    />
                  </div>
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Mark as priority
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule send
                  </Button>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <Card className="flex-1">
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Select a conversation</p>
                <p className="text-muted-foreground">Choose a project conversation to start messaging</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}