import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  categories: { name: string } | null
  created_by: string
}

export default async function ThemesPage() {
  const { data: themrs, error } = await supabase
    .from<Themr>("themrs")  // ✅ just table type
    .select("*, categories(name)")
    .order("created_at", { ascending: false })

  if (error) {
    return <p className="p-6 text-red-500">Error loading Themrs: {error.message}</p>
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Themes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {themrs && themrs.length > 0 ? (
          themrs.map((t) => (
            <Link key={t.id} href={`/themes/${t.id}`}>
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer">
                {t.image_url && (
                  <img
                    src={t.image_url}
                    alt={t.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-3">
                  <h2 className="font-bold text-lg">{t.title}</h2>
                  <p className="text-sm text-gray-400">{t.description}</p>
                  {t.categories && (
                    <p className="text-xs mt-1 text-gray-500">
                      Category: {t.categories.name}
                    </p>
                  )}
                  <p className="text-xs mt-1 text-gray-500">
                    Created by: {t.created_by}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No Themrs available yet.</p>
        )}
      </div>
    </div>
  )
}
