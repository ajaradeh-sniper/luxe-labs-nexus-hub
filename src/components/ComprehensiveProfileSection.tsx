import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { 
  User, 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Clock, 
  MapPin, 
  Building,
  FileEdit,
  Save,
  Mail,
  Phone,
  Building2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InvestorPreferences {
  investmentCapacity?: number
  riskTolerance?: string
  investmentHorizon?: string
  preferredLocations?: string[]
  propertyTypes?: string[]
  investmentGoals?: string[]
  liquidityNeeds?: string
  experience?: string
  backgroundInfo?: string
  additionalComments?: string
}

export function ComprehensiveProfileSection({ onEditAssessment }: { onEditAssessment?: () => void }) {
  const [preferences, setPreferences] = useState<InvestorPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: "Luxury",
    lastName: "Labs", 
    email: "admin@luxurylabs.ae",
    phone: "+971 50 123 4567",
    role: "Administrator",
    bio: "Leading luxury real estate transformation in Dubai with over 10 years of experience in premium property development.",
    company: "Luxury Labs FZO",
    position: "CEO & Founder",
    address: "Dubai International Financial Centre, Dubai, UAE"
  })

  useEffect(() => {
    if (!user) return

    const fetchPreferences = async () => {
      try {
        // Handle demo mode
        if (user.id === 'demo-admin') {
          const demoData = localStorage.getItem('demo_investor_preferences')
          if (demoData) {
            const parsed = JSON.parse(demoData)
            setPreferences(parsed.preferences)
          }
          setLoading(false)
          return
        }

        // Fetch from database for real users
        const { data, error } = await supabase
          .from('investor_preferences')
          .select('preferences')
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) {
          console.error('Error fetching preferences:', error)
        } else if (data) {
          setPreferences(data.preferences as InvestorPreferences)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [user])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile information",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (amount: number) => {
    const usdAmount = amount / 3.67
    return `AED ${amount.toLocaleString()} (~$${Math.round(usdAmount).toLocaleString()})`
  }

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'conservative': return 'bg-green-100 text-green-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800' 
      case 'aggressive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information & Investment Assessment
          </CardTitle>
          <div className="flex gap-2">
            {onEditAssessment && (
              <Button variant="outline" size="sm" onClick={onEditAssessment}>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Assessment
              </Button>
            )}
            <Button size="sm" onClick={handleSaveProfile} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Basic Profile Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={profileData.role} disabled />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              rows={3}
            />
          </div>
        </div>

        <Separator />
        
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                value={profileData.company}
                onChange={(e) => setProfileData({...profileData, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position" 
                value={profileData.position}
                onChange={(e) => setProfileData({...profileData, position: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input 
              id="address" 
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
            />
          </div>
        </div>

        <Separator />

        {/* Investment Assessment Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Investment Assessment Results
            </h3>
            {!preferences && onEditAssessment && (
              <Button variant="outline" onClick={onEditAssessment}>
                <FileEdit className="mr-2 h-4 w-4" />
                Complete Assessment
              </Button>
            )}
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ) : preferences ? (
            <div className="space-y-6">
              
              {/* Investment Capacity */}
              {preferences.investmentCapacity && (
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Investment Capacity</p>
                    <p className="text-lg text-primary font-bold">
                      {formatCurrency(preferences.investmentCapacity)}
                    </p>
                  </div>
                </div>
              )}

              {/* Risk & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.riskTolerance && (
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Risk Tolerance</p>
                      <Badge className={getRiskColor(preferences.riskTolerance)}>
                        {preferences.riskTolerance}
                      </Badge>
                    </div>
                  </div>
                )}

                {preferences.investmentHorizon && (
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Investment Horizon</p>
                      <p className="text-muted-foreground">{preferences.investmentHorizon}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience & Liquidity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.experience && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-1">Experience Level</p>
                    <p className="text-muted-foreground">{preferences.experience}</p>
                  </div>
                )}

                {preferences.liquidityNeeds && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-1">Liquidity Needs</p>
                    <p className="text-muted-foreground">{preferences.liquidityNeeds}</p>
                  </div>
                )}
              </div>

              {/* Preferred Locations */}
              {preferences.preferredLocations && preferences.preferredLocations.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <p className="font-semibold">Preferred Locations</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.preferredLocations.map((location, index) => (
                      <Badge key={index} variant="secondary">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Types */}
              {preferences.propertyTypes && preferences.propertyTypes.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <p className="font-semibold">Property Types</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.propertyTypes.map((type, index) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Investment Goals */}
              {preferences.investmentGoals && preferences.investmentGoals.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <p className="font-semibold">Investment Goals</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.investmentGoals.map((goal, index) => (
                      <Badge key={index} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {preferences.backgroundInfo && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold mb-2">Background Information</p>
                  <p className="text-sm text-muted-foreground">{preferences.backgroundInfo}</p>
                </div>
              )}

              {preferences.additionalComments && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold mb-2">Additional Comments</p>
                  <p className="text-sm text-muted-foreground">{preferences.additionalComments}</p>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-semibold mb-2">No Assessment Completed</h4>
              <p className="text-muted-foreground mb-4">
                Complete your investor profile assessment to get personalized investment recommendations.
              </p>
              {onEditAssessment && (
                <Button onClick={onEditAssessment}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Complete Assessment
                </Button>
              )}
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  )
}