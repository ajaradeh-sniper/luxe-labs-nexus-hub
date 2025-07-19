import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Search, 
  DollarSign, 
  MapPin, 
  Calendar,
  TrendingUp,
  Users,
  Home,
  MoreHorizontal,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  district: string;
  propertyType: 'villa' | 'apartment' | 'townhouse' | 'penthouse';
  status: 'available' | 'under_renovation' | 'sold' | 'rented' | 'off_market';
  listingPrice: number;
  actualPrice?: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  renovationCost?: number;
  estimatedROI: number;
  daysOnMarket: number;
  leadSource: 'dld_data' | 'agent_sourced' | 'direct_owner' | 'referral';
  assignedAgent: string;
  investorInterest: number; // number of interested investors
  viewingScheduled: number;
  lastUpdated: string;
  features: string[];
  photos: number;
  documents: {
    title_deed: boolean;
    noc: boolean;
    floor_plans: boolean;
    valuation_report: boolean;
  };
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa - Palm Jumeirah',
    location: 'Palm Jumeirah',
    district: 'Dubai',
    propertyType: 'villa',
    status: 'under_renovation',
    listingPrice: 8500000,
    actualPrice: 7200000,
    bedrooms: 5,
    bathrooms: 6,
    area: 4500,
    renovationCost: 500000,
    estimatedROI: 18.5,
    daysOnMarket: 45,
    leadSource: 'dld_data',
    assignedAgent: 'Sarah Johnson',
    investorInterest: 12,
    viewingScheduled: 3,
    lastUpdated: '2024-01-15',
    features: ['Private Beach', 'Swimming Pool', 'Maid Room', 'Garden'],
    photos: 24,
    documents: {
      title_deed: true,
      noc: true,
      floor_plans: true,
      valuation_report: false
    }
  },
  {
    id: '2',
    title: 'Premium Penthouse - Downtown',
    location: 'Downtown Dubai',
    district: 'Dubai',
    propertyType: 'penthouse',
    status: 'available',
    listingPrice: 12000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 3200,
    estimatedROI: 15.2,
    daysOnMarket: 12,
    leadSource: 'agent_sourced',
    assignedAgent: 'Michael Chen',
    investorInterest: 8,
    viewingScheduled: 5,
    lastUpdated: '2024-01-14',
    features: ['Burj Khalifa View', 'Private Elevator', 'Terrace', 'Study Room'],
    photos: 18,
    documents: {
      title_deed: true,
      noc: false,
      floor_plans: true,
      valuation_report: true
    }
  },
  {
    id: '3',
    title: 'Modern Townhouse - Arabian Ranches',
    location: 'Arabian Ranches',
    district: 'Dubai',
    propertyType: 'townhouse',
    status: 'sold',
    listingPrice: 4200000,
    actualPrice: 3900000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    renovationCost: 200000,
    estimatedROI: 22.1,
    daysOnMarket: 89,
    leadSource: 'direct_owner',
    assignedAgent: 'Emma Wilson',
    investorInterest: 15,
    viewingScheduled: 0,
    lastUpdated: '2024-01-10',
    features: ['Golf Course View', 'Private Garden', 'Garage', 'Community Pool'],
    photos: 15,
    documents: {
      title_deed: true,
      noc: true,
      floor_plans: true,
      valuation_report: true
    }
  }
];

const statusColors = {
  available: 'bg-green-100 text-green-800',
  under_renovation: 'bg-blue-100 text-blue-800',
  sold: 'bg-gray-100 text-gray-800',
  rented: 'bg-purple-100 text-purple-800',
  off_market: 'bg-red-100 text-red-800'
};

const propertyTypeColors = {
  villa: 'bg-emerald-100 text-emerald-800',
  apartment: 'bg-blue-100 text-blue-800',
  townhouse: 'bg-orange-100 text-orange-800',
  penthouse: 'bg-purple-100 text-purple-800'
};

const leadSourceColors = {
  dld_data: 'bg-blue-100 text-blue-800',
  agent_sourced: 'bg-green-100 text-green-800',
  direct_owner: 'bg-orange-100 text-orange-800',
  referral: 'bg-purple-100 text-purple-800'
};

export function PropertyManagement() {
  const [properties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.assignedAgent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.propertyType === typeFilter;
    const matchesLocation = locationFilter === 'all' || property.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const totalListingValue = properties.reduce((sum, prop) => sum + prop.listingPrice, 0);
  const averageROI = properties.reduce((sum, prop) => sum + prop.estimatedROI, 0) / properties.length;
  const totalInvestorInterest = properties.reduce((sum, prop) => sum + prop.investorInterest, 0);
  const availableProperties = properties.filter(prop => prop.status === 'available').length;

  const getDocumentCompletionRate = (docs: Property['documents']) => {
    const total = Object.keys(docs).length;
    const completed = Object.values(docs).filter(Boolean).length;
    return (completed / total) * 100;
  };

  const uniqueLocations = Array.from(new Set(properties.map(p => p.location)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Property Management</h2>
          <p className="text-muted-foreground">Real estate portfolio with DLD data integration</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Property Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">${(totalListingValue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Properties</p>
                <p className="text-2xl font-bold">{availableProperties}</p>
                <p className="text-xs text-blue-600 mt-1">Ready for investment</p>
              </div>
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average ROI</p>
                <p className="text-2xl font-bold">{averageROI.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">Above market rate</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investor Interest</p>
                <p className="text-2xl font-bold">{totalInvestorInterest}</p>
                <p className="text-xs text-green-600 mt-1">Active inquiries</p>
              </div>
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Property Directory
          </CardTitle>
          <CardDescription>
            Comprehensive property listing with DLD integration and investment analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="under_renovation">Under Renovation</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="off_market">Off Market</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Details</TableHead>
                <TableHead>Specifications</TableHead>
                <TableHead>Pricing & ROI</TableHead>
                <TableHead>Market Activity</TableHead>
                <TableHead>Documentation</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => {
                const docCompletion = getDocumentCompletionRate(property.documents);
                
                return (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-medium">{property.title}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </div>
                        <div className="flex gap-2">
                          <Badge className={statusColors[property.status]}>
                            {property.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={propertyTypeColors[property.propertyType]}>
                            {property.propertyType}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>{property.bedrooms} bed • {property.bathrooms} bath</div>
                        <div>{property.area.toLocaleString()} sqft</div>
                        <div className="text-muted-foreground">{property.photos} photos</div>
                        <Badge className={leadSourceColors[property.leadSource]}>
                          {property.leadSource.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          ${property.listingPrice.toLocaleString()}
                        </div>
                        {property.actualPrice && (
                          <div className="text-sm text-muted-foreground">
                            Actual: ${property.actualPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-sm font-medium text-green-600">
                          {property.estimatedROI.toFixed(1)}% ROI
                        </div>
                        {property.renovationCost && (
                          <div className="text-xs text-muted-foreground">
                            Renovation: ${property.renovationCost.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {property.investorInterest} interested investors
                        </div>
                        <div className="text-sm">
                          {property.viewingScheduled} scheduled viewings
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {property.daysOnMarket} days on market
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Agent: {property.assignedAgent}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress value={docCompletion} className="h-2 w-16" />
                          <span className="text-xs">{docCompletion.toFixed(0)}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {property.lastUpdated}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}