"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user } = useAuth()

  // Get role-specific theme class
  const getRoleThemeClass = () => {
    switch (user?.role) {
      case "admin":
        return "admin-theme"
      case "teacher":
        return "teacher-theme"
      case "student":
        return "student-theme"
      default:
        return ""
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 ${getRoleThemeClass()}`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full">
            <Header title={title} />

            <main className="flex-1 px-6 pb-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

