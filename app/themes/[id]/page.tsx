"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  categories: { name: string } | null
  created_by: string
}

interface Props {
  params: { id: string }
}

export default function ThemrDetailPage({ params }: Props) {
  const { id } = params
  const [themr, setThemr] = useState<Themr | null>(null)
  const router = useRouter()

  // Fetch Themr on mount
  useEffect(() => {
    supabase
      .from("themrs")
      .select("*, categories(name)")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          console.error(error)
          router.push("/themes")
        } else {
          setThemr(data as Themr)
        }
      })
  }, [id, router])

  const copyID = () => {
    if (!themr) return
    navigator.clipboard.writeText(themr.id)
    alert("Themr ID copied! ✅")
  }

  if (!themr)
    return (
      <p className="p-6 text-gray-400 text-center text-lg">Loading Themr...</p>
    )

  return (
    <div className="p-6 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">{themr.title}</h1>

      {themr.image_url && (
        <img
          src={themr.image_url}
          alt={themr.title}
          className="w-full h-64 object-cover rounded-md"
        />
      )}

      <p className="text-gray-400">{themr.description}</p>

      {themr.categories && (
        <p className="text-sm text-gray-500">
          Category: <span className="text-blue-400">{themr.categories.name}</span>
        </p>
      )}

      <p className="text-sm text-gray-500">
        Created by: <span className="text-green-400">{themr.created_by}</span>
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-400 select-all">{themr.id}</span>
        <button
          onClick={copyID}
          className="bg-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-500"
        >
          Copy ID
        </button>
      </div>
    </div>
  )
}
