import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  HiBookOpen,
  HiArrowRight,
  HiSparkles,
  HiBadgeCheck,
  HiClock,
  HiPlay,
  HiCheckCircle
} from 'react-icons/hi'
import { coursesModules } from '../../data/coursesData'
import {
  useUserProgressStore,
  selectCompletedLessonIds
} from '../../store/UserProgressStore'
import { playClick } from '../../utils/soundEffects'
import './LessonPreview.css'

const previewCategories = [
  'Semua Track',
  'Medan & Nusantara',
  'Pasar & Transaksi',
  'Kuliner & Restoran',
  'Fonetik & Nada',
  'Keluarga & Adat'
]

export default function LessonPreview(): React.ReactElement {
  const [activeTab, setActiveTab] = useState('Semua Track')
  const completedList = useUserProgressStore(selectCompletedLessonIds)
  const navigate = useNavigate()

  const displayedLessons = coursesModules
    .filter((lesson) => {
      if (activeTab === 'Semua Track') return true
      if (activeTab === 'Medan & Nusantara') return lesson.category.includes('Medan')
      return lesson.category === activeTab
    })
    .slice(0, 6)

  const handleStartCourse = (lessonId: number) => {
    playClick()
    navigate(`/lessons?moduleId=${lessonId}`)
  }

  const completedCount = completedList.length
  const totalModules = coursesModules.length
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / totalModules) * 100)
  )

  return (
    <section className="lesson-preview section" id="lessons">
      <div className="container">
        <motion.div
          className="lesson-preview__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="lesson-preview__tag">
            <HiSparkles /> 26 Modul Kurikulum Akbar Berstandar
          </div>
          <h2 className="lesson-preview__title">
            Kurikulum Pembelajaran <br />
            <span className="gradient-text">Otentik & Terstruktur</span>
          </h2>
          <p className="lesson-preview__subtitle">
            Dari adab kopitiam Medan memesan <em>"Lim kún-chúi"</em>, tawar-menawar di pasar tradisional,
            hingga 8 nada kuno Minnan dengan latihan dialog dan kuis interaktif berhadiah badge.
          </p>

          {/* Module Progress Bar */}
          <div className="lesson-preview__progress-box">
            <div className="lesson-preview__progress-meta">
              <span>Kemajuan Kurikulum Anda:</span>
              <strong>
                {completedCount} dari {totalModules} Modul Diselesaikan ({progressPercent}%)
              </strong>
            </div>
            <div className="lesson-preview__progress-track">
              <div
                className="lesson-preview__progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Track selector filter tabs */}
          <div className="lesson-preview__tabs">
            {previewCategories.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`lesson-preview__tab-btn ${
                  activeTab === tab ? 'lesson-preview__tab-btn--active' : ''
                }`}
                onClick={() => {
                  playClick()
                  setActiveTab(tab)
                }}
              >
                {tab === 'Medan & Nusantara' && '🇮🇩 '}
                {tab === 'Pasar & Transaksi' && '🏪 '}
                {tab === 'Kuliner & Restoran' && '🍜 '}
                {tab === 'Fonetik & Nada' && '🎶 '}
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Courses Grid */}
        <div className="lesson-preview__grid">
          <AnimatePresence mode="popLayout">
            {displayedLessons.map((lesson, idx) => {
              const isMedan =
                lesson.category.includes('Medan') || lesson.track?.includes('Medan')
              const isDone = completedList.includes(lesson.id)

              return (
                <motion.div
                  key={lesson.id}
                  className={`lesson-card-preview glass ${
                    isMedan ? 'lesson-card-preview--medan' : ''
                  } ${isDone ? 'lesson-card-preview--done' : ''}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                >
                  <div className="lesson-card-preview__top">
                    <span className="lesson-card-preview__track">
                      {isMedan && '🇮🇩 '}
                      {lesson.category}
                    </span>
                    <div className="lesson-card-preview__top-right">
                      {isDone ? (
                        <span className="lesson-card-preview__done-badge">
                          <HiCheckCircle /> Selesai
                        </span>
                      ) : (
                        <span className="lesson-card-preview__duration">
                          <HiClock /> {lesson.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="lesson-card-preview__title">{lesson.title}</h3>
                  <p className="lesson-card-preview__desc">{lesson.subtitle}</p>

                  <div className="lesson-card-preview__cultural-note">
                    <strong>Wawasan Budaya:</strong> {lesson.culturalNote.slice(0, 110)}...
                  </div>

                  <div className="lesson-card-preview__badge-reward">
                    <HiBadgeCheck className="lesson-card-preview__badge-icon" />
                    <span>
                      Reward: Badge <strong>{lesson.badge}</strong>
                    </span>
                  </div>

                  <div className="lesson-card-preview__footer">
                    <span
                      className={`lesson-card-preview__level lesson-card-preview__level--${lesson.level.toLowerCase()}`}
                    >
                      {lesson.level}
                    </span>

                    <button
                      type="button"
                      className={`lesson-card-preview__action-btn ${
                        isDone ? 'lesson-card-preview__action-btn--review' : ''
                      }`}
                      onClick={() => handleStartCourse(lesson.id)}
                    >
                      <HiPlay />
                      <span>{isDone ? 'Ulangi Modul' : 'Mulai Modul'}</span>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View all 26 courses CTA */}
        <motion.div
          className="lesson-preview__action"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/lessons"
            className="lesson-preview__btn"
            onClick={() => playClick()}
          >
            <HiBookOpen />
            <span>Lihat Semua 26 Modul Kursus & Jalur Belajar</span>
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
