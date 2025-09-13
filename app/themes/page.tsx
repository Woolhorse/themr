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

export default function ThemesPage() {
  const [themrs, setThemrs] = useState<Themr[]>([])

  useEffect(() => {
    supabase
      .from("themrs")
      .select("*, categories(name)")
      .then(({ data }) => {
        if (data) setThemrs(data as Themr[])
      })
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {themrs.map((t) => (
        <Link key={t.id} href={`/themes/${t.id}`}>
          <div className="bg-gray-900 p-4 rounded hover:shadow-lg cursor-pointer space-y-2">
            <h3 className="font-bold text-white">{t.title}</h3>
            {t.image_url && (
              <Image
                src={t.image_url}
                alt={t.title}
                width={300}
                height={180}
                className="rounded object-cover"
              />
            )}
            {t.categories && (
              <p className="text-gray-400 text-sm">{t.categories.name}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
