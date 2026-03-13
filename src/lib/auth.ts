'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function auth() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split('@')[0],
      image: user.user_metadata?.avatar_url,
    }
  }
}

export async function signIn(provider: 'google' | 'github', options?: { redirectTo?: string }) {
  const supabase = createClient()
  const headersList = headers()
  // Try to get origin from headers or fallback to localhost
  let origin = headersList.get('origin')
  if (!origin) {
    const host = headersList.get('host')
    origin = host ? `http${host.includes('localhost') ? '' : 's'}://${host}` : 'http://localhost:3000'
  }
  
  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/auth/callback?next=${options?.redirectTo || '/dashboard'}`,
    },
  })
  
  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
