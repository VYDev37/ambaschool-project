import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Kevin Wijaya',
    origin: 'Jakarta (Keluarga asal Medan)',
    avatar: 'KW',
    role: 'Pelajar Pemula',
    quote: 'Dulu kalau Akong dan Amah ngobrol bahasa Hokkien cuma bisa senyum-senyum aja. Berkat HokkienLearn, sekarang saya bisa ikut ngobrol dan pesan makanan langsung saat mudik Imlek!',
    stars: 5,
    tag: 'Komunikasi Keluarga'
  },
  {
    name: 'Stephanie Lim',
    origin: 'Surabaya',
    avatar: 'SL',
    role: 'Pelajar Menengah',
    quote: 'Sistem penjelasan nada dan romanisasi Pe̍h-ōe-jī di sini sangat sistematis. Sangat terbantu membedakan nada datar, naik, dan nada perhentian (entering tones) yang terkenal sulit.',
    stars: 5,
    tag: 'Pengucapan & Nada'
  },
  {
    name: 'David Hartono',
    origin: 'Batam & Singapura',
    avatar: 'DH',
    role: 'Pebisnis Regional',
    quote: 'Dalam perdagangan di Selatpanjang, Bagansiapiapi, sampai Penang dan Taiwan, Hokkien adalah bahasa kepercayaan. Website ini sangat praktis untuk percakapan bisnis nyata.',
    stars: 5,
    tag: 'Bisnis & Percakapan'
  }
]

export default function Testimonials() {
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
          <span className="testimonials__label">Cerita Komunitas</span>
          <h2 className="testimonials__title">
            Dipercaya Oleh Ribuan <span className="gradient-text">Pelajar Nusantara</span>
          </h2>
          <p className="testimonials__subtitle">
            Kisah nyata dari mereka yang berhasil menghidupkan kembali bahasa leluhur dan memperluas relasi pertemanan.
          </p>
        </motion.div>

        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
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
        </div>
      </div>
    </section>
  )
}
