import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import DictSearch from './components/DictSearch'
import LessonPreview from './components/LessonPreview'
import VocabularySection from './components/VocabularySection'
import PhraseOfDay from './components/PhraseOfDay'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LessonsPage from './pages/LessonsPage'
import VocabularyPage from './pages/VocabularyPage'
import DictionaryPage from './pages/DictionaryPage'
import PracticePage from './pages/PracticePage'
import AboutPage from './pages/AboutPage'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <DictSearch />
      <LessonPreview />
      <VocabularySection />
      <PhraseOfDay />
      <Testimonials />
      <CTA />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
