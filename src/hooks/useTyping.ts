import { useState, useEffect } from "react"
import { calculateTypingStats, updateUserProgress } from "@/lib/utils"

interface UseTypingProps {
  text: string
}

export function useTyping({ text }: UseTypingProps) {
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    time: 0,
    charactersTyped: 0
  })

  const handleInput = (value: string) => {
    if (!startTime) {
      setStartTime(Date.now())
    }
    setInput(value)

    // Calculate stats when typing is complete
    if (value.length === text.length) {
      const typingStats = calculateTypingStats(value, text, startTime!)
      setStats(typingStats)
      updateUserProgress(typingStats)
    }
  }

  const reset = () => {
    setInput("")
    setStartTime(null)
    setStats({
      wpm: 0,
      accuracy: 100,
      time: 0,
      charactersTyped: 0
    })
  }

  return {
    input,
    stats,
    handleInput,
    reset
  }
}
