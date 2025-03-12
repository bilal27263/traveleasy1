"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import { useFormValidation } from "@/hooks/use-form-validation"
import { toast } from "@/hooks/use-toast"

const roles = [
  { id: "admin", name: "Administrator", description: "Full access to all features" },
  { id: "manager", name: "Manager", description: "Can manage trips and team members" },
  { id: "editor", name: "Editor", description: "Can create and edit content" },
  { id: "viewer", name: "Viewer", description: "Can view dashboard data" },
]

export function TeamInviteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const { errors, validate, validateField } = useFormValidation()

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    role: "",
  })

  type ValidationRules = {
    [key in keyof typeof formData]: {
      required: boolean;
      pattern?: RegExp;
      minLength?: number;
    }
  }

  const validationRules: ValidationRules = {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    fullName: { required: true, minLength: 2 },
    role: { required: true },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value, validationRules[name as keyof ValidationRules])
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
    validateField("role", value, validationRules.role)
  }

  const handleTestInvite = async () => {
    const isValid = validate(formData, validationRules)

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before testing.",
        variant: "destructive",
      })
      return
    }

    setIsTesting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Test Successful",
      description: "The invitation process is working correctly.",
    })

    setIsTesting(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validate(formData, validationRules)

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${formData.email}`,
      })

      // Reset form
      setFormData({
        email: "",
        fullName: "",
        role: "",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="colleague@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleInputChange}
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger className={errors.role ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                <div className="flex flex-col">
                  <span>{role.name}</span>
                  <span className="text-xs text-gray-500">{role.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The invited team member will receive an email with instructions to set up their account.
        </AlertDescription>
      </Alert>

      <div className="flex space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Invitation...
            </>
          ) : (
            "Send Invitation"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={handleTestInvite} disabled={isTesting}>
          {isTesting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Invitation"
          )}
        </Button>
      </div>
    </form>
  )
}

