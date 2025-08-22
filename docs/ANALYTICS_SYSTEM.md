# Luxury Labs Analytics System Documentation

## Overview

The Luxury Labs Analytics System provides comprehensive real-time analytics for website performance, traffic analysis, and marketing campaigns. This system replaces all mock data with live database integration and offers advanced performance optimization.

## 🏗️ Architecture

### Database Schema
The analytics system uses five main tables:

#### 1. website_analytics
- **Purpose**: Track website performance metrics
- **Columns**: `id`, `date`, `visitors`, `page_views`, `unique_visitors`, `bounce_rate`, `session_duration`
- **RLS**: Role-based access for administrators, marketing leads, and real estate directors

#### 2. traffic_analytics  
- **Purpose**: Monitor traffic sources and user acquisition
- **Columns**: `id`, `date`, `source`, `medium`, `campaign`, `sessions`, `users`, `new_users`, `bounce_rate`
- **RLS**: Same as website_analytics

#### 3. marketing_analytics
- **Purpose**: Track marketing campaign performance
- **Columns**: `id`, `date`, `channel`, `campaign_name`, `impressions`, `clicks`, `conversions`, `revenue`, `cost`, `roas`
- **RLS**: Marketing-focused access control

#### 4. campaign_analytics
- **Purpose**: Detailed campaign-specific metrics
- **Columns**: `id`, `campaign_id`, `date`, `impressions`, `clicks`, `conversions`, `spend`, `ctr`, `cpc`
- **RLS**: Campaign managers and administrators

#### 5. conversion_analytics
- **Purpose**: Track conversion events and values
- **Columns**: `id`, `date`, `conversion_type`, `source`, `value`, `count`
- **RLS**: Marketing and analysis teams

## 🎯 Core Hooks

### useOptimizedAnalytics
Performance-optimized hook with advanced caching and memoization.

```typescript
const {
  websiteData,
  trafficData, 
  marketingData,
  metrics,
  isLoading,
  errors,
  performance,
  refreshAll
} = useOptimizedAnalytics(dateRange, options)
```

**Features:**
- ⚡ Memoized date ranges prevent unnecessary re-renders
- 🔄 Advanced caching with configurable stale time and GC time
- 📊 Real-time calculated metrics 
- 🚀 Performance monitoring with query timing
- 🛡️ Comprehensive error handling

### Legacy Hooks (Maintained for Compatibility)
- `useWebsiteAnalytics(dateRange)` - Basic website metrics
- `useTrafficAnalytics(dateRange)` - Traffic source analysis
- `useMarketingAnalytics(dateRange)` - Marketing campaign data
- `useConversionAnalytics(dateRange)` - Conversion tracking

## 📈 Components

### WebsiteAnalytics Component
**Location**: `src/components/analytics/WebsiteAnalytics.tsx`

**Features:**
- ✅ Real-time data integration (no more mock data)
- ✅ Dynamic time range filtering (7d, 30d, 90d)
- ✅ CSV export functionality
- ✅ Refresh button with loading states
- ✅ Error handling with retry capability
- ✅ Performance optimizations

**Key Metrics:**
- Total/Unique visitors
- Page views and session duration  
- Bounce rate trends
- Device breakdown

### TrafficAnalytics Component  
**Location**: `src/pages/TrafficAnalytics.tsx`

**Features:**
- ✅ Real traffic source analysis
- ✅ Device distribution charts
- ✅ Geographic and channel insights
- ✅ Export capabilities
- ✅ Performance dashboards

**Key Metrics:**
- Traffic sources (Organic, Direct, Social, Paid)
- Session and user metrics
- Bounce rate by source
- Device performance analysis

### MarketingTools Component
**Location**: `src/pages/MarketingTools.tsx`

**Features:**
- ✅ Real marketing campaign data
- ✅ ROI and ROAS calculations
- ✅ Campaign management UI
- ✅ Performance trending
- ✅ Export and reporting

**Key Metrics:**
- Campaign reach and impressions
- Click-through and conversion rates
- Revenue vs cost analysis
- Channel performance comparison

## 🚀 Performance Optimizations

### Query Optimization
1. **Selective Field Loading**: Only required columns are fetched
2. **Date Range Optimization**: Proper indexing on date columns
3. **Memoized Calculations**: Heavy computations are cached
4. **Batch Loading**: Multiple queries executed in parallel

### Caching Strategy
- **Stale Time**: 5 minutes (configurable)
- **GC Time**: 30 minutes (configurable)
- **Refresh Strategy**: Background updates with fresh data
- **Query Keys**: Optimized with memoized date ranges

### Performance Monitoring
```typescript
const performanceMetrics = {
  queriesInProgress: number,
  hasErrors: boolean,
  dataFreshness: {
    website: timestamp,
    traffic: timestamp, 
    marketing: timestamp
  },
  cacheHitRatio: {
    website: 'fresh' | 'stale',
    traffic: 'fresh' | 'stale',
    marketing: 'fresh' | 'stale'
  }
}
```

## 🔧 Configuration

### Date Range Configuration
```typescript
interface OptimizedDateRange {
  from: Date
  to: Date
}

// Predefined ranges
const ranges = {
  '7d': subDays(new Date(), 7),
  '30d': subDays(new Date(), 30), 
  '90d': subDays(new Date(), 90)
}
```

### Cache Configuration
```typescript
interface CacheConfig {
  staleTime?: number // Default: 5 minutes
  gcTime?: number    // Default: 30 minutes  
  refetchOnWindowFocus?: boolean // Default: false
}
```

## 📊 Export Functionality

All analytics components support CSV export:

```typescript
const handleExport = () => {
  const csvContent = [
    ['Date', 'Visitors', 'Page Views', ...],
    ...data.map(row => [row.date, row.visitors, ...])
  ].map(row => row.join(',')).join('\n')
  
  // Download CSV file
  downloadFile(csvContent, 'analytics-export.csv')
}
```

## 🛡️ Security & Access Control

### Row Level Security (RLS)
All analytics tables implement RLS policies:

- **Administrators**: Full access to all analytics
- **Marketing Leads**: Marketing and website analytics  
- **Real Estate Directors**: Website and traffic analytics
- **Other Roles**: Limited or no access

### Data Validation
```typescript
const validateAnalyticsData = (data: any[], type: string) => {
  // Validates required fields
  // Checks data types
  // Returns validation issues
}
```

## 🧪 Testing Strategy

### Unit Tests
- Hook functionality testing
- Data validation testing  
- Error handling verification
- Performance benchmarking

### Integration Tests
- Database query validation
- Component rendering tests
- Export functionality testing
- Caching behavior verification

### Performance Tests
- Query execution timing
- Memory usage monitoring
- Cache hit ratio analysis
- Concurrent load testing

## 📚 API Reference

### Core Functions

#### useOptimizedAnalytics(dateRange, options)
Primary analytics hook with performance optimizations.

**Parameters:**
- `dateRange: OptimizedDateRange` - Date range for queries
- `options: CacheConfig` - Cache and performance options

**Returns:**
- `websiteData: WebsiteAnalyticsData[]` - Website metrics
- `trafficData: TrafficAnalyticsData[]` - Traffic analytics  
- `marketingData: MarketingAnalyticsData[]` - Marketing metrics
- `metrics: CalculatedMetrics` - Computed analytics
- `isLoading: boolean` - Loading state
- `errors: ErrorStates` - Error information
- `performance: PerformanceMetrics` - Performance data
- `refreshAll: () => Promise<void>` - Refresh function

#### validateAnalyticsData(data, type)
Validates analytics data integrity.

**Parameters:**
- `data: any[]` - Data array to validate
- `type: string` - Data type ('website', 'traffic', 'marketing')

**Returns:**
- `string[]` - Array of validation issues

## 🔄 Migration from Mock Data

### Before (Mock Data)
```typescript
const mockData = [
  { date: '2024-01-01', visitors: 1200 }
]
```

### After (Real Data)
```typescript
const { data } = useOptimizedAnalytics(dateRange)
// Real-time data from Supabase
```

## 📈 Metrics Calculation

### Website Metrics
```typescript
{
  totalVisitors: sum(visitors),
  totalPageViews: sum(page_views),
  avgBounceRate: avg(bounce_rate),
  avgSessionDuration: avg(session_duration),
  uniqueVisitors: sum(unique_visitors)
}
```

### Marketing Metrics  
```typescript
{
  totalReach: sum(impressions),
  totalRevenue: sum(revenue),
  totalCost: sum(cost),
  avgROAS: (revenue / cost) * 100,
  conversionRate: (conversions / clicks) * 100
}
```

## 🚀 Future Enhancements

### Planned Features
1. **Real-time Updates**: WebSocket integration for live data
2. **Advanced Filtering**: Multi-dimensional data filtering
3. **Custom Dashboards**: User-configurable analytics views
4. **Predictive Analytics**: AI-powered trend analysis
5. **A/B Testing**: Built-in experiment tracking

### Performance Improvements
1. **Query Optimization**: Advanced database indexing
2. **Edge Caching**: CDN-level analytics caching
3. **Lazy Loading**: Progressive data loading
4. **Background Sync**: Offline-capable analytics

## 🛠️ Troubleshooting

### Common Issues

#### No Data Showing
1. Check RLS policies and user permissions
2. Verify date range parameters
3. Confirm database connectivity
4. Review browser console for errors

#### Performance Issues  
1. Adjust cache configuration
2. Reduce date range scope
3. Monitor network requests
4. Check database query performance

#### Export Problems
1. Verify data availability
2. Check browser download settings
3. Confirm CSV generation logic
4. Test with smaller datasets

### Debug Mode
Enable detailed logging:
```typescript
const analytics = useOptimizedAnalytics(dateRange, {
  staleTime: 0, // Disable caching for debugging
  gcTime: 0     // Immediate cleanup
})

console.log('Performance metrics:', analytics.performance)
```

## 📞 Support

For technical support or questions about the analytics system:

1. **Documentation**: Review this guide and component comments
2. **Console Logs**: Check browser console for detailed error information  
3. **Performance Monitoring**: Use built-in performance metrics
4. **Database Logs**: Review Supabase analytics for query issues

---

**Built with ❤️ for Luxury Labs Real Estate Platform**
*Version 1.0.0 - Complete Analytics Implementation*