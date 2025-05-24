"use client"

import { useState, useCallback } from "react"
import { VirtualKeyboard } from "@/components/VirtualKeyboard"
import { useTyping } from "@/hooks/useTyping"
import { getRandomText, formatTime } from "@/lib/utils"

export default function PracticePage() {
  const [targetText, setTargetText] = useState(getRandomText())
  const [showResults, setShowResults] = useState(false)

  const onComplete = useCallback(() => {
    setShowResults(true)
  }, [])

  const {
    text,
    stats,
    isComplete,
    activeKey,
    errors,
    handleInput,
    handleKeyPress,
    reset
  } = useTyping({
    targetText,
    onComplete
  })

  const handleNewText = () => {
    setTargetText(getRandomText())
    reset()
    setShowResults(false)
  }

  const progress = (text.length / targetText.length) * 100

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">تدريب الكتابة العربية</h1>
          <button 
            onClick={handleNewText}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Try Another Text
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Text to Type:</h3>
            <p 
              className="text-xl text-right font-arabic p-4 bg-gray-50 rounded-lg" 
              dir="rtl"
            >
              {targetText.split("").map((char, index) => {
                let color = "text-gray-800"
                if (index < text.length) {
                  color = text[index] === char ? "text-green-600" : "text-red-600"
                }
                return (
                  <span 
                    key={`${index}-${char}`}
                    className={color}
                    style={{ backgroundColor: index === text.length ? "#ffd70033" : "transparent" }}
                  >
                    {char}
                  </span>
                )
              })}
            </p>
          </div>
          
          <div className="mb-6">
            <textarea
              className={`w-full h-32 p-4 border rounded-lg text-right text-xl font-arabic ${
                errors.length > 0 ? "border-red-300" : "border-gray-200"
              }`}
              dir="rtl"
              value={text}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="ابدأ الكتابة هنا..."
              disabled={isComplete}
              autoFocus
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Speed</p>
              <p className="text-2xl font-bold">{stats.wpm} WPM</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-2xl font-bold">{stats.accuracy}%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <p className="text-2xl font-bold">{formatTime(stats.time)}</p>
            </div>
          </div>
        </div>

        <VirtualKeyboard 
          onKeyPress={handleKeyPress}
          activeKey={activeKey}
        />

        {showResults && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Practice Complete!</h2>
              <p className="text-gray-600 mb-4">Here are your results:</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Speed</p>
                  <p className="text-2xl font-bold">{stats.wpm} WPM</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-2xl font-bold">{stats.accuracy}%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-2xl font-bold">{formatTime(stats.time)}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Characters</p>
                  <p className="text-2xl font-bold">{stats.charactersTyped}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                  onClick={() => setShowResults(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                  onClick={handleNewText}
                >
                  Try Another Text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
