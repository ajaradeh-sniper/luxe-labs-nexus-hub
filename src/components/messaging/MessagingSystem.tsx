import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Send, Plus, Search, Users, User } from "lucide-react"
import { format, parseISO } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"
import { useAuth } from "@/contexts/AuthContext"

interface Message {
  id: string
  subject?: string
  content: string
  message_type: string
  sender_id: string
  recipient_id?: string
  group_id?: string
  read_at?: string
  created_at: string
  sender_profile?: {
    name: string
    avatar_url?: string
  }
}

interface Profile {
  id: string
  name: string
  avatar_url?: string
  role: string
  user_id: string
}

export function MessagingSystem() {
  const [messages, setMessages] = useState<Message[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState({
    recipient_id: "",
    subject: "",
    content: "",
    message_type: "direct"
  })
  const { user } = useAuth()
  const { toast } = useToast()

  const { execute: loadMessages } = useAsyncOperation(
    async () => {
      if (!user) return { data: null, error: null }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      
      const typedMessages = (data || []).map(msg => ({
        ...msg,
        sender_profile: { name: 'Unknown User', avatar_url: null }
      }))
      
      setMessages(typedMessages as Message[])
      return { data: typedMessages, error: null }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: loadProfiles } = useAsyncOperation(
    async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name')

      if (error) return { data: null, error: error.message }
      
      setProfiles(data || [])
      return { data, error: null }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: sendMessage } = useAsyncOperation(
    async () => {
      if (!user || !newMessage.recipient_id || !newMessage.content.trim()) {
        return { data: null, error: "Please fill in all required fields" }
      }

      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: newMessage.recipient_id,
          subject: newMessage.subject.trim() || null,
          content: newMessage.content.trim(),
          message_type: newMessage.message_type
        })
        .select()

      if (error) return { data: null, error: error.message }

      setIsNewMessageOpen(false)
      setNewMessage({
        recipient_id: "",
        subject: "",
        content: "",
        message_type: "direct"
      })
      loadMessages()
      
      return { data, error: null }
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Message sent successfully",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      }
    }
  )

  const { execute: markAsRead } = useAsyncOperation(
    async (messageId: string) => {
      const { data, error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .eq('recipient_id', user?.id)
        .select()

      if (error) return { data: null, error: error.message }
      
      loadMessages()
      return { data, error: null }
    }
  )

  useEffect(() => {
    if (user) {
      loadMessages()
      loadProfiles()
    }
  }, [user])

  const getConversations = () => {
    const conversations = new Map()
    
    messages.forEach(message => {
      const otherUserId = message.sender_id === user?.id ? message.recipient_id : message.sender_id
      if (!otherUserId) return
      
      if (!conversations.has(otherUserId) || new Date(message.created_at) > new Date(conversations.get(otherUserId).created_at)) {
        conversations.set(otherUserId, message)
      }
    })
    
    return Array.from(conversations.values())
  }

  const getConversationMessages = (conversationUserId: string) => {
    return messages.filter(message => 
      (message.sender_id === user?.id && message.recipient_id === conversationUserId) ||
      (message.sender_id === conversationUserId && message.recipient_id === user?.id)
    ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  }

  const getUserProfile = (userId: string) => {
    return profiles.find(p => p.user_id === userId)
  }

  const conversations = getConversations()
  const selectedMessages = selectedConversation ? getConversationMessages(selectedConversation) : []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with your team and clients</p>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
              <DialogDescription>Send a message to a team member or client</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient *</Label>
                <select
                  id="recipient"
                  value={newMessage.recipient_id}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient_id: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select recipient...</option>
                  {profiles.filter(p => p.user_id !== user?.id).map(profile => (
                    <option key={profile.id} value={profile.user_id}>
                      {profile.name} ({profile.role})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Message subject..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Message *</Label>
                <Textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Type your message here..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => sendMessage()}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations
            </CardTitle>
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
          <CardContent className="p-0">
            <ScrollArea className="h-[450px]">
              {conversations.map((conversation) => {
                const otherUserId = conversation.sender_id === user?.id ? conversation.recipient_id : conversation.sender_id
                const otherUser = getUserProfile(otherUserId!)
                const isUnread = conversation.recipient_id === user?.id && !conversation.read_at
                
                if (!otherUser) return null

                return (
                  <div
                    key={otherUserId}
                    className={`p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                      selectedConversation === otherUserId ? 'bg-accent' : ''
                    }`}
                    onClick={() => {
                      setSelectedConversation(otherUserId!)
                      if (isUnread) {
                        markAsRead(conversation.id)
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={otherUser.avatar_url} />
                        <AvatarFallback>
                          {otherUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{otherUser.name}</h4>
                          {isUnread && (
                            <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(conversation.created_at), "MMM d, HH:mm")}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages View */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const otherUser = getUserProfile(selectedConversation)
                    return otherUser ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={otherUser.avatar_url} />
                          <AvatarFallback>
                            {otherUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {otherUser.name}
                        <Badge variant="secondary">{otherUser.role}</Badge>
                      </>
                    ) : 'Select a conversation'
                  })()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {selectedMessages.map((message) => {
                      const isFromMe = message.sender_id === user?.id
                      const senderProfile = getUserProfile(message.sender_id)
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${isFromMe ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                isFromMe
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {message.subject && (
                                <h5 className="font-medium mb-1">{message.subject}</h5>
                              )}
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 text-right">
                              {format(parseISO(message.created_at), "MMM d, HH:mm")}
                            </p>
                          </div>
                          {!isFromMe && senderProfile && (
                            <Avatar className="h-8 w-8 order-0 mr-2">
                              <AvatarImage src={senderProfile.avatar_url} />
                              <AvatarFallback>
                                {senderProfile.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="flex-1"
                      rows={2}
                    />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Conversation</h3>
              <p className="text-muted-foreground text-center">
                Choose a conversation from the left to start messaging
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      {conversations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start a conversation with your team members or clients
            </p>
            <Button onClick={() => setIsNewMessageOpen(true)}>
              Send First Message
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}