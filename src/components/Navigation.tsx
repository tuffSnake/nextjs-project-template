"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/practice", label: "Practice", icon: "⌨️" },
    { href: "/lessons", label: "Lessons", icon: "📚" },
    { href: "/games", label: "Games", icon: "🎮" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 flex items-center"
            >
              <span className="mr-2">🖋️</span>
              <span>Arabic Typing</span>
            </Link>
          </div>
          
          <div className="flex space-x-1">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                  pathname === href
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
