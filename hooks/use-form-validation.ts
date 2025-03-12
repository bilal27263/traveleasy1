"use client"

import { useState, useCallback } from "react"

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean
  customErrorMessage?: string
}

interface ValidationErrors {
  [field: string]: string | null
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateField = useCallback((name: string, value: any, rules: ValidationRules) => {
    if (rules.required && (value === undefined || value === null || value === "")) {
      return "Ce champ est requis"
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Ce champ doit contenir au moins ${rules.minLength} caractères`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Ce champ ne doit pas dépasser ${rules.maxLength} caractères`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Format invalide"
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.customErrorMessage || "Format invalide"
    }

    return null
  }, [])

  const validate = useCallback(
    (values: { [field: string]: any }, validationRules: { [field: string]: ValidationRules }) => {
      const newErrors: ValidationErrors = {}
      let isValid = true

      Object.keys(validationRules).forEach((field) => {
        const error = validateField(field, values[field], validationRules[field])
        if (error) {
          isValid = false
          newErrors[field] = error
        } else {
          newErrors[field] = null
        }
      })

      setErrors(newErrors)
      return isValid
    },
    [validateField],
  )

  return { errors, validate, validateField, setErrors }
}

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+|00)[0-9]{1,3}[0-9\s]{8,14}$/,
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
}

