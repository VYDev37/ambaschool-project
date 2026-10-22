import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import DictSearch from './components/DictSearch'
import LessonPreview from './components/LessonPreview'
import VocabularySection from './components/VocabularySection'
import PhraseOfDay from './components/PhraseOfDay'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import LearningStreak from './components/LearningStreak'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ToastContainer from './components/Toast'
import { ToastProvider } from './context/ToastContext'
import LessonsPage from './pages/LessonsPage'
import VocabularyPage from './pages/VocabularyPage'
import DictionaryPage from './pages/DictionaryPage'
import PracticePage from './pages/PracticePage'
import AboutPage from './pages/AboutPage'
import './App.css'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Scroll progress indicator
function ScrollProgress() {
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
function BackToTop() {
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
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
    >
      ↑
    </button>
  )
}

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
}

function PageWrapper({ children }) {
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

function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <Features />
      <DictSearch />
      <LessonPreview />
      <LearningStreak />
      <VocabularySection />
      <PhraseOfDay />
      <Testimonials />
      <CTA />
    </PageWrapper>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
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
  )
}

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
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

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  )
}
