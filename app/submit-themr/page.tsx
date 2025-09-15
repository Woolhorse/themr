"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function SubmitThemr() {
  const { user } = useUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title || !description || !file) return toast.error("Fill everything")
    if (!user) return toast.error("You must be signed in")

    setLoading(true)
    
    // Upload file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("themr-images")
      .upload(`pending/${file.name}`, file)

    if (uploadError) {
      toast.error("Upload failed")
      setLoading(false)
      return
    }

    const fileUrl = supabase.storage.from("themr-images").getPublicUrl(uploadData.path).data.publicUrl

    // Insert into pending table
    const { error } = await supabase.from("themrs_user_uploaded").insert({
      title,
      description,
      image_url: fileUrl,
      user_id: user.id
    })

    if (error) {
      toast.error("Something went wrong")
    } else {
      toast.success("Themr submitted!")
      setTitle("")
      setDescription("")
      setFile(null)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Submit a Themr</h1>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
    </div>
  )
}
