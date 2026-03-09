"use client"

import Link from 'next/link'
import { LogIn } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-2">
              {/* Simple pure CSS Canadian Flag representation */}
              <div className="flex h-8 w-10 overflow-hidden rounded-md shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <div className="w-1/4 h-full bg-red-600"></div>
                <div className="w-2/4 h-full bg-white flex items-center justify-center">
                  <span className="text-red-600 text-lg leading-none mt-1">🍁</span>
                </div>
                <div className="w-1/4 h-full bg-red-600"></div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-red-700 transition-colors">
                Mock Test
              </span>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Future: We will verify session here to show Dashboard vs Sign In */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Sign In
              <LogIn className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
