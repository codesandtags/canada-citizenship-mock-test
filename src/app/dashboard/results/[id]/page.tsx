import QuizComponent from '@/components/QuizComponent'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { getMockExamById } from '@/lib/mocks'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface ResultDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ResultDetailsPage({ params }: ResultDetailsPageProps) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const result = await prisma.quizResult.findUnique({
    where: { id: params.id },
    include: { mockExam: true }
  })

  if (!result || result.userId !== session.user.id) {
    notFound()
  }

  // Get the mock exam data (either from DB or from local mocks if DB is incomplete)
  const mockExam = result.mockExamId ? getMockExamById(result.mockExamId) : null;

  // Fallback/Transform if needed - in V0.0.6 we want to use the categorized questions
  if (!mockExam) {
    // If not found in memory, we might need to reconstruct it from the DB questions
    // For now, our seed ensures they match.
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <QuizComponent 
        mockExam={mockExam}
        userId={session.user.id}
        isReviewMode={true}
        userAnswers={result.answers}
        score={result.score}
      />
    </div>
  )
}
