import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"

const CookiePolicy = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit our website. They are widely used to make websites work more efficiently and provide 
                information to website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience and provide personalized content. 
                Our website uses the following types of cookies:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies are necessary for the website to function properly. They enable core 
                    functionality such as security, network management, and accessibility. You cannot 
                    opt out of these cookies.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies help us analyze website usage and performance, allowing us to improve 
                    our services. They collect information about how visitors use our website, including 
                    which pages are visited most often.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies allow our website to remember choices you make and provide enhanced, 
                    personalized features. They may also be used to provide services you have requested.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Advertising Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies enable personalized advertising based on your browsing history. They 
                    are used to deliver advertisements more relevant to you and your interests.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your 
                cookie preferences through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Your browser settings - most browsers allow you to refuse or accept cookies</li>
                <li>Our cookie consent banner when you first visit our website</li>
                <li>Third-party opt-out tools for advertising cookies</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Please note that disabling cookies may affect the functionality of our website and limit 
                your ability to use certain features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground">
                Some cookies on our website are placed by third-party services that appear on our pages. 
                We do not control the use of these cookies and recommend you check the respective third 
                party's website for more information about their cookies and how to manage them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy periodically to reflect changes in our practices or for 
                legal, regulatory, or operational reasons. We advise you to review this policy regularly 
                for any updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy
