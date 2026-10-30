import React, { useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiLightningBolt,
  HiFire,
  HiTrendingUp,
  HiCalendar,
  HiBookOpen,
  HiSparkles,
  HiArrowRight
} from 'react-icons/hi'
import {
  useUserProgressStore,
  selectUserStreak,
  selectTotalDays,
  selectWeeklyProgress,
  selectSavedPojList,
  selectCompletedLessonIds,
  selectQuizzesCompleted
} from '../../store/UserProgressStore'
import { WeeklyActivityChart } from './WeeklyActivityChart'
import './LearningStreak.css'

export default function LearningStreak(): React.ReactElement {
  const streak = useUserProgressStore(selectUserStreak)
  const totalDays = useUserProgressStore(selectTotalDays)
  const weeklyProgress = useUserProgressStore(selectWeeklyProgress)
  const savedPojList = useUserProgressStore(selectSavedPojList)
  const completedLessonIds = useUserProgressStore(selectCompletedLessonIds)
  const quizzesCompleted = useUserProgressStore(selectQuizzesCompleted)
  const recordDailyVisit = useUserProgressStore((state) => state.recordDailyVisit)

  useEffect(() => {
    recordDailyVisit()
  }, [recordDailyVisit])

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
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
                <span className="streak__stat-value">{streak}</span>
                <span className="streak__stat-label">Hari Streak</span>
              </div>
              {streak >= 3 && <span className="streak__stat-badge">🔥 Hot!</span>}
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--words">
                <HiBookOpen size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{savedPojList.length}</span>
                <span className="streak__stat-label">Kata Tersimpan</span>
              </div>
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--days">
                <HiCalendar size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">{totalDays}</span>
                <span className="streak__stat-label">Total Hari Aktif</span>
              </div>
            </div>

            <div className="streak__stat-card">
              <div className="streak__stat-icon-wrap streak__stat-icon-wrap--trend">
                <HiTrendingUp size={24} />
              </div>
              <div className="streak__stat-info">
                <span className="streak__stat-value">
                  {quizzesCompleted + completedLessonIds.length}
                </span>
                <span className="streak__stat-label">Aktivitas Selesai</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly progress chart */}
          <motion.div variants={itemVariants}>
            <WeeklyActivityChart weeklyProgress={weeklyProgress} />
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
