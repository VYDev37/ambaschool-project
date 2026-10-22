import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiSparkles, HiGlobeAlt, HiBookOpen, HiHeart, HiTranslate, HiVolumeUp, HiLightBulb } from 'react-icons/hi'
import { playClick } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './AboutPage.css'

const loanWords = [
  { indo: 'Cuan', hokkien: '賺 (thàn)', text: '賺', desc: 'Mendapat keuntungan / uang berlimpah.' },
  { indo: 'Hoki', hokkien: '福氣 (hok-khì)', text: '福氣', desc: 'Keberuntungan atau nasib baik.' },
  { indo: 'Gue / Lu', hokkien: '我 (góa) / 汝 (lú)', text: '我', desc: 'Kata ganti orang pertama & kedua yang menjadi bahasa gaul Jakarta.' },
  { indo: 'Bakmi', hokkien: '肉麵 (bah-mī)', text: '肉麵', desc: 'Daging cincang dengan mie kuah/kering.' },
  { indo: 'Kwetiau', hokkien: '粿條 (kóe-tiâu)', text: '粿條', desc: 'Mie pipih berbahan tepung beras.' },
  { indo: 'Tahu / Tauge', hokkien: '豆腐 (tāu-hū)', text: '豆腐', desc: 'Olahan kedelai dan kecambah kedelai.' },
  { indo: 'Cepek / Ceban', hokkien: '百 (pah) / 萬 (bān)', text: '一萬', desc: 'Istilah nominal ratusan dan puluhan ribu yang dipakai luas di pasar.' },
  { indo: 'Kongkalikong', hokkien: '公家講 (kong-ke kóng)', text: '公家講', desc: 'Bersekongkol atau kesepakatan rahasia.' }
]

const dialects = [
  {
    name: 'Hokkien Medan',
    region: 'Sumatera Utara, Indonesia',
    base: 'Dialek Zhangzhou (漳州)',
    desc: 'Banyak menyerap kosakata bahasa Indonesia, Melayu, dan Belanda. Menjadi lingua franca sehari-hari dalam bisnis dan pergaulan multietnis di Medan.',
    highlight: 'Khas: Lim kún-chúi, chin-chia̍h, lo̍k-kho'
  },
  {
    name: 'Hokkien Bagansiapiapi & Riau',
    region: 'Riau, Selatpanjang, Tanjungpinang',
    base: 'Dialek Quanzhou (泉州 / Tong-an)',
    desc: 'Ciri khas aksen lebih berirama dengan vokal sengau yang kental. Sangat murni dan menjadi bahasa utama komunitas nelayan serta perdagangan pesisir.',
    highlight: 'Khas: Dialek murni Minnan pesisir'
  },
  {
    name: 'Taiwan Minnan (Tâi-gí)',
    region: 'Taiwan',
    base: 'Campuran Zhangzhou & Quanzhou',
    desc: 'Memiliki sistem standardisasi Kementerian Pendidikan Taiwan dengan aksara Hanji dan romanisasi Tâi-lô resmi yang kaya karya sastra modern.',
    highlight: 'Khas: Bahasa resmi berstandar kurikulum MoE'
  },
  {
    name: 'Penang Hokkien',
    region: 'Penang, Malaysia',
    base: 'Zhangzhou + Melayu',
    desc: 'Sangat mirip dengan Hokkien Medan dengan percampuran kata pinjaman Melayu seperti "tapi", "mana", "senang".',
    highlight: 'Khas: Dialek peranakan Selat Malaka'
  }
]

export default function AboutPage() {
  const [playingWord, setPlayingWord] = useState(null)
  const { showToast } = useToast()

  const speak = (e, text, label) => {
    e.stopPropagation()
    playClick()
    setPlayingWord(text)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-TW'
      u.rate = 0.82
      u.onend = () => setPlayingWord(null)
      u.onerror = () => setPlayingWord(null)
      window.speechSynthesis.speak(u)
      showToast(`🔊 Pengucapan: ${label} (${text})`, 'info', 1500)
    } else {
      setTimeout(() => setPlayingWord(null), 1000)
    }
  }

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-hero__tag">
              <HiGlobeAlt /> Warisan Budaya & Sejarah
            </span>
            <h1 className="about-hero__title">
              Mengenal Akar & Jiwa <br />
              <span className="gradient-text">Bahasa Hokkien</span>
            </h1>
            <p className="about-hero__subtitle">
              Bahasa Hokkien (閩南語 - Bân-lâm-gú) adalah salah satu cabang bahasa Tionghoa tertua yang mempertahankan fonologi Dinasti Tang dan Song, mengakar kuat dalam denyut kebudayaan Indonesia.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container about-main">
        {/* Story Section */}
        <div className="about-story glass">
          <div className="about-story__text">
            <span className="about-section-label">Sejarah & Filosofi</span>
            <h2>Lebih dari Sekadar Bahasa, Ini Adalah Memori Leluhur</h2>
            <p>
              Berasal dari provinsi Fujian (Hokkien) di Tiongkok selatan, para perantau Minnan mengarungi Samudra Hindia dan Selat Malaka sejak berabad-abad lalu menuju Nusantara. Mereka membawa etos kerja tangguh yang dirangkum dalam pepatah terkenal: <em>"Ài piàⁿ chiah ē iâⁿ"</em> (Harus berjuang baru bisa menang).
            </p>
            <p>
              Di Indonesia, bahasa Hokkien berakulturasi secara damai dengan bahasa Melayu, Jawa, dan bahasa daerah lainnya, mewariskan ratusan kata serapan kuliner, bilangan pasar, hingga istilah pergaulan modern yang kita gunakan setiap hari.
            </p>
          </div>
          <div className="about-story__card">
            <span className="about-story__big-hanji chinese-text">愛拼才會贏</span>
            <span className="about-story__poj">Ài piàⁿ chiah ē iâⁿ</span>
            <span className="about-story__quote">"Berani berjuang, baru akan meraih kejayaan."</span>
          </div>
        </div>

        {/* Loanwords Section with Audio */}
        <div className="about-loanwords section">
          <div className="about-header-center">
            <span className="about-section-label">Akulturasi Nusantara</span>
            <h2>Kata Hokkien yang Sering Anda Ucapkan Tanpa Disadari</h2>
            <p>Klik tombol audio untuk mendengarkan lafal aslinya dalam bahasa Hokkien:</p>
          </div>

          <div className="loanwords-grid">
            {loanWords.map((lw, idx) => (
              <motion.div
                key={idx}
                className="loanword-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="loanword-card__top">
                  <div>
                    <span className="loanword-card__indo">{lw.indo}</span>
                    <span className="loanword-card__hokkien">{lw.hokkien}</span>
                  </div>
                  <button
                    className={`loanword-card__audio ${playingWord === lw.text ? 'loanword-card__audio--active' : ''}`}
                    onClick={(e) => speak(e, lw.text, lw.indo)}
                    title={`Dengarkan pengucapan Hokkien ${lw.indo}`}
                  >
                    <HiVolumeUp size={16} />
                  </button>
                </div>
                <p className="loanword-card__desc">{lw.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dialects Grid */}
        <div className="about-dialects section">
          <div className="about-header-center">
            <span className="about-section-label">Persebaran Wilayah</span>
            <h2>Ragam Dialek Hokkien di Asia Tenggara & Dunia</h2>
          </div>

          <div className="dialects-grid">
            {dialects.map((d, i) => (
              <div key={i} className="dialect-card glass">
                <span className="dialect-card__badge">{d.base}</span>
                <h3 className="dialect-card__name">{d.name}</h3>
                <span className="dialect-card__region">📍 {d.region}</span>
                <p className="dialect-card__desc">{d.desc}</p>
                <div className="dialect-card__highlight">
                  <HiLightBulb size={14} />
                  <span>{d.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Banner */}
        <div className="about-mission glass">
          <HiHeart className="about-mission__heart" />
          <h3 className="about-mission__title">Misi Pelestarian Digital</h3>
          <p className="about-mission__desc">
            Banyak generasi muda keturunan Tionghoa kini kehilangan kemampuan bertutur dalam bahasa ibu leluhurnya. Platform ini dibangun secara swadaya untuk memastikan warisan berharga ini tetap hidup, dipelajari secara menyenangkan, dan dibanggakan oleh generasi penerus.
          </p>
        </div>
      </div>
    </div>
  )
}
