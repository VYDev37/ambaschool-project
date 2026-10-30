import React, { useState } from 'react'
import { HiVolumeUp } from 'react-icons/hi'
import { flashcards } from '../../data/practiceData'
import { triggerConfetti } from '../../utils/confetti'
import { playSuccess, playFanfare, playClick, playFlip } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

export default function PracticeFlashcards(): React.ReactElement {
  const [fcIndex, setFcIndex] = useState<number>(0)
  const [fcFlipped, setFcFlipped] = useState<boolean>(false)
  const [knownCount, setKnownCount] = useState<number>(0)

  const { showToast } = useToast()

  const speakText = (txt: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(txt)
      u.lang = 'zh-TW'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    }
  }

  const handleReview = () => {
    playClick()
    setFcFlipped(false)
    setTimeout(() => setFcIndex((prev) => (prev + 1) % flashcards.length), 200)
  }

  const handleKnown = () => {
    playSuccess()
    const nextCount = knownCount + 1
    setKnownCount(nextCount)
    setFcFlipped(false)
    showToast(`⭐ "${flashcards[fcIndex].hanji}" ditandai hafal!`, 'success', 1500)
    if (nextCount === flashcards.length) {
      triggerConfetti()
      playFanfare()
      showToast('🎉 Selamat! Semua kartu flashcard berhasil dihafal!', 'badge', 3500)
    }
    setTimeout(() => setFcIndex((prev) => (prev + 1) % flashcards.length), 200)
  }

  return (
    <div className="fc-container">
      <div className="fc-meta">
        <span>Kartu {fcIndex + 1} dari {flashcards.length}</span>
        <span className="fc-known">Hafal: {knownCount}</span>
      </div>

      <div
        className={`fc-card glass ${fcFlipped ? 'fc-card--flipped' : ''}`}
        onClick={() => {
          playFlip()
          setFcFlipped(!fcFlipped)
        }}
      >
        <div className="fc-card__inner">
          <div className="fc-card__front">
            <span className="fc-card__hanji chinese-text">{flashcards[fcIndex].hanji}</span>
            <span className="fc-card__poj">{flashcards[fcIndex].poj}</span>
            <button
              type="button"
              className="fc-card__audio"
              onClick={(e) => {
                e.stopPropagation()
                speakText(flashcards[fcIndex].hanji)
              }}
            >
              <HiVolumeUp size={20} />
            </button>
            <span className="fc-card__tap-hint">Ketuk kartu untuk melihat arti</span>
          </div>

          <div className="fc-card__back">
            <span className="fc-card__indo">{flashcards[fcIndex].indo}</span>
            <p className="fc-card__tip">💡 {flashcards[fcIndex].tip}</p>
            <span className="fc-card__tap-hint">Ketuk untuk membalik kembali</span>
          </div>
        </div>
      </div>

      <div className="fc-actions">
        <button
          type="button"
          className="fc-btn fc-btn--review"
          onClick={handleReview}
        >
          Belum Hafal
        </button>
        <button
          type="button"
          className="fc-btn fc-btn--known"
          onClick={handleKnown}
        >
          Sudah Hafal ✓
        </button>
      </div>
    </div>
  )
}
