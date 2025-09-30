import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const InvestmentDisclaimer = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Investment Disclaimer</h1>
          <p className="text-muted-foreground">Important Risk and Legal Disclosures</p>
        </div>

        {/* Risk Warning */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-destructive mb-2">Investment Disclaimer</h2>
                <p className="text-muted-foreground">
                  <strong>Investment in real estate carries inherent risks.</strong> Information provided by 
                  Luxury Labs LLC does not constitute financial or investment advice. Past performance is not 
                  indicative of future results. Investors are advised to conduct thorough due diligence and 
                  consult their financial advisor before investing.
                </p>
                <p className="text-muted-foreground mt-4">
                  Luxury Labs LLC is not liable for investment decisions based on information provided.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Legal Questions */}
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Legal Questions?</h2>
            <p className="text-muted-foreground mb-4">
              For legal or compliance questions regarding our investment services
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> info@luxurylabs.ae</p>
              <p><strong>Phone:</strong> +971-4-XXX-XXXX</p>
              <p><strong>Address:</strong> Dubai International Financial Centre, Dubai, UAE</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default InvestmentDisclaimer
