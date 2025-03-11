"use client"

import { useAuth } from "@/components/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth()

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="glass-navbar sticky top-0 z-30 flex h-16 items-center justify-between px-6 py-4 mb-6">
      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <ModeToggle />

        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

