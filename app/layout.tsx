// app/layout.tsx
import "./globals.css"
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Topbar from "@/components/ui/topbar"
import Footer from "@/components/ui/footer"

export const metadata = {
  title: "Themr",
  description: "Discover and share Essentials+ Themrs",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        {/* Clerk auth provider */}
        <ClerkProvider>
          {/* Topbar on all pages */}
          <Topbar />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}
