import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface VocabularyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const VocabularyPagination: React.FC<VocabularyPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="vocab-pagination">
      <button
        type="button"
        className="vocab-page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <HiChevronLeft size={20} />
        <span>Sebelumnya</span>
      </button>

      <div className="vocab-page-numbers">
        {currentPage > 3 && (
          <>
            <button
              type="button"
              className="vocab-page-num"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            <span className="vocab-page-dots">...</span>
          </>
        )}
        {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
          .filter((p) => p >= 1 && p <= totalPages)
          .map((p) => (
            <button
              key={p}
              type="button"
              className={`vocab-page-num ${
                p === currentPage ? 'vocab-page-num--active' : ''
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}
        {currentPage < totalPages - 2 && (
          <>
            <span className="vocab-page-dots">...</span>
            <button
              type="button"
              className="vocab-page-num"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        className="vocab-page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>Berikutnya</span>
        <HiChevronRight size={20} />
      </button>
    </div>
  )
}
