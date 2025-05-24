"use client"

import { useState, useEffect, useCallback } from "react"

interface FallingWord {
  id: number
  word: string
  top: number
  left: number
}

const arabicWords = [
  "سلام",
  "كتاب",
  "قلم",
  "مدرسة",
  "بيت",
  "شمس",
  "قمر",
  "نجم",
  "ماء",
  "طعام"
]

export default function GamesPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [currentInput, setCurrentInput] = useState("")
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([])
  const [gameSpeed, setGameSpeed] = useState(50) // Lower is faster
  const [gameOver, setGameOver] = useState(false)

  const addNewWord = useCallback(() => {
    if (fallingWords.length < 5) {
      const newWord = {
        id: Date.now(),
        word: arabicWords[Math.floor(Math.random() * arabicWords.length)],
        top: 0,
        left: Math.random() * (window.innerWidth - 200) // Avoid words going off-screen
      }
      setFallingWords(prev => [...prev, newWord])
    }
  }, [fallingWords.length])

  const removeWord = useCallback((id: number) => {
    setFallingWords(prev => prev.filter(word => word.id !== id))
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentInput(value)

    // Check if input matches any falling word
    const matchedWord = fallingWords.find(word => word.word === value)
    if (matchedWord) {
      setScore(prev => prev + 10)
      removeWord(matchedWord.id)
      setCurrentInput("")
      // Increase game speed every 50 points
      if (score > 0 && score % 50 === 0) {
        setGameSpeed(prev => Math.max(prev - 5, 20))
      }
    }
  }

  useEffect(() => {
    if (!gameStarted || gameOver) return

    // Add new words periodically
    const wordInterval = setInterval(addNewWord, 2000)

    // Move words down
    const gameInterval = setInterval(() => {
      setFallingWords(prev => {
        const newWords = prev.map(word => ({
          ...word,
          top: word.top + 1
        }))

        // Check for words that hit the bottom
        newWords.forEach(word => {
          if (word.top > 400) { // Adjust based on game container height
            removeWord(word.id)
            setLives(prev => {
              const newLives = prev - 1
              if (newLives <= 0) {
                setGameOver(true)
              }
              return newLives
            })
          }
        })

        return newWords
      })
    }, gameSpeed)

    return () => {
      clearInterval(wordInterval)
      clearInterval(gameInterval)
    }
  }, [gameStarted, gameOver, gameSpeed, addNewWord, removeWord])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setLives(3)
    setFallingWords([])
    setGameOver(false)
    setGameSpeed(50)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Arabic Typing Games</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Falling Words</h2>
            <p className="text-gray-600">
              Type the falling Arabic words before they reach the bottom!
            </p>
          </div>

          {!gameStarted || gameOver ? (
            <div className="text-center">
              {gameOver && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                  <p className="text-lg">Final Score: {score}</p>
                </div>
              )}
              <button 
                onClick={startGame}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                {gameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-4">
                <div className="text-lg font-bold">Score: {score}</div>
                <div className="text-lg font-bold">Lives: {"❤️".repeat(lives)}</div>
              </div>

              <div 
                className="relative w-full h-[400px] border-2 border-gray-200 rounded-lg mb-4 overflow-hidden"
                style={{ direction: "rtl" }}
              >
                {fallingWords.map(word => (
                  <div
                    key={word.id}
                    className="absolute text-xl font-arabic"
                    style={{
                      top: `${word.top}px`,
                      right: `${word.left}px`,
                    }}
                  >
                    {word.word}
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <input
                  type="text"
                  value={currentInput}
                  onChange={handleInput}
                  className="w-full max-w-md p-4 text-right text-xl font-arabic border rounded-lg"
                  dir="rtl"
                  placeholder="اكتب هنا..."
                  autoFocus
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
