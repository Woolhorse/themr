// app/admin/page.tsx
"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectItem } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ClipboardCopy, Edit2 } from "lucide-react"

interface Themr {
  id: string
  title: string
  category: string
  visible: boolean
}

const initialThemrs: Themr[] = [
  { id: "abc123", title: "Frosty Dark", category: "Dark", visible: true },
  { id: "xyz789", title: "Sunny Light", category: "Light", visible: true },
]

function generateID() {
  return Math.random().toString(36).substring(2, 9).toUpperCase()
}

export default function AdminPanel() {
  const [themrs, setThemrs] = useState<Themr[]>(initialThemrs)
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Dark")

  const addThemr = () => {
    if (!newTitle) return
    const newThemr: Themr = {
      id: generateID(),
      title: newTitle,
      category: newCategory,
      visible: true,
    }
    setThemrs([newThemr, ...themrs])
    setNewTitle("")
  }

  const toggleVisibility = (id: string) => {
    setThemrs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t))
    )
  }

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    alert("Copied Themr ID!")
  }

  const handleEdit = (id: string) => {
    const newTitle = prompt("Enter new title:")
    if (!newTitle) return
    setThemrs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    )
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Add New Themr */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Themr</h2>
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Select value={newCategory} onValueChange={setNewCategory}>
            <SelectItem value="Dark">Dark</SelectItem>
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Neon">Neon</SelectItem>
          </Select>
          <Button onClick={addThemr}>Create</Button>
        </div>
      </section>

      {/* Existing Themrs */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Existing Themrs</h2>
        <div className="flex flex-col gap-3">
          {themrs.map((themr) => (
            <div
              key={themr.id}
              className="flex items-center justify-between bg-gray-900 p-3 rounded border border-gray-700"
            >
              <div>
                <p className="font-bold">{themr.title}</p>
                <p className="text-gray-400">
                  {themr.category} | {themr.visible ? "Visible" : "Hidden"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Dropdown for actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-2 py-1 bg-gray-800 rounded">
                    ...
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border border-gray-700">
                    <DropdownMenuItem onClick={() => handleCopy(themr.id)}>
                      <ClipboardCopy className="w-4 h-4 mr-1" /> Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleVisibility(themr.id)}>
                      {themr.visible ? "Hide" : "Show"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(themr.id)}>
                      <Edit2 className="w-4 h-4 mr-1" /> Edit Title
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
