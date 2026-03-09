import QuizComponent from "@/components/QuizComponent"

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <QuizComponent />
      </div>
    </main>
  )
}
