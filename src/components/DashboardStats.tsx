import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Building2, FileText, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string
  change: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon: React.ReactNode
  color?: string
}

function StatCard({ title, value, change, icon, color = "primary" }: StatCardProps) {
  const isPositive = change.type === 'increase'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  
  return (
    <Card className="hover:shadow-luxury transition-all duration-300 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-luxury opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-12 w-12 rounded-xl bg-gradient-luxury flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="text-white h-6 w-6 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2 bg-gradient-luxury bg-clip-text text-transparent">
          {value}
        </div>
        <div className="flex items-center text-sm">
          <div className={`flex items-center px-2 py-1 rounded-full ${
            isPositive 
              ? 'bg-success/10 text-success' 
              : 'bg-destructive/10 text-destructive'
          }`}>
            <TrendIcon className="h-3 w-3 mr-1" />
            <span className="font-medium">{Math.abs(change.value)}%</span>
          </div>
          <span className="ml-2 text-muted-foreground text-xs">vs {change.period}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$24.5M",
      change: { value: 12.5, type: 'increase' as const, period: 'last month' },
      icon: <DollarSign className="h-4 w-4" />,
      color: "primary"
    },
    {
      title: "Active Properties",
      value: "18",
      change: { value: 8.2, type: 'increase' as const, period: 'last quarter' },
      icon: <Building2 className="h-4 w-4" />,
      color: "success"
    },
    {
      title: "Pending Documents",
      value: "7",
      change: { value: 15.3, type: 'decrease' as const, period: 'last week' },
      icon: <FileText className="h-4 w-4" />,
      color: "warning"
    },
    {
      title: "Active Partnerships",
      value: "12",
      change: { value: 5.7, type: 'increase' as const, period: 'last month' },
      icon: <Users className="h-4 w-4" />,
      color: "accent"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}