import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiLocationMarker } from 'react-icons/hi'
import { slangPairs, SlangPair } from '../../data/practiceData'
import { triggerConfetti } from '../../utils/confetti'
import { playSuccess, playIncorrect, playFanfare, playClick } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

export default function PracticeMatchGame(): React.ReactElement {
  const [selectedHokkien, setSelectedHokkien] = useState<SlangPair | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])

  const { showToast } = useToast()

  const handleHokkienClick = (item: SlangPair) => {
    if (matchedPairs.includes(item.id)) return
    playClick()
    setSelectedHokkien(item)
  }

  const handleMeaningClick = (item: SlangPair) => {
    if (!selectedHokkien) return

    if (selectedHokkien.id === item.id) {
      playSuccess()
      const newMatched = [...matchedPairs, item.id]
      setMatchedPairs(newMatched)
      setSelectedHokkien(null)

      if (newMatched.length === slangPairs.length) {
        triggerConfetti()
        playFanfare()
        showToast('Luar Biasa! Semua slang Medan sukses dicocokkan!', 'badge', 4000)
      } else {
        showToast(`Cocok: ${selectedHokkien.hokkien}`, 'success', 1200)
      }
    } else {
      playIncorrect()
      setSelectedHokkien(null)
      showToast('Kurang tepat, coba lagi ya!', 'error', 1200)
    }
  }

  const handleReset = () => {
    setMatchedPairs([])
    setSelectedHokkien(null)
  }

  return (
    <div className="matching-container glass">
      <div className="matching-header">
        <HiLocationMarker className="matching-icon" />
        <div>
          <h3>Game Jodohkan Slang Hokkien Medan</h3>
          <p>Klik kata Hokkien di sebelah kiri, lalu klik arti padanannya di sebelah kanan!</p>
        </div>
      </div>

      <div className="matching-board">
        <div className="matching-col">
          <span className="matching-col-title">Istilah Medan</span>
          {slangPairs.map((item) => {
            const isDone = matchedPairs.includes(item.id)
            const isSelected = selectedHokkien?.id === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`matching-btn ${
                  isSelected ? 'matching-btn--selected' : ''
                } ${isDone ? 'matching-btn--done' : ''}`}
                onClick={() => handleHokkienClick(item)}
                disabled={isDone}
              >
                {item.hokkien}
              </button>
            )
          })}
        </div>

        <div className="matching-col">
          <span className="matching-col-title">Arti Makna</span>
          {slangPairs.map((item) => {
            const isDone = matchedPairs.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                className={`matching-btn matching-btn--meaning ${
                  isDone ? 'matching-btn--done' : ''
                }`}
                onClick={() => handleMeaningClick(item)}
                disabled={isDone}
              >
                {item.match}
              </button>
            )
          })}
        </div>
      </div>

      {matchedPairs.length === slangPairs.length && (
        <motion.div
          className="matching-won glass"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🎉 Hebat Sekali! Semua pasangan slang Medan berhasil dijodohkan dengan sempurna!
          <button
            type="button"
            className="matching-reset-btn"
            onClick={handleReset}
          >
            Main Lagi
          </button>
        </motion.div>
      )}
    </div>
  )
}
