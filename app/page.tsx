"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button" // assuming you're using shadcn/ui or similar
import { ChevronRight } from "lucide-react"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
  created_by?: string | null
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
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#0a0a0a_80%)]" />

      <div className="relative z-10 p-6 max-w-7xl mx-auto space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Welcome to Themr
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Discover, share, and explore amazing themes for Essentials+.
          </p>
          <Link
            href="/themes"
            className="inline-block mt-4 px-6 py-3 bg-white text-neutral-950 font-semibold rounded-xl shadow-lg hover:bg-neutral-300 hover:scale-105 transition-all duration-300"
          >
            Browse Themes
          </Link>
        </div>

        {/* Recent Themrs Grid */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Recent Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recentThemrs.map(({ id, title, image_url, categories, description, created_by }) => (
              <Link key={id} href={`/themes/${id}`}>
                <div className="bg-neutral-900 p-0 rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer space-y-2 relative">
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 opacity-20 pointer-events-none rounded-xl" />

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

                  {/* Title + Button */}
                  <div className="flex items-center justify-between px-4 pt-3">
                    <h3 className="font-semibold text-lg text-white truncate">{title}</h3>
                    <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-800 cursor-pointer">
                      Get <ChevronRight className="ml-1" />
                    </Button>
                  </div>

                  {/* Description */}
                  {description && (
                    <p className="text-sm text-neutral-400 truncate px-4 py-0">{description}</p>
                  )}

                  {/* Created By */}
                  {created_by && (
                    <p className="text-sm text-neutral-600 truncate px-4 pt-1 pb-3">
                      By {created_by}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>


      </div>
    </div>
  )
}
