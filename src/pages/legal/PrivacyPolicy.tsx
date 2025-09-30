import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PrivacyPolicy = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information Collection and Usage</h2>
              <p className="text-muted-foreground mb-4">
                We may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Personal Information (name, email, phone, address)</li>
                <li>Investment preferences and financial data</li>
              </ul>
              <p className="text-muted-foreground mt-4 mb-2">
                Data usage:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide and improve our services</li>
                <li>To communicate offers, updates, and promotional materials</li>
                <li>For compliance and security purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Sharing Information</h2>
              <p className="text-muted-foreground mb-4">
                We do not share your personal data except:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>With legal authorities if required</li>
                <li>Third-party service providers under confidentiality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement stringent measures to secure your data against unauthorized access or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You can access, correct, or delete your personal data by contacting us at privacy@luxurylabs.ae</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>Email:</strong> privacy@luxurylabs.ae</p>
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

export default PrivacyPolicy