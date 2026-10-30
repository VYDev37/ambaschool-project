import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type ToastType = 'info' | 'success' | 'error' | 'badge'

export interface ToastItem {
  id: number
  message: string
  type: ToastType
}

export interface ToastState {
  toasts: ToastItem[]
}

export interface ToastActions {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: number) => void
  clearToasts: () => void
}

export type ToastStore = ToastState & ToastActions

export const useToastStore = create<ToastStore>()(
  subscribeWithSelector((set, get) => ({
    toasts: [],

    showToast: (message: string, type: ToastType = 'info', duration = 3000) => {
      const id = Date.now() + Math.random()
      set((state) => ({
        toasts: [...state.toasts, { id, message, type }]
      }))

      if (duration > 0) {
        setTimeout(() => {
          get().removeToast(id)
        }, duration)
      }
    },

    removeToast: (id: number) => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    },

    clearToasts: () => set({ toasts: [] })
  }))
)

// Atomic Selectors
export const selectToasts = (state: ToastStore) => state.toasts
export const selectShowToast = (state: ToastStore) => state.showToast
export const selectRemoveToast = (state: ToastStore) => state.removeToast
export const selectClearToasts = (state: ToastStore) => state.clearToasts

/**
 * Convenient hook wrapper providing consistent API
 */
export function useToast() {
  const showToast = useToastStore(selectShowToast)
  const removeToast = useToastStore(selectRemoveToast)
  const toasts = useToastStore(selectToasts)

  return { showToast, removeToast, toasts }
}
