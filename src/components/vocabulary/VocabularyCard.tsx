import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiVolumeUp,
  HiBookmark,
  HiClipboardCopy,
  HiCheck,
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
      showToast('Dihapus dari kata tersimpan', 'info', 1500)
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
      key={item.id || `${item.hanji}-${index}`}
      className={`vcard glass ${isMedan ? 'vcard--medan' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: (index % 12) * 0.02 }}
    >
      <div className="vcard__top">
        <div className="vcard__badges">
          <span className="vcard__category">{item.category}</span>
          {isMedan && (
            <span
              className="vcard__badge-medan"
              title="Khas Hokkien Medan & Sekitarnya"
            >
              🇮🇩 Medan
            </span>
          )}
        </div>
        <div className="vcard__top-actions">
          <button
            type="button"
            className="vcard__copy-btn"
            onClick={handleCopy}
            title="Salin kata"
          >
            {copied ? (
              <HiCheck size={16} color="#4ade80" />
            ) : (
              <HiClipboardCopy size={16} />
            )}
          </button>
          <button
            type="button"
            className={`vcard__bookmark ${
              isSaved ? 'vcard__bookmark--active' : ''
            }`}
            onClick={handleToggleSave}
            title={isSaved ? 'Hapus bookmark' : 'Simpan kata'}
          >
            <HiBookmark />
          </button>
        </div>
      </div>

      <div className="vcard__head">
        <span className="vcard__hanji chinese-text">{item.hanji}</span>
        <div className="vcard__title-meta">
          <span className="vcard__poj">{item.poj}</span>
          {item.tailo && item.tailo !== item.poj && (
            <span className="vcard__tailo">Tâi-lô: {item.tailo}</span>
          )}
          {item.tone && <span className="vcard__tone">{item.tone}</span>}
        </div>
        <button
          type="button"
          className="vcard__audio-btn"
          onClick={() => onSpeak(item.hanji)}
          title="Dengarkan pengucapan"
        >
          <HiVolumeUp size={18} />
        </button>
      </div>

      <div className="vcard__meaning">
        <span className="vcard__indo">{item.indo}</span>
      </div>

      {item.example && (
        <div className="vcard__example-box">
          <span className="vcard__example-label">Contoh Kalimat:</span>
          <p className="vcard__example-text">{item.example}</p>
        </div>
      )}

      {item.usage && (
        <div className="vcard__note">
          <HiInformationCircle className="vcard__note-icon" />
          <span>{item.usage}</span>
        </div>
      )}
    </motion.div>
  )
}
