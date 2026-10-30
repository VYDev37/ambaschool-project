import React, { useState } from 'react'
import {
  HiAcademicCap,
  HiVolumeUp,
  HiRefresh,
  HiPuzzle,
  HiMusicNote,
  HiLightningBolt
} from 'react-icons/hi'
import PracticeQuiz from '../components/practice/PracticeQuiz'
import PracticeListening from '../components/practice/PracticeListening'
import PracticeFlashcards from '../components/practice/PracticeFlashcards'
import PracticeMatchGame from '../components/practice/PracticeMatchGame'
import PracticeTones from '../components/practice/PracticeTones'
import { playClick } from '../utils/soundEffects'
import './PracticePage.css'

type PracticeTab = 'quiz' | 'listening' | 'flashcard' | 'matching' | 'tones'

interface TabOption {
  id: PracticeTab
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const TABS: TabOption[] = [
  { id: 'quiz', label: 'Kuis Pilihan Ganda', icon: HiAcademicCap },
  { id: 'listening', label: 'Tebak Suara', icon: HiVolumeUp },
  { id: 'flashcard', label: 'Kartu Flashcards', icon: HiRefresh },
  { id: 'matching', label: 'Jodohkan Slang Medan', icon: HiPuzzle },
  { id: 'tones', label: 'Pelatih 8 Nada', icon: HiMusicNote }
]

export default function PracticePage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<PracticeTab>('quiz')

  const handleTabClick = (tabId: PracticeTab) => {
    playClick()
    setActiveTab(tabId)
  }

  return (
    <div className="practice-page">
      {/* Hero */}
      <div className="practice-hero">
        <div className="container">
          <div className="practice-hero__content">
            <span className="practice-hero__tag">
              <HiLightningBolt /> Arena Latihan & Game Interaktif
            </span>
            <h1 className="practice-hero__title">
              Asah Kemampuan <span className="gradient-text">Hokkien Anda</span>
            </h1>
            <p className="practice-hero__subtitle">
              Pilih mode latihan seru: Kuis Pemahaman, Tebak Suara Asli, Kartu Flashcard 3D,
              Jodohkan Slang Medan, atau Pelatih 8 Nada dengan Frekuensi Web Audio!
            </p>

            {/* Mode Navigator */}
            <div className="practice-mode-nav">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`practice-mode-btn ${
                      isActive ? 'practice-mode-btn--active' : ''
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container practice-main">
        {activeTab === 'quiz' && <PracticeQuiz />}
        {activeTab === 'listening' && <PracticeListening />}
        {activeTab === 'flashcard' && <PracticeFlashcards />}
        {activeTab === 'matching' && <PracticeMatchGame />}
        {activeTab === 'tones' && <PracticeTones />}
      </div>
    </div>
  )
}
