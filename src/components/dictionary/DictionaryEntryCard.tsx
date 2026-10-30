import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiVolumeUp,
  HiBookmark,
  HiClipboardCopy,
  HiCheck,
  HiChevronDown,
  HiChevronUp,
  HiBookOpen,
  HiInformationCircle
} from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'
import { useUserProgressStore } from '../../store/UserProgressStore'
import { playClick, playSuccess } from '../../utils/soundEffects'
import { useToast } from '../../store/ToastStore'

interface DictionaryEntryCardProps {
  item: VocabularyItem
  index: number
  isExpanded: boolean
  onToggleExpand: () => void
  onSpeak: (text: string) => void
}

export const DictionaryEntryCard: React.FC<DictionaryEntryCardProps> = ({
  item,
  index,
  isExpanded,
  onToggleExpand,
  onSpeak
}) => {
  const [copied, setCopied] = React.useState(false)
  const { showToast } = useToast()

  const isSaved = useUserProgressStore((state) => state.isWordSaved(item.poj))
  const toggleSaveWord = useUserProgressStore((state) => state.toggleSaveWord)

  const isMedan =
    item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    const willBeSaved = toggleSaveWord(item.poj)
    if (willBeSaved) {
      playSuccess()
      showToast(`⭐ "${item.hanji}" disimpan ke progres belajar!`, 'badge', 2000)
    } else {
      playClick()
      showToast(`Dihapus dari kata tersimpan`, 'info', 1500)
    }
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    playClick()
    const text = `${item.hanji} (${item.poj}): ${item.indo}`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      showToast(`📋 Disalin: ${item.hanji} (${item.poj})`, 'success', 2000)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      className={`dict-entry ${isExpanded ? 'dict-entry--expanded' : ''} ${
        isMedan ? 'dict-entry--medan' : ''
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: (index % 10) * 0.02 }}
      layout
    >
      {/* Main row */}
      <div className="dict-entry__main" onClick={onToggleExpand}>
        <div className="dict-entry__hanji-wrap">
          <span className="dict-entry__hanji chinese-text">{item.hanji}</span>
          <button
            type="button"
            className="dict-entry__audio"
            onClick={(e) => {
              e.stopPropagation()
              onSpeak(item.hanji)
            }}
            title="Dengarkan pengucapan"
          >
            <HiVolumeUp size={16} />
          </button>
        </div>

        <div className="dict-entry__meta">
          <div className="dict-entry__romanizations">
            <span className="dict-entry__poj">
              <span className="dict-entry__rom-label">POJ</span>
              {item.poj}
            </span>
            {item.tailo && item.tailo !== item.poj && (
              <span className="dict-entry__tailo">
                <span className="dict-entry__rom-label">Tâi-lô</span>
                {item.tailo}
              </span>
            )}
          </div>
          <span className="dict-entry__indo">{item.indo}</span>
        </div>

        <div className="dict-entry__actions">
          {isMedan && <span className="dict-entry__medan-badge">🇮🇩 Medan</span>}
          {item.tone && <span className="dict-entry__tone-badge">{item.tone}</span>}
          <button
            type="button"
            className={`dict-entry__save ${isSaved ? 'dict-entry__save--active' : ''}`}
            onClick={handleToggleSave}
            title={isSaved ? 'Hapus dari simpanan' : 'Simpan kata ini'}
          >
            <HiBookmark size={16} />
          </button>

          <button
            type="button"
            className={`dict-entry__copy ${copied ? 'dict-entry__copy--done' : ''}`}
            onClick={handleCopy}
            title="Salin ke clipboard"
          >
            {copied ? <HiCheck size={14} /> : <HiClipboardCopy size={14} />}
          </button>
          <span className="dict-entry__expand-arrow">
            {isExpanded ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
          </span>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="dict-entry__detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="dict-entry__detail-grid">
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Aksara Han (漢字)</span>
                <span className="dict-detail-card__value chinese-text dict-detail-card__value--big">
                  {item.hanji}
                </span>
              </div>
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Pe̍h-ōe-jī (POJ)</span>
                <span className="dict-detail-card__value dict-detail-card__value--poj">
                  {item.poj}
                </span>
              </div>
              {item.tailo && (
                <div className="dict-detail-card">
                  <span className="dict-detail-card__label">Tâi-lô (臺羅)</span>
                  <span className="dict-detail-card__value dict-detail-card__value--tailo">
                    {item.tailo}
                  </span>
                </div>
              )}
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Bahasa Indonesia</span>
                <span className="dict-detail-card__value">{item.indo}</span>
              </div>
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Nada</span>
                <span className="dict-detail-card__value">{item.tone || '-'}</span>
              </div>
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Kategori</span>
                <span className="dict-detail-card__value">{item.category}</span>
              </div>
              <div className="dict-detail-card">
                <span className="dict-detail-card__label">Ragam Dialek</span>
                <span className="dict-detail-card__value">
                  {item.dialect}
                  {isMedan && ' 🇮🇩'}
                </span>
              </div>
            </div>

            {item.example && (
              <div className="dict-entry__example-block">
                <div className="dict-entry__example-label">
                  <HiBookOpen size={14} /> Contoh Kalimat (用例)
                </div>
                <p className="dict-entry__example-text">{item.example}</p>
                <button
                  type="button"
                  className="dict-entry__example-listen"
                  onClick={() => onSpeak(item.example.split('(')[0].trim())}
                >
                  <HiVolumeUp size={14} /> Dengarkan contoh
                </button>
              </div>
            )}

            {item.usage && (
              <div className="dict-entry__usage-block">
                <div className="dict-entry__usage-label">
                  <HiInformationCircle size={14} /> Catatan Penggunaan & Budaya
                </div>
                <p className="dict-entry__usage-text">{item.usage}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
