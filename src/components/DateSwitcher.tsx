"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({setDate,date}:{setDate:(date:Date|undefined)=> void,date:Date}) {
      const [popOverOpen,setpopOverOpen] = React.useState(false);
  return (
    <Popover open={popOverOpen} onOpenChange={setpopOverOpen}>
      <PopoverTrigger asChild >
        <Button
          variant={"outline"}
          className={cn(
            "p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground flex justify-start items-center",
            !date && "text-muted-foreground "
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
          onSelect={(selectedDate)=>{
            setDate(selectedDate)
            setpopOverOpen(false)
          }}
          initialFocus
          className="z-50 dark:bg-black"
        />
      </PopoverContent>
    </Popover>
  )
}
