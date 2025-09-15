"use client"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <div className="relative z-10 p-6 max-w-4xl mx-auto space-y-12">

        {/* Hero + Nav */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Terms of Service</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            By using Themr or any Essentials+ products, you agree to the following terms.
          </p>
          <nav className="flex justify-center gap-6 text-gray-400">
            <Link href="/legal/tos" className="text-white font-medium">Terms of Service</Link>
            <span>•</span>
            <Link href="/legal/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </nav>
        </div>

        {/* Scrollable Terms Content */}
        <ScrollArea className="h-[70vh] p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
          <div className="prose prose-invert max-w-none space-y-6">
            <p>Effective Date: <code>Monday, 15 September 2025</code></p>

            <p>
              Welcome to Themr, a web-based platform developed and operated by Essentials+. 
              Themr provides users with access to unique, staff-approved, community-created themes for Essentials+. 
              By accessing, browsing, or using Themr, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service (“Terms”).
            </p>

            <p>If you do not agree to these Terms, you may not access or use Themr.</p>

            <h2>1. Eligibility</h2>
            <p>Themr is intended for individuals who are 13 years of age or older.</p>
            <p>By using the platform, you confirm that you meet this age requirement.</p>
            <p>If you are under the legal age of majority in your jurisdiction, you may only use Themr with the involvement and consent of a parent or legal guardian.</p>

            <h2>2. Ownership and Operation</h2>
            <p>Themr is owned and operated by Essentials+, a company based in the United Kingdom.</p>
            <p>All services, content, and intellectual property made available on Themr are the property of Essentials+, unless otherwise stated.</p>
            <p>Unauthorized use of Essentials+ trademarks, logos, or branding is prohibited without prior written consent.</p>

            <h2>3. Content Submission and Approval</h2>
            <p>Users may not directly upload or publish content on Themr.</p>
            <p>All themes are submitted through Essentials+’s official channels and undergo staff review before being made available on the platform.</p>
            <p>Any content that is:</p>
            <ul>
              <li>malicious, harmful, or exploitative,</li>
              <li>offensive, discriminatory, or harassing, or</li>
              <li>infringing on intellectual property rights</li>
            </ul>
            <p>will not be approved for publication. Essentials+ reserves the right to remove or restrict access to any content at its sole discretion.</p>

            <h2>4. User Conduct</h2>
            <p>By using Themr, you agree to act responsibly and respectfully. Prohibited activities include (but are not limited to):</p>
            <ul>
              <li>Attempting to gain unauthorized access to the platform, accounts, or data</li>
              <li>Introducing or distributing malware, viruses, or harmful code</li>
              <li>Using the platform in a way that violates local, national, or international laws</li>
              <li>Engaging in hate speech, harassment, threats, or abusive behavior</li>
              <li>Misrepresenting yourself or impersonating other individuals, staff, or organizations</li>
            </ul>
            <p>Essentials+ maintains a zero-tolerance policy for harassment, discrimination, and illegal activity.</p>

            <h2>5. Account and Authentication</h2>
            <p>Authentication on Themr is handled by Clerk.</p>
            <p>To use Themr, you may be required to provide an email address and/or a verified Discord user identification.</p>
            <p>You are responsible for maintaining the confidentiality of your login credentials. Essentials+ is not liable for any loss or damage resulting from unauthorized account access caused by user negligence.</p>

            <h2>6. Privacy and Data Use</h2>
            <p>Essentials+ collects limited personal information for the purposes of authentication, personalization, and security.</p>
            <p>Information collected may include your email address, Discord ID, and activity on the platform.</p>
            <p>For details on how we handle data, please refer to our <Link href="/legal/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>

            <h2>7. Suspension and Termination</h2>
            <p>Essentials+ reserves the right to suspend, restrict, or terminate your access to Themr, at its sole discretion, if you violate these Terms or misuse the platform. Suspension or termination may occur without prior notice. You may also choose to stop using Themr at any time.</p>

            <h2>8. Modifications to Service and Terms</h2>
            <p>Essentials+ may, at any time, update or modify:</p>
            <ul>
              <li>the platform,</li>
              <li>its features,</li>
              <li>or these Terms of Service.</li>
            </ul>
            <p>Any changes will take effect immediately upon being posted. Continued use of Themr after such changes constitutes your acceptance of the updated Terms.</p>

            <h2>9. Intellectual Property</h2>
            <p>All themes, designs, and content available through Themr are either owned by Essentials+ or licensed to Essentials+.</p>
            <p>You may not copy, reproduce, distribute, or modify content from Themr without proper authorization. Any unauthorized use of intellectual property may result in legal action.</p>

            <h2>10. Disclaimers and Limitation of Liability</h2>
            <p>Themr is provided on an “as is” and “as available” basis.</p>
            <p>Essentials+ makes no warranties, express or implied, regarding the reliability, availability, or suitability of the service.</p>
            <p>Essentials+ is not liable for:</p>
            <ul>
              <li>downtime, errors, or interruptions,</li>
              <li>loss of data,</li>
              <li>or damages resulting from unauthorized access.</li>
            </ul>
            <p>Your use of Themr is at your own risk.</p>

            <h2>11. Governing Law and Jurisdiction</h2>
            <p>These Terms are governed by and construed in accordance with the laws of England and Wales.</p>
            <p>Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

            <h2>12. Contact Information</h2>
            <p>For any questions or concerns regarding these Terms, you can reach Essentials+ staff through official communication channels, including our Discord server.</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
