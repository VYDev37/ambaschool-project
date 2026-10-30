import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useCourseStore, selectCourses } from '../store/CourseStore'
import {
  useUserProgressStore,
  selectCompletedLessonIds
} from '../store/UserProgressStore'
import { CourseModule } from '../schemas/CourseSchema'
import { triggerConfetti } from '../utils/confetti'
import { playSuccess, playFanfare } from '../utils/soundEffects'
import { useToast } from '../store/ToastStore'
import { LessonsHero } from '../components/lessons/LessonsHero'
import { LessonsProgressBar } from '../components/lessons/LessonsProgressBar'
import { LessonsFilterBar } from '../components/lessons/LessonsFilterBar'
import { LessonCard } from '../components/lessons/LessonCard'
import { LessonModal } from '../components/lessons/LessonModal'
import { coursesModules as fallbackCourses } from '../data/coursesData'
import './LessonsPage.css'

export default function LessonsPage(): React.ReactElement {
  const [searchParams] = useSearchParams()
  const { showToast } = useToast()

  const courses = useCourseStore(selectCourses)
  const fetchCourses = useCourseStore((state) => state.fetchCourses)
  const completedLessonIds = useUserProgressStore(selectCompletedLessonIds)
  const markLessonCompleted = useUserProgressStore((state) => state.markLessonCompleted)

  const [selectedFilter, setSelectedFilter] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalLesson, setActiveModalLesson] = useState<CourseModule | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const courseList = useMemo(() => {
    return courses.length > 0 ? courses : (fallbackCourses as CourseModule[])
  }, [courses])

  useEffect(() => {
    const moduleId = searchParams.get('moduleId')
    if (moduleId && courseList.length > 0) {
      const found = courseList.find((m) => m.id === parseInt(moduleId))
      if (found) {
        setActiveModalLesson(found)
      }
    }
  }, [searchParams, courseList])

  const filtered = useMemo(() => {
    return courseList.filter((item) => {
      const matchCategory =
        selectedFilter === 'Semua' ||
        (selectedFilter === 'Medan & Nusantara' && item.category.includes('Medan')) ||
        item.category === selectedFilter ||
        Boolean(item.track?.includes(selectedFilter))

      const matchQuery =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.culturalNote.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchQuery
    })
  }, [courseList, selectedFilter, searchQuery])

  const handleMarkCompleted = (id: number) => {
    const isAlreadyCompleted = completedLessonIds.includes(id)
    markLessonCompleted(id)

    if (!isAlreadyCompleted) {
      triggerConfetti()
      playFanfare()
      showToast(
        `🎉 Selamat! Modul telah diselesaikan. Badge "${
          activeModalLesson?.badge || 'Selesai'
        }" terbuka!`,
        'badge',
        3500
      )
    } else {
      playSuccess()
      showToast('✅ Modul selesai ditinjau ulang.', 'success', 2000)
    }
    setActiveModalLesson(null)
  }

  return (
    <div className="lessons-page">
      <LessonsHero />

      <div className="container lessons-body">
        <LessonsProgressBar
          completedCount={completedLessonIds.length}
          totalCount={courseList.length}
        />

        <LessonsFilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="lessons-count-label">
          Menampilkan <strong>{filtered.length}</strong> dari{' '}
          <strong>{courseList.length}</strong> Modul Pembelajaran
        </div>

        <div className="lessons-grid">
          {filtered.map((item, index) => (
            <LessonCard
              key={item.id}
              module={item}
              index={index}
              isCompleted={completedLessonIds.includes(item.id)}
              onSelect={setActiveModalLesson}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModalLesson && (
          <LessonModal
            lesson={activeModalLesson}
            onClose={() => setActiveModalLesson(null)}
            onComplete={handleMarkCompleted}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
