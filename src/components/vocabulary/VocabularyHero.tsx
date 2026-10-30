import React from 'react'
import { HiSparkles } from 'react-icons/hi'

interface VocabularyHeroProps {
  totalCount: number
}

export const VocabularyHero: React.FC<VocabularyHeroProps> = ({
  totalCount
}) => {
  return (
    <div className="vocab-hero">
      <div className="container">
        <div className="vocab-hero__content">
          <span className="vocab-hero__tag">
            <HiSparkles /> Database Lengkap 13,000+ Kosakata
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
  )
}
