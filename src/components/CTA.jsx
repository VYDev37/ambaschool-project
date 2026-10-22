import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiShieldCheck, HiSparkles } from 'react-icons/hi'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta section" id="cta">
      <div className="container">
        <motion.div
          className="cta__box glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="cta__bg-glow" />
          
          <div className="cta__content">
            <div className="cta__badge">
              <HiSparkles />
              <span>100% Gratis & Interaktif</span>
            </div>

            <h2 className="cta__title">
              Siap Memulai Perjalanan <br />
              <span className="gradient-text">Bahasa Hokkien Anda?</span>
            </h2>

            <p className="cta__desc">
              Hanya butuh 10 menit sehari untuk menguasai kosakata penting, nada percakapan,
              dan kepercayaan diri berbicara dengan keluarga maupun relasi.
            </p>

            <div className="cta__buttons">
              <Link to="/practice" className="cta__btn cta__btn--primary">
                <span>Mulai Latihan Sekarang</span>
                <HiArrowRight size={18} />
              </Link>
              <Link to="/lessons" className="cta__btn cta__btn--secondary">
                Lihat Silabus Belajar
              </Link>
            </div>

            <div className="cta__perks">
              <span className="cta__perk">
                <HiShieldCheck className="cta__perk-icon" /> Akses Semua Materi Gratis
              </span>
              <span className="cta__perk">
                <HiShieldCheck className="cta__perk-icon" /> Audio Penutur Asli
              </span>
              <span className="cta__perk">
                <HiShieldCheck className="cta__perk-icon" /> Kuis & Latihan Nada
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
