import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChromeIcon as Google, Mail, Phone, Apple } from 'lucide-react'

interface AuthPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthPopup({ open, onOpenChange }: AuthPopupProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement authentication logic here
    console.log('Authenticating with:', email, password)
    onOpenChange(false)
  }

  const handleSocialAuth = (provider: string) => {
    // Implement social authentication logic here
    console.log('Authenticating with:', provider)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? 'Sign Up' : 'Log In'}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? 'Create an account to access all features.'
              : 'Welcome back! Please log in to your account.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => handleSocialAuth('Google')} variant="outline" className="w-full">
            <Google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button onClick={() => handleSocialAuth('Apple')} variant="outline" className="w-full">
            <Apple className="mr-2 h-4 w-4" />
            Continue with Apple
          </Button>
          <Button onClick={() => handleSocialAuth('Phone')} variant="outline" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            Continue with Phone
          </Button>
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </form>
        </div>
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-gray-600 hover:text-orange-500"
          >
            {isSignUp
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

