import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus
} from "lucide-react"

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock payment data
  const paymentSummary = {
    totalPaid: "AED 2,500,000",
    pendingPayments: "AED 150,000", 
    nextPayment: "AED 75,000",
    nextPaymentDate: "Jan 15, 2025"
  }

  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Initial Investment - Palm Jumeirah Villa",
      amount: "AED 1,200,000",
      date: "2024-06-15",
      status: "completed",
      method: "Bank Transfer",
      reference: "PMT-2024-001"
    },
    {
      id: 2,
      type: "payment", 
      description: "Additional Investment - Dubai Hills Shared Stake",
      amount: "AED 800,000",
      date: "2024-08-22",
      status: "completed", 
      method: "Wire Transfer",
      reference: "PMT-2024-002"
    },
    {
      id: 3,
      type: "return",
      description: "Quarterly Return - Dubai Hills Project",
      amount: "AED 45,000",
      date: "2024-09-30",
      status: "completed",
      method: "Bank Deposit",
      reference: "RTN-2024-001"
    },
    {
      id: 4,
      type: "payment",
      description: "Investment Fee - Diversified Fund",
      amount: "AED 25,000", 
      date: "2024-11-01",
      status: "pending",
      method: "Bank Transfer",
      reference: "PMT-2024-003"
    },
    {
      id: 5,
      type: "return",
      description: "Final Return - Palm Jumeirah Villa (Expected)",
      amount: "AED 340,000",
      date: "2025-01-15",
      status: "scheduled",
      method: "Bank Deposit", 
      reference: "RTN-2025-001"
    }
  ]

  const upcomingPayments = [
    {
      id: 1,
      title: "Quarterly Management Fee",
      amount: "AED 15,000",
      dueDate: "Jan 15, 2025",
      project: "All Active Projects",
      status: "due"
    },
    {
      id: 2, 
      title: "Additional Investment Opportunity",
      amount: "AED 500,000",
      dueDate: "Jan 31, 2025",
      project: "Emirates Hills Premium Villa",
      status: "optional"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary' 
      case 'scheduled': return 'outline'
      case 'due': return 'destructive'
      case 'optional': return 'secondary'
      default: return 'outline'
    }
  }

  const getTransactionIcon = (type: string, status: string) => {
    if (type === 'return') return <ArrowDownLeft className="h-4 w-4 text-green-600" />
    if (status === 'completed') return <ArrowUpRight className="h-4 w-4 text-blue-600" />
    if (status === 'pending') return <Clock className="h-4 w-4 text-yellow-600" />
    return <Calendar className="h-4 w-4 text-gray-600" />
  }

  return (
    <>
      <Helmet>
        <title>Payments | Client Dashboard | Luxury Labs</title>
        <meta name="description" content="Manage your payments and view transaction history" />
      </Helmet>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Payments</h1>
              <p className="text-muted-foreground">Manage your investments payments and transaction history</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>

          {/* Payment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentSummary.totalPaid}</div>
                <p className="text-xs text-muted-foreground">Across all projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentSummary.pendingPayments}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paymentSummary.nextPayment}</div>
                <p className="text-xs text-muted-foreground">Due {paymentSummary.nextPaymentDate}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active methods</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transaction History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>All your payments and returns</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search transactions..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {getTransactionIcon(transaction.type, transaction.status)}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.method} • {transaction.reference}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className={`font-semibold ${transaction.type === 'return' ? 'text-green-600' : 'text-foreground'}`}>
                            {transaction.type === 'return' ? '+' : '-'}{transaction.amount}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                              {transaction.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Payments & Payment Methods */}
            <div className="space-y-6">
              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{payment.title}</h4>
                        <Badge variant={getStatusColor(payment.status)} className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{payment.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{payment.amount}</span>
                        <span className="text-xs text-muted-foreground">{payment.dueDate}</span>
                      </div>
                      <Button size="sm" variant={payment.status === 'due' ? 'default' : 'outline'} className="w-full">
                        {payment.status === 'due' ? 'Pay Now' : 'Schedule Payment'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Emirates NBD ••••1234</span>
                      <Badge variant="secondary">Primary</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Bank Transfer</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">ADCB ••••5678</span>
                      <Badge variant="outline">Secondary</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Wire Transfer</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Payments