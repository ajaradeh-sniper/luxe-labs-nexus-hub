import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useRealTime } from '@/components/realtime/RealTimeProvider'
import { 
  Users,
  MessageSquare,
  Wifi,
  WifiOff,
  Send,
  Circle
} from 'lucide-react'

export function RealTimeFeatures() {
  const { onlineUsers, isConnected, joinRoom, leaveRoom, sendMessage, messages } = useRealTime()
  const [currentRoom, setCurrentRoom] = useState<string>('')
  const [messageText, setMessageText] = useState('')

  const handleJoinRoom = () => {
    if (currentRoom.trim()) {
      joinRoom(currentRoom)
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage({
        text: messageText,
        type: 'chat'
      })
      setMessageText('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Real-Time Collaboration</h2>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge className="bg-success/10 text-success border-success/20">
              <Circle className="w-2 h-2 mr-1 fill-current" />
              Connected
            </Badge>
          ) : (
            <Badge variant="outline">
              <Circle className="w-2 h-2 mr-1" />
              Disconnected
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConnected ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
              Room Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter room ID..."
                value={currentRoom}
                onChange={(e) => setCurrentRoom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleJoinRoom} 
                  disabled={!currentRoom.trim()}
                  className="flex-1"
                >
                  Join Room
                </Button>
                <Button 
                  variant="outline" 
                  onClick={leaveRoom}
                  disabled={!isConnected}
                >
                  Leave
                </Button>
              </div>
            </div>
            {isConnected && (
              <div className="text-sm text-muted-foreground">
                Connected to room: <span className="font-medium">{currentRoom}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Online Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Online Users ({onlineUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {onlineUsers.length > 0 ? (
                onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Circle className="w-2 h-2 fill-success text-success" />
                    <span className="text-sm">{user}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No users online
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 border border-border rounded-lg p-3 overflow-y-auto bg-muted/10">
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-primary">{message.user_id}:</span>
                      <span className="ml-2">{message.text}</span>
                      <div className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-muted-foreground">No messages yet</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!isConnected || !messageText.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Data Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Data Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Property Updates</h4>
              <p className="text-sm text-muted-foreground">
                Real-time notifications when properties are added, updated, or sold
              </p>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Project Progress</h4>
              <p className="text-sm text-muted-foreground">
                Live updates on project milestones and completion status
              </p>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium mb-2">Market Changes</h4>
              <p className="text-sm text-muted-foreground">
                Instant alerts on market trends and investment opportunities
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}