"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push(`/dashboard/${user.role}`)
      } else {
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  return null
}

