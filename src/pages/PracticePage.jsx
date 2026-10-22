import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiSparkles,
  HiLightningBolt,
  HiRefresh,
  HiCheck,
  HiX,
  HiVolumeUp,
  HiAcademicCap,
  HiMusicNote,
  HiPuzzle,
  HiLocationMarker
} from 'react-icons/hi'
import './PracticePage.css'

// 1. Comprehensive Quiz questions covering Medan & Taiwan Minnan
const quizQuestions = [
  {
    question: 'Di kedai kopi Medan, ungkapan "Lim kún-chúi" (飲滾水) berarti...',
    options: [
      'Minum air mentah dari keran',
      'Minum air putih yang sudah dimasak mendidih',
      'Minum kopi luwak kental',
      'Membeli es kelapa muda'
    ],
    correct: 1,
    explanation: '"Kún-chúi" (滾水) adalah air yang sudah direbus matang hingga mendidih. "Lim" adalah minum.'
  },
  {
    question: 'Jika ada teman di Medan berseru "Chin-chia̍h bô?!", maksudnya adalah...',
    options: [
      'Beneran nggak sih?! (Serius?!)',
      'Kamu sudah lapar belum?!',
      'Harganya murah banget?!',
      'Mau pulang jam berapa?!'
    ],
    correct: 0,
    explanation: '"Chin-chia̍h" (真實) adalah slang percakapan Medan untuk menanyakan kepastian/kebenaran.'
  },
  {
    question: 'Istilah "Lo̍k-kho" (落科) dalam tongkrongan anak muda Medan bermakna...',
    options: [
      'Juara satu / Menang banyak',
      'Zonk / Kalah telak / Jatuh gengsi',
      'Pergi makan mie',
      'Sedang banyak uang'
    ],
    correct: 1,
    explanation: '"Lo̍k-kho" adalah istilah kekalahan atau kesialan saat taruhan atau berbisnis.'
  },
  {
    question: 'Kata "Sio̍k" (俗) dalam transaksi jual-beli di pasar bermakna...',
    options: [
      'Mahal sekali',
      'Murah terjangkau',
      'Palsu / Rusak',
      'Habis terjual'
    ],
    correct: 1,
    explanation: '"Sio̍k" berarti murah. Lawan katanya adalah "Kùi" (貴) yang berarti mahal.'
  },
  {
    question: 'Panggilan "Akong" (阿公) dan "Amah" (阿嬤) berturut-turut adalah...',
    options: [
      'Paman dan Bibi',
      'Kakek dan Nenek',
      'Abang dan Kakak',
      'Ayah dan Ibu'
    ],
    correct: 1,
    explanation: 'Akong (阿公) adalah kakek dan Amah (阿嬤) adalah nenek dalam tradisi Tionghoa.'
  },
  {
    question: 'Pesanan minuman "Tê-o-peng" di kedai kopi peranakan menyajikan...',
    options: [
      'Es teh hitam manis tanpa susu',
      'Teh susu tarik hangat',
      'Jus jeruk murni',
      'Kopi susu dingin'
    ],
    correct: 0,
    explanation: '"Tê" = teh, "o" = hitam, "peng" = es batu.'
  },
  {
    question: 'Kata "Cuan" dalam bahasa Indonesia berasal dari kata Hokkien...',
    options: [
      '賺 (Thàn / Choàn)',
      '食 (Chia̍h)',
      '水 (Chúi)',
      '行 (Kiâⁿ)'
    ],
    correct: 0,
    explanation: '"Thàn" atau "Choàn" (賺) berarti mencari uang atau menghasilkan keuntungan.'
  },
  {
    question: 'Sapaan "Lí chia̍h-pá--bē?" (你食飽未) secara fungsional setara dengan...',
    options: [
      'Permisi numpang tanya',
      'Apa kabar? (Menanyakan kesejahteraan)',
      'Selamat jalan sampai jumpa',
      'Berapa harga barang ini?'
    ],
    correct: 1,
    explanation: 'Menanyakan sudah makan atau belum adalah bentuk sapaan paling akrab dan peduli dalam budaya Hokkien.'
  }
]

// 2. Listening / Tebak Suara Challenge
const listeningChallenges = [
  { hanji: '滾水', poj: 'Kún-chúi', options: ['Air masak matang', 'Kopi susu panas', 'Es teh manis', 'Kue lobak'], correct: 0 },
  { hanji: '頭家', poj: 'Thâu-ke', options: ['Karyawan baru', 'Tauke / Bos pemilik toko', 'Dokter tabib', 'Sopir angkot'], correct: 1 },
  { hanji: '歹勢', poj: 'Pháinn-sè', options: ['Terima kasih banyak', 'Selamat ulang tahun', 'Maaf / Permisi sungkan', 'Sampai jumpa besok'], correct: 2 },
  { hanji: '炒粿條', poj: 'Chhá-kóe-tiâu', options: ['Bakmi kuah', 'Nasi tim ayam', 'Kwetiau goreng', 'Bubur ikan'], correct: 2 },
  { hanji: '愛拼才會贏', poj: 'Ài piàⁿ chiah ē iâⁿ', options: ['Harus berjuang baru bisa menang', 'Hidup tenang tanpa beban', 'Makan kenyang tidur nyenyak', 'Beli banyak dapat murah'], correct: 0 }
]

// 3. Flashcard Deck
const flashcards = [
  { id: 1, hanji: '滾水', poj: 'Kún-chúi', indo: 'Air masak matang', tip: 'Khas Medan: "Thâu-ke, chi̍t-poe kún-chúi!"' },
  { id: 2, hanji: '歹勢', poj: 'Pháinn-sè', indo: 'Maaf / Permisi / Segan', tip: 'Sering dipakai saat meminta maaf atau permisi lewat' },
  { id: 3, hanji: '免客氣', poj: 'Bián kheh-khì', indo: 'Sama-sama / Jangan sungkan', tip: 'Jawaban sopan saat orang lain bilang "To-siā"' },
  { id: 4, hanji: '頭家', poj: 'Thâu-ke', indo: 'Pemilik kedai / Bos / Tauke', tip: 'Asal mula kata serapan bahasa Indonesia "Tauke"' },
  { id: 5, hanji: '好食', poj: 'Hó-chia̍h', indo: 'Enak / Lezat', tip: 'Dipakai memuji masakan sedap' },
  { id: 6, hanji: '菜頭粿', poj: 'Chhài-thâu-kóe', indo: 'Kue lobak goreng', tip: 'Sarapan favorit di Medan dan Selatpanjang' },
  { id: 7, hanji: '賺錢', poj: 'Thàn-chîⁿ', indo: 'Cari uang / Cuan untung', tip: 'Asal usul kata serapan "Cuan"' },
  { id: 8, hanji: '做伙', poj: 'Chò-hóe', indo: 'Bersama-sama / Barengan', tip: '"Lán chò-hóe chia̍h" = Kita makan bareng' }
]

// 4. Slang Matching Game Data
const slangPairs = [
  { id: 1, hokkien: 'Lim kún-chúi', match: 'Minum air matang' },
  { id: 2, hokkien: 'Chin-chia̍h', match: 'Beneran / Serius' },
  { id: 3, hokkien: 'Lo̍k-kho', match: 'Zonk / Kalah telak' },
  { id: 4, hokkien: 'Hó-súi', match: 'Cantik / Keren mantap' },
  { id: 5, hokkien: 'Bô-tī-tô', match: 'Tiba-tiba tanpa sebab' },
  { id: 6, hokkien: 'Cháu-chhù', match: 'Pulang ke rumah' }
]

// 5. 8 Hokkien Tones with Frequency Audio Pitch Generation
const hokkienTones = [
  { tone: 1, name: 'Im-piâⁿ (陰平)', pitchNum: '55', freqStart: 440, freqEnd: 440, duration: 0.6, example: 'Koe (Ayam)', desc: 'Nada tinggi datar stabil tanpa naik turun.' },
  { tone: 2, name: 'Im-siāⁿ (陰上)', pitchNum: '53', freqStart: 440, freqEnd: 330, duration: 0.5, example: 'Kóe (Kue)', desc: 'Mulai dari tinggi lalu meluncur turun tajam.' },
  { tone: 3, name: 'Im-khì (陰去)', pitchNum: '21', freqStart: 280, freqEnd: 210, duration: 0.5, example: 'Kòe (Lewat)', desc: 'Dimulai rendah dan meluncur ke bawah.' },
  { tone: 4, name: 'Im-ji̍p (陰入)', pitchNum: '2 (Pendek)', freqStart: 220, freqEnd: 220, duration: 0.18, example: 'Koeh (Darah)', desc: 'Nada perhentian pendek dengan akhiran -p, -t, -k, -h.' },
  { tone: 5, name: 'Iông-piâⁿ (陽平)', pitchNum: '24', freqStart: 250, freqEnd: 380, duration: 0.6, example: 'Kôe (Sepatu)', desc: 'Dimulai rendah kemudian melesat naik seperti bertanya.' },
  { tone: 7, name: 'Iông-khì (陽去)', pitchNum: '33', freqStart: 320, freqEnd: 320, duration: 0.6, example: 'Kōe (Duduk)', desc: 'Nada tengah datar mantap tanpa getaran.' },
  { tone: 8, name: 'Iông-ji̍p (陽入)', pitchNum: '4 (Pendek)', freqStart: 380, freqEnd: 380, duration: 0.18, example: 'Ke̍h (Ketat)', desc: 'Nada perhentian cepat namun berfrekuensi tinggi.' }
]

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState('quiz')

  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [streak, setStreak] = useState(0)

  // Listening Challenge state
  const [listenIdx, setListenIdx] = useState(0)
  const [listenSelected, setListenSelected] = useState(null)
  const [listenScore, setListenScore] = useState(0)
  const [listenFinished, setListenFinished] = useState(false)

  // Flashcard state
  const [fcIndex, setFcIndex] = useState(0)
  const [fcFlipped, setFcFlipped] = useState(false)
  const [knownCount, setKnownCount] = useState(0)

  // Tone state
  const [activeTone, setActiveTone] = useState(0)
  const audioCtxRef = useRef(null)

  // Match Game state
  const [selectedHokkien, setSelectedHokkien] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])

  // Web Audio Tone Synthesizer
  const playToneSound = (t) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'

      const now = ctx.currentTime
      osc.frequency.setValueAtTime(t.freqStart, now)
      if (t.freqStart !== t.freqEnd) {
        osc.frequency.exponentialRampToValueAtTime(t.freqEnd, now + t.duration)
      }

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + t.duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + t.duration)
    } catch (e) {
      console.warn('Web Audio error:', e)
    }
  }

  const speakText = (txt) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(txt)
      u.lang = 'zh-TW'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    }
  }

  // Quiz logic
  const handleSelectOption = (idx) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    const isCorrect = idx === quizQuestions[currentQuiz].correct
    if (isCorrect) {
      setScore(s => s + 12.5)
      setStreak(st => st + 1)
    } else {
      setStreak(0)
    }
  }

  const handleNextQuiz = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(c => c + 1)
      setSelectedAnswer(null)
    } else {
      setQuizFinished(true)
    }
  }

  // Listening Challenge logic
  const handleSelectListening = (idx) => {
    if (listenSelected !== null) return
    setListenSelected(idx)
    if (idx === listeningChallenges[listenIdx].correct) {
      setListenScore(s => s + 20)
    }
  }

  const handleNextListening = () => {
    if (listenIdx < listeningChallenges.length - 1) {
      setListenIdx(l => l + 1)
      setListenSelected(null)
    } else {
      setListenFinished(true)
    }
  }

  // Matching game logic
  const handleHokkienClick = (item) => {
    if (matchedPairs.includes(item.id)) return
    setSelectedHokkien(item)
  }

  const handleMeaningClick = (item) => {
    if (!selectedHokkien) return
    if (selectedHokkien.id === item.id) {
      setMatchedPairs([...matchedPairs, item.id])
      setSelectedHokkien(null)
    } else {
      setSelectedHokkien(null)
    }
  }

  return (
    <div className="practice-page">
      {/* Hero */}
      <div className="practice-hero">
        <div className="container">
          <div className="practice-hero__content">
            <span className="practice-hero__tag">
              <HiLightningBolt /> Arena Latihan & Game Interaktif
            </span>
            <h1 className="practice-hero__title">
              Asah Kemampuan <span className="gradient-text">Hokkien Anda</span>
            </h1>
            <p className="practice-hero__subtitle">
              Pilih mode latihan seru: Kuis Pemahaman, Tebak Suara Asli, Kartu Flashcard 3D,
              Jodohkan Slang Medan, atau Pelatih 8 Nada dengan Frekuensi Web Audio!
            </p>

            {/* Mode Navigator */}
            <div className="practice-mode-nav">
              <button
                className={`practice-mode-btn ${activeTab === 'quiz' ? 'practice-mode-btn--active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                <HiAcademicCap size={18} />
                <span>Kuis Pilihan Ganda</span>
              </button>
              <button
                className={`practice-mode-btn ${activeTab === 'listening' ? 'practice-mode-btn--active' : ''}`}
                onClick={() => setActiveTab('listening')}
              >
                <HiVolumeUp size={18} />
                <span>Tebak Suara</span>
              </button>
              <button
                className={`practice-mode-btn ${activeTab === 'flashcard' ? 'practice-mode-btn--active' : ''}`}
                onClick={() => setActiveTab('flashcard')}
              >
                <HiRefresh size={18} />
                <span>Kartu Flashcards</span>
              </button>
              <button
                className={`practice-mode-btn ${activeTab === 'matching' ? 'practice-mode-btn--active' : ''}`}
                onClick={() => setActiveTab('matching')}
              >
                <HiPuzzle size={18} />
                <span>Jodohkan Slang Medan</span>
              </button>
              <button
                className={`practice-mode-btn ${activeTab === 'tones' ? 'practice-mode-btn--active' : ''}`}
                onClick={() => setActiveTab('tones')}
              >
                <HiMusicNote size={18} />
                <span>Pelatih 8 Nada</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container practice-main">
        {/* MODE 1: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="quiz-container">
            {!quizFinished ? (
              <div className="quiz-card glass">
                <div className="quiz-header">
                  <span className="quiz-counter">
                    Pertanyaan {currentQuiz + 1} dari {quizQuestions.length}
                  </span>
                  <div className="quiz-stats">
                    <span className="quiz-streak">🔥 Streak: {streak}</span>
                    <span className="quiz-score">Skor: {Math.round(score)}</span>
                  </div>
                </div>

                <div className="quiz-progress-bar">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h2 className="quiz-question">{quizQuestions[currentQuiz].question}</h2>

                <div className="quiz-options">
                  {quizQuestions[currentQuiz].options.map((opt, i) => {
                    let optClass = 'quiz-option'
                    if (selectedAnswer !== null) {
                      if (i === quizQuestions[currentQuiz].correct) {
                        optClass += ' quiz-option--correct'
                      } else if (i === selectedAnswer) {
                        optClass += ' quiz-option--wrong'
                      }
                    }

                    return (
                      <button
                        key={i}
                        className={optClass}
                        onClick={() => handleSelectOption(i)}
                        disabled={selectedAnswer !== null}
                      >
                        <span className="quiz-option__letter">{String.fromCharCode(65 + i)}</span>
                        <span className="quiz-option__text">{opt}</span>
                        {selectedAnswer !== null && i === quizQuestions[currentQuiz].correct && (
                          <HiCheck className="quiz-option__icon quiz-option__icon--ok" />
                        )}
                        {selectedAnswer !== null && i === selectedAnswer && i !== quizQuestions[currentQuiz].correct && (
                          <HiX className="quiz-option__icon quiz-option__icon--fail" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {selectedAnswer !== null && (
                  <motion.div
                    className="quiz-feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="quiz-explanation">
                      💡 {quizQuestions[currentQuiz].explanation}
                    </p>
                    <button className="quiz-next-btn" onClick={handleNextQuiz}>
                      {currentQuiz < quizQuestions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="quiz-result glass">
                <span className="quiz-result__trophy">🏆</span>
                <h2 className="quiz-result__title">Kuis Selesai!</h2>
                <p className="quiz-result__desc">
                  Luar biasa! Anda telah menguasai kosakata dan ungkapan penting Hokkien Medan & Taiwan.
                </p>
                <div className="quiz-result__score-badge">
                  Skor Akhir: <strong>{Math.round(score)} / 100</strong>
                </div>
                <button
                  className="quiz-restart-btn"
                  onClick={() => {
                    setCurrentQuiz(0)
                    setSelectedAnswer(null)
                    setScore(0)
                    setStreak(0)
                    setQuizFinished(false)
                  }}
                >
                  <HiRefresh /> Ulangi Kuis
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: TEBAK SUARA / LISTENING */}
        {activeTab === 'listening' && (
          <div className="listening-container">
            {!listenFinished ? (
              <div className="listening-card glass">
                <span className="listening-badge">Tantangan Pendengaran #{listenIdx + 1}</span>
                <h3 className="listening-prompt">Dengarkan audio, lalu tebak arti katanya:</h3>

                <div className="listening-audio-center">
                  <button
                    className="listening-play-giant"
                    onClick={() => speakText(listeningChallenges[listenIdx].hanji)}
                    title="Putar Suara"
                  >
                    <HiVolumeUp size={36} />
                    <span>Dengar Pengucapan</span>
                  </button>
                  <span className="listening-hanji-hint chinese-text">
                    {listeningChallenges[listenIdx].hanji} ({listeningChallenges[listenIdx].poj})
                  </span>
                </div>

                <div className="listening-options">
                  {listeningChallenges[listenIdx].options.map((opt, oi) => {
                    let btnClass = 'listening-opt'
                    if (listenSelected !== null) {
                      if (oi === listeningChallenges[listenIdx].correct) {
                        btnClass += ' listening-opt--correct'
                      } else if (oi === listenSelected) {
                        btnClass += ' listening-opt--wrong'
                      }
                    }

                    return (
                      <button
                        key={oi}
                        className={btnClass}
                        onClick={() => handleSelectListening(oi)}
                        disabled={listenSelected !== null}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>

                {listenSelected !== null && (
                  <button className="listening-next-btn" onClick={handleNextListening}>
                    {listenIdx < listeningChallenges.length - 1 ? 'Soal Berikutnya' : 'Selesai Tantangan'}
                  </button>
                )}
              </div>
            ) : (
              <div className="quiz-result glass">
                <span className="quiz-result__trophy">🎧</span>
                <h2 className="quiz-result__title">Tantangan Audio Tuntas!</h2>
                <p className="quiz-result__desc">Pendengaran Anda terhadap nada dan vokal Minnan semakin tajam.</p>
                <div className="quiz-result__score-badge">
                  Skor: <strong>{listenScore} / 100</strong>
                </div>
                <button
                  className="quiz-restart-btn"
                  onClick={() => {
                    setListenIdx(0)
                    setListenSelected(null)
                    setListenScore(0)
                    setListenFinished(false)
                  }}
                >
                  <HiRefresh /> Coba Lagi
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: FLASHCARDS */}
        {activeTab === 'flashcard' && (
          <div className="fc-container">
            <div className="fc-meta">
              <span>Kartu {fcIndex + 1} dari {flashcards.length}</span>
              <span className="fc-known">Hafal: {knownCount}</span>
            </div>

            <div
              className={`fc-card glass ${fcFlipped ? 'fc-card--flipped' : ''}`}
              onClick={() => setFcFlipped(!fcFlipped)}
            >
              <div className="fc-card__inner">
                <div className="fc-card__front">
                  <span className="fc-card__hanji chinese-text">{flashcards[fcIndex].hanji}</span>
                  <span className="fc-card__poj">{flashcards[fcIndex].poj}</span>
                  <button
                    className="fc-card__audio"
                    onClick={(e) => {
                      e.stopPropagation()
                      speakText(flashcards[fcIndex].hanji)
                    }}
                  >
                    <HiVolumeUp size={20} />
                  </button>
                  <span className="fc-card__tap-hint">Ketuk kartu untuk melihat arti</span>
                </div>

                <div className="fc-card__back">
                  <span className="fc-card__indo">{flashcards[fcIndex].indo}</span>
                  <p className="fc-card__tip">💡 {flashcards[fcIndex].tip}</p>
                  <span className="fc-card__tap-hint">Ketuk untuk membalik kembali</span>
                </div>
              </div>
            </div>

            <div className="fc-actions">
              <button
                className="fc-btn fc-btn--review"
                onClick={() => {
                  setFcFlipped(false)
                  setTimeout(() => setFcIndex((fcIndex + 1) % flashcards.length), 200)
                }}
              >
                Belum Hafal
              </button>
              <button
                className="fc-btn fc-btn--known"
                onClick={() => {
                  setKnownCount(k => k + 1)
                  setFcFlipped(false)
                  setTimeout(() => setFcIndex((fcIndex + 1) % flashcards.length), 200)
                }}
              >
                Sudah Hafal ✓
              </button>
            </div>
          </div>
        )}

        {/* MODE 4: JODOHKAN SLANG MEDAN */}
        {activeTab === 'matching' && (
          <div className="matching-container glass">
            <div className="matching-header">
              <HiLocationMarker className="matching-icon" />
              <div>
                <h3>Game Jodohkan Slang Hokkien Medan</h3>
                <p>Klik kata Hokkien di sebelah kiri, lalu klik arti padanannya di sebelah kanan!</p>
              </div>
            </div>

            <div className="matching-board">
              <div className="matching-col">
                <span className="matching-col-title">Istilah Medan</span>
                {slangPairs.map(item => {
                  const isDone = matchedPairs.includes(item.id)
                  const isSelected = selectedHokkien?.id === item.id
                  return (
                    <button
                      key={item.id}
                      className={`matching-btn ${isSelected ? 'matching-btn--selected' : ''} ${isDone ? 'matching-btn--done' : ''}`}
                      onClick={() => handleHokkienClick(item)}
                      disabled={isDone}
                    >
                      {item.hokkien}
                    </button>
                  )
                })}
              </div>

              <div className="matching-col">
                <span className="matching-col-title">Arti Makna</span>
                {slangPairs.map(item => {
                  const isDone = matchedPairs.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      className={`matching-btn matching-btn--meaning ${isDone ? 'matching-btn--done' : ''}`}
                      onClick={() => handleMeaningClick(item)}
                      disabled={isDone}
                    >
                      {item.match}
                    </button>
                  )
                })}
              </div>
            </div>

            {matchedPairs.length === slangPairs.length && (
              <motion.div
                className="matching-won glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                🎉 Hebat Sekali! Semua pasangan slang Medan berhasil dijodohkan dengan sempurna!
                <button
                  className="matching-reset-btn"
                  onClick={() => {
                    setMatchedPairs([])
                    setSelectedHokkien(null)
                  }}
                >
                  Main Lagi
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* MODE 5: 8 TONES TRAINER WITH SYNTHESIZER */}
        {activeTab === 'tones' && (
          <div className="tones-container">
            <div className="tones-intro glass">
              <h3 className="tones-intro__title">Pelatih Frekuensi 8 Nada Kuno Minnan</h3>
              <p className="tones-intro__desc">
                Tekan tombol <strong>"Bunyikan Nada"</strong> untuk mendengarkan gelombang suara murni (synthesizer)
                sesuai kontur nada asli bahasa Hokkien, atau tekan tombol suara untuk mendengar pengucapan vokal manusia.
              </p>
            </div>

            <div className="tones-grid">
              {hokkienTones.map((t, idx) => (
                <div
                  key={t.tone}
                  className={`tone-card glass ${activeTone === idx ? 'tone-card--active' : ''}`}
                  onClick={() => setActiveTone(idx)}
                >
                  <div className="tone-card__head">
                    <span className="tone-card__num">Nada {t.tone}</span>
                    <span className="tone-card__pitch">Tinggi Nada: {t.pitchNum}</span>
                  </div>
                  <h4 className="tone-card__name">{t.name}</h4>

                  <div className="tone-card__synth-row">
                    <button
                      className="tone-synth-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        playToneSound(t)
                      }}
                      title="Bunyikan frekuensi osilator nada"
                    >
                      <HiMusicNote />
                      <span>Bunyi Nada ({t.freqStart}Hz)</span>
                    </button>

                    <button
                      className="tone-voice-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        speakText(t.example.split(' ')[0])
                      }}
                      title="Dengar suara vokal kata"
                    >
                      <HiVolumeUp />
                    </button>
                  </div>

                  <div className="tone-card__example">
                    <span>Contoh Kata: <strong>{t.example}</strong></span>
                  </div>

                  <p className="tone-card__desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
