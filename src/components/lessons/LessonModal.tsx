import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiBookOpen,
  HiCheckCircle,
  HiVolumeUp,
  HiX,
  HiSparkles,
  HiLightBulb,
  HiBadgeCheck,
  HiClipboardCopy,
  HiCheck,
  HiAcademicCap
} from 'react-icons/hi'
import { CourseModule } from '../../schemas/CourseSchema'
import { playSuccess, playIncorrect, playClick } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

interface LessonModalProps {
  lesson: CourseModule | null
  onClose: () => void
  onComplete: (id: number) => void
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onComplete
}) => {
  const { showToast } = useToast()
  const [modalTab, setModalTab] = useState<'dialogue' | 'vocab' | 'quiz'>('dialogue')
  const [quizSelected, setQuizSelected] = useState<number | null>(null)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState(0.85)
  const [activeSpeakingTurn, setActiveSpeakingTurn] = useState<number | null>(null)
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [copiedVocab, setCopiedVocab] = useState<number | null>(null)

  if (!lesson) return null

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlayingAll(false)
    setActiveSpeakingTurn(null)
  }

  const handleSpeak = (text: string, turnIndex: number | null = null) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setActiveSpeakingTurn(turnIndex)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = speechSpeed
      utterance.onend = () => setActiveSpeakingTurn(null)
      utterance.onerror = () => setActiveSpeakingTurn(null)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handlePlayAllDialogue = () => {
    if (!('speechSynthesis' in window) || lesson.dialogue.length === 0) return
    window.speechSynthesis.cancel()
    setIsPlayingAll(true)

    let current = 0
    const playNext = () => {
      if (current >= lesson.dialogue.length) {
        setIsPlayingAll(false)
        setActiveSpeakingTurn(null)
        return
      }

      const d = lesson.dialogue[current]
      setActiveSpeakingTurn(current)
      const utterance = new SpeechSynthesisUtterance(d.hanji)
      utterance.lang = 'zh-TW'
      utterance.rate = speechSpeed

      utterance.onend = () => {
        current++
        setTimeout(playNext, 600)
      }
      utterance.onerror = () => {
        setIsPlayingAll(false)
        setActiveSpeakingTurn(null)
      }

      window.speechSynthesis.speak(utterance)
    }

    playNext()
  }

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered) return
    setQuizSelected(idx)
    setQuizAnswered(true)
    const isCorrect = idx === lesson.quiz.correct
    if (isCorrect) {
      playSuccess()
      showToast('✨ Jawaban Benar!', 'success', 1500)
    } else {
      playIncorrect()
      showToast('❌ Jawaban belum tepat.', 'error', 1500)
    }
  }

  const copyVocab = (text: string, idx: number) => {
    playClick()
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedVocab(idx)
      showToast(`📋 Disalin: ${text}`, 'success', 1500)
      setTimeout(() => setCopiedVocab(null), 1500)
    })
  }

  return (
    <div
      className="lesson-modal__backdrop"
      onClick={() => {
        stopAudio()
        onClose()
      }}
    >
      <motion.div
        className="lesson-modal glass"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
      >
        {/* Modal Top Header */}
        <div className="lesson-modal__header">
          <div>
            <span className="lesson-modal__category">
              {lesson.category.includes('Medan') && '🇮🇩 '}
              {lesson.category} • Tingkat {lesson.level}
            </span>
            <h2 className="lesson-modal__title">{lesson.title}</h2>
          </div>
          <div className="lesson-modal__header-actions">
            <div className="speech-speed-selector">
              <button
                type="button"
                className={`speech-speed-btn ${
                  speechSpeed === 0.7 ? 'speech-speed-btn--active' : ''
                }`}
                onClick={() => setSpeechSpeed(0.7)}
              >
                0.7x Pelan
              </button>
              <button
                type="button"
                className={`speech-speed-btn ${
                  speechSpeed === 0.85 ? 'speech-speed-btn--active' : ''
                }`}
                onClick={() => setSpeechSpeed(0.85)}
              >
                1.0x Normal
              </button>
            </div>
            <button
              type="button"
              className="lesson-modal__close"
              onClick={() => {
                stopAudio()
                onClose()
              }}
            >
              <HiX size={24} />
            </button>
          </div>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="lesson-modal__subtabs">
          <button
            type="button"
            className={`lesson-modal__subtab ${
              modalTab === 'dialogue' ? 'lesson-modal__subtab--active' : ''
            }`}
            onClick={() => setModalTab('dialogue')}
          >
            <HiBookOpen /> Dialog Percakapan ({lesson.dialogue.length})
          </button>
          <button
            type="button"
            className={`lesson-modal__subtab ${
              modalTab === 'vocab' ? 'lesson-modal__subtab--active' : ''
            }`}
            onClick={() => setModalTab('vocab')}
          >
            <HiSparkles /> Kosakata Kunci ({lesson.vocab.length})
          </button>
          <button
            type="button"
            className={`lesson-modal__subtab ${
              modalTab === 'quiz' ? 'lesson-modal__subtab--active' : ''
            }`}
            onClick={() => setModalTab('quiz')}
          >
            <HiAcademicCap /> Kuis Evaluasi
          </button>
        </div>

        <div className="lesson-modal__content">
          {/* Cultural Context */}
          <div className="lesson-modal__cultural-box">
            <div className="lesson-modal__cultural-head">
              <HiLightBulb className="lesson-modal__cultural-icon" />
              <h4>Konteks Budaya & Pemakaian Nyata</h4>
            </div>
            <p>{lesson.culturalNote}</p>
          </div>

          {/* Dialogue Tab */}
          {modalTab === 'dialogue' && (
            <div className="lesson-modal__section">
              <div className="dialogue-toolbar">
                <h4 className="lesson-modal__sec-title">
                  <HiBookOpen /> Dialog Percakapan Interaktif
                </h4>
                <button
                  type="button"
                  className={`dialogue-autoplay-btn ${
                    isPlayingAll ? 'dialogue-autoplay-btn--playing' : ''
                  }`}
                  onClick={() => {
                    if (isPlayingAll) stopAudio()
                    else handlePlayAllDialogue()
                  }}
                >
                  <HiVolumeUp size={18} />
                  <span>{isPlayingAll ? 'Hentikan Putar' : 'Putar Semua Dialog'}</span>
                </button>
              </div>

              <div className="lesson-modal__dialogues">
                {lesson.dialogue.map((d, i) => {
                  const isSpeaking = activeSpeakingTurn === i
                  return (
                    <div
                      key={i}
                      className={`dialogue-bubble dialogue-bubble--${d.role.toLowerCase()} ${
                        isSpeaking ? 'dialogue-bubble--active' : ''
                      }`}
                    >
                      <div className="dialogue-bubble__speaker">{d.speaker}</div>
                      <div className="dialogue-bubble__body">
                        <span className="dialogue-bubble__chinese chinese-text">
                          {d.hanji}
                        </span>
                        <span className="dialogue-bubble__poj">{d.poj}</span>
                        <span className="dialogue-bubble__meaning">"{d.indo}"</span>
                      </div>
                      <button
                        type="button"
                        className={`dialogue-bubble__audio ${
                          isSpeaking ? 'dialogue-bubble__audio--active' : ''
                        }`}
                        onClick={() => handleSpeak(d.hanji, i)}
                        title="Dengar pengucapan baris ini"
                      >
                        <HiVolumeUp size={18} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Vocab Tab */}
          {modalTab === 'vocab' && (
            <div className="lesson-modal__section">
              <h4 className="lesson-modal__sec-title">
                <HiSparkles /> Kosakata Penting Dalam Modul Ini
              </h4>
              <div className="lesson-vocab-table">
                {lesson.vocab.map((v, i) => (
                  <div key={i} className="lesson-vocab-row">
                    <div className="lesson-vocab-row__left">
                      <span className="lesson-vocab-row__hanji chinese-text">
                        {v.hanji}
                      </span>
                      <span className="lesson-vocab-row__poj">{v.poj}</span>
                    </div>
                    <span className="lesson-vocab-row__indo">{v.indo}</span>
                    <div className="lesson-vocab-row__actions">
                      <button
                        type="button"
                        className="lesson-vocab-row__btn"
                        onClick={() => handleSpeak(v.hanji)}
                        title="Dengar"
                      >
                        <HiVolumeUp size={16} />
                      </button>
                      <button
                        type="button"
                        className="lesson-vocab-row__btn"
                        onClick={() =>
                          copyVocab(`${v.hanji} (${v.poj}) - ${v.indo}`, i)
                        }
                        title="Salin"
                      >
                        {copiedVocab === i ? (
                          <HiCheck size={16} color="#4ade80" />
                        ) : (
                          <HiClipboardCopy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Tab */}
          {modalTab === 'quiz' && (
            <div className="lesson-modal__section">
              <h4 className="lesson-modal__sec-title">
                <HiAcademicCap /> Kuis Pemahaman Modul
              </h4>
              <div className="lesson-quiz-box glass">
                <p className="lesson-quiz-box__q">{lesson.quiz.question}</p>
                <div className="lesson-quiz-box__options">
                  {lesson.quiz.options.map((opt, oIdx) => {
                    let optClass = 'quiz-opt-btn'
                    if (quizAnswered) {
                      if (oIdx === lesson.quiz.correct) {
                        optClass += ' quiz-opt-btn--correct'
                      } else if (quizSelected === oIdx) {
                        optClass += ' quiz-opt-btn--wrong'
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleQuizAnswer(oIdx)}
                      >
                        <span className="quiz-opt-btn__letter">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    )
                  })}
                </div>

                {quizAnswered && (
                  <motion.div
                    className={`lesson-quiz-feedback ${
                      quizSelected === lesson.quiz.correct
                        ? 'lesson-quiz-feedback--correct'
                        : 'lesson-quiz-feedback--wrong'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <strong>
                      {quizSelected === lesson.quiz.correct
                        ? '🎉 Jawaban Tepat Sekali!'
                        : '💡 Kurang Tepat, Jangan Menyerah!'}
                    </strong>
                    <p>{lesson.quiz.explanation}</p>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Completion */}
        <div className="lesson-modal__footer">
          <div className="lesson-modal__badge-info">
            <HiBadgeCheck size={24} className="lesson-modal__badge-icon" />
            <span>
              Selesaikan modul untuk klaim badge <strong>"{lesson.badge}"</strong>
            </span>
          </div>
          <div className="lesson-modal__footer-btns">
            <button
              type="button"
              className="lesson-modal__btn-close"
              onClick={() => {
                stopAudio()
                onClose()
              }}
            >
              Tutup
            </button>
            <button
              type="button"
              className="lesson-modal__btn-complete"
              onClick={() => {
                stopAudio()
                onComplete(lesson.id)
              }}
            >
              <HiCheckCircle size={20} />
              <span>Tandai Selesai & Klaim Badge</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
