import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Target,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Search,
  Filter,
  Heart,
  Share,
  Eye,
  ArrowRight,
  Star,
  CheckCircle2
} from "lucide-react"

const ClientOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("available")

  // Mock opportunities data
  const opportunities = [
    {
      id: 1,
      title: "Jumeirah Islands Waterfront Villa Transformation",
      location: "Jumeirah Islands, Dubai",
      type: "Single Property Flip",
      investment: "AED 15M - 25M",
      expectedReturn: "22-28%",
      duration: "8-10 months",
      status: "invited",
      deadline: "Dec 31, 2024",
      image: "/lovable-uploads/jumeirah-islands-luxury-villa.jpg",
      description: "Exclusive opportunity to lead the transformation of a prime waterfront villa in one of Dubai's most prestigious communities.",
      highlights: ["Waterfront Location", "High-End Finishes", "Proven Track Record"],
      minInvestment: "AED 5,000,000",
      maxInvestors: 3,
      currentInvestors: 1,
      leadInvestor: "Luxury Labs",
      invitedBy: "Ahmad Hassan",
      invitedDate: "2024-12-01"
    },
    {
      id: 2,
      title: "Business Bay Luxury Apartment Complex", 
      location: "Business Bay, Dubai",
      type: "Shared Stake Investment",
      investment: "AED 3M - 5M", 
      expectedReturn: "18-22%",
      duration: "6-8 months",
      status: "invited",
      deadline: "Jan 15, 2025",
      image: "/lovable-uploads/business-bay.jpg",
      description: "Join a curated group investment in a premium apartment transformation with city skyline views.",
      highlights: ["City Views", "Prime Location", "Quick Turnaround"],
      minInvestment: "AED 1,000,000",
      maxInvestors: 5,
      currentInvestors: 2,
      leadInvestor: "Luxury Labs", 
      invitedBy: "Sarah Al-Mansoori",
      invitedDate: "2024-12-05"
    },
    {
      id: 3,
      title: "Emirates Hills Mega Mansion Repositioning",
      location: "Emirates Hills, Dubai", 
      type: "Premium Transformation",
      investment: "AED 50M - 80M",
      expectedReturn: "25-35%", 
      duration: "12-18 months",
      status: "under_review",
      deadline: "Jan 31, 2025",
      image: "/lovable-uploads/emirates-hills-luxury-villa.jpg",
      description: "Ultra-high-net-worth opportunity for a complete luxury estate transformation in Dubai's most exclusive community.",
      highlights: ["Mega Mansion", "Golf Course Views", "Ultra Luxury"],
      minInvestment: "AED 10,000,000",
      maxInvestors: 2,
      currentInvestors: 0,
      leadInvestor: "Luxury Labs",
      invitedBy: "Mohammed Al-Rashid",
      invitedDate: "2024-11-28"
    }
  ]

  const myInterests = [
    {
      id: 4,
      title: "Palm Jumeirah Signature Villa",
      status: "expressed_interest",
      responseDate: "2024-12-10",
      expectedResponse: "Dec 20, 2024"
    },
    {
      id: 5, 
      title: "Dubai Hills Golf Course Villa",
      status: "declined",
      responseDate: "2024-11-25",
      reason: "Timeline conflict"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invited': return 'secondary'
      case 'under_review': return 'outline'
      case 'expressed_interest': return 'default'
      case 'declined': return 'destructive'
      case 'approved': return 'default'
      default: return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'invited': return 'Invited'
      case 'under_review': return 'Under Review'
      case 'expressed_interest': return 'Interest Expressed'
      case 'declined': return 'Declined'
      case 'approved': return 'Approved'
      default: return status
    }
  }

  return (
    <>
      <Helmet>
        <title>Investment Opportunities | Client Dashboard | Luxury Labs</title>
        <meta name="description" content="Explore exclusive investment opportunities curated for you" />
      </Helmet>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Investment Opportunities</h1>
              <p className="text-muted-foreground">Exclusive opportunities curated specifically for your investment profile</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search opportunities..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Opportunity Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Invitations</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Awaiting your response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Interest submitted</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Opportunity Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">AED 108M</div>
                <p className="text-xs text-muted-foreground">Combined value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Expected Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">24%</div>
                <p className="text-xs text-muted-foreground">Across opportunities</p>
              </CardContent>
            </Card>
          </div>

          {/* Opportunities Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="available">Available Opportunities</TabsTrigger>
              <TabsTrigger value="interests">My Interests</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {opportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image Header */}
                    <div className="relative h-48">
                      <img 
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90">
                          {opportunity.type}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="ghost" className="bg-background/90 hover:bg-background">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="bg-background/90 hover:bg-background">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <Badge variant={getStatusColor(opportunity.status)}>
                              {getStatusLabel(opportunity.status)}
                            </Badge>
                            <div className="flex items-center text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Due {opportunity.deadline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {opportunity.location}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {opportunity.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      {/* Investment Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Investment Range</span>
                          <p className="font-semibold">{opportunity.investment}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected Return</span>
                          <p className="font-semibold text-green-600">{opportunity.expectedReturn}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration</span>
                          <p className="font-semibold">{opportunity.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Min Investment</span>
                          <p className="font-semibold">{opportunity.minInvestment}</p>
                        </div>
                      </div>

                      {/* Investor Info */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {opportunity.currentInvestors} of {opportunity.maxInvestors} investors
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Lead: {opportunity.leadInvestor}
                        </div>
                      </div>

                      {/* Invited By */}
                      <div className="flex items-center justify-between p-2 border-l-4 border-primary bg-primary/5">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {opportunity.invitedBy.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium">Invited by {opportunity.invitedBy}</p>
                            <p className="text-xs text-muted-foreground">{opportunity.invitedDate}</p>
                          </div>
                        </div>
                        <Star className="h-4 w-4 text-primary" />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1">
                          Express Interest
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interests" className="space-y-6">
              <div className="space-y-4">
                {myInterests.map((interest) => (
                  <Card key={interest.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{interest.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Response submitted on {interest.responseDate}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={getStatusColor(interest.status)}>
                            {getStatusLabel(interest.status)}
                          </Badge>
                          {interest.status === 'expressed_interest' && (
                            <p className="text-xs text-muted-foreground">
                              Expected response by {interest.expectedResponse}
                            </p>
                          )}
                          {interest.status === 'declined' && (
                            <p className="text-xs text-muted-foreground">
                              Reason: {interest.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity History</CardTitle>
                  <CardDescription>Your complete opportunity interaction history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    No historical opportunities to display
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  )
}

export default ClientOpportunities