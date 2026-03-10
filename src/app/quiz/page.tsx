import QuizComponent from '@/components/QuizComponent'
import { getMockExamById } from '@/lib/mocks'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function QuizPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const mockId = typeof searchParams.id === 'string' ? searchParams.id : '1'
  const mockExam = getMockExamById(mockId)

  if (!mockExam) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <QuizComponent mockExam={mockExam} />
    </main>
  )
}
