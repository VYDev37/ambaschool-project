import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiVolumeUp,
  HiClipboardCopy,
  HiCheck,
  HiSparkles,
  HiLightBulb,
  HiChevronLeft,
  HiChevronRight,
  HiShare
} from 'react-icons/hi'
import { playClick } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './PhraseOfDay.css'

const phrases = [
  {
    chinese: '食飽未？',
    poj: 'Chia̍h-pá--bē?',
    ipa: '[tsiaʔ⁵⁻²¹ pa⁵³ be³³]',
    indonesian: 'Sudah makan belum?',
    literal: 'Makan kenyang belum?',
    explanation: 'Sapaan paling hangat dalam budaya Hokkien. Mirip dengan "Apa kabar?", menanyakan apakah seseorang sudah makan adalah bentuk perhatian mendalam.',
    tones: ['Nada 8 (masuk tinggi)', 'Nada 2 (turun)', 'Nada 7 (datar tengah)'],
    situation: 'Dipakai saat berpapasan dengan teman, tetangga, atau kerabat di waktu santai/makan.',
    tag: 'Sapaan Khas'
  },
  {
    chinese: '愛拼才會贏',
    poj: 'Ài piàⁿ chiah ē iâⁿ',
    ipa: '[ai²¹ piã⁵³ tsiaʔ³² e³³ iã¹³]',
    indonesian: 'Harus berjuang keras baru bisa menang',
    literal: 'Mau berjuang baru akan menang',
    explanation: 'Peribahasa dan judul lagu legendaris Minnan yang melambangkan etos kerja keras dan ketangguhan perantau Hokkien di seluruh dunia.',
    tones: ['Nada 3', 'Nada 2 nasal', 'Nada 7', 'Nada 7', 'Nada 5'],
    situation: 'Pemberi semangat untuk teman yang sedang menghadapi ujian, merintis usaha, atau menghadapi tantangan.',
    tag: 'Filosofi Hidup'
  },
  {
    chinese: '食果子拜樹頭',
    poj: 'Chia̍h kóe-chí pài chhiū-thâu',
    ipa: '[tsiaʔ⁵² kue⁵³-tsi⁵³ pai²¹ tsʰiu³³-tʰau²⁴]',
    indonesian: 'Makan buah ingat pohonnya (Tahu membalas budi)',
    literal: 'Makan buah sujud menghadap pangkal pohon',
    explanation: 'Peribahasa luhur tentang rasa syukur dan bakti kepada orang tua, guru, atau siapa saja yang telah menanam pohon kebaikan untuk kita.',
    tones: ['Nada 8', 'Nada 2', 'Nada 2', 'Nada 3', 'Nada 7', 'Nada 5'],
    situation: 'Nasihat moral kepada generasi muda agar selalu menghormati leluhur dan tidak sombong saat berhasil.',
    tag: 'Kearifan Moral'
  },
  {
    chinese: '有緣千里來相會',
    poj: 'Ū-iân chhian-lí lâi siong-hōe',
    ipa: '[u³³ ian²⁴ tsʰian⁵⁵ li⁵³ lai²⁴ siɔŋ⁵⁵ hue³³]',
    indonesian: 'Jika berjodoh, dari ribuan mil pun akan bertemu',
    literal: 'Ada takdir seribu li datang saling temu',
    explanation: 'Ungkapan puitis Hokkien tentang persahabatan, cinta, atau perjumpaan berharga yang dipercaya telah digariskan takdir.',
    tones: ['Nada 7', 'Nada 5', 'Nada 1', 'Nada 2', 'Nada 5', 'Nada 1', 'Nada 7'],
    situation: 'Diucapkan saat bertemu kawan lama atau kenalan baru yang langsung terasa akrab.',
    tag: 'Puitis & Kasih'
  },
  {
    chinese: '好水好氣',
    poj: 'Hó-súi hó-khì',
    ipa: '[ho⁵³-sui⁵³ ho⁵³-kʰi²¹]',
    indonesian: 'Sangat rupawan, elok, dan berwibawa menyenangkan',
    literal: 'Bagus air bagus udara/hawa',
    explanation: 'Pujian kultural yang menggambarkan seseorang yang tidak hanya berpenampilan elok menawan, tetapi juga ramah dan membangkitkan aura positif di sekitarnya.',
    tones: ['Nada 2', 'Nada 2', 'Nada 2', 'Nada 3'],
    situation: 'Pujian untuk sahabat atau kerabat yang datang berpakaian rapi dan tersenyum cerah.',
    tag: 'Pujian Akrab'
  }
]

export default function PhraseOfDay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { showToast } = useToast()

  const phrase = phrases[currentIndex]

  const handleCopy = () => {
    playClick()
    const text = `「${phrase.chinese}」(${phrase.poj})\nArti: ${phrase.indonesian}\nMakna: ${phrase.explanation}\nBelajar Bahasa Hokkien di HokkienLearn`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      showToast('📋 Frasa disalin ke clipboard!', 'success', 2000)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const nextPhrase = () => {
    playClick()
    setCurrentIndex(prev => (prev < phrases.length - 1 ? prev + 1 : 0))
  }

  const prevPhrase = () => {
    playClick()
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : phrases.length - 1))
  }

  const playVoice = () => {
    setIsPlaying(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(phrase.chinese)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.82
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setIsPlaying(false), 1200)
    }
  }

  return (
    <section className="pod section" id="phrase-of-day">
      <div className="container">
        <motion.div
          className="pod__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pod__tag">
            <HiSparkles className="pod__tag-icon" />
            <span>Frasa Pilihan Hari Ini</span>
          </div>
          <h2 className="pod__title">
            Ungkapan Populer & <span className="gradient-text">Filosofi Hokkien</span>
          </h2>
          <p className="pod__subtitle">
            Pahami makna di balik setiap ucapan khas penutur Minnan dari Medan, Bagansiapiapi, hingga Taiwan.
          </p>
        </motion.div>

        <div className="pod__container">
          <div className="pod__wrapper-with-nav">
            {/* Prev button */}
            <button
              className="pod__arrow-btn pod__arrow-btn--prev"
              onClick={prevPhrase}
              aria-label="Frasa sebelumnya"
            >
              <HiChevronLeft size={24} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                className="pod__card glass"
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="pod__badge-group">
                  <span className="pod__pill">{phrase.tag}</span>
                  <span className="pod__pill pod__pill--gold">Kearifan Lokal Minnan</span>
                  <span className="pod__counter-pill">
                    {currentIndex + 1} / {phrases.length}
                  </span>
                </div>

                <div className="pod__main-expression">
                  <span className="pod__chinese chinese-text">{phrase.chinese}</span>
                  <div className="pod__sound-row">
                    <span className="pod__poj">{phrase.poj}</span>
                    <span className="pod__ipa">{phrase.ipa}</span>
                    <button
                      className={`pod__audio-btn ${isPlaying ? 'pod__audio-btn--playing' : ''}`}
                      onClick={playVoice}
                      title="Dengarkan pelafalan asli"
                    >
                      <HiVolumeUp size={22} />
                      <span>{isPlaying ? 'Memutar...' : 'Dengar'}</span>
                    </button>
                  </div>
                </div>

                <div className="pod__translations">
                  <div className="pod__trans-box">
                    <span className="pod__trans-label">Arti Kontekstual:</span>
                    <p className="pod__trans-val">"{phrase.indonesian}"</p>
                  </div>
                  <div className="pod__trans-box pod__trans-box--sub">
                    <span className="pod__trans-label">Harfiah:</span>
                    <p className="pod__trans-val">{phrase.literal}</p>
                  </div>
                </div>

                <div className="pod__insight">
                  <div className="pod__insight-header">
                    <HiLightBulb className="pod__insight-icon" />
                    <span>Konteks & Nilai Budaya</span>
                  </div>
                  <p className="pod__insight-text">{phrase.explanation}</p>
                  <div className="pod__situation">
                    <strong>Kapan dipakai:</strong> {phrase.situation}
                  </div>
                </div>

                <div className="pod__tones-wrap">
                  <span className="pod__tones-title">Struktur Nada & Kontur:</span>
                  <div className="pod__tones-list">
                    {phrase.tones.map((t, idx) => (
                      <span key={idx} className="pod__tone-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pod__footer">
                  <div className="pod__nav-dots">
                    {phrases.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          playClick()
                          setCurrentIndex(i)
                        }}
                        className={`pod__dot ${i === currentIndex ? 'pod__dot--active' : ''}`}
                        aria-label={`Frasa ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    className={`pod__copy-btn ${copied ? 'pod__copy-btn--copied' : ''}`}
                    onClick={handleCopy}
                  >
                    {copied ? <HiCheck size={18} /> : <HiClipboardCopy size={18} />}
                    <span>{copied ? 'Tersalin!' : 'Bagikan / Salin'}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <button
              className="pod__arrow-btn pod__arrow-btn--next"
              onClick={nextPhrase}
              aria-label="Frasa berikutnya"
            >
              <HiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
