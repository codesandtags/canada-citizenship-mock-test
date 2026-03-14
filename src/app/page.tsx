import Link from 'next/link'
import { BookOpen, Target, Clock, ShieldCheck, PlayCircle, Lock, Unlock } from 'lucide-react'

export default async function Home() {

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#f43f5e] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 sm:pb-20 lg:flex lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-16 sm:mt-20 lg:mt-8">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">Updated for 2026</span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Based on &quot;Discover Canada&quot;</span>
                </span>
              </a>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Pass your Canada Citizenship test on the <span className="text-red-600">first try.</span>
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Prepare effectively with our interactive mock tests. We use the real official &quot;<a target="_blank" rel="noopener noreferrer" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" className="text-red-600 hover:text-red-700 font-semibold transition-colors">Discover Canada</a>&quot; study guide to generate questions so you know exactly what to expect on exam day.
            </p>
          </div>

          {/* Hero Image / Graphic block */}
          <div className="mx-auto mt-16 hidden lg:flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-2xl bg-gray-50/50 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-3xl lg:p-4">
                <div className="rounded-xl bg-white shadow-2xl ring-1 ring-gray-900/10 p-8 w-[400px] xl:w-[500px] border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="text-8xl mb-6">🍁</div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded-full mb-8 animate-pulse"></div>

                    <div className="w-full space-y-3">
                       <div className="h-12 w-full bg-red-50 rounded-lg border border-red-100 flex items-center px-4">
                          <div className="h-4 w-4 rounded-full bg-red-500 mr-3"></div>
                          <div className="h-3 w-1/3 bg-red-200 rounded-full"></div>
                       </div>
                       <div className="h-12 w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center px-4">
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-3"></div>
                          <div className="h-3 w-1/2 bg-gray-200 rounded-full"></div>
                       </div>
                       <div className="h-12 w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center px-4">
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-3"></div>
                          <div className="h-3 w-2/5 bg-gray-200 rounded-full"></div>
                       </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Exam Cards */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-8 pb-16 relative z-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Free Mock #1 */}
          <div className="relative flex flex-col items-start justify-between rounded-2xl p-6 bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:shadow-lg border border-gray-100">
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Unlock className="h-3 w-3" />
                Free
              </div>
              <h3 className="text-lg font-bold leading-6 text-gray-900 mb-2">Official Mock Exam #1</h3>
              <p className="text-sm leading-6 text-gray-500">20 questions covering rights, history, geography and government.</p>
            </div>
            <Link
              href="/quiz?id=1"
              className="mt-5 flex w-full items-center justify-center gap-x-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-all"
            >
              <PlayCircle className="h-4 w-4" />
              Start Mock Exam
            </Link>
          </div>

          {/* Free Mock #2 */}
          <div className="relative flex flex-col items-start justify-between rounded-2xl p-6 bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:shadow-lg border border-gray-100">
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Unlock className="h-3 w-3" />
                Free
              </div>
              <h3 className="text-lg font-bold leading-6 text-gray-900 mb-2">Official Mock Exam #2</h3>
              <p className="text-sm leading-6 text-gray-500">A fresh set of 20 randomized questions from the study guide.</p>
            </div>
            <Link
              href="/quiz?id=2"
              className="mt-5 flex w-full items-center justify-center gap-x-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-all"
            >
              <PlayCircle className="h-4 w-4" />
              Start Mock Exam
            </Link>
          </div>

          {/* Unlock All Mocks CTA */}
          <div className="relative flex flex-col items-start justify-between rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:shadow-lg border border-gray-700 overflow-hidden">
            <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12 pointer-events-none">
              <ShieldCheck className="w-28 h-28" />
            </div>
            <div className="w-full relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Lock className="h-3 w-3" />
                3 More Mocks
              </div>
              <h3 className="text-lg font-bold leading-6 text-white mb-2">Unlock All Exams</h3>
              <p className="text-sm leading-6 text-gray-400">Sign in to access Geography, History, and Government & Rights mock exams.</p>
            </div>
            <Link
              href="/login"
              className="mt-5 relative z-10 flex w-full items-center justify-center gap-x-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-100 transition-all"
            >
              Sign In to Unlock
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Study Smarter</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform is built to mimic the official testing environment while giving you the detailed feedback you need to learn quickly.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Target className="h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                Realistic Exams
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Experience 20-question randomized mocks that mirror the exact format of the real citizenship test.</p>
              </dd>
            </div>

             <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Clock className="h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                Timed Sessions
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Practice under pressure with our 30-minute test timer so you&apos;re never caught off guard.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <BookOpen className="h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                Detailed Explanations
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Learn from your mistakes with comprehensive explanations and direct page references to the official guide.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <ShieldCheck className="h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                Track Progress
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Create an account to save your mock results and identify which chapters in the book you need to study more.</p>
              </dd>
            </div>

          </dl>
        </div>
      </div>

    </main>
  )
}
