"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  Hash,
  Users,
  Award,
  Calendar,
  Compass,
  BookOpen,
  ChevronRight,
  Plus,
} from "lucide-react"

// Mock data for cities (kept from previous version)
const cities = [
  { name: "Rabat", slug: "rabat", threadCount: 15 },
  { name: "Casablanca", slug: "casablanca", threadCount: 23 },
  { name: "Marrakech", slug: "marrakech", threadCount: 30 },
  { name: "Fes", slug: "fes", threadCount: 18 },
  { name: "Chefchaouen", slug: "chefchaouen", threadCount: 12 },
  { name: "Essaouira", slug: "essaouira", threadCount: 10 },
]

// New mock data for discussions
const discussions = [
  {
    id: 1,
    title: "Top 10 Tips for Safe Travel in Morocco",
    content: "Here are my essential tips after spending 3 months traveling across Morocco...",
    author: "TravelExpert",
    avatar: "/placeholder.svg?height=32&width=32",
    upvotes: 156,
    comments: 45,
    tags: ["Safety", "Tips", "Morocco"],
    timestamp: "2h ago",
    isPinned: true,
  },
  {
    id: 2,
    title: "Hidden Gems in Marrakech Medina",
    content: "Yesterday I discovered some amazing spots in the medina that tourists usually miss...",
    author: "LocalGuide",
    avatar: "/placeholder.svg?height=32&width=32",
    upvotes: 89,
    comments: 23,
    tags: ["Marrakech", "Hidden Gems", "Local Tips"],
    timestamp: "5h ago",
    isPinned: false,
  },
  // Add more discussions...
]

// Mock data for top contributors
const topContributors = [
  { name: "Sarah", avatar: "/placeholder.svg?height=40&width=40", contributions: 156, badge: "Expert" },
  { name: "Mohammed", avatar: "/placeholder.svg?height=40&width=40", contributions: 142, badge: "Guide" },
  { name: "Emma", avatar: "/placeholder.svg?height=40&width=40", contributions: 98, badge: "Explorer" },
]

// Mock data for trending hashtags
const trendingHashtags = ["#MoroccoTips", "#SoloTravel", "#HiddenGems", "#LocalFood", "#Photography"]

// Mock data for recommended articles
const recommendedArticles = [
  {
    title: "How to Avoid Scams in Morocco",
    reads: "2.5k",
    image: "/placeholder.svg?height=60&width=60",
    slug: "avoid-scams-morocco",
  },
  {
    title: "Best Time to Visit the Atlas Mountains",
    reads: "1.8k",
    image: "/placeholder.svg?height=60&width=60",
    slug: "best-time-visit-atlas-mountains",
  },
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">TravelEasy Community</h1>
              <p className="text-xl opacity-90">Join the conversation with fellow travelers</p>
            </div>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Plus className="mr-2 h-5 w-5" />
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Cities
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Compass className="mr-2 h-4 w-4" />
                    Travel Tips
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Events
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Guides
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Popular Cities</h3>
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/community/${city.slug}`}
                      className="flex items-center justify-between p-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <span>{city.name}</span>
                      <Badge variant="secondary">{city.threadCount}</Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search discussions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Pinned Discussions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">📌 Pinned Discussions</h2>
              {discussions
                .filter((d) => d.isPinned)
                .map((discussion) => (
                  <Card key={discussion.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center space-y-1">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">{discussion.upvotes}</span>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={discussion.avatar} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              Posted by {discussion.author} • {discussion.timestamp}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                          <p className="text-gray-600 mb-3">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-gray-500">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.comments} Comments
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Recent Discussions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Discussions</h2>
              {discussions
                .filter((d) => !d.isPinned)
                .map((discussion) => (
                  <Card key={discussion.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center space-y-1">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">{discussion.upvotes}</span>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={discussion.avatar} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              Posted by {discussion.author} • {discussion.timestamp}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                          <p className="text-gray-600 mb-3">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-gray-500">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.comments} Comments
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topContributors.map((contributor, index) => (
                  <Link
                    href={`/profile/${contributor.name.toLowerCase()}`}
                    key={index}
                    className="flex items-center justify-between mb-4 last:mb-0 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contributor.name}</p>
                        <Badge variant="secondary">{contributor.badge}</Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{contributor.contributions} posts</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Trending Hashtags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      <Hash className="w-3 h-3 mr-1" />
                      {tag.slice(1)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Articles</CardTitle>
              </CardHeader>
              <CardContent>
                {recommendedArticles.map((article, index) => (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={index}
                    className="flex items-start gap-3 mb-4 last:mb-0 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium leading-tight mb-1">{article.title}</h4>
                      <p className="text-sm text-gray-500">{article.reads} reads</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Join Community CTA */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
                <p className="text-gray-600 mb-4">Connect with fellow travelers and share your experiences.</p>
                <Button className="w-full">Sign Up Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

