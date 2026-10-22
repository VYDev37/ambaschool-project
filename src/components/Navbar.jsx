import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiMenuAlt3,
  HiX,
  HiSearch,
  HiVolumeUp,
  HiVolumeOff
} from 'react-icons/hi'
import { isSfxEnabled, setSfxEnabled, playClick } from '../utils/soundEffects'
import { useToast } from '../context/ToastContext'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Beranda', icon: '🏠' },
  { path: '/lessons', label: 'Pelajaran', icon: '📚' },
  { path: '/vocabulary', label: 'Kosakata', icon: '📖' },
  { path: '/dictionary', label: '辭典 Kamus', icon: '🔍' },
  { path: '/practice', label: 'Latihan', icon: '🎯' },
  { path: '/about', label: 'Tentang', icon: 'ℹ️' },
]

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [sfxOn, setSfxOn] = useState(isSfxEnabled)
  const location = useLocation()
  const navRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const toggleSfx = () => {
    const nextState = !sfxOn
    setSfxOn(nextState)
    setSfxEnabled(nextState)
    if (nextState) {
      playClick()
      showToast('🔊 Efek suara diaktifkan', 'info', 2000)
    } else {
      showToast('🔇 Efek suara dinonaktifkan', 'info', 2000)
    }
  }

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMobileOpen ? 'navbar--open' : ''}`}
    >
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => playClick()}>
          <motion.span
            className="navbar__logo-icon chinese-text"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            閩
          </motion.span>
          <span className="navbar__logo-text">
            Hokkien<span className="navbar__logo-accent">Learn</span>
          </span>
          <span className="navbar__logo-version">v2</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => playClick()}
              >
                <span className="navbar__link-label">{link.label}</span>
                {isActive && (
                  <motion.div
                    className="navbar__link-indicator"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {hoveredLink === link.path && !isActive && (
                  <motion.div
                    className="navbar__link-hover-bg"
                    layoutId="hoverNav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Action Buttons: Search, Sound, CTA */}
        <div className="navbar__actions">
          {/* Quick Search trigger */}
          <button
            className="navbar__icon-btn navbar__search-trigger"
            onClick={() => {
              playClick()
              onOpenSearch?.()
            }}
            title="Cari Cepat (Ctrl + K)"
            aria-label="Cari Cepat"
          >
            <HiSearch size={18} />
            <span className="navbar__search-kbd">Ctrl K</span>
          </button>

          {/* Sound FX toggle */}
          <button
            className={`navbar__icon-btn ${!sfxOn ? 'navbar__icon-btn--muted' : ''}`}
            onClick={toggleSfx}
            title={sfxOn ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
            aria-label="Toggle Efek Suara"
          >
            {sfxOn ? <HiVolumeUp size={18} /> : <HiVolumeOff size={18} />}
          </button>

          <Link
            to="/practice"
            className="navbar__cta-btn"
            onClick={() => playClick()}
          >
            <span className="navbar__cta-pulse" />
            <span>Mulai Belajar</span>
          </Link>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="navbar__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            
            {/* Mobile menu */}
            <motion.div
              className="navbar__mobile"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="navbar__mobile-links">
                {/* Mobile Quick Search Button */}
                <button
                  className="navbar__mobile-search-btn"
                  onClick={() => {
                    setIsMobileOpen(false)
                    onOpenSearch?.()
                  }}
                >
                  <HiSearch size={18} />
                  <span>Cari cepat (Kamus & Kursus)...</span>
                </button>

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      to={link.path}
                      className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <span className="navbar__mobile-link-icon">{link.icon}</span>
                      <span className="navbar__mobile-link-text">{link.label}</span>
                      {location.pathname === link.path && (
                        <span className="navbar__mobile-link-dot" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    to="/practice"
                    className="navbar__mobile-cta"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    🚀 Mulai Belajar Sekarang
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
