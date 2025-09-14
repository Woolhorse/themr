"use client"

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function TestClerk() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading Clerk...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white gap-4 p-4">
      <h1 className="text-3xl font-bold">Clerk Test Page</h1>
      
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton>
            <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center gap-2">
          <p>Welcome, {user?.firstName || "User"}!</p>
          <UserButton />
        </div>
      </SignedIn>

      <div className="mt-4">
        <p>isLoaded: {isLoaded ? "true" : "false"}</p>
        <p>isSignedIn: {isSignedIn ? "true" : "false"}</p>
        <p>user id: {user?.id || "none"}</p>
      </div>
    </div>
  )
}
