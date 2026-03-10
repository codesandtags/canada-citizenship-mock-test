"use client"

import { timelineEvents } from '@/lib/timeline-data'

export default function TimelineComponent() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="relative wrap overflow-hidden p-2 sm:p-10 h-full">
        {/* Vertical Line Desktop */}
        <div className="absolute border-opacity-20 border-red-500 h-full border-2 hidden md:block left-1/2 transform -translate-x-1/2"></div>
        {/* Vertical Line Mobile */}
        <div className="absolute border-opacity-20 border-red-500 h-[calc(100%-2rem)] border-2 md:hidden left-4 top-4"></div>

        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={event.id} className={`mb-8 flex justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

              {/* Empty Space Desktop */}
              <div className="order-1 md:w-5/12 hidden md:block"></div>

              {/* Timeline Dot */}
              <div className="z-20 order-1 bg-red-600 shadow-xl w-4 h-4 rounded-full absolute left-4 transform -translate-x-1/2 border-4 box-content border-red-100 md:relative md:left-auto md:translate-x-0 mt-[1.25rem] md:mt-0"></div>

              {/* Content Card */}
              <div className="order-1 bg-white rounded-2xl shadow-lg w-full md:w-5/12 px-6 py-5 border border-gray-100 ml-10 md:ml-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl relative">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <h3 className="font-bold text-gray-900 text-xl leading-tight pr-4">{event.title}</h3>
                    <span className="self-start sm:self-auto font-black text-red-600 text-lg bg-red-50 px-3 py-1 rounded-lg shrink-0">
                      {event.year}
                    </span>
                </div>
                <span className={`inline-block mb-3 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  event.category === 'Discovery' ? 'bg-blue-50 text-blue-700' :
                  event.category === 'Conflict' ? 'bg-orange-50 text-orange-700' :
                  event.category === 'Politics' ? 'bg-purple-50 text-purple-700' :
                  'bg-green-50 text-green-700'
                }`}>{event.category}</span>
                <p className="text-base leading-relaxed text-gray-600">{event.description}</p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
}
