import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Target,
  Users,
  Building,
  FileText,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';

interface FundPerformance {
  id: string;
  name: string;
  type: 'luxury_residential' | 'commercial' | 'mixed_use';
  fundSize: number;
  currentValue: number;
  totalInvested: number;
  totalReturned: number;
  roi: number;
  establishedDate: string;
  targetDuration: number; // years
  status: 'active' | 'closed' | 'planned';
  investors: number;
  properties: number;
  quarterlyData: {
    quarter: string;
    year: number;
    value: number;
    cashflow: number;
    roi: number;
  }[];
  riskRating: 'low' | 'medium' | 'high';
  thumbnailImage: string;
  documents: string[];
}

const mockFunds: FundPerformance[] = [
  {
    id: '1',
    name: 'Dubai Marina Luxury Fund',
    type: 'luxury_residential',
    fundSize: 50000000,
    currentValue: 68500000,
    totalInvested: 45000000,
    totalReturned: 12000000,
    roi: 37.0,
    establishedDate: '2021-01-15',
    targetDuration: 5,
    status: 'active',
    investors: 24,
    properties: 8,
    quarterlyData: [
      { quarter: 'Q1', year: 2021, value: 50000000, cashflow: 0, roi: 0 },
      { quarter: 'Q2', year: 2021, value: 52000000, cashflow: 500000, roi: 4.0 },
      { quarter: 'Q3', year: 2021, value: 54500000, cashflow: 750000, roi: 9.0 },
      { quarter: 'Q4', year: 2021, value: 56800000, cashflow: 1200000, roi: 13.6 },
      { quarter: 'Q1', year: 2022, value: 59200000, cashflow: 1800000, roi: 18.4 },
      { quarter: 'Q2', year: 2022, value: 61800000, cashflow: 2100000, roi: 23.6 },
      { quarter: 'Q3', year: 2022, value: 63900000, cashflow: 2600000, roi: 27.8 },
      { quarter: 'Q4', year: 2022, value: 65200000, cashflow: 3200000, roi: 30.4 },
      { quarter: 'Q1', year: 2023, value: 66800000, cashflow: 3800000, roi: 33.6 },
      { quarter: 'Q2', year: 2023, value: 67900000, cashflow: 4200000, roi: 35.8 },
      { quarter: 'Q3', year: 2023, value: 68500000, cashflow: 4800000, roi: 37.0 }
    ],
    riskRating: 'medium',
    thumbnailImage: '/lovable-uploads/d2dfa4c3-7fd3-40db-af51-ad041d2b2ce2.png',
    documents: ['fund_prospectus.pdf', 'annual_report_2023.pdf', 'audit_report.pdf']
  },
  {
    id: '2',
    name: 'DIFC Commercial Fund',
    type: 'commercial',
    fundSize: 75000000,
    currentValue: 89200000,
    totalInvested: 68000000,
    totalReturned: 18500000,
    roi: 31.2,
    establishedDate: '2020-06-01',
    targetDuration: 7,
    status: 'active',
    investors: 18,
    properties: 5,
    quarterlyData: [
      { quarter: 'Q1', year: 2020, value: 75000000, cashflow: 0, roi: 0 },
      { quarter: 'Q2', year: 2020, value: 76500000, cashflow: 800000, roi: 2.0 },
      { quarter: 'Q3', year: 2020, value: 78200000, cashflow: 1200000, roi: 4.3 },
      { quarter: 'Q4', year: 2020, value: 79800000, cashflow: 1800000, roi: 6.4 },
      { quarter: 'Q1', year: 2021, value: 81600000, cashflow: 2400000, roi: 8.8 },
      { quarter: 'Q2', year: 2021, value: 83400000, cashflow: 3100000, roi: 11.2 },
      { quarter: 'Q3', year: 2021, value: 85100000, cashflow: 3800000, roi: 13.5 },
      { quarter: 'Q4', year: 2021, value: 86900000, cashflow: 4600000, roi: 15.9 },
      { quarter: 'Q1', year: 2022, value: 87800000, cashflow: 5200000, roi: 17.1 },
      { quarter: 'Q2', year: 2022, value: 88600000, cashflow: 5900000, roi: 18.1 },
      { quarter: 'Q3', year: 2022, value: 89200000, cashflow: 6500000, roi: 18.9 }
    ],
    riskRating: 'low',
    thumbnailImage: '/lovable-uploads/d4ad1a46-cb19-4670-bb37-9f665291308a.png',
    documents: ['commercial_analysis.pdf', 'tenant_reports.pdf', 'valuation_update.pdf']
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
  planned: 'bg-blue-100 text-blue-800'
};

const riskColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

export function FundPerformanceManagement() {
  const [selectedFund, setSelectedFund] = useState<FundPerformance>(mockFunds[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateAnnualizedReturn = (fund: FundPerformance) => {
    const yearsActive = (new Date().getTime() - new Date(fund.establishedDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
    return Math.pow((fund.currentValue / fund.totalInvested), (1 / yearsActive)) - 1;
  };

  const totalFundValue = mockFunds.reduce((sum, fund) => sum + fund.currentValue, 0);
  const totalInvestors = mockFunds.reduce((sum, fund) => sum + fund.investors, 0);
  const totalProperties = mockFunds.reduce((sum, fund) => sum + fund.properties, 0);
  const averageROI = mockFunds.reduce((sum, fund) => sum + fund.roi, 0) / mockFunds.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fund Management</h1>
          <p className="text-muted-foreground">
            Monitor and analyze fund performance with quarterly insights (3-7 year horizon)
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Statement
          </Button>
        </div>
      </div>

      {/* Overall Fund Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fund Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFundValue)}</div>
            <p className="text-xs text-muted-foreground">Across all funds</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvestors}</div>
            <p className="text-xs text-muted-foreground">Active participants</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">In portfolio</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageROI.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>
      </div>

      {/* Fund Selection Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Portfolio</CardTitle>
          <CardDescription>Select a fund to view detailed performance analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFunds.map((fund) => (
              <Card 
                key={fund.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedFund.id === fund.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedFund(fund)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={fund.thumbnailImage} 
                        alt={fund.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{fund.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {fund.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Value:</span>
                      <span className="font-medium">{formatCurrency(fund.currentValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI:</span>
                      <span className="font-medium text-green-600">{fund.roi}%</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[fund.status]}>
                        {fund.status}
                      </Badge>
                      <Badge className={riskColors[fund.riskRating]}>
                        {fund.riskRating} risk
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Fund Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <img 
                src={selectedFund.thumbnailImage} 
                alt={selectedFund.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-xl">{selectedFund.name}</CardTitle>
              <CardDescription>
                Established {new Date(selectedFund.establishedDate).getFullYear()} • 
                {selectedFund.targetDuration} year target duration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              <TabsTrigger value="captable">Cap Table</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{formatCurrency(selectedFund.fundSize)}</div>
                    <p className="text-sm text-muted-foreground">Fund Size</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{selectedFund.investors}</div>
                    <p className="text-sm text-muted-foreground">Investors</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{selectedFund.properties}</div>
                    <p className="text-sm text-muted-foreground">Properties</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Invested:</span>
                      <span className="font-medium">{formatCurrency(selectedFund.totalInvested)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-medium">{formatCurrency(selectedFund.currentValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Returned:</span>
                      <span className="font-medium text-green-600">{formatCurrency(selectedFund.totalReturned)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current ROI:</span>
                      <span className="font-bold text-green-600">{selectedFund.roi}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annualized Return:</span>
                      <span className="font-bold text-blue-600">
                        {(calculateAnnualizedReturn(selectedFund) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fund Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Investment Progress</span>
                        <span>{((selectedFund.totalInvested / selectedFund.fundSize) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(selectedFund.totalInvested / selectedFund.fundSize) * 100} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Time Elapsed</span>
                        <span>
                          {Math.floor((new Date().getTime() - new Date(selectedFund.establishedDate).getTime()) / (1000 * 60 * 60 * 24 * 365 * 100)) / 100} years
                        </span>
                      </div>
                      <Progress 
                        value={((new Date().getTime() - new Date(selectedFund.establishedDate).getTime()) / (1000 * 60 * 60 * 24 * 365 * selectedFund.targetDuration)) * 100} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Performance Trend</CardTitle>
                  <CardDescription>Fund value and ROI progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedFund.quarterlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'value' ? formatCurrency(Number(value)) : `${value}%`,
                            name === 'value' ? 'Fund Value' : 'ROI'
                          ]}
                        />
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          name="value"
                        />
                        <Line 
                          yAxisId="right" 
                          type="monotone" 
                          dataKey="roi" 
                          stroke="#82ca9d" 
                          strokeWidth={2}
                          name="roi"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cashflow" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Cash Flow</CardTitle>
                  <CardDescription>Cash distributions to investors by quarter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedFund.quarterlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(Number(value)), 'Cash Flow']}
                        />
                        <Bar dataKey="cashflow" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="captable" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Breakdown</CardTitle>
                    <CardDescription>Current ownership structure and stake distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Luxury Labs (GP)</p>
                          <p className="text-sm text-muted-foreground">General Partner</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">25%</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(selectedFund.currentValue * 0.25)}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Limited Partners</p>
                          <p className="text-sm text-muted-foreground">{selectedFund.investors} investors</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">75%</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(selectedFund.currentValue * 0.75)}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-center">
                          <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'LP Investors', value: 75, fill: '#0088FE' },
                                    { name: 'GP (Luxury Labs)', value: 25, fill: '#00C49F' }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, value }) => `${name}: ${value}%`}
                                  outerRadius={60}
                                  dataKey="value"
                                >
                                  {[{ name: 'LP Investors', value: 75, fill: '#0088FE' }, { name: 'GP (Luxury Labs)', value: 25, fill: '#00C49F' }].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Status & Valuation</CardTitle>
                    <CardDescription>Current market conditions and NAV calculations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 font-medium">Net Asset Value</p>
                        <p className="text-xl font-bold text-green-800">{formatCurrency(selectedFund.currentValue)}</p>
                        <p className="text-xs text-green-600">+{selectedFund.roi}% from inception</p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium">Market Cap</p>
                        <p className="text-xl font-bold text-blue-800">{formatCurrency(selectedFund.currentValue * 1.15)}</p>
                        <p className="text-xs text-blue-600">15% premium to NAV</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Property Valuation:</span>
                        <span className="font-medium">{formatCurrency(selectedFund.currentValue * 0.92)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cash & Equivalents:</span>
                        <span className="font-medium">{formatCurrency(selectedFund.currentValue * 0.05)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Other Assets:</span>
                        <span className="font-medium">{formatCurrency(selectedFund.currentValue * 0.03)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total NAV:</span>
                        <span>{formatCurrency(selectedFund.currentValue)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Market Outlook: Strong</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Dubai real estate market showing robust performance with continued investor confidence and strong rental yields.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Investor Distribution</CardTitle>
                  <CardDescription>Breakdown by investor type and geographic location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">By Investor Type</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High Net Worth Individuals</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Family Offices</span>
                          <span className="font-medium">22%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Institutional</span>
                          <span className="font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">By Geography</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>UAE</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>GCC</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>International</span>
                          <span className="font-medium">25%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Investment Size</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AED 1-5M</span>
                          <span className="font-medium">50%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AED 5-20M</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AED 20M+</span>
                          <span className="font-medium">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Documents</CardTitle>
                  <CardDescription>Important fund documentation and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedFund.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc}</p>
                            <p className="text-sm text-muted-foreground">PDF Document</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}