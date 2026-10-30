import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

interface VocabularySpotlightProps {
  isActive: boolean
  onFilterMedan: () => void
}

export const VocabularySpotlight: React.FC<VocabularySpotlightProps> = ({
  isActive,
  onFilterMedan
}) => {
  return (
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
        className={`medan-spotlight__btn ${
          isActive ? 'medan-spotlight__btn--active' : ''
        }`}
        onClick={onFilterMedan}
      >
        Lihat Khas Medan
      </button>
    </div>
  )
}
