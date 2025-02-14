"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePurposeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Purpose of Inquiry
                </label>
                <Select onValueChange={handlePurposeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="partnerships">Partnerships or Collaborations</SelectItem>
                    <SelectItem value="information">Information Requests</SelectItem>
                    <SelectItem value="trip">Trip or Travel Agency Inquiries</SelectItem>
                    <SelectItem value="feedback">Feedback or Suggestions</SelectItem>
                    <SelectItem value="other">Other Queries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Email:</strong> bilalaiyadi04@gmail.com
              </p>
              <p>
                <strong>Address:</strong> 123 Travel Street, Marrakech, Morocco
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our mission is to promote sustainability in travel by offering eco-friendly options, supporting local
                communities, and fostering responsible tourism.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Image src="/placeholder.svg" alt="FABWS Logo" width={100} height={100} className="mx-auto mb-2" />
                  <p>FABWS</p>
                </div>
                <div className="text-center">
                  <Image src="/placeholder.svg" alt="GudCity Logo" width={100} height={100} className="mx-auto mb-2" />
                  <p>GudCity</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/placeholder.svg"
                    alt="Partner Hotel 1 Logo"
                    width={100}
                    height={100}
                    className="mx-auto mb-2"
                  />
                  <p>Partner Hotel 1</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/placeholder.svg"
                    alt="Partner Hotel 2 Logo"
                    width={100}
                    height={100}
                    className="mx-auto mb-2"
                  />
                  <p>Partner Hotel 2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

