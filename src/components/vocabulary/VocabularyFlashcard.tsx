import React from 'react'
import { motion } from 'framer-motion'
import {
  HiVolumeUp,
  HiChevronLeft,
  HiChevronRight,
  HiRefresh
} from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'
import { playFlip } from '../../utils/soundEffects'

interface VocabularyFlashcardProps {
  card: VocabularyItem
  index: number
  total: number
  isFlipped: boolean
  onToggleFlip: () => void
  onNext: () => void
  onPrev: () => void
  onRandom: () => void
  onSpeak: (hanji: string) => void
}

export const VocabularyFlashcard: React.FC<VocabularyFlashcardProps> = ({
  card,
  index,
  total,
  isFlipped,
  onToggleFlip,
  onNext,
  onPrev,
  onRandom,
  onSpeak
}) => {
  const handleCardClick = () => {
    playFlip()
    onToggleFlip()
  }

  return (
    <div className="flashcard-container">
      <motion.div
        key={`${card.hanji}-${index}`}
        className={`flashcard-box glass ${isFlipped ? 'flashcard-box--flipped' : ''}`}
        onClick={handleCardClick}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flashcard-box__meta">
          <span className="flashcard-box__tag">{card.category}</span>
          <span className="flashcard-box__count">
            {index + 1} / {total}
          </span>
        </div>

        {!isFlipped ? (
          <div className="flashcard-box__front">
            <span className="flashcard-box__hanji chinese-text">{card.hanji}</span>
            <button
              type="button"
              className="flashcard-box__audio-btn"
              onClick={(e) => {
                e.stopPropagation()
                onSpeak(card.hanji)
              }}
              title="Dengar pelafalan"
            >
              <HiVolumeUp size={24} />
            </button>
            <span className="flashcard-box__instruction">
              Ketuk kartu untuk melihat arti & cara baca
            </span>
          </div>
        ) : (
          <div className="flashcard-box__back">
            <span className="flashcard-box__poj">{card.poj}</span>
            {card.tailo && card.tailo !== card.poj && (
              <span className="flashcard-box__tailo">Tâi-lô: {card.tailo}</span>
            )}
            <h3 className="flashcard-box__indo">{card.indo}</h3>
            {(card.example || card.usage) && (
              <div className="flashcard-box__details">
                {card.example && (
                  <p className="flashcard-box__example">Contoh: "{card.example}"</p>
                )}
                {card.usage && (
                  <span className="flashcard-box__usage">{card.usage}</span>
                )}
              </div>
            )}
            <button
              type="button"
              className="flashcard-box__audio-btn"
              onClick={(e) => {
                e.stopPropagation()
                onSpeak(card.hanji)
              }}
              title="Dengar pelafalan"
            >
              <HiVolumeUp size={22} />
            </button>
          </div>
        )}
      </motion.div>

      <div className="flashcard-controls">
        <button
          type="button"
          className="flashcard-nav-btn"
          onClick={onPrev}
          disabled={total <= 1}
        >
          <HiChevronLeft size={22} /> Kartu Sebelumnya
        </button>
        <button
          type="button"
          className="flashcard-shuffle-btn"
          onClick={onRandom}
          title="Kartu Acak"
        >
          <HiRefresh size={20} /> Acak
        </button>
        <button
          type="button"
          className="flashcard-nav-btn"
          onClick={onNext}
          disabled={total <= 1}
        >
          Kartu Berikutnya <HiChevronRight size={22} />
        </button>
      </div>
    </div>
  )
}
