import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { VocabularyItem, VocabularyListSchema } from '../schemas/VocabularySchema'
import { apiClient } from '../lib/ApiClient'

export interface VocabularyState {
  items: VocabularyItem[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  selectedDialect: string
}

export interface VocabularyActions {
  fetchVocabulary: () => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedDialect: (dialect: string) => void
}

export type VocabularyStore = VocabularyState & VocabularyActions

export const useVocabularyStore = create<VocabularyStore>()(
  subscribeWithSelector((set, get) => ({
    items: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'Semua',
    selectedDialect: 'Semua Dialek',

    fetchVocabulary: async () => {
      // Do not refetch if already loaded
      if (get().items.length > 0) return
      set({ isLoading: true, error: null })

      try {
        const response = await apiClient.get('/vocabulary.min.json')
        // Validate payload at runtime with Zod safeParse
        const parsed = VocabularyListSchema.safeParse(response.data)
        if (!parsed.success) {
          console.error('[VocabularyStore] Schema mismatch:', parsed.error)
          // Fallback to raw data if parsing has minor loose type discrepancy
          set({ items: response.data as VocabularyItem[], isLoading: false })
          return
        }
        set({ items: parsed.data, isLoading: false })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Gagal memuat data kosakata'
        set({ error: message, isLoading: false })
      }
    },

    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setSelectedDialect: (selectedDialect) => set({ selectedDialect })
  }))
)

// Atomic Selectors
export const selectVocabularyItems = (state: VocabularyStore) => state.items
export const selectVocabularyLoading = (state: VocabularyStore) => state.isLoading
export const selectVocabularyError = (state: VocabularyStore) => state.error
export const selectSearchQuery = (state: VocabularyStore) => state.searchQuery
export const selectSelectedCategory = (state: VocabularyStore) => state.selectedCategory
export const selectSelectedDialect = (state: VocabularyStore) => state.selectedDialect
