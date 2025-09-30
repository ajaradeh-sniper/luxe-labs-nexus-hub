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
import { EditableInvestmentAssessment } from "./EditableInvestmentAssessment"
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
  Building2,
  Edit
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InvestorPreferences {
  investorType?: string;
  otherDescription?: string;
  investmentExperience?: string;
  investmentPreference?: string;
  investmentTimeline?: {
    fundsAvailable?: string;
    paybackPeriod?: string;
  };
  preferredInvestmentSize?: number;
  timeHorizon?: string;
  geographicPreference?: string[];
  involvementPreference?: string;
  investmentTypePreference?: string;
  propertyTypes?: string[];
  expectedReturns?: string;
  liquidityPreference?: string;
  investmentApproach?: string;
  additionalComments?: string;
}

export function ComprehensiveProfileSection({ onEditAssessment }: { onEditAssessment?: () => void }) {
  const [preferences, setPreferences] = useState<InvestorPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditingAssessment, setIsEditingAssessment] = useState(false)
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
        console.log('Fetching investor settings for user:', user.id)
        const { data, error } = await supabase
          .from('investor_settings')
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
            {preferences && (
              <Button variant="outline" onClick={() => setIsEditingAssessment(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Assessment
              </Button>
            )}
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ) : isEditingAssessment ? (
            <EditableInvestmentAssessment onClose={() => setIsEditingAssessment(false)} />
          ) : preferences ? (
            <div className="space-y-6">
              
              {/* Investor Type */}
              {preferences.investorType && (
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Investor Type</p>
                    <p className="text-lg text-primary font-bold">
                      {preferences.investorType === 'real-estate-short-term' ? 'Real Estate - Short Term' :
                       preferences.investorType === 'real-estate-long-term' ? 'Real Estate - Long Term' :
                       preferences.investorType === 'diversified-portfolio' ? 'Diversified Portfolio' :
                       preferences.investorType}
                    </p>
                  </div>
                </div>
              )}

              {/* Investment Size */}
              {preferences.preferredInvestmentSize && (
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Investment Capacity</p>
                    <p className="text-lg text-primary font-bold">
                      {formatCurrency(preferences.preferredInvestmentSize)}
                    </p>
                  </div>
                </div>
              )}

              {/* Experience & Preference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.investmentExperience && (
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Experience Level</p>
                      <Badge className={preferences.investmentExperience === 'beginner' ? 'bg-yellow-500' : 
                                      preferences.investmentExperience === 'intermediate' ? 'bg-blue-500' : 'bg-green-500'}>
                        {preferences.investmentExperience}
                      </Badge>
                    </div>
                  </div>
                )}

                {preferences.investmentPreference && (
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Investment Preference</p>
                      <p className="text-muted-foreground">
                        {preferences.investmentPreference === 'conservative' ? 'Conservative' :
                         preferences.investmentPreference === 'moderate' ? 'Moderate' :
                         preferences.investmentPreference === 'aggressive' ? 'Aggressive' :
                         preferences.investmentPreference}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Investment Timeline */}
              {preferences.investmentTimeline && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {preferences.investmentTimeline.fundsAvailable && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="font-semibold mb-1">Funds Available</p>
                      <p className="text-muted-foreground">
                        {preferences.investmentTimeline.fundsAvailable === '1' ? 'Within 1 month' :
                         preferences.investmentTimeline.fundsAvailable === '3' ? 'Within 3 months' :
                         preferences.investmentTimeline.fundsAvailable === '6' ? 'Within 6 months' :
                         preferences.investmentTimeline.fundsAvailable === '12' ? 'Within 12 months' :
                         preferences.investmentTimeline.fundsAvailable}
                      </p>
                    </div>
                  )}

                  {preferences.investmentTimeline.paybackPeriod && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="font-semibold mb-1">Expected Payback Period</p>
                      <p className="text-muted-foreground">
                        {preferences.investmentTimeline.paybackPeriod === '1-2' ? '1-2 years' :
                         preferences.investmentTimeline.paybackPeriod === '3-5' ? '3-5 years' :
                         preferences.investmentTimeline.paybackPeriod === '5-10' ? '5-10 years' :
                         preferences.investmentTimeline.paybackPeriod === '8-12' ? '8-12 months' :
                         preferences.investmentTimeline.paybackPeriod}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Geographic Preferences */}
              {preferences.geographicPreference && preferences.geographicPreference.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <p className="font-semibold">Preferred Locations</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.geographicPreference.map((location, index) => (
                      <Badge key={index} variant="secondary">
                        {location === 'highest_roi' ? "Skip - Let's discuss later" :
                         location === 'downtown' ? 'Downtown Dubai' :
                         location === 'marina' ? 'Dubai Marina' :
                         location === 'palm' ? 'Palm Jumeirah' :
                         location === 'emirates_hills' ? 'Emirates Hills' :
                         location === 'business_bay' ? 'Jumeirah' :
                         location === 'difc' ? 'DIFC' :
                         location}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Involvement & Investment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.involvementPreference && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-1">Involvement Preference</p>
                    <p className="text-muted-foreground">
                      {preferences.involvementPreference === 'full_involvement' ? 'Full Involvement' :
                       preferences.involvementPreference === 'periodic_updates' ? 'Periodic Updates' :
                       preferences.involvementPreference === 'no_involvement' ? 'No Involvement' :
                       preferences.involvementPreference}
                    </p>
                  </div>
                )}

                {preferences.investmentTypePreference && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-1">Investment Type</p>
                    <p className="text-muted-foreground">
                      {preferences.investmentTypePreference === 'uae_title_deed' ? 'UAE Title Deed' :
                       preferences.investmentTypePreference === 'company_shares' ? 'Company Shares' :
                       preferences.investmentTypePreference === 'both' ? 'Both Options' :
                       preferences.investmentTypePreference}
                    </p>
                  </div>
                )}
              </div>

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