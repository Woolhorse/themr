"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ChevronRight, ClipboardCheck } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
  created_by: string
}

type Toast = { id: string; title: string; categoryName: string }

export default function ThemesPage() {
  const [themrs, setThemrs] = useState<Themr[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    async function fetchThemrs() {
      const { data } = await supabase.from("themrs").select("*, categories(name)")
      if (data) setThemrs(data as Themr[])
    }
    fetchThemrs()
  }, [])

  // Handle "Get" button click
  const handleGet = (themr: Themr) => {
    navigator.clipboard.writeText(themr.id).then(() => {
      const toastId = crypto.randomUUID()
      const categoryName = themr.categories?.name || "Uncategorized"
      setToasts((prev) => [...prev, { id: toastId, title: themr.title, categoryName }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId))
      }, 3000)
    })
  }

  // Group toasts by categoryName string
  const groupedToasts = toasts.reduce<Record<string, Toast[]>>((acc, toast) => {
    const name = toast.categoryName
    if (!acc[name]) acc[name] = []
    acc[name].push(toast)
    return acc
  }, {})

  return (
    <div className="p-6 bg-neutral-950 min-h-screen relative">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center sm:text-left">
        Essentials+ Admin
      </h1>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
        {themrs.map((themr) => (
          <div key={themr.id} className="bg-neutral-900 p-0 rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default space-y-2">
            
            {/* Image */}
            {themr.image_url && (
              <div className="w-full aspect-[16/9] relative rounded-t-xl overflow-hidden">
                <Image src={themr.image_url} alt={themr.title} fill className="object-cover" />
              </div>
            )}

            {/* Title + Button */}
            <div className="flex items-center justify-between px-4">
              <h3 className="font-semibold text-lg text-white truncate pt-1 pb-0 mt-1">{themr.title}</h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-800 border-neutral-800 mt-3 cursor-pointer"
              >
                <Link href={`/themes/${themr.id}`}>Get</Link> <ChevronRight />
              </Button>
            </div>

            {/* Description */}
            <h3 className="text-med text-neutral-500 truncate px-4 py-0">{themr.description}</h3>

            {/* Creator */}
            <h3 className="text-sm text-neutral-600 truncate px-4 pt-1 pb-3">By {themr.created_by}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
