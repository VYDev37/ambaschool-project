import React from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiPlay, HiLocationMarker } from 'react-icons/hi'
import { CourseModule } from '../../schemas/CourseSchema'

interface LessonCardProps {
  module: CourseModule
  index: number
  isCompleted: boolean
  onSelect: (module: CourseModule) => void
}

export const LessonCard: React.FC<LessonCardProps> = ({
  module,
  index,
  isCompleted,
  onSelect
}) => {
  const isMedan =
    module.category.includes('Medan') || module.track?.includes('Medan')

  return (
    <motion.div
      className={`lesson-card glass ${
        isCompleted ? 'lesson-card--completed' : ''
      } ${isMedan ? 'lesson-card--medan' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(module)}
    >
      <div className="lesson-card__header">
        <div className="lesson-card__badge-row">
          <span className="lesson-card__level-badge">{module.level}</span>
          <span className="lesson-card__cat-badge">{module.category}</span>
          {isMedan && (
            <span className="lesson-card__medan-badge">
              <HiLocationMarker size={12} /> Medan
            </span>
          )}
        </div>
        {isCompleted && (
          <div className="lesson-card__completed-flag">
            <HiCheckCircle size={18} />
            <span>Selesai</span>
          </div>
        )}
      </div>

      <div className="lesson-card__body">
        <span className="lesson-card__track">{module.track}</span>
        <h3 className="lesson-card__title">{module.title}</h3>
        <p className="lesson-card__subtitle">{module.subtitle}</p>
        <p className="lesson-card__note">💡 {module.culturalNote}</p>
      </div>

      <div className="lesson-card__footer">
        <span className="lesson-card__duration">⏱️ {module.duration}</span>
        <button
          type="button"
          className="lesson-card__btn"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(module)
          }}
        >
          <HiPlay />
          <span>{isCompleted ? 'Tinjau Ulang' : 'Mulai Belajar'}</span>
        </button>
      </div>
    </motion.div>
  )
}
