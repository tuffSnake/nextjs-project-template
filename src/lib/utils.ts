import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface TypingStats {
  wpm: number
  accuracy: number
  time: number
  charactersTyped: number
}

export function calculateTypingStats(
  typed: string,
  target: string,
  startTime: number
): TypingStats {
  const endTime = Date.now()
  const timeElapsed = (endTime - startTime) / 1000 // in seconds
  const minutes = timeElapsed / 60

  // Calculate accuracy
  let correct = 0
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++
  }
  const accuracy = typed.length > 0 ? (correct / typed.length) * 100 : 100

  // Calculate WPM (standard: 5 characters = 1 word)
  const words = typed.length / 5
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0

  return {
    wpm,
    accuracy: Math.round(accuracy),
    time: Math.round(timeElapsed),
    charactersTyped: typed.length
  }
}

export function updateUserProgress(stats: TypingStats) {
  try {
    // Get existing stats from localStorage
    const existingStats = localStorage.getItem("typingStats")
    const currentStats = existingStats ? JSON.parse(existingStats) : {
      totalPracticeTime: 0,
      averageWPM: 0,
      averageAccuracy: 0,
      lessonsCompleted: 0,
      totalCharactersTyped: 0,
      practiceCount: 0
    }

    // Update stats
    const newStats = {
      totalPracticeTime: currentStats.totalPracticeTime + Math.round(stats.time / 60),
      averageWPM: Math.round(
        (currentStats.averageWPM * currentStats.practiceCount + stats.wpm) / 
        (currentStats.practiceCount + 1)
      ),
      averageAccuracy: Math.round(
        (currentStats.averageAccuracy * currentStats.practiceCount + stats.accuracy) / 
        (currentStats.practiceCount + 1)
      ),
      lessonsCompleted: currentStats.lessonsCompleted,
      totalCharactersTyped: currentStats.totalCharactersTyped + stats.charactersTyped,
      practiceCount: currentStats.practiceCount + 1
    }

    // Save updated stats
    localStorage.setItem("typingStats", JSON.stringify(newStats))
    return newStats
  } catch (error) {
    console.error("Error updating user progress:", error)
    return null
  }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const arabicTexts = {
  beginner: [
    "مرحبا بك في موقع تدريب الكتابة العربية",
    "كيف حالك اليوم",
    "أهلا وسهلا بك",
    "صباح الخير",
    "مساء النور"
  ],
  intermediate: [
    "اللغة العربية من أجمل اللغات في العالم",
    "القراءة تفتح آفاقا جديدة للمعرفة",
    "العلم نور والجهل ظلام",
    "من جد وجد ومن زرع حصد"
  ],
  advanced: [
    "قف على الأطلال وابك من ذكرى حبيب ومنزل",
    "وما الحياة الدنيا إلا متاع الغرور",
    "العلم في الصغر كالنقش على الحجر",
    "إذا تم العقل نقص الكلام"
  ]
}

export function getRandomText(level: keyof typeof arabicTexts = "beginner"): string {
  const texts = arabicTexts[level]
  return texts[Math.floor(Math.random() * texts.length)]
}

export function saveSettings(settings: Record<string, any>) {
  try {
    localStorage.setItem("typingSettings", JSON.stringify(settings))
    return true
  } catch (error) {
    console.error("Error saving settings:", error)
    return false
  }
}

export function loadSettings(): Record<string, any> {
  try {
    const settings = localStorage.getItem("typingSettings")
    return settings ? JSON.parse(settings) : {
      keyboardLayout: "standard",
      showVirtualKeyboard: true,
      arabicVariant: "modern",
      soundEnabled: true,
      difficulty: "normal"
    }
  } catch (error) {
    console.error("Error loading settings:", error)
    return {
      keyboardLayout: "standard",
      showVirtualKeyboard: true,
      arabicVariant: "modern",
      soundEnabled: true,
      difficulty: "normal"
    }
  }
}
