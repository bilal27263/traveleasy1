"use client"

import { useState, useEffect } from "react"

export function useVerificationPromo(isVerified: boolean) {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (isVerified) return

    // Check if this is first login
    const hasSeenBefore = localStorage.getItem("verificationPromoSeen")
    if (!hasSeenBefore) {
      setShouldShow(true)
      localStorage.setItem("verificationPromoSeen", "true")
      localStorage.setItem("verificationPromoLastShown", Date.now().toString())
      return
    }

    // Check if it's time to show again
    const lastShown = localStorage.getItem("verificationPromoLastShown")
    if (lastShown) {
      const timeSinceLastShown = Date.now() - Number.parseInt(lastShown)
      const daysSinceLastShown = timeSinceLastShown / (1000 * 60 * 60 * 24)

      // Show again after 3 days
      if (daysSinceLastShown >= 3) {
        setShouldShow(true)
        localStorage.setItem("verificationPromoLastShown", Date.now().toString())
      }
    }
  }, [isVerified])

  const dismiss = () => {
    setShouldShow(false)
    localStorage.setItem("verificationPromoLastShown", Date.now().toString())
  }

  const forceShow = () => {
    setShouldShow(true)
  }

  return {
    shouldShow,
    dismiss,
    forceShow,
  }
}

