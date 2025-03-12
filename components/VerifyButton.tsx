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
import { CheckCircle } from "lucide-react"

interface VerifyButtonProps {
  isVerified: boolean
  onVerify: () => void
}

export function VerifyButton({ isVerified, onVerify }: VerifyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleVerify = () => {
    window.open("https://example.com/verification", "_blank")
    setIsOpen(false)
    // In a real application, you would wait for a webhook from the payment processor
    // before calling onVerify. For this example, we'll simulate it with a timeout.
    setTimeout(onVerify, 5000)
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Your Account</DialogTitle>
          <DialogDescription>
            Verify your account to get priority in search results and a verification badge.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Click the button below to proceed with the verification payment process.</p>
        </div>
        <DialogFooter>
          <Button onClick={handleVerify}>Proceed to Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

