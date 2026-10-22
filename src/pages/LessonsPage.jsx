import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  HiLocationMarker
} from 'react-icons/hi'
import { coursesModules } from '../data/coursesData'
import './LessonsPage.css'

export default function LessonsPage() {
  const [selectedFilter, setSelectedFilter] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalLesson, setActiveModalLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([1])
  const [modalQuizSelected, setModalQuizSelected] = useState(null)
  const [modalQuizAnswered, setModalQuizAnswered] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState(0.85)

  const filtered = coursesModules.filter(item => {
    const matchCategory = selectedFilter === 'Semua' ||
                          (selectedFilter === 'Medan & Nusantara' && item.category.includes('Medan')) ||
                          item.category.includes(selectedFilter)
    const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.culturalNote.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchQuery
  })

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = speechSpeed
      window.speechSynthesis.speak(utterance)
    }
  }

  const openLesson = (lesson) => {
    setActiveModalLesson(lesson)
    setModalQuizSelected(null)
    setModalQuizAnswered(false)
  }

  const markCompleted = (id) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id])
    }
    setActiveModalLesson(null)
  }

  const handleQuizAnswer = (idx) => {
    if (modalQuizAnswered) return
    setModalQuizSelected(idx)
    setModalQuizAnswered(true)
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
              <HiSparkles /> Kurikulum Tematik Interaktif
            </span>
            <h1 className="lessons-hero__title">
              Kursus & Percakapan <br />
              <span className="gradient-text">Hokkien Medan & Taiwan</span>
            </h1>
            <p className="lessons-hero__subtitle">
              Kuasai percakapan nyata mulai dari budaya pesan <em>"Lim Kún-chúi"</em> di kedai kopi,
              tawar harga di pasar, bahasa gaul tongkrongan Medan, hingga kaidah 8 nada kuno Minnan.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container lessons-body">
        {/* Progress Tracker */}
        <div className="lessons-progress-summary glass">
          <div className="lessons-progress-summary__info">
            <span className="lessons-progress-summary__label">Progres Kursus Anda</span>
            <div className="lessons-progress-summary__stats">
              <strong>{completedLessons.length}</strong> dari <strong>{coursesModules.length}</strong> Modul Selesai
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
            {['Semua', 'Medan & Nusantara', 'Pasar & Transaksi', 'Ungkapan Gaul', 'Keluarga & Adat', 'Fonetik & Nada'].map((tab) => (
              <button
                key={tab}
                className={`lessons-tab ${selectedFilter === tab ? 'lessons-tab--active' : ''}`}
                onClick={() => setSelectedFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="lessons-search">
            <HiSearch className="lessons-search__icon" />
            <input
              type="text"
              placeholder="Cari modul (kuncui, pasar, gaul, nada)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lessons-search__input"
            />
          </div>
        </div>

        {/* Lesson Cards Grid */}
        <div className="lessons-grid">
          {filtered.map((item, index) => {
            const isDone = completedLessons.includes(item.id)
            const isMedan = item.category.includes('Medan')

            return (
              <motion.div
                key={item.id}
                className={`lesson-card glass ${isDone ? 'lesson-card--completed' : ''} ${isMedan ? 'lesson-card--medan' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
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

                <div className="lesson-card__badge-reward">
                  <HiBadgeCheck className="lesson-card__reward-icon" />
                  <span>Hadiah: Badge <strong>{item.badge}</strong></span>
                </div>

                <div className="lesson-card__footer">
                  <span className={`lesson-card__difficulty lesson-card__difficulty--${item.level.toLowerCase()}`}>
                    Tingkat: {item.level}
                  </span>
                  <button
                    className="lesson-card__btn"
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
          <div className="lesson-modal__backdrop" onClick={() => setActiveModalLesson(null)}>
            <motion.div
              className="lesson-modal glass"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
            >
              <div className="lesson-modal__header">
                <div>
                  <span className="lesson-modal__category">{activeModalLesson.category}</span>
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
                    onClick={() => setActiveModalLesson(null)}
                  >
                    <HiX size={24} />
                  </button>
                </div>
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

                {/* Dialogue section */}
                <div className="lesson-modal__section">
                  <h4 className="lesson-modal__sec-title">
                    <HiBookOpen /> Dialog Percakapan Interaktif
                  </h4>
                  <div className="lesson-modal__dialogues">
                    {activeModalLesson.dialogue.map((d, i) => (
                      <div key={i} className={`dialogue-bubble dialogue-bubble--${d.role.toLowerCase()}`}>
                        <div className="dialogue-bubble__speaker">{d.speaker}</div>
                        <div className="dialogue-bubble__body">
                          <span className="dialogue-bubble__chinese chinese-text">{d.hanji}</span>
                          <span className="dialogue-bubble__poj">{d.poj}</span>
                          <span className="dialogue-bubble__meaning">"{d.indo}"</span>
                        </div>
                        <button
                          className="dialogue-bubble__audio-btn"
                          onClick={() => handleSpeak(d.hanji)}
                          title="Dengar pelafalan"
                        >
                          <HiVolumeUp size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="lesson-modal__section">
                  <h4 className="lesson-modal__sec-title">Kosakata Inti Modul Ini</h4>
                  <div className="lesson-modal__vocab-grid">
                    {activeModalLesson.vocab.map((v, i) => (
                      <div key={i} className="lesson-modal__vocab-item">
                        <span className="chinese-text">{v.hanji}</span>
                        <div className="lesson-modal__vocab-info">
                          <strong>{v.poj}</strong>
                          <small>{v.indo}</small>
                        </div>
                        <button
                          className="lesson-modal__vocab-sound"
                          onClick={() => handleSpeak(v.hanji)}
                          title="Putar suara"
                        >
                          <HiVolumeUp />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Quiz Challenge */}
                {activeModalLesson.quiz && (
                  <div className="lesson-modal__quiz-box">
                    <h4 className="lesson-modal__quiz-title">
                      🎯 Tantangan Pemahaman Modul
                    </h4>
                    <p className="lesson-modal__quiz-q">{activeModalLesson.quiz.question}</p>
                    <div className="lesson-modal__quiz-opts">
                      {activeModalLesson.quiz.options.map((opt, oi) => {
                        let optStyle = 'lesson-quiz-opt'
                        if (modalQuizAnswered) {
                          if (oi === activeModalLesson.quiz.correct) {
                            optStyle += ' lesson-quiz-opt--correct'
                          } else if (oi === modalQuizSelected) {
                            optStyle += ' lesson-quiz-opt--wrong'
                          }
                        }

                        return (
                          <button
                            key={oi}
                            className={optStyle}
                            onClick={() => handleQuizAnswer(oi)}
                            disabled={modalQuizAnswered}
                          >
                            <span>{String.fromCharCode(65 + oi)}.</span>
                            <span>{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                    {modalQuizAnswered && (
                      <motion.div
                        className="lesson-quiz-exp"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        💡 {activeModalLesson.quiz.explanation}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div className="lesson-modal__footer">
                <button
                  className="lesson-modal__complete-btn"
                  onClick={() => markCompleted(activeModalLesson.id)}
                >
                  <HiCheckCircle size={20} />
                  <span>Selesaikan Modul & Raih Badge!</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
