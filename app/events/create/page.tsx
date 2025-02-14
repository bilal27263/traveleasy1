"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Plus, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    date: undefined as Date | undefined,
    time: "",
    duration: "",
    description: "",
    location: "",
    price: "",
    capacity: "",
    tags: [] as string[],
    organizer: "",
    contactEmail: "",
    contactPhone: "",
  })

  const [premiumFeatures, setPremiumFeatures] = useState({
    featured: false,
    promotionBanner: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePremiumFeatureToggle = (feature: "featured" | "promotionBanner") => {
    setPremiumFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event data:", eventData)
    console.log("Premium features:", premiumFeatures)
    // Here you would typically send the data to your backend
  }

  const steps = [
    { number: 1, name: "Basic Info" },
    { number: 2, name: "Details" },
    { number: 3, name: "Location" },
    { number: 4, name: "Promotion" },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Create Your Event</h1>

      {/* Progress indicator */}
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li key={step.number} className={cn("flex items-center", index < steps.length - 1 ? "w-full" : "flex-1")}>
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                  currentStep >= step.number ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600",
                )}
              >
                {step.number}
              </div>
              <div
                className={cn(
                  "hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700",
                  index < steps.length - 1 ? "flex" : "hidden",
                )}
              ></div>
              <span className="hidden sm:inline-block ml-2 text-sm font-medium">{step.name}</span>
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs
          value={`step${currentStep}`}
          onValueChange={(value) => setCurrentStep(Number.parseInt(value.replace("step", "")))}
        >
          <TabsContent value="step1">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Event Name</Label>
                  <Input id="name" name="name" value={eventData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select name="type" onValueChange={(value) => setEventData((prev) => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventData.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventData.date ? format(eventData.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventData.date}
                        onSelect={(date) => setEventData((prev) => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={eventData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 2 hours"
                    value={eventData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step2">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={eventData.price}
                    onChange={handleInputChange}
                    placeholder="Leave blank if free"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Maximum Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={eventData.capacity}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {eventData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-0 text-base"
                          onClick={() =>
                            setEventData((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))
                          }
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                    <Input
                      placeholder="Add a tag"
                      className="w-32"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const target = e.target as HTMLInputElement
                          if (target.value) {
                            setEventData((prev) => ({ ...prev, tags: [...prev.tags, target.value] }))
                            target.value = ""
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="organizer">Organizer Name</Label>
                  <Input id="organizer" name="organizer" value={eventData.organizer} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={eventData.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={eventData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step3">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Venue Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="location"
                      name="location"
                      value={eventData.location}
                      onChange={handleInputChange}
                      required
                    />
                    <Button type="button" size="icon" variant="outline">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map integration for location pinning will be added here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step4">
            <Card>
              <CardHeader>
                <CardTitle>Promotion and Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Event Images</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    {/* Add more placeholder image slots as needed */}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Feature at the top of search results</Label>
                    <p className="text-sm text-gray-500">
                      Your event will appear at the top of search results for your city.
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={premiumFeatures.featured}
                    onCheckedChange={() => handlePremiumFeatureToggle("featured")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotionBanner">Add a promotion banner on the homepage</Label>
                    <p className="text-sm text-gray-500">Your event will be featured in a banner on the homepage.</p>
                  </div>
                  <Switch
                    id="promotionBanner"
                    checked={premiumFeatures.promotionBanner}
                    onCheckedChange={() => handlePremiumFeatureToggle("promotionBanner")}
                  />
                </div>
                <div className="mt-4">
                  <p className="font-semibold">Total Premium Features Cost: $X</p>
                  <p className="text-sm text-gray-500">Price updates dynamically based on selected features</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 4 ? (
            <Button type="button" onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}>
              Next
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">Preview and Publish</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Publish Event</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to publish this event? You can still edit it after publishing.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h3 className="font-semibold">{eventData.name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(eventData.date || new Date(), "PPP")} at {eventData.time}
                  </p>
                  <p className="text-sm text-gray-500">{eventData.location}</p>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>
                    Publish Event
                  </Button>
                  <Button type="button" onClick={() => {}}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </form>

      {/* Event Preview Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Event Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{eventData.name || "Event Name"}</h2>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span>
                {eventData.date ? format(eventData.date, "PPP") : "Date"} at {eventData.time || "Time"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{eventData.location || "Location"}</span>
            </div>
            <p className="text-gray-600">{eventData.description || "Event description will appear here."}</p>
            <div className="flex flex-wrap gap-2">
              {eventData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {eventData.price && <p className="font-semibold">Price: ${eventData.price}</p>}
            {eventData.capacity && <p>Capacity: {eventData.capacity} attendees</p>}
          </div>
        </CardContent>
      </Card>

      {/* Warnings and Recommendations */}
      <Card className="mt-8 border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Add at least one event image to increase visibility</li>
            <li>Consider using premium features to promote your event</li>
            <li>Double-check all information before publishing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

