import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ProjectCosts, CostCategory } from '@/types/projectManagement';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Mock data
const mockCosts: ProjectCosts = {
  id: '1',
  project_id: 'proj-1',
  total_budget: 500000,
  spent_to_date: 285000,
  committed_costs: 75000,
  remaining_budget: 140000,
  cost_variance: -15000,
  cost_performance_index: 0.95,
  estimate_at_completion: 515000,
  cost_categories: [
    {
      id: 'cat-1',
      category: 'Construction',
      budgeted_amount: 300000,
      actual_amount: 165000,
      committed_amount: 50000,
      variance: -10000,
      line_items: [
        {
          id: 'li-1',
          description: 'Foundation work',
          quantity: 1,
          unit_cost: 48000,
          total_cost: 48000,
          vendor: 'ABC Construction',
          invoice_number: 'INV-001',
          date_incurred: '2024-02-14',
          approval_status: 'approved'
        },
        {
          id: 'li-2',
          description: 'Steel framework',
          quantity: 1,
          unit_cost: 117000,
          total_cost: 117000,
          vendor: 'Steel Works LLC',
          date_incurred: '2024-03-01',
          approval_status: 'approved'
        }
      ]
    },
    {
      id: 'cat-2',
      category: 'Design & Planning',
      budgeted_amount: 75000,
      actual_amount: 45000,
      committed_amount: 15000,
      variance: 15000,
      line_items: [
        {
          id: 'li-3',
          description: 'Architectural drawings',
          quantity: 1,
          unit_cost: 25000,
          total_cost: 25000,
          vendor: 'Design Studio Pro',
          date_incurred: '2024-01-20',
          approval_status: 'approved'
        },
        {
          id: 'li-4',
          description: 'Interior design consultation',
          quantity: 80,
          unit_cost: 250,
          total_cost: 20000,
          vendor: 'Interior Experts',
          date_incurred: '2024-02-05',
          approval_status: 'approved'
        }
      ]
    },
    {
      id: 'cat-3',
      category: 'Materials',
      budgeted_amount: 125000,
      actual_amount: 75000,
      committed_amount: 10000,
      variance: -5000,
      line_items: [
        {
          id: 'li-5',
          description: 'Premium tiles',
          quantity: 500,
          unit_cost: 120,
          total_cost: 60000,
          vendor: 'Tile World',
          date_incurred: '2024-02-25',
          approval_status: 'approved'
        },
        {
          id: 'li-6',
          description: 'Lighting fixtures',
          quantity: 25,
          unit_cost: 600,
          total_cost: 15000,
          vendor: 'Luxury Lights',
          date_incurred: '2024-03-05',
          approval_status: 'pending'
        }
      ]
    }
  ],
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-03-10T15:30:00Z'
};

export function CostManagement() {
  const [costs] = useState<ProjectCosts>(mockCosts);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-green-600';
    if (variance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (variance < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-gray-600" />;
  };

  const budgetUtilization = (costs.spent_to_date / costs.total_budget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Cost Management</h3>
          <p className="text-muted-foreground">Track project budget and expenses</p>
        </div>
        <Button>Export Report</Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(costs.total_budget)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spent to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(costs.spent_to_date)}</div>
            <div className="text-xs text-muted-foreground">
              {budgetUtilization.toFixed(1)}% of budget
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(costs.remaining_budget)}</div>
            <div className="text-xs text-muted-foreground">
              Including committed costs
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getVarianceIcon(costs.cost_variance)}
              Cost Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(costs.cost_variance)}`}>
              {formatCurrency(Math.abs(costs.cost_variance))}
            </div>
            <div className="text-xs text-muted-foreground">
              CPI: {costs.cost_performance_index.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Utilization</CardTitle>
          <CardDescription>Progress against total project budget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Utilization</span>
              <span>{budgetUtilization.toFixed(1)}%</span>
            </div>
            <Progress value={budgetUtilization} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Spent: {formatCurrency(costs.spent_to_date)}</span>
              <span>Budget: {formatCurrency(costs.total_budget)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 border rounded-lg">
              <div className="font-medium">Committed</div>
              <div className="text-lg font-bold text-orange-600">{formatCurrency(costs.committed_costs)}</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="font-medium">Estimate at Completion</div>
              <div className="text-lg font-bold text-blue-600">{formatCurrency(costs.estimate_at_completion)}</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="font-medium">Projected Variance</div>
              <div className={`text-lg font-bold ${getVarianceColor(costs.total_budget - costs.estimate_at_completion)}`}>
                {formatCurrency(Math.abs(costs.total_budget - costs.estimate_at_completion))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Cost Categories</TabsTrigger>
          <TabsTrigger value="lineItems">Line Items</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4">
            {costs.cost_categories.map((category) => (
              <Card key={category.id} className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getVarianceIcon(category.variance)}
                      <Badge className={getVarianceColor(category.variance).includes('green') ? 'bg-green-500' : 
                                     getVarianceColor(category.variance).includes('red') ? 'bg-red-500' : 'bg-gray-500'}>
                        {category.variance > 0 ? 'Under Budget' : category.variance < 0 ? 'Over Budget' : 'On Budget'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Budgeted</div>
                      <div className="font-medium">{formatCurrency(category.budgeted_amount)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Actual</div>
                      <div className="font-medium">{formatCurrency(category.actual_amount)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Committed</div>
                      <div className="font-medium">{formatCurrency(category.committed_amount)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Variance</div>
                      <div className={`font-medium ${getVarianceColor(category.variance)}`}>
                        {formatCurrency(Math.abs(category.variance))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent vs Budget</span>
                      <span>{((category.actual_amount / category.budgeted_amount) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(category.actual_amount / category.budgeted_amount) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lineItems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Line Items</CardTitle>
              <CardDescription>All project expenses and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costs.cost_categories.flatMap(category => 
                  category.line_items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.description}</h4>
                          <Badge variant={item.approval_status === 'approved' ? 'default' : 
                                         item.approval_status === 'pending' ? 'secondary' : 'destructive'}>
                            {item.approval_status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.vendor} • {item.invoice_number || 'No invoice'}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.date_incurred).toLocaleDateString()} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.total_cost)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(item.unit_cost)} per unit
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Forecast</CardTitle>
              <CardDescription>Projected costs and budget analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Cost Performance Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cost Performance Index (CPI):</span>
                        <span className={costs.cost_performance_index >= 1 ? 'text-green-600' : 'text-red-600'}>
                          {costs.cost_performance_index.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget Utilization Rate:</span>
                        <span>{budgetUtilization.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Budget:</span>
                        <span>{formatCurrency(costs.remaining_budget)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Project Forecast</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Estimate at Completion:</span>
                        <span>{formatCurrency(costs.estimate_at_completion)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected Variance:</span>
                        <span className={getVarianceColor(costs.total_budget - costs.estimate_at_completion)}>
                          {formatCurrency(Math.abs(costs.total_budget - costs.estimate_at_completion))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Variance %:</span>
                        <span className={getVarianceColor(costs.total_budget - costs.estimate_at_completion)}>
                          {(((costs.estimate_at_completion - costs.total_budget) / costs.total_budget) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {costs.estimate_at_completion > costs.total_budget && (
                  <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-medium text-red-800 dark:text-red-200">Budget Overrun Alert</h4>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Project is forecasted to exceed budget by {formatCurrency(costs.estimate_at_completion - costs.total_budget)}. 
                      Consider cost reduction measures or budget reallocation.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}