import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiVolumeUp,
  HiBookmark,
  HiClipboardCopy,
  HiCheck,
  HiBookOpen,
  HiInformationCircle
} from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'
import { useUserProgressStore } from '../../store/UserProgressStore'
import { playClick, playSuccess } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

interface VocabularyCardProps {
  item: VocabularyItem
  index: number
  onSpeak: (hanji: string) => void
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  index,
  onSpeak
}) => {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const isSaved = useUserProgressStore((state) => state.isWordSaved(item.poj))
  const toggleSaveWord = useUserProgressStore((state) => state.toggleSaveWord)

  const isMedan =
    item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')

  const handleToggleSave = () => {
    const willBeSaved = toggleSaveWord(item.poj)
    if (willBeSaved) {
      playSuccess()
      showToast(`⭐ "${item.poj}" disimpan ke kosakata!`, 'badge', 2000)
    } else {
      playClick()
      showToast(`Dihapus dari kata tersimpan`, 'info', 1500)
    }
  }

  const handleCopy = () => {
    playClick()
    const text = `${item.hanji} (${item.poj}): ${item.indo}`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      showToast(`📋 Disalin: ${text}`, 'success', 1500)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <motion.div
      className={`vocab-card glass ${isMedan ? 'vocab-card--medan' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: (index % 12) * 0.02 }}
      layout
    >
      <div className="vocab-card__top">
        <div className="vocab-card__badges">
          <span className="vocab-badge vocab-badge--cat">{item.category}</span>
          {isMedan && (
            <span className="vocab-badge vocab-badge--medan">🇮🇩 Medan</span>
          )}
          {item.tone && (
            <span className="vocab-badge vocab-badge--tone">{item.tone}</span>
          )}
        </div>
        <div className="vocab-card__quick-actions">
          <button
            type="button"
            className={`vocab-card__action-btn ${
              isSaved ? 'vocab-card__action-btn--saved' : ''
            }`}
            onClick={handleToggleSave}
            title={isSaved ? 'Hapus bookmark' : 'Simpan kata'}
          >
            <HiBookmark size={15} />
          </button>
          <button
            type="button"
            className="vocab-card__action-btn"
            onClick={handleCopy}
            title="Salin kata"
          >
            {copied ? <HiCheck size={14} /> : <HiClipboardCopy size={14} />}
          </button>
        </div>
      </div>

      <div className="vocab-card__body">
        <div className="vocab-card__characters">
          <span className="vocab-card__hanji chinese-text">{item.hanji}</span>
          <button
            type="button"
            className="vocab-card__audio-btn"
            onClick={() => onSpeak(item.hanji)}
            title="Dengarkan pengucapan"
          >
            <HiVolumeUp size={16} />
          </button>
        </div>

        <div className="vocab-card__pronounce">
          <span className="vocab-card__poj">{item.poj}</span>
          {item.tailo && item.tailo !== item.poj && (
            <span className="vocab-card__tailo">Tâi-lô: {item.tailo}</span>
          )}
        </div>

        <p className="vocab-card__indo">{item.indo}</p>

        {item.example && (
          <div className="vocab-card__example-box">
            <HiBookOpen className="vocab-card__example-icon" />
            <p className="vocab-card__example-text">{item.example}</p>
          </div>
        )}

        {item.usage && (
          <div className="vocab-card__usage-box">
            <HiInformationCircle className="vocab-card__usage-icon" />
            <span className="vocab-card__usage-text">{item.usage}</span>
          </div>
        )}
      </div>

      <div className="vocab-card__footer">
        <span className="vocab-card__dialect-info">🗣️ {item.dialect}</span>
      </div>
    </motion.div>
  )
}
