import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, Search, Send, Plus, Users, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRealTime, RealTimeStatus } from "@/components/realtime/RealTimeProvider"

interface MessagingCenterProps {
  open: boolean
  onClose: () => void
}

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  subject?: string
  created_at: string
  read_at?: string
  sender?: { name: string; avatar_url?: string }
  recipient?: { name: string; avatar_url?: string }
}

interface Conversation {
  user_id: string
  user_name: string
  avatar_url?: string
  last_message: string
  last_message_time: string
  unread_count: number
}

export function MessagingCenter({ open, onClose }: MessagingCenterProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const { joinRoom, leaveRoom, sendMessage: sendRealtimeMessage, messages: realtimeMessages } = useRealTime()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [newConversationUser, setNewConversationUser] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && user) {
      loadConversations()
      joinRoom(`user_${user.id}`)
    }
    return () => {
      leaveRoom()
    }
  }, [open, user])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation)
    }
  }, [selectedConversation])

  // Handle realtime messages
  useEffect(() => {
    realtimeMessages.forEach(msg => {
      if (msg.type === 'new_message') {
        setMessages(prev => [...prev, msg.data])
        loadConversations() // Refresh conversations
      }
    })
  }, [realtimeMessages])

  const loadConversations = async () => {
    try {
      // Simplified query without complex joins for now
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user?.id},recipient_id.eq.${user?.id}`)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Group messages by conversation partner with mock user data
      const conversationMap = new Map<string, Conversation>()
      
      data?.forEach(msg => {
        const partnerId = msg.sender_id === user?.id ? msg.recipient_id : msg.sender_id
        
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            user_id: partnerId,
            user_name: `User ${partnerId.slice(0, 8)}`, // Mock name
            avatar_url: undefined,
            last_message: msg.content,
            last_message_time: msg.created_at,
            unread_count: 0
          })
        }
      })

      setConversations(Array.from(conversationMap.values()))
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const loadMessages = async (partnerId: string) => {
    try {
      // Simplified query without joins
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user?.id},recipient_id.eq.${partnerId}),and(sender_id.eq.${partnerId},recipient_id.eq.${user?.id})`)
        .order('created_at', { ascending: true })

      if (error) throw error
      
      // Transform data to match expected Message interface
      const transformedMessages = (data || []).map(msg => ({
        ...msg,
        sender: { name: `User ${msg.sender_id.slice(0, 8)}`, avatar_url: undefined },
        recipient: { name: `User ${msg.recipient_id.slice(0, 8)}`, avatar_url: undefined }
      }))
      
      setMessages(transformedMessages)

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('recipient_id', user?.id)
        .eq('sender_id', partnerId)
        .is('read_at', null)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return

    setLoading(true)
    try {
      const messageData = {
        sender_id: user.id,
        recipient_id: selectedConversation,
        content: newMessage.trim(),
        message_type: 'direct'
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single()

      if (error) throw error

      // Send realtime notification
      sendRealtimeMessage({
        type: 'new_message',
        data: { ...data, sender: { name: user.email } }
      })

      setNewMessage("")
      loadMessages(selectedConversation)
      loadConversations()

      toast({
        title: "Message sent",
        description: "Your message has been delivered"
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const startNewConversation = async () => {
    if (!newConversationUser.trim()) return

    try {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('user_id, name')
        .ilike('name', `%${newConversationUser}%`)
        .limit(1)

      if (error) throw error
      if (!users || users.length === 0) {
        toast({
          title: "User not found",
          description: "No user found with that name",
          variant: "destructive"
        })
        return
      }

      setSelectedConversation(users[0].user_id)
      setNewConversationUser("")
    } catch (error) {
      console.error('Error finding user:', error)
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messaging Center
            <RealTimeStatus />
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex h-[70vh]">
          {/* Conversations List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Start new conversation..."
                  value={newConversationUser}
                  onChange={(e) => setNewConversationUser(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startNewConversation()}
                />
                <Button size="icon" onClick={startNewConversation}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-full">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.user_id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                    selectedConversation === conv.user_id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conv.user_id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conv.avatar_url} />
                      <AvatarFallback>{conv.user_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conv.user_name}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conv.last_message_time).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.last_message}</p>
                    </div>
                    {conv.unread_count > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                        {conv.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <ScrollArea className="flex-1 p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${
                        msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender_id === user?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 opacity-50" />
                          <span className="text-xs opacity-50">
                            {new Date(msg.created_at).toLocaleTimeString()}
                          </span>
                          {msg.sender_id === user?.id && msg.read_at && (
                            <span className="text-xs opacity-50">Read</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      className="flex-1 min-h-[60px]"
                    />
                    <Button onClick={sendMessage} disabled={loading || !newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}