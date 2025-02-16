"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function CreateTripPage() {
  const [tripData, setTripData] = useState({
    title: "",
    description: "",
    seoKeywords: "",
    metaDescription: "",
    schedule: "",
    location: "",
    transportation: "",
    additionalDetails: "",
    price: "",
    currency: "USD",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTripData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Trip data submitted:", tripData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Trip</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={tripData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={tripData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="seoKeywords">SEO Keywords</Label>
              <Input id="seoKeywords" name="seoKeywords" value={tripData.seoKeywords} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={tripData.metaDescription}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                name="schedule"
                type="datetime-local"
                value={tripData.schedule}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={tripData.location} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="transportation">Transportation</Label>
              <Textarea
                id="transportation"
                name="transportation"
                value={tripData.transportation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="additionalDetails">Additional Details</Label>
              <Textarea
                id="additionalDetails"
                name="additionalDetails"
                value={tripData.additionalDetails}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={tripData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                name="currency"
                value={tripData.currency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MAD">MAD</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Create Trip
        </Button>
      </form>
    </div>
  )
}

