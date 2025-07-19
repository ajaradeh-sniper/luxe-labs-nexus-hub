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

  const roleGroups = [
    {
      title: "Leadership & Core Operations",
      roles: [
        { role: 'administrator' as const, label: 'Administrator', description: 'Full system control', icon: Crown },
        { role: 'real_estate_director' as const, label: 'Real Estate Director', description: 'Curate opportunities', icon: Shield },
        { role: 'real_estate_agent' as const, label: 'Real Estate Agent', description: 'Post and close opportunities', icon: User }
      ]
    },
    {
      title: "Execution Roles", 
      roles: [
        { role: 'project_manager' as const, label: 'Project Manager', description: 'Execute renovation plans', icon: Settings },
        { role: 'head_of_design' as const, label: 'Head of Design', description: 'Create and oversee designs', icon: User },
        { role: 'lawyer' as const, label: 'Lawyer', description: 'Handle legal contracts', icon: Shield },
        { role: 'finance_lead' as const, label: 'Finance', description: 'Budgeting, ROI, payments', icon: User },
        { role: 'marketing_lead' as const, label: 'Marketing', description: 'Social, media, communications', icon: User },
        { role: 'vendor_manager' as const, label: 'Vendor Management', description: 'Handle suppliers and contracts', icon: User }
      ]
    },
    {
      title: "External Users",
      roles: [
        { role: 'investor' as const, label: 'Investor', description: 'Apply, invest, track', icon: User },
        { role: 'client' as const, label: 'Client', description: 'Submit project, track delivery', icon: User },
        { role: 'partner' as const, label: 'Partners', description: 'Contractors, Designers, Suppliers', icon: User }
      ]
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
      <CardContent className="space-y-6">
        {roleGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">{group.title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {group.roles.map((roleOption) => {
                const IconComponent = roleOption.icon
                return (
                  <Button
                    key={roleOption.role}
                    variant={user?.role === roleOption.role ? "default" : "outline"}
                    onClick={() => switchRole(roleOption.role)}
                    className="h-auto p-3 flex flex-col gap-1 text-xs"
                  >
                    <IconComponent className="h-4 w-4" />
                    <div className="text-center">
                      <div className="font-medium">{roleOption.label}</div>
                      <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}