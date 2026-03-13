import QuizComponent from '@/components/QuizComponent'
import { getMockExamById } from '@/lib/mocks'
import { auth } from '@/lib/auth'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QuizPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await auth()
  const mockId = typeof searchParams.id === 'string' ? searchParams.id : '1'
  
  // Requirement: Restrict non-free mocks to logged-in users
  if (mockId !== '1' && !session) {
    redirect('/login?redirectTo=/quiz?id=' + mockId)
  }

  const mockExam = getMockExamById(mockId)

  if (!mockExam) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <QuizComponent 
        mockExam={mockExam} 
        userId={session?.user?.id}
      />
    </main>
  )
}
