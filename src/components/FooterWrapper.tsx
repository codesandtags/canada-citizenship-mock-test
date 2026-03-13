"use client"

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  // Focus Mode: Hide footer completely when user is taking the test.
  const isFocusMode = pathname?.startsWith('/quiz')

  if (isFocusMode) return null;

  return <Footer />
}
