"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, Eye, ThumbsUp, MessageSquare, Share2, PlusCircle } from "lucide-react"

// Sample data (replace with actual data in a real application)
const trendingNews = [
  { id: 1, title: "Top 10 Hidden Beaches in Southeast Asia", thumbnail: "/placeholder.svg" },
  { id: 2, title: "Sustainable Travel: Eco-Friendly Destinations for 2023", thumbnail: "/placeholder.svg" },
  { id: 3, title: "The Rise of Digital Nomad Visas: What You Need to Know", thumbnail: "/placeholder.svg" },
]

const contentFeed = [
  {
    id: 1,
    title: "Exploring the Amazon Rainforest",
    author: "Jungle Adventures",
    thumbnail: "/placeholder.svg",
    description: "Join us on an unforgettable journey through the world's largest rainforest.",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "2h ago",
  },
  {
    id: 2,
    title: "A Week in Paris: The Ultimate Itinerary",
    author: "European Escapades",
    thumbnail: "/placeholder.svg",
    description: "Discover the City of Light with our carefully curated 7-day itinerary.",
    likes: 189,
    comments: 32,
    shares: 8,
    timestamp: "5h ago",
  },
  {
    id: 3,
    title: "Scuba Diving in the Great Barrier Reef",
    author: "Ocean Explorers",
    thumbnail: "/placeholder.svg",
    description: "Dive into the vibrant underwater world of Australia's iconic Great Barrier Reef.",
    likes: 312,
    comments: 67,
    shares: 23,
    timestamp: "1d ago",
  },
]

export default function DashboardOverview() {
  const [feedItems, setFeedItems] = useState(contentFeed)

  const loadMoreItems = () => {
    // Simulating loading more items
    const newItems = [
      {
        id: feedItems.length + 1,
        title: "New Adventure",
        author: "Travel Enthusiast",
        thumbnail: "/placeholder.svg",
        description: "Exciting new destination to explore!",
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
      },
    ]
    setFeedItems([...feedItems, ...newItems])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileViewsCard />
        <QuickStatsCard />
        <UploadButton />
      </div>

      <TrendingNewsSection news={trendingNews} />

      <ContentFeedSection feedItems={feedItems} loadMoreItems={loadMoreItems} />
    </div>
  )
}

function ProfileViewsCard() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
        <Eye className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">5.6k</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-500 font-medium inline-flex items-center">
            <ArrowUp className="h-3 w-3 mr-1" />
            12%
          </span>{" "}
          vs last month
        </p>
      </CardContent>
    </Card>
  )
}

function QuickStatsCard() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Total Posts</p>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Likes</p>
            <p className="text-2xl font-bold">1.2k</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Comments</p>
            <p className="text-2xl font-bold">340</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function UploadButton() {
  return (
    <motion.div
      className="col-span-1 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button className="w-full h-full text-lg bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-4">
        <PlusCircle className="mr-2 h-6 w-6" /> Upload New Content
      </Button>
    </motion.div>
  )
}

function TrendingNewsSection({ news }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-lg shadow-md">
              <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <Button variant="link" className="text-xs text-blue-300 mt-1 p-0">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ContentFeedSection({ feedItems, loadMoreItems }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedItems.map((item) => (
            <ContentFeedItem key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button onClick={loadMoreItems}>Load More</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ContentFeedItem({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">By {item.author}</p>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" /> {item.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" /> {item.comments}
              </span>
              <span className="flex items-center">
                <Share2 className="h-4 w-4 mr-1" /> {item.shares}
              </span>
            </div>
            <span className="text-sm text-gray-500">{item.timestamp}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <input
          type="text"
          placeholder="Post a comment..."
          className="w-full bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

