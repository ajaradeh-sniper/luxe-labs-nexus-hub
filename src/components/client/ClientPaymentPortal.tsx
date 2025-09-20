import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  DollarSign, 
  Receipt, 
  Calendar, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Calculator,
  FileText
} from "lucide-react"

interface Payment {
  id: number
  invoiceNumber: string
  project: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'pending' | 'paid' | 'overdue' | 'partial'
  description: string
  milestonePhase: string
  paymentMethod?: string
  late_fee?: number
}

interface BudgetBreakdown {
  category: string
  budgeted: number
  spent: number
  remaining: number
  percentage: number
}

export function ClientPaymentPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'budget' | 'history'>('overview')

  const payments: Payment[] = [
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      project: "Downtown Apartment Renovation",
      amount: 135000,
      dueDate: "2024-01-25",
      status: "pending",
      description: "Kitchen Installation Phase - Materials & Labor",
      milestonePhase: "Kitchen Installation",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      project: "Business Bay Office Design",
      amount: 45000,
      dueDate: "2024-01-20",
      paidDate: "2024-01-18",
      status: "paid",
      description: "Design Phase Completion",
      milestonePhase: "Design Development",
      paymentMethod: "Credit Card"
    },
    {
      id: 3,
      invoiceNumber: "INV-2023-098",
      project: "Downtown Apartment Renovation",
      amount: 85000,
      dueDate: "2024-01-10",
      paidDate: "2024-01-08",
      status: "paid",
      description: "Structural Work & Electrical Installation",
      milestonePhase: "Structural Phase",
      paymentMethod: "Bank Transfer"
    }
  ]

  const budgetBreakdowns: BudgetBreakdown[] = [
    { category: "Materials & Supplies", budgeted: 200000, spent: 145000, remaining: 55000, percentage: 72.5 },
    { category: "Labor & Installation", budgeted: 150000, spent: 98000, remaining: 52000, percentage: 65.3 },
    { category: "Design & Planning", budgeted: 50000, spent: 45000, remaining: 5000, percentage: 90.0 },
    { category: "Permits & Fees", budgeted: 25000, spent: 18000, remaining: 7000, percentage: 72.0 },
    { category: "Contingency", budgeted: 25000, spent: 5000, remaining: 20000, percentage: 20.0 }
  ]

  const getTotalBudget = () => budgetBreakdowns.reduce((acc, item) => acc + item.budgeted, 0)
  const getTotalSpent = () => budgetBreakdowns.reduce((acc, item) => acc + item.spent, 0)
  const getTotalRemaining = () => budgetBreakdowns.reduce((acc, item) => acc + item.remaining, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800'
      case 'pending': return 'bg-amber-100 text-amber-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'partial': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'overdue': return <AlertTriangle className="h-4 w-4" />
      case 'partial': return <TrendingUp className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString()}`
  }

  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'overdue')
  const totalPending = pendingPayments.reduce((acc, p) => acc + p.amount, 0)
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'outline'}
          onClick={() => setActiveTab('overview')}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Payment Overview
        </Button>
        <Button
          variant={activeTab === 'invoices' ? 'default' : 'outline'}
          onClick={() => setActiveTab('invoices')}
        >
          <Receipt className="h-4 w-4 mr-2" />
          Invoices
        </Button>
        <Button
          variant={activeTab === 'budget' ? 'default' : 'outline'}
          onClick={() => setActiveTab('budget')}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Budget Tracking
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'outline'}
          onClick={() => setActiveTab('history')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Payment History
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Project Budget</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(getTotalBudget())}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount Paid</p>
                    <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                    <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalPending)}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Remaining Budget</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(getTotalRemaining())}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Project Payment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Total Paid: {formatCurrency(totalPaid)}</span>
                  <span>Total Budget: {formatCurrency(getTotalBudget())}</span>
                </div>
                <Progress value={(totalPaid / getTotalBudget()) * 100} className="h-4" />
                <p className="text-sm text-muted-foreground">
                  {((totalPaid / getTotalBudget()) * 100).toFixed(1)}% of total project budget paid
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments Alert */}
          {pendingPayments.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 mb-2">
                      {pendingPayments.length} Pending Payment{pendingPayments.length > 1 ? 's' : ''}
                    </h3>
                    <p className="text-amber-800 mb-4">
                      Total amount due: {formatCurrency(totalPending)}
                    </p>
                    <Button className="bg-amber-600 text-white hover:bg-amber-700">
                      View Pending Invoices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{payment.invoiceNumber}</h3>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">{payment.status}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{payment.project}</p>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due: {payment.dueDate}
                      </span>
                      {payment.paidDate && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle className="h-4 w-4" />
                          Paid: {payment.paidDate}
                        </span>
                      )}
                      {payment.paymentMethod && (
                        <span>Method: {payment.paymentMethod}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <p className="text-2xl font-bold">{formatCurrency(payment.amount)}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {payment.status === 'pending' && (
                        <Button size="sm" className="bg-green-600 text-white">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Budget Tracking Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Breakdown by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgetBreakdowns.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{item.percentage.toFixed(1)}% utilized</span>
                    <span>Remaining: {formatCurrency(item.remaining)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Budget Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Total Budgeted</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(getTotalBudget())}</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(getTotalSpent())}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(getTotalRemaining())}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments
                  .filter(p => p.status === 'paid')
                  .sort((a, b) => new Date(b.paidDate || '').getTime() - new Date(a.paidDate || '').getTime())
                  .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.invoiceNumber}</p>
                      <p className="text-sm text-muted-foreground">{payment.project}</p>
                      <p className="text-sm text-muted-foreground">
                        Paid on {payment.paidDate} via {payment.paymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(payment.amount)}</p>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}