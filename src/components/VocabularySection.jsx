import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiVolumeUp, HiArrowRight, HiSparkles } from 'react-icons/hi'
import './VocabularySection.css'

const categories = ['Semua', 'Medan Populer', 'Kuliner & Minuman', 'Sapaan', 'Keluarga', 'Pasar & Angka', 'Harian']

const vocabulary = [
  { chinese: '滾水', hokkien: 'Kún-chúi', indo: 'Air masak matang', category: 'Medan Populer', note: 'Khas Medan: "Lim kún-chúi"' },
  { chinese: '飲滾水', hokkien: 'Lim kún-chúi', indo: 'Minum air putih masak', category: 'Medan Populer', note: 'Adab harian kedai kopi Medan' },
  { chinese: '真實', hokkien: 'Chin-chia̍h', indo: 'Beneran / Serius', category: 'Medan Populer', note: 'Slang Medan: "Chin-chia bo?"' },
  { chinese: '落科', hokkien: 'Lo̍k-kho', indo: 'Zonk / Kalah telak', category: 'Medan Populer', note: 'Slang kekalahan tongkrongan Medan' },
  { chinese: '頭家', hokkien: 'Thâu-ke', indo: 'Bos / Tauke / Juragan', category: 'Pasar & Angka', note: 'Serapan kata "Tauke"' },
  { chinese: '菜頭粿', hokkien: 'Chhài-thâu-kóe', indo: 'Kue lobak goreng', category: 'Kuliner & Minuman', note: 'Kuliner sarapan favorit Medan' },
  { chinese: '咖啡烏冰', hokkien: 'Ko-pi-o-peng', indo: 'Es kopi hitam manis', category: 'Kuliner & Minuman', note: 'Kopitiam klasik tanpa susu' },
  { chinese: '茶烏冰', hokkien: 'Tê-o-peng', indo: 'Es teh manis hitam', category: 'Kuliner & Minuman', note: 'Pesanan minuman paling umum' },
  { chinese: '你好', hokkien: 'Lí hó', indo: 'Halo / Apa kabar', category: 'Sapaan', note: 'Sapaan sopan universal' },
  { chinese: '多謝', hokkien: 'To-siā', indo: 'Terima kasih', category: 'Sapaan', note: 'Ucapan terima kasih' },
  { chinese: '歹勢', hokkien: 'Pháinn-sè', indo: 'Maaf / Permisi / Segan', category: 'Sapaan', note: 'Kata emas pergaulan sopan' },
  { chinese: '食飽未', hokkien: 'Chia̍h-pá--bē', indo: 'Sudah makan belum?', category: 'Sapaan', note: 'Sapaan hangat penuh perhatian' },
  { chinese: '阿公', hokkien: 'A-kong', indo: 'Kakek tercinta', category: 'Keluarga', note: 'Panggilan kakek' },
  { chinese: '阿嬤', hokkien: 'A-má', indo: 'Nenek tercinta', category: 'Keluarga', note: 'Panggilan nenek' },
  { chinese: '俗', hokkien: 'Sio̍k', indo: 'Murah meriah', category: 'Pasar & Angka', note: 'Lawan kata dari "Kùi" (mahal)' },
  { chinese: '貴', hokkien: 'Kùi', indo: 'Mahal harganya', category: 'Pasar & Angka', note: 'Sering dipakai saat tawar harga' },
  { chinese: '好水', hokkien: 'Hó-súi', indo: 'Cantik / Keren mantap', category: 'Harian', note: 'Pujian: "Ho sui lah!"' },
  { chinese: '愛睏', hokkien: 'Ài-khùn', indo: 'Mengantuk / Mau tidur', category: 'Harian', note: 'Capek setelah seharian kerja' },
  { chinese: '做伙', hokkien: 'Chò-hóe', indo: 'Bersama-sama / Bareng', category: 'Harian', note: '"Chò-hóe chia̍h" = Makan bareng' },
  { chinese: '賺錢', hokkien: 'Thàn-chîⁿ (Cuan)', indo: 'Cari uang / Cuan untung', category: 'Pasar & Angka', note: 'Sumber kata serapan "Cuan"' },
]

export default function VocabularySection() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [flipped, setFlipped] = useState({})

  const filtered = activeCategory === 'Semua'
    ? vocabulary
    : vocabulary.filter(v => v.category === activeCategory)

  const toggleFlip = (i) => {
    setFlipped(prev => ({ ...prev, [i]: !prev[i] }))
  }

  const speak = (e, text) => {
    e.stopPropagation()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
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
          <span className="vocab-section__label">Koleksi Kosakata Pilihan</span>
          <h2 className="vocab-section__title">
            Pelajari Kata Populer <br />
            <span className="gradient-text">Hokkien Medan & Taiwan</span>
          </h2>
          <p className="vocab-section__subtitle">
            Klik kartu untuk membalik terjemahan. Mulai dari istilah harian seperti <em>"Lim kún-chúi"</em>,
            istilah pasar <em>"Thâu-ke"</em>, hingga frasa santai <em>"Hó-súi"</em>.
          </p>
        </motion.div>

        <div className="vocab-section__tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`vocab-tab ${activeCategory === cat ? 'vocab-tab--active' : ''} ${cat === 'Medan Populer' ? 'vocab-tab--medan' : ''}`}
              onClick={() => { setActiveCategory(cat); setFlipped({}) }}
            >
              {cat === 'Medan Populer' ? '🇮🇩 ' + cat : cat}
            </button>
          ))}
        </div>

        <motion.div className="vocab-section__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((word, i) => (
              <motion.div
                key={`${word.chinese}-${word.hokkien}`}
                className={`vocab-card ${word.category === 'Medan Populer' ? 'vocab-card--medan' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                onClick={() => toggleFlip(i)}
              >
                <div className={`vocab-card__inner ${flipped[i] ? 'vocab-card__inner--flipped' : ''}`}>
                  <div className="vocab-card__front">
                    <div className="vocab-card__top-icons">
                      {word.category === 'Medan Populer' && (
                        <span className="vocab-card__medan-tag">🇮🇩 Medan</span>
                      )}
                      <button
                        className="vocab-card__audio-btn"
                        onClick={(e) => speak(e, word.chinese)}
                        title="Dengar pengucapan"
                      >
                        <HiVolumeUp size={16} />
                      </button>
                    </div>
                    <span className="vocab-card__chinese chinese-text">{word.chinese}</span>
                    <span className="vocab-card__hokkien">{word.hokkien}</span>
                    <span className="vocab-card__hint">Ketuk untuk terjemahan</span>
                  </div>
                  <div className="vocab-card__back">
                    <span className="vocab-card__indo">{word.indo}</span>
                    <span className="vocab-card__chinese-small chinese-text">{word.chinese}</span>
                    <span className="vocab-card__hokkien-small">{word.hokkien}</span>
                    <small className="vocab-card__note-text">{word.note}</small>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore 10,000+ words button */}
        <div className="vocab-section__more">
          <Link to="/vocabulary" className="vocab-more-btn">
            <HiSparkles />
            <span>Jelajahi 10,000+ Database Kosakata Lengkap</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
