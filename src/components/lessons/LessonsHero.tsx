import React from 'react'
import { motion } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi'

export const LessonsHero: React.FC = () => {
  return (
    <div className="lessons-hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lessons-hero__content"
        >
          <span className="lessons-hero__tag">
            <HiSparkles /> Kurikulum Terstruktur 26 Modul Lengkap
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
  )
}
