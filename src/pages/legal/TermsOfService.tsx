import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"

const TermsOfService = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Luxury Labs' services, you accept and agree to be bound by 
                the terms and provision of this agreement. These terms apply to all users of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Investment Services</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Real estate development and investment opportunities</li>
                <li>Property management services</li>
                <li>Investment consultation and advisory services</li>
                <li>Portfolio management and reporting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Eligibility Requirements</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Must be 18 years or older</li>
                <li>Possess legal capacity to enter into contracts</li>
                <li>Meet minimum investment thresholds</li>
                <li>Complete KYC (Know Your Customer) verification</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Investment Risks</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-semibold">Important Risk Disclosure:</p>
                <p className="text-yellow-700">
                  All investments carry inherent risks, including the potential loss of principal. 
                  Real estate investments may be subject to market volatility, economic conditions, 
                  and regulatory changes.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Market risk and property value fluctuations</li>
                <li>Liquidity risk - investments may not be easily convertible to cash</li>
                <li>Regulatory and legal risks</li>
                <li>Construction and development risks</li>
                <li>Economic and political risks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Fees and Charges</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Management fees as disclosed in investment agreements</li>
                <li>Performance fees based on returns</li>
                <li>Administrative and processing fees</li>
                <li>Third-party costs (legal, valuation, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p className="text-muted-foreground">
                Either party may terminate this agreement with appropriate notice as specified 
                in individual investment agreements. Termination procedures will follow applicable 
                regulations and contractual obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms are governed by the laws of the United Arab Emirates and the 
                Dubai International Financial Centre (DIFC). Any disputes will be resolved 
                through DIFC courts or arbitration as specified in individual agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <div className="p-4 bg-muted rounded-lg">
                <p><strong>Legal Department:</strong> legal@luxurylabs.ae</p>
                <p><strong>Customer Service:</strong> support@luxurylabs.ae</p>
                <p><strong>Compliance:</strong> compliance@luxurylabs.ae</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default TermsOfService