import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, FileText, Download, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"

interface FinancialReport {
  id: string
  title: string
  report_type: string
  period_start: string
  period_end: string
  status: string
  data: any
  created_at: string
  updated_at: string
}

export function FinancialReports() {
  const [reports, setReports] = useState<FinancialReport[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    report_type: "",
    notes: ""
  })
  const { toast } = useToast()

  const loadReports = async () => {
    const { data, error } = await supabase
      .from('financial_reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load financial reports",
        variant: "destructive",
      })
      return
    }
    setReports(data || [])
  }

  const createReport = async () => {
    if (!formData.title || !formData.report_type || !startDate || !endDate) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const { error } = await supabase
      .from('financial_reports')
      .insert({
        title: formData.title,
        report_type: formData.report_type,
        period_start: format(startDate, 'yyyy-MM-dd'),
        period_end: format(endDate, 'yyyy-MM-dd'),
        data: { notes: formData.notes }
      })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create report",
        variant: "destructive",
      })
      return
    }
    
    setIsDialogOpen(false)
    setFormData({ title: "", report_type: "", notes: "" })
    setStartDate(undefined)
    setEndDate(undefined)
    toast({
      title: "Success",
      description: "Financial report created successfully",
    })
    loadReports()
  }

  const generateReport = async (reportId: string) => {
    // Mock report generation
    toast({
      title: "Report Generated",
      description: "Financial report has been generated and is ready for download",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success text-success-foreground'
      case 'final': return 'bg-primary text-primary-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'portfolio': return <TrendingUp className="h-4 w-4" />
      case 'roi': return <DollarSign className="h-4 w-4" />
      default: return <BarChart3 className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">Generate and manage detailed financial analysis reports</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Financial Report</DialogTitle>
              <DialogDescription>
                Generate a new financial analysis report for the specified period
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Q4 2024 Portfolio Analysis"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Report Type</Label>
                <Select value={formData.report_type} onValueChange={(value) => setFormData({ ...formData, report_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portfolio">Portfolio Analysis</SelectItem>
                    <SelectItem value="property">Property Performance</SelectItem>
                    <SelectItem value="investment">Investment Summary</SelectItem>
                    <SelectItem value="roi">ROI Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or requirements for this report..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => createReport()}>
                {isLoading ? "Creating..." : "Create Report"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(report.report_type)}
                    {report.title}
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(report.period_start), "MMM dd, yyyy")} - {format(new Date(report.period_end), "MMM dd, yyyy")}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  <Button size="sm" onClick={() => generateReport(report.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Type: {report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)}</span>
                <span>Created: {format(new Date(report.created_at), "MMM dd, yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first financial report to get started with analysis
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}