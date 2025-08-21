import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  TrendingUp,
  X
} from "lucide-react";
import { ActionKey } from './ActionRouter';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: 'approval' | 'task' | 'invitation' | 'document' | 'opportunity';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    actionKey: ActionKey;
    context?: any;
  };
}

// Mock notifications - in real app, fetch from API
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Project Approval Required',
    description: 'Marina Tower project needs your approval to proceed to execution phase',
    type: 'approval',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    action: {
      label: 'Review Project',
      actionKey: 'start-project',
      context: { projectId: 'marina-tower-1' }
    }
  },
  {
    id: '2',
    title: 'New Opportunity Available',
    description: 'Downtown penthouse opportunity ready for promotion to active project',
    type: 'opportunity',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    action: {
      label: 'Promote Opportunity',
      actionKey: 'promote-opportunity',
      context: { opportunityId: 'downtown-penthouse-1' }
    }
  },
  {
    id: '3',
    title: 'Document Upload Required',
    description: 'Contract signature needed for Palm Jumeirah Villa project',
    type: 'document',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    action: {
      label: 'Upload Document',
      actionKey: 'upload-doc'
    }
  },
  {
    id: '4',
    title: 'Team Invitation Pending',
    description: 'John Smith has been invited to join as Project Manager',
    type: 'invitation',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true
  },
  {
    id: '5',
    title: 'Task Overdue',
    description: 'Budget review task is 2 days overdue',
    type: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: false
  }
];

interface NotificationDrawerProps {
  onAction?: (actionKey: ActionKey, context?: any) => void;
}

export function NotificationDrawer({ onAction }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'approval':
        return CheckCircle;
      case 'task':
        return Clock;
      case 'invitation':
        return User;
      case 'document':
        return FileText;
      case 'opportunity':
        return TrendingUp;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'approval':
        return 'text-green-500';
      case 'task':
        return 'text-yellow-500';
      case 'invitation':
        return 'text-blue-500';
      case 'document':
        return 'text-purple-500';
      case 'opportunity':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleAction = (notification: NotificationItem) => {
    if (notification.action && onAction) {
      onAction(notification.action.actionKey, notification.action.context);
      markAsRead(notification.id);
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </SheetDescription>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 mt-6">
          <div className="space-y-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);

                return (
                  <div key={notification.id}>
                    <div
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        !notification.read 
                          ? 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-full bg-background border ${iconColor}`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium ${
                              !notification.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          
                          {notification.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(notification);
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {index < notifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}