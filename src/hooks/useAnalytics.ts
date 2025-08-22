import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { format, subDays } from 'date-fns'

interface DateRange {
  from: Date
  to: Date
}

interface WebsiteAnalytics {
  id: string
  date: string
  visitors: number
  page_views: number
  unique_visitors: number
  bounce_rate: number
  session_duration: number
}

interface TrafficAnalytics {
  id: string
  date: string
  source: string
  medium: string | null
  campaign: string | null
  sessions: number
  users: number
  new_users: number
  sessions_per_user: number
  avg_session_duration: number
  pages_per_session: number
  bounce_rate: number
}

interface MarketingAnalytics {
  id: string
  date: string
  channel: string
  campaign_name: string | null
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  cost: number
  roas: number
}

interface ConversionAnalytics {
  id: string
  date: string
  conversion_type: string
  source: string | null
  value: number
  count: number
}

export const useWebsiteAnalytics = (dateRange?: DateRange) => {
  const defaultDateRange = {
    from: subDays(new Date(), 30),
    to: new Date()
  }
  
  const range = dateRange || defaultDateRange
  
  return useQuery({
    queryKey: ['website-analytics', range.from, range.to],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('website_analytics')
        .select('*')
        .gte('date', format(range.from, 'yyyy-MM-dd'))
        .lte('date', format(range.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true })

      if (error) throw error
      return data as WebsiteAnalytics[]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useTrafficAnalytics = (dateRange?: DateRange) => {
  const defaultDateRange = {
    from: subDays(new Date(), 30),
    to: new Date()
  }
  
  const range = dateRange || defaultDateRange
  
  return useQuery({
    queryKey: ['traffic-analytics', range.from, range.to],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('traffic_analytics')
        .select('*')
        .gte('date', format(range.from, 'yyyy-MM-dd'))
        .lte('date', format(range.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true })

      if (error) throw error
      return data as TrafficAnalytics[]
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useMarketingAnalytics = (dateRange?: DateRange) => {
  const defaultDateRange = {
    from: subDays(new Date(), 30),
    to: new Date()
  }
  
  const range = dateRange || defaultDateRange
  
  return useQuery({
    queryKey: ['marketing-analytics', range.from, range.to],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_analytics')
        .select('*')
        .gte('date', format(range.from, 'yyyy-MM-dd'))
        .lte('date', format(range.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true })

      if (error) throw error
      return data as MarketingAnalytics[]
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useConversionAnalytics = (dateRange?: DateRange) => {
  const defaultDateRange = {
    from: subDays(new Date(), 30),
    to: new Date()
  }
  
  const range = dateRange || defaultDateRange
  
  return useQuery({
    queryKey: ['conversion-analytics', range.from, range.to],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversion_analytics')
        .select('*')
        .gte('date', format(range.from, 'yyyy-MM-dd'))
        .lte('date', format(range.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true })

      if (error) throw error
      return data as ConversionAnalytics[]
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Aggregated analytics hook
export const useAnalyticsSummary = (dateRange?: DateRange) => {
  const websiteData = useWebsiteAnalytics(dateRange)
  const trafficData = useTrafficAnalytics(dateRange)
  const marketingData = useMarketingAnalytics(dateRange)
  const conversionData = useConversionAnalytics(dateRange)

  const isLoading = websiteData.isLoading || trafficData.isLoading || 
                   marketingData.isLoading || conversionData.isLoading

  const error = websiteData.error || trafficData.error || 
               marketingData.error || conversionData.error

  return {
    websiteAnalytics: websiteData.data || [],
    trafficAnalytics: trafficData.data || [],
    marketingAnalytics: marketingData.data || [],
    conversionAnalytics: conversionData.data || [],
    isLoading,
    error,
    refetch: () => {
      websiteData.refetch()
      trafficData.refetch()
      marketingData.refetch()
      conversionData.refetch()
    }
  }
}