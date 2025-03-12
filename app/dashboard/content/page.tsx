"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, FileText } from "lucide-react"

export default function ContentPage() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("popular")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Content Management</h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Content
        </Button>
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

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-800 rounded-lg">
        <FileText className="h-16 w-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No content to display</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-md">
          Add photos, videos, or other content to promote your travel experiences.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Content
        </Button>
      </div>
    </div>
  )
}

