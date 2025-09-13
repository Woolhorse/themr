import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
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
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}>
          <Topbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}
