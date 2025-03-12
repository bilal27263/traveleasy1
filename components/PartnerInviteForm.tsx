"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import { useFormValidation } from "@/hooks/use-form-validation"
import { toast } from "@/hooks/use-toast"

const partnerTypes = [
  { id: "guide", name: "Tour Guide" },
  { id: "local_partner", name: "Local Partner" },
  { id: "hotel", name: "Hotel Partner" },
  { id: "transport", name: "Transportation Partner" },
]

const expertiseAreas = [
  { id: "adventure", name: "Adventure Tours" },
  { id: "cultural", name: "Cultural Tours" },
  { id: "food", name: "Food & Culinary" },
  { id: "luxury", name: "Luxury Travel" },
]

export function PartnerInviteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const { errors, validate, validateField } = useFormValidation()

  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    contactPerson: "",
    type: "",
    expertise: "",
    message: "",
  })

  type ValidationRuleKeys = "email" | "companyName" | "contactPerson" | "type" | "expertise" | "message";

  const validationRules: Record<ValidationRuleKeys, { required: boolean; pattern?: RegExp; minLength?: number }> = {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    companyName: { required: true },
    contactPerson: { required: true },
    type: { required: true },
    expertise: { required: true },
    message: { required: true, minLength: 10 },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: ValidationRuleKeys, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value, validationRules[name])
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
      description: "The partner invitation process is working correctly.",
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
        companyName: "",
        contactPerson: "",
        type: "",
        expertise: "",
        message: "",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="partner@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleInputChange}
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            name="contactPerson"
            placeholder="Full Name"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className={errors.contactPerson ? "border-red-500" : ""}
          />
          {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Partner Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger className={errors.type ? "border-red-500" : ""}>
              <SelectValue placeholder="Select partner type" />
            </SelectTrigger>
            <SelectContent>
              {partnerTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expertise">Area of Expertise</Label>
          <Select value={formData.expertise} onValueChange={(value) => handleSelectChange("expertise", value)}>
            <SelectTrigger className={errors.expertise ? "border-red-500" : ""}>
              <SelectValue placeholder="Select area of expertise" />
            </SelectTrigger>
            <SelectContent>
              {expertiseAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.expertise && <p className="text-sm text-red-500">{errors.expertise}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Invitation Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Write a personalized message to your potential partner..."
          value={formData.message}
          onChange={handleInputChange}
          className={errors.message ? "border-red-500" : ""}
          rows={4}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Partners will receive an email invitation to join your network and set up their profile.
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

