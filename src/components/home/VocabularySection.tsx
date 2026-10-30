import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiArrowRight,
  HiSparkles,
  HiSearch,
  HiBookOpen
} from 'react-icons/hi'
import { playClick, playFlip, playSuccess } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'
import { useDebounce } from '../../hooks/useDebounce'
import {
  curatedCategories,
  curatedVocabulary,
  CuratedWord
} from '../../data/curatedVocabulary'
import { VocabularySectionCard } from './VocabularySectionCard'
import { useUserProgressStore } from '../../store/UserProgressStore'
import './VocabularySection.css'

export default function VocabularySection(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchWord, setSearchWord] = useState('')
  const debouncedSearch = useDebounce(searchWord, 200)
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})
  const [speakingWord, setSpeakingWord] = useState<string | null>(null)
  const [speechRate, setSpeechRate] = useState(0.82)

  const isWordSaved = useUserProgressStore((state) => state.isWordSaved)
  const toggleSaveWord = useUserProgressStore((state) => state.toggleSaveWord)

  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return curatedVocabulary.filter((word) => {
      const isFav = isWordSaved(word.hokkien)
      if (activeCategory === 'Favorit Saya' && !isFav) return false
      if (
        activeCategory !== 'Semua' &&
        activeCategory !== 'Favorit Saya' &&
        word.category !== activeCategory
      ) {
        return false
      }

      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase()
        return (
          word.chinese.includes(q) ||
          word.hokkien.toLowerCase().includes(q) ||
          word.indo.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [activeCategory, debouncedSearch, isWordSaved])

  const toggleFlip = (key: string) => {
    playFlip()
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const speak = (e: React.MouseEvent, text: string, key: string) => {
    e.stopPropagation()
    setSpeakingWord(key)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-TW'
      u.rate = speechRate
      u.onend = () => setSpeakingWord(null)
      u.onerror = () => setSpeakingWord(null)
      window.speechSynthesis.speak(u)
    } else {
      setTimeout(() => setSpeakingWord(null), 1000)
    }
  }

  const toggleFavorite = (e: React.MouseEvent, word: CuratedWord) => {
    e.stopPropagation()
    const willBeSaved = toggleSaveWord(word.hokkien)
    if (willBeSaved) {
      playSuccess()
      showToast(`⭐ "${word.hokkien}" disimpan ke favorit!`, 'badge', 2000)
    } else {
      playClick()
      showToast('Dihapus dari kata tersimpan', 'info', 1500)
    }
  }

  const copyWord = (e: React.MouseEvent, word: CuratedWord) => {
    e.stopPropagation()
    playClick()
    const text = `${word.chinese} (${word.hokkien}): ${word.indo}\nContoh: "${word.example}"\nCatatan: ${word.note}`
    navigator.clipboard?.writeText(text).then(() => {
      showToast(`📋 Disalin: ${word.chinese}`, 'success', 2000)
    })
  }

  return (
    <section className="vocab-section section" id="vocabulary">
      <div className="container">
        <motion.div
          className="vocab-section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="vocab-section__badge-pill">
            <HiSparkles /> 36+ Kosakata Unggulan & 13,000+ Database Lengkap
          </div>
          <h2 className="vocab-section__title">
            Kosakata Pilihan <br />
            <span className="gradient-text">Hokkien Medan & Taiwan Standar</span>
          </h2>
          <p className="vocab-section__subtitle">
            Klik kartu untuk membalik terjemahan, dengarkan pelafalan audio asli Minnan, simpan ke favorit,
            dan pelajari konteks budaya dari pesanan kopitiam <em>"Lim kún-chúi"</em> hingga etos <em>"Ài piàⁿ chiah ē iâⁿ"</em>.
          </p>

          {/* Quick inline search & Controls */}
          <div className="vocab-controls-row">
            <div className="vocab-inline-search">
              <HiSearch className="vocab-inline-search__icon" />
              <input
                type="text"
                placeholder="Cari kata: kún-chúi, thâu-ke, cuan, makan, hó-súi..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                className="vocab-inline-search__input"
              />
              {searchWord && (
                <button
                  type="button"
                  className="vocab-inline-search__clear"
                  onClick={() => setSearchWord('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Audio Speed Toggle */}
            <div className="vocab-speed-control">
              <button
                type="button"
                className={`vocab-speed-btn ${speechRate === 0.82 ? 'vocab-speed-btn--active' : ''}`}
                onClick={() => {
                  setSpeechRate(0.82)
                  playClick()
                }}
                title="Kecepatan Bicara Normal"
              >
                ⚡ 1.0x
              </button>
              <button
                type="button"
                className={`vocab-speed-btn ${speechRate === 0.65 ? 'vocab-speed-btn--active' : ''}`}
                onClick={() => {
                  setSpeechRate(0.65)
                  playClick()
                }}
                title="Kecepatan Bicara Lambat (Pemula)"
              >
                🐢 0.7x Pelan
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories Tab Navigation */}
        <div className="vocab-section__tabs">
          {curatedCategories.map((cat) => {
            const isFavTab = cat === 'Favorit Saya'

            return (
              <button
                key={cat}
                type="button"
                className={`vocab-section__tab-btn ${
                  activeCategory === cat ? 'vocab-section__tab-btn--active' : ''
                } ${isFavTab ? 'vocab-section__tab-btn--fav' : ''}`}
                onClick={() => {
                  playClick()
                  setActiveCategory(cat)
                }}
              >
                {isFavTab && '⭐ '}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Vocabulary Grid */}
        <motion.div className="vocab-section__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((word, i) => {
              const cardKey = `${word.chinese}-${word.hokkien}`
              return (
                <VocabularySectionCard
                  key={cardKey}
                  word={word}
                  index={i}
                  isFlipped={!!flipped[cardKey]}
                  isBookmarked={isWordSaved(word.hokkien)}
                  isSpeaking={speakingWord === cardKey}
                  onToggleFlip={() => toggleFlip(cardKey)}
                  onToggleBookmark={(e) => toggleFavorite(e, word)}
                  onSpeak={(e) => speak(e, word.chinese, cardKey)}
                  onCopy={(e) => copyWord(e, word)}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="vocab-section__empty">
            <p>
              Tidak ada kata yang cocok dengan <strong>"{searchWord}"</strong> di kategori{' '}
              <strong>"{activeCategory}"</strong>
            </p>
            <button
              type="button"
              className="vocab-section__reset-btn"
              onClick={() => {
                setSearchWord('')
                setActiveCategory('Semua')
              }}
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}

        {/* Explore all vocab button */}
        <motion.div
          className="vocab-section__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/vocabulary"
            className="vocab-section__cta-btn"
            onClick={() => playClick()}
          >
            <HiBookOpen />
            <span>Buka Kamus Kosakata Lengkap (13,000+ Kata)</span>
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
