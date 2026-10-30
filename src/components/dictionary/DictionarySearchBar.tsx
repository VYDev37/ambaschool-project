import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  HiSearch,
  HiX,
  HiTranslate,
  HiBookOpen,
  HiGlobe,
  HiMicrophone,
  HiCollection
} from 'react-icons/hi'

export type SearchModeKey = 'semua' | 'hokkien' | 'hanzi' | 'indo'

export interface SearchModeItem {
  key: SearchModeKey
  label: string
  icon: React.ReactNode
  placeholder: string
}

export const searchModes: SearchModeItem[] = [
  {
    key: 'hokkien',
    label: 'Cari dengan Hokkien (POJ/Tâi-lô)',
    icon: <HiTranslate />,
    placeholder: 'Ketik romanisasi: lim, kún-chúi, chia̍h...'
  },
  {
    key: 'hanzi',
    label: 'Cari dengan Aksara Han (漢字)',
    icon: <HiBookOpen />,
    placeholder: 'Ketik aksara Tionghoa: 食飽, 滾水, 頭家...'
  },
  {
    key: 'indo',
    label: 'Cari dengan Bahasa Indonesia',
    icon: <HiGlobe />,
    placeholder: 'Ketik kata Indonesia: minum, makan, bos, cantik...'
  },
  {
    key: 'semua',
    label: 'Cari Semua Kolom',
    icon: <HiSearch />,
    placeholder: 'Cari apa saja: hokkien, hanzi, atau Indonesia...'
  }
]

interface DictionarySearchBarProps {
  query: string
  onQueryChange: (q: string) => void
  searchMode: SearchModeKey
  onSearchModeChange: (mode: SearchModeKey) => void
  selectedCategory: string | null
  onResetCategory: () => void
  showToneGuide: boolean
  onToggleToneGuide: () => void
  showCategoryIndex: boolean
  onToggleCategoryIndex: () => void
}

export const DictionarySearchBar: React.FC<DictionarySearchBarProps> = ({
  query,
  onQueryChange,
  searchMode,
  onSearchModeChange,
  selectedCategory,
  onResetCategory,
  showToneGuide,
  onToggleToneGuide,
  showCategoryIndex,
  onToggleCategoryIndex
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const activeMode = searchModes.find((m) => m.key === searchMode) || searchModes[3]

  return (
    <motion.div
      className="dict-search-panel glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="dict-search-panel__title">
        <HiSearch /> 搜尋辭典 Cari di Kamus
      </h2>

      {/* Search Mode Selector */}
      <div className="dict-search-modes">
        <span className="dict-search-modes__label">Tipe Pencarian:</span>
        <div className="dict-search-modes__btns">
          {searchModes.map((mode) => (
            <button
              key={mode.key}
              type="button"
              className={`dict-mode-btn ${
                searchMode === mode.key ? 'dict-mode-btn--active' : ''
              }`}
              onClick={() => {
                onSearchModeChange(mode.key)
                inputRef.current?.focus()
              }}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search input */}
      <div className="dict-search-bar">
        <div className="dict-search-bar__icon-wrap">{activeMode.icon}</div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={activeMode.placeholder}
          className="dict-search-bar__input"
        />
        {query && (
          <button
            type="button"
            className="dict-search-bar__clear"
            onClick={() => {
              onQueryChange('')
              inputRef.current?.focus()
            }}
          >
            <HiX size={16} />
          </button>
        )}
        <button type="button" className="dict-search-bar__submit">
          <HiSearch size={18} />
          <span>Cari</span>
        </button>
      </div>

      {/* Quick filter buttons */}
      <div className="dict-quick-filters">
        <button
          type="button"
          className={`dict-quick-filter ${
            !selectedCategory ? 'dict-quick-filter--active' : ''
          }`}
          onClick={onResetCategory}
        >
          Semua Kategori
        </button>
        <button
          type="button"
          className="dict-quick-filter dict-quick-filter--tone"
          onClick={onToggleToneGuide}
        >
          <HiMicrophone /> {showToneGuide ? 'Tutup' : 'Panduan'} 8 Nada
        </button>
        <button
          type="button"
          className="dict-quick-filter dict-quick-filter--cat"
          onClick={onToggleCategoryIndex}
        >
          <HiCollection /> {showCategoryIndex ? 'Tutup' : 'Indeks'} Kategori
        </button>
      </div>
    </motion.div>
  )
}
