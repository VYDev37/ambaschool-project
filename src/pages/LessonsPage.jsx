import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  HiBookOpen,
  HiCheckCircle,
  HiPlay,
  HiVolumeUp,
  HiX,
  HiSearch,
  HiSparkles,
  HiLightBulb,
  HiBadgeCheck,
  HiLocationMarker,
  HiClipboardCopy,
  HiCheck,
  HiAcademicCap,
  HiRefresh
} from 'react-icons/hi'
import { coursesModules } from '../data/coursesData'

import { triggerConfetti } from '../utils/confetti'
import { playSuccess, playIncorrect, playFanfare, playClick } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './LessonsPage.css'


const categoryTabs = [
  'Semua',
  'Medan & Nusantara',
  'Pasar & Transaksi',
  'Ungkapan Gaul',
  'Kuliner & Restoran',
  'Keluarga & Adat',
  'Fonetik & Nada',
  'Kota & Perjalanan',
  'Darurat & Kesehatan'
]

export default function LessonsPage() {
  const [searchParams] = useSearchParams()
  const { showToast } = useToast()
  const [selectedFilter, setSelectedFilter] = useState('Semua')

  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalLesson, setActiveModalLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('hokkien_completed_lessons')
      return saved ? JSON.parse(saved) : [1]
    } catch {
      return [1]
    }
  })
  const [modalTab, setModalTab] = useState('dialogue') // 'dialogue' | 'vocab' | 'quiz'
  const [modalQuizSelected, setModalQuizSelected] = useState(null)
  const [modalQuizAnswered, setModalQuizAnswered] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState(0.85)
  const [activeSpeakingTurn, setActiveSpeakingTurn] = useState(null)
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [copiedVocab, setCopiedVocab] = useState(null)

  // Save progress
  useEffect(() => {
    localStorage.setItem('hokkien_completed_lessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  // Open lesson from query param
  useEffect(() => {
    const moduleId = searchParams.get('moduleId')
    if (moduleId) {
      const found = coursesModules.find(m => m.id === parseInt(moduleId))
      if (found) {
        openLesson(found)
      }
    }
  }, [searchParams])

  const filtered = coursesModules.filter(item => {
    const matchCategory = selectedFilter === 'Semua' ||
                          (selectedFilter === 'Medan & Nusantara' && item.category.includes('Medan')) ||
                          item.category === selectedFilter ||
                          item.track?.includes(selectedFilter)
    const matchQuery = !searchQuery.trim() ||
                       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.culturalNote.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchQuery
  })

  const handleSpeak = (text, turnIndex = null) => {
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

  const handlePlayAllDialogue = (dialogues) => {
    if (!('speechSynthesis' in window) || dialogues.length === 0) return
    window.speechSynthesis.cancel()
    setIsPlayingAll(true)

    let current = 0
    const playNext = () => {
      if (current >= dialogues.length) {
        setIsPlayingAll(false)
        setActiveSpeakingTurn(null)
        return
      }

      const d = dialogues[current]
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

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlayingAll(false)
    setActiveSpeakingTurn(null)
  }

  const openLesson = (lesson) => {
    playClick()
    stopAudio()
    setActiveModalLesson(lesson)
    setModalTab('dialogue')
    setModalQuizSelected(null)
    setModalQuizAnswered(false)
  }

  const markCompleted = (id) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id])
      triggerConfetti()
      playFanfare()
      showToast(`🎉 Selamat! Modul telah diselesaikan. Badge "${activeModalLesson?.badge || 'Selesai'}" terbuka!`, 'badge', 3500)
    } else {
      playSuccess()
      showToast('✅ Modul selesai ditinjau ulang.', 'success', 2000)
    }
    setActiveModalLesson(null)
    stopAudio()
  }

  const handleQuizAnswer = (idx) => {
    if (modalQuizAnswered) return
    setModalQuizSelected(idx)
    setModalQuizAnswered(true)
    const isCorrect = idx === activeModalLesson?.quiz?.correct
    if (isCorrect) {
      playSuccess()
      showToast('✨ Jawaban Benar!', 'success', 1500)
    } else {
      playIncorrect()
      showToast('❌ Jawaban belum tepat.', 'error', 1500)
    }
  }

  const copyVocab = (text, idx) => {
    playClick()
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedVocab(idx)
      showToast(`📋 Disalin: ${text}`, 'success', 1500)
      setTimeout(() => setCopiedVocab(null), 1500)
    })
  }


  return (
    <div className="lessons-page">
      {/* Hero Header */}
      <div className="lessons-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lessons-hero__content"
          >
            <span className="lessons-hero__tag">
              <HiSparkles /> Kurikulum Akbar 26 Modul Terstruktur
            </span>
            <h1 className="lessons-hero__title">
              Kursus & Percakapan <br />
              <span className="gradient-text">Hokkien Medan & Taiwan</span>
            </h1>
            <p className="lessons-hero__subtitle">
              Kuasai percakapan nyata mulai dari budaya pesan <em>"Lim Kún-chúi"</em> di kedai kopi,
              tawar harga di pasar, bahasa gaul Medan, hingga kaidah 8 nada kuno Minnan dengan audio & kuis.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container lessons-body">
        {/* Progress Tracker Summary */}
        <div className="lessons-progress-summary glass">
          <div className="lessons-progress-summary__info">
            <span className="lessons-progress-summary__label">Progres Kursus Anda</span>
            <div className="lessons-progress-summary__stats">
              <strong>{completedLessons.length}</strong> dari <strong>{coursesModules.length}</strong> Modul Selesai
              <span className="lessons-progress-summary__pct">
                ({Math.round((completedLessons.length / coursesModules.length) * 100)}%)
              </span>
            </div>
          </div>
          <div className="lessons-progress-summary__bar">
            <div
              className="lessons-progress-summary__fill"
              style={{ width: `${(completedLessons.length / coursesModules.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filter bar */}
        <div className="lessons-controls">
          <div className="lessons-tabs">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                className={`lessons-tab ${selectedFilter === tab ? 'lessons-tab--active' : ''}`}
                onClick={() => setSelectedFilter(tab)}
              >
                {tab === 'Medan & Nusantara' && '🇮🇩 '}
                {tab === 'Pasar & Transaksi' && '🏪 '}
                {tab === 'Kuliner & Restoran' && '🍜 '}
                {tab === 'Fonetik & Nada' && '🎶 '}
                {tab}
              </button>
            ))}
          </div>

          <div className="lessons-search">
            <HiSearch className="lessons-search__icon" />
            <input
              type="text"
              placeholder="Cari modul (kuncui, pasar, gaul, nada, dokter, imlek)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lessons-search__input"
            />
            {searchQuery && (
              <button className="lessons-search__clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="lessons-count-label">
          Menampilkan <strong>{filtered.length}</strong> dari <strong>{coursesModules.length}</strong> Modul Pembelajaran
        </div>

        {/* Lesson Cards Grid */}
        <div className="lessons-grid">
          {filtered.map((item, index) => {
            const isDone = completedLessons.includes(item.id)
            const isMedan = item.category.includes('Medan') || item.track?.includes('Medan')

            return (
              <motion.div
                key={item.id}
                className={`lesson-card glass ${isDone ? 'lesson-card--completed' : ''} ${isMedan ? 'lesson-card--medan' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
              >
                <div className="lesson-card__top">
                  <span className="lesson-card__badge">
                    {isMedan && '🇮🇩 '}
                    {item.category}
                  </span>
                  <div className="lesson-card__meta-right">
                    <span className="lesson-card__duration">{item.duration}</span>
                    {isDone && <HiCheckCircle className="lesson-card__done-icon" title="Modul Selesai" />}
                  </div>
                </div>

                <h3 className="lesson-card__title">{item.title}</h3>
                <p className="lesson-card__desc">{item.subtitle}</p>

                <div className="lesson-card__cultural-preview">
                  <HiLightBulb className="lesson-card__cultural-bulb" />
                  <span>{item.culturalNote.slice(0, 85)}...</span>
                </div>

                <div className="lesson-card__badge-reward">
                  <HiBadgeCheck className="lesson-card__reward-icon" />
                  <span>Reward: Badge <strong>{item.badge}</strong></span>
                </div>

                <div className="lesson-card__footer">
                  <span className={`lesson-card__difficulty lesson-card__difficulty--${item.level.toLowerCase()}`}>
                    Tingkat: {item.level}
                  </span>
                  <button
                    className={`lesson-card__btn ${isDone ? 'lesson-card__btn--done' : ''}`}
                    onClick={() => openLesson(item)}
                  >
                    <HiPlay />
                    <span>{isDone ? 'Buka Ulang' : 'Mulai Belajar'}</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lesson Interactive Dialog Modal */}
      <AnimatePresence>
        {activeModalLesson && (
          <div className="lesson-modal__backdrop" onClick={() => { setActiveModalLesson(null); stopAudio() }}>
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
                    {activeModalLesson.category.includes('Medan') && '🇮🇩 '}
                    {activeModalLesson.category} • Tingkat {activeModalLesson.level}
                  </span>
                  <h2 className="lesson-modal__title">{activeModalLesson.title}</h2>
                </div>
                <div className="lesson-modal__header-actions">
                  {/* Speed switch */}
                  <div className="speech-speed-selector">
                    <button
                      className={`speech-speed-btn ${speechSpeed === 0.7 ? 'speech-speed-btn--active' : ''}`}
                      onClick={() => setSpeechSpeed(0.7)}
                    >
                      0.7x Pelan
                    </button>
                    <button
                      className={`speech-speed-btn ${speechSpeed === 0.85 ? 'speech-speed-btn--active' : ''}`}
                      onClick={() => setSpeechSpeed(0.85)}
                    >
                      1.0x Normal
                    </button>
                  </div>
                  <button
                    className="lesson-modal__close"
                    onClick={() => { setActiveModalLesson(null); stopAudio() }}
                  >
                    <HiX size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Sub-Tabs */}
              <div className="lesson-modal__subtabs">
                <button
                  className={`lesson-modal__subtab ${modalTab === 'dialogue' ? 'lesson-modal__subtab--active' : ''}`}
                  onClick={() => setModalTab('dialogue')}
                >
                  <HiBookOpen /> Dialog Percakapan ({activeModalLesson.dialogue.length})
                </button>
                <button
                  className={`lesson-modal__subtab ${modalTab === 'vocab' ? 'lesson-modal__subtab--active' : ''}`}
                  onClick={() => setModalTab('vocab')}
                >
                  <HiSparkles /> Kosakata Kunci ({activeModalLesson.vocab.length})
                </button>
                <button
                  className={`lesson-modal__subtab ${modalTab === 'quiz' ? 'lesson-modal__subtab--active' : ''}`}
                  onClick={() => setModalTab('quiz')}
                >
                  <HiAcademicCap /> Kuis Evaluasi
                </button>
              </div>

              <div className="lesson-modal__content">
                {/* Cultural Context Insight */}
                <div className="lesson-modal__cultural-box">
                  <div className="lesson-modal__cultural-head">
                    <HiLightBulb className="lesson-modal__cultural-icon" />
                    <h4>Konteks Budaya & Pemakaian Nyata</h4>
                  </div>
                  <p>{activeModalLesson.culturalNote}</p>
                </div>

                {/* 1. DIALOGUE TAB */}
                {modalTab === 'dialogue' && (
                  <div className="lesson-modal__section">
                    <div className="dialogue-toolbar">
                      <h4 className="lesson-modal__sec-title">
                        <HiBookOpen /> Dialog Percakapan Interaktif
                      </h4>
                      <button
                        className={`dialogue-autoplay-btn ${isPlayingAll ? 'dialogue-autoplay-btn--playing' : ''}`}
                        onClick={() => {
                          if (isPlayingAll) stopAudio()
                          else handlePlayAllDialogue(activeModalLesson.dialogue)
                        }}
                      >
                        <HiVolumeUp size={18} />
                        <span>{isPlayingAll ? 'Hentikan Putar' : 'Putar Semua Dialog'}</span>
                      </button>
                    </div>

                    <div className="lesson-modal__dialogues">
                      {activeModalLesson.dialogue.map((d, i) => {
                        const isSpeaking = activeSpeakingTurn === i

                        return (
                          <div
                            key={i}
                            className={`dialogue-bubble dialogue-bubble--${d.role.toLowerCase()} ${isSpeaking ? 'dialogue-bubble--active' : ''}`}
                          >
                            <div className="dialogue-bubble__speaker">{d.speaker}</div>
                            <div className="dialogue-bubble__body">
                              <span className="dialogue-bubble__chinese chinese-text">{d.hanji}</span>
                              <span className="dialogue-bubble__poj">{d.poj}</span>
                              <span className="dialogue-bubble__meaning">"{d.indo}"</span>
                            </div>
                            <button
                              className={`dialogue-bubble__audio ${isSpeaking ? 'dialogue-bubble__audio--active' : ''}`}
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

                {/* 2. VOCABULARY TAB */}
                {modalTab === 'vocab' && (
                  <div className="lesson-modal__section">
                    <h4 className="lesson-modal__sec-title">
                      <HiSparkles /> Kosakata Penting Dalam Modul Ini
                    </h4>
                    <div className="lesson-vocab-table">
                      {activeModalLesson.vocab.map((v, i) => (
                        <div key={i} className="lesson-vocab-row">
                          <div className="lesson-vocab-row__left">
                            <span className="lesson-vocab-row__hanji chinese-text">{v.hanji}</span>
                            <span className="lesson-vocab-row__poj">{v.poj}</span>
                          </div>
                          <span className="lesson-vocab-row__indo">{v.indo}</span>
                          <div className="lesson-vocab-row__actions">
                            <button
                              className="lesson-vocab-row__btn"
                              onClick={() => handleSpeak(v.hanji)}
                              title="Dengar"
                            >
                              <HiVolumeUp size={16} />
                            </button>
                            <button
                              className="lesson-vocab-row__btn"
                              onClick={() => copyVocab(`${v.hanji} (${v.poj}) - ${v.indo}`, i)}
                              title="Salin"
                            >
                              {copiedVocab === i ? <HiCheck size={16} color="#4ade80" /> : <HiClipboardCopy size={16} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. QUIZ TAB */}
                {modalTab === 'quiz' && (
                  <div className="lesson-modal__section">
                    <h4 className="lesson-modal__sec-title">
                      <HiAcademicCap /> Kuis Pemahaman Modul
                    </h4>
                    <div className="lesson-quiz-box glass">
                      <p className="lesson-quiz-box__q">{activeModalLesson.quiz.question}</p>
                      <div className="lesson-quiz-box__options">
                        {activeModalLesson.quiz.options.map((opt, oIdx) => {
                          let optClass = 'quiz-opt-btn'
                          if (modalQuizAnswered) {
                            if (oIdx === activeModalLesson.quiz.correct) {
                              optClass += ' quiz-opt-btn--correct'
                            } else if (modalQuizSelected === oIdx) {
                              optClass += ' quiz-opt-btn--wrong'
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              className={optClass}
                              onClick={() => handleQuizAnswer(oIdx)}
                            >
                              <span className="quiz-opt-btn__letter">{String.fromCharCode(65 + oIdx)}</span>
                              <span>{opt}</span>
                            </button>
                          )
                        })}
                      </div>

                      {modalQuizAnswered && (
                        <motion.div
                          className={`lesson-quiz-feedback ${modalQuizSelected === activeModalLesson.quiz.correct ? 'lesson-quiz-feedback--correct' : 'lesson-quiz-feedback--wrong'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <strong>
                            {modalQuizSelected === activeModalLesson.quiz.correct ? '🎉 Jawaban Tepat Sekali!' : '💡 Kurang Tepat, Jangan Menyerah!'}
                          </strong>
                          <p>{activeModalLesson.quiz.explanation}</p>
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
                  <span>Selesaikan modul untuk klaim badge <strong>"{activeModalLesson.badge}"</strong></span>
                </div>
                <div className="lesson-modal__footer-btns">
                  <button
                    className="lesson-modal__btn-close"
                    onClick={() => { setActiveModalLesson(null); stopAudio() }}
                  >
                    Tutup
                  </button>
                  <button
                    className="lesson-modal__btn-complete"
                    onClick={() => markCompleted(activeModalLesson.id)}
                  >
                    <HiCheckCircle size={20} />
                    <span>Tandai Selesai & Klaim Badge</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
