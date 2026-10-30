import React from 'react'
import { motion, Variants } from 'framer-motion'
import {
  HiBookOpen,
  HiMicrophone,
  HiChat,
  HiAcademicCap,
  HiGlobe,
  HiSparkles
} from 'react-icons/hi'
import './Features.css'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  stat: string
}

const features: FeatureItem[] = [
  {
    icon: <HiBookOpen />,
    title: '26 Modul Kursus Interaktif',
    description:
      'Kurikulum lengkap dari dasar hingga mahir: Kopitiam Medan, negosiasi pasar, slang gaul, dan silsilah keluarga.',
    color: '#e63946',
    stat: '26 Modul'
  },
  {
    icon: <HiMicrophone />,
    title: 'Audio Synth & 8 Nada Kuno',
    description:
      'Dengarkan pengucapan asli dan latih 8 nada intonasi Minnan (termasuk Ji̍p-siaⁿ -p, -t, -k, -h) serta Tone Sandhi.',
    color: '#f0b429',
    stat: '8 Nada'
  },
  {
    icon: <HiChat />,
    title: 'Dialek Medan & Taiwan Standar',
    description:
      'Bandingkan langsung istilah otentik Medan ("Lim kún-chúi", "Pa-sat") dengan standar Kamus MoE Taiwan.',
    color: '#28c840',
    stat: '2 Dialek'
  },
  {
    icon: <HiSparkles />,
    title: 'Database 13,000+ Kosakata',
    description:
      'Kamus akbar 13,000+ entri dilengkapi ejaan POJ (Pe̍h-ōe-jī), Tâi-lô, aksara Hanji, dan contoh kalimat.',
    color: '#3b82f6',
    stat: '13K+ Kata'
  },
  {
    icon: <HiGlobe />,
    title: 'Mode Flashcard Cepat',
    description:
      'Hafalkan kosakata secara visual dan interaktif dengan mode flashcard bolak-balik berkecepatan tinggi.',
    color: '#a855f7',
    stat: '∞ Kartu'
  },
  {
    icon: <HiAcademicCap />,
    title: 'Kuis & Sistem Badge Prestasi',
    description:
      'Uji pemahaman di setiap modul dan klaim badge eksklusif seperti "Kopitiam Master" dan "Juragan Cuan".',
    color: '#ec4899',
    stat: '26 Badge'
  }
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function Features(): React.ReactElement {
  return (
    <section className="features section" id="features">
      <div className="container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="features__label">Fitur Unggulan</span>
          <h2 className="features__title">
            Semua yang Anda Butuhkan untuk{' '}
            <span className="gradient-text">Menguasai Hokkien</span>
          </h2>
          <p className="features__subtitle">
            Platform kami dirancang khusus untuk penutur Bahasa Indonesia yang ingin
            mempelajari Bahasa Hokkien dengan metode modern dan efektif.
          </p>
        </motion.div>

        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card glass card-shine"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="feature-card__top">
                <div
                  className="feature-card__icon"
                  style={{
                    background: `${feature.color}12`,
                    color: feature.color,
                    borderColor: `${feature.color}28`
                  }}
                >
                  {feature.icon}
                </div>
                <span
                  className="feature-card__stat"
                  style={{
                    color: feature.color,
                    background: `${feature.color}10`,
                    borderColor: `${feature.color}20`
                  }}
                >
                  {feature.stat}
                </span>
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
              <div
                className="feature-card__glow"
                style={{ background: feature.color }}
              />
              <div
                className="feature-card__line"
                style={{
                  background: `linear-gradient(90deg, ${feature.color}, transparent)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
