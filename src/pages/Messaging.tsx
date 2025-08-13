import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Star,
  Archive
} from "lucide-react"

export default function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [messageText, setMessageText] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "I'm interested in viewing the Marina Tower apartment this weekend.",
      time: "2:30 PM",
      unread: 2,
      status: "online",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Ahmed Al-Rashid",
      lastMessage: "Can you send me the commercial space floor plans?",
      time: "1:15 PM", 
      unread: 0,
      status: "offline",
      avatar: "AR"
    },
    {
      id: 3,
      name: "Emma Thompson",
      lastMessage: "Thank you for the investment portfolio presentation.",
      time: "11:45 AM",
      unread: 1,
      status: "away",
      avatar: "ET"
    },
    {
      id: 4,
      name: "Project Team",
      lastMessage: "Meeting scheduled for tomorrow at 10 AM",
      time: "Yesterday",
      unread: 0,
      status: "group",
      avatar: "PT",
      isGroup: true
    }
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I saw the listing for the Marina Tower apartment. It looks amazing!",
      time: "2:15 PM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hello Sarah! Thank you for your interest. It's a beautiful 2-bedroom apartment with stunning marina views. Would you like to schedule a viewing?",
      time: "2:18 PM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Johnson", 
      content: "Yes, I'd love to see it. I'm available this weekend. What times work best?",
      time: "2:25 PM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! I have availability on Saturday at 2 PM or Sunday at 11 AM. Which would you prefer?",
      time: "2:27 PM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "I'm interested in viewing the Marina Tower apartment this weekend.",
      time: "2:30 PM",
      isOwn: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success'
      case 'away': return 'bg-warning'
      case 'offline': return 'bg-muted'
      case 'group': return 'bg-primary'
      default: return 'bg-muted'
    }
  }

  const selectedConversationData = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messaging</h1>
          <p className="text-muted-foreground">Communicate with clients and team members</p>
        </div>
        <Button variant="luxury">
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
        {/* Conversations Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>Messages</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors border-b border-border hover:bg-accent/50 ${
                    selectedConversation === conversation.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {conversation.avatar}
                        </span>
                      </div>
                      {!conversation.isGroup && (
                        <div className={`absolute -bottom-0 -right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(conversation.status)}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge className="mt-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          {selectedConversationData && (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {selectedConversationData.avatar}
                        </span>
                      </div>
                      {!selectedConversationData.isGroup && (
                        <div className={`absolute -bottom-0 -right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedConversationData.status)}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversationData.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {selectedConversationData.isGroup ? 'Group' : selectedConversationData.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-medium mb-1">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[40px] max-h-[120px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          // Handle send message
                          setMessageText("")
                        }
                      }}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="luxury" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}