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

export default function HomePage() {
  const [recentThemrs, setRecentThemrs] = useState<Themr[]>([])

  useEffect(() => {
    const fetchThemrs = async () => {
      const { data } = await supabase
        .from("themrs")
        .select("*, categories(name)")
        .order("created_at", { ascending: false })
        .limit(8)
      if (data) setRecentThemrs(data as Themr[])
    }
    fetchThemrs()
  }, [])

  return (
    <div className="relative bg-gray-900 min-h-screen">

      {/* subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 opacity-20 pointer-events-none"></div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Welcome to <span className="text-pink-400">Themr</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Discover, share, and explore amazing themes for Essentials+.
          </p>
          <Link
            href="/themes"
            className="inline-block mt-4 px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300"
          >
            Browse Themes
          </Link>
        </div>

        {/* Recent Themrs Grid */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Recent Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recentThemrs.map(({ id, title, image_url, categories }) => (
              <Link key={id} href={`/themes/${id}`}>
                <div className="bg-gray-800 p-4 rounded-xl hover:shadow-[0_0_20px_rgba(255,192,203,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer space-y-3">
                  
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

                  <div className="space-y-1">
                    <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
                    {categories && (
                      <p className="text-gray-400 text-sm">{categories.name}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Themr Section */}
        <section className="mt-16 bg-gray-800 p-8 rounded-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold text-white">Why Themr?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Themr makes it easy to share and discover themes for Essentials+. 
            Get inspired by the community or upload your own creations!
          </p>
        </section>

      </div>
    </div>
  )
}
