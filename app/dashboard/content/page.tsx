/* eslint-disable react/no-unescaped-entities */

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

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
  // ... (other content items)
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

type ContentItem = {
  id: number
  type: string
  title: string
  category: string
  thumbnail: string
  likes: number
  shares: number
  comments: number
  featured: boolean
}


function FeaturedContentCard({ item }: { item: ContentItem }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-lg shadow-lg">
      {/* ... (FeaturedContentCard implementation) */}
    </motion.div>
  )
}

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* ... (ContentCard implementation) */}
    </motion.div>
  )
}
