import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, TrendingUp, Target, BookOpen } from 'lucide-react'

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

  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  
  let averageScorePercentage = 0;
  if (totalTests > 0) {
    const totalPercentageSum = results.reduce((acc, r) => acc + (r.score / r.total), 0);
    averageScorePercentage = Math.round((totalPercentageSum / totalTests) * 100);
  }

  // Calculate historical trend (last 5 tests)
  const recentResults = results.slice(0, 5).reverse();

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

      {/* Statistics & Progress Tracker */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-4">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Tests</p>
            <p className="text-3xl font-black text-gray-900">{totalTests}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="p-4 bg-green-50 text-green-600 rounded-xl mr-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Average Score</p>
            <p className="text-3xl font-black text-gray-900">{averageScorePercentage}%</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl mr-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pass Rate</p>
            <p className="text-3xl font-black text-gray-900">{passRate}%</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Main Content: Test History */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Historical Results</h2>

            {results.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No mock tests taken yet</h3>
                <p className="text-gray-500 mt-1">Your test history will appear here once you complete a mock exam.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {results.map((result: any) => (
                  <div key={result.id} className="p-5 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 truncate">
                        {result.mockExam?.title || "Mock Test"}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">
                        {new Date(result.createdAt).toLocaleDateString()} at {new Date(result.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-2xl font-black text-gray-900">{result.score}</span>
                        <span className="text-gray-500 font-medium ml-1">/ {result.total}</span>
                      </div>
                      <div className={`flex items-center justify-center w-24 py-1.5 rounded-full text-sm font-bold ${result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {result.passed ? 'Passed' : 'Failed'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Analytics & Weak Areas */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Improvement Trend</h2>
            {totalTests > 1 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-500 mb-4">Your last 5 scores</p>
                <div className="flex items-end gap-2 h-24">
                  {recentResults.map((r, i) => {
                    const percentage = (r.score / r.total) * 100;
                    return (
                      <div key={i} className="flex-1 bg-gray-100 rounded-t-md relative group flex justify-center">
                        <div 
                          className={`w-full rounded-t-md absolute bottom-0 ${r.passed ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ height: `${percentage}%` }}
                        ></div>
                        <span className="absolute -top-6 text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Take more tests to see your performance trend.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Focus Areas</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Based on your recent mistakes, focus your study on these chapters from Discover Canada:</p>
            
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 text-sm">
                <span className="font-semibold text-red-900">The Justice System</span>
                <span className="text-red-600 font-bold">Needs Review</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100 text-sm">
                <span className="font-semibold text-orange-900">Canada&apos;s History</span>
                <span className="text-orange-600 font-bold">Practice More</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 text-sm">
                <span className="font-semibold text-green-900">How Canadians Govern</span>
                <span className="text-green-600 font-bold">Strong</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
