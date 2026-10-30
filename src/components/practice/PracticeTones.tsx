import React, { useState, useRef } from 'react'
import { HiMusicNote, HiVolumeUp } from 'react-icons/hi'
import { hokkienTones, HokkienTone } from '../../data/practiceData'

export default function PracticeTones(): React.ReactElement {
  const [activeTone, setActiveTone] = useState<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playToneSound = (t: HokkienTone) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'

      const now = ctx.currentTime
      osc.frequency.setValueAtTime(t.freqStart, now)
      if (t.freqStart !== t.freqEnd) {
        osc.frequency.exponentialRampToValueAtTime(t.freqEnd, now + t.duration)
      }

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + t.duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + t.duration)
    } catch (e) {
      console.warn('Web Audio error:', e)
    }
  }

  const speakText = (txt: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(txt)
      u.lang = 'zh-TW'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    }
  }

  return (
    <div className="tones-container">
      <div className="tones-intro glass">
        <h3 className="tones-intro__title">Pelatih Frekuensi 8 Nada Kuno Minnan</h3>
        <p className="tones-intro__desc">
          Tekan tombol <strong>"Bunyikan Nada"</strong> untuk mendengarkan gelombang suara murni (synthesizer)
          sesuai kontur nada asli bahasa Hokkien, atau tekan tombol suara untuk mendengar pengucapan vokal manusia.
        </p>
      </div>

      <div className="tones-grid">
        {hokkienTones.map((t, idx) => (
          <div
            key={t.tone}
            className={`tone-card glass ${activeTone === idx ? 'tone-card--active' : ''}`}
            onClick={() => setActiveTone(idx)}
          >
            <div className="tone-card__head">
              <span className="tone-card__num">Nada {t.tone}</span>
              <span className="tone-card__pitch">Tinggi Nada: {t.pitchNum}</span>
            </div>
            <h4 className="tone-card__name">{t.name}</h4>

            <div className="tone-card__synth-row">
              <button
                type="button"
                className="tone-synth-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  playToneSound(t)
                }}
                title="Bunyikan frekuensi osilator nada"
              >
                <HiMusicNote />
                <span>Bunyi Nada ({t.freqStart}Hz)</span>
              </button>

              <button
                type="button"
                className="tone-voice-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  speakText(t.example.split(' ')[0])
                }}
                title="Dengar suara vokal kata"
              >
                <HiVolumeUp />
              </button>
            </div>

            <div className="tone-card__example">
              <span>
                Contoh Kata: <strong>{t.example}</strong>
              </span>
            </div>

            <p className="tone-card__desc">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
