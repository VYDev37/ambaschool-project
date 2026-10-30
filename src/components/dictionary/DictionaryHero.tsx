import React from 'react'
import { motion } from 'framer-motion'
import { HiBookOpen } from 'react-icons/hi'

interface DictionaryHeroProps {
  totalCount: number
}

export const DictionaryHero: React.FC<DictionaryHeroProps> = ({ totalCount }) => {
  return (
    <div className="dict-hero">
      <div className="dict-hero__bg-orb dict-hero__bg-orb--1" />
      <div className="dict-hero__bg-orb dict-hero__bg-orb--2" />
      <div className="dict-hero__bg-orb dict-hero__bg-orb--3" />
      <div className="dict-hero__grid-pattern" />

      <div className="container dict-hero__inner">
        <motion.div
          className="dict-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="dict-hero__badge">
            <HiBookOpen />
            <span>辭典 Kamus Hokkien Indonesia (Referensi Kamus Taiwan MoE)</span>
          </div>
          <h1 className="dict-hero__title">
            Kamus <span className="gradient-text">Hokkien Indonesia</span>
            <span className="dict-hero__title-sub">
              臺灣閩南語 • Pe̍h-ōe-jī • Tâi-lô • Bahasa Indonesia
            </span>
          </h1>
          <p className="dict-hero__desc">
            Terinspirasi dari <strong>教育部臺灣台語常用詞辭典</strong> (Kamus Resmi Kementerian Pendidikan Taiwan).
            Dilengkapi <em>Pinyin (POJ & Tâi-lô)</em>, logat Hokkien Taiwan & Medan, contoh kalimat, audio pengucapan, dan indeks lengkap.
          </p>

          {/* Quick Stats */}
          <div className="dict-hero__stats">
            <div className="dict-hero__stat-chip">
              <span className="dict-hero__stat-num">{totalCount.toLocaleString()}+</span>
              <span className="dict-hero__stat-lbl">Entri Kosakata</span>
            </div>
            <div className="dict-hero__stat-chip dict-hero__stat-chip--accent">
              <span className="dict-hero__stat-num">8</span>
              <span className="dict-hero__stat-lbl">Nada Hokkien</span>
            </div>
            <div className="dict-hero__stat-chip dict-hero__stat-chip--blue">
              <span className="dict-hero__stat-num">2</span>
              <span className="dict-hero__stat-lbl">Ragam Romanisasi</span>
            </div>
            <div className="dict-hero__stat-chip dict-hero__stat-chip--green">
              <span className="dict-hero__stat-num">🇮🇩🇹🇼</span>
              <span className="dict-hero__stat-lbl">Medan & Taiwan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
