import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface User {
  id: string
  name: string
  role: string
  avatar_url?: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface AppState {
  // User management
  user: User | null
  isAuthenticated: boolean
  
  // UI state
  sidebarCollapsed: boolean
  currentPage: string
  loading: boolean
  
  // Notifications
  notifications: Notification[]
  unreadCount: number
  
  // Real-time features
  onlineUsers: string[]
  
  // Actions
  setUser: (user: User | null) => void
  setAuthenticated: (authenticated: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setCurrentPage: (page: string) => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  setOnlineUsers: (users: string[]) => void
  addOnlineUser: (userId: string) => void
  removeOnlineUser: (userId: string) => void
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    sidebarCollapsed: false,
    currentPage: '/',
    loading: false,
    notifications: [],
    unreadCount: 0,
    onlineUsers: [],

    // Actions
    setUser: (user) => set({ user }),
    
    setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
    
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    
    setCurrentPage: (page) => set({ currentPage: page }),
    
    setLoading: (loading) => set({ loading }),
    
    addNotification: (notification) => {
      const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        read: false
      }
      
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1
      }))
    },
    
    markNotificationRead: (id) => {
      set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }))
    },
    
    clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
    
    setOnlineUsers: (users) => set({ onlineUsers: users }),
    
    addOnlineUser: (userId) => {
      const { onlineUsers } = get()
      if (!onlineUsers.includes(userId)) {
        set({ onlineUsers: [...onlineUsers, userId] })
      }
    },
    
    removeOnlineUser: (userId) => {
      set((state) => ({
        onlineUsers: state.onlineUsers.filter(id => id !== userId)
      }))
    }
  }))
)

// Selectors for optimized re-renders
export const useUser = () => useAppStore((state) => state.user)
export const useAuth = () => useAppStore((state) => ({ 
  isAuthenticated: state.isAuthenticated,
  user: state.user 
}))
export const useNotifications = () => useAppStore((state) => ({
  notifications: state.notifications,
  unreadCount: state.unreadCount
}))
export const useUIState = () => useAppStore((state) => ({
  sidebarCollapsed: state.sidebarCollapsed,
  currentPage: state.currentPage,
  loading: state.loading
}))