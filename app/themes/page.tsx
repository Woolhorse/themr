// app/page.tsx
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Themrs data with local images
const dummyThemrs = [
  {
    id: "1",
    name: "Glass Wave",
    creator: "Elisniper",
    shortDesc: "Glass Wave is a panel transparent theme for Discord. Glass Wave tries to stay as low as possible in using...",
    image: "/images/glass-wave.png",
  },
  {
    id: "2",
    name: "Minimalist Essentials",
    creator: "Bob",
    shortDesc: "Clean and minimal look for faster workflow",
    image: "/images/placeholder.png",
  },
]

export default function HomePage() {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dummyThemrs.map((themr) => (
        <Card key={themr.id} className="bg-neutral-900 border-gray-700 hover:shadow-lg transition-shadow rounded-md overflow-hidden p-0">
  <img
    src={themr.image}
    alt={themr.name}
    className="w-full aspect-video object-cover block"
  />
  <CardContent className="px-6 py-0">
    <h2 className="font-bold text-2xl text-white">{themr.name}</h2>
    <p className="text-gray-400 text-med">{themr.shortDesc}</p>
    <p className="text-gray-500 text-sm mt-1">By: {themr.creator}</p>
  </CardContent>
  <CardFooter className="p-6">
    <Link href={`/themes/${themr.id}`}>
      <Button className="w-full bg-blue-600 text-white cursor-pointer">View</Button>
    </Link>
   </CardFooter>
    </Card>

      ))}
    </main>
  )
}
