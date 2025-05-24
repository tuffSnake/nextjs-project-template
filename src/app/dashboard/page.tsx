"use client"

import { ProgressStats } from "@/components/ProgressStats"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Track your progress and achievements
          </div>
        </div>

        <ProgressStats />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Practice Session</div>
                  <div className="text-sm text-gray-500">Completed 5 minutes ago</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">85 WPM</div>
                  <div className="text-sm text-gray-500">97% Accuracy</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Lesson Completed</div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Basic Letters</div>
                  <div className="text-sm text-gray-500">4/4 Exercises</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Suggested Next Steps</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">Continue Your Lesson</div>
                <div className="text-sm text-gray-500 mb-4">
                  Pick up where you left off in the Common Words section
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                  Resume Lesson
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">Daily Practice Goal</div>
                <div className="text-sm text-gray-500 mb-4">
                  Complete 3 more practice sessions to reach your daily goal
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
