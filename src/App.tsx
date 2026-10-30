import React, { useState, useEffect, lazy, Suspense, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import CommandPalette from './components/common/CommandPalette'
import ToastContainer from './components/common/Toast'

import Hero from './components/home/Hero'
import Features from './components/home/Features'
import DictSearch from './components/home/DictSearch'
import LessonPreview from './components/home/LessonPreview'
import VocabularySection from './components/home/VocabularySection'
import PhraseOfDay from './components/home/PhraseOfDay'
import CTA from './components/home/CTA'
import LearningStreak from './components/home/LearningStreak'

// Lazy-loaded page components for optimal bundle splitting
const LessonsPage = lazy(() => import('./pages/LessonsPage'))
const VocabularyPage = lazy(() => import('./pages/VocabularyPage'))
const DictionaryPage = lazy(() => import('./pages/DictionaryPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

import './App.css'

// Scroll to top on route change
function ScrollToTop(): null {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Scroll progress indicator
function ScrollProgress(): React.ReactElement {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

// Back to top floating button
function BackToTop(): React.ReactElement {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
    >
      ↑
    </button>
  )
}

// Page transition wrapper
const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } }
}

function PageWrapper({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

function HomePage(): React.ReactElement {
  return (
    <PageWrapper>
      <Hero />
      <Features />
      <DictSearch />
      <LessonPreview />
      <LearningStreak />
      <VocabularySection />
      <PhraseOfDay />
      <CTA />
    </PageWrapper>
  )
}

function RouteFallback(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm text-neutral-400 font-medium">Memuat halaman...</span>
      </div>
    </div>
  )
}

function AnimatedRoutes(): React.ReactElement {
  const location = useLocation()

  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<PageWrapper><LessonsPage /></PageWrapper>} />
          <Route path="/vocabulary" element={<PageWrapper><VocabularyPage /></PageWrapper>} />
          <Route path="/dictionary" element={<PageWrapper><DictionaryPage /></PageWrapper>} />
          <Route path="/practice" element={<PageWrapper><PracticePage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

function AppContent(): React.ReactElement {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="app noise-overlay">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer onOpenSearch={() => setIsSearchOpen(true)} />
      <BackToTop />
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <ToastContainer />
    </div>
  )
}

export default function App(): React.ReactElement {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
