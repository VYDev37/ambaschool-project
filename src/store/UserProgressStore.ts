import { create } from 'zustand'
import { subscribeWithSelector, persist } from 'zustand/middleware'

export interface UserProgressState {
  savedPojList: string[]
  completedLessonIds: number[]
  quizzesCompleted: number
  streak: number
  totalDays: number
  lastVisit: string | null
  weeklyProgress: number[]
}

export interface UserProgressActions {
  toggleSaveWord: (poj: string) => boolean
  isWordSaved: (poj: string) => boolean
  markLessonCompleted: (lessonId: number) => void
  isLessonCompleted: (lessonId: number) => boolean
  recordQuizCompleted: () => void
  recordDailyVisit: () => void
}

export type UserProgressStore = UserProgressState & UserProgressActions

export const useUserProgressStore = create<UserProgressStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        savedPojList: ['Kún-chúi', 'Lim kún-chúi', 'Thâu-ke', 'Pháinn-sè'],
        completedLessonIds: [1],
        quizzesCompleted: 0,
        streak: 1,
        totalDays: 1,
        lastVisit: null,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],

        toggleSaveWord: (poj: string) => {
          const current = get().savedPojList
          const isAlreadySaved = current.includes(poj)
          const updated = isAlreadySaved
            ? current.filter((item) => item !== poj)
            : [...current, poj]

          set({ savedPojList: updated })
          return !isAlreadySaved
        },

        isWordSaved: (poj: string) => {
          return get().savedPojList.includes(poj)
        },

        markLessonCompleted: (lessonId: number) => {
          const current = get().completedLessonIds
          if (!current.includes(lessonId)) {
            set({ completedLessonIds: [...current, lessonId] })
          }
        },

        isLessonCompleted: (lessonId: number) => {
          return get().completedLessonIds.includes(lessonId)
        },

        recordQuizCompleted: () => {
          set((state) => ({ quizzesCompleted: state.quizzesCompleted + 1 }))
        },

        recordDailyVisit: () => {
          const state = get()
          const today = new Date().toDateString()
          if (state.lastVisit === today) return

          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const isConsecutive = state.lastVisit === yesterday.toDateString()

          const nextStreak = isConsecutive ? state.streak + 1 : 1
          const dayIndex = new Date().getDay()
          const nextWeekly = [...state.weeklyProgress]
          // Activity score based on real user actions
          nextWeekly[dayIndex] = Math.min(
            100,
            Math.max(30, state.completedLessonIds.length * 15 + state.savedPojList.length * 5)
          )

          set({
            streak: nextStreak,
            totalDays: state.totalDays + 1,
            lastVisit: today,
            weeklyProgress: nextWeekly
          })
        }
      }),
      {
        name: 'hokkien_user_progress_v2'
      }
    )
  )
)

// Atomic Selectors
export const selectSavedPojList = (state: UserProgressStore) => state.savedPojList
export const selectCompletedLessonIds = (state: UserProgressStore) => state.completedLessonIds
export const selectQuizzesCompleted = (state: UserProgressStore) => state.quizzesCompleted
export const selectUserStreak = (state: UserProgressStore) => state.streak
export const selectTotalDays = (state: UserProgressStore) => state.totalDays
export const selectWeeklyProgress = (state: UserProgressStore) => state.weeklyProgress
