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

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            By using Themr or any Essentials+ products, you agree to the following terms.
          </p>
        </div>

        {/* Quick Navigation */}
        <nav className="flex justify-center gap-6 text-gray-400">
          <Link href="/legal/tos" className="text-white font-medium">
            Terms of Service
          </Link>
          <span className="text-gray-600">•</span>
          <Link href="/legal/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </nav>

        {/* Terms Content */}
        <section className="prose prose-invert max-w-none space-y-6">
          <p><strong>Effective Date:</strong> Monday, 15 September 2025</p>
          <p>
            Welcome to Themr, a web-based platform developed and operated by Essentials+. 
            By accessing, browsing, or using Themr, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service (“Terms”).
          </p>
          <p>If you do not agree to these Terms, you may not use Themr.</p>

          <h2 id="1-eligibility">1. Eligibility</h2>
          <p>Themr is intended for individuals who are 13 years of age or older.</p>
          <p>If you are under the legal age of majority in your jurisdiction, you may only use Themr with the involvement and consent of a parent or legal guardian.</p>

          <h2 id="2-ownership-and-operation">2. Ownership and Operation</h2>
          <p>Themr is owned and operated by Essentials+, a company based in the United Kingdom.</p>
          <p>All services, content, and intellectual property made available on Themr are the property of Essentials+, unless otherwise stated.</p>
          <p>Unauthorized use of Essentials+ trademarks, logos, or branding is prohibited without prior written consent.</p>

          <h2 id="3-content-submission-and-approval">3. Content Submission and Approval</h2>
          <p>Users may not directly upload or publish content on Themr.</p>
          <p>All themes are submitted through Essentials+’s official channels and undergo staff review before being made available on the platform.</p>
          <p>Content that is malicious, harmful, offensive, discriminatory, harassing, or infringing on intellectual property rights will not be approved.</p>
          <p>Essentials+ reserves the right to remove or restrict access to any content at its sole discretion.</p>

          <h2 id="4-user-conduct">4. User Conduct</h2>
          <p>By using Themr, you agree to act responsibly and respectfully. Prohibited activities include (but are not limited to):</p>
          <ul>
            <li>Attempting to gain unauthorized access to the platform, accounts, or data</li>
            <li>Introducing or distributing malware, viruses, or harmful code</li>
            <li>Using the platform in a way that violates laws or regulations</li>
            <li>Engaging in hate speech, harassment, threats, or abusive behavior</li>
            <li>Misrepresenting yourself or impersonating others</li>
          </ul>
          <p>Essentials+ maintains a zero-tolerance policy for harassment, discrimination, and illegal activity.</p>

          <h2 id="5-account-and-authentication">5. Account and Authentication</h2>
          <p>Authentication on Themr is handled by Clerk.</p>
          <p>To use Themr, you may be required to provide an email address and/or a verified Discord ID.</p>
          <p>You are responsible for maintaining the confidentiality of your login credentials. Essentials+ is not liable for any damages caused by unauthorized account access due to user negligence.</p>

          <h2 id="6-privacy-and-data-use">6. Privacy and Data Use</h2>
          <p>Essentials+ collects limited personal information for authentication, personalization, and security. Information collected may include your email address, Discord ID, and activity on the platform.</p>
          <p>For full details, please see our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>

          <h2 id="7-suspension-and-termination">7. Suspension and Termination</h2>
          <p>Essentials+ reserves the right to suspend, restrict, or terminate your access to Themr if you violate these Terms or misuse the platform. Suspension or termination may occur without prior notice.</p>

          <h2 id="8-modifications-to-service-and-terms">8. Modifications to Service and Terms</h2>
          <p>Essentials+ may, at any time, update or modify Themr, its features, or these Terms of Service. Changes take effect immediately once posted. Continued use of Themr indicates acceptance of the updated Terms.</p>

          <h2 id="9-intellectual-property">9. Intellectual Property</h2>
          <p>All themes, designs, and content on Themr are owned by or licensed to Essentials+. You may not copy, reproduce, or distribute content without authorization. Unauthorized use may result in legal action.</p>

          <h2 id="10-disclaimers-and-limitation-of-liability">10. Disclaimers and Limitation of Liability</h2>
          <p>Themr is provided on an “as is” and “as available” basis. Essentials+ makes no warranties regarding reliability, availability, or suitability. We are not liable for downtime, errors, data loss, or damages resulting from unauthorized access. Use Themr at your own risk.</p>

          <h2 id="11-governing-law-and-jurisdiction">11. Governing Law and Jurisdiction</h2>
          <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2 id="12-contact-information">12. Contact Information</h2>
          <p>For any questions about these Terms, reach out via our official Discord server or email <a href="mailto:stanlxie@stan.is-a.dev">stanlxie@stan.is-a.dev</a>.</p>
        </section>
      </div>
    </div>
  )
}
