'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

interface DateTimePickerProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
}

export function DateTimePicker({ id, name, value, onChange }: DateTimePickerProps) {
  const [date, setDate] = useState<Date>()

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      onChange(format(selectedDate, "yyyy-MM-dd'T'HH:mm"))
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (date) {
      const [hours, minutes] = e.target.value.split(':')
      const newDate = new Date(date)
      newDate.setHours(parseInt(hours))
      newDate.setMinutes(parseInt(minutes))
      onChange(format(newDate, "yyyy-MM-dd'T'HH:mm"))
    }
  }

  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        id={id}
        name={name}
        value={value ? format(new Date(value), 'HH:mm') : ''}
        onChange={handleTimeChange}
      />
    </div>
  )
}

