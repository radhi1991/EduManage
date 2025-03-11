"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCopy, FileText, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function StudentDashboard() {
  // Mock data for student dashboard
  const stats = [
    { title: "Enrolled Subjects", value: 6, icon: BookCopy, change: "2 classes today" },
    { title: "Pending Homeworks", value: 4, icon: FileText, change: "1 due today" },
    { title: "Completed Assignments", value: 28, icon: Award, change: "92% success rate" },
    { title: "Next Class", value: "1:00 PM", icon: Clock, change: "Mathematics" },
  ]

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stat.title}</CardTitle>
              <CardDescription>{stat.change}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{stat.value}</p>
                <div className="rounded-full p-2 bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", teacher: "Mr. John Smith", time: "10:00 AM - 11:30 AM", room: "Room 101" },
                { subject: "Science", teacher: "Ms. Sarah Johnson", time: "1:00 PM - 2:30 PM", room: "Lab 2" },
                { subject: "English", teacher: "Mr. Michael Brown", time: "3:00 PM - 4:30 PM", room: "Room 105" },
              ].map((cls, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {cls.teacher} • {cls.room}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{cls.time}</p>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      View details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Upcoming Homeworks</CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Quadratic Equations", subject: "Mathematics", dueDate: "Today", progress: 75 },
                { title: "Lab Report: Chemical Reactions", subject: "Science", dueDate: "Tomorrow", progress: 30 },
                { title: "Essay: Modern Literature", subject: "English", dueDate: "In 3 days", progress: 10 },
                { title: "Historical Analysis", subject: "History", dueDate: "In 5 days", progress: 0 },
              ].map((homework, i) => (
                <div key={i} className="pb-3 border-b last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{homework.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {homework.dueDate}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{homework.subject}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={homework.progress} className="h-2" />
                    <span className="text-xs font-medium">{homework.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

