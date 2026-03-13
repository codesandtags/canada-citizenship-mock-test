"use client"

import { useState } from 'react'
import Link from 'next/link'
import { LogIn, Menu, X, Clock, User } from 'lucide-react'
import { signOut } from '@/lib/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

          {/* Center Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
             <Link
               href="/timeline"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 font-semibold hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100"
             >
               <Clock className="w-4 h-4" />
               History Timeline
             </Link>
          </div>

          {/* Right side actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 hover:text-red-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Sign In
                <LogIn className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md absolute w-full shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
               href="/timeline"
               onClick={() => setIsMobileMenuOpen(false)}
               className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-900 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              History Timeline
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-900 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full text-left block px-3 py-3 rounded-lg text-base font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 justify-center w-full rounded-xl bg-gray-900 px-5 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-black transition-all"
              >
                Sign In
                <LogIn className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
