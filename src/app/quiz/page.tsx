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

  // Requirement: Only the first 2 mocks are available for non logged in users
  const publicMocks = ['1', '2'];
  if (!publicMocks.includes(mockId) && !session) {
    redirect('/login?redirectTo=/quiz?id=' + mockId)
  }

  const mockExam = getMockExamById(mockId)

  if (!mockExam) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#222' }}>
      <QuizComponent
        mockExam={mockExam}
        userId={session?.user?.id}
      />
    </main>
  )
}
