"use client"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <div className="relative z-10 p-6 max-w-4xl mx-auto space-y-12">

        {/* Hero + Nav */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Privacy Policy</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            How Essentials+ collects, uses, and protects your personal information on Themr.
          </p>
          <nav className="flex justify-center gap-6 text-gray-400">
            <Link href="/legal/tos" className="hover:text-white transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/legal/privacy" className="text-white font-medium">Privacy Policy</Link>
          </nav>
        </div>

        {/* Scrollable Privacy Content */}
        <ScrollArea className="h-[70vh] p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
          <div className="prose prose-invert max-w-none space-y-6">
            <p>Effective Date: <code>Monday, 15 September 2025</code></p>

            <p>
              Essentials+ (“we,” “our,” or “us”) values your privacy. This Privacy Policy explains what personal information we collect when you use Themr, 
              how we use it, and the steps we take to protect it.
            </p>

            <h2>1. Information We Collect</h2>
            <p>When you use Themr, we may collect the following data:</p>
            <ul>
              <li>Email address (via Clerk authentication)</li>
              <li>Discord user identification</li>
            </ul>
            <p>This information is required for authentication, personalization, and platform management.</p>

            <h2>2. How We Collect Data</h2>
            <p>We obtain information directly from:</p>
            <ul>
              <li>Clerk – for account authentication</li>
              <li>Discord – for verifying user identity</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>Your data is only used for:</p>
            <ul>
              <li>Operating and improving Themr</li>
              <li>Ensuring secure authentication and account access</li>
              <li>Personalizing your experience</li>
            </ul>
            <p>We will never sell your data. Information is only shared if:</p>
            <ul>
              <li>Required by law, or</li>
              <li>Necessary to provide Themr services</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not share personal data outside of Essentials+ unless it is legally required or essential to operate the platform.</p>

            <h2>5. Data Security</h2>
            <p>We implement reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or loss.</p>

            <h2>6. Your Rights</h2>
            <p>As a user, you have the right to:</p>
            <ul>
              <li>Request access to your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
            </ul>
            <p>To exercise these rights, contact us directly (see section 9).</p>

            <h2>7. Compliance</h2>
            <p>Themr complies with applicable data protection regulations, including the UK GDPR.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Significant updates will be announced through our official communication channels. Continued use of Themr after updates indicates acceptance of the revised policy.</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, reach us at:</p>
            <ul>
              <li>Essentials+ Discord server</li>
              <li>Email: <a href="mailto:stanlxie@stan.is-a.dev" className="text-blue-400 hover:underline">stanlxie@stan.is-a.dev</a></li>
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
