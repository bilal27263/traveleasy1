"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Image, Video, Heart, Share2, MessageCircle } from "lucide-react"

// Sample data (replace with actual data in a real application)
const contentItems = [
  {
    id: 1,
    type: "photo",
    title: "Sunset at Bali Beach",
    category: "Destinations",
    thumbnail: "/placeholder.svg",
    likes: 120,
    shares: 45,
    comments: 23,
    featured: true,
  },
  {
    id: 2,
    type: "video",
    title: "Amazon Rainforest Tour Highlights",
    category: "Trip Showcase",
    thumbnail: "/placeholder.svg",
    likes: 89,
    shares: 34,
    comments: 12,
    featured: true,
  },
  {
    id: 3,
    type: "photo",
    title: "Eiffel Tower at Night",
    category: "Landmarks",
    thumbnail: "/placeholder.svg",
    likes: 230,
    shares: 78,
    comments: 56,
  },
  {
    id: 4,
    type: "photo",
    title: "Great Barrier Reef Diving",
    category: "Adventures",
    thumbnail: "/placeholder.svg",
    likes: 156,
    shares: 67,
    comments: 34,
  },
  {
    id: 5,
    type: "video",
    title: "Tokyo Street Food Tour",
    category: "Culinary",
    thumbnail: "/placeholder.svg",
    likes: 198,
    shares: 89,
    comments: 45,
  },
  {
    id: 6,
    type: "photo",
    title: "Northern Lights in Iceland",
    category: "Natural Wonders",
    thumbnail: "/placeholder.svg",
    likes: 310,
    shares: 134,
    comments: 87,
  },
  // Add more items as needed
]

export default function ContentPage() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("popular")

  const filteredContent = contentItems
    .filter((item) => filter === "all" || item.type === filter)
    .sort((a, b) => {
      if (sort === "popular") return b.likes - a.likes
      if (sort === "recent") return b.id - a.id
      return 0
    })

  const featuredContent = filteredContent.filter((item) => item.featured)
  const regularContent = filteredContent.filter((item) => !item.featured)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Content Management</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Content
          </Button>
        </motion.div>
      </div>

      <div className="flex space-x-4 mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="photo">Photos</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search content..." className="max-w-sm" />
      </div>

      {featuredContent.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredContent.map((item) => (
              <FeaturedContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {regularContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function FeaturedContentCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-80 w-full">
        <img
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-sm opacity-80">{item.category}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
        {item.type === "photo" ? (
          <Image className="h-5 w-5 text-blue-500" />
        ) : (
          <Video className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <span className="flex items-center text-white">
          <Heart className="h-4 w-4 mr-1" />
          {item.likes}
        </span>
        <span className="flex items-center text-white">
          <Share2 className="h-4 w-4 mr-1" />
          {item.shares}
        </span>
        <span className="flex items-center text-white">
          <MessageCircle className="h-4 w-4 mr-1" />
          {item.comments}
        </span>
      </div>
    </motion.div>
  )
}

function ContentCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48">
        <img
          src={item.thumbnail || "/placeholder.svg"}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
          {item.type === "photo" ? (
            <Image className="h-4 w-4 text-blue-500" />
          ) : (
            <Video className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            {item.likes}
          </span>
          <span className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            {item.shares}
          </span>
          <span className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {item.comments}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

