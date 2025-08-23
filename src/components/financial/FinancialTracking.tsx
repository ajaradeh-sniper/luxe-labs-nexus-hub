import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Calculator,
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Percent
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

interface Investment {
  id: string
  project_id: string
  project_name: string
  investor_id: string
  investor_name: string
  amount_invested: number
  investment_date: string
  expected_roi: number
  actual_roi?: number
  status: 'active' | 'completed' | 'exited'
  exit_date?: string
  exit_value?: number
  category: string
}

interface Project {
  id: string
  name: string
  total_investment: number
  current_value: number
  roi_percentage: number
  start_date: string
  projected_completion: string
  status: 'planning' | 'active' | 'completed'
  expenses: ProjectExpense[]
}

interface ProjectExpense {
  id: string
  project_id: string
  category: string
  description: string
  amount: number
  date: string
  vendor?: string
  status: 'planned' | 'incurred' | 'paid'
}

interface ROICalculation {
  investment_amount: number
  current_value: number
  roi_percentage: number
  roi_amount: number
  annualized_roi: number
  time_period_months: number
}

interface FinancialMetric {
  id: string
  name: string
  value: number
  target_value: number
  category: string
  period: string
  trend: 'up' | 'down' | 'stable'
  percentage_change: number
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))']

export function FinancialTracking() {
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [investments, setInvestments] = useState<Investment[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [expenses, setExpenses] = useState<ProjectExpense[]>([])
  const [metrics, setMetrics] = useState<FinancialMetric[]>([])
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("12months")
  
  const [newInvestment, setNewInvestment] = useState({
    project_id: "",
    investor_id: "",
    amount_invested: 0,
    expected_roi: 0,
    category: ""
  })
  
  const [newExpense, setNewExpense] = useState({
    project_id: "",
    category: "",
    description: "",
    amount: 0,
    vendor: "",
    date: new Date().toISOString().split('T')[0]
  })

  const [roiCalculator, setRoiCalculator] = useState({
    investment_amount: 0,
    current_value: 0,
    investment_date: "",
    exit_date: ""
  })

  const expenseCategories = [
    "Construction",
    "Materials",
    "Labor", 
    "Permits",
    "Professional Services",
    "Marketing",
    "Legal",
    "Insurance",
    "Utilities",
    "Other"
  ]

  const investmentCategories = [
    "Seed",
    "Series A",
    "Series B", 
    "Bridge",
    "Equity",
    "Debt",
    "Convertible"
  ]

  useEffect(() => {
    loadFinancialData()
  }, [selectedProject, selectedPeriod])

  const loadFinancialData = async () => {
    try {
      // Mock data - replace with actual Supabase queries
      const mockInvestments: Investment[] = [
        {
          id: "1",
          project_id: "proj-1",
          project_name: "Marina Tower Renovation",
          investor_id: "inv-1", 
          investor_name: "John Smith",
          amount_invested: 500000,
          investment_date: "2024-01-15",
          expected_roi: 25,
          actual_roi: 18.5,
          status: "active",
          category: "Equity"
        },
        {
          id: "2",
          project_id: "proj-2",
          project_name: "Business Bay Office",
          investor_id: "inv-2",
          investor_name: "Jane Doe",
          amount_invested: 750000,
          investment_date: "2024-03-01",
          expected_roi: 20,
          status: "active",
          category: "Debt"
        }
      ]

      const mockProjects: Project[] = [
        {
          id: "proj-1",
          name: "Marina Tower Renovation",
          total_investment: 1200000,
          current_value: 1422000,
          roi_percentage: 18.5,
          start_date: "2024-01-01",
          projected_completion: "2024-12-31",
          status: "active",
          expenses: []
        },
        {
          id: "proj-2", 
          name: "Business Bay Office",
          total_investment: 900000,
          current_value: 1080000,
          roi_percentage: 20,
          start_date: "2024-02-15",
          projected_completion: "2025-06-30",
          status: "active",
          expenses: []
        }
      ]

      const mockExpenses: ProjectExpense[] = [
        {
          id: "exp-1",
          project_id: "proj-1",
          category: "Construction",
          description: "Foundation work",
          amount: 85000,
          date: "2024-02-01",
          vendor: "ABC Construction",
          status: "paid"
        },
        {
          id: "exp-2",
          project_id: "proj-1", 
          category: "Materials",
          description: "Marble flooring",
          amount: 42000,
          date: "2024-03-15",
          vendor: "Luxury Materials Ltd",
          status: "incurred"
        }
      ]

      const mockMetrics: FinancialMetric[] = [
        {
          id: "1",
          name: "Total Portfolio Value",
          value: 2502000,
          target_value: 3000000,
          category: "Portfolio",
          period: "Current",
          trend: "up",
          percentage_change: 12.5
        },
        {
          id: "2",
          name: "Average ROI",
          value: 19.25,
          target_value: 25,
          category: "Performance",
          period: "YTD",
          trend: "up",
          percentage_change: 5.8
        }
      ]

      setInvestments(mockInvestments)
      setProjects(mockProjects)
      setExpenses(mockExpenses)
      setMetrics(mockMetrics)
    } catch (error) {
      console.error('Error loading financial data:', error)
    }
  }

  const calculateROI = (): ROICalculation => {
    const { investment_amount, current_value, investment_date, exit_date } = roiCalculator
    
    if (investment_amount <= 0 || current_value <= 0) {
      return {
        investment_amount: 0,
        current_value: 0,
        roi_percentage: 0,
        roi_amount: 0,
        annualized_roi: 0,
        time_period_months: 0
      }
    }

    const roi_amount = current_value - investment_amount
    const roi_percentage = (roi_amount / investment_amount) * 100
    
    const startDate = new Date(investment_date || Date.now())
    const endDate = new Date(exit_date || Date.now())
    const time_period_months = Math.max(1, (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
    
    const annualized_roi = roi_percentage * (12 / time_period_months)

    return {
      investment_amount,
      current_value,
      roi_percentage,
      roi_amount,
      annualized_roi,
      time_period_months
    }
  }

  const addInvestment = async () => {
    if (!newInvestment.project_id || newInvestment.amount_invested <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const investment: Investment = {
        id: `inv-${Date.now()}`,
        ...newInvestment,
        project_name: projects.find(p => p.id === newInvestment.project_id)?.name || "",
        investor_name: "Current User", // Get from user context
        investment_date: new Date().toISOString().split('T')[0],
        status: "active"
      }

      setInvestments(prev => [...prev, investment])
      setNewInvestment({ project_id: "", investor_id: "", amount_invested: 0, expected_roi: 0, category: "" })

      toast({
        title: "Investment added",
        description: "New investment has been recorded successfully"
      })
    } catch (error) {
      console.error('Error adding investment:', error)
      toast({
        title: "Error",
        description: "Failed to add investment",
        variant: "destructive"
      })
    }
  }

  const addExpense = async () => {
    if (!newExpense.project_id || !newExpense.description || newExpense.amount <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const expense: ProjectExpense = {
        id: `exp-${Date.now()}`,
        ...newExpense,
        status: "incurred"
      }

      setExpenses(prev => [...prev, expense])
      setNewExpense({
        project_id: "",
        category: "",
        description: "",
        amount: 0,
        vendor: "",
        date: new Date().toISOString().split('T')[0]
      })

      toast({
        title: "Expense added", 
        description: "New expense has been recorded successfully"
      })
    } catch (error) {
      console.error('Error adding expense:', error)
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive"
      })
    }
  }

  const getPortfolioSummary = () => {
    const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount_invested, 0)
    const totalCurrentValue = projects.reduce((sum, proj) => sum + proj.current_value, 0)
    const totalROI = totalInvestment > 0 ? ((totalCurrentValue - totalInvestment) / totalInvestment) * 100 : 0
    const activeInvestments = investments.filter(inv => inv.status === 'active').length
    
    return { totalInvestment, totalCurrentValue, totalROI, activeInvestments }
  }

  const getExpensesByCategory = () => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100
    }))
  }

  const portfolioSummary = getPortfolioSummary()
  const expenseBreakdown = getExpensesByCategory()
  const roiResults = calculateROI()

  const chartData = projects.map(project => ({
    name: project.name,
    investment: project.total_investment,
    current_value: project.current_value,
    roi: project.roi_percentage
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Tracking & ROI</h2>
        <div className="flex gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioSummary.totalInvestment.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioSummary.totalCurrentValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio ROI</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioSummary.totalROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioSummary.totalROI.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioSummary.activeInvestments}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: any, name: string) => [
                      typeof value === 'number' ? `$${value.toLocaleString()}` : value,
                      name
                    ]} />
                    <Legend />
                    <Bar dataKey="investment" fill="hsl(var(--primary))" name="Investment" />
                    <Bar dataKey="current_value" fill="hsl(var(--secondary))" name="Current Value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category} ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Started: {new Date(project.start_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Investment</p>
                      <p className="font-medium">${project.total_investment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Value</p>
                      <p className="font-medium">${project.current_value.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">ROI Progress</span>
                      <span className={`text-sm font-bold ${project.roi_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {project.roi_percentage.toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={Math.min(100, Math.max(0, project.roi_percentage))} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Investment Tracking</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Investment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record New Investment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inv-project">Project</Label>
                    <Select value={newInvestment.project_id} onValueChange={(value) => 
                      setNewInvestment({...newInvestment, project_id: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inv-amount">Investment Amount</Label>
                      <Input
                        id="inv-amount"
                        type="number"
                        value={newInvestment.amount_invested}
                        onChange={(e) => setNewInvestment({...newInvestment, amount_invested: parseFloat(e.target.value)})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inv-roi">Expected ROI %</Label>
                      <Input
                        id="inv-roi"
                        type="number"
                        value={newInvestment.expected_roi}
                        onChange={(e) => setNewInvestment({...newInvestment, expected_roi: parseFloat(e.target.value)})}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="inv-category">Investment Type</Label>
                    <Select value={newInvestment.category} onValueChange={(value) => 
                      setNewInvestment({...newInvestment, category: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={addInvestment} className="w-full">
                    Record Investment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{investment.project_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {investment.investor_name} • {new Date(investment.investment_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold">${investment.amount_invested.toLocaleString()}</p>
                      <Badge variant="outline" className={investment.category === 'Equity' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {investment.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Expected ROI</p>
                      <p className="font-medium">{investment.expected_roi}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Actual ROI</p>
                      <p className={`font-medium ${investment.actual_roi ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {investment.actual_roi ? `${investment.actual_roi}%` : 'Pending'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Expense Tracking</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record New Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exp-project">Project</Label>
                    <Select value={newExpense.project_id} onValueChange={(value) => 
                      setNewExpense({...newExpense, project_id: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exp-category">Category</Label>
                      <Select value={newExpense.category} onValueChange={(value) => 
                        setNewExpense({...newExpense, category: value})
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="exp-amount">Amount</Label>
                      <Input
                        id="exp-amount"
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="exp-description">Description</Label>
                    <Textarea
                      id="exp-description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      placeholder="Enter expense description..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exp-vendor">Vendor (Optional)</Label>
                      <Input
                        id="exp-vendor"
                        value={newExpense.vendor}
                        onChange={(e) => setNewExpense({...newExpense, vendor: e.target.value})}
                        placeholder="Vendor name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="exp-date">Date</Label>
                      <Input
                        id="exp-date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={addExpense} className="w-full">
                    Record Expense
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {expenses.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{expense.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {expense.vendor} • {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold">${expense.amount.toLocaleString()}</p>
                      <Badge variant={
                        expense.status === 'paid' ? 'default' :
                        expense.status === 'incurred' ? 'secondary' : 'outline'
                      }>
                        {expense.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                ROI Calculator
              </CardTitle>
              <CardDescription>
                Calculate return on investment with different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calc-investment">Initial Investment</Label>
                  <Input
                    id="calc-investment"
                    type="number"
                    value={roiCalculator.investment_amount}
                    onChange={(e) => setRoiCalculator({...roiCalculator, investment_amount: parseFloat(e.target.value) || 0})}
                    placeholder="Enter investment amount"
                  />
                </div>
                <div>
                  <Label htmlFor="calc-value">Current/Exit Value</Label>
                  <Input
                    id="calc-value"
                    type="number"
                    value={roiCalculator.current_value}
                    onChange={(e) => setRoiCalculator({...roiCalculator, current_value: parseFloat(e.target.value) || 0})}
                    placeholder="Enter current value"
                  />
                </div>
                <div>
                  <Label htmlFor="calc-start">Investment Date</Label>
                  <Input
                    id="calc-start"
                    type="date"
                    value={roiCalculator.investment_date}
                    onChange={(e) => setRoiCalculator({...roiCalculator, investment_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="calc-end">Exit Date (Optional)</Label>
                  <Input
                    id="calc-end"
                    type="date"
                    value={roiCalculator.exit_date}
                    onChange={(e) => setRoiCalculator({...roiCalculator, exit_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">ROI Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    ${roiResults.roi_amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">ROI Percentage</p>
                  <p className="text-xl font-bold">
                    {roiResults.roi_percentage.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Annualized ROI</p>
                  <p className="text-xl font-bold">
                    {roiResults.annualized_roi.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Time Period</p>
                  <p className="text-xl font-bold">
                    {roiResults.time_period_months.toFixed(1)} months
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{investments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Best Performing Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.length > 0 
                    ? projects.reduce((best, current) => current.roi_percentage > best.roi_percentage ? current : best).name
                    : 'N/A'
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}