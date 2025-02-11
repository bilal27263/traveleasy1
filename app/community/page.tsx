'use client'



import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Button from '../../components/ui/Button'
import Textarea from '../../components/ui/Textarea'
import { Card, CardContent } from '../../components/ui/Card'
import { X, Camera } from 'lucide-react'

// Ensure `cityData` is correctly referenced
const cityData: Record<string, { image: string; description: string }> = {
  rabat: {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-droosmo-2958597.jpg-0wN2yd8XORBRR7FQDhwUtaawY8uYFC.jpeg',
    description: 'Discover the capital city of Morocco'
  },
  casablanca: {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-gabriel-garcia-1263144-2404046.jpg-k9gqc7INAfIUKlZLPS635Y9PMz8OYV.jpeg',
    description: 'Explore Morocco\'s largest city'
  }
}

export default function CityDiscussionPage() {
  const params = useParams()
  const city = params?.city as keyof typeof cityData
  const cityInfo = cityData[city] || { image: '/placeholder.jpg', description: 'Explore this city' }

  const [newComment, setNewComment] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedImages([...selectedImages, ...newFiles])
      setPreviewUrls([...previewUrls, ...newFiles.map(file => URL.createObjectURL(file))])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(images => images.filter((_, i) => i !== index))
    setPreviewUrls(urls => urls.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image src={cityInfo.image} alt={`${city} cityscape`} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">{city.toUpperCase()} Community</h1>
          <p className="text-xl">{cityInfo.description}</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <form className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience or ask a question..."
              className="mb-2"
            />

            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <Image src={url} alt={`Preview ${index + 1}`} width={100} height={100} className="rounded-lg object-cover" />
                    <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 bg-white rounded-full" onClick={() => removeImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon">
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Camera className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Add photos to your post</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}