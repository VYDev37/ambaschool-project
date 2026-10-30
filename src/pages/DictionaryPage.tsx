import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HiX, HiAcademicCap, HiRefresh } from 'react-icons/hi'
import {
  useVocabularyStore,
  selectVocabularyItems,
  selectVocabularyLoading,
  selectVocabularyError
} from '../store/VocabularyStore'
import { useDebounce } from '../hooks/useDebounce'
import { VocabularyItem } from '../schemas/VocabularySchema'
import { DictionaryHero } from '../components/dictionary/DictionaryHero'
import { DictionaryWordOfTheDay } from '../components/dictionary/DictionaryWordOfTheDay'
import {
  DictionarySearchBar,
  SearchModeKey
} from '../components/dictionary/DictionarySearchBar'
import { ToneGuideSection } from '../components/dictionary/ToneGuideSection'
import { CategoryIndexSection } from '../components/dictionary/CategoryIndexSection'
import { DictionaryEntryCard } from '../components/dictionary/DictionaryEntryCard'
import { DictionaryPagination } from '../components/dictionary/DictionaryPagination'
import './DictionaryPage.css'

const PAGE_SIZE = 20

function getWordOfDay(list: VocabularyItem[]): VocabularyItem | null {
  if (!list || list.length === 0) return null
  const seed = new Date().toDateString()
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const idx = Math.abs(hash) % list.length
  return list[idx]
}

export default function DictionaryPage(): React.ReactElement {
  const [searchParams] = useSearchParams()
  const items = useVocabularyStore(selectVocabularyItems)
  const isLoading = useVocabularyStore(selectVocabularyLoading)
  const error = useVocabularyStore(selectVocabularyError)
  const fetchVocabulary = useVocabularyStore((state) => state.fetchVocabulary)

  const [searchMode, setSearchMode] = useState<SearchModeKey>('semua')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showToneGuide, setShowToneGuide] = useState(false)
  const [showCategoryIndex, setShowCategoryIndex] = useState(false)

  useEffect(() => {
    fetchVocabulary()
  }, [fetchVocabulary])

  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam) {
      setQuery(qParam)
      setSearchMode('semua')
      window.scrollTo({ top: 380, behavior: 'smooth' })
    }
  }, [searchParams])

  const wordOfDay = useMemo(() => getWordOfDay(items), [items])

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {}
    items.forEach((item) => {
      const cat = item.category
      map[cat] = (map[cat] || 0) + 1
    })
    return map
  }, [items])

  const filteredList = useMemo(() => {
    let results = items

    if (selectedCategory) {
      results = results.filter((item) => item.category === selectedCategory)
    }

    const q = debouncedQuery.trim().toLowerCase()
    if (q) {
      results = results.filter((item) => {
        switch (searchMode) {
          case 'hokkien':
            return (
              item.poj.toLowerCase().includes(q) ||
              (item.tailo && item.tailo.toLowerCase().includes(q))
            )
          case 'hanzi':
            return item.hanji.includes(q)
          case 'indo':
            return (
              item.indo.toLowerCase().includes(q) ||
              item.usage.toLowerCase().includes(q)
            )
          case 'semua':
          default:
            return (
              item.hanji.includes(q) ||
              item.poj.toLowerCase().includes(q) ||
              (item.tailo && item.tailo.toLowerCase().includes(q)) ||
              item.indo.toLowerCase().includes(q) ||
              item.usage.toLowerCase().includes(q)
            )
        }
      })
    }

    return results
  }, [items, debouncedQuery, searchMode, selectedCategory])

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE) || 1
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredList.slice(start, start + PAGE_SIZE)
  }, [filteredList, currentPage])

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-TW'
      u.rate = 0.82
      window.speechSynthesis.speak(u)
    }
  }, [])

  return (
    <div className="dict-page">
      <DictionaryHero totalCount={items.length || 13200} />

      <div className="container dict-main">
        <DictionaryWordOfTheDay word={wordOfDay} onSpeak={speak} />

        <DictionarySearchBar
          query={query}
          onQueryChange={(q) => {
            setQuery(q)
            setCurrentPage(1)
          }}
          searchMode={searchMode}
          onSearchModeChange={(mode) => {
            setSearchMode(mode)
            setCurrentPage(1)
          }}
          selectedCategory={selectedCategory}
          onResetCategory={() => {
            setSelectedCategory(null)
            setCurrentPage(1)
          }}
          showToneGuide={showToneGuide}
          onToggleToneGuide={() => setShowToneGuide(!showToneGuide)}
          showCategoryIndex={showCategoryIndex}
          onToggleCategoryIndex={() => setShowCategoryIndex(!showCategoryIndex)}
        />

        <ToneGuideSection
          isOpen={showToneGuide}
          onClose={() => setShowToneGuide(false)}
        />

        <CategoryIndexSection
          isOpen={showCategoryIndex}
          onClose={() => setShowCategoryIndex(false)}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          onSelectCategory={(cat) => {
            setSelectedCategory(selectedCategory === cat ? null : cat)
            setCurrentPage(1)
          }}
        />

        {/* Results Bar */}
        <div className="dict-results-bar">
          <div className="dict-results-bar__left">
            <span>
              Ditemukan <strong>{filteredList.length.toLocaleString()}</strong> entri kosakata
            </span>
            {selectedCategory && (
              <span className="dict-results-bar__tag">
                {selectedCategory}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null)
                    setCurrentPage(1)
                  }}
                >
                  <HiX size={12} />
                </button>
              </span>
            )}
            {query && (
              <span className="dict-results-bar__tag">
                "{query}"
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setCurrentPage(1)
                  }}
                >
                  <HiX size={12} />
                </button>
              </span>
            )}
          </div>
          <span className="dict-results-bar__page">
            Halaman {currentPage}/{totalPages}
          </span>
        </div>

        {/* Cards */}
        <div className="dict-results">
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item, index) => (
              <DictionaryEntryCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={expandedId === item.id}
                onToggleExpand={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                onSpeak={speak}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredList.length === 0 && !isLoading && (
          <div className="dict-empty glass">
            <span className="dict-empty__icon">🔍</span>
            <h3>Tidak ditemukan hasil untuk pencarian Anda</h3>
            <p>Coba ganti kata kunci, mode pencarian, atau hapus filter kategori.</p>
            <button
              type="button"
              className="dict-empty__btn"
              onClick={() => {
                setQuery('')
                setSelectedCategory(null)
                setSearchMode('semua')
                setCurrentPage(1)
              }}
            >
              <HiRefresh /> Reset Semua Filter
            </button>
          </div>
        )}

        <DictionaryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page)
            window.scrollTo({ top: 420, behavior: 'smooth' })
          }}
        />

        {/* Footer Reference */}
        <div className="dict-footer-info glass">
          <HiAcademicCap size={20} />
          <div>
            <strong>Referensi Kamus:</strong> Data kosakata disusun berdasarkan{' '}
            <em>教育部臺灣台語常用詞辭典</em> (Kamus Resmi Bahasa Taiwan, Kementerian Pendidikan Taiwan)
            dan ditambah koleksi otentik Hokkien Medan & Nusantara.
          </div>
        </div>
      </div>
    </div>
  )
}
