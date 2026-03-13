"use client"

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LayoutWrapper({ session }: { session: any }) {
  const pathname = usePathname()

  // Focus Mode: Hide navbar completely when user is taking the test.
  const isFocusMode = pathname?.startsWith('/quiz')

  if (isFocusMode) return null;

  return <Navbar session={session} />
}
