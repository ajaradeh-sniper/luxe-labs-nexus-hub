import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"

const LegalNotice = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Legal Notice</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Company Name:</strong> Luxury Labs LLC</p>
                <p><strong className="text-foreground">Registered Office:</strong> [Insert Registered Address, Dubai, UAE]</p>
                <p><strong className="text-foreground">Trade License Number:</strong> [Insert License Number]</p>
                <p><strong className="text-foreground">Jurisdiction:</strong> Dubai, United Arab Emirates</p>
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:info@luxurylabs.ae" className="text-primary hover:underline">info@luxurylabs.ae</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Legal Framework</h2>
              <p className="text-muted-foreground">
                Luxury Labs LLC operates under the laws of the United Arab Emirates and Dubai jurisdiction. 
                All business activities are conducted in compliance with applicable UAE regulations and 
                international standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Regulatory Compliance</h2>
              <p className="text-muted-foreground mb-4">
                As a real estate investment and development firm, we adhere to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Real Estate Regulatory Agency (RERA) regulations</li>
                <li>Dubai Economic Department (DED) guidelines</li>
                <li>Anti-Money Laundering (AML) and Counter-Terrorism Financing regulations</li>
                <li>Know Your Customer (KYC) requirements</li>
                <li>UAE Commercial Companies Law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Professional Standards</h2>
              <p className="text-muted-foreground">
                We maintain the highest professional standards in all our dealings, ensuring transparency, 
                integrity, and compliance with industry best practices. Our operations are regularly audited 
                and our staff undergoes continuous professional development.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For legal inquiries or official correspondence:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p><strong>Legal Department:</strong> legal@luxurylabs.ae</p>
                <p><strong>General Inquiries:</strong> info@luxurylabs.ae</p>
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

export default LegalNotice
