import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMicrophone, HiX } from 'react-icons/hi'

export const toneGuide = [
  {
    tone: 1,
    name: 'Nada 1 (Tinggi Datar)',
    symbol: 'a',
    example: '東 tang',
    desc: 'Bunyi datar tinggi, seperti nada "satu" di musik. Suara stabil tanpa naik/turun.'
  },
  {
    tone: 2,
    name: 'Nada 2 (Turun)',
    symbol: 'á',
    example: '黨 tóng',
    desc: 'Suara turun dari tinggi ke rendah, mirip nada marah singkat.'
  },
  {
    tone: 3,
    name: 'Nada 3 (Rendah Datar)',
    symbol: 'à',
    example: '棟 tòng',
    desc: 'Bunyi rendah datar. Sering terdengar murung atau tenang.'
  },
  {
    tone: 4,
    name: 'Nada 4 (Masuk Rendah)',
    symbol: 'ah',
    example: '督 tok',
    desc: 'Bunyi pendek terputus di nada rendah, berakhiran -p, -t, -k, atau -h.'
  },
  {
    tone: 5,
    name: 'Nada 5 (Naik)',
    symbol: 'â',
    example: '同 tông',
    desc: 'Suara naik dari rendah ke tinggi, seperti bertanya.'
  },
  {
    tone: 7,
    name: 'Nada 7 (Tengah Datar)',
    symbol: 'ā',
    example: '洞 tōng',
    desc: 'Bunyi datar di nada menengah, stabil dan netral.'
  },
  {
    tone: 8,
    name: 'Nada 8 (Masuk Tinggi)',
    symbol: 'a̍h',
    example: '毒 to̍k',
    desc: 'Bunyi pendek terputus di nada tinggi, berakhiran -p, -t, -k, atau -h.'
  }
]

interface ToneGuideSectionProps {
  isOpen: boolean
  onClose: () => void
}

export const ToneGuideSection: React.FC<ToneGuideSectionProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dict-tone-guide glass"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="dict-tone-guide__header">
            <h3>
              <HiMicrophone /> 聲韻調索引: Panduan 8 Nada Hokkien (Minnan)
            </h3>
            <button type="button" onClick={onClose}>
              <HiX size={20} />
            </button>
          </div>
          <p className="dict-tone-guide__intro">
            Bahasa Hokkien memiliki <strong>8 nada dasar</strong> (Nada 6 umumnya dianggap sama dengan Nada 2).
            Setiap nada mengubah makna kata sepenuhnya. Berikut panduan lengkap nada:
          </p>
          <div className="dict-tone-cards">
            {toneGuide.map((t) => (
              <div key={t.tone} className="dict-tone-card">
                <div className="dict-tone-card__num">{t.tone}</div>
                <div className="dict-tone-card__body">
                  <h4>{t.name}</h4>
                  <span className="dict-tone-card__symbol">
                    Tanda diakritik: <strong>{t.symbol}</strong>
                  </span>
                  <span className="dict-tone-card__example">
                    Contoh: <em className="chinese-text">{t.example.split(' ')[0]}</em> {t.example.split(' ')[1]}
                  </span>
                  <p className="dict-tone-card__desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
