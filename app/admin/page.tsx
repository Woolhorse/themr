// app/admin/page.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type Themr = {
  id: string
  title: string
  description: string
  category: string
  image: string
  creator: string
  visible: boolean
}

// 👇 add your admin Clerk user IDs here
const ADMIN_IDS = ["user_32eYd7pqQxnIuqXgXwUCEvBbkGz", "user_456def"]

export default function AdminPanel() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  // Simple access control check
  useEffect(() => {
    if (isLoaded) {
      if (user && ADMIN_IDS.includes(user.id)) {
        setAuthorized(true)
      } else {
        router.push("/") // kick non-admins to homepage
      }
    }
  }, [user, isLoaded, router])

  // Themr state
  const [themrs, setThemrs] = useState<Themr[]>([])
  const [newThemr, setNewThemr] = useState<Omit<Themr, "id" | "visible">>({
    title: "",
    description: "",
    category: "",
    image: "",
    creator: "",
  })

  function handleAddThemr() {
    const id = Math.random().toString(36).substring(2, 10)
    const newEntry: Themr = { ...newThemr, id, visible: true }
    setThemrs([...themrs, newEntry])
    setNewThemr({ title: "", description: "", category: "", image: "", creator: "" })
  }

  function toggleVisibility(id: string) {
    setThemrs(themrs.map(t => (t.id === id ? { ...t, visible: !t.visible } : t)))
  }

  function copyId(id: string) {
    navigator.clipboard.writeText(id)
    alert("Copied Themr ID: " + id)
  }

  if (!authorized) {
    return <p className="p-8 text-center">Checking access...</p>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Form to Add a Themr */}
      <div className="space-y-4 mb-8 bg-gray-900 p-6 rounded-lg border border-gray-700">
        <Input
          placeholder="Themr Title"
          value={newThemr.title}
          onChange={(e) => setNewThemr({ ...newThemr, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={newThemr.description}
          onChange={(e) => setNewThemr({ ...newThemr, description: e.target.value })}
        />
        <Select
          value={newThemr.category}
          onValueChange={(value) => setNewThemr({ ...newThemr, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="theme">Theme</SelectItem>
            <SelectItem value="plugin">Plugin</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Image URL"
          value={newThemr.image}
          onChange={(e) => setNewThemr({ ...newThemr, image: e.target.value })}
        />
        <Input
          placeholder="Creator Name"
          value={newThemr.creator}
          onChange={(e) => setNewThemr({ ...newThemr, creator: e.target.value })}
        />
        <Button onClick={handleAddThemr}>Add Themr</Button>
      </div>

      {/* List of Themrs */}
      <div className="space-y-4">
        {themrs.map((themr) => (
          <div
            key={themr.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {themr.image && (
                <img
                  src={themr.image}
                  alt={themr.title}
                  className="w-20 h-14 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-bold text-lg">{themr.title}</h2>
                <p className="text-sm text-gray-400">{themr.description}</p>
                <p className="text-xs text-gray-500">
                  ID: <span className="select-all">{themr.id}</span>
                </p>
                <p className="text-xs text-gray-500">Creator: {themr.creator}</p>
                <p className="text-xs">{themr.visible ? "Visible ✅" : "Hidden ❌"}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => copyId(themr.id)}>
                  Copy Themr ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleVisibility(themr.id)}>
                  {themr.visible ? "Hide" : "Show"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  )
}
