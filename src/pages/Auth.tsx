import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Building2, TrendingUp, Shield, Mail, Lock, User, UserCheck, ArrowLeft } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { UserRole } from '@/types/auth'
import { Navigation } from '@/components/Navigation'

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('login')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'client' as UserRole
  })
  const [connStatus, setConnStatus] = useState<'idle' | 'testing' | 'ok' | 'blocked' | 'error'>('idle')
  const [connMessage, setConnMessage] = useState<string | null>(null)

  const { login, signUp, resetPassword, signInWithGoogle, signInWithLinkedIn, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await login(formData.email, formData.password)
      if (result.error) {
        if (result.error.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else if (result.error.includes('Email not confirmed')) {
          setError('Please check your email and confirm your account before logging in.')
        } else {
          setError(result.error)
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
        navigate('/')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await signUp(formData.email, formData.password, formData.name, formData.role)
      if (result.error) {
        if (result.error.includes('User already registered')) {
          setError('This email is already registered. Please try logging in instead.')
        } else {
          setError(result.error)
        }
      } else {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Luxury Labs. You can now start managing your real estate investments.",
        })
        navigate('/')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await resetPassword(resetEmail)
      if (result.error) {
        setError(result.error)
      } else {
        setResetSent(true)
        toast({
          title: "Reset email sent!",
          description: "Check your email for password reset instructions.",
        })
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signInWithGoogle()
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLinkedInSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signInWithLinkedIn()
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to sign in with LinkedIn. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOfflineDemo = () => {
    try {
      localStorage.setItem('ll_offline_admin', '1')
      window.location.reload()
    } catch (e) {
      console.warn('Failed to enable offline demo mode', e)
    }
  }

  const testConnection = async () => {
    try {
      setConnStatus('testing')
      setConnMessage(null)
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 6000)
      const res = await fetch('https://vzrdmjbcbhhyutppuxcf.supabase.co/auth/v1/health', {
        mode: 'cors',
        signal: controller.signal
      })
      clearTimeout(timeout)
      if (res.ok) {
        setConnStatus('ok')
        setConnMessage('Supabase reachable from your network.')
      } else {
        setConnStatus('error')
        setConnMessage(`Received ${res.status} ${res.statusText}`)
      }
    } catch (e: any) {
      const msg = e?.name === 'AbortError' ? 'Request timed out' : (e?.message || 'Unknown error')
      setConnStatus('blocked')
      setConnMessage(`Network/CORS blocked: ${msg}`)
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'administrator': return <Shield className="h-4 w-4" />
      case 'real_estate_agent': return <UserCheck className="h-4 w-4" />
      case 'investor': return <TrendingUp className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'administrator': return 'Full system access and user management'
      case 'real_estate_agent': return 'Property sales and client relations'
      case 'investor': return 'Investment opportunities and portfolio tracking'
      default: return 'Basic access to properties and investments'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navigation />
      <div className="flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
            alt="Luxury Labs Logo" 
            className="h-64 w-auto mx-auto mb-4" 
          />
          <p className="text-primary text-lg font-montserrat font-medium">
            Luxury Property Transformation & Investment
          </p>
        </div>

        <Card className="shadow-luxury border-0">
          <CardHeader className="space-y-1 pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" disabled={showForgotPassword}>Sign In</TabsTrigger>
                <TabsTrigger value="signup" disabled={showForgotPassword}>Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl">Create account</CardTitle>
                  <CardDescription>
                    Join Luxury Labs to start your investment journey
                  </CardDescription>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            {showForgotPassword ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setResetEmail('')
                      setResetSent(false)
                      setError(null)
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </div>
                
                {resetSent ? (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Reset Email Sent!</h3>
                      <p className="text-green-700 text-sm">
                        We've sent password reset instructions to <strong>{resetEmail}</strong>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowForgotPassword(false)
                        setResetEmail('')
                        setResetSent(false)
                      }}
                    >
                      Return to Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2 text-center">
                      <CardTitle className="text-2xl">Reset Password</CardTitle>
                      <CardDescription>
                        Enter your email address and we'll send you a link to reset your password
                      </CardDescription>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="name@example.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert className="border-destructive/50 text-destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="luxury"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Reset Email'
                      )}
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <Tabs value={activeTab} className="w-full">
                {/* Login Form */}
                <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-destructive/50 text-destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="luxury"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <div className="text-center my-3">
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground"
                      onClick={() => setShowForgotPassword(true)}
                      disabled={isLoading}
                    >
                      Forgot your password?
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleLinkedInSignIn}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full mt-2" 
                    variant="secondary"
                    onClick={handleOfflineDemo}
                    disabled={isLoading}
                  >
                    Continue Offline (Demo Admin)
                  </Button>
                  <Button
                    type="button"
                    className="w-full mt-2"
                    variant="outline"
                    onClick={testConnection}
                    disabled={isLoading || connStatus === 'testing'}
                  >
                    {connStatus === 'testing' ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing connection...
                      </>
                    ) : (
                      'Test Supabase Connection'
                    )}
                  </Button>
                  {connStatus !== 'idle' && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {connMessage || (connStatus === 'ok' ? 'Supabase reachable.' : 'Connection appears blocked.')}
                    </p>
                  )}
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full p-2 border border-input bg-background rounded-md"
                      disabled={isLoading}
                    >
                      <option value="client">Client</option>
                      <option value="investor">Investor</option>
                      <option value="real_estate_agent">Real Estate Agent</option>
                      <option value="project_manager">Project Manager</option>
                      <option value="finance_lead">Finance Lead</option>
                      <option value="real_estate_director">Real Estate Director</option>
                    </select>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getRoleIcon(formData.role)}
                      <span>{getRoleDescription(formData.role)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-destructive/50 text-destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="luxury"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Auth