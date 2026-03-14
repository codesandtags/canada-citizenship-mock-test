import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma'
import { availableMocks } from '../src/lib/mocks'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

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

    // Clear existing questions first to avoid duplicates on re-run
    await prisma.question.deleteMany({ where: { mockExamId: upsertedMock.id } })

    for (const q of mock.questions) {
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
