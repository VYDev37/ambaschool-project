import { motion } from 'framer-motion'
import { HiBookOpen, HiMicrophone, HiChat, HiAcademicCap, HiGlobe, HiSparkles } from 'react-icons/hi'
import './Features.css'

const features = [
  {
    icon: <HiBookOpen />,
    title: 'Pelajaran Terstruktur',
    description: 'Materi dari dasar hingga mahir, disusun secara bertahap agar mudah dipahami.',
    color: '#e63946',
  },
  {
    icon: <HiMicrophone />,
    title: 'Latihan Pelafalan',
    description: 'Dengarkan pengucapan asli dan latih pelafalan nada Hokkien yang benar.',
    color: '#f0b429',
  },
  {
    icon: <HiChat />,
    title: 'Percakapan Sehari-hari',
    description: 'Pelajari frasa dan dialog yang sering digunakan dalam kehidupan sehari-hari.',
    color: '#28c840',
  },
  {
    icon: <HiAcademicCap />,
    title: 'Kuis Interaktif',
    description: 'Uji pemahaman dengan berbagai jenis kuis yang menyenangkan dan menantang.',
    color: '#a855f7',
  },
  {
    icon: <HiGlobe />,
    title: 'Konteks Budaya',
    description: 'Pahami budaya di balik bahasa melalui cerita, tradisi, dan sejarah Hokkien.',
    color: '#3b82f6',
  },
  {
    icon: <HiSparkles />,
    title: 'Sistem Gamifikasi',
    description: 'Raih poin, badge, dan streak harian untuk menjaga semangat belajar Anda.',
    color: '#ec4899',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="features__label">Fitur Unggulan</span>
          <h2 className="features__title">
            Semua yang Anda Butuhkan untuk{' '}
            <span className="gradient-text">Menguasai Hokkien</span>
          </h2>
          <p className="features__subtitle">
            Platform kami dirancang khusus untuk penutur Bahasa Indonesia yang ingin
            mempelajari Bahasa Hokkien dengan metode modern dan efektif.
          </p>
        </motion.div>

        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card glass"
              variants={cardVariants}
            >
              <div
                className="feature-card__icon"
                style={{
                  background: `${feature.color}15`,
                  color: feature.color,
                  borderColor: `${feature.color}30`,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
              <div
                className="feature-card__glow"
                style={{ background: feature.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
