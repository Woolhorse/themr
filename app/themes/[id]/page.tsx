"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  categories?: Category
  created_by: string
}

export default function ThemrDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [themr, setThemr] = useState<Themr | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from("themrs")
      .select("*, categories(name)")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) router.push("/themes")
        else setThemr(data as Themr)
      })
  }, [id, router])

  const copyID = () => {
    if (!themr) return
    navigator.clipboard.writeText(themr.id)
    alert("Themr ID copied! ✅")
  }

  if (!themr) return <p className="p-6 text-gray-400 text-center">Loading...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">{themr.title}</h1>
      {themr.image_url && (
        <Image
          src={themr.image_url}
          alt={themr.title}
          width={600}
          height={360}
          className="rounded object-cover"
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
      <div className="flex items-center gap-2">
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
