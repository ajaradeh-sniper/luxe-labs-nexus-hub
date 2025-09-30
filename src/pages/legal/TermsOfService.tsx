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
              <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
              <p className="text-muted-foreground">
                Luxury Labs provides real estate investment, design, renovation, and advisory services. 
                Our website content is informational and not binding contractual advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Obligations</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and updated information</li>
                <li>Use our services lawfully and ethically</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on our website, including text, graphics, logos, and software, is the 
                intellectual property of Luxury Labs LLC.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Luxury Labs LLC shall not be liable for any indirect or consequential losses arising 
                from use or inability to use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of Dubai and the UAE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For questions regarding these Terms of Service:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p><strong>Email:</strong> info@luxurylabs.ae</p>
                <p><strong>Phone:</strong> +971-4-XXX-XXXX</p>
                <p><strong>Address:</strong> Dubai International Financial Centre, Dubai, UAE</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default TermsOfService