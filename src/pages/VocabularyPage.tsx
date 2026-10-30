import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  useVocabularyStore,
  selectVocabularyItems,
  selectVocabularyLoading
} from '../store/VocabularyStore'
import {
  useUserProgressStore,
  selectSavedPojList
} from '../store/UserProgressStore'
import { useDebounce } from '../hooks/useDebounce'
import { VocabularyHero } from '../components/vocabulary/VocabularyHero'
import { VocabularySpotlight } from '../components/vocabulary/VocabularySpotlight'
import { VocabularyFilters } from '../components/vocabulary/VocabularyFilters'
import { VocabularyCard } from '../components/vocabulary/VocabularyCard'
import { VocabularyFlashcard } from '../components/vocabulary/VocabularyFlashcard'
import { VocabularyPagination } from '../components/vocabulary/VocabularyPagination'
import './VocabularyPage.css'

const PAGE_SIZE = 24

export default function VocabularyPage(): React.ReactElement {
  const items = useVocabularyStore(selectVocabularyItems)
  const isLoading = useVocabularyStore(selectVocabularyLoading)
  const fetchVocabulary = useVocabularyStore((state) => state.fetchVocabulary)

  const savedPojList = useUserProgressStore(selectSavedPojList)

  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid')
  const [selectedCat, setSelectedCat] = useState('Semua')
  const [selectedDialect, setSelectedDialect] = useState('Semua Dialek')
  const [selectedTone, setSelectedTone] = useState('Semua Nada')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const [currentPage, setCurrentPage] = useState(1)
  const [showOnlySaved, setShowOnlySaved] = useState(false)

  // Flashcard state
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    fetchVocabulary()
  }, [fetchVocabulary])

  // Filtered dataset
  const filteredList = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return items.filter((item) => {
      if (showOnlySaved && !savedPojList.includes(item.poj)) return false

      if (selectedDialect !== 'Semua Dialek') {
        if (selectedDialect === 'Hokkien Medan & Nusantara') {
          if (
            !item.dialect.includes('Medan') &&
            !item.dialect.includes('Nusantara') &&
            item.dialect !== 'Keduanya'
          ) {
            return false
          }
        } else if (selectedDialect === 'Taiwan Standar') {
          if (!item.dialect.includes('Taiwan') && item.dialect !== 'Keduanya') {
            return false
          }
        }
      }

      if (selectedCat === 'Hokkien Medan Populer') {
        if (
          !item.tags?.includes('Medan Populer') &&
          !item.dialect.includes('Medan')
        ) {
          return false
        }
      } else if (selectedCat !== 'Semua' && item.category !== selectedCat) {
        return false
      }

      if (selectedTone !== 'Semua Nada') {
        const toneNum = selectedTone.replace('Nada ', '')
        if (!item.tone || !item.tone.includes(toneNum)) return false
      }

      if (q) {
        const matchHanji = item.hanji.toLowerCase().includes(q)
        const matchPoj = item.poj.toLowerCase().includes(q)
        const matchTailo = item.tailo?.toLowerCase().includes(q)
        const matchIndo = item.indo.toLowerCase().includes(q)
        const matchUsage = item.usage ? item.usage.toLowerCase().includes(q) : false
        return matchHanji || matchPoj || matchTailo || matchIndo || matchUsage
      }

      return true
    })
  }, [
    items,
    debouncedQuery,
    selectedCat,
    selectedDialect,
    selectedTone,
    showOnlySaved,
    savedPojList
  ])

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE) || 1
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredList.slice(start, start + PAGE_SIZE)
  }, [filteredList, currentPage])

  const speak = useCallback((hanji: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(hanji)
      utterance.lang = 'zh-TW'
      utterance.rate = 0.82
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  const currentCard = filteredList[flashcardIdx % (filteredList.length || 1)]

  return (
    <div className="vocab-page">
      <VocabularyHero totalCount={items.length || 13200} />

      <div className="container vocab-main">
        <VocabularySpotlight
          isActive={selectedCat === 'Hokkien Medan Populer'}
          onFilterMedan={() => {
            setSelectedCat('Hokkien Medan Populer')
            setSelectedDialect('Hokkien Medan & Nusantara')
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
        />

        <VocabularyFilters
          query={query}
          onQueryChange={(q) => {
            setQuery(q)
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
          selectedCat={selectedCat}
          onSelectCat={(cat) => {
            setSelectedCat(cat)
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
          selectedDialect={selectedDialect}
          onSelectDialect={(d) => {
            setSelectedDialect(d)
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
          selectedTone={selectedTone}
          onSelectTone={(t) => {
            setSelectedTone(t)
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
          showOnlySaved={showOnlySaved}
          onToggleShowOnlySaved={() => {
            setShowOnlySaved(!showOnlySaved)
            setCurrentPage(1)
            setFlashcardIdx(0)
          }}
          savedCount={savedPojList.length}
          viewMode={viewMode}
          onViewModeChange={(m) => setViewMode(m)}
          filteredCount={filteredList.length}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* View mode 1: Flashcard */}
        {viewMode === 'flashcard' && currentCard && (
          <VocabularyFlashcard
            card={currentCard}
            index={flashcardIdx % filteredList.length}
            total={filteredList.length}
            isFlipped={isFlipped}
            onToggleFlip={() => setIsFlipped(!isFlipped)}
            onNext={() => {
              setIsFlipped(false)
              setFlashcardIdx((prev) => (prev + 1) % filteredList.length)
            }}
            onPrev={() => {
              setIsFlipped(false)
              setFlashcardIdx(
                (prev) => (prev - 1 + filteredList.length) % filteredList.length
              )
            }}
            onRandom={() => {
              setIsFlipped(false)
              setFlashcardIdx(Math.floor(Math.random() * filteredList.length))
            }}
            onSpeak={speak}
          />
        )}

        {/* View mode 2: Grid */}
        {viewMode === 'grid' && (
          <div className="vocab-cards-grid">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item, index) => (
                <VocabularyCard
                  key={item.id || `${item.hanji}-${index}`}
                  item={item}
                  index={index}
                  onSpeak={speak}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {filteredList.length === 0 && !isLoading && (
          <div className="vocab-empty glass">
            <span className="vocab-empty__icon">🔍</span>
            <h3>Tidak ada kosakata yang cocok</h3>
            <p>Cobalah mengganti kata pencarian atau ubah filter dialek dan kategori.</p>
            <button
              type="button"
              className="vocab-empty__btn"
              onClick={() => {
                setQuery('')
                setSelectedCat('Semua')
                setSelectedDialect('Semua Dialek')
                setSelectedTone('Semua Nada')
                setShowOnlySaved(false)
                setCurrentPage(1)
                setFlashcardIdx(0)
              }}
            >
              Tampilkan Semua Kosakata
            </button>
          </div>
        )}

        {/* Pagination */}
        {viewMode === 'grid' && (
          <VocabularyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page)
              window.scrollTo({ top: 380, behavior: 'smooth' })
            }}
          />
        )}
      </div>
    </div>
  )
}
