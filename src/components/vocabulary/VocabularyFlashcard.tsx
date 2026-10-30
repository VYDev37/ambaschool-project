import React from 'react'
import { motion } from 'framer-motion'
import {
  HiVolumeUp,
  HiBookmark,
  HiChevronLeft,
  HiChevronRight,
  HiRefresh
} from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'
import { useUserProgressStore } from '../../store/UserProgressStore'
import { playClick, playSuccess, playFlip } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

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
  const { showToast } = useToast()
  const isSaved = useUserProgressStore((state) => state.isWordSaved(card.poj))
  const toggleSaveWord = useUserProgressStore((state) => state.toggleSaveWord)

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    const willBeSaved = toggleSaveWord(card.poj)
    if (willBeSaved) {
      playSuccess()
      showToast(`⭐ "${card.poj}" disimpan!`, 'badge', 2000)
    } else {
      playClick()
      showToast('Dihapus dari kata tersimpan', 'info', 1500)
    }
  }

  const handleCardClick = () => {
    playFlip()
    onToggleFlip()
  }

  return (
    <div className="vocab-flashcard-wrap">
      <div className="vocab-flashcard-controls-top">
        <span className="vocab-flashcard-counter">
          Kartu {index + 1} dari {total}
        </span>
        <button
          type="button"
          className="vocab-flashcard-shuffle"
          onClick={onRandom}
        >
          <HiRefresh /> Acak
        </button>
      </div>

      <div
        className={`vocab-flashcard ${isFlipped ? 'vocab-flashcard--flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="vocab-flashcard__inner">
          {/* Front */}
          <div className="vocab-flashcard__front glass">
            <span className="vocab-flashcard__badge">{card.category}</span>
            <span className="vocab-flashcard__hanji chinese-text">{card.hanji}</span>
            <span className="vocab-flashcard__hint">
              Klik kartu untuk melihat pengucapan & arti
            </span>
            <button
              type="button"
              className="vocab-flashcard__audio"
              onClick={(e) => {
                e.stopPropagation()
                onSpeak(card.hanji)
              }}
            >
              <HiVolumeUp size={18} /> Dengarkan
            </button>
          </div>

          {/* Back */}
          <div className="vocab-flashcard__back glass">
            <div className="vocab-flashcard__actions">
              <button
                type="button"
                className={`vocab-flashcard__save ${
                  isSaved ? 'vocab-flashcard__save--active' : ''
                }`}
                onClick={handleToggleSave}
              >
                <HiBookmark size={18} />
              </button>
            </div>
            <span className="vocab-flashcard__hanji-small chinese-text">
              {card.hanji}
            </span>
            <h2 className="vocab-flashcard__poj">{card.poj}</h2>
            {card.tailo && card.tailo !== card.poj && (
              <span className="vocab-flashcard__tailo">Tâi-lô: {card.tailo}</span>
            )}
            <p className="vocab-flashcard__indo">{card.indo}</p>
            {card.example && (
              <p className="vocab-flashcard__example">{card.example}</p>
            )}
            <span className="vocab-flashcard__flip-hint">
              Klik untuk membalik kartu
            </span>
          </div>
        </div>
      </div>

      <div className="vocab-flashcard-nav">
        <button type="button" className="vocab-flashcard-nav-btn" onClick={onPrev}>
          <HiChevronLeft size={20} /> Sebelumnya
        </button>
        <button type="button" className="vocab-flashcard-nav-btn" onClick={onNext}>
          Berikutnya <HiChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
