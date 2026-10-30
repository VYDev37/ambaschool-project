import React from 'react'
import { HiSearch } from 'react-icons/hi'

export const categoryTabs = [
  'Semua',
  'Medan & Nusantara',
  'Pasar & Transaksi',
  'Ungkapan Gaul',
  'Kuliner & Restoran',
  'Keluarga & Adat',
  'Fonetik & Nada',
  'Kota & Perjalanan',
  'Darurat & Kesehatan'
]

interface LessonsFilterBarProps {
  selectedFilter: string
  onSelectFilter: (tab: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

export const LessonsFilterBar: React.FC<LessonsFilterBarProps> = ({
  selectedFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="lessons-controls">
      <div className="lessons-tabs">
        {categoryTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`lessons-tab ${
              selectedFilter === tab ? 'lessons-tab--active' : ''
            }`}
            onClick={() => onSelectFilter(tab)}
          >
            {tab === 'Medan & Nusantara' && '🇮🇩 '}
            {tab === 'Pasar & Transaksi' && '🏪 '}
            {tab === 'Kuliner & Restoran' && '🍜 '}
            {tab === 'Fonetik & Nada' && '🎶 '}
            {tab}
          </button>
        ))}
      </div>

      <div className="lessons-search">
        <HiSearch className="lessons-search__icon" />
        <input
          type="text"
          placeholder="Cari modul (kuncui, pasar, gaul, nada, dokter, imlek)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="lessons-search__input"
        />
        {searchQuery && (
          <button
            type="button"
            className="lessons-search__clear"
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
