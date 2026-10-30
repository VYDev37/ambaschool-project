import React from 'react'
import { motion } from 'framer-motion'
import { HiStar, HiVolumeUp, HiLightBulb } from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'

interface DictionaryWordOfTheDayProps {
  word: VocabularyItem | null
  onSpeak: (text: string) => void
}

export const DictionaryWordOfTheDay: React.FC<DictionaryWordOfTheDayProps> = ({
  word,
  onSpeak
}) => {
  if (!word) return null

  return (
    <motion.div
      className="dict-wotd glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="dict-wotd__badge">
        <HiStar /> Kata Hari Ini
      </div>
      <div className="dict-wotd__content">
        <div className="dict-wotd__left">
          <span className="dict-wotd__hanji chinese-text">{word.hanji}</span>
          <button
            type="button"
            className="dict-wotd__audio"
            onClick={() => onSpeak(word.hanji)}
          >
            <HiVolumeUp size={20} /> Dengar
          </button>
        </div>
        <div className="dict-wotd__right">
          <div className="dict-wotd__row">
            <span className="dict-wotd__label">POJ:</span>
            <span className="dict-wotd__poj">{word.poj}</span>
          </div>
          {word.tailo && word.tailo !== word.poj && (
            <div className="dict-wotd__row">
              <span className="dict-wotd__label">Tâi-lô:</span>
              <span className="dict-wotd__tailo">{word.tailo}</span>
            </div>
          )}
          <div className="dict-wotd__row">
            <span className="dict-wotd__label">Arti:</span>
            <span className="dict-wotd__indo">{word.indo}</span>
          </div>
          {word.tone && (
            <div className="dict-wotd__row">
              <span className="dict-wotd__label">Nada:</span>
              <span className="dict-wotd__tone">{word.tone}</span>
            </div>
          )}
          {word.example && (
            <div className="dict-wotd__example">
              <HiLightBulb className="dict-wotd__example-icon" />
              <span>{word.example}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
