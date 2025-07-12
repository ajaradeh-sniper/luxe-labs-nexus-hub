import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  TrendingUp
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Property {
  id: string
  name: string
  location: string
  type: 'residential' | 'commercial' | 'mixed'
  status: 'available' | 'under-contract' | 'renovation' | 'completed'
  acquisitionPrice: string
  currentValue: string
  roi: number
  acquisitionDate: string
  image?: string
}

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const properties: Property[] = [
    {
      id: '1',
      name: 'Marina Bay Tower',
      location: 'Dubai Marina',
      type: 'residential',
      status: 'completed',
      acquisitionPrice: '$2.5M',
      currentValue: '$2.8M',
      roi: 12.5,
      acquisitionDate: '2024-12-01'
    },
    {
      id: '2',
      name: 'Downtown Luxury Apartments',
      location: 'Downtown Dubai',
      type: 'residential', 
      status: 'renovation',
      acquisitionPrice: '$4.2M',
      currentValue: '$4.8M',
      roi: 14.3,
      acquisitionDate: '2024-10-15'
    },
    {
      id: '3',
      name: 'Business Bay Complex',
      location: 'Business Bay',
      type: 'commercial',
      status: 'under-contract',
      acquisitionPrice: '$6.1M',
      currentValue: '$6.5M',
      roi: 6.6,
      acquisitionDate: '2024-11-20'
    },
    {
      id: '4',
      name: 'Palm Residence Villa',
      location: 'Palm Jumeirah',
      type: 'residential',
      status: 'available',
      acquisitionPrice: '$8.5M',
      currentValue: '$9.2M',
      roi: 8.2,
      acquisitionDate: '2024-09-10'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'renovation': return 'bg-warning/10 text-warning border-warning/20'
      case 'under-contract': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'available': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return '🏠'
      case 'commercial': return '🏢'
      case 'mixed': return '🏘️'
      default: return '🏗️'
    }
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus
    const matchesType = filterType === 'all' || property.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Property Portfolio</h1>
            <p className="text-muted-foreground">Manage your luxury real estate investments</p>
          </div>
          <Button variant="luxury" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="under-contract">Under Contract</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-luxury transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center text-2xl">
                      {getTypeIcon(property.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Badge variant="secondary" className={`${getStatusColor(property.status)} w-fit`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1).replace('-', ' ')}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Acquisition Price</p>
                    <p className="text-sm font-semibold">{property.acquisitionPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="text-sm font-semibold text-success">{property.currentValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <p className="text-sm font-semibold text-success">+{property.roi}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Acquired</p>
                    <p className="text-sm font-medium">
                      {new Date(property.acquisitionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="luxury" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                No properties match your current search and filter criteria.
              </p>
              <Button variant="luxury" onClick={() => {
                setSearchTerm("")
                setFilterStatus("all") 
                setFilterType("all")
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Properties