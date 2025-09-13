"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  categories?: Category
}

export default function HomePage() {
  const [recentThemrs, setRecentThemrs] = useState<Themr[]>([])

  useEffect(() => {
    const fetchThemrs = async () => {
      const { data } = await supabase
        .from("themrs")
        .select("*, categories(name)")
        .order("created_at", { ascending: false })
        .limit(8) // show latest 8
      if (data) setRecentThemrs(data as Themr[])
    }
    fetchThemrs()
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-white">Welcome to Themr</h1>
      <p className="text-gray-400">Discover and share amazing themes for Essentials+</p>

      {/* Recent Themrs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentThemrs.map((t) => (
          <Link key={t.id} href={`/themes/${t.id}`}>
            <div className="bg-gray-900 rounded-md overflow-hidden hover:shadow-lg cursor-pointer">
              {t.image_url && (
                <Image
                  src={t.image_url}
                  alt={t.title}
                  width={300}
                  height={180}
                  className="object-cover w-full h-44"
                />
              )}
              <div className="p-3 space-y-1">
                <h2 className="text-white font-bold">{t.title}</h2>
                {t.categories && (
                  <p className="text-sm text-gray-400">{t.categories.name}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
