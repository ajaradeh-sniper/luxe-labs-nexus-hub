import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  UserPlus,
  Mail,
  Phone,
  Building2,
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamInviteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface InviteData {
  email: string
  firstName: string
  lastName: string
  role: string
  department: string
  phone: string
  message: string
  permissions: string[]
}

export function TeamInvite({ open, onOpenChange }: TeamInviteProps) {
  const [inviteType, setInviteType] = useState<'single' | 'bulk'>('single')
  const [inviteData, setInviteData] = useState<InviteData>({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    department: "",
    phone: "",
    message: "",
    permissions: []
  })
  const [bulkEmails, setBulkEmails] = useState<string>("")
  const { toast } = useToast()

  const roles = [
    { value: "project_manager", label: "Project Manager" },
    { value: "designer", label: "Designer" },
    { value: "financial_analyst", label: "Financial Analyst" },
    { value: "legal_advisor", label: "Legal Advisor" },
    { value: "operations_manager", label: "Operations Manager" },
    { value: "consultant", label: "Consultant" },
    { value: "contractor", label: "Contractor" }
  ]

  const departments = [
    { value: "management", label: "Management" },
    { value: "operations", label: "Operations" },
    { value: "design", label: "Design" },
    { value: "finance", label: "Finance" },
    { value: "legal", label: "Legal" },
    { value: "marketing", label: "Marketing" },
    { value: "external", label: "External Partners" }
  ]

  const availablePermissions = [
    { id: "view_projects", label: "View Projects", description: "Can view project details and status" },
    { id: "edit_projects", label: "Edit Projects", description: "Can modify project information" },
    { id: "view_financial", label: "View Financial", description: "Can access financial reports and data" },
    { id: "edit_financial", label: "Edit Financial", description: "Can modify financial information" },
    { id: "view_documents", label: "View Documents", description: "Can access and download documents" },
    { id: "upload_documents", label: "Upload Documents", description: "Can upload and manage documents" },
    { id: "view_team", label: "View Team", description: "Can see team member information" },
    { id: "manage_team", label: "Manage Team", description: "Can invite and manage team members" },
    { id: "view_analytics", label: "View Analytics", description: "Can access analytics and reports" },
    { id: "system_admin", label: "System Admin", description: "Full system administration access" }
  ]

  const handlePermissionToggle = (permissionId: string) => {
    setInviteData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const getDefaultPermissions = (role: string) => {
    switch (role) {
      case "project_manager":
        return ["view_projects", "edit_projects", "view_team", "view_documents", "upload_documents"]
      case "designer":
        return ["view_projects", "view_documents", "upload_documents"]
      case "financial_analyst":
        return ["view_projects", "view_financial", "edit_financial", "view_analytics"]
      case "legal_advisor":
        return ["view_projects", "view_documents", "upload_documents", "view_team"]
      case "operations_manager":
        return ["view_projects", "edit_projects", "view_team", "manage_team", "view_analytics"]
      case "consultant":
        return ["view_projects", "view_documents"]
      case "contractor":
        return ["view_projects", "view_documents", "upload_documents"]
      default:
        return ["view_projects"]
    }
  }

  const handleRoleChange = (role: string) => {
    setInviteData(prev => ({
      ...prev,
      role,
      permissions: getDefaultPermissions(role)
    }))
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSingleInvite = () => {
    if (!inviteData.email || !inviteData.firstName || !inviteData.lastName || !inviteData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    if (!validateEmail(inviteData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Invitation Sent",
      description: `Team invitation sent to ${inviteData.firstName} ${inviteData.lastName} (${inviteData.email}).`,
    })

    // Reset form
    setInviteData({
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      department: "",
      phone: "",
      message: "",
      permissions: []
    })
    onOpenChange(false)
  }

  const handleBulkInvite = () => {
    const emails = bulkEmails.split('\n').filter(email => email.trim())
    const validEmails = emails.filter(validateEmail)
    const invalidEmails = emails.filter(email => !validateEmail(email))

    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid Emails",
        description: `${invalidEmails.length} invalid email addresses found. Please check and try again.`,
        variant: "destructive"
      })
      return
    }

    if (validEmails.length === 0) {
      toast({
        title: "No Valid Emails",
        description: "Please enter at least one valid email address.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Bulk Invitations Sent",
      description: `Team invitations sent to ${validEmails.length} recipients.`,
    })

    setBulkEmails("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Invite Team Members
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={inviteType === 'single' ? 'luxury' : 'outline'}
              onClick={() => setInviteType('single')}
            >
              Single Invite
            </Button>
            <Button
              variant={inviteType === 'bulk' ? 'luxury' : 'outline'}
              onClick={() => setInviteType('bulk')}
            >
              Bulk Invite
            </Button>
          </div>

          {inviteType === 'single' ? (
            <Card>
              <CardHeader>
                <CardTitle>Invite Individual Team Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={inviteData.firstName}
                      onChange={(e) => setInviteData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={inviteData.lastName}
                      onChange={(e) => setInviteData(prev => ({ ...prev, lastName: e.target.value }))}
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
                      value={inviteData.email}
                      onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={inviteData.phone}
                      onChange={(e) => setInviteData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Role and Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select value={inviteData.role} onValueChange={handleRoleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={inviteData.department} onValueChange={(value) => setInviteData(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Permissions */}
                {inviteData.role && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <Label className="text-base font-semibold">Permissions</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availablePermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                          <Checkbox
                            id={permission.id}
                            checked={inviteData.permissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {permission.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={inviteData.message}
                    onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Add a personal message to the invitation..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button variant="luxury" onClick={handleSingleInvite}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Bulk Invite Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bulkEmails">Email Addresses *</Label>
                  <Textarea
                    id="bulkEmails"
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    placeholder="Enter email addresses, one per line:&#10;john@example.com&#10;jane@example.com&#10;mike@example.com"
                    rows={8}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter one email address per line. All recipients will receive a standard invitation with viewer permissions.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Default Settings for Bulk Invites:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Role:</span> Consultant
                    </div>
                    <div>
                      <span className="font-medium">Department:</span> External Partners
                    </div>
                    <div>
                      <span className="font-medium">Permissions:</span> View Projects Only
                    </div>
                    <div>
                      <span className="font-medium">Message:</span> Standard invitation
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button variant="luxury" onClick={handleBulkInvite}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Bulk Invitations
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}