"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Plus, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// City-specific data
const cityData = {
  rabat: {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-droosmo-2958597.jpg-0wN2yd8XORBRR7FQDhwUtaawY8uYFC.jpeg",
    description: "Discover the capital city of Morocco",
    popularTopics: ["Historical Sites", "Government", "Museums", "Beach Life"],
    localExperts: [
      { id: 1, name: "Hassan", expertise: "History Expert", avatar: "/avatars/hassan.jpg" },
      { id: 2, name: "Amina", expertise: "Local Guide", avatar: "/avatars/amina.jpg" },
    ],
  },
  casablanca: {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-gabriel-garcia-1263144-2404046.jpg-k9gqc7INAfIUKlZLPS635Y9PMz8OYV.jpeg",
    description: "Explore Morocco's largest city",
    popularTopics: ["Business", "Modern Life", "Architecture", "Nightlife"],
    localExperts: [
      { id: 3, name: "Karim", expertise: "Business District Expert", avatar: "/avatars/karim.jpg" },
      { id: 4, name: "Sofia", expertise: "Food Critic", avatar: "/avatars/sofia.jpg" },
    ],
  },
  marrakech: {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-chanwalrus-958545.jpg-b1rsTTRvfIQJyVdUZNYFLMLjmAJqFR.jpeg",
    description: "The heart of Moroccan tourism",
    popularTopics: ["Medina", "Shopping", "Riads", "Food Tours"],
    localExperts: [
      { id: 5, name: "Youssef", expertise: "Souk Expert", avatar: "/avatars/youssef.jpg" },
      { id: 6, name: "Leila", expertise: "Cultural Guide", avatar: "/avatars/leila.jpg" },
    ],
  },
  fes: {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-furknsaglam-1596977-21529064.jpg-1z1HlfLuGJ6naj7bTR4xvgLriyXIUy.jpeg",
    description: "The cultural capital of Morocco",
    popularTopics: ["Crafts", "Tanneries", "Religious Sites", "Traditional Life"],
    localExperts: [
      { id: 7, name: "Omar", expertise: "Medina Expert", avatar: "/avatars/omar.jpg" },
      { id: 8, name: "Fatima", expertise: "Artisan Guide", avatar: "/avatars/fatima.jpg" },
    ],
  },
}

// Related discussions for each city
const relatedDiscussions = {
  rabat: [
    { id: 1, title: "Best seafood restaurants near the beach?", replies: 23, views: 156 },
    { id: 2, title: "Hassan Tower visiting hours", replies: 15, views: 203 },
    { id: 3, title: "Transportation from airport to city center", replies: 34, views: 412 },
  ],
  casablanca: [
    { id: 1, title: "Hassan II Mosque guided tours", replies: 45, views: 567 },
    { id: 2, title: "Best shopping malls in Casa", replies: 28, views: 342 },
    { id: 3, title: "Nightlife recommendations", replies: 56, views: 789 },
  ],
  marrakech: [
    { id: 1, title: "Navigating the Medina for first-timers", replies: 67, views: 890 },
    { id: 2, title: "Best time to visit Jardin Majorelle", replies: 34, views: 445 },
    { id: 3, title: "Recommended food tour guides", replies: 41, views: 523 },
  ],
  fes: [
    { id: 1, title: "Tanneries smell - when to visit?", replies: 38, views: 456 },
    { id: 2, title: "Ceramic workshops in Fes", replies: 25, views: 312 },
    { id: 3, title: "Best traditional riads", replies: 47, views: 634 },
  ],
}

// Updated mock data with images
const cityImages = {
  rabat:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-droosmo-2958597.jpg-0wN2yd8XORBRR7FQDhwUtaawY8uYFC.jpeg",
  casablanca:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-gabriel-garcia-1263144-2404046.jpg-k9gqc7INAfIUKlZLPS635Y9PMz8OYV.jpeg",
  marrakech:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-chanwalrus-958545.jpg-b1rsTTRvfIQJyVdUZNYFLMLjmAJqFR.jpeg",
  fes: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-furknsaglam-1596977-21529064.jpg-1z1HlfLuGJ6naj7bTR4xvgLriyXIUy.jpeg",
}

interface Comment {
  id: string
  author: string
  authorType: "local" | "tourist" | "agency"
  avatar: string
  content: string
  likes: number
  replies: number
  createdAt: string
  images?: string[]
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Mohammed",
    authorType: "local",
    avatar: "/avatars/mohammed.jpg",
    content:
      "Make sure to visit the Hassan Tower and the Mausoleum of Mohammed V. They're stunning examples of Moroccan architecture!",
    likes: 15,
    replies: 3,
    createdAt: "2023-06-15T10:30:00Z",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-gabriel-garcia-1263144-2404046.jpg-k9gqc7INAfIUKlZLPS635Y9PMz8OYV.jpeg",
    ],
  },
  {
    id: "2",
    author: "Sarah",
    authorType: "tourist",
    avatar: "/avatars/sarah.jpg",
    content: "I discovered this amazing restaurant in the medina! The traditional Moroccan dishes were incredible.",
    likes: 8,
    replies: 5,
    createdAt: "2023-06-14T14:45:00Z",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-chanwalrus-958545.jpg-b1rsTTRvfIQJyVdUZNYFLMLjmAJqFR.jpeg",
    ],
  },
  {
    id: "3",
    author: "Youssef",
    authorType: "local",
    avatar: "/avatars/youssef.jpg",
    content:
      "For those interested in local culture, don't miss the traditional markets and the beautiful Majorelle Garden!",
    likes: 12,
    replies: 7,
    createdAt: "2023-06-13T09:15:00Z",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ekrulila-13794450.jpg-lrTqxkYGpd2A0pSNt7RMQUi8TAjiCF.jpeg",
    ],
  },
]

export default function CityDiscussionPage() {
  const params = useParams<{ slug?: string }>()
  const slug = params?.slug ?? "default-slug" // Replace with a fallback value

  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const cityInfo = cityData[slug as keyof typeof cityData]
  const cityDiscussions = relatedDiscussions[slug as keyof typeof relatedDiscussions]

  // fix errors
  console.log("Comunity: selectedImages: ", selectedImages)
  console.log("Comunity: cityImages: ", cityImages)

  useEffect(() => {
    const userIsAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    setIsAuthenticated(userIsAuthenticated)
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedImages((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setShowAuthPopup(true)
      return
    }
    if (newComment.trim() === "") return

    const newCommentObj: Comment = {
      id: String(comments.length + 1),
      author: "Current User",
      authorType: "tourist",
      avatar: "/avatars/default.jpg",
      content: newComment,
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
      images: previewUrls,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
    setSelectedImages([])
    setPreviewUrls([])
  }

  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={cityInfo?.image || "/placeholder-city.jpg"}
          alt={`${slug} cityscape`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {slug.charAt(0).toUpperCase() + slug.slice(1)} Community
          </h1>
          <p className="text-xl">{cityInfo?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Comment Form Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience or ask a question..."
                  className="mb-2"
                />

                {/* Image preview section */}
                {previewUrls.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 bg-white rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="icon" className="relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Add photos to your post</span>
                  </div>
                  <Button type="submit">Post Comment</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-6 mb-8">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold mr-2">{comment.author}</span>
                        <Badge className="bg-orange-500">{comment.authorType}</Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{comment.content}</p>

                      {/* Comment images */}
                      {comment.images && comment.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {comment.images.map((image, index) => (
                            <div key={index} className="relative aspect-video">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4 mr-1" /> {new Date(comment.createdAt).toLocaleDateString()}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Likes: {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Replies: {comment.replies}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cityInfo?.popularTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Discussions */}
          <Card>
            <CardHeader>
              <CardTitle>Related Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityDiscussions?.map((discussion) => (
                  <div key={discussion.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium hover:text-orange-500 cursor-pointer">{discussion.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {discussion.replies} replies
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {discussion.views} views
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local Experts */}
          <Card>
            <CardHeader>
              <CardTitle>Local Experts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityInfo?.localExperts.map((expert) => (
                  <div key={expert.id} className="flex items-center space-x-4">
                    <Image
                      src={expert.avatar || "/placeholder.svg"}
                      alt={expert.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.expertise}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">1.2K</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">450</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">89</div>
                  <div className="text-sm text-muted-foreground">Local Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">24</div>
                  <div className="text-sm text-muted-foreground">Active Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showAuthPopup} onOpenChange={setShowAuthPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to be signed in to post comments. Would you like to sign in or create an account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthPopup(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                /* Implement sign in logic */
              }}
            >
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

