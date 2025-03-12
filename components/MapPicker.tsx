"use client"

import type React from "react"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MapPickerProps {
  id: string
  value: string
  onChange: (location: string) => void
}

export function MapPicker({ id, value, onChange }: MapPickerProps) {
  const [coordinates, setCoordinates] = useState(value || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoordinates(e.target.value)
  }

  const handleSubmit = () => {
    onChange(coordinates)
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[400px] bg-gray-100 border rounded-md flex items-center justify-center">
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-2">Map preview unavailable in demo mode</p>
          <p className="text-sm text-gray-400">Enter coordinates manually below</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Input
          id={id}
          placeholder="Latitude, Longitude (e.g. 48.8566, 2.3522)"
          value={coordinates}
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button type="button" onClick={handleSubmit}>
          Set Location
        </Button>
      </div>

      <p className="text-xs text-gray-500">Format: latitude, longitude (decimal degrees)</p>
    </div>
  )
}

