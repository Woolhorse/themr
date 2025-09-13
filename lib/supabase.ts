import { createClient } from "@supabase/supabase-js"

// ⚡ your Supabase project URL + anon key
const supabaseUrl = "https://tbjfedbifutssgxktxgh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiamZlZGJpZnV0c3NneGt0eGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODIzNzgsImV4cCI6MjA3MzM1ODM3OH0.Z6aVvhvG1eAsHck06bAn64k3BC2s3uGU7VMxoj9xi7g"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
