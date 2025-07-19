import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { User, Info } from "lucide-react"

export function RoleSwitcher() {
  const { user } = useAuth()

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Current User Role
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Your role: <Badge variant="outline">{user.role}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
          <Info className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Welcome, {user.name}!</p>
            <p className="text-xs text-muted-foreground">
              You're logged in as a <strong>{user.role}</strong>. Your permissions are managed by administrators.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}