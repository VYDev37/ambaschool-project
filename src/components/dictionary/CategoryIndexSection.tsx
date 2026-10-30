import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCollection, HiX } from 'react-icons/hi'

export const defaultCategories = [
  { emoji: '🍜', name: 'Kuliner & Minuman' },
  { emoji: '🤝', name: 'Sapaan & Adab' },
  { emoji: '🏪', name: 'Pasar & Bisnis' },
  { emoji: '👨‍👩‍👧‍👦', name: 'Keluarga & Silsilah' },
  { emoji: '🗣️', name: 'Ungkapan Gaul' },
  { emoji: '🏃', name: 'Aktivitas & Harian' },
  { emoji: '🌤️', name: 'Alam & Cuaca' },
  { emoji: '🏥', name: 'Tubuh & Kesehatan' },
  { emoji: '🚗', name: 'Kota & Transportasi' },
  { emoji: '🏠', name: 'Rumah & Benda' },
  { emoji: '📱', name: 'Teknologi & Modern' },
  { emoji: '📜', name: 'Pepatah & Kiasan' },
  { emoji: '🏮', name: 'Budaya & Adat' }
]

interface CategoryIndexSectionProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: string | null
  categoryCounts: Record<string, number>
  onSelectCategory: (category: string) => void
}

export const CategoryIndexSection: React.FC<CategoryIndexSectionProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  categoryCounts,
  onSelectCategory
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dict-cat-index glass"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="dict-cat-index__header">
            <h3>
              <HiCollection /> 分類索引: Indeks Kategori
            </h3>
            <button type="button" onClick={onClose}>
              <HiX size={20} />
            </button>
          </div>
          <div className="dict-cat-index__grid">
            {defaultCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                className={`dict-cat-card ${
                  selectedCategory === cat.name ? 'dict-cat-card--active' : ''
                }`}
                onClick={() => onSelectCategory(cat.name)}
              >
                <span className="dict-cat-card__emoji">{cat.emoji}</span>
                <span className="dict-cat-card__name">{cat.name}</span>
                <span className="dict-cat-card__count">
                  {(categoryCounts[cat.name] || 0).toLocaleString()} kata
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
