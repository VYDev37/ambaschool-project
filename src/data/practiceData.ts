export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface ListeningChallenge {
  hanji: string
  poj: string
  options: string[]
  correct: number
}

export interface FlashcardItem {
  id: number
  hanji: string
  poj: string
  indo: string
  tip: string
}

export interface SlangPair {
  id: number
  hokkien: string
  match: string
}

export interface HokkienTone {
  tone: number
  name: string
  pitchNum: string
  freqStart: number
  freqEnd: number
  duration: number
  example: string
  desc: string
}

export const quizQuestions: QuizQuestion[] = [
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
  },
  {
    question: 'Keunikan nada ke-4 dan ke-8 (Ji̍p-siaⁿ / Entering Tone) dalam fonetik Hokkien adalah...',
    options: [
      'Selalu diakhiri konsonan letup pendek (-p, -t, -k, atau -h)',
      'Hanya boleh diucapkan oleh pria dewasa',
      'Berdengung panjang seperti nyanyian seruling',
      'Tidak memiliki arti harfiah'
    ],
    correct: 0,
    explanation: 'Nada 4 dan 8 adalah nada perhentian bersuara pendek terputus yang melestarikan fonologi Tionghoa kuno.'
  },
  {
    question: 'Kata serapan kuliner "Bí-hún" (米粉) secara harfiah berarti...',
    options: [
      'Serat/Tepung dari beras (Bí = Beras, Hún = Tepung)',
      'Mie terigu kenyal',
      'Gorengan pisang kepok',
      'Daging ayam cincang'
    ],
    correct: 0,
    explanation: '"Bí" berarti beras dan "Hún" berarti tepung halus.'
  },
  {
    question: 'Istilah pasar di Taiwan disebut "Chhài-chhī-á" (菜市仔), sedangkan di Medan umum disebut...',
    options: [
      'Pa-sat (巴刹 - serapan Melayu)',
      'Kopitiam',
      'Chē-chhia',
      'Kún-chúi'
    ],
    correct: 0,
    explanation: 'Hokkien Medan menyerap kata Melayu "Pasar" menjadi "Pa-sat" yang sangat lazim digunakan.'
  },
  {
    question: 'Nilai kejujuran dan kepercayaan dalam berbisnis pedagang Tionghoa disebut...',
    options: [
      '誠信 (Sêng-sìn)',
      '落科 (Lo̍k-kho)',
      '無底代 (Bô-tī-tô)',
      '愛睏 (Ài-khùn)'
    ],
    correct: 0,
    explanation: '"Sêng-sìn" (誠信) adalah integritas dan kejujuran yang menjadi kunci keberhasilan niaga.'
  },
  {
    question: 'Doa "Chia̍h pah-jī" sering diucapkan kepada Akong & Amah yang bermakna...',
    options: [
      'Panjang umur sampai 120 tahun',
      'Makan dua belas mangkuk mie',
      'Membagikan 120 amplop angpao',
      'Jalan sehat seratus langkah'
    ],
    correct: 0,
    explanation: '"Pah-jī" (120) melambangkan umur yang sangat panjang, berkah, dan sehat.'
  },
  {
    question: 'Ungkapan rasa syukur "Hó-ka-chài" (好佳哉) dalam bahasa Indonesia berarti...',
    options: [
      'Untunglah! / Syukurlah selamat!',
      'Harganya sangat mahal!',
      'Jangan bohongi saya!',
      'Sampai bertemu besok pagi!'
    ],
    correct: 0,
    explanation: '"Hó-ka-chài" diucapkan saat merasa lega terhindar dari kesialan atau bahaya.'
  },
  {
    question: 'Kata "Chhit-thô" (七逃) yang sangat populer di kalangan anak muda bermakna...',
    options: [
      'Jalan-jalan / Rekreasi santai / Bermain',
      'Bekerja keras di kantor',
      'Tertidur di meja belajar',
      'Membayar tagihan listrik'
    ],
    correct: 0,
    explanation: '"Chhit-thô" bermakna bermain, bepergian santai, atau refreshing liburan.'
  },
  {
    question: 'Kuliner sup herbal iga berkuah rempah khas pesisir Sumatera & Selat Malaka disebut...',
    options: [
      '肉骨茶 (Bah-kut-tê)',
      '豆花 (Tāu-hoe)',
      '米粉 (Bí-hún)',
      '薄餅 (Po̍h-piáⁿ)'
    ],
    correct: 0,
    explanation: 'Bah-kut-tê adalah kuliner peranakan legendaris yang memadukan daging iga dan rempah herbal.'
  },
  {
    question: 'Jika ingin berbelok ke arah kanan, instruksi dalam bahasa Hokkien adalah...',
    options: [
      'Uan chià-pîng (Belok kanan)',
      'Uan tò-pîng (Belok kiri)',
      'Ti̍t-ti̍t kiâⁿ (Lurus terus)',
      'Thêng chhia (Stop di sini)'
    ],
    correct: 0,
    explanation: '"Chià-pîng" adalah sebelah kanan, sedangkan "Tò-pîng" adalah kiri.'
  },
  {
    question: 'Aksara "厝" (dibaca "Chhù") dalam bahasa Hokkien memiliki arti...',
    options: [
      'Rumah kediaman',
      'Pasar tradisional',
      'Perahu nelayan',
      'Toko kelontong'
    ],
    correct: 0,
    explanation: '"Chhù" adalah kosakata klasik Minnan yang berarti rumah hunian.'
  },
  {
    question: 'Pepatah dan lagu legendaris "Ài piàⁿ chiah ē iâⁿ" mengajarkan bahwa...',
    options: [
      'Harus berjuang dan bekerja keras baru bisa meraih kemenangan',
      'Orang yang santai akan selalu beruntung',
      'Cukup berdoa tanpa perlu berusaha',
      'Beli barang murah pasti untung'
    ],
    correct: 0,
    explanation: '"Ài piàⁿ chiah ē iâⁿ" melambangkan etos kerja keras dan keuletan perantau Hokkien.'
  },
  {
    question: 'Mengapa buah Nanas ("Ông-lâi" / 鳳梨) selalu hadir saat Imlek & Sembahyang Hokkien?',
    options: [
      'Pelafalannya "Ông-lâi" berbunyi seperti ungkapan "Kemakmuran & Rezeki Datang"',
      'Karena buah nanas berakar di pegunungan Minnan',
      'Karena rasanya tidak disukai hewan buas',
      'Karena berwarna merah menyala'
    ],
    correct: 0,
    explanation: 'Bunyi "Ông-lâi" homofon dengan kata "Kemakmuran Datang" (旺來).'
  }
]

export const listeningChallenges: ListeningChallenge[] = [
  { hanji: '滾水', poj: 'Kún-chúi', options: ['Air masak matang', 'Kopi susu panas', 'Es teh manis', 'Kue lobak'], correct: 0 },
  { hanji: '頭家', poj: 'Thâu-ke', options: ['Karyawan baru', 'Tauke / Bos pemilik toko', 'Dokter tabib', 'Sopir angkot'], correct: 1 },
  { hanji: '歹勢', poj: 'Pháinn-sè', options: ['Terima kasih banyak', 'Selamat ulang tahun', 'Maaf / Permisi sungkan', 'Sampai jumpa besok'], correct: 2 },
  { hanji: '炒粿條', poj: 'Chhá-kóe-tiâu', options: ['Bakmi kuah', 'Nasi tim ayam', 'Kwetiau goreng', 'Bubur ikan'], correct: 2 },
  { hanji: '愛拼才會贏', poj: 'Ài piàⁿ chiah ē iâⁿ', options: ['Harus berjuang baru bisa menang', 'Hidup tenang tanpa beban', 'Makan kenyang tidur nyenyak', 'Beli banyak dapat murah'], correct: 0 },
  { hanji: '咖啡烏冰', poj: 'Ko-pi-o-peng', options: ['Es kopi hitam manis', 'Teh susu kental', 'Es kembang tahu', 'Air kelapa muda'], correct: 0 },
  { hanji: '多謝', poj: 'To-siā', options: ['Selamat pagi', 'Terima kasih banyak', 'Tidak apa-apa', 'Silakan masuk'], correct: 1 },
  { hanji: '菜頭粿', poj: 'Chhài-thâu-kóe', options: ['Kue lobak goreng gurih', 'Kue bolu keju', 'Kue onde wijen', 'Roti selai srikaya'], correct: 0 },
  { hanji: '兄弟', poj: 'Hia-tī', options: ['Paman kakek', 'Sobat karib / Bro akrab', 'Pemilik toko', 'Penjual sayur'], correct: 1 },
  { hanji: '做生意', poj: 'Chò seng-lí', options: ['Berdagang / Bisnis niaga', 'Menulis surat kabar', 'Menyanyi di panggung', 'Berolahraga pagi'], correct: 0 },
  { hanji: '豆花', poj: 'Tāu-hoe', options: ['Kembang tahu kuah jahe manis', 'Kecap asin pekat', 'Tempe goreng tepung', 'Tahu kering tumis'], correct: 0 },
  { hanji: '好看', poj: 'Hó-súi', options: ['Sulit dipahami', 'Biasa saja', 'Keren / Mantap / Menawan', 'Sangat mahal'], correct: 2 }
]

export const flashcards: FlashcardItem[] = [
  { id: 1, hanji: '滾水', poj: 'Kún-chúi', indo: 'Air masak matang', tip: 'Khas Medan: "Thâu-ke, chi̍t-poe kún-chúi!"' },
  { id: 2, hanji: '歹勢', poj: 'Pháinn-sè', indo: 'Maaf / Permisi / Segan', tip: 'Sering dipakai saat meminta maaf atau permisi lewat' },
  { id: 3, hanji: '免客氣', poj: 'Bián kheh-khì', indo: 'Sama-sama / Jangan sungkan', tip: 'Jawaban sopan saat orang lain bilang "To-siā"' },
  { id: 4, hanji: '頭家', poj: 'Thâu-ke', indo: 'Pemilik kedai / Bos / Tauke', tip: 'Asal mula kata serapan bahasa Indonesia "Tauke"' },
  { id: 5, hanji: '好食', poj: 'Hó-chia̍h', indo: 'Enak / Lezat', tip: 'Dipakai memuji masakan sedap' },
  { id: 6, hanji: '菜頭粿', poj: 'Chhài-thâu-kóe', indo: 'Kue lobak goreng', tip: 'Sarapan favorit di Medan dan Selatpanjang' },
  { id: 7, hanji: '賺錢', poj: 'Thàn-chîⁿ', indo: 'Cari uang / Cuan untung', tip: 'Asal usul kata serapan "Cuan"' },
  { id: 8, hanji: '做伙', poj: 'Chò-hóe', indo: 'Bersama-sama / Barengan', tip: '"Lán chò-hóe chia̍h" = Kita makan bareng' },
  { id: 9, hanji: '俗', poj: 'Sio̍k', indo: 'Murah meriah', tip: 'Lawan kata dari "Kùi" (mahal)' },
  { id: 10, hanji: '貴', poj: 'Kùi', indo: 'Mahal harganya', tip: 'Sering dipakai saat tawar harga di pasar' },
  { id: 11, hanji: '食飽未', poj: 'Chia̍h-pá--bē', indo: 'Sudah makan belum? (Apa kabar)', tip: 'Sapaan hangat penuh perhatian' },
  { id: 12, hanji: '愛拼才會贏', poj: 'Ài piàⁿ chiah ē iâⁿ', indo: 'Berjuang keras baru bisa menang', tip: 'Etos kerja tangguh orang Minnan' },
  { id: 13, hanji: '七逃', poj: 'Chhit-thô', indo: 'Jalan-jalan / Rekreasi / Healing', tip: 'Ungkapan gaul santai melepas penat' },
  { id: 14, hanji: '合意', poj: 'Kah-ì', indo: 'Suka / Cocok di hati', tip: '"Góa chin kah-ì lí" = Aku suka padamu' },
  { id: 15, hanji: '阿公', poj: 'A-kong', indo: 'Kakek tercinta', tip: 'Kepala keluarga sesepuh' },
  { id: 16, hanji: '阿嬤', poj: 'A-má', indo: 'Nenek tercinta', tip: 'Nenek penyayang cucu' }
]

export const slangPairs: SlangPair[] = [
  { id: 1, hokkien: 'Lim kún-chúi', match: 'Minum air matang' },
  { id: 2, hokkien: 'Chin-chia̍h', match: 'Beneran / Serius' },
  { id: 3, hokkien: 'Lo̍k-kho', match: 'Zonk / Kalah telak' },
  { id: 4, hokkien: 'Hó-súi', match: 'Cantik / Keren mantap' },
  { id: 5, hokkien: 'Bô-tī-tô', match: 'Tiba-tiba tanpa sebab' },
  { id: 6, hokkien: 'Cháu-chhù', match: 'Pulang ke rumah' },
  { id: 7, hokkien: 'Thàn-chîⁿ', match: 'Cari cuan / untung' },
  { id: 8, hokkien: 'Sio̍k', match: 'Murah meriah' },
  { id: 9, hokkien: 'Hia-tī', match: 'Bro / Sahabat karib' },
  { id: 10, hokkien: 'Ká-kín', match: 'Cepat / Buruan' }
]

export const hokkienTones: HokkienTone[] = [
  { tone: 1, name: 'Im-piâⁿ (陰平)', pitchNum: '55', freqStart: 440, freqEnd: 440, duration: 0.6, example: 'Koe (Ayam)', desc: 'Nada tinggi datar stabil tanpa naik turun.' },
  { tone: 2, name: 'Im-siāⁿ (陰上)', pitchNum: '53', freqStart: 440, freqEnd: 330, duration: 0.5, example: 'Kóe (Kue)', desc: 'Mulai dari tinggi lalu meluncur turun tajam.' },
  { tone: 3, name: 'Im-khì (陰去)', pitchNum: '21', freqStart: 280, freqEnd: 210, duration: 0.5, example: 'Kòe (Lewat)', desc: 'Dimulai rendah dan meluncur ke bawah.' },
  { tone: 4, name: 'Im-ji̍p (陰入)', pitchNum: '2 (Pendek)', freqStart: 220, freqEnd: 220, duration: 0.18, example: 'Koeh (Darah)', desc: 'Nada perhentian pendek dengan akhiran -p, -t, -k, -h.' },
  { tone: 5, name: 'Iông-piâⁿ (陽平)', pitchNum: '24', freqStart: 250, freqEnd: 380, duration: 0.6, example: 'Kôe (Sepatu)', desc: 'Dimulai rendah kemudian melesat naik seperti bertanya.' },
  { tone: 7, name: 'Iông-khì (陽去)', pitchNum: '33', freqStart: 320, freqEnd: 320, duration: 0.6, example: 'Kōe (Duduk)', desc: 'Nada tengah datar mantap tanpa getaran.' },
  { tone: 8, name: 'Iông-ji̍p (陽入)', pitchNum: '4 (Pendek)', freqStart: 380, freqEnd: 380, duration: 0.18, example: 'Ke̍h (Ketat)', desc: 'Nada perhentian cepat namun berfrekuensi tinggi.' }
]
