import React from 'react'
import { Link } from 'react-router-dom'
import { HiVolumeUp, HiArrowRight } from 'react-icons/hi'
import { VocabularyItem } from '../../schemas/VocabularySchema'
import { playClick } from '../../utils/soundEffects'

interface DictSearchResultItemProps {
  item: VocabularyItem
  playingHanji: string | null
  onSpeak: (e: React.MouseEvent, text: string) => void
}

export const DictSearchResultItem: React.FC<DictSearchResultItemProps> = ({
  item,
  playingHanji,
  onSpeak
}) => {
  return (
    <Link
      to={`/dictionary?q=${encodeURIComponent(item.hanji)}`}
      className="dict-search-result"
      onClick={() => playClick()}
    >
      <div className="dict-search-result__left">
        <span className="dict-search-result__hanji chinese-text">{item.hanji}</span>
        <button
          type="button"
          className={`dict-search-result__audio ${
            playingHanji === item.hanji ? 'dict-search-result__audio--active' : ''
          }`}
          onClick={(e) => onSpeak(e, item.hanji)}
          title="Putar pengucapan"
        >
          <HiVolumeUp size={14} />
        </button>
      </div>
      <div className="dict-search-result__mid">
        <span className="dict-search-result__poj">{item.poj}</span>
        {item.tailo && item.tailo !== item.poj && (
          <span className="dict-search-result__tailo">{item.tailo}</span>
        )}
      </div>
      <span className="dict-search-result__indo">{item.indo}</span>
      {(item.dialect?.includes('Medan') || item.tags?.includes('Medan Populer')) && (
        <span className="dict-search-result__medan" title="Dialek Medan">
          🇮🇩 Medan
        </span>
      )}
      <HiArrowRight className="dict-search-result__arrow" />
    </Link>
  )
}
