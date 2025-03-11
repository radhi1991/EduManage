"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  GraduationCap,
  BookCopy,
  FileText,
  Home,
  LogOut,
  Menu,
  X,
  Calendar,
  BarChart2,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

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

  // Get navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/dashboard/${user?.role}`,
        icon: Home,
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
    ]

    const adminItems = [
      {
        title: "Schools",
        href: "/dashboard/admin/schools",
        icon: BookOpen,
      },
      {
        title: "Teachers",
        href: "/dashboard/admin/teachers",
        icon: Users,
      },
      {
        title: "Students",
        href: "/dashboard/admin/students",
        icon: GraduationCap,
      },
      {
        title: "Subjects",
        href: "/dashboard/admin/subjects",
        icon: BookCopy,
      },
      {
        title: "Homeworks",
        href: "/dashboard/admin/homeworks",
        icon: FileText,
      },
    ]

    const teacherItems = [
      {
        title: "My Subjects",
        href: "/dashboard/teacher/subjects",
        icon: BookCopy,
      },
      {
        title: "Homeworks",
        href: "/dashboard/teacher/homeworks",
        icon: FileText,
      },
      {
        title: "Students",
        href: "/dashboard/teacher/students",
        icon: GraduationCap,
      },
      {
        title: "Analytics",
        href: "/dashboard/teacher/analytics",
        icon: BarChart2,
      },
    ]

    const studentItems = [
      {
        title: "My Subjects",
        href: "/dashboard/student/subjects",
        icon: BookCopy,
      },
      {
        title: "Homeworks",
        href: "/dashboard/student/homeworks",
        icon: FileText,
      },
    ]

    const schoolAdminItems = [
      {
        title: "Manage Teachers",
        href: "/dashboard/school-admin/manage-teachers",
        icon: Users,
      },
      {
        title: "Manage Students",
        href: "/dashboard/school-admin/manage-students",
        icon: GraduationCap,
      },
      {
        title: "School Analytics",
        href: "/dashboard/school-admin/analytics",
        icon: BarChart2,
      },
    ]

    switch (user?.role) {
      case "admin":
        return [...baseItems, ...adminItems]
      case "teacher":
        return [...baseItems, ...teacherItems]
      case "student":
        return [...baseItems, ...studentItems]
      case "school_admin":
        return [...baseItems, ...schoolAdminItems]
      default:
        return baseItems
    }
  }

  const navItems = getNavItems()
  const roleThemeClass = getRoleThemeClass()

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)} className="glass">
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:w-64 md:flex-shrink-0
        glass-sidebar h-screen overflow-y-auto py-6 px-3
        ${roleThemeClass} ${className}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <BookOpen className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">EduManage</span>
          </div>

          {/* User info */}
          <div className="px-4 py-3 mb-6 glass-card">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:text-primary"}
                  `}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="mt-auto px-2">
            <Button variant="outline" className="w-full justify-start" onClick={logout}>
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

