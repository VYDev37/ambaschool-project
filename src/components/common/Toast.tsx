import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiSparkles,
  HiX
} from 'react-icons/hi'
import {
  useToastStore,
  selectToasts,
  selectRemoveToast,
  ToastType
} from '../../store/ToastStore'
import './Toast.css'

export default function ToastContainer(): React.ReactElement {
  const toasts = useToastStore(selectToasts)
  const removeToast = useToastStore(selectRemoveToast)

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="toast-icon toast-icon--success" />
      case 'error':
        return <HiExclamationCircle className="toast-icon toast-icon--error" />
      case 'badge':
        return <HiSparkles className="toast-icon toast-icon--badge" />
      default:
        return <HiInformationCircle className="toast-icon toast-icon--info" />
    }
  }

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast toast--${toast.type}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            layout
          >
            <div className="toast__content">
              {getIcon(toast.type)}
              <span className="toast__message">{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast__close"
              onClick={() => removeToast(toast.id)}
              aria-label="Tutup notifikasi"
            >
              <HiX size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
