import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon chinese-text">閩</span>
            <span className="footer__logo-text">
              Hokkien<span className="footer__logo-accent">Learn</span>
            </span>
          </Link>
          <p className="footer__desc">
            Inisiatif pelestarian dan pembelajaran Bahasa Minnan (Hokkien) untuk generasi muda Indonesia. Belajar bahasa leluhur dengan tampilan modern, audio interaktif, dan materi terstruktur.
          </p>
          <div className="footer__loc">
            <span>🇮🇩 Terinspirasi dari komunitas Hokkien Medan, Bagan, Riau, Pontianak & sekitarnya</span>
          </div>
        </div>

        <div className="footer__nav-groups">
          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Materi Belajar</h4>
            <ul className="footer__nav-list">
              <li><Link to="/lessons">Sapaan & Perkenalan</Link></li>
              <li><Link to="/lessons">Angka & Bilangan</Link></li>
              <li><Link to="/lessons">Keluarga & Kerabat</Link></li>
              <li><Link to="/lessons">Percakapan Kuliner</Link></li>
              <li><Link to="/dictionary">辭典 Kamus Hokkien-Indonesia</Link></li>
              <li><Link to="/vocabulary">Database Kosakata</Link></li>
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Ragam Dialek</h4>
            <ul className="footer__nav-list">
              <li><Link to="/about">Hokkien Medan (Zhangzhou)</Link></li>
              <li><Link to="/about">Hokkien Bagan & Riau (Quanzhou)</Link></li>
              <li><Link to="/about">Taiwan Minnan (Tâi-gí)</Link></li>
              <li><Link to="/about">Penang Hokkien</Link></li>
              <li><Link to="/about">Sistem Nada (Pe̍h-ōe-jī)</Link></li>
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__nav-title">Fitur & Latihan</h4>
            <ul className="footer__nav-list">
              <li><Link to="/practice">Kuis Pilihan Ganda</Link></li>
              <li><Link to="/practice">Flashcards Interaktif</Link></li>
              <li><Link to="/practice">Latihan 8 Nada</Link></li>
              <li><Link to="/vocabulary">Pencarian Kata</Link></li>
              <li><Link to="/about">Panduan Huruf Kanji (Hanji)</Link></li>
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
