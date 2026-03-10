import TimelineComponent from '@/components/TimelineComponent'

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-16 pb-4 px-4 text-center">
         <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 text-balance">
            History & Timeline
         </h1>
         <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Review the most critical historical dates and events before your citizenship exam. Everything below connects directly to the <i>Discover Canada</i> guide.
         </p>
      </div>
      <TimelineComponent />
    </main>
  )
}
