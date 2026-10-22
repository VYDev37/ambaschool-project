import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiPlay, HiVolumeUp, HiSparkles, HiBookOpen } from 'react-icons/hi'
import './Hero.css'

const floatingChars = ['滾水', '福建', '學習', '多謝', '閩南', '頭家', '拼贏', '合意', '感恩', '食飽']

// Animated counter hook
function useCounter(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!startOnView || !isInView) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration, startOnView])

  return [count, ref]
}

export default function Hero() {
  const [activePreview, setActivePreview] = useState(null)
  const [vocabCount, vocabRef] = useCounter(13000, 2200)
  const [moduleCount, moduleRef] = useCounter(26, 1500)
  const [toneCount, toneRef] = useCounter(8, 1200)

  const speak = (text, index) => {
    setActivePreview(index)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.85
      utterance.onend = () => setActivePreview(null)
      utterance.onerror = () => setActivePreview(null)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setActivePreview(null), 800)
    }
  }

  const previewItems = [
    { chinese: '飲滾水', pinyin: 'Lim kún-chúi', meaning: 'Minum air putih matang (Khas Medan)' },
    { chinese: '食飽未', pinyin: 'Chia̍h-pá--bē', meaning: 'Sudah makan belum? (Apa kabar)' },
    { chinese: '頭家', pinyin: 'Thâu-ke', meaning: 'Bos / Pemilik kedai / Tauke' },
    { chinese: '愛拼才會贏', pinyin: 'Ài piàⁿ chiah ē iâⁿ', meaning: 'Berjuang keras baru bisa menang' },
  ]

  return (
    <section className="hero" id="hero">
      {/* Background decorative elements */}
      <div className="hero__bg-pattern" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__glow hero__glow--3" />

      {/* Animated orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      {/* Floating Chinese characters */}
      <div className="hero__floating-chars">
        {floatingChars.map((char, i) => (
          <motion.span
            key={i}
            className="hero__float-char chinese-text"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.02, 0.07, 0.02],
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 5 : -5), 0],
            }}
            transition={{
              duration: 6 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut',
            }}
            style={{
              left: `${4 + i * 10}%`,
              top: `${12 + (i % 4) * 22}%`,
              fontSize: `${2.2 + (i % 3) * 1.8}rem`,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__badge-dot" />
          <span>Platform Belajar Bahasa Hokkien #1 di Indonesia • 13,000+ Kosakata & 26 Kursus</span>
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
              <motion.path
                d="M2 10C50 4 150 2 298 6"
                stroke="url(#grad)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#e63946" />
                  <stop offset="100%" stopColor="#f0b429" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <br />
          <span className="hero__title-sub">Medan & Taiwan Standar</span>
        </motion.h1>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Pelajari bahasa Hokkien (Minnan) secara mudah dan interaktif. Dari tuturan otentik
          sehari-hari di Medan seperti <em>"Lim Kún-chúi"</em> (minum air masak) dan <em>"Thâu-ke"</em>, hingga
          13,000+ entri baku Kamus Taiwan dengan audio asli, 26 kurikulum kursus, dan kuis nada interaktif.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link to="/lessons" className="hero__btn hero__btn--primary">
            <HiPlay />
            <span>Mulai 26 Kursus Interaktif</span>
            <HiArrowRight className="hero__btn-arrow" />
          </Link>
          <Link to="/vocabulary" className="hero__btn hero__btn--secondary">
            <HiSparkles />
            <span>Kamus 13,000+ Kata & Flashcard</span>
          </Link>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="hero__stat" ref={vocabRef}>
            <span className="hero__stat-number">{vocabCount.toLocaleString()}+</span>
            <span className="hero__stat-label">Kosakata Lengkap</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat" ref={moduleRef}>
            <span className="hero__stat-number">{moduleCount} Modul</span>
            <span className="hero__stat-label">Kursus Interaktif</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat" ref={toneRef}>
            <span className="hero__stat-number">{toneCount} Nada</span>
            <span className="hero__stat-label">Audio Synth Minnan</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">Medan & Taiwan</span>
            <span className="hero__stat-label">Ragam Dialek Otentik</span>
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
            <span className="hero__preview-live-badge">
              <span className="hero__preview-live-dot" />
              LIVE
            </span>
          </div>
          <div className="hero__preview-body">
            {previewItems.map((item, index) => (
              <motion.div
                key={index}
                className={`hero__preview-item ${activePreview === index ? 'hero__preview-item--active' : ''}`}
                onClick={() => speak(item.chinese, index)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <span className="hero__preview-chinese chinese-text">{item.chinese}</span>
                <div className="hero__preview-info">
                  <span className="hero__preview-pinyin">{item.pinyin}</span>
                  <span className="hero__preview-meaning">{item.meaning}</span>
                </div>
                <div className={`hero__preview-audio-btn ${activePreview === index ? 'hero__preview-audio-btn--playing' : ''}`} title="Klik untuk dengar">
                  <HiVolumeUp />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
