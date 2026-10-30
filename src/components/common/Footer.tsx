import React from 'react'
import { Link } from 'react-router-dom'
import { HiHeart, HiSearch, HiArrowUp } from 'react-icons/hi'
import { playClick } from '../../utils/soundEffects'
import './Footer.css'

interface FooterProps {
  onOpenSearch?: () => void
}

export default function Footer({ onOpenSearch }: FooterProps): React.ReactElement {
  const scrollToTop = () => {
    playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" onClick={() => playClick()}>
            <span className="footer__logo-icon chinese-text">閩</span>
            <span className="footer__logo-text">
              Hokkien<span className="footer__logo-accent">Learn</span>
            </span>
          </Link>
          <p className="footer__desc">
            Inisiatif pelestarian dan pembelajaran Bahasa Minnan (Hokkien) untuk generasi muda Indonesia. Belajar bahasa leluhur dengan tampilan modern, audio interaktif, dan materi terstruktur.
          </p>

          <div className="footer__actions">
            {onOpenSearch && (
              <button
                type="button"
                className="footer__search-trigger-btn"
                onClick={() => {
                  playClick()
                  onOpenSearch()
                }}
              >
                <HiSearch size={16} />
                <span>Pencarian Cepat</span>
                <kbd>Ctrl K</kbd>
              </button>
            )}
            <button type="button" className="footer__top-btn" onClick={scrollToTop}>
              <HiArrowUp size={15} />
              <span>Ke Atas</span>
            </button>
          </div>

          <div className="footer__loc">
            <span>🇮🇩 Terinspirasi dari komunitas Hokkien Medan, Bagan, Riau, Pontianak & sekitarnya</span>
          </div>
        </div>

        <div className="footer__nav-groups">
          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Materi Belajar</h4>
            <ul className="footer__nav-list">
              <li><Link to="/lessons" onClick={() => playClick()}>26 Modul Kursus Interaktif</Link></li>
              <li><Link to="/vocabulary" onClick={() => playClick()}>13,000+ Database Kosakata</Link></li>
              <li><Link to="/lessons" onClick={() => playClick()}>Kopitiam & Sapaan Medan</Link></li>
              <li><Link to="/lessons" onClick={() => playClick()}>Pasar, Bisnis & Cuan</Link></li>
              <li><Link to="/dictionary" onClick={() => playClick()}>辭典 Kamus Hokkien-Indonesia</Link></li>
              <li><Link to="/practice" onClick={() => playClick()}>Flashcard & Latihan 8 Nada</Link></li>
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Ragam Dialek</h4>
            <ul className="footer__nav-list">
              <li><Link to="/about" onClick={() => playClick()}>Hokkien Medan (Zhangzhou)</Link></li>
              <li><Link to="/about" onClick={() => playClick()}>Hokkien Bagan & Riau (Quanzhou)</Link></li>
              <li><Link to="/about" onClick={() => playClick()}>Taiwan Minnan (Tâi-gí)</Link></li>
              <li><Link to="/about" onClick={() => playClick()}>Penang Hokkien</Link></li>
              <li><Link to="/about" onClick={() => playClick()}>Sistem Nada (Pe̍h-ōe-jī)</Link></li>
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Fitur & Latihan</h4>
            <ul className="footer__nav-list">
              <li><Link to="/practice" onClick={() => playClick()}>Kuis Pilihan Ganda</Link></li>
              <li><Link to="/practice" onClick={() => playClick()}>Flashcards Interaktif</Link></li>
              <li><Link to="/practice" onClick={() => playClick()}>Latihan 8 Nada</Link></li>
              <li><Link to="/vocabulary" onClick={() => playClick()}>Pencarian Kata</Link></li>
              <li><Link to="/about" onClick={() => playClick()}>Panduan Huruf Kanji (Hanji)</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} HokkienLearn. Dibuat dengan <HiHeart className="footer__heart" /> untuk pelestarian budaya Tionghoa Indonesia.
        </p>
        <div className="footer__bottom-links">
          <span>Tiong-kok / Tâi-oân / Lâm-iûⁿ Hok-kiàn-oē</span>
        </div>
      </div>
    </footer>
  )
}
