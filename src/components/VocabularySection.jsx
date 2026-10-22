import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiVolumeUp,
  HiArrowRight,
  HiSparkles,
  HiSearch,
  HiBookmark,
  HiOutlineBookmark,
  HiLightBulb,
  HiClipboardCopy,
  HiInformationCircle,
  HiX
} from 'react-icons/hi'
import { playClick, playFlip, playSuccess } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './VocabularySection.css'

const categories = [
  'Semua',
  'Favorit Saya',
  'Medan Populer',
  'Kuliner & Kopitiam',
  'Pasar & Bisnis',
  'Sapaan & Adab',
  'Keluarga',
  'Pepatah & Gaul',
  'Harian & Perasaan'
]

const vocabulary = [
  // Medan Populer
  { chinese: '滾水', hokkien: 'Kún-chúi', indo: 'Air masak matang', category: 'Medan Populer', tone: 'Nada 2 + 2', note: 'Khas Medan & Riau: "Lim kún-chúi"', example: 'Thâu-ke, lâi chi̍t-poe kún-chúi!' },
  { chinese: '飲滾水', hokkien: 'Lim kún-chúi', indo: 'Minum air putih masak', category: 'Medan Populer', tone: 'Nada 1 + 2 + 2', note: 'Adab harian kedai kopi Medan', example: 'Lí ài lim kún-chúi bô?' },
  { chinese: '真實', hokkien: 'Chin-chia̍h', indo: 'Beneran / Serius', category: 'Medan Populer', tone: 'Nada 1 + 8', note: 'Slang Medan: "Chin-chia bo?"', example: 'Chin-chia̍h bô? M̄-thang phiàn góa leh!' },
  { chinese: '落科', hokkien: 'Lo̍k-kho', indo: 'Zonk / Kalah telak / Apes', category: 'Medan Populer', tone: 'Nada 8 + 1', note: 'Slang kekalahan tongkrongan Medan', example: 'Chit-pái seng-lí chin lo̍k-kho.' },
  { chinese: '無底代', hokkien: 'Bô-tī-tô', indo: 'Tiba-tiba tanpa sebab', category: 'Medan Populer', tone: 'Nada 5 + 7 + 5', note: 'Kejadian mendadak tak terduga', example: 'Bô-tī-tô i cháu khì Tâi-oân矣!' },
  { chinese: '兄弟', hokkien: 'Hia-tī', indo: 'Sobat karib / Bro akrab', category: 'Medan Populer', tone: 'Nada 1 + 7', note: 'Panggilan persaudaraan tongkrongan', example: 'Hia-tī, kin-á-ji̍t chhit-thô hó--bô?' },

  // Kuliner & Kopitiam
  { chinese: '咖啡烏冰', hokkien: 'Ko-pi-o-peng', indo: 'Es kopi hitam manis', category: 'Kuliner & Kopitiam', tone: 'Nada 1 + 1 + 1 + 1', note: 'Kopitiam klasik tanpa susu', example: 'Seng lâi chi̍t-poe ko-pi-o-peng!' },
  { chinese: '茶烏冰', hokkien: 'Tê-o-peng', indo: 'Es teh manis hitam pekat', category: 'Kuliner & Kopitiam', tone: 'Nada 5 + 1 + 1', note: 'Pesanan minuman paling umum di Medan', example: 'Thâu-ke, tê-o-peng chi̍t-poe!' },
  { chinese: '炒粿條', hokkien: 'Chhá-kóe-tiâu', indo: 'Kwetiau goreng gurih', category: 'Kuliner & Kopitiam', tone: 'Nada 2 + 2 + 5', note: 'Kwetiau wangi wok-hei khas Medan', example: 'Chi̍t-óaⁿ chhá-kóe-tiâu bô ka hia̍t!' },
  { chinese: '菜頭粿', hokkien: 'Chhài-thâu-kóe', indo: 'Kue lobak goreng', category: 'Kuliner & Kopitiam', tone: 'Nada 3 + 5 + 2', note: 'Kuliner sarapan favorit Medan & Penang', example: 'Chhài-thâu-kóe chhá hō͘ phang-phang!' },
  { chinese: '米粉', hokkien: 'Bí-hún', indo: 'Bihun beras', category: 'Kuliner & Kopitiam', tone: 'Nada 2 + 2', note: 'Asal usul kata serapan "Bihun"', example: 'Lán bé chi̍t-óaⁿ bí-hún thng.' },
  { chinese: '豆花', hokkien: 'Tāu-hoe', indo: 'Kembang tahu kuah jahe', category: 'Kuliner & Kopitiam', tone: 'Nada 7 + 1', note: 'Pencuci mulut manis penghangat tubuh', example: 'Sio-sio ê tāu-hoe chin hó-chia̍h!' },
  { chinese: '肉骨茶', hokkien: 'Bah-kut-tê', indo: 'Bak kut teh herbal', category: 'Kuliner & Kopitiam', tone: 'Nada 8 + 8 + 5', note: 'Sup iga kuah rempah Selat Malaka', example: 'Chia̍h bah-kut-tê phòe kún-chúi.' },
  { chinese: '肉包', hokkien: 'Bah-pau', indo: 'Bakpao isi daging', category: 'Kuliner & Kopitiam', tone: 'Nada 8 + 1', note: 'Asal usul kata serapan "Bakpao"', example: 'Bé nn̄g-ê bah-pau chia̍h tiám-sim.' },

  // Pasar & Bisnis
  { chinese: '頭家', hokkien: 'Thâu-ke', indo: 'Bos / Juragan / Tauke', category: 'Pasar & Bisnis', tone: 'Nada 5 + 1', note: 'Sumber kata serapan "Tauke"', example: 'Thâu-ke, chit-ê lōa-chē chîⁿ?' },
  { chinese: '頭家娘', hokkien: 'Thâu-ke-niû', indo: 'Nyonya bos / Tauke cici', category: 'Pasar & Bisnis', tone: 'Nada 5 + 1 + 5', note: 'Sapaan hormat nyonya pemilik toko', example: 'Thâu-ke-niû, sǹg sio̍k chi̍t-tiám lah!' },
  { chinese: '俗', hokkien: 'Sio̍k', indo: 'Murah meriah / Terjangkau', category: 'Pasar & Bisnis', tone: 'Nada 8 (singkat)', note: 'Lawan kata dari "Kùi" (mahal)', example: 'Chit-keng tiàm chin sio̍k koh chán!' },
  { chinese: '貴', hokkien: 'Kùi', indo: 'Mahal harganya', category: 'Pasar & Bisnis', tone: 'Nada 3', note: 'Sering dipakai saat tawar harga', example: 'Wa! Siuⁿ kùi lah, phah-chiat hó--bô?' },
  { chinese: '賺錢', hokkien: 'Thàn-chîⁿ (Cuan)', indo: 'Cari uang / Cuan untung', category: 'Pasar & Bisnis', tone: 'Nada 3 + 5', note: 'Sumber asli kata serapan "Cuan"', example: 'Chiok lí chò seng-lí thàn tōa-chîⁿ!' },
  { chinese: '老主顧', hokkien: 'Lāu-chú-kò͘', indo: 'Pelanggan setia / Langganan', category: 'Pasar & Bisnis', tone: 'Nada 7 + 2 + 3', note: 'Hubungan persahabatan pedagang-pembeli', example: 'Lán ta̍k-ke lāu-chú-kò͘, sǹg lí sio̍k!' },

  // Sapaan & Adab
  { chinese: '你好', hokkien: 'Lí hó', indo: 'Halo / Apa kabar', category: 'Sapaan & Adab', tone: 'Nada 2 + 2', note: 'Sapaan sopan universal', example: 'Lí hó! Chin hoaⁿ-hí kìⁿ-tio̍h lí!' },
  { chinese: '食飽未', hokkien: 'Chia̍h-pá--bē', indo: 'Sudah makan belum?', category: 'Sapaan & Adab', tone: 'Nada 8 + 2 + 7', note: 'Sapaan kasih sayang khas Hokkien', example: 'Lí chia̍h-pá--bē? Lâi chò-hóe chia̍h!' },
  { chinese: '多謝', hokkien: 'To-siā', indo: 'Terima kasih banyak', category: 'Sapaan & Adab', tone: 'Nada 1 + 7', note: 'Ungkapan terima kasih berbudaya', example: 'To-siā lí ê pang-bâng!' },
  { chinese: '歹勢', hokkien: 'Pháinn-sè', indo: 'Maaf / Permisi / Segan', category: 'Sapaan & Adab', tone: 'Nada 2 + 3', note: 'Kata emas pergaulan santun Minnan', example: 'Pháinn-sè, thó-jiáu lí矣!' },
  { chinese: '請坐', hokkien: 'Chhiáⁿ-chē', indo: 'Silakan duduk', category: 'Sapaan & Adab', tone: 'Nada 2 + 7', note: 'Adab menyambut tamu di rumah/kantor', example: 'Chhiáⁿ ji̍p-lâi chē, lim chi̍t-poe tê!' },
  { chinese: '再見', hokkien: 'Chài-kiàn', indo: 'Sampai jumpa lagi', category: 'Sapaan & Adab', tone: 'Nada 3 + 3', note: 'Salam perpisahan santun', example: 'Bîn-á-chài koh kìⁿ, chài-kiàn!' },

  // Keluarga
  { chinese: '阿公', hokkien: 'A-kong', indo: 'Kakek tercinta', category: 'Keluarga', tone: 'Nada 1 + 1', note: 'Panggilan kakek pihak ayah/ibu', example: 'A-kong, chiok lí kiān-khong!' },
  { chinese: '阿嬤', hokkien: 'A-má', indo: 'Nenek tercinta', category: 'Keluarga', tone: 'Nada 1 + 2', note: 'Panggilan nenek penuh kasih', example: 'A-má chú ê chhài siōng hó-chia̍h!' },
  { chinese: '新婦', hokkien: 'Sin-pū', indo: 'Menantu perempuan', category: 'Keluarga', tone: 'Nada 1 + 7', note: 'Gelar istri dari anak laki-laki', example: 'Sin-pū chin gâu koh kàu-hàu.' },
  { chinese: '食百二', hokkien: 'Chia̍h pah-jī', indo: 'Panjang umur sampai 120 tahun', category: 'Keluarga', tone: 'Nada 8 + 4 + 7', note: 'Doa terbaik untuk kakek-nenek', example: 'Chiok A-kong A-má chia̍h pah-jī!' },

  // Pepatah & Gaul
  { chinese: '好水', hokkien: 'Hó-súi', indo: 'Keren / Mantap / Menawan', category: 'Pepatah & Gaul', tone: 'Nada 2 + 2', note: 'Pujian gaul: "Ho sui lah!"', example: 'Chit-tiâu saⁿ chin hó-súi lah!' },
  { chinese: '愛拼才會贏', hokkien: 'Ài piàⁿ chiah ē iâⁿ', indo: 'Berjuang keras baru bisa menang', category: 'Pepatah & Gaul', tone: 'Nada 3 + 2 + 7 + 7 + 5', note: 'Lagu & filosofi ketangguhan Minnan', example: 'Ta̍k-ke chò-hóe phah-piàⁿ!' },
  { chinese: '食果子拜樹頭', hokkien: 'Chia̍h kóe-chí pài chhiū-thâu', indo: 'Ingat jasa asal usul budi baik', category: 'Pepatah & Gaul', tone: 'Nada 8 + 2 + 2 + 3 + 7 + 5', note: 'Pepatah moral tidak melupakan jasa', example: 'Chò-lâng ài chia̍h kóe-chí pài chhiū-thâu.' },
  { chinese: '爽快', hokkien: 'Sóng-khoài', indo: 'Segar mantap plong berenergi', category: 'Pepatah & Gaul', tone: 'Nada 2 + 3', note: 'Perasaan puas lega tiada tara', example: 'Lim chi̍t-poe peng chúi chin sóng-khoài!' },

  // Harian & Perasaan
  { chinese: '愛睏', hokkien: 'Ài-khùn', indo: 'Mengantuk / Mau tidur', category: 'Harian & Perasaan', tone: 'Nada 3 + 3', note: 'Lelah setelah seharian beraktivitas', example: 'Góa chin ài-khùn, beh khùn矣.' },
  { chinese: '做伙', hokkien: 'Chò-hóe', indo: 'Bersama-sama / Barengan', category: 'Harian & Perasaan', tone: 'Nada 3 + 2', note: '"Chò-hóe chia̍h" = Makan bareng', example: 'Lán chò-hóe khì chhit-thô!' },
  { chinese: '合意', hokkien: 'Kah-ì', indo: 'Suka / Cocok di hati', category: 'Harian & Perasaan', tone: 'Nada 8 + 3', note: 'Menyatakan rasa suka atau cinta', example: 'Góa chin kah-ì lí, lí chai bô?' },
  { chinese: '歡喜', hokkien: 'Hoaⁿ-hí', indo: 'Gembira / Suka cita', category: 'Harian & Perasaan', tone: 'Nada 1 + 2', note: 'Hati riang gembira bersemangat', example: 'Ta̍k-ke hoaⁿ-hí kòe sin-nî!' }
]

const FAV_STORAGE_KEY = 'hokkien_fav_vocab'

export default function VocabularySection() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchWord, setSearchWord] = useState('')
  const [flipped, setFlipped] = useState({})
  const [speakingWord, setSpeakingWord] = useState(null)
  const [speechRate, setSpeechRate] = useState(0.82) // 0.82x or 0.65x slow
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [detailModalWord, setDetailModalWord] = useState(null)
  const { showToast } = useToast()

  const toggleFavorite = (e, cardKey, word) => {
    e.stopPropagation()
    playClick()
    setFavorites(prev => {
      let next
      if (prev.includes(cardKey)) {
        next = prev.filter(k => k !== cardKey)
        showToast(`Dihapus dari favorit`, 'info', 1500)
      } else {
        next = [...prev, cardKey]
        playSuccess()
        showToast(`⭐ "${word.chinese}" ditambahkan ke favorit!`, 'badge', 2000)
      }
      try {
        localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const filtered = useMemo(() => {
    return vocabulary.filter(item => {
      const cardKey = `${item.chinese}-${item.hokkien}`
      const isFav = favorites.includes(cardKey)
      
      let matchCategory = true
      if (activeCategory === 'Favorit Saya') {
        matchCategory = isFav
      } else if (activeCategory !== 'Semua') {
        matchCategory = item.category === activeCategory
      }

      const q = searchWord.trim().toLowerCase()
      const matchSearch = !q ||
        item.chinese.includes(q) ||
        item.hokkien.toLowerCase().includes(q) ||
        item.indo.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q)

      return matchCategory && matchSearch
    })
  }, [activeCategory, searchWord, favorites])

  const toggleFlip = (key) => {
    playFlip()
    setFlipped(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const copyWord = (e, word) => {
    e.stopPropagation()
    playClick()
    const text = `${word.chinese} (${word.hokkien}) - ${word.indo}\nContoh: "${word.example}"\nCatatan: ${word.note}`
    navigator.clipboard?.writeText(text).then(() => {
      showToast(`📋 Berhasil disalin: ${word.chinese}`, 'success', 2000)
    })
  }

  const speak = (e, text, key) => {
    e.stopPropagation()
    setSpeakingWord(key)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = speechRate
      utterance.onend = () => setSpeakingWord(null)
      utterance.onerror = () => setSpeakingWord(null)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setSpeakingWord(null), 1000)
    }
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
          {categories.map(cat => {
            const isFavTab = cat === 'Favorit Saya'
            const count = isFavTab ? favorites.length : null

            return (
              <button
                key={cat}
                className={`vocab-tab ${activeCategory === cat ? 'vocab-tab--active' : ''} ${cat === 'Medan Populer' ? 'vocab-tab--medan' : ''} ${isFavTab ? 'vocab-tab--fav' : ''}`}
                onClick={() => {
                  playClick()
                  setActiveCategory(cat)
                  setFlipped({})
                }}
              >
                {isFavTab && '⭐ '}
                {cat === 'Medan Populer' && '🇮🇩 '}
                {cat === 'Kuliner & Kopitiam' && '☕ '}
                {cat === 'Pasar & Bisnis' && '🏪 '}
                {cat === 'Pepatah & Gaul' && '✨ '}
                {cat}
                {isFavTab && count > 0 && <span className="vocab-tab__count">{count}</span>}
              </button>
            )
          })}
        </div>

        {/* Vocabulary Grid */}
        <motion.div className="vocab-section__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((word, i) => {
              const cardKey = `${word.chinese}-${word.hokkien}`
              const isFlipped = !!flipped[cardKey]
              const isMedan = word.category === 'Medan Populer' || word.note.includes('Medan')
              const isSpeaking = speakingWord === cardKey
              const isBookmarked = favorites.includes(cardKey)

              return (
                <motion.div
                  key={cardKey}
                  className={`vocab-card ${isMedan ? 'vocab-card--medan' : ''}`}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, delay: (i % 12) * 0.02 }}
                  onClick={() => toggleFlip(cardKey)}
                >
                  <div className={`vocab-card__inner ${isFlipped ? 'vocab-card__inner--flipped' : ''}`}>
                    {/* Front face */}
                    <div className="vocab-card__front">
                      <div className="vocab-card__top-icons">
                        {isMedan ? (
                          <span className="vocab-card__medan-tag">🇮🇩 Medan</span>
                        ) : (
                          <span className="vocab-card__category-tag">{word.category}</span>
                        )}

                        <div className="vocab-card__action-group">
                          {/* Bookmark button */}
                          <button
                            className={`vocab-card__icon-btn ${isBookmarked ? 'vocab-card__icon-btn--fav' : ''}`}
                            onClick={(e) => toggleFavorite(e, cardKey, word)}
                            title={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                          >
                            {isBookmarked ? <HiBookmark size={15} /> : <HiOutlineBookmark size={15} />}
                          </button>

                          {/* Audio button */}
                          <button
                            className={`vocab-card__audio-btn ${isSpeaking ? 'vocab-card__audio-btn--active' : ''}`}
                            onClick={(e) => speak(e, word.chinese, cardKey)}
                            title="Dengar pengucapan"
                          >
                            <HiVolumeUp size={16} />
                          </button>
                        </div>
                      </div>

                      <span className="vocab-card__chinese chinese-text">{word.chinese}</span>
                      <span className="vocab-card__hokkien">{word.hokkien}</span>
                      <span className="vocab-card__tone-pill">{word.tone}</span>
                      <span className="vocab-card__hint">Ketuk untuk arti & contoh</span>
                    </div>

                    {/* Back face */}
                    <div className="vocab-card__back">
                      <div className="vocab-card__back-top">
                        <span className="vocab-card__indo">{word.indo}</span>
                        <div className="vocab-card__action-group">
                          {/* Copy button */}
                          <button
                            className="vocab-card__icon-btn"
                            onClick={(e) => copyWord(e, word)}
                            title="Salin kartu ini"
                          >
                            <HiClipboardCopy size={15} />
                          </button>

                          {/* Audio button */}
                          <button
                            className={`vocab-card__audio-btn ${isSpeaking ? 'vocab-card__audio-btn--active' : ''}`}
                            onClick={(e) => speak(e, word.chinese, cardKey)}
                            title="Dengar pengucapan"
                          >
                            <HiVolumeUp size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="vocab-card__back-hanji">
                        <span className="chinese-text">{word.chinese}</span>
                        <span className="vocab-card__back-poj">{word.hokkien}</span>
                      </div>

                      <p className="vocab-card__example">"{word.example}"</p>
                      
                      <div className="vocab-card__back-footer">
                        <small className="vocab-card__note-text">
                          <HiLightBulb className="vocab-card__note-icon" />
                          {word.note}
                        </small>
                        <button
                          className="vocab-card__detail-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            playClick()
                            setDetailModalWord(word)
                          }}
                          title="Lihat info mendalam"
                        >
                          <HiInformationCircle size={15} /> Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="vocab-section__empty">
            <p>
              {activeCategory === 'Favorit Saya'
                ? 'Belum ada kosakata yang disimpan ke favorit. Klik ikon bookmark pada kartu kosakata untuk menyimpannya di sini!'
                : `Tidak ada kata yang cocok dengan "${searchWord}". Coba kata kunci lain atau buka kamus lengkap.`}
            </p>
          </div>
        )}

        {/* Explore 13,000+ words button */}
        <div className="vocab-section__more">
          <Link to="/vocabulary" className="vocab-more-btn" onClick={() => playClick()}>
            <HiSparkles />
            <span>Jelajahi 13,000+ Database Kosakata Akbar</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>

      {/* Vocabulary Detail Modal */}
      <AnimatePresence>
        {detailModalWord && (
          <div
            className="vocab-modal-backdrop"
            onClick={() => setDetailModalWord(null)}
          >
            <motion.div
              className="vocab-modal glass"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="vocab-modal__header">
                <span className="vocab-modal__category">{detailModalWord.category}</span>
                <button
                  className="vocab-modal__close"
                  onClick={() => setDetailModalWord(null)}
                >
                  <HiX size={20} />
                </button>
              </div>

              <div className="vocab-modal__main">
                <div className="vocab-modal__characters">
                  <h3 className="chinese-text vocab-modal__hanji">{detailModalWord.chinese}</h3>
                  <div className="vocab-modal__pronounce">
                    <span className="vocab-modal__poj">{detailModalWord.hokkien}</span>
                    <button
                      className="vocab-modal__audio-btn"
                      onClick={(e) => speak(e, detailModalWord.chinese, 'modal')}
                    >
                      <HiVolumeUp size={18} /> Dengarkan
                    </button>
                  </div>
                </div>

                <div className="vocab-modal__meaning-box">
                  <h4>Arti & Makna</h4>
                  <p className="vocab-modal__indo">{detailModalWord.indo}</p>
                </div>

                <div className="vocab-modal__details-grid">
                  <div className="vocab-modal__info-card">
                    <span className="vocab-modal__label">Sistem Nada</span>
                    <strong>{detailModalWord.tone}</strong>
                  </div>
                  <div className="vocab-modal__info-card">
                    <span className="vocab-modal__label">Dialek / Persebaran</span>
                    <strong>{detailModalWord.note.includes('Medan') ? 'Hokkien Medan / Nusantara' : 'Taiwan & Amoy Standar'}</strong>
                  </div>
                </div>

                <div className="vocab-modal__example-box">
                  <span className="vocab-modal__label">Contoh Percakapan Nyata:</span>
                  <p className="vocab-modal__sentence">"{detailModalWord.example}"</p>
                  <small className="vocab-modal__note">💡 {detailModalWord.note}</small>
                </div>
              </div>

              <div className="vocab-modal__footer">
                <button
                  className="vocab-modal__action-btn"
                  onClick={(e) => copyWord(e, detailModalWord)}
                >
                  <HiClipboardCopy size={16} /> Salin Entri
                </button>
                <Link
                  to={`/dictionary?q=${encodeURIComponent(detailModalWord.chinese)}`}
                  className="vocab-modal__action-btn vocab-modal__action-btn--primary"
                  onClick={() => setDetailModalWord(null)}
                >
                  Cari di Kamus 13,000+
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
