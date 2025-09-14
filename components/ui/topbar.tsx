"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Topbar() {
  const { isSignedIn, user } = useUser()
  console.log("Clerk user:", user, "signed in?", isSignedIn)

  return (
    <header className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-700 sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-white cursor-pointer hover:text-neutral-300 transition-colors">Themr</h1>
      </Link>

      {/* Nav + Search + User */}
      <div className="flex items-center gap-4">

        {/* Categories Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-neutral-800 hover:bg-neutral-600 hover:text-black">Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-neutral-800 text-white rounded-md p-2 shadow-lg">
                <NavigationMenuLink asChild>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/themes">Themes</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/">-</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/">-</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search Themrs..."
          className="bg-neutral-800 text-white px-3 py-1 rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

    <UserButton />

    {/* Special button for a specific user */}
    {user && user.id === "YOUR_SPECIAL_USER_ID" && (
      <Button
        variant="secondary"
        className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
      >
        Secret Button
      </Button>
    )}      


        {/* User auth */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton>
                <Button variant="secondary" className="px-3 py-2 bg-neutral-800 text-white rounded-md hover:bg-purple-500 transition">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="secondary" className="px-3 py-2 bg-neutral-800 text-white rounded-md hover:bg-purple-500 transition">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
