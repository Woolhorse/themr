import "./globals.css"
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Topbar from "@/components/ui/topbar"
import Footer from "@/components/ui/footer"
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Themr",
  description: "Discover and share Essentials+ Themrs",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}>
      <html lang="en">
        <body className={`bg-black text-white flex flex-col min-h-screen antialiased ${geistSans.variable} ${geistMono.variable}`}>
          {/* Topbar with Clerk login buttons */}



          {/* Your existing Topbar component */}
          <Topbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
