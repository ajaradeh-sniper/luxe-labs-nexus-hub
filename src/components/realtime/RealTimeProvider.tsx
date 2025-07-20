import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAppStore } from '@/store/useAppStore'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

interface RealTimeContextType {
  isConnected: boolean
  onlineUsers: string[]
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined)

export function useRealTime() {
  const context = useContext(RealTimeContext)
  if (!context) {
    throw new Error('useRealTime must be used within RealTimeProvider')
  }
  return context
}

interface RealTimeProviderProps {
  children: React.ReactNode
}

export function RealTimeProvider({ children }: RealTimeProviderProps) {
  const { user } = useAuth()
  const { addNotification, setOnlineUsers, addOnlineUser, removeOnlineUser } = useAppStore()
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected')

  useEffect(() => {
    if (!user) return

    setConnectionStatus('connecting')

    // Create a presence channel for real-time user tracking
    const channel = supabase.channel('online_users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    })

    // Track user presence
    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const onlineUsers = Object.keys(presenceState)
        setOnlineUsers(onlineUsers)
        setIsConnected(true)
        setConnectionStatus('connected')
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        addOnlineUser(key)
        console.log('User joined:', key, newPresences)
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        removeOnlineUser(key)
        console.log('User left:', key, leftPresences)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          })
        }
      })

    // Listen to database changes for real-time notifications
    const projectsChannel = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            addNotification({
              title: 'New Project Created',
              message: `Project "${payload.new.name}" has been created`,
              type: 'info',
              read: false
            })
          } else if (payload.eventType === 'UPDATE') {
            addNotification({
              title: 'Project Updated',
              message: `Project "${payload.new.name}" has been updated`,
              type: 'info',
              read: false
            })
          }
        }
      )
      .subscribe()

    const propertiesChannel = supabase
      .channel('properties_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            addNotification({
              title: 'New Property Added',
              message: `Property "${payload.new.title}" has been added`,
              type: 'success',
              read: false
            })
          }
        }
      )
      .subscribe()

    // Handle connection errors
    const handleError = (error: any) => {
      console.error('Real-time connection error:', error)
      setConnectionStatus('error')
      setIsConnected(false)
      toast({
        title: "Connection Error",
        description: "Real-time features may not work properly",
        variant: "destructive"
      })
    }

    // Cleanup function
    return () => {
      channel.unsubscribe()
      projectsChannel.unsubscribe()
      propertiesChannel.unsubscribe()
      setIsConnected(false)
      setConnectionStatus('disconnected')
    }
  }, [user, addNotification, setOnlineUsers, addOnlineUser, removeOnlineUser])

  const value = {
    isConnected,
    onlineUsers: useAppStore((state) => state.onlineUsers),
    connectionStatus
  }

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  )
}

// Real-time status indicator component
export function RealTimeStatus() {
  const { isConnected, connectionStatus } = useRealTime()

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-success'
      case 'connecting': return 'bg-warning'
      case 'error': return 'bg-destructive'
      default: return 'bg-muted'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected'
      case 'connecting': return 'Connecting...'
      case 'error': return 'Connection Error'
      default: return 'Disconnected'
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
      <span>{getStatusText()}</span>
    </div>
  )
}

// Online users display component
export function OnlineUsers() {
  const { onlineUsers } = useRealTime()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Online: {onlineUsers.length}
      </span>
      <div className="flex -space-x-2">
        {onlineUsers.slice(0, 5).map((userId, index) => (
          <div
            key={userId}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium border-2 border-background"
            title={`User ${userId}`}
          >
            {index + 1}
          </div>
        ))}
        {onlineUsers.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium border-2 border-background">
            +{onlineUsers.length - 5}
          </div>
        )}
      </div>
    </div>
  )
}