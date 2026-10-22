import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiSearch,
  HiVolumeUp,
  HiBookmark,
  HiSparkles,
  HiInformationCircle,
  HiFilter,
  HiChevronLeft,
  HiChevronRight,
  HiLocationMarker,
  HiClipboardCopy,
  HiCheck,
  HiLightBulb,
  HiRefresh,
  HiViewGrid,
  HiCollection
} from 'react-icons/hi'
import { vocabularyList, totalVocabCount } from '../data/vocabularyData'

import { playClick, playSuccess, playFlip } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './VocabularyPage.css'


const categories = [
  'Semua',
  'Hokkien Medan Populer',
  'Kuliner & Minuman',
  'Pasar & Bisnis',
  'Sapaan & Adab',
  'Ungkapan Gaul',
  'Aktivitas & Harian',
  'Alam & Cuaca',
  'Tubuh & Kesehatan',
  'Keluarga & Silsilah',
  'Kota & Transportasi',
  'Rumah & Benda',
  'Teknologi & Modern',
  'Pepatah & Kiasan',
  'Budaya & Adat'
]

const dialects = [
  'Semua Dialek',
  'Hokkien Medan & Nusantara',
  'Taiwan Standar'
]

const toneFilters = [
  'Semua Nada',
  'Nada 1',
  'Nada 2',
  'Nada 3',
  'Nada 4',
  'Nada 5',
  'Nada 7',
  'Nada 8'
]

const PAGE_SIZE = 24

export default function VocabularyPage() {
  const { showToast } = useToast()
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'flashcard'

  const [selectedCat, setSelectedCat] = useState('Semua')
  const [selectedDialect, setSelectedDialect] = useState('Semua Dialek')
  const [selectedTone, setSelectedTone] = useState('Semua Nada')
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [savedWords, setSavedWords] = useState(() => {
    try {
      const saved = localStorage.getItem('hokkien_saved_words')
      return saved ? JSON.parse(saved) : ['Kún-chúi', 'Lim kún-chúi', 'Thâu-ke', 'Pháinn-sè', 'Chin-chia̍h']
    } catch {
      return ['Kún-chúi', 'Lim kún-chúi', 'Thâu-ke', 'Pháinn-sè']
    }
  })
  const [showOnlySaved, setShowOnlySaved] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  // Flashcard mode state
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    localStorage.setItem('hokkien_saved_words', JSON.stringify(savedWords))
  }, [savedWords])

  // Filtered dataset
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase()
    return vocabularyList.filter(item => {
      // Saved filter
      if (showOnlySaved && !savedWords.includes(item.poj)) {
        return false
      }

      // Dialect filter
      if (selectedDialect !== 'Semua Dialek') {
        if (selectedDialect === 'Hokkien Medan & Nusantara') {
          if (!item.dialect.includes('Medan') && !item.dialect.includes('Nusantara') && item.dialect !== 'Keduanya') {
            return false
          }
        } else if (selectedDialect === 'Taiwan Standar') {
          if (!item.dialect.includes('Taiwan') && item.dialect !== 'Keduanya') {
            return false
          }
        }
      }

      // Category filter
      if (selectedCat === 'Hokkien Medan Populer') {
        if (!item.tags?.includes('Medan Populer') && !item.dialect.includes('Medan')) {
          return false
        }
      } else if (selectedCat !== 'Semua' && item.category !== selectedCat) {
        return false
      }

      // Tone filter
      if (selectedTone !== 'Semua Nada') {
        const toneNum = selectedTone.replace('Nada ', '')
        if (!item.tone || !item.tone.includes(toneNum)) {
          return false
        }
      }

      // Search query
      if (q) {
        const matchHanji = item.hanji.toLowerCase().includes(q)
        const matchPoj = item.poj.toLowerCase().includes(q)
        const matchTailo = item.tailo?.toLowerCase().includes(q)
        const matchIndo = item.indo.toLowerCase().includes(q)
        const matchUsage = item.usage ? item.usage.toLowerCase().includes(q) : false
        return matchHanji || matchPoj || matchTailo || matchIndo || matchUsage
      }

      return true
    })
  }, [query, selectedCat, selectedDialect, selectedTone, showOnlySaved, savedWords])

  // Pagination calculation
  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE) || 1
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredList.slice(start, start + PAGE_SIZE)
  }, [filteredList, currentPage])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 380, behavior: 'smooth' })
    }
  }

  const toggleSave = (poj) => {
    playClick()
    if (savedWords.includes(poj)) {
      setSavedWords(savedWords.filter(w => w !== poj))
      showToast('Dihapus dari kata tersimpan', 'info', 1500)
    } else {
      setSavedWords([...savedWords, poj])
      playSuccess()
      showToast(`⭐ "${poj}" disimpan ke kosakata favorit!`, 'badge', 2000)
    }
  }

  const copyWord = (text, id) => {
    playClick()
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id)
      showToast(`📋 Disalin: ${text}`, 'success', 1500)
      setTimeout(() => setCopiedId(null), 1500)
    })
  }

  const speak = (hanji) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(hanji)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.82
      window.speechSynthesis.speak(utterance)
    }
  }

  // Flashcard helpers
  const currentCard = filteredList[flashcardIdx % (filteredList.length || 1)]

  const nextCard = () => {
    playClick()
    setIsFlipped(false)
    setFlashcardIdx(prev => (prev + 1) % filteredList.length)
  }

  const prevCard = () => {
    playClick()
    setIsFlipped(false)
    setFlashcardIdx(prev => (prev - 1 + filteredList.length) % filteredList.length)
  }

  const randomCard = () => {
    playClick()
    setIsFlipped(false)
    const r = Math.floor(Math.random() * filteredList.length)
    setFlashcardIdx(r)
  }


  return (
    <div className="vocab-page">
      {/* Hero Header */}
      <div className="vocab-hero">
        <div className="container">
          <div className="vocab-hero__content">
            <span className="vocab-hero__tag">
              <HiSparkles /> Database Akbar 13,000+ Kosakata
            </span>
            <h1 className="vocab-hero__title">
              Kamus Lengkap <span className="gradient-text">Taiwan & Medan</span>
            </h1>
            <p className="vocab-hero__subtitle">
              Dari istilah baku Kamus Minnan Taiwan (臺灣閩南語常用詞辭典) hingga tuturan otentik
              Hokkien Medan, Bagansiapiapi, & Nusantara seperti <em>"Lim Kún-chúi"</em>, <em>"Chhài-thâu-kóe"</em>, dan <em>"Ko-pi-o"</em>.
            </p>

            {/* Quick stats counter */}
            <div className="vocab-stat-pills">
              <span className="vocab-stat-pill">📚 {totalVocabCount.toLocaleString()}+ Entri Kosakata</span>
              <span className="vocab-stat-pill vocab-stat-pill--medan">🇮🇩 Dialek Medan & Nusantara</span>
              <span className="vocab-stat-pill vocab-stat-pill--taiwan">🇹🇼 Standar Taiwan MoE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container vocab-main">
        {/* Medan Spotlight Banner */}
        <div className="medan-spotlight glass">
          <div className="medan-spotlight__icon">
            <HiLocationMarker size={32} />
          </div>
          <div className="medan-spotlight__body">
            <h3>Koleksi Khas Hokkien Medan & Sekitar Indonesia</h3>
            <p>
              Di Medan, istilah minum air putih disebut <strong>"Lim kún-chúi" (飲滾水)</strong> karena merujuk pada air yang sudah direbus matang.
              Temukan juga istilah populer seperti <em>Thâu-ke</em> (Tauke), <em>Chhài-thâu-kóe</em>, <em>Pháinn-sè</em>, <em>Lo̍k-kho</em>, dan <em>Chin-chia̍h</em>!
            </p>
          </div>
          <button
            className={`medan-spotlight__btn ${selectedCat === 'Hokkien Medan Populer' ? 'medan-spotlight__btn--active' : ''}`}
            onClick={() => {
              setSelectedCat('Hokkien Medan Populer')
              setSelectedDialect('Hokkien Medan & Nusantara')
              setCurrentPage(1)
            }}
          >
            Lihat Khusus Medan
          </button>
        </div>

        {/* View Mode Toggle Bar (Grid vs Flashcard) */}
        <div className="vocab-view-mode-bar">
          <div className="vocab-view-mode-tabs">
            <button
              className={`vocab-view-mode-btn ${viewMode === 'grid' ? 'vocab-view-mode-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <HiViewGrid size={18} />
              <span>Mode Daftar Kamus</span>
            </button>
            <button
              className={`vocab-view-mode-btn ${viewMode === 'flashcard' ? 'vocab-view-mode-btn--active' : ''}`}
              onClick={() => { setViewMode('flashcard'); setIsFlipped(false) }}
            >
              <HiCollection size={18} />
              <span>Mode Flashcard Latihan</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Bookmarks */}
        <div className="vocab-toolbar">
          <div className="vocab-search-row">
            <div className="vocab-search-box">
              <HiSearch className="vocab-search-box__icon" />
              <input
                type="text"
                placeholder="Cari kata: kuncui, lim, makan, cia, thau-ke, kopi, pasar..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setCurrentPage(1)
                  setFlashcardIdx(0)
                }}
                className="vocab-search-box__input"
              />
              {query && (
                <button
                  className="vocab-search-box__clear"
                  onClick={() => {
                    setQuery('')
                    setCurrentPage(1)
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dialect Selector */}
            <div className="vocab-dialect-select">
              <HiFilter className="vocab-dialect-select__icon" />
              <select
                value={selectedDialect}
                onChange={(e) => {
                  setSelectedDialect(e.target.value)
                  setCurrentPage(1)
                }}
                className="vocab-select-input"
              >
                {dialects.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Tone Selector */}
            <div className="vocab-dialect-select">
              <select
                value={selectedTone}
                onChange={(e) => {
                  setSelectedTone(e.target.value)
                  setCurrentPage(1)
                }}
                className="vocab-select-input"
              >
                {toneFilters.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Bookmark toggle button */}
            <button
              className={`vocab-saved-toggle ${showOnlySaved ? 'vocab-saved-toggle--active' : ''}`}
              onClick={() => {
                setShowOnlySaved(!showOnlySaved)
                setCurrentPage(1)
              }}
            >
              <HiBookmark />
              <span>Tersimpan ({savedWords.length})</span>
            </button>
          </div>

          {/* Categories Horizontal Carousel */}
          <div className="vocab-category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`vocab-pill ${selectedCat === cat ? 'vocab-pill--active' : ''} ${cat === 'Hokkien Medan Populer' ? 'vocab-pill--medan' : ''}`}
                onClick={() => {
                  setSelectedCat(cat)
                  setCurrentPage(1)
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filters */}
        <div className="vocab-meta-info">
          <div>
            <span>Ditemukan <strong>{filteredList.length.toLocaleString()}</strong> entri kosakata</span>
            {selectedCat !== 'Semua' && <span className="vocab-active-tag"> • {selectedCat}</span>}
            {selectedDialect !== 'Semua Dialek' && <span className="vocab-active-tag"> • {selectedDialect}</span>}
            {selectedTone !== 'Semua Nada' && <span className="vocab-active-tag"> • {selectedTone}</span>}
          </div>
          {viewMode === 'grid' && (
            <span className="vocab-page-indicator">
              Halaman {currentPage} dari {totalPages}
            </span>
          )}
        </div>

        {/* 1. FLASHCARD MODE */}
        {viewMode === 'flashcard' && currentCard && (
          <div className="flashcard-container">
            <motion.div
              key={flashcardIdx}
              className={`flashcard-box glass ${isFlipped ? 'flashcard-box--flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flashcard-box__meta">
                <span className="flashcard-box__tag">{currentCard.category}</span>
                <span className="flashcard-box__count">
                  {flashcardIdx + 1} / {filteredList.length}
                </span>
              </div>

              {!isFlipped ? (
                <div className="flashcard-box__front">
                  <span className="flashcard-box__hanji chinese-text">{currentCard.hanji}</span>
                  <button
                    className="flashcard-box__audio-btn"
                    onClick={(e) => { e.stopPropagation(); speak(currentCard.hanji) }}
                    title="Dengar pelafalan"
                  >
                    <HiVolumeUp size={24} />
                  </button>
                  <span className="flashcard-box__instruction">Ketuk kartu untuk melihat arti & cara baca</span>
                </div>
              ) : (
                <div className="flashcard-box__back">
                  <span className="flashcard-box__poj">{currentCard.poj}</span>
                  {currentCard.tailo && (
                    <span className="flashcard-box__tailo">Tâi-lô: {currentCard.tailo}</span>
                  )}
                  <h3 className="flashcard-box__indo">{currentCard.indo}</h3>
                  <div className="flashcard-box__details">
                    {currentCard.example && (
                      <p className="flashcard-box__example">Contoh: "{currentCard.example}"</p>
                    )}
                    <span className="flashcard-box__usage">{currentCard.usage}</span>
                  </div>
                  <button
                    className="flashcard-box__audio-btn"
                    onClick={(e) => { e.stopPropagation(); speak(currentCard.hanji) }}
                    title="Dengar pelafalan"
                  >
                    <HiVolumeUp size={22} />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Flashcard Controls */}
            <div className="flashcard-controls">
              <button className="flashcard-nav-btn" onClick={prevCard} disabled={filteredList.length <= 1}>
                <HiChevronLeft size={22} /> Kartu Sebelumnya
              </button>
              <button className="flashcard-shuffle-btn" onClick={randomCard} title="Kartu Acak">
                <HiRefresh size={20} /> Acak
              </button>
              <button className="flashcard-nav-btn" onClick={nextCard} disabled={filteredList.length <= 1}>
                Kartu Berikutnya <HiChevronRight size={22} />
              </button>
            </div>
          </div>
        )}

        {/* 2. GRID LIST MODE */}
        {viewMode === 'grid' && (
          <div className="vocab-cards-grid">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item, index) => {
                const isSaved = savedWords.includes(item.poj)
                const isMedan = item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')

                return (
                  <motion.div
                    key={item.id || `${item.hanji}-${index}`}
                    className={`vcard glass ${isMedan ? 'vcard--medan' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: (index % 12) * 0.02 }}
                  >
                    <div className="vcard__top">
                      <div className="vcard__badges">
                        <span className="vcard__category">{item.category}</span>
                        {isMedan && (
                          <span className="vcard__badge-medan" title="Khas Hokkien Medan & Sekitarnya">
                            🇮🇩 Medan
                          </span>
                        )}
                      </div>
                      <div className="vcard__top-actions">
                        <button
                          className="vcard__copy-btn"
                          onClick={() => copyWord(`${item.hanji} (${item.poj}) - ${item.indo}`, item.id || index)}
                          title="Salin kata"
                        >
                          {copiedId === (item.id || index) ? (
                            <HiCheck size={16} color="#4ade80" />
                          ) : (
                            <HiClipboardCopy size={16} />
                          )}
                        </button>
                        <button
                          className={`vcard__bookmark ${isSaved ? 'vcard__bookmark--active' : ''}`}
                          onClick={() => toggleSave(item.poj)}
                          title={isSaved ? 'Hapus bookmark' : 'Simpan kata'}
                        >
                          <HiBookmark />
                        </button>
                      </div>
                    </div>

                    <div className="vcard__head">
                      <span className="vcard__hanji chinese-text">{item.hanji}</span>
                      <div className="vcard__title-meta">
                        <span className="vcard__poj">{item.poj}</span>
                        {item.tailo && item.tailo !== item.poj && (
                          <span className="vcard__tailo">Tâi-lô: {item.tailo}</span>
                        )}
                        <span className="vcard__tone">{item.tone}</span>
                      </div>
                      <button
                        className="vcard__audio-btn"
                        onClick={() => speak(item.hanji)}
                        title="Dengarkan pengucapan"
                      >
                        <HiVolumeUp size={18} />
                      </button>
                    </div>

                    <div className="vcard__meaning">
                      <span className="vcard__indo">{item.indo}</span>
                    </div>

                    {item.example && (
                      <div className="vcard__example-box">
                        <span className="vcard__example-label">Contoh Kalimat:</span>
                        <p className="vcard__example-text">{item.example}</p>
                      </div>
                    )}

                    <div className="vcard__note">
                      <HiInformationCircle className="vcard__note-icon" />
                      <span>{item.usage}</span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="vocab-empty glass">
            <span className="vocab-empty__icon">🔍</span>
            <h3>Tidak ada kosakata yang cocok</h3>
            <p>Coba gunakan kata kunci lain atau reset filter kategori & nada.</p>
            <button
              className="vocab-empty__btn"
              onClick={() => {
                setQuery('')
                setSelectedCat('Semua')
                setSelectedDialect('Semua Dialek')
                setSelectedTone('Semua Nada')
                setShowOnlySaved(false)
              }}
            >
              Tampilkan Semua Kosakata
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {viewMode === 'grid' && totalPages > 1 && (
          <div className="vocab-pagination">
            <button
              className="vocab-page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft size={20} />
              <span>Sebelumnya</span>
            </button>

            <div className="vocab-page-numbers">
              {currentPage > 3 && (
                <>
                  <button className="vocab-page-num" onClick={() => handlePageChange(1)}>1</button>
                  <span className="vocab-page-dots">...</span>
                </>
              )}
              {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                .filter(p => p >= 1 && p <= totalPages)
                .map(p => (
                  <button
                    key={p}
                    className={`vocab-page-num ${p === currentPage ? 'vocab-page-num--active' : ''}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                ))}
              {currentPage < totalPages - 2 && (
                <>
                  <span className="vocab-page-dots">...</span>
                  <button className="vocab-page-num" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </>
              )}
            </div>

            <button
              className="vocab-page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Berikutnya</span>
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
