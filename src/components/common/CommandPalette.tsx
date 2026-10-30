import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiSearch,
  HiBookOpen,
  HiLightningBolt,
  HiAcademicCap,
  HiVolumeUp,
  HiX,
  HiArrowRight
} from 'react-icons/hi'
import { coursesModules } from '../../data/coursesData'
import { useVocabularyStore, selectVocabularyItems } from '../../store/VocabularyStore'
import { useDebounce } from '../../hooks/useDebounce'
import { playClick } from '../../utils/soundEffects'
import './CommandPalette.css'

interface CommandPaletteItem {
  type: 'page' | 'course' | 'word'
  title: string
  subtitle: string
  path: string
  icon: React.ReactNode
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({
  isOpen,
  onClose
}: CommandPaletteProps): React.ReactElement | null {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const vocabulary = useVocabularyStore(selectVocabularyItems)
  const debouncedQuery = useDebounce(query, 180)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Aggregate results: Modules + Top Vocab
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [
        {
          type: 'page',
          title: 'Arena Latihan & Game',
          subtitle: 'Kuis, Flashcards, 8 Nada & Match Game',
          path: '/practice',
          icon: <HiLightningBolt />
        },
        {
          type: 'page',
          title: 'Kamus Lengkap (13,000+ Entri)',
          subtitle: 'Pencarian lengkap Hanzi, POJ, Tâi-lô, dan Indonesia',
          path: '/dictionary',
          icon: <HiBookOpen />
        },
        {
          type: 'page',
          title: 'Kurikulum 26 Modul',
          subtitle: 'Jalur belajar terstruktur dari pemula sampai mahir',
          path: '/lessons',
          icon: <HiAcademicCap />
        },
        {
          type: 'course',
          title: 'Pesanan Kedai Kopi & Kopitiam Medan',
          subtitle: 'Lim kún-chúi, Ko-pi-o, Tê-o-peng',
          path: '/lessons?moduleId=1',
          icon: <HiBookOpen />
        },
        {
          type: 'course',
          title: '8 Nada Minnan & Perubahan Nada',
          subtitle: 'Panduan lengkap fonetik nada kuno',
          path: '/lessons?moduleId=5',
          icon: <HiVolumeUp />
        }
      ] as CommandPaletteItem[]
    }

    const q = debouncedQuery.trim().toLowerCase()
    const foundItems: CommandPaletteItem[] = []

    coursesModules.forEach((mod) => {
      if (
        mod.title.toLowerCase().includes(q) ||
        mod.subtitle?.toLowerCase().includes(q) ||
        mod.category?.toLowerCase().includes(q)
      ) {
        foundItems.push({
          type: 'course',
          title: mod.title,
          subtitle: `${mod.category} • ${mod.level} • ${mod.duration}`,
          path: `/lessons?moduleId=${mod.id}`,
          icon: <HiAcademicCap />
        })
      }
    })

    const matchingVocab = vocabulary
      .filter(
        (item) =>
          item.hanji.includes(q) ||
          item.poj.toLowerCase().includes(q) ||
          item.indo.toLowerCase().includes(q) ||
          (item.tailo && item.tailo.toLowerCase().includes(q))
      )
      .slice(0, 8)

    matchingVocab.forEach((item) => {
      foundItems.push({
        type: 'word',
        title: `${item.hanji} (${item.poj})`,
        subtitle: `${item.indo} ${item.dialect ? `• ${item.dialect}` : ''}`,
        path: `/dictionary?q=${encodeURIComponent(item.hanji)}`,
        icon: <HiBookOpen />
      })
    })

    return foundItems.slice(0, 10)
  }, [debouncedQuery, vocabulary])

  const handleSelect = (item: CommandPaletteItem) => {
    playClick()
    onClose()
    navigate(item.path)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="command-palette-backdrop" onClick={onClose}>
        <motion.div
          className="command-palette-modal glass"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="command-palette__search">
            <HiSearch className="command-palette__search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="command-palette__input"
              placeholder="Cari modul, kata (Hanzi/POJ/Indo), atau fitur... (Esc untuk batal)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                type="button"
                className="command-palette__clear"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
            <button
              type="button"
              className="command-palette__close"
              onClick={onClose}
            >
              <HiX size={18} />
            </button>
          </div>

          {/* Results list */}
          <div className="command-palette__results">
            {results.length > 0 ? (
              results.map((item, idx) => (
                <div
                  key={`${item.type}-${idx}`}
                  className={`command-palette__item ${
                    idx === selectedIndex ? 'command-palette__item--selected' : ''
                  }`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="command-palette__item-icon">
                    {item.icon}
                  </div>
                  <div className="command-palette__item-text">
                    <span className="command-palette__item-title">{item.title}</span>
                    <span className="command-palette__item-subtitle">{item.subtitle}</span>
                  </div>
                  <HiArrowRight className="command-palette__item-arrow" />
                </div>
              ))
            ) : (
              <div className="command-palette__empty">
                <p>Tidak ditemukan hasil untuk "<strong>{query}</strong>"</p>
                <small>Coba gunakan kata kunci seperti <em>"kún-chúi"</em>, <em>"thâu-ke"</em>, <em>"makan"</em>, atau <em>"nada"</em>.</small>
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="command-palette__footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigasi</span>
            <span><kbd>↵</kbd> Buka</span>
            <span><kbd>ESC</kbd> Tutup</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
