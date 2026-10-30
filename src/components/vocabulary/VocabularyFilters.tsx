import React from 'react'
import {
  HiSearch,
  HiFilter,
  HiX,
  HiBookmark,
  HiViewGrid,
  HiCollection
} from 'react-icons/hi'

export const categories = [
  'Semua',
  'Hokkien Medan Populer',
  'Kuliner & Minuman',
  'Pasar & Bisnis',
  'Sapaan & Adab',
  'Ungkapan Gaul',
  'Aktivitas & Harian',
  'Alam & Cuaca',
  'Tubuh & Kesehatan',
  'Keluarga & Silsilah',
  'Kota & Transportasi',
  'Rumah & Benda',
  'Teknologi & Modern',
  'Pepatah & Kiasan',
  'Budaya & Adat'
]

export const dialects = [
  'Semua Dialek',
  'Hokkien Medan & Nusantara',
  'Taiwan Standar'
]

export const toneFilters = [
  'Semua Nada',
  'Nada 1',
  'Nada 2',
  'Nada 3',
  'Nada 4',
  'Nada 5',
  'Nada 7',
  'Nada 8'
]

interface VocabularyFiltersProps {
  query: string
  onQueryChange: (q: string) => void
  selectedCat: string
  onSelectCat: (cat: string) => void
  selectedDialect: string
  onSelectDialect: (d: string) => void
  selectedTone: string
  onSelectTone: (t: string) => void
  showOnlySaved: boolean
  onToggleShowOnlySaved: () => void
  savedCount: number
  viewMode: 'grid' | 'flashcard'
  onViewModeChange: (mode: 'grid' | 'flashcard') => void
  filteredCount: number
}

export const VocabularyFilters: React.FC<VocabularyFiltersProps> = ({
  query,
  onQueryChange,
  selectedCat,
  onSelectCat,
  selectedDialect,
  onSelectDialect,
  selectedTone,
  onSelectTone,
  showOnlySaved,
  onToggleShowOnlySaved,
  savedCount,
  viewMode,
  onViewModeChange,
  filteredCount
}) => {
  return (
    <div className="vocab-controls glass">
      {/* Top row: search & view switcher */}
      <div className="vocab-controls__top">
        <div className="vocab-search-wrap">
          <HiSearch className="vocab-search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cari aksara (漢), POJ, Tâi-lô, arti, atau catatan..."
            className="vocab-search-input"
          />
          {query && (
            <button
              type="button"
              className="vocab-search-clear"
              onClick={() => onQueryChange('')}
            >
              <HiX size={16} />
            </button>
          )}
        </div>

        <div className="vocab-actions">
          <button
            type="button"
            className={`vocab-saved-btn ${
              showOnlySaved ? 'vocab-saved-btn--active' : ''
            }`}
            onClick={onToggleShowOnlySaved}
          >
            <HiBookmark />
            <span>Tersimpan ({savedCount})</span>
          </button>

          <div className="vocab-view-switcher">
            <button
              type="button"
              className={`vocab-view-btn ${
                viewMode === 'grid' ? 'vocab-view-btn--active' : ''
              }`}
              onClick={() => onViewModeChange('grid')}
              title="Tampilan Kartu"
            >
              <HiViewGrid size={18} />
            </button>
            <button
              type="button"
              className={`vocab-view-btn ${
                viewMode === 'flashcard' ? 'vocab-view-btn--active' : ''
              }`}
              onClick={() => onViewModeChange('flashcard')}
              title="Mode Flashcard"
            >
              <HiCollection size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="vocab-filter-row">
        <div className="vocab-filter-group">
          <HiFilter className="vocab-filter-icon" />
          <select
            value={selectedDialect}
            onChange={(e) => onSelectDialect(e.target.value)}
            className="vocab-select"
          >
            {dialects.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="vocab-filter-group">
          <select
            value={selectedTone}
            onChange={(e) => onSelectTone(e.target.value)}
            className="vocab-select"
          >
            {toneFilters.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <span className="vocab-results-count">
          Menampilkan <strong>{filteredCount.toLocaleString()}</strong> kata
        </span>
      </div>

      {/* Category Pills */}
      <div className="vocab-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`vocab-pill ${
              selectedCat === cat ? 'vocab-pill--active' : ''
            }`}
            onClick={() => onSelectCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
