"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ClipboardCheck } from "lucide-react"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  categories?: Category
  created_by: string
}

type Toast = { id: string; title: string }

export default function ThemrDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [themr, setThemr] = useState<Themr | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const router = useRouter()

  useEffect(() => {
    supabase
      .from("themrs")
      .select("*, categories(name)")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) router.push("/themes")
        else setThemr(data as Themr)
      })
  }, [id, router])

  const copyID = () => {
    if (!themr) return
    navigator.clipboard.writeText(themr.id).then(() => {
      const toastId = crypto.randomUUID()
      setToasts((prev) => [...prev, { id: toastId, title: themr.title }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId))
      }, 3000)
    })
  }

  if (!themr) return <p className="p-6 text-gray-400 text-center">Loading...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">{themr.title}</h1>

      {themr.image_url && (
        <Image
          src={themr.image_url}
          alt={themr.title}
          width={600}
          height={360}
          className="rounded-xl object-cover"
        />
      )}

      <p className="text-gray-400">{themr.description}</p>

      {themr.categories && (
        <p className="text-sm text-gray-500">
          Category: <span className="text-blue-400">{themr.categories.name}</span>
        </p>
      )}

      <p className="text-sm text-gray-500">
        Created by: <span className="text-green-400">{themr.created_by}</span>
      </p>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 select-all">{themr.id}</span>
        <Button onClick={copyID} className="text-xs">
          Copy ID
        </Button>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastAlert key={toast.id} title={toast.title} />
        ))}
      </div>
    </div>
  )
}

// Single Toast Alert
function ToastAlert({ title }: { title: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transform transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Alert
        variant="default"
        className="bg-neutral-900 text-white border-neutral-700 shadow-lg flex items-center gap-2"
      >
        <ClipboardCheck />
        <div>
          <AlertTitle>Copied!</AlertTitle>
          <AlertDescription>Copied {title} ID to clipboard!</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}
