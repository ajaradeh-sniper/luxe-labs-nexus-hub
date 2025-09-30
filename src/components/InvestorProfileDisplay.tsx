import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { BarChart3, DollarSign, Target, Clock, MapPin, TrendingUp, FileEdit } from "lucide-react"
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

export function InvestorProfileDisplay({ onEdit }: { onEdit?: () => void }) {
  const [preferences, setPreferences] = useState<InvestorPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

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
          toast({
            title: "Error",
            description: "Failed to load investor profile",
            variant: "destructive"
          })
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
  }, [user, toast])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Investor Profile Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Investor Profile Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assessment Completed</h3>
            <p className="text-muted-foreground mb-4">
              Complete your investor profile assessment to get personalized investment recommendations.
            </p>
            {onEdit && (
              <Button onClick={onEdit}>
                <FileEdit className="mr-2 h-4 w-4" />
                Complete Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Investor Profile Assessment
          </CardTitle>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Investment Capacity */}
        {preferences.preferredInvestmentSize && (
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
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
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Investment Preference</p>
                <p className="text-muted-foreground">{preferences.investmentPreference}</p>
              </div>
            </div>
          )}
        </div>

        {/* Preferred Locations */}
        {preferences.geographicPreference && preferences.geographicPreference.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
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

        {/* Property Types */}
        {preferences.propertyTypes && preferences.propertyTypes.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Property Types</p>
            <div className="flex flex-wrap gap-2">
              {preferences.propertyTypes.map((type, index) => (
                <Badge key={index} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Investment Timeline */}
        {preferences.investmentTimeline && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preferences.investmentTimeline.fundsAvailable && (
              <div>
                <p className="font-semibold">Funds Available</p>
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
              <div>
                <p className="font-semibold">Expected Payback Period</p>
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

        {/* Involvement & Investment Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferences.involvementPreference && (
            <div>
              <p className="font-semibold">Involvement Preference</p>
              <p className="text-muted-foreground">
                {preferences.involvementPreference === 'full_involvement' ? 'Full Involvement' :
                 preferences.involvementPreference === 'periodic_updates' ? 'Periodic Updates' :
                 preferences.involvementPreference === 'no_involvement' ? 'No Involvement' :
                 preferences.involvementPreference}
              </p>
            </div>
          )}

          {preferences.investmentTypePreference && (
            <div>
              <p className="font-semibold">Investment Type</p>
              <p className="text-muted-foreground">
                {preferences.investmentTypePreference === 'uae_title_deed' ? 'UAE Title Deed' :
                 preferences.investmentTypePreference === 'company_shares' ? 'Company Shares' :
                 preferences.investmentTypePreference === 'both' ? 'Both Options' :
                 preferences.investmentTypePreference}
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {preferences.additionalComments && (
          <div>
            <p className="font-semibold mb-2">Additional Comments</p>
            <p className="text-sm text-muted-foreground">{preferences.additionalComments}</p>
          </div>
        )}

      </CardContent>
    </Card>
  )
}