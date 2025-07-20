import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Smartphone, MessageSquare, Calendar, Building, DollarSign, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"
import { useAuth } from "@/contexts/AuthContext"

interface NotificationPreferences {
  id?: string
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  sms_notifications: boolean
  notification_types: {
    projects: boolean
    properties: boolean
    messages: boolean
    calendar: boolean
    financial: boolean
    system: boolean
  }
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    user_id: "",
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    notification_types: {
      projects: true,
      properties: true,
      messages: true,
      calendar: true,
      financial: true,
      system: true
    }
  })
  const [hasChanges, setHasChanges] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const { execute: loadPreferences } = useAsyncOperation(
    async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setPreferences({
          ...data,
          notification_types: data.notification_types || {
            projects: true,
            properties: true,
            messages: true,
            calendar: true,
            financial: true,
            system: true
          }
        })
      } else {
        // Set default preferences if none exist
        setPreferences(prev => ({ ...prev, user_id: user.id }))
      }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load notification preferences",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: savePreferences } = useAsyncOperation(
    async () => {
      if (!user) return

      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          email_notifications: preferences.email_notifications,
          push_notifications: preferences.push_notifications,
          sms_notifications: preferences.sms_notifications,
          notification_types: preferences.notification_types
        }, {
          onConflict: 'user_id'
        })

      if (error) throw error
      setHasChanges(false)
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Notification preferences updated successfully",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    }
  )

  useEffect(() => {
    if (user) {
      loadPreferences()
    }
  }, [user])

  const updatePreference = (key: keyof NotificationPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateNotificationType = (type: keyof typeof preferences.notification_types, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notification_types: {
        ...prev.notification_types,
        [type]: value
      }
    }))
    setHasChanges(true)
  }

  const notificationCategories = [
    {
      key: 'projects' as const,
      label: 'Project Updates',
      description: 'Notifications about project milestones, deadlines, and status changes',
      icon: Building
    },
    {
      key: 'properties' as const,
      label: 'Property Alerts',
      description: 'New listings, price changes, and property status updates',
      icon: Building
    },
    {
      key: 'messages' as const,
      label: 'Messages',
      description: 'New messages from team members and clients',
      icon: MessageSquare
    },
    {
      key: 'calendar' as const,
      label: 'Calendar Events',
      description: 'Meeting reminders, viewing appointments, and deadlines',
      icon: Calendar
    },
    {
      key: 'financial' as const,
      label: 'Financial Reports',
      description: 'ROI updates, payment reminders, and financial analysis reports',
      icon: DollarSign
    },
    {
      key: 'system' as const,
      label: 'System Notifications',
      description: 'System maintenance, updates, and important announcements',
      icon: AlertTriangle
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Settings</h2>
          <p className="text-muted-foreground">Customize how and when you receive notifications</p>
        </div>
        {hasChanges && (
          <Button onClick={() => savePreferences()}>
            Save Changes
          </Button>
        )}
      </div>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              id="email"
              checked={preferences.email_notifications}
              onCheckedChange={(checked) => updatePreference('email_notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="push">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
              </div>
            </div>
            <Switch
              id="push"
              checked={preferences.push_notifications}
              onCheckedChange={(checked) => updatePreference('push_notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="sms">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                <Badge variant="secondary" className="mt-1">Coming Soon</Badge>
              </div>
            </div>
            <Switch
              id="sms"
              checked={preferences.sms_notifications}
              onCheckedChange={(checked) => updatePreference('sms_notifications', checked)}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>
            Control which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationCategories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor={category.key}>{category.label}</Label>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <Switch
                  id={category.key}
                  checked={preferences.notification_types[category.key]}
                  onCheckedChange={(checked) => updateNotificationType(category.key, checked)}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Quickly enable or disable all notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                updatePreference('email_notifications', true)
                updatePreference('push_notifications', true)
                Object.keys(preferences.notification_types).forEach(key => {
                  updateNotificationType(key as keyof typeof preferences.notification_types, true)
                })
              }}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                updatePreference('email_notifications', false)
                updatePreference('push_notifications', false)
                Object.keys(preferences.notification_types).forEach(key => {
                  updateNotificationType(key as keyof typeof preferences.notification_types, false)
                })
              }}
            >
              Disable All
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                updatePreference('email_notifications', true)
                updatePreference('push_notifications', true)
                updatePreference('sms_notifications', false)
                updateNotificationType('projects', true)
                updateNotificationType('properties', true)
                updateNotificationType('messages', true)
                updateNotificationType('calendar', true)
                updateNotificationType('financial', true)
                updateNotificationType('system', false)
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
          <CardDescription>
            Send yourself a test notification to see how they appear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Test Notification",
                  description: "This is how your notifications will appear",
                })
              }}
            >
              Test Push Notification
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Email Test",
                  description: "A test email would be sent to your registered email address",
                })
              }}
            >
              Test Email Notification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}