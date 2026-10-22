import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiLockClosed, HiCheck, HiArrowRight } from 'react-icons/hi'
import './LessonPreview.css'

const lessons = [
  {
    level: 'Pemula',
    lessons: [
      { id: 1, title: 'Sapaan & Perkenalan', desc: 'Lí hó, Góa sī...', status: 'completed', progress: 100 },
      { id: 2, title: 'Angka & Bilangan', desc: 'It, jī, saⁿ, sì, gō͘...', status: 'completed', progress: 100 },
      { id: 3, title: 'Keluarga', desc: 'Pē, bú, hiaⁿ, chí...', status: 'current', progress: 45 },
      { id: 4, title: 'Warna & Bentuk', desc: 'Âng, n̂g, chheⁿ...', status: 'locked', progress: 0 },
    ],
  },
  {
    level: 'Menengah',
    lessons: [
      { id: 5, title: 'Di Pasar', desc: 'Chia̍h-mi̍h, bé mi̍h...', status: 'locked', progress: 0 },
      { id: 6, title: 'Arah & Transportasi', desc: 'Chhia, lō͘, tò-pêng...', status: 'locked', progress: 0 },
      { id: 7, title: 'Di Restoran', desc: 'Chia̍h-pn̄g, lim tê...', status: 'locked', progress: 0 },
      { id: 8, title: 'Cuaca & Musim', desc: 'Thiⁿ-khì, lo̍h-hō͘...', status: 'locked', progress: 0 },
    ],
  },
]

export default function LessonPreview() {
  return (
    <section className="lesson-preview section" id="lessons">
      <div className="container">
        <motion.div
          className="lesson-preview__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="lesson-preview__label">Kurikulum</span>
          <h2 className="lesson-preview__title">
            Jalur Belajar yang{' '}
            <span className="gradient-text">Terstruktur</span>
          </h2>
          <p className="lesson-preview__subtitle">
            Ikuti perjalanan belajar dari dasar hingga mahir. Setiap pelajaran
            dirancang untuk membangun di atas materi sebelumnya.
          </p>
        </motion.div>

        <div className="lesson-preview__content">
          {lessons.map((group, gi) => (
            <motion.div
              key={gi}
              className="lesson-group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: gi * 0.15 }}
            >
              <div className="lesson-group__header">
                <span className={`lesson-group__badge lesson-group__badge--${gi === 0 ? 'beginner' : 'intermediate'}`}>
                  {group.level}
                </span>
              </div>
              <div className="lesson-group__list">
                {group.lessons.map((lesson, li) => (
                  <div
                    key={lesson.id}
                    className={`lesson-item ${lesson.status === 'locked' ? 'lesson-item--locked' : ''} ${lesson.status === 'current' ? 'lesson-item--current' : ''}`}
                  >
                    <div className="lesson-item__status">
                      {lesson.status === 'completed' && (
                        <span className="lesson-item__check"><HiCheck /></span>
                      )}
                      {lesson.status === 'current' && (
                        <span className="lesson-item__current-dot" />
                      )}
                      {lesson.status === 'locked' && (
                        <span className="lesson-item__lock"><HiLockClosed /></span>
                      )}
                      {li < group.lessons.length - 1 && (
                        <span className={`lesson-item__line ${lesson.status === 'completed' ? 'lesson-item__line--done' : ''}`} />
                      )}
                    </div>
                    <div className="lesson-item__content">
                      <h4 className="lesson-item__title">{lesson.title}</h4>
                      <p className="lesson-item__desc">{lesson.desc}</p>
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <div className="lesson-item__progress">
                          <div className="lesson-item__progress-bar">
                            <div
                              className="lesson-item__progress-fill"
                              style={{ width: `${lesson.progress}%` }}
                            />
                          </div>
                          <span className="lesson-item__progress-text">{lesson.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="lesson-preview__action"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/lessons" className="lesson-preview__btn">
            <span>Lihat Semua Pelajaran</span>
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
