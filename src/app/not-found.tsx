import Link from 'next/link'
import { Home, Map } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
          <Map className="w-12 h-12 text-red-600" />
        </div>

        <div>
          <h1 className="text-7xl font-black text-gray-900 tracking-tighter">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-800 tracking-tight">Lost in the Tundra?</h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Oops! It seems you&apos;ve wandered off the trail. We couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <Home className="w-5 h-5" />
            <span>Return to Base Camp</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
