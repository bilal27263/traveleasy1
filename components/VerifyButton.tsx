"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Globe, Gift, LockKeyhole } from "lucide-react"
import Image from 'next/image';

interface VerifyButtonProps {
  isVerified: boolean
  onVerify: () => void
  onPromoClick?: () => void
}

export function VerifyButton({ isVerified, onVerify, onPromoClick }: VerifyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleVerify = () => {
    window.open("https://traveleasy.gumroad.com/l/qmrwqv", "_blank")
    setIsOpen(false)
    // In a real application, you would wait for a webhook from Gumroad
    // before calling onVerify. For this example, we'll simulate it with a timeout.
    setTimeout(onVerify, 5000)
  }

  // Add a "Learn More" button that triggers the promo video
  const handleLearnMore = () => {
    setIsOpen(false)
    if (onPromoClick) {
      onPromoClick()
    }
  }

  if (isVerified) {
    return (
      <Badge variant="outline" className="ml-2">
        <CheckCircle className="w-4 h-4 mr-1" />
        Verified
      </Badge>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Verify Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="w-5 h-5 mr-2 text-blue-500" />
            Verify Your Travel Agency
          </DialogTitle>
          <DialogDescription>
            Join our verified agencies program to boost your credibility and grow your business.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-4 h-4 mr-2 text-blue-500" />
                  Earn Instant Trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Get a verified badge that signals travelers you&apos;re a legitimate and reputable agency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center text-lg">
                  <Globe className="w-4 h-4 mr-2 text-green-500" />
                  Expand Your Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Enjoy higher visibility on the platform, attracting more potential customers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center text-lg">
                  <Gift className="w-4 h-4 mr-2 text-purple-500" />
                  Unlock Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Access priority support and special promotional features.</p>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Special Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">3 Months Access</p>
                  <p className="text-sm text-gray-500">Only $22 - Get started today!</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Annual Access</p>
                  <p className="text-sm text-gray-500">Save $30 with yearly billing!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-2">
              <LockKeyhole className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Secure payment powered by</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzaCDQeSO0VfdKMktekij0OUv3D2LX.png"
                alt="Gumroad"
                className="h-5 object-contain"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleLearnMore} className="mr-2">
            Watch Demo
          </Button>
          <Button onClick={handleVerify} className="w-full">
            Proceed to Verification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

