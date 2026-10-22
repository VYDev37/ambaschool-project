import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiPlay, HiVolumeUp, HiSparkles } from 'react-icons/hi'
import './Hero.css'

const floatingChars = ['滾水', '福建', '學習', '多謝', '閩南', '頭家']

export default function Hero() {
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <section className="hero" id="hero">
      {/* Background decorative elements */}
      <div className="hero__bg-pattern" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      {/* Floating Chinese characters */}
      <div className="hero__floating-chars">
        {floatingChars.map((char, i) => (
          <motion.span
            key={i}
            className="hero__float-char chinese-text"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${8 + i * 16}%`,
              top: `${18 + (i % 3) * 26}%`,
              fontSize: `${2.8 + (i % 3) * 1.8}rem`,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__badge-dot" />
          <span>Platform Belajar Bahasa Hokkien #1 di Indonesia • Kamus 10,000+ Kosakata</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Kuasai{' '}
          <span className="hero__title-highlight">
            Bahasa Hokkien
            <svg className="hero__title-underline" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 4 150 2 298 6" stroke="url(#grad)" strokeWidth="4" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#e63946" />
                  <stop offset="100%" stopColor="#f0b429" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <br />
          Medan & Taiwan Standar
        </motion.h1>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Pelajari bahasa Hokkien (Minnan) secara mudah dan interaktif. Dari tuturan otentik
          sehari-hari di Medan seperti <em>"Lim Kún-chúi"</em> (minum air masak) dan <em>"Thâu-ke"</em>, hingga
          10,000+ entri baku Kamus Taiwan dengan audio asli dan kuis nada.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link to="/lessons" className="hero__btn hero__btn--primary">
            <span>Mulai Kursus Interaktif</span>
            <HiArrowRight />
          </Link>
          <Link to="/dictionary" className="hero__btn hero__btn--secondary">
            <HiSparkles />
            <span>Kamus 10,000+ Kata</span>
          </Link>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="hero__stat">
            <span className="hero__stat-number">10,000+</span>
            <span className="hero__stat-label">Kosakata</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">8 Nada</span>
            <span className="hero__stat-label">Audio Synth</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">Medan & Taiwan</span>
            <span className="hero__stat-label">Ragam Dialek</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">100%</span>
            <span className="hero__stat-label">Interaktif & Gratis</span>
          </div>
        </motion.div>
      </div>

      {/* Hero card preview */}
      <motion.div
        className="hero__preview container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="hero__preview-card glass">
          <div className="hero__preview-header">
            <div className="hero__preview-dots">
              <span /><span /><span />
            </div>
            <span className="hero__preview-title">Percakapan Populer Medan & Nusantara</span>
          </div>
          <div className="hero__preview-body">
            <div className="hero__preview-item" onClick={() => speak('飲滾水')}>
              <span className="hero__preview-chinese chinese-text">飲滾水</span>
              <div className="hero__preview-info">
                <span className="hero__preview-pinyin">Lim kún-chúi</span>
                <span className="hero__preview-meaning">Minum air putih matang (Khas Medan)</span>
              </div>
              <div className="hero__preview-audio-btn" title="Klik untuk dengar">
                <HiVolumeUp />
              </div>
            </div>

            <div className="hero__preview-item" onClick={() => speak('食飽未')}>
              <span className="hero__preview-chinese chinese-text">食飽未</span>
              <div className="hero__preview-info">
                <span className="hero__preview-pinyin">Chia̍h-pá--bē</span>
                <span className="hero__preview-meaning">Sudah makan belum? (Apa kabar)</span>
              </div>
              <div className="hero__preview-audio-btn" title="Klik untuk dengar">
                <HiVolumeUp />
              </div>
            </div>

            <div className="hero__preview-item" onClick={() => speak('頭家')}>
              <span className="hero__preview-chinese chinese-text">頭家</span>
              <div className="hero__preview-info">
                <span className="hero__preview-pinyin">Thâu-ke</span>
                <span className="hero__preview-meaning">Bos / Pemilik kedai / Tauke</span>
              </div>
              <div className="hero__preview-audio-btn" title="Klik untuk dengar">
                <HiVolumeUp />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
