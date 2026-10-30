import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { CourseModule, CourseListSchema } from '../schemas/CourseSchema'
import { apiClient } from '../lib/ApiClient'

export interface CourseState {
  courses: CourseModule[]
  activeModule: CourseModule | null
  isLoading: boolean
  error: string | null
  selectedCategory: string
}

export interface CourseActions {
  fetchCourses: () => Promise<void>
  setActiveModule: (module: CourseModule | null) => void
  setSelectedCategory: (category: string) => void
}

export type CourseStore = CourseState & CourseActions

export const useCourseStore = create<CourseStore>()(
  subscribeWithSelector((set, get) => ({
    courses: [],
    activeModule: null,
    isLoading: false,
    error: null,
    selectedCategory: 'Semua',

    fetchCourses: async () => {
      if (get().courses.length > 0) return
      set({ isLoading: true, error: null })

      try {
        const response = await apiClient.get('/courses.json')
        const parsed = CourseListSchema.safeParse(response.data)
        if (!parsed.success) {
          console.error('[CourseStore] Schema mismatch:', parsed.error)
          set({ courses: response.data as CourseModule[], isLoading: false })
          return
        }
        set({ courses: parsed.data, isLoading: false })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Gagal memuat kursus'
        set({ error: message, isLoading: false })
      }
    },

    setActiveModule: (activeModule) => set({ activeModule }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory })
  }))
)

// Atomic Selectors
export const selectCourses = (state: CourseStore) => state.courses
export const selectActiveModule = (state: CourseStore) => state.activeModule
export const selectCourseLoading = (state: CourseStore) => state.isLoading
export const selectCourseCategory = (state: CourseStore) => state.selectedCategory
