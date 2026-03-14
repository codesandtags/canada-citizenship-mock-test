import Link from 'next/link'
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="group flex items-center gap-2 mb-4">
              <div className="flex h-6 w-8 overflow-hidden rounded-sm shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <div className="w-1/4 h-full bg-red-600"></div>
                <div className="w-2/4 h-full bg-white flex items-center justify-center">
                  <span className="text-red-600 text-[10px] leading-none mt-0.5">🍁</span>
                </div>
                <div className="w-1/4 h-full bg-red-600"></div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900">
                Mock Test
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Helping future Canadians prepare for their citizenship exam with realistic, timed practice tests based directly on the official guide.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-600" />
              Official Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5 group">
                  Discover Canada Study Guide
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/study-questions.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5 group">
                  Official Study Questions
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5 group">
                  IRCC Official Website
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              Disclaimer
            </h3>
            <p className="text-sm text-gray-500">
              This application is an independent practice tool and is not affiliated with, endorsed, or sponsored by the Government of Canada or IRCC.
            </p>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} codesandtags. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Version v0.0.7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
