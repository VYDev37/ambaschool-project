import React from 'react'
import { motion } from 'framer-motion'
import { HiChartBar } from 'react-icons/hi'

interface WeeklyActivityChartProps {
  weeklyProgress: number[]
}

const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({
  weeklyProgress
}) => {
  const today = new Date().getDay()

  return (
    <div className="streak__weekly glass">
      <div className="streak__weekly-header">
        <div className="streak__weekly-title-group">
          <HiChartBar className="streak__weekly-icon" />
          <h3 className="streak__weekly-title">Aktivitas Mingguan</h3>
        </div>
        <span className="streak__weekly-label">Progress Belajar 7 Hari</span>
      </div>
      <div className="streak__weekly-chart">
        {weeklyProgress.map((val, i) => {
          const isToday = i === today

          return (
            <div key={dayLabels[i]} className={`streak__bar-col ${isToday ? 'streak__bar-col--today' : ''}`}>
              <div className="streak__bar-track">
                <motion.div
                  className="streak__bar-fill"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Math.max(val, 4)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                  style={{
                    background: isToday
                      ? 'var(--gradient-primary)'
                      : val > 50
                      ? 'var(--gradient-warm)'
                      : 'rgba(255,255,255,0.15)'
                  }}
                />
              </div>
              <span className="streak__bar-label">{dayLabels[i]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
