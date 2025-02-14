"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search } from "lucide-react"

// Mock data for autocomplete suggestions
const suggestions = [
  { id: 1, text: "Marrakesh", category: "Destination" },
  { id: 2, text: "Desert tours", category: "Trip" },
  { id: 3, text: "Photography guides in Rabat", category: "Guide" },
  { id: 4, text: "Festivals in Morocco", category: "Event" },
  { id: 5, text: "Best restaurants in Casablanca", category: "Community" },
]

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsOpen(searchTerm.length > 0)
  }, [searchTerm])

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="relative">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Input
              type="text"
              placeholder="Search trips, guides, destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Type to search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        setSearchTerm(item.text)
                        setIsOpen(false)
                      }}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>{item.text}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{item.category}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}

