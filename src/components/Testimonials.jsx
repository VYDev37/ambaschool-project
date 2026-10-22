import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiSparkles, HiChatAlt2, HiX, HiCheckCircle } from 'react-icons/hi'
import { playClick, playSuccess } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './Testimonials.css'

const initialTestimonials = [
  {
    id: 1,
    name: 'Kevin Wijaya',
    origin: 'Jakarta (Keluarga asal Medan)',
    avatar: 'KW',
    role: 'Pelajar Pemula',
    quote: 'Dulu kalau Akong dan Amah ngobrol bahasa Hokkien cuma bisa senyum-senyum aja. Berkat HokkienLearn, sekarang saya bisa ikut ngobrol dan pesan makanan langsung saat mudik Imlek!',
    stars: 5,
    tag: 'Komunikasi Keluarga'
  },
  {
    id: 2,
    name: 'Stephanie Lim',
    origin: 'Surabaya',
    avatar: 'SL',
    role: 'Pelajar Menengah',
    quote: 'Sistem penjelasan nada dan romanisasi Pe̍h-ōe-jī di sini sangat sistematis. Sangat terbantu membedakan nada datar, naik, dan nada perhentian (entering tones) yang terkenal sulit.',
    stars: 5,
    tag: 'Pengucapan & Nada'
  },
  {
    id: 3,
    name: 'David Hartono',
    origin: 'Batam & Singapura',
    avatar: 'DH',
    role: 'Pebisnis Regional',
    quote: 'Dalam perdagangan di Selatpanjang, Bagansiapiapi, sampai Penang dan Taiwan, Hokkien adalah bahasa kepercayaan. Website ini sangat praktis untuk percakapan bisnis nyata.',
    stars: 5,
    tag: 'Bisnis & Percakapan'
  },
  {
    id: 4,
    name: 'Cynthia Tan',
    origin: 'Medan & Bandung',
    avatar: 'CT',
    role: 'Mahasiswi Arsitektur',
    quote: 'Modul Kedai Kopi Medan-nya juara banget! Beneran ada istilah kún-chúi, ko-pi-o-peng, sampai istilah tawar pasar yang otentik. Website Hokkien terlengkap di Indonesia!',
    stars: 5,
    tag: 'Budaya Medan'
  }
]

const categories = ['Semua', 'Komunikasi Keluarga', 'Pengucapan & Nada', 'Bisnis & Percakapan', 'Budaya Medan']

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', origin: '', role: '', quote: '', stars: 5, tag: 'Komunikasi Keluarga' })
  const { showToast } = useToast()

  const filtered = testimonials.filter(t => activeCategory === 'Semua' || t.tag === activeCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.quote.trim()) return

    const newReview = {
      id: Date.now(),
      name: formData.name,
      origin: formData.origin || 'Indonesia',
      avatar: formData.name.slice(0, 2).toUpperCase(),
      role: formData.role || 'Pelajar Semangat',
      quote: formData.quote,
      stars: formData.stars,
      tag: formData.tag
    }

    setTestimonials(prev => [newReview, ...prev])
    playSuccess()
    showToast('🎉 Terima kasih! Ulasan Anda telah dipublikasikan.', 'success', 3000)
    setIsModalOpen(false)
    setFormData({ name: '', origin: '', role: '', quote: '', stars: 5, tag: 'Komunikasi Keluarga' })
  }

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="testimonials__label">
            <HiSparkles /> Cerita Komunitas
          </span>
          <h2 className="testimonials__title">
            Dipercaya Oleh Ribuan <span className="gradient-text">Pelajar Nusantara</span>
          </h2>
          <p className="testimonials__subtitle">
            Kisah nyata dari mereka yang berhasil menghidupkan kembali bahasa leluhur dan memperluas relasi pertemanan.
          </p>

          {/* Filter Categories & Write Review Button */}
          <div className="testimonials__controls">
            <div className="testimonials__tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`testimonials__tab-btn ${activeCategory === cat ? 'testimonials__tab-btn--active' : ''}`}
                  onClick={() => {
                    playClick()
                    setActiveCategory(cat)
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              className="testimonials__write-btn"
              onClick={() => {
                playClick()
                setIsModalOpen(true)
              }}
            >
              <HiChatAlt2 size={16} />
              <span>Tulis Pengalaman</span>
            </button>
          </div>
        </motion.div>

        <div className="testimonials__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                className="testimonial-card glass"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className="testimonial-card__tag">{item.tag}</div>
                <div className="testimonial-card__stars">
                  {[...Array(item.stars)].map((_, i) => (
                    <HiStar key={i} className="testimonial-card__star" />
                  ))}
                </div>
                <p className="testimonial-card__quote">"{item.quote}"</p>
                
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {item.avatar}
                  </div>
                  <div className="testimonial-card__meta">
                    <h4 className="testimonial-card__name">{item.name}</h4>
                    <span className="testimonial-card__origin">{item.origin}</span>
                    <span className="testimonial-card__role">{item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Write Experience Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="testi-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="testi-modal glass"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="testi-modal__header">
                <h3>Tulis Cerita & Pengalaman Anda</h3>
                <button
                  className="testi-modal__close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <HiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="testi-modal__form">
                <div className="testi-form-group">
                  <label>Nama Lengkap / Panggilan:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="testi-form-row">
                  <div className="testi-form-group">
                    <label>Asal / Kota:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Medan, Jakarta, Bagansiapiapi"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                  </div>
                  <div className="testi-form-group">
                    <label>Kategori Pengalaman:</label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    >
                      <option value="Komunikasi Keluarga">Komunikasi Keluarga</option>
                      <option value="Pengucapan & Nada">Pengucapan & Nada</option>
                      <option value="Bisnis & Percakapan">Bisnis & Percakapan</option>
                      <option value="Budaya Medan">Budaya Medan</option>
                    </select>
                  </div>
                </div>

                <div className="testi-form-group">
                  <label>Cerita atau Kesan Belajar:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Bagikan pengalaman belajar Anda, modul favorit, atau bagaimana Hokkien membantu hubungan Anda..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  />
                </div>

                <div className="testi-modal__footer">
                  <button
                    type="button"
                    className="testi-btn-cancel"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="testi-btn-submit">
                    Publikasikan Pengalaman
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
