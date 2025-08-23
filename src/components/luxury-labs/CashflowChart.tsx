import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock cashflow data - in real implementation, this would come from API
const cashflowData = [
  { month: 'Jan', inflow: 850000, outflow: 420000, net: 430000 },
  { month: 'Feb', inflow: 1200000, outflow: 580000, net: 620000 },
  { month: 'Mar', inflow: 950000, outflow: 650000, net: 300000 },
  { month: 'Apr', inflow: 1450000, outflow: 720000, net: 730000 },
  { month: 'May', inflow: 1100000, outflow: 890000, net: 210000 },
  { month: 'Jun', inflow: 1350000, outflow: 560000, net: 790000 },
];

const projectProfitability = [
  { project: 'Marina Tower', budget: 180000, actual: 175000, revenue: 220000, margin: 25.7 },
  { project: 'Palm Villa', budget: 650000, actual: 620000, revenue: 850000, margin: 36.9 },
  { project: 'Downtown Flip', budget: 95000, actual: 94500, revenue: 120000, margin: 26.9 },
];

export function CashflowChart() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Cashflow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Cashflow 30/60/90
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowData}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stackId="1"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorInflow)"
                  name="Inflow"
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stackId="2"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorOutflow)"
                  name="Outflow"
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  name="Net Cashflow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gross Margin by Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Gross Margin by Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectProfitability.map((project) => (
              <div key={project.project} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{project.project}</span>
                  <span className="text-sm font-bold text-green-600">
                    {project.margin.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Budget: {formatCurrency(project.budget)}</span>
                  <span>Actual: {formatCurrency(project.actual)}</span>
                  <span>Revenue: {formatCurrency(project.revenue)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(project.margin / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}