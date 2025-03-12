"use client"

import { useState, useEffect } from "react"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    // Calculate password strength
    let newStrength = 0
    const newSuggestions: string[] = []

    if (password.length > 0) newStrength += 1
    if (password.length < 8) newSuggestions.push("Ajoutez au moins 8 caractères")

    if (password.length >= 8) newStrength += 1

    if (/[A-Z]/.test(password)) newStrength += 1
    else newSuggestions.push("Ajoutez une lettre majuscule")

    if (/[0-9]/.test(password)) newStrength += 1
    else newSuggestions.push("Ajoutez un chiffre")

    if (/[^A-Za-z0-9]/.test(password)) newStrength += 1
    else newSuggestions.push("Ajoutez un caractère spécial")

    setStrength(newStrength)
    setSuggestions(newSuggestions)

    // Set message based on strength
    if (newStrength === 0) setMessage("")
    else if (newStrength <= 2) setMessage("Faible")
    else if (newStrength <= 4) setMessage("Moyen")
    else setMessage("Fort")
  }, [password])

  // Don't show anything if password is empty
  if (password.length === 0) return null

  return (
    <div className="mt-1">
      <div className="flex space-x-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-full rounded-full ${i < strength ? getStrengthColor(strength) : "bg-gray-200"}`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className={`text-xs ${getTextColor(strength)}`}>{message}</p>
        <p className="text-xs text-gray-500">{strength}/5</p>
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-1 text-xs text-gray-500 list-disc pl-4">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function getStrengthColor(strength: number) {
  if (strength <= 2) return "bg-red-500"
  if (strength <= 4) return "bg-yellow-500"
  return "bg-green-500"
}

function getTextColor(strength: number) {
  if (strength <= 2) return "text-red-500"
  if (strength <= 4) return "text-yellow-500"
  return "text-green-500"
}

