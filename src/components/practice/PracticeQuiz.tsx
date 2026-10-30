import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheck, HiX, HiRefresh } from 'react-icons/hi'
import { quizQuestions } from '../../data/practiceData'
import { triggerConfetti } from '../../utils/confetti'
import { playSuccess, playIncorrect, playFanfare, playClick } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'
import { useUserProgressStore } from '../../store/UserProgressStore'

export default function PracticeQuiz(): React.ReactElement {
  const [currentQuiz, setCurrentQuiz] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState<number>(0)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)
  const [streak, setStreak] = useState<number>(0)

  const { showToast } = useToast()
  const recordQuizCompleted = useUserProgressStore((state) => state.recordQuizCompleted)

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    const isCorrect = idx === quizQuestions[currentQuiz].correct

    if (isCorrect) {
      playSuccess()
      setScore((s) => s + 10)
      setStreak((st) => {
        const next = st + 1
        if (next >= 3) {
          showToast(`Streak ${next}x beruntun!`, 'badge', 2000)
        }
        return next
      })
    } else {
      playIncorrect()
      setStreak(0)
    }
  }

  const handleNextQuiz = () => {
    playClick()
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz((c) => c + 1)
      setSelectedAnswer(null)
    } else {
      setQuizFinished(true)
      triggerConfetti()
      playFanfare()
      recordQuizCompleted()
      showToast('Kuis Selesai! Skor tercatat di Kemajuan Belajar.', 'badge', 3500)
    }
  }

  const handleRestart = () => {
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setScore(0)
    setStreak(0)
    setQuizFinished(false)
  }

  return (
    <div className="quiz-container">
      {!quizFinished ? (
        <div className="quiz-card glass">
          <div className="quiz-header">
            <span className="quiz-counter">
              Pertanyaan {currentQuiz + 1} dari {quizQuestions.length}
            </span>
            <div className="quiz-stats">
              <span className="quiz-streak">🔥 Streak: {streak}</span>
              <span className="quiz-score">Skor: {Math.round(score)}</span>
            </div>
          </div>

          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%`
              }}
            />
          </div>

          <h2 className="quiz-question">{quizQuestions[currentQuiz].question}</h2>

          <div className="quiz-options">
            {quizQuestions[currentQuiz].options.map((opt, i) => {
              let optClass = 'quiz-option'
              if (selectedAnswer !== null) {
                if (i === quizQuestions[currentQuiz].correct) {
                  optClass += ' quiz-option--correct'
                } else if (i === selectedAnswer) {
                  optClass += ' quiz-option--wrong'
                }
              }

              return (
                <button
                  key={i}
                  type="button"
                  className={optClass}
                  onClick={() => handleSelectOption(i)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="quiz-option__letter">{String.fromCharCode(65 + i)}</span>
                  <span className="quiz-option__text">{opt}</span>
                  {selectedAnswer !== null && i === quizQuestions[currentQuiz].correct && (
                    <HiCheck className="quiz-option__icon quiz-option__icon--ok" />
                  )}
                  {selectedAnswer !== null &&
                    i === selectedAnswer &&
                    i !== quizQuestions[currentQuiz].correct && (
                      <HiX className="quiz-option__icon quiz-option__icon--fail" />
                    )}
                </button>
              )
            })}
          </div>

          {selectedAnswer !== null && (
            <motion.div
              className="quiz-feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="quiz-explanation">
                💡 {quizQuestions[currentQuiz].explanation}
              </p>
              <button
                type="button"
                className="quiz-next-btn"
                onClick={handleNextQuiz}
              >
                {currentQuiz < quizQuestions.length - 1
                  ? 'Pertanyaan Berikutnya'
                  : 'Lihat Hasil Akhir'}
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="quiz-result glass">
          <span className="quiz-result__trophy">🏆</span>
          <h2 className="quiz-result__title">Kuis Selesai!</h2>
          <p className="quiz-result__desc">
            Luar biasa! Anda telah menguasai kosakata dan ungkapan penting Hokkien Medan & Minnan.
          </p>
          <div className="quiz-result__score-badge">
            Skor Akhir: <strong>{Math.round(score)} / 200</strong>
          </div>
          <button
            type="button"
            className="quiz-restart-btn"
            onClick={handleRestart}
          >
            <HiRefresh /> Ulangi Kuis
          </button>
        </div>
      )}
    </div>
  )
}
