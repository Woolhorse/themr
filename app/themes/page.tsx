"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
  created_by: string
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

    
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-neutral-950 min-h-screen">

<div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 opacity-20 pointer-events-none"></div>


      {themrs.map(({ id, title, image_url, categories, description, created_by }) => (
        <Link key={id} href={`/themes/${id}`}>
          <div className="bg-neutral-900 p-0 rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default space-y-2">
            
            {/* Image */}
            {image_url && (
              <div className="w-full aspect-[16/9] relative rounded-t-xl overflow-hidden">
                <Image
                  src={image_url}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Title */}
            <div className="flex items-center justify-between px-4">
            <h3 className="font-semibold text-lg text-white truncate pt-1 pb-0 mt-1">{title}</h3>

              <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-800 mt-3 cursor-pointer">
                Get <ChevronRight />
              </Button>

            </div>
            <h3 className="text-med text-neutral-500 truncate px-4 py-0">{description}</h3>

            <h3 className="text-sm text-neutral-600 truncate px-4 pt-1 pb-3">By {created_by}</h3>





          </div>
        </Link>
      ))}
    </div>
  )
}
