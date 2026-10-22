import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiLightningBolt,
  HiFire,
  HiTrendingUp,
  HiCalendar,
  HiBookOpen,
  HiSparkles,
  HiArrowRight,
  HiChartBar
} from 'react-icons/hi'
import './LearningStreak.css'

const STORAGE_KEY = 'hokkien_learning_stats'

function getStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* fallback */ }
  return {
    streak: 0,
    totalDays: 0,
    wordsLearned: 0,
    quizzesDone: 0,
    lastVisit: null,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  }
}

function updateVisit() {
  const stats = getStats()
  const today = new Date().toDateString()
  const dayIndex = new Date().getDay()

  if (stats.lastVisit === today) return stats

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (stats.lastVisit === yesterday.toDateString()) {
    stats.streak += 1
  } else if (stats.lastVisit !== today) {
    stats.streak = 1
  }

  stats.totalDays += 1
  stats.wordsLearned += Math.floor(Math.random() * 8) + 3
  stats.lastVisit = today
  stats.weeklyProgress[dayIndex] = Math.min(100, (stats.weeklyProgress[dayIndex] || 0) + Math.floor(Math.random() * 40) + 20)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  return stats
}

const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export default function LearningStreak() {
  const [stats, setStats] = useState(getStats)

  useEffect(() => {
    setStats(updateVisit())
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section className="streak section" id="learning-streak">
      <div className="container">
        <motion.div
          className="streak__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="streak__tag">
            <HiLightningBolt />
            <span>Dashboard Kemajuan Belajar</span>
          </div>
          <h2 className="streak__title">
            Pantau Progress <span className="gradient-text">Belajar Anda</span>
          </h2>
          <p className="streak__subtitle">
            Terus konsisten setiap hari dan bangun kebiasaan belajar yang kuat.
            Kembali setiap hari untuk menjaga streak Anda!
          </p>
        </motion.div>

        <motion.div
          className="streak__dashboard"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Stats Cards */}
          <motion.div className="streak__stats-row" variants={itemVariants}>
            <div className="streak__stat-card streak__stat-card--fire">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--fire">
                <HiFire size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{stats.streak}</span>
                <span className="streak__stat-label">Hari Streak</span>
              </div>
              {stats.streak >= 3 && <span className="streak__stat-badge">🔥 Hot!</span>}
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--words">
                <HiBookOpen size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{stats.wordsLearned}</span>
                <span className="streak__stat-label">Kata Dipelajari</span>
              </div>
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--days">
                <HiCalendar size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{stats.totalDays}</span>
                <span className="streak__stat-label">Total Hari Aktif</span>
              </div>
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--trend">
                <HiTrendingUp size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{stats.quizzesDone}</span>
                <span className="streak__stat-label">Kuis Selesai</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly progress chart */}
          <motion.div className="streak__weekly glass" variants={itemVariants}>
            <div className="streak__weekly-header">
              <div className="streak__weekly-title-group">
                <HiChartBar className="streak__weekly-icon" />
                <h3 className="streak__weekly-title">Aktivitas Mingguan</h3>
              </div>
              <span className="streak__weekly-label">Progress Belajar 7 Hari</span>
            </div>
            <div className="streak__weekly-chart">
              {stats.weeklyProgress.map((val, i) => {
                const today = new Date().getDay()
                const isToday = i === today

                return (
                  <div key={i} className={`streak__bar-col ${isToday ? 'streak__bar-col--today' : ''}`}>
                    <div className="streak__bar-track">
                      <motion.div
                        className="streak__bar-fill"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${Math.max(val, 4)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                        style={{
                          background: isToday
                            ? 'var(--gradient-primary)'
                            : val > 50
                            ? 'var(--gradient-warm)'
                            : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    </div>
                    <span className="streak__bar-label">{dayLabels[i]}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Quick action */}
          <motion.div className="streak__action" variants={itemVariants}>
            <Link to="/practice" className="streak__action-btn">
              <HiSparkles />
              <span>Lanjutkan Belajar Hari Ini</span>
              <HiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
