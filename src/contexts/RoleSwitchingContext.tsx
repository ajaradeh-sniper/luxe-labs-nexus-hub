import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

interface RoleSwitchingContextType {
  viewingRole: string
  setViewingRole: (role: string) => void
  isViewingAsOtherRole: boolean
  resetToUserRole: () => void
}

const RoleSwitchingContext = createContext<RoleSwitchingContextType | null>(null)

interface RoleSwitchingProviderProps {
  children: React.ReactNode
}

export function RoleSwitchingProvider({ children }: RoleSwitchingProviderProps) {
  const { user } = useAuth()
  const [viewingRole, setViewingRoleState] = useState<string>(user?.role || 'administrator')

  // Sync with user role when it changes
  useEffect(() => {
    if (user?.role) {
      const storedRole = sessionStorage.getItem('viewingRole')
      // Only use stored role if user is administrator (has permission to switch roles)
      if (user.role === 'administrator' && storedRole) {
        setViewingRoleState(storedRole)
      } else {
        setViewingRoleState(user.role)
      }
    }
  }, [user?.role])

  const setViewingRole = (role: string) => {
    setViewingRoleState(role)
    // Persist role switching state for administrators
    if (user?.role === 'administrator') {
      sessionStorage.setItem('viewingRole', role)
    }
  }

  const resetToUserRole = () => {
    if (user?.role) {
      setViewingRole(user.role)
      sessionStorage.removeItem('viewingRole')
    }
  }

  const isViewingAsOtherRole = user?.role !== viewingRole

  return (
    <RoleSwitchingContext.Provider 
      value={{ 
        viewingRole, 
        setViewingRole, 
        isViewingAsOtherRole, 
        resetToUserRole 
      }}
    >
      {children}
    </RoleSwitchingContext.Provider>
  )
}

export function useRoleSwitching(): RoleSwitchingContextType {
  const context = useContext(RoleSwitchingContext)
  if (!context) {
    throw new Error('useRoleSwitching must be used within a RoleSwitchingProvider')
  }
  return context
}