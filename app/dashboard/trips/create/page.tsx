'use client'

import { useState } from 'react'
<<<<<<< HEAD
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function CreateTripPage() {
=======
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RichTextEditor } from '@/components/RichTextEditor'
import { MapPicker } from '@/components/MapPicker'
import { MediaUpload } from '@/components/MediaUpload'
import { DateTimePicker } from '@/components/DateTimePicker'

export default function CreateTripPage() {
  const router = useRouter()
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
  const [tripData, setTripData] = useState({
    title: '',
    description: '',
    seoKeywords: '',
<<<<<<< HEAD
    metaDescription: '',
=======
    seoDescription: '',
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
    schedule: '',
    location: '',
    transportation: '',
    additionalDetails: '',
    price: '',
    currency: 'USD',
<<<<<<< HEAD
=======
    accountNumber: '',
    bookingLink: '',
    photos: [],
    videos: [],
    pdf: null
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
<<<<<<< HEAD
    setTripData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Trip data submitted:', tripData)
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
              <Input
                id="title"
                name="title"
                value={tripData.title}
                onChange={handleInputChange}
                required
              />
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
              <Input
                id="seoKeywords"
                name="seoKeywords"
                value={tripData.seoKeywords}
                onChange={handleInputChange}
              />
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
              <Input
                id="location"
                name="location"
                value={tripData.location}
                onChange={handleInputChange}
                required
              />
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

        <Button type="submit" className="w-full">Create Trip</Button>
      </form>
=======
    setTripData(prev => ({ ...prev, [name]: value }))
  }

  const handleRichTextChange = (content: string) => {
    setTripData(prev => ({ ...prev, description: content }))
  }

  const handleLocationChange = (location: string) => {
    setTripData(prev => ({ ...prev, location }))
  }

  const handleMediaUpload = (type: 'photos' | 'videos' | 'pdf', files: File[]) => {
    if (type === 'pdf') {
      setTripData(prev => ({ ...prev, [type]: files[0] }))
    } else {
      setTripData(prev => ({ ...prev, [type]: [...prev[type], ...files] }))
    }
  }

  const handlePublish = () => {
    // Here you would typically send the tripData to your backend API
    console.log('Publishing trip:', tripData)
    // After successful publish, redirect to the trips list
    router.push('/dashboard/trips')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Create New Trip</h1>
      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Trip Details</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={tripData.title} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor value={tripData.description} onChange={handleRichTextChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoKeywords">SEO Keywords</Label>
                <Input id="seoKeywords" name="seoKeywords" value={tripData.seoKeywords} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea id="seoDescription" name="seoDescription" value={tripData.seoDescription} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <DateTimePicker id="schedule" name="schedule" value={tripData.schedule} onChange={(value) => setTripData(prev => ({ ...prev, schedule: value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <MapPicker id="location" value={tripData.location} onChange={handleLocationChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportation">Transportation Description</Label>
                <Textarea id="transportation" name="transportation" value={tripData.transportation} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalDetails">Additional Details</Label>
                <Textarea id="additionalDetails" name="additionalDetails" value={tripData.additionalDetails} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Trip Price</Label>
                <Input type="number" id="price" name="price" value={tripData.price} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={tripData.currency} onValueChange={(value) => setTripData(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number for Transfer</Label>
                <Input id="accountNumber" name="accountNumber" value={tripData.accountNumber} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookingLink">Booking Link</Label>
                <Input id="bookingLink" name="bookingLink" value={tripData.bookingLink} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Photos</Label>
                <MediaUpload type="photos" onUpload={(files) => handleMediaUpload('photos', files)} />
              </div>
              <div className="space-y-2">
                <Label>Videos</Label>
                <MediaUpload type="videos" onUpload={(files) => handleMediaUpload('videos', files)} />
              </div>
              <div className="space-y-2">
                <Label>PDF Brochure</Label>
                <MediaUpload type="pdf" onUpload={(files) => handleMediaUpload('pdf', files)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h2>{tripData.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: tripData.description }} />
                <p><strong>Location:</strong> {tripData.location}</p>
                <p><strong>Schedule:</strong> {tripData.schedule}</p>
                <p><strong>Price:</strong> {tripData.price} {tripData.currency}</p>
                {/* Add more preview content as needed */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push('/dashboard/trips')}>Cancel</Button>
        <Button onClick={handlePublish}>Publish Trip</Button>
      </CardFooter>
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
    </div>
  )
}

