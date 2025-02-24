/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import SignIn from "@/components/SignIn"

interface AuthPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signup" | "login"
}

export function AuthPopup({ open, onOpenChange, initialMode = "signup" }: AuthPopupProps) {
  const [mode, setMode] = useState<"signup" | "login">(initialMode)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Sign Up" : "Log In"}</DialogTitle>
          <DialogDescription>
            {mode === "signup"
              ? "Create an account to access all features."
              : "Welcome back! Please log in to your account."}
          </DialogDescription>
        </DialogHeader>
        <SignIn />
      </DialogContent>
    </Dialog>
  )
}

