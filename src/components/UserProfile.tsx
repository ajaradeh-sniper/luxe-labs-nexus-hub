import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, Settings, LogOut, Shield, ShieldCheck } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { UserRole } from "@/types/auth"

export function UserProfile() {
  const { user, logout, switchRole } = useAuth()
  
  if (!user) return null

  const roleConfig = {
    administrator: { label: 'Administrator', color: 'bg-red-100 text-red-800', icon: ShieldCheck },
    project_manager: { label: 'Project Manager', color: 'bg-blue-100 text-blue-800', icon: User },
    investor: { label: 'Investor', color: 'bg-green-100 text-green-800', icon: User },
    real_estate_director: { label: 'RE Director', color: 'bg-purple-100 text-purple-800', icon: User }
  } as Record<string, any>

  const currentRole = roleConfig[user.role] || roleConfig.administrator

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={user.avatar} alt="User" />
            <AvatarFallback className="bg-gradient-luxury text-primary-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-background border shadow-md" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt="User" />
                <AvatarFallback className="bg-gradient-luxury text-primary-foreground font-semibold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className={currentRole.color}>
              <currentRole.icon className="h-3 w-3 mr-1" />
              {currentRole.label}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {/* Demo: Role Switching */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role (Demo)</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => switchRole('administrator')}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          <span>Administrator</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole('project_manager')}>
          <User className="mr-2 h-4 w-4" />
          <span>Project Manager</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole('investor')}>
          <User className="mr-2 h-4 w-4" />
          <span>Investor</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}