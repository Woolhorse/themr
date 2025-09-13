// components/topbar.tsx
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-white bg-neutral-05">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-white cursor-pointer">Themr</h1>
      </Link>

      {/* Navigation + Search + User */}
      <div className="flex items-center gap-4">
        {/* Navigation Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 cursor-pointer">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border border-neutral-700 text-white">
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/themes">Themes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/contact">Contact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

                <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 bg-neutral-300 text-black rounded-md">
            Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border border-neutral-700 text-white">
            <DropdownMenuItem>
              <Link href="/">Dark</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/themes">Light</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">Fun</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/contact">Other</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



        {/* Search */}
        <Input
          type="text"
          placeholder="Search Themrs..."
          className="bg-gray-900 text-white px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
        />


      {/*<Link href={`/themes/`}>
      <Button className="w-full bg-blue-600 text-white cursor-pointer">Login</Button>
      </Link>*/}

        {/* User */}
        <UserButton />
      </div>
    </header>
  )
}
