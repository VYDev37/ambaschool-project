import React, { useState } from 'react'
import { HiVolumeUp, HiRefresh } from 'react-icons/hi'
import { listeningChallenges } from '../../data/practiceData'
import { triggerConfetti } from '../../utils/confetti'
import { playSuccess, playIncorrect, playFanfare, playClick } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

export default function PracticeListening(): React.ReactElement {
  const [listenIdx, setListenIdx] = useState<number>(0)
  const [listenSelected, setListenSelected] = useState<number | null>(null)
  const [listenScore, setListenScore] = useState<number>(0)
  const [listenFinished, setListenFinished] = useState<boolean>(false)

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

  const handleSelectListening = (idx: number) => {
    if (listenSelected !== null) return
    setListenSelected(idx)
    const isCorrect = idx === listeningChallenges[listenIdx].correct

    if (isCorrect) {
      playSuccess()
      setListenScore((s) => s + 20)
      showToast('Benar! Pendengaran Anda sangat teliti.', 'success', 1500)
    } else {
      playIncorrect()
    }
  }

  const handleNextListening = () => {
    playClick()
    if (listenIdx < listeningChallenges.length - 1) {
      setListenIdx((l) => l + 1)
      setListenSelected(null)
    } else {
      setListenFinished(true)
      triggerConfetti()
      playFanfare()
      showToast('Tantangan Pendengaran Berhasil!', 'badge', 3500)
    }
  }

  const handleRestart = () => {
    setListenIdx(0)
    setListenSelected(null)
    setListenScore(0)
    setListenFinished(false)
  }

  if (listenFinished) {
    return (
      <div className="listening-container">
        <div className="quiz-result glass">
          <span className="quiz-result__trophy">🎧</span>
          <h2 className="quiz-result__title">Tantangan Audio Tuntas!</h2>
          <p className="quiz-result__desc">
            Pendengaran Anda terhadap nada dan vokal Minnan semakin tajam.
          </p>
          <div className="quiz-result__score-badge">
            Skor: <strong>{listenScore} / 240</strong>
          </div>
          <button
            type="button"
            className="quiz-restart-btn"
            onClick={handleRestart}
          >
            <HiRefresh /> Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  const activeChallenge = listeningChallenges[listenIdx]

  return (
    <div className="listening-container">
      <div className="listening-card glass">
        <span className="listening-badge">
          Tantangan Pendengaran #{listenIdx + 1}
        </span>
        <h3 className="listening-prompt">
          Dengarkan audio, lalu tebak arti katanya:
        </h3>

        <div className="listening-audio-center">
          <button
            type="button"
            className="listening-play-giant"
            onClick={() => speakText(activeChallenge.hanji)}
            title="Putar Suara"
          >
            <HiVolumeUp size={36} />
            <span>Dengar Pengucapan</span>
          </button>
          <span className="listening-hanji-hint chinese-text">
            {activeChallenge.hanji} ({activeChallenge.poj})
          </span>
        </div>

        <div className="listening-options">
          {activeChallenge.options.map((opt, oi) => {
            let btnClass = 'listening-opt'
            if (listenSelected !== null) {
              if (oi === activeChallenge.correct) {
                btnClass += ' listening-opt--correct'
              } else if (oi === listenSelected) {
                btnClass += ' listening-opt--wrong'
              }
            }

            return (
              <button
                key={oi}
                type="button"
                className={btnClass}
                onClick={() => handleSelectListening(oi)}
                disabled={listenSelected !== null}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {listenSelected !== null && (
          <button
            type="button"
            className="listening-next-btn"
            onClick={handleNextListening}
          >
            {listenIdx < listeningChallenges.length - 1
              ? 'Soal Berikutnya'
              : 'Selesai Tantangan'}
          </button>
        )}
      </div>
    </div>
  )
}
