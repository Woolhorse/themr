"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"

type Category = {
  id: string
  name: string
}

type Themr = {
  id: string
  title: string
  description: string
  image_url: string | null
  category_id: string
  categories?: Category
  created_by: string
  created_at?: string
}

export default function AdminPanel() {
  const [categories, setCategories] = useState<Category[]>([])
  const [themrs, setThemrs] = useState<Themr[]>([])
  const [newThemrTitle, setNewThemrTitle] = useState("")
  const [newThemrDesc, setNewThemrDesc] = useState("")
  const [newThemrImage, setNewThemrImage] = useState("")
  const [newCategoryId, setNewCategoryId] = useState("")

  useEffect(() => {
    fetchCategories()
    fetchThemrs()
  }, [])

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*")
    if (data) setCategories(data as Category[])
  }

  const fetchThemrs = async () => {
    const { data } = await supabase
      .from("themrs")
      .select("*, categories(name)")
    if (data) setThemrs(data as Themr[])
  }

  const createThemr = async () => {
    await supabase.from("themrs").insert([
      {
        title: newThemrTitle,
        description: newThemrDesc,
        image_url: newThemrImage,
        category_id: newCategoryId,
        created_by: "Admin",
      },
    ])
    setNewThemrTitle("")
    setNewThemrDesc("")
    setNewThemrImage("")
    fetchThemrs()
  }

  // DELETE FUNCTIONS
  const deleteThemr = async (id: string) => {
    await supabase.from("themrs").delete().eq("id", id)
    fetchThemrs()
  }

  const deleteCategory = async (id: string) => {
    // Optional: delete all themrs in this category first
    await supabase.from("themrs").delete().eq("category_id", id)
    await supabase.from("categories").delete().eq("id", id)
    fetchCategories()
    fetchThemrs()
  }

  return (
    <div className="p-6 text-white space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* New Themr Form */}
      <section className="space-y-2">
        <input
          type="text"
          placeholder="Themr Title"
          className="p-2 rounded bg-gray-900 border border-gray-700 w-full"
          value={newThemrTitle}
          onChange={(e) => setNewThemrTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 rounded bg-gray-900 border border-gray-700 w-full"
          value={newThemrDesc}
          onChange={(e) => setNewThemrDesc(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="p-2 rounded bg-gray-900 border border-gray-700 w-full"
          value={newThemrImage}
          onChange={(e) => setNewThemrImage(e.target.value)}
        />
        <p>Wait! Please upload images with <Link href="https://postimages.org/" target="_blank"> postimages.org</Link> or they may not work!</p>
        <select
          className="p-2 rounded bg-gray-900 border border-gray-700 w-full"
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          onClick={createThemr}
        >
          Add Themr
        </button>
      </section>

      {/* Existing Categories */}
      <section>
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          {categories.map((c) => (
            <div key={c.id} className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2">
              <span>{c.name}</span>
              <button
                className="text-red-500 hover:text-red-400"
                onClick={() => deleteCategory(c.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Existing Themrs */}
      <section>
        <h2 className="text-2xl font-bold">Existing Themrs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {themrs.map((t) => (
            <div key={t.id} className="bg-gray-900 p-4 rounded space-y-2 relative">
              <h3 className="font-bold">{t.title}</h3>
              {t.image_url && (
                <Image
                  src={t.image_url}
                  alt={t.title}
                  width={300}
                  height={180}
                  className="rounded object-cover"
                />
              )}
              <p className="text-gray-400 text-sm">{t.description}</p>
              <p className="text-gray-500 text-xs">
                Category: {t.categories?.name || "None"}
              </p>
              <p className="text-gray-500 text-xs">Created by: {t.created_by}</p>
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                onClick={() => deleteThemr(t.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
