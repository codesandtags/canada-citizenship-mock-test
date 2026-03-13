import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const results = await prisma.quizResult.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { mockExam: true }
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome back, {session.user.name || 'User'}!</p>
        </div>
        <Link
          href="/"
          className="mt-4 md:mt-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-sm"
        >
          Take a Mock Test
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Historical Results</h2>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No mock tests taken yet</h3>
            <p className="text-gray-500 mt-1">Your test history will appear here once you complete a mock exam.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {results.map((result: any) => (
              <div key={result.id} className="p-5 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {result.passed ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {result.passed ? 'Passed' : 'Failed'}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1 truncate">
                  {result.mockExam?.title || "Mock Test"}
                </h3>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Score</span>
                    <span className="text-2xl font-black text-gray-900">{result.score}</span>
                    <span className="text-gray-500 font-medium ml-1">/ {result.total}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-400">
                    {Math.round((result.score / result.total) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
