"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Stats {
  totalPracticeTime: number // in minutes
  averageWPM: number
  averageAccuracy: number
  lessonsCompleted: number
  totalCharactersTyped: number
}

interface ProgressLevel {
  name: string
  requiredChars: number
  color: string
}

const levels: ProgressLevel[] = [
  { name: "Beginner", requiredChars: 0, color: "bg-gray-400" },
  { name: "Intermediate", requiredChars: 1000, color: "bg-blue-500" },
  { name: "Advanced", requiredChars: 5000, color: "bg-green-500" },
  { name: "Expert", requiredChars: 10000, color: "bg-purple-500" },
  { name: "Master", requiredChars: 20000, color: "bg-yellow-500" }
]

export function ProgressStats() {
  const [stats, setStats] = useState<Stats>({
    totalPracticeTime: 0,
    averageWPM: 0,
    averageAccuracy: 0,
    lessonsCompleted: 0,
    totalCharactersTyped: 0
  })

  const [currentLevel, setCurrentLevel] = useState<ProgressLevel>(levels[0])
  const [nextLevel, setNextLevel] = useState<ProgressLevel | null>(levels[1])
  const [progressToNext, setProgressToNext] = useState(0)

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("typingStats")
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats)
      setStats(parsedStats)

      // Calculate current level
      const currentLevelIndex = levels.findIndex(
        (level, index) => 
          parsedStats.totalCharactersTyped >= level.requiredChars && 
          (index === levels.length - 1 || parsedStats.totalCharactersTyped < levels[index + 1].requiredChars)
      )

      const current = levels[currentLevelIndex]
      const next = levels[currentLevelIndex + 1] || null

      setCurrentLevel(current)
      setNextLevel(next)

      if (next) {
        const progress = ((parsedStats.totalCharactersTyped - current.requiredChars) / 
          (next.requiredChars - current.requiredChars)) * 100
        setProgressToNext(Math.min(progress, 100))
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Current Level: {currentLevel.name}</span>
            {nextLevel && (
              <span className="text-sm text-gray-500">Next: {nextLevel.name}</span>
            )}
          </div>
          <Progress value={progressToNext} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Practice Time</p>
            <p className="text-2xl font-bold">{stats.totalPracticeTime}m</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Avg. Speed</p>
            <p className="text-2xl font-bold">{stats.averageWPM} WPM</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Lessons Done</p>
            <p className="text-2xl font-bold">{stats.lessonsCompleted}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Achievement Progress</h2>
        <div className="space-y-4">
          {[
            { name: "Speed Demon", progress: (stats.averageWPM / 100) * 100, desc: "Reach 100 WPM" },
            { name: "Accuracy Master", progress: stats.averageAccuracy, desc: "Maintain 98% accuracy" },
            { name: "Dedicated Learner", progress: (stats.totalPracticeTime / 60) * 100, desc: "Practice for 1 hour" },
            { name: "Lesson Champion", progress: (stats.lessonsCompleted / 10) * 100, desc: "Complete 10 lessons" }
          ].map((achievement) => (
            <div key={achievement.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{achievement.name}</span>
                <span className="text-gray-500">{achievement.desc}</span>
              </div>
              <Progress value={Math.min(achievement.progress, 100)} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
