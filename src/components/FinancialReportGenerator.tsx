import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { 
  Download,
  Calendar as CalendarIcon,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Building2,
  Clock,
  Eye
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FinancialReportGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ReportConfig {
  type: string
  format: string
  dateRange: {
    start: Date | undefined
    end: Date | undefined
  }
  properties: string[]
  sections: string[]
  customTitle: string
  includeCharts: boolean
  includeComparisons: boolean
}

export function FinancialReportGenerator({ open, onOpenChange }: FinancialReportGeneratorProps) {
  const [config, setConfig] = useState<ReportConfig>({
    type: "",
    format: "pdf",
    dateRange: {
      start: undefined,
      end: undefined
    },
    properties: [],
    sections: [],
    customTitle: "",
    includeCharts: true,
    includeComparisons: false
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const { toast } = useToast()

  const reportTypes = [
    { 
      value: "portfolio_overview", 
      label: "Portfolio Overview", 
      description: "Comprehensive overview of all investments and performance"
    },
    { 
      value: "property_performance", 
      label: "Property Performance", 
      description: "Detailed analysis of individual property ROI and metrics"
    },
    { 
      value: "cash_flow", 
      label: "Cash Flow Analysis", 
      description: "Income, expenses, and cash flow projections"
    },
    { 
      value: "roi_analysis", 
      label: "ROI Analysis", 
      description: "Return on investment calculations and comparisons"
    },
    { 
      value: "market_analysis", 
      label: "Market Analysis", 
      description: "Market trends and property valuation insights"
    },
    { 
      value: "tax_summary", 
      label: "Tax Summary", 
      description: "Tax implications and optimization strategies"
    }
  ]

  const availableProperties = [
    "Marina Bay Tower",
    "Downtown Luxury Apartments",
    "Business Bay Complex", 
    "Palm Residence Villa",
    "DIFC Office Tower"
  ]

  const reportSections = [
    { id: "executive_summary", label: "Executive Summary", description: "High-level overview and key insights" },
    { id: "financial_highlights", label: "Financial Highlights", description: "Key financial metrics and KPIs" },
    { id: "property_breakdown", label: "Property Breakdown", description: "Individual property analysis" },
    { id: "income_analysis", label: "Income Analysis", description: "Revenue streams and income trends" },
    { id: "expense_analysis", label: "Expense Analysis", description: "Cost breakdown and expense trends" },
    { id: "roi_calculations", label: "ROI Calculations", description: "Return on investment metrics" },
    { id: "market_comparison", label: "Market Comparison", description: "Performance vs market benchmarks" },
    { id: "projections", label: "Future Projections", description: "Forecasts and growth projections" },
    { id: "recommendations", label: "Recommendations", description: "Strategic recommendations and insights" }
  ]

  const formats = [
    { value: "pdf", label: "PDF Document", icon: FileText },
    { value: "excel", label: "Excel Spreadsheet", icon: BarChart3 },
    { value: "powerpoint", label: "PowerPoint Presentation", icon: PieChart }
  ]

  const getDefaultSections = (reportType: string) => {
    switch (reportType) {
      case "portfolio_overview":
        return ["executive_summary", "financial_highlights", "property_breakdown", "roi_calculations"]
      case "property_performance":
        return ["property_breakdown", "income_analysis", "expense_analysis", "roi_calculations"]
      case "cash_flow":
        return ["financial_highlights", "income_analysis", "expense_analysis", "projections"]
      case "roi_analysis":
        return ["roi_calculations", "market_comparison", "projections", "recommendations"]
      case "market_analysis":
        return ["market_comparison", "property_breakdown", "projections", "recommendations"]
      case "tax_summary":
        return ["financial_highlights", "expense_analysis", "recommendations"]
      default:
        return []
    }
  }

  const handleReportTypeChange = (type: string) => {
    setConfig(prev => ({
      ...prev,
      type,
      sections: getDefaultSections(type),
      customTitle: reportTypes.find(r => r.value === type)?.label || ""
    }))
  }

  const toggleProperty = (property: string) => {
    setConfig(prev => ({
      ...prev,
      properties: prev.properties.includes(property)
        ? prev.properties.filter(p => p !== property)
        : [...prev.properties, property]
    }))
  }

  const toggleSection = (section: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }))
  }

  const simulateReportGeneration = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    const steps = [
      "Collecting financial data...",
      "Processing property information...",
      "Calculating ROI metrics...",
      "Generating charts and graphs...",
      "Formatting report layout...",
      "Finalizing document..."
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    setIsGenerating(false)
    setGenerationProgress(100)

    toast({
      title: "Report Generated Successfully",
      description: `Your ${config.customTitle} report is ready for download.`,
    })
  }

  const canGenerate = config.type && config.dateRange.start && config.dateRange.end && config.sections.length > 0

  const resetForm = () => {
    setConfig({
      type: "",
      format: "pdf",
      dateRange: { start: undefined, end: undefined },
      properties: [],
      sections: [],
      customTitle: "",
      includeCharts: true,
      includeComparisons: false
    })
    setGenerationProgress(0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Generate Financial Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Report Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-colors ${
                      config.type === type.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleReportTypeChange(type.value)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Configuration */}
          {config.type && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Custom Title */}
                  <div className="space-y-2">
                    <Label htmlFor="customTitle">Report Title</Label>
                    <Input
                      id="customTitle"
                      value={config.customTitle}
                      onChange={(e) => setConfig(prev => ({ ...prev, customTitle: e.target.value }))}
                      placeholder="Enter custom report title"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {config.dateRange.start ? format(config.dateRange.start, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={config.dateRange.start}
                            onSelect={(date) => setConfig(prev => ({ 
                              ...prev, 
                              dateRange: { ...prev.dateRange, start: date }
                            }))}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {config.dateRange.end ? format(config.dateRange.end, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={config.dateRange.end}
                            onSelect={(date) => setConfig(prev => ({ 
                              ...prev, 
                              dateRange: { ...prev.dateRange, end: date }
                            }))}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <div className="flex gap-2">
                      {formats.map((format) => (
                        <Button
                          key={format.value}
                          variant={config.format === format.value ? "default" : "outline"}
                          onClick={() => setConfig(prev => ({ ...prev, format: format.value }))}
                          className="flex items-center gap-2"
                        >
                          <format.icon className="h-4 w-4" />
                          {format.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Properties to Include</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="all-properties"
                        checked={config.properties.length === availableProperties.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setConfig(prev => ({ ...prev, properties: [...availableProperties] }))
                          } else {
                            setConfig(prev => ({ ...prev, properties: [] }))
                          }
                        }}
                      />
                      <Label htmlFor="all-properties" className="font-medium">Select All Properties</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availableProperties.map((property) => (
                        <div key={property} className="flex items-center gap-2">
                          <Checkbox
                            id={property}
                            checked={config.properties.includes(property)}
                            onCheckedChange={() => toggleProperty(property)}
                          />
                          <Label htmlFor={property} className="cursor-pointer">{property}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Report Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {reportSections.map((section) => (
                      <div 
                        key={section.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          config.sections.includes(section.id) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={config.sections.includes(section.id)}
                            onCheckedChange={() => {}}
                          />
                          <div>
                            <h3 className="font-medium">{section.label}</h3>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="includeCharts">Include Charts and Graphs</Label>
                        <p className="text-sm text-muted-foreground">Add visual representations of data</p>
                      </div>
                      <Checkbox
                        id="includeCharts"
                        checked={config.includeCharts}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeCharts: !!checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="includeComparisons">Include Market Comparisons</Label>
                        <p className="text-sm text-muted-foreground">Compare performance with market benchmarks</p>
                      </div>
                      <Checkbox
                        id="includeComparisons"
                        checked={config.includeComparisons}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeComparisons: !!checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generation Progress */}
              {isGenerating && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Clock className="h-12 w-12 mx-auto text-primary animate-spin" />
                      <h3 className="text-lg font-semibold">Generating Report...</h3>
                      <Progress value={generationProgress} className="h-3" />
                      <p className="text-sm text-muted-foreground">
                        {generationProgress < 100 ? "Please wait while we prepare your report" : "Report generated successfully!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                {generationProgress === 100 ? (
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="luxury">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="luxury" 
                    onClick={simulateReportGeneration}
                    disabled={!canGenerate || isGenerating}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}