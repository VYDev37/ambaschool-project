import React from 'react'
import { motion } from 'framer-motion'
import {
  HiVolumeUp,
  HiBookmark,
  HiOutlineBookmark,
  HiClipboardCopy,
  HiLightBulb
} from 'react-icons/hi'
import { CuratedWord } from '../../data/curatedVocabulary'

interface VocabularySectionCardProps {
  word: CuratedWord
  index: number
  isFlipped: boolean
  isBookmarked: boolean
  isSpeaking: boolean
  onToggleFlip: () => void
  onToggleBookmark: (e: React.MouseEvent) => void
  onSpeak: (e: React.MouseEvent) => void
  onCopy: (e: React.MouseEvent) => void
}

export const VocabularySectionCard: React.FC<VocabularySectionCardProps> = ({
  word,
  index,
  isFlipped,
  isBookmarked,
  isSpeaking,
  onToggleFlip,
  onToggleBookmark,
  onSpeak,
  onCopy
}) => {
  const isMedan = word.category === 'Medan Populer' || word.note.includes('Medan')

  return (
    <motion.div
      className={`vocab-card ${isMedan ? 'vocab-card--medan' : ''}`}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25, delay: (index % 12) * 0.02 }}
      onClick={onToggleFlip}
    >
      <div className={`vocab-card__inner ${isFlipped ? 'vocab-card__inner--flipped' : ''}`}>
        {/* Front face */}
        <div className="vocab-card__front">
          <div className="vocab-card__top-icons">
            {isMedan ? (
              <span className="vocab-card__medan-tag">🇮🇩 Medan</span>
            ) : (
              <span className="vocab-card__category-tag">{word.category}</span>
            )}

            <div className="vocab-card__action-group">
              <button
                type="button"
                className={`vocab-card__icon-btn ${isBookmarked ? 'vocab-card__icon-btn--fav' : ''}`}
                onClick={onToggleBookmark}
                title={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                {isBookmarked ? <HiBookmark size={15} /> : <HiOutlineBookmark size={15} />}
              </button>

              <button
                type="button"
                className={`vocab-card__audio-btn ${isSpeaking ? 'vocab-card__audio-btn--active' : ''}`}
                onClick={onSpeak}
                title="Dengar pengucapan"
              >
                <HiVolumeUp size={16} />
              </button>
            </div>
          </div>

          <span className="vocab-card__chinese chinese-text">{word.chinese}</span>
          <span className="vocab-card__hokkien">{word.hokkien}</span>
          <span className="vocab-card__tone-pill">{word.tone}</span>
          <span className="vocab-card__hint">Ketuk untuk arti & contoh</span>
        </div>

        {/* Back face */}
        <div className="vocab-card__back">
          <div className="vocab-card__back-top">
            <span className="vocab-card__indo">{word.indo}</span>
            <div className="vocab-card__action-group">
              <button
                type="button"
                className="vocab-card__icon-btn"
                onClick={onCopy}
                title="Salin kartu ini"
              >
                <HiClipboardCopy size={15} />
              </button>

              <button
                type="button"
                className={`vocab-card__audio-btn ${isSpeaking ? 'vocab-card__audio-btn--active' : ''}`}
                onClick={onSpeak}
                title="Dengar pengucapan"
              >
                <HiVolumeUp size={15} />
              </button>
            </div>
          </div>

          <div className="vocab-card__back-hanji">
            <span className="chinese-text">{word.chinese}</span>
            <span className="vocab-card__back-poj">{word.hokkien}</span>
          </div>

          <p className="vocab-card__note">
            <HiLightBulb className="vocab-card__note-icon" /> {word.note}
          </p>

          <div className="vocab-card__example">
            <span className="vocab-card__example-label">Contoh:</span>
            <p className="vocab-card__example-text">"{word.example}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
