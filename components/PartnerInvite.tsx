"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, MapPin, Search, Send, TestTubes, Languages } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const partnerRoleDescriptions = {
  guide: "Can lead tours and interact with customers",
  "local-expert": "Provides local knowledge and recommendations",
  "accommodation-partner": "Manages accommodations for trips",
  "transportation-partner": "Handles transportation logistics",
  "experience-provider": "Offers unique experiences and activities",
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.enum(["guide", "local-expert", "accommodation-partner", "transportation-partner", "experience-provider"]),
  message: z.string().min(10, { message: "Please provide a brief introduction message (min 10 characters)" }),
  languages: z.string().optional(),
  region: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PartnerInviteProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

// This would be fetched from your API in a real app
const samplePartners = [
  {
    id: "1",
    name: "Maria Rodriguez",
    role: "guide",
    region: "Barcelona, Spain",
    languages: ["English", "Spanish", "Catalan"],
    rating: 4.8,
    expertise: ["City Tours", "Food Tours", "Cultural Tours"],
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jean Dupont",
    role: "local-expert",
    region: "Paris, France",
    languages: ["English", "French"],
    rating: 4.9,
    expertise: ["Wine Tasting", "Art History", "Architecture"],
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Takashi Yamamoto",
    role: "experience-provider",
    region: "Kyoto, Japan",
    languages: ["English", "Japanese"],
    rating: 4.7,
    expertise: ["Tea Ceremony", "Traditional Crafts", "Garden Tours"],
    avatar: "/placeholder.svg",
  },
]

export function PartnerInvite({ onSuccess, onError }: PartnerInviteProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      role: undefined,
      message: "",
      languages: "",
      region: "",
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      console.log("Inviting partner:", values)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear the form
      form.reset()
      setSelectedRole(null)
      setSelectedPartner(null)

      onSuccess(`Invitation sent to ${values.fullName} (${values.email})`)
    } catch (error) {
      onError("Failed to send invitation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTest = async () => {
    setIsTesting(true)
    try {
      const values = form.getValues()
      const isValid = await form.trigger()

      if (!isValid) {
        onError("Please fill in all required fields correctly before testing")
        return
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onSuccess(`Test passed. Invitation to ${values.fullName} (${values.email}) is valid and ready to send`)
    } catch (error) {
      onError("Test failed. Please check the form for errors.")
    } finally {
      setIsTesting(false)
    }
  }

  const handleSearch = () => {
    // Simulate search API call
    setSearchResults([])

    setTimeout(() => {
      const results = samplePartners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase())) ||
          partner.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())),
      )

      setSearchResults(results)
      setHasSearched(true)
    }, 500)
  }

  const selectPartner = (partner: any) => {
    setSelectedPartner(partner)
    form.setValue("fullName", partner.name)
    form.setValue("role", partner.role)
    form.setValue("region", partner.region)
    form.setValue("languages", partner.languages.join(", "))
    setSelectedRole(partner.role)
  }

  return (
    <Tabs defaultValue="search">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="search">
          <Search className="mr-2 h-4 w-4" />
          Search & Invite
        </TabsTrigger>
        <TabsTrigger value="direct">
          <Mail className="mr-2 h-4 w-4" />
          Direct Invitation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="search">
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="search-query">Search by name, region, language, or expertise</Label>
              <Input
                id="search-query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Paris, French, food tours"
              />
            </div>
            <Button type="button" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="min-h-[200px]">
            {!hasSearched ? (
              <div className="text-center py-8 text-gray-500">
                Search for partners and guides by name, region, language, or expertise
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No partners found matching your search criteria</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((partner) => (
                  <Card
                    key={partner.id}
                    className={`cursor-pointer hover:border-blue-500 transition-all ${
                      selectedPartner?.id === partner.id ? "border-blue-500 ring-2 ring-blue-200" : ""
                    }`}
                    onClick={() => selectPartner(partner)}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {partner.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{partner.name}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {partner.region}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {partner.expertise.slice(0, 2).map((exp: string) => (
                            <Badge key={exp} variant="secondary" className="text-xs">
                              {exp}
                            </Badge>
                          ))}
                          {partner.expertise.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{partner.expertise.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1 capitalize">{partner.role.replace("-", " ")}</Badge>
                        <div className="text-sm">⭐ {partner.rating}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {selectedPartner && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 border-t pt-4 mt-4">
                <h3 className="text-lg font-medium">Invite {selectedPartner.name}</h3>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="partner@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invitation Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a personal message introducing your agency and explaining the collaboration opportunity"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleTest} disabled={isTesting || isSubmitting}>
                    {isTesting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <TestTubes className="mr-2 h-4 w-4" />
                        Test Invitation
                      </>
                    )}
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </TabsContent>

      <TabsContent value="direct">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="partner@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedRole(value)
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="guide">Tour Guide</SelectItem>
                        <SelectItem value="local-expert">Local Expert</SelectItem>
                        <SelectItem value="accommodation-partner">Accommodation Partner</SelectItem>
                        <SelectItem value="transportation-partner">Transportation Partner</SelectItem>
                        <SelectItem value="experience-provider">Experience Provider</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {selectedRole && partnerRoleDescriptions[selectedRole as keyof typeof partnerRoleDescriptions]}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages Spoken</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <Input placeholder="English, French, Spanish" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region/Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <Input placeholder="Paris, France" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitation Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a personal message introducing your agency and explaining the collaboration opportunity"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-6" />

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleTest} disabled={isTesting || isSubmitting}>
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTubes className="mr-2 h-4 w-4" />
                    Test Invitation
                  </>
                )}
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}

