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
import { User, Settings, LogOut, Shield } from "lucide-react"

type UserRole = 'admin' | 'employee' | 'investor' | 'partner'

export function UserProfile() {
  const [userRole] = useState<UserRole>('admin') // This would come from auth context
  
  const roleConfig = {
    admin: { label: 'Administrator', color: 'bg-primary text-primary-foreground', icon: Shield },
    employee: { label: 'Employee', color: 'bg-blue-500 text-white', icon: User },
    investor: { label: 'Investor', color: 'bg-success text-success-foreground', icon: User },
    partner: { label: 'Partner', color: 'bg-warning text-warning-foreground', icon: User }
  }

  const currentRole = roleConfig[userRole]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-luxury text-primary-foreground font-semibold">
              AL
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-luxury text-primary-foreground font-semibold text-lg">
                  AL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">Ahmed Al-Mansouri</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  ahmed@luxurylabs.ae
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
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}