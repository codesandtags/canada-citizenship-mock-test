import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, TrendingUp, Target, BookOpen, ArrowRight, Play } from 'lucide-react'
import { availableMocks } from '@/lib/mocks'

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


  // REAL ANALYTICS: Focus Areas
  // We need to find which categories the user is failing in.
  const categoryStats: Record<string, { total: number, correct: number }> = {};

  // To get real categories, we'd need to link results to questions.
  // Since we save answers[] as indices, and we have in-memory mocks:
  results.forEach(result => {
    const mock = availableMocks.find(m => m.id === result.mockExamId);
    if (!mock) return;

    result.answers.forEach((userAnswerIndex, qIndex) => {
      const question = mock.questions[qIndex];
      if (!question) return;

      const category = question.category || 'General';
      if (!categoryStats[category]) {
        categoryStats[category] = { total: 0, correct: 0 };
      }

      categoryStats[category].total += 1;
      if (userAnswerIndex === question.correctAnswer) {
        categoryStats[category].correct += 1;
      }
    });
  });

  const sortedCategories = Object.entries(categoryStats)
    .map(([name, stats]) => ({
      name,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      total: stats.total
    }))
    .sort((a, b) => a.accuracy - b.accuracy); // Worst first

  const weakAreas = sortedCategories.slice(0, 3);

  return (
    <div className="bg-gray-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome back, {session.user.name || 'User'}!</p>
        </div>
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

      {/* Available Mocks Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Play className="w-6 h-6 text-red-600" />
          Available Mock Exams
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMocks.map((mock) => (
            <div key={mock.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{mock.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{mock.description}</p>
              </div>
              <Link
                href={`/quiz?id=${mock.id}`}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center transition-colors"
              >
                Start Exam
              </Link>
            </div>
          ))}
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
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/dashboard/results/${result.id}`}
                    className="p-5 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
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
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Analytics & Weak Areas */}
        <div className="space-y-8">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Focus Areas</h2>
            </div>
            {weakAreas.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">Based on your performance, focus your study on these chapters from Discover Canada:</p>
                <ul className="space-y-3">
                  {weakAreas.map((area) => (
                    <li key={area.name} className={`flex items-center justify-between p-3 rounded-lg border text-sm ${
                      area.accuracy < 60 ? 'bg-red-50 border-red-100' :
                      area.accuracy < 80 ? 'bg-orange-50 border-orange-100' :
                      'bg-green-50 border-green-100'
                    }`}>
                      <span className={`font-semibold ${
                        area.accuracy < 60 ? 'text-red-900' :
                        area.accuracy < 80 ? 'text-orange-900' :
                        'text-green-900'
                      }`}>{area.name}</span>
                      <span className={`font-bold ${
                        area.accuracy < 60 ? 'text-red-600' :
                        area.accuracy < 80 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>{area.accuracy}%</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-gray-500">Take tests to see which chapters need more review.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
