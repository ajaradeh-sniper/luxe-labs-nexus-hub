import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { 
  BarChart3, 
  Save, 
  User, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MapPin,
  Building,
  Target
} from "lucide-react"

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

interface EditableInvestmentAssessmentProps {
  onClose?: () => void;
}

export const EditableInvestmentAssessment = ({ onClose }: EditableInvestmentAssessmentProps) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [preferences, setPreferences] = useState<InvestorPreferences>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      // Handle demo mode
      if (user.id === 'demo-admin') {
        localStorage.setItem('demo_investor_preferences', JSON.stringify({
          user_id: user.id,
          preferences: preferences,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }))
        
        toast({
          title: "Assessment Updated!",
          description: "Your investment assessment has been updated successfully (demo mode)."
        })
        if (onClose) onClose()
        return
      }

      // Normal database save for real users
      const { error } = await supabase
        .from('investor_preferences')
        .upsert({
          user_id: user.id,
          preferences: preferences as any,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Assessment Updated!",
        description: "Your investment assessment has been updated successfully."
      })
      if (onClose) onClose()
    } catch (error) {
      console.error('Error saving preferences:', error)
      toast({
        title: "Error",
        description: "Failed to save your assessment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateTimelinePreference = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      investmentTimeline: {
        ...prev.investmentTimeline,
        [key]: value
      }
    }))
  }

  const toggleGeographicPreference = (value: string) => {
    setPreferences(prev => {
      const current = prev.geographicPreference || []
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, geographicPreference: updated }
    })
  }

  const togglePropertyType = (value: string) => {
    setPreferences(prev => {
      const current = prev.propertyTypes || []
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, propertyTypes: updated }
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Investment Assessment - Edit Mode
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Investment Assessment - Edit Mode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* 1. Investor Type */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Investor Type</Label>
          </div>
          <RadioGroup 
            value={preferences.investorType || ""} 
            onValueChange={(value) => updatePreference('investorType', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="real-estate-short-term" id="real-estate-short-term" />
              <Label htmlFor="real-estate-short-term">Real Estate - Short Term (8-18 months)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="real-estate-long-term" id="real-estate-long-term" />
              <Label htmlFor="real-estate-long-term">Real Estate - Long Term (2-5 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diversified-portfolio" id="diversified-portfolio" />
              <Label htmlFor="diversified-portfolio">Diversified Portfolio (Multiple asset classes)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 2. Investment Experience */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Investment Experience</Label>
          </div>
          <Select value={preferences.investmentExperience || ""} onValueChange={(value) => updatePreference('investmentExperience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (New to investing)</SelectItem>
              <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
              <SelectItem value="advanced">Advanced (Experienced investor)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 3. Investment Preference */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Investment Preference</Label>
          <RadioGroup 
            value={preferences.investmentPreference || ""} 
            onValueChange={(value) => updatePreference('investmentPreference', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="conservative" id="conservative" />
              <Label htmlFor="conservative">Conservative</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="aggressive" id="aggressive" />
              <Label htmlFor="aggressive">Aggressive</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 4. Investment Size */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Investment Capacity (AED)</Label>
          </div>
          <Input
            type="number"
            value={preferences.preferredInvestmentSize || ""}
            onChange={(e) => updatePreference('preferredInvestmentSize', Number(e.target.value))}
            placeholder="Enter amount in AED (e.g., 5000000)"
            min={500000}
            max={100000000}
          />
        </div>

        {/* 5. Investment Timeline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Investment Timeline</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Funds Available</Label>
              <Select 
                value={preferences.investmentTimeline?.fundsAvailable || ""} 
                onValueChange={(value) => updateTimelinePreference('fundsAvailable', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="When funds available" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Within 1 month</SelectItem>
                  <SelectItem value="3">Within 3 months</SelectItem>
                  <SelectItem value="6">Within 6 months</SelectItem>
                  <SelectItem value="12">Within 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expected Payback Period</Label>
              <Select 
                value={preferences.investmentTimeline?.paybackPeriod || ""} 
                onValueChange={(value) => updateTimelinePreference('paybackPeriod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Expected returns timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8-12">8-12 months</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 6. Geographic Preferences */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Label className="text-base font-semibold">Preferred Locations</Label>
          </div>
          <div className="space-y-2">
            {[
              { value: 'highest_roi', label: "Skip - Let's discuss later", description: 'We can explore all location options during consultation' },
              { value: 'downtown', label: 'Downtown Dubai', description: 'City center, business district' },
              { value: 'marina', label: 'Dubai Marina', description: 'Waterfront luxury living' },
              { value: 'palm', label: 'Palm Jumeirah', description: 'Iconic man-made island' },
              { value: 'emirates_hills', label: 'Emirates Hills', description: 'Exclusive villa community' },
              { value: 'business_bay', label: 'Jumeirah', description: 'Exclusive Beach Front only for UAE Locals or GCC Citizens' },
              { value: 'difc', label: 'DIFC', description: 'Financial district' }
            ].map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={option.value}
                  checked={(preferences.geographicPreference || []).includes(option.value)}
                  onCheckedChange={() => toggleGeographicPreference(option.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Involvement Preference */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Engagement Style</Label>
          <RadioGroup 
            value={preferences.involvementPreference || ""} 
            onValueChange={(value) => updatePreference('involvementPreference', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full_involvement" id="full_involvement" />
              <Label htmlFor="full_involvement">Full Involvement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="periodic_updates" id="periodic_updates" />
              <Label htmlFor="periodic_updates">Periodic Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_involvement" id="no_involvement" />
              <Label htmlFor="no_involvement">No Involvement</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 8. Investment Type Preference */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Investment Type Preference</Label>
          <RadioGroup 
            value={preferences.investmentTypePreference || ""} 
            onValueChange={(value) => updatePreference('investmentTypePreference', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="uae_title_deed" id="uae_title_deed" />
              <Label htmlFor="uae_title_deed">UAE Title Deed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company_shares" id="company_shares" />
              <Label htmlFor="company_shares">Company Shares</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both Options</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Current Summary */}
        <div className="bg-muted/30 p-4 rounded-lg space-y-4">
          <h4 className="font-semibold">Current Assessment Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Type:</strong> {preferences.investorType ? preferences.investorType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
            </div>
            <div>
              <strong>Experience:</strong> {preferences.investmentExperience || 'Not set'}
            </div>
            <div>
              <strong>Capacity:</strong> {preferences.preferredInvestmentSize ? `${preferences.preferredInvestmentSize.toLocaleString()} AED` : 'Not set'}
            </div>
            <div>
              <strong>Locations:</strong> {(preferences.geographicPreference || []).length > 0 ? `${preferences.geographicPreference!.length} selected` : 'Not set'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>

      </CardContent>
    </Card>
  )
}