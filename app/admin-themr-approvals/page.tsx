"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

type Themr = {
  id: string
  title: string
  description: string
  image_url: string
  category_id: string
  user_id: string
}

type Category = {
  id: string
  name: string
}

export default function AdminThemrApprovals() {
  const { user } = useUser()
  const [pending, setPending] = useState<Themr[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (!user || user.id !== "user_32hq3G3Jv2v2USX4NLH03dyEArw") return
    fetchPending()
    fetchCategories()
  }, [user])

  const fetchPending = async () => {
    const { data, error } = await supabase.from("themrs_user_uploaded").select("*")
    if (error) return toast.error("Failed to fetch")
    setPending(data)
  }

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*")
    if (data) setCategories(data)
  }

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || "Unknown"

  const approve = async (themr: Themr) => {
    // copy to main table
    const { error: insertError } = await supabase.from("themrs").insert({
      title: themr.title,
      description: themr.description,
      image_url: themr.image_url,
      category_id: themr.category_id,
      created_by: themr.user_id
    })
    if (insertError) return toast.error("Failed to approve")

    // remove from pending
    await supabase.from("themrs_user_uploaded").delete().eq("id", themr.id)
    toast.success("Approved")
    fetchPending()
  }

  const reject = async (id: string) => {
    await supabase.from("themrs_user_uploaded").delete().eq("id", id)
    toast.success("Rejected")
    fetchPending()
  }

  if (!user || user.id !== "user_32hq3G3Jv2v2USX4NLH03dyEArw") return <div>Access denied</div>

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Pending Themrs</h1>
      {pending.map(t => (
        <div key={t.id} className="border p-4 rounded space-y-2">
          <h2 className="font-semibold">{t.title}</h2>
          <p>{t.description}</p>
          <p className="text-sm font-medium">Category: {getCategoryName(t.category_id)}</p>
          {t.image_url && <img src={t.image_url} alt={t.title} className="max-h-40 object-cover rounded" />}
          <div className="flex gap-2">
            <Button onClick={() => approve(t)}>Approve</Button>
            <Button variant="destructive" onClick={() => reject(t.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
