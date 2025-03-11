"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCopy, FileText, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeacherDashboard() {
  // Mock data for teacher dashboard
  const stats = [
    { title: "My Subjects", value: 4, icon: BookCopy, change: "2 active classes today" },
    { title: "My Students", value: 120, icon: GraduationCap, change: "5 new this month" },
    { title: "Assigned Homeworks", value: 8, icon: FileText, change: "3 pending review" },
    { title: "Upcoming Classes", value: 3, icon: Clock, change: "Next in 2 hours" },
  ]

  return (
    <DashboardLayout title="Teacher Dashboard">
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
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", grade: "10th Grade", time: "10:00 AM - 11:30 AM", room: "Room 101" },
                { subject: "Advanced Algebra", grade: "12th Grade", time: "1:00 PM - 2:30 PM", room: "Room 203" },
                { subject: "Statistics", grade: "11th Grade", time: "3:00 PM - 4:30 PM", room: "Room 105" },
              ].map((cls, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {cls.grade} • {cls.room}
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
            <CardTitle>Pending Homework Reviews</CardTitle>
            <CardDescription>Submissions awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Quadratic Equations", subject: "Mathematics", submissions: 18, dueDate: "Yesterday" },
                { title: "Statistical Analysis", subject: "Statistics", submissions: 15, dueDate: "2 days ago" },
                { title: "Linear Algebra", subject: "Advanced Algebra", submissions: 12, dueDate: "3 days ago" },
              ].map((homework, i) => (
                <div key={i} className="pb-3 border-b last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{homework.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {homework.dueDate}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {homework.subject} • {homework.submissions} submissions
                    </p>
                    <Button size="sm" asChild>
                      <Link href="/dashboard/teacher/homeworks">Review</Link>
                    </Button>
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

