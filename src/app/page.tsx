import Link from 'next/link'
import { BookOpen, Target, Clock, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#f43f5e] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">Updated for 2026</span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Based on &quot;Discover Canada&quot;</span>
                </span>
              </a>
            </div>

            <h1 className="mt-10 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
              Pass your Canada Citizenship test on the <span className="text-red-600">first try.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Prepare effectively with our interactive mock tests. We use the real official &quot;Discover Canada&quot; study guide to generate questions so you know exactly what to expect on exam day.
            </p>

            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/quiz"
                className="rounded-xl bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-red-700 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Take a Free Mock Test
              </Link>
              <a href="#features" className="text-base font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Hero Image / Graphic block */}
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
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
