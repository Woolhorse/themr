"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type Category = { id: string; name: string }
type Themr = {
  id: string
  title: string
  description: string
  image_url?: string | null
  categories?: Category
  created_by?: string | null
}

export default function PrivacyPage() {
  const [recentThemrs, setRecentThemrs] = useState<Themr[]>([])

  useEffect(() => {
    const fetchThemrs = async () => {
      const { data } = await supabase
        .from("themrs")
        .select("*, categories(name)")
        .order("created_at", { ascending: false })
        .limit(8)
      if (data) setRecentThemrs(data as Themr[])
    }
    fetchThemrs()
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#0a0a0a_80%)]" />

      <div className="relative z-10 p-6 max-w-4xl mx-auto space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            How Essentials+ collects, uses, and protects your personal information on Themr.
          </p>
        </div>

        {/* Quick Navigation */}
        <nav className="flex justify-center gap-6 text-gray-400">
          <Link href="/legal/tos" className="hover:text-white transition">
            Terms of Service
          </Link>
          <span className="text-gray-600">•</span>
          <Link href="/legal/privacy" className="text-white font-medium">
            Privacy Policy
          </Link>
        </nav>

        {/* Policy Content */}
        <section className="prose prose-invert max-w-none space-y-6">
          <p><strong>Effective Date:</strong> Monday, 15 September 2025</p>
          <p>
            Essentials+ (“we,” “our,” or “us”) values your privacy. 
            This Privacy Policy explains what personal information we collect when you use Themr, 
            how we use it, and the steps we take to protect it.
          </p>

          <h2 id="1-information-we-collect">1. Information We Collect</h2>
          <p>When you use Themr, we may collect the following data:</p>
          <ul>
            <li>Email address (via Clerk authentication)</li>
            <li>Discord user identification</li>
          </ul>
          <p>This information is required for authentication, personalization, and platform management.</p>

          <h2 id="2-data-sources">2. How We Collect Data</h2>
          <p>We obtain information directly from:</p>
          <ul>
            <li><strong>Clerk</strong> – for account authentication</li>
            <li><strong>Discord</strong> – for verifying user identity</li>
          </ul>

          <h2 id="3-use-of-information">3. How We Use Your Information</h2>
          <p>Your data is only used for:</p>
          <ul>
            <li>Operating and improving Themr</li>
            <li>Ensuring secure authentication and account access</li>
            <li>Personalizing your experience</li>
          </ul>
          <p>
            We will never sell your data. Information is only shared if:
          </p>
          <ul>
            <li>Required by law, or</li>
            <li>Necessary to provide Themr services</li>
          </ul>

          <h2 id="4-data-sharing">4. Data Sharing</h2>
          <p>
            We do not share personal data outside of Essentials+ 
            unless it is legally required or essential to operate the platform.
          </p>

          <h2 id="5-data-security">5. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures 
            to protect your information from unauthorized access, misuse, or loss.
          </p>

          <h2 id="6-user-rights">6. Your Rights</h2>
          <p>As a user, you have the right to:</p>
          <ul>
            <li>Request access to your data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
          </ul>
          <p>To exercise these rights, contact us directly (see section 9).</p>

          <h2 id="7-compliance">7. Compliance</h2>
          <p>
            Themr complies with applicable data protection regulations, 
            including the UK GDPR. 
          </p>

          <h2 id="8-changes-to-policy">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. 
            Significant updates will be announced through our official communication channels. 
            Continued use of Themr after updates indicates acceptance of the revised policy.
          </p>

          <h2 id="9-contact">9. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy, reach us at:</p>
          <ul>
            <li>Essentials+ Discord server</li>
            <li>Email: <a href="mailto:stanlxie@stan.is-a.dev">stanlxie@stan.is-a.dev</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
