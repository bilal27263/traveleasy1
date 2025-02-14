"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Minus } from "lucide-react"

interface BookingFormProps {
  basePrice: number
}

export function BookingForm({ basePrice }: BookingFormProps) {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [date, setDate] = useState<Date>()
  const [addons, setAddons] = useState({
    transportation: false,
    meals: false,
    guidedTour: false,
  })

  const calculateTotal = () => {
    let total = basePrice * (adults + children * 0.5)
    if (addons.transportation) total += 20
    if (addons.meals) total += 30
    if (addons.guidedTour) total += 50
    return total
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Number of Guests</Label>
        <div className="flex items-center space-x-4">
          <div>
            <Label>Adults</Label>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2">{adults}</span>
              <Button variant="outline" size="icon" onClick={() => setAdults(adults + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label>Children</Label>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => setChildren(Math.max(0, children - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2">{children}</span>
              <Button variant="outline" size="icon" onClick={() => setChildren(children + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Add-ons</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="transportation"
              checked={addons.transportation}
              onCheckedChange={(checked) => setAddons({ ...addons, transportation: checked as boolean })}
            />
            <label htmlFor="transportation">Transportation ($20)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="meals"
              checked={addons.meals}
              onCheckedChange={(checked) => setAddons({ ...addons, meals: checked as boolean })}
            />
            <label htmlFor="meals">Meals ($30)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="guidedTour"
              checked={addons.guidedTour}
              onCheckedChange={(checked) => setAddons({ ...addons, guidedTour: checked as boolean })}
            />
            <label htmlFor="guidedTour">Guided Tour ($50)</label>
          </div>
        </div>
      </div>
      <div>
        <Label>Total Price</Label>
        <p className="text-2xl font-bold">${calculateTotal()}</p>
      </div>
      <Button className="w-full">Book Now</Button>
    </div>
  )
}

