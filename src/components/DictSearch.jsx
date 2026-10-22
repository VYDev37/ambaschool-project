import { useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiSearch,
  HiVolumeUp,
  HiArrowRight,
  HiBookOpen,
  HiSparkles,
  HiTranslate
} from 'react-icons/hi'
import { vocabularyList } from '../data/vocabularyData'
import { playClick } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './DictSearch.css'

const quickSuggestions = [
  { label: '滾水 Lim kún-chúi', query: 'kún-chúi' },
  { label: '食飽 Chia̍h-pá', query: 'chia̍h-pá' },
  { label: '頭家 Thâu-ke', query: 'thâu-ke' },
  { label: '好水 Hó-súi', query: 'hó-súi' },
  { label: '俗 Sio̍k (Murah)', query: 'sio̍k' },
  { label: '七逃 Chhit-thô (Healing)', query: 'chhit-thô' }
]

export default function DictSearch() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [playingHanji, setPlayingHanji] = useState(null)
  const inputRef = useRef(null)
  const { showToast } = useToast()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return vocabularyList
      .filter(item =>
        item.hanji.includes(q) ||
        item.poj.toLowerCase().includes(q) ||
        (item.tailo && item.tailo.toLowerCase().includes(q)) ||
        item.indo.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [query])

  const speak = (e, text) => {
    e.stopPropagation()
    e.preventDefault()
    setPlayingHanji(text)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-TW'
      u.rate = 0.82
      u.onend = () => setPlayingHanji(null)
      u.onerror = () => setPlayingHanji(null)
      window.speechSynthesis.speak(u)
    } else {
      setTimeout(() => setPlayingHanji(null), 1000)
    }
  }

  const handleSuggestionClick = (q) => {
    playClick()
    setQuery(q)
    inputRef.current?.focus()
  }

  return (
    <section className="dict-search-section section" id="dict-search">
      <div className="container">
        <motion.div
          className="dict-search-section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="dict-search-section__label">
            <HiBookOpen /> 辭典搜尋 Pencarian Kamus
          </span>
          <h2 className="dict-search-section__title">
            Cari Kata di <span className="gradient-text">Kamus 13,000+ Entri</span>
          </h2>
          <p className="dict-search-section__subtitle">
            Ketik aksara Han (漢字), romanisasi Hokkien (POJ/Tâi-lô), atau Bahasa Indonesia. 
            Dilengkapi audio pelafalan otentik & dialek Medan.
          </p>
        </motion.div>

        <motion.div
          className="dict-search-widget glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search bar */}
          <div className={`dict-search-widget__bar ${isFocused ? 'dict-search-widget__bar--focus' : ''}`}>
            <HiSearch className="dict-search-widget__icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Cari: lim kún-chúi, 食飽, makan, cantik, thâu-ke..."
              className="dict-search-widget__input"
            />
            {query && (
              <button
                className="dict-search-widget__clear"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Click Suggestion Pills */}
          <div className="dict-search-widget__pills">
            <span className="dict-search-widget__pills-label">Coba klik:</span>
            {quickSuggestions.map(sug => (
              <button
                key={sug.query}
                className="dict-search-pill"
                onClick={() => handleSuggestionClick(sug.query)}
              >
                {sug.label}
              </button>
            ))}
          </div>

          {/* Search type hints */}
          <div className="dict-search-widget__hints">
            <span className="dict-search-hint"><HiTranslate /> Hokkien (POJ/Tâi-lô)</span>
            <span className="dict-search-hint"><HiBookOpen /> 漢字 (Aksara Han)</span>
            <span className="dict-search-hint"><HiSparkles /> Bahasa Indonesia</span>
          </div>

          {/* Live results */}
          {query.trim() && results.length > 0 && (
            <div className="dict-search-widget__results">
              {results.map((item, i) => (
                <Link
                  to={`/dictionary?q=${encodeURIComponent(item.hanji)}`}
                  key={item.id || i}
                  className="dict-search-result"
                  onClick={() => playClick()}
                >
                  <div className="dict-search-result__left">
                    <span className="dict-search-result__hanji chinese-text">{item.hanji}</span>
                    <button
                      className={`dict-search-result__audio ${playingHanji === item.hanji ? 'dict-search-result__audio--active' : ''}`}
                      onClick={(e) => speak(e, item.hanji)}
                      title="Putar pengucapan"
                    >
                      <HiVolumeUp size={14} />
                    </button>
                  </div>
                  <div className="dict-search-result__mid">
                    <span className="dict-search-result__poj">{item.poj}</span>
                    {item.tailo && item.tailo !== item.poj && (
                      <span className="dict-search-result__tailo">{item.tailo}</span>
                    )}
                  </div>
                  <span className="dict-search-result__indo">{item.indo}</span>
                  {(item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')) && (
                    <span className="dict-search-result__medan" title="Dialek Medan">🇮🇩 Medan</span>
                  )}
                  <HiArrowRight className="dict-search-result__arrow" />
                </Link>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="dict-search-widget__empty">
              <span>🔍</span>
              <p>Tidak ditemukan hasil untuk "<strong>{query}</strong>"</p>
              <Link
                to={`/dictionary?q=${encodeURIComponent(query)}`}
                className="dict-search-empty-link"
              >
                Cari lebih dalam di Kamus Lengkap →
              </Link>
            </div>
          )}
        </motion.div>

        {/* CTA link to dictionary */}
        <motion.div
          className="dict-search-section__cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/dictionary"
            className="dict-search-cta-btn"
            onClick={() => playClick()}
          >
            <HiBookOpen />
            <span>Buka Kamus Lengkap — 13,000+ Kosakata</span>
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
