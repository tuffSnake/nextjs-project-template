"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-8 text-base font-medium text-white transition-colors hover:bg-gray-800"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
