"use client"

import { useState, useEffect, useRef } from "react"
import { X, Shield, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface VerificationPromoProps {
  isVerified: boolean
  onVerify: () => void
  onDismiss: () => void
}

export function VerificationPromo({ isVerified, onVerify, onDismiss }: VerificationPromoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Don't show for verified users
    if (isVerified) return

    // Check if this is first login or if it's time to show again
    const lastShown = localStorage.getItem("verificationPromoLastShown")
    const hasSeenBefore = localStorage.getItem("verificationPromoSeen")

    const isFirstLogin = !hasSeenBefore
    const shouldShowAgain = lastShown && Date.now() - Number.parseInt(lastShown) > 1000 * 60 * 60 * 24 // Show again after 24 hours

    if (isFirstLogin || shouldShowAgain) {
      // Set a small delay to show the promo after page loads
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Mark as seen and record timestamp
        localStorage.setItem("verificationPromoSeen", "true")
        localStorage.setItem("verificationPromoLastShown", Date.now().toString())
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isVerified])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  const handleVerifyClick = () => {
    onVerify()
    setIsVisible(false)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <Card className="overflow-hidden border-2 border-blue-400 shadow-lg">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-2 z-10 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <video
                ref={videoRef}
                className="w-full h-auto"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/traveleasy%20devlopers-E7xL9FuDl8KhnFwGdnPVmJRM2qic6v.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            <CardContent className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Boost Your Agency&apos;s Credibility
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Verified agencies receive 3x more bookings and priority placement in search results. Complete your
                verification today!
              </p>
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={handleDismiss}>
                  Remind me later
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleVerifyClick}>
                  Verify Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

