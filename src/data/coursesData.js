// Database Kursus & Modul Pelajaran Interaktif Bahasa Hokkien
// Khusus memadukan kurikulum standar Taiwan dan percakapan otentik Hokkien Medan / Nusantara

export const coursesModules = [
  {
    id: 1,
    level: 'Pemula',
    category: 'Medan & Nusantara',
    title: 'Modul 1: Budaya Kedai Kopi & Sapaan Akrab Medan',
    subtitle: 'Belajar sapaan sehari-hari, memesan "Lim Kún-chúi", Kopi O, dan menanyakan kabar.',
    duration: '15 Menit',
    badge: 'Kopitiam Master',
    culturalNote: 'Di Medan dan pesisir Sumatera, saat memesan air putih orang tidak menyebut "chúi" (yang berarti air mentah), melainkan "kún-chúi" (滾水, harfiah: air yang sudah dimasak mendidih). Ini adalah bentuk higienitas dan adab kopitiam.',
    dialogue: [
      { speaker: 'Ah-Bûn (Pelanggan)', role: 'A', hanji: '頭家，早安！有位無？', poj: 'Thâu-ke, chá-khí! Ū ūi--bô?', indo: 'Bos, selamat pagi! Ada meja kosong tidak?' },
      { speaker: 'Thâu-ke (Pemilik Kedai)', role: 'B', hanji: '有啦，入來坐！愛飲啥物水？', poj: 'Ū--lah, ji̍p-lâi chē! Ài lim siáⁿ-mi̍h chúi?', indo: 'Ada dong, masuk sini duduk! Mau minum apa?' },
      { speaker: 'Ah-Bûn (Pelanggan)', role: 'A', hanji: '先來一杯滾水，佮一杯咖啡烏冰！', poj: 'Seng lâi chi̍t-poe kún-chúi, kap chi̍t-poe ko-pi-o-peng!', indo: 'Pertama minta segelas air putih matang, dan segelas es kopi hitam manis!' },
      { speaker: 'Thâu-ke (Pemilik Kedai)', role: 'B', hanji: '好，你食飽未？愛食炒粿條無？', poj: 'Hó, lí chia̍h-pá--bē? Ài chia̍h chhá-kóe-tiâu--bô?', indo: 'Baik, kamu sudah makan belum? Mau makan kwetiau goreng tidak?' },
      { speaker: 'Ah-Bûn (Pelanggan)', role: 'A', hanji: '愛！一碗無加辣，多謝頭家！', poj: 'Ài! Chi̍t-óaⁿ bô ka hia̍t, to-siā thâu-ke!', indo: 'Mau! Semangkuk jangan pakai pedas ya, terima kasih bos!' }
    ],
    vocab: [
      { hanji: '滾水', poj: 'Kún-chúi', indo: 'Air putih matang / air masak' },
      { hanji: '飲滾水', poj: 'Lim kún-chúi', indo: 'Minum air putih matang' },
      { hanji: '頭家', poj: 'Thâu-ke', indo: 'Bos / Pemilik kedai / Tauke' },
      { hanji: '食飽未', poj: 'Chia̍h-pá--bē', indo: 'Sudah makan belum?' },
      { hanji: '咖啡烏冰', poj: 'Ko-pi-o-peng', indo: 'Es kopi hitam manis tanpa susu' },
      { hanji: '炒粿條', poj: 'Chhá-kóe-tiâu', indo: 'Kwetiau goreng' }
    ],
    quiz: {
      question: 'Di kedai kopi Medan, jika Anda ingin memesan air putih matang hangat, apa yang Anda katakan?',
      options: ['Thâu-ke, lâi chi̍t-poe kún-chúi', 'Thâu-ke, góa ài cháu-chhù', 'Thâu-ke, chin lo̍k-kho', 'Thâu-ke, pháinn-sè bô chîⁿ'],
      correct: 0,
      explanation: '"Lâi chi̍t-poe kún-chúi" adalah ungkapan paling tepat dan otentik untuk memesan air putih masak!'
    }
  },
  {
    id: 2,
    level: 'Pemula',
    category: 'Pasar & Transaksi',
    title: 'Modul 2: Tawar Menawar di Pasar Tradisional (Pa-sat)',
    subtitle: 'Menguasai istilah belanja, tawar harga, menyebut nominal rupiah, dan istilah "Sio̍k" vs "Kùi".',
    duration: '18 Menit',
    badge: 'Ahli Pasar',
    culturalNote: 'Istilah "Pa-sat" di kalangan penutur Hokkien Medan adalah serapan dari kata Melayu "Pasar". Kata nominal "Kho͘" digunakan untuk menyebut Rupiah.',
    dialogue: [
      { speaker: 'I-má (Pembeli)', role: 'A', hanji: '頭家娘，這个魚一斤若濟錢？', poj: 'Thâu-ke-niû, chit-ê hî chi̍t-kin lōa-chē chîⁿ?', indo: 'Nyonya bos, ikan ini satu kilogram berapa uang?' },
      { speaker: 'Thâu-ke-niû (Penjual)', role: 'B', hanji: '一斤八萬箍，真新鮮！', poj: 'Chi̍t-kin peh-bān kho͘, chin sin-siar!', indo: 'Satu kilo 80 ribu rupiah, segar sekali!' },
      { speaker: 'I-má (Pembeli)', role: 'A', hanji: 'Wa, siuⁿ kùi lah! 算俗一點，七萬好無？', poj: 'Wa, siuⁿ kùi lah! Sǹg sio̍k chi̍t-tiám, chhit-bān hó--bô?', indo: 'Wah, kemahalan deh! Hitung lebih murah dikit, 70 ribu boleh gak?' },
      { speaker: 'Thâu-ke-niû (Penjual)', role: 'B', hanji: '好啦好啦，逐家老主顧，算你七萬！', poj: 'Hó--lah hó--lah, ta̍k-ke lāu-chú-kò͘, sǹg lí chhit-bān!', indo: 'Bolehlah, kita kan langganan lama, ku-hitung 70 ribu untukmu!' }
    ],
    vocab: [
      { hanji: '俗', poj: 'Sio̍k', indo: 'Murah meriah' },
      { hanji: '貴', poj: 'Kùi', indo: 'Mahal' },
      { hanji: '八萬箍', poj: 'Peh-bān kho͘', indo: '80 ribu rupiah' },
      { hanji: '老主顧', poj: 'Lāu-chú-kò͘', indo: 'Pelanggan lama / Langganan' }
    ],
    quiz: {
      question: 'Apa lawan kata dari "Kùi" (mahal) dalam perdagangan pasar Hokkien?',
      options: ['Pháiⁿ-chia̍h', 'Sio̍k (Murah)', 'Chin-chia̍h', 'Gâu'],
      correct: 1,
      explanation: '"Sio̍k" (俗) berarti murah atau terjangkau.'
    }
  },
  {
    id: 3,
    level: 'Menengah',
    category: 'Ungkapan Gaul',
    title: 'Modul 3: Bahasa Gaul & Slang Khas Hokkien Medan',
    subtitle: 'Pahami kata "Chin-chia", "Hó-súi", "Lo̍k-kho", "Bô-tī-tô", dan "Hia-tī" dalam tongkrongan.',
    duration: '20 Menit',
    badge: 'Anak Medan Gaul',
    culturalNote: 'Pergaulan anak muda Medan sangat kental dengan percampuran Hokkien. Kata "Chin-chia̍h bô?" (Beneran gak sih?) dan "Hó-súi lah!" (Keren/mantap banget) sudah menjadi bahasa pergaulan lintas etnis.',
    dialogue: [
      { speaker: 'A-Kiat', role: 'A', hanji: 'Hia-tī, lí kin-á-ji̍t khoàⁿ-tio̍h i bô?', poj: 'Hia-tī, lí kin-á-ji̍t khoàⁿ-tio̍h i--bô?', indo: 'Bro/Sobat, kamu hari ini lihat dia gak?' },
      { speaker: 'A-Hui', role: 'B', hanji: 'Bô-tī-tô i cháu khì Tâi-oân矣！', poj: 'Bô-tī-tô i cháu khì Tâi-oân--ah!', indo: 'Tiba-tiba gak ada angin gak ada hujan dia sudah kabur ke Taiwan!' },
      { speaker: 'A-Kiat', role: 'A', hanji: 'Chin-chia̍h bô?! M̄-thang phiàn góa leh!', poj: 'Chin-chia̍h--bô?! M̄-thang phiàn góa leh!', indo: 'Beneran gak?! Jangan bohongi aku ya!' },
      { speaker: 'A-Hui', role: 'B', hanji: 'Chin-chia̍h啦，i chò seng-lí thàn tōa-chîⁿ矣！', poj: 'Chin-chia̍h--lah, i chò seng-lí thàn tōa-chîⁿ--ah!', indo: 'Beneran lah, dia bisnis dapat untung cuan gede!' }
    ],
    vocab: [
      { hanji: '兄弟', poj: 'Hia-tī', indo: 'Saudara / Sobat akrab / Bro' },
      { hanji: '無底代', poj: 'Bô-tī-tô', indo: 'Tiba-tiba tanpa sebab yang jelas' },
      { hanji: '真實', poj: 'Chin-chia̍h', indo: 'Beneran / Sungguhan' },
      { hanji: '賺大錢', poj: 'Thàn tōa-chîⁿ', indo: 'Dapat banyak uang / Cuan besar' }
    ],
    quiz: {
      question: 'Jika seorang teman di Medan bercerita hal yang luar biasa dan kamu meragukannya, kamu bertanya:',
      options: ['Chin-chia̍h bô?', 'Lim kún-chúi bē?', 'Lōa-chē chîⁿ?', 'Chài-kiàn!'],
      correct: 0,
      explanation: '"Chin-chia̍h bô?" bermakna "Beneran nggak sih?"'
    }
  },
  {
    id: 4,
    level: 'Lanjutan',
    category: 'Bisnis & Budaya',
    title: 'Modul 4: Etika Berbisnis & Negosiasi Perdagangan',
    subtitle: 'Frasa negosiasi, istilah "Cuan", "Seng-lí", kontrak kerja sama, dan reputasi dagang.',
    duration: '22 Menit',
    badge: 'Juragan Cuan',
    culturalNote: 'Kepercayaan ("Sìn-iōng") adalah fondasi utama pedagang Tionghoa perantauan dari Medan hingga Taipei. Satu kata kesepakatan bernilai lebih dari tanda tangan di atas kertas.',
    dialogue: [
      { speaker: 'Pengusaha Medan', role: 'A', hanji: 'Lán chò seng-lí, sêng-sìn siōng tiōng-iàu.', poj: 'Lán chò seng-lí, sêng-sìn siōng tiōng-iàu.', indo: 'Kita berbisnis, kejujuran adalah yang terpenting.' },
      { speaker: 'Rekan Dagang', role: 'B', hanji: 'Tio̍h, ta̍k-ke chò-hóe thàn-chîⁿ, lán siong-sìn lí!', poj: 'Tio̍h, ta̍k-ke chò-hóe thàn-chîⁿ, lán siong-sìn lí!', indo: 'Betul, semua bareng-bareng cari rezeki, kami percaya padamu!' }
    ],
    vocab: [
      { hanji: '生理', poj: 'Seng-lí', indo: 'Bisnis / Perdagangan' },
      { hanji: '賺錢', poj: 'Thàn-chîⁿ', indo: 'Mencari uang / Cuan' },
      { hanji: '誠信', poj: 'Sêng-sìn', indo: 'Kejujuran & Reputasi' }
    ],
    quiz: {
      question: 'Kata "Cuan" yang populer di Indonesia berasal dari kata Hokkien:',
      options: ['賺 (Thàn / Choàn)', '吃 (Chia̍h)', '行 (Kiâⁿ)', '買 (Bé)'],
      correct: 0,
      explanation: '"Thàn / Choàn" bermakna menghasilkan keuntungan atau uang.'
    }
  },
  {
    id: 5,
    level: 'Menengah',
    category: 'Keluarga & Adat',
    title: 'Modul 5: Silsilah Keluarga Besar & Tradisi Imlek',
    subtitle: 'Panggilan Akong, Amah, A-peh, Sin-pū, tradisi bagi Angpao dan sembahyang leluhur.',
    duration: '16 Menit',
    badge: 'Penjaga Tradisi',
    culturalNote: 'Silsilah keluarga Hokkien sangat teratur membedakan kerabat dari garis ayah (tông) dan garis ibu (piáu).',
    dialogue: [
      { speaker: 'Cucu', role: 'A', hanji: '阿公、阿嬤，新年恭喜！祝您健康食百二！', poj: 'A-kong, A-má, sin-nî kiong-hí! Chiok lín kiān-khong chia̍h pah-jī!', indo: 'Kakek, Nenek, selamat tahun baru! Semoga sehat selalu panjang umur sampai 120 tahun!' },
      { speaker: 'Akong (Kakek)', role: 'B', hanji: '乖孫，來提紅包！愛認真讀書喔！', poj: 'Koai-sun, lâi the̍h âng-pau! Ài jīn-chin tha̍k-chheh o͘!', indo: 'Cucu pintar, ayo ambil angpao! Harus rajin belajar ya!' }
    ],
    vocab: [
      { hanji: '紅包', poj: 'Âng-pau', indo: 'Amplop merah uang keberuntungan (Angpao)' },
      { hanji: '恭喜發財', poj: 'Kiong-hí hoat-châi', indo: 'Selamat bertambah makmur dan banyak rezeki' },
      { hanji: '健康', poj: 'Kiān-khong', indo: 'Sehat walafiat' }
    ],
    quiz: {
      question: 'Doa "Chia̍h pah-jī" sering diucapkan kepada Akong & Amah yang bermakna:',
      options: ['Panjang umur sampai 120 tahun', 'Makan 12 macam makanan', 'Bagi-bagi 12 angpao', 'Jalan santai 120 meter'],
      correct: 0,
      explanation: '"Pah-jī" adalah seratus dua puluh (120), lambang umur yang sangat panjang dan berkah.'
    }
  },
  {
    id: 6,
    level: 'Dasar',
    category: 'Fonetik & Nada',
    title: 'Modul 6: Menguasai 8 Nada Kuno Minnan & Tone Sandhi',
    subtitle: 'Pelajari perbedaan nada 1 hingga 8 serta aturan perubahan nada saat kata digabungkan.',
    duration: '25 Menit',
    badge: 'Master Nada Minnan',
    culturalNote: 'Dalam bahasa Hokkien, ketika dua kata digabungkan, kata pertama hampir selalu mengalami "Tone Sandhi" (perubahan nada) menjadi nada lain sesuai hukum lingkaran nada.',
    dialogue: [
      { speaker: 'Guru Fonetik', role: 'A', hanji: 'Hokkien ū peh-ê siaⁿ-tiāu. (Hokkien punya 8 nada.)', poj: 'Hok-kiàn ū peh-ê siaⁿ-tiāu.', indo: 'Bahasa Hokkien memiliki 8 nada.' },
      { speaker: 'Murid', role: 'B', hanji: 'Ji̍p-siaⁿ siōng kán-chhat, tùi bô? (Nada perhentian paling unik, benar kan?)', poj: 'Ji̍p-siaⁿ siōng kán-chhat, tùi--bô?', indo: 'Nada perhentian (masuk) paling unik, betul tidak?' }
    ],
    vocab: [
      { hanji: '聲調', poj: 'Siaⁿ-tiāu', indo: 'Intonasi nada bicara' },
      { hanji: '入聲', poj: 'Ji̍p-siaⁿ', indo: 'Nada perhentian bersuara pendek (-p, -t, -k, -h)' },
      { hanji: '變調', poj: 'Piàn-tiāu', indo: 'Perubahan nada saat bergandengan kata' }
    ],
    quiz: {
      question: 'Nada ke-4 dan ke-8 dalam bahasa Hokkien memiliki keunikan yaitu:',
      options: ['Selalu diakhiri konsonan letup pendek (-p, -t, -k, -h)', 'Berdengung panjang seperti nyanyian', 'Hanya diucapkan dengan berbisik', 'Tidak boleh dipakai untuk memesan makanan'],
      correct: 0,
      explanation: 'Nada 4 dan 8 disebut "Ji̍p-siaⁿ" (Entering Tone), ciri khas bahasa Tionghoa kuno yang masih lestari di Hokkien!'
    }
  },
  {
    id: 7,
    level: 'Pemula',
    category: 'Kuliner & Wisata',
    title: 'Modul 7: Kuliner Legendaris Medan & Taiwan Night Market',
    subtitle: 'Mengenal kuliner peranakan: Bihun bebek, Bakpao, Kembang tahu, dan Mie sapi Taiwan.',
    duration: '18 Menit',
    badge: 'Pakar Kuliner Hokkien',
    culturalNote: 'Banyak kuliner Indonesia berasal dari istilah Hokkien: Bakwan (Bah-ôan = bakso daging), Bakpao (Pau-á = roti beragi), Bihun (Bí-hún = bihun beras), Misua (Mī-sòaⁿ = mie halus).',
    dialogue: [
      { speaker: 'Ah-Lian', role: 'A', hanji: 'Ē-po͘ ài chia̍h siáⁿ-mi̍h tiám-sim?', poj: 'Ē-po͘ ài chia̍h siáⁿ-mi̍h tiám-sim?', indo: 'Sore-sore enaknya makan cemilan apa ya?' },
      { speaker: 'A-Kiat', role: 'B', hanji: 'Lán khì chia̍h chi̍t-óaⁿ sio-sio ê Tāu-hoe, hó--bô?', poj: 'Lán khì chia̍h chi̍t-óaⁿ sio-sio ê Tāu-hoe, hó--bô?', indo: 'Ayo kita makan semangkuk kembang tahu manis hangat, mau gak?' },
      { speaker: 'Ah-Lian', role: 'A', hanji: 'Hó lah! Koh bé nn̄g-ê bah-pau kap chi̍t-óaⁿ bí-hún!', poj: 'Hó--lah! Koh bé nn̄g-ê bah-pau kap chi̍t-óaⁿ bí-hún!', indo: 'Bagus tuh! Sekalian beli dua bakpao dan semangkuk bihun!' },
      { speaker: 'A-Kiat', role: 'B', hanji: 'M̄-bián chē chîⁿ, chit-keng tiàm chin sio̍k koh hó-chia̍h!', poj: 'M̄-bián chē chîⁿ, chit-keng tiàm chin sio̍k koh hó-chia̍h!', indo: 'Gak usah banyak uang, kedai ini sangat murah dan enak sekali!' }
    ],
    vocab: [
      { hanji: '豆花', poj: 'Tāu-hoe', indo: 'Kembang tahu manis kuah jahe' },
      { hanji: '米粉', poj: 'Bí-hún', indo: 'Bihun kuah beras' },
      { hanji: '肉包', poj: 'Bah-pau', indo: 'Bakpao isi daging' },
      { hanji: '好吃', poj: 'Hó-chia̍h', indo: 'Enak / Sedap / Lezat' },
      { hanji: '點心', poj: 'Tiám-sim', indo: 'Kudapan / Cemilan sore' }
    ],
    quiz: {
      question: 'Istilah "Bí-hún" (米粉) dalam bahasa Hokkien secara harfiah berarti:',
      options: ['Tepung/Serat dari beras (Bí = Beras, Hún = Tepung)', 'Mie kuning dari gandum', 'Nasi goreng mentega', 'Kue bolu lembut'],
      correct: 0,
      explanation: 'Bí-hún secara harfiah adalah olahan tepung beras yang dipintal menjadi helaian halus.'
    }
  },
  {
    id: 8,
    level: 'Menengah',
    category: 'Kota & Transportasi',
    title: 'Modul 8: Menanyakan Arah Jalan & Naik Kendaraan',
    subtitle: 'Kuasai frasa naik becak/taksi, petunjuk belok kiri-kanan, dan sampai tujuan dengan aman.',
    duration: '20 Menit',
    badge: 'Penjelajah Kota',
    culturalNote: 'Di Medan, istilah "Chē chhia" dipakai untuk naik mobil atau kendaraan bermotor. Istilah "Lō͘-kháu" berarti persimpangan mulut gang/jalan.',
    dialogue: [
      { speaker: 'Penumpang', role: 'A', hanji: 'Thâu-ke, ài chē khì pa-sat lōa-chē chîⁿ?', poj: 'Thâu-ke, ài chē khì pa-sat lōa-chē chîⁿ?', indo: 'Pak sopir, mau naik ke pasar berapa ongkosnya?' },
      { speaker: 'Sopir', role: 'B', hanji: 'Nn̄g-bān kho͘ niâ-niâ, kóaⁿ-kín chiūⁿ chhia!', poj: 'Nn̄g-bān kho͘ niâ-niâ, kóaⁿ-kín chiūⁿ chhia!', indo: 'Dua puluh ribu rupiah saja, cepatan naik!' },
      { speaker: 'Penumpang', role: 'A', hanji: 'Kàu chit-ê lō͘-kháu, uan tsià-pîng (tńg-oan)!', poj: 'Kàu chit-ê lō͘-kháu, uan chià-pîng!', indo: 'Sampai di mulut jalan ini, tolong belok ke kanan ya!' },
      { speaker: 'Sopir', role: 'B', hanji: 'Hó, kàu矣! Thêng tī chia hó--bô?', poj: 'Hó, kàu--ah! Thêng tī chia hó--bô?', indo: 'Baik, sudah sampai! Berhenti di sini ya?' }
    ],
    vocab: [
      { hanji: '坐車', poj: 'Chē-chhia', indo: 'Naik kendaraan / mobil' },
      { hanji: '路口', poj: 'Lō͘-kháu', indo: 'Persimpangan / Mulut jalan' },
      { hanji: '正邊', poj: 'Chià-pîng', indo: 'Sebelah kanan' },
      { hanji: '倒邊', poj: 'Tò-pîng', indo: 'Sebelah kiri' },
      { hanji: '停', poj: 'Thêng', indo: 'Berhenti / Stop' }
    ],
    quiz: {
      question: 'Jika ingin meminta sopir berbelok ke arah kiri, kata apa yang dipakai?',
      options: ['Uan tò-pîng (Belok kiri)', 'Uan chià-pîng (Belok kanan)', 'Ti̍t-ti̍t kiâⁿ (Jalan lurus)', 'Thêng chhia (Stop)'],
      correct: 0,
      explanation: '"Tò-pîng" (倒邊) bermakna sebelah kiri, sedangkan "Chià-pîng" (正邊) adalah kanan.'
    }
  },
  {
    id: 9,
    level: 'Lanjutan',
    category: 'Medan & Taiwan',
    title: 'Modul 9: Komparasi Hokkien Medan vs Taiwan Standar',
    subtitle: 'Analisis kata serapan Melayu di Medan ("Pasat", "Kuncui", "Tolong") vs Kamus Taiwan MoE.',
    duration: '22 Menit',
    badge: 'Ahli Linguistik Komparatif',
    culturalNote: 'Hokkien Medan banyak menyerap bahasa Melayu karena sejarah perdagangan di Selat Malaka. Sebaliknya, Kamus Resmi Taiwan (MoE) menjaga kosakata klasik Minnan selatan dengan ejaan Tâi-lô.',
    dialogue: [
      { speaker: 'Penutur Medan', role: 'A', hanji: 'Lán tī Medan kóng "lim kún-chúi", tī Tâi-oân kóng siáⁿ-mi̍h?', poj: 'Lán tī Medan kóng "lim kún-chúi", tī Tâi-oân kóng siáⁿ-mi̍h?', indo: 'Di Medan kita bilang "lim kún-chúi", kalau di Taiwan bilang apa?' },
      { speaker: 'Penutur Taiwan', role: 'B', hanji: 'Tâi-oân it-poaⁿ kóng "lim chúi" (飲水) á-sī "khai-chúi" (開水).', poj: 'Tâi-oân it-poaⁿ kóng "lim chúi" á-sī "khai-chúi".', indo: 'Di Taiwan umumnya menyebut "lim chúi" atau "khai-chúi".' },
      { speaker: 'Penutur Medan', role: 'A', hanji: 'Koh ū "Pa-sat", tī Tâi-oân kóng "Chhài-chhī-á" (菜市仔)!', poj: 'Koh ū "Pa-sat", tī Tâi-oân kóng "Chhài-chhī-á"!', indo: 'Lalu kata "Pasat", di Taiwan menyebutnya "Chhài-chhī-á" (pasar sayur)!' },
      { speaker: 'Penutur Taiwan', role: 'B', hanji: 'Tio̍h! M̄-kù lán lóng thiaⁿ ē bêng-pe̍k, chiâⁿ chhin-chhiat!', poj: 'Tio̍h! M̄-kù lán lóng thiaⁿ ē bêng-pe̍k, chiâⁿ chhin-chhiat!', indo: 'Betul! Tapi kita saling mengerti satu sama lain, sangat ramah & akrab!' }
    ],
    vocab: [
      { hanji: '菜市仔', poj: 'Chhài-chhī-á', indo: 'Pasar tradisional (istilah Taiwan)' },
      { hanji: '巴刹', poj: 'Pa-sat', indo: 'Pasar (istilah Medan serapan Melayu)' },
      { hanji: '親切', poj: 'Chhin-chhiat', indo: 'Ramah dan penuh keakraban' },
      { hanji: '明白', poj: 'Bêng-pe̍k', indo: 'Paham / Mengerti dengan jelas' }
    ],
    quiz: {
      question: 'Istilah pasar di Taiwan disebut "Chhài-chhī-á" (菜市仔), sedangkan di Medan umum disebut:',
      options: ['Pa-sat (巴刹 - serapan Melayu)', 'Kopitiam', 'Thâu-ke', 'Lō͘-kháu'],
      correct: 0,
      explanation: 'Hokkien Medan menyerap kata Melayu "pasar" menjadi "Pa-sat" yang sangat lazim digunakan.'
    }
  },
  {
    id: 10,
    level: 'Menengah',
    category: 'Tubuh & Kesehatan',
    title: 'Modul 10: Menjelaskan Sakit & Berobat ke Dokter',
    subtitle: 'Mengungkapkan gejala demam, pusing, batuk, beli obat, dan doa lekas sembuh.',
    duration: '18 Menit',
    badge: 'Dokter Keluarga',
    culturalNote: 'Ungkapan "Chia̍h-io̍h" (makan obat) dan "Khuàⁿ-i-seng" (periksa ke dokter) adalah kalimat penting dalam menjaga kesehatan keluarga.',
    dialogue: [
      { speaker: 'Pasien', role: 'A', hanji: 'I-seng, góa thâu chin thiàⁿ, koh ū hoat-sio.', poj: 'I-seng, góa thâu chin thiàⁿ, koh ū hoat-sio.', indo: 'Dokter, kepala saya sangat sakit, dan juga demam panas.' },
      { speaker: 'Dokter', role: 'B', hanji: 'Lí kám-mō͘矣! Ài chē lim kún-chúi, khah chē hioh-khùn.', poj: 'Lí kám-mō͘--ah! Ài chē lim kún-chúi, khah chē hioh-khùn.', indo: 'Anda kena flu! Harus banyak minum air putih masak, dan banyak istirahat.' },
      { speaker: 'Pasien', role: 'A', hanji: 'Ài chia̍h io̍h-á bô?', poj: 'Ài chia̍h io̍h-á--bô?', indo: 'Perlu minum obat tidak?' },
      { speaker: 'Dokter', role: 'B', hanji: 'Ū, chi̍t-kang chia̍h saⁿ-pái, chiok lí kín-kín hó!', poj: 'Ū, chi̍t-kang chia̍h saⁿ-pái, chiok lí kín-kín hó!', indo: 'Ada, sehari minum tiga kali, semoga Anda lekas sembuh!' }
    ],
    vocab: [
      { hanji: '頭疼', poj: 'Thâu-thiàⁿ', indo: 'Sakit kepala / Pusing' },
      { hanji: '發燒', poj: 'Hoat-sio', indo: 'Demam panas tinggi' },
      { hanji: '感冒', poj: 'Kám-mō͘', indo: 'Masuk angin / Flu pilek' },
      { hanji: '吃藥', poj: 'Chia̍h-io̍h', indo: 'Minum obat' },
      { hanji: '趕緊好', poj: 'Kín-kín hó', indo: 'Lekas sembuh / Cepat pulih' }
    ],
    quiz: {
      question: 'Dokter menyarankan pasien flu agar lekas sembuh dengan mengucapkan:',
      options: ['Chiok lí kín-kín hó! (Semoga lekas sembuh)', 'Lōa-chē chîⁿ?', 'Pháinn-sè!', 'M̄-thang cháu!'],
      correct: 0,
      explanation: '"Chiok lí kín-kín hó" adalah ucapan harapan lekas pulih/sembuh.'
    }
  }
]
