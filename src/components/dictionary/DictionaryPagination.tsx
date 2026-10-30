import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface DictionaryPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const DictionaryPagination: React.FC<DictionaryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="dict-pagination">
      <button
        type="button"
        className="dict-page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <HiChevronLeft size={18} /> Sebelumnya
      </button>

      <div className="dict-page-nums">
        {currentPage > 3 && (
          <>
            <button
              type="button"
              className="dict-page-num"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            <span className="dict-page-dots">...</span>
          </>
        )}
        {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
          .filter((p) => p >= 1 && p <= totalPages)
          .map((p) => (
            <button
              key={p}
              type="button"
              className={`dict-page-num ${
                p === currentPage ? 'dict-page-num--active' : ''
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}
        {currentPage < totalPages - 2 && (
          <>
            <span className="dict-page-dots">...</span>
            <button
              type="button"
              className="dict-page-num"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        className="dict-page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Berikutnya <HiChevronRight size={18} />
      </button>
    </div>
  )
}
