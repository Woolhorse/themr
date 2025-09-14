"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchPopover from "@/components/ui/SearchPopover"
import { 
  UserButton, 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  useUser 
} from "@clerk/nextjs"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

type ThemeCard = {
  id: string
  title: string
  description: string
}

interface TopbarProps {
  themes: ThemeCard[] // Pass your themes from parent or fetch here
  onSearch?: (results: ThemeCard[]) => void
}

export default function Topbar({ themes, onSearch }: TopbarProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const [query, setQuery] = useState("")

  // Filter themes based on search query
  useEffect(() => {
    if (onSearch) {
      const results = themes.filter(theme =>
        theme.title.toLowerCase().includes(query.toLowerCase())
      )
      onSearch(results)
    }
  }, [query, themes, onSearch])

  return (
    <header className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-700 sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-neutral-300 transition-colors">
          Themr
        </h1>
      </Link>

      {/* Nav + Search + User */}
      <div className="flex items-center gap-4">

        {/* Categories Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-neutral-800 hover:bg-neutral-600 hover:text-black">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-neutral-800 text-white rounded-md p-2 shadow-lg">
                <NavigationMenuLink asChild>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/themes">Themes</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
          <SearchPopover />

        {/* Auth / User Section */}
        {isLoaded && (
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button className="px-3 py-2 bg-neutral-800 text-white rounded-md hover:bg-purple-500 transition">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="px-3 py-2 bg-neutral-800 text-white rounded-md hover:bg-purple-500 transition">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
              {/* Secret button for a specific user */}
              {user?.id === "user_32hq3G3Jv2v2USX4NLH03dyEArw" && (
                <Button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-red-800 transition">
                  Admin Panel
                </Button>
              )}
            </SignedIn>
          </div>
        )}
      </div>
    </header>
  )
}
