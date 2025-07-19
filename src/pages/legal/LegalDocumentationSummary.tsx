import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Clock,
  ExternalLink
} from "lucide-react"
import { Link } from "react-router-dom"

const LegalDocumentationSummary = () => {
  const requiredDocuments = [
    {
      category: "Corporate Formation",
      documents: [
        { name: "Memorandum of Association", status: "completed", required: true },
        { name: "Articles of Association", status: "completed", required: true },
        { name: "DIFC License", status: "completed", required: true },
        { name: "DFSA Authorization", status: "pending", required: true },
        { name: "Professional Indemnity Insurance", status: "completed", required: true }
      ]
    },
    {
      category: "Regulatory Compliance",
      documents: [
        { name: "AML/CTF Compliance Manual", status: "completed", required: true },
        { name: "KYC Procedures", status: "completed", required: true },
        { name: "Risk Management Framework", status: "in-progress", required: true },
        { name: "Compliance Monitoring Procedures", status: "completed", required: true },
        { name: "FATCA/CRS Compliance", status: "pending", required: true }
      ]
    },
    {
      category: "Investment Documentation",
      documents: [
        { name: "Private Placement Memorandum (PPM)", status: "in-progress", required: true },
        { name: "Subscription Agreement Template", status: "completed", required: true },
        { name: "Investment Management Agreement", status: "completed", required: true },
        { name: "Fund Constitution/Articles", status: "pending", required: true },
        { name: "Offering Circular", status: "in-progress", required: true }
      ]
    },
    {
      category: "Data Protection & Privacy",
      documents: [
        { name: "Privacy Policy", status: "completed", required: true, link: "/privacy-policy" },
        { name: "Data Processing Agreement", status: "completed", required: true },
        { name: "GDPR Compliance Framework", status: "completed", required: true },
        { name: "Data Breach Response Plan", status: "in-progress", required: true },
        { name: "Consent Management Procedures", status: "completed", required: true }
      ]
    },
    {
      category: "Client Documentation",
      documents: [
        { name: "Terms of Service", status: "completed", required: true, link: "/terms-of-service" },
        { name: "Investment Disclaimer", status: "completed", required: true, link: "/investment-disclaimer" },
        { name: "Client Agreement Template", status: "completed", required: true },
        { name: "Fee Schedule Disclosure", status: "completed", required: true },
        { name: "Complaints Handling Procedure", status: "in-progress", required: true }
      ]
    },
    {
      category: "Property & Real Estate",
      documents: [
        { name: "Property Acquisition Framework", status: "completed", required: true },
        { name: "Due Diligence Checklist", status: "completed", required: true },
        { name: "Development Agreement Template", status: "in-progress", required: true },
        { name: "Construction Contract Template", status: "pending", required: true },
        { name: "Property Management Agreement", status: "completed", required: true }
      ]
    },
    {
      category: "Tax & Accounting",
      documents: [
        { name: "Tax Strategy Document", status: "completed", required: true },
        { name: "Transfer Pricing Policy", status: "pending", required: false },
        { name: "Accounting Policies Manual", status: "completed", required: true },
        { name: "Audit Committee Charter", status: "completed", required: true },
        { name: "Related Party Transaction Policy", status: "in-progress", required: true }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'in-progress': return 'bg-warning/10 text-warning border-warning/20'
      case 'pending': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'pending': return <AlertTriangle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const totalDocuments = requiredDocuments.reduce((total, category) => total + category.documents.length, 0)
  const completedDocuments = requiredDocuments.reduce((total, category) => 
    total + category.documents.filter(doc => doc.status === 'completed').length, 0)
  const pendingDocuments = requiredDocuments.reduce((total, category) => 
    total + category.documents.filter(doc => doc.status === 'pending').length, 0)
  const inProgressDocuments = requiredDocuments.reduce((total, category) => 
    total + category.documents.filter(doc => doc.status === 'in-progress').length, 0)

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Legal Documentation Status</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive overview of required legal documentation for real estate investment operations
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{totalDocuments}</h3>
              <p className="text-muted-foreground">Total Documents</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-success">{completedDocuments}</h3>
              <p className="text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-warning">{inProgressDocuments}</h3>
              <p className="text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive">{pendingDocuments}</h3>
              <p className="text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Categories */}
        <div className="space-y-8">
          {requiredDocuments.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status.replace('-', ' ')}</span>
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-medium">{doc.name}</h4>
                          {doc.required && (
                            <p className="text-xs text-muted-foreground">Required</p>
                          )}
                        </div>
                      </div>
                      {doc.link && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={doc.link}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Items */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Priority Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Complete DFSA Authorization application</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Finalize FATCA/CRS compliance procedures</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Submit Fund Constitution to regulators</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Execute Construction Contract templates</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Legal Team */}
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Legal Team Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about legal documentation or compliance requirements
            </p>
            <div className="space-y-2">
              <p><strong>Legal Department:</strong> legal@luxurylabs.ae</p>
              <p><strong>Compliance Officer:</strong> compliance@luxurylabs.ae</p>
              <p><strong>External Counsel:</strong> Baker McKenzie Dubai</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default LegalDocumentationSummary