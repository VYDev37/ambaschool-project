import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
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
  HiChevronDown,
  HiChevronUp,
  HiLocationMarker,
  HiX,
  HiClipboardCopy,
  HiCheck,
  HiStar,
  HiBookOpen,
  HiCollection,
  HiTranslate,
  HiLightBulb,
  HiMicrophone,
  HiArrowRight,
  HiRefresh,
  HiGlobe,
  HiAcademicCap
} from 'react-icons/hi'
import { vocabularyList, totalVocabCount } from '../data/vocabularyData'
import './DictionaryPage.css'

/* ─── Search mode options (inspired by Taiwan MOE) ─── */
const searchModes = [
  { key: 'hokkien', label: 'Cari dengan Hokkien (POJ/Tâi-lô)', icon: <HiTranslate />, placeholder: 'Ketik romanisasi: lim, kún-chúi, chia̍h...' },
  { key: 'hanzi', label: 'Cari dengan Aksara Han (漢字)', icon: <HiBookOpen />, placeholder: 'Ketik aksara Tionghoa: 食飽, 滾水, 頭家...' },
  { key: 'indo', label: 'Cari dengan Bahasa Indonesia', icon: <HiGlobe />, placeholder: 'Ketik kata Indonesia: minum, makan, bos, cantik...' },
  { key: 'semua', label: 'Cari Semua Kolom', icon: <HiSearch />, placeholder: 'Cari apa saja: hokkien, hanzi, atau Indonesia...' },
]

/* ─── Category index (like 分類索引) ─── */
const categoryIndex = [
  { emoji: '🍜', name: 'Kuliner & Minuman', count: 0 },
  { emoji: '🤝', name: 'Sapaan & Adab', count: 0 },
  { emoji: '🏪', name: 'Pasar & Bisnis', count: 0 },
  { emoji: '👨‍👩‍👧‍👦', name: 'Keluarga & Silsilah', count: 0 },
  { emoji: '🗣️', name: 'Ungkapan Gaul', count: 0 },
  { emoji: '🏃', name: 'Aktivitas & Harian', count: 0 },
  { emoji: '🌤️', name: 'Alam & Cuaca', count: 0 },
  { emoji: '🏥', name: 'Tubuh & Kesehatan', count: 0 },
  { emoji: '🚗', name: 'Kota & Transportasi', count: 0 },
  { emoji: '🏠', name: 'Rumah & Benda', count: 0 },
]

/* ─── Tone index (like 聲韻調索引) ─── */
const toneGuide = [
  { tone: 1, name: 'Nada 1 (Tinggi Datar)', symbol: 'a', example: '東 tang', desc: 'Bunyi datar tinggi, seperti nada "satu" di musik. Suara stabil tanpa naik/turun.' },
  { tone: 2, name: 'Nada 2 (Turun)', symbol: 'á', example: '黨 tóng', desc: 'Suara turun dari tinggi ke rendah, mirip nada marah singkat.' },
  { tone: 3, name: 'Nada 3 (Rendah Datar)', symbol: 'à', example: '棟 tòng', desc: 'Bunyi rendah datar. Sering terdengar murung atau tenang.' },
  { tone: 4, name: 'Nada 4 (Masuk Rendah)', symbol: 'ah', example: '督 tok', desc: 'Bunyi pendek terputus di nada rendah, berakhiran -p, -t, -k, atau -h.' },
  { tone: 5, name: 'Nada 5 (Naik)', symbol: 'â', example: '同 tông', desc: 'Suara naik dari rendah ke tinggi, seperti bertanya.' },
  { tone: 7, name: 'Nada 7 (Tengah Datar)', symbol: 'ā', example: '洞 tōng', desc: 'Bunyi datar di nada menengah, stabil dan netral.' },
  { tone: 8, name: 'Nada 8 (Masuk Tinggi)', symbol: 'a̍h', example: '毒 to̍k', desc: 'Bunyi pendek terputus di nada tinggi, berakhiran -p, -t, -k, atau -h.' },
]

const PAGE_SIZE = 20

/* ─── Word of the Day (random pick) ─── */
function getWordOfDay() {
  const seed = new Date().toDateString()
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const idx = Math.abs(hash) % vocabularyList.length
  return vocabularyList[idx]
}

export default function DictionaryPage() {
  const [searchMode, setSearchMode] = useState('semua')
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState(null)
  const [savedWords, setSavedWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hokkien_saved') || '[]') } catch { return [] }
  })
  const [copiedId, setCopiedId] = useState(null)
  const [showToneGuide, setShowToneGuide] = useState(false)
  const [showCategoryIndex, setShowCategoryIndex] = useState(false)
  const [showModeDropdown, setShowModeDropdown] = useState(false)
  const searchRef = useRef(null)
  const modeRef = useRef(null)

  const wordOfDay = useMemo(() => getWordOfDay(), [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modeRef.current && !modeRef.current.contains(e.target)) {
        setShowModeDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hokkien_saved', JSON.stringify(savedWords))
  }, [savedWords])

  // Count per category
  const categoryCounts = useMemo(() => {
    const map = {}
    vocabularyList.forEach(item => {
      const cat = item.category
      map[cat] = (map[cat] || 0) + 1
    })
    return map
  }, [])

  // Filtered data
  const filteredList = useMemo(() => {
    let results = vocabularyList

    // Category filter
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory)
    }

    // Search
    const q = query.trim().toLowerCase()
    if (q) {
      results = results.filter(item => {
        switch (searchMode) {
          case 'hokkien':
            return item.poj.toLowerCase().includes(q) || (item.tailo && item.tailo.toLowerCase().includes(q))
          case 'hanzi':
            return item.hanji.includes(q)
          case 'indo':
            return item.indo.toLowerCase().includes(q) || item.usage.toLowerCase().includes(q)
          case 'semua':
          default:
            return item.hanji.includes(q) ||
              item.poj.toLowerCase().includes(q) ||
              (item.tailo && item.tailo.toLowerCase().includes(q)) ||
              item.indo.toLowerCase().includes(q) ||
              item.usage.toLowerCase().includes(q)
        }
      })
    }

    return results
  }, [query, searchMode, selectedCategory])

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE) || 1
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredList.slice(start, start + PAGE_SIZE)
  }, [filteredList, currentPage])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 420, behavior: 'smooth' })
    }
  }

  const toggleSave = useCallback((id) => {
    setSavedWords(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-TW'
      u.rate = 0.82
      window.speechSynthesis.speak(u)
    }
  }, [])

  const copyWord = useCallback((item) => {
    const text = `${item.hanji} (${item.poj}) — ${item.indo}`
    navigator.clipboard.writeText(text)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const activeMode = searchModes.find(m => m.key === searchMode)

  return (
    <div className="dict-page">
      {/* ═══ Hero Banner ═══ */}
      <div className="dict-hero">
        <div className="dict-hero__bg-orb dict-hero__bg-orb--1" />
        <div className="dict-hero__bg-orb dict-hero__bg-orb--2" />
        <div className="dict-hero__bg-orb dict-hero__bg-orb--3" />
        <div className="dict-hero__grid-pattern" />

        <div className="container dict-hero__inner">
          <motion.div
            className="dict-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="dict-hero__badge">
              <HiBookOpen />
              <span>辭典 Kamus Hokkien Indonesia — Referensi Kamus Taiwan MoE</span>
            </div>
            <h1 className="dict-hero__title">
              Kamus <span className="gradient-text">Hokkien–Indonesia</span>
              <span className="dict-hero__title-sub">
                臺灣閩南語 • Pe̍h-ōe-jī • Tâi-lô • Bahasa Indonesia
              </span>
            </h1>
            <p className="dict-hero__desc">
              Terinspirasi dari <strong>教育部臺灣台語常用詞辭典</strong> (Kamus Resmi Kementerian Pendidikan Taiwan).
              Dilengkapi <em>Pinyin (POJ & Tâi-lô)</em>, logat Hokkien Taiwan & Medan, contoh kalimat, audio pengucapan, dan indeks lengkap.
            </p>

            {/* Quick Stats */}
            <div className="dict-hero__stats">
              <div className="dict-hero__stat-chip">
                <span className="dict-hero__stat-num">{totalVocabCount.toLocaleString()}+</span>
                <span className="dict-hero__stat-lbl">Entri Kosakata</span>
              </div>
              <div className="dict-hero__stat-chip dict-hero__stat-chip--accent">
                <span className="dict-hero__stat-num">8</span>
                <span className="dict-hero__stat-lbl">Nada Hokkien</span>
              </div>
              <div className="dict-hero__stat-chip dict-hero__stat-chip--blue">
                <span className="dict-hero__stat-num">2</span>
                <span className="dict-hero__stat-lbl">Ragam Romanisasi</span>
              </div>
              <div className="dict-hero__stat-chip dict-hero__stat-chip--green">
                <span className="dict-hero__stat-num">🇮🇩🇹🇼</span>
                <span className="dict-hero__stat-lbl">Medan & Taiwan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container dict-main">
        {/* ═══ Word of the Day ═══ */}
        <motion.div
          className="dict-wotd glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="dict-wotd__badge">
            <HiStar /> Kata Hari Ini
          </div>
          <div className="dict-wotd__content">
            <div className="dict-wotd__left">
              <span className="dict-wotd__hanji chinese-text">{wordOfDay.hanji}</span>
              <button className="dict-wotd__audio" onClick={() => speak(wordOfDay.hanji)}>
                <HiVolumeUp size={20} /> Dengar
              </button>
            </div>
            <div className="dict-wotd__right">
              <div className="dict-wotd__row">
                <span className="dict-wotd__label">POJ:</span>
                <span className="dict-wotd__poj">{wordOfDay.poj}</span>
              </div>
              {wordOfDay.tailo && wordOfDay.tailo !== wordOfDay.poj && (
                <div className="dict-wotd__row">
                  <span className="dict-wotd__label">Tâi-lô:</span>
                  <span className="dict-wotd__tailo">{wordOfDay.tailo}</span>
                </div>
              )}
              <div className="dict-wotd__row">
                <span className="dict-wotd__label">Arti:</span>
                <span className="dict-wotd__indo">{wordOfDay.indo}</span>
              </div>
              <div className="dict-wotd__row">
                <span className="dict-wotd__label">Nada:</span>
                <span className="dict-wotd__tone">{wordOfDay.tone}</span>
              </div>
              {wordOfDay.example && (
                <div className="dict-wotd__example">
                  <HiLightBulb className="dict-wotd__example-icon" />
                  <span>{wordOfDay.example}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ═══ Search Area (inspired by Taiwan MOE) ═══ */}
        <motion.div
          className="dict-search-panel glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="dict-search-panel__title">
            <HiSearch /> 搜尋辭典 Cari di Kamus
          </h2>

          {/* Search Mode Selector */}
          <div className="dict-search-modes">
            <span className="dict-search-modes__label">Tipe Pencarian:</span>
            <div className="dict-search-modes__btns">
              {searchModes.map(mode => (
                <button
                  key={mode.key}
                  className={`dict-mode-btn ${searchMode === mode.key ? 'dict-mode-btn--active' : ''}`}
                  onClick={() => {
                    setSearchMode(mode.key)
                    setCurrentPage(1)
                    searchRef.current?.focus()
                  }}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div className="dict-search-bar">
            <div className="dict-search-bar__icon-wrap">
              {activeMode.icon}
            </div>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1) }}
              placeholder={activeMode.placeholder}
              className="dict-search-bar__input"
            />
            {query && (
              <button className="dict-search-bar__clear" onClick={() => { setQuery(''); setCurrentPage(1) }}>
                <HiX size={16} />
              </button>
            )}
            <button className="dict-search-bar__submit">
              <HiSearch size={18} />
              <span>Cari</span>
            </button>
          </div>

          {/* Quick filter buttons */}
          <div className="dict-quick-filters">
            <button
              className={`dict-quick-filter ${!selectedCategory ? 'dict-quick-filter--active' : ''}`}
              onClick={() => { setSelectedCategory(null); setCurrentPage(1) }}
            >
              Semua Kategori
            </button>
            <button
              className="dict-quick-filter dict-quick-filter--tone"
              onClick={() => setShowToneGuide(!showToneGuide)}
            >
              <HiMicrophone /> {showToneGuide ? 'Tutup' : 'Panduan'} 8 Nada
            </button>
            <button
              className="dict-quick-filter dict-quick-filter--cat"
              onClick={() => setShowCategoryIndex(!showCategoryIndex)}
            >
              <HiCollection /> {showCategoryIndex ? 'Tutup' : 'Indeks'} Kategori
            </button>
          </div>
        </motion.div>

        {/* ═══ Tone Guide Panel (like 聲韻調索引) ═══ */}
        <AnimatePresence>
          {showToneGuide && (
            <motion.div
              className="dict-tone-guide glass"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="dict-tone-guide__header">
                <h3><HiMicrophone /> 聲韻調索引 — Panduan 8 Nada Hokkien (Minnan)</h3>
                <button onClick={() => setShowToneGuide(false)}><HiX size={20} /></button>
              </div>
              <p className="dict-tone-guide__intro">
                Bahasa Hokkien memiliki <strong>8 nada dasar</strong> (Nada 6 umumnya dianggap sama dengan Nada 2). 
                Setiap nada mengubah makna kata sepenuhnya. Berikut panduan lengkap nada:
              </p>
              <div className="dict-tone-cards">
                {toneGuide.map(t => (
                  <div key={t.tone} className="dict-tone-card">
                    <div className="dict-tone-card__num">{t.tone}</div>
                    <div className="dict-tone-card__body">
                      <h4>{t.name}</h4>
                      <span className="dict-tone-card__symbol">Tanda diakritik: <strong>{t.symbol}</strong></span>
                      <span className="dict-tone-card__example">
                        Contoh: <em className="chinese-text">{t.example.split(' ')[0]}</em> {t.example.split(' ')[1]}
                      </span>
                      <p className="dict-tone-card__desc">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ Category Index Panel (like 分類索引) ═══ */}
        <AnimatePresence>
          {showCategoryIndex && (
            <motion.div
              className="dict-cat-index glass"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="dict-cat-index__header">
                <h3><HiCollection /> 分類索引 — Indeks Berdasarkan Kategori</h3>
                <button onClick={() => setShowCategoryIndex(false)}><HiX size={20} /></button>
              </div>
              <div className="dict-cat-index__grid">
                {categoryIndex.map(cat => (
                  <button
                    key={cat.name}
                    className={`dict-cat-card ${selectedCategory === cat.name ? 'dict-cat-card--active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
                      setCurrentPage(1)
                    }}
                  >
                    <span className="dict-cat-card__emoji">{cat.emoji}</span>
                    <span className="dict-cat-card__name">{cat.name}</span>
                    <span className="dict-cat-card__count">{(categoryCounts[cat.name] || 0).toLocaleString()} kata</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ Results Info ═══ */}
        <div className="dict-results-bar">
          <div className="dict-results-bar__left">
            <span>
              Ditemukan <strong>{filteredList.length.toLocaleString()}</strong> entri kosakata
            </span>
            {selectedCategory && (
              <span className="dict-results-bar__tag">
                {selectedCategory}
                <button onClick={() => { setSelectedCategory(null); setCurrentPage(1) }}><HiX size={12} /></button>
              </span>
            )}
            {query && (
              <span className="dict-results-bar__tag">
                "{query}"
                <button onClick={() => { setQuery(''); setCurrentPage(1) }}><HiX size={12} /></button>
              </span>
            )}
          </div>
          <span className="dict-results-bar__page">
            Halaman {currentPage}/{totalPages}
          </span>
        </div>

        {/* ═══ Dictionary Results ═══ */}
        <div className="dict-results">
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item, index) => {
              const isExpanded = expandedId === item.id
              const isSaved = savedWords.includes(item.id)
              const isMedan = item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')

              return (
                <motion.div
                  key={item.id || `${item.hanji}-${index}`}
                  className={`dict-entry ${isExpanded ? 'dict-entry--expanded' : ''} ${isMedan ? 'dict-entry--medan' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: (index % 10) * 0.02 }}
                  layout
                >
                  {/* Main row */}
                  <div className="dict-entry__main" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                    <div className="dict-entry__hanji-wrap">
                      <span className="dict-entry__hanji chinese-text">{item.hanji}</span>
                      <button
                        className="dict-entry__audio"
                        onClick={(e) => { e.stopPropagation(); speak(item.hanji) }}
                        title="Dengarkan pengucapan"
                      >
                        <HiVolumeUp size={16} />
                      </button>
                    </div>

                    <div className="dict-entry__meta">
                      <div className="dict-entry__romanizations">
                        <span className="dict-entry__poj">
                          <span className="dict-entry__rom-label">POJ</span>
                          {item.poj}
                        </span>
                        {item.tailo && item.tailo !== item.poj && (
                          <span className="dict-entry__tailo">
                            <span className="dict-entry__rom-label">Tâi-lô</span>
                            {item.tailo}
                          </span>
                        )}
                      </div>
                      <span className="dict-entry__indo">{item.indo}</span>
                    </div>

                    <div className="dict-entry__actions">
                      {isMedan && (
                        <span className="dict-entry__medan-badge">🇮🇩 Medan</span>
                      )}
                      <span className="dict-entry__tone-badge">{item.tone}</span>
                      <button
                        className={`dict-entry__save ${isSaved ? 'dict-entry__save--active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleSave(item.id) }}
                        title={isSaved ? 'Hapus dari simpanan' : 'Simpan kata ini'}
                      >
                        <HiBookmark size={16} />
                      </button>
                      <button
                        className={`dict-entry__copy ${copiedId === item.id ? 'dict-entry__copy--done' : ''}`}
                        onClick={(e) => { e.stopPropagation(); copyWord(item) }}
                        title="Salin ke clipboard"
                      >
                        {copiedId === item.id ? <HiCheck size={14} /> : <HiClipboardCopy size={14} />}
                      </button>
                      <span className="dict-entry__expand-arrow">
                        {isExpanded ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="dict-entry__detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="dict-entry__detail-grid">
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Aksara Han (漢字)</span>
                            <span className="dict-detail-card__value chinese-text dict-detail-card__value--big">{item.hanji}</span>
                          </div>
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Pe̍h-ōe-jī (POJ)</span>
                            <span className="dict-detail-card__value dict-detail-card__value--poj">{item.poj}</span>
                          </div>
                          {item.tailo && (
                            <div className="dict-detail-card">
                              <span className="dict-detail-card__label">Tâi-lô (臺羅)</span>
                              <span className="dict-detail-card__value dict-detail-card__value--tailo">{item.tailo}</span>
                            </div>
                          )}
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Bahasa Indonesia</span>
                            <span className="dict-detail-card__value">{item.indo}</span>
                          </div>
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Nada</span>
                            <span className="dict-detail-card__value">{item.tone}</span>
                          </div>
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Kategori</span>
                            <span className="dict-detail-card__value">{item.category}</span>
                          </div>
                          <div className="dict-detail-card">
                            <span className="dict-detail-card__label">Ragam Dialek</span>
                            <span className="dict-detail-card__value">
                              {item.dialect}
                              {isMedan && ' 🇮🇩'}
                            </span>
                          </div>
                        </div>

                        {item.example && (
                          <div className="dict-entry__example-block">
                            <div className="dict-entry__example-label">
                              <HiBookOpen size={14} /> Contoh Kalimat (用例)
                            </div>
                            <p className="dict-entry__example-text">{item.example}</p>
                            <button
                              className="dict-entry__example-listen"
                              onClick={() => speak(item.example.split('(')[0].trim())}
                            >
                              <HiVolumeUp size={14} /> Dengarkan contoh
                            </button>
                          </div>
                        )}

                        <div className="dict-entry__usage-block">
                          <div className="dict-entry__usage-label">
                            <HiInformationCircle size={14} /> Catatan Penggunaan & Budaya
                          </div>
                          <p className="dict-entry__usage-text">{item.usage}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredList.length === 0 && (
          <div className="dict-empty glass">
            <span className="dict-empty__icon">🔍</span>
            <h3>Tidak ditemukan hasil untuk pencarian Anda</h3>
            <p>Coba ganti kata kunci, mode pencarian, atau hapus filter kategori.</p>
            <button className="dict-empty__btn" onClick={() => {
              setQuery('')
              setSelectedCategory(null)
              setSearchMode('semua')
              setCurrentPage(1)
            }}>
              <HiRefresh /> Reset Semua Filter
            </button>
          </div>
        )}

        {/* ═══ Pagination ═══ */}
        {totalPages > 1 && (
          <div className="dict-pagination">
            <button
              className="dict-page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft size={18} /> Sebelumnya
            </button>

            <div className="dict-page-nums">
              {currentPage > 3 && (
                <>
                  <button className="dict-page-num" onClick={() => handlePageChange(1)}>1</button>
                  <span className="dict-page-dots">...</span>
                </>
              )}
              {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                .filter(p => p >= 1 && p <= totalPages)
                .map(p => (
                  <button
                    key={p}
                    className={`dict-page-num ${p === currentPage ? 'dict-page-num--active' : ''}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                ))}
              {currentPage < totalPages - 2 && (
                <>
                  <span className="dict-page-dots">...</span>
                  <button className="dict-page-num" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </>
              )}
            </div>

            <button
              className="dict-page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Berikutnya <HiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ═══ Footer info ═══ */}
        <div className="dict-footer-info glass">
          <HiAcademicCap size={20} />
          <div>
            <strong>Referensi Kamus:</strong> Data kosakata disusun berdasarkan 
            <em> 教育部臺灣台語常用詞辭典 </em>(Kamus Resmi Bahasa Taiwan, Kementerian Pendidikan Taiwan) 
            dan ditambah koleksi otentik Hokkien Medan & Nusantara. 
            Dilengkapi romanisasi Pe̍h-ōe-jī (POJ) dan Tâi-lô (臺羅拼音).
          </div>
        </div>
      </div>
    </div>
  )
}
