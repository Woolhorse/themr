// app/page.tsx
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const dummyThemrs = [
  { id: "1", title: "Glass Wave", image: "/images/glass-wave.png" },
  { id: "2", title: "Dark Mode", image: "/images/placeholder.png" },
  { id: "3", title: "Neon Glow", image: "/images/placeholder.png" },
  { id: "4", title: "Classic Dark", image: "/images/placeholder.png" },
]

export default function Home() {
  return (
    <>
<br /><br /><br /><br />
      <main className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Themr</h1>
          <p className="text-gray-400 mb-6">
            Discover, share, and explore amazing Themrs for Essentials+
          </p>
          <Input
            type="text"
            placeholder="Search Themrs..."
            className="max-w-md mx-auto bg-gray-900 text-white border-gray-700 focus:ring-white"
          />
        </section>

        {/* Grid of Themrs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our favs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyThemrs.map((themr) => (
              <Link key={themr.id} href={`/themes/${themr.id}`}>
                <div className="bg-gray-900 border border-gray-700 rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img
                    src={themr.image}
                    alt={themr.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-bold text-lg">{themr.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
