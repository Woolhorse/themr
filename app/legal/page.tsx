"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LegalIndex() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <div className="relative z-10 p-6 max-w-4xl mx-auto space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Legal</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Official policies for using Themr and Essentials+ products.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/legal/tos">
            <Card className="bg-neutral-800 hover:bg-neutral-800/70 transition cursor-pointer text-white text-center border-neutral-500">
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  By using Themr, you agree to these terms.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/legal/privacy">
            <Card className="bg-neutral-800 hover:bg-neutral-800/70 transition cursor-pointer text-white text-center border-neutral-500">
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  By using Themr, you agree to these policies.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
