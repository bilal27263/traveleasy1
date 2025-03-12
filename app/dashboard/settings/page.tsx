"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { AlertCircle, Check, Copy, Eye, EyeOff, Globe, Info, Lock, RefreshCw, Smartphone, Loader2 } from "lucide-react"
import { ProfileUploader } from "@/components/ProfileUploader"
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Form validation utils
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isValidPhone = (phone: string) => {
  return /^(\+|00)[0-9]{1,3}[0-9\s]{8,14}$/.test(phone)
}

const isValidUrl = (url: string) => {
  if (!url) return true // Empty is valid
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

interface FormData {
  agency: {
    name: string
    email: string
    phone: string
    website: string
    address: string
  }
  preferences: {
    language: string
    currency: string
    timezone: string
    bookingWindow: string
    minAdvance: string
    cancellationPolicy: string
    groupSize: string
    customCancellation: string
  }
  payment: {
    stripeEnabled: boolean
    stripeKey: string
    stripeSecret: string
    paypalEnabled: boolean
    bankTransferEnabled: boolean
    bankName: string
    accountHolder: string
    iban: string
    bic: string
    companyName: string
    taxId: string
    billingEmail: string
    billingPhone: string
    billingAddress: string
  }
  notifications: {
    email: {
      bookings: boolean
      cancellations: boolean
      payments: boolean
      reviews: boolean
      marketing: boolean
      system: boolean
    }
    sms: {
      bookings: boolean
      cancellations: boolean
      payments: boolean
      urgent: boolean
    }
    dnd: {
      enabled: boolean
      start: string
      end: string
    }
  }
  security: {
    dataCollection: boolean
    cookieConsent: boolean
    marketingConsent: boolean
    privacyPolicy: string
    dataRetention: string
    sessionTimeout: boolean
    sessionDuration: string
    ipRestriction: boolean
  }
}

interface Errors {
  agency: {
    name: boolean
    email: boolean
    phone: boolean
    website: boolean
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  // Form data with empty initial states
  const [formData, setFormData] = useState<FormData>({
    agency: {
      name: "",
      email: "",
      phone: "",
      website: "",
      address: "",
    },
    preferences: {
      language: "",
      currency: "",
      timezone: "",
      bookingWindow: "",
      minAdvance: "",
      cancellationPolicy: "",
      groupSize: "",
      customCancellation: "",
    },
    payment: {
      stripeEnabled: false,
      stripeKey: "",
      stripeSecret: "",
      paypalEnabled: false,
      bankTransferEnabled: false,
      bankName: "",
      accountHolder: "",
      iban: "",
      bic: "",
      companyName: "",
      taxId: "",
      billingEmail: "",
      billingPhone: "",
      billingAddress: "",
    },
    notifications: {
      email: {
        bookings: false,
        cancellations: false,
        payments: false,
        reviews: false,
        marketing: false,
        system: false,
      },
      sms: {
        bookings: false,
        cancellations: false,
        payments: false,
        urgent: false,
      },
      dnd: {
        enabled: false,
        start: "22:00",
        end: "08:00",
      },
    },
    security: {
      dataCollection: false,
      cookieConsent: false,
      marketingConsent: false,
      privacyPolicy: "",
      dataRetention: "",
      sessionTimeout: false,
      sessionDuration: "",
      ipRestriction: false,
    },
  })

  // Validation state
  const [errors, setErrors] = useState<Errors>({
    agency: {
      name: false,
      email: false,
      phone: false,
      website: false,
    },
  })

  // For demo purposes, generate API key if needed
  useEffect(() => {
    // Only generate if user clicks the button
    if (apiKey === null) return

    const savedApiKey = localStorage.getItem("apiKey")
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [apiKey])

  const validateForm = (section: string) => {
    let isValid = true
    const newErrors = { ...errors }

    if (section === "account") {
      // Agency name validation
      if (!formData.agency.name.trim()) {
        newErrors.agency.name = true
        isValid = false
      } else {
        newErrors.agency.name = false
      }

      // Email validation
      if (formData.agency.email && !isValidEmail(formData.agency.email)) {
        newErrors.agency.email = true
        isValid = false
      } else {
        newErrors.agency.email = false
      }

      // Phone validation
      if (formData.agency.phone && !isValidPhone(formData.agency.phone)) {
        newErrors.agency.phone = true
        isValid = false
      } else {
        newErrors.agency.phone = false
      }

      // Website validation
      if (formData.agency.website && !isValidUrl(formData.agency.website)) {
        newErrors.agency.website = true
        isValid = false
      } else {
        newErrors.agency.website = false
      }

      // Password validation
      if (password && confirmPassword && password !== confirmPassword) {
        setPasswordMatch(false)
        isValid = false
      } else {
        setPasswordMatch(true)
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFormChange = (section: keyof FormData, field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleNestedChange = (section: keyof FormData, parent: string, field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...(prev[section] as any)[parent],
          [field]: value,
        },
      },
    }))
  }

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}`
      setApiKey(newKey)
      localStorage.setItem("apiKey", newKey)

      toast({
        title: "Clé API générée",
        description: "Votre nouvelle clé API a été générée avec succès.",
        variant: "default",
      })
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de générer une nouvelle clé API.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingKey(false)
    }
  }

  const copyApiKey = () => {
    if (!apiKey) return

    navigator.clipboard.writeText(apiKey)
    toast({
      title: "Copié !",
      description: "La clé API a été copiée dans le presse-papier.",
      variant: "default",
    })
  }

  const handleSave = async () => {
    if (!validateForm(activeTab)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant d'enregistrer.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save to localStorage for demo purposes
      localStorage.setItem("settingsFormData", JSON.stringify(formData))

      setSaveSuccess(true)
      toast({
        title: "Modifications enregistrées",
        description: "Vos paramètres ont été mis à jour avec succès.",
        variant: "default",
      })

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const testConnection = async (service: string) => {
    toast({
      title: "Test de connexion",
      description: `Test de connexion à ${service} en cours...`,
      variant: "default",
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Connexion réussie",
      description: `La connexion à ${service} a été établie avec succès.`,
      variant: "default",
    })
  }

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("settingsFormData")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error parsing saved settings data", e)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Paramètres</h1>
        {saveSuccess && (
          <Alert className="w-auto bg-green-100 border-green-500">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>Vos modifications ont été enregistrées avec succès.</AlertDescription>
          </Alert>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="payment">Paiement</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team & Partners</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Compte</CardTitle>
              <CardDescription>Gérez les informations de base de votre agence de voyage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <ProfileUploader />
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agency-name">
                        Nom de l&apos;Agence <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="agency-name"
                        placeholder="Entrez le nom de votre agence"
                        value={formData.agency.name}
                        onChange={(e) => handleFormChange("agency", "name", e.target.value)}
                        className={cn(errors.agency.name && "border-red-500")}
                      />
                      {errors.agency.name && <p className="text-xs text-red-500">Le nom de agency est requis</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@votre-agence.com"
                        value={formData.agency.email}
                        onChange={(e) => handleFormChange("agency", "email", e.target.value)}
                        className={cn(errors.agency.email && "border-red-500")}
                      />
                      {errors.agency.email && <p className="text-xs text-red-500">Email invalide</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="+33 1 23 45 67 89"
                        value={formData.agency.phone}
                        onChange={(e) => handleFormChange("agency", "phone", e.target.value)}
                        className={cn(errors.agency.phone && "border-red-500")}
                      />
                      {errors.agency.phone && (
                        <p className="text-xs text-red-500">Format de téléphone invalide (ex: +33 1 23 45 67 89)</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Site Web</Label>
                      <Input
                        id="website"
                        placeholder="www.votre-agence.com"
                        value={formData.agency.website}
                        onChange={(e) => handleFormChange("agency", "website", e.target.value)}
                        className={cn(errors.agency.website && "border-red-500")}
                      />
                      {errors.agency.website && <p className="text-xs text-red-500">URL invalide</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea
                      id="address"
                      placeholder="Adresse complète de votre agence"
                      value={formData.agency.address}
                      onChange={(e) => handleFormChange("agency", "address", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité du Compte</CardTitle>
              <CardDescription>Gérez votre mot de passe et les options authentification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Saisissez votre mot de passe actuel"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Créez un nouveau mot de passe fort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {password && <PasswordStrengthIndicator password={password} />}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmez votre nouveau mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(!passwordMatch && "border-red-500")}
                />
                {!passwordMatch && <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>}
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                <Label htmlFor="two-factor">Activer l&apos;authentification à deux facteurs</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        L&apos;authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {twoFactorEnabled && (
                <div className="pt-2">
                  <Alert>
                    <Smartphone className="h-4 w-4" />
                    <AlertTitle>Configuration requise</AlertTitle>
                    <AlertDescription>
                      Pour activer l&apos;authentification à deux facteurs, vous devez configurer une application
                      d&apos;authentification comme Google Authenticator ou Authy.
                    </AlertDescription>
                    <Button size="sm" className="mt-2">
                      Configurer maintenant
                    </Button>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agency Preferences */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences Générales</CardTitle>
              <CardDescription>Configurez les préférences générales de votre agence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select
                    value={formData.preferences.language || undefined}
                    onValueChange={(value) => handleFormChange("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise par défaut</Label>
                  <Select
                    value={formData.preferences.currency || undefined}
                    onValueChange={(value) => handleFormChange("preferences", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                      <SelectItem value="jpy">Japanese Yen (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select
                    value={formData.preferences.timezone || undefined}
                    onValueChange={(value) => handleFormChange("preferences", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      <SelectItem value="australia-sydney">Australia/Sydney (GMT+11)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Langues supportées</Label>
                  <div className="flex flex-wrap gap-2">
                    <p className="text-sm text-gray-500">Aucune langue configurée</p>
                    <Button variant="outline" size="sm" className="h-6">
                      + Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Préférences de Réservation</CardTitle>
              <CardDescription>Configurez les paramètres de réservation pour vos voyages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-window">Fenêtre de réservation (jours)</Label>
                  <Input
                    id="booking-window"
                    type="number"
                    placeholder="365"
                    value={formData.preferences.bookingWindow}
                    onChange={(e) => handleFormChange("preferences", "bookingWindow", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-advance">Réservation minimum à l&apos;avance (jours)</Label>
                  <Input
                    id="min-advance"
                    type="number"
                    placeholder="7"
                    value={formData.preferences.minAdvance}
                    onChange={(e) => handleFormChange("preferences", "minAdvance", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellation-policy">Politique d&apos;annulation</Label>
                  <Select
                    value={formData.preferences.cancellationPolicy || undefined}
                    onValueChange={(value) => handleFormChange("preferences", "cancellationPolicy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une politique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible (remboursement jusqu à 24h avant)</SelectItem>
                      <SelectItem value="moderate">Modérée (remboursement jusqu à 5 jours avant)</SelectItem>
                      <SelectItem value="strict">Stricte (remboursement jusqu à 14 jours avant)</SelectItem>
                      <SelectItem value="custom">Personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-group-size">Taille de groupe par défaut</Label>
                  <Input
                    id="default-group-size"
                    type="number"
                    placeholder="10"
                    value={formData.preferences.groupSize}
                    onChange={(e) => handleFormChange("preferences", "groupSize", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-cancellation">Politique d&apos;annulation personnalisée</Label>
                <Textarea
                  id="custom-cancellation"
                  placeholder="Décrivez votre politique d'annulation personnalisée ici..."
                  value={formData.preferences.customCancellation}
                  onChange={(e) => handleFormChange("preferences", "customCancellation", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment & Billing */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Méthodes de Paiement</CardTitle>
              <CardDescription>Configurez les méthodes de paiement acceptées par votre agence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="stripe"
                    checked={formData.payment.stripeEnabled}
                    onCheckedChange={(checked) => handleFormChange("payment", "stripeEnabled", checked)}
                  />
                  <Label htmlFor="stripe">Stripe</Label>
                </div>
                <div
                  className={cn("pl-6 space-y-2", !formData.payment.stripeEnabled && "opacity-50 pointer-events-none")}
                >
                  <div className="space-y-2">
                    <Label htmlFor="stripe-key">Clé API Stripe</Label>
                    <Input
                      id="stripe-key"
                      placeholder="pk_test_..."
                      value={formData.payment.stripeKey}
                      onChange={(e) => handleFormChange("payment", "stripeKey", e.target.value)}
                      disabled={!formData.payment.stripeEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret">Clé secrète Stripe</Label>
                    <Input
                      id="stripe-secret"
                      type="password"
                      placeholder="sk_test_..."
                      value={formData.payment.stripeSecret}
                      onChange={(e) => handleFormChange("payment", "stripeSecret", e.target.value)}
                      disabled={!formData.payment.stripeEnabled}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!formData.payment.stripeEnabled || !formData.payment.stripeKey}
                    onClick={() => testConnection("Stripe")}
                  >
                    Tester la connexion
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="paypal"
                    checked={formData.payment.paypalEnabled}
                    onCheckedChange={(checked) => handleFormChange("payment", "paypalEnabled", checked)}
                  />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div
                  className={cn("pl-6 space-y-2", !formData.payment.paypalEnabled && "opacity-50 pointer-events-none")}
                >
                  <div className="space-y-2">
                    <Label htmlFor="paypal-client">ID Client PayPal</Label>
                    <Input
                      id="paypal-client"
                      placeholder="Entrez votre ID client PayPal"
                      disabled={!formData.payment.paypalEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-secret">Secret PayPal</Label>
                    <Input
                      id="paypal-secret"
                      type="password"
                      placeholder="Entrez votre secret PayPal"
                      disabled={!formData.payment.paypalEnabled}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!formData.payment.paypalEnabled}
                    onClick={() => testConnection("PayPal")}
                  >
                    Tester la connexion
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="bank-transfer"
                    checked={formData.payment.bankTransferEnabled}
                    onCheckedChange={(checked) => handleFormChange("payment", "bankTransferEnabled", checked)}
                  />
                  <Label htmlFor="bank-transfer">Virement bancaire</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations Bancaires</CardTitle>
              <CardDescription>Configurez vos informations bancaires pour recevoir les paiements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Nom de la banque</Label>
                  <Input
                    id="bank-name"
                    placeholder="Nom de votre banque"
                    value={formData.payment.bankName}
                    onChange={(e) => handleFormChange("payment", "bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-holder">Titulaire du compte</Label>
                  <Input
                    id="account-holder"
                    placeholder="Nom du titulaire du compte"
                    value={formData.payment.accountHolder}
                    onChange={(e) => handleFormChange("payment", "accountHolder", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    value={formData.payment.iban}
                    onChange={(e) => handleFormChange("payment", "iban", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bic">BIC/SWIFT</Label>
                  <Input
                    id="bic"
                    placeholder="BNPAFRPP"
                    value={formData.payment.bic}
                    onChange={(e) => handleFormChange("payment", "bic", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de Facturation</CardTitle>
              <CardDescription>Configurez vos informations de facturation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
                  <Input
                    id="company-name"
                    placeholder="Nom légal de votre entreprise"
                    value={formData.payment.companyName}
                    onChange={(e) => handleFormChange("payment", "companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Numéro de TVA</Label>
                  <Input
                    id="tax-id"
                    placeholder="FR12345678901"
                    value={formData.payment.taxId}
                    onChange={(e) => handleFormChange("payment", "taxId", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Email de facturation</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    placeholder="facturation@votre-agence.com"
                    value={formData.payment.billingEmail}
                    onChange={(e) => handleFormChange("payment", "billingEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-phone">Téléphone de facturation</Label>
                  <Input
                    id="billing-phone"
                    placeholder="+33 1 23 45 67 89"
                    value={formData.payment.billingPhone}
                    onChange={(e) => handleFormChange("payment", "billingPhone", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-address">Adresse de facturation</Label>
                <Textarea
                  id="billing-address"
                  placeholder="Adresse complète de facturation"
                  value={formData.payment.billingAddress}
                  onChange={(e) => handleFormChange("payment", "billingAddress", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Notification</CardTitle>
              <CardDescription>Configurez comment et quand vous souhaitez recevoir des notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Notifications par Email</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-bookings">Nouvelles réservations</Label>
                      <Switch
                        id="email-bookings"
                        checked={formData.notifications.email.bookings}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "email", "bookings", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-cancellations">Annulations</Label>
                      <Switch
                        id="email-cancellations"
                        checked={formData.notifications.email.cancellations}
                        onCheckedChange={(checked) =>
                          handleNestedChange("notifications", "email", "cancellations", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-payments">Paiements reçus</Label>
                      <Switch
                        id="email-payments"
                        checked={formData.notifications.email.payments}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "email", "payments", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-reviews">Nouvelles avis</Label>
                      <Switch
                        id="email-reviews"
                        checked={formData.notifications.email.reviews}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "email", "reviews", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-marketing">Mises à jour marketing</Label>
                      <Switch
                        id="email-marketing"
                        checked={formData.notifications.email.marketing}
                        onCheckedChange={(checked) =>
                          handleNestedChange("notifications", "email", "marketing", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-system">Notifications système</Label>
                      <Switch
                        id="email-system"
                        checked={formData.notifications.email.system}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "email", "system", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Notifications par SMS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-bookings">Nouvelles réservations</Label>
                      <Switch
                        id="sms-bookings"
                        checked={formData.notifications.sms.bookings}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "sms", "bookings", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-cancellations">Annulations</Label>
                      <Switch
                        id="sms-cancellations"
                        checked={formData.notifications.sms.cancellations}
                        onCheckedChange={(checked) =>
                          handleNestedChange("notifications", "sms", "cancellations", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-payments">Paiements reçus</Label>
                      <Switch
                        id="sms-payments"
                        checked={formData.notifications.sms.payments}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "sms", "payments", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-urgent">Notifications urgentes</Label>
                      <Switch
                        id="sms-urgent"
                        checked={formData.notifications.sms.urgent}
                        onCheckedChange={(checked) => handleNestedChange("notifications", "sms", "urgent", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Périodes de non-dérangement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dnd-start">Début</Label>
                      <Input
                        id="dnd-start"
                        type="time"
                        placeholder="22:00"
                        value={formData.notifications.dnd.start}
                        onChange={(e) => handleNestedChange("notifications", "dnd", "start", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dnd-end">Fin</Label>
                      <Input
                        id="dnd-end"
                        type="time"
                        placeholder="08:00"
                        value={formData.notifications.dnd.end}
                        onChange={(e) => handleNestedChange("notifications", "dnd", "end", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="dnd-enabled"
                      checked={formData.notifications.dnd.enabled}
                      onCheckedChange={(checked) => handleNestedChange("notifications", "dnd", "enabled", checked)}
                    />
                    <Label htmlFor="dnd-enabled">Activer la période de non-dérangement</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications aux Clients</CardTitle>
              <CardDescription>Configurez les notifications automatiques envoyées à vos clients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="booking-confirmation">
                  <AccordionTrigger>Confirmation de réservation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="booking-confirmation-enabled" />
                        <Label htmlFor="booking-confirmation-enabled">Activer</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-confirmation-subject">Sujet de l&apos;email</Label>
                        <Input
                          id="booking-confirmation-subject"
                          placeholder="Confirmation de votre réservation avec {nom_agence}"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-confirmation-template">Modèle d&apos;email</Label>
                        <Textarea
                          id="booking-confirmation-template"
                          rows={5}
                          placeholder="Cher(e) {client_name}, 

Nous vous confirmons votre réservation pour {trip_name} du {start_date} au {end_date}.

Merci de votre confiance,
L'équipe {nom_agence}"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Envoyer un test
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment-confirmation">
                  <AccordionTrigger>Confirmation de paiement</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-confirmation-enabled" />
                        <Label htmlFor="payment-confirmation-enabled">Activer</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-confirmation-subject">Sujet de l&apos;email</Label>
                        <Input
                          id="payment-confirmation-subject"
                          placeholder="Confirmation de votre paiement pour {nom_agence}"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-confirmation-template">Modèle d&apos;email</Label>
                        <Textarea
                          id="payment-confirmation-template"
                          rows={5}
                          placeholder="Cher(e) {client_name},

Nous vous confirmons la réception de votre paiement de {amount} pour {trip_name}.

Merci de votre confiance,
L'équipe {nom_agence}"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Envoyer un test
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="trip-reminder">
                  <AccordionTrigger>Rappel de voyage</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="trip-reminder-enabled" />
                        <Label htmlFor="trip-reminder-enabled">Activer</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trip-reminder-days">Jours avant le départ</Label>
                        <Input id="trip-reminder-days" type="number" placeholder="7" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trip-reminder-subject">Sujet de l&apos;email</Label>
                        <Input
                          id="trip-reminder-subject"
                          placeholder="Rappel pour votre prochain voyage avec {nom_agence}"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trip-reminder-template">Modèle d&apos;email</Label>
                        <Textarea
                          id="trip-reminder-template"
                          rows={5}
                          placeholder="Cher(e) {client_name},

Nous vous rappelons que votre voyage {trip_name} commence dans {days_before} jours.

N'hésitez pas à nous contacter si vous avez des questions.

Bon voyage,
L'équipe {nom_agence}"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Envoyer un test
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team & Partners Settings</CardTitle>
              <CardDescription>Configure default settings for team members and partners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-team-role">Default Team Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-partner-type">Default Partner Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Tour Guide</SelectItem>
                        <SelectItem value="local_partner">Local Partner</SelectItem>
                        <SelectItem value="hotel">Hotel Partner</SelectItem>
                        <SelectItem value="transport">Transportation Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invitation-expiry">Invitation Expiry (days)</Label>
                    <Input type="number" id="invitation-expiry" placeholder="7" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-2fa" />
                    <Label htmlFor="require-2fa">Require 2FA for team members</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audit Logs</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-500">
                    Audit logs will appear here once team members or partners are invited.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations & API */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API et Clés</CardTitle>
              <CardDescription>Gérez vos clés API pour intégrer des services tiers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Clé API</h3>
                    <p className="text-sm text-gray-500">Utilisez cette clé pour accéder à notre API.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleGenerateApiKey} disabled={isGeneratingKey}>
                      {isGeneratingKey ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Générer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={apiKey || ""}
                    readOnly
                    className="font-mono"
                    placeholder="Cliquez sur 'Générer' pour créer une clé API"
                  />
                  <Button variant="outline" size="icon" onClick={copyApiKey} disabled={!apiKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Ne partagez jamais votre clé API. Elle donne accès à toutes vos données.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configurez des webhooks pour recevoir des notifications en temps réel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL du Webhook</Label>
                  <Input id="webhook-url" placeholder="https://votre-site.com/api/webhook" />
                </div>
                <div className="space-y-2">
                  <Label>Événements</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-booking" className="rounded" />
                      <Label htmlFor="event-booking">Réservation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-cancellation" className="rounded" />
                      <Label htmlFor="event-cancellation">Annulation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-payment" className="rounded" />
                      <Label htmlFor="event-payment">Paiement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-review" className="rounded" />
                      <Label htmlFor="event-review">Avis</Label>
                    </div>
                  </div>
                </div>
                <Button>Ajouter un Webhook</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intégrations Tierces</CardTitle>
              <CardDescription>Connectez votre compte à des services tiers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-8 w-8" />
                    <div>
                      <h3 className="font-medium">Google Analytics</h3>
                      <p className="text-sm text-gray-500">Suivez les statistiques de votre site web.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="google-analytics" />
                    <Button variant="outline" size="sm" onClick={() => testConnection("Google Analytics")}>
                      Tester
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-8 w-8" />
                    <div>
                      <h3 className="font-medium">Mailchimp</h3>
                      <p className="text-sm text-gray-500">Gérez vos campagnes de email marketing.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="mailchimp" />
                    <Button variant="outline" size="sm" onClick={() => testConnection("Mailchimp")}>
                      Tester
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-8 w-8" />
                    <div>
                      <h3 className="font-medium">Zapier</h3>
                      <p className="text-sm text-gray-500">Automatisez vos flux de travail.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="zapier" />
                    <Button variant="outline" size="sm" onClick={() => testConnection("Zapier")}>
                      Tester
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-8 w-8" />
                    <div>
                      <h3 className="font-medium">Slack</h3>
                      <p className="text-sm text-gray-500">Recevez des notifications dans votre espace de travail.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="slack" />
                    <Button variant="outline" size="sm" onClick={() => testConnection("Slack")}>
                      Tester
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Security */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité et RGPD</CardTitle>
              <CardDescription>Gérez vos paramètres de confidentialité et de conformité RGPD.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="data-collection"
                    checked={formData.security.dataCollection}
                    onCheckedChange={(checked) => handleFormChange("security", "dataCollection", checked)}
                  />
                  <Label htmlFor="data-collection">Collecte de données analytiques</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="cookie-consent"
                    checked={formData.security.cookieConsent}
                    onCheckedChange={(checked) => handleFormChange("security", "cookieConsent", checked)}
                  />
                  <Label htmlFor="cookie-consent">Demander le consentement pour les cookies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="marketing-consent"
                    checked={formData.security.marketingConsent}
                    onCheckedChange={(checked) => handleFormChange("security", "marketingConsent", checked)}
                  />
                  <Label htmlFor="marketing-consent">Demander le consentement pour le marketing</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacy-policy">Politique de confidentialité</Label>
                  <Textarea
                    id="privacy-policy"
                    rows={5}
                    placeholder="Rédiger votre politique de confidentialité ici..."
                    value={formData.security.privacyPolicy}
                    onChange={(e) => handleFormChange("security", "privacyPolicy", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Durée de conservation des données (jours)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    placeholder="730"
                    value={formData.security.dataRetention}
                    onChange={(e) => handleFormChange("security", "dataRetention", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité du Compte</CardTitle>
              <CardDescription>Gérez les paramètres de sécurité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="session-timeout"
                    checked={formData.security.sessionTimeout}
                    onCheckedChange={(checked) => handleFormChange("security", "sessionTimeout", checked)}
                  />
                  <Label htmlFor="session-timeout">Expiration automatique des sessions</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-duration">Durée de session (minutes)</Label>
                  <Input
                    id="session-duration"
                    type="number"
                    placeholder="60"
                    value={formData.security.sessionDuration}
                    onChange={(e) => handleFormChange("security", "sessionDuration", e.target.value)}
                    disabled={!formData.security.sessionTimeout}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ip-restriction"
                    checked={formData.security.ipRestriction}
                    onCheckedChange={(checked) => handleFormChange("security", "ipRestriction", checked)}
                  />
                  <Label htmlFor="ip-restriction">Restriction par adresse IP</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowed-ips">Adresses IP autorisées</Label>
                  <Textarea
                    id="allowed-ips"
                    placeholder="192.168.1.1, 10.0.0.1"
                    disabled={!formData.security.ipRestriction}
                  />
                </div>
                <div className="pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Lock className="h-4 w-4 mr-2" />
                        Révoquer toutes les sessions
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Révoquer toutes les sessions</DialogTitle>
                        <DialogDescription>
                          Cette action déconnectera tous les appareils connectés à votre compte. Vous devrez vous
                          reconnecter sur tous vos appareils.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Annuler</Button>
                        <Button variant="destructive">Révoquer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Journal d Activité</CardTitle>
              <CardDescription>Consultez les activités récentes sur votre compte.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Aucune activité enregistrée</p>
                      <p className="text-sm text-gray-500">Les activités récentes apparaîtront ici</p>
                    </div>
                    <p className="text-sm text-gray-500">-</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" disabled>
                    Voir tout l historique
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Annuler</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer les modifications"
          )}
        </Button>
      </div>
    </div>
  )
}

