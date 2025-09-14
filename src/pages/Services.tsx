import { Helmet } from "react-helmet-async"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users,
  FileText,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  Target,
  Award,
  BarChart3,
  Video,
  Handshake,
  Building2,
  
  ShieldCheck,
  
} from "lucide-react"

// Import HD images
import heroEcosystem from "@/assets/hero-investment-ecosystem.jpg"
import investorGroup from "@/assets/investor-group-consultation.jpg"
import beforeAfterTransformation from "@/assets/before-after-villa-transformation.jpg"
import diversifiedFundGrowth from "@/assets/diversified-fund-growth.jpg"
import executiveConcierge from "@/assets/executive-concierge-team.jpg"
import flippingDubaiMedia from "@/assets/flipping-dubai-media-crew.jpg"
import luxuryConciergeRelocation from "@/assets/luxury-concierge-relocation.jpg"
import realEstateConsultationAdvisory from "@/assets/real-estate-consultation-advisory.jpg"


// Location images
import palmJumeirahVilla from "@/assets/palm-jumeirah-villa-hd.jpg"
import dubaiHillsVilla from "@/assets/dubai-hills-villa-hd.jpg"
import jumeirahIslandsVilla from "@/assets/jumeirah-islands-villa-hd.jpg"
import emiratesHillsVilla from "@/assets/emirates-hills-villa-hd.jpg"
import jumeirahGolfEstateVilla from "@/assets/jumeirah-golf-estate-villa-hd.jpg"
import alBarariVilla from "@/assets/al-barari-villa-hd.jpg"

const Services = () => {
  const investmentServices = [
    {
      id: 'single-property',
      title: 'Flip a luxury property with Luxury Labs',
      description: 'Lead or co-lead a curated villa transformation in Palm Jumeirah, Dubai Marina, or Emirates Hills.',
      icon: TrendingUp,
      features: [
        'Full-cycle management: acquisition → design → renovation → resale',
        'Guided by world class luxury design and premium supplier network',
        'ROI: 18–30% in 6–12 months'
      ],
      image: beforeAfterTransformation,
      buttons: ['Start Your Flip', 'Book a Consultation']
    },
    {
      id: 'shared-stake',
      title: 'Shared Stake Investment in luxury labs flip',
      description: 'Join Dubai villa flips with entry points from AED 500K. Diversify risk while benefiting from Luxury Labs\' curated property selection and luxury-grade renovations.',
      icon: Users,
      features: [
        'Accessible entry into Dubai luxury real estate',
        'Pool capital with vetted co-investors',
        'ROI: 12–20% in 9–12 months'
      ],
      image: investorGroup,
      buttons: ['Join Now', 'View Active Opportunities']
    },
    {
      id: 'diversified-fund',
      title: 'Diversified Fund (3–7 Years)',
      description: 'Build long-term wealth with a curated portfolio of luxury villas, transformed to Luxury Labs\' design standards.',
      icon: BarChart3,
      features: [
        'Ideal for HNWIs seeking stable, diversified yield',
        'Balanced exposure across Dubai\'s most in-demand communities',
        'Annualized ROI: 12–18%'
      ],
      image: diversifiedFundGrowth,
      buttons: ['Coming Soon', 'Apply to Join']
    }
  ]

  const transformationServices = [
    {
      id: 'relocation-concierge',
      title: 'Relocation Concierge Services',
      description: 'Comprehensive relocation and lifestyle support for HNWIs moving to Dubai.',
      icon: Handshake,
      features: [
        'Full relocation support: visa, banking, residence setup',
        'Lifestyle integration: schools, clubs, private services',
        'Ongoing concierge support for Dubai living'
      ],
      image: luxuryConciergeRelocation,
      buttons: ['Request Concierge', 'Talk to Team']
    },
    {
      id: 'advisory-services',
      title: 'Advisory Services',
      description: 'Strategic property and investment advisory for sophisticated investors.',
      icon: FileText,
      features: [
        'Property advisory: sourcing, structuring, legal',
        'Investment structuring and JV agreements',
        'Long-term portfolio advisory and optimization'
      ],
      image: realEstateConsultationAdvisory,
      buttons: ['Request Advisory', 'Book Consultation']
    },
    {
      id: 'media-services',
      title: 'Flipping Dubai Media Services',
      description: 'Our exclusive media arm documents transformations, reaching global audiences of investors, buyers, and HNWIs.',
      icon: Video,
      features: [
        'Professional filming and production of property transformations',
        'Media campaigns showcasing ROI and design excellence',
        'Marketing leverage for resale and brand visibility'
      ],
      image: flippingDubaiMedia,
      buttons: ['See Flipping Dubai', 'Partner With Us']
    }
  ]


  const locations = [
    {
      id: 'palm-jumeirah',
      name: '🏝 Palm Jumeirah',
      image: palmJumeirahVilla,
      whyList: 'Dubai\'s ultimate trophy address with the deepest buyer pool and scarce waterfront plots. Villas here command the highest AED/ft² in the city, with premiums for turnkey transformations.',
      typicalAsset: '5–7BR Garden/Signature Villas, trophy apartments (Bulgari, Atlantis, Oceana, Tiara)',
      budget: 'AED 25M – 90M+ (based on July 2025 comps)'
    },
    {
      id: 'dubai-hills',
      name: '🌳 Dubai Hills Estate',
      image: dubaiHillsVilla,
      whyList: 'Family prime area with strong transaction velocity. Villas benchmark at ~AED 2,737/ft² (H1-25) with a clear comp ladder across sub-communities.',
      typicalAsset: 'Sidra/Maple (light), Golf Place/Fairway/ Parkway Vistas (high-end)',
      budget: 'AED 8M – 45M depending on typology'
    },
    {
      id: 'jumeirah-islands',
      name: '🌊 Jumeirah Islands',
      image: jumeirahIslandsVilla,
      whyList: 'Lifestyle community with strong upgrade premiums. Villas here average ~AED 3,024/ft² (Mar-24), with lake-facing plots commanding top value.',
      typicalAsset: '4–6BR lake-facing villas',
      budget: 'AED 12M – 35M depending on cluster and condition'
    },
    {
      id: 'emirates-hills',
      name: '🏰 Emirates Hills',
      image: emiratesHillsVilla,
      whyList: 'Dubai\'s blue-chip address and home of mega-mansion repositioning. Villas benchmark ~AED 2,390–3,064/ft² (2025 comps), depending on methodology and timeframe.',
      typicalAsset: '6–10BR estates on large plots',
      budget: 'AED 35M – 200M+'
    },
    {
      id: 'jumeirah-golf-estate',
      name: '⛳ Jumeirah Golf Estates (JGE)',
      image: jumeirahGolfEstateVilla,
      whyList: 'Golf lifestyle destination with healthy yields and steady end-user demand. Villas benchmark at ~AED 2,481/ft² (Q1-25), with luxury villa rental yields averaging 5.9% ROI.',
      typicalAsset: '4–6BR golf-course facing villas',
      budget: 'AED 8M – 30M'
    },
    {
      id: 'al-barari',
      name: '🌿 Al Barari',
      image: alBarariVilla,
      whyList: 'Dubai\'s green heart with unmatched lifestyle appeal. Known for sprawling villas, private gardens, and eco-luxury positioning.',
      typicalAsset: '5–7BR nature-themed luxury villas',
      budget: 'AED 15M – 50M'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Services | Dubai Luxury Property Flips, Renovations & Concierge | Luxury Labs</title>
        <meta name="description" content="Explore Luxury Labs services in Dubai: shared stake villa flips, single property transformations, diversified funds, luxury concierge, and Flipping Dubai media. Delivering 15–30% ROI." />
        <meta name="keywords" content="Dubai luxury property flips, villa renovations, real estate investment, shared stake, concierge services, Flipping Dubai" />
        <link rel="canonical" href="https://luxurylabs.ae/services" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroEcosystem}
              alt="Dubai luxury property investment ecosystem"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-playfair">
                A Complete Luxury Property Investment Ecosystem in Dubai
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                From curated villa investments and world-class renovations to luxury advisory and global media exposure — Luxury Labs is your partner for high-ROI Dubai property transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/contact'}>
                  Compare Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/contact'}>
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Investment Services</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {investmentServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <Button 
                        variant={service.buttons[0] === 'Coming Soon' ? 'secondary' : 'luxury'} 
                        onClick={() => window.location.href = '/contact'}
                      >
                        {service.buttons[0]}
                      </Button>
                      <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                        {service.buttons[1]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Transformation Services</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {transformationServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <Button onClick={() => window.location.href = '/contact'}>
                        {service.buttons[0]}
                      </Button>
                      <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                        {service.buttons[1]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Locations We Transform */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Areas We Transform</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Luxury Labs operates exclusively in Dubai's most prestigious villa communities. Each area is chosen for its investment profile, strong buyer pool, and potential for luxury repositioning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <Card key={location.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={location.image}
                      alt={`${location.name} luxury villa`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="text-lg font-bold text-white mb-1">{location.name}</h3>
                      <p className="text-xs text-white/90">{location.budget}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors">{location.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1">Why it makes the list</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{location.whyList}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1">Typical Asset</h4>
                        <p className="text-xs line-clamp-2">{location.typicalAsset}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1">Budget Band</h4>
                        <p className="text-xs font-semibold text-accent">{location.budget}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={palmJumeirahVilla}
              alt="Invest in Dubai Luxury"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              From villa flips to lifestyle concierge — Luxury Labs is Dubai's full-service property transformation platform.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/contact'}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/contact'}>
                Book a Call
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Services