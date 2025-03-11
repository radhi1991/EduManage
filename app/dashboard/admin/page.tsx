"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, GraduationCap, BookCopy, FileText } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for dashboard stats
  const stats = [
    { title: "Total Schools", value: 12, icon: BookOpen, change: "+2 this month" },
    { title: "Total Teachers", value: 48, icon: Users, change: "+5 this month" },
    { title: "Total Students", value: 1250, icon: GraduationCap, change: "+28 this month" },
    { title: "Total Subjects", value: 36, icon: BookCopy, change: "+3 this month" },
    { title: "Pending Homeworks", value: 24, icon: FileText, change: "8 due today" },
  ]

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New teacher registered", time: "2 hours ago", user: "Sarah Johnson" },
                { action: "New school added", time: "5 hours ago", user: "Admin" },
                { action: "Homework assigned", time: "Yesterday", user: "Michael Brown" },
                { action: "Student enrolled", time: "2 days ago", user: "Admin" },
                { action: "Subject updated", time: "3 days ago", user: "Emily Davis" },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between pb-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">By {activity.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>School Distribution</CardTitle>
            <CardDescription>Students per school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Oakridge Academy", students: 450, percentage: 36 },
                { name: "Riverside High School", students: 380, percentage: 30 },
                { name: "Westview Elementary", students: 280, percentage: 22 },
                { name: "Northside Prep", students: 140, percentage: 12 },
              ].map((school, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{school.name}</p>
                    <p className="text-sm">{school.students} students</p>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${school.percentage}%` }}></div>
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

