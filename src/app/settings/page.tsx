"use client"

import { useState, useEffect } from "react"
import { loadSettings, saveSettings } from "@/lib/utils"

interface Settings {
  keyboardLayout: "standard" | "phonetic"
  showVirtualKeyboard: boolean
  arabicVariant: "modern" | "classical"
  soundEnabled: boolean
  difficulty: "easy" | "normal" | "hard"
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    keyboardLayout: "standard",
    showVirtualKeyboard: true,
    arabicVariant: "modern",
    soundEnabled: true,
    difficulty: "normal"
  })

  useEffect(() => {
    const savedSettings = loadSettings()
    setSettings(savedSettings)
  }, [])

  const handleChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Settings</h1>
          <div className="text-sm text-gray-500">
            Customize your learning experience
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Keyboard Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Keyboard Layout
                  </label>
                  <select
                    value={settings.keyboardLayout}
                    onChange={(e) => handleChange("keyboardLayout", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="standard">Standard Arabic</option>
                    <option value="phonetic">Phonetic</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showKeyboard"
                    checked={settings.showVirtualKeyboard}
                    onChange={(e) => handleChange("showVirtualKeyboard", e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showKeyboard" className="text-sm">
                    Show Virtual Keyboard
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Language Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Arabic Variant
                  </label>
                  <select
                    value={settings.arabicVariant}
                    onChange={(e) => handleChange("arabicVariant", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="modern">Modern Standard Arabic</option>
                    <option value="classical">Classical Arabic</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Practice Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sound"
                    checked={settings.soundEnabled}
                    onChange={(e) => handleChange("soundEnabled", e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="sound" className="text-sm">
                    Enable Sound Effects
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
