'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function saveQuizAction(data: {
  score: number;
  total: number;
  passed: boolean;
  answers: number[];
  mockExamId?: string;
}) {
  const session = await auth()
  const userId = session?.user?.id

  try {
    const result = await prisma.quizResult.create({
      data: {
        score: data.score,
        total: data.total,
        passed: data.passed,
        answers: data.answers,
        mockExamId: data.mockExamId,
        userId: userId,
      }
    })
    return { success: true, result }
  } catch (error) {
    console.error('Failed to save quiz result:', error)
    return { success: false, error: 'Failed to save quiz result' }
  }
}
