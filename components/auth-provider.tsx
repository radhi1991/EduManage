"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type Role = "admin" | "teacher" | "student" | "school_admin" | null

interface User {
  id: number
  name: string
  email: string
  role: Role
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const MOCK_USERS = [
  { id: 1, name: "Admin User", email: "admin@example.com", password: "password", role: "admin" as Role },
  { id: 2, name: "Teacher User", email: "teacher@example.com", password: "password", role: "teacher" as Role },
  { id: 3, name: "Student User", email: "student@example.com", password: "password", role: "student" as Role },
  {
    id: 4,
    name: "School Admin User",
    email: "schooladmin@example.com",
    password: "password",
    role: "school_admin" as Role,
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect based on auth status and role
  useEffect(() => {
    if (isLoading) return

    const publicPaths = ["/login", "/register"]
    const isPublicPath = publicPaths.includes(pathname)

    if (!user && !isPublicPath) {
      router.push("/login")
      return
    }

    if (user && isPublicPath) {
      router.push(`/dashboard/${user.role}`)
      return
    }

    // Role-based path protection
    if (user && pathname.includes("/dashboard/")) {
      const rolePath = pathname.split("/")[2]
      if (rolePath !== user.role) {
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

