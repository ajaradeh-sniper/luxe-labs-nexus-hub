import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { 
  User,
  Settings,
  Shield,
  Crown
} from "lucide-react"

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  const availableRoles = [
    { 
      role: 'administrator' as const, 
      label: 'Administrator', 
      description: 'Full system access',
      icon: Crown,
      color: 'bg-destructive text-destructive-foreground'
    },
    { 
      role: 'project_manager' as const, 
      label: 'Project Manager', 
      description: 'Project oversight and coordination',
      icon: Settings,
      color: 'bg-primary text-primary-foreground'
    },
    { 
      role: 'investor' as const, 
      label: 'Investor', 
      description: 'Portfolio and ROI access',
      icon: Shield,
      color: 'bg-success text-success-foreground'
    },
    { 
      role: 'client' as const, 
      label: 'Client', 
      description: 'Project view access',
      icon: User,
      color: 'bg-warning text-warning-foreground'
    }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Role Switcher (Demo)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Current role: <Badge variant="outline">{user?.role}</Badge>
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {availableRoles.map((roleOption) => {
            const IconComponent = roleOption.icon
            return (
              <Button
                key={roleOption.role}
                variant={user?.role === roleOption.role ? "default" : "outline"}
                onClick={() => switchRole(roleOption.role)}
                className="h-auto p-4 flex flex-col gap-2"
              >
                <IconComponent className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{roleOption.label}</div>
                  <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}