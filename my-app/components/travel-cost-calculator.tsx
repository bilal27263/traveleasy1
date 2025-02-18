"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function TravelCostCalculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/travel-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origin, destination }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch travel advice")
      }

      const data = await response.json()
      setAdvice(data.advice)
    } catch (error) {
      console.error("Error fetching travel advice:", error)
      setAdvice("Sorry, we couldn't generate advice at this time. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Cost Calculator</CardTitle>
        <CardDescription>Find the cheapest way to reach your destination</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter your starting point"
              required
            />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Get Travel Advice"
            )}
          </Button>
        </form>
        {advice && (
          <div className="mt-4">
            <h3 className="font-semibold">Travel Advice:</h3>
            <p className="mt-2">{advice}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

