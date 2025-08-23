import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { 
  UserPlus, 
  Mail,
  Shield,
  Settings,
  Eye,
  Edit,
  Trash,
  Building,
  Users,
  TrendingUp
} from "lucide-react"

const USER_ROLES = [
  {
    id: 'client',
    name: 'Client',
    description: 'Property owners and clients seeking services',
    permissions: ['View projects', 'Communicate with team', 'Access reports'],
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: 'real_estate_agent',
    name: 'Real Estate Agent',
    description: 'Property sales and client management',
    permissions: ['Manage properties', 'Handle client communications', 'Access CRM', 'View analytics'],
    icon: Building,
    color: 'bg-green-500'
  },
  {
    id: 'project_manager',
    name: 'Project Manager',
    description: 'Oversee project execution and team coordination',
    permissions: ['Manage projects', 'Team coordination', 'Budget oversight', 'Timeline management'],
    icon: Settings,
    color: 'bg-orange-500'
  },
  {
    id: 'real_estate_director',
    name: 'Real Estate Director',
    description: 'Senior real estate operations management',
    permissions: ['Strategic oversight', 'Team management', 'Financial oversight', 'Business development'],
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Investment stakeholders and funding partners',
    permissions: ['View opportunities', 'Access portfolio', 'Financial reports', 'Investment tracking'],
    icon: TrendingUp,
    color: 'bg-yellow-500'
  },
  {
    id: 'administrator',
    name: 'Administrator',
    description: 'Full system access and management',
    permissions: ['Full system access', 'User management', 'System configuration', 'All data access'],
    icon: Shield,
    color: 'bg-red-500'
  }
]

interface UserInviteModalProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'invite'
  onSuccess?: () => void
}

export function UserInviteModal({ open, onClose, mode, onSuccess }: UserInviteModalProps) {
  const [step, setStep] = useState<'role' | 'details' | 'confirmation'>('role')
  const [selectedRole, setSelectedRole] = useState<typeof USER_ROLES[0] | null>(null)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    department: '',
    personalMessage: '',
    accessLevel: 'standard',
    permissions: [] as string[]
  })
  
  const { user } = useAuth()
  const { toast } = useToast()

  const handleRoleSelect = (role: typeof USER_ROLES[0]) => {
    setSelectedRole(role)
    setUserData(prev => ({ ...prev, permissions: role.permissions }))
    setStep('details')
  }

  const handleCreateUser = async () => {
    if (!selectedRole || !user) return

    setLoading(true)
    try {
      if (mode === 'invite') {
        // Send invitation email (would use edge function in real implementation)
        
        // Create pending user record
        const { error: inviteError } = await supabase
          .from('contacts')
          .insert({
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.phone,
            company: userData.company,
            contact_type: 'team_member',
            status: 'pending',
            notes: `Role: ${selectedRole.name}\nDepartment: ${userData.department}\nPersonal Message: ${userData.personalMessage}`,
            created_by: user.id
          })

        if (inviteError) throw inviteError

        toast({
          title: "Invitation Sent",
          description: `User invitation has been sent to ${userData.email}`,
        })
      } else {
        // Create user directly (simplified - in real app would create auth user)
        const { error: userError } = await supabase
          .from('profiles')
          .insert({
            user_id: crypto.randomUUID(), // Temporary - would be actual user ID
            name: `${userData.firstName} ${userData.lastName}`,
            role: selectedRole.id
          })

        if (userError) throw userError

        toast({
          title: "User Added",
          description: `${userData.firstName} ${userData.lastName} has been added to the system.`,
        })
      }

      onSuccess?.()
      onClose()
      resetForm()
    } catch (error) {
      console.error('Error creating user:', error)
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep('role')
    setSelectedRole(null)
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      title: '',
      department: '',
      personalMessage: '',
      accessLevel: 'standard',
      permissions: []
    })
  }

  const handleBack = () => {
    if (step === 'details') {
      setStep('role')
    } else if (step === 'confirmation') {
      setStep('details')
    }
  }

  const handleNext = () => {
    if (step === 'details') {
      setStep('confirmation')
    }
  }

  const isDetailsValid = userData.firstName.trim() && userData.lastName.trim() && userData.email.trim()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {mode === 'add' ? 'Add New User' : 'Invite User'}
            {step === 'role' && " - Select Role"}
            {step === 'details' && selectedRole && ` - ${selectedRole.name} Details`}
            {step === 'confirmation' && " - Confirm Details"}
          </DialogTitle>
        </DialogHeader>

        {step === 'role' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {USER_ROLES.map((role) => (
              <Card 
                key={role.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRoleSelect(role)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${role.color} text-white`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription className="text-sm">{role.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Permissions:</p>
                    <div className="space-y-1">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Shield className="h-3 w-3 text-green-500" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 'details' && selectedRole && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={userData.firstName}
                  onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={userData.lastName}
                  onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={userData.company}
                  onChange={(e) => setUserData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={userData.title}
                  onChange={(e) => setUserData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Professional title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={userData.department} onValueChange={(value) => setUserData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="project_management">Project Management</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select value={userData.accessLevel} onValueChange={(value) => setUserData(prev => ({ ...prev, accessLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="elevated">Elevated</SelectItem>
                    <SelectItem value="admin">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {mode === 'invite' && (
              <div className="space-y-2">
                <Label htmlFor="personalMessage">Personal Message</Label>
                <Textarea
                  id="personalMessage"
                  value={userData.personalMessage}
                  onChange={(e) => setUserData(prev => ({ ...prev, personalMessage: e.target.value }))}
                  placeholder="Add a personal welcome message for the invitation..."
                  rows={3}
                />
              </div>
            )}
          </div>
        )}

        {step === 'confirmation' && selectedRole && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedRole.color} text-white`}>
                    <selectedRole.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{userData.firstName} {userData.lastName}</CardTitle>
                    <CardDescription>{selectedRole.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.company || 'No company'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.department || 'No department'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.accessLevel} access</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Role Permissions</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {selectedRole.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {mode === 'invite' && userData.personalMessage && (
                  <div>
                    <Label className="text-sm font-medium">Personal Message</Label>
                    <p className="text-sm text-muted-foreground mt-1">{userData.personalMessage}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <div>
            {step !== 'role' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === 'details' && (
              <Button onClick={handleNext} disabled={!isDetailsValid}>
                Continue
              </Button>
            )}
            {step === 'confirmation' && (
              <Button onClick={handleCreateUser} disabled={loading}>
                {loading ? "Processing..." : mode === 'add' ? "Add User" : "Send Invitation"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}