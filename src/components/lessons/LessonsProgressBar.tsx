import React from 'react'

interface LessonsProgressBarProps {
  completedCount: number
  totalCount: number
}

export const LessonsProgressBar: React.FC<LessonsProgressBarProps> = ({
  completedCount,
  totalCount
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="lessons-progress-summary glass">
      <div className="lessons-progress-summary__info">
        <span className="lessons-progress-summary__label">Progres Kursus Anda</span>
        <div className="lessons-progress-summary__stats">
          <strong>{completedCount}</strong> dari <strong>{totalCount}</strong> Modul Selesai
          <span className="lessons-progress-summary__pct"> ({percentage}%)</span>
        </div>
      </div>
      <div className="lessons-progress-summary__bar">
        <div
          className="lessons-progress-summary__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
