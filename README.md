# HokkienLearn (v2)

Platform pembelajaran Bahasa Minnan (Hokkien) modern untuk penutur Bahasa Indonesia. Aplikasi ini menggabungkan materi otentik dialek Nusantara (Medan, Bagan, Riau) dan standar Taiwan MoE (Kementerian Pendidikan Taiwan) dalam antarmuka interaktif yang cepat dan ringan.

---

## Fitur Utama

- **Kamus Lengkap 13,000+ Entri**: Pencarian multibahasa mencakup aksara Han (漢字), ejaan POJ (Pe̍h-ōe-jī), Tâi-lô, serta terjemahan Bahasa Indonesia lengkap dengan audio pelafalan.
- **26 Modul Kursus Terstruktur**: Materi percakapan praktis dari budaya memesan *"Lim kún-chúi"* di kedai kopi, negosiasi harga di pasar tradisional, sapaan keluarga, hingga slang percakapan Medan.
- **Arena Latihan Interaktif**:
  - Kuis pilihan ganda dengan pembahasan langsung.
  - Tebak suara untuk melatih kepekaan vokal.
  - Kartu flashcard bolak-balik 3D.
  - Permainan jodohkan istilah slang Medan.
  - Pelatih 8 nada kuno Minnan dengan osilator audio frekuensi web.
- **Command Palette (`Ctrl + K`)**: Akses navigasi cepat ke seluruh modul, kamus, dan fitur latihan langsung dari keyboard.
- **Pelacak Kemajuan Lokal**: Menyimpan catatan streak belajar harian, kuis yang diselesaikan, dan daftar kata favorit secara aman di browser (tanpa perlu registrasi akun).

---

## Teknologi

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS (arsitektur BEM modular) dengan Tailwind CSS v4
- **State Management**: Zustand dengan penyimpanan lokal (localStorage)
- **Validasi Data**: Zod runtime schema
- **Animasi & Interaktivitas**: Framer Motion, Canvas Confetti
- **Audio**: Web Speech Synthesis API dan Web Audio API Oscillator

---

## Struktur Folder

```text
ambaschool-project/
├── public/
│   └── data/                 # Dataset JSON (kamus 13k kata, modul kursus, kuis)
├── src/
│   ├── components/
│   │   ├── common/           # Navbar, Footer, CommandPalette, Toast
│   │   ├── dictionary/       # Komponen halaman kamus
│   │   ├── home/             # Komponen beranda (Hero, Features, DictSearch, dll.)
│   │   ├── lessons/          # Komponen kurikulum kursus dan modal dialog
│   │   ├── practice/         # Komponen game dan latihan nada
│   │   └── vocabulary/       # Komponen daftar kosakata
│   ├── data/                 # Data statis dan fallback TypeScript
│   ├── hooks/                # Custom hooks (useDebounce, dll.)
│   ├── lib/                  # Konfigurasi ApiClient (Axios)
│   ├── pages/                # Halaman utama (About, Dictionary, Lessons, Practice, Vocabulary)
│   ├── schemas/              # Runtime Zod validation schemas
│   ├── store/                # Zustand stores (Vocabulary, Course, UserProgress, Toast)
│   ├── utils/                # Audio synthesizer, sound effects, confetti
│   ├── App.tsx               # Router dan root layout
│   ├── index.css             # Design tokens, variabel CSS, dan reset global
│   └── main.tsx              # Entry point aplikasi
├── .env.example              # Template variabel lingkungan
└── vite.config.js            # Konfigurasi Vite
```

---

## Panduan Instalasi & Menjalankan Lokal

### Prasyarat
- **Node.js**: Versi 18.0.0 atau lebih baru
- **Package Manager**: `pnpm` (disarankan) atau `npm` / `yarn`

### 1. Klon Repositori
```bash
git clone https://github.com/username/ambaschool-project.git
cd ambaschool-project
```

### 2. Pasang Dependensi
```bash
pnpm install
```

### 3. Konfigurasi Lingkungan (Opsional)
Salin berkas `.env.example` ke `.env`:
```bash
cp .env.example .env
```

Secara default, aplikasi akan mengambil dataset langsung dari folder lokal `public/data/`:
```env
VITE_DATA_BASE_URL=/data
```

Jika dataset kamus (6.1 MB) dihosting di GitHub publik atau CDN jsDelivr:
```env
# Format jsDelivr CDN (disarankan untuk produksi)
VITE_DATA_BASE_URL=https://cdn.jsdelivr.net/gh/username/repo@main/public/data

# Format GitHub Raw
# VITE_DATA_BASE_URL=https://raw.githubusercontent.com/username/repo/main/public/data
```

### 4. Jalankan Server Pengembangan
```bash
pnpm dev
```
Buka peramban di `http://localhost:5173`.

### 5. Kompilasi untuk Produksi
```bash
pnpm build
```
Hasil build siap rilis akan berada di folder `dist/`. Anda dapat mengujinya secara lokal dengan perintah:
```bash
pnpm preview
```

---

## Rekomendasi Deployment

Aplikasi ini adalah Single Page Application (SPA). Platform deployment yang disarankan adalah **Vercel**:
1. Buat proyek baru di dashboard Vercel dan hubungkan repositori Git.
2. Vercel akan otomatis mendeteksi konfigurasi Vite (`pnpm build`, direktori output `dist`).
3. Tambahkan rewrite SPA di `vercel.json` agar routing browser berjalan saat halaman dimuat ulang:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Lisensi & Atribusi

Proyek ini dibuat untuk tujuan edukasi dan pelestarian bahasa daerah Minnan/Hokkien di Indonesia. Sebagian basis kosakata mengacu pada dokumentasi terbuka Kementerian Pendidikan Taiwan (教育部臺灣台語常用詞辭典) serta leksikon percakapan komunitas Hokkien Medan dan Nusantara.
