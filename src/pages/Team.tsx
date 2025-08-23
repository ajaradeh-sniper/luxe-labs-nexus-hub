import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { TeamInvite } from "@/components/TeamInvite"
import { 
  Users, 
  Plus, 
  Search, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  MoreHorizontal,
  UserPlus,
  Building2,
  Crown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TeamMember {
  id: string
  name: string
  role: string
  department: 'management' | 'operations' | 'design' | 'finance' | 'legal' | 'marketing'
  email: string
  phone: string
  location: string
  status: 'active' | 'offline' | 'busy'
  joinDate: string
  projectsCount: number
  rating: number
  avatar?: string
}

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [inviteOpen, setInviteOpen] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      role: 'CEO & Founder',
      department: 'management',
      email: 'ahmed@luxurylabs.ae',
      phone: '+971 50 123 4567',
      location: 'Dubai, UAE',
      status: 'active',
      joinDate: '2022-01-15',
      projectsCount: 24,
      rating: 5.0,
      avatar: '/avatars/ahmed.jpg'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Chief Operations Officer',
      department: 'operations',
      email: 'sarah@luxurylabs.ae',
      phone: '+971 50 234 5678',
      location: 'Dubai, UAE',
      status: 'active',
      joinDate: '2022-03-20',
      projectsCount: 18,
      rating: 4.9,
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Head of Design',
      department: 'design',
      email: 'michael@luxurylabs.ae',
      phone: '+971 50 345 6789',
      location: 'Dubai, UAE',
      status: 'busy',
      joinDate: '2022-05-10',
      projectsCount: 32,
      rating: 4.8,
      avatar: '/avatars/michael.jpg'
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      role: 'Project Manager',
      department: 'operations',
      email: 'elena@luxurylabs.ae',
      phone: '+971 50 456 7890',
      location: 'Dubai, UAE',
      status: 'active',
      joinDate: '2022-08-15',
      projectsCount: 15,
      rating: 4.7,
      avatar: '/avatars/elena.jpg'
    },
    {
      id: '5',
      name: 'David Kim',
      role: 'Financial Analyst',
      department: 'finance',
      email: 'david@luxurylabs.ae',
      phone: '+971 50 567 8901',
      location: 'Dubai, UAE',
      status: 'offline',
      joinDate: '2023-02-01',
      projectsCount: 8,
      rating: 4.6,
      avatar: '/avatars/david.jpg'
    },
    {
      id: '6',
      name: 'Fatima Al-Zahra',
      role: 'Legal Advisor',
      department: 'legal',
      email: 'fatima@luxurylabs.ae',
      phone: '+971 50 678 9012',
      location: 'Dubai, UAE',
      status: 'active',
      joinDate: '2023-01-10',
      projectsCount: 12,
      rating: 4.9,
      avatar: '/avatars/fatima.jpg'
    }
  ]

  const departments = [
    'All Departments',
    'Management', 
    'Operations',
    'Design',
    'Finance',
    'Legal',
    'Marketing'
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground'
      case 'busy': return 'bg-warning text-warning-foreground'
      case 'offline': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success'
      case 'busy': return 'bg-warning'
      case 'offline': return 'bg-muted-foreground'
      default: return 'bg-muted-foreground'
    }
  }

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'management': return <Crown className="h-4 w-4" />
      case 'operations': return <Building2 className="h-4 w-4" />
      case 'design': return <Star className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || 
                             member.department === selectedDepartment.toLowerCase()
    return matchesSearch && matchesDepartment
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${getStatusDot('active')}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">18</p>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">6</p>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Filters */}
        <div className="flex gap-2 flex-wrap">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept.toLowerCase().replace('all departments', 'all') ? "luxury" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(dept.toLowerCase().replace('all departments', 'all'))}
            >
              {dept}
            </Button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusDot(member.status)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getDepartmentIcon(member.department)}
                    <span className="text-sm text-muted-foreground capitalize">{member.department}</span>
                    <Badge variant="secondary" className={`ml-auto ${getStatusColor(member.status)}`}>
                      {member.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="font-semibold">{member.projectsCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-warning" />
                        <span className="font-semibold">{member.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="mr-1 h-3 w-3" />
                      Message
                    </Button>
                    <Button variant="luxury" size="sm" className="flex-1">
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No team members found</h3>
              <p className="text-muted-foreground mb-4">
                No team members match your current search criteria.
              </p>
              <Button variant="luxury" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        <TeamInvite open={inviteOpen} onOpenChange={setInviteOpen} />
      </div>
    </DashboardLayout>
  )
}

export default Team