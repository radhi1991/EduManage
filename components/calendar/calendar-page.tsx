"use client"

import { useState, useCallback } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

// Mock events data
const initialEvents = [
  {
    id: 1,
    title: "Math Exam",
    start: new Date(2023, 5, 15, 10, 0), // June 15, 2023, 10:00 AM
    end: new Date(2023, 5, 15, 12, 0), // June 15, 2023, 12:00 PM
  },
  {
    id: 2,
    title: "Science Project Due",
    start: new Date(2023, 5, 20), // June 20, 2023 (all-day event)
    end: new Date(2023, 5, 20),
  },
  // Add more mock events as needed
]

export function CalendarPage() {
  const [events, setEvents] = useState(initialEvents)
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
  })
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)

  const handleSelectSlot = useCallback(({ start, end }) => {
    setNewEvent({
      title: "",
      start: moment(start).format("YYYY-MM-DDTHH:mm"),
      end: moment(end).format("YYYY-MM-DDTHH:mm"),
      allDay: false,
    })
    setIsAddEventDialogOpen(true)
  }, [])

  const handleSelectEvent = useCallback((event) => window.alert(event.title), [])

  const handleAddEvent = () => {
    const eventToAdd = {
      id: events.length + 1,
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      allDay: newEvent.allDay,
    }
    setEvents([...events, eventToAdd])
    setIsAddEventDialogOpen(false)
    setNewEvent({ title: "", start: "", end: "", allDay: false })
  }

  return (
    <DashboardLayout title="Calendar">
      <div className="h-[calc(100vh-200px)]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg p-4"
        />
      </div>

      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Enter the details for the new event.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                className="glass-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allDay">All Day Event</Label>
              <Select
                value={newEvent.allDay ? "true" : "false"}
                onValueChange={(value) => setNewEvent({ ...newEvent, allDay: value === "true" })}
              >
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

