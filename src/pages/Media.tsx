import { Play, Image as ImageIcon, FileText, Download, ExternalLink, Video, Users, Youtube, Instagram, Linkedin, Eye, MessageCircle, Calendar, BookOpen, PenTool, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/Navigation"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg" 
import marinaTowerImage from "@/assets/marina-tower.jpg"
import luxuryFinishesInstallThumbnail from "@/assets/luxury-finishes-install-thumbnail.jpg"

export default function Media() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Media Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-primary border-primary/30 bg-primary/5 font-montserrat">
              Media Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 font-playfair leading-tight">
              Explore Our <span className="luxury-text">Transformation Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-montserrat max-w-3xl mx-auto">
              Discover the visual journey of our luxury property transformations through high-quality imagery, 
              virtual tours, and detailed project documentation.
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-20">
            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => window.open('https://www.youtube.com/watch?v=D2HrgCFYNv4', '_blank')}
                >
                  <img 
                    src="https://img.youtube.com/vi/D2HrgCFYNv4/maxresdefault.jpg"
                    alt="Downtown Transformation Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-playfair drop-shadow-lg">Featured: JW Marriot, Marina, Dubai</h3>
                    <p className="text-white font-montserrat drop-shadow-md">Watch our latest luxury property transformation at JW Marriot Marina</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Media Tabs */}
          <div className="mb-20">
            <Tabs defaultValue="flipping-dubai" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-16 bg-card/50 border border-border h-16 shadow-lg rounded-xl">
                <TabsTrigger 
                  value="flipping-dubai" 
                  className="h-full flex items-center justify-center space-x-2 font-montserrat font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground hover:text-foreground uppercase tracking-wide"
                >
                  <Video className="w-5 h-5" />
                  <span>Flipping Dubai</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="blog" 
                  className="h-full flex items-center justify-center space-x-2 font-montserrat font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground hover:text-foreground uppercase tracking-wide"
                >
                  <FileText className="w-5 h-5" />
                  <span>Blogs & Articles</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="social-media" 
                  className="h-full flex items-center justify-center space-x-2 font-montserrat font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground hover:text-foreground uppercase tracking-wide"
                >
                  <Users className="w-5 h-5" />
                  <span>Social Media</span>
                </TabsTrigger>
              </TabsList>

              {/* Flipping Dubai Tab */}
              <TabsContent value="flipping-dubai" className="space-y-8">
                {/* About Flipping Dubai */}
                <div className="text-center mb-16">
                  <div className="flex justify-center mb-6">
                    <img 
                      src="/lovable-uploads/d6d93f42-4152-430f-bb17-3221a60d919b.png" 
                      alt="Flipping Dubai Logo"
                      className="h-16 object-contain"
                    />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair uppercase tracking-wide">About Flipping Dubai</h2>
                  <p className="text-muted-foreground max-w-4xl mx-auto font-montserrat text-lg leading-relaxed mb-8">
                    Flipping Dubai is our flagship video series and educational platform that takes you behind the scenes of luxury property transformation in Dubai. 
                    Created in partnership with Luxury Labs, this comprehensive series documents our complete process from property acquisition to profitable sale.
                  </p>
                  
                  {/* Services Grid */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-0 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Video className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">Video Series</h3>
                        <p className="text-muted-foreground font-montserrat">
                          Complete property transformation journeys documented from start to finish with professional production quality.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-0 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">Educational Content</h3>
                        <p className="text-muted-foreground font-montserrat">
                          Learn property investment strategies, market analysis, renovation techniques, and selling tactics from industry experts.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-0 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">Community Access</h3>
                        <p className="text-muted-foreground font-montserrat">
                          Join our growing community of property investors and gain access to exclusive insights and networking opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Relationship with Luxury Labs */}
                  <Card className="p-8 luxury-border luxury-shadow backdrop-blur-sm mb-12" style={{ backgroundColor: '#D9D9D9' }}>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <img 
                          src="/lovable-uploads/d6d93f42-4152-430f-bb17-3221a60d919b.png" 
                          alt="Flipping Dubai Logo" 
                          className="h-16 object-contain"
                        />
                        <div className="flex items-center text-2xl font-bold text-gray-600">
                          <span>&times;</span>
                        </div>
                        <img 
                          src="/lovable-uploads/b2b9ab2c-7e3d-4eab-b79f-a0b91cd6ba50.png" 
                          alt="Luxury Labs Logo" 
                          className="h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair text-center">Partnership with Luxury Labs</h3>
                      <p className="text-gray-700 font-montserrat text-center max-w-3xl mx-auto leading-relaxed">
                        Flipping Dubai is produced in collaboration with Luxury Labs, Dubai's premier property transformation company. 
                        This unique partnership gives viewers unprecedented access to real deals, actual renovation processes, 
                        and genuine market insights from one of the most successful property investment firms in the UAE. 
                        Every episode features real properties from Luxury Labs' portfolio, providing authentic case studies 
                        and practical knowledge that can't be found anywhere else.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Video Series Section */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-playfair">Latest Episodes</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Featured Video */}
                  <Card className="lg:col-span-2 lg:row-span-2 overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                    <div className="aspect-video relative group cursor-pointer overflow-hidden">
                      <img 
                        src="https://img.youtube.com/vi/zeAHlZpsKFo/maxresdefault.jpg"
                        alt="Marina Bay Penthouse Before"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          size="lg" 
                          variant="luxury"
                          onClick={() => window.open('https://www.youtube.com/watch?v=zeAHlZpsKFo', '_blank')}
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Watch Latest Episode
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-primary/10 text-primary">LATEST EPISODE</Badge>
                      <h3 className="font-bold text-foreground text-xl mb-2 font-playfair">Marina Bay Penthouse Transformation</h3>
                      <p className="text-muted-foreground mb-4 font-montserrat">
                        Watch our complete transformation of a 4-bedroom penthouse in Dubai Marina, 
                        from initial acquisition to final staging and sale.
                      </p>
                      <div className="flex items-center justify-end text-sm text-muted-foreground">
                        <span>Episode 12 • 24 min</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Episode List */}
                  {[
                    { 
                      title: "Property Selection Secrets", 
                      duration: "18 min", 
                      episode: 11, 
                      thumbnail: "https://img.youtube.com/vi/hToV8FrnbFU/maxresdefault.jpg",
                      url: "https://www.youtube.com/watch?v=hToV8FrnbFU&t=103s"
                    },
                    { 
                      title: "Design Planning Process", 
                      duration: "22 min", 
                      episode: 10, 
                      thumbnail: "https://img.youtube.com/vi/ZkT7X8pZyBE/maxresdefault.jpg",
                      url: "https://www.youtube.com/watch?v=ZkT7X8pZyBE"
                    },
                    { 
                      title: "Renovation Timeline", 
                      duration: "25 min", 
                      episode: 9, 
                      thumbnail: "https://img.youtube.com/vi/D2HrgCFYNv4/maxresdefault.jpg",
                      url: "https://www.youtube.com/watch?v=D2HrgCFYNv4&t=2s"
                    },
                    { 
                      title: "Luxury Finishes Install", 
                      duration: "20 min", 
                      episode: 8, 
                      thumbnail: luxuryFinishesInstallThumbnail,
                      url: "https://www.youtube.com/watch?v=P0r9TdIENko&t=8s"
                    },
                  ].map((video, index) => (
                    <Card key={index} className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group">
                       <div 
                         className="aspect-video relative overflow-hidden"
                         onClick={() => window.open(video.url, '_blank')}
                       >
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onLoad={() => console.log(`Thumbnail loaded for ${video.title}:`, video.thumbnail)}
                            onError={(e) => {
                              console.error(`Thumbnail failed to load for ${video.title}:`, video.thumbnail, e);
                              // Fallback to YouTube thumbnail if local image fails
                              if (video.title === "Luxury Finishes Install") {
                                e.currentTarget.src = "https://img.youtube.com/vi/P0r9TdIENko/hqdefault.jpg";
                              }
                            }}
                          />
                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <Button variant="outline" className="bg-background/90 border-border">
                             <Play className="w-4 h-4 mr-2" />
                             Play
                           </Button>
                         </div>
                       </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-foreground mb-2 font-playfair">{video.title}</h4>
                        <div className="flex items-center justify-end text-sm text-muted-foreground">
                          <span>Ep {video.episode} • {video.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                </div>
                <div className="text-center pt-8">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.open('https://youtube.com/@luxurylabsdubai', '_blank')}
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Subscribe on YouTube
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              {/* Blog Tab */}
              <TabsContent value="blog" className="space-y-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
                    LUXURY LABS <span className="luxury-text">INSIGHTS & ARTICLES</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-montserrat">
                    Expert insights, market analysis, and investment strategies from our website blog and LinkedIn articles.
                  </p>
                </div>
                
                {/* Website Blog Section */}
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-bold text-foreground flex items-center font-playfair uppercase tracking-wide">
                      <BookOpen className="w-6 h-6 mr-2 text-primary" />
                      Latest Blog Posts
                    </h3>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      View All Posts
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "The Ultimate Guide to Dubai Property Investment in 2024",
                        excerpt: "Everything international investors need to know about entering Dubai's luxury real estate market, including regulations, financing, and market trends.",
                        readTime: "12 min read",
                        date: "Dec 18, 2024",
                        category: "Investment Guide",
                        featured: true,
                        image: businessBayImage
                      },
                      {
                        title: "5 Key Factors That Drive Property Values in Dubai",
                        excerpt: "Understanding the economic and infrastructure factors that influence property appreciation in Dubai's luxury market.",
                        readTime: "8 min read",
                        date: "Dec 12, 2024",
                        category: "Market Analysis",
                        image: downtownImage
                      },
                      {
                        title: "Before & After: Our Most Profitable Flip Projects",
                        excerpt: "A detailed look at three of our most successful property transformations and the strategies that maximized returns.",
                        readTime: "10 min read",
                        date: "Dec 8, 2024",
                        category: "Case Study",
                        image: marinaTowerImage
                      }
                    ].map((post, index) => (
                      <Card key={index} className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <BookOpen className="w-8 h-8 text-white m-4" />
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="outline" className="mb-3 text-primary border-primary/30">{post.category}</Badge>
                          <h3 className="font-bold text-foreground mb-2 font-playfair text-lg">{post.title}</h3>
                          <p className="text-muted-foreground mb-4 text-sm font-montserrat">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </span>
                            <span>{post.readTime}</span>
                          </div>
                          <Button variant="ghost" className="w-full justify-center text-primary hover:text-primary-foreground hover:bg-primary">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read Full Article
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* LinkedIn Articles Section */}
                <div>
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-bold text-foreground flex items-center font-playfair uppercase tracking-wide">
                      <Linkedin className="w-6 h-6 mr-2 text-blue-600" />
                      LinkedIn Insights
                    </h3>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      Follow on LinkedIn
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Why Dubai's Luxury Market Continues to Outperform Global Trends",
                        excerpt: "Analysis of Dubai's resilient luxury real estate sector and its appeal to international investors in 2024.",
                        engagement: "284 likes • 67 comments",
                        date: "Dec 15, 2024"
                      },
                      {
                        title: "The Art of Property Transformation: Our 5-Step Process",
                        excerpt: "Behind the scenes of how we identify undervalued properties and transform them into luxury assets.",
                        engagement: "412 likes • 89 comments",
                        date: "Dec 10, 2024"
                      },
                      {
                        title: "Investment Opportunities in Dubai's Emerging Districts",
                        excerpt: "Spotlight on up-and-coming areas where smart investors are positioning themselves for future growth.",
                        engagement: "356 likes • 45 comments",
                        date: "Dec 5, 2024"
                      },
                      {
                        title: "Building Wealth Through Strategic Property Investment",
                        excerpt: "Key principles that guide our investment strategy and how you can apply them to your portfolio.",
                        engagement: "523 likes • 102 comments",
                        date: "Nov 28, 2024"
                      }
                    ].map((article, index) => (
                      <Card key={index} className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group" onClick={() => window.open('https://linkedin.com/company/luxury-labs-dubai', '_blank')}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <Linkedin className="w-5 h-5 text-white" />
                            </div>
                            <div className="ml-3">
                              <p className="font-semibold text-sm font-montserrat">Luxury Labs</p>
                              <p className="text-xs text-muted-foreground font-montserrat">{article.date}</p>
                            </div>
                          </div>
                          <h3 className="font-bold text-foreground mb-2 text-lg font-playfair">{article.title}</h3>
                          <p className="text-muted-foreground mb-4 text-sm font-montserrat">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {article.engagement.split(' •')[0]}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {article.engagement.split('• ')[1]}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Social Media Tab */}
              <TabsContent value="social-media" className="space-y-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
                    SOCIAL MEDIA <span className="luxury-text">PRESENCE</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-montserrat">
                    Follow our journey across all social platforms for daily insights, property updates, and exclusive content.
                  </p>
                </div>
                
                {/* Social Media Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* YouTube Channel */}
                  <Card className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group lg:col-span-2" onClick={() => window.open('https://youtube.com/@luxurylabsdubai', '_blank')}>
                    <div className="aspect-[2/1] relative overflow-hidden">
                      <img 
                        src="https://img.youtube.com/vi/zeAHlZpsKFo/maxresdefault.jpg" 
                        alt="YouTube Channel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                        <div className="bg-red-600 p-6 rounded-full">
                          <Youtube className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-foreground font-playfair">Flipping Dubai YouTube</h3>
                        <Badge className="bg-red-100 text-red-800">Video Series</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 font-montserrat">
                        Our flagship video series showcasing complete property transformations from acquisition to sale. 
                        Behind-the-scenes content, expert interviews, and market insights.
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>12 Episodes • 2.3K Subscribers</span>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Instagram */}
                  <Card className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group" onClick={() => window.open('https://instagram.com/luxurylabsdubai', '_blank')}>
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={businessBayImage} 
                        alt="Instagram"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-600/20 flex items-center justify-center">
                        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-4 rounded-full">
                          <Instagram className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-2 font-playfair">@luxurylabsdubai</h3>
                      <p className="text-muted-foreground text-sm mb-3 font-montserrat">Daily luxury property content, stories, and reels</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>5.2K Followers</span>
                        <Button size="sm" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* LinkedIn */}
                  <Card className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group" onClick={() => window.open('https://linkedin.com/company/luxury-labs-dubai', '_blank')}>
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={downtownImage} 
                        alt="LinkedIn"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                        <div className="bg-blue-600 p-4 rounded-full">
                          <Linkedin className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-2 font-playfair">Luxury Labs Company</h3>
                      <p className="text-muted-foreground text-sm mb-3 font-montserrat">Professional insights and industry analysis</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>3.1K Followers</span>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Company Blog */}
                  <Card className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={businessBayImage} 
                        alt="Blog"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary p-4 rounded-full">
                          <PenTool className="w-8 h-8 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-2 font-playfair">Luxury Labs Blog</h3>
                      <p className="text-muted-foreground text-sm mb-3 font-montserrat">In-depth articles and market analysis</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Weekly Posts</span>
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Medium */}
                  <Card className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group" onClick={() => window.open('https://medium.com/@luxurylabsdubai', '_blank')}>
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={marinaTowerImage} 
                        alt="Medium"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-black p-4 rounded-full">
                          <Edit className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-2 font-playfair">Luxury Labs Medium</h3>
                      <p className="text-muted-foreground text-sm mb-3 font-montserrat">In-depth property investment articles and thought leadership</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>1.8K Followers</span>
                        <Button size="sm" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Social Media Feed Preview */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-foreground text-center mb-12 font-playfair uppercase tracking-wide">Latest Social Updates</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { platform: "Instagram", content: "Behind the scenes: Marina penthouse staging day", engagement: "247 likes", time: "2h ago" },
                      { platform: "LinkedIn", content: "Q4 market analysis: Dubai luxury sector outlook", engagement: "89 reactions", time: "1d ago" },
                      { platform: "YouTube", content: "New episode: Property selection criteria revealed", engagement: "1.2K views", time: "3d ago" },
                      { platform: "Instagram", content: "Before & after: Business Bay apartment transformation", engagement: "412 likes", time: "5d ago" }
                    ].map((update, index) => (
                      <Card key={index} className="overflow-hidden luxury-border luxury-shadow bg-card/50 backdrop-blur-sm cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-3">
                            {update.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                            {update.platform === 'LinkedIn' && <Linkedin className="w-5 h-5 text-blue-600" />}
                            {update.platform === 'YouTube' && <Youtube className="w-5 h-5 text-red-600" />}
                            <span className="ml-2 font-semibold text-sm font-montserrat">{update.platform}</span>
                          </div>
                          <p className="text-sm mb-3 text-foreground font-montserrat">{update.content}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{update.engagement}</span>
                            <span>{update.time}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>


          {/* Downloads & Resources */}
        </div>
      </section>
    </div>
  )
}