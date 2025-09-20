import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Star, Heart, ThumbsUp, ThumbsDown, Camera, MessageSquare, Calendar, CheckCircle, AlertTriangle } from "lucide-react"

interface FeedbackItem {
  id: number
  project: string
  category: 'quality' | 'timeline' | 'communication' | 'budget' | 'overall'
  rating: number
  comment: string
  date: string
  status: 'submitted' | 'acknowledged' | 'resolved'
  response?: string
  photos?: string[]
}

interface QualityCheck {
  id: number
  project: string
  milestone: string
  items: Array<{
    item: string
    status: 'approved' | 'needs_attention' | 'rejected'
    comment?: string
    photos?: string[]
  }>
  overallRating: number
  date: string
  nextInspection?: string
}

export function ClientFeedbackSystem() {
  const [activeTab, setActiveTab] = useState<'feedback' | 'quality' | 'satisfaction'>('feedback')
  const [newFeedback, setNewFeedback] = useState({
    category: 'overall',
    rating: 5,
    comment: ''
  })

  const feedbackHistory: FeedbackItem[] = [
    {
      id: 1,
      project: "Downtown Apartment Renovation",
      category: "quality",
      rating: 5,
      comment: "Excellent workmanship on the kitchen installation. The team paid great attention to detail.",
      date: "2024-01-18",
      status: "acknowledged",
      response: "Thank you for the positive feedback! We'll share this with our installation team."
    },
    {
      id: 2,
      project: "Business Bay Office Design",
      category: "communication",
      rating: 4,
      comment: "Would appreciate more frequent updates on design progress.",
      date: "2024-01-15",
      status: "resolved",
      response: "We've implemented daily progress updates as requested. You should now receive them via email."
    }
  ]

  const qualityChecks: QualityCheck[] = [
    {
      id: 1,
      project: "Downtown Apartment Renovation",
      milestone: "Kitchen Installation",
      date: "2024-01-18",
      overallRating: 5,
      nextInspection: "2024-01-25",
      items: [
        { item: "Cabinet alignment and fit", status: "approved", comment: "Perfect alignment, excellent craftsmanship" },
        { item: "Countertop installation", status: "approved", comment: "Seamless installation, clean edges" },
        { item: "Electrical connections", status: "approved", comment: "All connections properly secured and tested" },
        { item: "Plumbing connections", status: "approved", comment: "No leaks detected, proper water pressure" },
        { item: "Tile backsplash", status: "needs_attention", comment: "Minor grout touch-up needed in corner area" }
      ]
    }
  ]

  const satisfactionMetrics = {
    overall: 4.8,
    quality: 4.9,
    timeline: 4.6,
    communication: 4.7,
    budget: 4.8,
    teamProfessionalism: 4.9
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'acknowledged': return 'bg-amber-100 text-amber-800'
      case 'resolved': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQualityStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800'
      case 'needs_attention': return 'bg-amber-100 text-amber-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const submitFeedback = () => {
    // Feedback submission logic would go here
    console.log('Submitting feedback:', newFeedback)
    setNewFeedback({ category: 'overall', rating: 5, comment: '' })
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'feedback' ? 'default' : 'outline'}
          onClick={() => setActiveTab('feedback')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback & Reviews
        </Button>
        <Button
          variant={activeTab === 'quality' ? 'default' : 'outline'}
          onClick={() => setActiveTab('quality')}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Quality Inspections
        </Button>
        <Button
          variant={activeTab === 'satisfaction' ? 'default' : 'outline'}
          onClick={() => setActiveTab('satisfaction')}
        >
          <Star className="h-4 w-4 mr-2" />
          Satisfaction Metrics
        </Button>
      </div>

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {/* New Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                  value={newFeedback.category}
                  onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value})}
                >
                  <option value="overall">Overall Experience</option>
                  <option value="quality">Work Quality</option>
                  <option value="timeline">Timeline & Schedule</option>
                  <option value="communication">Communication</option>
                  <option value="budget">Budget & Costs</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        rating <= newFeedback.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                      onClick={() => setNewFeedback({...newFeedback, rating})}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Comments</label>
                <Textarea
                  placeholder="Share your feedback, suggestions, or concerns..."
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={submitFeedback} className="bg-blue-600 text-white">
                  Submit Feedback
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Previous Feedback</h3>
            {feedbackHistory.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{feedback.category}</Badge>
                        <Badge className={getStatusColor(feedback.status)}>
                          {feedback.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.project}</p>
                    </div>
                    <div className="text-right">
                      {renderStars(feedback.rating)}
                      <p className="text-sm text-muted-foreground mt-1">{feedback.date}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{feedback.comment}</p>
                  
                  {feedback.response && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Team Response:</p>
                      <p className="text-sm text-blue-800">{feedback.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quality Inspections Tab */}
      {activeTab === 'quality' && (
        <div className="space-y-6">
          {qualityChecks.map((check) => (
            <Card key={check.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{check.milestone} - Quality Inspection</CardTitle>
                    <p className="text-sm text-muted-foreground">{check.project}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(check.overallRating, 'lg')}
                    <p className="text-sm text-muted-foreground mt-1">{check.date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {check.items.map((item, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.item}</p>
                      {item.comment && (
                        <p className="text-sm text-muted-foreground mt-1">{item.comment}</p>
                      )}
                    </div>
                    <Badge className={getQualityStatusColor(item.status)}>
                      {item.status === 'approved' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                       item.status === 'needs_attention' ? <AlertTriangle className="h-3 w-3 mr-1" /> : 
                       <ThumbsDown className="h-3 w-3 mr-1" />}
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
                
                {check.nextInspection && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <Calendar className="h-4 w-4" />
                    Next inspection scheduled: {check.nextInspection}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Satisfaction Metrics Tab */}
      {activeTab === 'satisfaction' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Satisfaction Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(satisfactionMetrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <div className="flex items-center justify-center mb-2">
                      {renderStars(Math.round(value))}
                    </div>
                    <p className="text-2xl font-bold text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Satisfaction Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(satisfactionMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm text-muted-foreground">{value}/5.0</span>
                    </div>
                    <Progress value={value * 20} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}