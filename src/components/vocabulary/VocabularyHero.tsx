import React from 'react'
import { HiSparkles, HiLocationMarker } from 'react-icons/hi'

interface VocabularyHeroProps {
  totalCount: number
  onFilterMedan: () => void
}

export const VocabularyHero: React.FC<VocabularyHeroProps> = ({
  totalCount,
  onFilterMedan
}) => {
  return (
    <>
      <div className="vocab-hero">
        <div className="container">
          <div className="vocab-hero__content">
            <span className="vocab-hero__tag">
              <HiSparkles /> Database Akbar 13,000+ Kosakata
            </span>
            <h1 className="vocab-hero__title">
              Kamus Lengkap <span className="gradient-text">Taiwan & Medan</span>
            </h1>
            <p className="vocab-hero__subtitle">
              Dari istilah baku Kamus Minnan Taiwan (臺灣閩南語常用詞辭典) hingga tuturan otentik
              Hokkien Medan, Bagansiapiapi, & Nusantara seperti <em>"Lim Kún-chúi"</em>, <em>"Chhài-thâu-kóe"</em>, dan <em>"Ko-pi-o"</em>.
            </p>

            <div className="vocab-stat-pills">
              <span className="vocab-stat-pill">
                📚 {(totalCount || 13200).toLocaleString()}+ Entri Kosakata
              </span>
              <span className="vocab-stat-pill vocab-stat-pill--medan">
                🇮🇩 Dialek Medan & Nusantara
              </span>
              <span className="vocab-stat-pill vocab-stat-pill--taiwan">
                🇹🇼 Standar Taiwan MoE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="medan-spotlight glass">
        <div className="medan-spotlight__icon">
          <HiLocationMarker size={32} />
        </div>
        <div className="medan-spotlight__body">
          <h3>Koleksi Khas Hokkien Medan & Sekitar Indonesia</h3>
          <p>
            Mencakup kosakata pasar, kuliner peranakan legendaris, istilah sehari-hari khas
            Medan, Selatpanjang, Bagansiapiapi, dan Pontianak yang diwariskan turun-temurun.
          </p>
        </div>
        <button
          type="button"
          className="medan-spotlight__btn"
          onClick={onFilterMedan}
        >
          Lihat Khas Medan
        </button>
      </div>
    </>
  )
}
