import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Circle, Users } from 'lucide-react';

interface RealTimeContextType {
  isConnected: boolean;
  onlineUsers: number;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

export function useRealTime(): RealTimeContextType {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}

interface RealTimeProviderProps {
  children: React.ReactNode;
}

export function RealTimeProvider({ children }: RealTimeProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    setConnectionStatus('connecting');

    // Set up presence channel for online users
    const presenceChannel = supabase.channel('online_users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const users = Object.keys(state).length;
        setOnlineUsers(users);
        setIsConnected(true);
        setConnectionStatus('connected');
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Set up database changes channel
    const dbChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'projects',
        },
        (payload) => {
          toast({
            title: 'New Project Created',
            description: `Project "${payload.new.name}" has been added`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'properties',
        },
        (payload) => {
          toast({
            title: 'New Property Listed',
            description: `Property "${payload.new.title}" has been added`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'opportunities',
        },
        (payload) => {
          toast({
            title: 'New Opportunity',
            description: `Opportunity "${payload.new.title}" has been added`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(presenceChannel);
      supabase.removeChannel(dbChannel);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [user, toast]);

  return (
    <RealTimeContext.Provider value={{ isConnected, onlineUsers, connectionStatus }}>
      {children}
    </RealTimeContext.Provider>
  );
}

export function RealTimeStatus() {
  const { isConnected, connectionStatus } = useRealTime();

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Circle className={`h-2 w-2 fill-current ${getStatusColor()}`} />
      <span className="text-sm text-muted-foreground">{getStatusText()}</span>
    </div>
  );
}

export function OnlineUsers() {
  const { onlineUsers } = useRealTime();

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Users className="h-3 w-3" />
      <span>{onlineUsers} online</span>
    </Badge>
  );
}