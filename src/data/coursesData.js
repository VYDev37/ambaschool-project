// Database Kursus & Modul Pelajaran Interaktif Bahasa Hokkien Akbar (26 Modul Lengkap)
// Khusus memadukan kurikulum standar Taiwan MoE dan percakapan otentik Hokkien Medan / Nusantara

export const coursesModules = [
  {
    id: 1,
    level: 'Pemula',
    category: 'Medan & Nusantara',
    track: 'Medan Kopitiam',
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
    track: 'Pasar & Bisnis',
    title: 'Modul 2: Tawar Menawar di Pasar Tradisional (Pa-sat)',
    subtitle: 'Menguasai istilah belanja, tawar harga, menyebut nominal rupiah, dan istilah "Sio̍k" vs "Kùi".',
    duration: '18 Menit',
    badge: 'Ahli Pasar',
    culturalNote: 'Istilah "Pa-sat" di kalangan penutur Hokkien Medan adalah serapan dari kata Melayu "Pasar". Kata nominal "Kho͘" digunakan untuk menyebut Rupiah (misal: peh-bān kho = 80 ribu rupiah).',
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
      { hanji: '老主顧', poj: 'Lāu-chú-kò͘', indo: 'Pelanggan lama / Langganan' },
      { hanji: '巴刹', poj: 'Pa-sat', indo: 'Pasar tradisional' }
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
    track: 'Medan Kopitiam',
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
      { hanji: '賺大錢', poj: 'Thàn tōa-chîⁿ', indo: 'Dapat banyak uang / Cuan besar' },
      { hanji: '落科', poj: 'Lo̍k-kho', indo: 'Zonk / Jatuh rugi / Sial' }
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
    category: 'Pasar & Transaksi',
    track: 'Pasar & Bisnis',
    title: 'Modul 4: Etika Berbisnis & Negosiasi Perdagangan',
    subtitle: 'Frasa negosiasi, istilah "Cuan", "Seng-lí", kontrak kerja sama, dan reputasi dagang.',
    duration: '22 Menit',
    badge: 'Juragan Cuan',
    culturalNote: 'Kepercayaan ("Sìn-iōng") adalah fondasi utama pedagang Tionghoa perantauan dari Medan hingga Taipei. Satu kata kesepakatan bernilai lebih dari tanda tangan di atas kertas.',
    dialogue: [
      { speaker: 'Pengusaha Medan', role: 'A', hanji: 'Lán chò seng-lí, sêng-sìn siōng tiōng-iàu.', poj: 'Lán chò seng-lí, sêng-sìn siōng tiōng-iàu.', indo: 'Kita berbisnis, kejujuran adalah yang terpenting.' },
      { speaker: 'Rekan Dagang', role: 'B', hanji: 'Tio̍h, ta̍k-ke chò-hóe thàn-chîⁿ, lán siong-sìn lí!', poj: 'Tio̍h, ta̍k-ke chò-hóe thàn-chîⁿ, lán siong-sìn lí!', indo: 'Betul, semua bareng-bareng cari rezeki, kami percaya padamu!' },
      { speaker: 'Pengusaha Medan', role: 'A', hanji: 'Chit-ê ha̍p-tông kong-tō, bô phiat-chîⁿ.', poj: 'Chit-ê ha̍p-tông kong-tō, bô phiat-chîⁿ.', indo: 'Perjanjian kontrak ini adil, tidak ada manipulasi harga.' },
      { speaker: 'Rekan Dagang', role: 'B', hanji: 'Chhiam-miâ liáu, chiok lán seng-lí heng-lông!', poj: 'Chhiam-miâ liáu, chiok lán seng-lí heng-lông!', indo: 'Setelah tanda tangan, semoga bisnis kita maju makmur!' }
    ],
    vocab: [
      { hanji: '生理', poj: 'Seng-lí', indo: 'Bisnis / Perdagangan' },
      { hanji: '賺錢', poj: 'Thàn-chîⁿ', indo: 'Mencari uang / Cuan' },
      { hanji: '誠信', poj: 'Sêng-sìn', indo: 'Kejujuran & Reputasi' },
      { hanji: '合同', poj: 'Ha̍p-tông', indo: 'Surat perjanjian kontrak' },
      { hanji: '興旺', poj: 'Heng-lông', indo: 'Maju makmur berkembang' }
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
    track: 'Tradisi & Budaya',
    title: 'Modul 5: Silsilah Keluarga Besar & Tradisi Imlek',
    subtitle: 'Panggilan Akong, Amah, A-peh, Sin-pū, tradisi bagi Angpao dan sembahyang leluhur.',
    duration: '16 Menit',
    badge: 'Penjaga Tradisi',
    culturalNote: 'Silsilah keluarga Hokkien sangat teratur membedakan kerabat dari garis ayah (tông) dan garis ibu (piáu). Ungkapan doa panjang umur kepada kakek nenek sering kali menggunakan angka 120 tahun (chia̍h pah-jī).',
    dialogue: [
      { speaker: 'Cucu', role: 'A', hanji: '阿公、阿嬤，新年恭喜！祝您健康食百二！', poj: 'A-kong, A-má, sin-nî kiong-hí! Chiok lín kiān-khong chia̍h pah-jī!', indo: 'Kakek, Nenek, selamat tahun baru! Semoga sehat selalu panjang umur sampai 120 tahun!' },
      { speaker: 'Akong (Kakek)', role: 'B', hanji: '乖孫，來提紅包！愛認真讀書喔！', poj: 'Koai-sun, lâi the̍h âng-pau! Ài jīn-chin tha̍k-chheh o͘!', indo: 'Cucu pintar, ayo ambil angpao! Harus rajin belajar ya!' },
      { speaker: 'Cucu', role: 'A', hanji: '多謝阿公！祝阿伯、阿叔做生理賺大錢！', poj: 'To-siā A-kong! Chiok A-peh, A-chek chò seng-lí thàn tōa-chîⁿ!', indo: 'Terima kasih Akong! Semoga Uwak dan Om bisnisnya banyak cuan!' }
    ],
    vocab: [
      { hanji: '紅包', poj: 'Âng-pau', indo: 'Amplop merah uang keberuntungan (Angpao)' },
      { hanji: '恭喜發財', poj: 'Kiong-hí hoat-châi', indo: 'Selamat bertambah makmur dan banyak rezeki' },
      { hanji: '健康', poj: 'Kiān-khong', indo: 'Sehat walafiat' },
      { hanji: '阿公', poj: 'A-kong', indo: 'Kakek' },
      { hanji: '阿嬤', poj: 'A-má', indo: 'Nenek' },
      { hanji: '新婦', poj: 'Sin-pū', indo: 'Menantu perempuan' }
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
    track: 'Fonetik Minnan',
    title: 'Modul 6: Menguasai 8 Nada Kuno Minnan & Tone Sandhi',
    subtitle: 'Pelajari perbedaan nada 1 hingga 8 serta aturan perubahan nada saat kata digabungkan.',
    duration: '25 Menit',
    badge: 'Master Nada Minnan',
    culturalNote: 'Dalam bahasa Hokkien, ketika dua kata digabungkan, kata pertama hampir selalu mengalami "Tone Sandhi" (perubahan nada) menjadi nada lain sesuai hukum lingkaran nada kuno.',
    dialogue: [
      { speaker: 'Guru Fonetik', role: 'A', hanji: 'Hok-kiàn-oē ū peh-ê siaⁿ-tiāu. (Hokkien punya 8 nada.)', poj: 'Hok-kiàn-oē ū peh-ê siaⁿ-tiāu.', indo: 'Bahasa Hokkien memiliki 8 nada intonasi.' },
      { speaker: 'Murid', role: 'B', hanji: 'Ji̍p-siaⁿ siōng kán-chhat, tùi bô?', poj: 'Ji̍p-siaⁿ siōng kán-chhat, tùi--bô?', indo: 'Nada perhentian (masuk) paling unik, betul tidak?' },
      { speaker: 'Guru Fonetik', role: 'A', hanji: 'Tio̍h! Nada 4 kap 8 boé-chiah ū -p, -t, -k, -h.', poj: 'Tio̍h! Nada 4 kap 8 boé-chiah ū -p, -t, -k, -h.', indo: 'Betul! Nada 4 dan 8 diakhiri letupan -p, -t, -k, atau -h pendek.' }
    ],
    vocab: [
      { hanji: '聲調', poj: 'Siaⁿ-tiāu', indo: 'Intonasi nada bicara' },
      { hanji: '入聲', poj: 'Ji̍p-siaⁿ', indo: 'Nada perhentian bersuara pendek (-p, -t, -k, -h)' },
      { hanji: '變調', poj: 'Piàn-tiāu', indo: 'Perubahan nada saat bergandengan kata (Sandhi)' },
      { hanji: '輕聲', poj: 'Khin-siaⁿ', indo: 'Nada netral / ringan' }
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
    category: 'Kuliner & Restoran',
    track: 'Kuliner Nusantara',
    title: 'Modul 7: Kuliner Legendaris Medan & Night Market',
    subtitle: 'Mengenal kuliner peranakan: Bihun bebek, Bakpao, Kembang tahu, dan Mie sapi Taiwan.',
    duration: '18 Menit',
    badge: 'Pakar Kuliner Hokkien',
    culturalNote: 'Banyak kuliner Indonesia berasal dari istilah Hokkien: Bakwan (Bah-ôan = bakso bola daging), Bakpao (Pau-á = roti beragi), Bihun (Bí-hún = bihun beras), Misua (Mī-sòaⁿ = mie halus panjang umur).',
    dialogue: [
      { speaker: 'Ah-Lian', role: 'A', hanji: 'Ē-po͘ ài chia̍h siáⁿ-mi̍h tiám-sim?', poj: 'Ē-po͘ ài chia̍h siáⁿ-mi̍h tiám-sim?', indo: 'Sore-sore enaknya makan cemilan apa ya?' },
      { speaker: 'A-Kiat', role: 'B', hanji: 'Lán khì chia̍h chi̍t-óaⁿ sio-sio ê Tāu-hoe, hó--bô?', poj: 'Lán khì chia̍h chi̍t-óaⁿ sio-sio ê Tāu-hoe, hó--bô?', indo: 'Ayo kita makan semangkuk kembang tahu manis jahe hangat, mau gak?' },
      { speaker: 'Ah-Lian', role: 'A', hanji: 'Hó lah! Koh bé nn̄g-ê bah-pau kap chi̍t-óaⁿ bí-hún!', poj: 'Hó--lah! Koh bé nn̄g-ê bah-pau kap chi̍t-óaⁿ bí-hún!', indo: 'Bagus tuh! Sekalian beli dua bakpao dan semangkuk bihun kuah bebek!' },
      { speaker: 'A-Kiat', role: 'B', hanji: 'M̄-bián chē chîⁿ, chit-keng tiàm chin sio̍k koh hó-chia̍h!', poj: 'M̄-bián chē chîⁿ, chit-keng tiàm chin sio̍k koh hó-chia̍h!', indo: 'Gak butuh banyak uang, kedai ini sangat murah dan enak sekali!' }
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
    category: 'Kota & Perjalanan',
    track: 'Perjalanan & Navigasi',
    title: 'Modul 8: Menanyakan Arah Jalan & Naik Kendaraan',
    subtitle: 'Kuasai frasa naik becak/taksi, petunjuk belok kiri-kanan, dan sampai tujuan dengan aman.',
    duration: '20 Menit',
    badge: 'Penjelajah Kota',
    culturalNote: 'Di Medan, istilah "Chē chhia" dipakai untuk naik mobil atau kendaraan bermotor. Istilah "Lō͘-kháu" berarti persimpangan mulut gang/jalan protokol.',
    dialogue: [
      { speaker: 'Penumpang', role: 'A', hanji: 'Thâu-ke, ài chē khì pa-sat lōa-chē chîⁿ?', poj: 'Thâu-ke, ài chē khì pa-sat lōa-chē chîⁿ?', indo: 'Pak sopir, mau naik ke pasar berapa ongkosnya?' },
      { speaker: 'Sopir', role: 'B', hanji: 'Nn̄g-bān kho͘ niâ-niâ, kóaⁿ-kín chiūⁿ chhia!', poj: 'Nn̄g-bān kho͘ niâ-niâ, kóaⁿ-kín chiūⁿ chhia!', indo: 'Dua puluh ribu rupiah saja, cepatan naik!' },
      { speaker: 'Penumpang', role: 'A', hanji: 'Kàu chit-ê lō͘-kháu, uan chià-pîng!', poj: 'Kàu chit-ê lō͘-kháu, uan chià-pîng!', indo: 'Sampai di persimpangan jalan ini, tolong belok ke kanan ya!' },
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
    category: 'Medan & Nusantara',
    track: 'Linguistik Komparatif',
    title: 'Modul 9: Komparasi Hokkien Medan vs Taiwan Standar',
    subtitle: 'Analisis kata serapan Melayu di Medan ("Pasat", "Kuncui", "Tolong") vs Kamus Taiwan MoE.',
    duration: '22 Menit',
    badge: 'Ahli Linguistik Komparatif',
    culturalNote: 'Hokkien Medan banyak menyerap bahasa Melayu karena sejarah perdagangan di Selat Malaka. Sebaliknya, Kamus Resmi Taiwan (MoE) menjaga kosakata klasik Minnan selatan dengan ejaan Tâi-lô baku.',
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
    category: 'Darurat & Kesehatan',
    track: 'Kesehatan Keluarga',
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
  },
  {
    id: 11,
    level: 'Menengah',
    category: 'Kota & Perjalanan',
    track: 'Perjalanan & Navigasi',
    title: 'Modul 11: Percakapan di Bandara & Perjalanan Antar Kota',
    subtitle: 'Mengurus tiket pesawat, bagasi, paspor, dan naik kereta cepat Ko-thih.',
    duration: '20 Menit',
    badge: 'Globetrotter Hokkien',
    culturalNote: 'Orang Minnan perantau sangat lekat dengan mobilitas tinggi antar pelabuhan dan bandara. Istilah "Hui-ki-tiûⁿ" merujuk ke bandar udara dan "Hêng-lí" merujuk ke koper/bagasi.',
    dialogue: [
      { speaker: 'Pelancong', role: 'A', hanji: 'Lô-hoân lí, góa ài the̍h teng-ki-chèng kap kià hêng-lí.', poj: 'Lô-hoân lí, góa ài the̍h teng-ki-chèng kap kià hêng-lí.', indo: 'Tolong bantu saya mengambil boarding pass dan menitipkan bagasi koper.' },
      { speaker: 'Petugas Bandara', role: 'B', hanji: 'Chhiáⁿ hō͘ góa lí ê hō͘-chiàu. Hêng-lí ū cha̍h chiau-chio̍h bô?', poj: 'Chhiáⁿ hō͘ góa lí ê hō͘-chiàu. Hêng-lí ū chah chiau-chio̍h--bô?', indo: 'Silakan berikan paspor Anda. Di koper apakah ada korek api atau powerbank?' },
      { speaker: 'Pelancong', role: 'A', hanji: 'Bô, lóng chah tī chhiú-the̍h pau-á lāi-bīn.', poj: 'Bô, lóng chah tī chhiú-the̍h pau-á lāi-bīn.', indo: 'Tidak ada, semua dibawa di dalam tas jinjing tangan.' },
      { speaker: 'Petugas Bandara', role: 'B', hanji: 'Hó, chia sī teng-ki-mn̂g peh-hō, chiok lí it-lō͘ pêng-an!', poj: 'Hó, chia sī teng-ki-mn̂g peh-hō, chiok lí it-lō͘ pêng-an!', indo: 'Bagus, ini gate nomor 8, semoga penerbangan Anda selamat dan damai!' }
    ],
    vocab: [
      { hanji: '飛機場', poj: 'Hui-ki-tiûⁿ', indo: 'Bandara / Lapangan terbang' },
      { hanji: '行李', poj: 'Hêng-lí', indo: 'Koper / Bagasi barang bawaan' },
      { hanji: '護照', poj: 'Hō͘-chiàu', indo: 'Paspor perjalanan' },
      { hanji: '登機門', poj: 'Teng-ki-mn̂g', indo: 'Pintu keberangkatan pesawat' },
      { hanji: '一路平安', poj: 'It-lō͘ pêng-an', indo: 'Semoga selamat di sepanjang perjalanan' }
    ],
    quiz: {
      question: 'Ucapan paling baik untuk melepas kerabat yang hendak bepergian jauh naik pesawat adalah:',
      options: ['It-lō͘ pêng-an! (Semoga selamat sampai tujuan)', 'Lo̍k-kho lah!', 'Siuⁿ kùi lah!', 'Bô-tī-tô!'],
      correct: 0,
      explanation: '"It-lō͘ pêng-an" (一路平安) adalah doa perjalanan selamat dan berkah.'
    }
  },
  {
    id: 12,
    level: 'Dasar',
    category: 'Keluarga & Adat',
    track: 'Sapaan & Adab',
    title: 'Modul 12: Adab Bertamu & Menjamu Sahabat di Rumah',
    subtitle: 'Tata krama menyambut tamu: "Chhiáⁿ-chē", menyeduh teh wangi, dan etika pamitan.',
    duration: '16 Menit',
    badge: 'Tuan Rumah Teladan',
    culturalNote: 'Menyajikan teh panas ("Lim chi̍t-poe tê") adalah adab paling mulia keluarga Minnan. Tamu yang dihormati tidak akan dibiarkan duduk dengan cangkir kosong.',
    dialogue: [
      { speaker: 'Tuan Rumah', role: 'A', hanji: 'A-Kiat, ji̍p-lâi chē, m̄-thang pháinn-sè!', poj: 'A-Kiat, ji̍p-lâi chē, m̄-thang pháinn-sè!', indo: 'A-Kiat, ayo masuk dan duduk, jangan sungkan-sungkan!' },
      { speaker: 'Tamu', role: 'B', hanji: 'Pháinn-sè, thó-jiáu lí矣! Chit-ê sī sió-khoán lé-mi̍h.', poj: 'Pháinn-sè, thó-jiáu lí--ah! Chit-ê sī sió-khoán lé-mi̍h.', indo: 'Maaf merepotkan ya! Ini ada sedikit oleh-oleh buah tangan.' },
      { speaker: 'Tuan Rumah', role: 'A', hanji: 'Ai-iā, kóng chia ê oē! Lâi, lim chi̍t-poe sio tê, chia̍h kóe-chí.', poj: 'Ai-iā, kóng chia ê oē! Lâi, lim chi̍t-poe sio tê, chia̍h kóe-chí.', indo: 'Aduh, jangan sungkan begitu! Ayo minum secangkir teh hangat dan makan buah.' },
      { speaker: 'Tamu', role: 'B', hanji: 'Chit-ê tê chin phang, to-siā lí ê chhin-chhiat chhiáⁿ-kheh!', poj: 'Chit-ê tê chin phang, to-siā lí ê chhin-chhiat chhiáⁿ-kheh!', indo: 'Teh ini harum sekali, terima kasih atas jamuan ramahmu!' }
    ],
    vocab: [
      { hanji: '入來坐', poj: 'Ji̍p-lâi chē', indo: 'Silakan masuk dan duduk' },
      { hanji: '勿會歹勢', poj: 'M̄-thang pháinn-sè', indo: 'Jangan sungkan / Jangan malu' },
      { hanji: '討擾', poj: 'Thó-jiáu', indo: 'Merepotkan / Mengganggu tuan rumah' },
      { hanji: '禮物', poj: 'Lé-mi̍h', indo: 'Oleh-oleh buah tangan' },
      { hanji: '燒茶', poj: 'Sio-tê', indo: 'Teh hangat aromatik' }
    ],
    quiz: {
      question: 'Saat teman berkunjung ke rumah Anda dan tampak canggung, Anda menenangkannya dengan berkata:',
      options: ['M̄-thang pháinn-sè! (Jangan sungkan!)', 'Siuⁿ kùi lah!', 'Lí beh khì toh-ūi?', 'Ká-kín cháu!'],
      correct: 0,
      explanation: '"M̄-thang pháinn-sè" berarti jangan segan atau jangan sungkan.'
    }
  },
  {
    id: 13,
    level: 'Menengah',
    category: 'Kuliner & Restoran',
    track: 'Kuliner Nusantara',
    title: 'Modul 13: Santapan Seafood Pesisir Bagansiapiapi & Selatpanjang',
    subtitle: 'Mengenal ikan segar cheng-hî, udang galah, he-bi, cumi, dan masakan pesisir Riau-Sumut.',
    duration: '18 Menit',
    badge: 'Penikmat Boga Bahari',
    culturalNote: 'Kota-kota pesisir seperti Bagansiapiapi, Selatpanjang, dan Belawan memiliki dialek Hokkien pesisir yang sangat kaya dengan istilah penangkapan ikan laut dan olahan hidangan laut segar.',
    dialogue: [
      { speaker: 'Pelanggan', role: 'A', hanji: 'Thâu-ke, kin-á-ji̍t ū siáⁿ-mi̍h sin-siar ê hái-sián?', poj: 'Thâu-ke, kin-á-ji̍t ū siáⁿ-mi̍h sin-siar ê hái-sián?', indo: 'Tauke, hari ini ada seafood apa yang baru dan segar?' },
      { speaker: 'Pemilik Warung', role: 'B', hanji: 'Ū chia̍h cheng chioh-pan-hî, chhá tōa-hê, kap cheng giô-á!', poj: 'Ū chia̍h cheng chioh-pan-hî, chhá tōa-hê, kap cheng giô-á!', indo: 'Ada tim ikan kerapu batu, tumis udang besar, dan tim kerang tiram!' },
      { speaker: 'Pelanggan', role: 'A', hanji: 'Hó! Hî cheng chheng-chheng, ka ji̍p kiuⁿ kap chiùⁿ-iû!', poj: 'Hó! Hî cheng chheng-chheng, ka ji̍p kiuⁿ kap chiùⁿ-iû!', indo: 'Bagus! Ikannya ditim polos jahe dengan sedikit kecap asin!' },
      { speaker: 'Pemilik Warung', role: 'B', hanji: 'Bô būn-tê! Koh lâi chi̍t-óaⁿ kiam-chhài thng, thàn sio chia̍h!', poj: 'Bô būn-tê! Koh lâi chi̍t-óaⁿ kiam-chhài thng, thàn sio chia̍h!', indo: 'Gak ada masalah! Ditambah semangkuk sup sayur asin, santap selagi hangat!' }
    ],
    vocab: [
      { hanji: '海鮮', poj: 'Hái-sián', indo: 'Seafood / Boga bahari' },
      { hanji: '新鮮', poj: 'Sin-siar', indo: 'Segar baru ditangkap' },
      { hanji: '蒸魚', poj: 'Cheng-hî', indo: 'Ikan kukus / Tim ikan segar' },
      { hanji: '蝦子', poj: 'Hê-á', indo: 'Udang laut' },
      { hanji: '鹹菜湯', poj: 'Kiam-chhài thng', indo: 'Sup sayur asin gurih asam segar' }
    ],
    quiz: {
      question: 'Cara memasak "Cheng-hî" (蒸魚) dalam kuliner Hokkien peranakan berarti:',
      options: ['Ikan dikukus / ditim lembut dengan jahe', 'Ikan dibakar dengan arang', 'Ikan digoreng tepung renyah', 'Ikan diasap pekat'],
      correct: 0,
      explanation: '"Cheng" (蒸) berarti mengukus atau men-tim secara lembut agar kesegaran alaminya terjaga.'
    }
  },
  {
    id: 14,
    level: 'Menengah',
    category: 'Ungkapan Gaul',
    track: 'Asmara & Hubungan',
    title: 'Modul 14: Mengungkapkan Rasa Cinta, Perasaan & Asmara',
    subtitle: 'Frasa "Góa kah-ì lí", menyatakan rindu, panggilan sayang "Sim-koaⁿ-pó-pòe", dan curhat.',
    duration: '18 Menit',
    badge: 'Pujangga Cinta Minnan',
    culturalNote: 'Budaya Minnan memiliki banyak lagu cinta legendaris seperti "Ài-chêng ê Chiú" (Kham-chia̍h). Kata "Kah-ì" (合意) digunakan untuk menyatakan rasa suka yang mendalam.',
    dialogue: [
      { speaker: 'A-Bûn', role: 'A', hanji: 'A-Bí, góa tī sim-lāi chin kah-ì lí.', poj: 'A-Bí, góa tī sim-lāi chin kah-ì lí.', indo: 'A-Bí, di dalam lubuk hatiku, aku sangat menyukaimu.' },
      { speaker: 'A-Bí', role: 'B', hanji: 'Chin-chia̍h bô? M̄-thang sńg-chhiò o͘!', poj: 'Chin-chia̍h--bô? M̄-thang sńg-chhiò o͘!', indo: 'Beneran gak sih? Jangan bercanda main-main ya!' },
      { speaker: 'A-Bûn', role: 'A', hanji: 'Sêng-sim sêng-ì! Chi̍t-kang bô khoàⁿ-tio̍h lí, sim-lāi chin su-liām.', poj: 'Sêng-sim sêng-ì! Chi̍t-kang bô khoàⁿ-tio̍h lí, sim-lāi chin su-liām.', indo: 'Sungguh tulus dari hati! Satu hari tak melihatmu, hati ini sangat rindu.' },
      { speaker: 'A-Bí', role: 'B', hanji: 'Góa iā kah-ì lí, lán chò-hóe kiâⁿ bī-lâi ê lō͘!', poj: 'Góa iā kah-ì lí, lán chò-hóe kiâⁿ bī-lâi ê lō͘!', indo: 'Aku juga menyukaimu, mari kita bersama melangkah ke masa depan!' }
    ],
    vocab: [
      { hanji: '合意', poj: 'Kah-ì', indo: 'Suka / Cocok di hati / Jatuh cinta' },
      { hanji: '心肝寶貝', poj: 'Sim-koaⁿ-pó-pòe', indo: 'Sayang belahan jiwa / Buah hati' },
      { hanji: '思念', poj: 'Su-liām', indo: 'Rindu kangen mendalam' },
      { hanji: '愛情', poj: 'Ài-chêng', indo: 'Cinta asmara' },
      { hanji: '成心誠意', poj: 'Sêng-sim sêng-ì', indo: 'Dengan tulus dan kesungguhan hati' }
    ],
    quiz: {
      question: 'Bagaimana cara orang Hokkien mengatakan "Saya sangat menyukaimu" secara sopan dan manis?',
      options: ['Góa chin kah-ì lí', 'Lí chia̍h-pá--bē?', 'Lo̍k-kho lah lí!', 'Góa ài cháu矣'],
      correct: 0,
      explanation: '"Góa chin kah-ì lí" (我真合意你) adalah kalimat pengakuan rasa suka yang paling lazim.'
    }
  },
  {
    id: 15,
    level: 'Lanjutan',
    category: 'Pekerjaan & Bisnis',
    track: 'Dunia Kerja',
    title: 'Modul 15: Dunia Kerja Kantor, Gaji & Karier',
    subtitle: 'Istilah "Chò-kang", uang lembur, kenaikan gaji "Ka kang-chîⁿ", rapat hōe-gī, dan cuti.',
    duration: '22 Menit',
    badge: 'Profesional Handal',
    culturalNote: 'Dunia kerja komunitas Tionghoa menekankan ketekunan ("Khûn-lô") dan kepatuhan pada target. Istilah "Kang-chîⁿ" dipakai untuk menyebut upah gaji kerja.',
    dialogue: [
      { speaker: 'Karyawan', role: 'A', hanji: 'Thâu-ke, chit-kò-goe̍h lán ê gia̍p-bū chin hó, ta̍k-ke chò-kang chin phah-piàⁿ.', poj: 'Thâu-ke, chit-kò-goe̍h lán ê gia̍p-bū chin hó, ta̍k-ke chò-kang chin phah-piàⁿ.', indo: 'Bos, bulan ini performa penjualan kita sangat bagus, semua rekan bekerja membanting tulang.' },
      { speaker: 'Bos', role: 'B', hanji: 'Hó! Góa khoàⁿ-tio̍h lín ê jīn-chin, bē-goe̍h ta̍k-ke ka kang-chîⁿ kap hoat chióng-kim!', poj: 'Hó! Góa khoàⁿ-tio̍h lín ê jīn-chin, bē-goe̍h ta̍k-ke ka kang-chîⁿ kap hoat chióng-kim!', indo: 'Bagus! Saya melihat kesungguhan kalian, bulan depan semua naik gaji dan dapat bonus!' },
      { speaker: 'Karyawan', role: 'A', hanji: 'Ló-la̍t thâu-ke! Lán it-tēng koh-khah phah-piàⁿ!', poj: 'Ló-la̍t thâu-ke! Lán it-tēng koh-khah phah-piàⁿ!', indo: 'Terima kasih bos atas kebaikannya! Kami pasti bekerja lebih giat lagi!' }
    ],
    vocab: [
      { hanji: '做工', poj: 'Chò-kang', indo: 'Bekerja / Menjalankan tugas' },
      { hanji: '工錢', poj: 'Kang-chîⁿ', indo: 'Gaji / Upah bayaran kerja' },
      { hanji: '加薪水', poj: 'Ka sin-chúi (Ka kang-chîⁿ)', indo: 'Kenaikan gaji / bonus' },
      { hanji: '打拼', poj: 'Phah-piàⁿ', indo: 'Bekerja keras berjuang tanpa kenal lelah' },
      { hanji: '開會', poj: 'Khui-hōe', indo: 'Rapat pertemuan kerja' }
    ],
    quiz: {
      question: 'Ungkapan legendaris "Phah-piàⁿ" (打拼) yang sangat dijunjung tinggi berarti:',
      options: ['Banting tulang berjuang keras mencapai sukses', 'Pergi istirahat tidur siang', 'Membeli banyak makanan di kedai', 'Menghitung uang kembalian'],
      correct: 0,
      explanation: '"Phah-piàⁿ" adalah etos perjuangan kerja keras pantang menyerah khas Hokkien.'
    }
  },
  {
    id: 16,
    level: 'Dasar',
    category: 'Pasar & Transaksi',
    track: 'Perjalanan & Navigasi',
    title: 'Modul 16: Waktu, Janji Temu & Keteraturan Waktu',
    subtitle: 'Menyebut jam ("Kuí-tiám"), hari besok "Bîn-á-chài", tepat waktu "Chún-sî", dan janji temu.',
    duration: '15 Menit',
    badge: 'Master Waktu',
    culturalNote: 'Menepati waktu ("Chún-sî") sangat penting dalam budaya niaga Hokkien. Terlambat dianggap mengurangi poin integritas dan kepercayaan dagang.',
    dialogue: [
      { speaker: 'Rekan', role: 'A', hanji: 'Kin-á-ji̍t kuí-tiám ài khui-hōe?', poj: 'Kin-á-ji̍t kuí-tiám ài khui-hōe?', indo: 'Hari ini jam berapa kita harus mulai rapat?' },
      { speaker: 'Sobat', role: 'B', hanji: 'Ē-po͘ saⁿ-tiám-pòaⁿ! M̄-thang chhi-tô, ài chún-sî kàu.', poj: 'Ē-po͘ saⁿ-tiám-pòaⁿ! M̄-thang chhi-tô, ài chún-sî kàu.', indo: 'Sore jam setengah empat! Jangan terlambat, harus tiba tepat waktu ya.' },
      { speaker: 'Rekan', role: 'A', hanji: 'Bîn-á-chài chá-khí ài khì Tiong-hng bô?', poj: 'Bîn-á-chài chá-khí ài khì Tiong-hng--bô?', indo: 'Besok pagi perlu pergi ke pusat kota tidak?' },
      { speaker: 'Sobat', role: 'B', hanji: 'Ài, lán iok poeh-tiám tī chia sio-kìⁿ!', poj: 'Ài, lán iok poeh-tiám tī chia sio-kìⁿ!', indo: 'Perlu, kita janjian jam 8 bertemu di sini!' }
    ],
    vocab: [
      { hanji: '幾點', poj: 'Kuí-tiám', indo: 'Pukul berapa / Jam berapa' },
      { hanji: '半', poj: 'Pòaⁿ', indo: 'Setengah (30 menit)' },
      { hanji: '準時', poj: 'Chún-sî', indo: 'Tepat waktu on-time' },
      { hanji: '明仔載', poj: 'Bîn-á-chài', indo: 'Besok hari' },
      { hanji: '早起', poj: 'Chá-khí', indo: 'Pagi hari' }
    ],
    quiz: {
      question: 'Jika seseorang berkata "Saⁿ-tiám-pòaⁿ", waktu yang dimaksud adalah:',
      options: ['Pukul 03:30 (Setengah empat)', 'Pukul 03:00 tepat', 'Pukul 04:15', 'Pukul 12:00 siang'],
      correct: 0,
      explanation: '"Saⁿ-tiám" = jam 3, "Pòaⁿ" = setengah, jadi 03:30.'
    }
  },
  {
    id: 17,
    level: 'Pemula',
    category: 'Medan & Nusantara',
    track: 'Alam & Cuaca',
    title: 'Modul 17: Cuaca Tropis Hujan Badai & Musim Kemarau',
    subtitle: 'Membahas hujan lebat "Lo̍h-hō͘", payung "Hō͘-sòaⁿ", panas terik "Sio-joa̍h", dan angin kencang.',
    duration: '16 Menit',
    badge: 'Peramal Cuaca Minnan',
    culturalNote: 'Di daerah tropis Nusantara, cuaca bisa berubah sangat cepat dari panas terik ("Ji̍t-thâu chin tōa") menjadi hujan badai lebat ("Lo̍h tōa-hō͘").',
    dialogue: [
      { speaker: 'A-Hui', role: 'A', hanji: 'Khoàⁿ thiⁿ-chêng, boē lo̍h tōa-hō͘矣!', poj: 'Khoàⁿ thiⁿ-chêng, boē lo̍h tōa-hō͘--ah!', indo: 'Lihat kondisi langitnya, sebentar lagi mau turun hujan deras!' },
      { speaker: 'A-Kiat', role: 'B', hanji: 'Lí ū chah hō͘-sòaⁿ bô? Kín ji̍p-lâi tiàm-kha bih hō͘!', poj: 'Lí ū chah hō͘-sòaⁿ--bô? Kín ji̍p-lâi tiàm-kha bih hō͘!', indo: 'Kamu bawa payung gak? Cepatan masuk ke teras ruko berteduh dari hujan!' },
      { speaker: 'A-Hui', role: 'A', hanji: 'Hó-ka-chài ū bih tio̍h, m̄-bián pìⁿ-chò lo̍h-thng-ke!', poj: 'Hó-ka-chài ū bih tio̍h, m̄-bián pìⁿ-chò lo̍h-thng-ke!', indo: 'Untung sempat berteduh, tidak jadi basah kuyup seperti ayam kecebur sup!' }
    ],
    vocab: [
      { hanji: '落雨', poj: 'Lo̍h-hō͘', indo: 'Turun hujan' },
      { hanji: '雨傘', poj: 'Hō͘-sòaⁿ', indo: 'Payung penahan hujan' },
      { hanji: '燒熱', poj: 'Sio-joa̍h', indo: 'Panas terik menyengat' },
      { hanji: '躲雨', poj: 'Bih-hō͘', indo: 'Berteduh dari siraman hujan' },
      { hanji: '好佳哉', poj: 'Hó-ka-chài', indo: 'Untunglah / Syukurlah selamat' }
    ],
    quiz: {
      question: 'Ungkapan "Hó-ka-chài" sering diucapkan dalam pergaulan sehari-hari yang bermakna:',
      options: ['Untunglah / Untung saja selamat!', 'Ayo lari cepat!', 'Harganya terlalu mahal!', 'Permisi mau tanya!'],
      correct: 0,
      explanation: '"Hó-ka-chài" (好佳哉) adalah ungkapan rasa syukur atas keberuntungan atau terhindar dari musibah.'
    }
  },
  {
    id: 18,
    level: 'Menengah',
    category: 'Medan & Nusantara',
    track: 'Rumah & Kehidupan',
    title: 'Modul 18: Renovasi Rumah, Tukang & Perabot',
    subtitle: 'Kosakata rumah "Chhù", perbaikan bocor "Lāu-chúi", membersihkan "Phah-só", dan tukang kayu.',
    duration: '18 Menit',
    badge: 'Ahli Tata Graha',
    culturalNote: 'Kata "Chhù" (厝) adalah aksara khas Minnan untuk rumah hunian, yang juga ditemukan pada nama-nama tempat bersejarah peranakan seperti Choa Chu Kang di Singapura.',
    dialogue: [
      { speaker: 'Pemilik Rumah', role: 'A', hanji: 'Sai-hū, góa ê chhù-téng lo̍h-hō͘ ē lāu-chúi.', poj: 'Sai-hū, góa ê chhù-téng lo̍h-hō͘ ē lāu-chúi.', indo: 'Pak tukang ahli, atap rumah saya kalau hujan suka bocor air.' },
      { speaker: 'Tukang Sai-hu', role: 'B', hanji: 'M̄-bián kiaⁿ, góa kā lí kái hō͘ chèng-tong, bô koh thik-chúi!', poj: 'M̄-bián kiaⁿ, góa kā lí kái hō͘ chèng-tong, bô koh thik-chúi!', indo: 'Jangan khawatir, saya perbaiki sampai tuntas, gak akan ada tetesan air lagi!' },
      { speaker: 'Pemilik Rumah', role: 'A', hanji: 'To-siā sai-hū! Koh ài phah-só hō͘ chheng-khì.', poj: 'To-siā sai-hū! Koh ài phah-só hō͘ chheng-khì.', indo: 'Terima kasih pak tukang! Sekalian dibersihkan sampai kinclong ya.' }
    ],
    vocab: [
      { hanji: '厝', poj: 'Chhù', indo: 'Rumah tinggal / Kediaman' },
      { hanji: '師父', poj: 'Sai-hū', indo: 'Tukang ahli / Master montir' },
      { hanji: '漏水', poj: 'Lāu-chúi', indo: 'Bocor merembes air' },
      { hanji: '打掃', poj: 'Phah-só', indo: 'Menyapu / Bersih-bersih rumah' },
      { hanji: '清氣', poj: 'Chheng-khì', indo: 'Bersih rapi higienis' }
    ],
    quiz: {
      question: 'Aksara "厝" dibaca "Chhù" dalam bahasa Hokkien memiliki arti:',
      options: ['Rumah tempat tinggal', 'Pasar ikan', 'Kapal layar', 'Sepeda motor'],
      correct: 0,
      explanation: '"Chhù" adalah kosakata klasik Minnan yang berarti rumah atau hunian.'
    }
  },
  {
    id: 19,
    level: 'Menengah',
    category: 'Keluarga & Adat',
    track: 'Tradisi & Budaya',
    title: 'Modul 19: Pesta Pernikahan Tradisional Peranakan',
    subtitle: 'Mengenal adat "Kiat-hun", pesta jamuan "Chhiáⁿ-chiú", kue pengantin "Hí-piáⁿ", dan seserahan.',
    duration: '20 Menit',
    badge: 'Duta Budaya Peranakan',
    culturalNote: 'Pernikahan adat Tionghoa peranakan penuh simbol kemakmuran dan kesetiaan. Istilah "Chia̍h chhiáⁿ-chiú" (minum anggur jamuan) adalah sebutan untuk menghadiri kondangan pesta pernikahan.',
    dialogue: [
      { speaker: 'Tamu', role: 'A', hanji: 'Sin-niû, Sin-lông, chiok lín peh-nî hó-ha̍p, éng-kiat tông-sim!', poj: 'Sin-niû, Sin-lông, chiok lín peh-nî hó-ha̍p, éng-kiat tông-sim!', indo: 'Pengantin wanita dan pria, selamat rukun harmonis seratus tahun, abadi sehati!' },
      { speaker: 'Pengantin', role: 'B', hanji: 'To-siā lí lâi chia̍h chiú! Chhiáⁿ ji̍p-chō chia̍h hí-piáⁿ!', poj: 'To-siā lí lâi chia̍h chiú! Chhiáⁿ ji̍p-chō chia̍h hí-piáⁿ!', indo: 'Terima kasih sudah datang ke pesta pernikahan kami! Silakan duduk menyantap kue pengantin!' },
      { speaker: 'Tamu', role: 'A', hanji: 'Chiok lín kín-kín seⁿ tōa-thâu-sun!', poj: 'Chiok lín kín-kín seⁿ tōa-thâu-sun!', indo: 'Semoga cepat dikaruniai momongan buah hati yang cerdas!' }
    ],
    vocab: [
      { hanji: '結婚', poj: 'Kiat-hun', indo: 'Menikah / Pernikahan' },
      { hanji: '新娘', poj: 'Sin-niû', indo: 'Pengantin wanita' },
      { hanji: '新郎', poj: 'Sin-lông', indo: 'Pengantin pria' },
      { hanji: '請酒', poj: 'Chhiáⁿ-chiú', indo: 'Pesta resepsi perjamuan kawin' },
      { hanji: '喜餅', poj: 'Hí-piáⁿ', indo: 'Kue kering seserahan pengantin' }
    ],
    quiz: {
      question: 'Jika seorang kawan di Medan mengajak "Lâi khì chia̍h chhiáⁿ-chiú", ajakan tersebut bermaksud:',
      options: ['Ayo menghadiri pesta kondangan pernikahan', 'Ayo beli obat di apotek', 'Ayo naik becak ke stasiun', 'Ayo belajar membaca aksara'],
      correct: 0,
      explanation: '"Chia̍h chhiáⁿ-chiú" secara idiomatik berarti pergi menghadiri pesta jamuan pernikahan.'
    }
  },
  {
    id: 20,
    level: 'Pemula',
    category: 'Ungkapan Gaul',
    track: 'Hobi & Rekreasi',
    title: 'Modul 20: Olahraga, Kebugaran & Hobi Santai',
    subtitle: 'Istilah olahraga "Ūn-tōng", jalan santai, bermain bulutangkis, mendengar lagu, dan jalan-jalan "Chhit-thô".',
    duration: '16 Menit',
    badge: 'Bugar & Bahagia',
    culturalNote: 'Kata "Chhit-thô" (harfiah: bermain/jalan-jalan) adalah kata khas Hokkien yang sangat populer dari Medan hingga Taiwan untuk menggambarkan rekreasi santai melepas penat.',
    dialogue: [
      { speaker: 'A-Kiat', role: 'A', hanji: 'Ē-po͘ ū êng bô? Lán chò-hóe khì chhit-thô!', poj: 'Ē-po͘ ū êng--bô? Lán chò-hóe khì chhit-thô!', indo: 'Sore ada waktu luang gak? Ayo kita barengan pergi jalan-jalan rekreasi!' },
      { speaker: 'Ah-Bûn', role: 'B', hanji: 'Khì toh-ūi? Khì kong-hn̂g phah ú-mô͘-kiû, hó--bô?', poj: 'Khì toh-ūi? Khì kong-hn̂g phah ú-mô͘-kiû, hó--bô?', indo: 'Pergi ke mana? Ke taman main bulutangkis, mau gak?' },
      { speaker: 'A-Kiat', role: 'A', hanji: 'Siāng-hó! Ūn-tōng hō͘ lán sin-thé kiān-khong koh sóng-khoài!', poj: 'Siōng-hó! Ūn-tōng hō͘ lán sin-thé kiān-khong koh sóng-khoài!', indo: 'Paling mantap! Olahraga bikin badan kita sehat dan segar plong!' }
    ],
    vocab: [
      { hanji: '七逃', poj: 'Chhit-thô', indo: 'Jalan-jalan / Bermain santai / Healing' },
      { hanji: '運動', poj: 'Ūn-tōng', indo: 'Olahraga membakar keringat' },
      { hanji: '打球', poj: 'Phah-kiû', indo: 'Bermain bola / Bulutangkis' },
      { hanji: '聽歌', poj: 'Thiaⁿ-koa', indo: 'Mendengarkan musik lagu' },
      { hanji: '爽快', poj: 'Sóng-khoài', indo: 'Segar plong berenergi' }
    ],
    quiz: {
      question: 'Kata "Chhit-thô" (七逃) sangat populer di kalangan penutur Hokkien yang bermakna:',
      options: ['Jalan-jalan / Rekreasi santai / Bermain', 'Bekerja lembur sampai malam', 'Menawar harga cabai di pasar', 'Meminum obat flu'],
      correct: 0,
      explanation: '"Chhit-thô" bermakna bermain, liburan, atau bepergian santai.'
    }
  },
  {
    id: 21,
    level: 'Menengah',
    category: 'Pasar & Transaksi',
    track: 'Pasar & Bisnis',
    title: 'Modul 21: Belanja Supermarket & Toko Modern',
    subtitle: 'Membeli perlengkapan harian, struk belanja, kantong plastik, bayar non-tunai, dan diskon.',
    duration: '18 Menit',
    badge: 'Smart Shopper',
    culturalNote: 'Di supermarket Taiwan maupun pasar ritel Medan, istilah diskon sering disebut "Phah-chiat" (打折). Pembayaran dengan kartu atau QR disebut "Shua-khah" atau bayar elektronik.',
    dialogue: [
      { speaker: 'Pembeli', role: 'A', hanji: 'Chit-ê mi̍h-kiāⁿ kin-á-ji̍t ū phah-chiat bô?', poj: 'Chit-ê mi̍h-kiāⁿ kin-á-ji̍t ū phah-chiat--bô?', indo: 'Barang ini hari ini ada potongan diskon tidak?' },
      { speaker: 'Kasir', role: 'B', hanji: 'Ū, phah peh-chiat! Ài chah sok-ka-tē bô?', poj: 'Ū, phah peh-chiat! Ài chah sok-ka-tē--bô?', indo: 'Ada, diskon 20%! Butuh kantong plastik belanjaan tidak?' },
      { speaker: 'Pembeli', role: 'A', hanji: 'M̄-bián, góa ka-tī ū chah khoân-pó-tē. Ē-sái shua-khah bô?', poj: 'M̄-bián, góa ka-tī ū chah khoân-pó-tē. Ē-sái shua-khah--bô?', indo: 'Tidak usah, saya bawa tas belanja ramah lingkungan sendiri. Bisa gesek kartu tidak?' },
      { speaker: 'Kasir', role: 'B', hanji: 'Ē-sái, chia sī hoat-phiò kap thong-koè thong-tī!', poj: 'Ē-sái, chia sī hoat-phiò kap thong-koè thong-tī!', indo: 'Bisa, ini nota kuitansi dan bukti transaksinya!' }
    ],
    vocab: [
      { hanji: '物件', poj: 'Mi̍h-kiāⁿ', indo: 'Barang belanjaan' },
      { hanji: '打折', poj: 'Phah-chiat', indo: 'Diskon potongan harga' },
      { hanji: '塑膠袋', poj: 'Sok-ka-tē', indo: 'Kantong plastik kantong kresek' },
      { hanji: '刷卡', poj: 'Shua-khah', indo: 'Gesek kartu debet/kredit' },
      { hanji: '發票', poj: 'Hoat-phiò', indo: 'Struk bukti pembelian / Kuitansi' }
    ],
    quiz: {
      question: 'Istilah "Phah peh-chiat" (打八折) dalam sistem perniagaan Tionghoa berarti diskon sebesar:',
      options: ['20% (Harganya menjadi 80%)', '80% potongan langsung', '8 rupiah saja', 'Beli 8 gratis 1'],
      correct: 0,
      explanation: 'Dalam sistem Tionghoa, "Phah peh-chiat" artinya pembeli membayar 80% dari harga normal (diskon 20%).'
    }
  },
  {
    id: 22,
    level: 'Lanjutan',
    category: 'Ungkapan Gaul',
    track: 'Tradisi & Budaya',
    title: 'Modul 22: Ungkapan Kiasan & Pepatah Bijak Minnan',
    subtitle: 'Filosofi leluhur: "Chia̍h kóe-chí pài chhiū-thâu", "Chò-lâng ài sêng-si̍t", dan hukum tabur tuai.',
    duration: '22 Menit',
    badge: 'Filsuf Minnan',
    culturalNote: 'Pepatah Hokkien sarat dengan pesan moral tentang rasa tahu terima kasih ("Kám-un") dan mengingat budi baik orang yang pernah membantu saat kita susah.',
    dialogue: [
      { speaker: 'Tetua', role: 'A', hanji: 'Lán kóng: "Chia̍h kóe-chí, ài pài chhiū-thâu."', poj: 'Lán kóng: "Chia̍h kóe-chí, ài pài chhiū-thâu."', indo: 'Kita orang Minnan berkata: "Makan buah, harus menghormati pangkal pohonnya."' },
      { speaker: 'Pemuda', role: 'B', hanji: 'Tio̍h, lâng thàn-chîⁿ sêng-kong, m̄-thang bē-kì pang-bâng lán ê lâng.', poj: 'Tio̍h, lâng thàn-chîⁿ sêng-kong, m̄-thang bē-kì pang-bâng lán ê lâng.', indo: 'Betul, saat kita sukses mendapat rezeki, jangan melupakan orang yang pernah menolong kita.' },
      { speaker: 'Tetua', role: 'A', hanji: 'Sêng-si̍t chò-lâng, thiⁿ ē pó-pì!', poj: 'Sêng-si̍t chò-lâng, thiⁿ ē pó-pì!', indo: 'Jujur dalam berprilaku, langit niscaya akan memberkati!' }
    ],
    vocab: [
      { hanji: '食果子拜樹頭', poj: 'Chia̍h kóe-chí pài chhiū-thâu', indo: 'Pepatah: Tahu membalas budi dan tidak lupa asal-usul' },
      { hanji: '感恩', poj: 'Kám-un', indo: 'Bersyukur berterima kasih' },
      { hanji: '做人', poj: 'Chò-lâng', indo: 'Berprilaku hidup dan menjaga adab' },
      { hanji: '誠實', poj: 'Sêng-si̍t', indo: 'Jujur tanpa kepalsuan' },
      { hanji: '天公保庇', poj: 'Thiⁿ-kong pó-pì', indo: 'Dewa langit senantiasa melindungi' }
    ],
    quiz: {
      question: 'Makna filosofis dari pepatah "Chia̍h kóe-chí pài chhiū-thâu" adalah:',
      options: ['Jangan lupa membalas budi dan menghormati asal usul jasa orang lain', 'Harus sering menanam pohon buah', 'Buah manis harus dimakan dengan cepat', 'Jangan memanjat pohon sembarangan'],
      correct: 0,
      explanation: 'Pepatah ini mengajarkan adab luhur: ketika menikmati hasil/manfaat, ingatlah jasa orang yang telah menanam dan merawatnya.'
    }
  },
  {
    id: 23,
    level: 'Menengah',
    category: 'Darurat & Kesehatan',
    track: 'Keamanan & Darurat',
    title: 'Modul 23: Keadaan Darurat & Bantuan Polisi',
    subtitle: 'Meminta tolong darurat "Kín-kip", lapor polisi, kebakaran "Cháu-hóe", dan mencari keselamatan.',
    duration: '18 Menit',
    badge: 'Tanggap Siaga',
    culturalNote: 'Dalam situasi genting, ungkapan "Kù-bēng!" (Selamatkan nyawa!) atau "Pang-bâng!" (Tolong!) adalah seruan universal yang langsung dipahami seluruh komunitas Hokkien.',
    dialogue: [
      { speaker: 'Warga', role: 'A', hanji: 'Pang-bâng a! Chia ū lâng khak-chhia siū-siong矣!', poj: 'Pang-bâng--a! Chia ū lâng khak-chhia siū-siong--ah!', indo: 'Tolong! Di sini ada kecelakaan motor dan korban terluka!' },
      { speaker: 'Penolong', role: 'B', hanji: 'Kín phah tiān-oē kiò kù-hō͘-chhia kap kèng-chhat!', poj: 'Kín phah tiān-oē kiò kù-hō͘-chhia kap kèng-chhat!', indo: 'Cepat telepon panggil ambulans dan polisi!' },
      { speaker: 'Warga', role: 'A', hanji: 'Hó, góa chiū-kín phah! Ta̍k-ke m̄-thang lōan, pó-chhî an-choân!', poj: 'Hó, góa chiū-kín phah! Ta̍k-ke m̄-thang lōan, pó-chhî an-choân!', indo: 'Baik, segera saya hubungi! Semua jangan panik, jaga keselamatan!' }
    ],
    vocab: [
      { hanji: '幫忙', poj: 'Pang-bâng', indo: 'Tolong menolong / Bantuan darurat' },
      { hanji: '救命', poj: 'Kù-bēng', indo: 'Tolong selamatkan nyawa!' },
      { hanji: '救護車', poj: 'Kù-hō͘-chhia', indo: 'Mobil ambulans penyelamat' },
      { hanji: '警察', poj: 'Kèng-chhat', indo: 'Petugas kepolisian' },
      { hanji: '安全', poj: 'An-choân', indo: 'Aman selamat sentosa' }
    ],
    quiz: {
      question: 'Jika terjadi situasi darurat dan Anda membutuhkan pertolongan cepat, Anda berteriak:',
      options: ['Pang-bâng! Kù-bēng! (Tolong! Selamatkan nyawa!)', 'Lim kún-chúi bē?', 'Lōa-chē chîⁿ?', 'Chài-kiàn!'],
      correct: 0,
      explanation: '"Pang-bâng" dan "Kù-bēng" adalah seruan minta tolong darurat.'
    }
  },
  {
    id: 24,
    level: 'Lanjutan',
    category: 'Keluarga & Adat',
    track: 'Tradisi & Budaya',
    title: 'Modul 24: Kesenian Tradisional, Opera Gezai & Musik Minnan',
    subtitle: 'Mengenal seni panggung Koa-á-hì, instrumen musik tradisional, dan lirik lagu Minnan legendaris.',
    duration: '20 Menit',
    badge: 'Apresiator Seni Minnan',
    culturalNote: 'Koa-á-hì (歌仔戲) adalah satu-satunya bentuk opera Tionghoa yang lahir dan berkembang di wilayah rumpun Minnan, menggunakan sastra lisan berirama tinggi.',
    dialogue: [
      { speaker: 'Penonton', role: 'A', hanji: 'A-má, kin-á-ji̍t biō-kháu ū chhiùⁿ Koa-á-hì, lán chò-hóe khì khoàⁿ!', poj: 'A-má, kin-á-ji̍t biō-kháu ū chhiùⁿ Koa-á-hì, lán chò-hóe khì khoàⁿ!', indo: 'Nenek, hari ini di pelataran kelenteng ada pentas Opera Gezai, ayo kita nonton bareng!' },
      { speaker: 'A-má', role: 'B', hanji: 'Hó lah! Koa-á-hì ê koa-siaⁿ chin iú-bī, chhiūⁿ kah chin kám-tōng.', poj: 'Hó--lah! Koa-á-hì ê koa-siaⁿ chin iú-bī, chhiūⁿ kah chin kám-tōng!', indo: 'Bagus sekali! Nyanyian Opera Gezai sangat merdu dan menyentuh perasaan.' },
      { speaker: 'Penonton', role: 'A', hanji: 'I-ê gī-su̍t thoân-sêng chin ū kè-ti̍t, ài hō͘ siàu-liân-lâng liáu-kái.', poj: 'I-ê gī-su̍t thoân-sêng chin ū kè-ti̍t, ài hō͘ siàu-liân-lâng liáu-kái.', indo: 'Pewarisan seni budaya ini sangat bernilai, generasi muda harus memahaminya.' }
    ],
    vocab: [
      { hanji: '歌仔戲', poj: 'Koa-á-hì', indo: 'Seni opera tradisional Minnan (Gezai)' },
      { hanji: '唱歌', poj: 'Chhiūⁿ-koa', indo: 'Menyanyi melantunkan lagu' },
      { hanji: '優美', poj: 'Iú-bī', indo: 'Indah menawan dan merdu didengar' },
      { hanji: '感動', poj: 'Kám-tōng', indo: 'Terharu tersentuh nurani' },
      { hanji: '傳承', poj: 'Thoân-sêng', indo: 'Mewariskan tradisi ke generasi penerus' }
    ],
    quiz: {
      question: 'Seni panggung sandiwara opera tradisional yang sangat dicintai masyarakat penutur Hokkien adalah:',
      options: ['歌仔戲 (Koa-á-hì)', 'Kopitiam', 'Chhá-kóe-tiâu', 'Lō͘-kháu'],
      correct: 0,
      explanation: 'Koa-á-hì (歌仔戲) adalah opera tradisional khas berakar dari bahasa Minnan.'
    }
  },
  {
    id: 25,
    level: 'Menengah',
    category: 'Keluarga & Adat',
    track: 'Tradisi & Budaya',
    title: 'Modul 25: Festival Kalender Lunar (Bakcang, Kue Bulan & Ronde)',
    subtitle: 'Merayakan Pài-pau (Bakcang), Festival Kue Bulan Tiong-chhiu, dan Dongzhi menyantap Í-á ronde.',
    duration: '20 Menit',
    badge: 'Master Festival Peranakan',
    culturalNote: 'Makanan tradisional sering kali menandai perputaran musim: Bakcang di bulan 5 Imlek, Kue Bulan di bulan 8, dan Ronde manis (Í-á) di titik balik musim dingin Dongzhi.',
    dialogue: [
      { speaker: 'Ibu', role: 'A', hanji: 'Goe̍h-cheh kàu矣, lán ài pa̍k bah-chàng, koh ū kîⁿ-chàng!', poj: 'Goe̍h-cheh kàu--ah, lán ài pa̍k bah-chàng, koh ū kîⁿ-chàng!', indo: 'Hari festival tiba, kita membungkus bakcang daging dan kue cang ketan abu!' },
      { speaker: 'Anak', role: 'B', hanji: 'Góa siōng kah-ì chia̍h bah-chàng, lāi-bīn ū he-bi, bah, kap hî-thô-tāu!', poj: 'Góa siōng kah-ì chia̍h bah-chàng, lāi-bīn ū he-bi, bah, kap thô-tāu!', indo: 'Aku paling suka makan bakcang, di dalamnya ada ebi, daging empuk, dan kacang tanah!' },
      { speaker: 'Ibu', role: 'A', hanji: 'Tio̍h! Kòe kuí kò goe̍h Tiong-chhiu koh chia̍h goe̍h-piáⁿ khoàⁿ goe̍h-niû!', poj: 'Tio̍h! Kòe kuí kò goe̍h Tiong-chhiu koh chia̍h goe̍h-piáⁿ khoàⁿ goe̍h-niû!', indo: 'Betul! Beberapa bulan lagi saat Tiong Chiu kita makan kue bulan sambil menikmati rembulan!' }
    ],
    vocab: [
      { hanji: '肉粽', poj: 'Bah-chàng', indo: 'Bakcang isi daging gurih bumbu rempah' },
      { hanji: '月餅', poj: 'Goe̍h-piáⁿ', indo: 'Kue bulan isi pasta kacang teratai' },
      { hanji: '圓仔', poj: 'Îⁿ-á', indo: 'Kue ronde beras ketan manis lambang kebersamaan' },
      { hanji: '中秋節', poj: 'Tiong-chhiu-cheh', indo: 'Festival Musim Gugur / Kue Bulan' },
      { hanji: '團圓', poj: 'Thoân-oân', indo: 'Kumpul rukun bersama keluarga utuh' }
    ],
    quiz: {
      question: 'Kuliner "Bah-chàng" (肉粽) yang dibungkus daun bambu secara harfiah berasal dari bahasa Hokkien yang bermakna:',
      options: ['Bungkusan beras ketan berisi daging (Bah = Daging, Chàng = Bungkusan ketan)', 'Roti kukus beragi', 'Kue semprong renyah', 'Bubur beras kuah ikan'],
      correct: 0,
      explanation: 'Bah-chàng berasal dari kata Hokkien "Bah" (daging) dan "Chàng" (bacang beras ketan).'
    }
  },
  {
    id: 26,
    level: 'Menengah',
    category: 'Keluarga & Adat',
    track: 'Tradisi & Budaya',
    title: 'Modul 26: Budaya Sembahyang, Kelenteng & Adab Dupa',
    subtitle: 'Istilah "Pài-pài", membakar dupa "Hiuⁿ", menghormati Dewa Langit Thiⁿ-kong, dan memohon berkah.',
    duration: '18 Menit',
    badge: 'Penjaga Harmoni Leluhur',
    culturalNote: 'Tradisi Sembahyang Thiⁿ-kong (拜天公) pada tanggal 9 Imlek adalah tradisi terakbar penutur Hokkien di seluruh dunia, sebagai simbol penyelamatan leluhur dari masa perang.',
    dialogue: [
      { speaker: 'Ayah', role: 'A', hanji: 'Kin-á-ji̍t sī chhe-káu, lán chún-pī tiⁿ-kóe kap ông-lâi pài Thiⁿ-kong!', poj: 'Kin-á-ji̍t sī chhe-káu, lán chún-pī tiⁿ-kóe kap ông-lâi pài Thiⁿ-kong!', indo: 'Hari ini tanggal sembilan Imlek, kita siapkan kue keranjang dan buah nanas untuk sembahyang Dewa Langit!' },
      { speaker: 'Putra', role: 'B', hanji: 'Pah, nâ-chiat ài chah kuí ki hiuⁿ?', poj: 'Pah, nâ-chiat ài chah kuí ki hiuⁿ?', indo: 'Pa, waktu menyalakan dupa kita bawa berapa batang hio?' },
      { speaker: 'Ayah', role: 'A', hanji: 'The̍h saⁿ ki hiuⁿ, sêng-sim kî-kiû ka-têng pêng-an, seng-lí sūn-sūn!', poj: 'The̍h saⁿ ki hiuⁿ, sêng-sim kî-kiû ka-têng pêng-an, seng-lí sūn-sūn!', indo: 'Pegang tiga batang dupa, dengan tulus memohon keluarga damai dan rezeki bisnis lancar!' }
    ],
    vocab: [
      { hanji: '拜拜', poj: 'Pài-pài', indo: 'Sembahyang memanjatkan doa rasa syukur' },
      { hanji: '天公', poj: 'Thiⁿ-kong', indo: 'Dewa Langit Penguasa Alam Semesta' },
      { hanji: '香', poj: 'Hiuⁿ', indo: 'Batang dupa harum sembahyang' },
      { hanji: '鳳梨', poj: 'Ông-lâi', indo: 'Nanas (lambang kemakmuran dan berkah datang)' },
      { hanji: '平安', poj: 'Pêng-an', indo: 'Damai sentosa dan terhindar dari marabahaya' }
    ],
    quiz: {
      question: 'Mengapa buah Nanas ("Ông-lâi" / 鳳梨) selalu dipersembahkan dalam sembahyang tradisi Hokkien?',
      options: ['Karena pelafalannya "Ông-lâi" berbunyi seperti ungkapan "Kemakmuran & Rezeki Datang"', 'Karena hanya berbuah setahun sekali', 'Karena warnanya mirip daun teh', 'Karena tidak disukai serangga'],
      correct: 0,
      explanation: 'Dalam bahasa Hokkien, pelafalan "Ông-lâi" homofon dengan kata "Kemakmuran datang melimpah" (旺來).'
    }
  }
]

export default coursesModules
