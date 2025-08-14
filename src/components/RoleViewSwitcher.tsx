import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, User, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface RoleViewSwitcherProps {
  onRoleChange: (role: string) => void
  currentRole: string
}

export function RoleViewSwitcher({ onRoleChange, currentRole }: RoleViewSwitcherProps) {
  const { user } = useAuth()
  
  const availableRoles = [
    { 
      value: "administrator", 
      label: "Administrator", 
      description: "Full system overview and management capabilities",
      color: "bg-red-500/10 text-red-500 border-red-500/20"
    },
    { 
      value: "project_manager", 
      label: "Project Manager", 
      description: "Project tracking, team coordination, and timeline management",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    { 
      value: "investor", 
      label: "Investor", 
      description: "Portfolio tracking, ROI analysis, and financial reports",
      color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    { 
      value: "real_estate_director", 
      label: "Real Estate Director", 
      description: "Property management, market analysis, and opportunity tracking",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    { 
      value: "client", 
      label: "Client", 
      description: "Project progress tracking and communication tools",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20"
    },
    { 
      value: "real_estate_agent", 
      label: "Real Estate Agent", 
      description: "Property listings, client management, and sales tracking",
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
    }
  ]

  const currentRoleInfo = availableRoles.find(role => role.value === currentRole)
  const isViewingAsOtherRole = currentRole !== user?.role

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Role View Switcher
          {isViewingAsOtherRole && (
            <Badge variant="outline" className="ml-2">
              Viewing as: {currentRoleInfo?.label}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Current Role:</span>
            <Badge className="capitalize">
              {user?.role?.replace('_', ' ')}
            </Badge>
          </div>
          {isViewingAsOtherRole && (
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Viewing As:</span>
              <Badge className={currentRoleInfo?.color}>
                {currentRoleInfo?.label}
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Role View:</label>
            <Select value={currentRole} onValueChange={onRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role view" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${role.color.split(' ')[0]} ${role.color.split(' ')[1]}`} />
                      {role.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Role Description:</label>
            <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
              {currentRoleInfo?.description}
            </p>
          </div>
        </div>

        {isViewingAsOtherRole && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-warning font-medium">
              Preview Mode: You are viewing the dashboard as a {currentRoleInfo?.label.toLowerCase()}. 
              This helps you understand the user experience for different roles.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={() => onRoleChange(user?.role || 'administrator')}
            >
              Return to My View
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}