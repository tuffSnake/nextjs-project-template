"use client"

import Link from "next/link"

const lessons = [
  {
    title: "Basic Letters",
    description: "Learn the Arabic alphabet and basic letter forms",
    level: "Beginner",
    duration: "30 mins",
    lessons: [
      "Introduction to Arabic Script",
      "Basic Letter Forms",
      "Connecting Letters",
      "Letter Variations"
    ]
  },
  {
    title: "Common Words",
    description: "Practice typing frequently used Arabic words",
    level: "Intermediate",
    duration: "45 mins",
    lessons: [
      "Greetings and Introductions",
      "Numbers and Dates",
      "Common Phrases",
      "Daily Vocabulary"
    ]
  },
  {
    title: "Advanced Text",
    description: "Master typing complex Arabic texts and passages",
    level: "Advanced",
    duration: "60 mins",
    lessons: [
      "News Articles",
      "Literary Texts",
      "Technical Writing",
      "Poetry and Prose"
    ]
  }
]

export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Lessons</h1>
          <div className="text-sm text-gray-500">
            Track your progress and learn at your own pace
          </div>
        </div>

        <div className="grid gap-8">
          {lessons.map((section) => (
            <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                </div>
                <div className="text-sm text-right">
                  <div className="text-gray-500">{section.level}</div>
                  <div className="font-medium">{section.duration}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.lessons.map((lesson) => (
                  <Link
                    key={lesson}
                    href={`/lessons/${encodeURIComponent(lesson.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium mb-1">{lesson}</div>
                    <div className="text-sm text-gray-500">Start Lesson →</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
