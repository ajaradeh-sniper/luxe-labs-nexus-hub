import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Pin,
  Archive,
  Trash2,
  Star,
  Paperclip
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  unread: boolean
  avatar?: string
  type: 'text' | 'file' | 'system'
}

interface Conversation {
  id: string
  participant: string
  lastMessage: string
  timestamp: string
  unread: number
  pinned: boolean
  avatar?: string
  status: 'online' | 'offline' | 'away'
  type: 'client' | 'team' | 'partner' | 'system'
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messageText, setMessageText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations: Conversation[] = [
    {
      id: '1',
      participant: 'Ahmed Al-Mansouri',
      lastMessage: 'The Marina Bay project is looking excellent. When can we schedule the final walkthrough?',
      timestamp: '10:30 AM',
      unread: 2,
      pinned: true,
      avatar: '/avatars/ahmed.jpg',
      status: 'online',
      type: 'client'
    },
    {
      id: '2',
      participant: 'Sarah Johnson',
      lastMessage: 'Updated project timeline for Downtown renovation attached',
      timestamp: '9:45 AM',
      unread: 0,
      pinned: false,
      avatar: '/avatars/sarah.jpg',
      status: 'online',
      type: 'team'
    },
    {
      id: '3',
      participant: 'Michael Chen',
      lastMessage: 'Design approval needed for the Palm Villa interiors',
      timestamp: 'Yesterday',
      unread: 1,
      pinned: false,
      avatar: '/avatars/michael.jpg',
      status: 'away',
      type: 'team'
    },
    {
      id: '4',
      participant: 'Elena Rodriguez',
      lastMessage: 'Budget allocation for Q1 2025 projects ready for review',
      timestamp: 'Yesterday',
      unread: 0,
      pinned: false,
      avatar: '/avatars/elena.jpg',
      status: 'offline',
      type: 'team'
    },
    {
      id: '5',
      participant: 'Luxury Contractors LLC',
      lastMessage: 'Material delivery scheduled for next Tuesday',
      timestamp: '2 days ago',
      unread: 0,
      pinned: false,
      status: 'offline',
      type: 'partner'
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Ahmed Al-Mansouri',
      content: 'Good morning! I wanted to follow up on the Marina Bay project progress.',
      timestamp: '9:30 AM',
      unread: false,
      avatar: '/avatars/ahmed.jpg',
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Good morning Ahmed! The project is progressing very well. We\'re currently at 65% completion and on track for the February deadline.',
      timestamp: '9:32 AM',
      unread: false,
      type: 'text'
    },
    {
      id: '3',
      sender: 'Ahmed Al-Mansouri',
      content: 'That\'s fantastic news! The quality of work has been exceptional so far.',
      timestamp: '9:35 AM',
      unread: false,
      avatar: '/avatars/ahmed.jpg',
      type: 'text'
    },
    {
      id: '4',
      sender: 'Ahmed Al-Mansouri',
      content: 'The Marina Bay project is looking excellent. When can we schedule the final walkthrough?',
      timestamp: '10:30 AM',
      unread: true,
      avatar: '/avatars/ahmed.jpg',
      type: 'text'
    },
    {
      id: '5',
      sender: 'Ahmed Al-Mansouri',
      content: 'I\'m particularly impressed with the luxury finishing touches.',
      timestamp: '10:31 AM',
      unread: true,
      avatar: '/avatars/ahmed.jpg',
      type: 'text'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success'
      case 'away': return 'bg-warning'
      case 'offline': return 'bg-muted-foreground'
      default: return 'bg-muted-foreground'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client': return 'bg-primary/10 text-primary border-primary/20'
      case 'team': return 'bg-success/10 text-success border-success/20'
      case 'partner': return 'bg-warning/10 text-warning border-warning/20'
      case 'system': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText)
      setMessageText("")
    }
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <DashboardLayout>
      <div className="p-6 h-[calc(100vh-6rem)]">
        <div className="flex h-full gap-6">
          {/* Conversations Sidebar */}
          <Card className="w-80 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Messages</CardTitle>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="space-y-1 p-3">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} alt={conversation.participant} />
                          <AvatarFallback>
                            {conversation.participant.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(conversation.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-foreground truncate">
                            {conversation.participant}
                          </h3>
                          <div className="flex items-center gap-1">
                            {conversation.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-1">
                          <Badge variant="outline" className={`text-xs ${getTypeColor(conversation.type)}`}>
                            {conversation.type.charAt(0).toUpperCase() + conversation.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConv.avatar} alt={selectedConv.participant} />
                          <AvatarFallback>
                            {selectedConv.participant.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedConv.status)}`} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-foreground">{selectedConv.participant}</h2>
                        <p className="text-sm text-muted-foreground capitalize">{selectedConv.status}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pin className="mr-2 h-4 w-4" />
                            Pin Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${
                          message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          {message.sender !== 'You' && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar} alt={message.sender} />
                              <AvatarFallback>
                                {message.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`rounded-lg p-3 ${
                            message.sender === 'You'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'You'
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 min-h-[40px] max-h-32 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button 
                      variant="luxury" 
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Messages