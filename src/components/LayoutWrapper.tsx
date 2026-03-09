"use client"

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function LayoutWrapper() {
  const pathname = usePathname()

  // Focus Mode: Hide navbar completely when user is taking the test.
  const isFocusMode = pathname?.startsWith('/quiz')

  if (isFocusMode) return null;

  return <Navbar />
}
