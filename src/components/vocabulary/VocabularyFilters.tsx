import React from 'react'
import {
  HiSearch,
  HiFilter,
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
  currentPage: number
  totalPages: number
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
  filteredCount,
  currentPage,
  totalPages
}) => {
  return (
    <>
      {/* 1. View Mode Switcher */}
      <div className="vocab-view-mode-bar">
        <div className="vocab-view-tabs">
          <button
            type="button"
            className={`vocab-view-tab ${
              viewMode === 'grid' ? 'vocab-view-tab--active' : ''
            }`}
            onClick={() => onViewModeChange('grid')}
          >
            <HiViewGrid size={18} />
            <span>Tampilan Daftar Kartu</span>
          </button>
          <button
            type="button"
            className={`vocab-view-tab ${
              viewMode === 'flashcard' ? 'vocab-view-tab--active' : ''
            }`}
            onClick={() => onViewModeChange('flashcard')}
          >
            <HiCollection size={18} />
            <span>Mode Flashcard Latihan</span>
          </button>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="vocab-toolbar">
        <div className="vocab-search-row">
          <div className="vocab-search-box">
            <HiSearch className="vocab-search-box__icon" />
            <input
              type="text"
              placeholder="Cari kata: kuncui, lim, makan, cia, thau-ke, kopi, pasar..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="vocab-search-box__input"
            />
            {query && (
              <button
                type="button"
                className="vocab-search-box__clear"
                onClick={() => onQueryChange('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="vocab-dialect-select">
            <HiFilter className="vocab-dialect-select__icon" />
            <select
              value={selectedDialect}
              onChange={(e) => onSelectDialect(e.target.value)}
              className="vocab-select-input"
            >
              {dialects.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="vocab-dialect-select">
            <select
              value={selectedTone}
              onChange={(e) => onSelectTone(e.target.value)}
              className="vocab-select-input"
            >
              {toneFilters.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`vocab-saved-toggle ${
              showOnlySaved ? 'vocab-saved-toggle--active' : ''
            }`}
            onClick={onToggleShowOnlySaved}
          >
            <HiBookmark />
            <span>Tersimpan ({savedCount})</span>
          </button>
        </div>

        <div className="vocab-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`vocab-pill ${
                selectedCat === cat ? 'vocab-pill--active' : ''
              } ${cat === 'Hokkien Medan Populer' ? 'vocab-pill--medan' : ''}`}
              onClick={() => onSelectCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Meta Info Bar */}
      <div className="vocab-meta-info">
        <div>
          <span>
            Ditemukan <strong>{filteredCount.toLocaleString()}</strong> entri kosakata
          </span>
          {selectedCat !== 'Semua' && (
            <span className="vocab-active-tag"> • {selectedCat}</span>
          )}
          {selectedDialect !== 'Semua Dialek' && (
            <span className="vocab-active-tag"> • {selectedDialect}</span>
          )}
          {selectedTone !== 'Semua Nada' && (
            <span className="vocab-active-tag"> • {selectedTone}</span>
          )}
        </div>
        {viewMode === 'grid' && (
          <span className="vocab-page-indicator">
            Halaman {currentPage} dari {totalPages}
          </span>
        )}
      </div>
    </>
  )
}
