import { PrismaClient } from '../src/generated/prisma'
import { availableMocks } from '../src/lib/mocks'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  for (const mock of availableMocks) {
    const upsertedMock = await prisma.mockExam.upsert({
      where: { id: mock.id },
      update: {
        title: mock.title,
        description: mock.description,
      },
      create: {
        id: mock.id,
        title: mock.title,
        description: mock.description,
      },
    })

    console.log(`Upserted mock exam: ${upsertedMock.title}`)

    for (const q of mock.questions) {
      // Use a combination of mockExamId and text to "find" or create questions
      // Since Question ID is a UUID in the DB, we'll just create them for now
      // A more robust seed would check for existing questions.
      await prisma.question.create({
        data: {
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          category: q.category,
          reference: q.reference,
          mockExamId: upsertedMock.id,
        },
      })
    }
    console.log(`Added ${mock.questions.length} questions to ${upsertedMock.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
