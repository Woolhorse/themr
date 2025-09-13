"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Topbar() {
  const { isSignedIn, user } = useUser() // ✅ inside the component
  console.log("Clerk user:", user, "signed in?", isSignedIn)

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-pink-400 cursor-pointer hover:text-pink-500 transition-colors">Themr</h1>
      </Link>

      {/* Nav + Search + User */}
      <div className="flex items-center gap-4">

        {/* Main Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-pink-500 hover:text-white transition">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-white">
            <DropdownMenuItem><Link href="/">Home</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/themes">Themes</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/about">About</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/contact">Contact</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Categories Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-pink-500 hover:text-white transition">
            Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-white">
            <DropdownMenuItem><Link href="/">Dark</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/themes">Light</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/about">Fun</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/contact">Other</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search Themrs..."
          className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        {/* User auth */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-white transition">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-white transition">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

      </div>
    </header>
  )
}
