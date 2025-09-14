"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Search } from "lucide-react"

type Category = { id: string; name: string }
export type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
  created_by?: string | null
}

export default function SearchPopover() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Themr[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setLoading(true)
const { data, error } = await supabase
  .from("themrs")
  .select("id, title, description")
  .ilike("title", `%${query}%`)
  .limit(5)

if (error) {
  console.error("Search error:", error)
} else {
  setResults((data as Themr[]) || [])
}
      setLoading(false)
    }

    const debounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-white" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 bg-neutral-900 border border-neutral-700 text-white">
        <Input
          placeholder="Search Themrs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2 bg-neutral-800 border-neutral-700 text-white"
        />

        {loading && <p className="text-sm text-neutral-400">Waiting...</p>}

        {!loading && results.length === 0 && query && (
          <p className="text-sm text-neutral-400">No results found</p>
        )}

        <div className="flex flex-col gap-2">
          {results.map((themr) => (
            <Link
              key={themr.id}
              href={`/themes/${themr.id}`}
              className="p-2 rounded-md hover:bg-neutral-800 transition"
            >
              <p className="font-medium">{themr.title}</p>
              <p className="text-sm text-neutral-400 line-clamp-1">{themr.description}</p>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
