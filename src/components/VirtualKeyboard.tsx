"use client"

import { useState } from "react"

const arabicKeyboard = [
  ["ذ", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج"],
  ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
  ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ", "د"]
]

export function VirtualKeyboard() {
  const [showKeyboard, setShowKeyboard] = useState(true)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Virtual Keyboard</h2>
        <button
          onClick={() => setShowKeyboard(!showKeyboard)}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          {showKeyboard ? "Hide" : "Show"} Keyboard
        </button>
      </div>

      {showKeyboard && (
        <div className="select-none">
          {arabicKeyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {row.map((key) => (
                <div
                  key={key}
                  className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg text-lg font-arabic cursor-pointer hover:bg-gray-100"
                >
                  {key}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
