// app/themes/[id]/page.tsx
"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ClipboardCopy } from "lucide-react"

const dummyThemr = {
  id: "9LXHGxKN",
  title: "Glass Wave",
  description:
    "Glass Wave is a panel transparent theme for Discord. Glass Wave tries to stay as low as possible in using hardware resources while also delivering a smooth experience.",
  category: "Dark",
  createdAt: "2025-09-12",
  image: "/images/glass-wave.png", // make sure this exists in /public/images
  creator: "Elisniper",
}

export default function ThemrDetail() {
  const [copied, setCopied] = useState(false)
  const idRef = useRef<HTMLSpanElement>(null)

  const handleCopy = () => {
    if (!idRef.current) return

    const range = document.createRange()
    range.selectNodeContents(idRef.current)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }

    document.execCommand("copy")
    setCopied(true)

    if (selection) selection.removeAllRanges()
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main className="p-6 max-w-7xl mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="flex justify-center items-start">
          <img
            src={dummyThemr.image}
            alt={dummyThemr.title}
            className="rounded-lg border border-gray-700 shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{dummyThemr.title}</h1>
          <p className="text-gray-400">Category: {dummyThemr.category}</p>
          <p className="text-gray-400">Created: {dummyThemr.createdAt}</p>
          <p className="text-gray-400">Creator: {dummyThemr.creator}</p>

          <p className="mt-2 text-gray-200">{dummyThemr.description}</p>
          {/* ID Copy */}
          <div className="flex items-center gap-2 mt-4">
            <span
              ref={idRef}
              className="font-mono bg-gray-800 text-white px-2 py-1 rounded select-all cursor-pointer"
              onClick={handleCopy}
            >
              {dummyThemr.id}
            </span>
            <Button size="sm" onClick={handleCopy}>
              <ClipboardCopy className="w-4 h-4 mr-1" /> {copied ? "Copied!" : "Copy ID"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
