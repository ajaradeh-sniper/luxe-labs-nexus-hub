import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'

interface OptimizedDateRange {
  from: Date
  to: Date
}

interface CacheConfig {
  staleTime?: number
  gcTime?: number // Updated from cacheTime in React Query v5
  refetchOnWindowFocus?: boolean
}

interface WebsiteAnalyticsData {
  date: string
  visitors: number
  page_views: number
  unique_visitors: number
  bounce_rate: number
  session_duration: number
}

interface TrafficAnalyticsData {
  date: string
  source: string
  medium: string | null
  sessions: number
  users: number
  new_users: number
  bounce_rate: number
}

interface MarketingAnalyticsData {
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

// Performance-optimized analytics hooks with advanced caching
export const useOptimizedAnalytics = (
  dateRange: OptimizedDateRange, 
  options: CacheConfig = {}
) => {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    gcTime = 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus = false
  } = options;

  // Memoized date range to prevent unnecessary re-renders
  const memoizedDateRange = useMemo(() => ({
    from: startOfDay(dateRange.from),
    to: endOfDay(dateRange.to),
    key: `${format(dateRange.from, 'yyyy-MM-dd')}-${format(dateRange.to, 'yyyy-MM-dd')}`
  }), [dateRange.from, dateRange.to]);

  // Optimized website analytics with batch loading
  const websiteAnalytics = useQuery<WebsiteAnalyticsData[]>({
    queryKey: ['website-analytics-optimized', memoizedDateRange.key],
    queryFn: async () => {
      console.time('Website Analytics Query');
      
      const { data, error } = await supabase
        .from('website_analytics')
        .select('date, visitors, page_views, unique_visitors, bounce_rate, session_duration')
        .gte('date', format(memoizedDateRange.from, 'yyyy-MM-dd'))
        .lte('date', format(memoizedDateRange.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      console.timeEnd('Website Analytics Query');
      
      if (error) {
        console.error('Website Analytics Error:', error);
        throw error;
      }
      
      return (data || []) as WebsiteAnalyticsData[];
    },
    staleTime,
    gcTime,
    refetchOnWindowFocus
  });

  // Optimized traffic analytics with selective fields
  const trafficAnalytics = useQuery<TrafficAnalyticsData[]>({
    queryKey: ['traffic-analytics-optimized', memoizedDateRange.key],
    queryFn: async () => {
      console.time('Traffic Analytics Query');
      
      const { data, error } = await supabase
        .from('traffic_analytics')
        .select('date, source, medium, sessions, users, new_users, bounce_rate')
        .gte('date', format(memoizedDateRange.from, 'yyyy-MM-dd'))
        .lte('date', format(memoizedDateRange.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      console.timeEnd('Traffic Analytics Query');
      
      if (error) {
        console.error('Traffic Analytics Error:', error);
        throw error;
      }
      
      return (data || []) as TrafficAnalyticsData[];
    },
    staleTime,
    gcTime,
    refetchOnWindowFocus
  });

  // Optimized marketing analytics with aggregation
  const marketingAnalytics = useQuery<MarketingAnalyticsData[]>({
    queryKey: ['marketing-analytics-optimized', memoizedDateRange.key],
    queryFn: async () => {
      console.time('Marketing Analytics Query');
      
      const { data, error } = await supabase
        .from('marketing_analytics')
        .select('date, channel, campaign_name, impressions, clicks, conversions, revenue, cost, roas')
        .gte('date', format(memoizedDateRange.from, 'yyyy-MM-dd'))
        .lte('date', format(memoizedDateRange.to, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      console.timeEnd('Marketing Analytics Query');
      
      if (error) {
        console.error('Marketing Analytics Error:', error);
        throw error;
      }
      
      return (data || []) as MarketingAnalyticsData[];
    },
    staleTime,
    gcTime,
    refetchOnWindowFocus
  });

  // Memoized calculated metrics for performance
  const calculatedMetrics = useMemo(() => {
    if (!websiteAnalytics.data || !trafficAnalytics.data || !marketingAnalytics.data) {
      return null;
    }

    // Website metrics
    const websiteTotals = websiteAnalytics.data.reduce((acc, day) => ({
      visitors: acc.visitors + day.visitors,
      pageViews: acc.pageViews + day.page_views,
      uniqueVisitors: acc.uniqueVisitors + day.unique_visitors,
      bounceRate: acc.bounceRate + day.bounce_rate,
      sessionDuration: acc.sessionDuration + day.session_duration,
      count: acc.count + 1
    }), { visitors: 0, pageViews: 0, uniqueVisitors: 0, bounceRate: 0, sessionDuration: 0, count: 0 });

    // Traffic source aggregation
    const trafficSources = trafficAnalytics.data.reduce((acc, item) => {
      const key = item.source;
      if (!acc[key]) {
        acc[key] = { source: key, sessions: 0, users: 0, bounceRate: 0, count: 0 };
      }
      acc[key].sessions += item.sessions;
      acc[key].users += item.users;
      acc[key].bounceRate += item.bounce_rate;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, any>);

    // Marketing totals
    const marketingTotals = marketingAnalytics.data.reduce((acc, day) => ({
      impressions: acc.impressions + day.impressions,
      clicks: acc.clicks + day.clicks,
      conversions: acc.conversions + day.conversions,
      revenue: acc.revenue + day.revenue,
      cost: acc.cost + day.cost
    }), { impressions: 0, clicks: 0, conversions: 0, revenue: 0, cost: 0 });

    return {
      website: {
        totalVisitors: websiteTotals.visitors,
        totalPageViews: websiteTotals.pageViews,
        avgBounceRate: websiteTotals.count > 0 ? websiteTotals.bounceRate / websiteTotals.count : 0,
        avgSessionDuration: websiteTotals.count > 0 ? websiteTotals.sessionDuration / websiteTotals.count : 0,
        uniqueVisitors: websiteTotals.uniqueVisitors
      },
      traffic: {
        totalSessions: Object.values(trafficSources).reduce((sum: number, item: any) => sum + item.sessions, 0),
        topSources: Object.values(trafficSources).sort((a: any, b: any) => b.users - a.users).slice(0, 5)
      },
      marketing: {
        totalReach: marketingTotals.impressions,
        totalRevenue: marketingTotals.revenue,
        totalCost: marketingTotals.cost,
        avgROAS: marketingTotals.cost > 0 ? (marketingTotals.revenue / marketingTotals.cost) * 100 : 0,
        conversionRate: marketingTotals.clicks > 0 ? (marketingTotals.conversions / marketingTotals.clicks) * 100 : 0
      }
    };
  }, [websiteAnalytics.data, trafficAnalytics.data, marketingAnalytics.data]);

  // Performance monitoring
  const performanceMetrics = useMemo(() => ({
    queriesInProgress: [websiteAnalytics.isLoading, trafficAnalytics.isLoading, marketingAnalytics.isLoading].filter(Boolean).length,
    hasErrors: !!(websiteAnalytics.error || trafficAnalytics.error || marketingAnalytics.error),
    dataFreshness: {
      website: websiteAnalytics.dataUpdatedAt,
      traffic: trafficAnalytics.dataUpdatedAt,
      marketing: marketingAnalytics.dataUpdatedAt
    },
    cacheHitRatio: {
      website: websiteAnalytics.isStale ? 'stale' : 'fresh',
      traffic: trafficAnalytics.isStale ? 'stale' : 'fresh',
      marketing: marketingAnalytics.isStale ? 'stale' : 'fresh'
    }
  }), [
    websiteAnalytics.isLoading, websiteAnalytics.error, websiteAnalytics.dataUpdatedAt, websiteAnalytics.isStale,
    trafficAnalytics.isLoading, trafficAnalytics.error, trafficAnalytics.dataUpdatedAt, trafficAnalytics.isStale,
    marketingAnalytics.isLoading, marketingAnalytics.error, marketingAnalytics.dataUpdatedAt, marketingAnalytics.isStale
  ]);

  // Optimized refresh function
  const refreshAll = useCallback(async () => {
    console.log('Refreshing all analytics data...');
    const startTime = performance.now();
    
    await Promise.all([
      websiteAnalytics.refetch(),
      trafficAnalytics.refetch(),
      marketingAnalytics.refetch()
    ]);
    
    const endTime = performance.now();
    console.log(`Analytics refresh completed in ${endTime - startTime}ms`);
  }, [websiteAnalytics.refetch, trafficAnalytics.refetch, marketingAnalytics.refetch]);

  return {
    // Data
    websiteData: websiteAnalytics.data,
    trafficData: trafficAnalytics.data,
    marketingData: marketingAnalytics.data,
    
    // Calculated metrics
    metrics: calculatedMetrics,
    
    // Loading states
    isLoading: websiteAnalytics.isLoading || trafficAnalytics.isLoading || marketingAnalytics.isLoading,
    
    // Error states
    errors: {
      website: websiteAnalytics.error,
      traffic: trafficAnalytics.error,
      marketing: marketingAnalytics.error
    },
    
    // Performance monitoring
    performance: performanceMetrics,
    
    // Actions
    refreshAll
  };
};

// Utility for testing data integrity
export const validateAnalyticsData = (data: any[], type: string) => {
  const issues: string[] = [];
  
  if (!data || data.length === 0) {
    issues.push(`${type}: No data available`);
    return issues;
  }
  
  data.forEach((row, index) => {
    // Check for required fields based on type
    if (type === 'website') {
      if (!row.date) issues.push(`${type}[${index}]: Missing date`);
      if (typeof row.visitors !== 'number') issues.push(`${type}[${index}]: Invalid visitors data`);
      if (typeof row.page_views !== 'number') issues.push(`${type}[${index}]: Invalid page_views data`);
    }
    
    if (type === 'traffic') {
      if (!row.source) issues.push(`${type}[${index}]: Missing source`);
      if (typeof row.sessions !== 'number') issues.push(`${type}[${index}]: Invalid sessions data`);
    }
    
    if (type === 'marketing') {
      if (!row.channel) issues.push(`${type}[${index}]: Missing channel`);
      if (typeof row.cost !== 'number') issues.push(`${type}[${index}]: Invalid cost data`);
      if (typeof row.revenue !== 'number') issues.push(`${type}[${index}]: Invalid revenue data`);
    }
  });
  
  return issues;
};