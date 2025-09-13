"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
}

export default function ThemesPage() {
  const [themrs, setThemrs] = useState<Themr[]>([])

  useEffect(() => {
    async function fetchThemrs() {
      const { data } = await supabase.from("themrs").select("*, categories(name)")
      if (data) setThemrs(data as Themr[])
    }
    fetchThemrs()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {themrs.map(({ id, title, image_url, categories }) => (
        <Link key={id} href={`/themes/${id}`}>
          <div className="bg-gray-800 p-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer space-y-3">
            
            {/* Title */}
            <h3 className="font-semibold text-lg text-white truncate">{title}</h3>

            {/* Image */}
            {image_url && (
              <div className="w-full aspect-[16/9] relative rounded overflow-hidden">
                <Image
                  src={image_url}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Category */}
            {categories && (
              <p className="text-gray-400 text-sm">{categories.name}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
