import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { BarChart3, DollarSign, Target, Clock, MapPin, TrendingUp, FileEdit } from "lucide-react"
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
        const { data, error } = await supabase
          .from('investor_preferences')
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
        {preferences.investmentCapacity && (
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
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
            <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">Investment Horizon</p>
                <p className="text-muted-foreground">{preferences.investmentHorizon}</p>
              </div>
            </div>
          )}
        </div>

        {/* Preferred Locations */}
        {preferences.preferredLocations && preferences.preferredLocations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
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

        {/* Investment Goals */}
        {preferences.investmentGoals && preferences.investmentGoals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
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

        {/* Experience & Liquidity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferences.experience && (
            <div>
              <p className="font-semibold">Experience Level</p>
              <p className="text-muted-foreground">{preferences.experience}</p>
            </div>
          )}

          {preferences.liquidityNeeds && (
            <div>
              <p className="font-semibold">Liquidity Needs</p>
              <p className="text-muted-foreground">{preferences.liquidityNeeds}</p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {preferences.backgroundInfo && (
          <div>
            <p className="font-semibold mb-2">Background Information</p>
            <p className="text-sm text-muted-foreground">{preferences.backgroundInfo}</p>
          </div>
        )}

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