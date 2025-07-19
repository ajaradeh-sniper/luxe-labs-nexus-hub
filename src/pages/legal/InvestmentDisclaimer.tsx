import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Shield, FileText, TrendingUp } from "lucide-react"

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
                <h2 className="text-xl font-semibold text-destructive mb-2">Risk Warning</h2>
                <p className="text-muted-foreground">
                  <strong>All investments involve risk and may result in partial or total loss of capital.</strong> 
                  Past performance does not guarantee future results. Real estate investments are subject to 
                  market volatility, economic conditions, and other factors beyond our control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Disclaimer */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">General Disclaimer</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Information provided is for general purposes only</li>
                <li>• Not personalized investment advice</li>
                <li>• Consult qualified advisors before investing</li>
                <li>• Market conditions can change rapidly</li>
                <li>• Currency fluctuations may affect returns</li>
                <li>• Regulatory changes may impact investments</li>
              </ul>
            </CardContent>
          </Card>

          {/* Regulatory Compliance */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Regulatory Compliance</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Regulated by Dubai Financial Services Authority (DFSA)</li>
                <li>• Compliant with DIFC regulations</li>
                <li>• Anti-Money Laundering (AML) procedures</li>
                <li>• Know Your Customer (KYC) requirements</li>
                <li>• Professional indemnity insurance</li>
                <li>• Regular compliance audits</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Investment Risks */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Specific Investment Risks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Market Risks</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Property value fluctuations</li>
                  <li>Interest rate changes</li>
                  <li>Economic downturns</li>
                  <li>Supply and demand imbalances</li>
                  <li>Inflation impact</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Operational Risks</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Construction delays</li>
                  <li>Cost overruns</li>
                  <li>Contractor performance</li>
                  <li>Planning permission issues</li>
                  <li>Environmental factors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Liquidity Risks</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Limited ability to exit investments</li>
                  <li>Selling may take extended periods</li>
                  <li>Market conditions affect liquidity</li>
                  <li>Lock-up periods may apply</li>
                  <li>Early exit penalties</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Legal & Regulatory</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Changes in property laws</li>
                  <li>Tax regulation modifications</li>
                  <li>Zoning law changes</li>
                  <li>Building code updates</li>
                  <li>Foreign ownership restrictions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Suitability */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Investor Suitability</h2>
            <p className="text-muted-foreground mb-4">
              Our investment opportunities are suitable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>High net worth individuals and institutions</li>
              <li>Investors with long-term investment horizons</li>
              <li>Those who understand real estate market risks</li>
              <li>Investors seeking portfolio diversification</li>
              <li>Those who can afford potential capital loss</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact for Legal Questions */}
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Legal Questions?</h2>
            <p className="text-muted-foreground mb-4">
              For legal or compliance questions regarding our investment services
            </p>
            <div className="space-y-2">
              <p><strong>Legal Department:</strong> legal@luxurylabs.ae</p>
              <p><strong>Compliance Officer:</strong> compliance@luxurylabs.ae</p>
              <p><strong>Phone:</strong> +971-4-XXX-XXXX</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default InvestmentDisclaimer