"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ProfileUploader() {
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image (JPG, PNG, GIF)")
      return
    }

    // Validate file size (1MB max)
    if (file.size > 1024 * 1024) {
      setError("L'image ne doit pas dépasser 1MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImage(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-40 h-40">
        {image ? (
          <>
            <Image
              src={image || "/placeholder.svg"}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full object-cover w-40 h-40"
            />
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              aria-label="Supprimer l'image"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="profile-upload" className="cursor-pointer">
          <Button variant="outline" size="sm" className="mt-2">
            <Upload className="h-4 w-4 mr-2" />
            {image ? "Changer l'image" : "Ajouter une image"}
          </Button>
          <input
            id="profile-upload"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">JPG, GIF ou PNG. 1MB max.</p>

        {error && (
          <Alert variant="destructive" className="mt-2 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

