export interface CuratedWord {
  chinese: string
  hokkien: string
  indo: string
  category: string
  tone: string
  note: string
  example: string
}

export const curatedCategories = [
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

export const curatedVocabulary: CuratedWord[] = [
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
