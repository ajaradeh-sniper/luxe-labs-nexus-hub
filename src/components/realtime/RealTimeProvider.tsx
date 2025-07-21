import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { Users } from 'lucide-react'

interface RealTimeContextType {
  onlineUsers: string[]
  isConnected: boolean
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  sendMessage: (message: any) => void
  messages: any[]
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined)

interface RealTimeProviderProps {
  children: ReactNode
}

export function RealTimeProvider({ children }: RealTimeProviderProps) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [channel, setChannel] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const { toast } = useToast()

  const joinRoom = (roomId: string) => {
    if (currentRoom === roomId) return

    // Leave current room if exists
    if (channel) {
      channel.unsubscribe()
    }

    const newChannel = supabase.channel(`room_${roomId}`)

    // Track user presence
    newChannel
      .on('presence', { event: 'sync' }, () => {
        const state = newChannel.presenceState()
        const users = Object.keys(state)
        setOnlineUsers(users)
        setIsConnected(true)
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setOnlineUsers(prev => [...prev, key])
        toast({
          title: "User joined",
          description: `${key} joined the room`,
        })
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        setOnlineUsers(prev => prev.filter(user => user !== key))
        toast({
          title: "User left",
          description: `${key} left the room`,
        })
      })
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        setMessages(prev => [...prev, payload])
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await newChannel.track({
            user_id: 'anonymous-user',
            online_at: new Date().toISOString(),
          })
        }
      })

    setChannel(newChannel)
    setCurrentRoom(roomId)
  }

  const leaveRoom = () => {
    if (channel) {
      channel.unsubscribe()
      setChannel(null)
      setCurrentRoom(null)
      setOnlineUsers([])
      setIsConnected(false)
      setMessages([])
    }
  }

  const sendMessage = (message: any) => {
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'message',
        payload: {
          ...message,
          timestamp: new Date().toISOString(),
          user_id: 'anonymous-user'
        }
      })
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channel) {
        channel.unsubscribe()
      }
    }
  }, [channel])

  const value = {
    onlineUsers,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
    messages
  }

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  )
}

export function useRealTime() {
  const context = useContext(RealTimeContext)
  if (context === undefined) {
    throw new Error('useRealTime must be used within a RealTimeProvider')
  }
  return context
}

export function RealTimeStatus() {
  const { isConnected } = useRealTime()
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-muted-foreground'}`} />
      <span className="text-sm text-muted-foreground">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  )
}

export function OnlineUsers() {
  const { onlineUsers } = useRealTime()
  return (
    <div className="flex items-center gap-1">
      <Users className="h-3 w-3" />
      <span className="text-sm">{onlineUsers.length} online</span>
    </div>
  )
}