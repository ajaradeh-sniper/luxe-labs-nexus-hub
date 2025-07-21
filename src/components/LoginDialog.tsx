import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Building2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

interface LoginDialogProps {
  trigger?: React.ReactNode;
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // For demo purposes, we'll simulate login with any email/password
      // In a real app, this would authenticate with Supabase
      await login(email, password)
      setOpen(false)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("admin@luxurylabs.com")
    setPassword("demo123")
  }

  const defaultTrigger = (
    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
      <LogIn className="h-4 w-4 mr-2" />
      Login
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border luxury-shadow">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
              alt="Luxury Labs Logo" 
              className="h-12 w-auto" 
            />
            <div>
              <DialogTitle className="text-2xl font-playfair">Luxury Labs</DialogTitle>
              <DialogDescription className="text-primary font-montserrat text-sm">
                Property Solutions Portal
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Card className="border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-playfair">Welcome Back</CardTitle>
            <p className="text-sm text-muted-foreground font-montserrat">
              Sign in to access your luxury property dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-montserrat">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="font-montserrat"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-montserrat">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="font-montserrat"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full luxury-gradient hover:luxury-glow font-montserrat"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full font-montserrat"
                onClick={handleDemoLogin}
              >
                Use Demo Login
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-montserrat">
                Demo credentials: admin@luxurylabs.com / demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}