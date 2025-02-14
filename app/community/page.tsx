"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  MapPin,
  TrendingUp,
  MessageSquare,
  Share2,
  Hash,
  Users,
  Award,
  Calendar,
  Compass,
  BookOpen,
  Plus,
  Heart,
  Send,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/useAuth"

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

// New component for content feed item
const ContentFeedItem = ({ post }) => {
  const { user } = useAuth()
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [newComment, setNewComment] = useState("")

  const handleLike = async () => {
    if (!user) return
    const { data, error } = await supabase.from("post_likes").upsert({ user_id: user.id, post_id: post.id })
    if (!error) {
      setLikes(likes + 1)
    }
  }

  const handleComment = async () => {
    if (!user || !newComment.trim()) return
    const { data, error } = await supabase
      .from("post_comments")
      .insert({ user_id: user.id, post_id: post.id, content: newComment })
    if (!error) {
      setComments([...comments, { user: user.name, content: newComment }])
      setNewComment("")
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{post.author.name}</span>
          <span className="text-sm text-gray-500">{post.timestamp}</span>
        </div>
        {post.image && (
          <Image
            src={post.image || "/placeholder.svg"}
            alt="Post content"
            width={500}
            height={300}
            className="rounded-lg mb-2"
          />
        )}
        <p className="mb-2">{post.content}</p>
        <div className="flex items-center gap-4 mb-2">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <Heart className="h-4 w-4 mr-1" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            {comments.length}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-2">
                <span className="font-semibold">{comment.user}</span>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Input placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <Button onClick={handleComment}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// New component for travel buddies
const TravelBuddies = () => {
  const { user } = useAuth()
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [buddies, setBuddies] = useState([])
  const { toast } = useToast()

  const handleFindBuddies = async () => {
    if (!user) {
      toast({ title: "Please log in to find travel buddies", variant: "destructive" })
      return
    }
    const { data, error } = await supabase
      .from("travel_plans")
      .insert({ user_id: user.id, destination, dates })
      .select()
    if (!error) {
      const { data: buddiesData, error: buddiesError } = await supabase
        .from("travel_plans")
        .select("user_id, users(name, avatar)")
        .eq("destination", destination)
        .neq("user_id", user.id)
      if (!buddiesError) {
        setBuddies(buddiesData)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Travel Buddies</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Where are you traveling?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mb-2"
        />
        <Input type="date" value={dates} onChange={(e) => setDates(e.target.value)} className="mb-2" />
        <Button onClick={handleFindBuddies} className="w-full mb-4">
          Find Buddies
        </Button>
        {buddies.map((buddy, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={buddy.users.avatar} />
                <AvatarFallback>{buddy.users.name[0]}</AvatarFallback>
              </Avatar>
              <span>{buddy.users.name}</span>
            </div>
            <Button variant="outline" size="sm">
              Message
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// New component for travel stories
const TravelStories = () => {
  const { user } = useAuth()
  const [stories, setStories] = useState([])
  const [newStory, setNewStory] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from("travel_stories")
      .select("*, users(name, avatar)")
      .order("created_at", { ascending: false })
      .limit(5)
    if (!error) {
      setStories(data)
    }
  }

  const handlePostStory = async () => {
    if (!user) {
      toast({ title: "Please log in to post a story", variant: "destructive" })
      return
    }
    const { data, error } = await supabase.from("travel_stories").insert({ user_id: user.id, content: newStory })
    if (!error) {
      setNewStory("")
      fetchStories()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Stories</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Share your travel story..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handlePostStory} className="w-full mb-4">
          Post Story
        </Button>
        {stories.map((story, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar>
                  <AvatarImage src={story.users.avatar} />
                  <AvatarFallback>{story.users.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{story.users.name}</span>
              </div>
              <p>{story.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [contentFeed, setContentFeed] = useState([])
  const feedRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchContentFeed()
  }, [])

  const fetchContentFeed = async () => {
    const { data, error } = await supabase
      .from("content_feed")
      .select("*, users(name, avatar)")
      .order("created_at", { ascending: false })
      .limit(10)
    if (!error) {
      setContentFeed(data)
    }
  }

  const handleScroll = () => {
    if (feedRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = feedRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        // Fetch more content when scrolled to bottom
        fetchContentFeed()
      }
    }
  }

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
            {user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                  </DialogHeader>
                  {/* Add post creation form here */}
                </DialogContent>
              </Dialog>
            ) : (
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                <Link href="/login">Log In to Post</Link>
              </Button>
            )}
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

            {/* Content Feed */}
            <div ref={feedRef} onScroll={handleScroll} className="space-y-4 max-h-[800px] overflow-y-auto">
              {contentFeed.map((post) => (
                <ContentFeedItem key={post.id} post={post} />
              ))}
            </div>

            {/* Travel Stories */}
            <div className="mt-8">
              <TravelStories />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Travel Buddies */}
            <TravelBuddies />

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

