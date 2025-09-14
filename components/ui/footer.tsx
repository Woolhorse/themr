// components/footer.tsx
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="p-4 border-t border-gray-800 text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2 bg-black">
      <p>©2025 Themr      Website by <Link href="https://discord.com/users/511574627714203648" target="_blank">@woolhorse</Link> </p>
      <div className="flex gap-4">
        <Link href="https://discord.gg/k59qbrbmCK" target="_blank">Discord</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
    </footer>
  )
}
